export const apiDesignState: Record<'EN' | 'RU', any> = {
  EN: {
    title: "REST & GraphQL (CORE)",
    description: "API design, versioning, and GraphQL. Learn how to build scalable communication layers between frontend and backend.",
    lessons: [
      {
        id: "api-rest-design",
        title: "REST API Design Principles",
        theory: {
          sections: [
            { type: "heading", content: "Nouns, not Verbs" },
            { type: "text", content: "REST (Representational State Transfer) is not a strict standard, but an architectural style. The most common mistake juniors make is putting 'verbs' in their URLs." },
            { type: "list", items: [
              "Bad: POST /createUser, GET /getUserById?id=5, POST /updateUser",
              "Good: POST /users, GET /users/5, PUT /users/5"
            ]},
            { type: "text", content: "In REST, the URL should only represent the Resource (the Noun). The Action (the Verb) is defined exclusively by the HTTP Method (GET, POST, PUT, PATCH, DELETE)." },
            { type: "heading", content: "Nested Resources" },
            { type: "text", content: "If you want to get all comments for a specific post, the URL should reflect the hierarchy:" },
            { type: "code", content: "GET /posts/12/comments" },
            { type: "tip", content: "Resource: REST API Design Rulebook. Microsoft and Google have excellent public API design guidelines. Always return plural nouns (e.g., /users, not /user) for consistency." }
          ]
        },
        practice: {
          title: "Design RESTful Routes",
          description: "Fix poorly designed API endpoints.",
          task: "Look at the starter code. A junior developer created a messy API using verbs in URLs. Rewrite the routes to follow proper REST conventions using standard HTTP methods.",
          starterCode: "// ❌ BAD API DESIGN:\n// app.get('/getAllArticles', ...)\n// app.post('/createArticle', ...)\n// app.post('/deleteArticle/:id', ...)\n\nconst express = require('express');\nconst app = express();\n\n// ✅ YOUR TURN (Fix the routes):\n\n// 1. Get all articles\napp.get('', (req, res) => {});\n\n// 2. Create an article\napp.('', (req, res) => {});\n\n// 3. Delete an article by ID\napp.('', (req, res) => {});"
        },
        type: "javascript"
      },
      {
        id: "api-versioning",
        title: "API Versioning and Pagination",
        theory: {
          sections: [
            { type: "heading", content: "Never Break the Client" },
            { type: "text", content: "Imagine you have an iOS app deployed to the App Store using your API. One day, you decide to change the 'username' field to 'email' in your database. You deploy the new backend. Suddenly, the iOS app crashes for millions of users because they haven't downloaded the update yet!" },
            { type: "text", content: "To prevent this, you MUST version your APIs. The most common approach is URI Versioning:" },
            { type: "code", content: "GET /api/v1/users  // Old iOS app uses this\nGET /api/v2/users  // New web app uses this" },
            { type: "heading", content: "Pagination" },
            { type: "text", content: "If your database has 1 million users, a simple GET /users will crash your server (Out of Memory). You must implement pagination using Query Parameters." },
            { type: "code", content: "GET /api/v1/users?limit=20&offset=40" },
            { type: "text", content: "This tells the database: 'Skip the first 40 users, and give me the next 20'. This is standard for 'Load More' buttons on the frontend." }
          ]
        },
        practice: {
          title: "Implement Pagination",
          description: "Extract query parameters from a request.",
          task: "In Express, query parameters (after the '?') are found in req.query. Extract the 'limit' and 'page' variables. If they are missing, provide default values (limit=10, page=1).",
          starterCode: "const express = require('express');\nconst app = express();\n\napp.get('/api/v1/posts', (req, res) => {\n    // Extract limit and page from req.query (with defaults)\n    const limit = \n    const page = \n    \n    // Calculate offset: (page - 1) * limit\n    const offset = (page - 1) * limit;\n    \n    res.json({ message: `Fetching ${limit} posts starting from index ${offset}` });\n});"
        },
        type: "javascript"
      },
      {
        id: "api-graphql-intro",
        title: "The GraphQL Revolution",
        theory: {
          sections: [
            { type: "heading", content: "The Problems with REST" },
            { type: "text", content: "In 2012, Facebook realized REST was failing their mobile app due to two massive issues:" },
            { type: "list", items: [
              "Over-fetching: You hit GET /users/1. You only need the user's name, but REST returns a massive JSON with 50 fields (address, preferences, tokens), wasting mobile data.",
              "Under-fetching (N+1 problem): You hit GET /users/1. Now you need their posts. You have to make another request GET /users/1/posts. Then another request for comments. Mobile screens loaded too slowly."
            ]},
            { type: "heading", content: "Enter GraphQL" },
            { type: "text", content: "GraphQL solves this by using a SINGLE endpoint (usually POST /graphql). Instead of multiple URLs, the frontend sends a specific Query detailing EXACTLY what shape of data it wants. The backend responds with that exact shape." },
            { type: "tip", content: "Resource: GraphQL.org. The official documentation is the best place to understand the philosophy of queries, mutations, and types." }
          ]
        },
        practice: {
          title: "Write a GraphQL Query",
          description: "Ask for exactly what you need.",
          task: "This is a conceptual task. Look at the GraphQL query syntax. We are querying a 'user' by id: 1. Inside the curly braces, we specify the fields we want. Add the 'email' field, and also request the 'title' of their 'posts'.",
          starterCode: "/* \nGraphQL Query Syntax (Frontend)\nWe send this string to POST /graphql\n*/\n\nquery {\n  user(id: 1) {\n    name\n    age\n    // 1. Add email field\n    \n    // 2. Request posts, and inside posts request 'title'\n    posts {\n      \n    }\n  }\n}"
        },
        type: "javascript"
      },
      {
        id: "api-graphql-apollo",
        title: "Building GraphQL APIs (Apollo Server)",
        theory: {
          sections: [
            { type: "heading", content: "Schema and Resolvers" },
            { type: "text", content: "Unlike REST, a GraphQL backend requires a strict Schema (Type Definitions). You must declare every object, its fields, and its types (String, Int, Boolean)." },
            { type: "text", content: "After defining the schema, you write Resolvers. Resolvers are just normal JavaScript functions that tell the server HOW to fetch the data for a specific field (e.g., fetch it from a Postgres DB or another REST API)." },
            { type: "code", content: "const typeDefs = `#graphql\n  type User {\n    id: ID!\n    name: String!\n  }\n  type Query {\n    getUser(id: ID!): User\n  }\n`;\n\nconst resolvers = {\n  Query: {\n    getUser: (parent, args) => db.users.findById(args.id)\n  }\n};" },
            { type: "heading", content: "Apollo Server" },
            { type: "text", content: "While GraphQL is just a specification, Apollo is the most popular library implementation of it. Apollo Server takes your typeDefs and resolvers and automatically spins up a robust GraphQL API." },
            { type: "tip", content: "Resource: Apollo Tutorial (Odyssey). The 'Apollo Odyssey' platform offers an incredible, interactive, gamified course on building GraphQL APIs from scratch." }
          ]
        },
        practice: {
          title: "Define a GraphQL Schema",
          description: "Write Type Definitions for Apollo.",
          task: "Complete the typeDefs string. Create a type 'Book' with fields: id (ID!), title (String), and author (String). Then, in the Query type, add a query 'books' that returns an array of Book objects ([Book]).",
          starterCode: "const { ApolloServer } = require('@apollo/server');\n\nconst typeDefs = `#graphql\n  # 1. Define type Book\n  type Book {\n    \n  }\n\n  type Query {\n    # 2. Add query 'books' that returns an array of Books\n    \n  }\n`;\n\nconsole.log(\"Schema defined successfully!\");"
        },
        type: "javascript"
      }
    ]
  },
  RU: {
    title: "REST & GraphQL (CORE)",
    description: "Проектирование API, версионирование и GraphQL. Узнайте, как строить масштабируемое общение между фронтендом и бэкендом.",
    lessons: [
      {
        id: "api-rest-design",
        title: "Принципы проектирования REST API",
        theory: {
          sections: [
            { type: "heading", content: "Существительные, а не Глаголы" },
            { type: "text", content: "REST (Representational State Transfer) — это не строгий стандарт, а архитектурный стиль. Самая частая ошибка новичков — вставлять 'глаголы' в URL-адреса." },
            { type: "list", items: [
              "Плохо: POST /createUser, GET /getUserById?id=5, POST /updateUser",
              "Хорошо: POST /users, GET /users/5, PUT /users/5"
            ]},
            { type: "text", content: "В архитектуре REST URL-адрес должен указывать ТОЛЬКО на Ресурс (Существительное). Действие, которое вы хотите совершить (Глагол), определяется исключительно HTTP-методом (GET, POST, PUT, PATCH, DELETE)." },
            { type: "heading", content: "Вложенные ресурсы (Nested Resources)" },
            { type: "text", content: "Если вам нужно получить все комментарии для конкретного поста, URL должен отражать иерархию объектов:" },
            { type: "code", content: "GET /posts/12/comments" },
            { type: "tip", content: "Ресурс: REST API Design Rulebook. У Microsoft и Google есть великолепные открытые гайды по дизайну API. Одно из главных правил: всегда используйте существительные во множественном числе (например, /users, а не /user) для консистентности." }
          ]
        },
        practice: {
          title: "Проектирование REST маршрутов",
          description: "Исправьте плохой дизайн API.",
          task: "Посмотрите на стартовый код. Джуниор-разработчик создал грязный API, используя глаголы в URL. Перепишите маршруты (routes) так, чтобы они соответствовали правилам REST, используя правильные HTTP-методы.",
          starterCode: "// ❌ ПЛОХОЙ ДИЗАЙН API:\n// app.get('/getAllArticles', ...)\n// app.post('/createArticle', ...)\n// app.post('/deleteArticle/:id', ...)\n\nconst express = require('express');\nconst app = express();\n\n// ✅ ВАША ОЧЕРЕДЬ (Исправьте роуты):\n\n// 1. Получить все статьи\napp.get('', (req, res) => {});\n\n// 2. Создать статью\napp.('', (req, res) => {});\n\n// 3. Удалить статью по ID\napp.('', (req, res) => {});"
        },
        type: "javascript"
      },
      {
        id: "api-versioning",
        title: "Версионирование API и Пагинация",
        theory: {
          sections: [
            { type: "heading", content: "Никогда не ломайте Клиента" },
            { type: "text", content: "Представьте: у вас есть iOS приложение в App Store, которое обращается к вашему API. В один прекрасный день вы решили переименовать колонку 'username' в 'email' в вашей базе данных. Вы деплоите новый бэкенд. И внезапно iOS приложение крашится у миллионов пользователей, потому что они еще не скачали обновление из App Store!" },
            { type: "text", content: "Чтобы предотвратить это, вы ОБЯЗАНЫ версионировать ваши API. Самый популярный подход — URI Versioning (Версионирование в URL):" },
            { type: "code", content: "GET /api/v1/users  // Старое iOS приложение использует это\nGET /api/v2/users  // Новое веб-приложение использует это" },
            { type: "heading", content: "Пагинация (Pagination)" },
            { type: "text", content: "Если в вашей базе 1 миллион пользователей, простой запрос GET /users обрушит ваш сервер (Out of Memory). Вы обязаны внедрить пагинацию с помощью Query-параметров." },
            { type: "code", content: "GET /api/v1/users?limit=20&offset=40" },
            { type: "text", content: "Это говорит базе данных: 'Пропусти первые 40 юзеров и дай мне следующие 20'. На фронтенде это обычно превращается в кнопку 'Загрузить еще' (Load More)." }
          ]
        },
        practice: {
          title: "Внедрение Пагинации",
          description: "Извлеките Query-параметры из запроса.",
          task: "В Express query-параметры (всё, что после знака '?') лежат в объекте req.query. Извлеките переменные 'limit' и 'page'. Если они не переданы в URL, задайте им значения по умолчанию (limit=10, page=1).",
          starterCode: "const express = require('express');\nconst app = express();\n\napp.get('/api/v1/posts', (req, res) => {\n    // Извлеките limit и page из req.query (со значениями по умолчанию)\n    const limit = \n    const page = \n    \n    // Вычисляем отступ: (page - 1) * limit\n    const offset = (page - 1) * limit;\n    \n    res.json({ message: `Fetching ${limit} posts starting from index ${offset}` });\n});"
        },
        type: "javascript"
      },
      {
        id: "api-graphql-intro",
        title: "Революция GraphQL",
        theory: {
          sections: [
            { type: "heading", content: "Проблемы REST API" },
            { type: "text", content: "В 2012 году инженеры Facebook поняли, что REST убивает их мобильное приложение из-за двух фатальных проблем:" },
            { type: "list", items: [
              "Over-fetching (Избыток данных): Вы делаете GET /users/1. Вам нужно только имя юзера, но REST возвращает гигантский JSON с 50 полями (адреса, настройки, токены). Это тратит мобильный трафик и батарею.",
              "Under-fetching (Проблема N+1): Вы делаете GET /users/1. Теперь вам нужны посты этого юзера. Вы делаете ВТОРОЙ запрос GET /users/1/posts. Затем третий запрос за комментариями. Мобильные экраны грузились слишком медленно."
            ]},
            { type: "heading", content: "Появление GraphQL" },
            { type: "text", content: "GraphQL решает это радикально. Используется всего ОДИН эндпоинт (обычно POST /graphql). Вместо дергания разных URL, Фронтенд отправляет специальный Запрос (Query), где СТРОГО указывает, какая форма данных ему нужна. Бэкенд возвращает JSON ровно такой же формы." },
            { type: "tip", content: "Ресурс: GraphQL.org. Официальная документация — лучшее место, чтобы вникнуть в философию Queries (чтение), Mutations (изменение) и строгой типизации." }
          ]
        },
        practice: {
          title: "Напиши GraphQL Query",
          description: "Попроси только то, что тебе нужно.",
          task: "Это концептуальная задача. Посмотрите на синтаксис GraphQL Query. Мы запрашиваем юзера с id: 1. Внутри фигурных скобок мы указываем поля. Добавьте поле 'email', а также запросите 'posts', и внутри постов запросите их 'title'.",
          starterCode: "/* \nСинтаксис GraphQL Query (На стороне Фронтенда)\nМы отправляем эту строку на POST /graphql\n*/\n\nquery {\n  user(id: 1) {\n    name\n    age\n    // 1. Добавьте поле email\n    \n    // 2. Запросите posts, и внутри них запросите 'title'\n    posts {\n      \n    }\n  }\n}"
        },
        type: "javascript"
      },
      {
        id: "api-graphql-apollo",
        title: "Сборка GraphQL API (Apollo Server)",
        theory: {
          sections: [
            { type: "heading", content: "Схема и Резолверы (Resolvers)" },
            { type: "text", content: "В отличие от REST, бэкенд на GraphQL требует строгой Схемы (Type Definitions). Вы обязаны объявить каждый объект, его поля и типы данных (String, Int, Boolean)." },
            { type: "text", content: "После создания схемы вы пишете Резолверы. Резолвер — это обычная JavaScript функция, которая говорит серверу, КАК ИМЕННО достать данные для конкретного поля (например, сходить в базу Postgres или дернуть соседний микросервис)." },
            { type: "code", content: "const typeDefs = `#graphql\n  type User {\n    id: ID!\n    name: String!\n  }\n  type Query {\n    getUser(id: ID!): User\n  }\n`;\n\nconst resolvers = {\n  Query: {\n    getUser: (parent, args) => db.users.findById(args.id)\n  }\n};" },
            { type: "heading", content: "Apollo Server" },
            { type: "text", content: "Сам по себе GraphQL — это просто спецификация (бумажка с правилами). А вот Apollo — это самая популярная библиотека для работы с ним. Apollo Server берет ваши typeDefs и resolvers и автоматически разворачивает мощный GraphQL API." },
            { type: "tip", content: "Ресурс: Apollo Tutorial (Odyssey). У них есть бесплатная платформа 'Apollo Odyssey'. Это потрясающий, геймифицированный курс по созданию GraphQL API с нуля. Абсолютный маст-хэв." }
          ]
        },
        practice: {
          title: "Определение GraphQL Схемы",
          description: "Напиши Type Definitions для Apollo.",
          task: "Допишите строку typeDefs. Создайте тип 'Book' с полями: id (типа ID!), title (String) и author (String). Затем внутри типа Query добавьте запрос 'books', который возвращает массив объектов Book (синтаксис: [Book]).",
          starterCode: "const { ApolloServer } = require('@apollo/server');\n\nconst typeDefs = `#graphql\n  # 1. Определите тип Book\n  type Book {\n    \n  }\n\n  type Query {\n    # 2. Добавьте запрос 'books', возвращающий массив книг\n    \n  }\n`;\n\nconsole.log(\"Схема GraphQL успешно определена!\");"
        },
        type: "javascript"
      }
    ]
  }
};