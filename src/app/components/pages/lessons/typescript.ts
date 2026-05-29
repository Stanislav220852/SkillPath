export const typescriptLessons: Record<'EN' | 'RU', any> = {
  EN: {
    title: "TypeScript",
    description: "Learn TypeScript in depth — types, tuples, interfaces, unions, narrowing and generics.",
    lessons: [
      // ============= LESSON 1 =============
      {
        id: "ts-basics",
        title: "TS Philosophy, Primitives and unknown",
        theory: {
          sections: [
            { type: "heading", content: "Compile time vs Runtime" },
            { type: "text", content: "The key thing to understand about TypeScript: it does not exist in the browser. Browsers only understand JavaScript. TypeScript (TS) is a tool that works while you write code (in your editor) and when the project is built (compile time)." },
            { type: "text", content: "TS checks your code for type errors, then the compiler completely removes all type annotations, interfaces and generics, leaving plain JS. This means TS types have zero impact on app performance in the browser (runtime)." },
            { type: "heading", content: "Type annotation and Type Inference" },
            { type: "text", content: "In TS we can explicitly set the type of a variable (annotation) by writing a colon :. The main primitives: string, number, boolean." },
            { type: "code", content: 'let username: string = "Alice";\nlet age: number = 25;' },
            { type: "text", content: "But writing types everywhere is bad practice (the code gets noisy). TS has a powerful Type Inference mechanism. If you assign a value when creating a variable, TS figures out its type itself:" },
            { type: "code", content: 'let city = "Moscow"; // TS understood this is a string\n// city = 42; // Error: TS remembers city was created as a string' },
            { type: "heading", content: "any and unknown" },
            { type: "text", content: "Sometimes we don't know what data will arrive (e.g. from a third-party API). There are two types for this:" },
            { type: "tip", content: "any (Evil): completely disables type checking. The compiler turns a blind eye. If you call myAny.nonExistentMethod(), TS stays silent, but the app crashes in the browser." },
            { type: "code", content: 'let dataAny: any = "Hello";\ndataAny.foo(); // TS allows it, but JS will throw (foo is not a function)' },
            { type: "heading", content: "unknown (a safe any)" },
            { type: "text", content: 'The unknown type means: "I don\'t know what type this is, but force me to check it before doing anything with it". This is the correct way to work with unknown data.' },
            { type: "code", content: 'let dataUnknown: unknown = "Hello";\n\n// dataUnknown.toUpperCase(); // TS ERROR: "First prove it is a string!"\n\nif (typeof dataUnknown === "string") {\n    console.log(dataUnknown.toUpperCase()); // Now TS is sure it is safe\n}' }
          ]
        },
        practice: {
          title: "Working with unknown",
          description: "Use typeof narrowing to safely use an unknown value.",
          task: 'Create a variable secretData of type unknown and assign "TypeScript is awesome!". Write an if check with typeof. Inside the if (where TS already knows it is a string) call .toUpperCase() and print the result to the console.',
          starterCode: '// 1. Create an unknown variable\n\n\n// 2. Write a typeof check and print the data in uppercase\n'
        },
        type: "javascript"
      },
      // ============= LESSON 2 =============
      {
        id: "ts-arrays",
        title: "Arrays, Tuples and Enum nuances",
        theory: {
          sections: [
            { type: "heading", content: "Typing arrays" },
            { type: "text", content: "Arrays can be typed in two ways. They are absolutely identical, the choice is a matter of team taste." },
            { type: "code", content: 'let names: string[] = ["Anna", "Bob"];\nlet ages: Array<number> = [20, 30];' },
            { type: "text", content: "If we want an immutable array (e.g. a config), we use ReadonlyArray. Methods like .push() won't be available on it." },
            { type: "heading", content: "Tuples" },
            { type: "text", content: "A regular array can have any length. But sometimes we need a structure with a strictly defined number of elements and known types at specific positions. That is a tuple." },
            { type: "text", content: "For example, React's useState hook returns exactly a tuple: an array of exactly two elements (the value and a function)." },
            { type: "code", content: '// [Name, Age, Active]\nlet employee: [string, number, boolean] = ["Alex", 28, true];\n// employee = [28, "Alex", true]; // Error: wrong order of types' },
            { type: "heading", content: "Enums and why they're dangerous" },
            { type: "text", content: "enum lets you create a set of named constants. By default they are assigned numbers (0, 1, 2)." },
            { type: "code", content: "enum Direction { Up, Down, Left, Right }" },
            { type: "text", content: "Problem with a regular enum: when TS compiles to JS, a regular enum turns into a big, clunky object-function (which adds bytes to the bundle). Also, regular numeric enums are not safe (before v5.0 you could assign any number)." },
            { type: "heading", content: "Solution: const enum" },
            { type: "text", content: "Experienced developers use const enum. Unlike a regular enum, const enum leaves no trace in the compiled JS. The compiler just substitutes hard-coded values where they are used. It saves memory and runs faster." },
            { type: "code", content: 'const enum Status {\n    Success = "SUCCESS",\n    Error = "ERROR"\n}\nlet current = Status.Success;\n// In compiled JS this just becomes: let current = "SUCCESS";' }
          ]
        },
        practice: {
          title: "Tuple with a const enum",
          description: "Combine a const enum and a tuple.",
          task: '1. Create a const enum UserRole with values Admin = "ADMIN" and Guest = "GUEST". 2. Create a tuple user consisting of an ID (number) and a role (type UserRole). Assign it [1, UserRole.Admin]. 3. Print the data to the console.',
          starterCode: '// 1. Create const enum UserRole\n\n\n// 2. Create the tuple user\n\n\n// 3. Print\n'
        },
        type: "javascript"
      },
      // ============= LESSON 3 =============
      {
        id: "ts-objects",
        title: "Objects: interface vs type and Structural Typing",
        theory: {
          sections: [
            { type: "heading", content: "Basics of typing objects" },
            { type: "text", content: "We can describe the shape of objects with optional properties ? and readonly modifiers." },
            { type: "code", content: "type Config = {\n    readonly apiKey: string; // Cannot be changed after creation\n    port?: number;           // May be absent (will be undefined)\n};" },
            { type: "heading", content: "The big debate: interface vs type" },
            { type: "text", content: "TS has two ways to describe an object: interface and type. In 90% of cases they work the same, but there is a fundamental architectural difference." },
            { type: "heading", content: "1. Extending (inheritance)" },
            { type: "text", content: "Interfaces are extended with the extends keyword (like in OOP). Types are extended via Intersections using the ampersand &." },
            { type: "code", content: "// --- With Interface ---\ninterface Animal { name: string; }\ninterface Bear extends Animal { honey: boolean; }\n\n// --- With Type ---\ntype Vehicle = { brand: string; }\ntype Car = Vehicle & { wheels: number; } // Merge two objects" },
            { type: "heading", content: "2. Declaration Merging" },
            { type: "text", content: "This is a key feature of interface. If you declare an interface with the same name twice, TS merges them into one big interface. You can't do this with type (it will be a duplication error). It's used to extend global browser objects (window)." },
            { type: "code", content: "interface Window { title: string }\ninterface Window { width: number }\n// Now an object of type Window must have both title and width." },
            { type: "tip", content: "Structural Typing (duck typing): unlike Java or C#, TypeScript uses structural typing. TS does not care about the NAME of an interface. If an object has the needed fields (quacks like a duck), TS accepts it. You can pass an object with MORE fields than the interface asks for, and TS allows it." }
          ]
        },
        practice: {
          title: "Intersection types",
          description: "Combine two types with the & operator.",
          task: "1. Create type Person with a field name: string. 2. Create type Worker by combining Person and a new object with a field salary: number (use the & operator). 3. Create a variable of type Worker and print it to the console.",
          starterCode: '// 1. Create type Person\n\n\n// 2. Create type Worker (using intersection &)\n\n\n// 3. Variable and print\n'
        },
        type: "javascript"
      },
      // ============= LESSON 4 =============
      {
        id: "ts-functions",
        title: "Functions: Signatures, rest params and never",
        theory: {
          sections: [
            { type: "heading", content: "Function signatures" },
            { type: "text", content: "You should type the arguments and the return value. If a function returns nothing, we write void." },
            { type: "text", content: "How do we describe the TYPE of a function itself, if we want to pass it as a callback? We use the arrow typing syntax:" },
            { type: "code", content: "// Type: a function that takes a string and returns nothing\ntype LogFn = (msg: string) => void;\n\nfunction processData(logger: LogFn) {\n    logger(\"Data processed!\");\n}" },
            { type: "heading", content: "Rest Parameters (...args)" },
            { type: "text", content: "If a function accepts an unlimited number of arguments via the spread operator, we type it as an array." },
            { type: "code", content: "function sumAll(...numbers: number[]): number {\n    return numbers.reduce((acc, val) => acc + val, 0);\n}\nsumAll(1, 2, 3, 4); // 10" },
            { type: "heading", content: "The never type" },
            { type: "text", content: "This is one of the hardest types to grasp. never means a value that will never happen. A function returning never never finishes successfully. It either always throws an exception (throw Error) or contains an infinite loop (while true)." },
            { type: "code", content: "function crashApp(errorMsg: string): never {\n    throw new Error(errorMsg); // The function never completes, it interrupts execution\n}" },
            { type: "text", content: "never is also used by the TS compiler in type checks (narrowing) for exhaustiveness checking — to make sure you handled all possible cases in a switch/case." }
          ]
        },
        practice: {
          title: "Typing a function",
          description: "Describe a function type and implement it.",
          task: "1. Create a type MathFn that describes a function taking two numbers (a, b) and returning a number. 2. Create two constants: arrow functions add and multiply, explicitly typed as MathFn. 3. Print the results of add(10, 5) and multiply(10, 5).",
          starterCode: '// 1. Create the type MathFn\n\n\n// 2. Implement add and multiply\n\n\n// 3. Print the result\n'
        },
        type: "javascript"
      },
      // ============= LESSON 5 =============
      {
        id: "ts-unions",
        title: "Union, Literal Types and the power of Narrowing",
        theory: {
          sections: [
            { type: "heading", content: "Literal Types" },
            { type: "text", content: "Instead of using the string type, we can restrict a variable to specific strings. This is much safer than plain strings." },
            { type: "code", content: 'type Method = "GET" | "POST" | "DELETE";\nlet reqMethod: Method = "GET"; // OK\n// reqMethod = "PUT"; // ERROR: "PUT" is not defined in the type' },
            { type: "heading", content: "Narrowing" },
            { type: "text", content: 'If a Union type comes into a function (e.g. string | Date), TS forbids calling string methods, because it might be a date. We need to "narrow" the type (prove to the compiler what we are working with).' },
            { type: "heading", content: "1. typeof" },
            { type: "text", content: "Used for primitives (strings, numbers, booleans)." },
            { type: "code", content: 'function printLength(val: string | number) {\n    if (typeof val === "string") {\n        console.log(val.length); // Here TS knows it is a string\n    }\n}' },
            { type: "heading", content: "2. instanceof" },
            { type: "text", content: "Used to check objects created via classes (e.g. Date, Map)." },
            { type: "code", content: "function printDate(date: Date | string) {\n    if (date instanceof Date) {\n        console.log(date.toISOString());\n    }\n}" },
            { type: "heading", content: "Killer feature: Discriminated Unions" },
            { type: "text", content: "This is the most powerful pattern for state managers (Redux) or APIs. We create a union of objects that share a common field (the discriminator), usually a type field." },
            { type: "code", content: 'interface SuccessState { type: "success"; data: string[]; }\ninterface ErrorState { type: "error"; errorMsg: string; }\n\ntype AppState = SuccessState | ErrorState;\n\nfunction renderUI(state: AppState) {\n    if (state.type === "success") {\n        // TS knows: if type="success", the errorMsg field does NOT exist here, only data\n        console.log("Data:", state.data);\n    } else {\n        // And here TS knows it is ErrorState\n        console.log("Error:", state.errorMsg);\n    }\n}' }
          ]
        },
        practice: {
          title: "Discriminated Union",
          description: "Narrow a union by a discriminator field.",
          task: "Implement the Discriminated Union pattern. 1. Create types Car (with field type: 'car' and wheels: number) and Boat (with field type: 'boat' and propellers: number). 2. Create a union type Transport = Car | Boat. 3. Write a function printInfo(t: Transport) that checks the type field and prints either the number of wheels or the number of propellers.",
          starterCode: "// 1. Describe the types and the Transport union\n\n\n\n// 2. Function with narrowing by the type field\nfunction printInfo(t) {\n    \n}\n\n// Calls\nprintInfo({ type: 'car', wheels: 4 });\nprintInfo({ type: 'boat', propellers: 2 });"
        },
        type: "javascript"
      },
      // ============= LESSON 6 =============
      {
        id: "ts-generics",
        title: "Generics and Utility Types",
        theory: {
          sections: [
            { type: "heading", content: "What are Generics?" },
            { type: "text", content: "Generics are variables for types. They let you create reusable components and functions. You pass a type as a parameter in angle brackets <T>." },
            { type: "text", content: "Imagine you write an API function that requests data. When writing the function you don't know what data will come (User, Product or Comment). Generics solve this problem." },
            { type: "code", content: '// T is determined at the moment the function is called\nfunction identity<T>(arg: T): T {\n    return arg;\n}\n\nlet num = identity<number>(42);  // Returns number\nlet str = identity("Text");      // TS infers that T is string!' },
            { type: "heading", content: "Generic Constraints" },
            { type: "text", content: "Sometimes we need T to not be just any type, but to definitely have certain properties. For this we use the extends keyword." },
            { type: "code", content: 'interface HasLength { length: number; }\n\n// T must have a length property!\nfunction printLength<T extends HasLength>(item: T) {\n    console.log(item.length);\n}\n\nprintLength("Hello"); // a string has length\nprintLength([1, 2, 3]); // an array has length\n// printLength(100); // ERROR! a number has no length' },
            { type: "heading", content: "Utility Types" },
            { type: "text", content: 'TypeScript provides a set of global types out of the box for transforming existing ones.' },
            { type: "list", items: [
              "Partial<T> — makes ALL fields of an object optional. Perfect for update functions (PATCH requests), when we change only part of the fields.",
              "Omit<T, K> — takes a type and REMOVES the specified keys. For example, when creating a user in a database we don't need to pass id."
            ]},
            { type: "code", content: 'interface User { id: number; name: string; email: string; }\n\n// Removed id, kept only name and email\ntype UserCreationDTO = Omit<User, "id">;\n\n// All fields became optional (id?, name?, email?)\ntype UserUpdateDTO = Partial<User>;' }
          ]
        },
        practice: {
          title: "Partial in practice",
          description: "Use the built-in Partial utility type.",
          task: "1. Create interface Product { id: number; title: string; price: number; }. 2. Create a type UpdateProductDTO using the built-in generic Partial<Product>. 3. Write a function updateProduct(id: number, changes: UpdateProductDTO) that prints \"Updating product ID:\" + id and the changes object. 4. Call the function passing only the price field.",
          starterCode: '// 1. Interface Product\n\n\n// 2. Type UpdateProductDTO via Partial\n\n\n// 3. Function updateProduct\n\n\n// 4. Call the function\n'
        },
        type: "javascript"
      }
    ]
  },
  RU: {
    title: "TypeScript",
    description: "Изучаем TypeScript углублённо — типы, кортежи, интерфейсы, объединения, сужение и дженерики.",
    lessons: [
      // ============= УРОК 1 =============
      {
        id: "ts-basics",
        title: "Идеология TS, примитивы и unknown",
        theory: {
          sections: [
            { type: "heading", content: "Время компиляции vs время выполнения (Compile vs Runtime)" },
            { type: "text", content: "Главное, что нужно понять о TypeScript: он не существует в браузере. Браузеры понимают только JavaScript (JS). TypeScript (TS) — это инструмент, который работает на этапе написания кода (в вашем редакторе) и на этапе сборки проекта (Compile time)." },
            { type: "text", content: "TS проверяет ваш код на логические ошибки типов, а затем компилятор полностью удаляет все аннотации типов, интерфейсы и дженерики, оставляя голый JS. Это значит, что типы TS никак не влияют на производительность приложения в браузере (Runtime)." },
            { type: "heading", content: "Аннотация типов и автоматический вывод (Inference)" },
            { type: "text", content: "В TS мы можем явно указать тип переменной (аннотация), написав двоеточие :. Основные примитивы: string, number, boolean." },
            { type: "code", content: 'let username: string = "Alice";\nlet age: number = 25;' },
            { type: "text", content: "Однако писать типы везде — плохая практика (код становится шумным). TS обладает мощным механизмом Type Inference (Вывод типов). Если вы присваиваете значение при создании переменной, TS сам понимает её тип:" },
            { type: "code", content: 'let city = "Moscow"; // TS сам понял, что это string\n// city = 42; // Ошибка: TS помнит, что city создавалась как строка' },
            { type: "heading", content: "Типы any и unknown" },
            { type: "text", content: "Иногда мы не знаем, какие данные к нам придут (например, из стороннего API). Для этого есть два типа:" },
            { type: "tip", content: "any (Зло): полностью отключает проверку типов. Компилятор закрывает глаза на эту переменную. Если вы вызовете myAny.nonExistentMethod(), TS промолчит, но приложение упадёт в браузере." },
            { type: "code", content: 'let dataAny: any = "Hello";\ndataAny.foo(); // TS разрешает, но в JS будет ошибка (foo is not a function)' },
            { type: "heading", content: "unknown (безопасный any)" },
            { type: "text", content: 'Тип unknown означает: "Я не знаю, что это за тип, но заставь меня проверить его перед тем, как я с ним что-то сделаю". Это правильный способ работы с неизвестными данными.' },
            { type: "code", content: 'let dataUnknown: unknown = "Hello";\n\n// dataUnknown.toUpperCase(); // ОШИБКА TS: "Сначала докажи, что это строка!"\n\nif (typeof dataUnknown === "string") {\n    console.log(dataUnknown.toUpperCase()); // Теперь TS уверен, что это безопасно\n}' }
          ]
        },
        practice: {
          title: "Работа с unknown",
          description: "Используй сужение через typeof для безопасной работы со значением.",
          task: 'Создайте переменную secretData с типом unknown и присвойте ей значение "TypeScript is awesome!". Напишите условие if с проверкой typeof. Внутри блока if, где TS уже знает, что это строка, вызовите у неё метод .toUpperCase() и выведите результат в консоль.',
          starterCode: '// 1. Создайте переменную unknown\n\n\n// 2. Напишите проверку typeof и выведите данные большими буквами\n'
        },
        type: "javascript"
      },
      // ============= УРОК 2 =============
      {
        id: "ts-arrays",
        title: "Массивы, Tuples (Кортежи) и нюансы Enums",
        theory: {
          sections: [
            { type: "heading", content: "Типизация массивов" },
            { type: "text", content: "Массивы можно типизировать двумя способами. Они абсолютно идентичны, выбор — дело вкуса команды." },
            { type: "code", content: 'let names: string[] = ["Anna", "Bob"];\nlet ages: Array<number> = [20, 30];' },
            { type: "text", content: "Если мы хотим создать неизменяемый массив (например, конфиг), мы используем ReadonlyArray. Методы вроде .push() в нём будут недоступны." },
            { type: "heading", content: "Tuples (Кортежи)" },
            { type: "text", content: "Обычный массив может иметь любую длину. Но иногда нам нужна структура со строго определённым количеством элементов и известными типами на конкретных позициях. Это кортеж." },
            { type: "text", content: "Например, хук useState в React возвращает именно кортеж: массив из ровно двух элементов (значение и функция)." },
            { type: "code", content: '// [Имя, Возраст, Роль]\nlet employee: [string, number, boolean] = ["Alex", 28, true];\n// employee = [28, "Alex", true]; // Ошибка: неверный порядок типов' },
            { type: "heading", content: "Enums (Перечисления) и почему они опасны" },
            { type: "text", content: "enum позволяет создать набор именованных констант. По умолчанию им присваиваются числа (0, 1, 2)." },
            { type: "code", content: "enum Direction { Up, Down, Left, Right }" },
            { type: "text", content: "Проблема обычного Enum: когда TS компилирует код в JS, обычный enum превращается в огромную и неповоротливую функцию-объект (которая весит много байт в бандле). Кроме того, обычные числовые энамы в TS не безопасны (до версии 5.0 можно было присвоить энаму любое число)." },
            { type: "heading", content: "Решение: const enum" },
            { type: "text", content: "Опытные разработчики используют const enum. В отличие от обычного энама, const enum не оставляет следов в скомпилированном JS. Компилятор просто подставляет жёстко зашитые значения прямо в места их использования. Это экономит память и работает быстрее." },
            { type: "code", content: 'const enum Status {\n    Success = "SUCCESS",\n    Error = "ERROR"\n}\nlet current = Status.Success;\n// В скомпилированном JS это превратится просто в: let current = "SUCCESS";' }
          ]
        },
        practice: {
          title: "Кортеж с const enum",
          description: "Объедини const enum и кортеж.",
          task: '1. Создайте const enum UserRole со значениями Admin = "ADMIN" и Guest = "GUEST". 2. Создайте кортеж user, который состоит из ID (число) и роли (тип UserRole). Присвойте ему значения [1, UserRole.Admin]. 3. Выведите данные в консоль.',
          starterCode: '// 1. Создайте const enum UserRole\n\n\n// 2. Создайте кортеж user\n\n\n// 3. Вывод\n'
        },
        type: "javascript"
      },
      // ============= УРОК 3 =============
      {
        id: "ts-objects",
        title: "Объекты: interface vs type и Structural Typing",
        theory: {
          sections: [
            { type: "heading", content: "Основы типизации объектов" },
            { type: "text", content: "Мы можем описывать формы объектов с помощью опциональных свойств ? и модификаторов readonly." },
            { type: "code", content: "type Config = {\n    readonly apiKey: string; // Нельзя изменить после создания\n    port?: number;           // Может отсутствовать (будет undefined)\n};" },
            { type: "heading", content: "Главный холивар: interface против type" },
            { type: "text", content: "В TS есть два способа описать объект: interface и type. В 90% случаев они работают одинаково, но между ними есть фундаментальная архитектурная разница." },
            { type: "heading", content: "1. Расширение (наследование)" },
            { type: "text", content: "Интерфейсы расширяются через ключевое слово extends (как в ООП). Типы расширяются через Пересечения (Intersections) с помощью символа амперсанда &." },
            { type: "code", content: "// --- Через Interface ---\ninterface Animal { name: string; }\ninterface Bear extends Animal { honey: boolean; }\n\n// --- Через Type ---\ntype Vehicle = { brand: string; }\ntype Car = Vehicle & { wheels: number; } // Склеиваем два объекта" },
            { type: "heading", content: "2. Declaration Merging (Слияние интерфейсов)" },
            { type: "text", content: "Это важнейшая фича interface. Если вы объявите интерфейс с одним и тем же именем дважды, TS объединит их в один большой интерфейс. С type так сделать нельзя (будет ошибка дублирования). Это используют для расширения глобальных объектов браузера (window)." },
            { type: "code", content: "interface Window { title: string }\ninterface Window { width: number }\n// Теперь объект типа Window обязан иметь и title, и width." },
            { type: "tip", content: "Structural Typing (Утиная типизация): в отличие от Java или C#, TypeScript использует структурную типизацию. TS не волнует НАЗВАНИЕ интерфейса. Если объект имеет нужные поля (крякает как утка и ходит как утка), TS принимает его. Вы можете передать объект, у которого есть больше полей, чем просит интерфейс, и TS это пропустит." }
          ]
        },
        practice: {
          title: "Пересечение типов",
          description: "Объедини два типа через оператор &.",
          task: "1. Создайте type Person с полем name: string. 2. Создайте type Worker, объединив Person и новый объект с полем salary: number (используйте оператор &). 3. Создайте переменную типа Worker и выведите в консоль.",
          starterCode: '// 1. Создайте type Person\n\n\n// 2. Создайте type Worker (используя пересечение &)\n\n\n// 3. Переменная и вывод\n'
        },
        type: "javascript"
      },
      // ============= УРОК 4 =============
      {
        id: "ts-functions",
        title: "Функции: сигнатуры, rest-параметры и never",
        theory: {
          sections: [
            { type: "heading", content: "Сигнатуры функций" },
            { type: "text", content: "Типизировать нужно аргументы и тип возвращаемого значения. Если функция ничего не возвращает, мы пишем void." },
            { type: "text", content: "А как описать тип самой функции, если мы хотим передать её как callback (колбэк)? Для этого используется стрелочный синтаксис типизации:" },
            { type: "code", content: '// Тип: функция принимает строку и ничего не возвращает\ntype LogFn = (msg: string) => void;\n\nfunction processData(logger: LogFn) {\n    logger("Данные обработаны!");\n}' },
            { type: "heading", content: "Rest Parameters (...args)" },
            { type: "text", content: "Если функция принимает неограниченное количество аргументов через оператор spread (троеточие), мы типизируем это как массив." },
            { type: "code", content: "function sumAll(...numbers: number[]): number {\n    return numbers.reduce((acc, val) => acc + val, 0);\n}\nsumAll(1, 2, 3, 4); // 10" },
            { type: "heading", content: "Тип never" },
            { type: "text", content: "Это один из самых сложных для понимания типов. never означает значение, которое никогда не произойдёт. Функция, возвращающая never, никогда не закончит своё выполнение успешно. Она либо всегда выбрасывает исключение (throw Error), либо содержит бесконечный цикл (while true)." },
            { type: "code", content: "function crashApp(errorMsg: string): never {\n    throw new Error(errorMsg); // Функция не завершается, она прерывает выполнение\n}" },
            { type: "text", content: "Также never используется компилятором TS в проверках типов (Narrowing) для исчерпывающих проверок (Exhaustiveness checking), чтобы убедиться, что вы обработали все возможные случаи в конструкции switch/case." }
          ]
        },
        practice: {
          title: "Типизация функции",
          description: "Опиши тип функции и реализуй её.",
          task: "1. Создайте тип MathFn, который описывает функцию, принимающую два числа (a, b) и возвращающую number. 2. Создайте две константы: стрелочные функции add и multiply, явно указав им тип MathFn. 3. Выведите результат add(10, 5) и multiply(10, 5).",
          starterCode: '// 1. Создайте тип MathFn\n\n\n// 2. Реализуйте функции add и multiply\n\n\n// 3. Выведите результат\n'
        },
        type: "javascript"
      },
      // ============= УРОК 5 =============
      {
        id: "ts-unions",
        title: "Union, Literal Types и мощь Narrowing",
        theory: {
          sections: [
            { type: "heading", content: "Literal Types (Буквальные типы)" },
            { type: "text", content: "Вместо использования типа string, мы можем ограничить переменную конкретными строками. Это намного безопаснее, чем обычные строки." },
            { type: "code", content: 'type Method = "GET" | "POST" | "DELETE";\nlet reqMethod: Method = "GET"; // Ок\n// reqMethod = "PUT"; // ОШИБКА: "PUT" не определён в типе' },
            { type: "heading", content: "Narrowing (Сужение типов)" },
            { type: "text", content: 'Если в функцию приходит Union-тип (например, string | Date), TS запретит вызывать методы строки, потому что там может быть дата. Нам нужно "сузить" тип (доказать компилятору, с чем мы работаем).' },
            { type: "heading", content: "1. typeof" },
            { type: "text", content: "Используется для примитивов (строк, чисел, булевых значений)." },
            { type: "code", content: 'function printLength(val: string | number) {\n    if (typeof val === "string") {\n        console.log(val.length); // Тут TS знает, что это строка\n    }\n}' },
            { type: "heading", content: "2. instanceof" },
            { type: "text", content: "Используется для проверки объектов, созданных через классы (например, Date, Map)." },
            { type: "code", content: "function printDate(date: Date | string) {\n    if (date instanceof Date) {\n        console.log(date.toISOString());\n    }\n}" },
            { type: "heading", content: "Киллер-фича: Discriminated Unions (Размеченные объединения)" },
            { type: "text", content: "Это самый мощный паттерн для работы со state-менеджерами (Redux) или API. Мы создаём объединение объектов, у которых есть общее поле (дискриминатор), обычно это поле type." },
            { type: "code", content: 'interface SuccessState { type: "success"; data: string[]; }\ninterface ErrorState { type: "error"; errorMsg: string; }\n\ntype AppState = SuccessState | ErrorState;\n\nfunction renderUI(state: AppState) {\n    if (state.type === "success") {\n        // TS знает: если type="success", значит поле errorMsg здесь НЕ СУЩЕСТВУЕТ, есть только data\n        console.log("Данные:", state.data);\n    } else {\n        // А здесь TS знает, что это ErrorState\n        console.log("Ошибка:", state.errorMsg);\n    }\n}' }
          ]
        },
        practice: {
          title: "Discriminated Union",
          description: "Сузь объединение по полю-дискриминатору.",
          task: "Реализуйте паттерн Discriminated Union. 1. Создайте типы Car (с полем type: 'car' и wheels: number) и Boat (с полем type: 'boat' и propellers: number). 2. Создайте объединение type Transport = Car | Boat. 3. Напишите функцию printInfo(t: Transport), которая проверяет поле type и выводит либо количество колёс, либо количество винтов.",
          starterCode: "// 1. Опишите типы и объединение Transport\n\n\n\n// 2. Функция с Narrowing по полю type\nfunction printInfo(t) {\n    \n}\n\n// Вызовы\nprintInfo({ type: 'car', wheels: 4 });\nprintInfo({ type: 'boat', propellers: 2 });"
        },
        type: "javascript"
      },
      // ============= УРОК 6 =============
      {
        id: "ts-generics",
        title: "Generics (Дженерики) и Utility Types",
        theory: {
          sections: [
            { type: "heading", content: "Что такое Generics?" },
            { type: "text", content: "Дженерики (Обобщения) — это переменные для типов. Они позволяют создавать переиспользуемые компоненты и функции. Вы передаёте тип параметром в угловых скобках <T>." },
            { type: "text", content: "Представьте, что вы пишете функцию API, которая запрашивает данные. В момент написания функции вы не знаете, какие данные придут (User, Product или Comment). Дженерики решают эту проблему." },
            { type: "code", content: '// T определится в момент вызова функции\nfunction identity<T>(arg: T): T {\n    return arg;\n}\n\nlet num = identity<number>(42);  // Возвращает number\nlet str = identity("Текст");     // TS сам понимает, что T - это string!' },
            { type: "heading", content: "Ограничения Дженериков (Constraints)" },
            { type: "text", content: "Иногда нам нужно, чтобы T был не вообще любым типом, а обязательно имел определённые свойства. Для этого мы используем ключевое слово extends." },
            { type: "code", content: 'interface HasLength { length: number; }\n\n// T обязан иметь свойство length!\nfunction printLength<T extends HasLength>(item: T) {\n    console.log(item.length);\n}\n\nprintLength("Привет"); // У строки есть length\nprintLength([1, 2, 3]); // У массива есть length\n// printLength(100); // ОШИБКА! У числа нет length' },
            { type: "heading", content: "Utility Types (Встроенные помощники)" },
            { type: "text", content: 'TypeScript "из коробки" предоставляет набор глобальных типов для трансформации существующих.' },
            { type: "list", items: [
              "Partial<T> — делает все поля объекта необязательными. Идеально для функций обновления (PATCH запросов), когда мы меняем только часть полей.",
              "Omit<T, K> — берёт тип и удаляет из него указанные ключи. Например, при создании пользователя в базе нам не нужно передавать id."
            ]},
            { type: "code", content: 'interface User { id: number; name: string; email: string; }\n\n// Удалили id, оставив только name и email\ntype UserCreationDTO = Omit<User, "id">;\n\n// Все поля стали опциональными (id?, name?, email?)\ntype UserUpdateDTO = Partial<User>;' }
          ]
        },
        practice: {
          title: "Partial на практике",
          description: "Используй встроенный utility-тип Partial.",
          task: "1. Создайте interface Product { id: number; title: string; price: number; }. 2. Создайте тип UpdateProductDTO с помощью встроенного дженерика Partial<Product>. 3. Напишите функцию updateProduct(id: number, changes: UpdateProductDTO), которая выводит в консоль \"Обновляем товар ID:\" + id и объект changes. 4. Вызовите функцию, передав только поле price.",
          starterCode: '// 1. Интерфейс Product\n\n\n// 2. Тип UpdateProductDTO через Partial\n\n\n// 3. Функция updateProduct\n\n\n// 4. Вызов функции\n'
        },
        type: "javascript"
      }
    ]
  }
};
