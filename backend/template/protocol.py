import typing
from typing import Dict, List, Optional

import bittensor as bt
import pydantic
from starlette.responses import StreamingResponse


class IsAlive(bt.Synapse):
    answer: typing.Optional[str] = None
    completion: str = pydantic.Field(
        "",
        title="Completion",
        description=(
            "Completion status of the current StreamPrompting object. "
            "This attribute is mutable and can be updated."
        ),
    )


class ImageResponse(bt.Synapse):
    completion: Optional[Dict] = None
    messages: str
    engine: str
    style: str
    size: str
    quality: str
    required_hash_fields: List[str] = ["messages"]

    def deserialize(self) -> Dict:
        return self.completion


class StreamPrompting(bt.StreamingSynapse):
    messages: List[Dict[str, str]] = pydantic.Field(
        ...,
        title="Messages",
        description=(
            "A list of messages in the StreamPrompting scenario, "
            "each containing a role and content. Immutable."
        ),
        allow_mutation=False,
    )

    required_hash_fields: List[str] = pydantic.Field(
        ["messages"],
        title="Required Hash Fields",
        description="A list of required fields for the hash.",
        allow_mutation=False,
    )

    seed: int = pydantic.Field(
        "",
        title="Seed",
        description=(
            "Seed for text generation. "
            "This attribute is immutable and cannot be updated."
        ),
    )

    completion: str = pydantic.Field(
        "",
        title="Completion",
        description=(
            "Completion status of the current StreamPrompting object. "
            "This attribute is mutable and can be updated."
        ),
    )

    engine: str = pydantic.Field(
        "",
        title="engine",
        description=(
            "The engine that which to use when "
            "calling openai for your response."
        ),
    )

    async def process_streaming_response(self, response: StreamingResponse):
        if self.completion is None:
            self.completion = ""
        bt.logging.debug(
            "Processing streaming response (StreamingSynapse base class)."
        )
        async for chunk in response.content.iter_any():
            bt.logging.debug(f"Processing chunk: {chunk}")
            tokens = chunk.decode("utf-8").split("\n")
            for token in tokens:
                bt.logging.debug(f"--processing token: {token}")
                if token:
                    self.completion += token
            bt.logging.debug(f"yielding tokens {tokens}")
            yield tokens

    def deserialize(self) -> str:
        return self.completion

    def extract_response_json(self, response: StreamingResponse) -> dict:
        headers = {
            k.decode("utf-8"): v.decode("utf-8")
            for k, v in response.__dict__["_raw_headers"]
        }

        def extract_info(prefix):
            return {
                key.split("_")[-1]: value
                for key, value in headers.items()
                if key.startswith(prefix)
            }

        return {
            "name": headers.get("name", ""),
            "timeout": float(headers.get("timeout", 0)),
            "total_size": int(headers.get("total_size", 0)),
            "header_size": int(headers.get("header_size", 0)),
            "dendrite": extract_info("bt_header_dendrite"),
            "axon": extract_info("bt_header_axon"),
            "messages": self.messages,
            "completion": self.completion,
        }
