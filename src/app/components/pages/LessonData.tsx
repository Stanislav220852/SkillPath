export const lessonData: Record<string, Record<'EN' | 'RU', any>> = {
  "html-css": {
    EN: {
      title: "HTML & CSS",
      description: "The foundation of all web development. Learn to structure and style web pages.",
      lessons: [
        {
          id: "html-basics",
          title: "HTML Basics",
          theory: {
            sections: [
              { type: "heading", content: "What is HTML?" },
              { type: "text", content: "HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page using a series of elements." },
              { type: "heading", content: "Basic HTML Structure" },
              { type: "text", content: "Every HTML document follows a basic structure:" },
              { type: "code", content: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>My Page</title>\n  </head>\n  <body>\n    <h1>Hello World!</h1>\n    <p>This is my first page.</p>\n  </body>\n</html>' },
              { type: "heading", content: "Common HTML Elements" },
              { type: "list", items: [
                "<h1> to <h6> — Headings of different levels",
                "<p> — Paragraphs of text",
                "<a> — Links to other pages",
                "<img> — Images",
                "<div> — Block-level containers",
                "<span> — Inline containers"
              ]},
              { type: "tip", content: "Always use semantic HTML elements when possible. They improve accessibility and SEO!" }
            ]
          },
          practice: {
            title: "Create Your First HTML Page",
            description: "Write a simple HTML page with a heading, paragraph, and link.",
            task: "Create an HTML document that displays a heading, a paragraph about yourself, and a link to your favorite website.",
            starterCode: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My First Page</title>\n</head>\n<body>\n  <!-- Write your HTML here -->\n  <h1>Welcome!</h1>\n  <p>This is my first web page.</p>\n  <a href="https://example.com">Visit Example</a>\n</body>\n</html>',
          },
          type: "html-css-js"
        },
        {
          id: "css-styling",
          title: "CSS Styling",
          theory: {
            sections: [
              { type: "heading", content: "What is CSS?" },
              { type: "text", content: "CSS (Cascading Style Sheets) is used to style and layout web pages. It controls colors, fonts, spacing, positioning, and much more." },
              { type: "heading", content: "CSS Syntax" },
              { type: "code", content: 'selector {\n  property: value;\n  property2: value2;\n}\n\n/* Example */\nh1 {\n  color: blue;\n  font-size: 24px;\n  text-align: center;\n}' },
              { type: "heading", content: "Ways to Add CSS" },
              { type: "list", items: [
                "Inline — Using the style attribute on elements",
                "Internal — Using a <style> tag in the <head>",
                "External — Linking a separate .css file (recommended)"
              ]},
              { type: "tip", content: "Always use external stylesheets for real projects. It keeps your HTML clean and makes styling reusable!" }
            ]
          },
          practice: {
            title: "Style Your Page",
            description: "Add CSS to style the HTML page you created.",
            task: "Create CSS that changes the heading color, centers the text, and adds padding to the paragraph.",
            starterCode: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Styled Page</title>\n  <style>\n    body {\n      font-family: Arial, sans-serif;\n      background: #f0f4f8;\n      padding: 40px;\n    }\n    /* Add your styles below */\n    h1 {\n      color: #3b82f6;\n      text-align: center;\n    }\n    p {\n      background: white;\n      padding: 20px;\n      border-radius: 8px;\n      box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n    }\n  </style>\n</head>\n<body>\n  <h1>My Styled Page</h1>\n  <p>This paragraph has custom styling!</p>\n</body>\n</html>',
          },
          type: "html-css-js"
        },
        {
          id: "flexbox",
          title: "Flexbox Layout",
          theory: {
            sections: [
              { type: "heading", content: "What is Flexbox?" },
              { type: "text", content: "Flexbox is a one-dimensional layout method for arranging items in rows or columns. It makes it easy to align, distribute, and order items within a container." },
              { type: "heading", content: "Key Flexbox Properties" },
              { type: "code", content: '.container {\n  display: flex;\n  justify-content: center;    /* horizontal alignment */\n  align-items: center;        /* vertical alignment */\n  gap: 16px;                  /* space between items */\n  flex-wrap: wrap;            /* allow wrapping */\n}' },
              { type: "heading", content: "Flexbox Properties for Items" },
              { type: "list", items: [
                "flex: 1 — Makes item grow to fill available space",
                "flex-basis — Initial size before growing/shrinking",
                "order — Changes visual order of items",
                "align-self — Overrides container alignment for one item"
              ]},
              { type: "tip", content: "Use flexbox for one-dimensional layouts (rows OR columns). For two-dimensional layouts, use CSS Grid!" }
            ]
          },
          practice: {
            title: "Build a Flexbox Navigation",
            description: "Create a responsive navigation bar using Flexbox.",
            task: "Build a nav bar with logo on the left and links on the right that wraps on small screens.",
            starterCode: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Flexbox Nav</title>\n  <style>\n    * { margin: 0; padding: 0; box-sizing: border-box; }\n    body { font-family: Arial, sans-serif; }\n    \n    .navbar {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      padding: 16px 24px;\n      background: #1e293b;\n      color: white;\n      flex-wrap: wrap;\n      gap: 12px;\n    }\n    \n    .logo { font-size: 20px; font-weight: bold; }\n    \n    .nav-links {\n      display: flex;\n      gap: 20px;\n      list-style: none;\n    }\n    \n    .nav-links a {\n      color: #94a3b8;\n      text-decoration: none;\n      transition: color 0.2s;\n    }\n    \n    .nav-links a:hover { color: white; }\n  </style>\n</head>\n<body>\n  <nav class="navbar">\n    <div class="logo">🚀 MyBrand</div>\n    <ul class="nav-links">\n      <li><a href="#">Home</a></li>\n      <li><a href="#">About</a></li>\n      <li><a href="#">Services</a></li>\n      <li><a href="#">Contact</a></li>\n    </ul>\n  </nav>\n</body>\n</html>',
          },
          type: "html-css-js"
        },
        {
          id: "css-grid",
          title: "CSS Grid",
          theory: {
            sections: [
              { type: "heading", content: "What is CSS Grid?" },
              { type: "text", content: "CSS Grid is a two-dimensional layout system that lets you create complex web layouts with rows and columns. It's perfect for page layouts, card grids, and dashboards." },
              { type: "heading", content: "Basic Grid Setup" },
              { type: "code", content: '.container {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;  /* 3 equal columns */\n  grid-template-rows: auto auto;        /* 2 rows */\n  gap: 20px;                            /* space between cells */\n}' },
              { type: "heading", content: "Useful Grid Features" },
              { type: "list", items: [
                "repeat(3, 1fr) — Shorthand for repeating columns",
                "minmax(200px, 1fr) — Flexible sizing with min/max",
                "grid-column: span 2 — Make item span multiple columns",
                "auto-fit / auto-fill — Responsive grids without media queries"
              ]},
              { type: "tip", content: "Combine Grid for the overall layout with Flexbox for component-level alignment for the best results!" }
            ]
          },
          practice: {
            title: "Build a Card Grid",
            description: "Create a responsive card layout using CSS Grid.",
            task: "Build a grid of cards that automatically adjusts from 3 columns to 1 column on smaller screens.",
            starterCode: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Grid Cards</title>\n  <style>\n    * { margin: 0; padding: 0; box-sizing: border-box; }\n    body {\n      font-family: system-ui, sans-serif;\n      background: #f1f5f9;\n      padding: 32px;\n    }\n    \n    .grid {\n      display: grid;\n      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n      gap: 24px;\n      max-width: 1000px;\n      margin: 0 auto;\n    }\n    \n    .card {\n      background: white;\n      border-radius: 12px;\n      padding: 24px;\n      box-shadow: 0 2px 8px rgba(0,0,0,0.08);\n      transition: transform 0.2s;\n    }\n    \n    .card:hover { transform: translateY(-4px); }\n    .card h3 { color: #1e293b; margin-bottom: 8px; }\n    .card p { color: #64748b; font-size: 14px; line-height: 1.5; }\n    .card .tag {\n      display: inline-block;\n      padding: 4px 12px;\n      background: #e0f2fe;\n      color: #0284c7;\n      border-radius: 999px;\n      font-size: 12px;\n      font-weight: 600;\n      margin-top: 12px;\n    }\n  </style>\n</head>\n<body>\n  <div class="grid">\n    <div class="card">\n      <h3>🎨 Design</h3>\n      <p>Learn the principles of great visual design and create beautiful interfaces.</p>\n      <span class="tag">Creative</span>\n    </div>\n    <div class="card">\n      <h3>💻 Development</h3>\n      <p>Build interactive websites and applications using modern frameworks.</p>\n      <span class="tag">Technical</span>\n    </div>\n    <div class="card">\n      <h3>📊 Analytics</h3>\n      <p>Transform raw data into meaningful insights and visualizations.</p>\n      <span class="tag">Data</span>\n    </div>\n  </div>\n</body>\n</html>',
          },
          type: "html-css-js"
        }
      ]
    },
    RU: {
      title: "HTML & CSS",
      description: "Основа всей веб-разработки. Научись структурировать и стилизовать веб-страницы.",
      lessons: [
        {
          id: "html-basics",
          title: "Основы HTML",
          theory: {
            sections: [
              { type: "heading", content: "Что такое HTML?" },
              { type: "text", content: "HTML (HyperText Markup Language) — это стандартный язык разметки для создания веб-страниц. Он описывает структуру страницы с помощью элементов." },
              { type: "heading", content: "Базовая структура HTML" },
              { type: "text", content: "Каждый HTML-документ имеет базовую структуру:" },
              { type: "code", content: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Моя страница</title>\n  </head>\n  <body>\n    <h1>Привет, мир!</h1>\n    <p>Это моя первая страница.</p>\n  </body>\n</html>' },
              { type: "heading", content: "Основные HTML-элементы" },
              { type: "list", items: [
                "<h1> до <h6> — Заголовки разных уровней",
                "<p> — Абзацы текста",
                "<a> — Ссылки на другие страницы",
                "<img> — Изображения",
                "<div> — Блочные контейнеры",
                "<span> — Строчные контейнеры"
              ]},
              { type: "tip", content: "Всегда используй семантические HTML-элементы. Они улучшают доступность и SEO!" }
            ]
          },
          practice: {
            title: "Создай свою первую HTML-страницу",
            description: "Напиши простую HTML-страницу с заголовком, абзацем и ссылкой.",
            task: "Создай HTML-документ с заголовком, абзацем о себе и ссылкой на любимый сайт.",
            starterCode: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Моя первая страница</title>\n</head>\n<body>\n  <!-- Пиши свой HTML здесь -->\n  <h1>Добро пожаловать!</h1>\n  <p>Это моя первая веб-страница.</p>\n  <a href="https://example.com">Посетить Example</a>\n</body>\n</html>',
          },
          type: "html-css-js"
        },
        {
          id: "css-styling",
          title: "CSS Стилизация",
          theory: {
            sections: [
              { type: "heading", content: "Что такое CSS?" },
              { type: "text", content: "CSS (Cascading Style Sheets) используется для стилизации и компоновки веб-страниц. Он управляет цветами, шрифтами, отступами, позиционированием и многим другим." },
              { type: "heading", content: "Синтаксис CSS" },
              { type: "code", content: 'селектор {\n  свойство: значение;\n  свойство2: значение2;\n}\n\n/* Пример */\nh1 {\n  color: blue;\n  font-size: 24px;\n  text-align: center;\n}' },
              { type: "heading", content: "Способы добавления CSS" },
              { type: "list", items: [
                "Inline — Через атрибут style на элементах",
                "Internal — Через тег <style> в <head>",
                "External — Подключение отдельного .css файла (рекомендуется)"
              ]},
              { type: "tip", content: "Всегда используй внешние таблицы стилей для реальных проектов. Это делает HTML чистым!" }
            ]
          },
          practice: {
            title: "Стилизуй свою страницу",
            description: "Добавь CSS для стилизации созданной HTML-страницы.",
            task: "Создай CSS, который меняет цвет заголовка, центрирует текст и добавляет отступы.",
            starterCode: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Стилизованная страница</title>\n  <style>\n    body {\n      font-family: Arial, sans-serif;\n      background: #f0f4f8;\n      padding: 40px;\n    }\n    /* Добавь свои стили ниже */\n    h1 {\n      color: #3b82f6;\n      text-align: center;\n    }\n    p {\n      background: white;\n      padding: 20px;\n      border-radius: 8px;\n      box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n    }\n  </style>\n</head>\n<body>\n  <h1>Моя стилизованная страница</h1>\n  <p>Этот абзац имеет кастомный стиль!</p>\n</body>\n</html>',
          },
          type: "html-css-js"
        },
        {
          id: "flexbox",
          title: "Flexbox Layout",
          theory: {
            sections: [
              { type: "heading", content: "Что такое Flexbox?" },
              { type: "text", content: "Flexbox — это одномерный метод компоновки для расположения элементов в строках или столбцах. Он упрощает выравнивание, распределение и порядок элементов." },
              { type: "heading", content: "Ключевые свойства Flexbox" },
              { type: "code", content: '.container {\n  display: flex;\n  justify-content: center;    /* горизонтальное выравнивание */\n  align-items: center;        /* вертикальное выравнивание */\n  gap: 16px;                  /* пространство между элементами */\n  flex-wrap: wrap;            /* разрешить перенос */\n}' },
              { type: "heading", content: "Свойства для элементов" },
              { type: "list", items: [
                "flex: 1 — Элемент растягивается на доступное пространство",
                "flex-basis — Начальный размер до растяжения/сжатия",
                "order — Меняет визуальный порядок элементов",
                "align-self — Переопределяет выравнивание для одного элемента"
              ]},
              { type: "tip", content: "Используй flexbox для одномерных布局 (строки ИЛИ столбцы). Для двумерных — CSS Grid!" }
            ]
          },
          practice: {
            title: "Построй Flexbox навигацию",
            description: "Создай адаптивную панель навигации с помощью Flexbox.",
            task: "Построй навбар с логотипом слева и ссылками справа, который переносится на маленьких экранах.",
            starterCode: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Flexbox Nav</title>\n  <style>\n    * { margin: 0; padding: 0; box-sizing: border-box; }\n    body { font-family: Arial, sans-serif; }\n    \n    .navbar {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      padding: 16px 24px;\n      background: #1e293b;\n      color: white;\n      flex-wrap: wrap;\n      gap: 12px;\n    }\n    \n    .logo { font-size: 20px; font-weight: bold; }\n    \n    .nav-links {\n      display: flex;\n      gap: 20px;\n      list-style: none;\n    }\n    \n    .nav-links a {\n      color: #94a3b8;\n      text-decoration: none;\n      transition: color 0.2s;\n    }\n    \n    .nav-links a:hover { color: white; }\n  </style>\n</head>\n<body>\n  <nav class="navbar">\n    <div class="logo">🚀 MyBrand</div>\n    <ul class="nav-links">\n      <li><a href="#">Главная</a></li>\n      <li><a href="#">О нас</a></li>\n      <li><a href="#">Услуги</a></li>\n      <li><a href="#">Контакты</a></li>\n    </ul>\n  </nav>\n</body>\n</html>',
          },
          type: "html-css-js"
        },
        {
          id: "css-grid",
          title: "CSS Grid",
          theory: {
            sections: [
              { type: "heading", content: "Что такое CSS Grid?" },
              { type: "text", content: "CSS Grid — это двумерная система компоновки, позволяющая создавать сложные веб-макеты со строками и столбцами. Идеально подходит для макетов страниц, сеток карточек и дашбордов." },
              { type: "heading", content: "Базовая настройка Grid" },
              { type: "code", content: '.container {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;  /* 3 равных столбца */\n  grid-template-rows: auto auto;        /* 2 строки */\n  gap: 20px;                            /* пространство между ячейками */\n}' },
              { type: "heading", content: "Полезные возможности Grid" },
              { type: "list", items: [
                "repeat(3, 1fr) — Сокращение для повторяющихся столбцов",
                "minmax(200px, 1fr) — Гибкий размер с мин/макс",
                "grid-column: span 2 — Элемент занимает несколько столбцов",
                "auto-fit / auto-fill — Адаптивные сетки без media queries"
              ]},
              { type: "tip", content: "Комбинируй Grid для общего макета с Flexbox для выравнивания компонентов!" }
            ]
          },
          practice: {
            title: "Построй сетку карточек",
            description: "Создай адаптивный макет карточек с помощью CSS Grid.",
            task: "Построй сетку карточек, которая автоматически переходит от 3 колонок к 1 на маленьких экранах.",
            starterCode: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Grid Cards</title>\n  <style>\n    * { margin: 0; padding: 0; box-sizing: border-box; }\n    body {\n      font-family: system-ui, sans-serif;\n      background: #f1f5f9;\n      padding: 32px;\n    }\n    \n    .grid {\n      display: grid;\n      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n      gap: 24px;\n      max-width: 1000px;\n      margin: 0 auto;\n    }\n    \n    .card {\n      background: white;\n      border-radius: 12px;\n      padding: 24px;\n      box-shadow: 0 2px 8px rgba(0,0,0,0.08);\n      transition: transform 0.2s;\n    }\n    \n    .card:hover { transform: translateY(-4px); }\n    .card h3 { color: #1e293b; margin-bottom: 8px; }\n    .card p { color: #64748b; font-size: 14px; line-height: 1.5; }\n    .card .tag {\n      display: inline-block;\n      padding: 4px 12px;\n      background: #e0f2fe;\n      color: #0284c7;\n      border-radius: 999px;\n      font-size: 12px;\n      font-weight: 600;\n      margin-top: 12px;\n    }\n  </style>\n</head>\n<body>\n  <div class="grid">\n    <div class="card">\n      <h3>🎨 Дизайн</h3>\n      <p>Изучи принципы отличного визуального дизайна и создавай красивые интерфейсы.</p>\n      <span class="tag">Креатив</span>\n    </div>\n    <div class="card">\n      <h3>💻 Разработка</h3>\n      <p>Создавай интерактивные сайты и приложения с помощью современных фреймворков.</p>\n      <span class="tag">Технический</span>\n    </div>\n    <div class="card">\n      <h3>📊 Аналитика</h3>\n      <p>Превращай сырые данные в значимые инсайты и визуализации.</p>\n      <span class="tag">Данные</span>\n    </div>\n  </div>\n</body>\n</html>',
          },
          type: "html-css-js"
        }
      ]
    }
  },
  "js-core": {
    EN: {
      title: "JavaScript Core",
      description: "Learn the fundamentals of JavaScript — the language that powers the web.",
      lessons: [
        {
          id: "variables",
          title: "Variables & Types",
          theory: {
            sections: [
              { type: "heading", content: "What are Variables?" },
              { type: "text", content: "Variables are containers for storing data values. In JavaScript, you can declare variables using let, const, or var." },
              { type: "heading", content: "Declaring Variables" },
              { type: "code", content: '// Using let (can be reassigned)\nlet age = 25;\nage = 26;\n\n// Using const (cannot be reassigned)\nconst name = "John";\n// name = "Jane"; // ERROR!\n\n// Using var (old way, avoid in modern JS)\nvar city = "New York";' },
              { type: "heading", content: "Data Types" },
              { type: "list", items: [
                "String — Text in quotes: 'Hello', \"World\"",
                "Number — Integers and decimals: 42, 3.14",
                "Boolean — true or false",
                "Array — Ordered list: [1, 2, 3]",
                "Object — Key-value pairs: {name: 'John', age: 25}",
                "null — Intentional absence of value",
                "undefined — Variable declared but not assigned"
              ]},
              { type: "tip", content: "Always prefer const over let, and let over var. Only use var when you specifically need function-scoped variables." }
            ]
          },
          practice: {
            title: "Work with Variables",
            description: "Declare variables of different types and log them.",
            task: "Create variables for your name, age, a list of hobbies, and a boolean indicating if you like coding.",
            starterCode: '// Declare your variables here\nconst name = "Your Name";\nlet age = 20;\nconst hobbies = ["coding", "gaming", "reading"];\nconst likesCoding = true;\n\n// Log them to the console\nconsole.log("Name:", name);\nconsole.log("Age:", age);\nconsole.log("Hobbies:", hobbies);\nconsole.log("Likes Coding:", likesCoding);\n\n// Try changing age and logging again\nage = 21;\nconsole.log("New Age:", age);',
          },
          type: "javascript"
        },
        {
          id: "functions",
          title: "Functions",
          theory: {
            sections: [
              { type: "heading", content: "What are Functions?" },
              { type: "text", content: "Functions are reusable blocks of code that perform a specific task. They can accept inputs (parameters) and return outputs." },
              { type: "heading", content: "Function Declaration" },
              { type: "code", content: '// Traditional function\nfunction greet(name) {\n  return "Hello, " + name + "!";\n}\n\n// Arrow function (modern)\nconst greet = (name) => {\n  return `Hello, ${name}!`;\n};\n\n// Short arrow function\nconst greet = (name) => `Hello, ${name}!`;\n\n// Calling the function\nconsole.log(greet("World")); // Hello, World!' },
              { type: "heading", content: "Function Parameters & Return" },
              { type: "list", items: [
                "Parameters are placeholders for values passed into a function",
                "Return statement sends a value back to the caller",
                "Functions without return return undefined",
                "You can have default parameter values: (a, b = 10)"
              ]},
              { type: "tip", content: "Arrow functions are the modern standard. Use them unless you need the 'this' keyword behavior of regular functions." }
            ]
          },
          practice: {
            title: "Create Functions",
            description: "Write functions that perform calculations and return results.",
            task: "Create a function that calculates the area of a rectangle and another that converts Celsius to Fahrenheit.",
            starterCode: '// Function to calculate rectangle area\nfunction rectangleArea(width, height) {\n  return width * height;\n}\n\n// Arrow function for temperature conversion\nconst celsiusToFahrenheit = (celsius) => {\n  return (celsius * 9/5) + 32;\n};\n\n// Test your functions\nconsole.log("Area (5x3):", rectangleArea(5, 3));\nconsole.log("20°C in F:", celsiusToFahrenheit(20));\nconsole.log("0°C in F:", celsiusToFahrenheit(0));\nconsole.log("100°C in F:", celsiusToFahrenheit(100));\n\n// Try creating your own function!\nconst greet = (name, language = "EN") => {\n  if (language === "RU") return `Привет, ${name}!`;\n  return `Hello, ${name}!`;\n};\nconsole.log(greet("Developer", "RU"));',
          },
          type: "javascript"
        },
        {
          id: "arrays",
          title: "Arrays & Loops",
          theory: {
            sections: [
              { type: "heading", content: "What are Arrays?" },
              { type: "text", content: "Arrays are ordered collections of values. They can hold any type of data and have built-in methods for manipulation." },
              { type: "heading", content: "Common Array Methods" },
              { type: "code", content: 'const fruits = ["apple", "banana", "cherry"];\n\n// Add/remove elements\nfruits.push("date");       // Add to end\nfruits.unshift("apricot"); // Add to start\nfruits.pop();              // Remove from end\n\n// Transform arrays\nconst nums = [1, 2, 3, 4, 5];\nconst doubled = nums.map(n => n * 2);\n// [2, 4, 6, 8, 10]\n\nconst even = nums.filter(n => n % 2 === 0);\n// [2, 4]\n\nconst sum = nums.reduce((acc, n) => acc + n, 0);\n// 15' },
              { type: "heading", content: "Loops" },
              { type: "list", items: [
                "for — Classic loop with counter",
                "for...of — Iterate over array values",
                "for...in — Iterate over object keys",
                "forEach — Array method for iteration",
                "while — Loop while condition is true"
              ]},
              { type: "tip", content: "Modern JavaScript favors array methods (map, filter, reduce) over traditional for loops for cleaner, more readable code." }
            ]
          },
          practice: {
            title: "Work with Arrays",
            description: "Use array methods and loops to process data.",
            task: "Create an array of numbers, filter even ones, double them, and calculate the sum.",
            starterCode: '// Array of numbers\nconst numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\n// Filter even numbers\nconst evenNumbers = numbers.filter(n => n % 2 === 0);\nconsole.log("Even:", evenNumbers);\n\n// Double all numbers\nconst doubled = numbers.map(n => n * 2);\nconsole.log("Doubled:", doubled);\n\n// Sum all numbers\nconst sum = numbers.reduce((acc, n) => acc + n, 0);\nconsole.log("Sum:", sum);\n\n// Find the largest number\nconst largest = Math.max(...numbers);\nconsole.log("Largest:", largest);\n\n// Try your own array manipulation!\nconst words = ["hello", "world", "javascript", "is", "awesome"];\nconst longWords = words.filter(w => w.length > 4);\nconsole.log("Long words:", longWords);',
          },
          type: "javascript"
        },
        {
          id: "dom",
          title: "DOM Manipulation",
          theory: {
            sections: [
              { type: "heading", content: "What is the DOM?" },
              { type: "text", content: "The Document Object Model (DOM) is a programming interface for HTML. It represents the page as a tree of objects that JavaScript can manipulate." },
              { type: "heading", content: "Selecting Elements" },
              { type: "code", content: '// By ID\nconst header = document.getElementById("header");\n\n// By CSS selector (first match)\nconst btn = document.querySelector(".btn-primary");\n\n// All matching elements\nconst items = document.querySelectorAll(".item");\n\n// Changing content\nheader.textContent = "New Title";\nheader.innerHTML = "<strong>Bold Title</strong>";' },
              { type: "heading", content: "Event Listeners" },
              { type: "code", content: '// Adding click event\nbutton.addEventListener("click", () => {\n  console.log("Button clicked!");\n});\n\n// Event with data\nform.addEventListener("submit", (e) => {\n  e.preventDefault(); // Stop form submission\n  console.log("Form submitted!");\n});' },
              { type: "list", items: [
                "textContent — Change text of an element",
                "style — Change inline CSS properties",
                "classList.add/remove/toggle — Modify CSS classes",
                "createElement / append — Add new elements dynamically"
              ]},
              { type: "tip", content: "In real projects, frameworks like React handle DOM manipulation for you. But understanding the DOM is essential!" }
            ]
          },
          practice: {
            title: "DOM Practice",
            description: "Since we can't manipulate a real DOM in this editor, let's practice the concepts.",
            task: "Write code that demonstrates understanding of DOM methods. Imagine you're working with a real page.",
            starterCode: '// In a browser, this code would:\n// 1. Select elements\n// 2. Add event listeners\n// 3. Modify the DOM\n\n// Simulated DOM operations:\nconst simulatedDOM = {\n  getElementById: (id) => ({ id, text: "", style: {} }),\n  querySelector: (sel) => ({ selector: sel }),\n  createElements: (tag) => ({ tag, children: [] })\n};\n\n// Example: Creating a todo list\nconst todoList = {\n  items: [],\n  addItem(text) {\n    this.items.push({ text, done: false });\n    console.log("Added:", text);\n  },\n  toggleItem(index) {\n    this.items[index].done = !this.items[index].done;\n    console.log("Toggled item", index);\n  },\n  render() {\n    this.items.forEach((item, i) => {\n      console.log(`${i + 1}. [${item.done ? "x" : " "}] ${item.text}`);\n    });\n  }\n};\n\ntodoList.addItem("Learn JavaScript");\ntodoList.addItem("Practice DOM");\ntodoList.addItem("Build a project");\ntodoList.render();\n\nconsole.log("--- After toggling ---");\ntodoList.toggleItem(0);\ntodoList.render();',
          },
          type: "javascript"
        }
      ]
    },
    RU: {
      title: "JavaScript Core",
      description: "Изучи основы JavaScript — языка, который управляет вебом.",
      lessons: [
        {
          id: "variables",
          title: "Переменные и типы",
          theory: {
            sections: [
              { type: "heading", content: "Что такое переменные?" },
              { type: "text", content: "Переменные — это контейнеры для хранения данных. В JavaScript можно объявлять переменные с помощью let, const или var." },
              { type: "heading", content: "Объявление переменных" },
              { type: "code", content: '// Используя let (можно перезаписать)\nlet age = 25;\nage = 26;\n\n// Используя const (нельзя перезаписать)\nconst name = "Иван";\n// name = "Пётр"; // ОШИБКА!\n\n// Используя var (старый способ, избегай)\nvar city = "Москва";' },
              { type: "heading", content: "Типы данных" },
              { type: "list", items: [
                "String — Текст в кавычках: 'Привет', \"Мир\"",
                "Number — Целые и дробные: 42, 3.14",
                "Boolean — true или false",
                "Array — Упорядоченный список: [1, 2, 3]",
                "Object — Пары ключ-значение: {name: 'Иван', age: 25}",
                "null — Намеренное отсутствие значения",
                "undefined — Переменная объявлена, но не задана"
              ]},
              { type: "tip", content: "Всегда предпочитай const вместо let, и let вместо var." }
            ]
          },
          practice: {
            title: "Работа с переменными",
            description: "Объяви переменные разных типов и выведи их.",
            task: "Создай переменные для имени, возраста, списка хобби и булево значение.",
            starterCode: '// Объяви свои переменные\nconst name = "Твоё Имя";\nlet age = 20;\nconst hobbies = ["программирование", "игры", "чтение"];\nconst likesCoding = true;\n\n// Выведи их в консоль\nconsole.log("Имя:", name);\nconsole.log("Возраст:", age);\nconsole.log("Хобби:", hobbies);\nconsole.log("Любит кодить:", likesCoding);\n\n// Попробуй изменить возраст\nage = 21;\nconsole.log("Новый возраст:", age);',
          },
          type: "javascript"
        },
        {
          id: "functions",
          title: "Функции",
          theory: {
            sections: [
              { type: "heading", content: "Что такое функции?" },
              { type: "text", content: "Функции — это переиспользуемые блоки кода, которые выполняют определённую задачу. Они могут принимать входные данные (параметры) и возвращать результат." },
              { type: "heading", content: "Объявление функций" },
              { type: "code", content: '// Традиционная функция\nfunction greet(name) {\n  return "Привет, " + name + "!";\n}\n\n// Стрелочная функция (современная)\nconst greet = (name) => {\n  return `Привет, ${name}!`;\n};\n\n// Короткая стрелочная функция\nconst greet = (name) => `Привет, ${name}!`;\n\n// Вызов функции\nconsole.log(greet("Мир")); // Привет, Мир!' },
              { type: "heading", content: "Параметры и возвращаемое значение" },
              { type: "list", items: [
                "Параметры — placeholders для значений, передаваемых в функцию",
                "Return — возвращает значение вызывающему коду",
                "Функции без return возвращают undefined",
                "Можно задать значения по умолчанию: (a, b = 10)"
              ]},
              { type: "tip", content: "Стрелочные функции — современный стандарт. Используй их, если не нужен 'this' обычных функций." }
            ]
          },
          practice: {
            title: "Создание функций",
            description: "Напиши функции для вычислений.",
            task: "Создай функцию для площади прямоугольника и конвертации Цельсия в Фаренгейт.",
            starterCode: '// Функция площади прямоугольника\nfunction rectangleArea(width, height) {\n  return width * height;\n}\n\n// Стрелочная функция конвертации температуры\nconst celsiusToFahrenheit = (celsius) => {\n  return (celsius * 9/5) + 32;\n};\n\n// Тестируй функции\nconsole.log("Площадь (5x3):", rectangleArea(5, 3));\nconsole.log("20°C в F:", celsiusToFahrenheit(20));\n\n// Создай свою функцию!\nconst greet = (name, language = "RU") => {\n  if (language === "EN") return `Hello, ${name}!`;\n  return `Привет, ${name}!`;\n};\nconsole.log(greet("Разработчик", "EN"));',
          },
          type: "javascript"
        },
        {
          id: "arrays",
          title: "Массивы и циклы",
          theory: {
            sections: [
              { type: "heading", content: "Что такое массивы?" },
              { type: "text", content: "Массивы — это упорядоченные коллекции значений. Они могут содержать любой тип данных и имеют встроенные методы для манипуляции." },
              { type: "heading", content: "Основные методы массивов" },
              { type: "code", content: 'const fruits = ["яблоко", "банан", "вишня"];\n\n// Добавление/удаление\nfruits.push("финик");       // В конец\nfruits.unshift("абрикос"); // В начало\nfruits.pop();              // Удалить последний\n\n// Трансформация\nconst nums = [1, 2, 3, 4, 5];\nconst doubled = nums.map(n => n * 2);\n// [2, 4, 6, 8, 10]\n\nconst even = nums.filter(n => n % 2 === 0);\n// [2, 4]\n\nconst sum = nums.reduce((acc, n) => acc + n, 0);\n// 15' },
              { type: "heading", content: "Циклы" },
              { type: "list", items: [
                "for — Классический цикл со счётчиком",
                "for...of — Итерация по значениям массива",
                "for...in — Итерация по ключам объекта",
                "forEach — Метод массива для итерации",
                "while — Цикл пока условие истинно"
              ]},
              { type: "tip", content: "Современный JS предпочитает методы массивов (map, filter, reduce) вместо классических for циклов." }
            ]
          },
          practice: {
            title: "Работа с массивами",
            description: "Используй методы массивов для обработки данных.",
            task: "Создай массив чисел, отфильтруй чётные, удвой их и посчитай сумму.",
            starterCode: '// Массив чисел\nconst numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\n// Фильтр чётных\nconst evenNumbers = numbers.filter(n => n % 2 === 0);\nconsole.log("Чётные:", evenNumbers);\n\n// Удвоение\nconst doubled = numbers.map(n => n * 2);\nconsole.log("Удвоенные:", doubled);\n\n// Сумма\nconst sum = numbers.reduce((acc, n) => acc + n, 0);\nconsole.log("Сумма:", sum);\n\n// Попробуй свою манипуляцию!\nconst words = ["привет", "мир", "javascript", "это", "круто"];\nconst longWords = words.filter(w => w.length > 4);\nconsole.log("Длинные слова:", longWords);',
          },
          type: "javascript"
        },
        {
          id: "dom",
          title: "DOM манипуляции",
          theory: {
            sections: [
              { type: "heading", content: "Что такое DOM?" },
              { type: "text", content: "Document Object Model (DOM) — это программный интерфейс для HTML. Он представляет страницу как дерево объектов, которыми может управлять JavaScript." },
              { type: "heading", content: "Выбор элементов" },
              { type: "code", content: '// По ID\nconst header = document.getElementById("header");\n\n// По CSS селектору (первый)\nconst btn = document.querySelector(".btn-primary");\n\n// Все совпадающие\nconst items = document.querySelectorAll(".item");' },
              { type: "heading", content: "Обработчики событий" },
              { type: "code", content: '// Добавление события клика\nbutton.addEventListener("click", () => {\n  console.log("Кнопка нажата!");\n});\n\n// Событие с данными\nform.addEventListener("submit", (e) => {\n  e.preventDefault(); // Остановить отправку\n  console.log("Форма отправлена!");\n});' },
              { type: "list", items: [
                "textContent — Изменить текст элемента",
                "style — Изменить inline CSS свойства",
                "classList.add/remove/toggle — Изменить CSS классы",
                "createElement / append — Добавить новые элементы"
              ]},
              { type: "tip", content: "В реальных проектах фреймворки вроде React управляют DOM за тебя. Но понимание DOM необходимо!" }
            ]
          },
          practice: {
            title: "DOM практика",
            description: "Практикуй концепции DOM в симуляции.",
            task: "Напиши код, демонстрирующий понимание методов DOM.",
            starterCode: '// Симуляция операций с DOM:\nconst todoList = {\n  items: [],\n  addItem(text) {\n    this.items.push({ text, done: false });\n    console.log("Добавлено:", text);\n  },\n  toggleItem(index) {\n    this.items[index].done = !this.items[index].done;\n    console.log("Переключён элемент", index);\n  },\n  removeItem(index) {\n    this.items.splice(index, 1);\n    console.log("Удалён элемент", index);\n  },\n  render() {\n    this.items.forEach((item, i) => {\n      console.log(`${i + 1}. [${item.done ? "✓" : " "}] ${item.text}`);\n    });\n  }\n};\n\ntodoList.addItem("Изучить JavaScript");\ntodoList.addItem("Практиковать DOM");\ntodoList.addItem("Создать проект");\ntodoList.render();\n\nconsole.log("--- После выполнения ---");\ntodoList.toggleItem(0);\ntodoList.render();',
          },
          type: "javascript"
        }
      ]
    }
  },
  "react": {
    EN: {
      title: "React",
      description: "Build user interfaces with React — the most popular JavaScript library.",
      lessons: [
        {
          id: "react-intro",
          title: "Introduction to React",
          theory: {
            sections: [
              { type: "heading", content: "What is React?" },
              { type: "text", content: "React is a JavaScript library for building user interfaces. It lets you create reusable components that manage their own state and compose into complex UIs." },
              { type: "heading", content: "Key Concepts" },
              { type: "list", items: [
                "Components — Reusable building blocks of UI",
                "JSX — HTML-like syntax in JavaScript",
                "Props — Data passed from parent to child",
                "State — Data that changes over time",
                "Hooks — Functions that let you use React features"
              ]},
              { type: "heading", content: "Your First Component" },
              { type: "code", content: 'function Welcome(props) {\n  return <h1>Hello, {props.name}!</h1>;\n}\n\n// Using the component\n<Welcome name="World" />' },
              { type: "tip", content: "Component names must start with a capital letter. React treats lowercase tags as HTML elements." }
            ]
          },
          practice: {
            title: "React Component Simulation",
            description: "Since we can't run React in this editor, let's simulate component logic with plain JavaScript.",
            task: "Simulate how React components work using functions and objects.",
            starterCode: '// Simulating React component pattern\nfunction Welcome({ name, role }) {\n  return `<h1>Hello, ${name}! You are a ${role}.</h1>`;\n}\n\nfunction Counter({ initialCount = 0 }) {\n  let count = initialCount; // Simulating state\n  return {\n    increment: () => { count++; return count; },\n    decrement: () => { count--; return count; },\n    getCount: () => count\n  };\n}\n\n// Use the components\nconsole.log(Welcome({ name: "Developer", role: "Frontend Dev" }));\n\nconst counter = Counter({ initialCount: 5 });\nconsole.log("Count:", counter.getCount());\ncounter.increment();\nconsole.log("After +1:", counter.getCount());\ncounter.decrement();\nconsole.log("After -1:", counter.getCount());',
          },
          type: "javascript"
        },
        {
          id: "react-hooks",
          title: "React Hooks",
          theory: {
            sections: [
              { type: "heading", content: "What are Hooks?" },
              { type: "text", content: "Hooks are functions that let you use React state and lifecycle features in function components. They always start with 'use'." },
              { type: "heading", content: "useState" },
              { type: "code", content: 'import { useState } from "react";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Clicked {count} times\n    </button>\n  );\n}' },
              { type: "heading", content: "useEffect" },
              { type: "code", content: 'import { useEffect } from "react";\n\nfunction UserProfile({ userId }) {\n  const [user, setUser] = useState(null);\n  \n  useEffect(() => {\n    fetchUser(userId).then(setUser);\n  }, [userId]); // Re-run when userId changes\n  \n  return <div>{user?.name}</div>;\n}' },
              { type: "list", items: [
                "useState — Manage component state",
                "useEffect — Side effects (API calls, subscriptions)",
                "useContext — Access context values",
                "useRef — Reference DOM elements or persist values",
                "useMemo / useCallback — Performance optimization"
              ]},
              { type: "tip", content: "Always call hooks at the top level of your component. Never call them inside conditions, loops, or nested functions." }
            ]
          },
          practice: {
            title: "Hooks Simulation",
            description: "Simulate React hooks behavior with plain JavaScript.",
            task: "Create a simulated useState and useEffect pattern.",
            starterCode: '// Simulating useState\nfunction createUseState(initialValue) {\n  let value = initialValue;\n  const setValue = (newValue) => {\n    const oldValue = value;\n    value = typeof newValue === "function" ? newValue(value) : newValue;\n    console.log(`State changed: ${oldValue} → ${value}`);\n    return value;\n  };\n  return [() => value, setValue];\n}\n\n// Simulating useEffect\nfunction useEffect(callback, deps) {\n  callback();\n  console.log("Effect ran with deps:", deps);\n}\n\n// Use the simulated hooks\nconst [count, setCount] = createUseState(0);\nconsole.log("Initial count:", count());\nsetCount(1);\nsetCount(prev => prev + 1);\nsetCount(prev => prev * 3);\n\nuseEffect(() => {\n  console.log("Document title updated!");\n}, ["count"]);',
          },
          type: "javascript"
        }
      ]
    },
    RU: {
      title: "React",
      description: "Создавай пользовательские интерфейсы с React — самой популярной JS-библиотекой.",
      lessons: [
        {
          id: "react-intro",
          title: "Введение в React",
          theory: {
            sections: [
              { type: "heading", content: "Что такое React?" },
              { type: "text", content: "React — это JavaScript-библиотека для создания пользовательских интерфейсов. Она позволяет создавать переиспользуемые компоненты, которые управляют своим состоянием." },
              { type: "heading", content: "Ключевые концепции" },
              { type: "list", items: [
                "Компоненты — Переиспользуемые блоки UI",
                "JSX — HTML-подобный синтаксис в JavaScript",
                "Props — Данные, передаваемые от родителя к дочернему",
                "State — Данные, которые меняются со временем",
                "Хуки — Функции для использования возможностей React"
              ]},
              { type: "heading", content: "Твой первый компонент" },
              { type: "code", content: 'function Welcome(props) {\n  return <h1>Привет, {props.name}!</h1>;\n}\n\n// Использование компонента\n<Welcome name="Мир" />' },
              { type: "tip", content: "Имена компонентов должны начинаться с заглавной буквы." }
            ]
          },
          practice: {
            title: "Симуляция React компонентов",
            description: "Симулируй работу React компонентов с помощью обычного JavaScript.",
            task: "Создай симуляцию компонентов React используя функции и объекты.",
            starterCode: '// Симуляция паттерна React компонентов\nfunction Welcome({ name, role }) {\n  return `<h1>Привет, ${name}! Ты ${role}.</h1>`;\n}\n\nfunction Counter({ initialCount = 0 }) {\n  let count = initialCount;\n  return {\n    increment: () => { count++; return count; },\n    decrement: () => { count--; return count; },\n    getCount: () => count\n  };\n}\n\n// Используй компоненты\nconsole.log(Welcome({ name: "Разработчик", role: "Frontend Dev" }));\n\nconst counter = Counter({ initialCount: 5 });\nconsole.log("Счётчик:", counter.getCount());\ncounter.increment();\nconsole.log("После +1:", counter.getCount());',
          },
          type: "javascript"
        },
        {
          id: "react-hooks",
          title: "React Хуки",
          theory: {
            sections: [
              { type: "heading", content: "Что такое хуки?" },
              { type: "text", content: "Хуки — это функции, позволяющие использовать состояние и lifecycle React в функциональных компонентах. Они всегда начинаются с 'use'." },
              { type: "heading", content: "useState" },
              { type: "code", content: 'import { useState } from "react";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Нажато {count} раз\n    </button>\n  );\n}' },
              { type: "heading", content: "useEffect" },
              { type: "code", content: 'import { useEffect } from "react";\n\nfunction UserProfile({ userId }) {\n  const [user, setUser] = useState(null);\n  \n  useEffect(() => {\n    fetchUser(userId).then(setUser);\n  }, [userId]);\n  \n  return <div>{user?.name}</div>;\n}' },
              { type: "list", items: [
                "useState — Управление состоянием компонента",
                "useEffect — Побочные эффекты (API, подписки)",
                "useContext — Доступ к контексту",
                "useRef — Ссылки на DOM элементы",
                "useMemo / useCallback — Оптимизация"
              ]},
              { type: "tip", content: "Всегда вызывай хуки на верхнем уровне компонента. Никогда внутри условий, циклов или вложенных функций." }
            ]
          },
          practice: {
            title: "Симуляция хуков",
            description: "Симулируй поведение React хуков.",
            task: "Создай симуляцию useState и useEffect.",
            starterCode: '// Симуляция useState\nfunction createUseState(initialValue) {\n  let value = initialValue;\n  const setValue = (newValue) => {\n    const oldValue = value;\n    value = typeof newValue === "function" ? newValue(value) : newValue;\n    console.log(`Состояние: ${oldValue} → ${value}`);\n    return value;\n  };\n  return [() => value, setValue];\n}\n\n// Использование\nconst [count, setCount] = createUseState(0);\nconsole.log("Начальный счёт:", count());\nsetCount(1);\nsetCount(prev => prev + 1);\nsetCount(prev => prev * 3);',
          },
          type: "javascript"
        }
      ]
    }
  }
};
