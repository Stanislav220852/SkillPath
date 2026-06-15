# 🎨 Гид по созданию премиум-презентации SkillPath

## Оглавление

1. [Обзор проекта](#1-обзор-проекта)
2. [Дизайн-система](#2-дизайн-система)
3. [Структура презентации](#3-структура-презентации)
4. [Пошаговое создание слайдов](#4-пошаговое-создание-слайдов)
5. [Анимации и переходы](#5-анимации-и-переходы)
6. [Создание GIF-демонстраций](#6-создание-gif-демонстраций)
7. [Техническая реализация](#7-техническая-реализация)
8. [Чеклист перед запуском](#8-чеклист-перед-запуском)

---

## 1. Обзор проекта

**SkillPath** — интерактивная платформа для выбора IT-профессии с:
- 8 карьерными направлениями
- Интерактивным квизом профориентации
- Роадмапами с прогрессом
- Системой менторов
- NFT-сертификатами
- AI-помощником

**Цель презентации**: показать платформу студентам, заинтересовать и направить на регистрацию.

---

## 2. Дизайн-система

### 2.1 Цветовая палитра

```css
:root {
  /* Основные */
  --bg-primary: #0A0A0A;        /* Тёмный фон */
  --bg-secondary: #111111;      /* Карточки */
  --bg-glass: rgba(255,255,255,0.05); /* Glassmorphism */
  
  /* Акценты */
  --accent-indigo: #6366F1;     /* Основной акцент */
  --accent-cyan: #22D3EE;       /* Вторичный */
  --accent-purple: #A855F7;     /* Третий */
  --accent-pink: #EC4899;       /* Дополнительный */
  
  /* Градиенты */
  --gradient-main: linear-gradient(135deg, #6366F1, #A855F7);
  --gradient-glow: radial-gradient(circle, rgba(99,102,241,0.15), transparent);
  
  /* Текст */
  --text-primary: #FFFFFF;
  --text-secondary: #A1A1AA;
  --text-muted: #52525B;
}
```

### 2.2 Типографика

```css
/* Заголовки */
.font-display {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  letter-spacing: -0.02em;
}

/* Код / Цифры */
.font-mono {
  font-family: 'JetBrains Mono', monospace;
}

/* Размеры */
.text-hero { font-size: clamp(3rem, 8vw, 6rem); }
.text-title { font-size: clamp(2rem, 5vw, 4rem); }
.text-subtitle { font-size: clamp(1.25rem, 3vw, 2rem); }
.text-body { font-size: 1.125rem; }
```

### 2.3 Компоненты

```css
/* Карточка */
.card {
  background: var(--bg-secondary);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
}

/* Glassmorphism */
.glass {
  background: var(--bg-glass);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.08);
}

/* Glow-эффект */
.glow {
  box-shadow: 0 0 60px rgba(99,102,241,0.3);
}

/* Градиентная рамка */
.gradient-border {
  border: 2px solid transparent;
  background-clip: padding-box;
  position: relative;
}
.gradient-border::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: var(--gradient-main);
  border-radius: inherit;
  z-index: -1;
}
```

---

## 3. Структура презентации

### 3.1 Общая схема

```
┌─────────────────────────────────────────────────┐
│  СЛАЙД 1: TITLE                                 │
│  "SkillPath — Выбери своё будущее в IT"         │
│  [Анимированный лого + частицы]                  │
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│  СЛАЙД 2: PROBLEM                               │
│  "73% студентов не знают, какую профессию       │
│   выбрать в IT"                                 │
│  [Крупная стата + минималистичный дизайн]        │
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│  СЛАЙД 3: SOLUTION                              │
│  "Интерактивный гайд, который поможет           │
│   найти свой путь"                              │
│  [Описание решения]                             │
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│  СЛАЙД 4: HOW IT WORKS                          │
│  [1] Тест → [2] Роадмап → [3] Карьера          │
│  [Анимированные шаги с иконками]                │
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│  СЛАЙД 5: 🎬 GIF HERO                           │
│  [GIF-анимация главной страницы]                │
│  "Посмотри, как это выглядит"                   │
└─────────────────────────────────────────────────┘
                        ↓
          ... (остальные слайды) ...
                        ↓
┌─────────────────────────────────────────────────┐
│  СЛАЙД 24: CTA                                  │
│  "Начни бесплатно сегодня"                      │
│  [Крупная кнопка + форма регистрации]           │
└─────────────────────────────────────────────────┘
```

### 3.2 Полная таблица слайдов

| # | Тип | Заголовок | Подзаголовок | Элементы |
|---|-----|-----------|--------------|----------|
| 1 | Title | SkillPath | Выбери своё будущее в IT | Лого, частицы, CTA |
| 2 | Problem | 73% студентов | не знают, какую профессию выбрать | Стата, иконка |
| 3 | Solution | Интерактивный гайд | по IT-профессиям | Описание |
| 4 | How it works | Как это работает | 3 простых шага | Иконки, шаги |
| 5 | **GIF** | Hero секция | Посмотри, как это выглядит | GIF-анимация |
| 6 | Professions | 8 направлений | Карьерные пути | Карточки |
| 7 | **GIF** | Quiz | Интерактивный тест | GIF-анимация |
| 8 | Quiz Detail | 5 вопросов | за 2 минуты | Скриншот |
| 9 | Roadmaps | Роадмапы | Пошаговые деревья навыков | Описание |
| 10 | **GIF** | Roadmap Demo | Навигация по дереву | GIF-анимация |
| 11 | Mentors | Менторы | Из топ-компаний | Карточки |
| 12 | Community | Комьюнити | 5000+ студентов | Описание |
| 13 | Features | Bento Grid | 8 фич платформы | Сетка |
| 14 | Stats | Цифры | Студенты, менторы, офферы | Счётчики |
| 15 | Testimonials | Истории | Реальные студенты | Карусель |
| 16 | Companies | Партнёры | Топ IT-компании | Логотипы |
| 17 | **GIF** | Full Demo | Полное демо платформы | GIF-анимация |
| 18 | Pricing | Тарифы | Free, Pro, Premium | Таблица |
| 19 | Tech Stack | Технологии | React, AI, NFT | Иконки |
| 20 | Gamification | Геймификация | XP, достижения | Описание |
| 21 | Mobile | Мобильность | Адаптация под телефон | Скриншот |
| 22 | Roadmap Dev | Будущее | Планы развития | Timeline |
| 23 | Comparison | Сравнение | SkillPath vs другие | Таблица |
| 24 | CTA | Начни | Бесплатно сегодня | Кнопка |

---

## 4. Пошаговое создание слайдов

### 4.1 Слайд 1: Title

```tsx
// components/slides/TitleSlide.tsx
import { motion } from 'framer-motion';
import { FloatingParticles } from '../utils/FloatingParticles';

export function TitleSlide() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FloatingParticles />
      
      <motion.div 
        className="text-center z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Анимированный лого */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        >
          <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <span className="text-4xl font-bold text-white">S</span>
          </div>
        </motion.div>

        {/* Заголовок */}
        <motion.h1 
          className="text-hero font-display text-white mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Skill<span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Path</span>
        </motion.h1>

        {/* Подзаголовок */}
        <motion.p 
          className="text-subtitle text-zinc-400 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Выбери своё будущее в IT
        </motion.p>

        {/* CTA кнопка */}
        <motion.button
          className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl text-white font-semibold text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Начать бесплатно
        </motion.button>
      </motion.div>

      {/* Фоновый glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px]" />
    </section>
  );
}
```

### 4.2 Слайд 2: Problem

```tsx
// components/slides/ProblemSlide.tsx
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export function ProblemSlide() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8">
      <div className="max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <AlertTriangle className="w-16 h-16 text-amber-400 mx-auto" />
        </motion.div>

        <motion.h2 
          className="text-hero font-display text-white mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-amber-400">73%</span> студентов
        </motion.h2>

        <motion.p 
          className="text-subtitle text-zinc-400"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          не знают, какую профессию выбрать в IT
        </motion.p>

        <motion.p 
          className="text-body text-zinc-500 mt-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Бесконечные курсы, противоречивые советы, страх выбрать не то.
          Мы знаем эту проблему и решили её.
        </motion.p>
      </div>
    </section>
  );
}
```

### 4.3 Слайд 4: How It Works

```tsx
// components/slides/HowItWorksSlide.tsx
import { motion } from 'framer-motion';
import { Brain, Map, Rocket } from 'lucide-react';

const steps = [
  { icon: Brain, title: 'Тест', desc: '5-минутный квиз определит твои сильные стороны', color: 'from-cyan-400 to-blue-500' },
  { icon: Map, title: 'Роадмап', desc: 'Персональная карта навыков с ресурсами', color: 'from-indigo-400 to-purple-500' },
  { icon: Rocket, title: 'Карьера', desc: 'Портфолио, менторы и офферы', color: 'from-purple-400 to-pink-500' },
];

export function HowItWorksSlide() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8">
      <div className="max-w-6xl">
        <motion.h2 
          className="text-title font-display text-white text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Как это работает
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className="card p-8 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-sm text-zinc-500 mb-2">Шаг {i + 1}</div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-zinc-400">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### 4.4 Слайд 5: GIF Hero Demo

```tsx
// components/slides/GifHeroSlide.tsx
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export function GifHeroSlide() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8">
      <div className="max-w-5xl">
        <motion.h2 
          className="text-title font-display text-white text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Посмотри, как это выглядит
        </motion.h2>

        <motion.p 
          className="text-body text-zinc-400 text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Интерактивная главная страница с эффектами и анимациями
        </motion.p>

        {/* GIF-контейнер */}
        <motion.div
          className="relative rounded-2xl overflow-hidden glow"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Рамка */}
          <div className="absolute inset-0 rounded-2xl border-2 border-indigo-500/30" />
          
          {/* GIF */}
          <div className="bg-zinc-900 aspect-video flex items-center justify-center">
            <img 
              src="/gifs/hero-demo.gif" 
              alt="Demo Hero Section"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Play-кнопка (опционально) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Play className="w-8 h-8 text-white ml-1" />
            </div>
          </div>
        </motion.div>

        {/* Подпись */}
        <motion.p 
          className="text-center text-zinc-500 mt-6 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Hero секция с частицами, spotlight-эффектом и анимированным текстом
        </motion.p>
      </div>
    </section>
  );
}
```

### 4.5 Слайд 6: Professions

```tsx
// components/slides/ProfessionsSlide.tsx
import { motion } from 'framer-motion';
import { Code, Brain, Shield, Database, Server, Smartphone, Cloud, Gamepad2 } from 'lucide-react';

const professions = [
  { icon: Code, title: 'Frontend', color: 'cyan', count: '12 навыков' },
  { icon: Brain, title: 'AI Engineer', color: 'pink', count: '10 навыков' },
  { icon: Shield, title: 'Cybersec', color: 'purple', count: '10 навыков' },
  { icon: Database, title: 'Data Science', color: 'blue', count: '11 навыков' },
  { icon: Server, title: 'Backend', color: 'emerald', count: '8 навыков' },
  { icon: Smartphone, title: 'Mobile', color: 'amber', count: '8 навыков' },
  { icon: Cloud, title: 'DevOps', color: 'orange', count: '8 навыков' },
  { icon: Gamepad2, title: 'Game Dev', color: 'rose', count: '8 навыков' },
];

const colorMap: Record<string, string> = {
  cyan: 'from-cyan-400 to-cyan-600',
  pink: 'from-pink-400 to-pink-600',
  purple: 'from-purple-400 to-purple-600',
  blue: 'from-blue-400 to-blue-600',
  emerald: 'from-emerald-400 to-emerald-600',
  amber: 'from-amber-400 to-amber-600',
  orange: 'from-orange-400 to-orange-600',
  rose: 'from-rose-400 to-rose-600',
};

export function ProfessionsSlide() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 py-24">
      <div className="max-w-6xl">
        <motion.h2 
          className="text-title font-display text-white text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          8 карьерных направлений
        </motion.h2>

        <motion.p 
          className="text-body text-zinc-400 text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Каждое с персональным роадмапом и ресурсами
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {professions.map((prof, i) => (
            <motion.div
              key={prof.title}
              className="card p-6 text-center group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${colorMap[prof.color]} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <prof.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{prof.title}</h3>
              <p className="text-sm text-zinc-500">{prof.count}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### 4.6 Слайд 13: Bento Grid

```tsx
// components/slides/BentoSlide.tsx
import { motion } from 'framer-motion';
import { Brain, Map, Users, Award, Calendar, BookOpen, TrendingUp, Bot } from 'lucide-react';

const features = [
  { icon: Brain, title: 'Тест на профориентацию', desc: '5-минутный квиз', span: 'col-span-2' },
  { icon: Map, title: 'Роадмапы', desc: 'Пошаговые деревья', span: 'col-span-1' },
  { icon: Users, title: 'Менторы', desc: 'Из топ-компаний', span: 'col-span-1' },
  { icon: Award, title: 'Сертификаты', desc: 'NFT-подтверждение', span: 'col-span-1' },
  { icon: Calendar, title: 'Воркшопы', desc: 'Еженедельно', span: 'col-span-1' },
  { icon: BookOpen, title: 'Библиотека', desc: 'Отобранные материалы', span: 'col-span-2' },
  { icon: TrendingUp, title: 'Карьерный рост', desc: 'Подготовка к собесам', span: 'col-span-1' },
  { icon: Bot, title: 'AI Копилот', desc: 'Помощник 24/7', span: 'col-span-1' },
];

export function BentoSlide() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 py-24">
      <div className="max-w-5xl">
        <motion.h2 
          className="text-title font-display text-white text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Всё, что нужно чтобы <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">прокачаться</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              className={`card p-6 ${feat.span}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <feat.icon className="w-8 h-8 text-indigo-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-1">{feat.title}</h3>
              <p className="text-sm text-zinc-400">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### 4.7 Слайд 14: Stats

```tsx
// components/slides/StatsSlide.tsx
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  { value: 5000, suffix: '+', label: 'Студентов' },
  { value: 50, suffix: '+', label: 'Менторов' },
  { value: 8, suffix: '', label: 'Профессий' },
  { value: 85, suffix: '%', label: 'Трудоустройство' },
];

export function StatsSlide() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8">
      <div className="max-w-5xl">
        <motion.h2 
          className="text-title font-display text-white text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Цифры говорят сами за себя
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="text-5xl md:text-6xl font-display font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-zinc-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### 4.8 Слайд 18: Pricing

```tsx
// components/slides/PricingSlide.tsx
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '0',
    desc: 'Чтобы попробовать',
    features: ['Все публичные роадмапы', 'Доступ к сообществу', 'Базовый прогресс', '1 сессия с ментором'],
    popular: false,
  },
  {
    name: 'Pro',
    price: '19',
    desc: 'Для серьёзного обучения',
    features: ['Безлимит чат с ментором', 'Все сертификаты', 'Live-воркшопы', 'Ревью проектов', 'Приоритетная поддержка'],
    popular: true,
  },
  {
    name: 'Premium',
    price: '49',
    desc: 'Полный карьерный пакет',
    features: ['1-на-1 с ментором еженедельно', 'Программа подготовки к собесам', 'Помощь с трудоустройством', 'Ревью резюме', 'Доступ навсегда'],
    popular: false,
  },
];

export function PricingSlide() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 py-24">
      <div className="max-w-5xl">
        <motion.h2 
          className="text-title font-display text-white text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Выбери свой <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">план</span>
        </motion.h2>

        <motion.p 
          className="text-body text-zinc-400 text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Начни бесплатно. Прокачайся когда будешь готов.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`card p-8 relative ${plan.popular ? 'border-indigo-500 glow' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-sm text-white font-medium">
                  Популярный
                </div>
              )}

              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-zinc-400 text-sm mb-4">{plan.desc}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-display font-bold text-white">${plan.price}</span>
                <span className="text-zinc-500">/мес</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-zinc-300">
                    <Check className="w-4 h-4 text-green-400 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded-xl font-semibold transition-all ${
                plan.popular 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90' 
                  : 'bg-zinc-800 text-white hover:bg-zinc-700'
              }`}>
                {plan.name === 'Free' ? 'Начать бесплатно' : 'Выбрать'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### 4.9 Слайд 24: CTA

```tsx
// components/slides/CTASlide.tsx
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function CTASlide() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8">
      <div className="max-w-3xl text-center">
        <motion.h2 
          className="text-hero font-display text-white mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Начни бесплатно
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            сегодня
          </span>
        </motion.h2>

        <motion.p 
          className="text-subtitle text-zinc-400 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Присоединяйся к 5000+ студентов, которые уже нашли свой путь в IT
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Начать бесплатно
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <motion.button
            className="px-8 py-4 bg-zinc-800 rounded-xl text-white font-semibold text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Смотреть демо
          </motion.button>
        </motion.div>

        {/* Фоновый glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]" />
      </div>
    </section>
  );
}
```

---

## 5. Анимации и переходы

### 5.1 Scroll-анимации (Framer Motion)

```tsx
// Базовый паттерн для каждого слайда
<motion.div
  initial={{ opacity: 0, y: 50 }}      // Начальное состояние
  whileInView={{ opacity: 1, y: 0 }}   // Когда видно во viewport
  viewport={{ once: true }}              // Только один раз
  transition={{ duration: 0.6 }}         // Длительность
>
  {/* Контент */}
</motion.div>
```

### 5.2 Staggered-анимации (для списков)

```tsx
// Для карточек профессий, фич и т.д.
{items.map((item, i) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: i * 0.1 }}  // Задержка между элементами
  >
    {/* Элемент */}
  </motion.div>
))}
```

### 5.3 Hover-эффекты

```tsx
// Масштабирование при наведении
<motion.div
  whileHover={{ scale: 1.05, y: -5 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  {/* Карточка */}
</motion.div>
```

### 5.4 Parallax (фоновые элементы)

```tsx
// Фоновый glow, который двигается медленнее
<motion.div
  className="absolute inset-0"
  initial={{ y: 0 }}
  whileInView={{ y: -50 }}
  viewport={{ once: false }}
  transition={{ duration: 1 }}
>
  <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px]" />
</motion.div>
```

### 5.5 Анимированные счётчики

```tsx
// Как в StatsSlide — плавное увеличение чисел
function AnimatedCounter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      // Анимация от 0 до target за 2 секунды
    }
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}
```

---

## 6. Создание GIF-демонстраций

### 6.1 Инструменты для записи

| Инструмент | Платформа | Цена | Качество |
|------------|-----------|------|----------|
| **OBS Studio** | Win/Mac/Linux | Бесплатно | ★★★★★ |
| **LICEcap** | Win/Mac | Бесплатно | ★★★☆☆ |
| **ScreenToGif** | Win | Бесплатно | ★★★★☆ |
| **Kap** | Mac | Бесплатно | ★★★★☆ |

### 6.2 Рекомендации по записи

```markdown
## Настройки записи
- Разрешение: 1920x1080 (или 1280x720 для меньшего размера)
- FPS: 30 (для плавности)
- Формат: GIF (для совместимости) или MP4 (для конвертации)

## Что записывать
1. **Hero Demo** (5-7 сек): загрузка страницы + анимации
2. **Quiz Demo** (8-10 сек): выбор ответов + прогресс
3. **Roadmap Demo** (6-8 сек): клик по навыкам + прогресс-бар
4. **Full Demo** (15-20 сек): быстрый обзор всех секций

## Оптимизация GIF
- Используй https://ezgif.com/optimize для сжатия
- Целевой размер: < 5MB на GIF
- Цвета: 128-256 (для баланса качества/размера)
```

### 6.3 Структура папки для GIF

```
public/
└── gifs/
    ├── hero-demo.gif       (5-7 сек, ~3MB)
    ├── quiz-demo.gif       (8-10 сек, ~4MB)
    ├── roadmap-demo.gif    (6-8 сек, ~3MB)
    └── full-demo.gif       (15-20 сек, ~5MB)
```

### 6.4 Пошаговая инструкция (ScreenToGif)

1. **Скачай** ScreenToGif с https://www.screentogif.com/
2. **Открой** SkillPath в браузере (`npm run dev`)
3. **Запусти** ScreenToGif → выбери область браузера
4. **Нажми** Record → делай действия → Stop
5. **Отредактируй**: убери лишние кадры, обрежь
6. **Экспортируй** в GIF с настройками:
   - Max colors: 256
   - Resize: 80% (если нужно уменьшить)
7. **Оптимизируй** на https://ezgif.com/optimize

---

## 7. Техническая реализация

### 7.1 Структура проекта

```
src/
├── app/
│   ├── presentation/
│   │   ├── Presentation.tsx      # Основной компонент
│   │   ├── slides/
│   │   │   ├── TitleSlide.tsx
│   │   │   ├── ProblemSlide.tsx
│   │   │   ├── SolutionSlide.tsx
│   │   │   ├── HowItWorksSlide.tsx
│   │   │   ├── GifHeroSlide.tsx
│   │   │   ├── ProfessionsSlide.tsx
│   │   │   ├── GifQuizSlide.tsx
│   │   │   ├── QuizDetailSlide.tsx
│   │   │   ├── RoadmapsSlide.tsx
│   │   │   ├── GifRoadmapSlide.tsx
│   │   │   ├── MentorsSlide.tsx
│   │   │   ├── CommunitySlide.tsx
│   │   │   ├── BentoSlide.tsx
│   │   │   ├── StatsSlide.tsx
│   │   │   ├── TestimonialsSlide.tsx
│   │   │   ├── CompaniesSlide.tsx
│   │   │   ├── GifFullDemoSlide.tsx
│   │   │   ├── PricingSlide.tsx
│   │   │   ├── TechStackSlide.tsx
│   │   │   ├── GamificationSlide.tsx
│   │   │   ├── MobileSlide.tsx
│   │   │   ├── FuturePlansSlide.tsx
│   │   │   ├── ComparisonSlide.tsx
│   │   │   └── CTASlide.tsx
│   │   └── components/
│   │       ├── SlideNavigation.tsx
│   │       ├── ProgressBar.tsx
│   │       └── GifPlayer.tsx
│   └── App.tsx
└── public/
    └── gifs/
        ├── hero-demo.gif
        ├── quiz-demo.gif
        ├── roadmap-demo.gif
        └── full-demo.gif
```

### 7.2 Основной компонент Presentation

```tsx
// src/app/presentation/Presentation.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';

import { TitleSlide } from './slides/TitleSlide';
import { ProblemSlide } from './slides/ProblemSlide';
import { SolutionSlide } from './slides/SolutionSlide';
import { HowItWorksSlide } from './slides/HowItWorksSlide';
import { GifHeroSlide } from './slides/GifHeroSlide';
import { ProfessionsSlide } from './slides/ProfessionsSlide';
import { GifQuizSlide } from './slides/GifQuizSlide';
import { QuizDetailSlide } from './slides/QuizDetailSlide';
import { RoadmapsSlide } from './slides/RoadmapsSlide';
import { GifRoadmapSlide } from './slides/GifRoadmapSlide';
import { MentorsSlide } from './slides/MentorsSlide';
import { CommunitySlide } from './slides/CommunitySlide';
import { BentoSlide } from './slides/BentoSlide';
import { StatsSlide } from './slides/StatsSlide';
import { TestimonialsSlide } from './slides/TestimonialsSlide';
import { CompaniesSlide } from './slides/CompaniesSlide';
import { GifFullDemoSlide } from './slides/GifFullDemoSlide';
import { PricingSlide } from './slides/PricingSlide';
import { TechStackSlide } from './slides/TechStackSlide';
import { GamificationSlide } from './slides/GamificationSlide';
import { MobileSlide } from './slides/MobileSlide';
import { FuturePlansSlide } from './slides/FuturePlansSlide';
import { ComparisonSlide } from './slides/ComparisonSlide';
import { CTASlide } from './slides/CTASlide';

const slides = [
  TitleSlide,
  ProblemSlide,
  SolutionSlide,
  HowItWorksSlide,
  GifHeroSlide,
  ProfessionsSlide,
  GifQuizSlide,
  QuizDetailSlide,
  RoadmapsSlide,
  GifRoadmapSlide,
  MentorsSlide,
  CommunitySlide,
  BentoSlide,
  StatsSlide,
  TestimonialsSlide,
  CompaniesSlide,
  GifFullDemoSlide,
  PricingSlide,
  TechStackSlide,
  GamificationSlide,
  MobileSlide,
  FuturePlansSlide,
  ComparisonSlide,
  CTASlide,
];

export function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const CurrentSlideComponent = slides[currentSlide];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Прогресс-бар */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-800 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Навигация */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        <button
          onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
          disabled={currentSlide === 0}
          className="w-10 h-10 rounded-full bg-zinc-800/80 backdrop-blur-sm flex items-center justify-center text-white disabled:opacity-30 hover:bg-zinc-700 transition-colors"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1))}
          disabled={currentSlide === slides.length - 1}
          className="w-10 h-10 rounded-full bg-zinc-800/80 backdrop-blur-sm flex items-center justify-center text-white disabled:opacity-30 hover:bg-zinc-700 transition-colors"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      {/* Счётчик слайдов */}
      <div className="fixed bottom-4 left-4 z-50 px-3 py-1 rounded-full bg-zinc-800/80 backdrop-blur-sm text-sm text-zinc-400">
        {currentSlide + 1} / {slides.length}
      </div>

      {/* Слайды */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CurrentSlideComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

### 7.3 Компонент GifPlayer

```tsx
// src/app/presentation/components/GifPlayer.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface GifPlayerProps {
  src: string;
  alt: string;
  caption?: string;
}

export function GifPlayer({ src, alt, caption }: GifPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [key, setKey] = useState(0);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const restart = () => setKey((prev) => prev + 1);

  return (
    <div className="relative">
      {/* Рамка */}
      <div className="absolute inset-0 rounded-2xl border-2 border-indigo-500/30 pointer-events-none" />
      
      {/* GIF */}
      <motion.div
        className="rounded-2xl overflow-hidden bg-zinc-900"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <img
          key={key}
          src={src}
          alt={alt}
          className="w-full aspect-video object-cover"
          style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
        />
      </motion.div>

      {/* Контролы */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>
        <button
          onClick={restart}
          className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Подпись */}
      {caption && (
        <p className="text-center text-zinc-500 mt-4 text-sm">{caption}</p>
      )}
    </div>
  );
}
```

---

## 8. Чеклист перед запуском

### 8.1 Контент

- [ ] Все 24 слайда готовы
- [ ] Тексты вычитаны (опечатки, грамматика)
- [ ] GIF-анимации созданы и оптимизированы (< 5MB каждый)
- [ ] Логотипы компаний добавлены
- [ ] Фото менторов/студентов (если используются)

### 8.2 Дизайн

- [ ] Все цвета соответствуют дизайн-системе
- [ ] Шрифты Inter и JetBrains Mono подключены
- [ ] Glassmorphism-эффекты работают
- [ ] Gradient-рамки отображаются корректно
- [ ] Glow-эффекты не перегружают дизайн

### 8.3 Анимации

- [ ] Scroll-анимации плавные (без рывков)
- [ ] Staggered-анимации для списков
- [ ] Hover-эффекты на карточках
- [ ] Прогресс-бар работает
- [ ] Навигация стрелками работает

### 8.4 Производительность

- [ ] GIF оптимизированы (ezgif.com)
- [ ] Изображения сжаты
- [ ] Нет лишних re-renders
- [ ] Lighthouse score > 90

### 8.5 Тестирование

- [ ] Тест на десктопе (Chrome, Firefox, Safari)
- [ ] Тест на мобильном (iOS Safari, Android Chrome)
- [ ] Тест на планшете (iPad)
- [ ] Навигация стрелками работает
- [ ] Прогресс-бар отображается

### 8.6 Деплой

- [ ] Собрать проект: `npm run build`
- [ ] Проверить `dist/` папку
- [ ] Загрузить на хостинг (Vercel/Netlify)
- [ ] Проверить работу на продакшене

---

## Дополнительные ресурсы

### Инструменты

| Инструмент | Назначение | Ссылка |
|------------|-----------|--------|
| Framer Motion | Анимации | https://www.framer.com/motion/ |
| Lucide React | Иконки | https://lucide.dev/ |
| Tailwind CSS | Стили | https://tailwindcss.com/ |
| ScreenToGif | Запись GIF | https://www.screentogif.com/ |
| EZGIF | Оптимизация GIF | https://ezgif.com/optimize |
| Google Fonts | Шрифты | https://fonts.google.com/ |

### Вдохновение

- Apple Keynote — чистый минимализм, large typography
- Google I/O — smooth transitions, gradient accents
- Vercel Keynote — dark theme, glow effects
- Linear App — glassmorphism, subtle animations

---

## Готово! 🚀

Теперь у тебя есть всё, чтобы создать шикарную премиум-презентацию SkillPath. Следуй гиду по порядку, и получишь интерактивную веб-презентацию в стиле Google/Apple keynote.

**Ключевые моменты:**
1. Сначала создай дизайн-систему (цвета, шрифты, компоненты)
2. Потом реализуй слайды по одному
3. Запиши GIF-демонстрации через OBS/ScreenToGif
4. Добавь анимации через Framer Motion
5. Оптимизируй и задеплой

Удачи! 🎨
