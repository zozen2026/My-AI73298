export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'مفتاح النظام مفقود في إعدادات المنصة.' });
        }

        const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: message }] }]
            })
        });

        const data = await geminiResponse.json();

        // التحقق مما إذا كان هناك ضغط عالٍ على الخوادم (خطأ 503)
        if (geminiResponse.status === 503 || (data.error && data.error.status === 'UNAVAILABLE')) {
            return res.status(200).json({ 
                reply: 'عذراً، عليه ضغط الآن لا يمكنني إجابتك. انتظر قليلاً ثم حاول مجدداً.' 
            });
        }

        if (data.candidates && data.candidates.length > 0) {
            const reply = data.candidates[0].content.parts[0].text;
            return res.status(200).json({ reply });
        } else {
            return res.status(500).json({ error: 'حدث استجابة غير متوقعة من النظام.' });
        }

    } catch (error) {
        return res.status(200).json({ 
            reply: 'عذراً، واجهنا ضغطاً مفاجئاً في الاتصال. يرجى الانتظار قليلاً وإعادة الإرسال.' 
        });
    }
}