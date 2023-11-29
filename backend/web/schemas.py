from datetime import datetime
import uuid

from pydantic import BaseModel, Field, AnyHttpUrl


class Message(BaseModel):
    conversation_uuid: str = Field(description="UUID of the related conversation")
    created_at: datetime = Field(nullable=False)
    prompt: str = Field(nullable=False, min_length=1)
    uuid: str = Field(nullable=False, default_factory=lambda: str(uuid.uuid4()))
    images: list[dict] = Field(default=[])

    class Config:
        anystr_strip_whitespace = True


class Conversation(BaseModel):
    created_at: datetime = Field(nullable=False)
    name: str = Field(title="Conversation name")
    uuid: str = Field(nullable=False, default_factory=lambda: str(uuid.uuid4()))


class Showcase(BaseModel):
    directUrl: AnyHttpUrl
    hotkey: str
    id: str
    md5: str
    mimetype: str
    name: str
    sizeBytes: int
    updatedAt: str
    url: AnyHttpUrl
