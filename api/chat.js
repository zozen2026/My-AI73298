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

        // هنا يمكنك ربط الرد الذكي أو إرجاع رد تجريبي مؤكد لضمان عدم حدوث خطأ 500
        const reply = `أهلاً بك! لقد استلمت رسالتك بنجاح: "${message}". أنا جاهز لمساعدتك في كل ما تحتاجه عبر نظام My AI.`;

        return res.status(200).json({ reply: reply });
    } catch (error) {
        return res.status(500).json({ error: 'حدث خطأ في معالجة الطلب داخلياً' });
    }
}