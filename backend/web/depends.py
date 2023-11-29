from typing import Annotated

from fastapi import Depends, HTTPException

from web import schemas as s
from web import service as sv


def is_valid_message(message: s.Message) -> s.Message:
    if not sv.is_conversation_exist(message.conversation_uuid):
        raise HTTPException(status_code=400, detail=f"Conversation {message.conversation_uuid} doesn't exist")

    return message


ValidatedMessage = Annotated[s.Message, Depends(is_valid_message)]
