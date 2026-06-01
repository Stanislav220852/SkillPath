export const statisticsState: Record<'EN' | 'RU', any> = {
  EN: {
    title: "Statistics for Data Science",
    description: "Hypotheses, p-value, A/B testing — the foundation of data-driven decisions and product analytics.",
    lessons: [
      {
        id: "stat-descriptive",
        title: "Descriptive Statistics: Mean vs Median",
        theory: {
          sections: [
            { type: "heading", content: "Lies, Damned Lies, and Statistics" },
            { type: "text", content: "Before running complex ML models, we must understand our data. Descriptive statistics help summarize large datasets into single numbers." },
            { type: "list", items: [
              "Mean (Average): The sum of all values divided by the count. It's highly sensitive to outliers.",
              "Median: The exact middle value when the data is sorted. It is robust to outliers.",
              "Variance & Standard Deviation: Measure how spread out the data is around the mean."
            ]},
            { type: "heading", content: "The Bill Gates Effect" },
            { type: "text", content: "Imagine a bar with 10 people earning $50,000 a year. The mean income is $50k. Suddenly, Bill Gates walks into the bar. The mean income rockets to $100 million! But the median income remains exactly $50k. This is why Data Scientists often prefer medians for skewed data (like salaries or house prices)." },
            { type: "tip", content: "Resource: 'Think Stats' by Allen B. Downey. It's a brilliant free book that teaches statistics from a programmer's perspective, using Python instead of complex mathematical formulas." }
          ]
        },
        practice: {
          title: "Mean vs Median",
          description: "Calculate central tendency using NumPy.",
          task: "Use numpy to calculate the mean and median of the salaries array. Notice the huge difference caused by the CEO's salary!",
          starterCode: "import numpy as np\n\n# 5 regular employees and 1 CEO (outlier)\nsalaries = np.array([40, 45, 50, 42, 48, 10000])\n\n# 1. Calculate the mean\nmean_salary = \n\n# 2. Calculate the median\nmedian_salary = \n\nprint(f\"Mean: {mean_salary}\")\nprint(f\"Median: {median_salary}\")"
        },
        type: "python"
      },
      {
        id: "stat-normal-dist",
        title: "Normal Distribution & Z-Score",
        theory: {
          sections: [
            { type: "heading", content: "The Bell Curve" },
            { type: "text", content: "The Normal (Gaussian) Distribution is the most important probability distribution in statistics. It looks like a symmetrical bell. Things like human height, blood pressure, and IQ scores naturally follow this curve." },
            { type: "heading", content: "The 68-95-99.7 Rule" },
            { type: "text", content: "In a perfectly normal distribution:" },
            { type: "list", items: [
              "68% of data falls within 1 Standard Deviation (σ) of the Mean (μ).",
              "95% falls within 2 Standard Deviations.",
              "99.7% falls within 3 Standard Deviations."
            ]},
            { type: "heading", content: "Z-Score (Standardization)" },
            { type: "text", content: "A Z-score tells you exactly how many standard deviations a value is from the mean. Formula: Z = (X - Mean) / StdDev. If Z > 3, the data point is almost certainly an outlier." },
            { type: "tip", content: "Resource: Khan Academy (Statistics and Probability). Sal Khan's videos on Normal Distribution and Z-scores are visually intuitive and perfect for building a mathematical intuition from scratch." }
          ]
        },
        practice: {
          title: "Calculate Z-Score",
          description: "Find out if a value is an outlier.",
          task: "You have a student's score (95), the class mean (70), and the standard deviation (10). Calculate the Z-score using the formula: (score - mean) / std_dev.",
          starterCode: "score = 95\nmean = 70\nstd_dev = 10\n\n# Calculate Z-score\nz_score = \n\nprint(f\"The Z-score is: {z_score}\")\n# If Z >= 2, the student performed exceptionally well!"
        },
        type: "python"
      },
      {
        id: "stat-hypothesis",
        title: "Hypothesis Testing & The Null Hypothesis",
        theory: {
          sections: [
            { type: "heading", content: "Making Data-Driven Decisions" },
            { type: "text", content: "Suppose you changed the color of a 'Buy' button from blue to red. Sales went up by 2%. Did the color cause the increase, or was it just a random lucky day? We use Hypothesis Testing to find out." },
            { type: "heading", content: "H0 and H1" },
            { type: "list", items: [
              "Null Hypothesis (H0): The status quo. It assumes NOTHING changed. (e.g., 'The red button makes no difference').",
              "Alternative Hypothesis (H1): Your claim. (e.g., 'The red button increases sales')."
            ]},
            { type: "text", content: "In statistics, we NEVER try to 'prove' H1. Instead, we try to gather enough evidence to 'reject' the Null Hypothesis (H0)." }
          ]
        },
        practice: {
          title: "Formulating Hypotheses",
          description: "Define H0 and H1 for a business problem.",
          task: "A company introduces a new drug intended to lower blood pressure. Assign string descriptions to H0 and H1 variables reflecting the statistical mindset.",
          starterCode: "# Define the Null and Alternative hypotheses as strings\n\n# H0: The drug has NO effect on blood pressure\nh0 = \"\"\n\n# H1: The drug lowers blood pressure\nh1 = \"\"\n\nprint(\"H0:\", h0)\nprint(\"H1:\", h1)"
        },
        type: "python"
      },
      {
        id: "stat-pvalue",
        title: "P-value & Statistical Significance",
        theory: {
          sections: [
            { type: "heading", content: "What is a P-value?" },
            { type: "text", content: "The p-value is the most misunderstood concept in Data Science. Simply put: The p-value is the probability of seeing our data (or more extreme data) IF the Null Hypothesis (H0) is TRUE." },
            { type: "text", content: "If the p-value is very small (usually < 0.05), it means: 'It is highly unlikely to get this result by pure luck if H0 were true'. Therefore, we reject H0!" },
            { type: "heading", content: "Alpha (α) Level" },
            { type: "text", content: "Before the test, we set an Alpha level (usually 0.05 or 5%). This is our threshold for 'surprise'. If p-value < Alpha, the result is Statistically Significant." },
            { type: "tip", content: "Resource: StatQuest with Josh Starmer (YouTube). Josh's video 'p-values: What they are and how to interpret them' is legendary. He explains complex math using simple drawings and his catchphrase 'BAM!'." }
          ]
        },
        practice: {
          title: "Interpreting the P-value",
          description: "Write a function to decide the fate of H0.",
          task: "Write a function `check_significance(p_value, alpha)` that returns 'Reject H0' if p_value < alpha, and 'Fail to reject H0' otherwise.",
          starterCode: "def check_significance(p_value, alpha=0.05):\n    # Write an if/else block\n    \n\n# Let's test it. Our A/B test gave a p-value of 0.02\nresult = check_significance(0.02)\nprint(\"Test 1 (p=0.02):\", result)\n\n# Another test gave p=0.15\nresult2 = check_significance(0.15)\nprint(\"Test 2 (p=0.15):\", result2)"
        },
        type: "python"
      },
      {
        id: "stat-ab-testing",
        title: "A/B Testing in Practice (T-Test)",
        theory: {
          sections: [
            { type: "heading", content: "Comparing Two Groups" },
            { type: "text", content: "A/B testing is the gold standard in product analytics. You split users into two groups: Group A (Control - old website) and Group B (Treatment - new website). Then you compare their metrics." },
            { type: "heading", content: "The T-Test (Student's T-Test)" },
            { type: "text", content: "To compare the MEANS of two continuous variables (like session length or revenue per user), we use an Independent T-Test." },
            { type: "code", content: "from scipy import stats\n\n# Run the T-test\nt_stat, p_value = stats.ttest_ind(group_a, group_b)\n\nif p_value < 0.05:\n    print('Statistically significant difference!')" },
            { type: "text", content: "The t-test looks at two things: the difference between the means, and the variance (noise) within the groups. A big difference with low noise gives a tiny p-value!" }
          ]
        },
        practice: {
          title: "Run an A/B Test",
          description: "Use SciPy to compare two samples.",
          task: "We have conversion rates for two website designs. Use scipy.stats.ttest_ind to calculate the p-value. Then print whether the new design is statistically better.",
          starterCode: "import numpy as np\nfrom scipy import stats\n\n# Simulated conversion data (e.g., time spent on page in seconds)\n# Group A (Old Design)\ncontrol = np.array([120, 115, 130, 110, 125, 118])\n# Group B (New Design)\ntreatment = np.array([145, 140, 155, 150, 160, 148])\n\n# 1. Calculate t-statistic and p-value\nt_stat, p_value = \n\nprint(f\"P-value: {p_value:.4f}\")\n\n# 2. Check significance\nif p_value < 0.05:\n    print(\"SUCCESS: The new design is significantly better!\")\nelse:\n    print(\"FAIL: No significant difference.\")"
        },
        type: "python"
      }
    ]
  },
  RU: {
    title: "Статистика для Data Science",
    description: "Гипотезы, p-value, A/B тесты — основа data-driven решений и продуктовой аналитики.",
    lessons: [
      {
        id: "stat-descriptive",
        title: "Описательная статистика: Среднее и Медиана",
        theory: {
          sections: [
            { type: "heading", content: "Ложь, наглая ложь и статистика" },
            { type: "text", content: "Прежде чем запускать сложные ML-модели, мы обязаны понять наши данные. Описательная статистика помогает сжать миллионы строк в пару понятных цифр." },
            { type: "list", items: [
              "Среднее (Mean): Сумма всех значений, деленная на их количество. Очень сильно искажается от выбросов (аномалий).",
              "Медиана (Median): Значение, находящееся ровно посередине отсортированного массива. Она абсолютно устойчива к выбросам.",
              "Дисперсия (Variance): Показывает, насколько сильно данные разбросаны вокруг среднего."
            ]},
            { type: "heading", content: "Эффект Билла Гейтса" },
            { type: "text", content: "Представьте бар, где сидят 10 человек с доходом 50 000$ в год. Средний доход — 50к$. В бар заходит Билл Гейтс. Средний доход всех людей в баре мгновенно взлетает до 100 миллионов долларов! Но МЕДИАННЫЙ доход остается 50к$. Именно поэтому Data Scientist'ы анализируют зарплаты и цены на квартиры по медиане, а не по среднему." },
            { type: "tip", content: "Ресурс: 'Think Stats' (Allen B. Downey). Шикарная бесплатная книга, которая объясняет статистику с точки зрения программиста — через код на Python, а не через зубодробительные формулы." }
          ]
        },
        practice: {
          title: "Среднее против Медианы",
          description: "Вычислите центральную тенденцию с помощью NumPy.",
          task: "Используйте функции numpy (np.mean и np.median), чтобы посчитать среднее и медиану для массива зарплат. Обратите внимание на колоссальную разницу из-за зарплаты директора!",
          starterCode: "import numpy as np\n\n# 5 обычных сотрудников и 1 Директор (выброс)\nsalaries = np.array([40, 45, 50, 42, 48, 10000])\n\n# 1. Посчитайте среднее (mean)\nmean_salary = \n\n# 2. Посчитайте медиану (median)\nmedian_salary = \n\nprint(f\"Среднее: {mean_salary}\")\nprint(f\"Медиана: {median_salary}\")"
        },
        type: "python"
      },
      {
        id: "stat-normal-dist",
        title: "Нормальное распределение и Z-оценка",
        theory: {
          sections: [
            { type: "heading", content: "Колокол Гаусса" },
            { type: "text", content: "Нормальное распределение (Гауссиана) — самое важное распределение вероятностей в природе. Оно выглядит как симметричный колокол. Рост людей, артериальное давление и баллы IQ — всё это подчиняется нормальному распределению." },
            { type: "heading", content: "Правило 68-95-99.7" },
            { type: "text", content: "В идеальном нормальном распределении:" },
            { type: "list", items: [
              "68% всех данных лежит в пределах 1 стандартного отклонения (σ) от среднего (μ).",
              "95% данных лежит в пределах 2 стандартных отклонений.",
              "99.7% данных лежит в пределах 3 стандартных отклонений."
            ]},
            { type: "heading", content: "Z-Score (Стандартизация)" },
            { type: "text", content: "Z-оценка говорит вам, на сколько именно стандартных отклонений ваше значение отклонилось от среднего. Формула: Z = (X - Mean) / StdDev. Если Z-score больше 3 или меньше -3, перед вами гарантированный выброс (аномалия)." },
            { type: "tip", content: "Ресурс: Khan Academy (Statistics and Probability). Видеоуроки Сала Хана по нормальному распределению и Z-оценкам невероятно интуитивны. Они идеальны для построения математической базы с нуля." }
          ]
        },
        practice: {
          title: "Вычисление Z-Score",
          description: "Узнайте, является ли значение выбросом.",
          task: "У вас есть балл студента за тест (95), средний балл класса (70) и стандартное отклонение (10). Вычислите Z-score по формуле: (балл - среднее) / отклонение.",
          starterCode: "score = 95\nmean = 70\nstd_dev = 10\n\n# Вычислите Z-score\nz_score = \n\nprint(f\"Z-оценка равна: {z_score}\")\n# Если Z >= 2, студент написал тест аномально хорошо!"
        },
        type: "python"
      },
      {
        id: "stat-hypothesis",
        title: "Проверка гипотез и Нулевая гипотеза (H0)",
        theory: {
          sections: [
            { type: "heading", content: "Data-Driven решения" },
            { type: "text", content: "Допустим, вы перекрасили кнопку 'Купить' из синего в красный. Продажи выросли на 2%. Красная кнопка реально работает, или это просто случайность (повезло с днем недели)? Для ответа на этот вопрос мы используем Проверку Гипотез." },
            { type: "heading", content: "H0 и H1" },
            { type: "list", items: [
              "Нулевая гипотеза (H0): Статус-кво. Она гласит, что НИЧЕГО НЕ ИЗМЕНИЛОСЬ. (Например: 'Цвет кнопки никак не влияет на продажи').",
              "Альтернативная гипотеза (H1): Ваше утверждение. (Например: 'Красная кнопка увеличивает конверсию')."
            ]},
            { type: "text", content: "В статистике мы НИКОГДА не пытаемся 'доказать' H1. Вместо этого мы ищем математические доказательства, чтобы 'ОТВЕРГНУТЬ' нулевую гипотезу (H0). Это как презумпция невиновности в суде: цвет кнопки невиновен в росте продаж, пока не доказано обратное." }
          ]
        },
        practice: {
          title: "Формулирование гипотез",
          description: "Определите H0 и H1 для бизнес-задачи.",
          task: "Фармацевтическая компания выпускает новое лекарство, которое должно снижать давление. Присвойте переменным h0 и h1 строковые описания (на русском или английском), отражающие статистический подход.",
          starterCode: "# Опишите Нулевую и Альтернативную гипотезы текстом\n\n# H0: Лекарство НЕ влияет на давление\nh0 = \"\"\n\n# H1: Лекарство снижает давление\nh1 = \"\"\n\nprint(\"H0 (Нулевая):\", h0)\nprint(\"H1 (Альтернативная):\", h1)"
        },
        type: "python"
      },
      {
        id: "stat-pvalue",
        title: "P-value и Статистическая значимость",
        theory: {
          sections: [
            { type: "heading", content: "Что такое P-value?" },
            { type: "text", content: "P-value — это самый неправильно понимаемый концепт в Data Science. Простыми словами: P-value — это вероятность получить наши текущие данные (или еще более экстремальные), ЕСЛИ Нулевая Гипотеза (H0) ПРАВДИВА." },
            { type: "text", content: "Если p-value очень маленькое (обычно < 0.05), это означает: 'Шанс получить такой прирост продаж по чистой случайности — меньше 5%'. Раз это так маловероятно, значит случайности нет. Мы Отвергаем H0!" },
            { type: "heading", content: "Уровень значимости Alpha (α)" },
            { type: "text", content: "До проведения теста мы задаем порог 'сюрприза' — Alpha (обычно 0.05 или 5%). Если p-value < Alpha, мы говорим, что результат Статистически Значим (Statistically Significant)." },
            { type: "tip", content: "Ресурс: StatQuest with Josh Starmer (YouTube). Джош объясняет сложнейшую математику через простые рисунки и песенки. Его видео 'p-values: What they are and how to interpret them' — абсолютная классика. 'BAM!'" }
          ]
        },
        practice: {
          title: "Интерпретация P-value",
          description: "Напишите функцию для принятия решения по H0.",
          task: "Напишите функцию `check_significance(p_value, alpha)`, которая возвращает строку 'Отвергаем H0' (если p_value < alpha), и 'Не удалось отвергнуть H0' в противном случае.",
          starterCode: "def check_significance(p_value, alpha=0.05):\n    # Напишите логику if/else\n    \n\n# Тестируем. Наш A/B тест выдал p-value = 0.02\nresult = check_significance(0.02)\nprint(\"Тест 1 (p=0.02):\", result)\n\n# Другой тест выдал p=0.15\nresult2 = check_significance(0.15)\nprint(\"Тест 2 (p=0.15):\", result2)"
        },
        type: "python"
      },
      {
        id: "stat-ab-testing",
        title: "A/B Тестирование на практике (T-Test)",
        theory: {
          sections: [
            { type: "heading", content: "Сравнение двух групп" },
            { type: "text", content: "A/B тестирование — золотой стандарт в продуктовой аналитике. Вы делите трафик на две группы: Группа А (Контрольная - старый дизайн) и Группа B (Тестовая - новый дизайн). Затем вы сравниваете их метрики." },
            { type: "heading", content: "T-Критерий Стьюдента (T-Test)" },
            { type: "text", content: "Чтобы сравнить СРЕДНИЕ значения двух непрерывных выборок (например, время на сайте в секундах или средний чек), используется Независимый T-тест (Independent T-Test)." },
            { type: "code", content: "from scipy import stats\n\n# Запуск T-теста\nt_stat, p_value = stats.ttest_ind(group_a, group_b)\n\nif p_value < 0.05:\n    print('Разница статистически значима!')" },
            { type: "text", content: "T-тест смотрит на две вещи: разницу между средними и дисперсию (шум) внутри групп. Большая разница при низком шуме генерирует крошечный p-value!" }
          ]
        },
        practice: {
          title: "Проведение A/B Теста",
          description: "Используйте SciPy для сравнения выборок.",
          task: "У нас есть данные о времени, проведенном на сайте (в секундах). Используйте функцию scipy.stats.ttest_ind для вычисления p-value. Затем выведите решение: успешен ли новый дизайн.",
          starterCode: "import numpy as np\nfrom scipy import stats\n\n# Данные: время на сайте\n# Группа A (Старый дизайн)\ncontrol = np.array([120, 115, 130, 110, 125, 118])\n# Группа B (Новый дизайн)\ntreatment = np.array([145, 140, 155, 150, 160, 148])\n\n# 1. Вычислите t-статистику и p-value\nt_stat, p_value = \n\nprint(f\"P-value: {p_value:.4f}\")\n\n# 2. Проверка значимости (Alpha = 0.05)\nif p_value < 0.05:\n    print(\"УСПЕХ: Новый дизайн статистически лучше!\")\nelse:\n    print(\"ПРОВАЛ: Разница случайна.\")"
        },
        type: "python"
      }
    ]
  }
};