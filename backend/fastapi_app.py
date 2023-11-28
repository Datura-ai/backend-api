from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from neurons.conversation_history import ConversationHistory
from routes.chat import router as chat_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
    max_age=3600,
)



app.include_router(chat_router)