import React, { useEffect, useState, createContext, useContext } from "react";

import { motion } from "motion/react";

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

  Moon

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


// --- ДАННЫЕ ПЕРЕВОДОВ ---

const translations = {

  EN: {

    nav: { profs: "Professions", roads: "Roadmaps", mentors: "Mentors", login: "Login" },

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

        }

      },

      cards: [

        { title: "Frontend Dev", desc: "Master of the visual realm. Create stunning UI/UX with code and design magic.", colorClass: "cyan", roadmapKey: "frontend" },

        { title: "AI Engineer", desc: "Train neural networks. Speak to machines and build the artificial minds of tomorrow.", colorClass: "pink", roadmapKey: "ai" },

        { title: "Cybersec", desc: "The digital guardian. Hack systems to patch them and protect data from dark hats.", colorClass: "purple", roadmapKey: "cybersec" },

        { title: "Data Scientist", desc: "The modern alchemist. Turn raw data into predictive gold and uncover hidden truths.", colorClass: "blue", roadmapKey: "datascience" }

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

    nav: { profs: "Профессии", roads: "Роадмапc", mentors: "Менторы", login: "Войти" },

    hero: {

      badge: "SkillPath Бета 2.0",

      t1: "Выбери свой",

      t2: "Класс Будущего",

      t3: "В IT",

      desc: "Интерактивный гид по IT-академии. Найди профессию, которая подходит именно тебе. Любишь ли ты создавать или проверять на прочность — начни свой путь здесь.",

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

      s1: { t: "Пройти тест", d: "Быстрый 5-минутный интерактивный квиз для анализа твоих интересов и стиля мышления." },

      s2: { t: "Получить Roadmap", d: "Открой персональное дерево навыков с подборкой туториалов, квестов и мини-проектов." },

      s3: { t: "Прокачаться", d: "Вступай в сообщества, находи менторов и создавай портфолио, чтобы показать свои скиллы." }

    },

    footer: {

      desc: "Даем возможности новому поколению строителей, хакеров и творцов. Начни свое IT-путешествие сегодня."

    },

    profPage: {

      title1: "Tech",

      title2: "Профессии",

      subtitle: "Изучите все доступные карьерные пути в технологической индустрии",

      skills: "Ключевые навыки",

      salary: "Зарплатная вилка",
      watchVideo: "Смотреть обзор",
      dayInLife: "Один день из жизни",
      tools: "Популярные инструменты",
      juniorLabel: "Джуниор",
      seniorLabel: "Сеньор",
      openRoadmap: "Открыть полный роадмап",
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

        }

      },

      cards: [

        { title: "Frontend Dev", desc: "Мастер визуального мира. Создавай потрясающие интерфейсы с помощью кода и магии дизайна.", colorClass: "cyan", roadmapKey: "frontend" },

        { title: "AI Engineer", desc: "Обучай нейросети. Общайся с машинами и создавай искусственный интеллект будущего.", colorClass: "pink", roadmapKey: "ai" },

        { title: "Cybersec", desc: "Цифровой страж. Вскрывай системы, чтобы защитить их и спасти данные от хакеров.", colorClass: "purple", roadmapKey: "cybersec" },

        { title: "Data Scientist", desc: "Современный алхимик. Превращай сырые данные в золото прогнозов и находи скрытые истины.", colorClass: "blue", roadmapKey: "datascience" }

      ]

    }
  },
  
};


 




export const LanguageContext = createContext({ lang: 'EN', setLang: () => {}, t: translations.EN, currentPage: 'home', setCurrentPage: () => {}, openRoadmap: null, setOpenRoadmap: () => {} });


const glassCard = "bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]";

const neonCyan = "text-cyan-500 dark:text-cyan-400 dark:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]";

const neonPink = "text-pink-500 dark:drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]";


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

    const order = ["EN", "RU"];

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

    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden pb-20">
      <AnimatedGrid />

      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-500/10 dark:bg-pink-500/20 rounded-full blur-[120px] pointer-events-none" />

      

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center z-10">

        <motion.div 

          initial={{ opacity: 0, x: -50 }}

          animate={{ opacity: 1, x: 0 }}

          transition={{ duration: 0.8, ease: "easeOut" }}

          className="space-y-8"

        >

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-pink-500 dark:text-pink-400" />
            <TextScramble 
              text={t.hero.badge} 
              className="text-sm font-medium tracking-wide text-slate-600 dark:text-white/80" 
            />
          </div>

          

          <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white">

            {t.hero.t1} <br />

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500">{t.hero.t2}</span> <br />

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-500 dark:to-purple-500">{t.hero.t3}</span>

          </h1>

          

          <p className="text-lg text-slate-600 dark:text-white/60 max-w-xl leading-relaxed">

            {t.hero.desc}

          </p>

          

          <div className="flex flex-wrap gap-4 pt-4">

            <motion.button 

              whileHover={{ scale: 1.05 }}

              whileTap={{ scale: 0.95 }}

              onClick={onStartQuiz}

              className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold tracking-wide shadow-[0_0_15px_rgba(34,211,238,0.3)] dark:shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center gap-2 hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] dark:hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all"

            >

              {t.hero.btnQuest}

              <ChevronRight className="w-5 h-5" />

            </motion.button>

            

            <motion.button 

              whileHover={{ scale: 1.05 }}

              whileTap={{ scale: 0.95 }}

              className="px-8 py-4 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-800 dark:text-white font-bold tracking-wide hover:bg-black/10 dark:hover:bg-white/10 transition-all backdrop-blur-md flex items-center gap-2"

            >

              {t.hero.btnRoles}

            </motion.button>

          </div>

        </motion.div>


        <motion.div 

          initial={{ opacity: 0, scale: 0.8 }}

          animate={{ opacity: 1, scale: 1 }}

          transition={{ duration: 1, delay: 0.2 }}

          className="relative h-[600px] w-full flex items-center justify-center"

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

                    <Cpu className={`w-4 h-4 text-cyan-300 dark:text-cyan-400`} />

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


const RoleCard = ({ icon: Icon, title, desc, colorClass, roadmapKey }) => {

  const { t, setCurrentPage, setOpenRoadmap } = useContext(LanguageContext);

  return (

    <motion.div 

      whileHover={{ y: -10 }}

      className={`p-8 ${glassCard} relative overflow-hidden group hover:border-${colorClass}-400/50 dark:hover:border-${colorClass}-500/50 transition-all duration-300`}

    >

      <div className={`absolute top-0 right-0 w-32 h-32 bg-${colorClass}-500/5 dark:bg-${colorClass}-500/10 rounded-full blur-[40px] group-hover:bg-${colorClass}-500/10 dark:group-hover:bg-${colorClass}-500/20 transition-all`} />

      

      <div className={`w-16 h-16 rounded-2xl bg-${colorClass}-500/10 flex items-center justify-center mb-6 border border-${colorClass}-500/20`}>

        <Icon className={`w-8 h-8 text-${colorClass}-500 dark:text-${colorClass}-400`} />

      </div>

      

      <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white relative z-10">{title}</h3>

      <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed mb-6 relative z-10 min-h-[60px]">

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

  const { t } = useContext(LanguageContext);

  return (

    <section className="py-24 relative z-10">

      <div className="container mx-auto px-6">

        <div className="text-center mb-16 max-w-2xl mx-auto">

          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 text-slate-900 dark:text-white">

            {t.roles.t} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500 dark:from-cyan-400 dark:to-pink-500">{t.roles.ts}</span>

          </h2>

          <p className="text-slate-600 dark:text-white/60">{t.roles.d}</p>

        </div>

        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
         
          <RoleCard icon={Terminal} title={t.roles.f.t} desc={t.roles.f.d} colorClass="cyan" roadmapKey="frontend" />
          
          <RoleCard icon={Cpu} title={t.roles.ai.t} desc={t.roles.ai.d} colorClass="pink" roadmapKey="ai" />
          
          <RoleCard icon={ShieldAlert} title={t.roles.cs.t} desc={t.roles.cs.d} colorClass="purple" roadmapKey="cybersec" />
          
          <RoleCard icon={Database} title={t.roles.ds.t} desc={t.roles.ds.d} colorClass="blue" roadmapKey="datascience" />
          

        </div>
        

      </div>

    </section>

  );

};


const StepsSection = () => {

  const { t } = useContext(LanguageContext);

  return (

    <section className="py-24 relative overflow-hidden">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      

      <div className="container mx-auto px-6">

        <div className="flex flex-col lg:flex-row gap-16 items-center">

          <div className="flex-1 space-y-8">

            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">

              {t.steps.t} <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500">{t.steps.ts}</span>

            </h2>

            

            <div className="space-y-6">

              {[t.steps.s1, t.steps.s2, t.steps.s3].map((item, i) => (

                <motion.div 

                  initial={{ opacity: 0, x: -20 }}

                  whileInView={{ opacity: 1, x: 0 }}

                  viewport={{ once: true }}

                  transition={{ delay: i * 0.2 }}

                  key={i} 

                  className={`p-6 ${glassCard} flex gap-6 items-start`}

                >

                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-pink-500 drop-shadow-sm">

                    0{i+1}

                  </div>

                  <div>

                    <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{item.t}</h4>

                    <p className="text-sm text-slate-600 dark:text-white/60">{item.d}</p>

                  </div>

                </motion.div>

              ))}

            </div>

          </div>

          

          <div className="flex-1 relative">

             <div className={`p-2 ${glassCard} rounded-[3rem]`}>

               <img 

                 src="https://images.unsplash.com/photo-1634715841611-67741dc71459?auto=format&fit=crop&q=80&w=600" 

                 alt="Future Tech" 

                 className="w-full h-auto rounded-[2.5rem]"

               />

             </div>

             

             {/* Floating decorative elements */}

             <motion.div 

                animate={{ rotate: 360 }}

                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}

                className="absolute -top-8 -right-8 w-24 h-24 rounded-full border border-dashed border-cyan-500/20 dark:border-cyan-500/30 flex items-center justify-center"

             >

                <div className="w-16 h-16 rounded-full border border-solid border-pink-500/20" />

             </motion.div>

          </div>

        </div>

      </div>

    </section>

  );

};


const Navbar = () => {

  const { t, setCurrentPage, setOpenRoadmap } = useContext(LanguageContext);

  return (

    <nav className="fixed top-0 left-0 right-0 z-50 p-6">

      <div className="container mx-auto flex items-center justify-between">

        <button 

          onClick={() => { setCurrentPage('home'); setOpenRoadmap(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}

          className="flex items-center gap-2 group hover:opacity-90 transition-opacity outline-none"

        >

          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.3)] dark:shadow-[0_0_15px_rgba(34,211,238,0.5)] group-hover:scale-105 transition-transform">

            <Layers className="w-5 h-5 text-white" />

          </div>

          <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors">SkillPath</span>

        </button>

        

        <div className="hidden md:flex items-center gap-8 px-8 py-3 rounded-full bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md shadow-sm dark:shadow-none">

          <button onClick={() => { setCurrentPage('professions'); setOpenRoadmap(null); }} className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-white/70 dark:hover:text-white transition-colors">{t.nav.profs}</button>

          <button onClick={() => { setCurrentPage('roadmaps'); setOpenRoadmap(null); }} className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-white/70 dark:hover:text-white transition-colors">{t.nav.roads}</button>

          <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-white/70 dark:hover:text-white transition-colors">{t.nav.mentors}</a>

        </div>

        

        <div className="flex items-center gap-3">

          <LanguageToggle />

          <ThemeToggle />

          <button className="px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white/10 border border-transparent dark:border-white/20 text-white font-bold text-sm hover:bg-slate-800 dark:hover:bg-white/20 transition-all backdrop-blur-md">

            {t.nav.login}

          </button>

        </div>

      </div>

    </nav>

  );

};


const Footer = () => {

  const { t } = useContext(LanguageContext);

  return (

    <footer className="border-t border-black/5 dark:border-white/10 py-12 relative z-10 bg-black/[0.01] dark:bg-white/[0.02]">

      <div className="container mx-auto px-6 text-center">

        <div className="flex items-center justify-center gap-2 mb-6 text-slate-900 dark:text-white">

          <Layers className={`w-6 h-6 ${neonCyan}`} />

          <span className="text-2xl font-black tracking-tight">SkillPath</span>

        </div>

        <p className="text-slate-500 dark:text-white/50 mb-8 max-w-md mx-auto">{t.footer.desc}</p>

        <div className="flex items-center justify-center gap-6 text-slate-400 dark:text-white/40">

          <a href="#" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Twitter</a>

          <a href="#" className="hover:text-pink-500 dark:hover:text-pink-400 transition-colors">Discord</a>

          <a href="#" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">GitHub</a>

        </div>

      </div>

    </footer>

  );

};

const Content = () => {

  const [showQuiz, setShowQuiz] = useState(false);

  const { lang, t, currentPage, setCurrentPage, openRoadmap, setOpenRoadmap } = useContext(LanguageContext);

  const isLearningPage = currentPage.startsWith('learning:');
  const learningSkillId = isLearningPage ? currentPage.split(':')[1] : null;

  return (

    <div className="min-h-screen bg-background text-foreground font-sans transition-colors duration-300">
      <MouseSpotlight />
      <Navbar />
      

      <main>
        

        {showQuiz ? (

          <Quiz onExit={() => { setShowQuiz(false); setCurrentPage('home'); }} lang={lang} /> 

        ) : currentPage === 'professions' ? (

          <ProfessionsPage onBack={() => setCurrentPage('home')} lang={lang} t={t} />

        ) : currentPage === 'roadmaps' ? (

          <RoadmapsPage t={t} initialRoadmap={openRoadmap} onOpenRoadmap={(val) => {
            if (val && val.startsWith('learn:')) {
              const skillId = val.split(':')[1];
              setCurrentPage('learning:' + skillId);
              setOpenRoadmap(null);
            } else {
              setOpenRoadmap(val);
            }
          }} lang={lang} />

        ) : isLearningPage ? (

          <SkillLearningPage skillId={learningSkillId} onBack={() => setCurrentPage('roadmaps')} lang={lang} />

        ) : (

          <>

            <Hero onStartQuiz={() => setShowQuiz(true)} />
            <StatsSection />
            <TechMarquee />  
            <RolesSection />
            
            <BentoShowcase />

            <StepsSection />

          </>

        )}

      </main>

      {currentPage === 'home' && !showQuiz && <Footer />}

    </div>

  );

};


export default function App() {

  const [lang, setLang] = useState("EN");

  const t = translations[lang];

  const [currentPage, setCurrentPage] = useState('home');

  const [openRoadmap, setOpenRoadmap] = useState(null);


  return (

    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>

      <LanguageContext.Provider value={{ lang, setLang, t, currentPage, setCurrentPage, openRoadmap, setOpenRoadmap }}>

        <Content />

      </LanguageContext.Provider>

    </ThemeProvider>

  );

}
