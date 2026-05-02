import os
from dotenv import load_dotenv
from langchain_mistralai import ChatMistralAI
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()

llm =ChatMistralAI(
    model="mistral-small-2506",
    temperature=0.7,
    mistral_api_key=os.getenv("MISTRAL_API_KEY")
)

prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are an expert corporate communication assistant."
        ),
        (
            "human",
            """
Rewrite the following frustrated employee message into polished workplace language.

Tone: {tone}

Message: {text}

Rules:
- Keep meaning same
- Make it professional
- Keep concise
- Only return final rewritten sentence
"""
        )
    ]
)

def translate_message(text, tone):
    final_prompt = prompt.format_messages(
        tone=tone,
        text=text
    )

    response = llm.invoke(final_prompt)

    return response.content.strip()