import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from openai import OpenAI

# تحميل المتغيرات السرية من ملف .env
load_dotenv()

# تهيئة تطبيق FastAPI
app = FastAPI()

# إعداد الـ CORS للسماح للواجهة بالاتصال بالسيرفر
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# جلب المفتاح المخصص للعميل
api_key = os.getenv("")

# تهيئة عميل OpenAI ليعمل عبر بوابة Google Gemini
client = OpenAI(
    api_key=api_key,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

# نموذج استقبال الرسائل من الواجهة
class ChatRequest(BaseModel):
    message: str

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        # إرسال الرسالة إلى نموذج Gemini عبر واجهة OpenAI
        response = client.chat.completions.create(
            model="gemini-2.5-flash",  # أو النمط المناسب المعتمد لديك
            messages=[
                {"role": "user", "content": request.message}
            ]
        )
        
        reply = response.choices[0].message.content
        return {"reply": reply}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))