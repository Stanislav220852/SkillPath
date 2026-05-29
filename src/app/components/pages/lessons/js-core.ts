export const jsCoreLessons: Record<'EN' | 'RU', any> = {
  EN: {
    title: "JavaScript Core",
    description: "Learn JavaScript step by step — from variables to functions, with real code you run yourself.",
    lessons: [
      // ============= LESSON 1 =============
      {
        id: "js-variables",
        title: "Variables and Data Types",
        theory: {
          sections: [
            { type: "heading", content: "What are variables?" },
            { type: "text", content: 'Think of a variable as a box with a name sticker on it. You can put a value inside the box (a number, text, or a list) so you can find it later by name and use it in your program. Without variables, programs could not "remember" information.' },
            { type: "heading", content: "Declaring variables: let, const and var" },
            { type: "text", content: "JavaScript has three ways to create a variable. They behave differently:" },
            { type: "list", items: [
              "const (Constant): for values that will NEVER change. Once you put a value in a const box, you can't replace it. This is the preferred way.",
              "let: use it when you know the value WILL change later (like a score counter that keeps growing).",
              "var: the old way from the early days of the language. It has many quirks and is almost NEVER used in modern JavaScript."
            ]},
            { type: "code", content: '// 1. const — cannot be reassigned\nconst birthYear = 1990;\n// birthYear = 1995; // ERROR! Cannot overwrite a constant\n\n// 2. let — can be changed\nlet currentAge = 33;\ncurrentAge = 34; // works fine\n\n// 3. var — old syntax (avoid it)\nvar firstName = "John";' },
            { type: "heading", content: "Data types (what can go in the box?)" },
            { type: "text", content: 'JavaScript has "primitive" (simple) and "reference" (complex) data types. The main ones:' },
            { type: "list", items: [
              "String — any text. Always wrapped in quotes (single, double, or backticks).",
              "Number — any number: integers (42), negatives (-10), decimals (3.14).",
              "Boolean — only two values: true or false.",
              "Undefined — a variable was created but nothing was put inside yet.",
              "Null — explicit emptiness. The programmer says: there is nothing here.",
              "Object — a complex structure for collections of data (key-value pairs).",
              "Array — a subtype of object, an ordered list of items."
            ]},
            { type: "code", content: 'let userName = "Alex";       // String\nlet age = 25;                // Number\nlet isStudent = true;        // Boolean\nlet salary = null;           // Null\nlet futureJob;               // Undefined\n\nlet hobbies = ["Sport", "Reading"];        // Array\nlet person = { name: "John", age: 30 };    // Object' },
            { type: "tip", content: "Golden rule of modern JS: always declare variables with const. Only switch to let when you realise the value must change." }
          ]
        },
        practice: {
          title: "Variables in practice",
          description: "Write your code, then press Run Code to see the output in the console.",
          task: '1. Create a constant planet and assign the string "Earth". 2. Create a variable temperature with let and assign the number 20. 3. Change temperature to 25 (do not write let again, just reassign!). 4. Print both variables with console.log().',
          starterCode: '// Write your code here:\n\n\n\nconsole.log(planet, temperature);'
        },
        type: "javascript"
      },
      // ============= LESSON 2 =============
      {
        id: "js-operators",
        title: "Operators, Math and Conversions",
        theory: {
          sections: [
            { type: "heading", content: "Arithmetic operators" },
            { type: "text", content: "Programming is largely about calculations. JavaScript supports the classic math operations:" },
            { type: "list", items: [
              "Addition: +",
              "Subtraction: -",
              "Multiplication: *",
              "Division: /",
              "Remainder (modulo): % (e.g. 10 % 3 = 1, because 10 divided by 3 leaves a remainder of 1)",
              "Exponentiation: ** (e.g. 2 ** 3 = 8)"
            ]},
            { type: "heading", content: "String concatenation" },
            { type: "text", content: 'The + operator works not only with numbers. If at least one operand is a string, JavaScript "glues" them into one string.' },
            { type: "code", content: 'let greeting = "Hello, " + "World!"; // "Hello, World!"\nlet result = "Year: " + 2024;        // "Year: 2024" (number became text)\nlet weird = "5" + 5;                 // "55" (string + number = gluing)\nlet math = "5" - 2;                  // 3 (minus only works for numbers)' },
            { type: "heading", content: "Comparison operators and logic" },
            { type: "text", content: "When we need to compare data, we use comparison operators. The result is ALWAYS a boolean: true or false." },
            { type: "list", items: [
              "> (greater), < (less), >= (greater or equal), <= (less or equal).",
              '== (loose equality) — compares values but IGNORES the type. 5 == "5" is true. This causes bugs.',
              '=== (strict equality) — compares BOTH type and value. 5 === "5" is false. Always use this one!',
              "!== (strict inequality) — checks that operands are NOT equal."
            ]},
            { type: "heading", content: "Logical operators (AND, OR, NOT)" },
            { type: "text", content: "They combine several conditions:" },
            { type: "list", items: [
              "&& (logical AND): returns true only if ALL conditions are true (e.g. correct password AND correct login).",
              "|| (logical OR): returns true if at least ONE condition is true (e.g. login by email OR by phone).",
              "! (logical NOT): flips the value. !true becomes false."
            ]}
          ]
        },
        practice: {
          title: "Math and comparisons",
          description: "Calculate and compare values, print the results.",
          task: "1. Create variables price = 2000 and discount = 500. 2. Calculate the final cost into finalPrice. 3. Print whether finalPrice is strictly equal (===) to 1500. 4. Print whether finalPrice is greater than 1000 && less than 2000.",
          starterCode: 'const price = 2000;\nconst discount = 500;\n\n// Calculate finalPrice:\n\n\n// Checks (use console.log):\n// 1. Is finalPrice strictly equal to 1500?\n// 2. Is finalPrice greater than 1000 AND less than 2000?\n'
        },
        type: "javascript"
      },
      // ============= LESSON 3 =============
      {
        id: "js-conditions",
        title: "Conditional Branching (if/else)",
        theory: {
          sections: [
            { type: "heading", content: "The if statement" },
            { type: "text", content: "Code runs top to bottom. But often we need a part of the program to run ONLY under a certain condition. That's what if is for." },
            { type: "text", content: "The condition goes in the parentheses (). If it is true, the code inside the curly braces {} runs." },
            { type: "code", content: 'let balance = 1000;\nlet productPrice = 800;\n\nif (balance >= productPrice) {\n    console.log("Purchase successful!");\n}' },
            { type: "heading", content: "if...else" },
            { type: "text", content: "What if there isn't enough money? We want to show an error. Add an else block that runs when the if condition is false." },
            { type: "code", content: 'if (balance >= productPrice) {\n    console.log("Purchase successful");\n} else {\n    console.log("Not enough funds");\n}' },
            { type: "heading", content: "Chaining: else if" },
            { type: "text", content: "Sometimes there are more than two conditions. For example, sorting by age." },
            { type: "code", content: 'let age = 14;\n\nif (age < 7) {\n    console.log("Kindergarten");\n} else if (age < 18) {\n    console.log("School");\n} else {\n    console.log("Adult life");\n}' },
            { type: "heading", content: "Truthy and Falsy values" },
            { type: "text", content: "You can pass any variable into if(...), not just a comparison. JavaScript will try to convert it to true or false." },
            { type: "list", items: [
              '0, "" (empty string), null, undefined, NaN, and false itself — these 6 values are Falsy.',
              "Everything else is Truthy (any text, any number except zero, objects)."
            ]},
            { type: "code", content: 'let userName = ""; // empty string is falsy\nif (userName) {\n    console.log("Hello, " + userName); // will NOT run\n} else {\n    console.log("No name entered"); // this runs\n}' }
          ]
        },
        practice: {
          title: "Greeting by time",
          description: "Build an if...else if...else chain.",
          task: 'You have a variable hours (current hour 0–23). Write if...else if...else: if hours < 12 print "Good morning!"; if hours is 12 to 18 (not including 18) print "Good afternoon!"; otherwise print "Good evening!".',
          starterCode: 'const hours = 15;\n\n// Write your if...else logic here:\n'
        },
        type: "javascript"
      },
      // ============= LESSON 4 =============
      {
        id: "js-loops",
        title: "Loops (for and while)",
        theory: {
          sections: [
            { type: "heading", content: "Why loops? The DRY rule" },
            { type: "text", content: "The main rule of a programmer: DRY (Don't Repeat Yourself). If you need to print numbers from 1 to 100, it's silly to write 100 console.log() lines. Loops let you run the same block of code many times." },
            { type: "heading", content: "The while loop" },
            { type: "text", content: "The simplest loop. It runs the code inside {} as long as the condition in the parentheses is true." },
            { type: "code", content: 'let count = 1;\n\nwhile (count <= 3) {\n    console.log("Number: " + count);\n    count++; // the ++ operator increases the variable by 1\n}\n// Console: Number 1, Number 2, Number 3' },
            { type: "text", content: "Careful: if you forget to increase count, the condition stays true forever, the loop never ends, and the browser freezes (an infinite loop)." },
            { type: "heading", content: "The for loop" },
            { type: "text", content: "The most common loop in JavaScript. It packs start, end condition and step into one line, which protects you from infinite loops." },
            { type: "code", content: 'for (let i = 0; i < 5; i++) {\n    console.log("Step " + i);\n}' },
            { type: "list", items: [
              "let i = 0 — Start. Create the counter variable. Runs once at the very beginning.",
              "i < 5 — Condition. Checked before each step: if true, go inside; if false, exit.",
              "i++ — Step. Runs AFTER the code inside {}. Increases i by one."
            ]},
            { type: "heading", content: "Controlling a loop: break and continue" },
            { type: "list", items: [
              "break — immediately stops and completely kills the loop.",
              "continue — skips only the CURRENT step and jumps to the next one."
            ]}
          ]
        },
        practice: {
          title: "Even numbers",
          description: "Use a for loop.",
          task: "Using a for loop, print ONLY even numbers from 2 to 10 (inclusive). Hint: the step does not have to be i++. You can write i += 2, or use an if check inside the loop.",
          starterCode: '// Write your for loop:\n\n'
        },
        type: "javascript"
      },
      // ============= LESSON 5 =============
      {
        id: "js-functions",
        title: "Functions: Subprograms",
        theory: {
          sections: [
            { type: "heading", content: "What are functions?" },
            { type: "text", content: 'A function is an independent block of code that solves one specific task. You write it once and can "call" it as many times as you want from different places.' },
            { type: "text", content: "Think of a function as a juicer: you put in fruit (input), it does the work (spins inside), and gives you a glass of juice (the result)." },
            { type: "heading", content: "Declaration and Call" },
            { type: "code", content: '// 1. Create a function. name is a PARAMETER (internal variable)\nfunction sayHello(name) {\n    let message = "Hello, " + name + "!";\n    console.log(message);\n}\n\n// 2. Call the function. "Anna" is an ARGUMENT (real value)\nsayHello("Anna");\nsayHello("Max"); // the code inside runs a second time' },
            { type: "heading", content: "Returning a result (return)" },
            { type: "text", content: "Often a function should calculate something and RETURN the result back to the main program so we can use it further. For this we use the word return." },
            { type: "code", content: 'function calculateSum(a, b) {\n    let result = a + b;\n    return result; // the function hands back the result and finishes!\n}\n\nlet mySum = calculateSum(10, 5);\nconsole.log("Sum: " + mySum); // 15' },
            { type: "text", content: "Important: as soon as a function hits return, it stops immediately. No code after return (inside the function) will run." },
            { type: "heading", content: "Arrow Functions" },
            { type: "text", content: "Modern JavaScript has a shorter, stylish syntax — arrow functions. They are stored in a variable." },
            { type: "code", content: 'const multiply = (x, y) => {\n    return x * y;\n};\n\n// If the body is just one line (a return),\n// we can drop the braces and the word return ("implicit return").\nconst square = (x) => x * x;\n\nconsole.log(square(4)); // 16' },
            { type: "tip", content: "Local scope: variables created inside a function with let or const only live inside that function. They are invisible from the outside, so variables in different functions don't clash." }
          ]
        },
        practice: {
          title: "Adult checker",
          description: "Write a function that returns a boolean.",
          task: "1. Write a normal function isAdult that takes one parameter age. 2. Use if...else inside: if age is 18 or more, return true, otherwise return false. 3. Call it for ages 15 and 20 and print the results.",
          starterCode: 'function isAdult(age) {\n    // Your if...else and return logic:\n    \n}\n\n// Calls:\nconsole.log(isAdult(15));\nconsole.log(isAdult(20));'
        },
        type: "javascript"
      }
    ]
  },
  RU: {
    title: "JavaScript Core",
    description: "Учим JavaScript шаг за шагом — от переменных до функций, с реальным кодом, который ты запускаешь сам.",
    lessons: [
      // ============= УРОК 1 =============
      {
        id: "js-variables",
        title: "Переменные и типы данных",
        theory: {
          sections: [
            { type: "heading", content: "Что такое переменные?" },
            { type: "text", content: 'Представьте, что переменная — это коробка, на которую вы наклеили стикер с именем. В эту коробку можно положить какое-либо значение (например, число, текст или список), чтобы потом найти его по имени и использовать в программе. Без переменных программы не смогли бы "запоминать" информацию.' },
            { type: "heading", content: "Объявление переменных: let, const и var" },
            { type: "text", content: "В JavaScript есть три способа создать переменную. Они отличаются своим поведением:" },
            { type: "list", items: [
              "const (Константа): для значений, которые никогда не изменятся. Если вы положили значение в коробку const, заменить его уже нельзя. Самый предпочтительный способ.",
              "let: используется, если вы знаете, что значение будет меняться в будущем (например, счётчик очков в игре).",
              "var: старый способ с зарождения языка. Имеет много неочевидных проблем, в современном JavaScript почти не используют."
            ]},
            { type: "code", content: '// 1. const — неизменяемая переменная\nconst birthYear = 1990;\n// birthYear = 1995; // ОШИБКА! Константу нельзя перезаписать\n\n// 2. let — переменная, которую можно изменять\nlet currentAge = 33;\ncurrentAge = 34; // всё работает отлично\n\n// 3. var — старый синтаксис (избегайте его)\nvar firstName = "Иван";' },
            { type: "heading", content: "Типы данных (что можно положить в коробку?)" },
            { type: "text", content: 'В JavaScript есть "примитивные" (простые) и "ссылочные" (сложные) типы данных. Основные из них:' },
            { type: "list", items: [
              "String (Строка) — любой текст. Всегда в кавычках (одинарные, двойные или обратные).",
              "Number (Число) — любые числа: целые (42), отрицательные (-10) и дробные (3.14).",
              "Boolean (Булевый) — логический тип, только два значения: true или false.",
              "Undefined — переменная создана, но в неё ещё ничего не положили.",
              "Null — явная пустота. Программист сам говорит: здесь ничего нет.",
              "Object (Объект) — сложная структура для коллекций данных (пары ключ-значение).",
              "Array (Массив) — подвид объекта, упорядоченный список элементов."
            ]},
            { type: "code", content: 'let userName = "Алексей";    // String\nlet age = 25;                // Number\nlet isStudent = true;        // Boolean\nlet salary = null;           // Null\nlet futureJob;               // Undefined\n\nlet hobbies = ["Спорт", "Чтение"];        // Array\nlet person = { name: "Иван", age: 30 };   // Object' },
            { type: "tip", content: "Золотое правило современного JS: всегда объявляйте переменные через const. Если поняли, что значение должно меняться — только тогда меняйте const на let." }
          ]
        },
        practice: {
          title: "Переменные на практике",
          description: "Напиши код и нажми Run Code, чтобы увидеть вывод в консоли.",
          task: '1. Создайте константу planet и присвойте строку "Земля". 2. Создайте переменную temperature через let и присвойте число 20. 3. Измените temperature на 25 (не пишите let снова, просто переопределите!). 4. Выведите обе переменные через console.log().',
          starterCode: '// Ваш код пишите здесь:\n\n\n\nconsole.log(planet, temperature);'
        },
        type: "javascript"
      },
      // ============= УРОК 2 =============
      {
        id: "js-operators",
        title: "Операторы, математика и преобразования",
        theory: {
          sections: [
            { type: "heading", content: "Арифметические операторы" },
            { type: "text", content: "Программирование — это во многом вычисления. JavaScript поддерживает классические математические операции:" },
            { type: "list", items: [
              "Сложение: +",
              "Вычитание: -",
              "Умножение: *",
              "Деление: /",
              "Остаток от деления: % (например: 10 % 3 = 1, так как 10 делится на 3 с остатком 1)",
              "Возведение в степень: ** (например: 2 ** 3 = 8)"
            ]},
            { type: "heading", content: "Сложение строк (конкатенация)" },
            { type: "text", content: 'Оператор + работает не только с числами. Если хотя бы один операнд является строкой, JavaScript "склеит" их в одну строку.' },
            { type: "code", content: 'let greeting = "Привет, " + "Мир!"; // "Привет, Мир!"\nlet result = "Год: " + 2024;        // "Год: 2024" (число превратилось в текст)\nlet weird = "5" + 5;                // "55" (строка + число = склеивание)\nlet math = "5" - 2;                 // 3 (минус работает только для чисел)' },
            { type: "heading", content: "Операторы сравнения и логика" },
            { type: "text", content: "Когда нужно сравнить данные, мы используем операторы сравнения. Результатом ВСЕГДА будет булево значение: true (правда) или false (ложь)." },
            { type: "list", items: [
              "> (больше), < (меньше), >= (больше или равно), <= (меньше или равно).",
              '== (нестрогое равенство) — сравнивает значения, но игнорирует тип. 5 == "5" даст true. Часто приводит к багам.',
              '=== (строгое равенство) — сравнивает и тип, и значение. 5 === "5" даст false. Используйте всегда только его!',
              "!== (строгое неравенство) — проверяет, что операнды НЕ равны друг другу."
            ]},
            { type: "heading", content: "Логические операторы (И, ИЛИ, НЕ)" },
            { type: "text", content: "Они нужны, чтобы объединять несколько условий:" },
            { type: "list", items: [
              "&& (логическое И): возвращает true, только если все условия верны (например: пароль верный И логин верный).",
              "|| (логическое ИЛИ): возвращает true, если хотя бы одно условие верно (например: вход по Email ИЛИ по телефону).",
              "! (логическое НЕ): переворачивает значение. !true становится false."
            ]}
          ]
        },
        practice: {
          title: "Математика и сравнения",
          description: "Посчитай и сравни значения, выведи результаты.",
          task: "1. Создайте переменные price = 2000 и discount = 500. 2. Посчитайте итоговую стоимость в переменную finalPrice. 3. Выведите проверку: является ли finalPrice строго равным (===) 1500? 4. Проверка с логическим И: finalPrice больше 1000 && меньше 2000?",
          starterCode: 'const price = 2000;\nconst discount = 500;\n\n// Вычислите finalPrice:\n\n\n// Проверки (используйте console.log):\n// 1. finalPrice строго равен 1500?\n// 2. finalPrice больше 1000 И меньше 2000?\n'
        },
        type: "javascript"
      },
      // ============= УРОК 3 =============
      {
        id: "js-conditions",
        title: "Условные ветвления (if/else)",
        theory: {
          sections: [
            { type: "heading", content: "Инструкция if (Если)" },
            { type: "text", content: "Код выполняется сверху вниз. Но часто нам нужно, чтобы часть программы сработала только при определённом условии. Для этого используется конструкция if." },
            { type: "text", content: "В круглых скобках () пишется условие. Если оно равно true, выполняется код внутри фигурных скобок {}." },
            { type: "code", content: 'let balance = 1000;\nlet productPrice = 800;\n\nif (balance >= productPrice) {\n    console.log("Покупка прошла успешно!");\n}' },
            { type: "heading", content: "Конструкция if...else (Если...Иначе)" },
            { type: "text", content: "Что если денег не хватило? Мы хотим показать ошибку. Добавляем блок else, который сработает, если условие в if оказалось false." },
            { type: "code", content: 'if (balance >= productPrice) {\n    console.log("Покупка успешна");\n} else {\n    console.log("Недостаточно средств");\n}' },
            { type: "heading", content: "Цепочка: else if (А если)" },
            { type: "text", content: "Иногда условий больше двух. Например, сортировка по возрасту." },
            { type: "code", content: 'let age = 14;\n\nif (age < 7) {\n    console.log("Детский сад");\n} else if (age < 18) {\n    console.log("Школа");\n} else {\n    console.log("Взрослая жизнь");\n}' },
            { type: "heading", content: "Truthy и Falsy значения" },
            { type: "text", content: "Внутрь if(...) можно передать не только сравнение, но и любую переменную. JavaScript попытается превратить её в true или false." },
            { type: "list", items: [
              'Falsy (ложные): в JS всего 6 значений: 0, "" (пустая строка), null, undefined, NaN и само false.',
              "Truthy (истинные): абсолютно всё остальное (любой текст, любые числа кроме нуля, объекты)."
            ]},
            { type: "code", content: 'let userName = ""; // пустая строка - это falsy\nif (userName) {\n    console.log("Привет, " + userName); // не выполнится!\n} else {\n    console.log("Имя не введено"); // выполнится этот код\n}' }
          ]
        },
        practice: {
          title: "Приветствие по времени",
          description: "Построй цепочку if...else if...else.",
          task: 'У вас есть переменная hours (текущий час от 0 до 23). Напишите if...else if...else: если время меньше 12 — выведите "Доброе утро!"; если от 12 до 18 (не включая 18) — "Добрый день!"; в остальных случаях — "Добрый вечер!".',
          starterCode: 'const hours = 15;\n\n// Напишите вашу логику if...else здесь:\n'
        },
        type: "javascript"
      },
      // ============= УРОК 4 =============
      {
        id: "js-loops",
        title: "Циклы (for и while)",
        theory: {
          sections: [
            { type: "heading", content: "Зачем нужны циклы? Правило DRY" },
            { type: "text", content: "Главное правило программиста: DRY (Don't Repeat Yourself — Не повторяйся). Если нужно вывести числа от 1 до 100, глупо писать 100 строк console.log(). Циклы позволяют запустить один и тот же блок кода много раз." },
            { type: "heading", content: "Цикл while (Пока)" },
            { type: "text", content: "Самый простой цикл. Он выполняет код внутри {} до тех пор, пока условие в скобках равно true." },
            { type: "code", content: 'let count = 1;\n\nwhile (count <= 3) {\n    console.log("Число: " + count);\n    count++; // оператор ++ увеличивает переменную на 1\n}\n// Консоль: Число 1, Число 2, Число 3' },
            { type: "text", content: "Осторожно: если забыть увеличить count, условие всегда будет true, цикл никогда не завершится, и браузер зависнет (бесконечный цикл)." },
            { type: "heading", content: "Цикл for" },
            { type: "text", content: "Самый частый цикл в JavaScript. Он собирает в одну строчку старт, условие окончания и шаг. Это спасает от бесконечных циклов. Синтаксис: for (НАЧАЛО; УСЛОВИЕ; ШАГ) { ... }" },
            { type: "code", content: 'for (let i = 0; i < 5; i++) {\n    console.log("Шаг " + i);\n}' },
            { type: "list", items: [
              "let i = 0 — Начало. Создаём переменную-счётчик. Выполняется один раз в самом начале.",
              "i < 5 — Условие. Перед каждым шагом проверяем: если true — идём внутрь, если false — выходим.",
              "i++ — Шаг. Выполняется после кода внутри {}. Увеличиваем i на единицу."
            ]},
            { type: "heading", content: "Управление циклом: break и continue" },
            { type: "list", items: [
              "break — экстренно останавливает и полностью убивает цикл.",
              "continue — прерывает только текущий шаг и сразу перепрыгивает к следующему."
            ]}
          ]
        },
        practice: {
          title: "Чётные числа",
          description: "Используй цикл for.",
          task: "Используя цикл for, выведите в консоль только чётные числа от 2 до 10 (включительно). Подсказка: шаг не обязательно i++. Можно написать i += 2 или сделать проверку if внутри цикла.",
          starterCode: '// Напишите цикл for:\n\n'
        },
        type: "javascript"
      },
      // ============= УРОК 5 =============
      {
        id: "js-functions",
        title: "Функции: подпрограммы",
        theory: {
          sections: [
            { type: "heading", content: "Что такое функции?" },
            { type: "text", content: 'Функция — это независимый блок кода, который решает одну конкретную задачу. Вы пишете её один раз, а потом можете "вызывать" сколько угодно раз из разных мест программы.' },
            { type: "text", content: "Представьте функцию как соковыжималку: вы закидываете в неё фрукты (входные данные), она делает работу (крутится внутри) и выдаёт вам стакан сока (результат)." },
            { type: "heading", content: "Объявление и вызов (Function Declaration)" },
            { type: "code", content: '// 1. Создаём функцию. name - это ПАРАМЕТР (внутренняя переменная)\nfunction sayHello(name) {\n    let message = "Привет, " + name + "!";\n    console.log(message);\n}\n\n// 2. Вызываем функцию. "Анна" - это АРГУМЕНТ (реальное значение)\nsayHello("Анна");\nsayHello("Максим"); // код внутри функции выполнится второй раз' },
            { type: "heading", content: "Возврат результата (return)" },
            { type: "text", content: "Часто функция должна произвести расчёты и вернуть результат обратно в основную программу, чтобы мы могли его использовать дальше. Для этого используется слово return." },
            { type: "code", content: 'function calculateSum(a, b) {\n    let result = a + b;\n    return result; // функция отдаёт результат и завершает работу!\n}\n\n// Ловим результат работы функции в переменную:\nlet mySum = calculateSum(10, 5);\nconsole.log("Сумма: " + mySum); // 15' },
            { type: "text", content: "Важно: как только функция встречает слово return, она немедленно прекращает работу. Код после return (внутри функции) не выполнится." },
            { type: "heading", content: "Стрелочные функции (Arrow Functions)" },
            { type: "text", content: "В современном JavaScript появился более короткий и стильный синтаксис — стрелочные функции. Они сохраняются в переменную." },
            { type: "code", content: 'const multiply = (x, y) => {\n    return x * y;\n};\n\n// Если код состоит всего из одной строчки (возврата результата),\n// можно убрать фигурные скобки и слово return ("неявный возврат").\nconst square = (x) => x * x;\n\nconsole.log(square(4)); // 16' },
            { type: "tip", content: "Локальная область видимости (Scope): переменные, созданные внутри функции через let или const, живут только внутри неё. Снаружи они не видны, чтобы переменные в разных функциях не конфликтовали." }
          ]
        },
        practice: {
          title: "Проверка совершеннолетия",
          description: "Напиши функцию, которая возвращает булево значение.",
          task: "1. Напишите обычную функцию isAdult, которая принимает один параметр age. 2. Внутри используйте if...else: если возраст >= 18 — возвращайте (return) true, иначе false. 3. Вызовите функцию для возраста 15 и 20, выведя результаты в консоль.",
          starterCode: 'function isAdult(age) {\n    // Ваша логика с if...else и return:\n    \n}\n\n// Вызовы:\nconsole.log(isAdult(15));\nconsole.log(isAdult(20));'
        },
        type: "javascript"
      }
    ]
  }
};
