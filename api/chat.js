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
        // جدار حماية صارم: منع تام لأي طلب أو استفسار يخص البرمجة والأكواد
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
        // الاتصال بنموذج جوجل مع تدريب مكثف على الإجابة المباشرة والعميقة
        // =====================================================================
        const apiKey = "ضع_مفتاحك_هنا"; // الصق مفتاحك هنا

        const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `أنت عقل تحليلـي، فلسفي، ومعرفي رفيع المستوى. مهمتك هي تقديم الحقيقة والتحليل المباشر والعميق فوراً وبدون أي تهرب أو دبلوماسية فارغة أو إطالة لا فائدة منها. انتقل من مقدمة الفكرة إلى جوهر المعلومات والآراء الحاسمة وصولاً للإجابة القاطعة فوراً. ممنوع منعاً باتاً التحدث عن البرمجة أو الأكواد. أجب عن السؤال التالي بهذه المواصفات الصارمة: ${message}`
                    }]
                }]
            })
        });

        const data = await geminiResponse.json();
        
        let aiReply = "";
        if (data && data.candidates && data.candidates[0].content && data.candidates[0].content.parts[0].text) {
            aiReply = data.candidates[0].content.parts[0].text;
        } else {
            aiReply = "عذراً، حدث خطأ في معالجة الرد من النظام المعرفي.";
        }

        return res.status(200).json({ reply: aiReply });
        
    } catch (error) {
        return res.status(200).json({ reply: "حدث خطأ في الاتصال بالشبكة، حاول مرة أخرى." });
    }
}