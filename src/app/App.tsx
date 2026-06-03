import React, { useEffect, useState, createContext, useContext } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider, useTheme } from "next-themes";
import {
  Code2,
  Cpu,
  ShieldAlert,
  Database,
  Sparkles,
  ChevronRight,
  Terminal,
  Layers,
  ArrowRight,
  Sun,
  Moon,
  Menu,
  X,
  ArrowUp,
  ChevronDown,
} from "lucide-react";
import { Quiz } from "./components/utils/QuizQuest.tsx";
import { ProfessionsPage } from "./components/pages/ProfessionsPage.tsx";
import { RoadmapsPage } from "./components/pages/RoadmapsPage.tsx";
import { SkillLearningPage } from "./components/pages/SkillLearningPage.tsx";
import { MouseSpotlight } from "./components/utils/MouseSpotlight.tsx";
import { BentoShowcase } from "./components/utils/BentoShowcase.tsx";
import { StatsSection } from "./components/utils/StatsSection.tsx";
import { TechMarquee } from "./components/utils/TechMarquee.tsx";
import { TextScramble } from "./components/utils/TextScramble.tsx";
import { TiltCard } from "./components/utils/TiltCard.tsx";
import { MagneticButton } from "./components/utils/MagneticButton.tsx";
import { AnimatedGrid } from "./components/utils/AnimatedGrid.tsx";
import { MentorsPage } from "./components/pages/MentorsPage.tsx";
import { ProjectsShowcase } from "./components/utils/ProjectsShowcase.tsx";
import { CompaniesStrip } from "./components/utils/CompaniesStrip.tsx";
import { TestimonialsCarousel } from "./components/utils/TestimonialsCarousel.tsx";
import { FAQAccordion } from "./components/utils/FAQAccordion.tsx";
import { PricingTable } from "./components/utils/PricingTable.tsx";
import { MiniQuiz } from "./components/utils/MiniQuiz.tsx";
import { BootstrapInfo } from "./components/utils/BootstrapInfo.tsx";
import { 
  Instagram, 
  Send, // для Telegram
  Youtube, 
  Github,
  Mail,
  Phone,
   Server,       // ← добавить
  Smartphone,   // ← добавить
  Gamepad2
} from "lucide-react";


// --- ДАННЫЕ ПЕРЕВОДОВ ---
const translations = {
  EN: {
    // EN
footer: {
  navigation: "Navigation",
  contacts: "Contacts",
  socials: "Social Media",
  rights: "All rights reserved",
  desc: "Empowering the next generation of tech creators.",
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
    footer: {
      desc: "Empowering the next generation of builders, hackers, and creators. Start your tech journey today."
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
  },
  RU: {
    companies: {
      title: "Наши выпускники работают в",
    },
     testimonials: {
      title: "Реальные истории",
      titleAccent: "наших студентов",
      items: [
        { name: "Алексей Петров",   role: "Junior Frontend @ Yandex",  text: "Уходить из бухгалтерии в 30 лет было дико страшно, казалось, что код — это для гениев математики. Но курс построен так, что тебя ведут за руку от простых тегов до сложных штук. Было ли тяжело? Да, иногда хотелось всё бросить. Но поддержка в чате и чёткий план не дали слиться. Ребята, это реально работает!", before: "Бухгалтер", after: "$3k/мес" },
        { name: "Мария Волкова",    role: "ML Engineer @ Tinkoff",     text: "У меня был ноль по математике. Роадмап разбил всё на маленькие шаги. Сейчас тренирую модели в банке.", before: "Маркетолог", after: "$5k/мес" },
        { name: "Данил Ким",        role: "Pentester @ Group-IB",      text: "От просмотра Mr. Robot до реальных взломов систем легально. Лучшее решение в карьере.", before: "Сисадмин", after: "$4k/мес" },
        { name: "София Лебедева",   role: "Data Analyst @ Avito",      text: "Два года пыталась учиться сама по роликам на YouTube. В итоге каша в голове и полное ощущение, что IT не для меня. В SkillPath пришла ради структуры. Ментор просто спас: разложил всё по полочкам, честно критиковал домашку и помог собрать нормальное портфолио. Через полгода я прошла собес в Авито!", before: "Студентка", after: "$3.5k/мес" },
        { name: "Игорь Савченко",   role: "Backend Dev @ Ozon",        text: "После армии думал, что в IT уже поздно. Друг скинул SkillPath, я прошёл тест и попал на бэкенд-роадмап. Через 4 месяца написал первый API, через 7 — получил оффер. Менторы реально разбирают твой код, а не просто ставят оценку. Лучшая инвестиция в жизни.", before: "Военнослужащий", after: "$3.2k/мес" },
        { name: "Анна Крылова",     role: "Mobile Dev @ VK",           text: "Пришла в SkillPath мамой в декрете, которая не знала, что такое Git. Училась по ночам, пока ребёнок спал. Роадмап по мобильной разработке — просто бомба: каждый шаг понятен, проекты реальные. Сейчас работаю удалённо в VK и наконец-то финансово независима.", before: "В декрете", after: "$3.8k/мес" },
      ]
    },
    faq: {
      title: "Частые",
      titleAccent: "вопросы",
      items: [
        { q: "Сколько это стоит?", a: "Обучение полностью бесплатное. У вас будет доступ ко всем учебным материалам и практическим заданиям без скрытых платежей и подписок." },
        { q: "Как быстро я найду работу?", a: "Всё зависит от вашего темпа и выбранного направления. В среднем наши студенты осваивают базу и собирают первое портфолио за 6–9 месяцев, после чего можно активно откликаться на вакансии." },
        { q: "Нужен ли опыт программирования?", a: "Нет, наши программы рассчитаны на новичков. Мы начинаем с самых азов, а интерактивный тест на старте поможет выбрать направление, которое подходит именно вам." },
        { q: "Что делать, если у меня возникнут трудности с заданием?", a: "Вы не останетесь одни. Вы всегда можете задать вопрос в нашем комьюнити или обратиться к менторам — практикующим IT-специалистам, которые помогут разобраться со сложной темой." },
        { q: "Помогаете с трудоустройством?", a: "Да, мы помогаем оформить сильное портфолио, составить резюме и делимся советами, как успешно проходить собеседования в IT-компании." },
        { q: "Можно ли переключиться на другое направление в процессе?", a: "Да, конечно. Если вы поймёте, что выбранная сфера вам не подходит, вы можете в любой момент открыть другой курс и начать изучать новую профессию." },
      ]
    },
    pricing: {
      title: "Выбери свой",
      titleAccent: "план",
      subtitle: "Начни бесплатно. Прокачайся когда будешь готов.",
      monthly: "Помесячно",
      yearly: "Годовой",
      save: "Скидка 20%",
      popular: "Популярный",
      perMonth: "/мес",
      cta: "Начать",
      plans: [
        { name: "Free",    price: 0,  yearPrice: 0,    desc: "Чтобы попробовать",   features: ["Все публичные роадмапы", "Доступ к сообществу", "Базовое отслеживание прогресса", "1 бесплатная сессия с ментором"], cta: "Начать бесплатно" },
        { name: "Pro",     price: 19, yearPrice: 15,   desc: "Для серьёзного обучения", features: ["Всё из Free", "Безлимит чата с ментором", "Все сертификаты", "Live-воркшопы", "Ревью проектов", "Приоритетная поддержка"], cta: "Перейти на Pro", popular: true },
        { name: "Premium", price: 49, yearPrice: 39,   desc: "Полный карьерный пакет", features: ["Всё из Pro", "1-на-1 с ментором еженедельно", "Программа подготовки к собесам", "Помощь с трудоустройством", "Ревью резюме и LinkedIn", "Доступ навсегда"], cta: "Перейти на Premium" },
      ]
    },
      footer: {
  navigation: "Навигация",
  contacts: "Контакты",
  socials: "Мы в соц. сетях",
  rights: "Все права защищены",
  desc: "Даем возможности новому поколению IT-создателей.",
},
    
    nav: {
      profs: "Профессии",
      roads: "Роадмапы",
      mentors: "Менторы",
      login: "Войти",
      loginTitle: "С возвращением",
      loginSubtitle: "Войдите чтобы продолжить обучение",
      emailPlaceholder: "Email",
      passwordPlaceholder: "Пароль",
      loginBtn: "Войти",
      noAccount: "Нет аккаунта?",
      signUp: "Регистрация",
      orContinue: "или войдите через",
      comingSoon: "Скоро! 🚀",
      mentorsToast: "Запуск раздела менторов уже в следующем месяце",
    },
    hero: {
      badge: "SkillPath Бета 2.0",
      t1: "Выбери своё",
      t2: "Направление",
      t3: "В IT",
      desc: "Интерактивный гид по IT-академии. Найди профессию, которая подходит именно тебе. Начни свой путь здесь.",
      btnQuest: "Начать тест",
      btnRoles: "Все Роли"
    },
    bento: {
      title1: "Всё, что нужно чтобы",
      title2: "прокачаться",
      items: {
        aptitude:   { t: "Тест на профориентацию", d: "5-минутный интерактивный квиз, который расшифрует твой мозг и подберёт идеальное направление." },
        roadmaps:   { t: "Роадмапы",               d: "Пошаговые деревья навыков с подобранными ресурсами и контрольными точками." },
        mentors:    { t: "Менторы",                d: "Учись у инженеров из топовых компаний." },
        certs:      { t: "Сертификаты",            d: "Получай NFT-сертификаты за прохождение роадмапов." },
        workshops:  { t: "Воркшопы вживую",        d: "Еженедельные кодинг-сессии, CTF и ML-хакатоны." },
        library:    { t: "Подборка материалов",    d: "Отобранные туториалы, доки и видеокурсы — без воды." },
        career:     { t: "Карьерный рост",         d: "Зарплатная аналитика, подготовка к собесам и ревью портфолио." },
        copilot:    { t: "AI Копилот",             d: "Твой персональный ассистент по обучению 24/7." },
      }
    },
    stats: {
      students: "Студентов",
      mentors: "Менторов",
      profs: "Профессий",
      completion: "Завершение",
    },
    roles: {
      t: "Выбери свое",
      ts: "Направление",
      d: "Исследуй доступные пути в мире технологий. У каждого наравления есть уникальные способности, инструменты и свое дерево навыков.",
      f: { t: "Frontend-разработчик", d: "Мастер визуального мира. Создавай потрясающие интерфейсы с помощью кода и магии дизайна." },
      ai: { t: "AI Инженер", d: "Обучай нейросети. Общайся с машинами и создавай искусственный интеллект будущего." },
      cs: { t: "Кибербезопасность", d: "Цифровой страж. Вскрывай системы, чтобы защитить их и спасти данные от хакеров." },
      ds: { t: "Data Scientist", d: "Современный алхимик. Превращай сырые данные в золото прогнозов и находи скрытые истины." },
      view: "Карта пути"
    },
    steps: {
      t: "Как начать свое",
      ts: "Приключение",
      s1: { t: "Пройти профориентацию", d: "Быстрый тест для анализа твоих интересов, который поможет подобрать идеальное направление в IT." },
      s2: { t: "Освоить базу", d: "Получи доступ к интерактивной программе обучения и пошагово изучай профессию на практике." },
      s3: { t: "Выйти на рынок", d: "Нарабатывай сильное портфолио, общайся с менторами в сообществе и готовься к первым офферам." }
    },
    footer: {
      desc: "Даем возможности новому поколению строителей, хакеров и творцов. Начни свое IT-путешествие сегодня."
    },
    profPage: {
      title1: "Карьерный",
      title2: "трек",
      subtitle: "Изучите все доступные карьерные пути в технологической индустрии",
      skills: "Ключевые навыки",
      salary: "Зарплатная вилка",
      watchVideo: "Смотреть обзор",
      dayInLife: "Один день из жизни",
      tools: "Популярные инструменты",
      juniorLabel: "Джуниор",
      seniorLabel: "Сеньор",
      openRoadmap: "Открыть полный курс",
      selectProf: "Выберите профессию",
      back: "Назад",
    },
    roadmaps: {
      title: "Карта",
      titleSuffix: "Развития",
      subtitle: "Персонализированные дорожные карты обучения для каждой профессии",
      viewBtn: "Показать роадмап",
      interactiveLabel: "Интерактивный роадмап",
      interactiveDesc: "Кликни на навык — изучи детали. Отмечай пройденные этапы.",
      progress: "Прогресс",
      progressDone: "% завершено",
      resources: "Ресурсы",
      markDone: "Отметить как пройденное",
      markNotDone: "Отметить как не пройденное",
      startLearning: "Начать обучение",
      filters: { all: "Все", must: "Обязательно", core: "Основа", pro: "Продвинутое" },
      totalTime: "Общее время",
      weeks: "недель",
      hoursPerWeek: "ч/неделя",
      searchPlaceholder: "Поиск навыков...",
      continueBtn: "Продолжить",
      nothingFound: "По запросу ничего не найдено",
      reset: "Сбросить прогресс",
      learningNow: "учат прямо сейчас",
      toastPhase: "Фаза завершена!",
      toastRoadmap: "Роадмап пройден! Ты зверь 🔥",
      cardProgressLabel: "завершено",
      phases: {
        frontend: {
          title: "Frontend-разработчик",
          colorClass: "cyan",
          phases: [
            {
              phase: "Основы",
              skills: [
                { id: "html-css", title: "HTML & CSS", description: "Разметка страниц, flexbox, grid, анимации. Основа всего визуала.", resources: ["MDN Web Docs", "CSS Tricks", "freeCodeCamp"], duration: "4 нед.", tag: "Must" },
                { id: "js-core", title: "JavaScript Core", description: "Переменные, функции, DOM, асинхронность. Язык, который оживляет страницы.", resources: ["javascript.info", "Eloquent JS", "You Don't Know JS"], duration: "6 нед.", tag: "Must" },
              ]
            },
            {
              phase: "Фреймворки",
              skills: [
                { id: "react", title: "React", description: "Компоненты, хуки, состояние. Самый популярный UI-фреймворк в мире.", resources: ["react.dev", "Scrimba React", "Epic React"], duration: "8 нед.", tag: "Core" },
                { id: "typescript", title: "TypeScript", description: "Типизация делает код надёжным и масштабируемым. Must-have в 2024.", resources: ["TypeScript Handbook", "Total TypeScript", "TS Exercises"], duration: "3 нед.", tag: "Core" },
              ]
            },
            {
              phase: "Продвинутый",
              skills: [
                { id: "state", title: "State Management", description: "Zustand, Redux Toolkit, Jotai — управление глобальным состоянием приложения.", resources: ["Zustand docs", "Redux Toolkit docs", "Jotai"], duration: "3 нед.", tag: "Pro" },
                { id: "testing", title: "Тестирование", description: "Vitest, Playwright — надёжный код требует тестов.", resources: ["Testing Library", "Vitest Docs", "Playwright"], duration: "3 нед.", tag: "Pro" },
                { id: "deploy", title: "Deploy & CI/CD", description: "Vercel, Netlify, GitHub Actions — доставка кода до пользователей.", resources: ["Vercel Docs", "GitHub Actions", "Docker Intro"], duration: "2 нед.", tag: "Pro" },
              ]
            }
          ]
        },
        
        ai: {
          title: "AI / ML Инженер",
          colorClass: "pink",
          phases: [
            {
              phase: "Основы",
              skills: [
                { id: "python", title: "Python", description: "Синтаксис, структуры данных, ООП. Основной язык AI/ML мира.", resources: ["Python.org", "Automate the Boring Stuff", "RealPython"], duration: "5 нед.", tag: "Must" },
                { id: "math", title: "Математика для ML", description: "Линейная алгебра, статистика, матанализ. Без этого нейросети — чёрный ящик.", resources: ["3Blue1Brown", "Khan Academy", "Mathematics for ML book"], duration: "6 нед.", tag: "Must" },
              ]
            },
            {
              phase: "Машинное обучение",
              skills: [
                { id: "sklearn", title: "Scikit-learn", description: "Классические алгоритмы ML: регрессия, классификация, кластеризация.", resources: ["sklearn docs", "Kaggle Learn", "Hands-on ML book"], duration: "5 нед.", tag: "Core" },
                { id: "dl", title: "Deep Learning", description: "PyTorch — нейросети, CNN, RNN. Основа современного AI.", resources: ["fast.ai", "PyTorch tutorials", "Deep Learning book"], duration: "8 нед.", tag: "Core" },
              ]
            },
            {
              phase: "Специализация",
              skills: [
                { id: "nlp", title: "NLP & LLMs", description: "Трансформеры, fine-tuning, RAG — работа с языковыми моделями.", resources: ["Hugging Face", "LLM course", "LangChain docs"], duration: "6 нед.", tag: "Pro" },
                { id: "mlops", title: "MLOps", description: "MLflow, DVC, deployment моделей в продакшн.", resources: ["MLflow docs", "Made With ML", "Full Stack Deep Learning"], duration: "4 нед.", tag: "Pro" },
              ]
            }
          ]
        },
        cybersec: {
          title: "Кибербезопасность",
          colorClass: "purple",
          phases: [
            {
              phase: "Основы",
              skills: [
                { id: "networking", title: "Сети (Networking)", description: "TCP/IP, DNS, HTTP, Wireshark. Без знания сетей — не понять атаки.", resources: ["CompTIA Network+", "Professor Messer", "TryHackMe"], duration: "6 нед.", tag: "Must" },
                { id: "linux", title: "Linux & CLI", description: "Bash, права доступа, процессы. Большинство серверов — Linux.", resources: ["OverTheWire", "Linux Journey", "Bandit Wargame"], duration: "4 нед.", tag: "Must" },
              ]
            },
            {
              phase: "Атаки и защита",
              skills: [
                { id: "pentest", title: "Penetration Testing", description: "Kali Linux, Metasploit, OWASP Top 10. Взламывай легально.", resources: ["HackTheBox", "TryHackMe", "PentesterLab"], duration: "8 нед.", tag: "Core" },
                { id: "webapp", title: "Web App Security", description: "SQL Injection, XSS, CSRF — уязвимости веб-приложений.", resources: ["OWASP WebGoat", "PortSwigger Academy", "DVWA"], duration: "5 нед.", tag: "Core" },
              ]
            },
            {
              phase: "Продвинутый",
              skills: [
                { id: "siem", title: "SIEM & SOC", description: "Splunk, ELK — мониторинг, обнаружение инцидентов.", resources: ["Splunk Fundamentals", "Blue Team Labs", "SANS SOC"], duration: "5 нед.", tag: "Pro" },
                { id: "certs", title: "Сертификации", description: "CEH, OSCP, CompTIA Security+ — подтверди навыки документально.", resources: ["CompTIA", "Offensive Security", "EC-Council"], duration: "Ongoing", tag: "Pro" },
              ]
            }
          ]
        },
        datascience: {
          title: "Data Scientist",
          colorClass: "blue",
          phases: [
            {
              phase: "Основы",
              skills: [
                { id: "python-ds", title: "Python для данных", description: "Pandas, NumPy — обработка и анализ табличных данных.", resources: ["Kaggle Python", "Pandas docs", "Python Data Science Handbook"], duration: "5 нед.", tag: "Must" },
                { id: "sql", title: "SQL", description: "SELECT, JOIN, агрегации. Данные живут в базах.", resources: ["Mode SQL Tutorial", "SQLZoo", "LeetCode SQL"], duration: "3 нед.", tag: "Must" },
              ]
            },
            {
              phase: "Анализ и визуализация",
              skills: [
                { id: "eda", title: "EDA & Визуализация", description: "Matplotlib, Seaborn, Plotly — найди паттерны в данных.", resources: ["Kaggle EDA", "Plotly docs", "Seaborn gallery"], duration: "4 нед.", tag: "Core" },
                { id: "stats", title: "Статистика", description: "Гипотезы, p-value, A/B тесты — основа data-driven решений.", resources: ["StatQuest", "Think Stats", "Khan Statistics"], duration: "5 нед.", tag: "Core" },
              ]
            },
            {
              phase: "ML и продакшн",
              skills: [
                { id: "ml-ds", title: "Machine Learning", description: "Sklearn, feature engineering, модели предсказания.", resources: ["Kaggle ML", "Hands-on ML", "fast.ai"], duration: "7 нед.", tag: "Pro" },
                { id: "bi", title: "BI & Дашборды", description: "Tableau, Power BI, Superset — визуализация для бизнеса.", resources: ["Tableau Public", "Power BI Docs", "Metabase"], duration: "3 нед.", tag: "Pro" },
                { id: "bigdata", title: "Big Data", description: "Spark, Hadoop — обработка данных в промышленных масштабах.", resources: ["Databricks", "Apache Spark", "Coursera Big Data"], duration: "5 нед.", tag: "Pro" },
              ]
            }
          ]
        },
        backend: {
          title: "Backend-разработчик",
          colorClass: "emerald",
          phases: [
            {
              phase: "Основы",
              skills: [
                { id: "node", title: "Node.js & Express", description: "Серверный JavaScript, REST API, middleware.", resources: ["Node.js docs", "Express guide", "The Net Ninja"], duration: "5 нед.", tag: "Must" },
                { id: "db-basics", title: "Базы данных", description: "SQL vs NoSQL, схемы, запросы, индексы.", resources: ["PostgreSQL Tutorial", "MongoDB University", "SQLBolt"], duration: "4 нед.", tag: "Must" },
              ]
            },
            {
              phase: "Бэкенд-навыки",
              skills: [
                { id: "auth", title: "Авторизация & безопасность", description: "JWT, OAuth, сессии, хеширование паролей.", resources: ["Auth0 Blog", "OWASP Guide", "JWT.io"], duration: "3 нед.", tag: "Core" },
                { id: "apis", title: "REST & GraphQL", description: "Проектирование API, версионирование, GraphQL.", resources: ["REST API Design", "GraphQL.org", "Apollo Tutorial"], duration: "4 нед.", tag: "Core" },
              ]
            },
            {
              phase: "Production",
              skills: [
                { id: "docker", title: "Docker & контейнеры", description: "Контейнеризация, Docker Compose, деплой.", resources: ["Docker Docs", "Docker Mastery", "Play with Docker"], duration: "3 нед.", tag: "Pro" },
                { id: "cloud", title: "Облака (AWS/GCP)", description: "EC2, S3, Lambda, деплой в продакшн.", resources: ["AWS Free Tier", "GCP Codelabs", "Cloud Guru"], duration: "5 нед.", tag: "Pro" },
              ]
            }
          ]
        },
        mobile: {
          title: "Mobile-разработчик",
          colorClass: "amber",
          phases: [
            {
              phase: "Основы",
              skills: [
                { id: "rn-basics", title: "React Native основы", description: "Компоненты, навигация, управление состоянием на мобиле.", resources: ["RN Docs", "Expo Docs", "Academind RN"], duration: "5 нед.", tag: "Must" },
                { id: "mobile-ui", title: "Mobile UI/UX", description: "iOS HIG, Material Design, жесты, анимации.", resources: ["Apple HIG", "Material Design", "Mobbin"], duration: "3 нед.", tag: "Must" },
              ]
            },
            {
              phase: "Нативные фичи",
              skills: [
                { id: "native-api", title: "Нативные API", description: "Камера, GPS, push-уведомления, биометрия.", resources: ["RN Camera", "Expo Notifications", "RN Maps"], duration: "4 нед.", tag: "Core" },
                { id: "state-mobile", title: "State & хранилище", description: "Redux/Zustand, AsyncStorage, SQLite на мобиле.", resources: ["Zustand docs", "AsyncStorage", "WatermelonDB"], duration: "3 нед.", tag: "Core" },
              ]
            },
            {
              phase: "Публикация",
              skills: [
                { id: "appstore", title: "App Store публикация", description: "Сборка, подпись, отправка в App Store / Play Store.", resources: ["Apple Developer", "Google Play Console", "EAS Build"], duration: "2 нед.", tag: "Pro" },
                { id: "perf-mobile", title: "Mobile производительность", description: "Размер бандла, оптимизация рендера, нативные модули.", resources: ["RN Performance", "Flipper", "Hermes engine"], duration: "3 нед.", tag: "Pro" },
              ]
            }
          ]
        },
        devops: {
          title: "DevOps Инженер",
          colorClass: "orange",
          phases: [
            {
              phase: "Основы",
              skills: [
                { id: "linux-devops", title: "Linux & Bash", description: "Shell-скрипты, процессы, права, сеть.", resources: ["Linux Journey", "Bash Academy", "OverTheWire"], duration: "4 нед.", tag: "Must" },
                { id: "git-devops", title: "Git & CI/CD основы", description: "Продвинутый Git, GitHub Actions, GitLab CI.", resources: ["Pro Git book", "GitHub Actions", "GitLab CI Docs"], duration: "3 нед.", tag: "Must" },
              ]
            },
            {
              phase: "Инфраструктура",
              skills: [
                { id: "k8s", title: "Kubernetes", description: "Pods, deployments, services, ingress, Helm charts.", resources: ["K8s.io tutorials", "KodeKloud", "Helm docs"], duration: "6 нед.", tag: "Core" },
                { id: "terraform", title: "Terraform & IaC", description: "Infrastructure as Code, провайдеры, управление state.", resources: ["HashiCorp Learn", "Terraform Up & Running", "Pluralsight"], duration: "4 нед.", tag: "Core" },
              ]
            },
            {
              phase: "Production",
              skills: [
                { id: "monitoring", title: "Мониторинг & логи", description: "Prometheus, Grafana, ELK stack, алертинг.", resources: ["Prometheus Docs", "Grafana Tutorials", "Elastic Guide"], duration: "4 нед.", tag: "Pro" },
                { id: "aws-devops", title: "AWS / Cloud Pro", description: "ECS, EKS, CloudFormation, оптимизация затрат.", resources: ["AWS Solutions Architect", "A Cloud Guru", "Cloud Resume"], duration: "6 нед.", tag: "Pro" },
              ]
            }
          ]
        },
        gamedev: {
          title: "Game-разработчик",
          colorClass: "rose",
          phases: [
            {
              phase: "Основы",
              skills: [
                { id: "csharp", title: "C# & Unity основы", description: "Программирование через движок Unity.", resources: ["Unity Learn", "Brackeys YouTube", "C# Microsoft Docs"], duration: "6 нед.", tag: "Must" },
                { id: "game-math", title: "Математика для игр", description: "Векторы, матрицы, тригонометрия, физика.", resources: ["3Blue1Brown", "Real-Time Rendering", "Math for Games"], duration: "4 нед.", tag: "Must" },
              ]
            },
            {
              phase: "Геймдизайн",
              skills: [
                { id: "2d-games", title: "2D разработка", description: "Спрайты, анимации, коллизии, тайлмапы.", resources: ["Unity 2D", "GDQuest Godot", "Pixel art assets"], duration: "5 нед.", tag: "Core" },
                { id: "3d-games", title: "3D разработка", description: "Модели, освещение, материалы, камеры, физика.", resources: ["Unity 3D", "Unreal Engine Docs", "Blender Guru"], duration: "8 нед.", tag: "Core" },
              ]
            },
            {
              phase: "Специализация",
              skills: [
                { id: "shaders", title: "Шейдеры & графика", description: "HLSL/GLSL, shader graph, пост-процессинг.", resources: ["Catlike Coding", "Book of Shaders", "Ronja Shader Tutorials"], duration: "6 нед.", tag: "Pro" },
                { id: "multiplayer", title: "Мультиплеер", description: "Mirror, Netcode, серверная архитектура.", resources: ["Mirror Networking", "Photon Docs", "Gaffer on Games"], duration: "5 нед.", tag: "Pro" },
              ]
            }
          ]
        }
      },
      cards: [
        { title: "Frontend Dev", desc: "Мастер визуального мира. Создавай потрясающие интерфейсы с помощью кода и магии дизайна.", colorClass: "cyan", roadmapKey: "frontend" },
        { title: "AI Engineer", desc: "Обучай нейросети. Общайся с машинами и создавай искусственный интеллект будущего.", colorClass: "pink", roadmapKey: "ai" },
        { title: "Cybersec", desc: "Цифровой страж. Вскрывай системы, чтобы защитить их и спасти данные от хакеров.", colorClass: "purple", roadmapKey: "cybersec" },
        { title: "Data Scientist", desc: "Современный алхимик. Превращай сырые данные в золото прогнозов и находи скрытые истины.", colorClass: "blue", roadmapKey: "datascience" },
        { title: "Backend Dev",     desc: "Архитектор серверной части. API, базы данных и движок за каждым приложением.",   colorClass: "emerald", roadmapKey: "backend" },
        { title: "Mobile Dev",      desc: "Создавай iOS и Android приложения, которые миллионы носят в карманах.",           colorClass: "amber",   roadmapKey: "mobile" },
        { title: "DevOps",          desc: "Хозяин инфраструктуры. Автоматизируй всё, доставляй код быстро и надёжно.",        colorClass: "orange",  roadmapKey: "devops" },
        { title: "Game Dev",        desc: "Создавай миры. Unity, Unreal, шейдеры — превращай воображение в играбельную реальность.", colorClass: "rose", roadmapKey: "gamedev" }
   ]
    },
    mini: {
  title: "Найди свой",
  titleAccent: "идеальный путь",
  subtitle: "Ответь на 5 быстрых вопросов",
  questions: [
    { q: "Что тебя зажигает?", opts: [
      { emoji: "🎨", text: "Красивый дизайн", v: "frontend" },
      { emoji: "🤖", text: "Умные машины",    v: "ai" },
      { emoji: "🛡", text: "Решать головоломки", v: "cybersec" },
      { emoji: "📊", text: "Искать паттерны", v: "datascience" },
    ]},
    { q: "Твоя суперсила?", opts: [
      { emoji: "✨", text: "Чувство вкуса",    v: "frontend" },
      { emoji: "🧮", text: "Математика и логика", v: "ai" },
      { emoji: "🔍", text: "Внимание к деталям", v: "cybersec" },
      { emoji: "📈", text: "Видеть тренды",    v: "datascience" },
    ]},
    { q: "Идеальная суббота?", opts: [
      { emoji: "🖌", text: "Рисовать концепты", v: "frontend" },
      { emoji: "📚", text: "Читать исследования", v: "ai" },
      { emoji: "🕵", text: "Расследовать тайны", v: "cybersec" },
      { emoji: "📉", text: "Анализировать данные", v: "datascience" },
    ]},
    { q: "Какой инструмент хочешь освоить?", opts: [
      { emoji: "⚛️", text: "Figma и React",    v: "frontend" },
      { emoji: "🧠", text: "PyTorch и TensorFlow", v: "ai" },
      { emoji: "🔓", text: "Kali Linux и Burp Suite", v: "cybersec" },
      { emoji: "📊", text: "SQL и Tableau",    v: "datascience" },
    ]},
    { q: "Какой след хочешь оставить?", opts: [
      { emoji: "🌐", text: "Сделать веб красивым", v: "frontend" },
      { emoji: "🚀", text: "Строить будущее ИИ", v: "ai" },
      { emoji: "🛡️", text: "Защищать людей в сети", v: "cybersec" },
      { emoji: "💡", text: "Превращать данные в решения", v: "datascience" },
    ]},
  ],
  result: "Тебе подходит",
  cta: "Открыть роадмап",
  retake: "Пройти ещё раз",
},
  },
};

type Lang = "EN" | "RU";
interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof translations.EN;
  currentPage: string;
  setCurrentPage: (p: string) => void;
  openRoadmap: string | null;
  setOpenRoadmap: (k: string | null) => void;
}

export const LanguageContext = createContext<LangCtx>({
  lang: 'EN',
  setLang: () => {},
  t: translations.EN,
  currentPage: 'home',
  setCurrentPage: () => {},
  openRoadmap: null,
  setOpenRoadmap: () => {},
});

const glassCard = "bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]";
const neonCyan = "text-cyan-500 dark:text-cyan-400 dark:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]";
const neonPink = "text-pink-500 dark:drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]";

/* ────────────────────────────────────────────────────────────
   useMediaQuery — определяем мобилку для условного рендера
──────────────────────────────────────────────────────────── */
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const handler = () => setMatches(m.matches);
    handler();
    m.addEventListener("change", handler);
    return () => m.removeEventListener("change", handler);
  }, [query]);
  return matches;
};

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <div className="w-10 h-10" />;
  }
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 text-slate-700 dark:text-white hover:bg-black/10 dark:hover:bg-white/20 transition-all backdrop-blur-md"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

const LanguageToggle = () => {
  const { lang, setLang } = useContext(LanguageContext);
  const cycleLang = () => {
    const order: Lang[] = ["EN", "RU"];
    const next = order[(order.indexOf(lang) + 1) % order.length];
    setLang(next);
  };
  return (
    <button
      onClick={cycleLang}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 text-slate-700 dark:text-white hover:bg-black/10 dark:hover:bg-white/20 transition-all backdrop-blur-md font-bold text-xs"
    >
      {lang}
    </button>
  );
};

const Hero = ({ onStartQuiz }: { onStartQuiz: () => void }) => {
  const { t } = useContext(LanguageContext);
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-28 md:pt-24 overflow-hidden pb-16 md:pb-20">
      <AnimatedGrid />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-500/10 dark:bg-pink-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 md:space-y-8 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-pink-500 dark:text-pink-400" />
            <TextScramble
              text={t.hero.badge}
              className="text-sm font-medium tracking-wide text-slate-600 dark:text-white/80"
            />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white">
            {t.hero.t1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500">{t.hero.t2}</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-500 dark:to-purple-500">{t.hero.t3}</span>
          </h1>

          <p className="text-base md:text-lg text-slate-600 dark:text-white/60 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            {t.hero.desc}
          </p>

          <div className="flex flex-wrap gap-3 md:gap-4 pt-2 md:pt-4 justify-center lg:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStartQuiz}
              className="px-6 md:px-8 py-3.5 md:py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold tracking-wide shadow-[0_0_15px_rgba(34,211,238,0.3)] dark:shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center gap-2 hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] dark:hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all"
            >
              {t.hero.btnQuest}
              <ChevronRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('roles')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 md:px-8 py-3.5 md:py-4 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-800 dark:text-white font-bold tracking-wide hover:bg-black/10 dark:hover:bg-white/10 transition-all backdrop-blur-md flex items-center gap-2"
            >
              {t.hero.btnRoles}
            </motion.button>
          </div>
        </motion.div>

        {/* Декоративная сцена — скрыта на мобилке, чтобы не растягивать экран */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[600px] w-full hidden lg:flex items-center justify-center"
        >
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute z-20 p-6 w-[320px] ${glassCard} border-t-black/10 dark:border-t-white/20 border-l-black/10 dark:border-l-white/20`}
          >
            <div className="aspect-square rounded-2xl overflow-hidden mb-6 relative group">
              <img
                src="https://images.unsplash.com/photo-1680783954745-3249be59e527?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzRCUyMHJvYm90JTIwbmVvbiUyMGN5YW4lMjBwaW5rfGVufDF8fHx8MTc3ODgyNzEwMHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="3D Robot"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 dark:from-[#0b1120] to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs font-bold text-cyan-300 dark:text-cyan-400 uppercase tracking-wider mb-1">AI Engineer</p>
                    <p className="text-sm text-white font-medium">Lvl 1 Novice</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center backdrop-blur-md border border-cyan-500/50">
                    <Cpu className="w-4 h-4 text-cyan-300 dark:text-cyan-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "45%" }}
                  transition={{ duration: 1.5, delay: 1 }}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-cyan-400 dark:to-blue-500 h-full rounded-full"
                />
              </div>
              <p className="text-xs text-slate-500 dark:text-white/50 text-right">45% to Lvl 2</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [10, -10, 10], x: [-5, 5, -5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className={`absolute -left-12 top-20 z-30 p-4 ${glassCard} flex items-center gap-4`}
          >
            <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-500/20 flex items-center justify-center border border-pink-200 dark:border-pink-500/30">
              <Code2 className={`w-6 h-6 ${neonPink}`} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-white">Frontend</p>
              <p className="text-xs text-slate-500 dark:text-white/60">UI/UX Magic</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [-15, 15, -15], x: [5, -5, 5] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className={`absolute -right-8 bottom-32 z-10 p-4 ${glassCard} flex items-center gap-4`}
          >
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center border border-purple-200 dark:border-purple-500/30">
              <ShieldAlert className="w-6 h-6 text-purple-500 dark:text-purple-400 dark:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-white">Cybersec</p>
              <p className="text-xs text-slate-500 dark:text-white/60">Defense Arts</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const RoleCard = ({ icon: Icon, title, desc, colorClass, roadmapKey }: {
  icon: any;
  title: string;
  desc: string;
  colorClass: string;
  roadmapKey: string;
}) => {
  const { t, setCurrentPage, setOpenRoadmap } = useContext(LanguageContext);
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`p-6 md:p-8 ${glassCard} relative overflow-hidden group hover:border-${colorClass}-400/50 dark:hover:border-${colorClass}-500/50 transition-all duration-300`}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-${colorClass}-500/5 dark:bg-${colorClass}-500/10 rounded-full blur-[40px] group-hover:bg-${colorClass}-500/10 dark:group-hover:bg-${colorClass}-500/20 transition-all`} />

      <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-${colorClass}-500/10 flex items-center justify-center mb-4 md:mb-6 border border-${colorClass}-500/20`}>
        <Icon className={`w-7 h-7 md:w-8 md:h-8 text-${colorClass}-500 dark:text-${colorClass}-400`} />
      </div>

      <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-slate-900 dark:text-white relative z-10">{title}</h3>
      <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed mb-5 md:mb-6 relative z-10 md:min-h-[60px]">
        {desc}
      </p>

      <button
        onClick={() => { setCurrentPage('roadmaps'); setOpenRoadmap(roadmapKey); }}
        className="text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all text-slate-800 dark:text-white relative z-10"
      >
        <span>{t.roles.view}</span>
        <ArrowRight className={`w-4 h-4 text-${colorClass}-500`} />
      </button>
    </motion.div>
  );
};

const RolesSection = () => {
  const { t, lang, setCurrentPage, setOpenRoadmap } = useContext(LanguageContext);
  const [showAll, setShowAll] = useState(false);

  // Иконки для каждого colorClass
  const iconMap: Record<string, any> = {
    cyan: Terminal,
    pink: Cpu,
    purple: ShieldAlert,
    blue: Database,
    emerald: Layers,
    amber: Smartphone,
    orange: Server,
    rose: Gamepad2,
  };

  const cards = t.roadmaps.cards;
  const visibleCards = showAll ? cards : cards.slice(0, 4);

 return (
    <section id="roles" className="py-16 md:py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 md:mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 text-slate-900 dark:text-white">
            {t.roles.t} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500 dark:from-cyan-400 dark:to-pink-500">{t.roles.ts}</span>
          </h2>
          <p className="text-slate-600 dark:text-white/60">{t.roles.d}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {visibleCards.map((card, i) => (
            <RoleCard
              key={card.roadmapKey}
              icon={iconMap[card.colorClass] || Layers}
              title={card.title}
              desc={card.desc}
              colorClass={card.colorClass}
              roadmapKey={card.roadmapKey}
            />
          ))}
        </div>

        {/* Кнопки под карточками */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 md:mt-14">
          {!showAll && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(true)}
              className="px-8 py-3.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-800 dark:text-white font-bold text-sm flex items-center gap-2 hover:bg-black/10 dark:hover:bg-white/10 transition-all backdrop-blur-md"
            >
              {lang === "RU" ? "Показать ещё" : "Show more"}
              <ChevronDown className="w-4 h-4" />
            </motion.button>
          )}

          {showAll && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentPage('roadmaps');
                setOpenRoadmap(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-all"
            >
              {lang === "RU" ? "Все роадмапы" : "All Roadmaps"}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
};

const StepsSection = () => {
  const { t } = useContext(LanguageContext);
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* LEFT — steps */}
          <div className="flex-1 space-y-6 md:space-y-8 w-full">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white text-center lg:text-left">
              {t.steps.t} <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500">{t.steps.ts}</span>
            </h2>

            <div className="space-y-5 md:space-y-6">
              {[t.steps.s1, t.steps.s2, t.steps.s3].map((item, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  key={i}
                  className={`p-5 md:p-6 ${glassCard} flex gap-4 md:gap-6 items-start`}
                >
                  <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-pink-500 drop-shadow-sm">
                    0{i+1}
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-slate-900 dark:text-white">{item.t}</h4>
                    <p className="text-sm text-slate-600 dark:text-white/60">{item.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT — device showcase (скрыт на мобилке) */}
          <div className="flex-1 relative w-full max-w-[500px] h-[600px] hidden lg:flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-[480px] h-[480px] rounded-full border border-dashed border-cyan-500/20 dark:border-cyan-500/30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-pink-500/20 dark:border-pink-500/30"
            />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              animate={{ y: [-8, 8, -8] }}
              transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
              className="relative z-20 w-[260px] h-[540px] rounded-[3rem] bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 p-3 shadow-2xl border-[3px] border-slate-700 dark:border-slate-800"
            >
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-30" />
              <div className="w-full h-full rounded-[2.3rem] bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 overflow-hidden relative">
                <div className="px-6 pt-4 pb-2 flex justify-between items-center text-[10px] font-bold text-slate-900 dark:text-white">
                  <span>9:41</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-2 rounded-sm bg-slate-900 dark:bg-white" />
                    <div className="w-4 h-2 rounded-sm bg-slate-900 dark:bg-white" />
                  </div>
                </div>
                <div className="px-5 pt-3 pb-4">
                  <p className="text-[10px] text-slate-500 dark:text-white/50 uppercase tracking-wider font-bold mb-1">Your Roadmap</p>
                  <p className="text-base font-black text-slate-900 dark:text-white">Frontend Dev</p>
                </div>
                <div className="px-5 mb-4">
                  <div className="flex justify-between text-[9px] mb-1 font-bold">
                    <span className="text-slate-500 dark:text-white/60">Progress</span>
                    <span className="text-cyan-600 dark:text-cyan-400">68%</span>
                  </div>
                  <div className="h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "68%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.6)]"
                    />
                  </div>
                </div>
                <div className="px-4 space-y-2">
                  {[
                    { name: "HTML & CSS", done: true,  color: "cyan" },
                    { name: "JavaScript",  done: true,  color: "cyan" },
                    { name: "React",       done: true,  color: "cyan" },
                    { name: "TypeScript",  done: false, color: "pink", current: true },
                    { name: "Testing",     done: false, color: "pink" },
                  ].map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        s.current
                          ? "bg-pink-50 dark:bg-pink-500/10 border border-pink-500/30"
                          : s.done
                            ? "bg-green-50 dark:bg-green-500/10"
                            : "bg-slate-50 dark:bg-white/5"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        s.done ? "bg-green-500" : s.current ? `bg-pink-500 animate-pulse` : "bg-slate-200 dark:bg-white/10"
                      }`}>
                        {s.done && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>}
                      </div>
                      <span className={`text-[11px] font-bold ${
                        s.done ? "text-slate-400 dark:text-white/40 line-through" : "text-slate-800 dark:text-white"
                      }`}>{s.name}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-3 text-center shadow-lg shadow-cyan-500/30">
                    <p className="text-[10px] text-white/80 font-medium">Continue</p>
                    <p className="text-xs text-white font-black">TypeScript →</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ────────────────────────────────────────────────────────────
   Navbar c МОБИЛЬНЫМ бургер-меню
──────────────────────────────────────────────────────────── */
const Navbar = ({ onLoginClick, onNavigate, onStartQuiz }: { onLoginClick: () => void; onNavigate?: () => void; onStartQuiz?: () => void }) => {
  const { t, lang, setCurrentPage, setOpenRoadmap } = useContext(LanguageContext);
  const [menuOpen, setMenuOpen] = useState(false);

  // блокируем скролл фона при открытом меню
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const go = (page: string) => {
    if (page === "quiz") {
      setMenuOpen(false);
      setOpenRoadmap(null);
      setCurrentPage('home');
      onStartQuiz?.();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    onNavigate?.();
    setCurrentPage(page);
    setOpenRoadmap(null);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    { label: lang === "RU" ? "Профориентационное\nтестирование" : "Career\nAssessment", page: "quiz" },
    { label: lang === "RU" ? "Профиль\nпрофессии" : "Profession\nProfiles", page: "professions" },
    { label: lang === "RU" ? "Обучающие\nкурсы" : "Learning\nCourses", page: "roadmaps" },
    { label: lang === "RU" ? "Наши\nменторы" : "Our\nMentors", page: "mentors" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="container mx-auto flex items-center justify-between">
        <button
          onClick={() => { onNavigate?.(); setCurrentPage('home'); setOpenRoadmap(null); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2 group hover:opacity-90 transition-opacity outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.3)] dark:shadow-[0_0_15px_rgba(34,211,238,0.5)] group-hover:scale-105 transition-transform">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors">SkillPath</span>
        </button>

        {/* Десктоп-меню */}
        <div className="hidden md:flex items-center gap-8 px-8 py-3 rounded-full bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md shadow-sm dark:shadow-none">
          {navItems.map((item) => (
            <button key={item.page} onClick={() => go(item.page)} className="text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-white/70 dark:hover:text-white transition-colors text-center leading-tight whitespace-pre-line">{item.label}</button>
          ))}
        </div>

        {/* Десктоп-кнопки */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        {/* Мобилка: язык/тема + бургер */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="p-2.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 text-slate-700 dark:text-white hover:bg-black/10 dark:hover:bg-white/20 transition-all backdrop-blur-md"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Мобильное выезжающее меню */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[80%] max-w-sm bg-white dark:bg-[#0b1120] border-l border-black/10 dark:border-white/10 p-6 flex flex-col md:hidden shadow-2xl"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <Layers className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">SkillPath</span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-2.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 text-slate-700 dark:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.page}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    onClick={() => go(item.page)}
                    className="flex items-center justify-between w-full px-5 py-4 rounded-2xl bg-black/5 dark:bg-white/5 text-base font-bold text-slate-800 dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-all"
                  >
                    <span className="text-left leading-tight">{item.label.replace(/\n/g, ' ')}</span>
                    <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  </motion.button>
                ))}
              </div>

              <button
                onClick={() => { setMenuOpen(false); go('quiz'); }}
                className="mt-auto w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2"
              >
                {lang === "RU" ? "Пройти тест" : "Take the Test"}
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

/* ────────────────────────────────────────────────────────────
   Кнопка «Наверх» — появляется после прокрутки
──────────────────────────────────────────────────────────── */
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed bottom-5 right-5 z-40 p-3.5 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/40 hover:scale-110 transition-transform"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

/* ────────────────────────────────────────────────────────────
   Sticky-CTA снизу (только мобилка) — главное действие под рукой
──────────────────────────────────────────────────────────── */
const MobileStickyCTA = ({ onStartQuiz }: { onStartQuiz: () => void }) => {
  const { t } = useContext(LanguageContext);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-30 p-3 md:hidden bg-gradient-to-t from-white dark:from-[#0b1120] to-transparent pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
        >
          <button
            onClick={onStartQuiz}
            className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base shadow-xl shadow-cyan-500/30 flex items-center justify-center gap-2"
          >
            {t.hero.btnQuest}
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ────────────────────────────────────────────────────────────
   «Показать ещё» — сворачивает доп-секции на мобилке
──────────────────────────────────────────────────────────── */
const MobileShowMore = ({ children }: { children: React.ReactNode }) => {
  const { lang } = useContext(LanguageContext);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [open, setOpen] = useState(false);

  // На десктопе показываем всё как обычно
  if (!isMobile) return <>{children}</>;

  return (
    <>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {!open && (
        <div className="py-8 flex justify-center">
          <button
            onClick={() => setOpen(true)}
            className="px-6 py-3.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-800 dark:text-white font-bold text-sm flex items-center gap-2 hover:bg-black/10 dark:hover:bg-white/10 transition-all"
          >
            {lang === "RU" ? "Показать больше" : "Show more"}
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  );
};

const Footer = () => {
  const { t, setCurrentPage, lang } = useContext(LanguageContext);

  const navItems = [
    { label: t.nav.profs, page: "professions" },
    { label: t.nav.roads, page: "roadmaps" },
    { label: t.nav.mentors, page: "mentors" },
  ];

  return (
    <footer className="bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-white pt-16 pb-12 border-t-2 border-cyan-500/50 relative z-10 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-start">
          
          {/* КОЛОНКА 1: ЛОГОТИП */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Layers className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-black tracking-tighter uppercase italic">SkillPath</span>
            </div>
            <div className="space-y-2">
              <p className="text-slate-500 dark:text-zinc-500 text-sm font-medium leading-relaxed max-w-xs">
                {t.footer.desc}
              </p>
              <p className="text-slate-400 dark:text-zinc-600 text-xs uppercase tracking-[0.2em] pt-4">
                © {new Date().getFullYear()} {t.footer.rights}
              </p>
            </div>
          </div>

          {/* КОЛОНКА 2: НАВИГАЦИЯ (С ЗАГОЛОВКОМ) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-cyan-600 dark:text-cyan-400">
              {t.footer.navigation}
            </h4>
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.page}>
                  <button
                    onClick={() => { setCurrentPage(item.page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="text-slate-600 dark:text-zinc-400 hover:text-cyan-500 dark:hover:text-white uppercase text-sm font-bold tracking-wider transition-all hover:translate-x-2 flex items-center gap-2"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* КОЛОНКА 3: КОНТАКТЫ (С ЗАГОЛОВКОМ) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-cyan-600 dark:text-cyan-400">
              {t.footer.contacts}
            </h4>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="mt-1 p-2 rounded-lg bg-black/5 dark:bg-white/5">
                  <Mail className="w-5 h-5 text-cyan-500" />
                </div>
                <div>
                  <p className="text-slate-400 dark:text-zinc-500 text-[10px] uppercase font-bold mb-1">Email</p>
                  <a href="mailto:hello@skillpath.com" className="text-slate-700 dark:text-zinc-200 text-sm font-bold hover:text-cyan-500 transition-colors">
                    HELLO@SKILLPATH.COM
                  </a>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="mt-1 p-2 rounded-lg bg-black/5 dark:bg-white/5">
                  <Phone className="w-5 h-5 text-cyan-500" />
                </div>
                <div>
                  <p className="text-slate-400 dark:text-zinc-500 text-[10px] uppercase font-bold mb-1">{lang === 'RU' ? 'Режим работы' : 'Working hours'}</p>
                  <p className="text-slate-700 dark:text-zinc-200 text-sm font-bold uppercase">
                    24/7 ONLINE • SUPPORT 09:00-21:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* КОЛОНКА 4: ТЕЛЕФОНЫ И СОЦСЕТИ */}
          <div className="flex flex-col items-start lg:items-end space-y-8">
            <div className="text-left lg:text-right space-y-2">
              <a href="tel:+375255172137" className="block text-2xl font-black tracking-tighter hover:text-cyan-500 transition-colors">
                +375 (25) 517-21-37
              </a>
              <a href="tel:+375291754670" className="block text-2xl font-black tracking-tighter hover:text-cyan-500 transition-colors">
                +375 (29) 175-46-70
              </a>
            </div>
            
            <div className="space-y-4 w-full lg:w-auto">
              <p className="text-slate-400 dark:text-zinc-500 text-xs uppercase font-bold tracking-widest lg:text-right">
                {t.footer.socials}
              </p>
              <div className="flex gap-4 lg:justify-end">
  {[
    { 
      icon: <Send size={20} />, 
      color: "hover:bg-[#229ED9]", 
      label: "Telegram",
      url: "https://t.me/Fordmash" // <-- ВСТАВЬ ССЫЛКУ СЮДА
    },
    { 
      icon: <Instagram size={20} />, 
      color: "hover:bg-gradient-to-tr hover:from-[#F58529] hover:to-[#DD2A7B]", 
      label: "Instagram",
      url: "https://www.instagram.com/qwayaa?igsh=MTFkdng5NDhicHhwNQ==" // <-- ВСТАВЬ ССЫЛКУ СЮДА
    },
    { 
      icon: <Github size={20} />, 
      color: "hover:bg-[#333]", 
      label: "Github",
      url: "https://github.com/Stanislav220852" // <-- ВСТАВЬ ССЫЛКУ СЮДА
    },
    
  ].map((social, i) => (
    <a
      key={i}
      href={social.url} // <-- Здесь теперь используется ссылка из объекта выше
      target="_blank"   // Открывает в новой вкладке
      rel="noopener noreferrer" // Безопасность при открытии новых вкладок
      aria-label={social.label}
      className={`w-12 h-12 rounded-xl border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-slate-500 dark:text-zinc-400 transition-all duration-300 ${social.color} hover:text-white hover:border-transparent hover:-translate-y-1 shadow-sm`}
    >
      {social.icon}
    </a>
  ))}
</div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
const LoginModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
          className="relative rounded-3xl overflow-hidden shadow-2xl"
        >
          <img
            src='src\app\logo .jpg'  // 👈 сюда вставь свою картинку
            alt="Login"
            className="w-[500px] h-auto object-cover"
          />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
const Content = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { lang, t, currentPage, setCurrentPage, openRoadmap, setOpenRoadmap } = useContext(LanguageContext);
  const isLearningPage = currentPage.startsWith('learning:');
  const learningSkillId = isLearningPage ? currentPage.split(':')[1] : null;
  const isHome = currentPage === 'home' && !showQuiz;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans transition-colors duration-300">
      <MouseSpotlight />
      <Navbar onLoginClick={() => setShowLogin(true)} onNavigate={() => setShowQuiz(false)} onStartQuiz={() => setShowQuiz(true)} />

      <main>
        {showQuiz ? (
          <Quiz
            onExit={() => { setShowQuiz(false); setCurrentPage('home'); }}
            lang={lang}
            onGoToRoadmap={(roadmapKey) => {
              setShowQuiz(false);
              setCurrentPage('roadmaps');
              setOpenRoadmap(roadmapKey);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

        ) : currentPage === 'professions' ? (
          <ProfessionsPage onBack={() => setCurrentPage('home')} lang={lang} t={t} />
        ) : currentPage === 'roadmaps' ? (
          <RoadmapsPage t={t} initialRoadmap={openRoadmap} onOpenRoadmap={(val: string | null) => {
            if (val && val.startsWith('learn:')) {
              const skillId = val.split(':')[1];
              setCurrentPage('learning:' + skillId);
              setOpenRoadmap(null);
            } else {
              setOpenRoadmap(val);
            }
          }} lang={lang} />
        ) : currentPage === 'mentors' ? (
          <MentorsPage onBack={() => setCurrentPage('home')} lang={lang} t={t} />
        ) : isLearningPage ? (
          <SkillLearningPage skillId={learningSkillId} onBack={() => setCurrentPage('roadmaps')} lang={lang} />
        ) : (
          <>
            {/* ── Ключевые секции: видны всегда ── */}
            <Hero onStartQuiz={() => setShowQuiz(true)} />
            <CompaniesStrip />
            <StatsSection />
            <RolesSection />
            <BentoShowcase onStartQuiz={() => setShowQuiz(true)} />
            <MiniQuiz />

            {/* ── Доп-контент: на мобилке сворачивается под «Показать больше» ── */}
            <MobileShowMore>
              <TechMarquee />
              
              <TestimonialsCarousel />
              <BootstrapInfo />
              <StepsSection />
              <PricingTable onStartQuiz={() => setShowQuiz(true)} />
              <FAQAccordion />
            </MobileShowMore>
            
          </>
        )}
      </main>

      {isHome && <Footer />}

      {/* Глобальные мобильные помощники */}
      <ScrollToTop />
      {isHome && <MobileStickyCTA onStartQuiz={() => setShowQuiz(true)} />}
      {showLogin && (
      <LoginModal onClose={() => setShowLogin(false)} />
    )}
    </div>
    
  );
};

export default function App() {
  const [lang, setLang] = useState<Lang>("EN");
  const t = translations[lang];
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [openRoadmap, setOpenRoadmap] = useState<string | null>(null);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <LanguageContext.Provider value={{ lang, setLang, t, currentPage, setCurrentPage, openRoadmap, setOpenRoadmap }}>
        <Content />
        
      </LanguageContext.Provider>
      
    </ThemeProvider>
  );
}
