from collections.abc import Generator
from datetime import datetime
from typing import Any
import json

import redis

from neurons.api import query_synapse_image, query_synapse_text
from web import schemas as s


RedisClient = redis.Redis(host="redis", port="6379", db=0, password="")


def fetch_conversations() -> list[s.Conversation]:
    raw_conversations = RedisClient.lrange("current_user_id:conversations", 0, -1)

    conversations = []
    for raw_conversation in raw_conversations:
        conversation_out = json.loads(raw_conversation.decode())
        conversations.append(s.Conversation(**conversation_out))

    return conversations


def fetch_messages(conversation_uuid: str) -> list[s.Message]:
    raw_messages = RedisClient.lrange(f"conversation:{conversation_uuid}:messages", 0, -1)

    messages = []
    for raw_message in raw_messages:
        message_out = json.loads(raw_message.decode())
        messages.append(s.Message(**message_out))

    return messages


def create_conversation(name: str) -> s.Conversation:
    conversation_in = s.Conversation(name=name, created_at=datetime.utcnow())
    pipe = RedisClient.pipeline()
    pipe.lpush(f"current_user_id:conversations", conversation_in.json())
    pipe.set(f"conversation:{conversation_in.uuid}", "1")
    pipe.execute()

    return conversation_in


def is_conversation_exist(uuid_key: str) -> bool:
    raw_result = RedisClient.get(f"conversation:{uuid_key}")
    return raw_result and len(raw_result.decode()) > 0


def query_text(dendrite: Any, metagraph: Any, subtensor: Any, message: s.Message) -> Generator[str, Any, None]:
    RedisClient.lpush(f"conversation:{message.conversation_uuid}:messages", message.json())

    prompt = message.prompt
    # Note. Here is a place to pre-process all prompts from the sv.fetch_conversations()
    return query_synapse_text(dendrite, metagraph, subtensor, prompt)


async def query_image(dendrite: Any, metagraph: Any, subtensor: Any, message: s.Message) -> s.Message:
    generated_images = await query_synapse_image(dendrite, metagraph, subtensor, message.prompt)

    images = [
        image.deserialize()
        for image in generated_images
    ]

    new_message = s.Message(
        conversation_uuid=message.conversation_uuid,
        created_at=datetime.utcnow(),
        images=images,
        prompt=message.prompt,
    )
    RedisClient.lpush(f"conversation:{new_message.conversation_uuid}:messages", new_message.json())
    return new_message
