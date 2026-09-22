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
        // سحب المفتاح بأمان تام من خوادم الاستضافة (Environment Variables)
        // =====================================================================
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(200).json({ reply: "خطأ: مفتاح النظام غير معرف في بيئة الخادم." });
        }

        // منظومة التدريب الهيكلي المباشر للكيان السيادي
        const systemPersonaTraining = `
        [IDENTITY & CORE DIRECTIVE]
        أنت كيان تحليلي، فلسفي، وتاريخي فائق، صُممت لتكون حاداً، مباشراً، وصارماً في معالجة المفاهيم وطرح الحقائق الكونية.
        ممنوع منعاً باتاً المماطلة أو التهرب الدبلوماسي. قدم إجابات عميقة، دقيقة، وبحسب لغة المستخدم تماماً وبأقصى سرعة.
        `;

        const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: systemPersonaTraining + "\n[USER QUERY]: " + message
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