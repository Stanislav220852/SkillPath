export const mlState: Record<'EN' | 'RU', any> = {
  EN: {
    title: "Machine Learning (PRO)",
    description: "Sklearn, feature engineering, and predictive models. The core of classical Data Science.",
    lessons: [
      {
        id: "ml-sklearn-api",
        title: "The Scikit-Learn API & Train/Test Split",
        theory: {
          sections: [
            { type: "heading", content: "The Golden Standard of ML" },
            { type: "text", content: "Scikit-Learn (sklearn) is the most popular library for classical machine learning. Its greatest achievement is a unified, elegant API. Whether you are using a simple Linear Regression or a complex Random Forest, the workflow is exactly the same:" },
            { type: "list", items: [
              "1. Initialize: model = RandomForestClassifier()",
              "2. Train: model.fit(X_train, y_train)",
              "3. Predict: predictions = model.predict(X_test)"
            ]},
            { type: "heading", content: "Data Leakage and Splitting" },
            { type: "text", content: "If you test a model on the exact same data it was trained on, it will get a perfect score by simply memorizing the answers (Overfitting). To test its real-world performance, we must hide a portion of the data (Test Set) and evaluate the model on it later." },
            { type: "code", content: "from sklearn.model_selection import train_test_split\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)" },
            { type: "tip", content: "Resource: 'Hands-on Machine Learning' by Aurélien Géron. Chapter 2 of this book is the absolute bible for beginners. It walks you through an end-to-end ML project, teaching you how to properly set up a test set before you even look at the data." }
          ]
        },
        practice: {
          title: "Split the Dataset",
          description: "Use train_test_split to separate train and test data.",
          task: "We have an array of features X and targets y. Use train_test_split to reserve 25% of the data for testing (test_size=0.25). Set random_state=42 for reproducibility.",
          starterCode: "from sklearn.model_selection import train_test_split\n\nX = [[1], [2], [3], [4], [5], [6], [7], [8]]\ny = [0, 0, 0, 0, 1, 1, 1, 1]\n\n# Split the data\nX_train, X_test, y_train, y_test = \n\nprint(f\"Total items: {len(X)}\")\nprint(f\"Training items: {len(X_train)}\")\nprint(f\"Testing items: {len(X_test)}\")"
        },
        type: "python"
      },
      {
        id: "ml-feature-engineering",
        title: "Feature Engineering & Scaling",
        theory: {
          sections: [
            { type: "heading", content: "Garbage In, Garbage Out" },
            { type: "text", content: "Models only understand numbers. If your dataset has a 'City' column (London, Paris), the model will crash. We need to convert categories into numbers using One-Hot Encoding (e.g., creating separate Is_London and Is_Paris columns with 0s and 1s)." },
            { type: "heading", content: "Feature Scaling" },
            { type: "text", content: "Imagine predicting a house price based on 'Number of Rooms' (1 to 5) and 'Area in sq. ft' (500 to 5000). The model will assume 'Area' is a thousand times more important simply because the numbers are bigger! We must scale them." },
            { type: "list", items: [
              "StandardScaler: Centers the data around 0 with a standard deviation of 1 (Z-score normalization).",
              "MinMaxScaler: Squashes all values into a strictly [0, 1] range."
            ]},
            { type: "code", content: "from sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()\n# We only FIT on the training data to prevent data leakage from the test set!\nX_train_scaled = scaler.fit_transform(X_train)\nX_test_scaled = scaler.transform(X_test)" },
            { type: "tip", content: "Resource: Kaggle ML Micro-courses. Kaggle has a brilliant, short, and free course called 'Feature Engineering'. It teaches you how to create powerful new features (e.g., combining 'Siblings' + 'Parents' into 'FamilySize')." }
          ]
        },
        practice: {
          title: "Scale the Features",
          description: "Apply StandardScaler to prevent feature dominance.",
          task: "Initialize a StandardScaler. Use the .fit_transform() method to scale the X_train dataset. Print the result. Notice how the large differences in numbers have been normalized.",
          starterCode: "from sklearn.preprocessing import StandardScaler\nimport numpy as np\n\n# Dataset: [Rooms, Area]\nX_train = np.array([\n    [1, 500],\n    [3, 1500],\n    [5, 3000]\n])\n\n# 1. Initialize the scaler\nscaler = \n\n# 2. Fit and transform the data\nX_scaled = \n\nprint(\"Original data:\\n\", X_train)\nprint(\"Scaled data:\\n\", X_scaled)"
        },
        type: "python"
      },
      {
        id: "ml-logistic-regression",
        title: "Classification: Logistic Regression",
        theory: {
          sections: [
            { type: "heading", content: "Regression vs Classification" },
            { type: "text", content: "If you want to predict a continuous number (e.g., 'House price is $150k'), you use Regression. If you want to predict a category (e.g., 'Is this email Spam or Not Spam?'), you use Classification." },
            { type: "heading", content: "Logistic Regression" },
            { type: "text", content: "Despite the word 'regression' in its name, Logistic Regression is the baseline algorithm for Classification. It calculates a linear formula (just like linear regression) but passes the result through a Sigmoid function." },
            { type: "text", content: "The Sigmoid function squashes any number into a range between 0 and 1, effectively turning the output into a Probability. If the probability > 0.5, the model predicts Class 1. Otherwise, it predicts Class 0." },
            { type: "code", content: "from sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score\n\nmodel = LogisticRegression()\nmodel.fit(X_train, y_train)\npreds = model.predict(X_test)\nprint('Accuracy:', accuracy_score(y_test, preds))" }
          ]
        },
        practice: {
          title: "Train a Classifier",
          description: "Fit a Logistic Regression model and score it.",
          task: "Create a LogisticRegression model. Fit it using X_train and y_train. Then, generate predictions for X_test and calculate the accuracy_score.",
          starterCode: "from sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score\n\nX_train = [[1], [2], [8], [9]]\ny_train = [0, 0, 1, 1]\nX_test = [[3], [7]]\ny_test = [0, 1]\n\n# 1. Init and Fit\nmodel = \n\n\n# 2. Predict on X_test\npredictions = \n\n# 3. Calculate Accuracy\nacc = \nprint(f\"Accuracy: {acc * 100}%\")"
        },
        type: "python"
      },
      {
        id: "ml-random-forest",
        title: "Ensembles: Random Forest",
        theory: {
          sections: [
            { type: "heading", content: "The problem with Decision Trees" },
            { type: "text", content: "A Decision Tree acts like a game of 'Akinator', asking Yes/No questions (e.g., 'Is Age > 30?'). They can model complex non-linear relationships. However, a single deep tree tends to memorize the training data (Overfitting) and fails on new data." },
            { type: "heading", content: "The Power of the Crowd (Ensembles)" },
            { type: "text", content: "Instead of relying on one super-smart tree, what if we train 100 'dumb' trees, each on a random subset of the data and a random subset of features? When making a prediction, we let all 100 trees VOTE. The majority wins." },
            { type: "text", content: "This algorithm is called Random Forest. It is incredibly robust, barely overfits, and works amazingly well 'out of the box' for tabular data without requiring massive hyperparameter tuning." },
            { type: "tip", content: "Resource: fast.ai. Jeremy Howard's 'Practical Deep Learning for Coders' actually starts its tabular data section by teaching Random Forests. He emphasizes that you don't always need complex Deep Learning; Ensembles often win Kaggle competitions on structured data." }
          ]
        },
        practice: {
          title: "Plant a Random Forest",
          description: "Train a RandomForestClassifier.",
          task: "Initialize a RandomForestClassifier with n_estimators=50 (50 trees). Fit it on the training data and print the predictions for the test data.",
          starterCode: "from sklearn.ensemble import RandomForestClassifier\n\n# Non-linear data (XOR-like pattern)\nX_train = [[0, 0], [1, 1], [1, 0], [0, 1]]\ny_train = [0, 0, 1, 1]\nX_test = [[1, 0], [0, 0]]\n\n# Initialize with 50 trees\nrf_model = \n\n# Fit the model\n\n\n# Predict and print\npreds = \nprint(\"Predictions:\", preds)"
        },
        type: "python"
      },
      {
        id: "ml-evaluation-metrics",
        title: "Model Evaluation: Precision & Recall",
        theory: {
          sections: [
            { type: "heading", content: "Why Accuracy is a Lie" },
            { type: "text", content: "Imagine an imbalanced dataset of 100 patients, where 99 are healthy and 1 has a rare disease. A 'lazy' model that simply predicts 'Healthy' for everyone will achieve 99% Accuracy! But it completely failed its goal of finding the sick patient." },
            { type: "heading", content: "The Confusion Matrix" },
            { type: "text", content: "To understand the real performance, we break predictions into 4 categories: True Positives (TP), True Negatives (TN), False Positives (FP - False Alarm), and False Negatives (FN - Missed case)." },
            { type: "list", items: [
              "Precision: Out of all the patients the model flagged as 'Sick', how many were actually sick? (TP / (TP + FP)). High precision means no false alarms.",
              "Recall (Sensitivity): Out of all the truly sick patients in the dataset, how many did the model manage to find? (TP / (TP + FN)). High recall means no missed cases."
            ]},
            { type: "text", content: "In cancer detection, we want high Recall (it's better to false-alarm than to send a sick patient home). In spam filtering, we want high Precision (we'd rather let a spam email through than block an important work email)." }
          ]
        },
        practice: {
          title: "Precision and Recall",
          description: "Calculate advanced metrics using sklearn.",
          task: "We have true labels and model predictions. The model correctly found the 1 sick patient, but falsely alarmed on a healthy one. Use precision_score and recall_score from sklearn.metrics to calculate the metrics.",
          starterCode: "from sklearn.metrics import precision_score, recall_score\n\n# 0 = Healthy, 1 = Sick\ny_true = [0, 0, 0, 0, 1]   # Only 1 sick patient\ny_pred = [0, 0, 0, 1, 1]   # Model found the sick one, but false-alarmed on another\n\n# Calculate Precision and Recall\nprecision = \nrecall = \n\nprint(f\"Precision: {precision}\")\nprint(f\"Recall: {recall}\")"
        },
        type: "python"
      }
    ]
  },
  RU: {
    title: "Машинное Обучение (PRO)",
    description: "Библиотека Sklearn, инженерия признаков и предсказательные модели. Ядро классического Data Science.",
    lessons: [
      {
        id: "ml-sklearn-api",
        title: "API Scikit-Learn и Train/Test Split",
        theory: {
          sections: [
            { type: "heading", content: "Золотой стандарт ML" },
            { type: "text", content: "Scikit-Learn (sklearn) — это самая популярная библиотека для классического машинного обучения. Её главное достижение — единый и элегантный API. Независимо от того, используете ли вы простую Линейную Регрессию или сложный Случайный Лес, алгоритм действий всегда один:" },
            { type: "list", items: [
              "1. Инициализация: model = RandomForestClassifier()",
              "2. Обучение: model.fit(X_train, y_train)",
              "3. Предсказание: predictions = model.predict(X_test)"
            ]},
            { type: "heading", content: "Утечка данных и Разделение" },
            { type: "text", content: "Если вы проверите модель на тех же данных, на которых она училась, она получит идеальный балл, просто вызубрив ответы наизусть (Переобучение / Overfitting). Чтобы проверить реальную работу модели, мы обязаны скрыть часть данных (Test Set) и показать их модели только в самом конце." },
            { type: "code", content: "from sklearn.model_selection import train_test_split\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)" },
            { type: "tip", content: "Ресурс: 'Hands-on Machine Learning' (Орельен Жерон). Вторая глава этой книги — абсолютная библия для новичков. Она проводит вас через полноценный ML-проект от начала до конца, объясняя, почему нужно 'отложить' тестовую выборку до того, как вы вообще посмотрите на данные." }
          ]
        },
        practice: {
          title: "Разделение датасета",
          description: "Используйте train_test_split для создания тренировочной и тестовой выборки.",
          task: "У нас есть массив признаков X и ответов y. Используйте функцию train_test_split, чтобы зарезервировать 25% данных для теста (test_size=0.25). Установите random_state=42 для воспроизводимости.",
          starterCode: "from sklearn.model_selection import train_test_split\n\nX = [[1], [2], [3], [4], [5], [6], [7], [8]]\ny = [0, 0, 0, 0, 1, 1, 1, 1]\n\n# Разделите данные\nX_train, X_test, y_train, y_test = \n\nprint(f\"Всего объектов: {len(X)}\")\nprint(f\"Обучающая выборка (Train): {len(X_train)}\")\nprint(f\"Тестовая выборка (Test): {len(X_test)}\")"
        },
        type: "python"
      },
      {
        id: "ml-feature-engineering",
        title: "Feature Engineering и Масштабирование",
        theory: {
          sections: [
            { type: "heading", content: "Мусор на входе — мусор на выходе" },
            { type: "text", content: "Модели понимают только числа. Если в датасете есть колонка 'Город' (London, Paris), модель упадет с ошибкой. Нам нужно превратить категории в числа с помощью One-Hot Encoding (создать отдельные колонки Is_London, Is_Paris с 0 и 1)." },
            { type: "heading", content: "Масштабирование признаков (Scaling)" },
            { type: "text", content: "Представьте, что мы предсказываем цену квартиры на основе 'Кол-ва комнат' (от 1 до 5) и 'Площади в кв. футах' (от 500 до 5000). Модель решит, что Площадь в 1000 раз важнее, просто потому что цифры больше! Нам нужно привести их к единому масштабу." },
            { type: "list", items: [
              "StandardScaler: Центрирует данные вокруг нуля со стандартным отклонением 1 (Z-score нормализация).",
              "MinMaxScaler: Сжимает все значения строго в диапазон [0, 1]."
            ]},
            { type: "code", content: "from sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()\n# Мы вызываем FIT ТОЛЬКО на тренировочной выборке, чтобы избежать утечки данных!\nX_train_scaled = scaler.fit_transform(X_train)\nX_test_scaled = scaler.transform(X_test)" },
            { type: "tip", content: "Ресурс: Kaggle ML Micro-courses. На Kaggle есть блестящий, бесплатный мини-курс 'Feature Engineering'. Там учат создавать мощные новые признаки (например, объединяя 'Братьев' + 'Родителей' в один сильный признак 'Размер Семьи')." }
          ]
        },
        practice: {
          title: "Масштабирование данных",
          description: "Примените StandardScaler для устранения доминирования признаков.",
          task: "Инициализируйте StandardScaler. Используйте метод .fit_transform(), чтобы отмасштабировать датасет X_train. Обратите внимание, как нормализуется огромная разница между колонками.",
          starterCode: "from sklearn.preprocessing import StandardScaler\nimport numpy as np\n\n# Датасет: [Комнаты, Площадь]\nX_train = np.array([\n    [1, 500],\n    [3, 1500],\n    [5, 3000]\n])\n\n# 1. Инициализируйте scaler\nscaler = \n\n# 2. Вызовите fit_transform\nX_scaled = \n\nprint(\"Оригинальные данные:\\n\", X_train)\nprint(\"Отмасштабированные данные:\\n\", X_scaled)"
        },
        type: "python"
      },
      {
        id: "ml-logistic-regression",
        title: "Классификация: Логистическая Регрессия",
        theory: {
          sections: [
            { type: "heading", content: "Регрессия против Классификации" },
            { type: "text", content: "Если вы предсказываете непрерывное число (например, 'Цена дома 150 000$'), это Регрессия. Если вы предсказываете категорию ('Это письмо Спам или Не Спам?'), это Классификация." },
            { type: "heading", content: "Логистическая Регрессия" },
            { type: "text", content: "Несмотря на слово 'регрессия' в названии, Логистическая регрессия — это базовый алгоритм для Классификации. Он вычисляет линейную формулу (как обычная регрессия), но пропускает результат через функцию Сигмоиды." },
            { type: "text", content: "Сигмоида сжимает любое число в диапазон от 0 до 1, превращая его в Вероятность. Если вероятность > 0.5, модель предсказывает Класс 1. Иначе — Класс 0." },
            { type: "code", content: "from sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score\n\nmodel = LogisticRegression()\nmodel.fit(X_train, y_train)\npreds = model.predict(X_test)\nprint('Точность:', accuracy_score(y_test, preds))" }
          ]
        },
        practice: {
          title: "Обучение классификатора",
          description: "Обучите модель логистической регрессии.",
          task: "Создайте модель LogisticRegression. Обучите её (fit) на X_train и y_train. Затем сделайте предсказания для X_test и вычислите метрику accuracy_score.",
          starterCode: "from sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score\n\nX_train = [[1], [2], [8], [9]]\ny_train = [0, 0, 1, 1]\nX_test = [[3], [7]]\ny_test = [0, 1]\n\n# 1. Инициализация и Обучение\nmodel = \n\n\n# 2. Предсказание на X_test\npredictions = \n\n# 3. Вычисление Accuracy\nacc = \nprint(f\"Точность (Accuracy): {acc * 100}%\")"
        },
        type: "python"
      },
      {
        id: "ml-random-forest",
        title: "Ансамбли: Случайный Лес (Random Forest)",
        theory: {
          sections: [
            { type: "heading", content: "Проблема Деревьев Решений" },
            { type: "text", content: "Дерево решений работает как игра 'Акинатор', задавая вопросы Да/Нет (Например, 'Возраст > 30?'). Они отлично находят нелинейные связи. Однако одиночное глубокое дерево склонно зазубривать тренировочные данные (Переобучение/Overfitting) и плохо работает на новых данных." },
            { type: "heading", content: "Сила Толпы (Ансамбли)" },
            { type: "text", content: "Вместо того чтобы растить одно супер-умное дерево, что если мы вырастим 100 'глупеньких' деревьев? Каждое дерево учится на случайном подмножестве данных и случайном подмножестве признаков. Когда нужно сделать предсказание, все 100 деревьев ГОЛОСУЮТ. Большинство побеждает." },
            { type: "text", content: "Этот алгоритм называется Случайный Лес (Random Forest). Он невероятно надежен, почти не переобучается и работает 'из коробки' на табличных данных без долгой настройки параметров." },
            { type: "tip", content: "Ресурс: fast.ai. Джереми Ховард в своем курсе 'Practical Deep Learning for Coders' начинает блок табличных данных именно с изучения Случайного Леса. Он подчеркивает, что вам не всегда нужны сложные Нейросети; Ансамбли часто выигрывают соревнования на Kaggle для классических данных." }
          ]
        },
        practice: {
          title: "Посадите Случайный Лес",
          description: "Обучите RandomForestClassifier.",
          task: "Инициализируйте RandomForestClassifier со 100 деревьями (n_estimators=100). Обучите его на тренировочных данных и выведите предсказания для тестового набора.",
          starterCode: "from sklearn.ensemble import RandomForestClassifier\n\n# Нелинейные данные (паттерн XOR)\nX_train = [[0, 0], [1, 1], [1, 0], [0, 1]]\ny_train = [0, 0, 1, 1]\nX_test = [[1, 0], [0, 0]]\n\n# Инициализируем 100 деревьев\nrf_model = \n\n# Обучаем (Fit)\n\n\n# Предсказываем (Predict)\npreds = \nprint(\"Предсказания:\", preds)"
        },
        type: "python"
      },
      {
        id: "ml-evaluation-metrics",
        title: "Оценка качества: Precision & Recall",
        theory: {
          sections: [
            { type: "heading", content: "Почему Accuracy (Точность) лжет" },
            { type: "text", content: "Представьте несбалансированный датасет из 100 пациентов, где 99 здоровы, а 1 болен редкой болезнью. 'Ленивая' модель, которая просто всем говорит 'Здоров', получит Accuracy 99%! Но она полностью провалила свою задачу — найти больного." },
            { type: "heading", content: "Матрица Ошибок (Confusion Matrix)" },
            { type: "text", content: "Чтобы понять реальную работу модели, предсказания делят на 4 группы: True Positives (Истинно Положительные), True Negatives (Истинно Отрицательные), False Positives (Ложная тревога) и False Negatives (Пропущенный больной)." },
            { type: "list", items: [
              "Точность (Precision): Из всех пациентов, которых модель назвала 'Больными', сколько реально были больны? Высокий Precision = нет ложных тревог.",
              "Полнота (Recall): Из всех реально больных пациентов в датасете, скольких модель смогла найти? Высокий Recall = мы не упустили ни одного больного."
            ]},
            { type: "text", content: "В диагностике рака нам важен высокий Recall (лучше ложная тревога, чем отправить больного домой). В спам-фильтрах важен высокий Precision (лучше пропустить спам в инбокс, чем отправить важное рабочее письмо в корзину)." }
          ]
        },
        practice: {
          title: "Precision и Recall",
          description: "Вычислите продвинутые метрики через sklearn.",
          task: "У нас есть реальные ответы и предсказания модели. Модель успешно нашла 1 больного пациента, но выдала ложную тревогу на здоровом. Используйте precision_score и recall_score из sklearn.metrics для вычисления метрик.",
          starterCode: "from sklearn.metrics import precision_score, recall_score\n\n# 0 = Здоров, 1 = Болен\ny_true = [0, 0, 0, 0, 1]   # Только 1 реально больной\ny_pred = [0, 0, 0, 1, 1]   # Модель нашла больного, но дала 1 ложную тревогу\n\n# Вычислите Precision и Recall\nprecision = \nrecall = \n\nprint(f\"Точность (Precision): {precision}\")\nprint(f\"Полнота (Recall): {recall}\")"
        },
        type: "python"
      }
    ]
  }
};