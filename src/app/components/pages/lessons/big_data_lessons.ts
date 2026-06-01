export const bigDataState: Record<'EN' | 'RU', any> = {
  EN: {
    title: "Big Data (PRO)",
    description: "Spark, Hadoop — processing data on an industrial scale. Learn to handle terabytes of data across distributed clusters.",
    lessons: [
      {
        id: "bd-intro-hadoop",
        title: "The 3 Vs & Hadoop MapReduce",
        theory: {
          sections: [
            { type: "heading", content: "When does Data become 'Big'?" },
            { type: "text", content: "You don't need Big Data tools for a 10GB Excel file. Data becomes 'Big' when it breaks the rules of traditional databases. It is defined by the 3 Vs:" },
            { type: "list", items: [
              "Volume: Terabytes and Petabytes of data (doesn't fit on one hard drive).",
              "Velocity: Millions of events streaming in per second (e.g., Netflix clicks, IoT sensors).",
              "Variety: Unstructured data (JSON, images, logs, text) instead of neat SQL tables."
            ]},
            { type: "heading", content: "Hadoop: The Pioneer" },
            { type: "text", content: "Before Hadoop, companies bought massive, expensive supercomputers. Hadoop changed the game by allowing data to be processed on a cluster of cheap, ordinary computers. It has two main parts:" },
            { type: "list", items: [
              "HDFS (Hadoop Distributed File System): Splits a huge 1TB file into 128MB chunks and scatters them across 100 different servers.",
              "MapReduce: Instead of moving the 1TB data to the code (which would melt the network), MapReduce sends the CODE to the 100 servers. They process their chunks locally (Map) and then combine the results (Reduce)."
            ]},
            { type: "tip", content: "Resource: Coursera Big Data. If you want to understand the foundational math and logic of distributed systems and how Hadoop changed the world, the 'Big Data Specialization' on Coursera (by UC San Diego) is a classic starting point." }
          ]
        },
        practice: {
          title: "MapReduce Concept",
          description: "Simulate the Map and Reduce phases in Python.",
          task: "In Python, the built-in map() and reduce() functions mimic this distributed behavior. 1. Use map() with a lambda to square every number in the list. 2. Use reduce() to sum all the squared numbers.",
          starterCode: "from functools import reduce\n\ndata_chunk = [1, 2, 3, 4, 5]\n\n# 1. Map Phase: Square each number\n# Output should be: [1, 4, 9, 16, 25]\nmapped_data = list(map(lambda x: x**2, data_chunk))\n\n# 2. Reduce Phase: Sum the results\n# reduce takes a function of 2 arguments and applies it cumulatively\nfinal_sum = \n\nprint(\"Mapped:\", mapped_data)\nprint(\"Final Sum:\", final_sum)"
        },
        type: "python"
      },
      {
        id: "bd-spark-revolution",
        title: "The Apache Spark Revolution",
        theory: {
          sections: [
            { type: "heading", content: "Why did Hadoop MapReduce die?" },
            { type: "text", content: "Hadoop MapReduce was revolutionary, but it had a fatal flaw: after every 'Map' step, it wrote the intermediate results back to the physical Hard Drive. Reading and writing to disk is incredibly slow. Machine Learning algorithms (which require hundreds of iterations over the same data) took weeks to train." },
            { type: "heading", content: "Enter Apache Spark (In-Memory Computing)" },
            { type: "text", content: "Apache Spark was created to solve this. Instead of writing to disk, Spark keeps all intermediate data in RAM (In-Memory). This makes Spark up to 100x faster than Hadoop MapReduce for certain tasks!" },
            { type: "heading", content: "Resilient Distributed Datasets (RDDs)" },
            { type: "text", content: "Under the hood, Spark uses RDDs. Think of an RDD as a giant Python list that is magically split across 50 different computers. If one computer crashes during computation, Spark remembers how that piece of data was created and instantly recalculates it on another surviving node (Resilience)." },
            { type: "tip", content: "Resource: Apache Spark Docs. The official spark.apache.org documentation is excellent. Always refer to the 'Spark SQL and DataFrames' section, as raw RDDs are rarely used directly in modern code." }
          ]
        },
        practice: {
          title: "Spark Initialization",
          description: "Learn how a Spark Session is created.",
          task: "In PySpark, everything starts with a SparkSession. Write the standard boilerplate code to initialize a local Spark session named 'BigDataApp'.",
          starterCode: "# Note: In a real environment, you import pyspark.sql\n# from pyspark.sql import SparkSession\n\n# Initialize the Spark Session\nspark = (SparkSession\n    .builder\n    .appName(\"BigDataApp\")\n    .getOrCreate())\n\nprint(\"Spark Cluster is ready!\")"
        },
        type: "python"
      },
      {
        id: "bd-lazy-evaluation",
        title: "The Most Important Concept: Lazy Evaluation",
        theory: {
          sections: [
            { type: "heading", content: "Transformations vs. Actions" },
            { type: "text", content: "This is the #1 interview question for Big Data Engineers. Spark operations are divided into two types:" },
            { type: "list", items: [
              "Transformations (e.g., .filter(), .select(), .groupBy()): These do absolutely NOTHING immediately. Spark just takes notes and builds a map of what you want to do (a DAG - Directed Acyclic Graph).",
              "Actions (e.g., .show(), .count(), .write()): This is the trigger. When you call an Action, Spark looks at its notes, optimizes the entire execution plan, and finally runs the code across the cluster."
            ]},
            { type: "heading", content: "Why be Lazy?" },
            { type: "text", content: "Imagine you load a 10TB dataset, filter out 99% of the rows, and take the top 5 results. If Spark wasn't lazy, it would load 10TB into RAM, crash the servers, and then filter. Because it is lazy, the optimizer sees the plan, pushes the filter down to the hard drive, reads only 100MB, and finishes in seconds! Laziness equals optimization." }
          ]
        },
        practice: {
          title: "Lazy vs Eager",
          description: "Identify Transformations and Actions.",
          task: "Look at the PySpark code below. Add comments identifying which lines are Transformations (Lazy) and which line is an Action (Trigger).",
          starterCode: "# Assuming 'df' is a 5-Terabyte Spark DataFrame\n\n# 1. Is this a Transformation or Action?\nfiltered_df = df.filter(df.age > 30)\n\n# 2. Is this a Transformation or Action?\nselected_df = filtered_df.select('name', 'salary')\n\n# 3. Is this a Transformation or Action?\nresult_count = selected_df.count()\n\nprint(\"Execution only happened at step 3!\")"
        },
        type: "python"
      },
      {
        id: "bd-pyspark-dataframes",
        title: "PySpark DataFrames: Pandas on Steroids",
        theory: {
          sections: [
            { type: "heading", content: "Pandas vs PySpark" },
            { type: "text", content: "Pandas is great, but it runs on a single CPU core. If your CSV is 50GB and you have 16GB of RAM, Pandas will crash with an 'Out of Memory' error. PySpark DataFrames look and feel like Pandas, but they distribute the data across a cluster of machines." },
            { type: "heading", content: "Syntax Differences" },
            { type: "text", content: "While the concepts are similar, the syntax differs because Spark uses SQL-like expressions under the hood." },
            { type: "code", content: "# Pandas:\ndf[df['salary'] > 50000]\n\n# PySpark:\ndf.filter(df.salary > 50000)\n# or\ndf.filter(\"salary > 50000\")" },
            { type: "text", content: "In PySpark, you often use the 'pyspark.sql.functions' module (usually imported as 'F'). It contains hundreds of optimized functions for string manipulation, dates, and math." }
          ]
        },
        practice: {
          title: "PySpark DataFrame Syntax",
          description: "Write basic PySpark filtering and aggregation.",
          task: "Using PySpark syntax, write the code to group the DataFrame by 'department' and calculate the average (mean) salary.",
          starterCode: "# import pyspark.sql.functions as F\n\n# We have a PySpark DataFrame 'df' with columns: name, department, salary\n\n# 1. Filter only IT department\nit_df = df.filter(df.department == \"IT\")\n\n# 2. Group by department and calculate average salary\n# Syntax: df.groupBy(\"col\").agg(F.avg(\"col\"))\navg_salary_df = \n\n# 3. Trigger the action to see results\navg_salary_df.show()"
        },
        type: "python"
      },
      {
        id: "bd-databricks-lakehouse",
        title: "Databricks & The Lakehouse Architecture",
        theory: {
          sections: [
            { type: "heading", content: "The Pain of Managing Clusters" },
            { type: "text", content: "Writing Spark code is fun. Setting up a cluster of 50 Linux servers, installing Java, configuring network ports, and managing Spark versions is a nightmare. Data Scientists want to analyze data, not act as DevOps engineers." },
            { type: "heading", content: "Enter Databricks" },
            { type: "text", content: "Databricks is a cloud platform founded by the original creators of Apache Spark. It provides 'Managed Spark'. You literally press a 'Start Cluster' button in your browser, and AWS/Azure spins up 50 servers for you. It also gives you Jupyter-like notebooks that are natively connected to the cluster." },
            { type: "heading", content: "Data Lake + Data Warehouse = Lakehouse" },
            { type: "text", content: "Traditionally, companies dumped raw, messy data into Data Lakes (cheap storage), and then moved clean data into Data Warehouses (expensive, structured SQL). Databricks pioneered the 'Lakehouse' pattern. Using the open-source Delta Lake format, they brought ACID transactions (reliability, time-travel, updates) directly to raw Parquet files in the Data Lake. Now you can run fast SQL and Machine Learning directly on cheap storage!" },
            { type: "tip", content: "Resource: Databricks Community Edition. You can register for a free Databricks Community account. They will give you a free micro-cluster and a notebook environment where you can practice PySpark without paying for AWS servers!" }
          ]
        },
        practice: {
          title: "Writing to Delta Lake",
          description: "Simulate writing data in the Lakehouse format.",
          task: "In Databricks, writing data as a reliable Delta table is as easy as changing the format string. Write the PySpark command to save a DataFrame 'df' in 'delta' format.",
          starterCode: "# We have a cleaned DataFrame 'clean_df'\n\n# 1. Write the DataFrame to storage in Delta format\n# Syntax: df.write.format(\"delta\").save(\"/path/to/storage\")\n\n\nprint(\"Data saved successfully with ACID guarantees in the Lakehouse!\")"
        },
        type: "python"
      }
    ]
  },
  RU: {
    title: "Big Data (PRO)",
    description: "Spark, Hadoop — обработка данных в промышленных масштабах. Переход от локальных датасетов к терабайтам в кластерах.",
    lessons: [
      {
        id: "bd-intro-hadoop",
        title: "Правило 3V и Hadoop MapReduce",
        theory: {
          sections: [
            { type: "heading", content: "Когда данные становятся 'Большими'?" },
            { type: "text", content: "Вам не нужны технологии Big Data для Excel-файла на 10 ГБ. Данные становятся 'Большими', когда они нарушают правила традиционных баз данных. Это описывается правилом 3V:" },
            { type: "list", items: [
              "Volume (Объем): Терабайты и Петабайты данных (не влезают на один жесткий диск).",
              "Velocity (Скорость): Миллионы событий, поступающих в секунду (клики в Netflix, датчики IoT).",
              "Variety (Разнообразие): Неструктурированные данные (JSON, картинки, логи) вместо аккуратных SQL таблиц."
            ]},
            { type: "heading", content: "Hadoop: Первопроходец" },
            { type: "text", content: "До Hadoop компании покупали гигантские, невероятно дорогие суперкомпьютеры. Hadoop изменил правила игры: он позволил обрабатывать данные на кластере из сотен дешевых, обычных компьютеров. Он состоит из двух частей:" },
            { type: "list", items: [
              "HDFS (Hadoop Distributed File System): Берет огромный файл на 1ТБ, режет его на куски по 128МБ и раскидывает по 100 разным серверам.",
              "MapReduce: Вместо того чтобы перекачивать 1ТБ данных к коду (что сожгло бы локальную сеть), MapReduce отправляет КОД на эти 100 серверов. Серверы локально обрабатывают свои куски (Map), а потом центральный узел собирает результаты вместе (Reduce)."
            ]},
            { type: "tip", content: "Ресурс: Coursera Big Data. Если вы хотите понять фундаментальную математику распределенных систем и то, как Hadoop перевернул мир, специализация 'Big Data' на Coursera (от UC San Diego) — это классика." }
          ]
        },
        practice: {
          title: "Концепция MapReduce",
          description: "Симуляция фаз Map и Reduce в Python.",
          task: "Встроенные функции Python map() и reduce() отлично имитируют это поведение. 1. Используйте map() и lambda, чтобы возвести каждое число в квадрат. 2. Используйте reduce(), чтобы просуммировать все квадраты.",
          starterCode: "from functools import reduce\n\ndata_chunk = [1, 2, 3, 4, 5]\n\n# 1. Фаза Map: Возводим в квадрат каждый элемент локально\n# Ожидаемый результат: [1, 4, 9, 16, 25]\nmapped_data = list(map(lambda x: x**2, data_chunk))\n\n# 2. Фаза Reduce: Собираем (суммируем) результаты\n# reduce принимает функцию из 2 аргументов и применяет ее накопительно\nfinal_sum = \n\nprint(\"После Map:\", mapped_data)\nprint(\"Финальная сумма (Reduce):\", final_sum)"
        },
        type: "python"
      },
      {
        id: "bd-spark-revolution",
        title: "Революция Apache Spark",
        theory: {
          sections: [
            { type: "heading", content: "Почему умер Hadoop MapReduce?" },
            { type: "text", content: "Hadoop был прорывом, но имел фатальный недостаток: после каждого шага вычислений он сохранял промежуточные результаты обратно на жесткий диск (HDD). Чтение и запись на диск — это очень медленно. Алгоритмы машинного обучения, требующие сотен проходов по одним и тем же данным, обучались неделями." },
            { type: "heading", content: "Появление Apache Spark (In-Memory Computing)" },
            { type: "text", content: "Spark был создан, чтобы решить эту проблему. Вместо записи на диск, Spark хранит все промежуточные данные в оперативной памяти (In-Memory). Это сделало Spark до 100 раз быстрее, чем Hadoop MapReduce!" },
            { type: "heading", content: "RDD (Resilient Distributed Datasets)" },
            { type: "text", content: "Под капотом Spark использует RDD. Представьте RDD как огромный Python-список, который магически разрезан и распределен по 50 компьютерам. Если один компьютер сгорит во время вычислений, Spark помнит 'рецепт', как этот кусок данных был создан, и мгновенно пересчитает его на другом выжившем узле (Resilience — Отказоустойчивость)." },
            { type: "tip", content: "Ресурс: Apache Spark Docs. Официальная документация (spark.apache.org) великолепна. Всегда обращайтесь к разделу 'Spark SQL and DataFrames', так как сырые RDD в современном коде почти не используются." }
          ]
        },
        practice: {
          title: "Инициализация Spark",
          description: "Узнайте, с чего начинается любой Spark-скрипт.",
          task: "В PySpark всё начинается с создания сессии. Допишите стандартный шаблонный код (Boilerplate) для инициализации SparkSession с именем приложения 'BigDataApp'.",
          starterCode: "# Примечание: в реальной среде вы пишете импорт\n# from pyspark.sql import SparkSession\n\n# Инициализация Spark сессии\nspark = (SparkSession\n    .builder\n    .appName(\"BigDataApp\")\n    .getOrCreate())\n\nprint(\"Spark Кластер готов к работе!\")"
        },
        type: "python"
      },
      {
        id: "bd-lazy-evaluation",
        title: "Главный концепт: Ленивые вычисления (Lazy Evaluation)",
        theory: {
          sections: [
            { type: "heading", content: "Трансформации против Экшенов" },
            { type: "text", content: "Это вопрос №1 на любом собеседовании дата-инженера. Операции в Spark делятся на два типа:" },
            { type: "list", items: [
              "Трансформации (Transformations): например, .filter(), .select(), .groupBy(). Они НЕ ВЫПОЛНЯЮТСЯ сразу. Spark просто записывает в блокнот план действий, строя граф вычислений (DAG).",
              "Действия (Actions): например, .show(), .count(), .write(). Это спусковой крючок (Триггер). Когда вы вызываете Action, Spark смотрит в свой блокнот, оптимизирует весь план целиком и только тогда запускает реальные вычисления на кластере."
            ]},
            { type: "heading", content: "Зачем быть ленивым?" },
            { type: "text", content: "Представьте, что вы загружаете датасет на 10 Терабайт, отфильтровываете 99% строк и запрашиваете ТОП-5 результатов. Если бы Spark не был ленивым, он попытался бы загрузить 10 ТБ в оперативную память, обрушил бы все сервера, а потом начал фильтровать. Но благодаря лени, Оптимизатор видит финальную цель, отправляет фильтр прямо на жесткий диск, считывает только 100 МБ нужных данных и выдает результат за секунды! Лень = Оптимизация." }
          ]
        },
        practice: {
          title: "Lazy vs Eager",
          description: "Определите Трансформации и Действия.",
          task: "Посмотрите на PySpark код ниже. Напишите в комментариях, какие строки являются Трансформациями (Lazy), а какая строка является Действием (Action Trigger).",
          starterCode: "# Допустим, 'df' - это 5-терабайтный Spark DataFrame\n\n# 1. Это Трансформация или Action?\nfiltered_df = df.filter(df.age > 30)\n\n# 2. Это Трансформация или Action?\nselected_df = filtered_df.select('name', 'salary')\n\n# 3. Это Трансформация или Action?\nresult_count = selected_df.count()\n\nprint(\"Фактические вычисления произошли только на шаге 3!\")"
        },
        type: "python"
      },
      {
        id: "bd-pyspark-dataframes",
        title: "PySpark DataFrames: Pandas на максималках",
        theory: {
          sections: [
            { type: "heading", content: "Pandas vs PySpark" },
            { type: "text", content: "Pandas — прекрасен, но он работает на одном ядре процессора. Если ваш CSV файл весит 50 ГБ, а у вас 16 ГБ оперативной памяти, Pandas просто упадет с ошибкой 'Out of Memory'. PySpark DataFrames внешне очень похожи на Pandas, но они магическим образом распределяют вычисления по кластеру из десятков серверов." },
            { type: "heading", content: "Отличия в синтаксисе" },
            { type: "text", content: "Концепции похожи, но синтаксис отличается, так как под капотом Spark использует SQL-подобные выражения." },
            { type: "code", content: "# Pandas:\ndf[df['salary'] > 50000]\n\n# PySpark:\ndf.filter(df.salary > 50000)\n# или даже строкой:\ndf.filter(\"salary > 50000\")" },
            { type: "text", content: "В PySpark вы постоянно будете использовать модуль 'pyspark.sql.functions' (обычно его импортируют как 'F'). В нем сотни оптимизированных функций для работы с текстом, датами и математикой." }
          ]
        },
        practice: {
          title: "Синтаксис PySpark DataFrame",
          description: "Напишите базовую фильтрацию и агрегацию.",
          task: "Используя синтаксис PySpark, напишите код для группировки датафрейма по отделу ('department') и вычисления средней зарплаты.",
          starterCode: "# import pyspark.sql.functions as F\n\n# У нас есть PySpark DataFrame 'df' с колонками: name, department, salary\n\n# 1. Фильтруем только IT отдел\nit_df = df.filter(df.department == \"IT\")\n\n# 2. Группируем по отделу и считаем среднюю зарплату\n# Синтаксис: df.groupBy(\"col\").agg(F.avg(\"col\"))\navg_salary_df = \n\n# 3. Запускаем Action, чтобы увидеть результат на экране\navg_salary_df.show()"
        },
        type: "python"
      },
      {
        id: "bd-databricks-lakehouse",
        title: "Databricks и Архитектура Lakehouse",
        theory: {
          sections: [
            { type: "heading", content: "Боль настройки кластеров" },
            { type: "text", content: "Писать код на Spark — это удовольствие. А вот настраивать кластер из 50 Linux серверов, устанавливать Java, пробрасывать порты и следить за версиями Spark — это ад. Data Scientist'ы хотят анализировать данные, а не быть DevOps-инженерами." },
            { type: "heading", content: "Появление Databricks" },
            { type: "text", content: "Databricks — это облачная платформа, созданная оригинальными разработчиками Apache Spark. Она предоставляет 'Управляемый Spark' (Managed Spark). Вы буквально нажимаете кнопку 'Start Cluster' в браузере, и AWS или Azure сами поднимают 50 серверов. Вам также дают удобные Notebooks (как Jupyter), которые уже подключены к этому кластеру." },
            { type: "heading", content: "Lakehouse: Слияние Озер и Хранилищ" },
            { type: "text", content: "Исторически компании сбрасывали сырые данные в Data Lakes (дешевое файловое хранилище), а потом переносили чистые данные в Data Warehouses (дорогие SQL-базы). Databricks придумала архитектуру 'Lakehouse'. Используя открытый формат Delta Lake, они привнесли ACID-транзакции (надежность, UPDATE/DELETE, 'путешествия во времени') прямо в сырые Parquet файлы в Data Lake. Теперь можно запускать быстрый SQL и Machine Learning прямо поверх дешевого хранилища!" },
            { type: "tip", content: "Ресурс: Databricks Community Edition. Вы можете бесплатно зарегистрироваться в Databricks Community. Они дадут вам бесплатный микро-кластер и среду с ноутбуками, где вы сможете практиковать PySpark, не платя за сервера AWS!" }
          ]
        },
        practice: {
          title: "Запись в Delta Lake",
          description: "Симуляция сохранения данных в формате Lakehouse.",
          task: "В Databricks сохранение данных в надежную Delta-таблицу — это просто смена формата в коде. Напишите команду PySpark для сохранения датафрейма 'df' в формате 'delta'.",
          starterCode: "# У нас есть очищенный DataFrame 'clean_df'\n\n# 1. Сохраняем DataFrame в хранилище в формате Delta\n# Синтаксис: df.write.format(\"delta\").save(\"/path/to/storage\")\n\n\nprint(\"Данные успешно сохранены с ACID-гарантиями в архитектуре Lakehouse!\")"
        },
        type: "python"
      }
    ]
  }
};