export const databasesState: Record<'EN' | 'RU', any> = {
  EN: {
    title: "Databases (MUST)",
    description: "SQL vs NoSQL, schemas, queries, and indexes. Learn how to store and retrieve data efficiently.",
    lessons: [
      {
        id: "db-sql-nosql",
        title: "The Great Debate: SQL vs NoSQL",
        theory: {
          sections: [
            { type: "heading", content: "Two Worlds of Data" },
            { type: "text", content: "As a backend developer, your primary job is to safely store user data and quickly retrieve it. There are two main paradigms for doing this: Relational (SQL) and Non-Relational (NoSQL)." },
            { type: "heading", content: "Relational Databases (SQL)" },
            { type: "text", content: "PostgreSQL, MySQL, SQLite. They store data in strict, highly structured Tables (rows and columns). They enforce ACID properties, meaning data integrity is guaranteed. If you are building a banking app where every transaction must be perfectly recorded, you use SQL." },
            { type: "heading", content: "Non-Relational Databases (NoSQL)" },
            { type: "text", content: "MongoDB, Redis, Cassandra. They do not use tables. For example, Document databases store data as flexible JSON-like documents. If your data structure changes frequently (like a startup rapidly changing user profiles) or you need to scale massively without complex JOINs, NoSQL is a great choice." }
          ]
        },
        practice: {
          title: "Structured vs Flexible",
          description: "Compare the visual representation of data.",
          task: "This is a conceptual exercise. Look at the code editor. It shows how the exact same User data is represented in SQL (strict columns) vs NoSQL (nested JSON document). Add a new 'role' field to the NoSQL document to see how flexible it is compared to SQL schemas.",
          starterCode: "/* --- SQL REPRESENTATION --- */\n/* \nTable: Users\nid | name  | age | email\n---|-------|-----|------------\n 1 | Alice |  25 | al@mail.com\n*/\n\n/* --- NoSQL (MongoDB) REPRESENTATION --- */\nconst mongoDocument = {\n    \"_id\": 1,\n    \"name\": \"Alice\",\n    \"age\": 25,\n    \"email\": \"al@mail.com\",\n    \"address\": {\n        \"city\": \"London\",\n        \"zip\": \"10001\"\n    }\n    // Add a 'role' key below (e.g., \"role\": \"admin\")\n    \n};"
        },
        type: "javascript"
      },
      {
        id: "db-schemas-queries",
        title: "Schemas and Basic Queries (DDL & DML)",
        theory: {
          sections: [
            { type: "heading", content: "DDL: Data Definition Language" },
            { type: "text", content: "Before you can insert data into a SQL database, you must define its structure. This is called a Schema. You use commands like CREATE TABLE to define column names and their Data Types (e.g., VARCHAR for text, INT for numbers, BOOLEAN)." },
            { type: "code", content: "CREATE TABLE users (\n    id SERIAL PRIMARY KEY,\n    username VARCHAR(50) NOT NULL,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);" },
            { type: "heading", content: "DML: Data Manipulation Language" },
            { type: "text", content: "Once the schema is ready, you use DML to interact with the data. The core operations form the acronym CRUD:" },
            { type: "list", items: [
              "Create: INSERT INTO users (username) VALUES ('admin');",
              "Read: SELECT * FROM users WHERE id = 1;",
              "Update: UPDATE users SET username = 'superadmin' WHERE id = 1;",
              "Delete: DELETE FROM users WHERE id = 1;"
            ]},
            { type: "tip", content: "Resource: SQLBolt. If you have never written a SELECT statement, SQLBolt is the absolute best interactive tutorial on the web. It takes you from zero to writing complex queries right in the browser." }
          ]
        },
        practice: {
          title: "Create and Insert",
          description: "Write your first Schema and Data.",
          task: "Write a SQL query to create a table named 'products' with two columns: 'id' (INT) and 'name' (VARCHAR). Then write an INSERT statement to add a product named 'Laptop' with id 1.",
          starterCode: "-- 1. Create the schema (table)\nCREATE TABLE products (\n    \n);\n\n-- 2. Insert data into the table\nINSERT INTO products \n"
        },
        type: "sql"
      },
      {
        id: "db-relationships",
        title: "Relationships and JOINs",
        theory: {
          sections: [
            { type: "heading", content: "Keys connect the world" },
            { type: "text", content: "In a relational database, data is normalized (split into multiple tables to avoid duplication). To link them back together, we use Keys." },
            { type: "list", items: [
              "Primary Key (PK): A unique identifier for a row (e.g., user_id).",
              "Foreign Key (FK): A column in one table that points to a Primary Key in another table."
            ]},
            { type: "heading", content: "The JOIN Operator" },
            { type: "text", content: "When querying, you use JOIN to combine rows from two or more tables based on a related column." },
            { type: "code", content: "SELECT users.name, posts.title \nFROM users\nINNER JOIN posts ON users.id = posts.user_id;" },
            { type: "text", content: "An INNER JOIN only returns rows where there is a match in BOTH tables. A LEFT JOIN returns ALL rows from the left table, even if there are no matches in the right table (missing values become NULL)." },
            { type: "tip", content: "Resource: PostgreSQL Tutorial (postgresqltutorial.com). It has excellent visual diagrams showing how different JOINs intersect data (like Venn diagrams)." }
          ]
        },
        practice: {
          title: "Join Users and Orders",
          description: "Extract relational data.",
          task: "We have two tables: 'users' and 'orders'. Write a query to select the user's name (users.name) and their order total (orders.total). Use an INNER JOIN to connect them where users.id matches orders.user_id.",
          starterCode: "SELECT \n    \nFROM users\nJOIN orders ON \n"
        },
        type: "sql"
      },
      {
        id: "db-indexes",
        title: "Performance: B-Trees and Indexes",
        theory: {
          sections: [
            { type: "heading", content: "The Full Table Scan Problem" },
            { type: "text", content: "Imagine an 'employees' table with 10 million rows. If you run `SELECT * FROM employees WHERE email = 'test@mail.com'`, the database has to check every single row from top to bottom. This is called a Full Table Scan (O(N) complexity) and it will crush your server's CPU." },
            { type: "heading", content: "Indexes to the rescue" },
            { type: "text", content: "An Index is a separate data structure (usually a B-Tree) that acts like the index at the back of a book. It keeps the data sorted for a specific column." },
            { type: "code", content: "CREATE INDEX idx_employees_email ON employees(email);" },
            { type: "text", content: "Now, when you search by email, the database traverses the B-Tree in O(log N) time. Instead of checking 10 million rows, it finds the exact location in just ~20 steps! Queries drop from taking 5 seconds to 5 milliseconds." },
            { type: "heading", content: "The Trade-off" },
            { type: "text", content: "You shouldn't index every column. Indexes take up extra disk space. More importantly, every time you INSERT, UPDATE, or DELETE a row, the database has to update the index tree, which slows down write operations." }
          ]
        },
        practice: {
          title: "Speed up your Queries",
          description: "Create an index for a frequently searched column.",
          task: "Your backend API frequently queries the 'transactions' table by the 'tx_hash' column. Write the SQL command to create an index named 'idx_tx_hash' on the 'tx_hash' column of the 'transactions' table.",
          starterCode: "-- The database is running slow due to full table scans on tx_hash.\n-- Create an index to fix this!\n\nCREATE INDEX \n"
        },
        type: "sql"
      },
      {
        id: "db-mongodb",
        title: "NoSQL Deep Dive: MongoDB Basics",
        theory: {
          sections: [
            { type: "heading", content: "Thinking in Documents" },
            { type: "text", content: "MongoDB is the most popular Document-based NoSQL database. Instead of Tables, it has Collections. Instead of Rows, it has Documents (stored as BSON, a binary JSON format)." },
            { type: "text", content: "In MongoDB, you don't define a strict schema before inserting data. You can insert a document with 2 fields, and right after it, insert a document with 10 fields (including nested arrays and objects) into the exact same collection." },
            { type: "heading", content: "Querying with JSON" },
            { type: "text", content: "MongoDB doesn't use SQL. You query it using a JavaScript-like syntax with query operators (like $gt for Greater Than, or $in)." },
            { type: "code", content: "// Find all users older than 18\ndb.users.find({\n    age: { $gt: 18 }\n});" },
            { type: "tip", content: "Resource: MongoDB University. This is the official, free learning platform by the creators of MongoDB. Their 'M001: MongoDB Basics' course is an absolute MUST to get comfortable with NoSQL thinking and syntax." }
          ]
        },
        practice: {
          title: "Mongo Shell Query",
          description: "Write your first NoSQL query.",
          task: "Using MongoDB syntax, write a query to find all documents in the 'products' collection where the 'category' is 'Electronics' and the 'price' is greater than ($gt) 500.",
          starterCode: "// We use the MongoDB Shell syntax (JavaScript)\n\ndb.products.find({\n    \"category\": \"Electronics\",\n    // Add the price filter using $gt\n    \n});"
        },
        type: "javascript"
      }
    ]
  },
  RU: {
    title: "Базы данных (MUST)",
    description: "SQL vs NoSQL, схемы, запросы и индексы. Узнайте, как эффективно хранить и извлекать данные.",
    lessons: [
      {
        id: "db-sql-nosql",
        title: "Вечный спор: SQL против NoSQL",
        theory: {
          sections: [
            { type: "heading", content: "Два мира данных" },
            { type: "text", content: "Главная задача backend-разработчика — безопасно сохранить данные пользователя и быстро их отдать. Существует две основные парадигмы: Реляционная (SQL) и Нереляционная (NoSQL)." },
            { type: "heading", content: "Реляционные базы (SQL)" },
            { type: "text", content: "PostgreSQL, MySQL, SQLite. Они хранят данные в строгих таблицах (строки и колонки). Они гарантируют соответствие требованиям ACID (целостность и надежность транзакций). Если вы пишете банковское приложение, где нельзя потерять ни цента при переводе — вы используете SQL." },
            { type: "heading", content: "Нереляционные базы (NoSQL)" },
            { type: "text", content: "MongoDB, Redis, Cassandra. В них нет таблиц. Например, документо-ориентированные базы хранят данные в виде гибких JSON-документов. Если структура ваших данных постоянно меняется (как в стартапе на стадии поиска продукта) или вам нужно масштабироваться на сотни серверов без сложных JOIN-ов — выбирают NoSQL." }
          ]
        },
        practice: {
          title: "Структура против Гибкости",
          description: "Сравните визуальное представление данных.",
          task: "Это концептуальное задание. Посмотрите в редактор кода. Там показано, как одни и те же данные пользователя выглядят в SQL (строгие колонки) и в NoSQL (вложенный JSON документ). Добавьте новое поле 'role' (например, 'admin') в NoSQL документ, чтобы понять, насколько легко расширять схемы без миграций.",
          starterCode: "/* --- ПРЕДСТАВЛЕНИЕ В SQL --- */\n/* \nТаблица: Users\nid | name  | age | email\n---|-------|-----|------------\n 1 | Alice |  25 | al@mail.com\n*/\n\n/* --- ПРЕДСТАВЛЕНИЕ В NoSQL (MongoDB) --- */\nconst mongoDocument = {\n    \"_id\": 1,\n    \"name\": \"Alice\",\n    \"age\": 25,\n    \"email\": \"al@mail.com\",\n    \"address\": {\n        \"city\": \"London\",\n        \"zip\": \"10001\"\n    }\n    // Добавьте ключ 'role' ниже (например, \"role\": \"admin\")\n    \n};"
        },
        type: "javascript"
      },
      {
        id: "db-schemas-queries",
        title: "Схемы и базовые запросы (DDL и DML)",
        theory: {
          sections: [
            { type: "heading", content: "DDL: Data Definition Language" },
            { type: "text", content: "Прежде чем вставить данные в SQL базу, вы обязаны определить её структуру — Схему. Для этого используется команда CREATE TABLE. Вы указываете названия колонок и их Типы Данных (например, VARCHAR для текста, INT для чисел, BOOLEAN)." },
            { type: "code", content: "CREATE TABLE users (\n    id SERIAL PRIMARY KEY,\n    username VARCHAR(50) NOT NULL,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);" },
            { type: "heading", content: "DML: Data Manipulation Language" },
            { type: "text", content: "Когда схема готова, вы используете DML для работы с данными. Базовые операции образуют акроним CRUD:" },
            { type: "list", items: [
              "Create (Создать): INSERT INTO users (username) VALUES ('admin');",
              "Read (Прочитать): SELECT * FROM users WHERE id = 1;",
              "Update (Обновить): UPDATE users SET username = 'superadmin' WHERE id = 1;",
              "Delete (Удалить): DELETE FROM users WHERE id = 1;"
            ]},
            { type: "tip", content: "Ресурс: SQLBolt. Если вы никогда в жизни не писали SELECT-запросы, SQLBolt — это лучший интерактивный тренажер в интернете. Он проведет вас с нуля до сложных запросов прямо в окне браузера." }
          ]
        },
        practice: {
          title: "CREATE и INSERT",
          description: "Напишите свою первую Схему и вставьте Данные.",
          task: "Напишите SQL-запрос для создания таблицы 'products' с двумя колонками: 'id' (INT) и 'name' (VARCHAR). Затем напишите команду INSERT для добавления продукта с именем 'Laptop' и id 1.",
          starterCode: "-- 1. Создание схемы (таблицы)\nCREATE TABLE products (\n    \n);\n\n-- 2. Вставка данных в таблицу\nINSERT INTO products \n"
        },
        type: "sql"
      },
      {
        id: "db-relationships",
        title: "Связи и JOIN-ы",
        theory: {
          sections: [
            { type: "heading", content: "Ключи связывают мир" },
            { type: "text", content: "В реляционной базе данные нормализованы (разбиты на несколько таблиц, чтобы избежать дублирования). Чтобы собрать их обратно вместе, используются Ключи." },
            { type: "list", items: [
              "Primary Key (Первичный ключ, PK): Уникальный идентификатор строки в своей таблице (например, users.id).",
              "Foreign Key (Внешний ключ, FK): Колонка в одной таблице, которая ссылается на Первичный ключ в другой таблице."
            ]},
            { type: "heading", content: "Оператор JOIN" },
            { type: "text", content: "При чтении вы используете JOIN, чтобы объединить строки из двух таблиц на основе совпадающих ключей." },
            { type: "code", content: "SELECT users.name, posts.title \nFROM users\nINNER JOIN posts ON users.id = posts.user_id;" },
            { type: "text", content: "INNER JOIN возвращает только те строки, для которых нашлось совпадение в ОБЕИХ таблицах. LEFT JOIN берет ВСЕ строки из левой таблицы и ищет совпадения в правой. Если совпадений нет (юзер не написал ни одного поста), строки всё равно вернутся, но значения постов будут пустыми (NULL)." },
            { type: "tip", content: "Ресурс: PostgreSQL Tutorial. На сайте postgresqltutorial.com есть великолепные визуальные диаграммы, показывающие работу различных JOIN-ов в виде пересекающихся кругов Эйлера." }
          ]
        },
        practice: {
          title: "Объедините Пользователей и Заказы",
          description: "Извлеките реляционные данные.",
          task: "У нас есть две таблицы: 'users' и 'orders'. Напишите запрос, чтобы выбрать имя пользователя (users.name) и сумму его заказа (orders.total). Используйте INNER JOIN для их связи по правилу: users.id равен orders.user_id.",
          starterCode: "SELECT \n    \nFROM users\nJOIN orders ON \n"
        },
        type: "sql"
      },
      {
        id: "db-indexes",
        title: "Производительность: Индексы и B-Trees",
        theory: {
          sections: [
            { type: "heading", content: "Проблема полного сканирования (Full Table Scan)" },
            { type: "text", content: "Представьте таблицу 'employees' на 10 миллионов строк. Если бэкенд сделает запрос `SELECT * FROM employees WHERE email = 'test@mail.com'`, базе данных придется проверить КАЖДУЮ строку сверху вниз. Это называется Full Table Scan (сложность O(N)). Это уничтожит процессор вашего сервера." },
            { type: "heading", content: "Индексы приходят на помощь" },
            { type: "text", content: "Индекс — это отдельная структура данных (обычно B-Tree дерево), которая работает как алфавитный указатель в конце толстой книги. Она хранит данные отсортированными по конкретной колонке." },
            { type: "code", content: "CREATE INDEX idx_employees_email ON employees(email);" },
            { type: "text", content: "Теперь при поиске по email база спускается по дереву B-Tree за время O(log N). Вместо проверки 10 миллионов строк, она находит нужную запись всего за ~20 шагов! Запросы ускоряются с 5 секунд до 5 миллисекунд." },
            { type: "heading", content: "Обратная сторона медали" },
            { type: "text", content: "Нельзя индексировать все колонки подряд. Индексы занимают много места на диске. Но главное: каждый раз, когда вы делаете INSERT, UPDATE или DELETE, базе приходится перестраивать индексное дерево, что сильно замедляет операции записи." }
          ]
        },
        practice: {
          title: "Ускорение запросов",
          description: "Создайте индекс для частой колонки.",
          task: "Ваш Backend API часто ищет переводы в таблице 'transactions' по колонке 'tx_hash', и база начала 'тормозить'. Напишите SQL команду для создания индекса с именем 'idx_tx_hash' на колонку 'tx_hash' в таблице 'transactions'.",
          starterCode: "-- База тормозит из-за Full Table Scans по колонке tx_hash.\n-- Создайте индекс, чтобы исправить это!\n\nCREATE INDEX \n"
        },
        type: "sql"
      },
      {
        id: "db-mongodb",
        title: "NoSQL: Введение в MongoDB",
        theory: {
          sections: [
            { type: "heading", content: "Мыслить Документами" },
            { type: "text", content: "MongoDB — самая популярная документо-ориентированная NoSQL база. Вместо Таблиц здесь используются Коллекции (Collections). Вместо Строк — Документы (Documents), которые хранятся в формате BSON (бинарный JSON)." },
            { type: "text", content: "В MongoDB нет жестких схем. Вы можете вставить документ с 2 полями, а следом в эту же коллекцию вставить документ с 10 полями (включая вложенные списки и объекты). Это дает невероятную гибкость при разработке сложных каталогов товаров." },
            { type: "heading", content: "Запросы в формате JSON" },
            { type: "text", content: "В MongoDB нет языка SQL. Вы обращаетесь к базе с помощью JavaScript-подобного синтаксиса и операторов запроса (например, $gt для 'Greater Than' - больше чем, или $in)." },
            { type: "code", content: "// Найти всех пользователей старше 18 лет\ndb.users.find({\n    age: { $gt: 18 }\n});" },
            { type: "tip", content: "Ресурс: MongoDB University. Это официальная бесплатная обучающая платформа от создателей MongoDB. Их курс 'M001: MongoDB Basics' — это абсолютный маст-хэв, чтобы перестроить мозг с SQL таблиц на NoSQL документы." }
          ]
        },
        practice: {
          title: "Запрос в Mongo Shell",
          description: "Напишите свой первый NoSQL запрос.",
          task: "Используя синтаксис MongoDB, напишите запрос для поиска всех документов в коллекции 'products', где 'category' равна 'Electronics', а 'price' строго больше ($gt) 500.",
          starterCode: "// Мы используем синтаксис MongoDB Shell (JavaScript)\n\ndb.products.find({\n    \"category\": \"Electronics\",\n    // Добавьте фильтр цены с использованием оператора $gt\n    \n});"
        },
        type: "javascript"
      }
    ]
  }
};