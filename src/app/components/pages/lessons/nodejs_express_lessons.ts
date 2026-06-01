export const nodejsState: Record<'EN' | 'RU', any> = {
  EN: {
    title: "Node.js & Express (MUST)",
    description: "Server-side JavaScript, REST APIs, and middleware. The foundation of modern backend development.",
    lessons: [
      {
        id: "node-intro",
        title: "Introduction: Node.js & The Event Loop",
        theory: {
          sections: [
            { type: "heading", content: "JavaScript escapes the browser" },
            { type: "text", content: "Historically, JavaScript only ran inside web browsers to make buttons click and menus open. Node.js changed everything. It took the ultra-fast V8 JavaScript engine out of Google Chrome and put it on the server." },
            { type: "text", content: "Now, instead of manipulating the DOM, you can use JS to read files, connect to databases, and listen to network requests." },
            { type: "heading", content: "Single-Threaded but Non-Blocking" },
            { type: "text", content: "Other languages (like Java or Python) usually create a new Thread (a separate process) for every user that connects to the server. Threads consume a lot of RAM. If 10,000 users connect, the server crashes." },
            { type: "text", content: "Node.js operates on a Single Thread using the Event Loop. When a user asks for data from the database, Node doesn't wait (block) for the database to reply. It says, 'I'll leave a callback here and go serve the next user. Ping me when the data is ready!'. This non-blocking I/O allows Node to handle tens of thousands of concurrent connections easily." },
            { type: "tip", content: "Resource: Node.js Docs. Read the official guide on 'The Node.js Event Loop, Timers, and process.nextTick()'. It's an advanced read, but understanding the Event Loop is what separates Junior Node devs from Seniors." }
          ]
        },
        practice: {
          title: "Asynchronous I/O",
          description: "See the non-blocking nature of Node in action.",
          task: "In Node.js, we prefer asynchronous functions. Below is a simulated 'setTimeout' representing a 2-second database query. Notice how 'End of script' prints BEFORE the database result, proving Node didn't block the thread!",
          starterCode: "console.log('1. Start of script');\n\n// Simulating a slow database query\nsetTimeout(() => {\n    console.log('2. Data fetched from Database!');\n}, 2000);\n\nconsole.log('3. End of script');\n\n// Output order will be: 1, 3, 2."
        },
        type: "javascript"
      },
      {
        id: "node-express-basics",
        title: "Hello Express: The Backend Standard",
        theory: {
          sections: [
            { type: "heading", content: "Why do we need Express.js?" },
            { type: "text", content: "You can build a web server using the raw, built-in 'http' module in Node.js. But doing so is incredibly verbose and painful: you have to manually parse URLs, manage headers, and handle HTTP methods with complex if/else statements." },
            { type: "text", content: "Express.js is a minimalist framework built on top of Node. It abstracts away the complex plumbing and gives you a beautiful, clean API to define your server routes." },
            { type: "code", content: "const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n    res.send('Hello World!');\n});\n\napp.listen(3000, () => console.log('Server running on port 3000'));" },
            { type: "heading", content: "Request & Response" },
            { type: "text", content: "Every route handler in Express takes two magical parameters: req (Request - data coming FROM the client) and res (Response - data you send BACK to the client)." },
            { type: "tip", content: "Resource: The Net Ninja (YouTube). His 'Node.js Crash Course' is widely considered the best beginner-friendly introduction to setting up an Express server and understanding routing." }
          ]
        },
        practice: {
          title: "Your First Express Server",
          description: "Create a simple web server.",
          task: "Initialize an Express app. Create a GET route for the '/ping' path that responds with the text 'pong'. Then start the server listening on port 8080.",
          starterCode: "const express = require('express');\n\n// 1. Initialize the app\nconst app = \n\n// 2. Create a GET route for '/ping'\napp.get('/ping', (req, res) => {\n    // Send 'pong' as the response\n    \n});\n\n// 3. Listen on port 8080\n"
        },
        type: "javascript"
      },
      {
        id: "node-rest-api",
        title: "REST API Principles & JSON",
        theory: {
          sections: [
            { type: "heading", content: "What is a REST API?" },
            { type: "text", content: "REST (Representational State Transfer) is an architectural style for building APIs. Instead of having messy URLs like '/create-user' or '/delete-user', REST relies on standard HTTP Methods applied to Nouns (Resources)." },
            { type: "list", items: [
              "GET /users — Get a list of all users.",
              "GET /users/123 — Get details of a specific user.",
              "POST /users — Create a new user.",
              "PUT /users/123 — Update an existing user.",
              "DELETE /users/123 — Delete a user."
            ]},
            { type: "heading", content: "Speaking JSON" },
            { type: "text", content: "Modern APIs don't send HTML back to the browser; they send raw data. The universal language for this data is JSON (JavaScript Object Notation). Express makes sending JSON effortless with the res.json() method." },
            { type: "heading", content: "HTTP Status Codes" },
            { type: "text", content: "A good API always responds with the correct status code. 200 (OK), 201 (Created), 400 (Bad Request), 404 (Not Found), 500 (Internal Server Error)." },
            { type: "code", content: "app.post('/users', (req, res) => {\n    // Create user logic here...\n    res.status(201).json({ message: 'User created', id: 99 });\n});" }
          ]
        },
        practice: {
          title: "Build a REST Endpoint",
          description: "Create a POST route that returns JSON.",
          task: "Create a POST route at '/api/products'. Inside the handler, return a JSON response with status code 201. The JSON should be an object: { status: 'success', product: 'Laptop' }.",
          starterCode: "const express = require('express');\nconst app = express();\n\n// Create the POST route\napp.post('/api/products', (req, res) => {\n    // Set status to 201 and send JSON\n    \n});"
        },
        type: "javascript"
      },
      {
        id: "node-middleware",
        title: "Middleware Magic",
        theory: {
          sections: [
            { type: "heading", content: "The Heart of Express" },
            { type: "text", content: "If Express is a pipeline, Middleware are the stations along that pipe. A request comes in, passes through several middleware stations, and finally reaches your route handler." },
            { type: "text", content: "Middleware functions have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle, commonly denoted by a variable named next." },
            { type: "code", content: "const logger = (req, res, next) => {\n    console.log(`Request received: ${req.method} ${req.url}`);\n    next(); // CRITICAL: Move to the next station!\n};\n\napp.use(logger); // Apply it globally" },
            { type: "heading", content: "Built-in Middleware" },
            { type: "text", content: "By default, Express doesn't know how to read JSON data sent in a POST request body (it will just be undefined). You MUST use the built-in middleware app.use(express.json()) to tell Express to parse incoming JSON payloads." },
            { type: "tip", content: "Resource: Express Guide. Read the 'Writing middleware' section in the official Express documentation. It is the absolute key to handling authentication (checking tokens before letting a user reach a route) and global error handling." }
          ]
        },
        practice: {
          title: "Write Custom Middleware",
          description: "Create an authentication checker.",
          task: "Write a middleware function called checkAuth. If req.headers.authorization exists, call next() to let the request through. If it's missing, return res.status(401).json({ error: 'Unauthorized' }).",
          starterCode: "const express = require('express');\nconst app = express();\n\n// 1. Create the middleware function\nconst checkAuth = (req, res, next) => {\n    // Check for authorization header\n    \n};\n\n// 2. Apply it specifically to the dashboard route\napp.get('/dashboard', checkAuth, (req, res) => {\n    res.json({ secretData: 'Backend revenues' });\n});"
        },
        type: "javascript"
      },
      {
        id: "node-routing-mvc",
        title: "Architecture: Express Router & MVC",
        theory: {
          sections: [
            { type: "heading", content: "Escaping the Monolith" },
            { type: "text", content: "When you first learn Express, you put all your app.get() and app.post() routes in one index.js file. For a real application with 50 endpoints (users, posts, comments, auth), this file becomes an unreadable nightmare." },
            { type: "heading", content: "Express.Router" },
            { type: "text", content: "Express provides a Router class to create modular, mountable route handlers. You can think of it as a 'mini-application'." },
            { type: "code", content: "// In routes/userRoutes.js\nconst express = require('express');\nconst router = express.Router();\n\nrouter.get('/', (req, res) => res.json({users: []}));\nmodule.exports = router;\n\n// In main index.js\nconst userRoutes = require('./routes/userRoutes');\napp.use('/api/users', userRoutes);" },
            { type: "heading", content: "The MVC Pattern (Model-View-Controller)" },
            { type: "text", content: "To keep code perfectly clean, backend devs split logic into folders:" },
            { type: "list", items: [
              "Routes: Only define the URLs and which Controller to call.",
              "Controllers: Hold the actual business logic (validation, computing).",
              "Models: Handle the direct database connection (e.g., via Mongoose/Prisma)."
            ]}
          ]
        },
        practice: {
          title: "Setup a Router",
          description: "Modularize your application.",
          task: "Create a router using express.Router(). Add a GET route to it for the root path ('/') that returns { status: 'router working' }. Then, mount this router in the main app under the path '/api/v1'.",
          starterCode: "const express = require('express');\nconst app = express();\n\n// 1. Create a Router instance\nconst apiRouter = \n\n// 2. Add a GET route to the router\napiRouter.get('/', (req, res) => {\n    res.json({ status: 'router working' });\n});\n\n// 3. Mount the router to '/api/v1' in the main app\napp.use("
        },
        type: "javascript"
      }
    ]
  },
  RU: {
    title: "Node.js & Express (MUST)",
    description: "Серверный JavaScript, архитектура REST API и Middleware. Фундамент для любого бэкенд-разработчика.",
    lessons: [
      {
        id: "node-intro",
        title: "Введение: Node.js и Event Loop",
        theory: {
          sections: [
            { type: "heading", content: "JavaScript сбегает из браузера" },
            { type: "text", content: "Исторически JS работал только внутри браузеров, чтобы открывать менюшки и анимировать кнопки. Node.js изменил всё. Создатели вытащили сверхбыстрый движок V8 из Google Chrome и установили его на сервер." },
            { type: "text", content: "Теперь с помощью JS вы можете читать файлы с жесткого диска, подключаться к базам данных и слушать сетевые запросы." },
            { type: "heading", content: "Однопоточность и Асинхронность (Event Loop)" },
            { type: "text", content: "Другие языки (Java, Python) обычно создают новый Поток (Thread) для каждого пользователя, зашедшего на сайт. Потоки жрут оперативную память. Зайдет 10 000 юзеров одновременно — сервер упадет." },
            { type: "text", content: "Node.js работает в Одном Потоке с помощью механизма Event Loop (Цикл событий). Когда пользователь запрашивает данные из базы, Node не ждет (не блокирует поток), пока база ответит. Он говорит: 'Я оставлю здесь коллбэк и пойду обслужу следующего юзера. База, пни меня, когда данные будут готовы!'. Эта неблокирующая архитектура (Non-blocking I/O) позволяет Node.js держать десятки тысяч соединений легко и без затрат памяти." },
            { type: "tip", content: "Ресурс: Node.js docs. Прочтите официальный гайд 'The Node.js Event Loop'. Это сложная тема, но именно понимание фаз Event Loop отличает Junior разработчика от Senior." }
          ]
        },
        practice: {
          title: "Асинхронный ввод/вывод",
          description: "Увидьте неблокирующую природу Node.js в действии.",
          task: "В Node.js мы обожаем асинхронность. Ниже написан код с `setTimeout`, который имитирует тяжелый запрос к БД на 2 секунды. Обратите внимание, что 'Конец скрипта' выведется ДО того, как придут данные из базы. Поток не был заблокирован!",
          starterCode: "console.log('1. Старт скрипта');\n\n// Имитация медленного запроса к БД\nsetTimeout(() => {\n    console.log('2. Данные из БД получены!');\n}, 2000);\n\nconsole.log('3. Конец скрипта');\n\n// Порядок вывода в консоль будет: 1, 3, 2."
        },
        type: "javascript"
      },
      {
        id: "node-express-basics",
        title: "Привет, Express: Стандарт Бэкенда",
        theory: {
          sections: [
            { type: "heading", content: "Зачем нам нужен Express.js?" },
            { type: "text", content: "Вы можете написать веб-сервер, используя только встроенный 'голый' модуль `http` в Node.js. Но это невероятно больно: вам придется вручную парсить URL-адреса, управлять заголовками и писать огромные if/else для обработки методов GET и POST." },
            { type: "text", content: "Express.js — это минималистичный фреймворк, написанный поверх Node. Он берет на себя всю грязную работу (сантехнику) и дает вам красивый, чистый API для создания роутов (маршрутов)." },
            { type: "code", content: "const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n    res.send('Привет, мир!');\n});\n\napp.listen(3000, () => console.log('Сервер запущен на 3000 порту'));" },
            { type: "heading", content: "Запрос и Ответ (Request & Response)" },
            { type: "text", content: "Каждый обработчик маршрута в Express принимает два магических параметра: req (Request - данные, которые пришли ОТ клиента) и res (Response - объект, через который вы отправляете данные ОБРАТНО клиенту)." },
            { type: "tip", content: "Ресурс: The Net Ninja (YouTube). Его плейлист 'Node.js Crash Course' — это, пожалуй, лучшее и самое понятное в мире видео-введение в работу серверов и Express." }
          ]
        },
        practice: {
          title: "Ваш первый Express Сервер",
          description: "Создайте простой веб-сервер.",
          task: "Инициализируйте приложение Express. Создайте GET-роут для пути '/ping', который будет отвечать текстом 'pong'. Затем запустите сервер (listen) на порту 8080.",
          starterCode: "const express = require('express');\n\n// 1. Инициализируем приложение\nconst app = \n\n// 2. Создаем GET роут для '/ping'\napp.get('/ping', (req, res) => {\n    // Отправляем строку 'pong' в качестве ответа\n    \n});\n\n// 3. Запускаем сервер на порту 8080\n"
        },
        type: "javascript"
      },
      {
        id: "node-rest-api",
        title: "Принципы REST API и формат JSON",
        theory: {
          sections: [
            { type: "heading", content: "Что такое REST API?" },
            { type: "text", content: "REST (Representational State Transfer) — это архитектурный стиль для API. Вместо того чтобы делать хаотичные URL вроде `/create-user` или `/delete-user`, REST опирается на стандартные HTTP Методы, которые применяются к Существительным (Ресурсам)." },
            { type: "list", items: [
              "GET /users — Получить список всех пользователей.",
              "GET /users/123 — Получить инфу о конкретном юзере.",
              "POST /users — Создать нового пользователя.",
              "PUT /users/123 — Обновить данные пользователя.",
              "DELETE /users/123 — Удалить пользователя."
            ]},
            { type: "heading", content: "Общение через JSON" },
            { type: "text", content: "Современные API не отправляют браузеру HTML-код страниц. Они отправляют сырые данные. Универсальным языком общения бэкенда и фронтенда стал JSON (JavaScript Object Notation). В Express отправка JSON делается элементарно через метод `res.json()`." },
            { type: "heading", content: "HTTP Статус-коды" },
            { type: "text", content: "Хороший API всегда отвечает правильным статус-кодом. 200 (OK), 201 (Created - создано), 400 (Bad Request - ошибка клиента), 404 (Not Found), 500 (Internal Server Error - упал сервер)." },
            { type: "code", content: "app.post('/users', (req, res) => {\n    // Логика сохранения в базу...\n    res.status(201).json({ message: 'User created', id: 99 });\n});" }
          ]
        },
        practice: {
          title: "Собери REST Эндпоинт",
          description: "Создайте POST роут, возвращающий JSON.",
          task: "Создайте POST роут по пути '/api/products'. Внутри обработчика верните JSON ответ со статус-кодом 201. JSON должен быть объектом: { status: 'success', product: 'Laptop' }.",
          starterCode: "const express = require('express');\nconst app = express();\n\n// Создаем POST роут\napp.post('/api/products', (req, res) => {\n    // Установите статус 201 и отправьте JSON\n    \n});"
        },
        type: "javascript"
      },
      {
        id: "node-middleware",
        title: "Магия Middleware (Мидлвары)",
        theory: {
          sections: [
            { type: "heading", content: "Сердце Express.js" },
            { type: "text", content: "Если Express — это трубопровод, то Middleware (Промежуточные обработчики) — это станции на этой трубе. Клиент делает запрос, он проходит через несколько мидлваров, и только потом попадает в ваш финальный роут." },
            { type: "text", content: "Мидлвары имеют доступ к объекту запроса (req), объекту ответа (res) и функции `next`. Функция `next()` передает эстафету следующей станции." },
            { type: "code", content: "const logger = (req, res, next) => {\n    console.log(`Получен запрос: ${req.method} ${req.url}`);\n    next(); // КРИТИЧЕСКИ ВАЖНО: Передаем эстафету дальше!\n};\n\napp.use(logger); // Применяем мидлвар ко ВСЕМ запросам" },
            { type: "heading", content: "Встроенные мидлвары" },
            { type: "text", content: "По умолчанию Express НЕ УМЕЕТ читать JSON, который клиент прислал в теле POST-запроса (req.body будет undefined). Вы ОБЯЗАНЫ подключить встроенный мидлвар `app.use(express.json())`, который научит сервер парсить входящий JSON." },
            { type: "tip", content: "Ресурс: Express Guide. Раздел 'Writing middleware' в официальной документации — это база. Именно через мидлвары реализуется проверка авторизации (проверка JWT токенов до того, как пустить юзера в админку) и глобальный перехват ошибок." }
          ]
        },
        practice: {
          title: "Напиши свой Мидлвар",
          description: "Создайте проверку авторизации.",
          task: "Напишите мидлвар `checkAuth`. Если в заголовках есть токен (req.headers.authorization), вызовите next(), чтобы пропустить запрос. Если токена нет, не пускайте запрос дальше и верните ошибку: res.status(401).json({ error: 'Unauthorized' }).",
          starterCode: "const express = require('express');\nconst app = express();\n\n// 1. Создаем функцию-мидлвар\nconst checkAuth = (req, res, next) => {\n    // Проверяем наличие заголовка authorization\n    \n};\n\n// 2. Применяем его только к секретному роуту\napp.get('/dashboard', checkAuth, (req, res) => {\n    res.json({ secretData: 'Доходы компании за год' });\n});"
        },
        type: "javascript"
      },
      {
        id: "node-routing-mvc",
        title: "Архитектура: Express Router и паттерн MVC",
        theory: {
          sections: [
            { type: "heading", content: "Побег из Монолита" },
            { type: "text", content: "Когда вы только учите Express, вы сваливаете все ваши 100 роутов `app.get()` в один файл `index.js`. Для реального приложения это превращается в нечитаемый кошмар. Код нужно дробить на части." },
            { type: "heading", content: "Express.Router" },
            { type: "text", content: "Express предоставляет класс `Router` для создания модульных обработчиков. Думайте о нём как о 'мини-приложении', которое мы собираем в отдельном файле, а потом экспортируем." },
            { type: "code", content: "// Файл routes/userRoutes.js\nconst express = require('express');\nconst router = express.Router();\n\nrouter.get('/', (req, res) => res.json({users: []}));\nmodule.exports = router;\n\n// Главный файл index.js\nconst userRoutes = require('./routes/userRoutes');\napp.use('/api/users', userRoutes);" },
            { type: "heading", content: "Паттерн MVC (Model-View-Controller)" },
            { type: "text", content: "Чтобы бэкенд был идеально чистым, разработчики разбивают логику по папкам:" },
            { type: "list", items: [
              "Routes (Роуты): Файлы, где написаны только URL-адреса и указано, какой Контроллер вызвать.",
              "Controllers (Контроллеры): Функции с реальной бизнес-логикой (проверка пароля, расчет корзины).",
              "Models (Модели): Код для общения с Базой Данных (обычно через ORM типа Mongoose или Prisma)."
            ]}
          ]
        },
        practice: {
          title: "Настройка Роутера",
          description: "Модуляризация приложения.",
          task: "Создайте экземпляр роутера с помощью `express.Router()`. Добавьте в него GET-роут для корневого пути ('/'), который возвращает JSON `{ status: 'router working' }`. Затем подключите (смонтируйте) этот роутер в главное приложение по пути '/api/v1' с помощью `app.use`.",
          starterCode: "const express = require('express');\nconst app = express();\n\n// 1. Создаем экземпляр Router\nconst apiRouter = \n\n// 2. Добавляем GET роут в роутер\napiRouter.get('/', (req, res) => {\n    res.json({ status: 'router working' });\n});\n\n// 3. Монтируем роутер в приложение по пути '/api/v1'\napp.use("
        },
        type: "javascript"
      }
    ]
  }
};