import argparse
import datetime
from io import BytesIO
import traceback
import uuid

import requests
from PIL import Image
import wandb
import bittensor as bt

from template.protocol import StreamPrompting, ImageResponse


api = wandb.Api()
wandb.init(
    name="validator-18",
    anonymous="allow",
    reinit=False,
    project="synthetic-QA",
    entity="cortex-t",
)
bt.logging.success('Started wandb run')


def initialize():
    parser = argparse.ArgumentParser()
    bt.subtensor.add_args(parser)
    bt.logging.add_args(parser)
    bt.wallet.add_args(parser)
    config = bt.config(parser)
    wallet = bt.wallet(config=config)
    subtensor = bt.subtensor(config=config)
    dendrite = bt.dendrite(wallet=wallet)
    metagraph = subtensor.metagraph(18)
    return config, wallet, subtensor, dendrite, metagraph


async def query_synapse_image(dendrite, metagraph, subtensor, prompt):
    wandb_data = {
        "prompts": {},
        "responses": {},
        "images": {},
        "timestamps": {},
    }
    try:
        axon = metagraph.axons[87]
        engine = "dall-e-3"
        size = "1792x1024"
        quality = "standard"
        style = "vivid"

        syn = ImageResponse(
            messages=prompt, engine=engine, size=size, quality=quality, style=style
        )

        async def main():
            responses = await dendrite([axon], syn, deserialize=False, timeout=50)
            full_response = []
            for resp in responses:
                full_response.append(resp)

            return full_response

        full_response = await main()
        if full_response:
            response = full_response[0]
            completion = response.completion
            if completion is not None:
                uid = f"{datetime.datetime.now().isoformat()}-{str(uuid.uuid4())}"
                bt.logging.info(f"UID {uid} response is {completion}")
                image_url = completion["url"]

                # Download the image and store it as a BytesIO object
                image_response = requests.get(image_url)
                image_bytes = BytesIO(image_response.content)
                image = Image.open(image_bytes)

                # Log the image to wandb
                wandb_data["images"][uid] = {
                    "image": wandb.Image(image, caption=f"{uid}"),
                    "uid": uid,
                    "created_at": datetime.datetime.now().isoformat(),
                }
                wandb_data["responses"][uid] = completion
                wandb_data["timestamps"][uid] = datetime.datetime.now().isoformat()

                wandb.log(wandb_data)
                return full_response

    except Exception as e:
        bt.logging.error(f"General exception at step: {e}\n{traceback.format_exc()}")


async def query_synapse_text(dendrite, metagraph, subtensor, prompts):
    try:
        axon = metagraph.axons[87]
        syn = StreamPrompting(
            messages=[{"role": "user", "content": prompt} for prompt in prompts],
            engine="gpt-4-1106-preview",
            seed=1234,
        )

        responses = await dendrite([axon], syn, deserialize=False, streaming=True)
        for resp in responses:
            async for chunk in resp:
                if isinstance(chunk, list):
                    yield f"data: {chunk[0]}\n\n"

    except Exception as e:
        bt.logging.error(f"General exception at step: {e}\n{traceback.format_exc()}")


def get_recent_images(limit=12):
    runs = api.runs("cortex-t/synthetic-QA")
    recent_images = []
    file_count = 0
    for run in runs:
        for file in run.files():
            if file.name.endswith(".png") or file.name.endswith(".jpg"):
                image_url = file.url
                timestamp = datetime.datetime.now().isoformat()
                unique_id = str(uuid.uuid4())
                image_info = {
                    "image_url": image_url,
                    "timestamp": timestamp,
                    "uuid": unique_id
                }
                recent_images.append(image_info)
                file_count += 1
                if file_count >= limit:
                    break

        if file_count >= limit:
            break

    return recent_images
