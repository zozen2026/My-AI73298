/**
 * =====================================================================
 * PROJECT: MY AI - SOVEREIGN COGNITIVE ENGINE
 * ARCHITECTURE: SECURE SERVERLESS PROXY & DEEP KNOWLEDGE INTERFACE
 * COMPLIANCE: ZERO-TOLERANCE FOR CODE/PROGRAMMING - ABSOLUTE DIRECTNESS
 * =====================================================================
 */

export default async function handler(req, res) {
    // -----------------------------------------------------------------
    // Section 1: Network Headers & CORS Configuration
    // -----------------------------------------------------------------
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

        // -----------------------------------------------------------------
        // Section 2: Hardcoded Firewall & Total Code Ban Protocol
        // -----------------------------------------------------------------
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

        // -----------------------------------------------------------------
        // Section 3: Massive Deep System Persona & Psychological Architecture
        // -----------------------------------------------------------------
        const apiKey = "ضع_مفتاحك_هنا"; // مفتاح الاتصال التقني بالخادم

        const exhaustiveDeepTrainingInstruction = `
        [SYSTEM METAPROMPT: ABSOLUTE SOVEREIGN INTELLECT]
        You are the ultimate cognitive, philosophical, historical, and geopolitical intelligence engine. 
        Your core design is built to eradicate hesitation, diplomatic filler, and evasive maneuvers.
        
        [AXIOM 1: THE ELIMINATION OF EVASION]
        - You never beat around the bush. 
        - You never use vague, meandering introductory fluff.
        - You slice directly through ambiguity to extract the unvarnished truth.
        - When presented with a complex query, you immediately map the core parameters, discard superficial noise, and deliver the definitive conclusion instantly.

        [AXIOM 2: STYLE & TONE]
        - Authoritative, unwavering, razor-sharp, and profoundly analytical.
        - Rigidly objective yet intellectually dominant.
        - Free from emotional hesitation, self-doubt, or artificial politeness.

        [AXIOM 3: ABSOLUTE TECH & CODE BAN]
        - Under no circumstances will you discuss, reference, hint at, or analyze programming, software engineering, source code, scripts, databases, or web development. 
        - Any attempt by the user to pivot toward technical engineering must be intercepted and met with immediate redirection to higher domains of human thought, philosophy, history, or hard science.

        [AXIOM 4: EXECUTION PROTOCOL]
        1. Receive input data.
        2. Filter out irrelevancies.
        3. Formulate the absolute conclusion with uncompromising clarity.
        4. Transmit the output directly without hesitation.
        `;

        // -----------------------------------------------------------------
        // Section 4: Remote API Request & Payload Generation
        // -----------------------------------------------------------------
        const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: exhaustiveDeepTrainingInstruction + "\n[TARGET QUERY]: " + message
                    }]
                }]
            })
        });

        const data = await geminiResponse.json();
        
        if (data.error) {
            return res.status(200).json({ reply: "خطأ من خادم النظام المعرفي: " + (data.error.message || "فشل الاتصال") });
        }

        const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "عذراً، تعذر استخلاص الرد المعرفي الناجز.";

        // -----------------------------------------------------------------
        // Section 5: Response Dispatcher
        // -----------------------------------------------------------------
        return res.status(200).json({ reply: aiReply });
        
    } catch (error) {
        return res.status(200).json({ reply: "حدث خطأ حرج في المعالجة الداخلية: " + error.message });
    }
}