import { Language, Translation, SkillItem } from './types';
import { PROJECTS } from './src/data/projects';

const SKILLS_DATA: SkillItem[] = [
  { name: "Swift", iconSlug: "swift", url: "https://developer.apple.com/swift/" },
  { name: "SwiftUI", iconSlug: "swift", url: "https://developer.apple.com/xcode/swiftui/" },
  { name: "Flutter", iconSlug: "flutter", url: "https://flutter.dev/" },
  { name: "React", iconSlug: "react", url: "https://react.dev/" },
  { name: "Node.js", iconSlug: "nodedotjs", url: "https://nodejs.org/" },
  { name: "Python", iconSlug: "python", url: "https://www.python.org/" },
  { name: "TypeScript", iconSlug: "typescript", url: "https://www.typescriptlang.org/" },
  { name: "PostgreSQL", iconSlug: "postgresql", url: "https://www.postgresql.org/" },
  { name: "Supabase", iconSlug: "supabase", url: "https://supabase.com/" },
  { name: "Firebase", iconSlug: "firebase", url: "https://firebase.google.com/" },
  { name: "Figma", iconSlug: "figma", url: "https://www.figma.com/" },
  { name: "Git", iconSlug: "git", url: "https://git-scm.com/" },
  { name: "GitHub", iconSlug: "github", url: "https://github.com/" },
  { name: "Streamlit", iconSlug: "streamlit", url: "https://streamlit.io/" },
];

const mapProject = (project: typeof PROJECTS[number], lang: 'en' | 'ar') => ({
  id: project.slug,
  slug: project.slug,
  title: project.title[lang],
  description: project.shortDescription[lang],
  overview: project.overview?.[lang],
  projectType: project.projectType[lang],
  role: project.role[lang],
  roleDetailed: project.roleDetailed?.[lang],
  goals: project.goals?.map(item => item[lang]),
  context: project.context ? {
    program: project.context.program?.[lang],
    duration: project.context.duration?.[lang],
    cohort: project.context.cohort?.[lang]
  } : undefined,
  metrics: project.metrics?.map(m => ({
    label: m.label[lang],
    value: m.value[lang],
    icon: m.icon
  })),
  keyFeatures: project.keyFeatures.map(item => item[lang]),
  keyFeaturesDetailed: project.keyFeaturesDetailed?.map(f => ({
    title: f.title[lang],
    description: f.description[lang],
    icon: f.icon
  })),
  biggestChallenge: project.biggestChallenge[lang],
  solution: project.solution[lang],
  impact: project.impact[lang],
  tech: project.techStack,
  caseStudy: {
    sections: project.caseStudy.sections.map(section => ({
      id: section.id,
      title: section.title[lang],
      body: section.body.map(body => body[lang]),
      variant: section.variant
    }))
  },
  links: {
    caseStudy: 'true'
  },
  audio: project.audio
});

const PROJECTS_EN = PROJECTS.map(project => mapProject(project, 'en'));
const PROJECTS_AR = PROJECTS.map(project => mapProject(project, 'ar'));

export const TRANSLATIONS: Record<Language, Translation> = {
  [Language.EN]: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      // Experience Removed
      education: 'Edu',
      certificates: 'Certs',
      achievements: 'Awards',
      contact: 'Contact',
    },
    hero: {
      greeting: "Hi, I'm",
      name: "Salman Almutairi",
      role: "Software Engineer",
      tagline: "Focused on shipping clean, scalable apps.",
      typingLines: [
        "Mobile & Web Engineering",
        "Scalable, clean architecture",
        "AI-integrated products",
        "Currently seeking a Co-op",
      ],
      cta: {
        projects: "View Projects",
        contact: "Contact Me",
        cv: "View Resume",
      },
    },
    about: {
      title: "About Me",
      content: [
        "I am a productive Software Engineer with a passion for building robust digital solutions. I adapt quickly to new tools and workflows, allowing me to deliver high-quality code in fast-paced environments.",
        "Specializing in both mobile and web application development, I focus on creating seamless user experiences backed by scalable architecture. I am currently studying Software Engineering at King Saud University and am actively seeking a Co-op opportunity to apply my skills in a professional setting."
      ],
      stats: [
        { label: "Years Exp", value: "2+" },
        { label: "Projects", value: "10+" },
        { label: "GPA", value: "4.8" }, 
      ]
    },
    skills: {
      title: "Technical Skills",
      list: SKILLS_DATA
    },
    projects: {
      title: "Featured Projects",
      subtitle: "A selection of my recent work in web and mobile engineering.",
      viewProject: "View Project",
      caseStudyBtn: "Project Details",
      closeBtn: "Close",
      items: PROJECTS_EN,
      labels: {
        role: "Role",
        platform: "Platform",
        focus: "Focus",
        playNarration: "Start the Story",
        playingNarration: "Playing...",
        contents: "Contents",
        techStack: "Tech Stack"
      },
      narration: {
        title: "Project Narration",
        subtitle: "Listen to the project summary and my role.",
        play: "Start the Story",
        playing: "Playing...",
        prompt: "Want to understand this project better? Listen to the audio narration!",
        listenNow: "Listen Now"
      }
    },
    // Experience Removed
    education: {
      title: "Education",
      items: [
        {
          institution: "King Saud University",
          degree: "B.S. Software Engineering",
          date: "Expected Graduation: 2026",
          desc: ""
        }
      ]
    },
    certificates: {
      title: "Certificates",
      viewDetails: "View Details",
      closeDetails: "Close",
      skillsAcquired: "Skills Acquired",
      keyOutcomes: "Key Outcomes",
      issuedBy: "Issued by",
      duration: "Duration",
      specialization: "Specialization",
      items: [
        {
          title: "Apple AI Foundation",
          issuer: "Tuwaiq Academy × Apple",
          date: "August 2025",
          duration: "July 20 – August 21, 2025",
          image: "/Assets/Apple.png",
          description: "Successfully completed the intensive Apple Foundation Program, gaining hands-on experience in AI, software development, project management, and collaborative innovation.",
          skills: ["AI Development", "Swift", "SwiftUI", "API Development", "UI Design", "UX Design"],
          keyOutcomes: ["Built impactful AI solutions", "Mastered Apple ecosystem development", "Collaborative innovation projects"]
        },
        {
          title: "ISTQB® CTFL",
          issuer: "Tuwaiq Academy",
          date: "February 2025",
          duration: "February 2 – February 13, 2025",
          image: "/Assets/Testing.jpg",
          description: "Earned the internationally recognized ISTQB Foundation Level certification, demonstrating comprehensive understanding of software testing principles and methodologies.",
          skills: ["Test Planning", "Manual Testing", "Black Box Testing", "White Box Testing", "Test Automation", "Defect Tracking", "Regression Testing"],
          keyOutcomes: ["Certified software tester", "Mastered testing methodologies", "Quality assurance expertise"]
        },
        {
          title: "BSF Financial Sustainability",
          issuer: "Udacity",
          date: "January 2025",
          image: "/Assets/BSF.jpeg",
          description: "Completed specialized training in blockchain and financial sustainability frameworks, focusing on AI-driven financial solutions and sustainable business practices.",
          skills: ["Blockchain", "FinTech", "AI Financial Solutions", "Risk Management", "Sustainability Planning"],
          keyOutcomes: ["Financial framework development", "Blockchain technology expertise", "Sustainable business practices"]
        },
        {
          title: "Data Collection with Python",
          issuer: "University of Michigan",
          date: "November 2024",
          specialization: "KAUST AI Specialization",
          image: "/Assets/DC.jpeg",
          description: "Completed comprehensive training in data collection, cleaning, and processing using Python for machine learning applications.",
          skills: ["Python", "Pandas", "NumPy", "API Integration", "Data Processing", "Web Scraping"],
          keyOutcomes: ["Retrieved data from APIs", "Cleaned and normalized datasets", "Built data engineering skills"]
        },
        {
          title: "Python Classes & Inheritance",
          issuer: "University of Michigan",
          date: "November 2024",
          specialization: "KAUST AI Specialization",
          image: "/Assets/PC.jpeg",
          description: "Advanced course in Object-Oriented Programming using Python, focusing on designing scalable and maintainable code.",
          skills: ["OOP", "Python", "Polymorphism", "Class Design", "Code Architecture", "Inheritance"],
          keyOutcomes: ["Mastered class creation", "Implemented inheritance patterns", "Built modular applications"]
        },
        {
          title: "Python Functions & Dictionaries",
          issuer: "University of Michigan",
          date: "November 2024",
          specialization: "KAUST AI Specialization",
          image: "/Assets/PF.jpeg",
          description: "Strengthened core Python programming skills focusing on function development, file operations, and dictionary data structures.",
          skills: ["Python", "Functions", "File I/O", "Dictionaries", "Data Structures"],
          keyOutcomes: ["Mastered function development", "Performed file operations", "Dictionary operations expertise"]
        },
        {
          title: "Python Basics",
          issuer: "University of Michigan",
          date: "October 2024",
          specialization: "KAUST AI Specialization",
          image: "/Assets/PB.jpeg",
          description: "Completed foundational Python programming course covering core concepts including variables, conditionals, loops, and functions.",
          skills: ["Python", "Scripting", "Data Science Fundamentals", "Problem Solving", "Automation"],
          keyOutcomes: ["Learned programming fundamentals", "Built interactive scripts", "Developed problem-solving skills"]
        },
        {
          title: "Software Product Management",
          issuer: "Coursera",
          date: "July 2024",
          image: "/Assets/SPM.jpeg",
          description: "Comprehensive certification in software product management, covering agile methodologies, product lifecycle, and team collaboration.",
          skills: ["Agile", "Scrum", "Product Management", "Sprint Planning", "Wireframing", "UI/UX", "Software Documentation"],
          keyOutcomes: ["Mastered agile frameworks", "Product lifecycle expertise", "Cross-functional collaboration"]
        },
        {
          title: "Data Fundamentals",
          issuer: "IBM",
          date: "May 2024",
          image: "/Assets/DF.jpg",
          description: "Foundation-level certification covering essential data concepts, database fundamentals, and information architecture principles.",
          skills: ["Data Analysis", "Data Management", "Database Fundamentals", "Data Literacy", "Information Architecture"],
          keyOutcomes: ["Data-driven decision making", "Database management skills", "Information architecture principles"]
        }
      ]
    },
    achievements: {
      title: "Achievements",
      items: [
        {
          title: "KSU Hackathon Winner",
          description: "Secured 1st place in the university-wide coding competition for building an AI-powered accessibility tool.",
        },
        {
          title: "Dean's List",
          description: "Recognized for outstanding academic performance for 3 consecutive years.",
        },
        {
          title: "Open Source Contributor",
          description: "Contributed documentation and bug fixes to popular React ecosystem libraries.",
        }
      ]
    },
    mindset: {
      title: "My Engineering Mindset",
      subtitle: "How I think, plan, and ship software.",
      status: "STATUS: SHIPPING MODE",
      initialMessage: "Try a command to explore how I build and ship products.",
      placeholder: "Type a command...",
      run: "Run",
      suggestionsLabel: "Suggested Commands:",
      copy: "Copy Output",
      copied: "Copied!",
      reset: "Reset Terminal",
      tabs: [
        {
          id: 'principles',
          label: '/principles',
          title: "Core Principles",
          description: "My fundamental rules for writing code",
          content: [
            "DRY & KISS: I write code that is easy to read, easy to test, and hard to break.",
            "User Centric: Every line of code should ultimately serve the user experience.",
            "Performance First: Optimization isn't an afterthought; it's a constraint.",
            "Accessibility: The web is for everyone. I build with a11y standards in mind."
          ]
        },
        {
          id: 'workflow',
          label: '/workflow',
          title: "Development Workflow",
          description: "How I move from idea to production",
          content: [
            "1. Analysis & Design: Understanding the 'Why' before the 'How'.",
            "2. Agile Development: Iterative shipping with constant feedback loops.",
            "3. Automated Testing: Unit and Integration tests to sleep soundly at night.",
            "4. CI/CD Deployment: Automating the boring stuff to focus on building."
          ]
        },
        {
          id: 'quality',
          label: '/quality',
          title: "Quality Standards",
          description: "How I ensure scalability and maintenance",
          content: [
            "Type Safety: TypeScript is non-negotiable for scalable web apps.",
            "Clean Architecture: Separating concerns to make codebases maintainable.",
            "Error Handling: Graceful degradation instead of white screens.",
            "Documentation: Code tells you how, comments tell you why."
          ]
        },
        {
          id: 'learning',
          label: '/learning',
          title: "Continuous Growth",
          description: "How I stay ahead of the curve",
          content: [
            "Tech Radar: constantly evaluating new tools (currently exploring AI Agents).",
            "Mentorship: Learning from seniors and helping juniors grow.",
            "Code Reviews: The best place to learn and teach best practices.",
            "Deep Dives: Understanding the internals of tools I use daily."
          ]
        }
      ],
      commands: [
        { cmd: 'help', desc: 'Show available commands' },
        { cmd: 'about', desc: 'Display profile info' },
        { cmd: 'contact', desc: 'Show contact details' },
        { cmd: 'clear', desc: 'Clear terminal history' }
      ]
    },
    contact: {
      title: "Get in Touch",
      subtitle: "Currently open for Co-op opportunities and new projects.",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        submit: "Send Message",
        success: "Message sent successfully!"
      },
      socials: {
        linkedin: "LinkedIn",
        email: "Email Me"
      }
    },
    player: {
      nowPlaying: "Now Playing: Project Narration",
      speed: "Speed",
      close: "Close",
      minimize: "Minimize",
      expand: "Expand",
      play: "Play",
      pause: "Pause",
      rewind: "Rewind 5 seconds",
      forward: "Forward 5 seconds",
      switchLang: "Switch Audio Language",
      seek: "Seek"
    }
  },
  [Language.AR]: {
    nav: {
      home: 'الرئيسية',
      about: 'عني',
      skills: 'مهاراتي',
      projects: 'مشاريعي',
      // Experience Removed
      education: 'دراستي',
      certificates: 'شهاداتي',
      achievements: 'إنجازاتي',
      contact: 'تواصل',
    },
    hero: {
      greeting: "هلا، أنا",
      name: "سلمان المطيري",
      role: "مهندس برمجيات",
      tagline: "أحب أبني تطبيقات نظيفة وتشتغل صح.",
      typingLines: [
        "تطوير ويب وتطبيقات جوال",
        "كود نظيف وقابل للتوسع",
        "منتجات فيها ذكاء اصطناعي",
        "أدور حالياً فرصة Co-op",
      ],
      cta: {
        projects: "شوف المشاريع",
        contact: "تواصل معي",
        cv: "السيرة الذاتية",
      },
    },
    about: {
      title: "من أنا",
      content: [
        "أنا مهندس برمجيات عندي شغف أبني حلول رقمية قوية. أتعلم بسرعة وأتأقلم مع أي أداة جديدة، وهذا يخليني أسلّم شغل عالي الجودة حتى لو البيئة سريعة.",
        "متخصص في تطوير تطبيقات الويب والجوال، وأركز على تجربة مستخدم سلسة مع بنية قابلة للتوسع. حالياً أدرس هندسة البرمجيات في جامعة الملك سعود وأدور فرصة تدريب تعاوني (Co-op) أطبق فيها اللي تعلمته."
      ],
      stats: [
        { label: "سنوات خبرة", value: "+2" },
        { label: "مشاريع", value: "+10" },
        { label: "المعدل", value: "4.8" },
      ]
    },
    skills: {
      title: "مهاراتي التقنية",
      list: SKILLS_DATA
    },
    projects: {
      title: "مشاريعي",
      subtitle: "مجموعة من أحدث شغلي في الويب والجوال.",
      viewProject: "شوف المشروع",
      caseStudyBtn: "تفاصيل المشروع",
      closeBtn: "إغلاق",
      items: PROJECTS_AR,
      labels: {
        role: "دوري",
        platform: "المنصة",
        focus: "التركيز",
        playNarration: "ابدأ القصة",
        playingNarration: "يشتغل...",
        contents: "المحتويات",
        techStack: "التقنيات"
      },
      narration: {
        title: "شرح صوتي للمشروع",
        subtitle: "اسمع ملخص المشروع ودوري فيه.",
        play: "ابدأ القصة",
        playing: "يشتغل...",
        prompt: "تبي تفهم المشروع أكثر؟ اسمع الشرح الصوتي!",
        listenNow: "اسمع الحين"
      }
    },

    // Experience Removed
    education: {
      title: "دراستي",
      items: [
        {
          institution: "جامعة الملك سعود",
          degree: "بكالوريوس هندسة البرمجيات",
          date: "التخرج المتوقع: 2026",
          desc: ""
        }
      ]
    },
    certificates: {
      title: "شهاداتي",
      viewDetails: "شوف التفاصيل",
      closeDetails: "إغلاق",
      skillsAcquired: "المهارات اللي اكتسبتها",
      keyOutcomes: "أهم النتائج",
      issuedBy: "من",
      duration: "المدة",
      specialization: "التخصص",
      items: [
        {
          title: "Apple AI Foundation",
          issuer: "أكاديمية طويق × Apple",
          date: "أغسطس 2025",
          duration: "20 يوليو – 21 أغسطس 2025",
          image: "/Assets/Apple.png",
          description: "خلصت برنامج Apple Foundation المكثف، واكتسبت خبرة عملية في الذكاء الاصطناعي وتطوير البرمجيات وإدارة المشاريع.",
          skills: ["تطوير AI", "Swift", "SwiftUI", "تطوير API", "تصميم واجهات", "UX"],
          keyOutcomes: ["بنيت حلول AI مؤثرة", "تعلمت نظام Apple", "شغلت مع فريق"]
        },
        {
          title: "ISTQB® CTFL",
          issuer: "أكاديمية طويق",
          date: "فبراير 2025",
          duration: "2 – 13 فبراير 2025",
          image: "/Assets/Testing.jpg",
          description: "حصلت على شهادة ISTQB المعترف فيها دولياً في اختبار البرمجيات.",
          skills: ["تخطيط الاختبار", "اختبار يدوي", "Black Box", "White Box", "أتمتة الاختبار", "تتبع العيوب"],
          keyOutcomes: ["مختبر برمجيات معتمد", "تعلمت منهجيات الاختبار", "خبرة في ضمان الجودة"]
        },
        {
          title: "BSF الاستدامة المالية",
          issuer: "Udacity",
          date: "يناير 2025",
          image: "/Assets/BSF.jpeg",
          description: "تدريب متخصص في البلوكتشين والاستدامة المالية مع حلول AI.",
          skills: ["Blockchain", "FinTech", "حلول AI مالية", "إدارة المخاطر", "الاستدامة"],
          keyOutcomes: ["تطوير أُطر مالية", "خبرة بلوكتشين", "ممارسات أعمال مستدامة"]
        },
        {
          title: "جمع البيانات مع Python",
          issuer: "University of Michigan",
          date: "نوفمبر 2024",
          specialization: "تخصص KAUST للـ AI",
          image: "/Assets/DC.jpeg",
          description: "تدريب شامل في جمع وتنظيف ومعالجة البيانات باستخدام Python.",
          skills: ["Python", "Pandas", "NumPy", "API", "معالجة البيانات", "Web Scraping"],
          keyOutcomes: ["جمع بيانات من APIs", "تنظيف البيانات", "مهارات هندسة البيانات"]
        },
        {
          title: "Python Classes والوراثة",
          issuer: "University of Michigan",
          date: "نوفمبر 2024",
          specialization: "تخصص KAUST للـ AI",
          image: "/Assets/PC.jpeg",
          description: "دورة متقدمة في البرمجة الكائنية OOP باستخدام Python.",
          skills: ["OOP", "Python", "Polymorphism", "تصميم Classes", "هندسة الكود", "Inheritance"],
          keyOutcomes: ["إتقان إنشاء Classes", "تطبيق أنماط الوراثة", "بناء تطبيقات معيارية"]
        },
        {
          title: "Python Functions والقواميس",
          issuer: "University of Michigan",
          date: "نوفمبر 2024",
          specialization: "تخصص KAUST للـ AI",
          image: "/Assets/PF.jpeg",
          description: "تعزيز مهارات Python الأساسية مع التركيز على الدوال والملفات والقواميس.",
          skills: ["Python", "Functions", "File I/O", "Dictionaries", "هياكل البيانات"],
          keyOutcomes: ["إتقان الدوال", "عمليات الملفات", "التعامل مع القواميس"]
        },
        {
          title: "أساسيات Python",
          issuer: "University of Michigan",
          date: "أكتوبر 2024",
          specialization: "تخصص KAUST للـ AI",
          image: "/Assets/PB.jpeg",
          description: "دورة Python التأسيسية: المتغيرات، الشروط، الحلقات، والدوال.",
          skills: ["Python", "Scripting", "أساسيات Data Science", "حل المشكلات", "الأتمتة"],
          keyOutcomes: ["تعلم أساسيات البرمجة", "بناء سكربتات", "مهارات حل المشكلات"]
        },
        {
          title: "إدارة منتجات البرمجيات",
          issuer: "Coursera",
          date: "يوليو 2024",
          image: "/Assets/SPM.jpeg",
          description: "شهادة شاملة في إدارة المنتجات البرمجية ومنهجيات Agile.",
          skills: ["Agile", "Scrum", "إدارة المنتجات", "Sprint Planning", "Wireframing", "UI/UX", "التوثيق"],
          keyOutcomes: ["إتقان Agile", "دورة حياة المنتج", "التعاون مع الفريق"]
        },
        {
          title: "أساسيات البيانات",
          issuer: "IBM",
          date: "مايو 2024",
          image: "/Assets/DF.jpg",
          description: "شهادة تأسيسية في البيانات وقواعد البيانات وهندسة المعلومات.",
          skills: ["تحليل البيانات", "إدارة البيانات", "قواعد البيانات", "Data Literacy", "هندسة المعلومات"],
          keyOutcomes: ["قرارات مبنية على البيانات", "إدارة قواعد البيانات", "هندسة المعلومات"]
        }
      ]
    },
    achievements: {
      title: "الإنجازات",
      items: [
        {
          title: "فائز بهاكاثون جامعة الملك سعود",
          description: "حصلت على المركز الأول في مسابقة البرمجة على مستوى الجامعة لبناء أداة سهولة الوصول مدعومة بالذكاء الاصطناعي.",
        },
        {
          title: "قائمة العميد الشرفية",
          description: "تكريم للأداء الأكاديمي المتميز لمدة 3 سنوات متتالية.",
        },
        {
          title: "مساهم في المصادر المفتوحة",
          description: "ساهمت في التوثيق وإصلاح الأخطاء لمكتبات شائعة في بيئة React.",
        }
      ]
    },
    mindset: {
      title: "طريقتي في الشغل",
      subtitle: "كيف أفكر وأخطط وأبني البرمجيات.",
      status: "الحالة: جاهز للشغل",
      initialMessage: "جرب أمر عشان تشوف كيف أشتغل وأطلق المنتجات.",
      placeholder: "اكتب أمر...",
      run: "شغّل",
      suggestionsLabel: "أوامر مقترحة:",
      copy: "نسخ",
      copied: "تم!",
      reset: "مسح",
      tabs: [
        {
          id: 'principles',
          label: '/principles',
          title: "مبادئي الأساسية",
          description: "قواعدي في كتابة الكود",
          content: [
            "DRY & KISS: أكتب كود سهل القراءة والاختبار، وصعب ينكسر.",
            "المستخدم أولاً: كل سطر كود لازم يخدم تجربة المستخدم.",
            "الأداء أولاً: التحسين مو شي ثانوي، هو أساسي.",
            "سهولة الوصول: الويب للكل. أبني مع مراعاة معايير a11y."
          ]
        },
        {
          id: 'workflow',
          label: '/workflow',
          title: "طريقة شغلي",
          description: "كيف أنتقل من الفكرة للمنتج",
          content: [
            "١. التحليل والتصميم: أفهم 'ليش' قبل 'كيف'.",
            "٢. Agile: أطلق باستمرار وآخذ ردود فعل.",
            "٣. الاختبار الآلي: عشان أنام مرتاح.",
            "٤. CI/CD: أأتمت الشغل الممل وأركز على البناء."
          ]
        },
        {
          id: 'quality',
          label: '/quality',
          title: "معايير الجودة",
          description: "كيف أضمن الكود يكون قابل للتوسع",
          content: [
            "Type Safety: TypeScript ضروري لأي تطبيق ويب كبير.",
            "البنية النظيفة: أفصل المهام عشان الكود يكون قابل للصيانة.",
            "معالجة الأخطاء: التطبيق يتعامل مع الأخطاء بشكل لطيف.",
            "التوثيق: الكود يقولك كيف، التعليقات تقولك ليش."
          ]
        },
        {
          id: 'learning',
          label: '/learning',
          title: "التعلم المستمر",
          description: "كيف أطور نفسي",
          content: [
            "رادار التقنية: دايم أتابع الأدوات الجديدة (حالياً AI Agents).",
            "التعلم من الخبراء: ومساعدة الجدد.",
            "مراجعة الكود: أفضل طريقة للتعلم والتعليم.",
            "التعمق: أفهم كيف الأدوات تشتغل من جوا."
          ]
        }
      ],
      commands: [
        { cmd: 'help', desc: 'عرض الأوامر' },
        { cmd: 'about', desc: 'معلومات عني' },
        { cmd: 'contact', desc: 'طرق التواصل' },
        { cmd: 'clear', desc: 'مسح الشاشة' }
      ]
    },
    contact: {
      title: "تواصل معي",
      subtitle: "متاح حالياً لفرص Co-op والمشاريع الجديدة.",
      form: {
        name: "الاسم",
        email: "الإيميل",
        message: "الرسالة",
        submit: "أرسل",
        success: "انرسلت الرسالة!"
      },
      socials: {
        linkedin: "لينكد إن",
        email: "راسلني"
      }
    },
    player: {
      nowPlaying: "يشتغل: شرح المشروع",
      speed: "السرعة",
      close: "إغلاق",
      minimize: "تصغير",
      expand: "تكبير",
      play: "تشغيل",
      pause: "إيقاف",
      rewind: "رجوع 5 ثواني",
      forward: "تقدم 5 ثواني",
      switchLang: "غير لغة الصوت",
      seek: "التنقل"
    }
  }
};

