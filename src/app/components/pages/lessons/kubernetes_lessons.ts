export const kubernetesState: Record<'EN' | 'RU', any> = {
  EN: {
    title: "Kubernetes (CORE)",
    description: "Pods, Deployments, Services, Ingress, and Helm. Master container orchestration at an enterprise scale.",
    lessons: [
      {
        id: "k8s-philosophy",
        title: "The Conductor: K8s Architecture & Philosophy",
        theory: {
          sections: [
            { type: "heading", content: "Why Docker Compose Isn't Enough" },
            { type: "text", content: "Docker Compose is great for running 5 containers on one server. But what if you have 1,000 containers across 50 servers? If a server catches fire, Docker Compose won't move your containers to a surviving server. You need an Orchestrator. Kubernetes (K8s) is the industry standard." },
            { type: "heading", content: "The Declarative State Machine" },
            { type: "text", content: "K8s works like a strict bureaucracy. You don't tell K8s *HOW* to do things (Imperative). You submit a YAML document declaring *WHAT* you want (Declarative): 'I want 3 Nginx containers running'. K8s constantly monitors the cluster. If it sees only 2 Nginx containers (because one crashed), it automatically spins up a new one to match your declared state." },
            { type: "heading", content: "Control Plane vs Worker Nodes" },
            { type: "list", items: [
              "Control Plane (The Brain): Contains the API Server (receives your YAMLs), etcd (the database storing the cluster state), and the Scheduler (decides which server gets which container).",
              "Worker Nodes (The Muscle): The actual servers running your apps. They run a 'Kubelet' agent that reports back to the brain."
            ]},
            { type: "tip", content: "Resource: KodeKloud. If you plan to get certified (CKA - Certified Kubernetes Administrator), KodeKloud is the absolute best platform in the world. Their visual, browser-based labs build true muscle memory for the `kubectl` CLI." }
          ]
        },
        practice: {
          title: "The Kubectl CLI",
          description: "Interact with the Kubernetes API.",
          task: "The primary way DevOps engineers interact with the Control Plane is the `kubectl` command-line tool. Write the command to list all the physical servers (nodes) in your cluster.",
          starterCode: "# Retrieve a list of all worker and master nodes in the cluster\n\nkubectl "
        },
        type: "bash"
      },
      {
        id: "k8s-pods",
        title: "The Atomic Unit: Pods & Sidecars",
        theory: {
          sections: [
            { type: "heading", content: "Why not just run Containers?" },
            { type: "text", content: "In K8s, you never run a Docker container directly. The smallest deployable unit is a Pod. A Pod is a 'wrapper' that holds one or more containers." },
            { type: "text", content: "Why? Because sometimes two containers are tightly coupled. They need to share the exact same IP address, localhost, and disk volume, and they must scale up and down together." },
            { type: "heading", content: "The Sidecar Pattern" },
            { type: "text", content: "A classic example is the Sidecar Pattern. You have Container A (your Node.js web server). You want to send its logs to a central server, but you don't want to rewrite the Node.js code. You add Container B (a Log Forwarder like Filebeat) inside the SAME Pod. Container B reads Container A's log files from the shared disk and sends them away. They live and die together." }
          ]
        },
        practice: {
          title: "Write a Pod YAML",
          description: "Define the smallest Kubernetes object.",
          task: "Complete the YAML definition for a Pod. The `apiVersion` is 'v1', `kind` is 'Pod'. Under `metadata`, give it the name 'nginx-pod'. Under `spec.containers`, specify the image as 'nginx:latest'.",
          starterCode: "apiVersion: v1\nkind: \nmetadata:\n  name: \nspec:\n  containers:\n    - name: my-nginx-container\n      image: "
        },
        type: "yaml"
      },
      {
        id: "k8s-deployments",
        title: "Immortality: ReplicaSets & Deployments",
        theory: {
          sections: [
            { type: "heading", content: "Pods are Mortal" },
            { type: "text", content: "If you create a naked Pod, and the physical server it's running on crashes, the Pod is dead forever. K8s will NOT recreate it. To achieve immortality and auto-healing, we wrap Pods in higher-level controllers." },
            { type: "heading", content: "Deployments" },
            { type: "text", content: "A Deployment is the most common object in K8s. You tell it: 'Run exactly 3 replicas of my Node.js Pod'. The Deployment creates a ReplicaSet, which ensures 3 Pods are always running. If you delete a Pod, the ReplicaSet instantly creates a new one." },
            { type: "heading", content: "Zero-Downtime Rolling Updates" },
            { type: "text", content: "Deployments also manage versions. If you change the image from 'node:v1' to 'node:v2', the Deployment performs a Rolling Update. It starts one v2 Pod, waits for it to be healthy, then kills one v1 Pod. It does this one by one, ensuring your users experience ZERO downtime during the update!" }
          ]
        },
        practice: {
          title: "Create a Deployment",
          description: "Define a scalable application.",
          task: "Complete the Deployment YAML. Set the `replicas` count to 3. In the `selector.matchLabels` and the template's metadata, ensure the label 'app: backend' matches so the Deployment knows which Pods it owns.",
          starterCode: "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: backend-deployment\nspec:\n  # 1. Define the number of desired Pods\n  replicas: \n  selector:\n    matchLabels:\n      app: backend\n  template:\n    metadata:\n      labels:\n        # 2. This label must match the selector above!\n        \n    spec:\n      containers:\n      - name: app\n        image: my-backend:v1"
        },
        type: "yaml"
      },
      {
        id: "k8s-services",
        title: "Networking: Overcoming Ephemeral IPs",
        theory: {
          sections: [
            { type: "heading", content: "The Ephemeral IP Problem" },
            { type: "text", content: "Since Pods die and are recreated constantly (by Deployments or Auto-Scalers), their IP addresses change every time. If your Frontend tries to connect to the Backend using the Backend Pod's IP (e.g., 10.244.1.5), the app will break as soon as the Pod restarts and gets a new IP (10.244.2.12)." },
            { type: "heading", content: "Services to the Rescue" },
            { type: "text", content: "A Service acts as a stable, permanent IP address and DNS name (Load Balancer) in front of a group of Pods. Even if all the Backend Pods die and are recreated, the Service's IP and name (`http://backend-service`) never change." },
            { type: "list", items: [
              "ClusterIP: The default. Exposes the service only INSIDE the cluster (Frontend -> Backend).",
              "NodePort: Opens a specific port (30000-32767) on ALL physical worker nodes to allow external access.",
              "LoadBalancer: Talks to AWS/GCP to automatically provision a real Cloud Load Balancer that points to your service."
            ]}
          ]
        },
        practice: {
          title: "Define a ClusterIP Service",
          description: "Connect Pods using labels.",
          task: "Complete the Service YAML. A Service finds which Pods to route traffic to using the `selector` field. Set the selector to target Pods with the label `app: backend`. Map port 80 to targetPort 8080.",
          starterCode: "apiVersion: v1\nkind: Service\nmetadata:\n  name: backend-service\nspec:\n  type: ClusterIP\n  # 1. Select the Pods this service routes traffic to\n  selector:\n    \n  ports:\n    - port: 80\n      # 2. The actual port the Node.js app is listening on\n      targetPort: "
        },
        type: "yaml"
      },
      {
        id: "k8s-ingress",
        title: "Ingress: The Grand Gateway",
        theory: {
          sections: [
            { type: "heading", content: "The Cost of LoadBalancers" },
            { type: "text", content: "If you have 20 microservices (Users, Payments, Cart, etc.) and you expose each one using `type: LoadBalancer`, AWS will create 20 physical Load Balancers. Each costs ~$20/month. You will waste $400/month just on routing!" },
            { type: "heading", content: "The Ingress Controller" },
            { type: "text", content: "Ingress solves this. You create ONE Cloud LoadBalancer that points to an Ingress Controller (usually NGINX) running inside your cluster. The Ingress Controller acts as a smart L7 (HTTP) router." },
            { type: "text", content: "You write Ingress Rules: 'If the request URL path is /api/users, route it to the Users Service. If the path is /api/payments, route it to the Payments Service'. All traffic flows through a single entry point, saving massive infrastructure costs and providing a central place for SSL/TLS certificates." },
            { type: "tip", content: "Resource: K8s.io Tutorials. The official Kubernetes documentation on 'Ingress' provides excellent visual diagrams of how traffic fans out from the internet, through the Ingress, to the Services, and finally to the Pods." }
          ]
        },
        practice: {
          title: "Write an Ingress Rule",
          description: "Route traffic based on URL paths.",
          task: "Complete the Ingress YAML. Define a rule for the path `/api`. The `pathType` should be `Prefix`. Route this traffic to the `backend-service` on port `80`.",
          starterCode: "apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: main-ingress\nspec:\n  rules:\n  - http:\n      paths:\n      # 1. Define the URL path\n      - path: \n        pathType: Prefix\n        backend:\n          service:\n            # 2. Define the destination service name and port\n            name: \n            port:\n              number: "
        },
        type: "yaml"
      },
      {
        id: "k8s-helm",
        title: "Helm: The Package Manager",
        theory: {
          sections: [
            { type: "heading", content: "The YAML Copy-Paste Hell" },
            { type: "text", content: "A microservice needs a Deployment, a Service, an Ingress, a ConfigMap, and a Secret. That's 5 YAML files per microservice. If you have 50 microservices, that's 250 YAML files. If you need to deploy them to 3 environments (Dev, Staging, Prod), you have 750 YAML files! Maintaining this manually is impossible." },
            { type: "heading", content: "Helm Charts" },
            { type: "text", content: "Helm is the package manager for Kubernetes (like `npm` for Node or `apt` for Ubuntu). Helm solves the YAML hell by introducing Templates." },
            { type: "text", content: "Instead of hardcoding `replicas: 3`, you write `replicas: {{ .Values.replicaCount }}`. You extract all the changing variables into a single file called `values.yaml`." },
            { type: "text", content: "Now, to deploy to Production, you just run: `helm install my-app ./chart -f values-prod.yaml`. To deploy to Dev, you run: `helm install my-app ./chart -f values-dev.yaml`. Helm injects the values and dynamically generates all the YAMLs for you!" },
            { type: "tip", content: "Resource: Helm Docs. Learning the Go text templating syntax used by Helm is a massive boost to your DevOps career. The official docs cover functions, loops, and conditions inside YAML templates." }
          ]
        },
        practice: {
          title: "Templating with Helm",
          description: "Separate code from configuration.",
          task: "Look at the Helm template snippet. We want to make the image tag dynamic. Replace the hardcoded 'v1.0' with a Helm template variable: `{{ .Values.image.tag }}`.",
          starterCode: "# This is a snippet of a deployment.yaml template in a Helm Chart\n\ncontainers:\n  - name: my-app\n    # Replace 'v1.0' with the Helm template syntax \n    # pointing to Values -> image -> tag\n    image: my-repo/my-app:v1.0\n    ports:\n      - containerPort: {{ .Values.service.port }}"
        },
        type: "yaml"
      }
    ]
  },
  RU: {
    title: "Kubernetes (CORE)",
    description: "Pods, Deployments, Services, Ingress и Helm. Научитесь управлять контейнерами в масштабах Enterprise.",
    lessons: [
      {
        id: "k8s-philosophy",
        title: "Дирижер оркестра: Архитектура и Философия K8s",
        theory: {
          sections: [
            { type: "heading", content: "Почему Docker Compose недостаточно?" },
            { type: "text", content: "Docker Compose отлично подходит для запуска 5 контейнеров на одном сервере. Но что если у вас 1000 контейнеров и 50 физических серверов? Если один сервер сгорит, Docker Compose не перенесет ваши контейнеры на выжившие машины. Вам нужен Оркестратор. И Kubernetes (K8s) — это абсолютный монополист в этой сфере." },
            { type: "heading", content: "Декларативная 'Государственная' машина" },
            { type: "text", content: "K8s работает как строгая бюрократия. Вы не говорите ему, *КАК* делать вещи (Императивный подход). Вы отдаете ему YAML-документ (Декларацию), в котором описываете *ЖЕЛАЕМОЕ СОСТОЯНИЕ*: 'Я хочу, чтобы работало 3 контейнера Nginx'. K8s постоянно мониторит кластер. Если он видит только 2 контейнера (один упал с ошибкой), он автоматически создает новый, чтобы подогнать реальность под вашу декларацию." },
            { type: "heading", content: "Control Plane против Worker Nodes" },
            { type: "list", items: [
              "Control Plane (Мозг): Содержит API Server (принимает ваши YAML), etcd (базу данных, хранящую состояние кластера) и Scheduler (планировщик, который решает, на какой физический сервер отправить контейнер).",
              "Worker Nodes (Мускулы): Физические серверы, на которых реально крутятся ваши приложения. На них работает агент 'Kubelet', который отчитывается Мозгу."
            ]},
            { type: "tip", content: "Ресурс: KodeKloud. Если вы планируете сдавать топовый экзамен CKA (Certified Kubernetes Administrator), платформа KodeKloud — лучшее место в мире. Их визуальные лабораторные в браузере формируют реальную мышечную память для работы с консолью `kubectl`." }
          ]
        },
        practice: {
          title: "Интерфейс Kubectl",
          description: "Взаимодействие с API Kubernetes.",
          task: "Главный инструмент DevOps-инженера для общения с 'Мозгом' кластера — это утилита командной строки `kubectl`. Напишите команду, чтобы вывести список всех физических серверов (узлов/nodes) в вашем кластере.",
          starterCode: "# Получите список всех рабочих и мастер-узлов в кластере\n\nkubectl "
        },
        type: "bash"
      },
      {
        id: "k8s-pods",
        title: "Атомарная единица: Pods и паттерн Sidecar",
        theory: {
          sections: [
            { type: "heading", content: "Почему нельзя просто запустить контейнер?" },
            { type: "text", content: "В Kubernetes вы никогда не запускаете Docker-контейнер напрямую. Самой мелкой, атомарной единицей развертывания является Pod. Pod — это 'обертка', внутри которой может находиться один или несколько контейнеров." },
            { type: "text", content: "Зачем это нужно? Потому что иногда два контейнера неразрывно связаны. Им нужно делить один IP-адрес (localhost), общие папки на диске (Volumes), и они должны масштабироваться и умирать строго вместе." },
            { type: "heading", content: "Паттерн Sidecar (Коляска)" },
            { type: "text", content: "Классический пример — паттерн Sidecar. У вас есть Основной контейнер (веб-сервер Node.js). Вы хотите отправлять его логи на центральный сервер аналитики, но не хотите переписывать код Node.js. Вы просто добавляете Вспомогательный контейнер (Sidecar, например Filebeat) внутрь ТОГО ЖЕ Pod'а. Sidecar читает лог-файлы Node.js с общего диска и отправляет их по сети. Они живут и умирают как единое целое." }
          ]
        },
        practice: {
          title: "Напиши YAML для Pod'а",
          description: "Определите базовый объект Kubernetes.",
          task: "Допишите YAML-манифест для создания Pod'а. Поле `apiVersion` должно быть 'v1', а `kind` — 'Pod'. В блоке `metadata` задайте имя (name) 'nginx-pod'. В блоке `spec.containers` укажите образ (image) 'nginx:latest'.",
          starterCode: "apiVersion: \nkind: \nmetadata:\n  name: \nspec:\n  containers:\n    - name: my-nginx-container\n      image: "
        },
        type: "yaml"
      },
      {
        id: "k8s-deployments",
        title: "Бессмертие: ReplicaSets и Deployments",
        theory: {
          sections: [
            { type: "heading", content: "Поды смертны" },
            { type: "text", content: "Если вы создадите 'голый' Pod, и сервер, на котором он работает, сгорит, Pod умрет навсегда. K8s НЕ будет его пересоздавать. Чтобы добиться бессмертия (Auto-Healing) и масштабирования, мы оборачиваем Pod'ы в контроллеры более высокого уровня." },
            { type: "heading", content: "Deployments (Развертывания)" },
            { type: "text", content: "Deployment — это самый частый объект в K8s. Вы говорите ему: 'Я хочу, чтобы работало ровно 3 копии (реплики) моего Node.js Pod'а'. Deployment создает объект ReplicaSet, который следит за этим. Если вы вручную удалите Pod, ReplicaSet мгновенно создаст новый, чтобы поддержать число 3." },
            { type: "heading", content: "Rolling Updates (Обновление без простоев)" },
            { type: "text", content: "Deployments управляют версиями. Если вы меняете образ контейнера с 'v1' на 'v2', Deployment запускает Rolling Update (Скользящее обновление). Он создает один Pod v2, ждет, пока тот станет здоровым, затем убивает один Pod v1. Он делает это поштучно, гарантируя, что ваши пользователи не заметят ни секунды даунтайма (Zero-Downtime) при релизе!" }
          ]
        },
        practice: {
          title: "Создание Deployment",
          description: "Опишите масштабируемое приложение.",
          task: "Допишите YAML для Deployment. Установите количество реплик (replicas) равным 3. Чтобы Deployment знал, какими подами он управляет, лейблы в 'selector.matchLabels' должны строго совпадать с лейблами в 'template.metadata.labels'. Впишите туда 'app: backend'.",
          starterCode: "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: backend-deployment\nspec:\n  # 1. Укажите желаемое число Pod'ов\n  replicas: \n  selector:\n    matchLabels:\n      app: backend\n  template:\n    metadata:\n      labels:\n        # 2. Этот лейбл должен совпадать с селектором выше!\n        \n    spec:\n      containers:\n      - name: app\n        image: my-backend:v1"
        },
        type: "yaml"
      },
      {
        id: "k8s-services",
        title: "Связь (Networking): Проблема меняющихся IP",
        theory: {
          sections: [
            { type: "heading", content: "Эфемерные IP-адреса" },
            { type: "text", content: "Поскольку Pod'ы постоянно умирают и пересоздаются (Деплойментами или Автоскейлерами), их IP-адреса меняются каждый раз. Если ваш Фронтенд попытается подключиться к Бэкенду по его IP (например, 10.244.1.5), всё сломается, как только Бэкенд перезагрузится и получит новый IP (10.244.2.12)." },
            { type: "heading", content: "Services (Службы) спешат на помощь" },
            { type: "text", content: "Объект Service работает как стабильный, несменяемый IP-адрес и DNS-имя (Внутренний Load Balancer), стоящий перед группой Pod'ов. Даже если все Бэкенд-поды умрут и пересоздадутся, IP и имя самого Сервиса (`http://backend-service`) никогда не изменятся. Фронтенд всегда обращается только к Сервису." },
            { type: "list", items: [
              "ClusterIP: Тип по умолчанию. Открывает доступ к сервису ТОЛЬКО внутри кластера (например, Фронтенд -> Бэкенд).",
              "NodePort: Открывает специфический порт (30000-32767) на ВСЕХ физических серверах-воркерах для внешнего доступа.",
              "LoadBalancer: Связывается с API облака (AWS/GCP), чтобы автоматически заказать реальный облачный балансировщик, смотрящий в интернет."
            ]}
          ]
        },
        practice: {
          title: "Связываем Pod'ы через Service",
          description: "Напишите ClusterIP сервис.",
          task: "Допишите YAML сервиса. Сервис ищет Pod'ы, на которые нужно перенаправлять трафик, используя поле `selector`. Настройте селектор на поиск Pod'ов с лейблом `app: backend`. Затем сопоставьте порт сервиса (port: 80) с портом контейнера (targetPort: 8080).",
          starterCode: "apiVersion: v1\nkind: Service\nmetadata:\n  name: backend-service\nspec:\n  type: ClusterIP\n  # 1. Селектор ищет поды, на которые пойдет трафик\n  selector:\n    \n  ports:\n    - port: 80\n      # 2. Реальный порт, который слушает ваше Node.js приложение в контейнере\n      targetPort: "
        },
        type: "yaml"
      },
      {
        id: "k8s-ingress",
        title: "Ingress: Главные ворота в кластер",
        theory: {
          sections: [
            { type: "heading", content: "Дороговизна Облачных LoadBalancers" },
            { type: "text", content: "Представьте, что у вас 20 микросервисов (Пользователи, Оплата, Корзина). Если вы выставите каждый из них в интернет с помощью типа `LoadBalancer`, AWS создаст 20 физических балансировщиков. Каждый стоит ~$20/мес. Вы будете сжигать $400/мес просто на маршрутизации!" },
            { type: "heading", content: "Ingress Controller" },
            { type: "text", content: "Объект Ingress решает эту проблему. Вы создаете всего ОДИН облачный LoadBalancer, который смотрит на Ingress Controller (обычно это NGINX), запущенный внутри вашего кластера. Ingress Controller работает как умный L7 (HTTP) роутер." },
            { type: "text", content: "Вы пишете правила (Rules) маршрутизации: 'Если юзер запрашивает URL `/api/users`, отправь трафик на Сервис Пользователей. Если `/api/payments` — на Сервис Оплат'. Весь трафик идет через одну точку входа. Это экономит огромные деньги на инфраструктуре и позволяет централизованно управлять SSL/HTTPS сертификатами." },
            { type: "tip", content: "Ресурс: K8s.io Tutorials. Официальная документация Kubernetes по теме 'Ingress' содержит отличные визуальные диаграммы того, как трафик из интернета веером расходится через Ingress к Сервисам, а затем к Подам." }
          ]
        },
        practice: {
          title: "Напиши Ingress Правило",
          description: "Маршрутизация по URL-путям.",
          task: "Допишите YAML Ingress. Определите правило для пути (path) `/api`. Тип пути (`pathType`) должен быть `Prefix`. Отправьте этот трафик на бэкенд: укажите имя сервиса `backend-service` и порт `80`.",
          starterCode: "apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: main-ingress\nspec:\n  rules:\n  - http:\n      paths:\n      # 1. Укажите URL путь и тип\n      - path: \n        pathType: Prefix\n        backend:\n          service:\n            # 2. Имя целевого сервиса и порт\n            name: \n            port:\n              number: "
        },
        type: "yaml"
      },
      {
        id: "k8s-helm",
        title: "Helm: Пакетный менеджер K8s",
        theory: {
          sections: [
            { type: "heading", content: "Ад с Копипастой YAML" },
            { type: "text", content: "Одному микросервису нужны: Deployment, Service, Ingress, ConfigMap и Secret. Это 5 файлов YAML. Если у вас 50 микросервисов, это 250 файлов. Если их нужно развернуть на 3 окружения (Dev, Staging, Prod) — у вас 750 файлов! Менять в них вручную теги образов — невозможно." },
            { type: "heading", content: "Helm Charts (Чарты)" },
            { type: "text", content: "Helm — это пакетный менеджер для Kubernetes (как `npm` для Node или `apt` для Ubuntu). Он решает проблему YAML-ада с помощью Шаблонизации (Templates)." },
            { type: "text", content: "Вместо жестко прописанного `replicas: 3`, вы пишете `replicas: {{ .Values.replicaCount }}`. Вы выносите все меняющиеся переменные в один отдельный файл `values.yaml`." },
            { type: "text", content: "Теперь, чтобы задеплоить приложение в Продакшен, вы пишете: `helm install my-app ./chart -f values-prod.yaml`. Для Дева: `helm install my-app ./chart -f values-dev.yaml`. Helm сам подставит нужные переменные в шаблоны и сгенерирует финальные YAML файлы на лету!" },
            { type: "tip", content: "Ресурс: Helm Docs. Изучение синтаксиса шаблонизации Go, который использует Helm — это огромный буст для карьеры DevOps. В официальной документации отлично описаны функции, циклы и условия (`if/else`) внутри YAML шаблонов." }
          ]
        },
        practice: {
          title: "Шаблонизация с Helm",
          description: "Отделение кода (шаблонов) от конфигурации.",
          task: "Посмотрите на кусок Helm-шаблона. Мы хотим сделать тег (версию) образа динамическим. Замените жестко захардкоженный 'v1.0' на синтаксис переменной Helm: `{{ .Values.image.tag }}`.",
          starterCode: "# Это кусок шаблона deployment.yaml внутри Helm Chart'а\n\ncontainers:\n  - name: my-app\n    # Замените 'v1.0' на синтаксис шаблонизатора Helm,\n    # который обращается к Values -> image -> tag\n    image: my-repo/my-app:v1.0\n    ports:\n      - containerPort: {{ .Values.service.port }}"
        },
        type: "yaml"
      }
    ]
  }
};