import asyncio
import json

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from neurons.api import initialize, query_synapse_image, query_synapse_text
from neurons.pull_wandb import get_run_images

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
    max_age=3600,
)

_, _, subtensor, dendrite, metagraph = initialize()


@app.post("/generate-image")
async def get_image(prompt_dict: dict):
    prompt = prompt_dict.get('prompt')
    if not prompt:
        raise HTTPException(status_code=400, detail="Prompt is required")

    generated_images = asyncio.run(query_synapse_image(dendrite, metagraph, subtensor, prompt))
    try:
        image_url = generated_images[0].deserialize().get("url")
    except Exception:
        raise HTTPException(status_code=500, detail="Can't generate image. Please try again")
    return image_url


@app.post("/generate-text")
async def get_text(request: Request):
    try:
        body = await request.json()
        prompt = body.get('prompt')
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Cant decode JSON")
    if not prompt:
        raise HTTPException(status_code=400, detail="Prompt is required")

    return StreamingResponse(query_synapse_text(dendrite, metagraph, subtensor, prompt), media_type='text/event-stream')


@app.get("/showcase-images")
async def get_showcase_images(request: Request, sortBy: str = ''):

    try:
        images = get_run_images(sortBy=sortBy)
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Cant import images from wanDB")

    return images

