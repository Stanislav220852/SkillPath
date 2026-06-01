export const monitoringLogsState: Record<'EN' | 'RU', any> = {
  EN: {
    title: "Monitoring & Logs (PRO)",
    description: "Prometheus, Grafana, ELK stack, and Alerting. Learn to keep production systems alive and sleep soundly at night.",
    lessons: [
      {
        id: "mon-observability",
        title: "The 3 Pillars of Observability",
        theory: {
          sections: [
            { type: "heading", content: "Production is Dark and Full of Terrors" },
            { type: "text", content: "When you have 50 microservices running on 500 Kubernetes Pods, and a user complains 'checkout is slow', how do you find the problem? SSHing into servers to run `grep` is impossible. You need Observability." },
            { type: "heading", content: "The Three Pillars" },
            { type: "text", content: "Observability is built on three fundamental data types:" },
            { type: "list", items: [
              "1. Metrics (Prometheus): Numbers over time. E.g., 'CPU usage is at 85%', 'We have 500 requests per second'. Metrics are cheap to store and great for triggering Alerts.",
              "2. Logs (ELK Stack): Text records of specific events. E.g., 'User 123 failed to login due to wrong password'. Logs provide deep context when a metric spikes.",
              "3. Traces (Jaeger / Tempo): The journey of a single request across multiple microservices. 'Request took 2s: 0.1s in Auth, 1.8s in Database, 0.1s in Payment'."
            ]},
            { type: "text", content: "A Senior DevOps engineer builds infrastructure to collect and correlate all three." }
          ]
        },
        practice: {
          title: "Identify the Pillar",
          description: "Match the scenario to the correct Observability pillar.",
          task: "This is a mental exercise. Read the scenarios in the comments and assign the correct tool/pillar (Metrics, Logs, or Traces) that you would use to solve the problem.",
          starterCode: "# Scenario 1: You want to trigger a Slack alert if the server's RAM is > 90%.\n# Tool to use: \n\n# Scenario 2: You want to see the exact SQL query that caused an error for User ID 99.\n# Tool to use: \n\n# Scenario 3: A user request to /checkout took 5 seconds. You need to know exactly which backend microservice caused the delay.\n# Tool to use: "
        },
        type: "yaml"
      },
      {
        id: "mon-prometheus",
        title: "Prometheus & The Pull Model",
        theory: {
          sections: [
            { type: "heading", content: "Push vs Pull" },
            { type: "text", content: "Old monitoring systems (like Zabbix or Nagios) used a 'Push' model. Every server ran an agent that constantly pushed CPU stats to a central server. This caused bottlenecks and made dynamic cloud environments hard to monitor." },
            { type: "text", content: "Prometheus changed the game with the 'Pull' model (Scraping). Your applications and servers expose a simple HTTP webpage (usually at `http://server:9090/metrics`) containing plain text numbers. The Prometheus server wakes up every 15 seconds, visits that URL, 'scrapes' (downloads) the numbers, and saves them to a Time-Series Database (TSDB)." },
            { type: "heading", content: "Exporters" },
            { type: "text", content: "How do you monitor a Linux server that doesn't have a `/metrics` page built-in? You install an 'Exporter'. The `Node Exporter` is a tiny program you run on Ubuntu that reads OS stats (RAM, Disk) and exposes them as a Prometheus-compatible web page." },
            { type: "tip", content: "Resource: Prometheus Docs. The official documentation is excellent. Always check their 'Exporters and Integrations' page before writing custom code. There is already a pre-built exporter for Postgres, Redis, Nginx, and everything else you use." }
          ]
        },
        practice: {
          title: "Configure a Scrape Job",
          description: "Tell Prometheus where to find metrics.",
          task: "Write the YAML configuration for prometheus.yml. Add a new job named 'backend_api' under `scrape_configs`. Set the target to '10.0.0.5:8080'.",
          starterCode: "global:\n  scrape_interval: 15s # By default, scrape targets every 15 seconds.\n\nscrape_configs:\n  - job_name: \"prometheus\"\n    static_configs:\n      - targets: [\"localhost:9090\"]\n\n  # 1. Add your new scrape job here\n  - job_name: \"\"\n    static_configs:\n      - targets: "
        },
        type: "yaml"
      },
      {
        id: "mon-promql",
        title: "PromQL: Querying Time-Series Data",
        theory: {
          sections: [
            { type: "heading", content: "PromQL (Prometheus Query Language)" },
            { type: "text", content: "SQL is for relational data. PromQL is specifically designed for Time-Series data (values associated with timestamps)." },
            { type: "text", content: "There are four main metric types: Counters (only go up, like total requests), Gauges (can go up and down, like RAM usage), Histograms, and Summaries." },
            { type: "heading", content: "The rate() function (Crucial)" },
            { type: "text", content: "If you query `http_requests_total`, you'll just get a massive number like '45,234,000'. This is useless. You want to know the Requests Per Second (RPS) right NOW." },
            { type: "code", content: "rate(http_requests_total[5m])" },
            { type: "text", content: "The `rate()` function takes a Counter, looks at how much it grew over the last 5 minutes (`[5m]`), and mathematically calculates the per-second rate of increase. This is the most used function in all of DevOps monitoring." }
          ]
        },
        practice: {
          title: "Write a PromQL Query",
          description: "Calculate the error rate.",
          task: "We want to find the rate of HTTP 500 (Server Error) responses per second, averaged over the last 10 minutes. The metric name is `http_responses_total`. You need to filter it using labels `{status=\"500\"}` and wrap it in the `rate()` function with a 10m window.",
          starterCode: "# PromQL Query Editor\n\n# 1. Filter the metric by status code\n# http_responses_total{...}\n\n# 2. Wrap it in the rate() function with a 10-minute window\n"
        },
        type: "yaml"
      },
      {
        id: "mon-grafana",
        title: "Grafana: Visualizing the Data",
        theory: {
          sections: [
            { type: "heading", content: "Prometheus is Ugly" },
            { type: "text", content: "Prometheus has a basic web UI, but it's meant for debugging, not for beautiful dashboards. This is where Grafana comes in." },
            { type: "heading", content: "The Ultimate Dashboard" },
            { type: "text", content: "Grafana is an open-source analytics and interactive visualization web application. It doesn't store data; it connects to Data Sources (like Prometheus, Elasticsearch, or even PostgreSQL), sends queries to them, and draws stunning charts." },
            { type: "heading", content: "Dynamic Dashboards (Variables)" },
            { type: "text", content: "Instead of creating 50 dashboards for 50 servers, you create ONE dashboard and use Variables (Templating). You define a variable `$server_name` that fetches a list of all servers from Prometheus. When you select 'Server-B' from a dropdown, Grafana automatically updates all PromQL queries on the page to include `{instance=\"$server_name\"}`." },
            { type: "tip", content: "Resource: Grafana Tutorials. Don't build dashboards from scratch! Go to grafana.com/dashboards. The community has already built perfect dashboards for Node Exporter, Kubernetes, and Nginx. You just copy the Dashboard ID (e.g., 1860) and import it into your Grafana in one click." }
          ]
        },
        practice: {
          title: "Dynamic PromQL in Grafana",
          description: "Use variables inside a query.",
          task: "You are configuring a Grafana Panel. Write a PromQL query that calculates the CPU usage (rate of `cpu_seconds_total` over 5m) but restrict it to the server selected in the dropdown. Use the Grafana variable `$instance` inside the labels.",
          starterCode: "// Grafana PromQL Query Input\n// The metric is cpu_seconds_total\n// We need the rate over [5m]\n// Filter by label: instance=\"$instance\"\n\nrate(   )"
        },
        type: "yaml"
      },
      {
        id: "mon-elk",
        title: "Centralized Logging (ELK Stack)",
        theory: {
          sections: [
            { type: "heading", content: "The Nightmare of Distributed Logs" },
            { type: "text", content: "If you have 10 web servers behind a load balancer, and a user gets an error, on WHICH server is the log file located? You'd have to SSH into all 10 servers and run `grep` manually. This is a crime in modern DevOps." },
            { type: "heading", content: "The ELK Stack" },
            { type: "text", content: "We centralize logs using ELK (Elasticsearch, Logstash, Kibana):" },
            { type: "list", items: [
              "Beats (e.g., Filebeat): Lightweight agents installed on all 10 web servers. They read local .log files and ship them out instantly.",
              "Logstash: The processor. It receives raw text, parses it (e.g., extracts the IP address from a string using Grok patterns), and converts it into structured JSON.",
              "Elasticsearch: The massive NoSQL database. It indexes the JSON logs so you can search through terabytes of text in milliseconds.",
              "Kibana: The UI. You type `status: 500 AND message: \"Payment Failed\"` and instantly see all errors across all 10 servers."
            ]},
            { type: "tip", content: "Resource: Elastic Guide. Setting up ELK manually requires heavy Java tuning. In modern environments, companies often use managed services (Elastic Cloud) or lighter alternatives like Loki (by Grafana) for Kubernetes logs." }
          ]
        },
        practice: {
          title: "Kibana Query Language (KQL)",
          description: "Search across terabytes of logs.",
          task: "In Kibana, you use KQL. Write a query to find all logs where the 'kubernetes.namespace' is 'production', AND the 'response.status' is either 500 or 502.",
          starterCode: "// Kibana Search Bar\n// Use logical operators (AND, OR) and group with parentheses.\n\nkubernetes.namespace: \"production\" AND "
        },
        type: "yaml"
      },
      {
        id: "mon-alerting",
        title: "Alerting & On-Call (Alertmanager)",
        theory: {
          sections: [
            { type: "heading", content: "Alert Fatigue" },
            { type: "text", content: "If you configure an alert to send a Slack message every time CPU hits 80%, you will get 500 messages a day. You will start ignoring them (Alert Fatigue). When a real crash happens, nobody will notice." },
            { type: "heading", content: "Alerting Philosophy" },
            { type: "text", content: "Alerts should be actionable. Don't alert on 'CPU is high' (symptom). Alert on 'Users cannot checkout' (impact). If the CPU is 99% but the website works fine, it's a warning, not a 3 AM page." },
            { type: "heading", content: "Prometheus Alertmanager" },
            { type: "text", content: "Prometheus evaluates rules (e.g., `up == 0` meaning a server is down). If the rule is true for 5 minutes, it sends the alert to Alertmanager." },
            { type: "text", content: "Alertmanager handles Grouping and Routing. If a network switch dies, 50 servers go down. Instead of sending you 50 separate emails, Alertmanager groups them into ONE email: '50 servers are unreachable in Zone A'. It then routes Warnings to Slack/Discord, and Criticals to PagerDuty (which actually calls your phone at night)." }
          ]
        },
        practice: {
          title: "Write an Alerting Rule",
          description: "Configure Prometheus to detect downtime.",
          task: "Write a Prometheus Alerting Rule YAML. Name the alert 'InstanceDown'. The expression (`expr`) should trigger if the metric `up` equals 0. Use the `for` keyword to wait '5m' (5 minutes) before actually firing the alert (to avoid false positives during a brief reboot).",
          starterCode: "groups:\n- name: InstanceAlerts\n  rules:\n  - alert: \n    expr: \n    for: \n    labels:\n      severity: critical\n    annotations:\n      summary: \"Instance {{ $labels.instance }} down\""
        },
        type: "yaml"
      }
    ]
  },
  RU: {
    title: "Мониторинг & Логи (PRO)",
    description: "Prometheus, Grafana, ELK stack и Алертинг. Учимся сохранять продакшен живым и спокойно спать по ночам.",
    lessons: [
      {
        id: "mon-observability",
        title: "Три Столпа Наблюдаемости (Observability)",
        theory: {
          sections: [
            { type: "heading", content: "Продакшен тёмен и полон ужасов" },
            { type: "text", content: "Когда у вас 50 микросервисов, запущенных в 500 подах Kubernetes, и пользователь жалуется, что 'оплата тормозит', как вы найдете проблему? Подключаться по SSH к каждому серверу и запускать `grep` — невозможно. Вам нужна Наблюдаемость (Observability)." },
            { type: "heading", content: "Три столпа данных" },
            { type: "text", content: "Вся наблюдаемость строится на трех типах данных:" },
            { type: "list", items: [
              "1. Метрики (Prometheus): Числа, привязанные ко времени. Например: 'Загрузка CPU 85%', 'Мы получаем 500 запросов в секунду'. Метрики весят мало, хранятся долго и идеально подходят для настройки Алертов.",
              "2. Логи (ELK Stack): Текстовые записи конкретных событий. Например: 'Юзер 123 не смог войти (неверный пароль)'. Логи дают глубокий контекст, когда вы видите аномалию на графике метрик.",
              "3. Трассировки (Jaeger / Tempo): Жизненный цикл ОДНОГО запроса через все микросервисы. 'Запрос шел 2 сек: 0.1с в Авторизации, 1.8с в Базе данных, 0.1с в Оплате'."
            ]},
            { type: "text", content: "Задача Senior DevOps инженера — построить инфраструктуру для сбора всех трех типов данных и связать их воедино." }
          ]
        },
        practice: {
          title: "Определи тип данных",
          description: "Сопоставьте сценарий с правильным инструментом.",
          task: "Это мысленное упражнение. Прочитайте сценарии в комментариях и впишите правильный тип данных (Metrics, Logs или Traces), который нужно использовать для решения проблемы.",
          starterCode: "# Сценарий 1: Вы хотите отправить алерт в Slack, если свободное место на диске меньше 10%.\n# Что используем: \n\n# Сценарий 2: Вы хотите увидеть точный SQL-запрос, который выдал ошибку для Корзины пользователя ID 99.\n# Что используем: \n\n# Сценарий 3: Запрос к /checkout занял 5 секунд. Вам нужно понять, какой именно микросервис тормозил в этой цепочке.\n# Что используем: "
        },
        type: "yaml"
      },
      {
        id: "mon-prometheus",
        title: "Prometheus и Pull-модель (Скрапинг)",
        theory: {
          sections: [
            { type: "heading", content: "Push против Pull" },
            { type: "text", content: "Старые системы мониторинга (Zabbix, Nagios) использовали Push-модель. На каждом сервере висел агент, который постоянно 'проталкивал' данные на центральный сервер. Это перегружало сеть и усложняло мониторинг в облаках (где серверы появляются и исчезают каждую минуту)." },
            { type: "text", content: "Prometheus изменил правила игры, внедрив Pull-модель (Скрапинг). Ваши приложения просто открывают HTTP-страничку (обычно `http://server:9090/metrics`), на которой написаны метрики простым текстом. Сервер Prometheus сам просыпается каждые 15 секунд, заходит на этот URL, 'скачивает' (scrapes) цифры и сохраняет их в свою Time-Series Database (TSDB)." },
            { type: "heading", content: "Экспортеры (Exporters)" },
            { type: "text", content: "Как мониторить Linux-сервер, если в нем нет встроенной странички `/metrics`? Вы устанавливаете 'Экспортер'. `Node Exporter` — это крошечная утилита для Linux, которая читает системные данные (RAM, Disk, CPU) и превращает их в веб-страницу формата Prometheus." },
            { type: "tip", content: "Ресурс: Prometheus Docs. Официальная документация прекрасна. Всегда проверяйте раздел 'Exporters and Integrations', прежде чем писать свой код. Сообщество уже написало готовые экспортеры для Postgres, Redis, Nginx и вообще всего, что только можно придумать." }
          ]
        },
        practice: {
          title: "Настройка Scrape-джобы",
          description: "Укажите Prometheus, где собирать метрики.",
          task: "Допишите YAML-конфигурацию `prometheus.yml`. В блок `scrape_configs` добавьте новую джобу (job_name) с именем 'backend_api'. В массиве `targets` укажите IP и порт вашего бэкенда: '10.0.0.5:8080'.",
          starterCode: "global:\n  scrape_interval: 15s # Как часто собирать метрики\n\nscrape_configs:\n  - job_name: \"prometheus\"\n    static_configs:\n      - targets: [\"localhost:9090\"]\n\n  # 1. Добавьте новую scrape-джобу сюда\n  - job_name: \"\"\n    static_configs:\n      - targets: "
        },
        type: "yaml"
      },
      {
        id: "mon-promql",
        title: "PromQL: Язык Запросов и Магия rate()",
        theory: {
          sections: [
            { type: "heading", content: "Что такое PromQL?" },
            { type: "text", content: "SQL нужен для таблиц. А PromQL (Prometheus Query Language) создан специально для работы с временными рядами (Time-Series) — массивами чисел, привязанных к меткам времени." },
            { type: "text", content: "Существует 4 типа метрик: Счетчики (Counters — только растут, как кол-во запросов), Шкалы (Gauges — могут расти и падать, как размер RAM), Гистограммы и Summary." },
            { type: "heading", content: "Функция rate() — Самая важная функция" },
            { type: "text", content: "Если вы запросите метрику `http_requests_total`, вы получите огромное число, например '45,234,000' (сколько запросов было с момента старта сервера). Это бесполезно для дашборда. Вам нужно знать количество запросов В СЕКУНДУ (RPS)." },
            { type: "code", content: "rate(http_requests_total[5m])" },
            { type: "text", content: "Функция `rate()` берет Счетчик, смотрит, насколько он вырос за последние 5 минут (`[5m]`), и математически высчитывает скорость роста в секунду. Вы будете использовать эту функцию в 90% ваших графиков!" }
          ]
        },
        practice: {
          title: "Напиши запрос PromQL",
          description: "Вычислите частоту ошибок на сервере.",
          task: "Мы хотим узнать частоту 500-х ошибок (Server Error) в секунду, усредненную за последние 10 минут. Имя метрики `http_responses_total`. Отфильтруйте её по лейблу `{status=\"500\"}` и оберните всё это в функцию `rate()` с окном `[10m]`.",
          starterCode: "# Редактор PromQL\n\n# 1. Отфильтруйте метрику по статус коду\n# http_responses_total{...}\n\n# 2. Оберните результат в функцию rate() с окном 10 минут\n"
        },
        type: "yaml"
      },
      {
        id: "mon-grafana",
        title: "Grafana: Визуализация и Дашборды",
        theory: {
          sections: [
            { type: "heading", content: "Prometheus уродлив" },
            { type: "text", content: "У Prometheus есть свой веб-интерфейс, но он создан сугубо для дебага, а не для красивых графиков. Для красоты используется Grafana." },
            { type: "heading", content: "Ультимативный Дашборд" },
            { type: "text", content: "Grafana — это Open-Source платформа для визуализации. Сама она не хранит данные. Вы подключаете к ней Источники Данных (Data Sources — Prometheus, Elasticsearch, PostgreSQL). Grafana отправляет к ним запросы (например, PromQL) и рисует потрясающие графики на основе ответов." },
            { type: "heading", content: "Динамические Дашборды (Переменные)" },
            { type: "text", content: "Вы не создаете 50 дашбордов для 50 серверов. Вы создаете ОДИН дашборд и используете Переменные (Templating). Вы создаете переменную `$server_name`, которая автоматически подтягивает список всех серверов из Prometheus. Когда пользователь в выпадающем списке выбирает 'Server-B', Grafana автоматически подставляет `{instance=\"$server_name\"}` во все PromQL запросы на странице!" },
            { type: "tip", content: "Ресурс: Grafana Tutorials. НИКОГДА не собирайте дашборды с нуля! Зайдите на grafana.com/dashboards. Комьюнити уже собрало идеальные дашборды для Kubernetes, Nginx, Node Exporter. Вы просто копируете ID дашборда (например, 1860) и импортируете его в свою Grafana в один клик." }
          ]
        },
        practice: {
          title: "Динамический PromQL в Grafana",
          description: "Используйте переменные Grafana в запросе.",
          task: "Вы настраиваете панель (график) в Grafana. Напишите PromQL запрос, который считает использование CPU (функция `rate` для метрики `cpu_seconds_total` за 5 минут `[5m]`). Но ограничьте поиск сервером, который выбран в выпадающем списке! Для этого используйте переменную Grafana `$instance` внутри лейблов метрики.",
          starterCode: "// Ввод запроса в панели Grafana\n// Метрика: cpu_seconds_total\n// Оберните в rate(...) за [5m]\n// Фильтр по лейблу: instance=\"$instance\"\n\nrate(   )"
        },
        type: "yaml"
      },
      {
        id: "mon-elk",
        title: "Централизованный сбор логов (ELK Stack)",
        theory: {
          sections: [
            { type: "heading", content: "Кошмар разбросанных логов" },
            { type: "text", content: "Если у вас 10 веб-серверов за балансировщиком нагрузки, и у пользователя произошла ошибка 500 — на КАКОМ ИМЕННО сервере лежит лог с ошибкой? Подключаться по SSH к 10 серверам и запускать `grep` — это преступление в современном DevOps." },
            { type: "heading", content: "Стек ELK" },
            { type: "text", content: "Мы централизуем (собираем в одно место) логи с помощью стека ELK (Elasticsearch, Logstash, Kibana):" },
            { type: "list", items: [
              "Beats (например, Filebeat): Легковесные агенты. Они ставятся на все 10 серверов. Их задача — мгновенно читать обновления .log файлов и пересылать их по сети.",
              "Logstash: Процессор. Получает сырой текст, парсит его (например, регулярками Grok вытаскивает IP-адрес из текста) и превращает в структурированный JSON.",
              "Elasticsearch: Массивная NoSQL база данных. Индексирует JSON-логи, позволяя осуществлять полнотекстовый поиск по терабайтам логов за миллисекунды.",
              "Kibana: Графический UI. Вы вводите в поиске `status: 500 AND message: \"Payment Failed\"` и мгновенно видите все ошибки со всех 10 серверов в одном окне."
            ]},
            { type: "tip", content: "Ресурс: Elastic Guide. Поддержка собственного кластера Elasticsearch требует глубоких знаний настройки JVM (Java). Сегодня многие компании используют облачный Managed Elastic, либо переходят на более легковесные альтернативы, например Loki (от создателей Grafana), который идеально работает с Kubernetes." }
          ]
        },
        practice: {
          title: "Поиск в Kibana (KQL)",
          description: "Напишите запрос для поиска по терабайтам логов.",
          task: "В Kibana используется язык KQL. Напишите запрос, чтобы найти все логи, где поле 'kubernetes.namespace' равно 'production', И (AND) поле 'response.status' равно 500 ИЛИ 502.",
          starterCode: "// Строка поиска Kibana\n// Используйте логические операторы (AND, OR) и группировку круглыми скобками ().\n\nkubernetes.namespace: \"production\" AND "
        },
        type: "yaml"
      },
      {
        id: "mon-alerting",
        title: "Алертинг и Дежурства (On-Call & Alertmanager)",
        theory: {
          sections: [
            { type: "heading", content: "Усталость от алертов (Alert Fatigue)" },
            { type: "text", content: "Если вы настроите отправку сообщения в Slack каждый раз, когда загрузка CPU превышает 80%, вы будете получать 500 сообщений в день. Вы (и вся команда) просто начнете их игнорировать. И когда сервер реально упадет, никто этого не заметит. Это называется Усталость от Алертов." },
            { type: "heading", content: "Философия Алертинга" },
            { type: "text", content: "Алерты должны требовать Действия (Actionable). Не ставьте алерт на 'Высокий CPU' (это Симптом). Ставьте алерт на 'Пользователи не могут оплатить товар' (это Влияние на бизнес). Если CPU 99%, но сайт работает быстро — это просто Warning, а не повод будить вас в 3 ночи." },
            { type: "heading", content: "Prometheus Alertmanager" },
            { type: "text", content: "Prometheus постоянно проверяет правила (например, `up == 0` — сервер недоступен). Если правило выполняется на протяжении 5 минут (чтобы отсеять случайные скачки сети), он шлет алерт в Alertmanager." },
            { type: "text", content: "Alertmanager отвечает за Группировку и Маршрутизацию (Routing). Если сгорел сетевой свитч в ДЦ, разом отвалится 50 серверов. Вместо отправки 50 писем, Alertmanager сгруппирует их в ОДНО: '50 серверов недоступны в Зоне А'. Затем он отправит 'Warning' алерты в Slack, а 'Critical' алерты в PagerDuty (сервис, который реально позвонит вам на сотовый телефон ночью)." }
          ]
        },
        practice: {
          title: "Напиши правило Алертинга",
          description: "Настройте Prometheus на обнаружение падений.",
          task: "Допишите YAML-правило для Prometheus. Назовите алерт (alert) 'InstanceDown'. Выражение (expr) должно срабатывать, если метрика `up` равна 0 (`up == 0`). Используйте ключевое слово `for`, чтобы указать Prometheus подождать '5m' (5 минут) перед тем, как реально отправлять алерт (чтобы избежать ложных срабатываний при быстрой перезагрузке серверов).",
          starterCode: "groups:\n- name: InstanceAlerts\n  rules:\n  # 1. Имя алерта\n  - alert: \n    # 2. Математическое условие\n    expr: \n    # 3. Время ожидания подтверждения (5 минут)\n    for: \n    labels:\n      severity: critical\n    annotations:\n      summary: \"Сервер {{ $labels.instance }} упал\""
        },
        type: "yaml"
      }
    ]
  }
};