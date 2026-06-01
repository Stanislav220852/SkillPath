export const terraformIacState: Record<'EN' | 'RU', any> = {
  EN: {
    title: "Terraform & IaC (CORE)",
    description: "Infrastructure as Code, Providers, and State Management. Learn to automate cloud provisioning.",
    lessons: [
      {
        id: "tf-intro-iac",
        title: "The End of ClickOps: What is IaC?",
        theory: {
          sections: [
            { type: "heading", content: "The Problem with Manual Infrastructure" },
            { type: "text", content: "Imagine you need to deploy a complex app. You open the AWS console and click buttons to create an EC2 server, a VPC network, security groups, and an RDS database. This is called 'ClickOps'. What if the region goes down? Or what if you need to replicate this exact setup for a Staging environment? You'd have to click through the console all over again, and human error is guaranteed." },
            { type: "heading", content: "Infrastructure as Code (IaC)" },
            { type: "text", content: "IaC solves this by allowing you to write your infrastructure as plain text code. You push it to Git, peer-review it, and deploy it identically every single time." },
            { type: "heading", content: "Declarative vs Imperative" },
            { type: "text", content: "Terraform is Declarative. You don't write a script saying HOW to create a server (Imperative: 'call AWS API -> wait -> if success -> create DB'). Instead, you declare WHAT you want: 'I want 3 servers and 1 DB'. Terraform figures out the API calls and the exact order of operations to make reality match your code." },
            { type: "tip", content: "Resource: 'Terraform Up & Running' by Yevgeniy Brikman. This book is the absolute bible for IaC. The first chapter perfectly explains why Terraform beat older tools like Chef or Puppet." }
          ]
        },
        practice: {
          title: "Declarative Thinking",
          description: "Identify the declarative approach.",
          task: "This is a conceptual task. Read the pseudo-code snippets. Uncomment the block that represents the Declarative approach (Terraform style) and leave the Imperative approach commented.",
          starterCode: "# Which snippet is Declarative?\n\n# --- SNIPPET A ---\n# aws ec2 run-instances --image-id ami-123\n# sleep 60\n# aws rds create-db-instance --db-name mydb\n\n# --- SNIPPET B ---\n# resource \"aws_instance\" \"web\" { count = 1 }\n# resource \"aws_db_instance\" \"db\" { name = \"mydb\" }"
        },
        type: "yaml"
      },
      {
        id: "tf-hcl-providers",
        title: "HCL Syntax & Providers",
        theory: {
          sections: [
            { type: "heading", content: "The Language: HCL" },
            { type: "text", content: "Terraform uses HashiCorp Configuration Language (HCL). It is designed to be highly readable for humans, unlike raw JSON. It revolves around 'blocks'." },
            { type: "heading", content: "Providers: The Plugins" },
            { type: "text", content: "Terraform itself doesn't know how to create an AWS server or a GitHub repository. It relies on 'Providers'. A Provider is a plugin (written in Go) that understands the API of a specific platform (AWS, GCP, Azure, or even Spotify/GitHub)." },
            { type: "code", content: "terraform {\n  required_providers {\n    aws = {\n      source  = \"hashicorp/aws\"\n      version = \"~> 5.0\"\n    }\n  }\n}\n\nprovider \"aws\" {\n  region = \"us-east-1\"\n}" },
            { type: "heading", content: "Resources" },
            { type: "text", content: "The `resource` block is where the magic happens. It tells the provider to create a specific piece of infrastructure." },
            { type: "tip", content: "Resource: HashiCorp Learn. The official tutorials are the best place to learn how to configure your first provider and authenticate with cloud platforms securely." }
          ]
        },
        practice: {
          title: "Write Your First Resource",
          description: "Define a cloud resource in HCL.",
          task: "Write a resource block to create an AWS S3 bucket. The resource type must be \"aws_s3_bucket\". The local Terraform name for this resource should be \"my_storage\". Inside the block, set the 'bucket' argument to \"company-production-assets\".",
          starterCode: "# Define the provider\nprovider \"aws\" {\n  region = \"eu-central-1\"\n}\n\n# Define the S3 Bucket resource\nresource \"\" \"\" {\n  \n}"
        },
        type: "yaml"
      },
      {
        id: "tf-state",
        title: "The Brain: State Management",
        theory: {
          sections: [
            { type: "heading", content: "How does Terraform remember?" },
            { type: "text", content: "You write `resource \"aws_instance\" \"web\" {}` and apply it. Terraform creates the server. If you run the code again, why doesn't Terraform create a SECOND server?" },
            { type: "text", content: "Because of the State File (`terraform.tfstate`). When Terraform creates the server, it records its real AWS ID (e.g., i-0abcd1234) into a massive JSON file. Next time you run it, Terraform reads the State, asks AWS about 'i-0abcd1234', sees it already exists, and does nothing!" },
            { type: "heading", content: "The Golden Rule of State" },
            { type: "text", content: "The `.tfstate` file is the absolute source of truth. If you manually delete a server in the AWS Web Console (ClickOps), Terraform's state becomes out-of-sync. On the next run, Terraform will say: 'Wait, the server in my State file is missing in reality! I will recreate it immediately!'." },
            { type: "list", items: [
              "Never edit the .tfstate file manually.",
              "Never commit the .tfstate file to Git (it often contains unencrypted database passwords!)."
            ]}
          ]
        },
        practice: {
          title: "Understanding State Synchronization",
          description: "Grasp how Terraform diffs code vs reality.",
          task: "This is a mental exercise. Read the comments and fill in the missing word describing what Terraform will do (e.g., 'create', 'destroy', 'update', 'nothing').",
          starterCode: "# Scenario 1: Code has 1 server. State has 1 server. Reality has 1 server.\n# Terraform action: \n\n# Scenario 2: Code has 1 server. State has 1 server. Reality has 0 servers (admin manually deleted it).\n# Terraform action: \n\n# Scenario 3: Code has 0 servers. State has 1 server. Reality has 1 server.\n# Terraform action: "
        },
        type: "yaml"
      },
      {
        id: "tf-remote-state",
        title: "Teamwork: Remote State & Locking",
        theory: {
          sections: [
            { type: "heading", content: "The Local State Nightmare" },
            { type: "text", content: "If Bob runs Terraform, his laptop generates a `terraform.tfstate` file. If Alice runs Terraform on her laptop, she doesn't have Bob's state file. Terraform thinks the infrastructure doesn't exist and tries to create duplicate servers, causing a massive cloud failure." },
            { type: "heading", content: "Remote Backends" },
            { type: "text", content: "To work in a team, the State file must be stored in a central, shared location. The industry standard is an AWS S3 Bucket. When Bob or Alice runs Terraform, it pulls the state from S3." },
            { type: "heading", content: "State Locking (DynamoDB)" },
            { type: "text", content: "What if Bob and Alice run `terraform apply` at the exact same millisecond? They will corrupt the S3 state file. To prevent this, we use a 'Lock'. In AWS, we use a DynamoDB table. When Bob starts, DynamoDB creates a lock. Alice's terminal will say 'Waiting for state lock...' until Bob finishes." },
            { type: "tip", content: "Resource: Pluralsight. If you want a deep dive into enterprise Terraform architectures (Remote State, Workspaces, CI/CD integration), Pluralsight's 'Terraform Deep Dive' courses are highly recommended." }
          ]
        },
        practice: {
          title: "Configure a Remote Backend",
          description: "Set up S3 and DynamoDB for team collaboration.",
          task: "Complete the backend configuration block. Specify the 'bucket' name as 'my-tf-state-bucket', the 'key' (filename) as 'prod/terraform.tfstate', the 'region' as 'us-east-1', and the 'dynamodb_table' for locking as 'terraform-locks'.",
          starterCode: "terraform {\n  backend \"s3\" {\n    bucket         = \"\"\n    key            = \"\"\n    region         = \"\"\n    dynamodb_table = \"\"\n    encrypt        = true\n  }\n}"
        },
        type: "yaml"
      },
      {
        id: "tf-modules",
        title: "Don't Repeat Yourself: Modules",
        theory: {
          sections: [
            { type: "heading", content: "The Copy-Paste Problem" },
            { type: "text", content: "Creating a production-ready Database isn't just one block of code. You need the DB instance, a Subnet Group, Security Groups, and Password generation. It can be 200 lines of HCL. If you need 5 databases, copy-pasting 1000 lines is a terrible practice." },
            { type: "heading", content: "Terraform Modules" },
            { type: "text", content: "Modules are the equivalent of 'Functions' in programming. You write the 200 lines of DB configuration once, put it in a folder (e.g., `./modules/database`), and expose variables (like `db_name` and `storage_size`)." },
            { type: "text", content: "Then, in your main code, you just 'call' the module:" },
            { type: "code", content: "module \"marketing_db\" {\n  source = \"./modules/database\"\n  db_name = \"marketing\"\n  size_gb = 100\n}" },
            { type: "text", content: "Modules keep your infrastructure code DRY (Don't Repeat Yourself) and highly readable." }
          ]
        },
        practice: {
          title: "Call a Terraform Module",
          description: "Instantiate a reusable infrastructure block.",
          task: "Write a module block named 'frontend_server'. Set the 'source' argument to 'terraform-aws-modules/ec2-instance/aws' (this pulls a verified module directly from the Terraform Public Registry!). Pass the 'instance_type' argument as 't3.micro'.",
          starterCode: "# Call an external module from the Terraform Registry\n\nmodule \"\" {\n  source        = \"\"\n  instance_type = \"\"\n  name          = \"React-App\"\n}"
        },
        type: "yaml"
      },
      {
        id: "tf-lifecycle",
        title: "The Lifecycle: Init, Plan, Apply",
        theory: {
          sections: [
            { type: "heading", content: "The Daily Routine" },
            { type: "text", content: "A DevOps engineer's daily interaction with Terraform follows a strict 3-step lifecycle:" },
            { type: "list", items: [
              "1. terraform init: The setup. It downloads the Provider plugins (AWS, GCP) and connects to your Remote Backend (S3). You run this once per project.",
              "2. terraform plan: The safety net. A 'dry run'. Terraform compares your code to the State file and prints a report: 'I will create 2 things, update 1, and destroy 0'. It does NOT change the cloud. You MUST review this output carefully to avoid accidental deletions.",
              "3. terraform apply: The execution. It shows you the plan one last time, asks you to type 'yes', and then reaches out to the AWS API to actually create the servers."
            ]},
            { type: "text", content: "To delete everything and stop paying AWS, you run `terraform destroy`." }
          ]
        },
        practice: {
          title: "The CLI Workflow",
          description: "Execute the Terraform lifecycle commands.",
          task: "Write the three main Terraform CLI commands in the correct order: first, initialize the directory. Second, generate an execution plan to see what will happen. Third, apply the changes to the cloud.",
          starterCode: "# 1. Download providers and setup backend\n\n\n# 2. See what changes will be made (Dry Run)\n\n\n# 3. Actually create the infrastructure in AWS\n"
        },
        type: "bash"
      }
    ]
  },
  RU: {
    title: "Terraform & IaC (CORE)",
    description: "Инфраструктура как код, провайдеры и управление State. Научитесь автоматизировать развертывание облаков.",
    lessons: [
      {
        id: "tf-intro-iac",
        title: "Конец эпохи ClickOps: Что такое IaC?",
        theory: {
          sections: [
            { type: "heading", content: "Проблема ручного управления" },
            { type: "text", content: "Представьте: вам нужно развернуть проект. Вы открываете консоль AWS в браузере и кликаете кнопки: создать сервер (EC2), создать сеть (VPC), открыть порты (Security Group) и поднять базу (RDS). Это называется 'ClickOps'. А если дата-центр упадет? А если нужно создать точную копию проекта для тестового окружения? Вам придется снова кликать по памяти, и человеческая ошибка гарантирована." },
            { type: "heading", content: "Infrastructure as Code (IaC)" },
            { type: "text", content: "IaC (Инфраструктура как Код) решает это, позволяя описывать всю архитектуру в виде обычного текста. Вы пушите этот код в Git, коллеги проверяют его (Code Review), и вы разворачиваете его 100% идентично каждый раз." },
            { type: "heading", content: "Декларативный против Императивного" },
            { type: "text", content: "Terraform — это Декларативный инструмент. Вы не пишете скрипт, КАК создать сервер (Императивный подход: 'вызови API -> подожди -> если успех -> создай БД'). Вы просто декларируете, ЧТО вы хотите получить: 'Я хочу 3 сервера и 1 БД'. Terraform сам вычисляет, какие API-запросы отправить и в каком порядке, чтобы реальность совпала с вашим кодом." },
            { type: "tip", content: "Ресурс: Книга 'Terraform Up & Running' (Евгений Брикман). Это абсолютная библия DevOps. Первая глава идеально объясняет, почему Terraform победил старые инструменты вроде Chef, Puppet и Ansible." }
          ]
        },
        practice: {
          title: "Декларативное мышление",
          description: "Определите декларативный подход.",
          task: "Концептуальная задача. Прочитайте фрагменты псевдо-кода. Раскомментируйте тот блок, который представляет Декларативный подход (в стиле Terraform), а Императивный оставьте закомментированным.",
          starterCode: "# Какой блок является Декларативным?\n\n# --- ВАРИАНТ А ---\n# aws ec2 run-instances --image-id ami-123\n# sleep 60\n# aws rds create-db-instance --db-name mydb\n\n# --- ВАРИАНТ Б ---\n# resource \"aws_instance\" \"web\" { count = 1 }\n# resource \"aws_db_instance\" \"db\" { name = \"mydb\" }"
        },
        type: "yaml"
      },
      {
        id: "tf-hcl-providers",
        title: "Синтаксис HCL и Провайдеры",
        theory: {
          sections: [
            { type: "heading", content: "Язык: HCL" },
            { type: "text", content: "Terraform использует язык HCL (HashiCorp Configuration Language). В отличие от JSON, он создан для того, чтобы его было легко читать людям. Он строится вокруг 'блоков' (blocks)." },
            { type: "heading", content: "Провайдеры: Плагины для облаков" },
            { type: "text", content: "Сам по себе Terraform — пустышка. Он не знает, как создать сервер в AWS или репозиторий в GitHub. Он опирается на 'Провайдеры'. Провайдер — это плагин (написанный на Go), который 'понимает' API конкретной платформы (AWS, GCP, Azure, Docker)." },
            { type: "code", content: "terraform {\n  required_providers {\n    aws = {\n      source  = \"hashicorp/aws\"\n      version = \"~> 5.0\"\n    }\n  }\n}\n\nprovider \"aws\" {\n  region = \"eu-central-1\"\n}" },
            { type: "heading", content: "Ресурсы (Resources)" },
            { type: "text", content: "Блок `resource` — это место, где происходит магия. Он приказывает провайдеру создать конкретный кусок инфраструктуры." },
            { type: "tip", content: "Ресурс: HashiCorp Learn. Официальные туториалы от создателей — лучшее место для старта. Там подробно объясняется, как настроить первый провайдер и безопасно передать ему токены авторизации." }
          ]
        },
        practice: {
          title: "Напиши свой первый Resource",
          description: "Задекларируйте облачный ресурс на HCL.",
          task: "Напишите блок resource для создания S3-бакета в AWS. Тип ресурса должен быть \"aws_s3_bucket\". Локальное имя для Terraform (используется внутри кода) назовите \"my_storage\". Внутри блока задайте аргумент 'bucket' со значением \"company-production-assets\" (это реальное имя бакета в облаке).",
          starterCode: "# Определяем провайдера\nprovider \"aws\" {\n  region = \"eu-central-1\"\n}\n\n# Определяем ресурс S3 Bucket\nresource \"\" \"\" {\n  \n}"
        },
        type: "yaml"
      },
      {
        id: "tf-state",
        title: "Мозг системы: Управление State",
        theory: {
          sections: [
            { type: "heading", content: "Как Terraform 'запоминает'?" },
            { type: "text", content: "Вы пишете `resource \"aws_instance\" \"web\" {}` и применяете код. Сервер создается. Если вы запустите этот же код второй раз, почему Terraform не создаст ВТОРОЙ сервер?" },
            { type: "text", content: "Всё дело в Файле Состояния (`terraform.tfstate`). Когда Terraform создает сервер, он записывает его реальный ID в AWS (например, i-0abcd1234) в гигантский JSON файл (стейт). При следующем запуске Terraform читает этот Стейт, спрашивает у AWS: 'Сервер i-0abcd1234 всё еще жив?', видит, что он жив, и ничего не делает!" },
            { type: "heading", content: "Золотое правило Стейта" },
            { type: "text", content: "Файл `.tfstate` — это абсолютный источник правды. Если сисадмин зайдет в консоль AWS браузером и удалит сервер руками, стейт рассинхронизируется. При следующем запуске Terraform скажет: 'Погоди-ка, в моем стейте сервер есть, а в реальности его нет! Я немедленно воссоздам его!'." },
            { type: "list", items: [
              "Никогда не редактируйте файл .tfstate руками.",
              "Никогда не коммитьте .tfstate в Git (он часто содержит пароли от баз данных в открытом виде!)."
            ]}
          ]
        },
        practice: {
          title: "Синхронизация Стейта",
          description: "Поймите, как Terraform сравнивает код и реальность.",
          task: "Мысленное упражнение. Прочитайте сценарии в комментариях и впишите нужное слово, описывающее действие Terraform (например, 'создаст', 'удалит', 'ничего').",
          starterCode: "# Сценарий 1: В коде 1 сервер. В стейте 1 сервер. В реальности (AWS) 1 сервер.\n# Действие Terraform: \n\n# Сценарий 2: В коде 1 сервер. В стейте 1 сервер. В реальности 0 серверов (админ удалил руками).\n# Действие Terraform: \n\n# Сценарий 3: В коде 0 серверов (строку удалили). В стейте 1 сервер. В реальности 1 сервер.\n# Действие Terraform: "
        },
        type: "yaml"
      },
      {
        id: "tf-remote-state",
        title: "Командная работа: Remote State и Locking",
        theory: {
          sections: [
            { type: "heading", content: "Кошмар локального стейта" },
            { type: "text", content: "Если Боб запустит Terraform, файл `terraform.tfstate` сгенерируется на его ноутбуке. Если Алиса попытается запустить этот же код со своего ноутбука, у неё не будет стейт-файла Боба. Terraform подумает, что инфраструктуры не существует, и попытается создать дубликаты всех серверов. Это крах для компании." },
            { type: "heading", content: "Удаленный Стейт (Remote Backend)" },
            { type: "text", content: "Для работы в команде файл State должен храниться в центральном, защищенном месте. Стандарт индустрии — это корзина AWS S3. Когда любой из разработчиков запускает код, Terraform автоматически скачивает актуальный стейт из S3." },
            { type: "heading", content: "Блокировка стейта (DynamoDB State Locking)" },
            { type: "text", content: "Что если Боб и Алиса запустят `terraform apply` в одну и ту же миллисекунду? Они повредят стейт в S3. Чтобы этого избежать, используют 'Замки' (Locks). В AWS для этого используется таблица DynamoDB. Когда Боб начинает деплой, DynamoDB ставит замок. Терминал Алисы напишет 'Ожидание снятия блокировки стейта...' и будет ждать, пока Боб не закончит." },
            { type: "tip", content: "Ресурс: Pluralsight. Если вы хотите глубоко изучить Enterprise архитектуру Terraform (Remote State, Workspaces, интеграцию с CI/CD), курсы из серии 'Terraform Deep Dive' на платформе Pluralsight — это лучший выбор." }
          ]
        },
        practice: {
          title: "Настройка Remote Backend",
          description: "Настройте S3 и DynamoDB для работы в команде.",
          task: "Допишите блок настройки бэкенда (backend 's3'). Укажите 'bucket' как 'my-tf-state-bucket', 'key' (имя файла в облаке) как 'prod/terraform.tfstate', 'region' как 'us-east-1' и таблицу для блокировок 'dynamodb_table' как 'terraform-locks'.",
          starterCode: "terraform {\n  backend \"s3\" {\n    bucket         = \"\"\n    key            = \"\"\n    region         = \"\"\n    dynamodb_table = \"\"\n    encrypt        = true\n  }\n}"
        },
        type: "yaml"
      },
      {
        id: "tf-modules",
        title: "Не повторяйся (DRY): Модули",
        theory: {
          sections: [
            { type: "heading", content: "Проблема 'Копипасты'" },
            { type: "text", content: "Создание готовой к продакшену Базы Данных — это не один блок кода. Вам нужна сама БД, Подсети (Subnet Group), Группы безопасности (Firewall), и авто-генерация паролей. Это может занять 200 строк на HCL. Если компании нужно 5 разных баз данных, копипастить 1000 строк — ужасная практика." },
            { type: "heading", content: "Terraform Modules (Модули)" },
            { type: "text", content: "Модули — это аналог 'Функций' в программировании. Вы пишете эти 200 строк один раз, кладете их в папку (например, `./modules/database`) и выводите наружу переменные (например, `db_name` и `storage_size`)." },
            { type: "text", content: "Затем в основном коде вы просто 'вызываете' этот модуль:" },
            { type: "code", content: "module \"marketing_db\" {\n  source = \"./modules/database\"\n  db_name = \"marketing\"\n  size_gb = 100\n}" },
            { type: "text", content: "Модули делают ваш инфраструктурный код компактным, чистым и многоразовым (DRY)." }
          ]
        },
        practice: {
          title: "Вызов модуля Terraform",
          description: "Используйте готовый блок инфраструктуры.",
          task: "Напишите блок module с именем 'frontend_server'. Задайте аргумент 'source' как 'terraform-aws-modules/ec2-instance/aws' (это загрузит проверенный код модуля прямиком из публичного Terraform Registry!). Передайте аргумент 'instance_type' как 't3.micro'.",
          starterCode: "# Вызов внешнего модуля из Terraform Registry\n\nmodule \"\" {\n  source        = \"\"\n  instance_type = \"\"\n  name          = \"React-App\"\n}"
        },
        type: "yaml"
      },
      {
        id: "tf-lifecycle",
        title: "Жизненный цикл: Init, Plan, Apply",
        theory: {
          sections: [
            { type: "heading", content: "Ежедневная рутина DevOps" },
            { type: "text", content: "Работа с Terraform в консоли всегда строится на строгом трехшаговом жизненном цикле:" },
            { type: "list", items: [
              "1. terraform init: Инициализация. Скачивает плагины провайдеров (AWS, GCP) и подключается к вашему Remote Backend (S3). Запускается один раз при скачивании проекта.",
              "2. terraform plan: Страховочная сетка. Это 'репетиция' (Dry run). Terraform сверяет ваш код с текущим стейтом и выводит отчет: 'Я планирую создать 2 ресурса, изменить 1 и удалить 0'. В облаке при этом НИЧЕГО не меняется. Вы ОБЯЗАНЫ читать этот отчет, чтобы не удалить базу данных случайно.",
              "3. terraform apply: Выполнение. Он еще раз покажет план, попросит вас напечатать 'yes', и после этого реально отправит API запросы в AWS для создания серверов."
            ]},
            { type: "text", content: "Чтобы удалить всю инфраструктуру проекта и перестать платить Amazon, используется команда `terraform destroy`." }
          ]
        },
        practice: {
          title: "CLI Воркфлоу",
          description: "Выполните команды жизненного цикла.",
          task: "Напишите три главные команды Terraform CLI в правильном порядке. Сначала инициализация папки. Затем создание плана выполнения (чтобы увидеть, что произойдет). И в конце — применение изменений в облако.",
          starterCode: "# 1. Скачивание провайдеров и настройка бэкенда\n\n\n# 2. Проверка того, какие изменения будут внесены (Сухой прогон)\n\n\n# 3. Реальное создание инфраструктуры в AWS\n"
        },
        type: "bash"
      }
    ]
  }
};