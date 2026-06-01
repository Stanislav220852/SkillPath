export const cloudState: Record<'EN' | 'RU', any> = {
  EN: {
    title: "Cloud Computing (AWS/GCP) PRO",
    description: "EC2, S3, Lambda, and Production Deployment. Master the modern cloud infrastructure.",
    lessons: [
      {
        id: "cloud-intro-ec2",
        title: "The Cloud Shift & Compute (EC2)",
        theory: {
          sections: [
            { type: "heading", content: "On-Premise vs Cloud" },
            { type: "text", content: "Historically, companies bought physical servers (On-Premise). This required huge upfront costs (CapEx) and guessing how much traffic you'd get. If you went viral, your servers crashed. If traffic died, expensive servers sat idle." },
            { type: "text", content: "Cloud computing (AWS, Google Cloud, Azure) allows you to 'rent' servers by the second (OpEx). You can scale up to 100 servers on Black Friday and scale down to 1 server the next day, paying only for what you use." },
            { type: "heading", content: "IaaS: Amazon EC2" },
            { type: "text", content: "EC2 (Elastic Compute Cloud) in AWS or Compute Engine in GCP is Infrastructure as a Service (IaaS). It is literally just a Virtual Machine (Linux or Windows) running in an Amazon data center. You get SSH access and can install Docker, Node.js, or whatever you want." },
            { type: "tip", content: "Resource: AWS Free Tier. Create an AWS account. They give you 750 hours per month of a 't2.micro' EC2 instance absolutely for free for a whole year. It's the best way to practice SSHing into a real cloud server." }
          ]
        },
        practice: {
          title: "Launch an EC2 Instance (CLI)",
          description: "Use the AWS CLI to start a server.",
          task: "In production, we don't click buttons in the browser; we use the AWS CLI. Write the command to run an instance using `aws ec2 run-instances`. Pass the image ID 'ami-12345' and set the instance type to 't2.micro'.",
          starterCode: "# Launch a free-tier eligible virtual machine in the cloud\n\naws ec2 run-instances \\\n    --image-id \n    --instance-type \n    --key-name MyKeyPair"
        },
        type: "bash"
      },
      {
        id: "cloud-s3",
        title: "Stateless Backends & Object Storage (S3)",
        theory: {
          sections: [
            { type: "heading", content: "The Golden Rule: Stateless Servers" },
            { type: "text", content: "Never store user uploads (images, PDFs) on the local hard drive of your EC2 instance! Cloud servers are 'ephemeral'—they can be destroyed and recreated at any time by the Auto-Scaler. If a server dies, all local files are lost." },
            { type: "heading", content: "Amazon S3 (Simple Storage Service)" },
            { type: "text", content: "S3 is an Object Storage service. It is not a hard drive (you can't install an OS on it). It's a massive, infinitely scalable 'folder' in the cloud where you store files (Objects) inside 'Buckets'." },
            { type: "text", content: "S3 provides 99.999999999% (11 nines) durability. This means if you store 10 million files, you might lose one file every 10,000 years." },
            { type: "code", content: "// Node.js example: Uploading to S3\nconst s3 = new AWS.S3();\nawait s3.putObject({\n  Bucket: 'my-app-avatars',\n  Key: 'user-123.jpg',\n  Body: fileBuffer\n}).promise();" },
            { type: "tip", content: "Security Warning: When creating an S3 bucket, NEVER make it public unless it's strictly for hosting public website assets (like CSS/JS). Leaking private user data via misconfigured public S3 buckets is the #1 cloud security breach in the world." }
          ]
        },
        practice: {
          title: "Upload a file to S3",
          description: "Use the AWS CLI to copy a file to a bucket.",
          task: "Write the AWS CLI command to copy (`cp`) a local file named 'backup.zip' to an S3 bucket named 'company-backups'.",
          starterCode: "# Syntax: aws s3 cp [local_file] s3://[bucket_name]/[destination_key]\n\naws s3 "
        },
        type: "bash"
      },
      {
        id: "cloud-rds",
        title: "Managed Databases (RDS & High Availability)",
        theory: {
          sections: [
            { type: "heading", content: "Why not run Postgres on EC2?" },
            { type: "text", content: "You can easily install PostgreSQL on an EC2 virtual machine. But then YOU are responsible for operating system updates, database backups, and fixing it if the hard drive corrupts at 3 AM." },
            { type: "heading", content: "PaaS: Amazon RDS" },
            { type: "text", content: "Amazon RDS (Relational Database Service) or Google Cloud SQL is Platform as a Service (PaaS). AWS provisions the server, installs Postgres, handles daily backups, and patches the OS. You just get a connection string to connect your backend." },
            { type: "heading", content: "High Availability (Multi-AZ)" },
            { type: "text", content: "The killer feature of RDS is 'Multi-AZ' (Multiple Availability Zones). An Availability Zone is a physical data center. If you enable Multi-AZ, AWS creates a hidden replica of your database in a different building 50 miles away. If the primary building loses power, AWS automatically switches your traffic to the replica in 60 seconds with zero data loss." },
            { type: "tip", content: "Resource: A Cloud Guru. If you want to dive deep into Cloud Architecture, High Availability, and prepare for AWS Certifications, the 'A Cloud Guru' platform is the undisputed industry leader." }
          ]
        },
        practice: {
          title: "Connect to Cloud SQL",
          description: "Connect to a remote RDS instance.",
          task: "You've spun up a Postgres RDS instance. AWS gives you an Endpoint (URL). Write the standard `psql` command to connect to it. Use host (-h) 'db.xyz.eu-central-1.rds.amazonaws.com', user (-U) 'admin', and database name (-d) 'prod_db'.",
          starterCode: "# Connect to your Managed Database in the cloud\n\npsql -h  -U  -d "
        },
        type: "bash"
      },
      {
        id: "cloud-serverless",
        title: "The Serverless Revolution (AWS Lambda)",
        theory: {
          sections: [
            { type: "heading", content: "What if there are no servers?" },
            { type: "text", content: "Even with EC2, you still pay for a server 24/7, even if nobody uses your app at night. You also have to scale it manually when traffic spikes." },
            { type: "text", content: "Enter Serverless (AWS Lambda / Google Cloud Functions). 'Serverless' doesn't mean there are no servers; it means YOU don't manage them." },
            { type: "heading", content: "How Lambda Works" },
            { type: "text", content: "You just write a JavaScript or Python function and upload it to AWS. The function sits there doing nothing (and costing $0). When an event occurs (e.g., a user makes an HTTP request, or an image is uploaded to S3), AWS instantly spins up a micro-container, runs your function for 200 milliseconds, bills you only for those 200ms, and destroys the container." },
            { type: "text", content: "If 10,000 users click the button at the same time, AWS runs 10,000 copies of your function in parallel. Infinite, instant scaling." },
            { type: "tip", content: "Resource: GCP Codelabs. Google Cloud Codelabs provide amazing, step-by-step, free tutorials. Try their 'Serverless Cloud Functions' codelab to build an event-driven app in under an hour." }
          ]
        },
        practice: {
          title: "Write an AWS Lambda",
          description: "Write the entry point for a Serverless function.",
          task: "An AWS Lambda function in Node.js must export a function named 'handler'. It takes an 'event' object (which contains the request data). Write the handler function that returns an object with statusCode: 200 and a body: 'Hello Serverless!'.",
          starterCode: "// AWS Lambda Node.js Entry Point\n\nexports.handler = async (event) => {\n    // Log the incoming HTTP request data\n    console.log(\"Received event:\", JSON.stringify(event));\n    \n    // Return the HTTP response\n    return {\n        \n    };\n};"
        },
        type: "javascript"
      },
      {
        id: "cloud-iac-terraform",
        title: "Infrastructure as Code (Terraform)",
        theory: {
          sections: [
            { type: "heading", content: "The Problem with 'ClickOps'" },
            { type: "text", content: "When beginners learn AWS, they use the Web Console, clicking buttons to create EC2 instances and databases. This is called 'ClickOps'. In a real company, ClickOps is forbidden." },
            { type: "text", content: "If your architecture consists of 50 servers, 10 databases, and complex networking, and someone accidentally deletes it, reproducing it by clicking buttons from memory is impossible." },
            { type: "heading", content: "Infrastructure as Code (IaC)" },
            { type: "text", content: "We write our cloud infrastructure using code (Terraform or AWS CloudFormation) and store it in Git. If a server burns down, we simply type `terraform apply`, and the cloud provider rebuilds the exact architecture automatically in minutes." },
            { type: "code", content: "provider \"aws\" {\n  region = \"eu-central-1\"\n}\n\nresource \"aws_s3_bucket\" \"my_bucket\" {\n  bucket = \"company-production-assets\"\n}" },
            { type: "text", content: "Terraform uses a declarative language (HCL). You don't write *how* to create the server; you declare *what* state you want to exist, and Terraform figures out the API calls to make it happen." }
          ]
        },
        practice: {
          title: "Define an EC2 Instance in Terraform",
          description: "Write your first IaC resource.",
          task: "Complete the Terraform (HCL) code to declare an AWS EC2 instance. The resource type is 'aws_instance' and name it 'web_server'. Provide the ami 'ami-12345' and instance_type 't2.micro'.",
          starterCode: "# Define the cloud provider\nprovider \"aws\" {\n  region = \"us-east-1\"\n}\n\n# Define the EC2 Virtual Machine\nresource \"\" \"web_server\" {\n  ami           = \"\"\n  instance_type = \"\"\n  \n  tags = {\n    Name = \"Production-Backend\"\n  }\n}"
        },
        type: "yaml"
      }
    ]
  },
  RU: {
    title: "Облака (AWS/GCP) PRO",
    description: "EC2, S3, Lambda и деплой в продакшн. Овладейте современной облачной инфраструктурой.",
    lessons: [
      {
        id: "cloud-intro-ec2",
        title: "Переход в облако и Виртуальные машины (EC2)",
        theory: {
          sections: [
            { type: "heading", content: "On-Premise против Облаков" },
            { type: "text", content: "Исторически компании покупали физические серверы и ставили их в подвал (On-Premise). Это требовало огромных капитальных затрат (CapEx). Приходилось угадывать трафик. Если вы запускали рекламу и приходил миллион юзеров — сервера падали. Если трафика не было — дорогие железки простаивали." },
            { type: "text", content: "Облачные вычисления (AWS, Google Cloud, Azure) позволяют 'арендовать' серверы посекундно (OpEx). В Черную Пятницу вы можете за 1 минуту поднять 100 серверов, а на следующий день удалить 99 из них, заплатив только за время использования." },
            { type: "heading", content: "IaaS: Amazon EC2" },
            { type: "text", content: "EC2 (Elastic Compute Cloud) в AWS или Compute Engine в GCP — это Инфраструктура как услуга (IaaS). По сути, это просто Виртуальная Машина (Linux или Windows), работающая в дата-центре Amazon. Вы получаете к ней SSH-доступ и можете устанавливать Docker, Node.js или любую базу данных." },
            { type: "tip", content: "Ресурс: AWS Free Tier. Зарегистрируйте аккаунт в AWS. Они дают 750 часов в месяц работы микро-сервера 't2.micro' абсолютно БЕСПЛАТНО на целый год. Это лучший способ попрактиковаться в администрировании реального Linux-сервера в облаке." }
          ]
        },
        practice: {
          title: "Запуск EC2 Инстанса (CLI)",
          description: "Используйте AWS CLI для запуска сервера.",
          task: "В продакшене мы не кликаем мышкой в браузере, мы используем консоль. Напишите команду AWS CLI для запуска виртуальной машины: `aws ec2 run-instances`. Передайте параметр образа --image-id 'ami-12345' и тип инстанса --instance-type 't2.micro'.",
          starterCode: "# Запуск бесплатного микро-сервера в облаке Amazon\n\naws ec2 run-instances \\\n    --image-id \n    --instance-type \n    --key-name MyKeyPair"
        },
        type: "bash"
      },
      {
        id: "cloud-s3",
        title: "Stateless Бэкенд и Объектные хранилища (S3)",
        theory: {
          sections: [
            { type: "heading", content: "Золотое правило: Stateless Servers" },
            { type: "text", content: "НИКОГДА не сохраняйте пользовательские файлы (аватарки, PDF) на локальный жесткий диск вашего EC2 сервера! Облачные серверы 'эфемерны' — автоскейлер (Auto-Scaler) может уничтожить ваш сервер ночью и создать новый. Если сервер умрет, все локальные файлы будут потеряны навсегда." },
            { type: "heading", content: "Amazon S3 (Simple Storage Service)" },
            { type: "text", content: "S3 — это Объектное Хранилище. Это не жесткий диск (на него нельзя установить ОС). Это гигантская, бесконечно масштабируемая 'папка' в облаке, где вы храните файлы (Objects) внутри 'Ведер' (Buckets)." },
            { type: "text", content: "S3 обеспечивает надежность 99.999999999% (Одиннадцать девяток). Это значит, что если вы положите туда 10 миллионов файлов, вы можете потерять один файл раз в 10 000 лет." },
            { type: "code", content: "// Пример на Node.js: Загрузка файла в S3\nconst s3 = new AWS.S3();\nawait s3.putObject({\n  Bucket: 'my-app-avatars',\n  Key: 'user-123.jpg',\n  Body: fileBuffer\n}).promise();" },
            { type: "tip", content: "Внимание (Security): При создании S3 бакета НИКОГДА не делайте его публичным, если только там не лежат публичные картинки или CSS вашего сайта. Утечка паспортов и паролей через случайно открытые (Public) S3 бакеты — это причина взлома облаков №1 в мире." }
          ]
        },
        practice: {
          title: "Загрузка файла в S3",
          description: "Используйте AWS CLI для копирования файла.",
          task: "Напишите команду AWS CLI для копирования (`cp`) локального файла 'backup.zip' в облачный S3 бакет с названием 'company-backups'.",
          starterCode: "# Синтаксис: aws s3 cp [локальный_файл] s3://[имя_бакета]/[путь_назначения]\n\naws s3 "
        },
        type: "bash"
      },
      {
        id: "cloud-rds",
        title: "Управляемые Базы Данных (RDS и Multi-AZ)",
        theory: {
          sections: [
            { type: "heading", content: "Почему не стоит ставить Postgres на EC2?" },
            { type: "text", content: "Вы легко можете установить PostgreSQL на вашу виртуальную машину (EC2). Но тогда ВЫ будете нести ответственность за обновление Linux, настройку резервных копий (бэкапов) и починку базы, если в 3 часа ночи на сервере сгорит жесткий диск." },
            { type: "heading", content: "PaaS: Amazon RDS" },
            { type: "text", content: "Amazon RDS (Relational Database Service) или Cloud SQL в GCP — это Платформа как услуга (PaaS). Amazon сам выделяет сервер, ставит Postgres, делает ежедневные бэкапы и патчит уязвимости ОС. Вам просто выдают строку подключения (URL) для вашего бэкенда." },
            { type: "heading", content: "Отказоустойчивость (Multi-AZ)" },
            { type: "text", content: "Киллер-фича RDS — это 'Multi-AZ' (Multiple Availability Zones). Зона доступности — это физический дата-центр. Если включить эту галочку, AWS скрыто поднимет точную копию вашей БД в другом здании в 50 км от первого. Если первый дата-центр обесточит ураган, AWS автоматически переведет весь трафик на копию за 60 секунд. Вы не потеряете ни байта данных." },
            { type: "tip", content: "Ресурс: A Cloud Guru. Если вы хотите глубоко изучить облачную архитектуру, отказоустойчивость и подготовиться к сертификациям AWS (Solutions Architect), платформа 'A Cloud Guru' — это непревзойденный лидер индустрии." }
          ]
        },
        practice: {
          title: "Подключение к Cloud SQL",
          description: "Подключитесь к удаленному инстансу RDS.",
          task: "Вы создали базу Postgres RDS. AWS выдал вам эндпоинт (URL). Напишите стандартную команду терминала `psql` для подключения. Укажите хост (-h) 'db.xyz.eu-central-1.rds.amazonaws.com', юзера (-U) 'admin' и имя базы (-d) 'prod_db'.",
          starterCode: "# Подключение к управляемой базе данных в облаке\n\npsql -h  -U  -d "
        },
        type: "bash"
      },
      {
        id: "cloud-serverless",
        title: "Революция Serverless (AWS Lambda)",
        theory: {
          sections: [
            { type: "heading", content: "А что, если серверов вообще нет?" },
            { type: "text", content: "Даже с EC2 вы платите за сервер 24/7, даже если ночью вашим сайтом никто не пользуется. К тому же, вам приходится настраивать Auto-Scaling, чтобы серверы размножались при наплыве трафика." },
            { type: "text", content: "Здесь появляется Serverless (Бессерверные вычисления - AWS Lambda / Google Cloud Functions). 'Бессерверный' не значит, что серверов физически нет. Это значит, что ИМИ УПРАВЛЯЕТЕ НЕ ВЫ." },
            { type: "heading", content: "Как работает Lambda" },
            { type: "text", content: "Вы просто пишете функцию на Node.js или Python и загружаете её в AWS. Функция лежит там и ничего не делает (стоимость $0). Когда происходит Событие (Event) — например, юзер дергает API или в S3 загружают картинку — AWS мгновенно поднимает микро-контейнер, выполняет вашу функцию за 200 миллисекунд, берет с вас деньги ровно за 200мс и уничтожает контейнер." },
            { type: "text", content: "Если 10 000 человек одновременно нажмут кнопку, AWS параллельно запустит 10 000 копий вашей функции. Это мгновенное и бесконечное масштабирование." },
            { type: "tip", content: "Ресурс: GCP Codelabs. Бесплатные пошаговые туториалы от Google. Пройдите кодлабу 'Serverless Cloud Functions', чтобы своими руками собрать событийно-ориентированный микросервис за час." }
          ]
        },
        practice: {
          title: "Напиши AWS Lambda",
          description: "Напишите входную точку (Entry point) бессерверной функции.",
          task: "AWS Lambda на Node.js обязана экспортировать функцию с именем 'handler'. Она принимает объект 'event' (в котором лежат данные HTTP запроса). Напишите функцию-обработчик, которая вернет объект с statusCode: 200 и телом (body) 'Hello Serverless!'.",
          starterCode: "// Точка входа для AWS Lambda на Node.js\n\nexports.handler = async (event) => {\n    // Логируем входящие данные (например, JSON от API Gateway)\n    console.log(\"Received event:\", JSON.stringify(event));\n    \n    // Верните HTTP-подобный ответ (объект)\n    return {\n        \n    };\n};"
        },
        type: "javascript"
      },
      {
        id: "cloud-iac-terraform",
        title: "Инфраструктура как Код (Terraform)",
        theory: {
          sections: [
            { type: "heading", content: "Проблема 'ClickOps'" },
            { type: "text", content: "Когда новички изучают AWS, они используют Web-консоль в браузере, кликая мышкой по кнопкам для создания серверов и баз данных. Это называется 'ClickOps'. В реальных компаниях ClickOps строго запрещен." },
            { type: "text", content: "Если архитектура вашей компании состоит из 50 серверов, 10 баз данных и сложных сетей, и кто-то случайно удалит всё это — восстановить систему, кликая мышкой по памяти, будет невозможно." },
            { type: "heading", content: "Infrastructure as Code (IaC)" },
            { type: "text", content: "Мы описываем всю облачную инфраструктуру текстом (кодом) с помощью Terraform или AWS CloudFormation, и храним этот код в Git. Если дата-центр сгорит, мы просто пишем в консоли `terraform apply`, и облачный провайдер автоматически, за 5 минут, воссоздает всю архитектуру один в один!" },
            { type: "code", content: "provider \"aws\" {\n  region = \"eu-central-1\"\n}\n\nresource \"aws_s3_bucket\" \"my_bucket\" {\n  bucket = \"company-production-assets\"\n}" },
            { type: "text", content: "Terraform использует декларативный язык (HCL). Вы не пишете *КАК* создать сервер (не вызываете API). Вы декларируете *ЧТО* должно существовать в облаке, а Terraform сам решает, как это сделать." }
          ]
        },
        practice: {
          title: "Опишите EC2 в Terraform",
          description: "Напишите свой первый IaC ресурс.",
          task: "Допишите HCL (Terraform) код для создания EC2 сервера в AWS. Тип ресурса должен быть 'aws_instance', назовите его 'web_server'. Укажите параметр ami (образ ОС) как 'ami-12345' и instance_type как 't2.micro'.",
          starterCode: "# Определяем провайдера (Amazon)\nprovider \"aws\" {\n  region = \"us-east-1\"\n}\n\n# Декларируем Виртуальную Машину EC2\nresource \"\" \"web_server\" {\n  ami           = \"\"\n  instance_type = \"\"\n  \n  tags = {\n    Name = \"Production-Backend\"\n  }\n}"
        },
        type: "yaml"
      }
    ]
  }
};