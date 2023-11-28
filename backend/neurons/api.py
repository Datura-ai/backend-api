import bittensor as bt
import argparse
import traceback
import asyncio
from template.protocol import StreamPrompting, ImageResponse
from fastapi import Depends

from neurons.conversation_history import ConversationHistory

conversation_history = ConversationHistory()
MAX_TOKENS = 4096

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



async def query_synapse_text(dendrite, metagraph, subtensor, conversation_id, prompt):
    try:
        axon = metagraph.axons[87]
        # Add user prompt to the conversation history
        conversation_history.add_user_message(conversation_id, prompt)

        # Get the conversation history within the token limit
        history_within_limit = conversation_history.get_history_within_limit(conversation_id, MAX_TOKENS)  # Set MAX_TOKENS appropriately

        syn = StreamPrompting(messages=history_within_limit, engine="gpt-4-1106-preview", seed=1234)

        responses = await dendrite([axon], syn, deserialize=False, streaming=True)
        merged_chunks = ""  # Initialize merged_chunks
        for resp in responses:
            async for chunk in resp:
                if isinstance(chunk, list):
                    # Merge each streaming chunk together in the background
                    merged_chunks += chunk[0]

                    # Yield the current chunk as a response
                    yield f"data: {chunk[0]}\n\n"

        # After all chunks have been processed, add the merged chunks as a single AI message in the conversation history
        conversation_history.add_ai_message(conversation_id, merged_chunks)
    except Exception as e:
        bt.logging.error(f"General exception at step: {e}\n{traceback.format_exc()}")


def main():
    config, wallet, subtensor, dendrite, metagraph = initialize()
    # asyncio.run(query_synapse_text(dendrite, metagraph, subtensor, "tell me a story"))
    asyncio.run(query_synapse_image(dendrite, metagraph, subtensor, "dragon"))


if __name__ == "__main__":
    main()
