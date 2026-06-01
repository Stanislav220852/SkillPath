export const biState: Record<'EN' | 'RU', any> = {
  EN: {
    title: "BI & Dashboards (PRO)",
    description: "Tableau, Power BI, Metabase — transforming raw data into business value through visualization and data storytelling.",
    lessons: [
      {
        id: "bi-intro",
        title: "What is Business Intelligence?",
        theory: {
          sections: [
            { type: "heading", content: "Beyond Excel" },
            { type: "text", content: "Business Intelligence (BI) is the process of collecting, analyzing, and presenting data to help executives make business decisions. While Excel is great for ad-hoc analysis, it fails when you have 50 million rows of data that need to be updated daily." },
            { type: "text", content: "Modern BI tools connect directly to Data Warehouses (like PostgreSQL or Snowflake), process massive amounts of data, and display it on interactive dashboards accessible via a web browser." },
            { type: "heading", content: "The Role of a BI Analyst" },
            { type: "list", items: [
              "Data Prep: Writing SQL queries to extract clean datasets.",
              "Data Modeling: Connecting tables properly so the BI tool understands them.",
              "Visualization: Choosing the right charts to answer business questions."
            ]},
            { type: "tip", content: "Resource: Metabase. Metabase is an amazing open-source BI tool. It's heavily SQL-based and perfect for startups. You can run it locally in 5 minutes via Docker to practice building real dashboards connected to a database!" }
          ]
        },
        practice: {
          title: "Preparing Data for BI",
          description: "Write an aggregate SQL query to feed into a dashboard.",
          task: "BI tools love aggregated data. Write an SQL query to extract total sales (SUM(amount)) grouped by the 'region' column from the 'sales' table. This is exactly the query you would write inside Metabase to build a Bar Chart.",
          starterCode: "-- We need a table for a BI Bar Chart: Region vs Total Sales\n-- Table 'sales': id, region, amount, date\n\nSELECT \n    region, \n    \nFROM sales\nGROUP BY ;"
        },
        type: "sql"
      },
      {
        id: "bi-landscape",
        title: "The BI Landscape: Tableau vs Power BI",
        theory: {
          sections: [
            { type: "heading", content: "Choosing the Right Tool" },
            { type: "text", content: "The enterprise BI market is dominated by two giants, along with rising open-source contenders like Apache Superset." },
            { type: "list", items: [
              "Tableau: The king of visual analytics. It has a drag-and-drop interface that translates your actions into a proprietary query language (VizQL). It creates the most beautiful and customizable charts.",
              "Power BI: Microsoft's flagship. Deeply integrated with Excel and Azure. It is cheaper and dominates the corporate world. Its backend is essentially a massively powerful tabular data engine.",
              "Apache Superset / Metabase: Open-source tools. Often used by data-heavy engineering teams who prefer writing raw SQL over drag-and-drop."
            ]},
            { type: "tip", content: "Resource: Tableau Public. Tableau is expensive, but they offer 'Tableau Public' for free! It's like YouTube for dashboards. You can download the desktop app, connect to CSV/Excel files, and publish your interactive portfolio online. It is a MUST for your resume." }
          ]
        },
        practice: {
          title: "Simulating BI Aggregation",
          description: "Use Pandas to mimic how a BI tool aggregates data behind the scenes.",
          task: "When you drag 'Category' to rows and 'Profit' to values in Tableau, it runs a GroupBy. Simulate this in Pandas: group 'df' by 'Category' and calculate the sum of 'Profit'.",
          starterCode: "import pandas as pd\n\ndata = {\n    'Category': ['Tech', 'Furniture', 'Tech', 'Furniture', 'Toys'],\n    'Profit': [500, -100, 1200, 300, 50]\n}\ndf = pd.DataFrame(data)\n\n# Simulate Tableau's drag-and-drop aggregation\n# Group by 'Category' and SUM the 'Profit'\nbi_view = \n\nprint(bi_view)"
        },
        type: "python"
      },
      {
        id: "bi-data-modeling",
        title: "Data Modeling: The Star Schema",
        theory: {
          sections: [
            { type: "heading", content: "How BI tools read data" },
            { type: "text", content: "If you just import 10 random SQL tables into Power BI, it won't know how to filter them. You have to build a Data Model. The industry standard for BI is the Star Schema." },
            { type: "heading", content: "Fact and Dimension Tables" },
            { type: "list", items: [
              "Fact Table (The Center): Contains the measurable, quantitative data. Example: 'sales' table with columns like order_id, price, discount, date_id, product_id. It is huge and grows daily.",
              "Dimension Tables (The Points): Contain descriptive attributes to filter and group the facts. Example: 'products' table (product_id, category, brand) or 'calendar' table (date_id, year, month, holiday)."
            ]},
            { type: "text", content: "In the BI tool, you draw lines (Relationships) connecting the Dimension tables to the central Fact table, forming a Star shape." }
          ]
        },
        practice: {
          title: "Querying a Star Schema",
          description: "Write SQL to join a Fact table with Dimensions.",
          task: "Write a query to get the total revenue (SUM(f.amount)) by product category (d.category). Join the Fact table 'fact_sales' (alias f) with the Dimension table 'dim_products' (alias d) on product_id.",
          starterCode: "-- Fact table: fact_sales (id, product_id, amount)\n-- Dim table: dim_products (product_id, category, name)\n\nSELECT \n    d.category, \n    SUM(f.amount) as revenue\nFROM fact_sales f\nJOIN \nGROUP BY d.category;"
        },
        type: "sql"
      },
      {
        id: "bi-dax",
        title: "BI Logic: DAX and Calculated Fields",
        theory: {
          sections: [
            { type: "heading", content: "BI is not just Drag-and-Drop" },
            { type: "text", content: "Often, the metric the business wants doesn't exist in the database. You have to calculate it on the fly. In Tableau, these are called 'Calculated Fields'. In Power BI, you use a language called DAX (Data Analysis Expressions)." },
            { type: "heading", content: "Writing Measures" },
            { type: "text", content: "DAX looks like Excel formulas but operates on entire columns and tables rather than cells. For example, calculating Profit Margin isn't just (Profit / Revenue). It must be aggregated first:" },
            { type: "code", content: "Profit Margin % = DIVIDE( SUM(Sales[Profit]), SUM(Sales[Revenue]) )" },
            { type: "text", content: "DAX also has powerful Time Intelligence functions (e.g., SAMEPERIODLASTYEAR) to instantly compare current sales to the exact same day last year." },
            { type: "tip", content: "Resource: Power BI Docs. Microsoft's DAX documentation is essential. Understanding the difference between 'Row Context' and 'Filter Context' in DAX separates a junior Power BI user from a senior one." }
          ]
        },
        practice: {
          title: "Simulate a BI Calculated Field",
          description: "Calculate Profit Margin dynamically.",
          task: "We have Revenue and Cost data. Calculate the overall Profit Margin. First calculate total revenue (sum) and total cost (sum). Then profit = revenue - cost. Finally, margin = profit / revenue.",
          starterCode: "import pandas as pd\n\ndf = pd.DataFrame({\n    'Revenue': [100, 200, 300],\n    'Cost': [80, 150, 150]\n})\n\n# 1. Sum up total revenue and total cost\ntotal_rev = \ntotal_cost = \n\n# 2. Calculate total profit\ntotal_profit = \n\n# 3. Calculate Margin percentage\nmargin = \n\nprint(f\"Overall Profit Margin: {margin * 100:.1f}%\")"
        },
        type: "python"
      },
      {
        id: "bi-storytelling",
        title: "Data Storytelling & Dashboard Design",
        theory: {
          sections: [
            { type: "heading", content: "The 5-Second Rule" },
            { type: "text", content: "A dashboard is useless if a manager can't understand it in 5 seconds. Data Storytelling is the art of guiding the user's eye to the most important insight." },
            { type: "heading", content: "Golden Rules of BI Design" },
            { type: "list", items: [
              "The Z-Pattern: People read screens starting from Top-Left to Bottom-Right. Put your highest-level KPIs (Total Revenue, Active Users) in the top-left corner.",
              "Stop using Pie Charts: Human brains are terrible at comparing angles and areas. A Bar Chart is almost always better than a Pie Chart.",
              "Color has meaning: Don't use 10 different colors just to make it pretty. Use grey for background/context, and a bright accent color (like Red) ONLY to highlight anomalies or drop in sales."
            ]},
            { type: "text", content: "Your dashboard should answer a specific question (e.g., 'Why are sales dropping in Europe?'), not just vomit all available database tables onto a screen." }
          ]
        },
        practice: {
          title: "Create a Business Chart",
          description: "Use Plotly to build a clean bar chart.",
          task: "In Python, we use Plotly to create interactive, BI-like charts. Create a bar chart using px.bar(). Set x to 'Month' and y to 'Revenue'.",
          starterCode: "import pandas as pd\nimport plotly.express as px\n\ndata = {\n    'Month': ['Jan', 'Feb', 'Mar', 'Apr'],\n    'Revenue': [12000, 15000, 9000, 18000]\n}\ndf = pd.DataFrame(data)\n\n# Create a clean, business-ready Bar Chart\nfig = \n\n# In a real app you'd call fig.show()\nprint(\"Chart configured successfully. Ready for the Dashboard!\")"
        },
        type: "python"
      }
    ]
  },
  RU: {
    title: "BI & Дашборды (PRO)",
    description: "Tableau, Power BI, Superset — визуализация для бизнеса, моделирование данных и Data Storytelling.",
    lessons: [
      {
        id: "bi-intro",
        title: "Что такое Business Intelligence?",
        theory: {
          sections: [
            { type: "heading", content: "Жизнь за пределами Excel" },
            { type: "text", content: "Business Intelligence (BI) — это процесс сбора, анализа и визуализации данных для помощи бизнесу в принятии решений. Excel отлично подходит для разовых расчетов, но он 'умирает', когда у вас 50 миллионов строк данных, которые должны обновляться каждое утро." },
            { type: "text", content: "Современные BI-инструменты подключаются напрямую к хранилищам данных (PostgreSQL, ClickHouse), мгновенно обрабатывают гигабайты информации и выводят её на интерактивные дашборды в браузере." },
            { type: "heading", content: "Роль BI-аналитика" },
            { type: "list", items: [
              "Подготовка данных: Написание SQL-запросов для выгрузки чистых витрин данных.",
              "Моделирование: Настройка связей между таблицами внутри BI-инструмента.",
              "Визуализация: Выбор правильных графиков, чтобы ответить на вопросы бизнеса."
            ]},
            { type: "tip", content: "Ресурс: Metabase. Это потрясающий Open-Source BI инструмент. Он работает поверх SQL и идеален для стартапов. Вы можете поднять его локально через Docker за 5 минут и попрактиковаться в создании реальных дашбордов, подключив его к базе данных!" }
          ]
        },
        practice: {
          title: "Подготовка витрины данных",
          description: "Напишите агрегирующий SQL-запрос для дашборда.",
          task: "BI-инструменты обожают агрегированные данные. Напишите SQL-запрос для извлечения суммы продаж (SUM(amount)) с группировкой по колонке 'region' из таблицы 'sales'. Именно такой запрос генерирует Metabase под капотом при создании Bar Chart.",
          starterCode: "-- Готовим данные для BI графика: Выручка по Регионам\n-- Таблица 'sales': id, region, amount, date\n\nSELECT \n    region, \n    \nFROM sales\nGROUP BY ;"
        },
        type: "sql"
      },
      {
        id: "bi-landscape",
        title: "Обзор рынка: Tableau, Power BI и Superset",
        theory: {
          sections: [
            { type: "heading", content: "Выбор правильного инструмента" },
            { type: "text", content: "На корпоративном BI-рынке доминируют два гиганта, но Open-Source решения активно набирают популярность." },
            { type: "list", items: [
              "Tableau: Король визуальной аналитики. Имеет интерфейс drag-and-drop, который переводит ваши действия в запатентованный язык VizQL. Позволяет создавать самые красивые и кастомные графики на рынке.",
              "Power BI: Флагман от Microsoft. Глубоко интегрирован с Excel и Azure. Дешевле конкурентов, поэтому захватил корпоративный мир. Под капотом — мощнейший движок для табличных данных.",
              "Apache Superset / Metabase: Бесплатные Open-Source инструменты. Их обожают команды инженеров данных, которые предпочитают писать чистый SQL вместо перетаскивания элементов мышкой."
            ]},
            { type: "tip", content: "Ресурс: Tableau Public. Лицензия Tableau стоит дорого, но они сделали 'Tableau Public' — бесплатный аналог YouTube для дашбордов. Скачайте приложение, подключите Excel/CSV файл, сделайте дашборд и опубликуйте его в сети. Ссылка на Tableau Public профиль — это абсолютный MUST HAVE в резюме BI-аналитика." }
          ]
        },
        practice: {
          title: "Имитация работы BI-движка",
          description: "Используйте Pandas для симуляции агрегации.",
          task: "Когда в Tableau вы перетаскиваете 'Category' в строки, а 'Profit' в значения, под капотом происходит GroupBy. Сымитируйте это в Pandas: сгруппируйте датафрейм 'df' по 'Category' и посчитайте сумму (.sum()) для 'Profit'.",
          starterCode: "import pandas as pd\n\ndata = {\n    'Category': ['Tech', 'Furniture', 'Tech', 'Furniture', 'Toys'],\n    'Profit': [500, -100, 1200, 300, 50]\n}\ndf = pd.DataFrame(data)\n\n# Симуляция drag-and-drop в Tableau\n# Группируем по Category и суммируем Profit\nbi_view = \n\nprint(bi_view)"
        },
        type: "python"
      },
      {
        id: "bi-data-modeling",
        title: "Моделирование данных: Схема Звезда",
        theory: {
          sections: [
            { type: "heading", content: "Как BI-системы понимают данные" },
            { type: "text", content: "Если вы просто загрузите 10 случайных таблиц в Power BI, он не поймет, как их фильтровать. Вы должны построить Модель Данных. Золотой стандарт индустрии — это Схема Звезда (Star Schema)." },
            { type: "heading", content: "Таблицы Фактов и Измерений" },
            { type: "list", items: [
              "Таблица Фактов (Центр звезды): Содержит измеримые, количественные данные. Пример: таблица 'sales' (order_id, price, discount, date_id, product_id). Она гигантская и растет каждый день.",
              "Таблицы Измерений (Лучи звезды): Содержат описательные атрибуты для фильтрации фактов. Пример: таблица 'products' (product_id, category, brand) или календарь 'dates' (date_id, year, month)."
            ]},
            { type: "text", content: "В интерфейсе BI вы рисуете линии (Связи), соединяющие таблицы Измерений с центральной таблицей Фактов." }
          ]
        },
        practice: {
          title: "Запрос к Схеме Звезда",
          description: "Напишите SQL JOIN для объединения Фактов и Измерений.",
          task: "Напишите запрос для получения общей выручки (SUM(f.amount)) в разрезе категорий товаров (d.category). Соедините таблицу фактов 'fact_sales' (алиас f) с таблицей измерений 'dim_products' (алиас d) по ключу product_id.",
          starterCode: "-- Таблица Фактов: fact_sales (id, product_id, amount)\n-- Таблица Измерений: dim_products (product_id, category, name)\n\nSELECT \n    d.category, \n    SUM(f.amount) as revenue\nFROM fact_sales f\nJOIN \nGROUP BY d.category;"
        },
        type: "sql"
      },
      {
        id: "bi-dax",
        title: "Логика BI: DAX и Вычисляемые поля",
        theory: {
          sections: [
            { type: "heading", content: "BI — это не только мышка" },
            { type: "text", content: "Часто нужной бизнесу метрики просто нет в базе данных. Ее нужно вычислить 'на лету'. В Tableau это называется 'Вычисляемые поля' (Calculated Fields). В Power BI для этого используется целый язык программирования — DAX (Data Analysis Expressions)." },
            { type: "heading", content: "Написание Мер (Measures)" },
            { type: "text", content: "DAX похож на формулы Excel, но работает не с ячейками, а с целыми колонками и таблицами. Например, расчет маржинальности (Profit Margin) — это не просто (Прибыль / Выручку) в каждой строке. Данные сначала нужно сагрегировать:" },
            { type: "code", content: "Profit Margin % = DIVIDE( SUM(Sales[Profit]), SUM(Sales[Revenue]) )" },
            { type: "text", content: "DAX также имеет мощные функции Анализа Времени (Time Intelligence). Например, функция SAMEPERIODLASTYEAR позволяет в один клик сравнить продажи за сегодня с продажами ровно в этот же день год назад." },
            { type: "tip", content: "Ресурс: Power BI Docs. Документация Microsoft по DAX обязательна к изучению. Понимание разницы между 'Контекстом строки' (Row Context) и 'Контекстом фильтра' (Filter Context) — это то, что отличает Junior BI специалиста от Senior." }
          ]
        },
        practice: {
          title: "Симуляция вычисляемого поля",
          description: "Рассчитайте маржинальность динамически.",
          task: "У нас есть данные о Выручке (Revenue) и Затратах (Cost). Рассчитайте общую маржинальность (Margin). Сначала найдите сумму выручки и сумму затрат. Прибыль (profit) = выручка - затраты. Маржинальность = прибыль / выручка.",
          starterCode: "import pandas as pd\n\ndf = pd.DataFrame({\n    'Revenue': [100, 200, 300],\n    'Cost': [80, 150, 150]\n})\n\n# 1. Суммируем колонки\ntotal_rev = \ntotal_cost = \n\n# 2. Вычисляем общую прибыль\ntotal_profit = \n\n# 3. Считаем % маржинальности\nmargin = \n\nprint(f\"Общая маржинальность: {margin * 100:.1f}%\")"
        },
        type: "python"
      },
      {
        id: "bi-storytelling",
        title: "Data Storytelling и Дизайн Дашбордов",
        theory: {
          sections: [
            { type: "heading", content: "Правило 5 секунд" },
            { type: "text", content: "Дашборд бесполезен, если директор не может понять ситуацию в компании за 5 секунд. Data Storytelling (Сторителлинг данных) — это искусство направлять взгляд пользователя на самые важные инсайты." },
            { type: "heading", content: "Золотые правила дизайна BI" },
            { type: "list", items: [
              "Z-Паттерн: Люди читают экраны слева-направо и сверху-вниз. Размещайте самые главные KPI (Общая выручка, Активные юзеры) крупным шрифтом в левом верхнем углу.",
              "Хватит использовать Круговые Диаграммы (Pie Charts): Человеческий мозг ужасно плохо сравнивает углы и площади. Обычный Bar Chart (столбцы) в 99% случаев лучше и понятнее.",
              "Цвет имеет смысл: Не используйте 10 разных цветов просто для красоты. Используйте серый цвет для фона и контекста, и яркий акцентный цвет (например, Красный) ТОЛЬКО для выделения аномалий или падения продаж."
            ]},
            { type: "text", content: "Ваш дашборд должен отвечать на конкретный вопрос бизнеса (например, 'Почему падают продажи в Европе?'), а не просто вываливать все таблицы из базы данных на один экран." }
          ]
        },
        practice: {
          title: "Сборка бизнес-графика",
          description: "Используйте Plotly для создания чистого графика.",
          task: "В Python для создания бизнес-дашбордов часто используют Plotly. Создайте столбчатую диаграмму, используя функцию px.bar(). Укажите ось X как 'Month', а ось Y как 'Revenue'.",
          starterCode: "import pandas as pd\nimport plotly.express as px\n\ndata = {\n    'Month': ['Jan', 'Feb', 'Mar', 'Apr'],\n    'Revenue': [12000, 15000, 9000, 18000]\n}\ndf = pd.DataFrame(data)\n\n# Создаем строгий и понятный Bar Chart\nfig = \n\n# В реальном приложении (Streamlit/Dash) мы бы вызвали fig.show()\nprint(\"График успешно сконфигурирован для Дашборда!\")"
        },
        type: "python"
      }
    ]
  }
};