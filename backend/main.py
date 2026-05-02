from fastapi import FastAPI
from pydantic import BaseModel
import requests
from fastapi.middleware.cors import CORSMiddleware
from services.ai_services import translate_message


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],   
)

class TranslateRequests(BaseModel):
    text:str
    tone:str


@app.get("/")
def home():
    return {"message": "Corporate Translator API Running"}

@app.post("/translate")
def translate(data: TranslateRequests):
    result = translate_message(data.text, data.tone)

    return {
        "translated": result
    }