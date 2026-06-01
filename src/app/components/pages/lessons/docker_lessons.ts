export const dockerState: Record<'EN' | 'RU', any> = {
  EN: {
    title: "Docker & Containers (PRO)",
    description: "Containerization, Docker Compose, and deployment. Say goodbye to 'It works on my machine'.",
    lessons: [
      {
        id: "docker-intro",
        title: "The 'Works on My Machine' Problem",
        theory: {
          sections: [
            { type: "heading", content: "The Matrix from Hell" },
            { type: "text", content: "Before Docker, deploying software was a nightmare. Your app needed Node.js v14, Python 3.8, and PostgreSQL 12. You deploy it to a server that has Node 16 and Postgres 10. The app crashes. You tell the sysadmin: 'But it works on my machine!'. This dependency nightmare is known as the Matrix from Hell." },
            { type: "heading", content: "Virtual Machines vs. Containers" },
            { type: "text", content: "To solve this, people used Virtual Machines (VMs). A VM runs a whole 'Guest OS' (like a 20GB Windows) on top of a 'Host OS'. It's safe, but incredibly heavy. Starting a VM takes minutes, and it wastes gigabytes of RAM." },
            { type: "text", content: "Docker introduced Containers. A container does NOT have its own OS kernel. It shares the Host's Linux kernel but uses Linux features (Namespaces and Cgroups) to trick the app into thinking it's running on its own isolated machine. Containers start in milliseconds and use almost zero extra RAM." },
            { type: "tip", content: "Resource: Play with Docker (PWD). Don't want to install Docker on your PC yet? Go to 'Play with Docker'. It's a free, interactive playground built by Docker where you get a temporary Alpine Linux terminal in your browser to run commands." }
          ]
        },
        practice: {
          title: "Your First Container",
          description: "Run the classic Hello World.",
          task: "Write the command to run the 'hello-world' container. Docker will check if you have the image locally; if not, it will pull it from the internet and run it.",
          starterCode: "# Execute the hello-world container\n# Syntax: docker run [image_name]\n\ndocker "
        },
        type: "bash"
      },
      {
        id: "docker-images",
        title: "Images vs. Containers",
        theory: {
          sections: [
            { type: "heading", content: "Object-Oriented Analogy" },
            { type: "text", content: "If you know OOP, Docker is easy to understand:" },
            { type: "list", items: [
              "Image (Class): A read-only template. It contains the OS files, your code, and the dependencies. You cannot change an image once it is built.",
              "Container (Object): A running instance of an Image. When you start a container, Docker adds a thin 'Read/Write' layer on top of the image so the app can create temporary files."
            ]},
            { type: "heading", content: "Essential CLI Commands" },
            { type: "text", content: "You control containers via the Docker CLI:" },
            { type: "list", items: [
              "docker pull ubuntu: Downloads the 'ubuntu' image from Docker Hub.",
              "docker run -d nginx: Runs the 'nginx' server in detached mode (background).",
              "docker ps: Lists all currently running containers.",
              "docker stop <id>: Stops a running container gracefully.",
              "docker rm -f <id>: Force removes a container."
            ]},
            { type: "tip", content: "Resource: Docker Docs. The official reference for the CLI is your best friend. Whenever you forget a flag (like -d or -it), typing 'docker run --help' or visiting the docs will save you." }
          ]
        },
        practice: {
          title: "Run a Web Server",
          description: "Start Nginx and map the ports.",
          task: "Run an 'nginx' container in detached mode (-d). More importantly, map your computer's port 8080 to the container's port 80 using the -p flag (-p HOST_PORT:CONTAINER_PORT).",
          starterCode: "# Start an nginx web server in the background\n# Map port 8080 on your host to port 80 in the container\n\ndocker run "
        },
        type: "bash"
      },
      {
        id: "dockerfile-basics",
        title: "Writing a Dockerfile (Layer Caching)",
        theory: {
          sections: [
            { type: "heading", content: "The Recipe: Dockerfile" },
            { type: "text", content: "A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image." },
            { type: "code", content: "FROM node:18-alpine\nWORKDIR /app\nCOPY package.json .\nRUN npm install\nCOPY . .\nCMD [\"node\", \"server.js\"]" },
            { type: "heading", content: "The Secret of Layer Caching (CRITICAL)" },
            { type: "text", content: "Why do we COPY package.json, then RUN npm install, and only then COPY the rest of the code? Why not copy everything at once?" },
            { type: "text", content: "Docker builds images in Layers. Every command creates a new layer. Docker caches these layers to speed up future builds. If you change a line in 'server.js', Docker sees that 'package.json' hasn't changed. It uses the cached 'npm install' layer and only rebuilds the final COPY step. If you copied everything at once, every minor code edit would trigger a 5-minute 'npm install'!" },
            { type: "tip", content: "Resource: Docker Mastery (Udemy). Bret Fisher's course is the gold standard for Docker. He dedicates entire sections to optimizing Dockerfiles for production, making your images smaller and more secure." }
          ]
        },
        practice: {
          title: "Write a Node.js Dockerfile",
          description: "Complete the build recipe.",
          task: "Complete the Dockerfile. 1. Use 'python:3.9-slim' as the base image. 2. Set the working directory to '/app'. 3. Copy 'requirements.txt'. 4. Run 'pip install -r requirements.txt'.",
          starterCode: "# 1. Base image\nFROM \n\n# 2. Set working directory\n\n\n# 3. Copy dependencies file first\nCOPY requirements.txt .\n\n# 4. Install dependencies\n\n\n# Copy the rest of the code\nCOPY . .\n\n# Default command\nCMD [\"python\", \"main.py\"]"
        },
        type: "dockerfile"
      },
      {
        id: "docker-volumes",
        title: "Data Persistence (Volumes)",
        theory: {
          sections: [
            { type: "heading", content: "Containers are Ephemeral" },
            { type: "text", content: "By design, containers are temporary. If you run a PostgreSQL database in a container, insert 1000 users, and then delete the container (`docker rm -f`), ALL your data is gone forever! The Read/Write layer is destroyed." },
            { type: "heading", content: "Volumes to the Rescue" },
            { type: "text", content: "To save data permanently, we must punch a hole through the container into the Host OS's hard drive. We do this using the `-v` (volume) flag." },
            { type: "list", items: [
              "Named Volumes: `docker run -v db_data:/var/lib/postgresql/data postgres`. Docker creates a hidden folder on your hard drive named 'db_data'. Even if the container dies, the folder remains. If you start a new container and attach 'db_data', your users are still there!",
              "Bind Mounts: `docker run -v $(pwd):/app node`. Maps your exact current folder to the container. This is crucial for local development (Hot Reloading). When you edit code in VS Code, it instantly updates inside the container."
            ]}
          ]
        },
        practice: {
          title: "Persist the Database",
          description: "Run Postgres with a named volume.",
          task: "Write a command to run a 'postgres' container in the background (-d). Pass an environment variable (-e POSTGRES_PASSWORD=secret). Most importantly, use a named volume 'pg_data' mapped to '/var/lib/postgresql/data'.",
          starterCode: "# Syntax: docker run -d -e [VAR=val] -v [vol_name]:[container_path] [image]\n\ndocker run "
        },
        type: "bash"
      },
      {
        id: "docker-networking",
        title: "Docker Networking & DNS",
        theory: {
          sections: [
            { type: "heading", content: "Total Isolation" },
            { type: "text", content: "If you have a 'backend' container and a 'database' container, they cannot talk to each other by default. Worse, the 'backend' cannot connect to the database using 'localhost:5432', because 'localhost' inside a container refers to the container itself, not the host machine!" },
            { type: "heading", content: "User-Defined Networks" },
            { type: "text", content: "To fix this, we create a virtual network: `docker network create my_net`. Then we attach both containers to it using `--network my_net`." },
            { type: "heading", content: "Internal DNS (Magic)" },
            { type: "text", content: "When containers are on the same custom network, Docker launches a hidden DNS server. If you named your database container `--name my_db`, the backend can connect to it simply using the URL: `postgres://my_db:5432`. Docker automatically resolves 'my_db' to the correct internal IP address!" }
          ]
        },
        practice: {
          title: "Create and Connect",
          description: "Build a virtual network.",
          task: "1. Create a network called 'app_net'. 2. Run a redis container in the background, name it 'cache', and attach it to 'app_net'.",
          starterCode: "# 1. Create the network\ndocker \n\n# 2. Run redis attached to the network\ndocker run -d --name cache "
        },
        type: "bash"
      },
      {
        id: "docker-compose",
        title: "Docker Compose (Infrastructure as Code)",
        theory: {
          sections: [
            { type: "heading", content: "The Orchestrator for the Poor" },
            { type: "text", content: "Running a modern app requires starting a React frontend, a Node backend, a Postgres DB, and a Redis cache. Typing 4 massive `docker run` commands with dozens of `-p`, `-v`, and `--network` flags every time you reboot your PC is torture." },
            { type: "heading", content: "docker-compose.yml" },
            { type: "text", content: "Docker Compose allows you to define your entire multi-container application in a single YAML file. It is 'Infrastructure as Code'." },
            { type: "code", content: "version: '3.8'\nservices:\n  backend:\n    build: ./backend\n    ports:\n      - \"8080:8080\"\n  db:\n    image: postgres:13\n    volumes:\n      - db_data:/var/lib/postgresql/data\n\nvolumes:\n  db_data:" },
            { type: "text", content: "Now, you just type ONE command: `docker compose up -d`. Compose automatically creates a network, builds the images, creates the volumes, and starts the containers in the correct order." }
          ]
        },
        practice: {
          title: "Complete the Compose File",
          description: "Define services in YAML.",
          task: "Look at the docker-compose.yml file. The 'backend' service is defined. You need to define the 'database' service: use the 'mongo:latest' image, map port '27017:27017', and define an environment variable MONGO_INITDB_ROOT_PASSWORD=secret.",
          starterCode: "version: '3.8'\n\nservices:\n  backend:\n    build: .\n    ports:\n      - \"3000:3000\"\n    depends_on:\n      - database\n      \n  database:\n    # 1. specify image\n    \n    # 2. map ports\n    \n    # 3. set environment variables\n    "
        },
        type: "yaml"
      },
      {
        id: "docker-deployment",
        title: "Deployment: Docker Hub and CI/CD",
        theory: {
          sections: [
            { type: "heading", content: "Sharing your Image" },
            { type: "text", content: "Once you build an image locally (`docker build -t my-app .`), it only exists on your laptop. To deploy it to a production server (like AWS or DigitalOcean), you must push it to a Registry." },
            { type: "text", content: "Docker Hub is the GitHub for Docker images. You tag your image with your username: `docker tag my-app john/my-app:v1`, and then push it: `docker push john/my-app:v1`." },
            { type: "heading", content: "The CI/CD Flow" },
            { type: "text", content: "In a real company, developers don't build images on their laptops. The flow looks like this:" },
            { type: "list", items: [
              "1. You push code to GitHub.",
              "2. GitHub Actions (CI) runs tests. If tests pass, the GitHub server runs `docker build` and pushes the image to Docker Hub.",
              "3. A webhook triggers the production server (CD). The server runs `docker pull` to get the new image and `docker-compose up -d` to restart the containers with zero downtime."
            ]}
          ]
        },
        practice: {
          title: "Tag and Push",
          description: "Prepare an image for deployment.",
          task: "You built an image named 'backend-api'. First, tag it so it belongs to your Docker Hub repository 'mycompany' with the version 'v2.0'. Then, write the command to push it to the registry.",
          starterCode: "# 1. Tag the local 'backend-api' image to 'mycompany/backend-api:v2.0'\n\n\n# 2. Push the newly tagged image to Docker Hub\n"
        },
        type: "bash"
      }
    ]
  },
  RU: {
    title: "Docker и Контейнеры (PRO)",
    description: "Контейнеризация, Docker Compose и деплой. Навсегда забудьте фразу 'На моем компе всё работало'.",
    lessons: [
      {
        id: "docker-intro",
        title: "Проблема 'Матрицы Ада'",
        theory: {
          sections: [
            { type: "heading", content: "У меня всё работало!" },
            { type: "text", content: "До появления Docker развертывание программ было кошмаром. Вашему приложению нужен Node.js 14, Python 3.8 и PostgreSQL 12. Вы переносите код на рабочий сервер (Production), а там установлен Node 16 и Postgres 10. Приложение падает. Вы кричите админу: 'Но на моем ноутбуке всё работало!'. Этот ад с зависимостями получил название Matrix from Hell (Матрица Ада)." },
            { type: "heading", content: "Виртуальные машины против Контейнеров" },
            { type: "text", content: "Раньше проблему решали Виртуальными Машинами (VM). VM запускает полноценную 'Гостевую ОС' (например, Windows весом 20 ГБ) поверх вашей операционки. Это безопасно, но невероятно тяжело. Запуск VM занимает минуты, и она отъедает гигабайты оперативной памяти (RAM), даже если простаивает." },
            { type: "text", content: "Docker предложил Контейнеры. Контейнер НЕ имеет собственного ядра ОС. Он использует ядро Linux вашего компьютера (Host), но с помощью механизмов Linux (Namespaces и Cgroups) обманывает приложение, заставляя его думать, что оно работает на абсолютно чистом, изолированном сервере. Контейнеры запускаются за миллисекунды и почти не потребляют лишней памяти." },
            { type: "tip", content: "Ресурс: Play with Docker (PWD). Не хотите пока устанавливать тяжелый Docker Desktop на свой ПК? Зайдите на сайт 'Play with Docker'. Это бесплатная песочница от создателей Docker, где вам в браузере выдают временный Linux-терминал с уже установленным Докером!" }
          ]
        },
        practice: {
          title: "Ваш первый контейнер",
          description: "Запустите классический Hello World.",
          task: "Напишите команду для запуска контейнера 'hello-world'. Docker проверит, есть ли этот образ у вас на ПК. Если нет — он сам скачает его из интернета (Docker Hub) и запустит.",
          starterCode: "# Запустите контейнер hello-world\n# Синтаксис: docker run [имя_образа]\n\ndocker "
        },
        type: "bash"
      },
      {
        id: "docker-images",
        title: "Образы (Images) и Контейнеры",
        theory: {
          sections: [
            { type: "heading", content: "Аналогия с ООП" },
            { type: "text", content: "Если вы знаете Объектно-Ориентированное Программирование (ООП), понять Docker очень просто:" },
            { type: "list", items: [
              "Образ / Image (Это Класс): Шаблон только для чтения. Он содержит файлы урезанной ОС (например, Ubuntu), ваш код и все зависимости (npm packages). Вы не можете изменить образ после того, как он собран.",
              "Контейнер (Это Объект): Запущенный экземпляр Образа. Когда вы запускаете контейнер, Docker добавляет поверх образа тонкий 'Слой для чтения/записи' (R/W Layer), чтобы приложение могло создавать временные логи или файлы."
            ]},
            { type: "heading", content: "Базовые команды CLI" },
            { type: "text", content: "Управление Докером происходит через консоль (CLI):" },
            { type: "list", items: [
              "docker pull ubuntu: Скачивает образ 'ubuntu' из Docker Hub на ваш ПК.",
              "docker run -d nginx: Запускает сервер 'nginx' в фоновом режиме (Detached mode).",
              "docker ps: Показывает список всех живых (запущенных) контейнеров.",
              "docker stop <id>: Вежливо останавливает контейнер (SIGTERM).",
              "docker rm -f <id>: Жестко убивает и удаляет контейнер."
            ]},
            { type: "tip", content: "Ресурс: Docker Docs. Официальная документация — ваш лучший друг. Если вы забыли флаг, команда `docker run --help` или поиск в Docs спасут вам часы дебага." }
          ]
        },
        practice: {
          title: "Запуск веб-сервера",
          description: "Запустите Nginx и пробросьте порты.",
          task: "Запустите контейнер 'nginx' в фоновом режиме (-d). Самое главное: пробросьте порт 8080 вашего компьютера внутрь контейнера на порт 80, используя флаг -p (-p ПОРТ_ХОСТА:ПОРТ_КОНТЕЙНЕРА).",
          starterCode: "# Запуск nginx в фоне\n# Проброс порта 8080 локальной машины на 80 порт контейнера\n\ndocker run "
        },
        type: "bash"
      },
      {
        id: "dockerfile-basics",
        title: "Пишем Dockerfile и Кеширование слоев",
        theory: {
          sections: [
            { type: "heading", content: "Рецепт приготовления: Dockerfile" },
            { type: "text", content: "Dockerfile — это текстовый файл с инструкциями, по которым Docker 'печет' ваш Образ." },
            { type: "code", content: "FROM node:18-alpine\nWORKDIR /app\nCOPY package.json .\nRUN npm install\nCOPY . .\nCMD [\"node\", \"server.js\"]" },
            { type: "heading", content: "Секрет кеширования слоев (КРИТИЧЕСКИ ВАЖНО)" },
            { type: "text", content: "Вопрос на собеседовании: Почему мы сначала делаем COPY package.json, затем RUN npm install, и только ПОТОМ копируем остальной код (COPY . .)? Почему не скопировать всё сразу?" },
            { type: "text", content: "Ответ: Docker собирает образы по Слоям (Layers). Каждая строчка в Dockerfile — это новый слой. Docker кеширует эти слои. Если вы измените опечатку в файле 'server.js', Docker увидит, что 'package.json' не менялся. Он возьмет готовый тяжелый слой 'npm install' из кэша (мгновенно!) и пересоберет только финальный код. Если бы вы скопировали всё сразу в начале, любая опечатка в коде заставляла бы Docker скачивать 500 МБ библиотек (npm install) заново по 5 минут!" },
            { type: "tip", content: "Ресурс: Docker Mastery (Udemy). Курс Брета Фишера (Bret Fisher) — это платиновый стандарт индустрии. Он посвящает целые разделы оптимизации Dockerfile, рассказывая, как сделать образы в 10 раз меньше весом (Alpine) и безопаснее." }
          ]
        },
        practice: {
          title: "Соберите Python Dockerfile",
          description: "Завершите написание рецепта сборки.",
          task: "Заполните пропуски в Dockerfile. 1. Используйте базовый образ 'python:3.9-slim' (FROM). 2. Установите рабочую папку '/app' (WORKDIR). 3. Выполните команду 'pip install -r requirements.txt' (RUN).",
          starterCode: "# 1. Базовый образ\nFROM \n\n# 2. Установка рабочей директории\n\n\n# Копируем файл зависимостей ПЕРВЫМ для кеширования\nCOPY requirements.txt .\n\n# 3. Запуск установки библиотек\n\n\n# Копируем остальной код\nCOPY . .\n\n# Команда по умолчанию при старте контейнера\nCMD [\"python\", \"main.py\"]"
        },
        type: "dockerfile"
      },
      {
        id: "docker-volumes",
        title: "Сохранение данных: Тома (Volumes)",
        theory: {
          sections: [
            { type: "heading", content: "Контейнеры смертны" },
            { type: "text", content: "По своей архитектуре контейнеры созданы одноразовыми (Ephemeral). Если вы запустите базу данных PostgreSQL в контейнере, добавите туда 1000 юзеров, а затем удалите контейнер (`docker rm -f`), ВСЕ ваши данные исчезнут навсегда! Слой для чтения/записи (R/W Layer) уничтожается вместе с контейнером." },
            { type: "heading", content: "Volumes спасают ситуацию" },
            { type: "text", content: "Чтобы сохранить данные навсегда, мы должны 'пробить дыру' в контейнере и подключить его к жесткому диску вашей операционной системы (Host OS). Для этого используется флаг `-v`." },
            { type: "list", items: [
              "Named Volumes (Именованные тома): `docker run -v db_data:/var/lib/postgresql/data postgres`. Docker сам создает скрытую защищенную папку 'db_data' на вашем диске. Даже если контейнер умрет, данные лежат на вашем диске. Если вы создадите новый контейнер и подключите 'db_data', база данных восстановится!",
              "Bind Mounts (Проброс папок): `docker run -v $(pwd):/app node`. Жестко привязывает вашу ТЕКУЩУЮ папку на ноутбуке к папке внутри контейнера. Идеально для разработки (Hot Reloading). Вы меняете код в VS Code, и он мгновенно меняется внутри запущенного контейнера."
            ]}
          ]
        },
        practice: {
          title: "Не потеряй базу данных",
          description: "Запустите БД с привязанным томом.",
          task: "Напишите команду для запуска контейнера 'postgres' в фоновом режиме (-d). Передайте переменную окружения (-e POSTGRES_PASSWORD=secret). Самое важное: подключите Именованный Том (named volume) 'pg_data' к пути внутри контейнера '/var/lib/postgresql/data'.",
          starterCode: "# Синтаксис: docker run -d -e [ПЕРЕМЕННАЯ=значение] -v [имя_тома]:[путь_в_контейнере] [образ]\n\ndocker run "
        },
        type: "bash"
      },
      {
        id: "docker-networking",
        title: "Сети в Docker и внутренний DNS",
        theory: {
          sections: [
            { type: "heading", content: "Тотальная изоляция" },
            { type: "text", content: "Если вы запустите контейнер 'backend' и контейнер 'database', по умолчанию они НЕ МОГУТ общаться друг с другом. Более того, бэкенд не может подключиться к базе по адресу 'localhost:5432'. Почему? Потому что 'localhost' внутри контейнера бэкенда указывает на САМ бэкенд, а не на ваш ноутбук!" },
            { type: "heading", content: "Виртуальные Сети (User-Defined Networks)" },
            { type: "text", content: "Чтобы подружить их, мы создаем виртуальную подсеть: `docker network create my_net`. Затем мы запускаем оба контейнера, привязывая их к этой сети через флаг `--network my_net`." },
            { type: "heading", content: "Магия встроенного DNS" },
            { type: "text", content: "Когда контейнеры находятся в одной кастомной сети, Docker поднимает для них скрытый DNS-сервер. Если вы назвали контейнер с базой `--name my_db`, вашему бэкенду больше не нужно знать IP-адреса! Вы просто пишете в коде бэкенда строку подключения: `postgres://my_db:5432`. Docker сам переведет слово 'my_db' во внутренний IP-адрес контейнера." }
          ]
        },
        practice: {
          title: "Создай и Подключи",
          description: "Создание виртуальной сети для связи.",
          task: "1. Создайте сеть с именем 'app_net'. 2. Запустите контейнер 'redis' в фоне (-d), назовите его 'cache' (--name) и подключите к созданной сети 'app_net' (--network).",
          starterCode: "# 1. Создаем сеть\ndocker \n\n# 2. Запускаем redis внутри этой сети\ndocker run -d --name cache "
        },
        type: "bash"
      },
      {
        id: "docker-compose",
        title: "Docker Compose (Инфраструктура как код)",
        theory: {
          sections: [
            { type: "heading", content: "Оркестратор для бедных" },
            { type: "text", content: "Для работы современного приложения нужно поднять React (фронтенд), Node (бэкенд), Postgres (Базу) и Redis (Кэш). Вводить руками 4 гигантских команды `docker run` с десятками флагов `-p`, `-v` и `--network` при каждой перезагрузке ноутбука — это пытка." },
            { type: "heading", content: "docker-compose.yml" },
            { type: "text", content: "Docker Compose позволяет описать всю архитектуру вашего приложения в одном файле формата YAML. Это паттерн 'Инфраструктура как код' (IaC)." },
            { type: "code", content: "version: '3.8'\nservices:\n  backend:\n    build: ./backend\n    ports:\n      - \"8080:8080\"\n  db:\n    image: postgres:13\n    volumes:\n      - db_data:/var/lib/postgresql/data\n\nvolumes:\n  db_data:" },
            { type: "text", content: "Теперь вам достаточно ввести ОДНУ команду: `docker compose up -d`. Compose сам создаст сеть, сам соберет все Dockerfile, сам создаст тома (Volumes) и запустит контейнеры в правильном порядке." }
          ]
        },
        practice: {
          title: "Допиши Compose Файл",
          description: "Определите сервисы в YAML.",
          task: "Посмотрите на файл docker-compose.yml. Сервис 'backend' уже описан. Вам нужно дописать сервис 'database': укажите образ (image) 'mongo:latest', пробросьте порты (ports) '27017:27017' и задайте переменную окружения (environment) MONGO_INITDB_ROOT_PASSWORD=secret.",
          starterCode: "version: '3.8'\n\nservices:\n  backend:\n    build: .\n    ports:\n      - \"3000:3000\"\n    depends_on:\n      - database\n      \n  database:\n    # 1. Укажите image\n    \n    # 2. Пробросьте ports (в виде списка с дефисом)\n    \n    # 3. Задайте environment\n    "
        },
        type: "yaml"
      },
      {
        id: "docker-deployment",
        title: "Деплой: Docker Hub и CI/CD",
        theory: {
          sections: [
            { type: "heading", content: "Как поделиться образом" },
            { type: "text", content: "Когда вы собираете образ локально (`docker build -t my-app .`), он существует только на вашем ноутбуке. Чтобы запустить (задеплоить) его на рабочем Linux-сервере в облаке (AWS/DigitalOcean/Yandex Cloud), его нужно загрузить в Реестр (Registry)." },
            { type: "text", content: "Docker Hub — это GitHub для докер-образов. Вы помечаете (тэгируете) свой образ своим логином: `docker tag my-app john/my-app:v1`, а затем отправляете его в облако: `docker push john/my-app:v1`." },
            { type: "heading", content: "Цикл CI/CD в реальности" },
            { type: "text", content: "В хороших IT-компаниях программисты вообще не собирают образы руками. Процесс выглядит так:" },
            { type: "list", items: [
              "1. Вы пушите код в GitHub.",
              "2. GitHub Actions (CI) запускает тесты. Если тесты прошли, сервер GitHub САМ выполняет `docker build` и пушит образ в Docker Hub.",
              "3. Сервер GitHub отправляет Webhook на ваш боевой сервер (CD).",
              "4. Боевой сервер делает `docker pull` нового образа и `docker-compose up -d`, бесшовно перезапуская приложение на новой версии."
            ]}
          ]
        },
        practice: {
          title: "Tag and Push",
          description: "Подготовка образа к деплою в продакшен.",
          task: "Вы локально собрали образ с именем 'backend-api'. Сначала пометьте его тегом (tag), чтобы он принадлежал репозиторию вашей компании 'mycompany' на Docker Hub и имел версию 'v2.0' (mycompany/backend-api:v2.0). Затем напишите команду для его отправки (push) в реестр.",
          starterCode: "# 1. Пометьте локальный образ 'backend-api' тегом 'mycompany/backend-api:v2.0'\n\n\n# 2. Отправьте (Push) новый помеченный образ в Docker Hub\n"
        },
        type: "bash"
      }
    ]
  }
};