import asyncio
import json

from fastapi import FastAPI, HTTPException, Request, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from neurons.api import initialize, query_synapse_image, query_synapse_text

from utils import verify_user

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


@app.post("/login", name="Login")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Auth Route to get authentication token for a given username, password.

    * **URL**
        `localhost:8000/token`

    * **Method**
        `[POST]`

    * **Headers**
        * `'accept: application/json'`
        * `'Content-Type: application/x-www-form-urlencoded'`

    * **Request Body**

        * `username (Required)`

            `string`

        * `password (Required)`

            `string`

    * **Response**
        ::

            HTTP/1.1 200 OK
            Date: Thu, 24 Feb 2011 12:36:30 GMT
            Status: 200 OK
            Content-Type: application/json
            Example:
                {   'message': 'Login Successful',
                    'data' : {
                            "access_token": "token value",
                            "refresh_token": "token value",
                        },
                }

    * **Error Response**
        ::

            HTTP/1.1 400 Invalid Params
            Status: 400 Invalid Params
            Content-Type: application/json
            Reasons:
            Inactive user
            Examples:
                {
                  "message": "Invalid username or password",
                  "data": null
                }
    """
    username = form_data.username
    password = form_data.password

    if not verify_user(username, password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    # TODO: Later we will use database for authentication and create JWT token
    access_token = "access token"
    refresh_token = "refresh token"
    response = {
        "message": "Login Successful",
        "data": {
            "access_token": access_token,
            "refresh_token": refresh_token,
        }
    }

    return response


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
