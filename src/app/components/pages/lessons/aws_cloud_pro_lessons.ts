export const awsCloudProState: Record<'EN' | 'RU', any> = {
  EN: {
    title: "AWS / Cloud Pro",
    description: "ECS, EKS, CloudFormation, and Cost Optimization. Master enterprise-grade cloud architecture.",
    lessons: [
      {
        id: "aws-ecs-fargate",
        title: "Managed Containers: ECS & Fargate",
        theory: {
          sections: [
            { type: "heading", content: "Beyond Raw EC2" },
            { type: "text", content: "Running Docker containers directly on EC2 instances requires you to manage the underlying OS, patch security vulnerabilities, and manually scale the servers. At enterprise scale, this is inefficient." },
            { type: "heading", content: "Elastic Container Service (ECS)" },
            { type: "text", content: "ECS is Amazon's native container orchestration service. It manages fleets of containers for you. You define a 'Task Definition' (a JSON file describing your container, CPU, RAM, and ports), and ECS runs it." },
            { type: "heading", content: "The Magic of Fargate" },
            { type: "text", content: "Even with ECS, you still have to manage the EC2 'Worker Nodes'. AWS introduced Fargate—a 'Serverless' compute engine for containers. With Fargate, you don't provision EC2 servers at all. You just give AWS your Docker image and say 'Run this with 2GB RAM', and AWS magically allocates the exact compute power needed." },
            { type: "tip", content: "Architecture Tip: ECS is heavily integrated into AWS (IAM, CloudWatch, ALB). If your entire company lives exclusively in AWS and you want minimal management overhead, ECS with Fargate is usually a better choice than Kubernetes." }
          ]
        },
        practice: {
          title: "Create an ECS Cluster",
          description: "Use the AWS CLI to provision an ECS cluster.",
          task: "Write the AWS CLI command to create an ECS cluster named 'production-cluster'. Using the CLI is the preferred way to automate infrastructure before moving to IaC.",
          starterCode: "# Create a new Elastic Container Service cluster\n# Syntax: aws ecs create-cluster --cluster-name [name]\n\n"
        },
        type: "bash"
      },
      {
        id: "aws-eks",
        title: "Enterprise Orchestration: EKS",
        theory: {
          sections: [
            { type: "heading", content: "Elastic Kubernetes Service" },
            { type: "text", content: "While ECS is great, it locks you into the AWS ecosystem. Many enterprises prefer Kubernetes (K8s) because it is open-source and cloud-agnostic (you can move from AWS to Google Cloud easily)." },
            { type: "heading", content: "The Control Plane Problem" },
            { type: "text", content: "Installing Kubernetes from scratch ('Kelsey Hightower's Kubernetes the Hard Way') is notoriously difficult. You have to manage the Control Plane (API server, etcd database), handle backups, and ensure high availability." },
            { type: "text", content: "EKS solves this. AWS manages the highly-available Kubernetes Control Plane for you across multiple Availability Zones. You only pay ~$73/month for the cluster brain, and then you attach your own Worker Nodes (EC2) or use Fargate to run your Pods." },
            { type: "code", content: "# Connect your local kubectl to the remote EKS cluster\naws eks update-kubeconfig --region us-east-1 --name prod-cluster" }
          ]
        },
        practice: {
          title: "Connect to EKS",
          description: "Update your local kubeconfig.",
          task: "Your company just provisioned an EKS cluster named 'finance-k8s' in the 'eu-central-1' region. Write the AWS CLI command to download the credentials so your local `kubectl` can communicate with it.",
          starterCode: "# Update kubeconfig to interact with the EKS cluster\n# Use 'aws eks update-kubeconfig' with --region and --name flags\n\n"
        },
        type: "bash"
      },
      {
        id: "aws-cloudformation",
        title: "Native IaC: AWS CloudFormation",
        theory: {
          sections: [
            { type: "heading", content: "AWS's Answer to Terraform" },
            { type: "text", content: "While Terraform is multi-cloud, AWS has its own native Infrastructure as Code tool: CloudFormation. You write JSON or YAML templates describing your infrastructure, and AWS builds it." },
            { type: "heading", content: "Stacks and State" },
            { type: "text", content: "In CloudFormation, a template is deployed as a 'Stack'. If you want to change a server's size, you update the YAML and update the Stack. AWS calculates the difference and applies it." },
            { type: "text", content: "A major difference from Terraform is State Management. Terraform requires you to store a `.tfstate` file in S3. CloudFormation is managed entirely by AWS—there is no local state file to lose or corrupt!" },
            { type: "code", content: "Resources:\n  MyEC2Instance:\n    Type: \"AWS::EC2::Instance\"\n    Properties:\n      ImageId: \"ami-0ff8a91507f77f867\"\n      InstanceType: \"t2.micro\"" }
          ]
        },
        practice: {
          title: "CloudFormation YAML",
          description: "Define a basic resource in CloudFormation.",
          task: "Complete the CloudFormation YAML snippet. Under the 'Resources' block, define an S3 Bucket. The logical name should be 'MyCompanyBucket', and the Type must be 'AWS::S3::Bucket'.",
          starterCode: "AWSTemplateFormatVersion: '2010-09-09'\nDescription: 'A simple S3 Bucket Template'\n\nResources:\n  # 1. Provide the logical name\n  :\n    # 2. Specify the AWS resource Type\n    Type: \"\"\n    Properties:\n      BucketName: \"company-unique-bucket-name-123\""
        },
        type: "yaml"
      },
      {
        id: "aws-well-architected",
        title: "Solutions Architect & The 6 Pillars",
        theory: {
          sections: [
            { type: "heading", content: "Designing for the Cloud" },
            { type: "text", content: "Getting the 'AWS Certified Solutions Architect' certification is a major milestone for DevOps engineers. It proves you don't just know how to create servers, but how to design highly available, secure systems." },
            { type: "heading", content: "The Well-Architected Framework" },
            { type: "text", content: "AWS evaluates architectures based on 6 pillars:" },
            { type: "list", items: [
              "1. Operational Excellence: Automating changes (CI/CD, IaC).",
              "2. Security: IAM, least privilege, encrypting data at rest and in transit.",
              "3. Reliability: Multi-AZ deployments, Auto-Scaling, preventing single points of failure.",
              "4. Performance Efficiency: Using Serverless, choosing the right database type.",
              "5. Cost Optimization: Paying only for what you need (FinOps).",
              "6. Sustainability: Minimizing the environmental impact of your cloud footprint."
            ]},
            { type: "tip", content: "Resource: A Cloud Guru. ACG is the undisputed king of cloud certification prep. Their 'AWS Certified Solutions Architect Associate' course is the best way to understand the vast AWS ecosystem (VPC, Route53, ALB, ASG)." }
          ]
        },
        practice: {
          title: "Identify the Pillar",
          description: "Think like a Solutions Architect.",
          task: "Mental exercise. Read the architectural decisions in the comments and assign the correct Well-Architected Pillar (Security, Reliability, or Cost Optimization) to each.",
          starterCode: "# Decision 1: Deploying the database across two Availability Zones (Multi-AZ) to survive a data center fire.\n# Pillar: \n\n# Decision 2: Shutting down Dev and Staging environments automatically at 8 PM and starting them at 8 AM.\n# Pillar: \n\n# Decision 3: Enforcing MFA (Multi-Factor Authentication) for all AWS IAM users.\n# Pillar: "
        },
        type: "yaml"
      },
      {
        id: "aws-cost-optimization",
        title: "FinOps: Cost Optimization",
        theory: {
          sections: [
            { type: "heading", content: "The Cloud Bill Shock" },
            { type: "text", content: "A common DevOps disaster: a junior engineer spins up a massive `p4d.24xlarge` instance for a machine learning job, forgets to turn it off on Friday, and the company gets a $30,000 bill on Monday. Managing costs (FinOps) is a core DevOps responsibility." },
            { type: "heading", content: "Purchasing Options" },
            { type: "list", items: [
              "On-Demand: Pay by the second. Most expensive. Good for unpredictable workloads.",
              "Reserved Instances (RI) / Savings Plans: You commit to AWS for 1 or 3 years. Gives you a massive discount (up to 72%). Perfect for production databases.",
              "Spot Instances: AWS auctions off their unused server capacity at a 90% discount! The catch? AWS can terminate your server with a 2-minute warning if someone else pays full price. Perfect for batch processing, CI/CD runners, and stateless web workers."
            ]},
            { type: "heading", content: "Right-Sizing" },
            { type: "text", content: "Monitor your EC2 instances using CloudWatch. If an instance sits at 5% CPU usage for a month, downgrade it from `t3.large` to `t3.micro`." }
          ]
        },
        practice: {
          title: "Spot vs Reserved",
          description: "Choose the right pricing model.",
          task: "Mental exercise. Assign the correct pricing model (On-Demand, Reserved, or Spot) to the use cases below to optimize costs.",
          starterCode: "# Case 1: The primary PostgreSQL database for a hospital. It must NEVER go down.\n# Model: \n\n# Case 2: A video rendering job. If the server dies, the job can just be restarted later without issues.\n# Model: \n\n# Case 3: A new startup launching their app today. They have no idea how much traffic they will get.\n# Model: "
        },
        type: "yaml"
      },
      {
        id: "aws-cloud-resume",
        title: "Capstone: The Cloud Resume Challenge",
        theory: {
          sections: [
            { type: "heading", content: "How to get hired in Cloud/DevOps" },
            { type: "text", content: "Certifications are great, but hands-on experience is what passes technical interviews. The 'Cloud Resume Challenge' (created by Forrest Brazeal) is a legendary 16-step project that proves you know what you are doing." },
            { type: "heading", content: "The Architecture of the Challenge" },
            { type: "text", content: "You can't just build a WordPress site. You must build a fully Serverless architecture:" },
            { type: "list", items: [
              "Frontend: An HTML resume hosted on S3 (Static Website Hosting).",
              "Delivery: Distributed globally via CloudFront (CDN) and secured with HTTPS via Route53 and ACM.",
              "Backend: A visitor counter using an API Gateway triggering an AWS Lambda function (Python).",
              "Database: Lambda updates the visitor count in a DynamoDB NoSQL table.",
              "CI/CD: GitHub Actions automatically updates S3 when you change HTML, and runs tests on your Python code.",
              "IaC: Everything must be provisioned using Terraform or SAM, not ClickOps!"
            ]},
            { type: "tip", content: "Resource: Cloud Resume Challenge (cloudresumechallenge.dev). Completing this project and writing a blog post about the pain you went through to build it is the single best thing you can add to a Junior/Middle DevOps resume." }
          ]
        },
        practice: {
          title: "CI/CD Cache Invalidation",
          description: "Update the CDN after deployment.",
          task: "A common issue in the Cloud Resume Challenge: you update your HTML in S3, but users still see the old site because CloudFront (the CDN) cached it globally. Write the AWS CLI command to invalidate the CloudFront cache.",
          starterCode: "# Create a cache invalidation for a CloudFront distribution\n# This is typically the last step in your GitHub Actions CI/CD pipeline.\n# Syntax: aws cloudfront create-invalidation --distribution-id [ID] --paths \"/*\"\n\n"
        },
        type: "bash"
      }
    ]
  },
  RU: {
    title: "AWS / Облака PRO",
    description: "ECS, EKS, CloudFormation и оптимизация затрат. Освойте облачную архитектуру уровня Enterprise.",
    lessons: [
      {
        id: "aws-ecs-fargate",
        title: "Управляемые контейнеры: ECS и Fargate",
        theory: {
          sections: [
            { type: "heading", content: "Жизнь после голого EC2" },
            { type: "text", content: "Запуск Docker-контейнеров напрямую на виртуальных машинах EC2 требует от вас ручного обновления ОС, установки патчей безопасности и ручного масштабирования серверов. В корпоративных масштабах это неэффективно." },
            { type: "heading", content: "Elastic Container Service (ECS)" },
            { type: "text", content: "ECS — это нативный оркестратор контейнеров от Amazon. Он управляет 'флотом' ваших контейнеров. Вы описываете 'Task Definition' (JSON файл, где указан Docker-образ, нужный CPU, RAM и порты), и ECS берет на себя его запуск и перезапуск при падениях." },
            { type: "heading", content: "Магия Fargate" },
            { type: "text", content: "Даже с ECS вам всё еще нужно было арендовать серверы (EC2), на которых крутятся контейнеры. AWS представил Fargate — 'Serverless' движок для контейнеров. С Fargate вам вообще не нужны серверы. Вы просто отдаете AWS свой Docker-образ и говорите: 'Запусти это с 2 ГБ оперативки', и AWS магическим образом сам выделяет нужные вычислительные мощности." },
            { type: "tip", content: "Архитектурный совет: ECS глубоко интегрирован в экосистему AWS (IAM, CloudWatch, балансировщики ALB). Если вся ваша компания живет исключительно в AWS, и вы хотите минимизировать расходы на администрирование, связка ECS + Fargate обычно является лучшим и более дешевым выбором, чем сложный Kubernetes." }
          ]
        },
        practice: {
          title: "Создание ECS Кластера",
          description: "Используйте AWS CLI для развертывания.",
          task: "Напишите команду AWS CLI для создания ECS кластера с именем 'production-cluster'. Использование консоли (а не мышки в браузере) — это первый шаг к автоматизации (IaC).",
          starterCode: "# Создаем новый кластер Elastic Container Service\n# Синтаксис: aws ecs create-cluster --cluster-name [имя]\n\n"
        },
        type: "bash"
      },
      {
        id: "aws-eks",
        title: "Enterprise Оркестрация: EKS (Kubernetes)",
        theory: {
          sections: [
            { type: "heading", content: "Elastic Kubernetes Service" },
            { type: "text", content: "Хотя ECS прекрасен, он жестко привязывает вас к AWS (Vendor Lock-in). Многие крупные корпорации предпочитают Kubernetes (K8s), потому что это Open-Source. Запустив K8s, вы можете легко перенести инфраструктуру из AWS в Google Cloud или Яндекс.Облако." },
            { type: "heading", content: "Проблема Control Plane" },
            { type: "text", content: "Устанавливать Kubernetes с нуля вручную (Kelsey Hightower's 'Kubernetes the Hard Way') — это невероятно сложная задача. Вам нужно самим управлять 'Мозгом' кластера (Control Plane): API сервером, базой etcd, настраивать бэкапы и отказоустойчивость." },
            { type: "text", content: "Сервис EKS решает эту проблему. AWS берет на себя полное управление 'Мозгом' кластера, распределяя его по разным дата-центрам. Вы платите ~$73 в месяц за этот 'Мозг', а затем просто подключаете к нему свои рабочие сервера (EC2 Worker Nodes) или используете тот же Fargate для запуска Подов." },
            { type: "code", content: "# Скачиваем ключи для локальной утилиты kubectl, \n# чтобы она могла управлять удаленным кластером EKS\naws eks update-kubeconfig --region us-east-1 --name prod-cluster" }
          ]
        },
        practice: {
          title: "Подключение к EKS",
          description: "Обновите локальный kubeconfig.",
          task: "Ваша компания только что подняла кластер EKS с именем 'finance-k8s' во Франкфурте (регион 'eu-central-1'). Напишите команду AWS CLI, чтобы скачать ключи доступа, чтобы ваша локальная утилита `kubectl` смогла им управлять.",
          starterCode: "# Обновляем конфигурацию kubeconfig для работы с кластером EKS\n# Используйте команду 'aws eks update-kubeconfig' с флагами --region и --name\n\n"
        },
        type: "bash"
      },
      {
        id: "aws-cloudformation",
        title: "Нативный IaC: AWS CloudFormation",
        theory: {
          sections: [
            { type: "heading", content: "Ответ Amazon на Terraform" },
            { type: "text", content: "Terraform является мультиоблачным инструментом, но у AWS есть свой собственный нативный инструмент Infrastructure as Code — CloudFormation. Вы описываете инфраструктуру в шаблонах JSON или YAML, а AWS её создает." },
            { type: "heading", content: "Стеки и отсутствие State-файла" },
            { type: "text", content: "В CloudFormation шаблон разворачивается в виде 'Стека' (Stack). Если вы хотите увеличить мощность сервера, вы меняете YAML-файл и обновляете Стек. AWS сам вычисляет разницу и применяет изменения." },
            { type: "text", content: "Главное отличие от Terraform заключается в Управлении Состоянием (State). Terraform заставляет вас бережно хранить файл `.tfstate` в корзине S3. В CloudFormation стейт управляется самой платформой AWS — вы физически не можете потерять или сломать локальный файл стейта!" },
            { type: "code", content: "Resources:\n  MyEC2Instance:\n    Type: \"AWS::EC2::Instance\"\n    Properties:\n      ImageId: \"ami-0ff8a91507f77f867\"\n      InstanceType: \"t2.micro\"" }
          ]
        },
        practice: {
          title: "Синтаксис CloudFormation YAML",
          description: "Определите базовый ресурс.",
          task: "Допишите YAML-шаблон CloudFormation. Внутри блока 'Resources' создайте корзину S3. Логическое имя (Logical ID) должно быть 'MyCompanyBucket', а Тип (Type) обязан быть 'AWS::S3::Bucket'.",
          starterCode: "AWSTemplateFormatVersion: '2010-09-09'\nDescription: 'A simple S3 Bucket Template'\n\nResources:\n  # 1. Укажите логическое имя ресурса\n  :\n    # 2. Укажите тип AWS ресурса\n    Type: \"\"\n    Properties:\n      BucketName: \"company-unique-bucket-name-123\""
        },
        type: "yaml"
      },
      {
        id: "aws-well-architected",
        title: "Solutions Architect и 6 Столпов",
        theory: {
          sections: [
            { type: "heading", content: "Проектирование для Облака" },
            { type: "text", content: "Получение сертификата 'AWS Certified Solutions Architect' — это важнейший этап в карьере DevOps. Он доказывает, что вы не просто умеете поднимать сервера по инструкции, но умеете проектировать безопасные и отказоустойчивые системы." },
            { type: "heading", content: "The Well-Architected Framework" },
            { type: "text", content: "Amazon оценивает любую архитектуру на основе 6 'Столпов' (Pillars):" },
            { type: "list", items: [
              "1. Операционное совершенство (Operational Excellence): Автоматизация через CI/CD и IaC.",
              "2. Безопасность (Security): Использование IAM, принцип наименьших привилегий, шифрование данных в покое и при передаче.",
              "3. Надежность (Reliability): Развертывание в нескольких зонах (Multi-AZ), Auto-Scaling, избегание единых точек отказа.",
              "4. Эффективность производительности (Performance Efficiency): Использование Serverless, правильный выбор типа баз данных.",
              "5. Оптимизация затрат (Cost Optimization): Платить только за то, что реально используется (FinOps).",
              "6. Устойчивое развитие (Sustainability): Минимизация углеродного следа вашей инфраструктуры."
            ]},
            { type: "tip", content: "Ресурс: A Cloud Guru. ACG — бесспорный лидер в подготовке к облачным сертификациям. Их курс 'AWS Certified Solutions Architect Associate' — лучший способ уложить в голове всю огромную экосистему AWS (VPC, Route53, ALB, ASG)." }
          ]
        },
        practice: {
          title: "Определи Столп Архитектуры",
          description: "Мыслите как Архитектор (Solutions Architect).",
          task: "Это мысленное упражнение. Прочитайте архитектурные решения в комментариях. Назначьте каждому из них правильный 'Столп' (Security, Reliability или Cost Optimization).",
          starterCode: "# Решение 1: Развертывание базы данных в двух зонах доступности (Multi-AZ), чтобы выжить при пожаре в дата-центре.\n# Столп: \n\n# Решение 2: Автоматическое выключение тестовых (Staging) серверов в 20:00 и включение их в 8:00 утра.\n# Столп: \n\n# Решение 3: Обязательное включение MFA (двухфакторки) для всех IAM-пользователей AWS.\n# Столп: "
        },
        type: "yaml"
      },
      {
        id: "aws-cost-optimization",
        title: "FinOps: Оптимизация Затрат",
        theory: {
          sections: [
            { type: "heading", content: "Шок от облачного счета (Cloud Bill Shock)" },
            { type: "text", content: "Классическая DevOps-катастрофа: джун поднимает гигантский сервер `p4d.24xlarge` для тренировки нейросети, забывает выключить его в пятницу вечером, и в понедельник компания получает счет от Amazon на $30,000. Управление финансами в облаке (FinOps) — это прямая обязанность Senior DevOps." },
            { type: "heading", content: "Модели оплаты серверов (EC2)" },
            { type: "list", items: [
              "On-Demand (По требованию): Платите посекундно. Самый дорогой тариф. Нужен для непредсказуемых нагрузок.",
              "Reserved Instances (RI) / Savings Plans: Вы берете обязательство перед AWS на 1 или 3 года. За это получаете скидку до 72%. Идеально для боевых баз данных, которые работают 24/7.",
              "Spot Instances (Спотовые инстансы): AWS продает свои простаивающие мощности со скидкой 90%! Подвох? AWS может убить ваш сервер с предупреждением всего за 2 минуты, если кто-то другой заплатит полную цену. Идеально для обработки фоновых задач, рендеринга видео и CI/CD раннеров."
            ]},
            { type: "heading", content: "Right-Sizing (Подбор правильного размера)" },
            { type: "text", content: "Постоянно мониторьте сервера через CloudWatch. Если дорогой сервер `t3.large` целый месяц загружен на 5% CPU, вы обязаны понизить его до `t3.micro`." }
          ]
        },
        practice: {
          title: "Spot или Reserved?",
          description: "Выберите правильную финансовую модель.",
          task: "Мысленное упражнение. Назначьте правильную ценовую модель (On-Demand, Reserved или Spot) для каждого из описанных юзкейсов, чтобы сэкономить деньги компании.",
          starterCode: "# Кейс 1: Главная база данных PostgreSQL больницы. Она НИКОГДА не должна выключаться.\n# Модель оплаты: \n\n# Кейс 2: Кластер для рендеринга 3D-графики. Если сервер убьют, задачу можно будет просто перезапустить позже.\n# Модель оплаты: \n\n# Кейс 3: Новый стартап запускает приложение сегодня. Они понятия не имеют, сколько трафика к ним придет.\n# Модель оплаты: "
        },
        type: "yaml"
      },
      {
        id: "aws-cloud-resume",
        title: "Финал: The Cloud Resume Challenge",
        theory: {
          sections: [
            { type: "heading", content: "Как получить работу в DevOps" },
            { type: "text", content: "Сертификаты — это отлично для HR, но технические интервьюеры хотят видеть реальный опыт. Проект **'Cloud Resume Challenge'** (созданный Forrest Brazeal) — это легендарный 16-шаговый челендж, который на 100% доказывает, что вы не теоретик, а практик." },
            { type: "heading", content: "Архитектура проекта" },
            { type: "text", content: "Вы не можете просто поднять WordPress. Вы обязаны построить Full-Serverless архитектуру:" },
            { type: "list", items: [
              "Frontend: Ваше HTML-резюме хостится в S3 (Static Website Hosting).",
              "Delivery: Раздается по всему миру через CDN (CloudFront) и защищено HTTPS сертификатом (ACM/Route53).",
              "Backend: Счетчик посещений, реализованный на AWS Lambda (Python), который вызывается через API Gateway.",
              "Database: Lambda сохраняет количество визитов в NoSQL таблицу DynamoDB.",
              "CI/CD: GitHub Actions автоматически обновляет S3 при изменении HTML кода и прогоняет тесты для Python.",
              "IaC: ВСЯ эта инфраструктура должна быть написана кодом (Terraform или SAM). Никакого ClickOps!"
            ]},
            { type: "tip", content: "Ресурс: cloudresumechallenge.dev. Выполнение этого проекта и написание статьи в блоге о том, как вы страдали, решая проблемы с CORS или IAM правами — это лучшее, что вы можете добавить в свое резюме Junior/Middle DevOps специалиста." }
          ]
        },
        practice: {
          title: "Сброс кэша при CI/CD",
          description: "Обновите CDN после деплоя.",
          task: "Популярная проблема в Cloud Resume Challenge: вы запушили новый HTML в S3 (через GitHub Actions), но пользователи всё еще видят старое резюме, потому что CloudFront (CDN) закешировал его по всему миру. Напишите команду AWS CLI для инвалидации (сброса) кэша CloudFront.",
          starterCode: "# Создание инвалидации кэша для дистрибутива CloudFront\n# Это обычно последний шаг в вашем CI/CD пайплайне.\n# Синтаксис: aws cloudfront create-invalidation --distribution-id [ID] --paths \"/*\"\n\n"
        },
        type: "bash"
      }
    ]
  }
};