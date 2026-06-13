export type CharacterState = "idle" | "wave" | "curious" | "showItem" | "lookAt" | "headphonesOn" | "sleepy" | "excited";
export type ItemKind = "map" | "book" | "compass" | "star" | "rocket" | "trophy" | "code" | "shield";

export interface GuideDialog {
  id: string;
  section: string;
  messages: { EN: string[]; RU: string[] };
  trigger: "auto" | "click";
  characterState: CharacterState;
  item?: ItemKind;
}

export const guideDialogs: GuideDialog[] = [
  // === LANDING PAGE ===
  {
    id: "welcome",
    section: "hero",
    messages: {
      EN: ["Hey! I'm Pixel, your guide!", "Let me show you around.", "Click me anytime for help!"],
      RU: ["Привет! Я Пиксель, твой гид!", "Давай покажу что тут есть.", "Нажми на меня, если нужна помощь!"],
    },
    trigger: "auto",
    characterState: "wave",
  },
  {
    id: "roles",
    section: "roles",
    messages: {
      EN: ["8 career paths to explore!", "Each one has a unique skill tree.", "Pick your vibe."],
      RU: ["8 карьерных путей!", "У каждого своё дерево навыков.", "Выбери свой."],
    },
    trigger: "auto",
    characterState: "showItem",
    item: "compass",
  },
  {
    id: "steps",
    section: "steps",
    messages: {
      EN: ["Super easy to start!", "Test → Roadmap → Level up.", "I'll guide you!"],
      RU: ["Начать проще простого!", "Тест → Роадмап → Прокачка.", "Я помогу!"],
    },
    trigger: "auto",
    characterState: "showItem",
    item: "map",
  },
  {
    id: "bento",
    section: "bento",
    messages: {
      EN: ["Roadmaps, mentors, certs...", "Everything in one place!", "Check it out!"],
      RU: ["Роадмапы, менторы, сертификаты...", "Всё в одном месте!", "Смотри!"],
    },
    trigger: "auto",
    characterState: "curious",
  },
  {
    id: "stats",
    section: "stats",
    messages: {
      EN: ["Thousands of students!", "You could be next!", "Join now!"],
      RU: ["Тысячи студентов!", "Ты можешь быть следующим!", "Присоединяйся!"],
    },
    trigger: "auto",
    characterState: "showItem",
    item: "star",
  },
  {
    id: "testimonials",
    section: "testimonials",
    messages: {
      EN: ["Real stories!", "Started from zero, now they're devs.", "Your turn!"],
      RU: ["Настоящие истории!", "Начали с нуля, теперь разработчики.", "Твоя очередь!"],
    },
    trigger: "auto",
    characterState: "showItem",
    item: "book",
  },
  {
    id: "faq",
    section: "faq",
    messages: {
      EN: ["Got questions?", "FAQ below or ask me!", "I'm here!"],
      RU: ["Есть вопросы?", "FAQ внизу или спроси меня!", "Я тут!"],
    },
    trigger: "auto",
    characterState: "curious",
  },
  {
    id: "pricing",
    section: "pricing",
    messages: {
      EN: ["Plans for every budget!", "Start free, upgrade later.", "Pro is a fan favorite!"],
      RU: ["Планы на любой бюджет!", "Начни бесплатно.", "Pro — фаворит!"],
    },
    trigger: "auto",
    characterState: "showItem",
    item: "star",
  },
  // === ROADMAPS PAGE ===
  {
    id: "roadmaps-welcome",
    section: "roadmaps",
    messages: {
      EN: ["Here are your career paths!", "Pick one that excites you.", "Each has step-by-step phases."],
      RU: ["Вот твои карьерные пути!", "Выбери тот, что нравится.", "У каждого есть фазы обучения."],
    },
    trigger: "auto",
    characterState: "showItem",
    item: "compass",
  },
  // === PROFILE PAGE ===
  {
    id: "profile-welcome",
    section: "profile",
    messages: {
      EN: ["Your personal dashboard!", "Track quizzes, bookings, courses.", "Everything in one place!"],
      RU: ["Твой личный кабинет!", "Тесты, записи, курсы.", "Всё в одном месте!"],
    },
    trigger: "auto",
    characterState: "showItem",
    item: "star",
  },
  // === LESSONS PAGE ===
  {
    id: "lessons-welcome",
    section: "lessons",
    messages: {
      EN: ["Time to learn!", "Read theory, practice code.", "Mark lessons complete!"],
      RU: ["Время учиться!", "Читай теорию, пиши код.", "Отмечай уроки пройденными!"],
    },
    trigger: "auto",
    characterState: "showItem",
    item: "book",
  },
  // === MENTORS PAGE ===
  {
    id: "mentors-welcome",
    section: "mentors",
    messages: {
      EN: ["Meet our mentors!", "Book a session, get feedback.", "They've been where you are."],
      RU: ["Познакомься с менторами!", "Запишись на сессию.", "Они прошли твой путь."],
    },
    trigger: "auto",
    characterState: "showItem",
    item: "compass",
  },
  // === QUIZ PAGE ===
  {
    id: "quiz-welcome",
    section: "quiz",
    messages: {
      EN: ["Let's find your path!", "Answer honestly for best results.", "Takes about 2 minutes!"],
      RU: ["Давай найдём твой путь!", "Отвечай честно.", "Займёт пару минут!"],
    },
    trigger: "auto",
    characterState: "excited",
    item: "trophy",
  },
  // === EVENT-BASED ===
  {
    id: "lesson-complete",
    section: "event-lesson-complete",
    messages: {
      EN: ["Nice work! Lesson done!", "Keep going, you're on fire!"],
      RU: ["Отлично! Урок пройден!", "Продолжай, ты в ударе!"],
    },
    trigger: "click",
    characterState: "excited",
    item: "star",
  },
  {
    id: "quiz-complete",
    section: "event-quiz-complete",
    messages: {
      EN: ["Quiz done! Check your results!", "Your career path is clear now."],
      RU: ["Тест пройден! Смотри результат!", "Твой карьерный путь определён."],
    },
    trigger: "click",
    characterState: "excited",
    item: "trophy",
  },
];
