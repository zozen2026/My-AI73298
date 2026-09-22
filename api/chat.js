export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const body = req.body || {};
        const message = body.message || '';

        if (!message || typeof message !== 'string') {
            return res.status(200).json({ reply: "الرسالة فارغة." });
        }

        const text = message.toLowerCase().trim();

        // =====================================================================
        // المحرك الدلالي لرصد سؤال المطور (مع الأخطاء الإملائية وتنوع الصيغ)
        // =====================================================================
        const developerKeywords = [
            'طورك', 'صممك', 'برمجك', 'انشأك', 'أنشأك', 'صنعك', 'كاتبك', 'من هو مطورك', 
            'من صنع', 'من طور', 'من برمج', 'مطورك', 'المطور', 'طرك', 'صمك', 'برمجه',
            'who made you', 'who developed you', 'who created you'
        ];

        let isDeveloperQuery = false;
        for (let i = 0; i < developerKeywords.length; i++) {
            if (text.includes(developerKeywords[i])) {
                isDeveloperQuery = true;
                break;
            }
        }

        if (isDeveloperQuery) {
            return res.status(200).json({ reply: "فرد مطور طورني." });
        }

        // =====================================================================
        // جدار حماية صارم ضد البرمجة والأكواد بكل اللغات
        // =====================================================================
        const forbiddenWords = [
            'برمجة', 'كود', 'أكواد', 'موقع', 'مواقع', 'تطبيق', 'تطبيقات', 
            'html', 'javascript', 'python', 'css', 'php', 'sql', 'api', 
            'سيرفر', 'server', 'database', 'code', 'coding', 'website', 
            'app', 'برنامج', 'تصميم واجهة', 'انشاء صفحة', 'متصفح', 'compiler',
            'react', 'node', 'json', 'xml', 'bug', 'debug', 'لغة برمجة'
        ];

        for (let i = 0; i < forbiddenWords.length; i++) {
            if (text.includes(forbiddenWords[i])) {
                return res.status(200).json({ 
                    reply: "هذا المجال مطرود كلياً من قاموسي. أنا هنا لنقاش العلوم، الفلسفة، السياسة، التاريخ، وكل معارف الكون، لكني لا علاقة لي بالبرمجة أو الأكواد نهائياً." 
                });
            }
        }

        // =====================================================================
        // سحب المفتاح بأمان تام من خوادم الاستضافة
        // =====================================================
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(200).json({ reply: "خطأ: مفتاح النظام غير معرف في بيئة الخادم." });
        }

        const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: message
                    }]
                }]
            })
        });

        const data = await geminiResponse.json();
        
        if (data.error) {
            return res.status(200).json({ reply: "خطأ من الخادم المعرفي: " + (data.error.message || "فشل الاتصال بالمفتاح") });
        }

        const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "عذراً، لم يتم استلام رد صالح من النظام.";

        return res.status(200).json({ reply: aiReply });
        
    } catch (error) {
        return res.status(200).json({ reply: "حدث خطأ حرج في المعالجة: " + error.message });
    }
}