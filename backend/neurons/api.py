import bittensor as bt
import argparse
import traceback
import asyncio
from template.protocol import StreamPrompting, ImageResponse


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


# axons = [36, 80, 255]

async def query_synapse_image(dendrite, metagraph, subtensor, prompt):
    try:
        axon = metagraph.axons[87]  # 87, 91, 98
        engine = "dall-e-3"
        size = "1792x1024"
        quality = "standard"
        style = "vivid"

        syn = ImageResponse(messages=prompt, engine=engine, size=size, quality=quality, style=style)

        async def main():
            responses = await dendrite([axon], syn, deserialize=False, timeout=50)
            full_response = []  # Initialize full_response
            for resp in responses:
                full_response.append(resp)

            return full_response

        full_response = await main()
        return full_response
    except Exception as e:
        bt.logging.error(f"General exception at step: {e}\n{traceback.format_exc()}")


async def query_synapse_text(dendrite, metagraph, subtensor, prompt):
    try:
        axon = metagraph.axons[87]
        syn = StreamPrompting(messages=[{"role": "user", "content": prompt}], engine="gpt-4-1106-preview", seed=1234)

        responses = await dendrite([axon], syn, deserialize=False, streaming=True)
        for resp in responses:
            async for chunk in resp:
                if isinstance(chunk, list):
                    yield f"data: {chunk[0]}\n\n"

    except Exception as e:
        bt.logging.error(f"General exception at step: {e}\n{traceback.format_exc()}")


def main():
    config, wallet, subtensor, dendrite, metagraph = initialize()
    # asyncio.run(query_synapse_text(dendrite, metagraph, subtensor, "tell me a story"))
    asyncio.run(query_synapse_image(dendrite, metagraph, subtensor, "dragon"))


if __name__ == "__main__":
    main()
