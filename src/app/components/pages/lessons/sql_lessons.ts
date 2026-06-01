export const sqlState: Record<'EN' | 'RU', any> = {
  EN: {
    title: "SQL for Data Science",
    description: "Learn SQL basics to extract, filter, aggregate and join data — from SELECT and GROUP BY to Window Functions.",
    lessons: [
      {
        id: "sql-basics",
        title: "SQL Basics: Extraction and Filtering",
        theory: {
          sections: [
            { type: "heading", content: "Why does a Data Scientist need SQL?" },
            { type: "text", content: "Many beginners think Data Science is just Python (Pandas/NumPy) and machine learning. In reality, data 'lives' in huge corporate Data Warehouses (PostgreSQL, ClickHouse, Snowflake) storing petabytes of info. Downloading the entire database into a CSV and opening it in Pandas is impossible — you'd just run out of RAM." },
            { type: "text", content: "SQL (Structured Query Language) lets you offload the heavy lifting to the database servers. You filter, group, and clean the data with SQL, and then load only a small, clean subset into Python." },
            { type: "heading", content: "Query anatomy: SELECT, FROM, WHERE" },
            { type: "text", content: "Any SQL query is built following strict rules (syntax):" },
            { type: "code", content: "SELECT name, age, salary\nFROM employees\nWHERE age > 30\nORDER BY salary DESC\nLIMIT 10;" },
            { type: "list", items: [
              "SELECT: Which columns we want to get (an asterisk * means 'all columns').",
              "FROM: From which table we are taking the data.",
              "WHERE: Filtering condition (works before data is grouped).",
              "ORDER BY ... DESC: Sorting in descending order.",
              "LIMIT: Return only the first N rows (so as not to hang the database with a million-row output)."
            ]},
            { type: "tip", content: "Where to practice: SQLZoo. It's an ideal starting ground with step-by-step lessons. We recommend the 'SELECT basics' and 'SELECT from Nobel' sections." }
          ]
        },
        practice: {
          title: "SELECT Basics",
          description: "Extracting and filtering data.",
          task: "Select the names (name) and salaries (salary) of employees who work in the 'IT' department and earn more than 100000.",
          starterCode: "-- SQL Emulator: We have a table 'users'\n-- Columns: id, name, age, department, salary\n\nSELECT \nFROM users\nWHERE "
        },
        type: "sql"
      },
      {
        id: "sql-aggregation",
        title: "Aggregation: GROUP BY and HAVING",
        theory: {
          sections: [
            { type: "heading", content: "Math in SQL" },
            { type: "text", content: "If you need to calculate business metrics (Average check, Number of active daily users, Total revenue), you don't do it in Python! You do it in SQL using aggregate functions:" },
            { type: "list", items: [
              "COUNT(*) — counts the number of rows.",
              "SUM(revenue) — sums the values in a column.",
              "AVG(price) — calculates the arithmetic mean.",
              "MAX(age) / MIN(age) — finds the maximum and minimum."
            ]},
            { type: "heading", content: "The magic of GROUP BY" },
            { type: "text", content: "By themselves, functions (e.g., AVG(salary)) will return just one number for the whole table. But in business we need breakdowns! For example, 'Show the average salary grouped by each department'." },
            { type: "code", content: "SELECT department, AVG(salary) AS avg_salary\nFROM employees\nGROUP BY department;" },
            { type: "heading", content: "Difference between WHERE and HAVING" },
            { type: "text", content: "This is a classic Junior Data Scientist interview question!" },
            { type: "list", items: [
              "WHERE — filters rows BEFORE they are grouped. You cannot write aggregate functions in WHERE!",
              "HAVING — filters data AFTER grouping. (e.g., keep only those departments where COUNT(*) > 10)."
            ]},
            { type: "tip", content: "Where to practice: Mode SQL Tutorial. Their 'Intermediate SQL' section perfectly explains the logic of aggregate functions on real marketing data." }
          ]
        },
        practice: {
          title: "Data Aggregation",
          description: "Use GROUP BY and aggregate functions.",
          task: "Calculate the total revenue (SUM(amount)) for each status in the orders table.",
          starterCode: "-- Table 'orders' (id, user_id, amount, status)\n\nSELECT \nFROM orders\n"
        },
        type: "sql"
      },
      {
        id: "sql-join",
        title: "Joining tables: JOIN",
        theory: {
          sections: [
            { type: "heading", content: "Why are databases 'Relational'?" },
            { type: "text", content: "In a good database (RDBMS), info is never stored in one huge table (to avoid duplication). Data is split into entities: a users table (customers) and an orders table (purchases). There is a relation between them via common keys." },
            { type: "list", items: [
              "Primary Key: A unique identifier for a row (e.g., users.id).",
              "Foreign Key: A reference to another table (e.g., orders.user_id references users.id)."
            ]},
            { type: "heading", content: "How does JOIN work?" },
            { type: "text", content: "The JOIN operator glues two tables into one based on a specified condition (when keys match)." },
            { type: "code", content: "SELECT users.name, orders.amount\nFROM users\nINNER JOIN orders ON users.id = orders.user_id;" },
            { type: "heading", content: "Types of JOINs" },
            { type: "list", items: [
              "INNER JOIN: (Most common). Keeps only those rows for which a match was found in BOTH tables.",
              "LEFT JOIN: Takes ALL rows from the left table and looks for matches in the right one. If a user bought nothing, they will still appear in the result, but the amount column will be empty (NULL). Very useful for finding inactive customers!"
            ]},
            { type: "tip", content: "Where to practice: LeetCode SQL. Problems involving LEFT JOIN (like 'find users who haven\\'t made a single order') are an interview classic." }
          ]
        },
        practice: {
          title: "Joining tables",
          description: "Use INNER JOIN to link users and orders.",
          task: "Output the User's name (users.name) and Purchase amount (orders.amount). Join the tables (INNER JOIN) on the rule: users.id = orders.user_id.",
          starterCode: "-- Tables 'users' (id, name) and 'orders' (id, user_id, amount)\n\nSELECT \nFROM users\nJOIN orders ON "
        },
        type: "sql"
      },
      {
        id: "sql-cte",
        title: "Clean code: Subqueries and CTEs (WITH)",
        theory: {
          sections: [
            { type: "heading", content: "Subqueries" },
            { type: "text", content: "Sometimes logic requires executing one query inside another. For example: 'Find all employees whose salary is greater than the average salary across the company'. You don't know the average salary in advance, so you calculate it with a subquery in parentheses:" },
            { type: "code", content: "SELECT name, salary\nFROM employees\nWHERE salary > ( SELECT AVG(salary) FROM employees );" },
            { type: "heading", content: "Solving spaghetti code: CTEs" },
            { type: "text", content: "When writing an analytical query for business, it might contain 5 nested subqueries. Reading such code is impossible. The WITH operator lets you move the subquery to the top, give it a clear name, and treat it like a regular table." },
            { type: "code", content: "WITH avg_salaries AS (\n    SELECT department, AVG(salary) AS avg_sal\n    FROM employees\n    GROUP BY department\n)\nSELECT e.name, e.salary, a.avg_sal\nFROM employees e\nJOIN avg_salaries a ON e.department = a.department;" },
            { type: "text", content: "In this example, we first assembled a 'virtual table' of average salaries (CTE), and then beautifully joined it with the main table." }
          ]
        },
        practice: {
          title: "Using subqueries",
          description: "Filter data using a nested SELECT.",
          task: "Find elite salespeople whose revenue is STRICTLY GREATER than the average revenue of all the company's salespeople. Use WHERE revenue > (subquery AVG(revenue)).",
          starterCode: "-- Table 'sales' (id, user_name, revenue)\n\nSELECT user_name, revenue\nFROM sales\nWHERE revenue > (  );"
        },
        type: "sql"
      },
      {
        id: "sql-window",
        title: "Analyst's Magic: Window Functions",
        theory: {
          sections: [
            { type: "heading", content: "What are Window Functions?" },
            { type: "text", content: "This is a Data Scientist's most powerful weapon in SQL. An ordinary GROUP BY 'collapses' rows. A window function lets you calculate an aggregation (or rank) while keeping ALL the original rows of the table." },
            { type: "heading", content: "OVER (PARTITION BY) syntax" },
            { type: "text", content: "We use the OVER keyword. Inside it, we specify the 'Window' (data block) over which the calculation will occur." },
            { type: "code", content: "SELECT\n    name,\n    department,\n    salary,\n    AVG(salary) OVER (PARTITION BY department) AS dept_avg\nFROM employees;" },
            { type: "text", content: "This code outputs the names of all employees, their salaries, and alongside them — a new column containing the average salary for THEIR department. The data didn't collapse!" },
            { type: "heading", content: "Ranking (RANK and ROW_NUMBER)" },
            { type: "text", content: "Window functions are ideal for tasks like 'Top 3 customers in each city'. You can number rows within a window!" },
            { type: "code", content: "ROW_NUMBER() OVER (PARTITION BY city ORDER BY purchase_amount DESC)" },
            { type: "tip", content: "Mode SQL Tutorial has a great section 'Advanced SQL: Window Functions' with GIFs showing how the 'Window' slides over the table." }
          ]
        },
        practice: {
          title: "Window Functions",
          description: "Calculate an aggregation while preserving rows.",
          task: "Output a list of employees. For each employee, calculate the MAXIMUM salary in THEIR department (using the window function MAX(salary) OVER (PARTITION BY department)).",
          starterCode: "-- Table 'employees' (id, name, department, salary)\n\nSELECT \n    name, \n    department, \n    salary,\n    ... as max_dept_salary\nFROM employees;"
        },
        type: "sql"
      }
    ]
  },
  RU: {
    title: "SQL для Data Science",
    description: "Изучите основы SQL для извлечения, фильтрации, агрегации и джоинов — от SELECT и GROUP BY до Оконных функций.",
    lessons: [
      {
        id: "sql-basics",
        title: "Основы SQL: Извлечение и Фильтрация",
        theory: {
          sections: [
            { type: "heading", content: "Зачем Data Scientist'у SQL?" },
            { type: "text", content: "Многие новички думают, что Data Science — это только Python (Pandas/NumPy) и машинное обучение. В реальности данные 'живут' в огромных корпоративных Базах Данных (PostgreSQL, ClickHouse, Snowflake), где хранятся петабайты информации. Выгрузить всю базу в CSV-файл и открыть его в Pandas невозможно — у вас просто закончится оперативная память (RAM)." },
            { type: "text", content: "SQL (Structured Query Language) позволяет переложить всю тяжелую работу на сервера Базы Данных. Вы фильтруете, группируете и очищаете данные с помощью SQL, и загружаете в Python уже маленькую, чистую выборку." },
            { type: "heading", content: "Анатомия запроса: SELECT, FROM, WHERE" },
            { type: "text", content: "Любой SQL-запрос строится по строгим правилам (синтаксису):" },
            { type: "code", content: "SELECT name, age, salary\nFROM employees\nWHERE age > 30\nORDER BY salary DESC\nLIMIT 10;" },
            { type: "list", items: [
              "SELECT: Какие колонки мы хотим получить (звездочка * означает 'все колонки').",
              "FROM: Из какой таблицы мы берем данные.",
              "WHERE: Условие фильтрации (работает до группировки данных).",
              "ORDER BY ... DESC: Сортировка по убыванию.",
              "LIMIT: Вернуть только первые N строк (чтобы не повесить базу данных миллионным выводом)."
            ]},
            { type: "tip", content: "Где практиковаться: SQLZoo. Это идеальная площадка для старта с пошаговыми уроками. Рекомендуем разделы 'SELECT basics' и 'SELECT from Nobel'." }
          ]
        },
        practice: {
          title: "Основы SELECT",
          description: "Извлечение и фильтрация данных.",
          task: "Выберите имена (name) и зарплаты (salary) сотрудников, которые работают в департаменте 'IT' и зарабатывают больше 100000.",
          starterCode: "-- Эмулятор SQL: У нас есть таблица 'users'\n-- Колонки: id, name, age, department, salary\n\nSELECT \nFROM users\nWHERE "
        },
        type: "sql"
      },
      {
        id: "sql-aggregation",
        title: "Агрегация: GROUP BY и HAVING",
        theory: {
          sections: [
            { type: "heading", content: "Математика в SQL" },
            { type: "text", content: "Если вам нужно посчитать бизнес-метрики (Средний чек, Количество активных пользователей за день, Суммарную выручку), вы не делаете это в Python! Вы делаете это в SQL с помощью агрегатных функций:" },
            { type: "list", items: [
              "COUNT(*) — считает количество строк.",
              "SUM(revenue) — суммирует значения в колонке.",
              "AVG(price) — вычисляет среднее арифметическое.",
              "MAX(age) / MIN(age) — находит максимум и минимум."
            ]},
            { type: "heading", content: "Магия GROUP BY" },
            { type: "text", content: "Сами по себе функции (например, AVG(salary)) вернут всего одно число для всей таблицы. Но в бизнесе нам нужны разрезы! Например, 'Покажи среднюю зарплату в разрезе каждого департамента'." },
            { type: "code", content: "SELECT department, AVG(salary) AS avg_salary\nFROM employees\nGROUP BY department;" },
            { type: "heading", content: "Разница между WHERE и HAVING" },
            { type: "text", content: "Это классический вопрос на собеседовании Junior Data Scientist!" },
            { type: "list", items: [
              "WHERE — фильтрует строки ДО того, как они будут сгруппированы. В WHERE нельзя писать агрегатные функции!",
              "HAVING — фильтрует данные ПОСЛЕ группировки. (Например: оставь только те департаменты, где COUNT(*) > 10)."
            ]},
            { type: "tip", content: "Где практиковаться: Mode SQL Tutorial. В их разделе 'Intermediate SQL' идеально расписана логика работы агрегатных функций на реальных маркетинговых данных." }
          ]
        },
        practice: {
          title: "Агрегация данных",
          description: "Используйте GROUP BY и агрегатные функции.",
          task: "Посчитайте суммарную выручку (SUM(amount)) для каждого статуса (status) в таблице orders.",
          starterCode: "-- Таблица 'orders' (id, user_id, amount, status)\n\nSELECT \nFROM orders\n"
        },
        type: "sql"
      },
      {
        id: "sql-join",
        title: "Связывание таблиц: JOIN",
        theory: {
          sections: [
            { type: "heading", content: "Почему базы данных 'Реляционные'?" },
            { type: "text", content: "В хорошей базе данных (RDBMS) информация никогда не хранится в одной огромной таблице (чтобы не было дублирования). Данные разбиты на сущности: таблица users (клиенты) и таблица orders (покупки). Между ними есть связь (Relation) через общие ключи." },
            { type: "list", items: [
              "Primary Key (Первичный ключ): Уникальный идентификатор строки (например, users.id).",
              "Foreign Key (Внешний ключ): Ссылка на другую таблицу (например, orders.user_id ссылается на users.id)."
            ]},
            { type: "heading", content: "Как работает JOIN?" },
            { type: "text", content: "Оператор JOIN склеивает две таблицы в одну по указанному условию (когда ключи совпадают)." },
            { type: "code", content: "SELECT users.name, orders.amount\nFROM users\nINNER JOIN orders ON users.id = orders.user_id;" },
            { type: "heading", content: "Виды JOIN'ов" },
            { type: "list", items: [
              "INNER JOIN: (Самый частый). Оставляет только те строки, для которых нашлось совпадение в ОБЕИХ таблицах.",
              "LEFT JOIN: Берет ВСЕ строки из левой таблицы и ищет совпадения в правой. Если пользователь ничего не покупал, он всё равно попадет в таблицу, а в колонке amount будет стоять пустота (NULL). Очень полезно для поиска неактивных клиентов!"
            ]},
            { type: "tip", content: "Где практиковаться: LeetCode SQL. Задачи на LEFT JOIN (например, 'найти пользователей, которые не сделали ни одного заказа') — это классика жанра на собеседованиях." }
          ]
        },
        practice: {
          title: "Соединение таблиц",
          description: "Используйте INNER JOIN для связи пользователей и заказов.",
          task: "Выведите Имя пользователя (users.name) и Сумму покупки (orders.amount). Соедините таблицы (INNER JOIN) по правилу: users.id = orders.user_id.",
          starterCode: "-- Таблицы 'users' (id, name) и 'orders' (id, user_id, amount)\n\nSELECT \nFROM users\nJOIN orders ON "
        },
        type: "sql"
      },
      {
        id: "sql-cte",
        title: "Чистый код: Подзапросы и CTE (WITH)",
        theory: {
          sections: [
            { type: "heading", content: "Подзапросы (Subqueries)" },
            { type: "text", content: "Иногда логика требует выполнить один запрос внутри другого. Например: 'Найди всех сотрудников, чья зарплата больше, чем средняя зарплата по всей компании'. Вы не знаете среднюю зарплату заранее, поэтому вычисляете её подзапросом в скобках:" },
            { type: "code", content: "SELECT name, salary\nFROM employees\nWHERE salary > ( SELECT AVG(salary) FROM employees );" },
            { type: "heading", content: "Решение проблемы спагетти-кода: CTE" },
            { type: "text", content: "Когда вы пишете аналитический запрос для бизнеса, в нем может быть 5 вложенных друг в друга подзапросов. Читать такой код невозможно. Оператор WITH позволяет вынести подзапрос наверх, дать ему понятное имя и обращаться к нему как к обычной таблице." },
            { type: "code", content: "WITH avg_salaries AS (\n    SELECT department, AVG(salary) AS avg_sal\n    FROM employees\n    GROUP BY department\n)\nSELECT e.name, e.salary, a.avg_sal\nFROM employees e\nJOIN avg_salaries a ON e.department = a.department;" },
            { type: "text", content: "В этом примере мы сначала собрали 'виртуальную таблицу' средних зарплат (CTE), а потом красиво сджойнили её с основной таблицей." }
          ]
        },
        practice: {
          title: "Использование подзапросов",
          description: "Отфильтруйте данные с помощью вложенного SELECT.",
          task: "Найдите элитных продавцов, чья выручка (revenue) СТРОГО БОЛЬШЕ, чем средняя выручка всех продавцов компании. Используйте WHERE revenue > (подзапрос AVG(revenue)).",
          starterCode: "-- Таблица 'sales' (id, user_name, revenue)\n\nSELECT user_name, revenue\nFROM sales\nWHERE revenue > (  );"
        },
        type: "sql"
      },
      {
        id: "sql-window",
        title: "Магия Аналитика: Оконные функции",
        theory: {
          sections: [
            { type: "heading", content: "Что такое Оконные Функции?" },
            { type: "text", content: "Это самое мощное оружие Data Scientist'а в SQL. Обычный GROUP BY 'схлопывает' строки. Оконная функция позволяет вычислить агрегацию (или ранг), сохраняя при этом ВСЕ оригинальные строки таблицы." },
            { type: "heading", content: "Синтаксис OVER (PARTITION BY)" },
            { type: "text", content: "Мы используем ключевое слово OVER. Внутри него мы указываем 'Окно' (блок данных), по которому будет идти расчет." },
            { type: "code", content: "SELECT\n    name,\n    department,\n    salary,\n    AVG(salary) OVER (PARTITION BY department) AS dept_avg\nFROM employees;" },
            { type: "text", content: "Этот код выведет имена всех сотрудников, их зарплаты, и рядом — новую колонку со средней зарплатой по ИХ департаменту. Данные не схлопнулись!" },
            { type: "heading", content: "Ранжирование (RANK и ROW_NUMBER)" },
            { type: "text", content: "Оконные функции идеальны для задач типа 'Топ-3 клиента в каждом городе'. Вы можете пронумеровать строки внутри окна!" },
            { type: "code", content: "ROW_NUMBER() OVER (PARTITION BY city ORDER BY purchase_amount DESC)" },
            { type: "tip", content: "В Mode SQL Tutorial есть шикарный раздел 'Advanced SQL: Window Functions'. Там на гифках показано, как 'Окно' скользит по таблице." }
          ]
        },
        practice: {
          title: "Оконные функции",
          description: "Рассчитайте агрегацию с сохранением строк.",
          task: "Выведите список сотрудников. Для каждого сотрудника рассчитайте МАКСИМАЛЬНУЮ зарплату в ЕГО департаменте (используя оконную функцию MAX(salary) OVER (PARTITION BY department)).",
          starterCode: "-- Таблица 'employees' (id, name, department, salary)\n\nSELECT \n    name, \n    department, \n    salary,\n    ... as max_dept_salary\nFROM employees;"
        },
        type: "sql"
      }
    ]
  }
};
