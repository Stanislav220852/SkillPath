export const reactLessons: Record<'EN' | 'RU', any> = {
  EN: {
    title: "React",
    description: "Learn React step by step — JSX, components, props, state and events, with real code examples.",
    lessons: [
      // ============= LESSON 1 =============
      {
        id: "react-jsx",
        title: "What is React and JSX",
        theory: {
          sections: [
            { type: "heading", content: "Why React?" },
            { type: "text", content: "React is a library by Facebook for building user interfaces. In plain JavaScript we find elements on the page (with document.getElementById) and change them by hand. In React we use a declarative approach: we just describe HOW the interface should look, and React updates the right parts of the page when the data changes." },
            { type: "heading", content: "The magic of JSX" },
            { type: "text", content: "React uses JSX — a special syntax that lets you write HTML-like code right inside JavaScript files. It sounds crazy, but in practice it's incredibly convenient!" },
            { type: "code", content: "// A regular function that returns a piece of UI\nfunction HelloWorld() {\n    return (\n        <div>\n            <h1>Hello, world!</h1>\n        </div>\n    );\n}" },
            { type: "heading", content: "Important JSX rules:" },
            { type: "list", items: [
              "Only one root element. You can't return two sibling <div>s. Wrap them in one shared <div> or in an empty fragment <> ... </>.",
              "All tags must be closed. In HTML you can write <img src=\"...\">. In JSX you must close it: <img src=\"...\" />.",
              "class becomes className. Since class is reserved in JavaScript, CSS classes use className=\"...\"."
            ]},
            { type: "heading", content: "Inserting JavaScript into JSX" },
            { type: "text", content: "If you want to insert a variable or a calculation into your markup, just wrap it in curly braces {}." },
            { type: "code", content: 'function Profile() {\n    const name = "Ivan";\n    const age = 25;\n    \n    return <h2>My name is {name}, I am {age} years old.</h2>;\n}' },
            { type: "tip", content: "In our sandbox there must always be a main component named App. It is the one rendered on screen when you press Run." }
          ]
        },
        practice: {
          title: "Your first component",
          description: "Write the App component and return JSX.",
          task: 'Create an App component. Inside it declare a variable tech = "React". The component should return a <div> containing an <h1> with the text "Learning {tech}" and a <p> with "JSX is cool!".',
          starterCode: 'function App() {\n    // Create the variable tech\n    \n    // Return JSX markup\n    return (\n        <div>\n            \n        </div>\n    );\n}'
        },
        type: "javascript"
      },
      // ============= LESSON 2 =============
      {
        id: "react-props",
        title: "Components and Props",
        theory: {
          sections: [
            { type: "heading", content: "Divide and conquer" },
            { type: "text", content: "The essence of React is splitting the UI into independent, reusable pieces called components. A component in React is just a regular JavaScript function that returns JSX. Component names must ALWAYS start with a capital letter (otherwise React thinks it's a normal HTML tag)." },
            { type: "code", content: "function Button() {\n    return <button>Click me!</button>;\n}\n\n// Now we can use it inside App as many times as we want:\nfunction App() {\n    return (\n        <div>\n            <Button />\n            <Button />\n        </div>\n    );\n}" },
            { type: "heading", content: "Props (Properties)" },
            { type: "text", content: "If components are functions, how do we pass arguments to them? In React this is called props. We pass props to a component just like HTML attributes." },
            { type: "code", content: '// Passing props "name" and "role"\n<UserCard name="Anna" role="Admin" />' },
            { type: "text", content: "Inside the component all passed attributes are collected into one object, traditionally called props (it comes as the first argument to the function)." },
            { type: "code", content: 'function UserCard(props) {\n    return (\n        <div className="card">\n            <h3>Name: {props.name}</h3>\n            <p>Role: {props.role}</p>\n        </div>\n    );\n}' },
            { type: "heading", content: "Destructuring (the advanced way)" },
            { type: "text", content: 'Usually programmers don\'t write props.name every time. They "unpack" the needed properties right in the function parameters using curly braces:' },
            { type: "code", content: "function UserCard({ name, role }) {\n    return <h3>{name} — {role}</h3>;\n}" }
          ]
        },
        practice: {
          title: "Reusable greeting",
          description: "Create a component that takes a prop and reuse it.",
          task: '1. Create a Greeting component that takes a userName prop and returns <h2>Hello, {userName}!</h2>. 2. Inside App call Greeting twice: once with userName="Alex", once with userName="Maria".',
          starterCode: '// 1. Create the Greeting component\n\n\n// 2. Use it in App\nfunction App() {\n    return (\n        <div>\n            \n        </div>\n    );\n}'
        },
        type: "javascript"
      },
      // ============= LESSON 3 =============
      {
        id: "react-state",
        title: "State and the useState Hook",
        theory: {
          sections: [
            { type: "heading", content: "The problem with Props" },
            { type: "text", content: "Props are read-only. You can't change props from inside the component they were passed to. So how do we make interactive things: counters, modals, checkboxes?" },
            { type: "heading", content: "What is State?" },
            { type: "text", content: 'State is the private, changeable memory of a component. When a component\'s state changes, React automatically re-renders it on screen with the new data. That is the "reactivity"!' },
            { type: "heading", content: "The useState hook" },
            { type: "text", content: "To add state to a functional component, we use a special React function called useState (this is called a hook)." },
            { type: "code", content: "const [count, setCount] = useState(0);" },
            { type: "text", content: "Let's break down this line, it's the key to all of React:" },
            { type: "list", items: [
              "useState(0) — we say: create state for me with an initial value of 0.",
              "It returns an array of TWO elements. We destructure them immediately as [count, setCount].",
              "count — the variable with the current value (right now it's 0).",
              "setCount — a FUNCTION we use to change that value!"
            ]},
            { type: "heading", content: "Counter example" },
            { type: "code", content: "function Counter() {\n    const [likes, setLikes] = useState(0);\n    \n    return (\n        <div>\n            <p>Likes: {likes}</p>\n            {/* On click we call setLikes */}\n            <button onClick={() => setLikes(likes + 1)}>\n                Like\n            </button>\n        </div>\n    );\n}" },
            { type: "tip", content: "In our sandbox useState is already imported. In a real project, at the top of the file you write: import { useState } from 'react';" }
          ]
        },
        practice: {
          title: "Light switch",
          description: "Use useState to toggle a boolean.",
          task: "Create a light switch. In App create state isOn with an initial value of false. Render the text \"Light is on: YES/NO\" (use the ternary operator isOn ? 'YES' : 'NO'). Below add a button that toggles the state on click: setIsOn(!isOn).",
          starterCode: "function App() {\n    // Create state isOn and the setIsOn function\n    \n    return (\n        <div>\n            <h3>Light is on: {/* condition here */}</h3>\n            <button onClick={/* update function here */}>\n                Toggle light\n            </button>\n        </div>\n    );\n}"
        },
        type: "javascript"
      },
      // ============= LESSON 4 =============
      {
        id: "react-events",
        title: "Handling Events",
        theory: {
          sections: [
            { type: "heading", content: "Events in React" },
            { type: "text", content: "Handling clicks, text input and other user actions in React is very similar to plain HTML, but with a couple of important differences:" },
            { type: "list", items: [
              "Events are written in camelCase (not onclick but onClick; not onchange but onChange).",
              "As a handler we pass the FUNCTION itself (in curly braces), not a string of code."
            ]},
            { type: "heading", content: "Reading data from input fields" },
            { type: "text", content: 'In classic web we take an input and read its .value. In React we do the opposite: we "bind" the input\'s value to state. React state becomes the single source of truth. This is called a Controlled Component.' },
            { type: "code", content: 'function NameInput() {\n    // 1. Create state for the text\n    const [text, setText] = useState("");\n\n    // 2. A function that runs on every keypress\n    const handleChange = (event) => {\n        // event.target.value is what was typed in the field\n        setText(event.target.value);\n    };\n\n    return (\n        <div>\n            {/* 3. Bind value to state and listen to onChange */}\n            <input \n                type="text" \n                value={text} \n                onChange={handleChange} \n            />\n            <p>You are typing: {text}</p>\n        </div>\n    );\n}' },
            { type: "heading", content: "The event object" },
            { type: "text", content: "Notice the event parameter (often shortened to e). It's an object the browser automatically passes to your function. It holds all the info about what happened. For inputs we always care about e.target.value — the text in the field right now." }
          ]
        },
        practice: {
          title: "Echo input",
          description: "A controlled input that echoes text in uppercase.",
          task: 'Make an "echo input". In App create state message (empty string by default). Add an <input />, bind its value to the state and add an onChange handler that updates the state. Below the input print the text in uppercase using message.toUpperCase().',
          starterCode: 'function App() {\n    // Your code here\n    \n    return (\n        <div>\n            <h2>Echo room</h2>\n            <input type="text" placeholder="Type something..." />\n            <p>ECHO: {/* variable in uppercase here */}</p>\n        </div>\n    );\n}'
        },
        type: "javascript"
      },
      // ============= LESSON 5 =============
      {
        id: "react-lists",
        title: "Rendering Lists and Conditions",
        theory: {
          sections: [
            { type: "heading", content: "Conditional rendering" },
            { type: "text", content: "We already mentioned the ternary operator condition ? yes : no. But what if we want to show an element when the condition is true and show NOTHING when it's false? For that we use logical AND (&&)." },
            { type: "code", content: "function Notification({ hasNewMessages }) {\n    return (\n        <div>\n            <h3>Your profile</h3>\n            {/* The badge shows only if hasNewMessages === true */}\n            {hasNewMessages && <span>You have a new message!</span>}\n        </div>\n    );\n}" },
            { type: "heading", content: "Rendering lists (the map method)" },
            { type: "text", content: "There are no for loops inside JSX. To render a list (array) of elements, we use the built-in array method .map(). It goes through each item of the array and \"turns\" it into JSX." },
            { type: "code", content: 'const fruits = ["Apple", "Banana", "Kiwi"];\n\nfunction FruitList() {\n    return (\n        <ul>\n            {fruits.map((fruit, index) => (\n                <li key={index}>{fruit}</li>\n            ))}\n        </ul>\n    );\n}' },
            { type: "heading", content: "Why the key prop matters" },
            { type: "text", content: "Noticed key={index}? When React draws a list, it needs to uniquely identify each element (to know if an item was removed, added or moved, and not re-render the whole list). EVERY element inside map must have a key prop! Prefer unique IDs from a database (e.g. item.id), but if there are none — you can use index." }
          ]
        },
        practice: {
          title: "To-do list",
          description: "Render an array with map and use a condition.",
          task: "We have an array tasks = ['Feed the cat', 'Learn React', 'Take a walk']. In App use tasks.map() to render a list of <li> inside a <ul>. Don't forget the key! Bonus: add a button that clears the array (via state) and a condition: if the array is empty, show \"No tasks!\".",
          starterCode: "function App() {\n    // Make tasks a state so we can clear it\n    const [tasks, setTasks] = useState([\n        'Feed the cat',\n        'Learn React',\n        'Take a walk'\n    ]);\n\n    return (\n        <div>\n            <h2>To-do list</h2>\n            {/* If tasks length is 0, show \"No tasks!\" */}\n            \n            <ul>\n                {/* Render the task list here with map */}\n            </ul>\n            \n            <button onClick={() => setTasks([])}>Clear list</button>\n        </div>\n    );\n}"
        },
        type: "javascript"
      }
    ]
  },
  RU: {
    title: "React",
    description: "Учим React шаг за шагом — JSX, компоненты, пропсы, состояние и события, с реальными примерами кода.",
    lessons: [
      // ============= УРОК 1 =============
      {
        id: "react-jsx",
        title: "Что такое React и JSX",
        theory: {
          sections: [
            { type: "heading", content: "Почему React?" },
            { type: "text", content: "React — это библиотека от Facebook для создания пользовательских интерфейсов. В обычном JavaScript мы ищем элементы на странице (через document.getElementById) и вручную меняем их. В React мы используем декларативный подход: мы просто описываем, как должен выглядеть интерфейс, а React сам обновляет нужные части страницы при изменении данных." },
            { type: "heading", content: "Магия JSX" },
            { type: "text", content: "React использует JSX — специальный синтаксис, который позволяет писать HTML-подобный код прямо внутри JavaScript файлов. Это звучит безумно, но на практике это невероятно удобно!" },
            { type: "code", content: "// Обычная функция, которая возвращает кусок интерфейса\nfunction HelloWorld() {\n    return (\n        <div>\n            <h1>Привет, мир!</h1>\n        </div>\n    );\n}" },
            { type: "heading", content: "Важные правила JSX:" },
            { type: "list", items: [
              "Только один корневой элемент. Нельзя вернуть два соседних <div>. Их нужно обернуть в один общий <div> или в пустой фрагмент <> ... </>.",
              "Все теги должны быть закрыты. В HTML можно написать <img src=\"...\">. В JSX обязательно закрывать: <img src=\"...\" />.",
              "class превращается в className. Так как слово class зарезервировано в JavaScript, для CSS-классов используется className=\"...\"."
            ]},
            { type: "heading", content: "Вставка JavaScript в JSX" },
            { type: "text", content: "Если вы хотите вставить переменную или результат вычисления внутрь разметки, просто оберните это в фигурные скобки {}." },
            { type: "code", content: 'function Profile() {\n    const name = "Иван";\n    const age = 25;\n    \n    return <h2>Меня зовут {name}, мне {age} лет.</h2>;\n}' },
            { type: "tip", content: "В нашей песочнице всегда должен быть главный компонент с именем App. Именно он рендерится на экран при нажатии кнопки." }
          ]
        },
        practice: {
          title: "Твой первый компонент",
          description: "Напиши компонент App и верни JSX.",
          task: 'Создайте компонент App. Внутри него объявите переменную tech = "React". Компонент должен возвращать <div>, внутри которого заголовок <h1> с текстом "Изучаем {tech}" и параграф <p> с текстом "JSX — это круто!".',
          starterCode: 'function App() {\n    // Создайте переменную tech\n    \n    // Верните JSX разметку\n    return (\n        <div>\n            \n        </div>\n    );\n}'
        },
        type: "javascript"
      },
      // ============= УРОК 2 =============
      {
        id: "react-props",
        title: "Компоненты и Props (Свойства)",
        theory: {
          sections: [
            { type: "heading", content: "Разделяй и властвуй" },
            { type: "text", content: "Суть React — разбиение интерфейса на независимые, переиспользуемые кусочки, которые называются компонентами. Компонент в React — это просто обычная JavaScript функция, которая возвращает JSX. Названия компонентов всегда должны начинаться с заглавной буквы (иначе React подумает, что это обычный HTML-тег)." },
            { type: "code", content: "function Button() {\n    return <button>Нажми меня!</button>;\n}\n\n// Теперь мы можем использовать его внутри App сколько угодно раз:\nfunction App() {\n    return (\n        <div>\n            <Button />\n            <Button />\n        </div>\n    );\n}" },
            { type: "heading", content: "Props (Пропсы / Свойства)" },
            { type: "text", content: "Если компоненты — это функции, то как передать в них аргументы? В React это называется props. Мы передаём пропсы компоненту точно так же, как атрибуты в HTML." },
            { type: "code", content: '// Передаём пропсы name и role\n<UserCard name="Анна" role="Админ" />' },
            { type: "text", content: "В самом компоненте все переданные атрибуты собираются в один объект, который мы традиционно называем props (он приходит первым аргументом в функцию)." },
            { type: "code", content: 'function UserCard(props) {\n    return (\n        <div className="card">\n            <h3>Имя: {props.name}</h3>\n            <p>Роль: {props.role}</p>\n        </div>\n    );\n}' },
            { type: "heading", content: "Деструктуризация (продвинутый способ)" },
            { type: "text", content: 'Обычно программисты не пишут props.name каждый раз. Они сразу "распаковывают" нужные свойства прямо в параметрах функции с помощью фигурных скобок:' },
            { type: "code", content: "function UserCard({ name, role }) {\n    return <h3>{name} — {role}</h3>;\n}" }
          ]
        },
        practice: {
          title: "Переиспользуемое приветствие",
          description: "Создай компонент с пропом и переиспользуй его.",
          task: '1. Создайте компонент Greeting, который принимает проп userName и возвращает <h2>Привет, {userName}!</h2>. 2. Внутри App вызовите Greeting дважды: один раз передав userName="Алексей", второй раз userName="Мария".',
          starterCode: '// 1. Создайте компонент Greeting\n\n\n// 2. Используйте его в App\nfunction App() {\n    return (\n        <div>\n            \n        </div>\n    );\n}'
        },
        type: "javascript"
      },
      // ============= УРОК 3 =============
      {
        id: "react-state",
        title: "Состояние (State) и хук useState",
        theory: {
          sections: [
            { type: "heading", content: "Проблема Props" },
            { type: "text", content: "Пропсы доступны только для чтения. Вы не можете изменить пропсы изнутри компонента, которому они переданы. Но как тогда делать интерактивные вещи: счётчики, модальные окна, чекбоксы?" },
            { type: "heading", content: "Что такое State?" },
            { type: "text", content: 'State (Состояние) — это личная, изменяемая память компонента. Когда состояние компонента меняется, React автоматически перерисовывает этот компонент на экране с новыми данными. Это и есть та самая "реактивность"!' },
            { type: "heading", content: "Хук useState" },
            { type: "text", content: "Чтобы добавить состояние в функциональный компонент, мы используем специальную функцию React, которая называется useState (это называется хуком)." },
            { type: "code", content: "const [count, setCount] = useState(0);" },
            { type: "text", content: "Давайте разберём эту строчку, она ключевая во всём React:" },
            { type: "list", items: [
              "useState(0) — мы говорим: создай мне состояние и пусть его начальное значение будет 0.",
              "Он возвращает массив из двух элементов. Мы сразу достаём их через деструктуризацию [count, setCount].",
              "count — это переменная с текущим значением (сейчас там 0).",
              "setCount — это функция, с помощью которой мы можем изменить это значение!"
            ]},
            { type: "heading", content: "Пример счётчика" },
            { type: "code", content: "function Counter() {\n    const [likes, setLikes] = useState(0);\n    \n    return (\n        <div>\n            <p>Лайков: {likes}</p>\n            {/* При клике вызываем функцию setLikes */}\n            <button onClick={() => setLikes(likes + 1)}>\n                Поставить лайк\n            </button>\n        </div>\n    );\n}" },
            { type: "tip", content: "В нашей песочнице useState уже импортирован. В реальном проекте в самом верху файла нужно писать: import { useState } from 'react';" }
          ]
        },
        practice: {
          title: "Выключатель света",
          description: "Используй useState для переключения булевого значения.",
          task: "Создайте выключатель света. В App создайте состояние isOn с начальным значением false. Отрендерите текст: \"Свет включен: ДА/НЕТ\" (используйте тернарный оператор isOn ? 'ДА' : 'НЕТ'). Ниже добавьте кнопку, которая при клике меняет состояние на противоположное: setIsOn(!isOn).",
          starterCode: "function App() {\n    // Создайте состояние isOn и функцию setIsOn\n    \n    return (\n        <div>\n            <h3>Свет включен: {/* тут условие */}</h3>\n            <button onClick={/* тут функция обновления */}>\n                Переключить свет\n            </button>\n        </div>\n    );\n}"
        },
        type: "javascript"
      },
      // ============= УРОК 4 =============
      {
        id: "react-events",
        title: "Обработка событий",
        theory: {
          sections: [
            { type: "heading", content: "События в React" },
            { type: "text", content: "Обработка кликов, ввода текста и других действий пользователя в React очень похожа на обычный HTML, но с парой важных отличий:" },
            { type: "list", items: [
              "События пишутся в стиле camelCase (не onclick, а onClick; не onchange, а onChange).",
              "В качестве обработчика мы передаём саму функцию (в фигурных скобках), а не строку с кодом."
            ]},
            { type: "heading", content: "Чтение данных из полей ввода (Input)" },
            { type: "text", content: 'В классическом вебе мы берём input и читаем его .value. В React мы делаем наоборот: мы "связываем" значение инпута со State-ом. Состояние React становится единственным источником правды. Это называется Контролируемый компонент.' },
            { type: "code", content: 'function NameInput() {\n    // 1. Создаём состояние для текста\n    const [text, setText] = useState("");\n\n    // 2. Функция, которая сработает при каждом нажатии клавиши\n    const handleChange = (event) => {\n        // event.target.value — это то, что введено в поле\n        setText(event.target.value);\n    };\n\n    return (\n        <div>\n            {/* 3. Привязываем value к состоянию и слушаем onChange */}\n            <input \n                type="text" \n                value={text} \n                onChange={handleChange} \n            />\n            <p>Вы вводите: {text}</p>\n        </div>\n    );\n}' },
            { type: "heading", content: "Объект события (event)" },
            { type: "text", content: "Обратите внимание на параметр event (часто сокращают до e). Это объект, который браузер автоматически передаёт в вашу функцию. В нём хранится вся информация о произошедшем событии. В случае с инпутами нас всегда интересует e.target.value — текст, который находится в поле прямо сейчас." }
          ]
        },
        practice: {
          title: "Эхо-инпут",
          description: "Контролируемый инпут, который выводит текст большими буквами.",
          task: 'Сделайте "Эхо-инпут". В App создайте состояние message (по умолчанию пустая строка). Добавьте тег <input />, свяжите его value с состоянием и добавьте обработчик onChange, который обновляет это состояние. Под инпутом выводите текст большими буквами, используя message.toUpperCase().',
          starterCode: 'function App() {\n    // Ваш код здесь\n    \n    return (\n        <div>\n            <h2>Эхо-комната</h2>\n            <input type="text" placeholder="Введите текст..." />\n            <p>ЭХО: {/* тут переменная большими буквами */}</p>\n        </div>\n    );\n}'
        },
        type: "javascript"
      },
      // ============= УРОК 5 =============
      {
        id: "react-lists",
        title: "Отрисовка списков и условия",
        theory: {
          sections: [
            { type: "heading", content: "Условный рендеринг" },
            { type: "text", content: "Мы уже упоминали тернарный оператор условие ? да : нет. Но что, если мы хотим показать элемент, если условие верно, и ничего не показывать, если оно ложно? Для этого используют логическое И (&&)." },
            { type: "code", content: "function Notification({ hasNewMessages }) {\n    return (\n        <div>\n            <h3>Ваш профиль</h3>\n            {/* Бейдж покажется только если hasNewMessages === true */}\n            {hasNewMessages && <span>У вас новое сообщение!</span>}\n        </div>\n    );\n}" },
            { type: "heading", content: "Отрисовка списков (метод map)" },
            { type: "text", content: 'В React нет циклов for внутри JSX. Чтобы вывести список (массив) элементов, мы используем встроенный метод массивов — .map(). Он проходит по каждому элементу массива и "превращает" его в JSX.' },
            { type: "code", content: 'const fruits = ["Яблоко", "Банан", "Киви"];\n\nfunction FruitList() {\n    return (\n        <ul>\n            {fruits.map((fruit, index) => (\n                <li key={index}>{fruit}</li>\n            ))}\n        </ul>\n    );\n}' },
            { type: "heading", content: "Важность свойства key" },
            { type: "text", content: "Обратили внимание на key={index}? Когда React рисует список, ему нужно уникально идентифицировать каждый элемент (чтобы понимать, если элемент удалили, добавили или переместили, и не перерисовывать весь список заново). Каждый элемент внутри map обязан иметь проп key! Желательно использовать уникальные ID из базы данных (например item.id), но если их нет — можно использовать index." }
          ]
        },
        practice: {
          title: "Список дел",
          description: "Отрендери массив через map и используй условие.",
          task: "У нас есть массив tasks = ['Покормить кота', 'Изучить React', 'Погулять']. В компоненте App используйте tasks.map(), чтобы отрендерить список <li> внутри тега <ul>. Не забудьте про key! Доп: добавьте кнопку, которая очищает массив (через state), и условие: если массив пуст, выводите текст \"Дел нет!\".",
          starterCode: "function App() {\n    // Сделаем tasks состоянием, чтобы можно было его очистить\n    const [tasks, setTasks] = useState([\n        'Покормить кота',\n        'Изучить React',\n        'Погулять'\n    ]);\n\n    return (\n        <div>\n            <h2>Список дел</h2>\n            {/* Если длина tasks равна 0, вывести \"Дел нет!\" */}\n            \n            <ul>\n                {/* Отрендерить список задач здесь через map */}\n            </ul>\n            \n            <button onClick={() => setTasks([])}>Очистить список</button>\n        </div>\n    );\n}"
        },
        type: "javascript"
      }
    ]
  }
};
