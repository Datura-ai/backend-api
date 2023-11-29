from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from fastapi.staticfiles import StaticFiles
import wandb
import os
os.environ["WANDB_MODE"] = "disabled"
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
    max_age=3600,
)
app.mount("/images", StaticFiles(directory="static"), name="images")
def on_startup():
    run_path = "/cortex-t/synthetic-QA/runs/amczp753"
    api = wandb.Api()
    run = api.run(run_path)
    os.makedirs("static", exist_ok=True)
    for file in run.files():
        if file.name.endswith(".png") or file.name.endswith(".jpg"):
            file.download(root="static", exist_ok=True)
@app.on_event("startup")
async def startup_event():
    on_startup()
@app.get("/image-showcase")
async def read_root():
    directory = "static/media/images/"
    images = []
    for file in os.listdir(directory):
        if file.endswith((".png", ".jpg", ".jpeg", ".gif")):
            images.append(
                {
                    "src": "images/media/images/" + file,
                    "uId": ord(file[-5]),
                    "hotKey": ord(file[-6]),
                    "coldKey": ord(file[-7]),
                    "ipAddress": ord(file[-8]),
                }
            )
    return images