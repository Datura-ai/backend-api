import asyncio
import json

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from neurons.api import initialize, query_synapse_image, query_synapse_text

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

conversations = {}

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


def create_summary_prompt(uuid):
    if uuid not in conversations or 'messages' not in conversations[uuid]:
        return None

    # Concatenate all prompts and answers into a single text
    conversation_text = ' '.join([f"prompt: {message['prompt']}\n answer: {message['answer']}" for message in conversations[uuid]['messages']])

    # Create a prompt for generating a max 30-character summary
    summary_prompt = f"Tell me in less than 30 characters what is the topic of the following conversation: {conversation_text}"
    return summary_prompt

def process_message(message):
    return message[6:-1].strip()

async def set_conversation_summary(uuid):
    summary_prompt = create_summary_prompt(uuid)
    if not summary_prompt:
        return None

    summary_generator = query_synapse_text(dendrite, metagraph, subtensor, summary_prompt)
    summary_parts = [process_message(part) async for part in summary_generator]
    summary_text = ' '.join(summary_parts).strip()
    conversations[uuid]['summary'] = summary_text[:30]

def update_conversation_messages(uuid, prompt, response_parts):
    complete_response = ' '.join(response_parts)
    if uuid in conversations:
        conversations[uuid]['messages'].append({'prompt': prompt, 'answer': complete_response})
    else:
        conversations[uuid] = {'messages': [{'prompt': prompt, 'answer': complete_response}]}

async def custom_stream_generator(uuid, dendrite, metagraph, subtensor, prompt):
    response_parts = []  # Temporary list to accumulate response parts

    async for data in query_synapse_text(dendrite, metagraph, subtensor, prompt):
        # Remove 'data: ' prefix and trailing newlines, then append to the accumulator
        cleaned_data = process_message(data)
        response_parts.append(cleaned_data)        
        yield data

    # update the conversation
    update_conversation_messages(uuid, prompt, response_parts)
    
    # Generate a summary of the conversation
    await set_conversation_summary(uuid)


@app.post("/generate-text")
async def get_text(request: Request):
    try:
        body = await request.json()
        uuid = body.get('uuid')
        prompt = body.get('prompt')
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Cant decode JSON")
    if not prompt:
        raise HTTPException(status_code=400, detail="Prompt is required")

    return StreamingResponse(custom_stream_generator(uuid, dendrite, metagraph, subtensor, prompt), media_type='text/event-stream')

