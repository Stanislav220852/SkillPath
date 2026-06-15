const enTranslations = {
  footer: {
    navigation: "Navigation",
    contacts: "Contacts",
    socials: "Social Media",
    rights: "All rights reserved",
    desc: "Empowering the next generation of builders, hackers, and creators. Start your tech journey today.",
  },
  companies: {
    title: "Our graduates work at",
  },
  testimonials: {
    title: "Real stories from",
    titleAccent: "our students",
    items: [
      { name: "Alex Petrov",    role: "Junior Frontend @ Yandex",  text: "Leaving accounting at 30 was terrifying. I thought coding was for math geniuses. But the course walks you step by step from basic tags to complex stuff. The community chat and clear roadmap kept me going. It really works!", before: "Accountant", after: "$3k/mo" },
      { name: "Maria Volkova",  role: "ML Engineer @ Tinkoff",     text: "I had zero math background. The roadmap broke everything into bite-sized pieces. Now I train models at a top bank.", before: "Marketing", after: "$5k/mo" },
      { name: "Daniel Kim",     role: "Pentester @ Group-IB",      text: "From watching Mr. Robot to actually hacking systems legally. Best decision of my career.", before: "Sysadmin", after: "$4k/mo" },
      { name: "Sofia Lebedeva", role: "Data Analyst @ Avito",      text: "Spent 2 years watching random YouTube tutorials — total chaos. SkillPath gave me structure. My mentor was brutally honest with feedback and helped me build a real portfolio. Got hired at Avito in 6 months!", before: "Student", after: "$3.5k/mo" },
      { name: "Igor Savchenko", role: "Backend Dev @ Ozon",        text: "After the army I thought it was too late for IT. A friend shared SkillPath, I took the test and got on the backend roadmap. Wrote my first API in 4 months, got an offer in 7. Mentors actually review your code. Best investment ever.", before: "Military", after: "$3.2k/mo" },
      { name: "Anna Krylova",   role: "Mobile Dev @ VK",           text: "Joined SkillPath as a stay-at-home mom who didn't know what Git was. Studied at night while the baby slept. The mobile dev roadmap is incredible: every step is clear, projects are real. Now I work remotely at VK and finally have financial independence.", before: "Stay-at-home mom", after: "$3.8k/mo" },
    ]
  },
  faq: {
    title: "Frequently Asked",
    titleAccent: "Questions",
    items: [
      { q: "How much does it cost?",              a: "We have a free tier with basic roadmaps and a Pro plan starting from $19/month with mentor access, certificates and projects." },
      { q: "How long until I get a job?",         a: "Most students land their first offer within 6-8 months of focused learning (10h/week). Some do it in 4 months, others in a year — it's your pace." },
      { q: "Do I need any coding background?",    a: "Nope. 60% of our students started from zero. The roadmaps are built for absolute beginners with clear step-by-step progression." },
      { q: "What if I get stuck?",                a: "You get a personal mentor, 24/7 AI copilot and an active Discord community of 5000+ students helping each other." },
      { q: "Do you help with job placement?",     a: "Yes — resume reviews, mock interviews, referrals to partner companies (Yandex, Tinkoff, Sber, Avito) and a job board with exclusive openings." },
      { q: "Can I switch roadmaps later?",        a: "Absolutely. You can switch anytime, and completed skills carry over where they overlap." },
    ]
  },
  pricing: {
    title: "Choose your",
    titleAccent: "plan",
    subtitle: "Start free. Upgrade when you're ready to level up.",
    monthly: "Monthly",
    yearly: "Yearly",
    save: "Save 20%",
    popular: "Most Popular",
    perMonth: "/month",
    cta: "Get Started",
    plans: [
      { name: "Free",    price: 0,  yearPrice: 0,    desc: "Perfect to explore",     features: ["All public roadmaps", "Community access", "Basic progress tracking", "1 free mentor session"], cta: "Start Free" },
      { name: "Pro",     price: 19, yearPrice: 15,   desc: "For serious learners",   features: ["Everything in Free", "Unlimited mentor chat", "All certificates", "Live workshops", "Project reviews", "Priority support"], cta: "Go Pro", popular: true },
      { name: "Premium", price: 49, yearPrice: 39,   desc: "Full career package",    features: ["Everything in Pro", "1-on-1 weekly mentor", "Interview prep program", "Job placement help", "Resume & LinkedIn review", "Lifetime access"], cta: "Go Premium" },
    ]
  },
  mini: {
    title: "Find your",
    titleAccent: "perfect path",
    subtitle: "Answer 5 quick questions",
    questions: [
      { q: "What gets you excited?", opts: [
        { emoji: "🎨", text: "Beautiful design", v: "frontend" },
        { emoji: "🤖", text: "Smart machines",   v: "ai" },
        { emoji: "🛡", text: "Solving puzzles",  v: "cybersec" },
        { emoji: "📊", text: "Finding patterns", v: "datascience" },
      ]},
      { q: "Your superpower?", opts: [
        { emoji: "✨", text: "Visual taste",     v: "frontend" },
        { emoji: "🧮", text: "Math & logic",     v: "ai" },
        { emoji: "🔍", text: "Attention to detail", v: "cybersec" },
        { emoji: "📈", text: "Spotting trends",  v: "datascience" },
      ]},
      { q: "Ideal Saturday?", opts: [
        { emoji: "🖌", text: "Drawing concepts", v: "frontend" },
        { emoji: "📚", text: "Reading research", v: "ai" },
        { emoji: "🕵", text: "Solving mysteries", v: "cybersec" },
        { emoji: "📉", text: "Analyzing data",   v: "datascience" },
      ]},
      { q: "Pick a tool you'd love to master:", opts: [
        { emoji: "⚛️", text: "Figma & React",    v: "frontend" },
        { emoji: "🧠", text: "PyTorch & TensorFlow", v: "ai" },
        { emoji: "🔓", text: "Kali Linux & Burp Suite", v: "cybersec" },
        { emoji: "📊", text: "SQL & Tableau",    v: "datascience" },
      ]},
      { q: "What kind of impact do you want?", opts: [
        { emoji: "🌐", text: "Make the web beautiful", v: "frontend" },
        { emoji: "🚀", text: "Build the future of AI", v: "ai" },
        { emoji: "🛡️", text: "Protect people online",  v: "cybersec" },
        { emoji: "💡", text: "Turn data into decisions", v: "datascience" },
      ]},
    ],
    result: "You're best suited for",
    cta: "See full roadmap",
    retake: "Take again",
  },
  nav: {
    profs: "Professions",
    roads: "Roadmaps",
    mentors: "Mentors",
    login: "Login",
    loginTitle: "Welcome back",
    loginSubtitle: "Login to continue your journey",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Password",
    loginBtn: "Sign In",
    noAccount: "Don't have an account?",
    signUp: "Sign up",
    orContinue: "or continue with",
    comingSoon: "Coming soon! 🚀",
    mentorsToast: "Mentor matching is launching next month",
  },
  hero: {
    badge: "SkillPath Beta 2.0",
    t1: "Choose Your",
    t2: "Future Class",
    t3: "In Tech",
    desc: "Interactive guide for youth IT academy. Find the profession that fits your vibe. Whether you love breaking things or building them—start your journey here.",
    btnQuest: "Start Your Quest",
    btnRoles: "Explore Roles"
  },
  roles: {
    t: "Select Your",
    ts: "Character Class",
    d: "Discover the paths available in the tech realm. Each class has unique abilities, tools, and a specialized skill tree.",
    f: { t: "Frontend Dev", d: "Master of the visual realm. Create stunning UI/UX with code and design magic." },
    ai: { t: "AI Engineer", d: "Train neural networks. Speak to machines and build the artificial minds of tomorrow." },
    cs: { t: "Cybersec", d: "The digital guardian. Hack systems to patch them and protect data from dark hats." },
    ds: { t: "Data Scientist", d: "The modern alchemist. Turn raw data into predictive gold and uncover hidden truths." },
    view: "View Roadmap"
  },
  steps: {
    t: "How to begin your",
    ts: "Adventure",
    s1: { t: "Take the Aptitude Test", d: "A quick 5-minute interactive quiz to analyze your vibe, interests, and logic style." },
    s2: { t: "Get Your Roadmap", d: "Unlock a personalized skill tree with curated tutorials, quests, and mini-projects." },
    s3: { t: "Level Up & Connect", d: "Join guilds (cohorts), find mentors, and build a portfolio to showcase your skills." }
  },
  profPage: {
    title1: "Tech",
    title2: "Professions",
    subtitle: "Explore all available career paths in the tech industry",
    skills: "Key Skills",
    salary: "Salary Range",
    watchVideo: "Watch overview",
    dayInLife: "Day in Life",
    tools: "Popular Tools",
    juniorLabel: "Junior",
    seniorLabel: "Senior",
    openRoadmap: "Open Full Roadmap",
    selectProf: "Select a profession",
    back: "Back",
  },
  roadmaps: {
    title: "Skill",
    titleSuffix: "Roadmaps",
    subtitle: "Personalized learning roadmaps for every tech career path",
    viewBtn: "View Roadmap",
    interactiveLabel: "Interactive Roadmap",
    interactiveDesc: "Click on a skill to explore details. Track your completed milestones.",
    progress: "Progress",
    progressDone: "% complete",
    resources: "Resources",
    markDone: "Mark as completed",
    markNotDone: "Mark as not completed",
    startLearning: "Start Learning",
    filters: { all: "All", must: "Must-have", core: "Core", pro: "Pro" },
    totalTime: "Total time",
    weeks: "weeks",
    hoursPerWeek: "h/week",
    searchPlaceholder: "Search skills...",
    continueBtn: "Continue",
    nothingFound: "No skills match your search",
    reset: "Reset progress",
    learningNow: "learning right now",
    toastPhase: "Phase Complete!",
    toastRoadmap: "Roadmap Complete! You're a beast 🔥",
    cardProgressLabel: "complete",
    phases: {
      frontend: {
        title: "Frontend Developer",
        colorClass: "cyan",
        phases: [
          {
            phase: "Fundamentals",
            skills: [
              { id: "html-css", title: "HTML & CSS", description: "Page layout, flexbox, grid, animations. The foundation of all visuals.", resources: ["MDN Web Docs", "CSS Tricks", "freeCodeCamp"], duration: "4 wks", tag: "Must" },
              { id: "js-core", title: "JavaScript Core", description: "Variables, functions, DOM, async. The language that brings pages to life.", resources: ["javascript.info", "Eloquent JS", "You Don't Know JS"], duration: "6 wks", tag: "Must" },
            ]
          },
          {
            phase: "Frameworks",
            skills: [
              { id: "react", title: "React", description: "Components, hooks, state. The most popular UI framework in the world.", resources: ["react.dev", "Scrimba React", "Epic React"], duration: "8 wks", tag: "Core" },
              { id: "typescript", title: "TypeScript", description: "Typing makes code reliable and scalable. Must-have in 2024.", resources: ["TypeScript Handbook", "Total TypeScript", "TS Exercises"], duration: "3 wks", tag: "Core" },
            ]
          },
          {
            phase: "Advanced",
            skills: [
              { id: "state", title: "State Management", description: "Zustand, Redux Toolkit, Jotai — managing global app state.", resources: ["Zustand docs", "Redux Toolkit docs", "Jotai"], duration: "3 wks", tag: "Pro" },
              { id: "testing", title: "Testing", description: "Vitest, Playwright — reliable code requires tests.", resources: ["Testing Library", "Vitest Docs", "Playwright"], duration: "3 wks", tag: "Pro" },
              { id: "deploy", title: "Deploy & CI/CD", description: "Vercel, Netlify, GitHub Actions — delivering code to users.", resources: ["Vercel Docs", "GitHub Actions", "Docker Intro"], duration: "2 wks", tag: "Pro" },
            ]
          }
        ]
      },
      ai: {
        title: "AI / ML Engineer",
        colorClass: "pink",
        phases: [
          {
            phase: "Fundamentals",
            skills: [
              { id: "python", title: "Python", description: "Syntax, data structures, OOP. The main language of the AI/ML world.", resources: ["Python.org", "Automate the Boring Stuff", "RealPython"], duration: "5 wks", tag: "Must" },
              { id: "math", title: "Math for ML", description: "Linear algebra, statistics, calculus. Without this, neural networks are a black box.", resources: ["3Blue1Brown", "Khan Academy", "Mathematics for ML book"], duration: "6 wks", tag: "Must" },
            ]
          },
          {
            phase: "Machine Learning",
            skills: [
              { id: "sklearn", title: "Scikit-learn", description: "Classic ML algorithms: regression, classification, clustering.", resources: ["sklearn docs", "Kaggle Learn", "Hands-on ML book"], duration: "5 wks", tag: "Core" },
              { id: "dl", title: "Deep Learning", description: "PyTorch — neural networks, CNN, RNN. The foundation of modern AI.", resources: ["fast.ai", "PyTorch tutorials", "Deep Learning book"], duration: "8 wks", tag: "Core" },
            ]
          },
          {
            phase: "Specialization",
            skills: [
              { id: "nlp", title: "NLP & LLMs", description: "Transformers, fine-tuning, RAG — working with language models.", resources: ["Hugging Face", "LLM course", "LangChain docs"], duration: "6 wks", tag: "Pro" },
              { id: "mlops", title: "MLOps", description: "MLflow, DVC, deploying models to production.", resources: ["MLflow docs", "Made With ML", "Full Stack Deep Learning"], duration: "4 wks", tag: "Pro" },
            ]
          }
        ]
      },
      cybersec: {
        title: "Cybersecurity Specialist",
        colorClass: "purple",
        phases: [
          {
            phase: "Fundamentals",
            skills: [
              { id: "networking", title: "Networking", description: "TCP/IP, DNS, HTTP, Wireshark. Without network knowledge — you can't understand attacks.", resources: ["CompTIA Network+", "Professor Messer", "TryHackMe"], duration: "6 wks", tag: "Must" },
              { id: "linux", title: "Linux & CLI", description: "Bash, permissions, processes. Most servers run on Linux.", resources: ["OverTheWire", "Linux Journey", "Bandit Wargame"], duration: "4 wks", tag: "Must" },
            ]
          },
          {
            phase: "Attacks & Defense",
            skills: [
              { id: "pentest", title: "Penetration Testing", description: "Kali Linux, Metasploit, OWASP Top 10. Hack legally.", resources: ["HackTheBox", "TryHackMe", "PentesterLab"], duration: "8 wks", tag: "Core" },
              { id: "webapp", title: "Web App Security", description: "SQL Injection, XSS, CSRF — web application vulnerabilities.", resources: ["OWASP WebGoat", "PortSwigger Academy", "DVWA"], duration: "5 wks", tag: "Core" },
            ]
          },
          {
            phase: "Advanced",
            skills: [
              { id: "siem", title: "SIEM & SOC", description: "Splunk, ELK — monitoring, incident detection.", resources: ["Splunk Fundamentals", "Blue Team Labs", "SANS SOC"], duration: "5 wks", tag: "Pro" },
              { id: "certs", title: "Certifications", description: "CEH, OSCP, CompTIA Security+ — certify your skills.", resources: ["CompTIA", "Offensive Security", "EC-Council"], duration: "Ongoing", tag: "Pro" },
            ]
          }
        ]
      },
      datascience: {
        title: "Data Scientist",
        colorClass: "blue",
        phases: [
          {
            phase: "Fundamentals",
            skills: [
              { id: "python-ds", title: "Python for Data", description: "Pandas, NumPy — processing and analyzing tabular data.", resources: ["Kaggle Python", "Pandas docs", "Python Data Science Handbook"], duration: "5 wks", tag: "Must" },
              { id: "sql", title: "SQL", description: "SELECT, JOIN, aggregations. Data lives in databases.", resources: ["Mode SQL Tutorial", "SQLZoo", "LeetCode SQL"], duration: "3 wks", tag: "Must" },
            ]
          },
          {
            phase: "Analysis & Visualization",
            skills: [
              { id: "eda", title: "EDA & Visualization", description: "Matplotlib, Seaborn, Plotly — find patterns in data.", resources: ["Kaggle EDA", "Plotly docs", "Seaborn gallery"], duration: "4 wks", tag: "Core" },
              { id: "stats", title: "Statistics", description: "Hypotheses, p-value, A/B tests — the foundation of data-driven decisions.", resources: ["StatQuest", "Think Stats", "Khan Statistics"], duration: "5 wks", tag: "Core" },
            ]
          },
          {
            phase: "ML & Production",
            skills: [
              { id: "ml-ds", title: "Machine Learning", description: "Sklearn, feature engineering, prediction models.", resources: ["Kaggle ML", "Hands-on ML", "fast.ai"], duration: "7 wks", tag: "Pro" },
              { id: "bi", title: "BI & Dashboards", description: "Tableau, Power BI, Superset — business visualization.", resources: ["Tableau Public", "Power BI Docs", "Metabase"], duration: "3 wks", tag: "Pro" },
              { id: "bigdata", title: "Big Data", description: "Spark, Hadoop — processing data at industrial scale.", resources: ["Databricks", "Apache Spark", "Coursera Big Data"], duration: "5 wks", tag: "Pro" },
            ]
          }
        ]
      },
      backend: {
        title: "Backend Developer",
        colorClass: "emerald",
        phases: [
          {
            phase: "Fundamentals",
            skills: [
              { id: "node", title: "Node.js & Express", description: "Server-side JavaScript, REST APIs, middleware.", resources: ["Node.js docs", "Express guide", "The Net Ninja"], duration: "5 wks", tag: "Must" },
              { id: "db-basics", title: "Databases Basics", description: "SQL vs NoSQL, schemas, queries, indexes.", resources: ["PostgreSQL Tutorial", "MongoDB University", "SQLBolt"], duration: "4 wks", tag: "Must" },
            ]
          },
          {
            phase: "Backend Skills",
            skills: [
              { id: "auth", title: "Auth & Security", description: "JWT, OAuth, sessions, hashing passwords.", resources: ["Auth0 Blog", "OWASP Guide", "JWT.io"], duration: "3 wks", tag: "Core" },
              { id: "apis", title: "REST & GraphQL", description: "API design patterns, versioning, GraphQL basics.", resources: ["REST API Design", "GraphQL.org", "Apollo Tutorial"], duration: "4 wks", tag: "Core" },
            ]
          },
          {
            phase: "Production",
            skills: [
              { id: "docker", title: "Docker & Containers", description: "Containerization, Docker Compose, deployment.", resources: ["Docker Docs", "Docker Mastery", "Play with Docker"], duration: "3 wks", tag: "Pro" },
              { id: "cloud", title: "Cloud (AWS/GCP)", description: "EC2, S3, Lambda, deploying to production.", resources: ["AWS Free Tier", "GCP Codelabs", "Cloud Guru"], duration: "5 wks", tag: "Pro" },
            ]
          }
        ]
      },
      mobile: {
        title: "Mobile Developer",
        colorClass: "amber",
        phases: [
          {
            phase: "Fundamentals",
            skills: [
              { id: "rn-basics", title: "React Native Basics", description: "Components, navigation, state management on mobile.", resources: ["RN Docs", "Expo Docs", "Academind RN"], duration: "5 wks", tag: "Must" },
              { id: "mobile-ui", title: "Mobile UI/UX", description: "iOS HIG, Material Design, gestures, animations.", resources: ["Apple HIG", "Material Design", "Mobbin"], duration: "3 wks", tag: "Must" },
            ]
          },
          {
            phase: "Native Features",
            skills: [
              { id: "native-api", title: "Native APIs", description: "Camera, GPS, push notifications, biometrics.", resources: ["RN Camera", "Expo Notifications", "RN Maps"], duration: "4 wks", tag: "Core" },
              { id: "state-mobile", title: "State & Storage", description: "Redux/Zustand, AsyncStorage, SQLite mobile.", resources: ["Zustand docs", "AsyncStorage", "WatermelonDB"], duration: "3 wks", tag: "Core" },
            ]
          },
          {
            phase: "Publishing",
            skills: [
              { id: "appstore", title: "App Store Publishing", description: "Build configs, signing, App Store / Play Store submission.", resources: ["Apple Developer", "Google Play Console", "EAS Build"], duration: "2 wks", tag: "Pro" },
              { id: "perf-mobile", title: "Mobile Performance", description: "Bundle size, render optimization, native modules.", resources: ["RN Performance", "Flipper", "Hermes engine"], duration: "3 wks", tag: "Pro" },
            ]
          }
        ]
      },
      devops: {
        title: "DevOps Engineer",
        colorClass: "orange",
        phases: [
          {
            phase: "Fundamentals",
            skills: [
              { id: "linux-devops", title: "Linux & Bash", description: "Shell scripting, processes, permissions, networking.", resources: ["Linux Journey", "Bash Academy", "OverTheWire"], duration: "4 wks", tag: "Must" },
              { id: "git-devops", title: "Git & CI/CD Basics", description: "Advanced Git, GitHub Actions, GitLab CI.", resources: ["Pro Git book", "GitHub Actions", "GitLab CI Docs"], duration: "3 wks", tag: "Must" },
            ]
          },
          {
            phase: "Infrastructure",
            skills: [
              { id: "k8s", title: "Kubernetes", description: "Pods, deployments, services, ingress, Helm charts.", resources: ["K8s.io tutorials", "KodeKloud", "Helm docs"], duration: "6 wks", tag: "Core" },
              { id: "terraform", title: "Terraform & IaC", description: "Infrastructure as Code, providers, state management.", resources: ["HashiCorp Learn", "Terraform Up & Running", "Pluralsight"], duration: "4 wks", tag: "Core" },
            ]
          },
          {
            phase: "Production",
            skills: [
              { id: "monitoring", title: "Monitoring & Logs", description: "Prometheus, Grafana, ELK stack, alerting.", resources: ["Prometheus Docs", "Grafana Tutorials", "Elastic Guide"], duration: "4 wks", tag: "Pro" },
              { id: "aws-devops", title: "AWS / Cloud Pro", description: "ECS, EKS, CloudFormation, cost optimization.", resources: ["AWS Solutions Architect", "A Cloud Guru", "Cloud Resume"], duration: "6 wks", tag: "Pro" },
            ]
          }
        ]
      },
      gamedev: {
        title: "Game Developer",
        colorClass: "rose",
        phases: [
          {
            phase: "Fundamentals",
            skills: [
              { id: "csharp", title: "C# & Unity Basics", description: "Programming fundamentals through Unity engine.", resources: ["Unity Learn", "Brackeys YouTube", "C# Microsoft Docs"], duration: "6 wks", tag: "Must" },
              { id: "game-math", title: "Math for Games", description: "Vectors, matrices, trigonometry, physics basics.", resources: ["3Blue1Brown", "Real-Time Rendering", "Math for Games"], duration: "4 wks", tag: "Must" },
            ]
          },
          {
            phase: "Game Design",
            skills: [
              { id: "2d-games", title: "2D Game Development", description: "Sprites, animations, collisions, tilemaps.", resources: ["Unity 2D", "GDQuest Godot", "Pixel art assets"], duration: "5 wks", tag: "Core" },
              { id: "3d-games", title: "3D Game Development", description: "Models, lighting, materials, cameras, physics.", resources: ["Unity 3D", "Unreal Engine Docs", "Blender Guru"], duration: "8 wks", tag: "Core" },
            ]
          },
          {
            phase: "Specialization",
            skills: [
              { id: "shaders", title: "Shaders & Graphics", description: "HLSL/GLSL, shader graph, post-processing effects.", resources: ["Catlike Coding", "Book of Shaders", "Ronja Shader Tutorials"], duration: "6 wks", tag: "Pro" },
              { id: "multiplayer", title: "Multiplayer & Networking", description: "Mirror, Netcode, server architecture, lag compensation.", resources: ["Mirror Networking", "Photon Docs", "Gaffer on Games"], duration: "5 wks", tag: "Pro" },
            ]
          }
        ]
      },
    },
    cards: [
      { title: "Frontend Dev", desc: "Master of the visual realm. Create stunning UI/UX with code and design magic.", colorClass: "cyan", roadmapKey: "frontend" },
      { title: "AI Engineer", desc: "Train neural networks. Speak to machines and build the artificial minds of tomorrow.", colorClass: "pink", roadmapKey: "ai" },
      { title: "Cybersec", desc: "The digital guardian. Hack systems to patch them and protect data from dark hats.", colorClass: "purple", roadmapKey: "cybersec" },
      { title: "Data Scientist", desc: "The modern alchemist. Turn raw data into predictive gold and uncover hidden truths.", colorClass: "blue", roadmapKey: "datascience" },
      { title: "Backend Dev",    desc: "Architect of the server side. APIs, databases, and the engine behind every app.",     colorClass: "emerald", roadmapKey: "backend" },
      { title: "Mobile Dev",     desc: "Build iOS and Android apps that millions carry in their pockets every day.",          colorClass: "amber",   roadmapKey: "mobile" },
      { title: "DevOps Engineer",desc: "Master of infrastructure. Automate everything, ship code fast and reliably.",         colorClass: "orange",  roadmapKey: "devops" },
      { title: "Game Developer", desc: "Create worlds. Unity, Unreal, shaders — turn your imagination into playable reality.",colorClass: "rose",    roadmapKey: "gamedev" }
    ]
  },
  bento: {
    title1: "Everything you need to",
    title2: "level up",
    items: {
      aptitude:   { t: "Aptitude Test",   d: "5-minute interactive quiz that decodes your brain and matches you with the perfect tech class." },
      roadmaps:   { t: "Roadmaps",        d: "Step-by-step skill trees with curated resources and milestones." },
      mentors:    { t: "Mentors",         d: "Learn from engineers at top companies." },
      certs:      { t: "Certificates",    d: "Earn NFT-powered certificates upon completing roadmaps." },
      workshops:  { t: "Live Workshops",  d: "Weekly coding sessions, CTFs and ML hackathons." },
      library:    { t: "Curated Library", d: "Hand-picked tutorials, docs and video courses — no noise." },
      career:     { t: "Career Growth",   d: "Salary insights, interview prep and portfolio reviews." },
      copilot:    { t: "AI Copilot",      d: "Your personal learning assistant available 24/7." },
    }
  },
  stats: {
    students: "Students",
    mentors: "Mentors",
    profs: "Professions",
    completion: "Completion",
  }
};

export default enTranslations;
