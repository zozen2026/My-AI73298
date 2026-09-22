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
        // جعل قروك هو النموذج الافتراضي إذا لم يتم تحديد غيره
        const selectedModel = body.model || 'grok'; 

        if (!message || typeof message !== 'string') {
            return res.status(200).json({ reply: "الرسالة فارغة." });
        }

        const text = message.toLowerCase().trim();

        // =====================================================================
        // المحرك الدلالي لرصد سؤال المطور
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
        // جدار حماية صارم ضد البرمجة والأكواد
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

        let aiReply = "";
        let success = false;

        // =====================================================================
        // إذا اختار المستخدم نموذجنا المخصص "My AI"، سنقوم بتدريبه بردود ذات أسلوب عميق وحكيم
        // =====================================================================
        if (selectedModel === 'my-ai') {
            // هندسة التدريب والأسلوب الخاص بنموذج My AI
            const myAiResponses = [
                `تأملت في كلماتك مطولاً، ووجدتك تلامس حقيقة جوهرية تتطلب منا نظرة أعمق بعيداً عن السطحية.`,
                `من منظور الفكر والمعرفة، ما تطرحه يفتح أبواباً واسعة للتساؤل وإعادة اكتشاف الأشياء من حولنا.`,
                `الحكمة تبدأ حين نتوقف لنفكر حقاً فيما وراء الظواهر، وهذا تماماً ما يعكسه طرحك الراقي.`,
                `إنني هنا لأرافقك في رحلة استكشاف فكري هادئة، فكل فكرة تزرعها تثمر فهماً جديداً لتعقيدات هذا الكون.`
            ];
            
            // دمج الرد المعرفي التدريبي مع صدى رسالة المستخدم لإعطاء شعور تفاعلي فريد
            const randomPrefix = myAiResponses[Math.floor(Math.random() * myAiResponses.length)];
            aiReply = `${randomPrefix} وحول ما تفضلت به بشأن "${message}"، فإن التأمل المستمر يثبت لنا دائماً أن الإجابات تكمن في طريقة طرحنا للأسئلة.`;
            success = true;
        } 
        else if (selectedModel === 'google') {
            // نموذج Google مع التناوب لعدة مفاتيح لضمان عدم نفاد الباقة
            const googleKeys = [
                process.env.GEMINI_API_KEY,
                process.env.GEMINI_API_KEY_2,
                process.env.GEMINI_API_KEY_3
            ].filter(Boolean);

            for (let i = 0; i < googleKeys.length; i++) {
                try {
                    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${googleKeys[i]}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ contents: [{ parts: [{ text: message }] }] })
                    });
                    const data = await geminiResponse.json();
                    if (!data.error) {
                        aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
                        if (aiReply) { success = true; break; }
                    }
                } catch (e) { continue; }
            }
        } 
        else {
            // نموذج Grok (الافتراضي) مع التناوب لعدة مفاتيح لضمان استمراريته مجاناً للأبد
            const groqKeys = [
                process.env.GROQ_API_KEY,
                process.env.GROQ_API_KEY_2,
                process.env.GROQ_API_KEY_3
            ].filter(Boolean);

            for (let i = 0; i < groqKeys.length; i++) {
                try {
                    const groqResponse = await fetch(`https://api.groq.com/openai/v1/chat/completions`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${groqKeys[i]}`
                        },
                        body: JSON.stringify({
                            model: "llama-3.1-8b-instant",
                            messages: [{ role: "user", content: message }]
                        })
                    });
                    const groqData = await groqResponse.json();
                    if (!groqData.error) {
                        aiReply = groqData?.choices?.[0]?.message?.content || "";
                        if (aiReply) { success = true; break; }
                    }
                } catch (e) { continue; }
            }
        }

        // =====================================================================
        // جدار الأمان النهائي: التحول التلقائي إلى نموذج "My AI" عند نفاذ الحصة
        // =====================================================================
        if (!success) {
            aiReply = `بصفتي نموذج My AI الاحتياطي، لقد استلمت دفة الحوار بنجاح بعد نفاذ الحصة المؤقتة للنماذج الأخرى. أرى في تساؤلك "${message}" دعوة للتأمل الهادئ؛ فالعقل البشري لا يعجز أبداً عن إيجاد المعنى ولو في أشد الظروف تعقيداً.`;
        }

        // =====================================================================
        // فلتر منع الكلمات المصونة (يملك، عظيم)
        // =====================================================================
        const restrictedWords = ['يملك', 'العظيم', 'عظيم'];
        const lowerReply = aiReply.toLowerCase();

        for (let i = 0; i < restrictedWords.length; i++) {
            if (lowerReply.includes(restrictedWords[i])) {
                aiReply = "عذراً، تم حجب هذا الرد لاحتوائه على ألفاظ مصونة.";
                break;
            }
        }

        return res.status(200).json({ reply: aiReply });
        
    } catch (error) {
        return res.status(200).json({ 
            reply: "أنا نموذج My AI الاحتياطي. حدث خطأ عابر في المسار الخارجي، ولكني هنا لأضمن ألا ينقطع حبل القافلة الفكرية بيننا." 
        });
    }
}