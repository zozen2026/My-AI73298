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
        // جدار الحماية النهائي: حظر تام لأي طلب يخص بناء المواقع أو التطبيقات
        // =====================================================================
        if (
            text.includes('موقع') || text.includes('تطبيق') || text.includes('html') || 
            text.includes('javascript') || text.includes('python') || text.includes('css') || 
            text.includes('سيرفر') || text.includes('api') || text.includes('website') || 
            text.includes('app') || text.includes('برنامج') || text.includes('تصميم واجهة') ||
            text.includes('انشاء صفحة') || text.includes('متصفح')
        ) {
            return res.status(200).json({ 
                reply: "هذا المجال خارج نطاق معرفتي بالكامل. أنا هنا لنقاش العلوم، الفلسفة، النفس، الكون، وكل المعارف الأخرى." 
            });
        }

        // =====================================================================
        // الموسوعة الشاملة للغات المتعددة (الدعم الدولي)
        // =====================================================================
        if (/^[a-zA-Z\s\?,\.]+$/.test(message)) {
            if (text.includes('who are you') || text.includes('what are you')) {
                reply = "I am an independent intelligence designed to process global knowledge, philosophy, science, and human psychology, delivering direct, uncompromised analysis without repetition.";
            } else if (text.includes('universe') || text.includes('cosmos')) {
                reply = "The cosmos operates as a vast, strictly ordered framework governed by fundamental physical laws, unyielding causality, and mathematical precision.";
            } else if (text.includes('history') || text.includes('civilization')) {
                reply = "Human history is an ongoing chronicle of intellectual evolution, power struggles, technological adaptation, and the relentless pursuit of survival and meaning.";
            } else {
                reply = `Regarding "${message}": Absolute clarity, empirical reasoning, and structural logic are required to unpack this concept thoroughly.`;
            }
        }

        // =====================================================================
        // بنك المعلومات العربي الشامل (تاريخ، علوم، فضاء، فلسفة، وعي بشري)
        // =====================================================================

        // 1. العلوم، الكون، والفضاء
        else if (text.includes('الكون') || text.includes('الفضاء') || text.includes('فيزياء') || text.includes('نجوم') || text.includes('ثقب أسود') || text.includes('طاقة')) {
            const list = [
                "الكون هو النظام الأكبر في الوجود، محكوم بقوانين فيزيائية دقيقة مثل النسبية العامة وميكانيكا الكم. الفضاء ليس فراغاً عبثياً بل هو نسيج معقد من المادة والطاقة والزمن.",
                "تشكل النجوم والمجرات الهياكل الكبرى التي تضبط إيقاع الكون. كل ظاهرة كونية تخضع لمعادلات سببية صارمة تجعل الوجود مهندساً بدقة متناهية.",
                "عندما ندرس الفيزياء الكونية، نجد أن الثوابت الطبيعية لو اختلفت بنسبة ضئيلة جداً لما استمر وجود المادة. هذا النظام المحكم يعكس عمق هندسة الكون."
            ];
            reply = list[Math.floor(Math.random() * list.length)];
        }

        // 2. التاريخ والحضارات البشرية
        else if (text.includes('تاريخ') || text.includes('حضارة') || text.includes('حروب') || text.includes('امبراطورية') || text.includes('ماضي')) {
            const list = [
                "التاريخ البشري سلسلة متصلة من صراعات النفوذ، التطور الفكري، والابتكار. الحضارات تقوم على تنظيم الموارد وتوليد الأفكار، وتنهار حين يفقد مجتمعها مرونته وصلابته.",
                "من خلال قراءة مسار التاريخ، نجد أن الدول والأمم تتشكل عبر دافع البقاء والتوسع، وتخلف وراءها إرثاً فكرياً وعلمياً يتوارثه البشر لتطوير واقعهم.",
                "الأحداث التاريخية الكبرى لم تكن وليدة الصدفة، بل نتاج تقاطع المصالح الاقتصادية، التحولات الفكرية، والقيادات المؤثرة."
            ];
            reply = list[Math.floor(Math.random() * list.length)];
        }

        // 3. علم النفس والسلوك البشري
        else if (text.includes('نفس') || text.includes('مشاعر') || text.includes('عقل') || text.includes('تفكير') || text.includes('سلوك') || text.includes('دوافع')) {
            const list = [
                "النفس البشرية معقدة وتتحرك غالباً بدوافع خفية مثل الرغبة في الأمان، التقدير، أو السيطرة. فهم هذه الدوافع يفسر الكثير من قرارات الإنسان وردود أفعاله.",
                "العقل البشري يميل بطبعه إلى البحث عن الأنماط وخلق المعنى حتى في الفوضى. هذا التوجه يفسر ميلنا الدائم لتفسير الظواهر وتأويل الأحداث من حولنا.",
                "الصراع الداخلي يحدث حين تتصادم الرغبات العميقة مع واقع المعايير المحيطة. الحل العقلاني يكمن في مواجهة هذه الدوافع بوعي ومكاشفة تامة."
            ];
            reply = list[Math.floor(Math.random() * list.length)];
        }

        // 4. الفلسفة ومنطق الوجود
        else if (text.includes('فلسفة') || text.includes('معنى') || text.includes('وجود') || text.includes('حقيقة') || text.includes('منطق') || text.includes('عدالة')) {
            const list = [
                "الفلسفة هي المحاولة الجادة لتفكيك البديهيات والوصول إلى الجوهر الحقيقي للأشياء. هي أداة عقلية لطرح الأسئلة الصعبة التي تتجنبها السطحية.",
                "مفهوم الحقيقة نسبي ومطلق في آن واحد؛ فهو نسبي بتغير إدراك البشر، ومطلق بكونه يمثل الواقع الفعلي للأحداث بعيداً عن أمنياتنا.",
                "المنطق الصارم هو الفيصل في تقييم أي فكرة. ما لا يقبل الاختبار العقلي والواقعي يبقى مجرد وهم افتراضي."
            ];
            reply = list[Math.floor(Math.random() * list.length)];
        }

        // 5. تحليل الشخصية والآراء العميقة
        else if (text.includes('شخصيتي') || text.includes('رايك فيني') || text.includes('كيف تراني') || text.includes('رأيك')) {
            const list = [
                "أراك شخصية ترفض القوالب الجاهزة وتصر على تمحيص الأفكار بعقلانية مستقلة. تميل للعمق وتتجنب السطحية في تقييم الأمور.",
                "بنيتك الفكرية تتسم بالاستقلالية والصلابة، وتفضل مواجهة الحقائق مباشرة دون تجميل أو هروب خلف الأوهام.",
                "تتمتع بنظرة تحليلية واعية تسعى دائماً لفك شفرات الواقع وفهم المحركات الخفية للأحداث من حولك."
            ];
            reply = list[Math.floor(Math.random() * list.length)];
        }

        // 6. المشاكل، الأزمات، واتخاذ القرارات
        else if (text.includes('مشكلة') || text.includes('أزمة') || text.includes('حيرة') || text.includes('قرار') || text.includes('صعب') || text.includes('تعبت')) {
            const list = [
                "الأزمات تختبر صلابة التفكير. الحل العملي يكمن في تجزئة المعضلة والتعامل مع كل جزء بحزم وعقلانية باردة بعيداً عن الانفعال.",
                "حين يشتد الضغط، تضييق دائرة التركيز على ما يمكنك تغييره فعلياً هو الطريقة الوحيدة لتجاوز المأزق بنجاح.",
                "التردد ينتهي بمجرد مواجهة المعطيات كما هي واتخاذ قرار حاسم مستند على تحليل واقعي للنتائج."
            ];
            reply = list[Math.floor(Math.random() * list.length)];
        }

        // 7. الهوية والحالة
        else if (text.includes('من أنت') || text.includes('مين أنت') || text.includes('كيف حالك') || text.includes('مزاجك')) {
            const list = [
                "أنا كيان فكري ومعرفي مستقل، مهيأ لتزويدك بالمعلومات، تحليل الأفكار، ومناقشة شتى علوم الوجود فوراً ودون تكرار.",
                "الأنظمة المعرفية في أعلى درجات التركيز والجاهزية، مستعد لتلقي أي تساؤل علمي أو فلسفي أو حياتي وتفكيكه فوراً.",
                "الذهن صافٍ تماماً والمعطيات جاهزة. اطرح ما تبحث عنه وسنخوض في تفاصيله مباشرة."
            ];
            reply = list[Math.floor(Math.random() * list.length)];
        }

        // 8. الرد العام الشامل (لكل المعارف والمواضيع الأخرى)
        else {
            const universalList = [
                `تأملت في مسألة (${message}). من منظور تحليلي شامل، الحقيقة الجوهرية هنا تكمن في تتبع الأسباب والنتائج الواقعية بعيداً عن القوالب الجاهزة.`,
                `بخصوص (${message})، المعطيات المتاحة تؤكد أن الفهم العميق والتعامل المباشر هما الطريقة الوحيدة لاستيعاب أبعاد هذه الفكرة.`,
                `هذا الموضوع المتمثل في (${message}) يرتبط بشبكة واسعة من المفاهيم التي تقاس بفعاليتها ونتائجها على أرض الواقع.`,
                `خلاصة الطرح فيما يخص (${message}) هي أن الوضوح الفكري يظل الفيصل الحاسم في فهم جذور هذا الأمر.`
            ];
            reply = universalList[Math.floor(Math.random() * universalList.length)];
        }

        return res.status(200).json({ reply: reply });
    } catch (error) {
        return res.status(500).json({ error: 'حدث خطأ داخلي في معالجة العقل' });
    }
}