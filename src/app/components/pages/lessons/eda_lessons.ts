export const edaState: Record<'EN' | 'RU', any> = {
  EN: {
    title: "EDA & Visualization",
    description: "Learn Exploratory Data Analysis using Matplotlib, Seaborn, and Plotly to find hidden patterns in data.",
    lessons: [
      {
        id: "eda-intro-matplotlib",
        title: "Introduction to EDA & Matplotlib",
        theory: {
          sections: [
            { type: "heading", content: "What is EDA?" },
            { type: "text", content: "EDA (Exploratory Data Analysis) is the very first step a Data Scientist takes after receiving a dataset. Before training any neural networks or making predictions, you must 'look' at your data to understand its shape, find errors, missing values, and general trends." },
            { type: "heading", content: "Matplotlib: The Grandfather of Visualization" },
            { type: "text", content: "Matplotlib is the foundational plotting library in Python. It provides low-level control over every element of a chart." },
            { type: "code", content: "import matplotlib.pyplot as plt\n\nx = [1, 2, 3, 4]\ny = [10, 20, 25, 30]\n\nplt.plot(x, y) # Create a line plot\nplt.title('My First Plot')\nplt.xlabel('X Axis')\nplt.ylabel('Y Axis')\nplt.show()" },
            { type: "text", content: "While powerful, writing pure Matplotlib can be verbose. That's why we usually use it alongside higher-level libraries like Seaborn." },
            { type: "tip", content: "Resource: Kaggle EDA. Kaggle provides an excellent free 'Data Visualization' micro-course that teaches the practical applications of these charts." }
          ]
        },
        practice: {
          title: "Your First Plot",
          description: "Create a simple line chart using Matplotlib.",
          task: "Import matplotlib.pyplot as plt. Plot the 'years' array on the X axis and 'sales' on the Y axis using plt.plot(). Add a title 'Sales Growth' and call plt.show().",
          starterCode: "import matplotlib.pyplot as plt\n\nyears = [2020, 2021, 2022, 2023]\nsales = [150, 200, 250, 400]\n\n# 1. Create a line plot\n\n# 2. Add a title\n\n# 3. Show the plot\n"
        },
        type: "python"
      },
      {
        id: "eda-seaborn-distributions",
        title: "Distributions & Seaborn",
        theory: {
          sections: [
            { type: "heading", content: "Why Seaborn?" },
            { type: "text", content: "Seaborn is built on top of Matplotlib. It makes creating beautiful statistical graphics incredibly easy. What takes 10 lines of code in Matplotlib takes just 1 line in Seaborn." },
            { type: "heading", content: "Understanding Distributions" },
            { type: "text", content: "One of the most important questions in EDA is 'How is my data distributed?'. For example, do most people earn $50k, or are there extreme outliers?" },
            { type: "list", items: [
              "Histogram (sns.histplot): Groups data into 'bins' and shows how many data points fall into each bin.",
              "KDE (Kernel Density Estimate): Draws a smooth curve representing the distribution shape."
            ]},
            { type: "code", content: "import seaborn as sns\nimport pandas as pd\n\ndf = pd.DataFrame({'age': [22, 25, 25, 30, 35, 40, 80]})\nsns.histplot(data=df, x='age', kde=True)\nplt.show()" },
            { type: "tip", content: "Resource: Seaborn Gallery. The official seaborn.pydata.org gallery is the best place to find visual inspiration and the exact code snippets to reproduce complex charts." }
          ]
        },
        practice: {
          title: "Visualizing Distributions",
          description: "Use Seaborn to plot a histogram.",
          task: "We have a DataFrame with 'prices'. Use seaborn (sns) to create a histogram (histplot) of the 'prices' column. Enable the KDE curve by passing kde=True.",
          starterCode: "import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\ndf = pd.DataFrame({'prices': [10, 12, 12, 14, 15, 15, 15, 18, 20, 50]})\n\n# Create a histplot with a KDE curve\n\nplt.show()"
        },
        type: "python"
      },
      {
        id: "eda-correlations",
        title: "Finding Correlations (Heatmaps)",
        theory: {
          sections: [
            { type: "heading", content: "Relationships between variables" },
            { type: "text", content: "Does a higher number of rooms lead to a higher house price? This relationship is called Correlation. The correlation coefficient ranges from -1 (strong inverse relation) to 1 (strong direct relation). 0 means no relation." },
            { type: "heading", content: "Scatter Plots & Heatmaps" },
            { type: "list", items: [
              "Scatter Plot (sns.scatterplot): Plots dots on a 2D grid. Perfect for seeing the relationship between two numerical variables.",
              "Heatmap (sns.heatmap): Visualizes a correlation matrix. It uses colors to show how strongly every variable correlates with every other variable."
            ]},
            { type: "code", content: "import seaborn as sns\n\n# Compute correlation matrix\ncorr_matrix = df.corr()\n\n# Draw a heatmap with annotations\nsns.heatmap(corr_matrix, annot=True, cmap='coolwarm')\nplt.show()" }
          ]
        },
        practice: {
          title: "Correlation Matrix",
          description: "Build a heatmap to find patterns.",
          task: "Calculate the correlation matrix for the 'df' using df.corr(). Then, pass this matrix to sns.heatmap(). Set annot=True to see the numbers inside the squares.",
          starterCode: "import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\ndata = {\n    'rooms': [1, 2, 3, 4, 5],\n    'area': [30, 50, 75, 100, 120],\n    'price': [50k, 80k, 110k, 150k, 180k]\n}\ndf = pd.DataFrame(data)\n\n# 1. Calculate correlation matrix\ncorr_matrix = \n\n# 2. Draw a heatmap\n\nplt.show()"
        },
        type: "python"
      },
      {
        id: "eda-categorical",
        title: "Categorical Data & Outliers",
        theory: {
          sections: [
            { type: "heading", content: "Working with Categories" },
            { type: "text", content: "Often, data isn't numerical. It's categorical (e.g., 'City', 'Gender', 'Subscription Type'). To analyze these, we use specific plots." },
            { type: "list", items: [
              "Bar Plot (sns.barplot): Shows aggregated values (like average salary) for each category.",
              "Count Plot (sns.countplot): Simply counts how many rows exist for each category.",
              "Box Plot (sns.boxplot): The ultimate tool for finding OUTLIERS. It shows the median, quartiles, and points that fall unusually far from the rest of the data."
            ]},
            { type: "code", content: "import seaborn as sns\n\n# Show salary distribution by city\nsns.boxplot(data=df, x='City', y='Salary')\nplt.show()" },
            { type: "text", content: "In a boxplot, the 'box' represents where 50% of the data lies. The 'whiskers' show the range, and individual dots outside the whiskers are outliers (anomalies) that a Data Scientist might need to remove." }
          ]
        },
        practice: {
          title: "Spot the Outlier",
          description: "Create a boxplot to find anomalies.",
          task: "Create a boxplot using sns.boxplot. Set the x-axis to 'Department' and the y-axis to 'Salary'. Notice how the plot highlights the CEO's extreme salary as an outlier dot!",
          starterCode: "import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\ndata = {\n    'Department': ['IT', 'IT', 'IT', 'Sales', 'Sales', 'Sales'],\n    'Salary': [60000, 65000, 1500000, 45000, 50000, 52000] # 1.5M is an anomaly!\n}\ndf = pd.DataFrame(data)\n\n# Create a boxplot\n\nplt.show()"
        },
        type: "python"
      },
      {
        id: "eda-plotly",
        title: "Interactive Visualization with Plotly",
        theory: {
          sections: [
            { type: "heading", content: "Why Interactivity?" },
            { type: "text", content: "Matplotlib and Seaborn generate static images (PNGs). If you have a scatter plot with 10,000 dots, they overlap, and you can't tell which dot represents which client." },
            { type: "text", content: "Plotly is an interactive library. When you render a Plotly chart, it outputs HTML/JS. You can hover over points to see tooltips with exact data, zoom in, pan, and save as PNG." },
            { type: "heading", content: "Plotly Express (px)" },
            { type: "text", content: "Plotly used to be very complex, but they released Plotly Express (px), which mimics Seaborn's easy 1-line syntax." },
            { type: "code", content: "import plotly.express as px\n\n# Create an interactive scatter plot\nfig = px.scatter(df, x='GDP', y='Life_Expectancy', color='Continent', hover_name='Country')\nfig.show()" },
            { type: "tip", content: "Resource: Plotly docs. The documentation is fantastic. Whenever you need to build a dashboard or present data to business stakeholders, use Plotly. It makes a huge impression compared to static images." }
          ]
        },
        practice: {
          title: "Interactive Scatter Plot",
          description: "Use Plotly Express to build an interactive chart.",
          task: "Use px.scatter to create a plot. Set x='Age', y='Income', and color='City'. In a real Jupyter environment, this would render a beautiful interactive chart where you can hover over the dots!",
          starterCode: "import pandas as pd\n# We import plotly express as px\nimport plotly.express as px\n\ndata = {\n    'Age': [25, 30, 35, 40],\n    'Income': [50, 70, 90, 120],\n    'City': ['NY', 'NY', 'LA', 'LA']\n}\ndf = pd.DataFrame(data)\n\n# Create a Plotly scatter plot\nfig = \n\n# To show it:\n# fig.show()"
        },
        type: "python"
      }
    ]
  },
  RU: {
    title: "EDA & Визуализация",
    description: "Изучите Exploratory Data Analysis с помощью Matplotlib, Seaborn и Plotly, чтобы находить скрытые паттерны в данных.",
    lessons: [
      {
        id: "eda-intro-matplotlib",
        title: "Введение в EDA и Matplotlib",
        theory: {
          sections: [
            { type: "heading", content: "Что такое EDA?" },
            { type: "text", content: "EDA (Exploratory Data Analysis или Разведочный анализ данных) — это самый первый шаг, который делает Data Scientist, получив датасет. До обучения нейросетей вы обязаны 'посмотреть' на данные: понять их распределение, найти ошибки, пустые значения и общие тренды." },
            { type: "heading", content: "Matplotlib: Дедушка визуализации" },
            { type: "text", content: "Matplotlib — это базовая библиотека для построения графиков в Python. Она дает низкоуровневый контроль над каждым пикселем, линией и подписью." },
            { type: "code", content: "import matplotlib.pyplot as plt\n\nx = [1, 2, 3, 4]\ny = [10, 20, 25, 30]\n\nplt.plot(x, y) # Линейный график\nplt.title('Мой первый график')\nplt.xlabel('Ось X')\nplt.ylabel('Ось Y')\nplt.show()" },
            { type: "text", content: "Несмотря на мощь, писать чистый Matplotlib бывает долго и громоздко. Поэтому в индустрии его используют как 'движок', а графики строят более удобными надстройками вроде Seaborn." },
            { type: "tip", content: "Ресурс: Kaggle EDA. На платформе Kaggle есть отличный бесплатный микро-курс 'Data Visualization', где на практике показывают, как применять эти графики." }
          ]
        },
        practice: {
          title: "Ваш первый график",
          description: "Создайте линейный график с помощью Matplotlib.",
          task: "Импортируйте matplotlib.pyplot как plt. Постройте график, где по оси X будет массив 'years', а по Y — 'sales' (используя plt.plot). Добавьте заголовок 'Рост продаж' и вызовите plt.show().",
          starterCode: "import matplotlib.pyplot as plt\n\nyears = [2020, 2021, 2022, 2023]\nsales = [150, 200, 250, 400]\n\n# 1. Создайте график (plot)\n\n# 2. Добавьте заголовок (title)\n\n# 3. Выведите график на экран (show)\n"
        },
        type: "python"
      },
      {
        id: "eda-seaborn-distributions",
        title: "Распределения и Seaborn",
        theory: {
          sections: [
            { type: "heading", content: "Почему Seaborn?" },
            { type: "text", content: "Seaborn построен поверх Matplotlib. Он делает создание статистических графиков невероятно простым. То, что занимает 10 строк в Matplotlib, в Seaborn пишется в 1 строку, а дизайн по умолчанию выглядит гораздо красивее." },
            { type: "heading", content: "Анализ Распределений" },
            { type: "text", content: "Один из главных вопросов EDA — 'Как распределены мои данные?'. Например, большинство людей зарабатывает 50к, или есть экстремальные отклонения?" },
            { type: "list", items: [
              "Гистограмма (sns.histplot): Разбивает данные на 'корзины' (bins) и показывает, сколько записей попало в каждую корзину.",
              "KDE (Кривая плотности): Рисует сглаженную линию, показывающую форму распределения (нормальное распределение, скошенное и т.д.)."
            ]},
            { type: "code", content: "import seaborn as sns\nimport pandas as pd\n\ndf = pd.DataFrame({'age': [22, 25, 25, 30, 35, 40, 80]})\nsns.histplot(data=df, x='age', kde=True)\nplt.show()" },
            { type: "tip", content: "Ресурс: Seaborn Gallery. Официальная галерея seaborn.pydata.org — лучшее место для поиска вдохновения. Там собраны примеры сложнейших графиков с готовым кодом." }
          ]
        },
        practice: {
          title: "Визуализация Распределений",
          description: "Используйте Seaborn для построения гистограммы.",
          task: "У нас есть DataFrame с колонкой 'prices'. Используя seaborn (sns), создайте гистограмму (histplot) для колонки 'prices'. Включите сглаживающую кривую, передав параметр kde=True.",
          starterCode: "import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\ndf = pd.DataFrame({'prices': [10, 12, 12, 14, 15, 15, 15, 18, 20, 50]})\n\n# Создайте histplot с KDE кривой\n\nplt.show()"
        },
        type: "python"
      },
      {
        id: "eda-correlations",
        title: "Поиск связей (Корреляции и Heatmaps)",
        theory: {
          sections: [
            { type: "heading", content: "Связи между переменными" },
            { type: "text", content: "Приводит ли увеличение площади квартиры к росту её цены? Эта связь называется Корреляцией. Коэффициент Пирсона варьируется от -1 (строгая обратная связь) до 1 (строгая прямая связь). 0 означает отсутствие связи." },
            { type: "heading", content: "Scatter Plots & Heatmaps" },
            { type: "list", items: [
              "Диаграмма рассеяния (sns.scatterplot): Рисует точки на 2D плоскости. Идеально для оценки связи между двумя числовыми переменными.",
              "Тепловая карта (sns.heatmap): Визуализирует матрицу корреляций. Использует градиент цвета, чтобы показать, как сильно каждая переменная коррелирует со всеми остальными."
            ]},
            { type: "code", content: "import seaborn as sns\n\n# Вычисляем матрицу корреляций\ncorr_matrix = df.corr()\n\n# Рисуем тепловую карту с цифрами внутри\nsns.heatmap(corr_matrix, annot=True, cmap='coolwarm')\nplt.show()" }
          ]
        },
        practice: {
          title: "Матрица Корреляций",
          description: "Постройте тепловую карту (heatmap).",
          task: "Рассчитайте матрицу корреляций для датафрейма с помощью метода df.corr(). Затем передайте эту матрицу в sns.heatmap(). Установите annot=True, чтобы на графике отображались числовые значения.",
          starterCode: "import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\ndata = {\n    'rooms': [1, 2, 3, 4, 5],\n    'area': [30, 50, 75, 100, 120],\n    'price': [50, 80, 110, 150, 180]\n}\ndf = pd.DataFrame(data)\n\n# 1. Вычислите матрицу корреляций\ncorr_matrix = \n\n# 2. Нарисуйте heatmap\n\nplt.show()"
        },
        type: "python"
      },
      {
        id: "eda-categorical",
        title: "Категориальные данные и Выбросы",
        theory: {
          sections: [
            { type: "heading", content: "Работа с категориями" },
            { type: "text", content: "Часто данные бывают не числовыми, а категориальными ('Город', 'Пол', 'Тариф'). Для их анализа используют специфические графики." },
            { type: "list", items: [
              "Столбчатая диаграмма (sns.barplot): Показывает агрегированные значения (например, среднюю зарплату) для каждой категории.",
              "Count Plot (sns.countplot): Просто считает, сколько строк существует для каждой категории.",
              "Ящик с усами (sns.boxplot): Ультимативный инструмент для поиска ВЫБРОСОВ. Показывает медиану, квартили и точки, которые аномально отдалены от остальных данных."
            ]},
            { type: "code", content: "import seaborn as sns\n\n# Показываем распределение зарплат по городам\nsns.boxplot(data=df, x='City', y='Salary')\nplt.show()" },
            { type: "text", content: "В Boxplot 'коробка' показывает, где находится 50% всех данных. 'Усы' показывают разброс, а отдельные точки за усами — это выбросы (аномалии), которые Data Scientist обычно удаляет из датасета." }
          ]
        },
        practice: {
          title: "Найди Выброс",
          description: "Создайте boxplot для поиска аномалий.",
          task: "Используйте sns.boxplot. Установите ось X как 'Department', а ось Y как 'Salary'. При запуске (в реальной среде) график бы подсветил зарплату директора в 1.5М отдельной точкой, оторванной от основной массы!",
          starterCode: "import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\ndata = {\n    'Department': ['IT', 'IT', 'IT', 'Sales', 'Sales', 'Sales'],\n    'Salary': [60000, 65000, 1500000, 45000, 50000, 52000] # 1.5M - это аномалия!\n}\ndf = pd.DataFrame(data)\n\n# Создайте boxplot\n\nplt.show()"
        },
        type: "python"
      },
      {
        id: "eda-plotly",
        title: "Интерактивная визуализация с Plotly",
        theory: {
          sections: [
            { type: "heading", content: "Зачем нужна интерактивность?" },
            { type: "text", content: "Matplotlib и Seaborn генерируют статические картинки (PNG). Если на scatter plot нанести 10 000 точек, они сольются в пятно, и вы не поймете, за какую страну отвечает конкретная точка." },
            { type: "text", content: "Plotly — это интерактивная библиотека. Она генерирует HTML/JS графики. Вы можете наводить курсор на точки (tooltips), приближать участки графика (zoom), отключать лишние категории кликом по легенде." },
            { type: "heading", content: "Plotly Express (px)" },
            { type: "text", content: "Раньше Plotly был сложным, но они выпустили обертку Plotly Express (px), которая повторяет легкий однострочный синтаксис Seaborn." },
            { type: "code", content: "import plotly.express as px\n\n# Интерактивный scatter plot\nfig = px.scatter(df, x='GDP', y='Life_Expectancy', color='Continent', hover_name='Country')\nfig.show()" },
            { type: "tip", content: "Ресурс: Plotly docs. Документация Plotly великолепна. Если вам нужно показать результаты анализа бизнесу или внедрить график на сайт (в Streamlit или Dash) — всегда используйте Plotly. Он производит wow-эффект по сравнению со статикой." }
          ]
        },
        practice: {
          title: "Интерактивный Scatter Plot",
          description: "Используйте Plotly Express для сборки графика.",
          task: "Используя px.scatter, создайте график. Укажите x='Age', y='Income', и разукрасьте точки в зависимости от города: color='City'. Метод show() отобразит его.",
          starterCode: "import pandas as pd\n# Импортируем plotly express как px\nimport plotly.express as px\n\ndata = {\n    'Age': [25, 30, 35, 40],\n    'Income': [50, 70, 90, 120],\n    'City': ['NY', 'NY', 'LA', 'LA']\n}\ndf = pd.DataFrame(data)\n\n# Создайте график Plotly scatter\nfig = \n\n# Вызов отображения (в реальном jupyter):\n# fig.show()"
        },
        type: "python"
      }
    ]
  }
};