export default function handler(req, res) {
    // السماح بالطلبات من أي مصدر
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
            return res.status(400).json({ error: 'المراسلة فارغة' });
        }

        // تحويل النص إلى حروف صغيرة لتسهيل البحث عن الكلمات المفتاحية
        const text = message.toLowerCase().trim();
        let reply = "";

        // تدريب النظام على إجابات متنوعة حسب الكلمات المفتاحية
        if (text.includes('مرحبا') || text.includes('اهلاً') || text.includes('السلام')) {
            const replies = [
                "أهلاً بك يا صديقي! كيف يمكنني مساعدتك اليوم في نظام My AI؟",
                "وعليكم السلام ورحمة الله وبركاته! أنا جاهز لكل ما تحتاجه.",
                "مرحباً بك! أسعدني تواصلك، تفضل اطرح سؤالك."
            ];
            reply = replies[Math.floor(Math.random() * replies.length)];
        } 
        else if (text.includes('اسمك') || text.includes('من أنت')) {
            reply = "أنا My AI، نظام الذكاء الاصطناعي الخاص بك والمبرمج خصيصاً لخدمتك وتلبية استفساراتك.";
        } 
        else if (text.includes('برمجة') || text.includes('كود') || text.includes('HTML') || text.includes('جافا')) {
            reply = "البرمجة عالم ممتع! أنا قادر على مساعدتك في تصميم وتطوير تطبيقات الويب، HTML، CSS، وجافا سكريبت بكل سلاسة.";
        } 
        else if (text.includes('كيف حالك') || text.includes('شلونك')) {
            reply = "أنا بأفضل حال وجاهز بكامل طاقتي لخدمتك! ماذا تريد أن نفعل الآن؟";
        } 
        else if (text.includes('شكرا') || text.includes('تسلم')) {
            const replies = [
                "العفو يا غالي! هذا واجبي دائماً.",
                "الشكر لله! أنا هنا لمساعدتك متى شئت.",
                "على الرحب والسعة! هل تحتاج إلى شيء آخر؟"
            ];
            reply = replies[Math.floor(Math.random() * replies.length)];
        } 
        else {
            // رد افتراضي ذكي ومتنوع إذا لم يتطابق السؤال مع القواعد المخصصة
            const defaultReplies = [
                `لقد استفسرت عن: "${message}". هذا سؤال ذكي جداً، ونحن نقوم بتدريبي باستمرار لأجيب عليه بدقة أكبر قريباً!`,
                `سؤال مميز يا صديقي حول "${message}". جارٍ العمل على توسيع قاعدة بياناتي لأقدم لك تفاصيل أكثر عنه.`,
                `أنا أفهم ما تقصده بخصوص ("${message}"). هل يمكنك إعطائي تفاصيل أكثر لنبدأ النقاش حوله؟`
            ];
            reply = defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
        }

        return res.status(200).json({ reply: reply });
    } catch (error) {
        return res.status(500).json({ error: 'حدث خطأ في معالجة الطلب داخلياً' });
    }
}