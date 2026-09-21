import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv

# تحميل متغيرات البيئة محلياً
load_dotenv()

# قراءة مفتاح الـ API بأمان
api_key = os.getenv("OPENAI_API_KEY")

# إعداد العميل (متوافق مع OpenAI / Gemini)
client = OpenAI(
    api_key=api_key,
    base_url="https://api.openai.com/v1"
)

app = FastAPI(title="Autonomous AI Assistant API")

# السماح للواجهة بالاتصال بالسيرفر
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "أنت مساعد ذكاء اصطناعي متطور ومفيد."},
                {"role": "user", "content": request.message}
            ],
            max_tokens=500
        )
        reply_text = response.choices[0].message.content
        return {"reply": reply_text}
    except Exception as e:
        print(f"Error occurred: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def home():
    return {"status": "AI Server is running successfully!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)