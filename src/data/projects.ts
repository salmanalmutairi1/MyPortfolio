export type LocalizedText = {
  en: string;
  ar: string;
};

export type ProjectCaseSection = {
  id: string;
  title: LocalizedText;
  body: LocalizedText[];
  variant?: 'list' | 'paragraphs';
};

// Enhanced feature with icon and description
export type ProjectFeatureDetailed = {
  title: LocalizedText;
  description: LocalizedText;
  icon: string; // Lucide icon name
};

// Project context (program, duration, cohort)
export type ProjectContext = {
  program?: LocalizedText;
  duration?: LocalizedText;
  cohort?: LocalizedText;
};

// Project metric with value and icon
export type ProjectMetric = {
  label: LocalizedText;
  value: LocalizedText;
  icon: string; // Lucide icon name
};

export type ProjectData = {
  slug: string;
  title: LocalizedText;
  shortDescription: LocalizedText;
  overview: LocalizedText; // Extended overview with "why"
  projectType: LocalizedText;
  role: LocalizedText;
  roleDetailed?: LocalizedText; // Extended role description
  goals?: LocalizedText[]; // Project goals as bullet points
  context?: ProjectContext; // Program/duration/cohort
  keyFeatures: LocalizedText[];
  keyFeaturesDetailed?: ProjectFeatureDetailed[]; // Enhanced features with icons
  metrics?: ProjectMetric[]; // Impact metrics
  biggestChallenge: LocalizedText;
  solution: LocalizedText;
  impact: LocalizedText;
  techStack: string[];
  caseStudy: {
    sections: ProjectCaseSection[];
  };
  audio: {
    en: string;
    ar: string;
  };
};

export const PROJECTS: ProjectData[] = [
  {
    slug: 'ksumarket',
    title: {
      en: 'KSUMarket',
      ar: 'KSUMarket'
    },
    shortDescription: {
      en: 'A mobile marketplace for KSU students to buy, sell, and exchange university essentials with trust built in.',
      ar: 'تطبيق سوق متنقل لطلاب جامعة الملك سعود للبيع والشراء والتبادل الاحتياجات الجامعية بموثوقية عالية.'
    },
    overview: {
      en: 'KSUMarket is a mobile marketplace platform built exclusively for King Saud University students to buy and sell items in a fast, structured, and reliable way on campus. The project aimed to replace random, unorganized selling methods with a real marketplace experience — clear listings, direct messaging, and smooth user flows that build trust.',
      ar: 'KSUMarket هو تطبيق سوق متنقل حصري لطلاب جامعة الملك سعود، مصمم لتسهيل البيع والشراء داخل الحرم الجامعي بطريقة سريعة ومنظمة وموثوقة. الهدف من المشروع كان تحويل التجربة من إعلانات عشوائية إلى منصة تحاكي المتاجر الحقيقية: عرض واضح للمنتج، تواصل مباشر، وتجربة استخدام منظمة تقلل التشتت وتزيد الثقة بين الطرفين.'
    },
    goals: [
      {
        en: 'Enable students to trade items safely and efficiently within the university community',
        ar: 'تمكين الطلاب من بيع وشراء المنتجات بسهولة داخل الجامعة'
      },
      {
        en: 'Improve trust and clarity compared to unstructured social media selling',
        ar: 'توفير تجربة منظمة بدل الاعتماد على منشورات غير واضحة أو غير موثوقة'
      },
      {
        en: 'Reduce listing effort while increasing listing quality',
        ar: 'تقليل وقت إنشاء الإعلان وتحسين جودة تفاصيل المنتج'
      }
    ],
    projectType: {
      en: 'Mobile',
      ar: 'تطبيق جوال'
    },
    role: {
      en: 'Lead development and deployment engineer, UI/UX owner.',
      ar: 'مهندس تطوير ونشر رئيسي، ومصمم واجهة وتجربة المستخدم.'
    },
    roleDetailed: {
      en: 'I led the development and deployment end-to-end and owned the complete UI/UX experience. My focus was shipping a real usable product by designing clean user journeys, building scalable flows, and ensuring stability inside the university environment.',
      ar: 'قدت التطوير والنشر من البداية للنهاية، وتولّيت مسؤولية تصميم وتنفيذ تجربة المستخدم وواجهة التطبيق بالكامل. ركزت على بناء منتج قابل للاستخدام فعليًا، مع بنية واضحة وتدفقات استخدام عملية، وضمان الاستقرار خصوصًا داخل بيئة الجامعة.'
    },
    metrics: [
      {
        label: { en: 'Active Users', ar: 'المستخدمين' },
        value: { en: '100+', ar: '+100' },
        icon: 'Users'
      },
      {
        label: { en: 'Platform', ar: 'المنصة' },
        value: { en: 'iOS & Android', ar: 'iOS & Android' },
        icon: 'Smartphone'
      },
      {
        label: { en: 'Core Tech', ar: 'التقنية' },
        value: { en: 'Flutter + Firebase', ar: 'Flutter + Firebase' },
        icon: 'Layers'
      }
    ],
    keyFeatures: [
      {
        en: 'In-app chat messaging between users.',
        ar: 'نظام مراسلة فوري داخل التطبيق بين المستخدمين.'
      },
      {
        en: 'AI agent that auto-fills listing details when posting items.',
        ar: 'وكيل ذكاء اصطناعي يملأ تفاصيل الإعلانات تلقائياً عند نشر المنتجات.'
      },
      {
        en: 'Vendor web flow for managing listings at scale.',
        ar: 'واجهة ويب للبائعين لإدارة الإعلانات بكفاءة عالية.'
      }
    ],
    keyFeaturesDetailed: [
      {
        title: { en: 'Real-time In-App Chat', ar: 'محادثة فورية داخل التطبيق' },
        description: {
          en: 'Built direct messaging between buyers and sellers to support faster and smoother transactions without leaving the app.',
          ar: 'لتمكين التواصل المباشر بين البائع والمشتري بسرعة، ودعم اتخاذ القرار بدون خروج من التطبيق.'
        },
        icon: 'MessageCircle'
      },
      {
        title: { en: 'AI-Assisted Posting', ar: 'نشر مدعوم بالذكاء الاصطناعي' },
        description: {
          en: 'Implemented an AI agent that helps users create listings faster by auto-filling details, improving speed and listing quality.',
          ar: 'لتقليل الجهد على المستخدم عبر تعبئة تفاصيل الإعلان تلقائيًا مثل العنوان والوصف والتصنيف، مما يرفع جودة الإعلانات.'
        },
        icon: 'Sparkles'
      },
      {
        title: { en: 'Vendor Web Flow', ar: 'تدفق ويب للبائعين' },
        description: {
          en: 'Developed a dedicated web-based flow for vendors to manage listings efficiently, especially when handling multiple items.',
          ar: 'تجربة مخصصة تساعد البائعين على إدارة الإعلانات بكفاءة، خصوصًا لمن لديهم أكثر من منتج.'
        },
        icon: 'LayoutGrid'
      },
      {
        title: { en: 'Structured Browsing', ar: 'تجربة تصفح منظمة' },
        description: {
          en: 'Designed organized product exploration with clear details and smooth navigation to keep the experience professional.',
          ar: 'تفاصيل واضحة للمنتجات، وانتقال سلس بين عرض العناصر والتواصل والبحث.'
        },
        icon: 'Search'
      }
    ],
    biggestChallenge: {
      en: 'Firebase connectivity was restricted on the university Wi-Fi.',
      ar: 'اتصال Firebase محدود على شبكة Wi-Fi الجامعية.'
    },
    solution: {
      en: 'Introduced a proxy layer between the mobile UI and Firebase services for reliable on-campus access.',
      ar: 'تطبيق طبقة وسيطة بين واجهة التطبيق وخدمات Firebase لضمان اتصال مستقر داخل الحرم الجامعي.'
    },
    impact: {
      en: 'Iterated based on user feedback and reached 100+ active users.',
      ar: 'تحديثات مستمرة بناءً على ملاحظات المستخدمين وتحقيق أكثر من 100 مستخدم نشط.'
    },
    techStack: ['Flutter', 'Firebase', 'VS Code', 'Cloudflare', 'Android Studio', 'Xcode'],
    caseStudy: {
      sections: [
        {
          id: 'overview',
          title: { en: 'Overview', ar: 'نظرة عامة' },
          body: [
            {
              en: 'KSUMarket is a student-only mobile marketplace designed for fast, trusted exchanges within King Saud University.',
              ar: 'سوق جامعة الملك سعود (KSUMarket) هو تطبيق سوق متنقل حصري للطلاب مصمم لتبادل سريع وموثوق داخل الحرم الجامعي.'
            }
          ],
          variant: 'paragraphs'
        },
        {
          id: 'role',
          title: { en: 'Role', ar: 'الدور' },
          body: [
            {
              en: 'Owned end-to-end development, deployment, and the complete UI/UX system.',
              ar: 'توليت مسؤولية التطوير والنشر من البداية للنهاية، بالإضافة إلى بناء نظام واجهة وتجربة المستخدم بالكامل.'
            }
          ],
          variant: 'paragraphs'
        },
        {
          id: 'features',
          title: { en: 'Key Features', ar: 'أهم الميزات' },
          body: [
            {
              en: 'Real-time in-app chat to connect buyers and sellers.',
              ar: 'محادثة فورية داخل التطبيق لربط البائعين بالمشترين.'
            },
            {
              en: 'AI-assisted posting to auto-complete listing details.',
              ar: 'إعلالات مدعومة بالذكاء الاصطناعي لإكمال التفاصيل تلقائياً.'
            },
            {
              en: 'Vendor web flow for bulk listing management.',
              ar: 'واجهة ويب للبائعين لإدارة الإعلالات بشكل جماعي وفعال.'
            }
          ],
          variant: 'list'
        },
        {
          id: 'challenge',
          title: { en: 'Biggest Challenge', ar: 'أكبر تحد' },
          body: [
            {
              en: 'Campus Wi-Fi restrictions blocked Firebase, impacting real-time updates.',
              ar: 'قيود شبكة Wi-Fi الجامعية تعطل Firebase، مما أثر على التحديثات الفورية.'
            }
          ],
          variant: 'paragraphs'
        },
        {
          id: 'solution',
          title: { en: 'Solution', ar: 'الحل' },
          body: [
            {
              en: 'Implemented a proxy layer that routes requests and ensures stable connectivity on campus.',
              ar: 'بنيت طبقة وسيطة لتوجيه الطلبات وضمان اتصال مستقر داخل الحرم الجامعي.'
            }
          ],
          variant: 'paragraphs'
        },
        {
          id: 'impact',
          title: { en: 'Impact', ar: 'الأثر' },
          body: [
            {
              en: 'Shipped rapid iterations from user feedback and grew to 100+ users.',
              ar: 'أطلقت تحديثات سريعة بناءً على ملاحظات المستخدمين ووصلت إلى أكثر من 100 مستخدم.'
            }
          ],
          variant: 'paragraphs'
        },
        {
          id: 'stack',
          title: { en: 'Tech Stack', ar: 'التقنيات' },
          body: [
            {
              en: 'Flutter, Firebase, VS Code, Cloudflare, Android Studio, Xcode.',
              ar: 'Flutter وFirebase وVS Code وCloudflare وAndroid Studio وXcode.'
            }
          ],
          variant: 'paragraphs'
        }
      ]
    },
    audio: {
      en: '/audio/KSUMarketEn.mp3',
      ar: '/audio/KSUMarketAr.mp3'
    }
  },
  {
    slug: 'halah',
    title: {
      en: 'Halah',
      ar: 'هالة'
    },
    shortDescription: {
      en: 'A mobile well-being and productivity companion that analyzes mood trends and speaks insights.',
      ar: 'تطبيق متنقل للرفاهية والإنتاجية يحلل اتجاهات المزاج ويقدم الرؤى صوتياً.'
    },
    overview: {
      en: 'Halah is a well-being and productivity app that turns mood signals into clear weekly insights. It helps users stay productive without ignoring emotional pressure, by simplifying reflection into an easy, guided experience instead of overwhelming self-tracking.',
      ar: 'تطبيق هالة (Halah) هو تطبيق رفاهية وإنتاجية يحول بيانات المزاج إلى رؤى أسبوعية واضحة تساعد المستخدم يفهم حالته النفسية، ويتعامل مع ضغط الإنتاجية بطريقة متوازنة. الهدف من هالة هو تقليل التشتت الناتج عن تغيّر المشاعر، وتحويل التجربة إلى خطوات بسيطة تساعد على الاستمرار بدون إرهاق.'
    },
    context: {
      program: {
        en: 'Apple Developer Academy | Tuwaiq — AI Foundation Program',
        ar: 'Apple Developer Academy | Tuwaiq — AI Foundation Program'
      },
      duration: {
        en: '5 weeks',
        ar: '5 أسابيع'
      },
      cohort: {
        en: 'First Cohort',
        ar: 'الدفعة الأولى'
      }
    },
    projectType: {
      en: 'Mobile',
      ar: 'تطبيق جوال'
    },
    role: {
      en: 'Led development, integration, and UI/UX.',
      ar: 'قادت التطوير والتكامل وواجهة وتجربة المستخدم.'
    },
    roleDetailed: {
      en: 'I led the development and integration end-to-end and owned the full product UI/UX execution, ensuring the app feels clean, calming, and easy to use while delivering real AI value.',
      ar: 'قدت التطوير والتكامل من البداية للنهاية، وكنت مسؤول عن تصميم وتنفيذ تجربة المنتج (UI/UX)، بالإضافة إلى دمج مكونات الذكاء الاصطناعي داخل التطبيق بشكل عملي وسلس.'
    },
    metrics: [
      {
        label: { en: 'AI Accuracy', ar: 'دقة الذكاء' },
        value: { en: '~91%', ar: '~91%' },
        icon: 'Target'
      },
      {
        label: { en: 'Duration', ar: 'المدة' },
        value: { en: '5 weeks', ar: '5 أسابيع' },
        icon: 'Clock'
      },
      {
        label: { en: 'Platform', ar: 'المنصة' },
        value: { en: 'iOS Native', ar: 'iOS أصلي' },
        icon: 'Smartphone'
      }
    ],
    keyFeatures: [
      {
        en: 'AI agent analyzes weekly mood and generates insight summaries.',
        ar: 'وكيل ذكاء اصطناعي يحلل المزاج الأسبوعي ويولد ملخصات للرؤى.'
      },
      {
        en: 'Arabic TTS playback for the insight summaries.',
        ar: 'تشغيل صوتي باللغة العربية لملخصات الرؤى.'
      }
    ],
    keyFeaturesDetailed: [
      {
        title: { en: 'AI Weekly Analysis', ar: 'تحليل أسبوعي بالذكاء الاصطناعي' },
        description: {
          en: 'An AI agent that analyzes weekly mood patterns and generates a structured weekly insight summary.',
          ar: 'وكيل ذكاء اصطناعي يحلل المزاج على مدار الأسبوع ويقدم ملخصًا أسبوعيًا يوضح الاتجاهات والنمط العام للمستخدم.'
        },
        icon: 'Brain'
      },
      {
        title: { en: 'Readable Statistics', ar: 'إحصائيات واضحة' },
        description: {
          en: 'Statistics-style text that highlights mood direction and trends without overcomplicating the output.',
          ar: 'إحصائيات نصية واضحة تساعد المستخدم يفهم "ليش تغيّر مزاجه" وأين يركز الأسبوع القادم.'
        },
        icon: 'BarChart3'
      },
      {
        title: { en: 'Arabic Voice Playback', ar: 'تشغيل صوتي بالعربية' },
        description: {
          en: 'Arabic Text-to-Speech (TTS) so users can listen to the weekly insights in a calm and accessible format.',
          ar: 'تشغيل صوتي باللغة العربية (Arabic TTS) لقراءة ملخص الرؤى بطريقة مريحة.'
        },
        icon: 'Volume2'
      },
      {
        title: { en: 'Minimal Guided Flow', ar: 'واجهة نظيفة وموجهة' },
        description: {
          en: 'A minimal guided flow from input → analysis → insights, designed to reduce friction and stress.',
          ar: 'واجهة نظيفة وموجهة تقلل الضغط الذهني وتسهّل الانتقال من الإدخال إلى النتائج بدون تعقيد.'
        },
        icon: 'Compass'
      }
    ],
    biggestChallenge: {
      en: 'Integrating AI while building an in-house model that understands user tone continuously.',
      ar: 'دمج الذكاء الاصطناعي مع بناء نموذج داخلي يفهم نبرة المستخدم بشكل مستمر.'
    },
    solution: {
      en: 'Built a weekly data pipeline with iterative model tuning and in-app feedback loops.',
      ar: 'بناء خط معالجة بيانات أسبوعي مع ضبط تدريجي للنموذج وحلقات تغذية راجعة داخل التطبيق.'
    },
    impact: {
      en: 'Accuracy reached ~91% with strong user engagement.',
      ar: 'وصلت الدقة إلى حوالي 91% مع تفاعل قوي من المستخدمين.'
    },
    techStack: ['SwiftUI', 'SwiftData', 'Xcode', 'Figma'],
    caseStudy: {
      sections: [
        {
          id: 'overview',
          title: { en: 'Overview', ar: 'نظرة عامة' },
          body: [
            {
              en: 'Halah is a well-being and productivity app that turns mood data into weekly insights.',
              ar: 'تطبيق هالة (Halah) هو تطبيق للرفاهية والإنتاجية يحول بيانات المزاج إلى رؤى أسبوعية.'
            }
          ],
          variant: 'paragraphs'
        },
        {
          id: 'context',
          title: { en: 'Context', ar: 'السياق' },
          body: [
            {
              en: 'Built in 5 weeks during Apple Developer Academy | Tuwaiq AI Foundation Program (first cohort).',
              ar: 'تم بناء التطبيق خلال 5 أسابيع في أكاديمية مطوري آبل | برنامج Tuwaiq AI Foundation (الدفعة الأولى).'
            }
          ],
          variant: 'paragraphs'
        },
        {
          id: 'role',
          title: { en: 'Role', ar: 'الدور' },
          body: [
            {
              en: 'Led development, integration, and the end-to-end product experience.',
              ar: 'قادت التطوير والتكامل وتجربة المنتج من البداية للنهاية.'
            }
          ],
          variant: 'paragraphs'
        },
        {
          id: 'features',
          title: { en: 'Key Features', ar: 'أهم الميزات' },
          body: [
            {
              en: 'AI analysis that summarizes weekly mood trends.',
              ar: 'تحليل بالذكاء الاصطناعي يلخص اتجاهات المزاج الأسبوعية.'
            },
            {
              en: 'Arabic voice playback for insight summaries.',
              ar: 'تشغيل صوتي بالعربية لملخصات الرؤى.'
            }
          ],
          variant: 'list'
        },
        {
          id: 'challenge',
          title: { en: 'Biggest Challenge', ar: 'أكبر تحد' },
          body: [
            {
              en: 'Achieving tone-aware insights without degrading performance or privacy.',
              ar: 'تحقيق فهم دقيق للنبرة دون التأثير سلباً على الأداء أو الخصوصية.'
            }
          ],
          variant: 'paragraphs'
        },
        {
          id: 'solution',
          title: { en: 'Solution', ar: 'الحل' },
          body: [
            {
              en: 'Designed a lightweight in-app model flow with continuous calibration.',
              ar: 'صممت تدفقاً نموذجياً خفيفاً داخل التطبيق مع معايرة مستمرة.'
            }
          ],
          variant: 'paragraphs'
        },
        {
          id: 'impact',
          title: { en: 'Impact', ar: 'الأثر' },
          body: [
            {
              en: 'Reached ~91% accuracy and sustained strong engagement.',
              ar: 'وصلت الدقة إلى حوالي 91% مع الحفاظ على تفاعل قوي.'
            }
          ],
          variant: 'paragraphs'
        }
      ]
    },
    audio: {
      en: '/audio/HalahEn.mp3',
      ar: '/audio/HalahAr.mp3'
    }
  },
  {
    slug: 'yas-ai',
    title: {
      en: 'YAS AI',
      ar: 'YAS AI'
    },
    shortDescription: {
      en: 'A web platform that guides users from idea to deployed app in six AI-powered steps.',
      ar: 'منصة ويب ترشد المستخدمين من الفكرة إلى تطبيق جاهز عبر ست خطوات مدعومة بالذكاء الاصطناعي.'
    },
    overview: {
      en: 'YAS AI (Your Aura in Software) is a guided web platform that takes users from "I have an idea" to "my app is live on the internet" through six AI-powered steps. Instead of being just another chatbot, YAS delivers a structured building journey that feels like a cinematic walkthrough — reducing friction, confusion, and the fear of starting from zero.',
      ar: 'YAS AI (اختصار: Your Aura in Software) هو منصة ويب موجهة تساعد أي شخص يحول فكرته من "مجرد فكرة" إلى "تطبيق منشور على الإنترنت" عبر 6 خطوات مدعومة بالذكاء الاصطناعي. الفكرة الأساسية ليست فقط توليد كود، بل تقديم رحلة بناء واضحة تشبه لعبة أو تجربة سينمائية، بحيث يتعلم المستخدم خطوة بخطوة بدون تشتت أو خوف من البداية.'
    },
    goals: [
      {
        en: 'Democratize software creation by removing the coding barrier',
        ar: 'تقليل حاجز البرمجة وتحويل أكبر شريحة ممكنة من أصحاب الأفكار إلى صنّاع منتجات حقيقيين'
      },
      {
        en: 'Help founders, students, and creators build real MVPs faster',
        ar: 'طلاب، مؤسسين، وصناع محتوى… يقدرون يبنون MVP بسرعة وبأسلوب موجه'
      }
    ],
    projectType: {
      en: 'Web',
      ar: 'تطبيق ويب'
    },
    role: {
      en: 'Lead development and design, implemented the AI RAG system.',
      ar: 'قاد التطوير والتصميم ونفذ نظام RAG للذكاء الاصطناعي.'
    },
    roleDetailed: {
      en: 'I led the development and product design execution, and implemented the AI foundation using a RAG system to ensure consistent, grounded guidance across the full workflow.',
      ar: 'قدت التطوير وكنت مسؤول عن تصميم تجربة المنتج، بالإضافة إلى بناء وتطبيق نظام RAG داخل الذكاء الاصطناعي لضمان جودة النتائج وتركيزها على سياق المستخدم.'
    },
    metrics: [
      {
        label: { en: 'Steps', ar: 'الخطوات' },
        value: { en: '6-Step Journey', ar: '6 خطوات' },
        icon: 'Route'
      },
      {
        label: { en: 'Platform', ar: 'المنصة' },
        value: { en: 'Web App', ar: 'تطبيق ويب' },
        icon: 'Globe'
      },
      {
        label: { en: 'AI System', ar: 'نظام الذكاء' },
        value: { en: 'RAG-Powered', ar: 'مدعوم بـ RAG' },
        icon: 'Cpu'
      }
    ],
    keyFeatures: [
      {
        en: 'Tool integration flow: Stitch design guidance to Google AI Studio for faster builds.',
        ar: 'تدفق تكامل الأدوات: ربط إرشادات التصميم مع Google AI Studio لتسريع البناء.'
      },
      {
        en: 'RAG system that remembers project decisions and keeps context grounded.',
        ar: 'نظام RAG يحفظ قرارات المشروع ويحافظ على ثبات السياق.'
      },
      {
        en: 'MCQ-to-prompt engineering that turns answers into expert prompts.',
        ar: 'تحويل أسئلة الاختيار المتعدد إلى مطالبات احترافية.'
      }
    ],
    keyFeaturesDetailed: [
      {
        title: { en: '6-Step Guided Journey', ar: 'رحلة بناء من 6 خطوات' },
        description: {
          en: 'A structured building journey that keeps users focused and prevents skipping critical stages — from idea to deployed app.',
          ar: 'تمنع التشتت وتحوّل العمل إلى مراحل واضحة من الفكرة حتى النشر.'
        },
        icon: 'Route'
      },
      {
        title: { en: 'Seamless Tool Integration', ar: 'تكامل الأدوات' },
        description: {
          en: 'Starting with UI guidance in Stitch, then moving into Google AI Studio to support faster "vibe coding" and MVP creation.',
          ar: 'يبدأ المستخدم بتوجيه تصميم الواجهة عبر Stitch، ثم ينتقل بسلاسة إلى Google AI Studio لبناء أسرع ودعم أسلوب الـ Vibe Coding.'
        },
        icon: 'Workflow'
      },
      {
        title: { en: 'MCQ-to-Prompt Engineering', ar: 'MCQ-to-Prompt Engineering' },
        description: {
          en: 'Simple multiple-choice inputs generate expert-level prompts tailored to the tool and current step.',
          ar: 'بدل ما يكتب المستخدم من الصفر، يختار من أسئلة بسيطة، ويستلم Prompt جاهز احترافي مناسب للأداة والخطوة الحالية.'
        },
        icon: 'ListChecks'
      },
      {
        title: { en: 'RAG Memory System', ar: 'نظام ذاكرة RAG' },
        description: {
          en: 'Stores project decisions and returns structured context, removing the need for repetition and keeping AI grounded.',
          ar: 'يحفظ قرارات المستخدم ومواصفات المشروع، ويعيدها بشكل منظم عشان ما يحتاج يكرر نفسه كل مرة.'
        },
        icon: 'Database'
      }
    ],
    biggestChallenge: {
      en: 'Preventing AI hallucinations across a multi-step journey.',
      ar: 'منع التضليل في الذكاء الاصطناعي عبر رحلة متعددة الخطوات.'
    },
    solution: {
      en: 'Used a RAG workflow to keep the model focused and consistent end-to-end.',
      ar: 'استخدام سير عمل RAG للحفاظ على تركز النموذج واتساقه من البداية للنهاية.'
    },
    impact: {
      en: 'Delivered a full web app that helps users build products through a guided flow.',
      ar: 'منصة ويب متكاملة تساعد المستخدمين على بناء المنتجات عبر تدفق موجه.'
    },
    techStack: ['TypeScript', 'TailwindCSS', 'Vite', 'Local Storage'],
    caseStudy: {
      sections: [
        {
          id: 'overview',
          title: { en: 'Overview', ar: 'نظرة عامة' },
          body: [
            {
              en: 'YAS AI stands for Your Aura in Software, guiding founders from idea to launch.',
              ar: 'YAS AI تعني Your Aura in Software، وهي ترشد المؤسسين من الفكرة حتى الإطلاق.'
            }
          ],
          variant: 'paragraphs'
        },
        {
          id: 'role',
          title: { en: 'Role', ar: 'الدور' },
          body: [
            {
              en: 'Led product design, web development, and the AI RAG pipeline.',
              ar: 'قادت تصميم المنتج وتطوير الويب وبناء خط RAG للذكاء الاصطناعي.'
            }
          ],
          variant: 'paragraphs'
        },
        {
          id: 'features',
          title: { en: 'Key Features', ar: 'أهم الميزات' },
          body: [
            {
              en: 'Guided flow that stitches design guidance into rapid AI tooling.',
              ar: 'تدفق موجه يدمج إرشادات التصميم مع أدوات الذكاء الاصطناعي بسرعة.'
            },
            {
              en: 'RAG memory that preserves decisions and constraints.',
              ar: 'ذاكرة RAG تحتفظ بالقرارات والقيود.'
            },
            {
              en: 'MCQ-driven prompt generation for expert-grade output.',
              ar: 'توليد مطالبات احترافية مدفوعة بأسئلة الاختيار المتعدد.'
            }
          ],
          variant: 'list'
        },
        {
          id: 'challenge',
          title: { en: 'Biggest Challenge', ar: 'أكبر تحد' },
          body: [
            {
              en: 'Keeping the AI grounded while users move across six steps.',
              ar: 'الحفاظ على موثوقية الذكاء الاصطناعي أثناء انتقال المستخدمين عبر ست خطوات.'
            }
          ],
          variant: 'paragraphs'
        },
        {
          id: 'solution',
          title: { en: 'Solution', ar: 'الحل' },
          body: [
            {
              en: 'Implemented retrieval layers and decision memory to reduce hallucinations.',
              ar: 'تطبيق طبقات الاسترجاع وذاكرة القرارات لتقليل التضليل.'
            }
          ],
          variant: 'paragraphs'
        },
        {
          id: 'impact',
          title: { en: 'Impact', ar: 'الأثر' },
          body: [
            {
              en: 'Users can go from idea to a deployable plan with clear, guided steps.',
              ar: 'يستطيع المستخدمون الانتقال من الفكرة إلى خطة قابلة للنشر بخطوات واضحة وموجهة.'
            }
          ],
          variant: 'paragraphs'
        }
      ]
    },
    audio: {
      en: '/audio/YASEn.mp3',
      ar: '/audio/YASAr.mp3'
    }
  }
];
