export const mathLessons: Record<'EN' | 'RU', any> = {
  EN: {
    title: "Math for ML",
    description: "The math behind machine learning — vectors, dot product, matrices, derivatives, gradient descent and statistics, with Python practice.",
    lessons: [
      // ============= LESSON 1 =============
      {
        id: "math-vectors",
        title: "Vectors, Scalars and Spaces",
        theory: {
          sections: [
            { type: "heading", content: "Math — the language of machines" },
            { type: "text", content: 'Machine learning works exclusively with numbers. A computer doesn\'t understand "a picture of a cat" or "the text of a review". It only understands arrays of numbers. Linear algebra is the science of how to manage these arrays.' },
            { type: "list", items: [
              "Scalar — a single number (0D). It has only magnitude. E.g. 5, 3.14. The temperature outside is a scalar.",
              "Vector — a one-dimensional (1D) ordered list of scalars. A vector has length (number of elements) and direction (geometrically)."
            ]},
            { type: "heading", content: "Feature Vector" },
            { type: "text", content: "In ML each row of your dataset becomes a vector. Imagine we predict apartment price. The apartment has 3 features: area (120 m²), number of rooms (3), age of the building (15 years). To the network this apartment is a point in 3D space:" },
            { type: "code", content: "x = [120, 3, 15]" },
            { type: "text", content: "Each number in the vector is called a dimension. If we analyze text (e.g. Word2Vec), one word can be a vector of 300 dimensions! The human brain can't picture 300D space, but math works there just as easily as in 2D." },
            { type: "heading", content: "Vector operations" },
            { type: "text", content: "Addition: vectors are added element-wise. If A = [1, 2] and B = [3, 4], their sum is [1+3, 2+4] = [4, 6]." },
            { type: "text", content: 'Scalar multiplication (Broadcasting): multiplying a vector by a number (e.g. 2) multiplies EACH element: 2 * [1, 2, 3] = [2, 4, 6]. Geometrically we just "stretched" the arrow twice without changing direction.' }
          ]
        },
        practice: {
          title: "Vector subtraction and scaling",
          description: "Use lists as vectors in Python.",
          task: "Find the 'difference' between two apartments (vector subtraction) using a for loop with range(len(...)). Bonus: multiply a vector by a scalar (double all params of house 2).",
          starterCode: "# In ML we often use lists as vectors\nhouse_1 = [120, 3, 15] # Apartment 1\nhouse_2 = [80, 2, 5]   # Apartment 2\n\n# Task: find the 'difference' between these apartments (vector subtraction)\ndifference = []\n\n# Use a for loop with range(len(house_1))\n# to subtract house_2 elements from house_1\nfor i in range(len(house_1)):\n    # Your code:\n\n\nprint(\"Difference in apartment params:\", difference)\n\n# Bonus: scalar multiplication (double all params of house 2)\nscaled_house_2 = []\n# Write the multiplication loop:"
        },
        type: "python"
      },
      // ============= LESSON 2 =============
      {
        id: "math-dot",
        title: "Dot Product",
        theory: {
          sections: [
            { type: "heading", content: "The heart of Artificial Intelligence" },
            { type: "text", content: "The Dot Product is the most frequently performed operation in all of machine learning. Your GPU does billions of these per second when generating text in ChatGPT." },
            { type: "text", content: "The dot product takes two vectors of equal length, multiplies their elements pairwise, and sums everything into a single number (a scalar)." },
            { type: "code", content: "A · B = a1*b1 + a2*b2 + ... + an*bn" },
            { type: "heading", content: "Use 1: The artificial neuron" },
            { type: "text", content: "A neuron receives input data (vector X). Inside it has 'Weights' (vector W) — the 'importance' of each input. The neuron does a simple thing: computes the dot product of X and W!" },
            { type: "text", content: "Example: apartment X = [100 m², 2 rooms]. Model weights W = [$1000 per meter, $5000 per room]. Neuron's internal state: 100 * 1000 + 2 * 5000 = $110,000." },
            { type: "text", content: "Usually a Bias is added to the result so the network can 'shift' its predictions. The full neuron formula:" },
            { type: "code", content: "z = (X · W) + Bias" },
            { type: "heading", content: "Use 2: Cosine similarity (NLP)" },
            { type: "text", content: "In text analysis (and recommender systems) the dot product helps measure how similar two objects are. If the normalized vectors of two users point the same way in multidimensional space (dot product close to 1), they have the same tastes and can be recommended the same movies!" }
          ]
        },
        practice: {
          title: "Compute a neuron output",
          description: "Dot product plus bias.",
          task: "1. Compute the dot product (X dot W) with a loop. 2. Add the bias to the result. Note: age and distance have negative weights (they reduce the price!).",
          starterCode: "# Input data (area, age, distance from metro)\nX = [50, 10, 5]\n\n# Neuron weights (how important each parameter is for the price)\n# Note: age and distance have negative weights (they reduce the price!)\nW = [2.5, -0.5, -1.2]\n\n# Bias (base cost)\nbias = 10.0\n\n# 1. Compute the dot product (X dot W)\ndot_product = 0\n# Write a loop for pairwise multiply and sum...\n\n\n# 2. Add bias to the result\noutput = dot_product + bias\n\nprint(\"Dot product (sum of weighted features):\", dot_product)\nprint(\"Final neuron output:\", output)"
        },
        type: "python"
      },
      // ============= LESSON 3 =============
      {
        id: "math-matrices",
        title: "Matrices and Tensors",
        theory: {
          sections: [
            { type: "heading", content: "From vectors to matrices (2D)" },
            { type: "text", content: "If a vector is a list of numbers (1D), a Matrix is a table of numbers (2D) made of rows and columns. In Python (before libraries like NumPy) matrices are lists inside lists." },
            { type: "code", content: "matrix = [\n    [1, 2, 3], # Row 0\n    [4, 5, 6]  # Row 1\n]" },
            { type: "text", content: "Matrices solve scale. Instead of pushing data through the network one person (vector) at a time, we glue 32 people into one matrix (a Batch). GPUs love matrices — they multiply them thousands of times faster than looping over vectors." },
            { type: "heading", content: "Tensors (N-Dimensional Arrays)" },
            { type: "text", content: "A tensor generalizes matrices to any number of dimensions:" },
            { type: "list", items: [
              "0D Tensor: scalar (5)",
              "1D Tensor: vector ([1, 2])",
              "2D Tensor: matrix (an Excel table, a dataset)",
              "3D Tensor: a color image. It has Height, Width and 3 color channels (RGB). Shape: (3, 256, 256).",
              "4D Tensor: a batch of several color images. Shape: (32, 3, 256, 256) — 32 images in the batch."
            ]},
            { type: "text", content: "PyTorch and TensorFlow are named this way exactly because tensors 'flow' inside them." }
          ]
        },
        practice: {
          title: "Index a matrix",
          description: "Extract rows, cells and a whole column.",
          task: "1. Extract and print the first row (user 0). 2. Extract a specific cell: age (third column) of user 1 — dataset[row][col]. 3. Collect a column (all weights, index 1) into one vector with a loop.",
          starterCode: "# A 3x3 matrix (3 rows, 3 columns)\n# A batch of 3 users, each with 3 features\ndataset = [\n    [180, 75, 25],  # User 0\n    [165, 60, 30],  # User 1\n    [190, 90, 22]   # User 2\n]\n\n# 1. Extract and print the first row (user 0)\nuser_0 = \nprint(\"User 0:\", user_0)\n\n# 2. Extract a specific cell: age (third column) of user 1\n# Hint: dataset[row][column]\nage_1 = \nprint(\"Age of user 1 (should be 30):\", age_1)\n\n# 3. Transpose: collect only weights (column index 1) of all users\nweights = []\nfor row in dataset:\n    # Append row[1] to the weights list\n    pass\n\nprint(\"Vector of all weights:\", weights)"
        },
        type: "python"
      },
      // ============= LESSON 4 =============
      {
        id: "math-derivative",
        title: "Calculus Basics: The Derivative",
        theory: {
          sections: [
            { type: "heading", content: "What is a Derivative?" },
            { type: "text", content: 'Machine learning is impossible without calculus. The derivative shows the rate and direction of change of a function at a specific point. It answers: "How much will the output (Y) change if I change the input (X) by a tiny step?"' },
            { type: "text", content: "Geometrically the derivative is the slope (tangent of the angle) of the tangent line to the function's graph." },
            { type: "heading", content: "Why networks need it (Loss Function)" },
            { type: "text", content: "During training a network inevitably makes mistakes. We measure this error with a Loss Function. The error depends on the network's weights: Loss(W)." },
            { type: 'text', content: 'Our goal is to drive the error (Loss) to zero (find the function\'s minimum). By computing the derivative of the error function w.r.t. the weights, we learn: "If I increase weight W a bit, will the error grow or shrink?".' },
            { type: "list", items: [
              "If the derivative is positive — the function grows. So the weight should be decreased.",
              "If the derivative is negative — the function falls. So the weight should be increased."
            ]},
            { type: "heading", content: "Numerical Approximation" },
            { type: "text", content: "A computer can approximate the derivative of any function without knowing calculus rules! We just shift x by a microscopic step h (e.g. 0.0001) and look at the delta of the result:" },
            { type: "code", content: "f'(x) ≈ ( f(x + h) - f(x) ) / h" },
            { type: "text", content: "Real networks (Backpropagation) use analytical (exact) derivatives and the Chain Rule, but the idea stays the same." }
          ]
        },
        practice: {
          title: "Numerical derivative",
          description: "Approximate the derivative of w².",
          task: "Compute the numerical derivative (gradient) of Loss(w) = w² at point w using the formula ( f(w + h) - f(w) ) / h. The exact answer for w=3 should be 6.0 — see how close the approximation gets!",
          starterCode: "# Suppose our error function: Loss(w) = w^2 (a parabola)\ndef loss_function(w):\n    return w ** 2\n\n# Current model weight\nw = 3.0\n# A very small shift\nh = 0.0001\n\n# 1. Compute the numerical derivative (gradient) at point w\n# Formula: ( loss_function(w + h) - loss_function(w) ) / h\nderivative = \n\nprint(f\"Approximate derivative at w={w} is: {derivative:.4f}\")\n\n# Calculus says: the derivative of x^2 is 2*x.\n# So for w=3 the answer should be exactly 6.0.\n# See how well the numerical approximation worked!"
        },
        type: "python"
      },
      // ============= LESSON 5 =============
      {
        id: "math-gradient",
        title: "Gradient Descent",
        theory: {
          sections: [
            { type: "heading", content: "The main ML algorithm" },
            { type: "text", content: "The Gradient is a vector of partial derivatives for ALL the millions of weights of your network. It has an amazing property: it always points in the direction of the steepest GROWTH of the function." },
            { type: "text", content: "But we need to decrease the error. So to train the model, we take the gradient, put a minus in front of it (move the opposite way) and update our weights! That's the Gradient Descent algorithm." },
            { type: "text", content: "Imagine standing on a hill with your eyes closed, wanting to go down into a valley. You feel the slope of the ground with your foot (compute the gradient) and step downward." },
            { type: "heading", content: "Learning Rate" },
            { type: "text", content: "We can't just subtract the gradient from the weights. We need a multiplier — the Learning Rate (LR, alpha). It defines the size of our 'step'." },
            { type: "code", content: "W_new = W_old - (LR * Gradient)" },
            { type: "list", items: [
              "Too big LR: you take giant steps and jump over the valley onto the other slope. The algorithm explodes (Divergence).",
              "Too small LR: you take ant-sized steps. Training takes 5 years instead of 2 hours."
            ]},
            { type: "text", content: "Choosing the LR is the engineer's main task. Modern optimizers (e.g. Adam) can pick this step automatically for each weight on the fly!" }
          ]
        },
        practice: {
          title: "Train one weight",
          description: "Run gradient descent for 5 epochs.",
          task: "Make a gradient descent step: weight = weight - (learning_rate * gradient). The gradient of w² is 2*w. Watch the weight tend to 0 and the error drop rapidly.",
          starterCode: "# Imagine we train one weight\nweight = 5.0\n\n# Our learning step (Learning Rate)\nlearning_rate = 0.1\n\n# Simulate 5 epochs (steps) of training\nfor epoch in range(1, 6):\n    # The derivative of w^2 is 2*w\n    # Compute the exact gradient for the current weight\n    gradient = 2 * weight\n\n    # Make a Gradient Descent step!\n    # Formula: weight = weight - (learning_rate * gradient)\n    weight = \n\n    # Error Loss = w^2 (just square the new weight)\n    loss = weight ** 2\n\n    print(f\"Epoch {epoch}: Weight = {weight:.3f}, Loss = {loss:.3f}\")\n\n# You'll see the weight tend to 0 and the error drop fast!"
        },
        type: "python"
      },
      // ============= LESSON 6 =============
      {
        id: "math-stats",
        title: "Statistics: Normalization and Variance",
        theory: {
          sections: [
            { type: "heading", content: "Why do we need statistics?" },
            { type: "text", content: "Real-world data is dirty and has totally different scales. A person's age is 0–100, but their salary is 10,000–1,000,000. If you feed them 'as is', gradient descent goes crazy. The error surface becomes a stretched tube, and the model can't find the minimum." },
            { type: "text", content: "The golden rule of ML: always normalize your input data!" },
            { type: "heading", content: "Mean, Variance and Deviation" },
            { type: "list", items: [
              "Mean (μ): the center of your data (sum divided by count).",
              "Variance: how strongly data is spread around the mean. Computed as the average squared deviation.",
              "Standard Deviation (σ): the square root of variance. Shows the average spread in the same units as the data."
            ]},
            { type: "heading", content: "Z-Score normalization (Standardization)" },
            { type: "text", content: "The most popular way to prepare data. We transform data so its Mean becomes 0 and standard deviation becomes 1. Data becomes perfectly balanced around zero (usually -3 to +3)." },
            { type: "code", content: "X_norm = (X - Mean) / Standard_Deviation" },
            { type: "text", content: "After this the 'Age' and 'Salary' features will have exactly the same scale in the eyes of the network!" }
          ]
        },
        practice: {
          title: "Z-Score normalization",
          description: "Compute mean, variance, std and normalize.",
          task: "Compute the mean, variance and standard deviation, then normalize the data with Z-Score: (x - mean) / std_dev (use a list comprehension). Result should be roughly [-1.41, -0.70, 0.0, 0.70, 1.41].",
          starterCode: "# Built-in math module (for the square root)\nimport math\n\ndata = [10000, 20000, 30000, 40000, 50000] # Salaries\nN = len(data)\n\n# 1. Compute the Mean\nmean = sum(data) / N\nprint(\"Mean:\", mean)\n\n# 2. Compute the Variance\n# Formula: sum of squared differences of each element and the mean, divided by N\nvariance = sum([(x - mean) ** 2 for x in data]) / N\n\n# 3. Compute the Standard Deviation (std_dev)\nstd_dev = math.sqrt(variance)\nprint(\"Standard Deviation:\", std_dev)\n\n# 4. Normalize the data (Z-Score)!\n# Formula: (x - mean) / std_dev for each x in data\nnormalized_data = [] # Write a list comprehension\n\nprint(\"Normalized data:\", normalized_data)"
        },
        type: "python"
      }
    ]
  },
  RU: {
    title: "Математика для ML",
    description: "Математика за машинным обучением — векторы, скалярное произведение, матрицы, производные, градиентный спуск и статистика, с практикой на Python.",
    lessons: [
      // ============= УРОК 1 =============
      {
        id: "math-vectors",
        title: "Векторы, Скаляры и Пространства",
        theory: {
          sections: [
            { type: "heading", content: "Математика — язык машин" },
            { type: "text", content: 'Машинное обучение работает исключительно с числами. Компьютер не понимает, что такое "картинка с котиком" или "текст отзыва". Он понимает только массивы чисел. Линейная алгебра — это наука о том, как этими массивами управлять.' },
            { type: "list", items: [
              "Скаляр — это обычное одиночное число (0D). Оно имеет только величину. Например: 5, 3.14. Температура на улице — это скаляр.",
              "Вектор — это одномерный (1D) упорядоченный список скаляров. Вектор имеет длину (количество элементов) и направление (если представить его в геометрии)."
            ]},
            { type: "heading", content: "Вектор признаков (Feature Vector)" },
            { type: "text", content: "В ML каждая строка вашего датасета превращается в вектор. Представьте, что мы предсказываем цену квартиры. У квартиры есть 3 признака (фичи): площадь (120 кв.м), количество комнат (3), возраст дома (15 лет). Для нейросети эта квартира выглядит как точка в трёхмерном пространстве:" },
            { type: "code", content: "x = [120, 3, 15]" },
            { type: "text", content: "Каждое число в векторе называется измерением (dimension). Если мы анализируем текст (например, алгоритмы Word2Vec), одно слово может быть представлено вектором из 300 измерений! Человеческий мозг не может представить 300-мерное пространство, но математика работает в нём так же легко, как и в 2D." },
            { type: "heading", content: "Операции с векторами" },
            { type: "text", content: "Сложение: векторы складываются поэлементно. Если у вас есть векторы A = [1, 2] и B = [3, 4], их сумма [1+3, 2+4] = [4, 6]." },
            { type: "text", content: 'Умножение на скаляр (Broadcasting): если мы умножаем вектор на число (например, 2), мы умножаем каждый его элемент: 2 * [1, 2, 3] = [2, 4, 6]. Геометрически это означает, что мы просто "растянули" стрелку вектора в два раза, не меняя её направление.' }
          ]
        },
        practice: {
          title: "Вычитание и масштабирование векторов",
          description: "Используй списки как векторы в Python.",
          task: 'Найдите "разницу" между двумя квартирами (вычитание векторов), используя цикл for с range(len(...)). Бонус: умножьте вектор на скаляр (увеличьте все параметры дома 2 в два раза).',
          starterCode: "# В ML мы часто используем списки как векторы\nhouse_1 = [120, 3, 15] # Квартира 1\nhouse_2 = [80, 2, 5]   # Квартира 2\n\n# Задача: Найдем \"разницу\" между этими квартирами (вычитание векторов)\ndifference = []\n\n# Используйте цикл for с функцией range(len(house_1)),\n# чтобы вычесть элементы house_2 из house_1\nfor i in range(len(house_1)):\n    # Ваш код:\n\n\nprint(\"Разница в параметрах квартир:\", difference)\n\n# Бонус: Умножение вектора на скаляр (увеличим все параметры дома 2 в два раза)\nscaled_house_2 = []\n# Напишите цикл умножения:"
        },
        type: "python"
      },
      // ============= УРОК 2 =============
      {
        id: "math-dot",
        title: "Скалярное произведение (Dot Product)",
        theory: {
          sections: [
            { type: "heading", content: "Сердце Искусственного Интеллекта" },
            { type: "text", content: "Скалярное произведение (Dot Product) — это самая часто выполняемая операция во всём машинном обучении. Ваш GPU делает миллиарды таких операций в секунду, когда генерирует текст в ChatGPT." },
            { type: "text", content: "Скалярное произведение берёт два вектора одинаковой длины, попарно перемножает их элементы и складывает всё в одно число (скаляр)." },
            { type: "code", content: "A · B = a1*b1 + a2*b2 + ... + an*bn" },
            { type: "heading", content: "Применение 1: Искусственный нейрон" },
            { type: "text", content: 'Нейрон получает на вход данные (вектор X). Внутри нейрона есть "Веса" (вектор W) — это "значимость" каждого входа. Нейрон делает простую вещь: вычисляет скалярное произведение X и W!' },
            { type: "text", content: "Пример: Квартира X = [100 м², 2 комнаты]. Веса модели W = [1000$ за метр, 5000$ за комнату]. Внутреннее состояние нейрона: 100 * 1000 + 2 * 5000 = 110 000$." },
            { type: "text", content: "Обычно к результату добавляют Смещение (Bias), чтобы нейросеть могла \"сдвигать\" свои прогнозы. Полная формула нейрона:" },
            { type: "code", content: "z = (X · W) + Bias" },
            { type: "heading", content: "Применение 2: Косинусное сходство (NLP)" },
            { type: "text", content: "В анализе текстов (и в рекомендательных системах) скалярное произведение помогает измерить похожесть двух объектов. Если нормализованные векторы двух пользователей смотрят в одну сторону в многомерном пространстве (скалярное произведение близко к 1), значит у них одинаковые вкусы, и им можно рекомендовать одни и те же фильмы!" }
          ]
        },
        practice: {
          title: "Вычисли выход нейрона",
          description: "Скалярное произведение плюс смещение.",
          task: "1. Вычислите скалярное произведение (X dot W) циклом. 2. Добавьте bias к результату. Заметьте: возраст и удалённость имеют отрицательные веса (уменьшают цену!).",
          starterCode: "# Входные данные (площадь, возраст, удаленность от метро)\nX = [50, 10, 5]\n\n# Веса нейрона (насколько важен каждый параметр для цены)\n# Заметьте: возраст и удаленность имеют отрицательные веса (уменьшают цену!)\nW = [2.5, -0.5, -1.2]\n\n# Смещение (базовая стоимость)\nbias = 10.0\n\n# 1. Вычислите скалярное произведение (X dot W)\ndot_product = 0\n# Напишите цикл для попарного умножения и сложения...\n\n\n# 2. Добавьте bias к результату\noutput = dot_product + bias\n\nprint(\"Скалярное произведение (сумма взвешенных фичей):\", dot_product)\nprint(\"Финальный Output нейрона:\", output)"
        },
        type: "python"
      },
      // ============= УРОК 3 =============
      {
        id: "math-matrices",
        title: "Матрицы и Тензоры",
        theory: {
          sections: [
            { type: "heading", content: "От Векторов к Матрицам (2D)" },
            { type: "text", content: "Если вектор — это список чисел (1D), то Матрица — это таблица чисел (2D), состоящая из строк и столбцов. В Python (до использования библиотек типа NumPy) матрицы представляются как списки внутри списков." },
            { type: "code", content: "matrix = [\n    [1, 2, 3], # Строка 0\n    [4, 5, 6]  # Строка 1\n]" },
            { type: "text", content: "Матрицы решают проблему масштабности. Вместо того, чтобы прогонять через нейросеть данные по одному человеку (вектору), мы склеиваем 32 человека в одну матрицу (Батч - Batch). Видеокарты (GPU) обожают матрицы, они умножают их в тысячи раз быстрее, чем перебирали бы векторы циклом." },
            { type: "heading", content: "Тензоры (N-Dimensional Arrays)" },
            { type: "text", content: "Тензор — это обобщение матриц на любые измерения (размерности):" },
            { type: "list", items: [
              "0D Тензор: Скаляр (5)",
              "1D Тензор: Вектор ([1, 2])",
              "2D Тензор: Матрица (Таблица Excel, датасет)",
              "3D Тензор: Цветное изображение. У него есть Высота, Ширина и 3 цветовых канала (RGB). Форма (Shape) будет (3, 256, 256).",
              "4D Тензор: Набор из нескольких цветных картинок (Батч). Форма: (32, 3, 256, 256) — 32 картинки в батче."
            ]},
            { type: "text", content: 'Библиотеки PyTorch и TensorFlow названы так именно потому, что внутри них "текут" (flow) тензоры.' }
          ]
        },
        practice: {
          title: "Индексация матрицы",
          description: "Извлеки строки, ячейки и целый столбец.",
          task: "1. Извлеките и выведите первую строку (пользователь 0). 2. Извлеките конкретное число: возраст (третий столбец) пользователя 1 — dataset[строка][столбец]. 3. Соберите столбец (все веса, индекс 1) в один вектор циклом.",
          starterCode: "# Представим матрицу 3x3 (3 строки, 3 столбца)\n# Допустим, это батч из 3 пользователей, у каждого 3 признака\ndataset = [\n    [180, 75, 25],  # Пользователь 0\n    [165, 60, 30],  # Пользователь 1\n    [190, 90, 22]   # Пользователь 2\n]\n\n# 1. Извлеките и выведите первую строку (данные Пользователя 0)\nuser_0 = \nprint(\"Пользователь 0:\", user_0)\n\n# 2. Извлеките конкретное число: возраст (третий столбец) Пользователя 1\n# Подсказка: датасет[строка][столбец]\nage_1 = \nprint(\"Возраст Пользователя 1 (должно быть 30):\", age_1)\n\n# 3. Транспонирование (Превращение строк в столбцы)\n# Давайте соберем в один вектор только веса (второй столбец, индекс 1) всех пользователей\nweights = []\nfor row in dataset:\n    # Добавьте в список weights элемент row[1]\n    pass\n\nprint(\"Вектор всех весов:\", weights)"
        },
        type: "python"
      },
      // ============= УРОК 4 =============
      {
        id: "math-derivative",
        title: "Основы Матанализа: Производная",
        theory: {
          sections: [
            { type: "heading", content: "Что такое Производная (Derivative)?" },
            { type: "text", content: 'Машинное обучение невозможно без математического анализа. Производная показывает скорость и направление изменения функции в конкретной точке. Она отвечает на вопрос: "Насколько сильно изменится выход функции (Y), если я на крошечный шаг изменю её вход (X)?"' },
            { type: "text", content: "Геометрически производная — это наклон (тангенс угла) касательной к графику функции." },
            { type: "heading", content: "Зачем это нейросетям (Loss Function)" },
            { type: "text", content: "Во время обучения нейросеть неизбежно ошибается. Мы измеряем эту ошибку специальной функцией потерь — Loss Function. Ошибка зависит от внутренних весов сети: Loss(W)." },
            { type: "text", content: 'Наша цель — свести ошибку (Loss) к нулю (найти минимум функции на графике). Вычислив производную функции Ошибки по весам, мы узнаем: "Если я чуть-чуть увеличу вес W, ошибка вырастет или уменьшится?".' },
            { type: "list", items: [
              "Если производная положительная — функция растёт. Значит вес нужно уменьшать.",
              "Если производная отрицательная — функция падает. Значит вес нужно увеличивать."
            ]},
            { type: "heading", content: "Численное вычисление (Numerical Approximation)" },
            { type: "text", content: "Компьютер может приближённо вычислить производную любой функции, даже не зная правил матанализа! Мы просто сдвигаем x на микроскопический шаг h (например, 0.0001) и смотрим дельту результата:" },
            { type: "code", content: "f'(x) ≈ ( f(x + h) - f(x) ) / h" },
            { type: "text", content: "В реальных сетях (Backpropagation) используются аналитические (точные) производные и правило дифференцирования сложной функции (Chain Rule), но суть остаётся той же." }
          ]
        },
        practice: {
          title: "Численная производная",
          description: "Приближённо вычисли производную w².",
          task: "Вычислите численную производную (градиент) функции Loss(w) = w² в точке w по формуле ( f(w + h) - f(w) ) / h. Точный ответ для w=3 должен быть 6.0 — посмотрите, насколько близко приближение!",
          starterCode: "# Допустим, наша функция ошибки: Loss(w) = w^2 (парабола)\ndef loss_function(w):\n    return w ** 2\n\n# Текущий вес модели\nw = 3.0\n# Очень маленький сдвиг\nh = 0.0001\n\n# 1. Вычислите численную производную (градиент) в точке w\n# Формула: ( loss_function(w + h) - loss_function(w) ) / h\nderivative = \n\nprint(f\"Приближенная производная в точке w={w} равна: {derivative:.4f}\")\n\n# Правило матанализа гласит: производная от x^2 равна 2*x.\n# Значит для w=3 ответ должен быть строго 6.0.\n# Посмотрим, как хорошо сработало численное приближение!"
        },
        type: "python"
      },
      // ============= УРОК 5 =============
      {
        id: "math-gradient",
        title: "Градиентный спуск (Gradient Descent)",
        theory: {
          sections: [
            { type: "heading", content: "Главный алгоритм машинного обучения" },
            { type: "text", content: "Градиент — это вектор, состоящий из частичных производных для ВСЕХ миллионов весов вашей нейросети. Он обладает невероятным свойством: он всегда указывает в направлении наискорейшего РОСТА функции." },
            { type: "text", content: "А нам нужно ошибку уменьшить. Поэтому, чтобы обучить модель, мы берём градиент, ставим перед ним минус (движемся в противоположную сторону) и обновляем наши веса! Это и есть алгоритм Градиентного спуска." },
            { type: "text", content: "Представьте, что вы стоите на холме с закрытыми глазами и хотите спуститься в низину. Вы нащупываете наклон земли ногой (считаете градиент) и делаете шаг вниз." },
            { type: "heading", content: "Шаг обучения (Learning Rate)" },
            { type: "text", content: 'Мы не можем просто вычесть градиент из весов. Нам нужен множитель — Learning Rate (LR, альфа). Он определяет размер нашего "шага".' },
            { type: "code", content: "W_new = W_old - (LR * Gradient)" },
            { type: "list", items: [
              "Слишком большой LR: вы будете делать гигантские шаги и перепрыгнете через низину на другой склон холма. Алгоритм взорвётся (Divergence).",
              "Слишком маленький LR: вы будете делать муравьиные шаги. Обучение сети займёт не 2 часа, а 5 лет."
            ]},
            { type: "text", content: "Подбор LR — главная задача инженера. Современные оптимизаторы (например, Adam) умеют подбирать этот шаг автоматически для каждого веса на ходу!" }
          ]
        },
        practice: {
          title: "Обучи один вес",
          description: "Прогони градиентный спуск 5 эпох.",
          task: "Сделайте шаг градиентного спуска: weight = weight - (learning_rate * gradient). Производная от w² равна 2*w. Посмотрите, как вес стремится к 0, а ошибка стремительно падает.",
          starterCode: "# Представим, что мы обучаем один вес\nweight = 5.0\n\n# Наш шаг обучения (Learning Rate)\nlearning_rate = 0.1\n\n# Симулируем 5 эпох (шагов) обучения\nfor epoch in range(1, 6):\n    # Производная от w^2 равна 2*w\n    # Вычисляем точный градиент для текущего веса\n    gradient = 2 * weight\n\n    # Сделайте шаг Градиентного Спуска!\n    # Формула: weight = weight - (learning_rate * gradient)\n    weight = \n\n    # Функция ошибки Loss = w^2 (просто возводим новый вес в квадрат)\n    loss = weight ** 2\n\n    print(f\"Эпоха {epoch}: Вес = {weight:.3f}, Ошибка (Loss) = {loss:.3f}\")\n\n# Вы увидите, как вес стремится к 0, а ошибка стремительно падает!"
        },
        type: "python"
      },
      // ============= УРОК 6 =============
      {
        id: "math-stats",
        title: "Статистика: Нормализация и Дисперсия",
        theory: {
          sections: [
            { type: "heading", content: "Зачем нам Статистика?" },
            { type: "text", content: 'Данные в реальном мире грязные и имеют абсолютно разный масштаб. Возраст человека от 0 до 100, а его зарплата от 10,000 до 1,000,000. Если подать их в нейросеть "как есть", алгоритм градиентного спуска сойдёт с ума. График ошибки превратится в вытянутую трубку, и модель не сможет найти минимум.' },
            { type: "text", content: "Золотое правило ML: Всегда нормализуй входные данные!" },
            { type: "heading", content: "Среднее, Дисперсия и Отклонение" },
            { type: "list", items: [
              "Среднее (Mean, μ): Центр ваших данных (сумма делить на количество).",
              "Дисперсия (Variance): Показывает, насколько сильно данные разбросаны вокруг среднего. Вычисляется как средний квадрат отклонений.",
              "Стандартное отклонение (Standard Deviation, σ): Корень из дисперсии. Показывает средний разброс в тех же единицах, что и сами данные."
            ]},
            { type: "heading", content: "Z-Score нормализация (Стандартизация)" },
            { type: "text", content: "Самый популярный способ подготовки данных. Мы превращаем данные так, чтобы их Среднее стало равно 0, а стандартное отклонение стало равно 1. Данные становятся идеально сбалансированными вокруг нуля (обычно от -3 до +3)." },
            { type: "code", content: "X_norm = (X - Mean) / Standard_Deviation" },
            { type: "text", content: 'После этого признак "Возраст" и "Зарплата" будут иметь абсолютно одинаковый масштаб в глазах нейросети!' }
          ]
        },
        practice: {
          title: "Z-Score нормализация",
          description: "Посчитай среднее, дисперсию, std и нормализуй.",
          task: "Посчитайте среднее, дисперсию и стандартное отклонение, затем нормализуйте данные через Z-Score: (x - mean) / std_dev (используйте list comprehension). Результат должен быть примерно [-1.41, -0.70, 0.0, 0.70, 1.41].",
          starterCode: "# Встроенный модуль математики (для корня)\nimport math\n\ndata = [10000, 20000, 30000, 40000, 50000] # Зарплаты\nN = len(data)\n\n# 1. Считаем Среднее (Mean)\nmean = sum(data) / N\nprint(\"Среднее (Mean):\", mean)\n\n# 2. Считаем Дисперсию (Variance)\n# Формула: Сумма квадратов разницы каждого элемента и среднего, деленная на N\nvariance = sum([(x - mean) ** 2 for x in data]) / N\n\n# 3. Считаем Стандартное отклонение (std_dev)\nstd_dev = math.sqrt(variance)\nprint(\"Стандартное отклонение (Std Dev):\", std_dev)\n\n# 4. Нормализуем данные (Z-Score)!\n# Формула: (x - mean) / std_dev для каждого x в data\nnormalized_data = [] # Напишите List Comprehension\n\nprint(\"Нормализованные данные:\", normalized_data)"
        },
        type: "python"
      }
    ]
  }
};
