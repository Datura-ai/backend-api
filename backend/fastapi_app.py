import json

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import bittensor as bt

from neurons.api import initialize
from sync_wandb.pull_wandb import fetch_images
from web import schemas as s
from web import service as sv
from web.depends import ValidatedMessage
import constants as c

app = FastAPI(description=open("description.md", "r").read())
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
    max_age=3600,
)

_, _, subtensor, dendrite, metagraph = initialize()


@app.get("/showcase/")
async def list_showcase_images(sort_by: c.WandbSortByEnum) -> list[s.Showcase]:
    """
    Retrieves a list of showcase images, sorted based on the specified criterion.

    This endpoint fetches images from a wanDB (Weights & Biases) database, allowing users to view a curated list of showcase images. The images are sorted according to the provided sorting criterion.
    """
    try:
        return fetch_images(sort_by=sort_by)
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Cant import images from wanDB")


@app.get("/conversation/")
async def list_conversations() -> list[s.Conversation]:
    """
    Retrieves a list of all user conversations stored in the system.
    """
    return sv.fetch_conversations()


@app.post("/conversation")
async def create_new_conversation(name: str) -> s.Conversation:
    """
    Creates a new conversation with a given name and stores it in the system.
    """
    return sv.create_conversation(name)


@app.get("/conversation/{conversation_uuid}/message/")
async def list_conversation_messages(conversation_uuid: str) -> list[s.Message]:
    """
    Fetches all messages from a specific conversation identified by its UUID.
    """
    return sv.fetch_messages(conversation_uuid)


@app.post("/generate-image")
async def get_image(message: ValidatedMessage) -> s.Message:
    """
    Generates an image based on the provided validated message.

    Raises:
        HTTPException: If image generation fails, an HTTP 500 error is raised with a detailed error message.
    """
    try:
        return await sv.query_image(dendrite, metagraph, subtensor, message)
    except Exception as err:
        bt.logging.error(f"Can't generate image: {err}")
        raise HTTPException(status_code=500, detail="Can't generate image. Please try again")


@app.post("/generate-text")
async def get_text(message: ValidatedMessage) -> StreamingResponse:
    """
    Generates text in a streaming fashion based on the provided validated message.

    Note:
        The response is streamed as 'text/event-stream', making it suitable for real-time applications or large text generation tasks.
    """
    gen_query_text = sv.query_text(dendrite, metagraph, subtensor, message)
    return StreamingResponse(gen_query_text, media_type="text/event-stream")
