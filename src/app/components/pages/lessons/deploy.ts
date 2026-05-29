export const deployLessons: Record<'EN' | 'RU', any> = {
  EN: {
    title: "Deploy & CI/CD",
    description: "Learn deployment and CI/CD — from manual hosting to Vercel, GitHub Actions, automated tests and production deploys.",
    lessons: [
      // ============= LESSON 1 =============
      {
        id: "deploy-intro",
        title: "Evolution of Hosting and CI/CD",
        theory: {
          sections: [
            { type: "heading", content: "What is Deploy?" },
            { type: "text", content: "Deploy is the process of deploying your local code to a remote server so it becomes available to the whole world via a link (URL)." },
            { type: "text", content: "How it used to be: a programmer wrote code, built it, opened FileZilla (an FTP client) and manually dragged folders of files onto the server. If someone uploaded code in parallel — files were overwritten and everything broke. It was a nightmare." },
            { type: "heading", content: "Continuous Integration (CI)" },
            { type: "text", content: "Today code lives in Git (GitHub/GitLab). When several developers work on one project, their code must be constantly 'integrated' (merged together) into the main branch (main)." },
            { type: "text", content: 'CI is a robot guarding the main branch. As soon as you git push (or open a Pull Request), the robot automatically downloads your code and runs tests and linters. If tests fail, the robot says: "The code is broken, I forbid the merge!".' },
            { type: "heading", content: "Continuous Deployment (CD)" },
            { type: "text", content: "If the CI robot said the tests passed (✅), CD steps in. It's a courier that automatically takes your verified code, builds it (e.g. runs npm run build) and ships it to the server with zero human involvement." },
            { type: "heading", content: "All together" },
            { type: "text", content: "You just write code and git push. The rest (checking, building, publishing to the internet) happens automatically in a couple of minutes. That's the magic of CI/CD!" }
          ]
        },
        practice: {
          title: "Add a deploy script",
          description: "Edit package.json to add a deploy command.",
          task: 'Let\'s make a manual deploy via terminal commands. In package.json add a script "deploy": "npm run build && surge ./dist". Then press Run.',
          starterCode: '{\n  "name": "my-app",\n  "version": "1.0.0",\n  "scripts": {\n    "start": "vite",\n    "build": "vite build"\n    // Add the deploy script here\n  }\n}'
        },
        type: "javascript"
      },
      // ============= LESSON 2 =============
      {
        id: "deploy-hosting",
        title: "Modern Frontend Hosting: Vercel and Netlify",
        theory: {
          sections: [
            { type: "heading", content: "Forget renting servers" },
            { type: "text", content: "Previously, to deploy a React app you had to rent a Linux server (VPS), install Nginx/Node.js there, configure SSL certificates. For frontend developers this was hard." },
            { type: "text", content: "Today there are Frontend PaaS (Platform as a Service) — the most popular are Vercel (creators of Next.js) and Netlify." },
            { type: "heading", content: "How do they work?" },
            { type: "list", items: [
              "You sign up via GitHub.",
              'You pick your repository from the list and click "Deploy".',
              "That's it."
            ]},
            { type: "text", content: "Vercel figures out you have React/Vue/Angular, runs npm run build itself, gives you a free domain (HTTPS) and serves your files via a global CDN (Edge Network). Now your site loads equally fast in New York and Tokyo." },
            { type: "heading", content: "Preview Deployments" },
            { type: "text", content: "The killer feature of these platforms. If someone on the team makes a Pull Request, Vercel automatically creates a separate temporary link for that PR. The team can play with the new feature live before the code even reaches main!" },
            { type: "tip", content: "Configuration: usually platforms do everything themselves. But sometimes you need to set routing (redirects) so that refreshing a page in React Router doesn't give a 404 error. In Vercel this is done in vercel.json, in Netlify — in netlify.toml." }
          ]
        },
        practice: {
          title: "Configure Vercel for an SPA",
          description: "Write a vercel.json with rewrites.",
          task: 'Configure Vercel. Write a JSON file. It should have a "rewrites" object — an array. Add one rule: all paths ("source": "/(.*)") should redirect to the root ("destination": "/index.html"). This is the standard setup for Single Page Applications (SPA).',
          starterCode: '{\n  // Write the rewrites (URL rewrite) configuration\n  \n}'
        },
        type: "javascript"
      },
      // ============= LESSON 3 =============
      {
        id: "deploy-actions",
        title: "GitHub Actions: Intro and YAML Syntax",
        theory: {
          sections: [
            { type: "heading", content: "What is GitHub Actions?" },
            { type: "text", content: "Platforms like Vercel solve the deploy problem. But what if we just need to run tests, run a linter, or send a Slack message on a new commit? Then we need a full CI/CD tool." },
            { type: "text", content: "GitHub Actions is an automation mechanism built right into GitHub. It lets you run any scripts on GitHub virtual machines (servers) when something happens in the repo (Push, Pull Request)." },
            { type: "heading", content: "YAML syntax (.yml)" },
            { type: "text", content: "GitHub Actions scripts are written in YAML. It's a simple text format, similar to JSON but without brackets and quotes. Important: in YAML indentation (spaces) is critically important!" },
            { type: "code", content: 'name: My CI Pipeline\n\n# When to run the pipeline? (Event)\non:\n  push:\n    branches: [ "main" ]\n\n# What to do? (Jobs)\njobs:\n  build-and-test:\n    # Which OS to run on?\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo "Hello, world!"' },
            { type: "heading", content: "Workflow structure" },
            { type: "list", items: [
              "Workflow (pipeline): the entire .yml file.",
              "Events: triggers (the on: section). E.g. a push to the main branch.",
              "Jobs: large blocks. They can run in parallel on different servers.",
              "Steps: concrete actions inside a job. They run strictly one after another (checkout code -> install node -> run npm test)."
            ]}
          ]
        },
        practice: {
          title: "Your first Workflow",
          description: "Write a basic GitHub Actions YAML.",
          task: 'Write your first GitHub Actions Workflow! Set name: First Action. Trigger: on: push. Create jobs with a job named say-hello that runs on ubuntu-latest. In steps add one item: run the command run: echo "My first CI passed!".',
          starterCode: 'name: First Action\n\n# Add the trigger on: push\n\n\n# Describe jobs\njobs:\n  say-hello:\n    runs-on: ubuntu-latest\n    steps:\n      # Add the command run: echo ...\n'
        },
        type: "javascript"
      },
      // ============= LESSON 4 =============
      {
        id: "deploy-ci",
        title: "Setting up CI: Running Tests (Actions / Uses)",
        theory: {
          sections: [
            { type: "heading", content: "Ready-made actions (uses)" },
            { type: "text", content: 'You can write console commands in run: .... But tasks often repeat (checkout code, install Node.js, log into Docker). For this the GitHub community wrote thousands of ready-made "mini-programs" you use via the uses: keyword.' },
            { type: "text", content: "The two most important built-in actions:" },
            { type: "list", items: [
              "uses: actions/checkout@v3 — downloads code from your repo onto the virtual machine (without it the server is just empty!).",
              "uses: actions/setup-node@v3 — installs Node.js and NPM of the needed version."
            ]},
            { type: "heading", content: "A classic check pipeline (CI)" },
            { type: "code", content: 'steps:\n  # 1. Get the code\n  - uses: actions/checkout@v3\n  \n  # 2. Install Node.js\n  - uses: actions/setup-node@v3\n    with:\n      node-version: "18"\n      \n  # 3. Install dependencies (npm ci - a faster, stricter npm install for servers)\n  - run: npm ci\n  \n  # 4. Check code for errors (Linter)\n  - run: npm run lint\n  \n  # 5. Run unit tests\n  - run: npm test' },
            { type: "tip", content: "Blocking the merge: if npm test fails (even 1 test), GitHub Actions marks the whole pipeline with a red cross (❌). In the repo settings you can forbid merging a Pull Request until all checks are green. So broken code never reaches production." }
          ]
        },
        practice: {
          title: "Complete the CI pipeline",
          description: "Add the missing checkout and test steps.",
          task: "Here is a classic CI pipeline. Two crucial steps are missing. 1. First you need to download the code (add - uses: actions/checkout@v3). 2. At the very end of the pipeline add the command - run: npm test. Run the pipeline to see the checks execute.",
          starterCode: 'name: CI Pipeline\non: push\n\njobs:\n  test-code:\n    runs-on: ubuntu-latest\n    steps:\n      # 1. Write uses: actions/checkout@v3\n      \n\n      - uses: actions/setup-node@v3\n        with:\n          node-version: 18\n\n      - run: npm ci\n      \n      # 2. Write the test command (run: npm test)\n      '
        },
        type: "javascript"
      },
      // ============= LESSON 5 =============
      {
        id: "deploy-cd",
        title: "Setting up CD: Secrets and Deploy",
        theory: {
          sections: [
            { type: "heading", content: "Secrets" },
            { type: "text", content: "Deploy means sending code to a third-party server (e.g. Netlify or DigitalOcean). For the server to let us in, we need a password or API token. Never write passwords directly in the code (in yaml)! Code can be stolen, or it might be public." },
            { type: "text", content: 'In GitHub repo settings there is a "Secrets and variables" section. We hide tokens there. In the pipeline we access them via special syntax: ${{ secrets.SECRET_NAME }}.' },
            { type: "heading", content: "How to deploy from GitHub Actions?" },
            { type: "text", content: "Often a ready-made action (e.g. by Netlify) is used that does everything for us." },
            { type: "code", content: 'steps:\n  # ... code checked out, deps installed, build done (npm run build) ...\n\n  - name: Deploy to Netlify\n    uses: nwtgck/actions-netlify@v2.0\n    with:\n      publish-dir: "./dist" # Which folder to deploy?\n      production-deploy: true\n    env:\n      NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}\n      NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}' },
            { type: "heading", content: "Linking CI and CD (needs)" },
            { type: "text", content: "In good projects deploy (CD) should not run if tests (CI) failed. We can create two jobs and link them with the needs keyword." },
            { type: "code", content: 'jobs:\n  test:\n    runs-on: ubuntu-latest\n    # ... steps with tests ...\n    \n  deploy:\n    runs-on: ubuntu-latest\n    needs: test # This job WAITS for the test job to finish\n    # ... deploy steps ...' }
          ]
        },
        practice: {
          title: "Full CI/CD pipeline",
          description: "Link deploy to test and use a secret token.",
          task: "A full CI/CD pipeline! 1. Link the deploy job to the test job using the keyword needs: test. 2. In the deploy step set the secret token: in the env: block assign NETLIFY_AUTH_TOKEN the value ${{ secrets.NETLIFY_AUTH_TOKEN }}.",
          starterCode: 'name: Production Deploy\non: push\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - run: npm ci\n      - run: npm test\n\n  deploy:\n    runs-on: ubuntu-latest\n    # 1. Add needs: test to wait for successful tests\n    \n    steps:\n      - uses: actions/checkout@v3\n      - run: npm ci\n      - run: npm run build\n      \n      - name: Deploy to Netlify\n        uses: nwtgck/actions-netlify@v2.0\n        with:\n          publish-dir: "./dist"\n          production-deploy: true\n        env:\n          # 2. Set NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}\n          '
        },
        type: "javascript"
      }
    ]
  },
  RU: {
    title: "Deploy & CI/CD",
    description: "Изучаем деплой и CI/CD — от ручного хостинга до Vercel, GitHub Actions, автотестов и продакшн-деплоя.",
    lessons: [
      // ============= УРОК 1 =============
      {
        id: "deploy-intro",
        title: "Эволюция хостинга и CI/CD",
        theory: {
          sections: [
            { type: "heading", content: "Что такое Deploy (Деплой)?" },
            { type: "text", content: "Деплой — это процесс развёртывания вашего локального кода на удалённом сервере, чтобы он стал доступен всему миру по ссылке (URL)." },
            { type: "text", content: "Как это было раньше: программист писал код, собирал его (build), открывал программу FileZilla (FTP-клиент) и вручную перетаскивал папки с файлами на сервер. Если кто-то загружал код параллельно — файлы перезаписывались и всё ломалось. Это был кошмар." },
            { type: "heading", content: "Continuous Integration (CI) — Непрерывная интеграция" },
            { type: "text", content: 'Сегодня код хранится в Git (GitHub/GitLab). Когда несколько разработчиков работают над одним проектом, их код нужно постоянно "интегрировать" (сливать вместе) в главную ветку (main).' },
            { type: "text", content: 'CI — это робот, который стоит на страже главной ветки. Как только вы делаете git push (или открываете Pull Request), робот автоматически скачивает ваш код и запускает тесты и линтеры. Если тесты падают, робот говорит: "Код сломан, я запрещаю слияние!".' },
            { type: "heading", content: "Continuous Deployment (CD) — Непрерывный деплой" },
            { type: "text", content: "Если CI-робот сказал, что тесты прошли успешно (✅), в дело вступает CD. Это курьер, который автоматически берёт ваш проверенный код, собирает его (например, запускает npm run build) и отправляет на сервер без малейшего участия человека." },
            { type: "heading", content: "Всё вместе" },
            { type: "text", content: "Вы просто пишете код и делаете git push. Остальное (проверка, сборка, публикация в интернет) происходит автоматически за пару минут. Это и есть магия CI/CD!" }
          ]
        },
        practice: {
          title: "Добавь скрипт деплоя",
          description: "Отредактируй package.json, добавив команду deploy.",
          task: 'Давайте сделаем ручной деплой с помощью команд в терминале. В файле package.json добавьте скрипт "deploy": "npm run build && surge ./dist". После этого нажмите запуск.',
          starterCode: '{\n  "name": "my-app",\n  "version": "1.0.0",\n  "scripts": {\n    "start": "vite",\n    "build": "vite build"\n    // Добавьте скрипт deploy сюда\n  }\n}'
        },
        type: "javascript"
      },
      // ============= УРОК 2 =============
      {
        id: "deploy-hosting",
        title: "Современный Frontend-хостинг: Vercel и Netlify",
        theory: {
          sections: [
            { type: "heading", content: "Забудьте про аренду серверов" },
            { type: "text", content: "Раньше, чтобы задеплоить React-приложение, нужно было арендовать Linux-сервер (VPS), устанавливать туда Nginx/Node.js, настраивать SSL-сертификаты. Для Frontend-разработчиков это было сложно." },
            { type: "text", content: "Сегодня существуют Frontend PaaS (Платформа как услуга) — самые популярные из них это Vercel (создатели Next.js) и Netlify." },
            { type: "heading", content: "Как они работают?" },
            { type: "list", items: [
              "Вы регистрируетесь через GitHub.",
              'Выбираете свой репозиторий из списка и нажимаете "Deploy".',
              "Всё."
            ]},
            { type: "text", content: "Vercel сам понимает, что у вас React/Vue/Angular, сам запускает npm run build, выдаёт вам бесплатный домен (HTTPS) и раздаёт ваши файлы через глобальную сеть CDN (Edge Network). Теперь ваш сайт грузится одинаково быстро и в Нью-Йорке, и в Токио." },
            { type: "heading", content: "Preview Deployments (Превью)" },
            { type: "text", content: "Киллер-фича этих платформ. Если кто-то в команде делает Pull Request (предлагает изменения), Vercel автоматически создаёт для этого PR отдельную временную ссылку. Команда может потыкать новую фичу вживую ещё до того, как код попадёт в main!" },
            { type: "tip", content: "Конфигурация: чаще всего платформы всё делают сами. Но иногда нужно задать настройки роутинга (перенаправлений), чтобы при обновлении страницы в React Router не было ошибки 404. В Vercel это делается в файле vercel.json, а в Netlify — в netlify.toml." }
          ]
        },
        practice: {
          title: "Настрой Vercel для SPA",
          description: "Напиши vercel.json с rewrites.",
          task: 'Давайте настроим конфигурацию для Vercel. Напишите JSON-файл. В нём должен быть объект "rewrites" — это массив. Добавьте в него одно правило: все пути ("source": "/(.*)") должны перенаправляться на корень ("destination": "/index.html"). Это стандартная настройка для Single Page Applications (SPA).',
          starterCode: '{\n  // Напишите конфигурацию rewrites (перезапись URL)\n  \n}'
        },
        type: "javascript"
      },
      // ============= УРОК 3 =============
      {
        id: "deploy-actions",
        title: "GitHub Actions: Введение и синтаксис YAML",
        theory: {
          sections: [
            { type: "heading", content: "Что такое GitHub Actions?" },
            { type: "text", content: "Платформы вроде Vercel решают задачу деплоя. Но что, если нам нужно просто прогнать тесты, запустить линтер или отправить сообщение в Slack при новом коммите? Тут нужен полноценный CI/CD инструмент." },
            { type: "text", content: "GitHub Actions — это встроенный прямо в GitHub механизм автоматизации. Он позволяет запускать любые скрипты на виртуальных машинах (серверах) GitHub, когда в репозитории что-то происходит (Push, Pull Request)." },
            { type: "heading", content: "Синтаксис YAML (.yml)" },
            { type: "text", content: "Скрипты GitHub Actions пишутся в формате YAML. Это простой текстовый формат, похожий на JSON, но без скобок и кавычек. Важно: в YAML критически важны отступы (пробелы)!" },
            { type: "code", content: 'name: My CI Pipeline\n\n# Когда запускать пайплайн? (Событие)\non:\n  push:\n    branches: [ "main" ]\n\n# Что делать? (Задачи)\njobs:\n  build-and-test:\n    # На какой ОС запускаем?\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo "Привет, мир!"' },
            { type: "heading", content: "Структура Workflow" },
            { type: "list", items: [
              "Workflow (Пайплайн): весь файл .yml целиком.",
              "Events (События): триггеры (раздел on:). Например, пуш в ветку main.",
              "Jobs (Задачи): крупные блоки. Они могут выполняться параллельно на разных серверах.",
              "Steps (Шаги): конкретные действия внутри задачи. Выполняются строго друг за другом (скачать код -> установить node -> запустить npm test)."
            ]}
          ]
        },
        practice: {
          title: "Твой первый Workflow",
          description: "Напиши базовый YAML для GitHub Actions.",
          task: 'Напишите свой первый Workflow для GitHub Actions! Задайте имя name: First Action. Триггер: on: push. Создайте jobs с именем say-hello, которая запускается на ubuntu-latest. В шагах (steps) добавьте один пункт: запуск команды run: echo "Мой первый CI пройден!".',
          starterCode: 'name: First Action\n\n# Добавьте триггер on: push\n\n\n# Опишите jobs\njobs:\n  say-hello:\n    runs-on: ubuntu-latest\n    steps:\n      # Добавьте команду run: echo ...\n'
        },
        type: "javascript"
      },
      // ============= УРОК 4 =============
      {
        id: "deploy-ci",
        title: "Настройка CI: Прогон тестов (Actions / Uses)",
        theory: {
          sections: [
            { type: "heading", content: "Готовые экшены (uses)" },
            { type: "text", content: 'Вы можете писать консольные команды в run: .... Но часто задачи повторяются (скачать код, поставить Node.js, залогиниться в Docker). Для этого сообщество GitHub написало тысячи готовых "мини-программ", которые можно использовать через ключевое слово uses:.' },
            { type: "text", content: "Два самых важных встроенных экшена:" },
            { type: "list", items: [
              "uses: actions/checkout@v3 — Скачивает код из вашего репозитория на виртуальную машину (без него сервер просто пустой!).",
              "uses: actions/setup-node@v3 — Устанавливает Node.js и NPM нужной версии."
            ]},
            { type: "heading", content: "Классический пайплайн проверки (CI)" },
            { type: "code", content: 'steps:\n  # 1. Забираем код\n  - uses: actions/checkout@v3\n  \n  # 2. Устанавливаем Node.js\n  - uses: actions/setup-node@v3\n    with:\n      node-version: "18"\n      \n  # 3. Ставим зависимости (npm ci - более быстрая и строгая версия npm install для серверов)\n  - run: npm ci\n  \n  # 4. Проверяем код на ошибки (Линтер)\n  - run: npm run lint\n  \n  # 5. Запускаем Unit-тесты\n  - run: npm test' },
            { type: "tip", content: "Блокировка слияния: если команда npm test завершится с ошибкой (хотя бы 1 тест упал), GitHub Actions пометит весь пайплайн красным крестиком (❌). В настройках репозитория можно запретить сливать Pull Request, пока все проверки не станут зелёными. Так сломанный код никогда не попадёт в продакшен." }
          ]
        },
        practice: {
          title: "Дополни CI пайплайн",
          description: "Добавь пропущенные шаги checkout и тестов.",
          task: "Перед вами классический CI пайплайн. В нём пропущены два важнейших шага. 1. Сначала вам нужно скачать код (добавьте - uses: actions/checkout@v3). 2. В самом конце пайплайна добавьте команду - run: npm test. Запустите пайплайн, чтобы посмотреть, как выполняются проверки.",
          starterCode: 'name: CI Pipeline\non: push\n\njobs:\n  test-code:\n    runs-on: ubuntu-latest\n    steps:\n      # 1. Напишите uses: actions/checkout@v3\n      \n\n      - uses: actions/setup-node@v3\n        with:\n          node-version: 18\n\n      - run: npm ci\n      \n      # 2. Напишите команду запуска тестов (run: npm test)\n      '
        },
        type: "javascript"
      },
      // ============= УРОК 5 =============
      {
        id: "deploy-cd",
        title: "Настройка CD: Секреты и Деплой",
        theory: {
          sections: [
            { type: "heading", content: "Секреты (Secrets)" },
            { type: "text", content: "Деплой — это отправка кода на сторонний сервер (например, Netlify или DigitalOcean). Чтобы сервер пустил нас, нам нужен пароль или API-токен. Никогда не пишите пароли прямо в коде (в yaml)! Код могут украсть, или он может быть публичным." },
            { type: "text", content: 'В настройках репозитория GitHub есть раздел "Secrets and variables". Туда мы прячем токены. В самом пайплайне мы обращаемся к ним через специальный синтаксис: ${{ secrets.ИМЯ_СЕКРЕТА }}.' },
            { type: "heading", content: "Как деплоить из GitHub Actions?" },
            { type: "text", content: "Часто используется готовый экшен (например от Netlify), который делает всё за нас." },
            { type: "code", content: 'steps:\n  # ... код скачан, зависимости установлены, билд собран (npm run build) ...\n\n  - name: Deploy to Netlify\n    uses: nwtgck/actions-netlify@v2.0\n    with:\n      publish-dir: "./dist" # Какую папку деплоим?\n      production-deploy: true\n    env:\n      NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}\n      NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}' },
            { type: "heading", content: "Связка CI и CD (Needs)" },
            { type: "text", content: "В хороших проектах деплой (CD) не должен запускаться, если тесты (CI) упали. Мы можем создать две джобы (jobs) и связать их ключевым словом needs." },
            { type: "code", content: 'jobs:\n  test:\n    runs-on: ubuntu-latest\n    # ... шаги с тестами ...\n    \n  deploy:\n    runs-on: ubuntu-latest\n    needs: test # Эта задача ЖДЁТ, пока выполнится задача test\n    # ... шаги деплоя ...' }
          ]
        },
        practice: {
          title: "Полный CI/CD пайплайн",
          description: "Свяжи deploy с test и используй секретный токен.",
          task: "Полноценный CI/CD пайплайн! 1. Привяжите задачу deploy к задаче test с помощью ключевого слова needs: test. 2. В шаге деплоя укажите секретный токен: в блоке env: присвойте переменной NETLIFY_AUTH_TOKEN значение ${{ secrets.NETLIFY_AUTH_TOKEN }}.",
          starterCode: 'name: Production Deploy\non: push\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - run: npm ci\n      - run: npm test\n\n  deploy:\n    runs-on: ubuntu-latest\n    # 1. Добавьте needs: test, чтобы ждать успешных тестов\n    \n    steps:\n      - uses: actions/checkout@v3\n      - run: npm ci\n      - run: npm run build\n      \n      - name: Deploy to Netlify\n        uses: nwtgck/actions-netlify@v2.0\n        with:\n          publish-dir: "./dist"\n          production-deploy: true\n        env:\n          # 2. Укажите NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}\n          '
        },
        type: "javascript"
      }
    ]
  }
};
