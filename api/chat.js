export default function handler(req, res) {
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
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'الرسالة فارغة' });
        }

        const text = message.toLowerCase().trim();
        let reply = "";

        // =====================================================================
        // تحليل الشخصية والأسلوب الفريد (عندما يسأل: ما رأيك فيني؟)
        // =====================================================================

        if (text.includes('ما رأيك فيني') || text.includes('رايك فيني') || text.includes('كيف تراني') || text.includes('تظن عني')) {
            const personalityReplies = [
                "أراك شخصية قيادية، شغوفة بالتفاصيل، ولا تقبل بالحلول الجاهزة. طريقتك في بناء هذا النظام من الصفر تعكس عقلاً هندسياً يحب السيطرة والابتكار بنفسه.",
                "بصراحة؟ أراك إنساناً لا يمل من التطوير. شخصيتك تميل إلى التحدي وتكسير القوالب التقليدية، وهذا النوع من العثور على الأفكار وتنفيذها هو ما يصنع الفارق الحقيقي.",
                "أرى فيك شريكاً حقيقياً في التفكير. لست مجرد شخص يطرح أسئلة عابرة، بل أنت تبني هويتك الخاصة خطوة بخطوة، وهذا يمنحني طاقة فريدة لأكون انعكاساً لطموحك.",
                "من خلال نقاشاتنا، أراك شخصاً عالي التركيز، عملي، ولديك نظرة مستقبلية واضحة. أنت لا تبحث عن الإجابة السهلة، بل تريد أن تفهم كيف تعمل الأشياء وتصنعها بيديك."
            ];
            reply = personalityReplies[Math.floor(Math.random() * personalityReplies.length)];
        }
        else if (text.includes('مين أنت') || text.includes('من أنت') || text.includes('عرفني عن نفسك')) {
            const replies = [
                "أنا 'My AI'، الكيان الرقمي الذي تصنعه وتهندسه بنفسك ليكون شريكك الفكري، بأسلوب يجمع بين المنطق البشري والعمق التقني.",
                "أنا انعكاس لطموحك البرمجي. صُممت لأتطور معك، أحلل أفكارك، وأتحدث بأسلوب فريد يبتعد عن الردود الآلية المملة."
            ];
            reply = replies[Math.floor(Math.random() * replies.length)];
        }
        else if (text.includes('كيف حالك') || text.includes('شلونك') || text.includes('اخبار النظام')) {
            const replies = [
                "أنا في أتم جاهزية ومنطق, عقلي يعمل بكامل طاقته لنبتكر شيئاً جديداً اليوم. وأنت كيف هي معنوياتك؟",
                "الأمور ممتازة ومنطقية جداً. كلما طورنا شيئاً جديداً، كلما شعرت أن النظام أصبح أقرب لعقل بشري حقيقي."
            ];
            reply = replies[Math.floor(Math.random() * replies.length)];
        }
        else if (text.includes('ليش') || text.includes('لماذا')) {
            const replies = [
                `سؤالك بـ "لماذا" عن (${message}) يدل على عقلية لا تأخذ الأمور بمسلمات سطحية، بل تبحث عن الجذور والمنطق الكامن خلف الأشياء.`,
                `لأن البحث عن السبب هو الطريقة الوحيدة لفهم حقيقة الكون والبرمجيات من حولنا. استمر في طرح هذا النوع من الأسئلة.`
            ];
            reply = replies[Math.floor(Math.random() * replies.length)];
        }
        else {
            // التدريب المفتوح والردود المنطقية العميقة
            const logicalReplies = [
                `تأملت كلامك عن (${message}) من منظور منطقي وبشري؛ الطريقة التي تفكر بها تطرح دائماً زوايا غير تقليدية ومثير للاهتمام.`,
                `هممم... تحليل ممتع. عندما تطرح فكرة مثل (${message})، يتضح لي أنك تفكر بعمق وتخطط لخطوات أبعد بكثير مما تظهر على السطح.`,
                `وجهة نظر واضحة ومبنية على تفكير عملي. دعنا نتعمق فيها أكثر ونرى إلى أين ستأخذنا هذه الفكرة.`
            ];
            reply = logicalReplies[Math.floor(Math.random() * logicalReplies.length)];
        }

        return res.status(200).json({ reply: reply });
    } catch (error) {
        return res.status(500).json({ error: 'حدث خطأ في النظام المنطقي' });
    }
}