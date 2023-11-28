import asyncio
import json
from fastapi import HTTPException, APIRouter, Request, Depends
from fastapi.responses import StreamingResponse

from neurons.api import initialize, query_synapse_image, query_synapse_text
from neurons.conversation_history import ConversationHistory

router = APIRouter()
_, _, subtensor, dendrite, metagraph = initialize()

conversation_history = ConversationHistory()

@router.post("/generate-image")
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


@router.post("/generate-text")
async def get_text(request: Request, conversation_id: str = Depends(conversation_history.generate_conversation_id)):
    try:
        body = await request.json()
        prompt = body.get('prompt')
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Can't decode JSON")
    if not prompt:
        raise HTTPException(status_code=400, detail="Prompt is required")

    return StreamingResponse(
        query_synapse_text(dendrite, metagraph, subtensor, conversation_id, prompt),
        media_type='text/event-stream'
    )

