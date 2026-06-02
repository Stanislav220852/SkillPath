export const mlopsState: Record<'EN' | 'RU', any> = {
  EN: { 
    title: "MLOps (EN)", 
    description: "English translation pending.", 
    lessons: [
    {
        "id": "lesson-1",
        "title": "Введение: Проблема хаоса в ML",
        "theory": {
            "sections": [
                {
                    "type": "heading",
                    "content": "Что такое MLOps?"
                },
                {
                    "type": "text",
                    "content": "MLOps (Machine Learning Operations) — это набор практик, направленный на надежное, автоматизированное и масштабируемое развертывание ML-моделей в продакшене. Это DevOps для мира машинного обучения."
                },
                {
                    "type": "heading",
                    "content": "Синдром \"У меня в Ноутбуке работает!\""
                },
                {
                    "type": "text",
                    "content": "Типичная работа Junior Data Scientist'а выглядит так:"
                },
                {
                    "type": "list",
                    "items": [
                        "Скачать CSV-файл себе на ноутбук.",
                        "Открыть Jupyter Notebook Untitled_12_Final_Final.ipynb.",
                        "Подобрать параметры так, чтобы Accuracy стала 95%.",
                        "Сохранить модель как model_v3.pkl и скинуть её Backend-разработчику в Telegram."
                    ]
                },
                {
                    "type": "tip",
                    "content": "Почему это катастрофа для бизнеса: Через месяц модель начнет ошибаться (Data Drift). Вам нужно будет её переобучить. Но вы забыли, на какой версии данных учили model_v3. Вы забыли, какие гиперпараметры (Learning Rate) давали 95%. А Backend-разработчик жалуется, что ваш новый .pkl файл ломает сервер из-за разницы версий библиотек (у вас scikit-learn 1.3, а на сервере 1.0)."
                },
                {
                    "type": "heading",
                    "content": "Инструменты MLOps"
                },
                {
                    "type": "text",
                    "content": "Чтобы победить этот хаос, индустрия создала инструменты:"
                },
                {
                    "type": "list",
                    "items": [
                        "DVC — версионирование данных (как Git, но для терабайтов видео и CSV).",
                        "MLflow — трекинг экспериментов и реестр моделей.",
                        "FastAPI / Docker — упаковка модели в изолированный контейнер с API."
                    ]
                }
            ]
        },
        "practice": {
            "title": "Практика",
            "description": "Что такое MLOps?\n        MLOps (Machine Learning Operations) — это набор практик, направленный на надежное, автоматизированное и масштабируемое развертывание ML-моделей в продакшене.",
            "task": "Это DevOps для мира машинного обучения.\n        \n        Синдром \"У меня в Ноутбуке работает!\"\n        Типичная работа Junior Data Scientist'а выглядит так:\n        \n            Скачать CSV-файл себе на ноутбук.\n            Открыть Jupyter Notebook Untitled_12_Final_Final.ipynb.\n            Подобрать параметры так, чтобы Accuracy стала 95%.\n            Сохранить модель как model_v3.pkl и скинуть её Backend-разработчику в Telegram.\n        \n        \n        \n            Почему это катастрофа для бизнеса:\n            Через месяц модель начнет ошибаться (Data Drift). Вам нужно будет её переобучить. Но вы забыли, на какой версии данных учили model_v3. Вы забыли, какие гиперпараметры (Learning Rate) давали 95%. А Backend-разработчик жалуется, что ваш новый .pkl файл ломает сервер из-за разницы версий библиотек (у вас scikit-learn 1.3, а на сервере 1.0).\n            \n        \n        \n        Инструменты MLOps\n        Чтобы победить этот хаос, индустрия создала инструменты:\n        \n            DVC — версионирование данных (как Git, но для терабайтов видео и CSV).\n            MLflow — трекинг экспериментов и реестр моделей.\n            FastAPI / Docker — упаковка модели в изолированный контейнер с API.",
            "starterCode": "# Типичный скрипт обучения БЕЗ MLOps\nimport random\n\n# Какие-то случайные гиперпараметры, которые мы нигде не сохранили\nlearning_rate = 0.001\nepochs = 50\n\n# Обучаем \"модель\"\naccuracy = 0.80 + (random.random() * 0.1)\n\nprint(f\"Модель обучена за {epochs} эпох!\")\nprint(f\"Точность: {accuracy:.4f}\")\n\nprint(\"\\nПроблема: Если закрыть консоль, мы навсегда забудем, \")\nprint(\"при каком learning_rate мы получили эту точность!\")"
        },
        "type": "python"
    },
    {
        "id": "lesson-2",
        "title": "Версионирование данных: DVC",
        "theory": {
            "sections": [
                {
                    "type": "heading",
                    "content": "Почему Git не подходит для данных?"
                },
                {
                    "type": "text",
                    "content": "Git был создан для работы с текстом (кодом). Если вы попытаетесь сделать git commit для датасета размером 5 Гигабайт, GitHub откажется его принимать (лимит файла 100 МБ), а ваш локальный репозиторий будет \"весить\" тонну."
                },
                {
                    "type": "heading",
                    "content": "Решение: DVC (Data Version Control)"
                },
                {
                    "type": "text",
                    "content": "DVC — это инструмент, который работает поверх Git. Он делает гениальную вещь:"
                },
                {
                    "type": "list",
                    "items": [
                        "Вы говорите: dvc add dataset.csv.",
                        "DVC берет ваш гигантский dataset.csv и переносит его в свое скрытое кэш-хранилище (или сразу в облако AWS S3 / Google Cloud).",
                        "Вместо реального файла DVC оставляет в папке малюсенький текстовый файл-указатель dataset.csv.dvc (весит 1 КБ). В нем написан MD5-хэш реального файла.",
                        "Вы делаете git commit dataset.csv.dvc. Git сохраняет только 1 КБ данных!"
                    ]
                },
                {
                    "type": "heading",
                    "content": "Воспроизводимость"
                },
                {
                    "type": "text",
                    "content": "Теперь любой разработчик может сделать git pull (получив файл-указатель), а затем написать dvc pull. DVC прочитает хэш из указателя, пойдет в облако и скачает правильную версию датасета (именно ту, на которой вы учили модель полгода назад!)."
                }
            ]
        },
        "practice": {
            "title": "Практика",
            "description": "Почему Git не подходит для данных?\n        Git был создан для работы с текстом (кодом).",
            "task": "Если вы попытаетесь сделать git commit для датасета размером 5 Гигабайт, GitHub откажется его принимать (лимит файла 100 МБ), а ваш локальный репозиторий будет \"весить\" тонну.\n\n        Решение: DVC (Data Version Control)\n        DVC — это инструмент, который работает поверх Git. Он делает гениальную вещь:\n        \n            Вы говорите: dvc add dataset.csv.\n            DVC берет ваш гигантский dataset.csv и переносит его в свое скрытое кэш-хранилище (или сразу в облако AWS S3 / Google Cloud).\n            Вместо реального файла DVC оставляет в папке малюсенький текстовый файл-указатель dataset.csv.dvc (весит 1 КБ). В нем написан MD5-хэш реального файла.\n            Вы делаете git commit dataset.csv.dvc. Git сохраняет только 1 КБ данных!\n        \n\n        Воспроизводимость\n        Теперь любой разработчик может сделать git pull (получив файл-указатель), а затем написать dvc pull. DVC прочитает хэш из указателя, пойдет в облако и скачает правильную версию датасета (именно ту, на которой вы учили модель полгода назад!).",
            "starterCode": "# Мы используем модуль os для эмуляции терминальных команд\nimport os\n\nprint(\"--- Настройка DVC пайплайна ---\\n\")\n\n# 1. Инициализация DVC в проекте\nos.system(\"dvc init\")\n\n# 2. Добавьте гигантский датасет под контроль DVC\n# Используйте: os.system(\"dvc add data/dataset.csv\")\n\n\n# 3. DVC создал файл-указатель (data/dataset.csv.dvc). \n# Теперь добавим этот указатель в Git!\n# Используйте: os.system(\"git add data/dataset.csv.dvc\")\n\n\n# 4. Делаем коммит в Git\nos.system(\"git commit -m 'Добавлен датасет v1'\")"
        },
        "type": "python"
    },
    {
        "id": "lesson-3",
        "title": "Трекинг экспериментов: MLflow",
        "theory": {
            "sections": [
                {
                    "type": "heading",
                    "content": "Лабораторный журнал Data Scientist'а"
                },
                {
                    "type": "text",
                    "content": "При поиске лучшей модели вы меняете learning_rate, меняете архитектуру, добавляете слои. Вы проведете 200 экспериментов. Запоминать результаты в Excel — прошлый век."
                },
                {
                    "type": "text",
                    "content": "MLflow Tracking — это сервер с красивым дашбордом, куда ваш Python-код автоматически отправляет результаты каждого запуска (Run)."
                },
                {
                    "type": "heading",
                    "content": "Что мы логируем?"
                },
                {
                    "type": "list",
                    "items": [
                        "Параметры (Parameters): Настройки модели (число эпох, learning_rate). Логируются через mlflow.log_param().",
                        "Метрики (Metrics): Результаты обучения (Accuracy, MSE). Меняются со временем. Логируются через mlflow.log_metric().",
                        "Артефакты (Artifacts): Сама обученная модель (в виде .pkl или .pt файла), графики Loss. Логируются через mlflow.sklearn.log_model()."
                    ]
                },
                {
                    "type": "heading",
                    "content": "Как это выглядит в коде"
                },
                {
                    "type": "code",
                    "content": "import mlflow\n\n# Открываем \"Сессию\" записи эксперимента\nwith mlflow.start_run():\n    mlflow.log_param(\"learning_rate\", 0.01)\n    \n    # ... код обучения ...\n    \n    mlflow.log_metric(\"accuracy\", 0.96)\n    mlflow.sklearn.log_model(model, \"my_model\")"
                },
                {
                    "type": "text",
                    "content": "Зайдя в UI MLflow, вы увидите удобную таблицу, где можно отсортировать все 200 запусков по колонке Accuracy и в 1 клик скачать лучшую модель."
                }
            ]
        },
        "practice": {
            "title": "Практика",
            "description": "Лабораторный журнал Data Scientist'а\n        При поиске лучшей модели вы меняете learning_rate, меняете архитектуру, добавляете слои.",
            "task": "Вы проведете 200 экспериментов. Запоминать результаты в Excel — прошлый век.\n        MLflow Tracking — это сервер с красивым дашбордом, куда ваш Python-код автоматически отправляет результаты каждого запуска (Run).\n\n        Что мы логируем?\n        \n            Параметры (Parameters): Настройки модели (число эпох, learning_rate). Логируются через mlflow.log_param().\n            Метрики (Metrics): Результаты обучения (Accuracy, MSE). Меняются со временем. Логируются через mlflow.log_metric().\n            Артефакты (Artifacts): Сама обученная модель (в виде .pkl или .pt файла), графики Loss. Логируются через mlflow.sklearn.log_model().\n        \n\n        Как это выглядит в коде\n        import mlflow\n\n# Открываем \"Сессию\" записи эксперимента\nwith mlflow.start_run():\n    mlflow.log_param(\"learning_rate\", 0.01)\n    \n    # ... код обучения ...\n    \n    mlflow.log_metric(\"accuracy\", 0.96)\n    mlflow.sklearn.log_model(model, \"my_model\")\n        Зайдя в UI MLflow, вы увидите удобную таблицу, где можно отсортировать все 200 запусков по колонке Accuracy и в 1 клик скачать лучшую модель.",
            "starterCode": "import mlflow\nimport random\n\n# Представим, что мы перебираем параметры\nlr = 0.005\ndepth = 10\nacc = 0.88 + random.random() * 0.05\n\nprint(\"Запуск эксперимента...\")\n\n# 1. Откройте сессию: with mlflow.start_run():\n# Не забудьте сделать отступ (табуляцию) для кода внутри with!\n\n\n    # 2. Залогируйте параметры 'lr' и 'depth'\n    # Используйте mlflow.log_param(ключ, значение)\n    \n    \n    # 3. Залогируйте метрику 'accuracy' (значение переменной acc)\n    # Используйте mlflow.log_metric(...)\n    \n    \n    print(\"Эксперимент успешно записан в MLflow!\")"
        },
        "type": "python"
    },
    {
        "id": "lesson-4",
        "title": "Реестр моделей (MLflow Model Registry)",
        "theory": {
            "sections": [
                {
                    "type": "heading",
                    "content": "Жизненный цикл модели"
                },
                {
                    "type": "text",
                    "content": "Вы нашли в MLflow лучшую модель (Run ID: 8a9f3...). Как теперь отдать её Backend-разработчику? Скидывать Run ID неудобно. Для этого в MLflow есть Реестр Моделей (Model Registry)."
                },
                {
                    "type": "text",
                    "content": "Реестр позволяет дать вашей модели человеческое имя (например, FraudDetectionModel) и управлять её версиями и стадиями (Stages)."
                },
                {
                    "type": "heading",
                    "content": "Стадии (Stages)"
                },
                {
                    "type": "text",
                    "content": "У каждой версии модели в реестре есть свой статус:"
                },
                {
                    "type": "list",
                    "items": [
                        "None: Модель только что добавлена (Версия 1).",
                        "Staging: Модель отправлена на тестовый сервер. QA-инженеры проверяют её.",
                        "Production: Модель проверена и работает на реальных пользователях!",
                        "Archived: Модель устарела и больше не используется."
                    ]
                },
                {
                    "type": "heading",
                    "content": "Как бэкенд забирает модель?"
                },
                {
                    "type": "text",
                    "content": "Backend-сервис при запуске не ищет файл model_v3.pkl. Он делает API-запрос к MLflow: \"Дай мне модель FraudDetectionModel, у которой стадия Production\". MLflow сам отдает нужный файл."
                },
                {
                    "type": "text",
                    "content": "Если модель в проде сломалась, Data Scientist заходит в UI MLflow, переводит Версию 2 в Archived, а Версию 1 возвращает в Production. Бэкенд автоматически скачивает Версию 1. Никакого деплоя кода не требуется!"
                }
            ]
        },
        "practice": {
            "title": "Практика",
            "description": "Жизненный цикл модели\n        Вы нашли в MLflow лучшую модель (Run ID: 8a9f3...).",
            "task": "Как теперь отдать её Backend-разработчику? Скидывать Run ID неудобно. Для этого в MLflow есть Реестр Моделей (Model Registry).\n        Реестр позволяет дать вашей модели человеческое имя (например, FraudDetectionModel) и управлять её версиями и стадиями (Stages).\n\n        Стадии (Stages)\n        У каждой версии модели в реестре есть свой статус:\n        \n            None: Модель только что добавлена (Версия 1).\n            Staging: Модель отправлена на тестовый сервер. QA-инженеры проверяют её.\n            Production: Модель проверена и работает на реальных пользователях!\n            Archived: Модель устарела и больше не используется.\n        \n\n        Как бэкенд забирает модель?\n        Backend-сервис при запуске не ищет файл model_v3.pkl. Он делает API-запрос к MLflow: \"Дай мне модель FraudDetectionModel, у которой стадия Production\". MLflow сам отдает нужный файл.\n        Если модель в проде сломалась, Data Scientist заходит в UI MLflow, переводит Версию 2 в Archived, а Версию 1 возвращает в Production. Бэкенд автоматически скачивает Версию 1. Никакого деплоя кода не требуется!",
            "starterCode": "import mlflow\nfrom mlflow.tracking import MlflowClient\n\nmodel_name = \"PricePredictor\"\nrun_uri = \"runs:/d12345a/model\"\n\nprint(f\"Регистрируем новую модель {model_name}...\")\n# 1. Зарегистрируйте модель из run_uri\n# Используйте: mlflow.register_model(model_uri=run_uri, name=model_name)\n\n\n# 2. Создадим клиент для управления стадиями\nclient = MlflowClient()\n\nprint(\"Переводим Версию 1 в Продакшен...\")\n# 3. Переведите модель в Production\n# Используйте: client.transition_model_version_stage(name=model_name, version=1, stage=\"Production\")"
        },
        "type": "python"
    },
    {
        "id": "lesson-5",
        "title": "Деплой модели: Model Serving (FastAPI)",
        "theory": {
            "sections": [
                {
                    "type": "heading",
                    "content": "Что такое Model Serving?"
                },
                {
                    "type": "text",
                    "content": "Модель обучена и лежит в MLflow. Но как мобильное приложение (например, iOS) или сайт спросят у неё предсказание? Нельзя просто внедрить Python-код модели в телефон. Нужен API-шлюз."
                },
                {
                    "type": "text",
                    "content": "Мы пишем небольшой веб-сервер, который загружает модель в оперативную память. Сервер принимает данные в формате JSON (через HTTP-запрос), прогоняет их через model.predict() и возвращает JSON с ответом. Этот процесс называется Serving (Обслуживание модели)."
                },
                {
                    "type": "heading",
                    "content": "Почему FastAPI?"
                },
                {
                    "type": "text",
                    "content": "Индустриальный стандарт для ML Serving — фреймворк FastAPI (заменил устаревший Flask). Его преимущества:"
                },
                {
                    "type": "list",
                    "items": [
                        "Асинхронность: Может держать тысячи соединений одновременно.",
                        "Pydantic: Автоматически проверяет, что пришел правильный JSON. Если модель ждет \"age\": 25, а пришло \"age\": \"двадцать\", FastAPI сам выдаст красивую ошибку, не сломав сервер.",
                        "Авто-документация: Сам генерирует Swagger UI страницу для тестирования API."
                    ]
                },
                {
                    "type": "code",
                    "content": "from fastapi import FastAPI\n\napp = FastAPI()\n\n# Маршрут (Endpoint) для предсказаний\n@app.post(\"/predict\")\ndef predict_api(data: dict):\n    result = my_model.predict([data[\"features\"]])\n    return {\"prediction\": result[0]}"
                }
            ]
        },
        "practice": {
            "title": "Практика",
            "description": "Что такое Model Serving?\n        Модель обучена и лежит в MLflow.",
            "task": "Но как мобильное приложение (например, iOS) или сайт спросят у неё предсказание? Нельзя просто внедрить Python-код модели в телефон. Нужен API-шлюз.\n        Мы пишем небольшой веб-сервер, который загружает модель в оперативную память. Сервер принимает данные в формате JSON (через HTTP-запрос), прогоняет их через model.predict() и возвращает JSON с ответом. Этот процесс называется Serving (Обслуживание модели).\n\n        Почему FastAPI?\n        Индустриальный стандарт для ML Serving — фреймворк FastAPI (заменил устаревший Flask). Его преимущества:\n        \n            Асинхронность: Может держать тысячи соединений одновременно.\n            Pydantic: Автоматически проверяет, что пришел правильный JSON. Если модель ждет \"age\": 25, а пришло \"age\": \"двадцать\", FastAPI сам выдаст красивую ошибку, не сломав сервер.\n            Авто-документация: Сам генерирует Swagger UI страницу для тестирования API.\n        \n        from fastapi import FastAPI\n\napp = FastAPI()\n\n# Маршрут (Endpoint) для предсказаний\n@app.post(\"/predict\")\ndef predict_api(data: dict):\n    result = my_model.predict([data[\"features\"]])\n    return {\"prediction\": result[0]}",
            "starterCode": "# Мы используем эмулятор FastAPI\nfrom fastapi import FastAPI, TestClient\n\n# Загружаем \"модель\" (Заглушка)\nclass MyModel:\n    def predict(self, x): return [sum(x) * 10]\nmodel = MyModel()\n\n# 1. Создайте приложение FastAPI\napp = \n\n# 2. Напишите декоратор для POST запроса на эндпоинт \"/predict\"\n# @app.post(\"/predict\")\n\n\n# 3. Напишите функцию обработки запроса def get_prediction(data: dict):\n# Внутри получите результат model.predict(data[\"features\"]) и верните словарь {\"result\": ...}\n\n\n\n\n\n# --- Тестирование нашего API ---\nclient = TestClient(app)\nresponse = client.post(\"/predict\", json={\"features\": [2, 3]})\nprint(\"Ответ сервера:\", response.json())"
        },
        "type": "python"
    },
    {
        "id": "lesson-6",
        "title": "Изоляция и CT (Docker & Continuous Training)",
        "theory": {
            "sections": [
                {
                    "type": "heading",
                    "content": "Проблема окружения"
                },
                {
                    "type": "text",
                    "content": "Ваш FastAPI сервер отлично работает на ноутбуке. Вы переносите код на сервер Ubuntu, и он падает. Причина: на сервере стоит Python 3.8 вместо 3.11, и другая версия PyTorch. Зависимости сломались."
                },
                {
                    "type": "heading",
                    "content": "Решение: Контейнеризация (Docker)"
                },
                {
                    "type": "text",
                    "content": "Docker решает проблему \"Работает на моем компе\". Он упаковывает ваш код (FastAPI), саму модель и все системные библиотеки (включая версию Linux) в один неизменяемый кирпичик — Контейнер."
                },
                {
                    "type": "text",
                    "content": "Вы пишете инструкцию Dockerfile. Docker собирает из нее Образ (Image). Этот образ гарантированно запустится абсолютно одинаково на любом сервере в мире."
                },
                {
                    "type": "heading",
                    "content": "Что такое CT (Continuous Training)?"
                },
                {
                    "type": "text",
                    "content": "В MLOps к классическим CI/CD добавляется буква CT (Непрерывное обучение)."
                },
                {
                    "type": "text",
                    "content": "Модели устаревают (Data Drift). Рекомендации товаров из 2022 года не сработают в 2024. Пайплайн CT делает следующее:"
                },
                {
                    "type": "list",
                    "items": [
                        "Каждую неделю робот берет свежие данные из базы (по DVC).",
                        "Автоматически запускает код обучения модели (записывая всё в MLflow).",
                        "Если новая модель на тестах лучше старой, робот сам переводит её в Production (в MLflow Registry).",
                        "CI/CD пайплайн видит новую Production модель, пересобирает Docker-контейнер с FastAPI и деплоит его в облако (например, в Kubernetes)."
                    ]
                },
                {
                    "type": "text",
                    "content": "Весь цикл происходит без участия дата-саентиста!"
                }
            ]
        },
        "practice": {
            "title": "Практика",
            "description": "Проблема окружения\n        Ваш FastAPI сервер отлично работает на ноутбуке.",
            "task": "Вы переносите код на сервер Ubuntu, и он падает. Причина: на сервере стоит Python 3.8 вместо 3.11, и другая версия PyTorch. Зависимости сломались.\n\n        Решение: Контейнеризация (Docker)\n        Docker решает проблему \"Работает на моем компе\". Он упаковывает ваш код (FastAPI), саму модель и все системные библиотеки (включая версию Linux) в один неизменяемый кирпичик — Контейнер.\n        Вы пишете инструкцию Dockerfile. Docker собирает из нее Образ (Image). Этот образ гарантированно запустится абсолютно одинаково на любом сервере в мире.\n\n        Что такое CT (Continuous Training)?\n        В MLOps к классическим CI/CD добавляется буква CT (Непрерывное обучение).\n        Модели устаревают (Data Drift). Рекомендации товаров из 2022 года не сработают в 2024. Пайплайн CT делает следующее:\n        \n            Каждую неделю робот берет свежие данные из базы (по DVC).\n            Автоматически запускает код обучения модели (записывая всё в MLflow).\n            Если новая модель на тестах лучше старой, робот сам переводит её в Production (в MLflow Registry).\n            CI/CD пайплайн видит новую Production модель, пересобирает Docker-контейнер с FastAPI и деплоит его в облако (например, в Kubernetes).\n        \n        Весь цикл происходит без участия дата-саентиста!",
            "starterCode": "# Мы не можем запустить настоящий Docker в браузере, \n# но мы можем написать Dockerfile генератор!\n\n# Опишем Dockerfile для нашего FastAPI приложения\ndockerfile_content = \"\"\"\n# 1. Используем базовый образ Python 3.10\nFROM python:3.10-slim\n\n# 2. Задаем рабочую папку внутри контейнера\nWORKDIR /app\n\n# 3. Копируем файл зависимостей\nCOPY requirements.txt .\n\n# 4. Устанавливаем библиотеки (fastapi, uvicorn, mlflow, scikit-learn)\nRUN pip install -r requirements.txt\n\n# 5. Копируем весь наш код (app.py) внутрь контейнера\nCOPY . .\n\n# 6. Команда запуска сервера (uvicorn)\nCMD [\"uvicorn\", \"app:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]\n\"\"\"\n\nprint(\"--- Сгенерированный Dockerfile ---\")\nprint(dockerfile_content)\nprint(\"--- Готово к деплою в Kubernetes! ---\")"
        },
        "type": "python"
    }
] 
  },
  RU: { 
    title: "MLOps", 
    description: "DVC, MLflow, Docker и деплой моделей.", 
    lessons: [
    {
        "id": "lesson-1",
        "title": "Введение: Проблема хаоса в ML",
        "theory": {
            "sections": [
                {
                    "type": "heading",
                    "content": "Что такое MLOps?"
                },
                {
                    "type": "text",
                    "content": "MLOps (Machine Learning Operations) — это набор практик, направленный на надежное, автоматизированное и масштабируемое развертывание ML-моделей в продакшене. Это DevOps для мира машинного обучения."
                },
                {
                    "type": "heading",
                    "content": "Синдром \"У меня в Ноутбуке работает!\""
                },
                {
                    "type": "text",
                    "content": "Типичная работа Junior Data Scientist'а выглядит так:"
                },
                {
                    "type": "list",
                    "items": [
                        "Скачать CSV-файл себе на ноутбук.",
                        "Открыть Jupyter Notebook Untitled_12_Final_Final.ipynb.",
                        "Подобрать параметры так, чтобы Accuracy стала 95%.",
                        "Сохранить модель как model_v3.pkl и скинуть её Backend-разработчику в Telegram."
                    ]
                },
                {
                    "type": "tip",
                    "content": "Почему это катастрофа для бизнеса: Через месяц модель начнет ошибаться (Data Drift). Вам нужно будет её переобучить. Но вы забыли, на какой версии данных учили model_v3. Вы забыли, какие гиперпараметры (Learning Rate) давали 95%. А Backend-разработчик жалуется, что ваш новый .pkl файл ломает сервер из-за разницы версий библиотек (у вас scikit-learn 1.3, а на сервере 1.0)."
                },
                {
                    "type": "heading",
                    "content": "Инструменты MLOps"
                },
                {
                    "type": "text",
                    "content": "Чтобы победить этот хаос, индустрия создала инструменты:"
                },
                {
                    "type": "list",
                    "items": [
                        "DVC — версионирование данных (как Git, но для терабайтов видео и CSV).",
                        "MLflow — трекинг экспериментов и реестр моделей.",
                        "FastAPI / Docker — упаковка модели в изолированный контейнер с API."
                    ]
                }
            ]
        },
        "practice": {
            "title": "Практика",
            "description": "Что такое MLOps?\n        MLOps (Machine Learning Operations) — это набор практик, направленный на надежное, автоматизированное и масштабируемое развертывание ML-моделей в продакшене.",
            "task": "Это DevOps для мира машинного обучения.\n        \n        Синдром \"У меня в Ноутбуке работает!\"\n        Типичная работа Junior Data Scientist'а выглядит так:\n        \n            Скачать CSV-файл себе на ноутбук.\n            Открыть Jupyter Notebook Untitled_12_Final_Final.ipynb.\n            Подобрать параметры так, чтобы Accuracy стала 95%.\n            Сохранить модель как model_v3.pkl и скинуть её Backend-разработчику в Telegram.\n        \n        \n        \n            Почему это катастрофа для бизнеса:\n            Через месяц модель начнет ошибаться (Data Drift). Вам нужно будет её переобучить. Но вы забыли, на какой версии данных учили model_v3. Вы забыли, какие гиперпараметры (Learning Rate) давали 95%. А Backend-разработчик жалуется, что ваш новый .pkl файл ломает сервер из-за разницы версий библиотек (у вас scikit-learn 1.3, а на сервере 1.0).\n            \n        \n        \n        Инструменты MLOps\n        Чтобы победить этот хаос, индустрия создала инструменты:\n        \n            DVC — версионирование данных (как Git, но для терабайтов видео и CSV).\n            MLflow — трекинг экспериментов и реестр моделей.\n            FastAPI / Docker — упаковка модели в изолированный контейнер с API.",
            "starterCode": "# Типичный скрипт обучения БЕЗ MLOps\nimport random\n\n# Какие-то случайные гиперпараметры, которые мы нигде не сохранили\nlearning_rate = 0.001\nepochs = 50\n\n# Обучаем \"модель\"\naccuracy = 0.80 + (random.random() * 0.1)\n\nprint(f\"Модель обучена за {epochs} эпох!\")\nprint(f\"Точность: {accuracy:.4f}\")\n\nprint(\"\\nПроблема: Если закрыть консоль, мы навсегда забудем, \")\nprint(\"при каком learning_rate мы получили эту точность!\")"
        },
        "type": "python"
    },
    {
        "id": "lesson-2",
        "title": "Версионирование данных: DVC",
        "theory": {
            "sections": [
                {
                    "type": "heading",
                    "content": "Почему Git не подходит для данных?"
                },
                {
                    "type": "text",
                    "content": "Git был создан для работы с текстом (кодом). Если вы попытаетесь сделать git commit для датасета размером 5 Гигабайт, GitHub откажется его принимать (лимит файла 100 МБ), а ваш локальный репозиторий будет \"весить\" тонну."
                },
                {
                    "type": "heading",
                    "content": "Решение: DVC (Data Version Control)"
                },
                {
                    "type": "text",
                    "content": "DVC — это инструмент, который работает поверх Git. Он делает гениальную вещь:"
                },
                {
                    "type": "list",
                    "items": [
                        "Вы говорите: dvc add dataset.csv.",
                        "DVC берет ваш гигантский dataset.csv и переносит его в свое скрытое кэш-хранилище (или сразу в облако AWS S3 / Google Cloud).",
                        "Вместо реального файла DVC оставляет в папке малюсенький текстовый файл-указатель dataset.csv.dvc (весит 1 КБ). В нем написан MD5-хэш реального файла.",
                        "Вы делаете git commit dataset.csv.dvc. Git сохраняет только 1 КБ данных!"
                    ]
                },
                {
                    "type": "heading",
                    "content": "Воспроизводимость"
                },
                {
                    "type": "text",
                    "content": "Теперь любой разработчик может сделать git pull (получив файл-указатель), а затем написать dvc pull. DVC прочитает хэш из указателя, пойдет в облако и скачает правильную версию датасета (именно ту, на которой вы учили модель полгода назад!)."
                }
            ]
        },
        "practice": {
            "title": "Практика",
            "description": "Почему Git не подходит для данных?\n        Git был создан для работы с текстом (кодом).",
            "task": "Если вы попытаетесь сделать git commit для датасета размером 5 Гигабайт, GitHub откажется его принимать (лимит файла 100 МБ), а ваш локальный репозиторий будет \"весить\" тонну.\n\n        Решение: DVC (Data Version Control)\n        DVC — это инструмент, который работает поверх Git. Он делает гениальную вещь:\n        \n            Вы говорите: dvc add dataset.csv.\n            DVC берет ваш гигантский dataset.csv и переносит его в свое скрытое кэш-хранилище (или сразу в облако AWS S3 / Google Cloud).\n            Вместо реального файла DVC оставляет в папке малюсенький текстовый файл-указатель dataset.csv.dvc (весит 1 КБ). В нем написан MD5-хэш реального файла.\n            Вы делаете git commit dataset.csv.dvc. Git сохраняет только 1 КБ данных!\n        \n\n        Воспроизводимость\n        Теперь любой разработчик может сделать git pull (получив файл-указатель), а затем написать dvc pull. DVC прочитает хэш из указателя, пойдет в облако и скачает правильную версию датасета (именно ту, на которой вы учили модель полгода назад!).",
            "starterCode": "# Мы используем модуль os для эмуляции терминальных команд\nimport os\n\nprint(\"--- Настройка DVC пайплайна ---\\n\")\n\n# 1. Инициализация DVC в проекте\nos.system(\"dvc init\")\n\n# 2. Добавьте гигантский датасет под контроль DVC\n# Используйте: os.system(\"dvc add data/dataset.csv\")\n\n\n# 3. DVC создал файл-указатель (data/dataset.csv.dvc). \n# Теперь добавим этот указатель в Git!\n# Используйте: os.system(\"git add data/dataset.csv.dvc\")\n\n\n# 4. Делаем коммит в Git\nos.system(\"git commit -m 'Добавлен датасет v1'\")"
        },
        "type": "python"
    },
    {
        "id": "lesson-3",
        "title": "Трекинг экспериментов: MLflow",
        "theory": {
            "sections": [
                {
                    "type": "heading",
                    "content": "Лабораторный журнал Data Scientist'а"
                },
                {
                    "type": "text",
                    "content": "При поиске лучшей модели вы меняете learning_rate, меняете архитектуру, добавляете слои. Вы проведете 200 экспериментов. Запоминать результаты в Excel — прошлый век."
                },
                {
                    "type": "text",
                    "content": "MLflow Tracking — это сервер с красивым дашбордом, куда ваш Python-код автоматически отправляет результаты каждого запуска (Run)."
                },
                {
                    "type": "heading",
                    "content": "Что мы логируем?"
                },
                {
                    "type": "list",
                    "items": [
                        "Параметры (Parameters): Настройки модели (число эпох, learning_rate). Логируются через mlflow.log_param().",
                        "Метрики (Metrics): Результаты обучения (Accuracy, MSE). Меняются со временем. Логируются через mlflow.log_metric().",
                        "Артефакты (Artifacts): Сама обученная модель (в виде .pkl или .pt файла), графики Loss. Логируются через mlflow.sklearn.log_model()."
                    ]
                },
                {
                    "type": "heading",
                    "content": "Как это выглядит в коде"
                },
                {
                    "type": "code",
                    "content": "import mlflow\n\n# Открываем \"Сессию\" записи эксперимента\nwith mlflow.start_run():\n    mlflow.log_param(\"learning_rate\", 0.01)\n    \n    # ... код обучения ...\n    \n    mlflow.log_metric(\"accuracy\", 0.96)\n    mlflow.sklearn.log_model(model, \"my_model\")"
                },
                {
                    "type": "text",
                    "content": "Зайдя в UI MLflow, вы увидите удобную таблицу, где можно отсортировать все 200 запусков по колонке Accuracy и в 1 клик скачать лучшую модель."
                }
            ]
        },
        "practice": {
            "title": "Практика",
            "description": "Лабораторный журнал Data Scientist'а\n        При поиске лучшей модели вы меняете learning_rate, меняете архитектуру, добавляете слои.",
            "task": "Вы проведете 200 экспериментов. Запоминать результаты в Excel — прошлый век.\n        MLflow Tracking — это сервер с красивым дашбордом, куда ваш Python-код автоматически отправляет результаты каждого запуска (Run).\n\n        Что мы логируем?\n        \n            Параметры (Parameters): Настройки модели (число эпох, learning_rate). Логируются через mlflow.log_param().\n            Метрики (Metrics): Результаты обучения (Accuracy, MSE). Меняются со временем. Логируются через mlflow.log_metric().\n            Артефакты (Artifacts): Сама обученная модель (в виде .pkl или .pt файла), графики Loss. Логируются через mlflow.sklearn.log_model().\n        \n\n        Как это выглядит в коде\n        import mlflow\n\n# Открываем \"Сессию\" записи эксперимента\nwith mlflow.start_run():\n    mlflow.log_param(\"learning_rate\", 0.01)\n    \n    # ... код обучения ...\n    \n    mlflow.log_metric(\"accuracy\", 0.96)\n    mlflow.sklearn.log_model(model, \"my_model\")\n        Зайдя в UI MLflow, вы увидите удобную таблицу, где можно отсортировать все 200 запусков по колонке Accuracy и в 1 клик скачать лучшую модель.",
            "starterCode": "import mlflow\nimport random\n\n# Представим, что мы перебираем параметры\nlr = 0.005\ndepth = 10\nacc = 0.88 + random.random() * 0.05\n\nprint(\"Запуск эксперимента...\")\n\n# 1. Откройте сессию: with mlflow.start_run():\n# Не забудьте сделать отступ (табуляцию) для кода внутри with!\n\n\n    # 2. Залогируйте параметры 'lr' и 'depth'\n    # Используйте mlflow.log_param(ключ, значение)\n    \n    \n    # 3. Залогируйте метрику 'accuracy' (значение переменной acc)\n    # Используйте mlflow.log_metric(...)\n    \n    \n    print(\"Эксперимент успешно записан в MLflow!\")"
        },
        "type": "python"
    },
    {
        "id": "lesson-4",
        "title": "Реестр моделей (MLflow Model Registry)",
        "theory": {
            "sections": [
                {
                    "type": "heading",
                    "content": "Жизненный цикл модели"
                },
                {
                    "type": "text",
                    "content": "Вы нашли в MLflow лучшую модель (Run ID: 8a9f3...). Как теперь отдать её Backend-разработчику? Скидывать Run ID неудобно. Для этого в MLflow есть Реестр Моделей (Model Registry)."
                },
                {
                    "type": "text",
                    "content": "Реестр позволяет дать вашей модели человеческое имя (например, FraudDetectionModel) и управлять её версиями и стадиями (Stages)."
                },
                {
                    "type": "heading",
                    "content": "Стадии (Stages)"
                },
                {
                    "type": "text",
                    "content": "У каждой версии модели в реестре есть свой статус:"
                },
                {
                    "type": "list",
                    "items": [
                        "None: Модель только что добавлена (Версия 1).",
                        "Staging: Модель отправлена на тестовый сервер. QA-инженеры проверяют её.",
                        "Production: Модель проверена и работает на реальных пользователях!",
                        "Archived: Модель устарела и больше не используется."
                    ]
                },
                {
                    "type": "heading",
                    "content": "Как бэкенд забирает модель?"
                },
                {
                    "type": "text",
                    "content": "Backend-сервис при запуске не ищет файл model_v3.pkl. Он делает API-запрос к MLflow: \"Дай мне модель FraudDetectionModel, у которой стадия Production\". MLflow сам отдает нужный файл."
                },
                {
                    "type": "text",
                    "content": "Если модель в проде сломалась, Data Scientist заходит в UI MLflow, переводит Версию 2 в Archived, а Версию 1 возвращает в Production. Бэкенд автоматически скачивает Версию 1. Никакого деплоя кода не требуется!"
                }
            ]
        },
        "practice": {
            "title": "Практика",
            "description": "Жизненный цикл модели\n        Вы нашли в MLflow лучшую модель (Run ID: 8a9f3...).",
            "task": "Как теперь отдать её Backend-разработчику? Скидывать Run ID неудобно. Для этого в MLflow есть Реестр Моделей (Model Registry).\n        Реестр позволяет дать вашей модели человеческое имя (например, FraudDetectionModel) и управлять её версиями и стадиями (Stages).\n\n        Стадии (Stages)\n        У каждой версии модели в реестре есть свой статус:\n        \n            None: Модель только что добавлена (Версия 1).\n            Staging: Модель отправлена на тестовый сервер. QA-инженеры проверяют её.\n            Production: Модель проверена и работает на реальных пользователях!\n            Archived: Модель устарела и больше не используется.\n        \n\n        Как бэкенд забирает модель?\n        Backend-сервис при запуске не ищет файл model_v3.pkl. Он делает API-запрос к MLflow: \"Дай мне модель FraudDetectionModel, у которой стадия Production\". MLflow сам отдает нужный файл.\n        Если модель в проде сломалась, Data Scientist заходит в UI MLflow, переводит Версию 2 в Archived, а Версию 1 возвращает в Production. Бэкенд автоматически скачивает Версию 1. Никакого деплоя кода не требуется!",
            "starterCode": "import mlflow\nfrom mlflow.tracking import MlflowClient\n\nmodel_name = \"PricePredictor\"\nrun_uri = \"runs:/d12345a/model\"\n\nprint(f\"Регистрируем новую модель {model_name}...\")\n# 1. Зарегистрируйте модель из run_uri\n# Используйте: mlflow.register_model(model_uri=run_uri, name=model_name)\n\n\n# 2. Создадим клиент для управления стадиями\nclient = MlflowClient()\n\nprint(\"Переводим Версию 1 в Продакшен...\")\n# 3. Переведите модель в Production\n# Используйте: client.transition_model_version_stage(name=model_name, version=1, stage=\"Production\")"
        },
        "type": "python"
    },
    {
        "id": "lesson-5",
        "title": "Деплой модели: Model Serving (FastAPI)",
        "theory": {
            "sections": [
                {
                    "type": "heading",
                    "content": "Что такое Model Serving?"
                },
                {
                    "type": "text",
                    "content": "Модель обучена и лежит в MLflow. Но как мобильное приложение (например, iOS) или сайт спросят у неё предсказание? Нельзя просто внедрить Python-код модели в телефон. Нужен API-шлюз."
                },
                {
                    "type": "text",
                    "content": "Мы пишем небольшой веб-сервер, который загружает модель в оперативную память. Сервер принимает данные в формате JSON (через HTTP-запрос), прогоняет их через model.predict() и возвращает JSON с ответом. Этот процесс называется Serving (Обслуживание модели)."
                },
                {
                    "type": "heading",
                    "content": "Почему FastAPI?"
                },
                {
                    "type": "text",
                    "content": "Индустриальный стандарт для ML Serving — фреймворк FastAPI (заменил устаревший Flask). Его преимущества:"
                },
                {
                    "type": "list",
                    "items": [
                        "Асинхронность: Может держать тысячи соединений одновременно.",
                        "Pydantic: Автоматически проверяет, что пришел правильный JSON. Если модель ждет \"age\": 25, а пришло \"age\": \"двадцать\", FastAPI сам выдаст красивую ошибку, не сломав сервер.",
                        "Авто-документация: Сам генерирует Swagger UI страницу для тестирования API."
                    ]
                },
                {
                    "type": "code",
                    "content": "from fastapi import FastAPI\n\napp = FastAPI()\n\n# Маршрут (Endpoint) для предсказаний\n@app.post(\"/predict\")\ndef predict_api(data: dict):\n    result = my_model.predict([data[\"features\"]])\n    return {\"prediction\": result[0]}"
                }
            ]
        },
        "practice": {
            "title": "Практика",
            "description": "Что такое Model Serving?\n        Модель обучена и лежит в MLflow.",
            "task": "Но как мобильное приложение (например, iOS) или сайт спросят у неё предсказание? Нельзя просто внедрить Python-код модели в телефон. Нужен API-шлюз.\n        Мы пишем небольшой веб-сервер, который загружает модель в оперативную память. Сервер принимает данные в формате JSON (через HTTP-запрос), прогоняет их через model.predict() и возвращает JSON с ответом. Этот процесс называется Serving (Обслуживание модели).\n\n        Почему FastAPI?\n        Индустриальный стандарт для ML Serving — фреймворк FastAPI (заменил устаревший Flask). Его преимущества:\n        \n            Асинхронность: Может держать тысячи соединений одновременно.\n            Pydantic: Автоматически проверяет, что пришел правильный JSON. Если модель ждет \"age\": 25, а пришло \"age\": \"двадцать\", FastAPI сам выдаст красивую ошибку, не сломав сервер.\n            Авто-документация: Сам генерирует Swagger UI страницу для тестирования API.\n        \n        from fastapi import FastAPI\n\napp = FastAPI()\n\n# Маршрут (Endpoint) для предсказаний\n@app.post(\"/predict\")\ndef predict_api(data: dict):\n    result = my_model.predict([data[\"features\"]])\n    return {\"prediction\": result[0]}",
            "starterCode": "# Мы используем эмулятор FastAPI\nfrom fastapi import FastAPI, TestClient\n\n# Загружаем \"модель\" (Заглушка)\nclass MyModel:\n    def predict(self, x): return [sum(x) * 10]\nmodel = MyModel()\n\n# 1. Создайте приложение FastAPI\napp = \n\n# 2. Напишите декоратор для POST запроса на эндпоинт \"/predict\"\n# @app.post(\"/predict\")\n\n\n# 3. Напишите функцию обработки запроса def get_prediction(data: dict):\n# Внутри получите результат model.predict(data[\"features\"]) и верните словарь {\"result\": ...}\n\n\n\n\n\n# --- Тестирование нашего API ---\nclient = TestClient(app)\nresponse = client.post(\"/predict\", json={\"features\": [2, 3]})\nprint(\"Ответ сервера:\", response.json())"
        },
        "type": "python"
    },
    {
        "id": "lesson-6",
        "title": "Изоляция и CT (Docker & Continuous Training)",
        "theory": {
            "sections": [
                {
                    "type": "heading",
                    "content": "Проблема окружения"
                },
                {
                    "type": "text",
                    "content": "Ваш FastAPI сервер отлично работает на ноутбуке. Вы переносите код на сервер Ubuntu, и он падает. Причина: на сервере стоит Python 3.8 вместо 3.11, и другая версия PyTorch. Зависимости сломались."
                },
                {
                    "type": "heading",
                    "content": "Решение: Контейнеризация (Docker)"
                },
                {
                    "type": "text",
                    "content": "Docker решает проблему \"Работает на моем компе\". Он упаковывает ваш код (FastAPI), саму модель и все системные библиотеки (включая версию Linux) в один неизменяемый кирпичик — Контейнер."
                },
                {
                    "type": "text",
                    "content": "Вы пишете инструкцию Dockerfile. Docker собирает из нее Образ (Image). Этот образ гарантированно запустится абсолютно одинаково на любом сервере в мире."
                },
                {
                    "type": "heading",
                    "content": "Что такое CT (Continuous Training)?"
                },
                {
                    "type": "text",
                    "content": "В MLOps к классическим CI/CD добавляется буква CT (Непрерывное обучение)."
                },
                {
                    "type": "text",
                    "content": "Модели устаревают (Data Drift). Рекомендации товаров из 2022 года не сработают в 2024. Пайплайн CT делает следующее:"
                },
                {
                    "type": "list",
                    "items": [
                        "Каждую неделю робот берет свежие данные из базы (по DVC).",
                        "Автоматически запускает код обучения модели (записывая всё в MLflow).",
                        "Если новая модель на тестах лучше старой, робот сам переводит её в Production (в MLflow Registry).",
                        "CI/CD пайплайн видит новую Production модель, пересобирает Docker-контейнер с FastAPI и деплоит его в облако (например, в Kubernetes)."
                    ]
                },
                {
                    "type": "text",
                    "content": "Весь цикл происходит без участия дата-саентиста!"
                }
            ]
        },
        "practice": {
            "title": "Практика",
            "description": "Проблема окружения\n        Ваш FastAPI сервер отлично работает на ноутбуке.",
            "task": "Вы переносите код на сервер Ubuntu, и он падает. Причина: на сервере стоит Python 3.8 вместо 3.11, и другая версия PyTorch. Зависимости сломались.\n\n        Решение: Контейнеризация (Docker)\n        Docker решает проблему \"Работает на моем компе\". Он упаковывает ваш код (FastAPI), саму модель и все системные библиотеки (включая версию Linux) в один неизменяемый кирпичик — Контейнер.\n        Вы пишете инструкцию Dockerfile. Docker собирает из нее Образ (Image). Этот образ гарантированно запустится абсолютно одинаково на любом сервере в мире.\n\n        Что такое CT (Continuous Training)?\n        В MLOps к классическим CI/CD добавляется буква CT (Непрерывное обучение).\n        Модели устаревают (Data Drift). Рекомендации товаров из 2022 года не сработают в 2024. Пайплайн CT делает следующее:\n        \n            Каждую неделю робот берет свежие данные из базы (по DVC).\n            Автоматически запускает код обучения модели (записывая всё в MLflow).\n            Если новая модель на тестах лучше старой, робот сам переводит её в Production (в MLflow Registry).\n            CI/CD пайплайн видит новую Production модель, пересобирает Docker-контейнер с FastAPI и деплоит его в облако (например, в Kubernetes).\n        \n        Весь цикл происходит без участия дата-саентиста!",
            "starterCode": "# Мы не можем запустить настоящий Docker в браузере, \n# но мы можем написать Dockerfile генератор!\n\n# Опишем Dockerfile для нашего FastAPI приложения\ndockerfile_content = \"\"\"\n# 1. Используем базовый образ Python 3.10\nFROM python:3.10-slim\n\n# 2. Задаем рабочую папку внутри контейнера\nWORKDIR /app\n\n# 3. Копируем файл зависимостей\nCOPY requirements.txt .\n\n# 4. Устанавливаем библиотеки (fastapi, uvicorn, mlflow, scikit-learn)\nRUN pip install -r requirements.txt\n\n# 5. Копируем весь наш код (app.py) внутрь контейнера\nCOPY . .\n\n# 6. Команда запуска сервера (uvicorn)\nCMD [\"uvicorn\", \"app:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]\n\"\"\"\n\nprint(\"--- Сгенерированный Dockerfile ---\")\nprint(dockerfile_content)\nprint(\"--- Готово к деплою в Kubernetes! ---\")"
        },
        "type": "python"
    }
] 
  }
};
