export const authSecurityState: Record<'EN' | 'RU', any> = {
  EN: {
    title: "Authorization & Security (CORE)",
    description: "JWT, OAuth, Sessions, and Password Hashing. Learn how to protect your users' data.",
    lessons: [
      {
        id: "auth-hashing",
        title: "Password Hashing and Salting",
        theory: {
          sections: [
            { type: "heading", content: "Never Store Plaintext Passwords" },
            { type: "text", content: "If your database is compromised, hackers shouldn't be able to read user passwords. This is why we use Cryptographic Hash Functions. A hash function takes an input (e.g., 'password123') and turns it into a fixed-length string of gibberish." },
            { type: "text", content: "However, fast algorithms like MD5 or SHA-256 are dangerous today. Hackers use 'Rainbow Tables' (pre-computed lists of hashes) or powerful GPUs to reverse them in seconds." },
            { type: "heading", content: "The Solution: Bcrypt and Salt" },
            { type: "text", content: "Modern backends use algorithms like Bcrypt or Argon2. They are intentionally SLOW to calculate, making brute-forcing nearly impossible." },
            { type: "text", content: "Additionally, Bcrypt automatically adds a 'Salt' — a random string attached to the password before hashing. This ensures that even if two users have the same password ('12345'), their hashes in the database will look completely different!" },
            { type: "tip", content: "Resource: OWASP Guide. The OWASP Password Storage Cheat Sheet is the industry bible. It explicitly states which algorithms are deprecated and how many 'rounds' (cost factor) you should configure for Bcrypt." }
          ]
        },
        practice: {
          title: "Hash a Password",
          description: "Simulate Bcrypt password hashing.",
          task: "Use the simulated bcrypt library to hash a user's password. Call bcrypt.hash(password, saltRounds). Set saltRounds to 10.",
          starterCode: "const bcrypt = require('bcrypt');\n\nconst plainTextPassword = 'mySuperSecretPassword!';\nconst saltRounds = 10;\n\n// 1. Hash the password\nconst hashedPassword = \n\nconsole.log('Original:', plainTextPassword);\nconsole.log('Saved in DB:', hashedPassword);"
        },
        type: "javascript"
      },
      {
        id: "auth-sessions",
        title: "Stateful Authentication (Sessions)",
        theory: {
          sections: [
            { type: "heading", content: "How the Web Remembers You" },
            { type: "text", content: "HTTP is a stateless protocol. Every time you refresh a page, the server forgets who you are. To fix this, we use Sessions." },
            { type: "list", items: [
              "1. Login: The user sends an email and password. The server checks them.",
              "2. Session Creation: The server creates a unique 'Session ID' (e.g., xyz123) and saves it in its RAM or a Redis database, linking it to the user's ID.",
              "3. Cookie: The server sends this Session ID back to the user's browser inside a 'Set-Cookie' header.",
              "4. Subsequent Requests: The browser automatically attaches this Cookie to every future request. The server looks up the Session ID in its memory to identify the user."
            ]},
            { type: "heading", content: "Pros and Cons" },
            { type: "text", content: "Sessions are highly secure. You can instantly log a user out by simply deleting their Session ID from your Redis database. The downside? It's hard to scale. If you have 5 backend servers, they all need to share the same Redis memory so they recognize the same sessions." }
          ]
        },
        practice: {
          title: "Session Flow Concept",
          description: "Understand how session IDs map to users.",
          task: "Look at the simulated session store. Write a function checkAuth(cookieSessionId) that looks up the session ID in the server's memory. If it exists, return the user_id. If not, return null.",
          starterCode: "// Server Memory (Redis simulation)\nconst sessionStore = {\n  'xyz123': { user_id: 42, expires: '2025-12-31' },\n  'abc999': { user_id: 8, expires: '2025-12-31' }\n};\n\nfunction checkAuth(cookieSessionId) {\n    // Check if cookieSessionId exists in sessionStore\n    // If yes, return the user_id. Else return null.\n    \n}\n\nconsole.log('Auth check for xyz123:', checkAuth('xyz123'));\nconsole.log('Auth check for fakeToken:', checkAuth('fakeToken'));"
        },
        type: "javascript"
      },
      {
        id: "auth-jwt",
        title: "Stateless Authentication (JWT)",
        theory: {
          sections: [
            { type: "heading", content: "The Microservices Era" },
            { type: "text", content: "To solve the scaling problem of Sessions, the industry moved to Stateless authentication using JSON Web Tokens (JWT)." },
            { type: "heading", content: "Anatomy of a JWT" },
            { type: "text", content: "A JWT is a long string separated by dots: HEADER.PAYLOAD.SIGNATURE." },
            { type: "list", items: [
              "Header: Contains the hashing algorithm (usually HS256).",
              "Payload: Contains the actual user data (e.g., { 'user_id': 42, 'role': 'admin' }).",
              "Signature: A cryptographic hash of the Header + Payload + a SECRET KEY known only to the server."
            ]},
            { type: "heading", content: "Why is it Stateless?" },
            { type: "text", content: "When a user logs in, the server generates a JWT and gives it to the user. The server DOES NOT save it in a database! When the user makes a request, they send the JWT. The server recalculates the Signature using its Secret Key. If it matches, the token is valid, and the server knows the user is ID 42." },
            { type: "tip", content: "Resource: JWT.io. Go to jwt.io and paste a token. You will see that the Header and Payload are NOT encrypted—they are just Base64Url encoded. NEVER put passwords or sensitive data in a JWT payload, as anyone can decode and read it!" }
          ]
        },
        practice: {
          title: "Sign a JWT",
          description: "Simulate JWT generation.",
          task: "Use the simulated jwt library to sign a token. Call jwt.sign(payload, secretKey). Pass an object with user_id: 99 as the payload, and use 'super_secret' as the key.",
          starterCode: "const jwt = require('jsonwebtoken');\n\nconst payload = { user_id: 99 };\nconst secretKey = 'super_secret';\n\n// 1. Generate the JWT\nconst token = \n\nconsole.log('Generated JWT:', token);\n// Notice the 3 parts separated by dots!"
        },
        type: "javascript"
      },
      {
        id: "auth-oauth",
        title: "OAuth 2.0: 'Login with Google'",
        theory: {
          sections: [
            { type: "heading", content: "Delegated Access" },
            { type: "text", content: "You want to build an app that prints a user's GitHub repositories. You shouldn't ask the user for their GitHub password! That's a massive security risk. This is where OAuth 2.0 comes in." },
            { type: "text", content: "OAuth 2.0 is an authorization framework that allows a user to grant a third-party application limited access to their resources on another site, without exposing their password." },
            { type: "heading", content: "The Flow" },
            { type: "list", items: [
              "1. You redirect the user to Google's authorization server.",
              "2. The user logs into Google and clicks 'Allow this app to view your email'.",
              "3. Google redirects the user back to your backend with an Authorization Code.",
              "4. Your backend secretly trades this Code for an Access Token.",
              "5. Your backend uses the Access Token to fetch the user's email from Google's API."
            ]},
            { type: "tip", content: "Resource: Auth0 Blog. Auth0 provides the best, most readable articles on the internet regarding Identity. Their diagrams explaining the 'Authorization Code Flow' are essential reading for any backend developer." }
          ]
        },
        practice: {
          title: "OAuth Flow Concept",
          description: "Simulate the Access Token exchange.",
          task: "We received an Authorization Code from GitHub. Complete the function exchangeCodeForToken(code) by checking if the code equals 'xyz_auth_code'. If yes, return an object { access_token: 'ghp_12345' }.",
          starterCode: "// Simulating the OAuth 2.0 backend step\n\nfunction exchangeCodeForToken(code) {\n    // Check if code matches the expected string\n    \n    \n}\n\nconst userCode = 'xyz_auth_code';\nconst tokenResponse = exchangeCodeForToken(userCode);\n\nconsole.log(\"Token received from Provider:\", tokenResponse);"
        },
        type: "javascript"
      }
    ]
  },
  RU: {
    title: "Авторизация & Безопасность (CORE)",
    description: "JWT, OAuth, Сессии и Хеширование паролей. Узнайте, как надежно защитить данные ваших пользователей.",
    lessons: [
      {
        id: "auth-hashing",
        title: "Хеширование паролей и Соль",
        theory: {
          sections: [
            { type: "heading", content: "Никогда не храните пароли в открытом виде" },
            { type: "text", content: "Если базу данных вашей компании украдут, хакеры не должны получить пароли пользователей. Для этого используются Криптографические Хэш-функции. Функция берет строку (например, 'password123') и превращает её в строку фиксированной длины (абракадабру)." },
            { type: "text", content: "Однако быстрые алгоритмы (MD5 или SHA-256) сегодня опасны. Хакеры используют 'Радужные таблицы' (Rainbow Tables - заранее вычисленные базы хэшей) или мощные видеокарты, чтобы взломать их за секунды." },
            { type: "heading", content: "Решение: Bcrypt и Соль" },
            { type: "text", content: "Современные бэкенды используют алгоритмы вроде Bcrypt или Argon2. Они специально сделаны МЕДЛЕННЫМИ, что делает брутфорс (перебор) практически невозможным." },
            { type: "text", content: "Кроме того, Bcrypt автоматически добавляет 'Соль' (Salt) — случайную строку, которая приклеивается к паролю до хэширования. Это гарантирует, что даже если у двух пользователей одинаковый пароль ('12345'), их хэши в базе данных будут абсолютно разными!" },
            { type: "tip", content: "Ресурс: OWASP Guide. Документ 'OWASP Password Storage Cheat Sheet' — это библия индустрии. Там четко сказано, какие алгоритмы устарели, и сколько 'раундов' (cost factor) нужно выставлять для Bcrypt в текущем году." }
          ]
        },
        practice: {
          title: "Захешируй пароль",
          description: "Симуляция работы Bcrypt.",
          task: "Используйте встроенную библиотеку bcrypt для хеширования пароля. Вызовите функцию bcrypt.hash(password, saltRounds). Передайте ей 10 раундов соли.",
          starterCode: "const bcrypt = require('bcrypt');\n\nconst plainTextPassword = 'mySuperSecretPassword!';\nconst saltRounds = 10;\n\n// 1. Хешируем пароль\nconst hashedPassword = \n\nconsole.log('Оригинал:', plainTextPassword);\nconsole.log('Сохраняем в БД:', hashedPassword);"
        },
        type: "javascript"
      },
      {
        id: "auth-sessions",
        title: "Stateful Авторизация (Сессии)",
        theory: {
          sections: [
            { type: "heading", content: "Как веб-сайт вас запоминает" },
            { type: "text", content: "HTTP — это протокол без состояния (stateless). При каждом обновлении страницы сервер забывает, кто вы. Чтобы это исправить, придумали Сессии." },
            { type: "list", items: [
              "1. Логин: Пользователь отправляет логин и пароль. Сервер их проверяет.",
              "2. Создание сессии: Сервер генерирует уникальный 'Session ID' (например, xyz123) и сохраняет его в своей оперативной памяти (или в базе Redis), привязывая к ID пользователя.",
              "3. Cookie: Сервер отправляет этот Session ID обратно браузеру в заголовке 'Set-Cookie'.",
              "4. Дальнейшие запросы: Браузер автоматически прикрепляет эту Куку к каждому следующему запросу. Сервер ищет Session ID в своей памяти и 'узнает' пользователя."
            ]},
            { type: "heading", content: "Плюсы и минусы" },
            { type: "text", content: "Сессии очень безопасны. Вы можете мгновенно 'разлогинить' пользователя, просто удалив его Session ID из своей базы Redis. Минус? Сложность масштабирования. Если у вас 5 бэкенд-серверов, все они должны иметь доступ к одной общей базе Redis, чтобы 'узнавать' одни и те же сессии." }
          ]
        },
        practice: {
          title: "Механика сессий",
          description: "Поймите, как Session ID связывается с юзером.",
          task: "Посмотрите на симуляцию хранилища сессий (sessionStore). Напишите функцию checkAuth(cookieSessionId), которая ищет переданный ID в памяти сервера. Если он есть, верните user_id. Если нет — верните null.",
          starterCode: "// Память сервера (Симуляция Redis)\nconst sessionStore = {\n  'xyz123': { user_id: 42, expires: '2025-12-31' },\n  'abc999': { user_id: 8, expires: '2025-12-31' }\n};\n\nfunction checkAuth(cookieSessionId) {\n    // Проверьте, есть ли cookieSessionId в sessionStore\n    // Если да - верните user_id. Иначе null.\n    \n}\n\nconsole.log('Проверка токена xyz123:', checkAuth('xyz123'));\nconsole.log('Проверка токена fakeToken:', checkAuth('fakeToken'));"
        },
        type: "javascript"
      },
      {
        id: "auth-jwt",
        title: "Stateless Авторизация (JWT)",
        theory: {
          sections: [
            { type: "heading", content: "Эра Микросервисов" },
            { type: "text", content: "Чтобы решить проблему масштабирования Сессий, индустрия перешла на Stateless (без состояния) авторизацию с использованием JSON Web Tokens (JWT)." },
            { type: "heading", content: "Анатомия JWT" },
            { type: "text", content: "JWT — это длинная строка, разделенная точками на 3 части: HEADER.PAYLOAD.SIGNATURE." },
            { type: "list", items: [
              "Header (Заголовок): Указывает алгоритм подписи (обычно HS256).",
              "Payload (Полезная нагрузка): Сами данные пользователя (например, { 'user_id': 42, 'role': 'admin' }).",
              "Signature (Подпись): Криптографический хэш (Заголовок + Payload + SECRET KEY). Секретный ключ знает только сервер."
            ]},
            { type: "heading", content: "Почему это Stateless?" },
            { type: "text", content: "При логине сервер генерирует JWT и отдает его юзеру. Сервер НЕ СОХРАНЯЕТ токен в базу данных! Когда юзер делает запрос, он присылает JWT. Сервер берет Payload из токена, пересчитывает Подпись, используя свой Секретный ключ. Если подписи совпали — токен легитимен, и сервер верит, что это юзер 42." },
            { type: "tip", content: "Ресурс: JWT.io. Обязательно зайдите на сайт jwt.io и вставьте любой токен. Вы увидите, что Header и Payload НЕ ЗАШИФРОВАНЫ! Они просто закодированы в Base64Url. НИКОГДА не кладите пароли или секретные данные в Payload токена, любой человек может их прочитать!" }
          ]
        },
        practice: {
          title: "Подписание JWT",
          description: "Симуляция генерации токена.",
          task: "Используйте библиотеку jsonwebtoken (jwt), чтобы подписать токен. Вызовите функцию jwt.sign(payload, secretKey). Передайте объект с user_id: 99 как payload, и 'super_secret' как ключ.",
          starterCode: "const jwt = require('jsonwebtoken');\n\nconst payload = { user_id: 99 };\nconst secretKey = 'super_secret';\n\n// 1. Генерируем JWT\nconst token = \n\nconsole.log('Сгенерированный JWT:', token);\n// Обратите внимание на 3 части, разделенные точками!"
        },
        type: "javascript"
      },
      {
        id: "auth-oauth",
        title: "OAuth 2.0: 'Войти через Google'",
        theory: {
          sections: [
            { type: "heading", content: "Делегированный доступ" },
            { type: "text", content: "Представьте, что вы делаете приложение, которое выводит список репозиториев пользователя из GitHub. Вы не должны просить у юзера его пароль от GitHub! Это огромная дыра в безопасности. Для этого придуман стандарт OAuth 2.0." },
            { type: "text", content: "OAuth 2.0 — это фреймворк авторизации, который позволяет пользователю выдать стороннему приложению (вашему сайту) ОГРАНИЧЕННЫЙ доступ к своим ресурсам на другом сервисе (Google, GitHub), не передавая пароль." },
            { type: "heading", content: "Как это работает (Authorization Code Flow)" },
            { type: "list", items: [
              "1. Вы перенаправляете юзера на сервер авторизации Google.",
              "2. Юзер логинится в Google и нажимает 'Разрешить приложению читать email'.",
              "3. Google перенаправляет юзера обратно на ваш Бэкенд с 'Authorization Code' в URL.",
              "4. Ваш Бэкенд ТАЙНО (сервер-сервер) меняет этот Код на Access Token (Токен доступа).",
              "5. Ваш Бэкенд использует Access Token для запроса email'а через API Google."
            ]},
            { type: "tip", content: "Ресурс: Auth0 Blog. Статьи на блоге Auth0 — это лучшие, самые понятные материалы в интернете по теме Идентичности и OAuth. Их диаграммы (sequence diagrams) объясняют процесс лучше любой официальной документации." }
          ]
        },
        practice: {
          title: "Логика OAuth Flow",
          description: "Симуляция обмена кода на токен.",
          task: "Мы получили Authorization Code от GitHub. Допишите функцию exchangeCodeForToken(code). Проверьте, равен ли код строке 'xyz_auth_code'. Если да, верните объект { access_token: 'ghp_12345' }.",
          starterCode: "// Имитация шага на бэкенде (OAuth 2.0 Exchange)\n\nfunction exchangeCodeForToken(code) {\n    // Проверьте, совпадает ли код с ожидаемым\n    \n    \n}\n\nconst userCode = 'xyz_auth_code';\nconst tokenResponse = exchangeCodeForToken(userCode);\n\nconsole.log(\"Получен токен от Провайдера:\", tokenResponse);"
        },
        type: "javascript"
      }
    ]
  }
};