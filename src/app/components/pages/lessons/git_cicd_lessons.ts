export const gitCicdState: Record<'EN' | 'RU', any> = {
  EN: {
    title: "Git & CI/CD Basics (MUST)",
    description: "Advanced Git, GitHub Actions, and GitLab CI. Master the philosophy of version control and automation.",
    lessons: [
      {
        id: "git-philosophy",
        title: "The Philosophy of Git & The 3 Trees",
        theory: {
          sections: [
            { type: "heading", content: "A Time Machine for Code" },
            { type: "text", content: "Before Git, developers used centralized systems (like SVN) or literally copied folders (project_final_v2_final.zip). Git was created by Linus Torvalds (creator of Linux) as a Distributed Version Control System. In Git, every developer has a full, independent copy of the entire project history on their laptop." },
            { type: "heading", content: "The Three Trees Architecture" },
            { type: "text", content: "To master Git, you must understand that it juggles files between three 'Trees' (areas):" },
            { type: "list", items: [
              "1. Working Directory: What you see on your hard drive right now. You edit files here.",
              "2. Staging Area (The Index): The 'loading dock'. When you run `git add`, you place files here. You are preparing them for the next commit.",
              "3. Local Repository (HEAD): The database (.git folder). When you run `git commit`, everything in the Staging Area is permanently frozen into a snapshot (a commit with a SHA-1 hash)."
            ]},
            { type: "tip", content: "Resource: The 'Pro Git' book (by Scott Chacon). It is free online. Read Chapter 1 and 2. It is the absolute bible of version control. Once you understand the 'Three Trees', Git stops being magic and becomes pure logic." }
          ]
        },
        practice: {
          title: "The 3 Trees in Action",
          description: "Move a file through the Git workflow.",
          task: "You modified 'server.js' in your Working Directory. Write the two commands needed to move it to the Staging Area, and then permanently save it to the Local Repository with the message 'Update server'.",
          starterCode: "# 1. Move 'server.js' from Working Directory to the Staging Area\ngit \n\n# 2. Freeze the Staging Area into a Commit in the Local Repo\ngit "
        },
        type: "bash"
      },
      {
        id: "git-rebase",
        title: "Advanced Git: Merge vs Rebase",
        theory: {
          sections: [
            { type: "heading", content: "The Quest for a Clean History" },
            { type: "text", content: "When you finish a feature branch, you need to integrate it into the `main` branch. There are two ways to do this: Merge and Rebase." },
            { type: "heading", content: "git merge" },
            { type: "text", content: "`git merge` takes the endpoints of two branches and creates a new 'Merge Commit'. It is non-destructive, but it makes the Git history look like a messy spiderweb with lines crossing everywhere." },
            { type: "heading", content: "git rebase (The DevOps Way)" },
            { type: "text", content: "`git rebase main` literally rewrites history. It unplugs your feature branch from where it started, and plugs it into the very tip of the `main` branch. The result is a perfectly straight, linear history. DevOps engineers love rebasing because it makes reading logs much easier." },
            { type: "text", content: "THE GOLDEN RULE OF REBASE: Never rebase a public branch that other people are working on! Because it rewrites history, you will destroy your colleagues' local repositories." }
          ]
        },
        practice: {
          title: "Rewriting History",
          description: "Use rebase to update your feature branch.",
          task: "You are currently on the 'feature-auth' branch. The 'main' branch has moved forward. Write the command to rebase your current branch onto 'main'.",
          starterCode: "# You are currently on branch: feature-auth\n# Your colleagues merged new code into 'main'\n\n# Rebase your branch onto main to get a linear history:\ngit "
        },
        type: "bash"
      },
      {
        id: "git-reflog",
        title: "Time Travel: Reset and Reflog",
        theory: {
          sections: [
            { type: "heading", content: "Undoing Mistakes" },
            { type: "text", content: "Everyone makes mistakes. You committed API keys, or you destroyed a file. Git provides powerful tools to undo things." },
            { type: "list", items: [
              "git reset --soft HEAD~1: Moves HEAD back one commit, but KEEPS your files in the Staging Area. Great for fixing a typo in the last commit.",
              "git reset --hard HEAD~1: The nuke. Moves HEAD back and DESTROYS all changes in your Working Directory. Use with caution."
            ]},
            { type: "heading", content: "The Safety Net: git reflog" },
            { type: "text", content: "You ran `git reset --hard` and deleted a week of work. Is it gone? NO! Git never truly deletes commits immediately." },
            { type: "text", content: "`git reflog` is a hidden diary. It records every single time the tip of your branch (HEAD) moved. You can type `git reflog`, find the hash of your 'deleted' commit, and do `git reset --hard <hash>` to instantly bring your dead code back to life. Reflog is your superpower." }
          ]
        },
        practice: {
          title: "Undo the Last Commit",
          description: "Safely undo a commit without losing code.",
          task: "You just committed some code, but forgot to add a file. You want to undo the commit, but KEEP the files exactly as they are in your working directory. Use `git reset` with the correct flag to go back one commit (HEAD~1).",
          starterCode: "# Undo the last commit, but KEEP all file changes in the working directory\n# Use --soft or --mixed, but NOT --hard!\n\ngit reset "
        },
        type: "bash"
      },
      {
        id: "cicd-philosophy",
        title: "The Philosophy of CI/CD",
        theory: {
          sections: [
            { type: "heading", content: "Stop Deploying from Laptops" },
            { type: "text", content: "In the old days, a developer would build the app on their laptop and manually upload it via FTP to the server. This causes human errors, forgotten tests, and downtime." },
            { type: "heading", content: "Continuous Integration (CI)" },
            { type: "text", content: "CI is a mindset: 'Merge code often and test it automatically'. Every time a developer pushes code to GitHub, a server wakes up, downloads the code, and runs all Unit Tests and Linters. If it fails, the code is blocked from merging. This ensures the `main` branch is always stable." },
            { type: "heading", content: "Continuous Delivery / Deployment (CD)" },
            { type: "text", content: "If the CI tests pass (Green build), CD takes over." },
            { type: "list", items: [
              "Continuous Delivery: The server builds the Docker image and prepares it. A human presses a 'Deploy' button.",
              "Continuous Deployment: Total automation. The server builds the image and deploys it straight to Production without human intervention."
            ]}
          ]
        },
        practice: {
          title: "CI/CD Mental Model",
          description: "Identify the stages of a pipeline.",
          task: "Look at the comments. Assign the correct term (CI or CD) to the specific stage of the pipeline.",
          starterCode: "# Stage 1: Running npm test and ESLint on every Pull Request\n# This belongs to: \n\n# Stage 2: Building a Docker image and updating Kubernetes in Production\n# This belongs to: "
        },
        type: "bash"
      },
      {
        id: "github-actions",
        title: "GitHub Actions: Workflows as Code",
        theory: {
          sections: [
            { type: "heading", content: "Automation built into GitHub" },
            { type: "text", content: "GitHub Actions allows you to run CI/CD pipelines directly on GitHub's servers. Pipelines are written in YAML and stored in your repository under the `.github/workflows/` directory." },
            { type: "heading", content: "The Syntax Hierarchy" },
            { type: "list", items: [
              "on: The trigger. When should this run? (e.g., `on: push` or `on: pull_request`).",
              "jobs: A workflow consists of one or more jobs. Jobs run in parallel by default.",
              "runs-on: The virtual machine OS (e.g., `ubuntu-latest`).",
              "steps: The actual commands executed in a job. They run sequentially.",
              "uses: Calls pre-built actions made by the community (e.g., `uses: actions/checkout@v3` to clone your code)."
            ]},
            { type: "tip", content: "Resource: GitHub Actions Docs. The official docs are fantastic. Pay special attention to the 'Marketplace', where you can find pre-written actions for almost anything (deploying to AWS, sending Slack messages, setting up Node)." }
          ]
        },
        practice: {
          title: "Write a GitHub Action",
          description: "Create a simple CI pipeline in YAML.",
          task: "Complete the GitHub Actions YAML file. 1. Set the trigger to run 'on: push'. 2. Set the job to run on 'ubuntu-latest'. 3. Add a step that runs 'npm test'.",
          starterCode: "name: Node.js CI\n\n# 1. Trigger the workflow on push\n\n\njobs:\n  test:\n    # 2. Run on the latest Ubuntu VM\n    \n    steps:\n      - uses: actions/checkout@v3\n      - uses: actions/setup-node@v3\n        with:\n          node-version: 18\n      - run: npm ci\n      # 3. Run the tests\n      "
        },
        type: "yaml"
      },
      {
        id: "gitlab-ci",
        title: "GitLab CI: The Enterprise Standard",
        theory: {
          sections: [
            { type: "heading", content: "Why Enterprises love GitLab" },
            { type: "text", content: "While GitHub Actions is hugely popular, many large enterprises use GitLab CI. It is often considered more robust for complex, self-hosted corporate environments. GitLab CI uses a single `.gitlab-ci.yml` file." },
            { type: "heading", content: "The Power of Stages" },
            { type: "text", content: "GitLab CI is built heavily around the concept of `stages`. You define stages at the top (e.g., build, test, deploy). Jobs in the same stage run in parallel. Jobs in the next stage wait for the previous stage to finish successfully." },
            { type: "heading", content: "Artifacts" },
            { type: "text", content: "Every job in GitLab runs in an isolated Docker container. If the 'build' job creates a `dist/` folder, the 'deploy' job won't see it because it runs in a new, clean container! To pass files between jobs, you must explicitly declare them as `artifacts`." },
            { type: "tip", content: "Resource: GitLab CI Docs. GitLab's documentation is incredibly thorough. Look up 'GitLab Runners' — these are the actual servers that execute the code. In companies, you often install your own Runners on your own AWS servers for security." }
          ]
        },
        practice: {
          title: "GitLab CI Stages",
          description: "Define a pipeline in GitLab format.",
          task: "Complete the `.gitlab-ci.yml` file. 1. Define three stages: 'build', 'test', 'deploy'. 2. Assign the 'run_tests' job to the 'test' stage.",
          starterCode: "# 1. Define the order of stages\nstages:\n  - \n  - \n  - \n\n# A job definition\nrun_tests:\n  # 2. Assign this job to the test stage\n  \n  script:\n    - echo \"Running unit tests...\"\n    - npm test"
        },
        type: "yaml"
      },
      {
        id: "cicd-secrets",
        title: "Security: Managing Secrets",
        theory: {
          sections: [
            { type: "heading", content: "The Ultimate Sin: Hardcoded Keys" },
            { type: "text", content: "Never, ever write passwords, AWS keys, or database credentials directly into your codebase or your CI/CD YAML files. Bots scan public GitHub repositories 24/7. If you push an AWS key, hackers will find it in 5 seconds and spin up $50,000 worth of crypto-mining servers on your account." },
            { type: "heading", content: "CI/CD Variables / Secrets" },
            { type: "text", content: "Both GitHub and GitLab have a 'Secrets' vault in the repository settings. You store your keys there (e.g., `PROD_DB_PASSWORD`). The CI server securely injects them into the pipeline at runtime as Environment Variables." },
            { type: "text", content: "In GitHub Actions, you access them using the syntax: `${{ secrets.SECRET_NAME }}`." }
          ]
        },
        practice: {
          title: "Injecting Secrets safely",
          description: "Use GitHub Actions secret syntax.",
          task: "You have a job that deploys to AWS. You need to provide the AWS Access Key securely. Complete the `env:` block by injecting the secret named `AWS_ACCESS_KEY_ID` using the `${{ secrets.NAME }}` syntax.",
          starterCode: "jobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - name: Deploy to AWS\n        run: ./deploy_script.sh\n        env:\n          # Safely inject the secret here:\n          AWS_ACCESS_KEY_ID: "
        },
        type: "yaml"
      }
    ]
  },
  RU: {
    title: "Git & CI/CD основы (MUST)",
    description: "Продвинутый Git, GitHub Actions и GitLab CI. Философия контроля версий и автоматизации для DevOps.",
    lessons: [
      {
        id: "git-philosophy",
        title: "Философия Git и 3 Дерева",
        theory: {
          sections: [
            { type: "heading", content: "Машина времени для кода" },
            { type: "text", content: "До появления Git разработчики копировали папки (project_final_v2_final.zip) или использовали централизованные системы (SVN), которые падали, если отключался интернет. Git, созданный Линусом Торвальдсом, — это Распределенная система. Каждый разработчик имеет на своем ноутбуке ПОЛНУЮ, независимую копию всей истории проекта." },
            { type: "heading", content: "Архитектура Трех Деревьев" },
            { type: "text", content: "Чтобы стать мастером Git, нужно понимать, что он жонглирует файлами между тремя 'Деревьями' (зонами):" },
            { type: "list", items: [
              "1. Working Directory (Рабочая директория): То, что вы видите на диске прямо сейчас. Вы редактируете файлы здесь.",
              "2. Staging Area (Индекс / Зона подготовки): 'Погрузочная платформа'. Командой `git add` вы кладете файлы сюда, подготавливая их к следующему коммиту.",
              "3. Local Repository (Локальный репо / HEAD): База данных (скрытая папка .git). Командой `git commit` вы замораживаете всё из Staging Area в постоянный слепок (коммит с SHA-1 хэшем)."
            ]},
            { type: "tip", content: "Ресурс: Книга 'Pro Git' (автор Scott Chacon). Она абсолютно бесплатна онлайн. Прочитайте Главы 1 и 2. Это библия контроля версий. Как только вы поймете логику 'Трех деревьев', Git перестанет казаться черной магией." }
          ]
        },
        practice: {
          title: "3 Дерева в действии",
          description: "Проведите файл через весь цикл Git.",
          task: "Вы изменили файл 'server.js' в Рабочей директории. Напишите две команды: первую, чтобы переместить файл в Staging Area (зону подготовки), и вторую, чтобы навсегда сохранить его в Локальный Репозиторий с сообщением 'Update server'.",
          starterCode: "# 1. Переместите 'server.js' в Staging Area (Индекс)\ngit \n\n# 2. Заморозьте Staging Area в Коммит\ngit "
        },
        type: "bash"
      },
      {
        id: "git-rebase",
        title: "Продвинутый Git: Merge против Rebase",
        theory: {
          sections: [
            { type: "heading", content: "В поисках чистой истории" },
            { type: "text", content: "Когда вы закончили работу в своей ветке (feature), её нужно влить в главную ветку (`main`). Есть два способа: Merge и Rebase." },
            { type: "heading", content: "git merge" },
            { type: "text", content: "`git merge` берет концы двух веток и создает новый 'Merge Commit' (Коммит слияния). Это безопасно, но со временем история коммитов превращается в нечитаемую паутину из переплетающихся линий." },
            { type: "heading", content: "git rebase (Путь DevOps)" },
            { type: "text", content: "`git rebase main` буквально переписывает историю. Он 'отрывает' вашу ветку от того места, где она началась, и прикрепляет её в самый конец текущей ветки `main`. Результат — идеально ровная, линейная история. DevOps-инженеры обожают rebase, так как читать такие логи (git log) — сплошное удовольствие." },
            { type: "text", content: "ЗОЛОТОЕ ПРАВИЛО REBASE: Никогда не делайте rebase публичных веток (например, main), с которыми работают другие люди! Так как rebase переписывает хэши коммитов, вы разрушите локальные репозитории ваших коллег." }
          ]
        },
        practice: {
          title: "Переписывание истории",
          description: "Обновите свою ветку через rebase.",
          task: "Вы находитесь в ветке 'feature-auth'. Ваши коллеги уже влили новый код в 'main'. Напишите команду, чтобы сделать rebase вашей текущей ветки поверх 'main'.",
          starterCode: "# Вы в ветке: feature-auth\n# Коллеги обновили ветку 'main'\n\n# Выполните rebase вашей ветки поверх main:\ngit "
        },
        type: "bash"
      },
      {
        id: "git-reflog",
        title: "Машина времени: Reset и Reflog",
        theory: {
          sections: [
            { type: "heading", content: "Отмена ошибок" },
            { type: "text", content: "Все ошибаются. Случайно закоммитили ключи от AWS или сломали файл. Git дает мощные инструменты для отмены." },
            { type: "list", items: [
              "git reset --soft HEAD~1: Отменяет последний коммит (сдвигает HEAD назад), но ОСТАВЛЯЕТ ваши файлы в Staging Area. Идеально, чтобы поправить опечатку в последнем коммите.",
              "git reset --hard HEAD~1: Ядерная кнопка. Отменяет коммит и ПОЛНОСТЬЮ УНИЧТОЖАЕТ все изменения в Рабочей директории. Используйте с осторожностью."
            ]},
            { type: "heading", content: "Страховочная сетка: git reflog" },
            { type: "text", content: "Вы сделали `git reset --hard` и удалили неделю своей работы. Код потерян? НЕТ! Git почти никогда не удаляет коммиты мгновенно." },
            { type: "text", content: "`git reflog` — это скрытый дневник Git. Он записывает каждый раз, когда указатель HEAD сдвигался. Вы вводите `git reflog`, находите хэш вашего 'удаленного' коммита и пишете `git reset --hard <хэш>`, чтобы мгновенно воскресить потерянный код! Reflog — это ваша суперсила." }
          ]
        },
        practice: {
          title: "Мягкая отмена коммита",
          description: "Безопасно отмените коммит, не потеряв код.",
          task: "Вы только что сделали коммит, но забыли добавить файл. Вы хотите отменить сам факт коммита (вернуться на шаг назад HEAD~1), но СОХРАНИТЬ все файлы в рабочей папке нетронутыми. Используйте `git reset` с правильным флагом.",
          starterCode: "# Отмените коммит, но СОХРАНИТЕ изменения файлов\n# Используйте флаг --soft или --mixed, но НЕ --hard!\n\ngit reset "
        },
        type: "bash"
      },
      {
        id: "cicd-philosophy",
        title: "Философия CI/CD",
        theory: {
          sections: [
            { type: "heading", content: "Хватит деплоить с ноутбуков" },
            { type: "text", content: "Раньше программист собирал проект на своем ноутбуке и вручную загружал файлы на сервер по FTP. Это приводило к человеческим ошибкам, забытым тестам и падениям серверов (Downtime)." },
            { type: "heading", content: "Continuous Integration (CI) - Непрерывная интеграция" },
            { type: "text", content: "CI — это образ мышления: 'Вливай код часто и тестируй его автоматически'. Каждый раз, когда разработчик пушит код в GitHub, просыпается специальный сервер, скачивает код и прогоняет все Unit-тесты и Линтеры. Если тесты падают, код блокируется. Это гарантирует, что ветка `main` всегда стабильна." },
            { type: "heading", content: "Continuous Delivery / Deployment (CD)" },
            { type: "text", content: "Если CI тесты пройдены (Зеленый билд), в дело вступает CD." },
            { type: "list", items: [
              "Непрерывная доставка (Delivery): Сервер собирает Docker-образ и готовит его. Но кнопку 'Deploy в Продакшен' нажимает человек.",
              "Непрерывное развертывание (Deployment): Тотальная автоматизация. Сервер собирает образ и сам деплоит его на боевые сервера без участия человека."
            ]}
          ]
        },
        practice: {
          title: "Ментальная модель CI/CD",
          description: "Определите стадии пайплайна.",
          task: "Посмотрите на комментарии. Напишите правильный термин (CI или CD) для каждого описанного этапа пайплайна.",
          starterCode: "# Этап 1: Запуск npm test и ESLint при каждом Pull Request\n# Это относится к аббревиатуре: \n\n# Этап 2: Сборка Docker-образа и обновление серверов в Продакшене\n# Это относится к аббревиатуре: "
        },
        type: "bash"
      },
      {
        id: "github-actions",
        title: "GitHub Actions: Воркфлоу как Код",
        theory: {
          sections: [
            { type: "heading", content: "Автоматизация внутри GitHub" },
            { type: "text", content: "GitHub Actions позволяет запускать CI/CD пайплайны прямо на серверах GitHub. Пайплайны пишутся на языке YAML и хранятся прямо в вашем репозитории в скрытой папке `.github/workflows/`." },
            { type: "heading", content: "Иерархия синтаксиса" },
            { type: "list", items: [
              "on: Триггер. КОГДА должен запуститься пайплайн? (например, `on: push` или `on: pull_request`).",
              "jobs: Воркфлоу состоит из одной или нескольких Задач (jobs). По умолчанию они выполняются параллельно.",
              "runs-on: Виртуальная машина (ОС), на которой запустится задача (например, `ubuntu-latest`).",
              "steps: Конкретные шаги внутри задачи. Они выполняются строго по очереди.",
              "uses: Вызов готовых 'экшенов', написанных сообществом (например, `uses: actions/checkout@v3` чтобы скачать ваш код на сервер)."
            ]},
            { type: "tip", content: "Ресурс: GitHub Actions Docs. Официальная документация великолепна. Особое внимание уделите разделу 'Marketplace' — там можно найти готовые шаги для чего угодно (деплой в AWS, отправка уведомлений в Slack)." }
          ]
        },
        practice: {
          title: "Напиши GitHub Action",
          description: "Создайте простой CI пайплайн на YAML.",
          task: "Завершите YAML файл для GitHub Actions. 1. Установите триггер на пуш ('on: push'). 2. Укажите, что задача 'test' должна выполняться на 'ubuntu-latest'. 3. В конце добавьте шаг (step), который выполняет консольную команду 'npm test'.",
          starterCode: "name: Node.js CI\n\n# 1. Запуск пайплайна при пуше\n\n\njobs:\n  test:\n    # 2. Виртуальная машина Ubuntu\n    \n    steps:\n      - uses: actions/checkout@v3\n      - uses: actions/setup-node@v3\n        with:\n          node-version: 18\n      - run: npm ci\n      # 3. Запуск тестов\n      "
        },
        type: "yaml"
      },
      {
        id: "gitlab-ci",
        title: "GitLab CI: Корпоративный Стандарт",
        theory: {
          sections: [
            { type: "heading", content: "Почему Enterprise выбирает GitLab" },
            { type: "text", content: "Несмотря на популярность GitHub Actions, огромные корпорации и банки часто используют GitLab CI. Он считается более мощным для сложных внутренних (Self-hosted) инфраструктур. GitLab CI использует единый файл `.gitlab-ci.yml`." },
            { type: "heading", content: "Сила Стадий (Stages)" },
            { type: "text", content: "GitLab CI строится вокруг концепции `stages` (стадии). Вы задаете их порядок в самом верху (например: build, test, deploy). Задачи из одной стадии выполняются параллельно. Задачи из следующей стадии ждут, пока предыдущая стадия завершится успешно." },
            { type: "heading", content: "Артефакты (Artifacts)" },
            { type: "text", content: "Каждая задача (job) в GitLab запускается в изолированном, чистом Docker-контейнере. Если задача 'build' соберет проект в папку `dist/`, то задача 'deploy' её НЕ УВИДИТ, так как запустится в совершенно новом контейнере! Чтобы передать файлы между задачами, вы обязаны явно объявить их как `artifacts`." },
            { type: "tip", content: "Ресурс: GitLab CI Docs. Обязательно прочитайте про концепцию 'GitLab Runners'. Раннеры — это физические серверы, которые реально выполняют ваш код. В компаниях вы будете сами устанавливать Раннеры на корпоративные сервера для безопасности." }
          ]
        },
        practice: {
          title: "Стадии в GitLab CI",
          description: "Определите пайплайн в формате GitLab.",
          task: "Допишите файл `.gitlab-ci.yml`. 1. В блоке stages укажите порядок: 'build', 'test', 'deploy'. 2. Привяжите задачу 'run_tests' к стадии 'test'.",
          starterCode: "# 1. Определяем порядок стадий\nstages:\n  - \n  - \n  - \n\n# Описание задачи\nrun_tests:\n  # 2. Привязываем задачу к стадии test\n  \n  script:\n    - echo \"Running unit tests...\"\n    - npm test"
        },
        type: "yaml"
      },
      {
        id: "cicd-secrets",
        title: "Безопасность: Управление Секретами",
        theory: {
          sections: [
            { type: "heading", content: "Смертный грех: Хардкод ключей" },
            { type: "text", content: "Никогда, ни при каких обстоятельствах не пишите пароли от баз данных или ключи от AWS прямо в коде или в YAML-файлах CI/CD. По публичному GitHub 24/7 бродят боты-хакеры. Если вы запушите ключ от AWS, через 5 секунд бот найдет его и развернет на вашем аккаунте серверов для майнинга крипты на $50,000." },
            { type: "heading", content: "Секреты в CI/CD (Secrets)" },
            { type: "text", content: "И в GitHub, и в GitLab есть защищенное хранилище Секретов в настройках репозитория. Вы сохраняете ключ там (под именем, например, `PROD_DB_PASSWORD`)." },
            { type: "text", content: "CI-сервер безопасно 'впрыскивает' (Inject) эти ключи прямо во время выполнения пайплайна в виде Переменных окружения (Environment Variables). В GitHub Actions к ним обращаются через синтаксис: `${{ secrets.SECRET_NAME }}`." }
          ]
        },
        practice: {
          title: "Безопасное внедрение секретов",
          description: "Используйте синтаксис секретов GitHub Actions.",
          task: "У вас есть задача деплоя в AWS. Вам нужно передать скрипту секретный ключ доступа AWS. Допишите блок `env:`, внедрив секрет с именем `AWS_ACCESS_KEY_ID`, используя синтаксис `${{ secrets.ИМЯ_СЕКРЕТА }}`.",
          starterCode: "jobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - name: Deploy to AWS\n        run: ./deploy_script.sh\n        env:\n          # Безопасно внедрите секрет сюда:\n          AWS_ACCESS_KEY_ID: "
        },
        type: "yaml"
      }
    ]
  }
};