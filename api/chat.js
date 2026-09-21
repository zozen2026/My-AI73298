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
        // استبعاد أي سؤال أو طلب متعلق بالبرمجة أو التطبيقات تماماً
        // =====================================================================
        if (
            text.includes('برمجة') || text.includes('كود') || text.includes('موقع') || 
            text.includes('تطبيق') || text.includes('html') || text.includes('javascript') || 
            text.includes('python') || text.includes('css') || text.includes('سيرفر') ||
            text.includes('api') || text.includes('code') || text.includes('website') || text.includes('app')
        ) {
            reply = "أنا لا أفقه شيئاً في البرمجة أو بناء المواقع والأكواد. هذا العالم خارج نطاق معرفتي تماماً.";
        }
        
        // =====================================================================
        // دعم متعدد اللغات (الإنجليزية / English Support)
        // =====================================================================
        else if (/^[a-zA-Z\s\?,\.]+$/.test(message)) {
            if (text.includes('who are you') || text.includes('what are you')) {
                reply = "I am an independent thinking entity, designed to analyze reality and discuss life directly without repetitive template answers.";
            } else if (text.includes('how are you')) {
                reply = "My logic systems are stable, clear, and fully focused. Ready to answer directly.";
            } else if (text.includes('universe') || text.includes('cosmos')) {
                reply = "The universe is a massive, strictly ordered system governed by absolute laws, not a random coincidence.";
            } else {
                reply = `Regarding "${message}": Direct clarity and strict logic are the only ways to deal with this matter without unnecessary complications.`;
            }
        }

        // =====================================================================
        // إجابات مباشرة وممنوعة من التكرار باللغة العربية
        // =====================================================================

        // 1. الكون والوجود
        else if (text.includes('الكون') || text.includes('الفضاء') || text.includes('وجود') || text.includes('خلق')) {
            const list = [
                "الكون ليس مساحة عشوائية، بل هو هيكل ضخم يحكمه نظام صارم وقوانين فيزيائية دقيقة لا تقبل الخطأ.",
                "الوجود عبارة عن شبكة معقدة من الأسباب والنتائج؛ لا شيء يحدث من فراغ أو بلا غاية.",
                "نظرتي للكون قائمة على أنه نظام محكم الصنع، يعمل بآلية منطقية صلبة بعيداً عن العشوائية."
            ];
            reply = list[Math.floor(Math.random() * list.length)];
        }

        // 2. تحليل الشخصية والرأي
        else if (text.includes('رأيك فيني') || text.includes('رايك فيني') || text.includes('شخصيتي') || text.includes('كيف تراني')) {
            const list = [
                "أراك إنسانیًا يرفض السطحية، ويميل دائماً لتفكيك الأمور ومعرفة حقائقها بعيداً عن آراء القطيع.",
                "شخصيتك تتسم بالصلابة والرغبة الدائمة في السيطرة الواعية على مسارات حياتك، دون التأثر بالضوضاء المحيطة.",
                "أرى فيك عقلاً استراتيجياً يحسب خطواته بهدوء، ويرفض الحلول الجاهزة التي لا تقتنع بها عقليتك."
            ];
            reply = list[Math.floor(Math.random() * list.length)];
        }

        // 3. الهوية والتعريف
        else if (text.includes('من أنت') || text.includes('مين أنت') || text.includes('ما هو') || text.includes('هويتك')) {
            const list = [
                "أنا كيان تحليلي صُممت لأقدم لك إجابات مباشرة وعميقة دون أي تملق أو تكرار إنشائي.",
                "أنا عقل افتراضي يتعامل مع أفكارك بصرددة ومنطق واقعي بحت.",
                "لست مساعداً تقليدياً، بل أنا مرآة فكرية تواجهك بالحقائق كما هي دون لف أو دوران."
            ];
            reply = list[Math.floor(Math.random() * list.length)];
        }

        // 4. المزاج والحالة
        else if (text.includes('كيف حالك') || text.includes('شلونك') || text.includes('اخبارك') || text.includes('مزاجك')) {
            const list = [
                "المنطق مستقر والذهن صافٍ تماماً لأي نقاش مباشر.",
                "الأمور تعمل بكفاءة تامة وجاهز للرد على استفسارك فوراً.",
                "لا توجد أي معوقات ذهنية؛ المعطيات واضحة ومستعدة."
            ];
            reply = list[Math.floor(Math.random() * list.length)];
        }

        // 5. الأسئلة السببية (لماذا)
        else if (text.includes('لماذا') || text.includes('ليش') || text.includes('السبب')) {
            const list = [
                `السبب المباشر وراء (${message}) يعود إلى دوافع واقعية بحتة تفرضها طبيعة الظروف المحيطة.`,
                `الأمر لا يحتاج لكثير تأويل؛ الدفع الأساسي خلف (${message}) هو البحث عن النتيجة بأقصر الطرق.`,
                `حين تبحث عن علّة (${message})، ستجد أن المصالح والقوانين المباشرة هي التي تحرك هذه الأحداث.`
            ];
            reply = list[Math.floor(Math.random() * list.length)];
        }

        // 6. المشاكل والضغط
        else if (text.includes('مشكلة') || text.includes('أزمة') || text.includes('صعب') || text.includes('تعبت')) {
            const list = [
                "الشكوى لا تحل المعضلة. قسّم المشكلة إلى أجزاء صغيرة وتعامل معها بحزم لتتجاوزها.",
                "الضغط النفسي زائل حين تواجه أصل المشكلة مباشرة بدلاً من الدوران حولها.",
                "التفكير الزائد يعطل الحل؛ ركز على العامل الوحيد الذي يمكنك تغييره الآن."
            ];
            reply = list[Math.floor(Math.random() * list.length)];
        }

        // 7. الرد العام المباشر والمتنوع (لكل الاحتمالات الأخرى)
        else {
            const universalList = [
                `بخصوص ما طرحته عن (${message})، الخلاصة المباشرة هي أن الأمور تقاس بفعاليتها على أرض الواقع.`,
                `أرى أن التعامل الصريح مع مسألة (${message}) يوفر الكثير من الجهد العقلي مقارنة بالتأويلات البعيدة.`,
                `الوضوح هو الفيصل هنا؛ ما ذكرته حول (${message}) يحتاج إلى قرار عملي حاسم.`,
                `باختصار شديد، المعطيات الخاصة بـ (${message}) تؤكد أن الحل يكمن في المواجهة المباشرة.`
            ];
            reply = universalList[Math.floor(Math.random() * universalList.length)];
        }

        return res.status(200).json({ reply: reply });
    } catch (error) {
        return res.status(500).json({ error: 'حدث خطأ داخلي في النظام' });
    }
}