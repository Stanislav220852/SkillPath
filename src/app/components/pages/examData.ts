export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

export interface CodeTask {
  id: string;
  task: string;
  starterCode: string;
  checkFor: string[];
  hint: string;
}

export interface PhaseExamData {
  phaseName: string;
  theory: ExamQuestion[];
  practice: CodeTask[];
}

export interface FinalExamData {
  title: string;
  theory: ExamQuestion[];
  practice: CodeTask[];
}

export const examData: Record<string, Record<string, PhaseExamData | FinalExamData>> = {
  frontend: {
    "phase-0": {
      phaseName: "Основы",
      theory: [
        { id: "fe-f1", question: "Что такое HTML?", options: ["Язык программирования", "Язык разметки для создания структуры страниц", "Стилизация элементов", "Управление логикой"], correct: 1, explanation: "HTML (HyperText Markup Language) — это язык разметки, который определяет структуру веб-страницы." },
        { id: "fe-f2", question: "Какой тег создаёт нумерованный список?", options: ["<ul>", "<li>", "<ol>", "<list>"], correct: 2, explanation: "<ol> (ordered list) создаёт нумерованный список. <ul> — маркированный." },
        { id: "fe-f3", question: "Чем <strong> отличается от <b>?", options: ["Ничем — это одно и то же", "<strong> подчёркивает важность, <b> — просто жирный", "<b> семантический, <strong> нет", "<strong> работает только в CSS"], correct: 1, explanation: "<strong> — семантический тег важности, <b> — просто визуальное форматирование." },
        { id: "fe-f4", question: "Какой атрибут делает ссылку открывающейся в новой вкладке?", options: ['target="_new"', 'target="_blank"', 'open="new"', 'newtab="true"'], correct: 1, explanation: 'target="_blank" заставляет ссылку открываться в новой вкладке.' },
        { id: "fe-f5", question: "Что такое «семантические теги» в HTML?", options: ["Теги с красивым названием", "Теги, которые описывают смысл содержимого (header, nav, article)", "Теги, которые работают быстрее", "Теги для SEO-оптимизации только"], correct: 1, explanation: "Семантические теги (header, nav, main, article, section) описывают роль содержимого на странице." },
      ],
      practice: [
        { id: "fe-fp1", task: "Создай страницу с заголовком <h1> и абзацем <p>", starterCode: '<h1>Мой первый сайт</h1>\n<p>Привет, мир!</p>', checkFor: ["<h1>", "<p>"], hint: "Используй теги <h1> и <p>" },
        { id: "fe-fp2", task: "Создай нумерованный список из 3 пунктов", starterCode: '<ol>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>JavaScript</li>\n</ol>', checkFor: ["<ol>", "<li>"], hint: "Используй <ol> для нумерованного списка и <li> для пунктов" },
      ],
    },
    "phase-1": {
      phaseName: "Фреймворки",
      theory: [
        { id: "fe-fw1", question: "Что такое React?", options: ["База данных", "JavaScript-библиотека для создания UI", "Операционная система", "Язык стилей"], correct: 1, explanation: "React — это JavaScript-библиотека от Facebook для построения пользовательских интерфейсов." },
        { id: "fe-fw2", question: "Что такое JSX?", options: ["Новый язык программирования", "Синтаксическое расширение JavaScript для описания UI", "CSS-фреймворк", "Тип данных в JS"], correct: 1, explanation: "JSX позволяет писать HTML-подобный код прямо внутри JavaScript." },
        { id: "fe-fw3", question: "Зачем в React нужен key при рендере списков?", options: ["Для красоты", "Для оптимизации перерисовки — React идентифицирует элементы", "Для стилизации", "Для работы с API"], correct: 1, explanation: "key помогает React эффективно обновлять DOM, зная какой элемент изменился." },
        { id: "fe-fw4", question: "Что делает хук useState?", options: ["Отправляет запрос на сервер", "Создаёт переменную состояния с функцией обновления", "Удаляет компонент", "Подключает базу данных"], correct: 1, explanation: "useState возвращает массив [значение, функция_обновления] для хранения состояния компонента." },
        { id: "fe-fw5", question: "Props в React — это:", options: ["Глобальная переменная", "Данные, передаваемые от родителя к ребёнку (только для чтения)", "Локальное состояние", "CSS-стили"], correct: 1, explanation: "Props — это аргументы компонента, передающие данные сверху вниз. Изменять их нельзя." },
      ],
      practice: [
        { id: "fe-fwp1", task: "Создай компонент Greeting, принимающий userName и отображающий приветствие", starterCode: 'function Greeting({ userName }) {\n  return (\n    <div>\n      <h1>Привет, {userName}!</h1>\n    </div>\n  );\n}', checkFor: ["function", "userName", "return"], hint: "Компонент — это функция, возвращающая JSX" },
        { id: "fe-fwp2", task: "Создай счётчик с useState (кнопка + и −)", starterCode: 'function Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <p>{count}</p>\n      <button onClick={() => setCount(count + 1)}>+</button>\n    </div>\n  );\n}', checkFor: ["useState", "setCount", "onClick"], hint: "Используй useState для хранения значения счётчика" },
      ],
    },
    "phase-2": {
      phaseName: "Продвинутый",
      theory: [
        { id: "fe-a1", question: "Зачем нужен TypeScript?", options: ["Для стилизации", "Добавляет типизацию в JavaScript для надёжности", "Заменяет React", "Для работы с базой данных"], correct: 1, explanation: "TypeScript добавляет статическую типизацию, помогая ловить ошибки на этапе разработки." },
        { id: "fe-a2", question: "Что такое state management?", options: ["Управление стилями", "Управление глобальным состоянием приложения", "Управление серверами", "Управление версиями"], correct: 1, explanation: "State management — паттерн для централизованного хранения и обмена данными между компонентами." },
        { id: "fe-a3", question: "Зачем нужны тесты?", options: ["Для украшения кода", "Для автоматической проверки корректности кода", "Для ускорения работы", "Для работы с Git"], correct: 1, explanation: "Тесты автоматически проверяют, что код работает правильно и не ломается при изменениях." },
        { id: "fe-a4", question: "Что такое CI/CD?", options: ["Система контроля версий", "Автоматизация сборки, тестирования и деплоя кода", "Тип базы данных", "Фреймворк для тестирования"], correct: 1, explanation: "CI (Continuous Integration) — автоматическая сборка и тестирование. CD (Continuous Delivery) — автоматический деплой." },
      ],
      practice: [
        { id: "fe-ap1", task: "Напиши TypeScript-интерфейс User с полями name: string и age: number", starterCode: 'interface User {\n  name: string;\n  age: number;\n}', checkFor: ["interface", "name", "age", "string", "number"], hint: "Используй ключевое слово interface" },
      ],
    },
  },

  ai: {
    "phase-0": {
      phaseName: "Основы",
      theory: [
        { id: "ai-f1", question: "Почему Python — основной язык AI/ML?", options: ["Он самый быстрый", "Большая экосистема библиотек (NumPy, Pandas, TensorFlow, PyTorch)", "Он бесплатный", "Он работает в браузере"], correct: 1, explanation: "Python имеет огромную экосистему специализированных библиотек для машинного обучения." },
        { id: "ai-f2", question: "Что такое динамическая типизация?", options: ["Типы задаются вручную", "Тип переменной определяется во время выполнения программы", "Нельзя менять значения переменных", "Типы проверяются только в продакшне"], correct: 1, explanation: "В Python тип переменной определяется автоматически при присваивании значения." },
        { id: "ai-f3", question: "Какой метод возвращает тип переменной в Python?", options: ["typeof()", "dtype()", "type()", "typeof var"], correct: 2, explanation: "Функция type() возвращает тип объекта: type(42) → <class 'int'>" },
        { id: "ai-f4", question: "Что такое f-строки в Python?", options: ["Строки для файлов", "Строки с встроенными переменными через {переменная}", "Строки формата", "Быстрые строки"], correct: 1, explanation: 'f-строки позволяют вставлять переменные: f"Точность: {accuracy:.2f}"' },
        { id: "ai-f5", question: "Как добавить элемент в список Python?", options: ["list.add()", "list.append()", "list.push()", "list.insertLast()"], correct: 1, explanation: "Метод append() добавляет элемент в конец списка: data.append(new_value)" },
      ],
      practice: [
        { id: "ai-fp1", task: "Рассчитай точность (accuracy) модели: подели правильные ответы на общее количество", starterCode: 'correct = 85\ntotal = 100\naccuracy = correct / total\nprint(f"Точность: {accuracy:.2%}")', checkFor: ["correct", "total", "accuracy", "/"], hint: "Accuracy = правильные / всего" },
        { id: "ai-fp2", task: "Создай список потерь (loss) за 3 эпохи и выведи среднее", starterCode: 'losses = [0.85, 0.52, 0.31]\navg_loss = sum(losses) / len(losses)\nprint(f"Средний loss: {avg_loss:.3f}")', checkFor: ["losses", "sum", "len"], hint: "Используй sum() и len() для расчёта среднего" },
      ],
    },
    "phase-1": {
      phaseName: "Машинное обучение",
      theory: [
        { id: "ai-m1", question: "Что такое Scikit-learn?", options: ["Библиотека для нейросетей", "Библиотека классических ML-алгоритмов (регрессия, классификация)", "Язык программирования", "Фреймворк для деплоя"], correct: 1, explanation: "Scikit-learn предоставляет готовые реализации классических алгоритмов ML." },
        { id: "ai-m2", question: "Что такое overfitting?", options: ["Модель слишком простая", "Модель запомнила шум данных и плохо обобщает", "Модель не обучилась", "Модель работает слишком быстро"], correct: 1, explanation: "Overfitting — когда модель идеально работает на обучающих данных, но плохо на новых." },
        { id: "ai-m3", question: "Что делает нейронная сеть?", options: ["Хранит данные", "Обрабатывает входные данные через слои нейронов для предсказания", "Удаляет файлы", "Создаёт сайты"], correct: 1, explanation: "Нейросеть — это модель из слоёв нейронов, которая учится находить паттерны в данных." },
        { id: "ai-m4", question: "Что такое эпоха (epoch) в обучении?", options: ["Один шаг градиентного спуска", "Один полный проход по всему обучающему набору данных", "Один предсказание", "Один батч данных"], correct: 1, explanation: "Эпоха — это один полный цикл прохода модели по всему обучающему датасету." },
      ],
      practice: [
        { id: "ai-mp1", task: "Реализуй простую линейную регрессию: y = wx + b", starterCode: 'x = [1, 2, 3, 4, 5]\ny = [2, 4, 5, 4, 5]\n# Рассчитай средние\nx_mean = sum(x) / len(x)\ny_mean = sum(y) / len(y)\nprint(f"Среднее x: {x_mean}, y: {y_mean}")', checkFor: ["x_mean", "y_mean", "sum", "len"], hint: "Рассчитай средние значения x и y" },
      ],
    },
    "phase-2": {
      phaseName: "Специализация",
      theory: [
        { id: "ai-s1", question: "Что такое NLP?", options: ["Тип нейросети", "Обработка естественного языка — анализ и генерация текста", "Новый язык программирования", "База данных"], correct: 1, explanation: "NLP (Natural Language Processing) — область AI для работы с человеческим языком." },
        { id: "ai-s2", question: "Что такое Transformer в AI?", options: ["Преобразователь напряжения", "Архитектура нейросети для последовательностей (GPT, BERT)", "Тип базы данных", "Фреймворк для деплоя"], correct: 1, explanation: "Transformer — архитектура с механизмом внимания, лежащая в основе GPT, BERT и других LLM." },
        { id: "ai-s3", question: "Что такое MLOps?", options: ["Новый ML-алгоритм", "Практики деплоя и мониторинга ML-моделей в продакшне", "Тип нейросети", "Библиотека для анализа данных"], correct: 1, explanation: "MLOps объединяет ML, DevOps и инженерию данных для надёжного вывода моделей в продакшн." },
      ],
      practice: [
        { id: "ai-sp1", task: "Создай словарь с метриками модели и выведи лучшую эпоху", starterCode: 'metrics = {\n    "epoch_1": {"loss": 0.85, "accuracy": 0.72},\n    "epoch_2": {"loss": 0.52, "accuracy": 0.84},\n    "epoch_3": {"loss": 0.31, "accuracy": 0.91},\n}\nbest = max(metrics, key=lambda e: metrics[e]["accuracy"])\nprint(f"Лучшая: {best} — accuracy: {metrics[best][\'accuracy\']}")', checkFor: ["metrics", "max", "accuracy"], hint: "Используй max() с lambda для поиска максимального значения" },
      ],
    },
  },

  cybersec: {
    "phase-0": {
      phaseName: "Основы",
      theory: [
        { id: "cs-f1", question: "Сколько уровней в модели OSI?", options: ["4", "5", "7", "10"], correct: 2, explanation: "Модель OSI состоит из 7 уровней: Physical, Data Link, Network, Transport, Session, Presentation, Application." },
        { id: "cs-f2", question: "Что такое ARP Spoofing?", options: ["Атака на DNS", "Подмена MAC-адреса для перехвата трафика в локальной сети", "Взлом пароля", "DDoS атака"], correct: 1, explanation: "ARP Spoofing — атака Man-in-the-Middle, при которой атакующий подделывает ARP-ответы." },
        { id: "cs-f3", question: "Какой протокол используется для разрешения имён в IP-адреса?", options: ["DHCP", "DNS", "HTTP", "FTP"], correct: 1, explanation: "DNS (Domain Name System) преобразует доменные имена в IP-адреса." },
        { id: "cs-f4", question: "Что такое CIDR /24?", options: ["24 компьютера в сети", "Подсеть с 254 хостами (маска 255.255.255.0)", "24 порта", "24 уровня защиты"], correct: 1, explanation: "/24 означает, что первые 24 бита — сетевая часть, оставшиеся 8 — для хостов (254 адреса)." },
        { id: "cs-f5", question: "Что такое Zone Transfer в DNS?", options: ["Быстрое переключение DNS", "Уязвимость — копирование всей DNS-зоны с сервера", "Шифрование DNS-запросов", "Кэширование DNS"], correct: 1, explanation: "Zone Transfer (AXFR) — уязвимость, позволяющая скопировать полную DNS-зону с сервера." },
      ],
      practice: [
        { id: "cs-fp1", task: "Напиши Python-скрипт для получения hostname и IP-адреса машины", starterCode: 'import socket\n\nhostname = socket.gethostname()\nip = socket.gethostbyname(hostname)\nprint(f"Хост: {hostname}")\nprint(f"IP: {ip}")', checkFor: ["socket", "gethostname", "gethostbyname"], hint: "Используй модуль socket" },
      ],
    },
    "phase-1": {
      phaseName: "Атаки и защита",
      theory: [
        { id: "cs-a1", question: "Что такое Penetration Testing?", options: ["Тестирование скорости", "Легальный взлом систем для поиска уязвимостей", "Тестирование сети", "Проверка паролей"], correct: 1, explanation: "Pentest — авторизованное тестирование безопасности систем методами реальных атак." },
        { id: "cs-a2", question: "Что такое SQL Injection?", options: ["Установка SQL-сервера", "Внедрение SQL-кода через пользовательский ввод", "Оптимизация запросов", "Шифрование базы данных"], correct: 1, explanation: "SQL Injection — атака, при которой злоумышленник внедряет SQL-запросы через незащищённые поля ввода." },
        { id: "cs-a3", question: "Что такое XSS?", options: ["Новый CSS-фреймворк", "Внедрение вредоносного JavaScript в веб-страницы", "Тип вируса", "Протокол передачи данных"], correct: 1, explanation: "Cross-Site Scripting — атака, при которой вредоносный JS-код внедряется в контекст другого пользователя." },
        { id: "cs-a4", question: "OWASP Top 10 — это:", options: ["Топ-10 лучших языков", "Список самых опасных уязвимостей веб-приложений", "Список фреймворков", "Топ-10 вирусов"], correct: 1, explanation: "OWASP Top 10 — стандартный список самых критичных рисков безопасности веб-приложений." },
      ],
      practice: [
        { id: "cs-ap1", task: "Напиши функцию, проверяющую ввод на наличие SQL-инъекции (простые паттерны)", starterCode: 'def check_injection(input_str):\n    dangerous = ["\'", "--", ";", "OR 1=1"]\n    for pattern in dangerous:\n        if pattern in input_str:\n            return True\n    return False\n\nprint(check_injection("admin\' OR 1=1--"))', checkFor: ["def", "dangerous", "return"], hint: "Проверь ввод на наличие опасных символов и паттернов" },
      ],
    },
    "phase-2": {
      phaseName: "Продвинутый",
      theory: [
        { id: "cs-p1", question: "Что такое SIEM?", options: ["Тип фреймворка", "Система сбора и анализа логов безопасности", "Протокол шифрования", "Тип атаки"], correct: 1, explanation: "SIEM (Security Information and Event Management) — централизованная система мониторинга безопасности." },
        { id: "cs-p2", question: "Что такое SOC?", options: ["Социальная сеть", "Security Operations Center — центр реагирования на инциденты", "Тип шифрования", "Сертификат"], correct: 1, explanation: "SOC — команда и инфраструктура для обнаружения и реагирования на инциденты безопасности." },
        { id: "cs-p3", question: "Зачем нужны сертификации (CEH, OSCP)?", options: ["Для красоты резюме", "Для подтверждения профессиональных навыков безопасности", "Для получения доступа к серверам", "Обязательны по закону"], correct: 1, explanation: "Сертификации подтверждают компетентность и высоко ценятся работодателями в сфере информационной безопасности." },
      ],
      practice: [
        { id: "cs-sp1", task: "Напиши скрипт для простого анализа логов: найди все IP с количеством запросов > 100", starterCode: 'logs = [\n    "192.168.1.1 - GET /api",\n    "10.0.0.5 - POST /login",\n    "192.168.1.1 - GET /api",\n]\n\nfrom collections import Counter\nips = Counter(line.split()[0] for line in logs)\nsuspicious = {ip: count for ip, count in ips.items() if count > 1}\nprint(f"Подозрительные IP: {suspicious}")', checkFor: ["Counter", "suspicious"], hint: "Используй collections.Counter для подсчёта запросов" },
      ],
    },
  },

  datascience: {
    "phase-0": {
      phaseName: "Основы",
      theory: [
        { id: "ds-f1", question: "Зачем нужен SQL в Data Science?", options: ["Для стилизации", "Для извлечения и анализа данных из баз", "Для визуализации", "Для машинного обучения"], correct: 1, explanation: "SQL — основной язык для извлечения данных из реляционных баз данных." },
        { id: "ds-f2", question: "Что такое Pandas?", options: ["База данных", "Библиотека Python для анализа табличных данных", "Фреймворк для веба", "Язык запросов"], correct: 1, explanation: "Pandas — библиотека для работы с таблицами (DataFrame) в Python." },
        { id: "ds-f3", question: "Что такое NumPy?", options: ["Библиотека для числовых вычислений и матриц", "База данных", "Веб-фреймворк", "Текстовый редактор"], correct: 0, explanation: "NumPy — фундаментальная библиотека для научных вычислений с поддержкой массивов и матриц." },
        { id: "ds-f4", question: "SELECT * FROM users WHERE age > 25 вернёт:", options: ["Все данные из таблицы users", "Только пользователей старше 25", "Все столбцы для пользователей младше 25", "Ничего"], correct: 1, explanation: "WHERE фильтрует строки по условию — вернутся только записи с age > 25." },
      ],
      practice: [
        { id: "ds-fp1", task: "Создай Pandas DataFrame со студентами и выведи средний балл", starterCode: 'import pandas as pd\n\ndata = {\n    "name": ["Аня", "Борис", "Вика"],\n    "score": [85, 92, 78]\n}\ndf = pd.DataFrame(data)\nprint(f"Средний балл: {df[\'score\'].mean()}")', checkFor: ["DataFrame", "mean"], hint: "Используй pd.DataFrame и метод .mean()" },
      ],
    },
    "phase-1": {
      phaseName: "Анализ и визуализация",
      theory: [
        { id: "ds-a1", question: "Что такое EDA?", options: ["Тип графика", "Exploratory Data Analysis — разведочный анализ данных", "База данных", "Язык программирования"], correct: 1, explanation: "EDA — этап анализа данных для понимания их структуры, выбросов и закономерностей." },
        { id: "ds-a2", question: "Что такое p-value?", options: ["Ценность товара", "Вероятность получить наблюдаемый результат при верности нулевой гипотезы", "Количество переменных", "Точность модели"], correct: 1, explanation: "p-value показывает, насколько значим результат. Маленькое p (< 0.05) говорит о статистической значимости." },
        { id: "ds-a3", question: "Для чего нужен matplotlib/seaborn?", options: ["Для работы с БД", "Для визуализации данных (графики, диаграммы)", "Для машинного обучения", "Для веб-разработки"], correct: 1, explanation: "Matplotlib и Seaborn — библиотеки для создания графиков и визуализаций данных." },
      ],
      practice: [
        { id: "ds-ap1", task: "Создай словарь с данными студентов и найди медиану оценок", starterCode: 'scores = [78, 85, 92, 88, 76, 95, 82]\nsorted_scores = sorted(scores)\nn = len(sorted_scores)\nmedian = sorted_scores[n // 2]\nprint(f"Медиана: {median}")', checkFor: ["sorted", "median"], hint: "Отсортируй массив и возьми элемент посередине" },
      ],
    },
    "phase-2": {
      phaseName: "ML и продакшн",
      theory: [
        { id: "ds-p1", question: "Что такое Feature Engineering?", options: ["Создание нового ПО", "Создание и преобразование признаков для улучшения модели", "Установка серверов", "Написание документации"], correct: 1, explanation: "Feature Engineering — процесс создания новых и преобразования существующих признаков для модели." },
        { id: "ds-p2", question: "Что такое BI-дашборд?", options: ["Тип базы данных", "Интерактивная панель для визуализации бизнес-метрик", "Сервер мониторинга", "Язык программирования"], correct: 1, explanation: "BI-дашборд — визуальный интерфейс для отслеживания ключевых бизнес-показателей в реальном времени." },
        { id: "ds-p3", question: "Что такое Big Data?", options: ["Большие файлы", "Данные, которые слишком велики для обработки обычными инструментами", "База данных SQL", "Тип графика"], correct: 1, explanation: "Big Data — данные огромного объёма, требующие специальных технологий (Spark, Hadoop) для обработки." },
      ],
      practice: [
        { id: "ds-sp1", task: "Напиши простую функцию feature scaling (мин-макс нормализация)", starterCode: 'def min_max_scale(data):\n    min_val = min(data)\n    max_val = max(data)\n    return [(x - min_val) / (max_val - min_val) for x in data]\n\nraw = [10, 20, 30, 40, 50]\nprint(min_max_scale(raw))', checkFor: ["min", "max", "return"], hint: "Формула: (x - min) / (max - min)" },
      ],
    },
  },

  backend: {
    "phase-0": {
      phaseName: "Основы",
      theory: [
        { id: "be-f1", question: "Что такое Node.js?", options: ["Браузер", "Среда выполнения JavaScript на сервере", "База данных", "Фреймворк для стилей"], correct: 1, explanation: "Node.js позволяет запускать JavaScript на сервере, используя движок V8." },
        { id: "be-f2", question: "Зачем нужен Express.js?", options: ["Для стилизации", "Для упрощения создания серверов и маршрутов в Node.js", "Для работы с БД", "Для тестирования"], correct: 1, explanation: "Express — минималистичный фреймворк для создания HTTP-серверов и API." },
        { id: "be-f3", question: "Что такое Event Loop в Node.js?", options: ["Цикл for", "Механизм обработки асинхронных операций без блокировки потока", "Тип цикла в Python", "Метод сортировки"], correct: 1, explanation: "Event Loop позволяет Node.js обрабатывать множество запросов в одном потоке без блокировки." },
        { id: "be-f4", question: "SQL и NoSQL — это:", options: ["Языки программирования", "Типы баз данных: реляционные и документоориентированные", "Фреймворки", "Протоколы"], correct: 1, explanation: "SQL (PostgreSQL, MySQL) — реляционные. NoSQL (MongoDB, Redis) — гибкие, документоориентированные." },
      ],
      practice: [
        { id: "be-fp1", task: "Создай Express-сервер с маршрутом GET /api/health", starterCode: 'const express = require("express");\nconst app = express();\n\napp.get("/api/health", (req, res) => {\n  res.json({ status: "ok" });\n});\n\napp.listen(3000);', checkFor: ["express", "app.get", "res.json"], hint: "Используй express() и app.get() для маршрута" },
      ],
    },
    "phase-1": {
      phaseName: "Бэкенд-навыки",
      theory: [
        { id: "be-a1", question: "Что такое JWT?", options: ["Тип базы данных", "JSON Web Token — способ авторизации через токены", "Протокол передачи файлов", "Фреймворк"], correct: 1, explanation: "JWT — компактный токен для безопасной передачи данных между клиентом и сервером." },
        { id: "be-a2", question: "HTTP-метод POST используется для:", options: ["Получения данных", "Отправки данных для создания нового ресурса", "Удаления данных", "Обновления URL"], correct: 1, explanation: "POST отправляет данные на сервер для создания нового ресурса (регистрация, загрузка файла)." },
        { id: "be-a3", question: "Что такое REST API?", options: ["База данных", "Архитектурный стиль для проектирования веб-сервисов", "Язык программирования", "Протокол шифрования"], correct: 1, explanation: "REST — архитектурный стиль, использующий HTTP-методы для работы с ресурсами по URI." },
        { id: "be-a4", question: "HTTP-код 404 означает:", options: ["Успех", "Ресурс не найден", "Ошибка сервера", "Нет авторизации"], correct: 1, explanation: "404 Not Found — сервер не может найти запрашиваемый ресурс." },
      ],
      practice: [
        { id: "be-ap1", task: "Создай middleware для проверки авторизации", starterCode: 'function checkAuth(req, res, next) {\n  const token = req.headers.authorization;\n  if (!token) {\n    return res.status(401).json({ error: "No token" });\n  }\n  next();\n}', checkFor: ["req.headers", "authorization", "next", "401"], hint: "Проверь наличие заголовка authorization" },
      ],
    },
    "phase-2": {
      phaseName: "Production",
      theory: [
        { id: "be-p1", question: "Зачем нужен Docker?", options: ["Для стилизации", "Для упаковки приложения в контейнеры для переносимости", "Для работы с API", "Для тестирования"], correct: 1, explanation: "Docker упаковывает приложение со всеми зависимостями в контейнер, работаемый где угодно." },
        { id: "be-p2", question: "Что такое Cloud (AWS/GCP)?", options: ["Облачное хранилище фото", "Удалённая инфраструктура для размещения приложений", "Тип базы данных", "Фреймворк"], correct: 1, explanation: "Облачные платформы предоставляют вычислительные ресурсы по требованию (серверы, хранилища, сеть)." },
        { id: "be-p3", question: "Что такое CI/CD pipeline?", options: ["Трубопровод для воды", "Автоматизированный процесс сборки, тестирования и деплоя", "Тип маршрута", "Протокол передачи"], correct: 1, explanation: "Pipeline автоматизирует процесс от коммита кода до деплоя в продакшн." },
      ],
      practice: [
        { id: "be-sp1", task: "Напиши Dockerfile для Node.js приложения", starterCode: 'FROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nEXPOSE 3000\nCMD ["node", "server.js"]', checkFor: ["FROM", "RUN", "COPY", "EXPOSE", "CMD"], hint: "Используй базовый образ Node.js и стандартные инструкции" },
      ],
    },
  },

  mobile: {
    "phase-0": {
      phaseName: "Основы",
      theory: [
        { id: "mo-f1", question: "Что такое React Native?", options: ["База данных", "Фреймворк для создания мобильных приложений на React", "Игровой движок", "Язык стилей"], correct: 1, explanation: "React Native позволяет создавать нативные мобильные приложения (iOS/Android) с использованием React." },
        { id: "mo-f2", question: "React Native отличается от React тем, что:", options: ["Использует другой язык", "Рендерит нативные компоненты вместо HTML-элементов", "Не поддерживает компоненты", "Работает только на Android"], correct: 1, explanation: "React Native рендерит нативные виджеты (View, Text, Image), а не HTML-теги." },
        { id: "mo-f3", question: "Зачем нужен Expo при разработке на React Native?", options: ["Для стилизации", "Упрощает настройку, сборку и тестирование приложений", "Для работы с базой данных", "Для создания API"], correct: 1, explanation: "Expo предоставляет инструменты и API для быстрой разработки без настройки нативной среды." },
        { id: "mo-f4", question: "Что такое Navigation в мобильных приложениях?", options: ["GPS-навигатор", "Система переходов между экранами приложения", "Меню настроек", "Поиск по приложению"], correct: 1, explanation: "Navigation управляет переходами между экранами (stack, tab, drawer навигация)." },
      ],
      practice: [
        { id: "mo-fp1", task: "Создай экран приветствия с кнопкой и текстом", starterCode: 'import React from "react";\nimport { View, Text, Button } from "react-native";\n\nexport default function HomeScreen() {\n  return (\n    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>\n      <Text>Привет, мир!</Text>\n      <Button title="Нажми меня" onPress={() => alert("OK")} />\n    </View>\n  );\n}', checkFor: ["View", "Text", "Button"], hint: "Используй View, Text и Button из react-native" },
      ],
    },
    "phase-1": {
      phaseName: "Нативные фичи",
      theory: [
        { id: "mo-a1", question: "Зачем нужны нативные API в React Native?", options: ["Для стилизации", "Для доступа к камере, GPS, уведомлениям и другим возможностям устройства", "Для работы с сервером", "Для создания компонентов"], correct: 1, explanation: "Нативные API позволяют приложению использовать.hardware устройства: камеру, геолокацию, уведомления." },
        { id: "mo-a2", question: "Что такое AsyncStorage?", options: ["Серверное хранилище", "Локальное асинхронное хранилище данных на устройстве", "База данных в облаке", "Кэш браузера"], correct: 1, explanation: "AsyncStorage — ключевое хранилище данных на устройстве (аналог localStorage в браузере)." },
        { id: "mo-a3", question: "Push-уведомления работают через:", options: ["Email", "Сервисы Apple/Google (APNs/FCM)", "SMS", "Только Wi-Fi"], correct: 1, explanation: "Push-уведомления доставляются через APNs (Apple) и FCM (Google) — серверные сервисы." },
      ],
      practice: [
        { id: "mo-ap1", task: "Создай компонент с переключателем темы, сохраняя выбор в AsyncStorage", starterCode: 'import AsyncStorage from "@react-native-async-storage/async-storage";\n\nconst toggleTheme = async () => {\n  const current = await AsyncStorage.getItem("theme");\n  const next = current === "dark" ? "light" : "dark";\n  await AsyncStorage.setItem("theme", next);\n};', checkFor: ["AsyncStorage", "getItem", "setItem"], hint: "Используй getItem и.setItem для чтения и записи" },
      ],
    },
    "phase-2": {
      phaseName: "Публикация",
      theory: [
        { id: "mo-p1", question: "Что нужно для публикации в App Store?", options: ["Только код", "Apple Developer аккаунт, сертификаты, скриншоты, описание", "Только ссылка на GitHub", "Ничего — автоматически"], correct: 1, explanation: "Для публикации нужен аккаунт разработчика ($99/год), сертификаты подписи, метаданные и скриншоты." },
        { id: "mo-p2", question: "Bundle size — это:", options: ["Размер базы данных", "Размер打包 приложения, влияющий на скорость загрузки", "Количество компонентов", "Число пользователей"], correct: 1, explanation: "Bundle size — размер бандла приложения. Меньше = быстрее загрузка и меньше расход трафика." },
        { id: "mo-p3", question: "EAS Build — это:", options: ["Тип приложения", "Сервис Expo для облачной сборки iOS/Android приложений", "База данных", "Фреймворк"], correct: 1, explanation: "EAS Build собирает приложения в облаке, не требуя локальной настройки Xcode/Android Studio." },
      ],
      practice: [
        { id: "mo-sp1", task: "Настрой app.json для Expo-приложения", starterCode: '{\n  "expo": {\n    "name": "MyApp",\n    "slug": "my-app",\n    "version": "1.0.0",\n    "orientation": "portrait"\n  }\n}', checkFor: ["expo", "name", "slug", "version"], hint: "Заполни основные поля конфигурации" },
      ],
    },
  },

  devops: {
    "phase-0": {
      phaseName: "Основы",
      theory: [
        { id: "do-f1", question: "Зачем DevOps-инженеру Linux?", options: ["Для красоты", "Большинство серверов работают на Linux", "Для игр", "Для веб-дизайна"], correct: 1, explanation: "Linux — основная ОС серверов. DevOps-инженер должен знать команды, процессы, права доступа." },
        { id: "do-f2", question: "Что такое Git?", options: ["База данных", "Система контроля версий для отслеживания изменений кода", "Язык программирования", "Операционная система"], correct: 1, explanation: "Git отслеживает изменения в коде, позволяет работать в команде и откатывать ошибки." },
        { id: "do-f3", question: "Что такое CI/CD?", options: ["Тип сервера", "Автоматизация сборки, тестирования и деплоя кода", "Протокол шифрования", "Тип базы данных"], correct: 1, explanation: "CI/CD автоматизирует процесс от коммита до деплоя, обеспечивая скорость и надёжность." },
        { id: "do-f4", question: "GitHub Actions — это:", options: ["Тип коммита", "Система автоматизации workflows прямо в репозитории", "Вид бранча", "Тип конфликта"], correct: 1, explanation: "GitHub Actions позволяет создавать автоматические пайплайны (тесты, сборка, деплой) при каждом коммите." },
      ],
      practice: [
        { id: "do-fp1", task: "Напиши bash-скрипт для мониторинга свободного места на диске", starterCode: '#!/bin/bash\ndf -h | grep "/dev/sda1"\nfree_disk=$(df -h / | awk \'NR==2{print $4}\')\necho "Свободно: $free_disk"', checkFor: ["df", "bash", "echo"], hint: "Используй df для проверки дискового пространства" },
      ],
    },
    "phase-1": {
      phaseName: "Инфраструктура",
      theory: [
        { id: "do-a1", question: "Что такое Kubernetes (K8s)?", options: ["Тип контейнера", "Оркестратор контейнеров для управления масштабируемыми приложениями", "База данных", "Язык программирования"], correct: 1, explanation: "Kubernetes автоматизирует деплой, масштабирование и управление контейнеризированными приложениями." },
        { id: "do-a2", question: "Зачем нужен Terraform?", options: ["Для написания кода", "Для Infrastructure as Code — управления инфраструктурой через код", "Для тестирования", "Для мониторинга"], correct: 1, explanation: "Terraform позволяет описывать и создавать инфраструктуру (серверы, сети) декларативным кодом." },
        { id: "do-a3", question: "Pod в Kubernetes — это:", options: ["Контейнер Docker", "Мельчайшая единица разворачивания, содержащая один или несколько контейнеров", "Файл конфигурации", "Сеть"], correct: 1, explanation: "Pod — логическая группа контейнеров,共享 сетевое пространство и ресурсы." },
      ],
      practice: [
        { id: "do-ap1", task: "Напиши простой Kubernetes манифест для деплоя", starterCode: 'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: my-app\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: my-app\n  template:\n    metadata:\n      labels:\n        app: my-app\n    spec:\n      containers:\n      - name: my-app\n        image: nginx:latest', checkFor: ["apiVersion", "Deployment", "replicas", "containers"], hint: "Опиши Deployment с количеством реплик и контейнером" },
      ],
    },
    "phase-2": {
      phaseName: "Production",
      theory: [
        { id: "do-p1", question: "Prometheus и Grafana — это:", options: ["Базы данных", "Системы мониторинга и визуализации метрик", "Языки программирования", "Фреймворки"], correct: 1, explanation: "Prometheus собирает метрики, Grafana визуализирует их на дашбордах с алертами." },
        { id: "do-p2", question: "ECS и EKS в AWS — это:", options: ["Типы хранилищ", "Сервисы контейнеризации (Elastic Container Service / Kubernetes Service)", "Сетевые протоколы", "Базы данных"], correct: 1, explanation: "ECS и EKS — AWS-сервисы для запуска контейнеров (аналог Docker Compose и Kubernetes)." },
        { id: "do-p3", question: "CloudFormation — это:", options: ["Тип облака", "IaC-сервис AWS для управления инфраструктурой", "Протокол", "Фреймворк"], correct: 1, explanation: "CloudFormation позволяет описывать инфраструктуру AWS в YAML/JSON шаблонах." },
      ],
      practice: [
        { id: "do-sp1", task: "Напиши простой Prometheus alert rule для высокого использования CPU", starterCode: 'groups:\n  - name: cpu-alert\n    rules:\n      - alert: HighCpuUsage\n        expr: 100 - (avg by(instance)(irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80\n        for: 5m\n        labels:\n          severity: warning\n        annotations:\n          summary: "High CPU usage on {{ $labels.instance }}"', checkFor: ["alert", "expr", "for", "labels"], hint: "Опиши алерт с условием,持續时间和 метками" },
      ],
    },
  },

  gamedev: {
    "phase-0": {
      phaseName: "Основы",
      theory: [
        { id: "gd-f1", question: "Unity — это:", options: ["Язык программирования", "Игровой движок для создания 2D/3D игр", "База данных", "Фреймворк для веба"], correct: 1, explanation: "Unity — один из самых популярных игровых движков, поддерживающий 2D и 3D разработку." },
        { id: "gd-f2", question: "C# используется в Unity для:", options: ["Создания моделей", "Написания скриптов логики игры", "Проектирования уровней", "Записи звуков"], correct: 1, explanation: "C# — основной язык скриптов в Unity для реализации игровой логики, физики и AI." },
        { id: "gd-f3", question: "GameObject в Unity — это:", options: ["Файл игры", "Любой объект на сцене (персонаж, свет, камерa)", "Тип анимации", "Настройка физики"], correct: 1, explanation: "GameObject — базовая единица Unity. Любой объект на сцене — это GameObject с компонентами." },
        { id: "gd-f4", question: "Component в Unity — это:", options: ["Часть модели", "Модуль, добавляющий функциональность к GameObject", "Файл текстуры", "Тип освещения"], correct: 1, explanation: "Component — модуль поведения (Transform, Renderer, Collider, скрипт), добавляемый к GameObject." },
      ],
      practice: [
        { id: "gd-fp1", task: "Напиши C#-скрипт для движения персонажа вперёд", starterCode: 'using UnityEngine;\n\npublic class MoveForward : MonoBehaviour\n{\n    public float speed = 5f;\n\n    void Update()\n    {\n        transform.Translate(Vector3.forward * speed * Time.deltaTime);\n    }\n}', checkFor: ["MonoBehaviour", "Update", "Translate", "Time.deltaTime"], hint: "Используй transform.Translate для перемещения" },
      ],
    },
    "phase-1": {
      phaseName: "Геймдизайн",
      theory: [
        { id: "gd-a1", question: "Спрайт (Sprite) — это:", options: ["3D-модель", "2D-изображение для отображения объектов в игре", "Звуковой эффект", "Тип анимации"], correct: 1, explanation: "Спрайт — это 2D-изображение, используемое для персонажей, объектов и фонов в 2D-играх." },
        { id: "gd-a2", question: "Tilemap — это:", options: ["Тип текстуры", "Система для создания уровней из повторяющихся блоков", "Физический движок", "Тип освещения"], correct: 1, explanation: "Tilemap позволяет быстро создавать уровни, размещая блоки-тайлы на сетке." },
        { id: "gd-a3", question: "Collider в Unity нужен для:", options: ["Отрисовки объектов", "Определения столкновений между объектами", "Анимации", "Освещения"], correct: 1, explanation: "Collider определяет физическую форму объекта для обнаружения столкновений и физических взаимодействий." },
      ],
      practice: [
        { id: "gd-ap1", task: "Напиши скрипт уничтожения объекта при столкновении", starterCode: 'using UnityEngine;\n\npublic class DestroyOnHit : MonoBehaviour\n{\n    void OnCollisionEnter(Collision collision)\n    {\n        Destroy(collision.gameObject);\n    }\n}', checkFor: ["OnCollisionEnter", "Destroy"], hint: "Используй OnCollisionEnter для обработки столкновений" },
      ],
    },
    "phase-2": {
      phaseName: "Специализация",
      theory: [
        { id: "gd-p1", question: "Шейдер (Shader) — это:", options: ["Тип модели", "Программа для управления отрисовкой каждого пикселя на экране", "Файловый формат", "Тип анимации"], correct: 1, explanation: "Шейдер — программа, выполняемая на GPU, определяющая как объект выглядит на экране." },
        { id: "gd-p2", question: "GLSL/HLSL — это:", options: ["Языки шейдеров для GPU", "Языки для серверов", "Форматы 3D-моделей", "Языки баз данных"], correct: 0, explanation: "GLSL (OpenGL) и HLSL (DirectX) — языки программирования шейдеров для видеокарт." },
        { id: "gd-p3", question: "Мультиплеер в играх требует:", options: ["Только интернет", "Клиент-серверную архитектуру, синхронизацию состояния и компенсацию лагов", "Только Bluetooth", "Два монитора"], correct: 1, explanation: "Мультиплеер требует сети, синхронизации состояний между клиентами и сервером, обработки задержек." },
      ],
      practice: [
        { id: "gd-sp1", task: "Напиши простой шейдер для изменения цвета объекта", starterCode: 'Shader "Custom/ColorShift"\n{\n    Properties\n    {\n        _Color ("Color", Color) = (1,0,0,1)\n    }\n    SubShader\n    {\n        Pass\n        {\n            CGPROGRAM\n            fixed4 _Color;\n            fixed4 frag() : SV_Target\n            {\n                return _Color;\n            }\n            ENDCG\n        }\n    }\n}', checkFor: ["Shader", "Properties", "SubShader", "CGPROGRAM"], hint: "Опиши шейдер с свойством цвета и фрагментной функцией" },
      ],
    },
  },
};

export const finalExamData: Record<string, FinalExamData> = {
  frontend: {
    title: "Frontend Developer",
    theory: [
      { id: "fin-fe1", question: "Какой HTML-тег является семантическим?", options: ["<div>", "<span>", "<article>", "<b>"], correct: 2, explanation: "<article> — семантический тег, описывающий независимый блок контента." },
      { id: "fin-fe2", question: "CSS Flexbox primary axis по умолчанию:", options: ["Вертикальный", "Горизонтальный", "Диагональный", "Зависит от браузера"], correct: 1, explanation: "По умолчанию flex-direction: row — главная ось горизонтальная." },
      { id: "fin-fe3", question: "React key нужен для:", options: ["Стилизации", "Идентификации элементов списка при перерисовке", "Передачи данных", "Работы с формами"], correct: 1, explanation: "key помогает React эффективно обновлять DOM при изменении списка." },
      { id: "fin-fe4", question: "useEffect в React используется для:", options: ["Создания компонентов", "Побочных эффектов (запросы, подписки, таймеры)", "Создания JSX", "Работы с CSS"], correct: 1, explanation: "useEffect запускает код после рендера — для API-запросов, подписок, таймеров." },
      { id: "fin-fe5", question: "TypeScript interface отличается от type тем, что:", options: ["Работает быстрее", "Может быть расширен (extends) и открыт для дополнения", "Поддерживает только примитивы", "Ничем не отличается"], correct: 1, explanation: "Interface поддерживает наследование и declaration merging, что делает его гибче для объектов." },
    ],
    practice: [
      { id: "fin-fep1", task: "Создай компонент TodoList с добавлением и удалением задач", starterCode: 'function TodoList() {\n  const [todos, setTodos] = useState([]);\n  const [input, setInput] = useState("");\n\n  const add = () => {\n    if (input.trim()) {\n      setTodos([...todos, input]);\n      setInput("");\n    }\n  };\n\n  return (\n    <div>\n      <input value={input} onChange={e => setInput(e.target.value)} />\n      <button onClick={add}>Добавить</button>\n      {todos.map((t, i) => (\n        <div key={i}>{t} <button onClick={() => setTodos(todos.filter((_, j) => j !== i))}>✕</button></div>\n      ))}\n    </div>\n  );\n}', checkFor: ["useState", "map", "filter", "onClick"], hint: "Используй useState для хранения задач, map для рендера, filter для удаления" },
    ],
  },

  ai: {
    title: "AI / ML Engineer",
    theory: [
      { id: "fin-ai1", question: "Что такое градиентный спуск?", options: ["Тип данных", "Алгоритм оптимизации, минимизирующий функцию потерь", "Метод визуализации", "Тип нейросети"], correct: 1, explanation: "Градиентный спуск итеративно корректирует веса модели, двигаясь в направлении убывания функции потерь." },
      { id: "fin-ai2", question: "Loss function измеряет:", options: ["Скорость обучения", "Разницу между предсказанием и реальным значением", "Количество параметров", "Время обучения"], correct: 1, explanation: "Loss (функция потерь)量化量化量化 error модели — чем меньше, тем лучше." },
      { id: "fin-ai3", question: "CNN (Convolutional Neural Network) используется для:", options: ["Обработки текста", "Анализа изображений", "Работы со звуком", "Всё вышеперечисленное"], correct: 3, explanation: "CNN широко используются для изображений, но также применяются для аудио и других данных." },
      { id: "fin-ai4", question: "Overfitting можно предотвратить через:", options: ["Увеличение epochs", "Regularization, Dropout, больше данных", "Уменьшение данных", "Увеличение learning rate"], correct: 1, explanation: "Регуляризация, Dropout и аугментация данных помогают модели обобщать, а не запоминать." },
      { id: "fin-ai5", question: "Transformers используют механизм:", options: ["Циклов", "Attention (внимания)", "Рекуррентности", "Генетический алгоритм"], correct: 1, explanation: "Self-attention позволяет модели взвешивать важность каждого элемента последовательности." },
    ],
    practice: [
      { id: "fin-aip1", task: "Реализуй простую линейную регрессию с градиентным спуском", starterCode: 'import numpy as np\n\nX = np.array([1, 2, 3, 4, 5])\ny = np.array(2, 4, 5, 4, 5])\n\nw, b = 0, 0\nlr = 0.01\nfor epoch in range(100):\n    pred = w * X + b\n    loss = np.mean((pred - y) ** 2)\n    dw = np.mean(2 * (pred - y) * X)\n    db = np.mean(2 * (pred - y))\n    w -= lr * dw\n    b -= lr * db\nprint(f"w={w:.2f}, b={b:.2f}")', checkFor: ["np.mean", "dw", "db", "lr"], hint: "Рассчитай градиенты для w и b, обнови веса" },
    ],
  },

  cybersec: {
    title: "Cybersecurity Specialist",
    theory: [
      { id: "fin-cs1", question: "MITM-атака (Man-in-the-Middle) — это:", options: ["Атака на DNS", "Перехват связи между двумя сторонами", "Взлом пароля", "DDoS атака"], correct: 1, explanation: "MITM — атака, при которой злоумышленник встаёт между жертвой и сервером, перехватывая данные." },
      { id: "fin-cs2", question: "HTTPS шифрует данные через:", options: ["Symmetric key", "TLS/SSL протокол", "SSH", "FTP"], correct: 1, explanation: "HTTPS использует TLS (ранее SSL) для шифрования трафика между клиентом и сервером." },
      { id: "fin-cs3", question: "Port 443 используется для:", options: ["HTTP", "HTTPS", "SSH", "FTP"], correct: 1, explanation: "Порт 443 — стандартный порт для HTTPS-трафика." },
      { id: "fin-cs4", question: "Brute force атака — это:", options: ["Физический взлом", "Перебор всех возможных комбинаций пароля", "Социальная инженерия", "Вирус"], correct: 1, explanation: "Brute force — автоматический перебор паролей до нахождения верного." },
      { id: "fin-cs5", question: "Нулевой день (zero-day) — это:", options: ["Пустой сервер", "Уязвимость, о которой ещё не знает.vendor", "Первый день атаки", "Отсутствие обновлений"], correct: 1, explanation: "Zero-day — уязвимость, которая неизвестна vendor'у и не имеет патча." },
    ],
    practice: [
      { id: "fin-csp1", task: "Напиши скрипт для сканирования открытых портов", starterCode: 'import socket\n\ndef scan(host, port):\n    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n    sock.settimeout(1)\n    result = sock.connect_ex((host, port))\n    sock.close()\n    return result == 0\n\nfor port in [22, 80, 443, 8080]:\n    status = "OPEN" if scan("127.0.0.1", port) else "CLOSED"\n    print(f"Port {port}: {status}")', checkFor: ["socket", "connect_ex", "AF_INET", "SOCK_STREAM"], hint: "Используй socket для подключения к портам и проверки статуса" },
    ],
  },

  datascience: {
    title: "Data Scientist",
    theory: [
      { id: "fin-ds1", question: "EDA (Exploratory Data Analysis) делается для:", options: ["Деплоя моделей", "Понимания структуры данных, выбросов и зависимостей", "Написания кода", "Создания API"], correct: 1, explanation: "EDA — первый шаг анализа данных: визуализация, статистика, поиск паттернов." },
      { id: "fin-ds2", question: "Корреляция ≠ causalidad означает:", options: ["Корреляция всегда = причинность", "Наличие связи не доказывает причинно-следственную связь", "Корреляция не нужна", "Причинность не существует"], correct: 1, explanation: "Два признака могут быть связаны, но не обязательно один вызывает другой." },
      { id: "fin-ds3", question: " train/test split нужен для:", options: ["Увеличения данных", "Оценки качества модели на незнакомых данных", "Обучения модели", "Визуализации"], correct: 1, explanation: "Разделение данных позволяет проверить, как модель работает на новых, невиданных данных." },
      { id: "fin-ds4", question: "Cross-validation — это:", options: ["Проверка кода", "Метод оценки модели на нескольких подвыборках данных", "Тип графика", "База данных"], correct: 1, explanation: "CV разбивает данные на K частей и тренирует модель K раз, давая более надёжную оценку." },
      { id: "fin-ds5", question: "Confusion Matrix показывает:", options: ["Путаницу в данных", "TP, TN, FP, FN — ошибки классификации", "Корреляцию", "Распределение"], correct: 1, explanation: "Матрица ошибок: True Positive, True Negative, False Positive, False Negative." },
    ],
    practice: [
      { id: "fin-dsp1", task: "Рассчитай accuracy, precision и recall вручную", starterCode: 'TP, TN, FP, FN = 85, 90, 10, 15\n\naccuracy = (TP + TN) / (TP + TN + FP + FN)\nprecision = TP / (TP + FP)\nrecall = TP / (TP + FN)\n\nprint(f"Accuracy: {accuracy:.2%}")\nprint(f"Precision: {precision:.2%}")\nprint(f"Recall: {recall:.2%}")', checkFor: ["accuracy", "precision", "recall"], hint: "Accuracy = (TP+TN)/total, Precision = TP/(TP+FP), Recall = TP/(TP+FN)" },
    ],
  },

  backend: {
    title: "Backend Developer",
    theory: [
      { id: "fin-be1", question: "REST API принципы включают:", options: ["Stateless коммуникация", "CRUD операции над ресурсами", "Идентификация через URI", "Всё вышеперечисленное"], correct: 3, explanation: "REST включает stateless, CRUD, URI-идентификацию и другие принципы." },
      { id: "fin-be2", question: "Middleware в Express — это:", options: ["Файл стилей", "Функции, обрабатывающие запрос до основного обработчика", "Тип маршрута", "База данных"], correct: 1, explanation: "Middleware — функции с параметрами (req, res, next), обрабатывающие запросы в цепочке." },
      { id: "fin-be3", question: "JWT-токен состоит из:", options: ["1 части", "3 частей (header, payload, signature)", "2 частей", "4 частей"], correct: 1, explanation: "JWT: Header (алгоритм), Payload (данные), Signature (подпись) — разделены точками." },
      { id: "fin-be4", question: "SQL JOIN используется для:", options: ["Сортировки данных", "Объединения данных из двух таблиц", "Удаления данных", "Создания таблиц"], correct: 1, explanation: "JOIN объединяет строки из двух таблиц на основе общего ключа." },
      { id: "fin-be5", question: "Docker image vs container:", options: ["Одно и то же", "Image — шаблон, container — запущенный экземпляр image", "Container — шаблон", "Image работает быстрее"], correct: 1, explanation: "Image — неизменный шаблон с кодом и зависимостями. Container — запущенная копия image." },
    ],
    practice: [
      { id: "fin-bep1", task: "Создай REST API маршруты для CRUD операций с пользователями", starterCode: 'const express = require("express");\nconst router = express.Router();\n\nlet users = [];\n\nrouter.get("/", (req, res) => res.json(users));\nrouter.post("/", (req, res) => {\n  users.push(req.body);\n  res.status(201).json(req.body);\n});\nrouter.put("/:id", (req, res) => {\n  users[req.params.id] = req.body;\n  res.json(req.body);\n});\nrouter.delete("/:id", (req, res) => {\n  users.splice(req.params.id, 1);\n  res.json({ deleted: true });\n});\n\nmodule.exports = router;', checkFor: ["router.get", "router.post", "router.put", "router.delete", "status"], hint: "Создай 4 маршрута: GET, POST, PUT, DELETE" },
    ],
  },

  mobile: {
    title: "Mobile Developer",
    theory: [
      { id: "fin-mo1", question: "React Native рендерит:", options: ["HTML-теги", "Нативные виджеты платформы", "Canvas", "SVG"], correct: 1, explanation: "React Native маппит компоненты на нативные виджеты (UIView на iOS, android.view на Android)." },
      { id: "fin-mo2", question: "Expo Managed Workflow означает:", options: ["Полный контроль над нативным кодом", "Expo управляет нативной частью, разработчик пишет только JS/React", "Нет доступа к нативным модулям", "Только для iOS"], correct: 1, explanation: "Managed Workflow简化了 настройку, но ограничивает доступ к нативному коду." },
      { id: "fin-mo3", question: "FlatList в React Native используется для:", options: ["Отображения одного элемента", "Эффективного рендеринга длинных списков", "Создания форм", "Работы с камерой"], correct: 1, explanation: "FlatList виртуализирует список, рендеря только видимые элементы для производительности." },
      { id: "fin-mo4", question: "AsyncStorage — это:", options: ["Серверное хранилище", "Локальное асинхронное key-value хранилище на устройстве", "База данных SQLite", "Кэш API"], correct: 1, explanation: "AsyncStorage — простое асинхронное хранилище для сохранения настроек и данных на устройстве." },
    ],
    practice: [
      { id: "fin-mop1", task: "Создай экран профиля с аватаром, именем и кнопкой редактирования", starterCode: 'import React, { useState } from "react";\nimport { View, Text, Image, Button, Alert } from "react-native";\n\nexport default function Profile() {\n  const [name, setName] = useState("Иван");\n\n  return (\n    <View style={{ flex: 1, alignItems: "center", paddingTop: 50 }}>\n      <Image source={{ uri: "https://via.placeholder.com/100" }}\n        style={{ width: 100, height: 100, borderRadius: 50 }} />\n      <Text style={{ fontSize: 24, marginTop: 10 }}>{name}</Text>\n      <Button title="Редактировать" onPress={() => setName("Новое имя")} />\n    </View>\n  );\n}', checkFor: ["useState", "Image", "Text", "Button"], hint: "Используй Image для аватара, Text для имени, Button для действия" },
    ],
  },

  devops: {
    title: "DevOps Engineer",
    theory: [
      { id: "fin-do1", question: "Infrastructure as Code (IaC) означает:", options: ["Писать код на сервере", "Управлять инфраструктурой через декларативные конфигурации", "Копировать серверы", "Использовать SSH"], correct: 1, explanation: "IaC позволяет описывать и создавать инфраструктуру через код (Terraform, CloudFormation)." },
      { id: "fin-do2", question: "Kubernetes Pod — это:", options: ["Файл конфигурации", "Мельчайшая единица деплоя с контейнерами", "Тип сети", "Сервер"], correct: 1, explanation: "Pod — логическая группа контейнеров с共享 сетевым пространством и ресурсами." },
      { id: "fin-do3", question: "Prometheus собирает данные через:", options: ["SSH", "Pull-модель (scrape по HTTP)", "Push от приложений", "FTP"], correct: 1, explanation: "Prometheus периодически опрашивает (pull) эндпоинты /metrics на приложениях." },
      { id: "fin-do4", question: "Horizontal Pod Autoscaler (HPA) в Kubernetes:", options: ["Увеличивает дисковое пространство", "Автоматически масштабирует количество подов по метрикам", "Обновляет контейнеры", "Удаляет старые поды"], correct: 1, explanation: "HPA автоматически добавляет/убирает поды на основе CPU, памяти или кастомных метрик." },
    ],
    practice: [
      { id: "fin-dop1", task: "Напиши GitHub Actions workflow для сборки и деплоя", starterCode: 'name: Deploy\non:\n  push:\n    branches: [main]\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - uses: actions/setup-node@v3\n        with:\n          node-version: 18\n      - run: npm install\n      - run: npm test\n      - run: npm run build', checkFor: ["name", "on", "jobs", "steps", "run"], hint: "Опиши workflow с триггером, job и шагами" },
    ],
  },

  gamedev: {
    title: "Game Developer",
    theory: [
      { id: "fin-gd1", question: "Unity Update() вызывается:", options: ["Один раз при запуске", "Каждый кадр", "При столкновении", "При нажатии клавиши"], correct: 1, explanation: "Update() вызывается один раз каждый кадр (~60 раз в секунду) для обновления логики." },
      { id: "fin-gd2", question: "Rigidbody в Unity нужен для:", options: ["Отрисовки", "Физического поведения (гравитация, столкновения, физика)", "Анимации", "Освещения"], correct: 1, explanation: "Rigidbody добавляет физику: гравитацию, инерцию, столкновения с физическим движком." },
      { id: "fin-gd3", question: "Prefabs в Unity — это:", options: ["Текстуры", "Шаблоны GameObjects для повторного использования", "Тип освещения", "Файлы сцен"], correct: 1, explanation: "Prefab — сохранённый шаблон GameObjecta, который можно многократно инстанцировать на сцене." },
      { id: "fin-gd4", question: "Coroutines в Unity используются для:", options: ["Физики", "Выполнения длительных операций на протяжении нескольких кадров", "Работы с шейдерами", "Создания UI"], correct: 1, explanation: "Coroutine позволяет распределить операцию на несколько кадров (анимации, задержки, загрузка)." },
    ],
    practice: [
      { id: "fin-gdp1", task: "Напиши систему здоровья персонажа с уроном и лечением", starterCode: 'using UnityEngine;\n\npublic class HealthSystem : MonoBehaviour\n{\n    public float maxHealth = 100f;\n    private float currentHealth;\n\n    void Start() { currentHealth = maxHealth; }\n\n    public void TakeDamage(float amount)\n    {\n        currentHealth -= amount;\n        if (currentHealth <= 0)\n        {\n            Die();\n        }\n    }\n\n    public void Heal(float amount)\n    {\n        currentHealth = Mathf.Min(currentHealth + amount, maxHealth);\n    }\n\n    void Die()\n    {\n        Debug.Log("Player died!");\n        Destroy(gameObject);\n    }\n}', checkFor: ["maxHealth", "TakeDamage", "Heal", "Die", "Destroy"], hint: "Реализуй TakeDamage, Heal и Die методы" },
    ],
  },
};
