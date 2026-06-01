export const rnPerformanceState: Record<'EN' | 'RU', any> = {
  EN: {
    title: "Mobile Performance (PRO)",
    description: "Bundle size, render optimization, and Native Modules. Make your app run at a buttery-smooth 60 FPS.",
    lessons: [
      {
        id: "perf-the-bridge",
        title: "Under the Hood: The Bridge Bottleneck",
        theory: {
          sections: [
            { type: "heading", content: "Two Different Worlds" },
            { type: "text", content: "To optimize React Native, you must understand how it works. Your app runs in two separate realms:" },
            { type: "list", items: [
              "The JS Thread: Where your React logic, state, and API calls live.",
              "The UI Thread (Main Thread): Where the native OS (iOS/Android) actually draws the pixels on the screen."
            ]},
            { type: "heading", content: "The Bridge (Serialization)" },
            { type: "text", content: "These two threads do not share memory. They communicate by sending JSON messages across 'The Bridge'. If you animate a box moving across the screen by updating JS state every millisecond, you send thousands of JSON messages across the Bridge. The Bridge gets congested, messages drop, and your animation stutters (Frame Drops)." },
            { type: "tip", content: "Resource: RN Performance Docs. The official React Native performance guide states clearly: 'Pass as little data over the bridge as possible'. Always use the native Animated API (useNativeDriver: true) or Reanimated, which run animations entirely on the UI thread, bypassing the Bridge completely." }
          ]
        },
        practice: {
          title: "Blocking the JS Thread",
          description: "See what happens when JS is busy.",
          task: "This is a conceptual exercise. Look at the code. We have a 'Heavy Calculation' button. If you run a massive loop on the JS thread, you block it. Touch events (like clicking other buttons) will freeze until the loop finishes.",
          starterCode: "import React, { useState } from 'react';\nimport { View, Button, Text } from 'react-native';\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n\n  const runHeavyTask = () => {\n    // BLOCKING THE JS THREAD!\n    // The UI will freeze during this loop.\n    for (let i = 0; i < 999999999; i++) {}\n    console.log(\"Task done\");\n  };\n\n  return (\n    <View>\n      <Button title=\"Heavy Task\" onPress={runHeavyTask} />\n      <Button title=\"Count\" onPress={() => setCount(c => c + 1)} />\n      <Text>{count}</Text>\n    </View>\n  );\n}"
        },
        type: "javascript"
      },
      {
        id: "perf-hermes",
        title: "The Hermes Engine (Fast Startup)",
        theory: {
          sections: [
            { type: "heading", content: "The JIT Problem" },
            { type: "text", content: "Historically, React Native used Safari's JavaScriptCore (JSC) engine. It used JIT (Just-In-Time) compilation. This meant that when the user tapped your app icon, the phone had to parse and compile your JavaScript code INTO machine code right then and there. This resulted in a very slow Time To Interactive (TTI) / Startup time." },
            { type: "heading", content: "Enter Hermes" },
            { type: "text", content: "Facebook built a brand new open-source JS engine explicitly optimized for mobile devices, called Hermes." },
            { type: "text", content: "Hermes uses AOT (Ahead-Of-Time) compilation. When you build your app in the cloud (EAS Build), Hermes compiles your JavaScript into optimized Bytecode. When the user opens the app, there is no parsing—the bytecode executes instantly. This reduces app startup time by 50% and decreases memory usage (RAM)." },
            { type: "tip", content: "Resource: Hermes engine docs. Hermes is now the default engine in Expo and React Native, but in older projects, you might need to enable it manually in your app.json." }
          ]
        },
        practice: {
          title: "Enable Hermes",
          description: "Configure app.json to use the Hermes engine.",
          task: "In the Expo ecosystem, enabling Hermes is as simple as flipping a boolean in your app.json. Find the 'jsEngine' key under 'expo' and change it from 'jsc' to 'hermes'.",
          starterCode: "{\n  \"expo\": {\n    \"name\": \"My High Perf App\",\n    \"version\": \"1.0.0\",\n    // Switch the JS engine to Hermes\n    \"jsEngine\": \"jsc\"\n  }\n}"
        },
        type: "json"
      },
      {
        id: "perf-flatlist",
        title: "Extreme FlatList Optimization",
        theory: {
          sections: [
            { type: "heading", content: "The Measurement Overhead" },
            { type: "text", content: "You already know you should use FlatList instead of ScrollView. But even FlatList can lag if you have complex items (like Instagram posts with videos and comments)." },
            { type: "text", content: "By default, FlatList renders items asynchronously to figure out their height. If you scroll fast, it has to calculate heights on the fly, leading to blank white spaces." },
            { type: "heading", content: "getItemLayout" },
            { type: "text", content: "If all your list items have a fixed height (e.g., exactly 80 pixels), you can use the `getItemLayout` prop. You tell FlatList exactly where every item is located in advance. This skips the measurement phase entirely, making scrolling blazingly fast." },
            { type: "code", content: "<FlatList \n  data={data}\n  renderItem={renderItem}\n  getItemLayout={(data, index) => ({\n    length: 80, // Item height\n    offset: 80 * index, // Distance from top\n    index,\n  })}\n/>" }
          ]
        },
        practice: {
          title: "Optimize the Feed",
          description: "Implement getItemLayout.",
          task: "Complete the getItemLayout prop in the FlatList. Each user row is exactly 60 pixels tall. Return an object with 'length: 60', 'offset: 60 * index', and 'index'.",
          starterCode: "import React from 'react';\nimport { FlatList, Text, View } from 'react-native';\n\nexport default function FastList({ users }) {\n  return (\n    <FlatList\n      data={users}\n      keyExtractor={item => item.id}\n      renderItem={({ item }) => (\n        <View style={{ height: 60 }}>\n          <Text>{item.name}</Text>\n        </View>\n      )}\n      // Add the optimization here:\n      getItemLayout={(data, index) => ({\n        \n      })}\n    />\n  );\n}"
        },
        type: "javascript"
      },
      {
        id: "perf-renders",
        title: "Render Optimization (React.memo)",
        theory: {
          sections: [
            { type: "heading", content: "Wasted Renders" },
            { type: "text", content: "Every time a parent component updates its state, ALL of its children re-render. If you type in a Search input, and a heavy Chart component sits below it, the Chart will re-draw 60 times a second, freezing the UI." },
            { type: "heading", content: "React.memo & useCallback" },
            { type: "text", content: "You wrap the child component in `React.memo()`. This tells React: 'Do not re-render this child UNLESS its props change'." },
            { type: "text", content: "However, if you pass a function (like `onPress={() => doSomething()}`) as a prop, React creates a NEW function in memory on every parent render. The child sees a 'new' prop and re-renders anyway, breaking React.memo! You must wrap the function in `useCallback()` to cache its memory reference." },
            { type: "code", content: "// Child is protected\nconst HeavyChart = React.memo(({ onSelect }) => { ... });\n\n// Parent passes a cached function\nconst handleSelect = useCallback(() => setMode('active'), []);" }
          ]
        },
        practice: {
          title: "Stop the Wasted Renders",
          description: "Use React.memo and useCallback.",
          task: "1. Wrap the `ListItem` component with React.memo(). 2. Wrap the `handleDelete` arrow function in the Parent with useCallback(), passing an empty dependency array [].",
          starterCode: "import React, { useState, useCallback } from 'react';\nimport { View, Text, Button } from 'react-native';\n\n// 1. Wrap with React.memo\nconst ListItem = ({ item, onDelete }) => {\n  console.log('Rendering item', item.id);\n  return <Button title={item.name} onPress={onDelete} />;\n};\n\nexport default function Parent() {\n  const [count, setCount] = useState(0);\n\n  // 2. Wrap with useCallback\n  const handleDelete = () => {\n    console.log('Deleted');\n  };\n\n  return (\n    <View>\n      <Button title=\"Update State\" onPress={() => setCount(c => c+1)} />\n      <ListItem item={{ id: 1, name: 'Apple' }} onDelete={handleDelete} />\n    </View>\n  );\n}"
        },
        type: "javascript"
      },
      {
        id: "perf-flipper",
        title: "Profiling with Flipper",
        theory: {
          sections: [
            { type: "heading", content: "You can't fix what you can't measure" },
            { type: "text", content: "How do you know which component is causing the lag? Console.logs are not enough. You need professional profiling tools." },
            { type: "heading", content: "Flipper / React DevTools" },
            { type: "text", content: "Flipper is a desktop debugging platform for mobile apps. It connects to your running React Native app and allows you to inspect the Redux state, view network requests (like the Network tab in Chrome), and most importantly, use the React Profiler." },
            { type: "text", content: "The React Profiler records your screen usage and generates a 'Flamegraph'. It visually highlights which components took the longest to render (in milliseconds) and tells you EXACTLY why they re-rendered (e.g., 'Hook 1 changed' or 'Props changed')." },
            { type: "tip", content: "Resource: Flipper. Note that while Flipper was the standard for a long time, the React Native team is currently transitioning to the new built-in 'React Native DevTools' and 'Expo Dev Tools'. The profiling concepts (Flamegraphs) remain exactly the same." }
          ]
        },
        practice: {
          title: "The Profiler Component",
          description: "Measure render times in code.",
          task: "React actually has a built-in <Profiler> component you can wrap around suspect areas. Wrap the <HeavyComponent /> with <Profiler>. Provide an id=\"HeavyArea\" and an onRender callback.",
          starterCode: "import React, { Profiler } from 'react';\nimport { View, Text } from 'react-native';\n\nfunction onRenderCallback(id, phase, actualDuration) {\n  console.log(`Component ${id} took ${actualDuration}ms to render`);\n}\n\nexport default function App() {\n  return (\n    <View>\n      {/* Wrap this in <Profiler id=\"HeavyArea\" onRender={onRenderCallback}> */}\n      \n      <Text>I am a very heavy component doing math!</Text>\n      \n      {/* Close Profiler */}\n    </View>\n  );\n}"
        },
        type: "javascript"
      },
      {
        id: "perf-new-arch",
        title: "The Future: JSI & Native Modules",
        theory: {
          sections: [
            { type: "heading", content: "The Death of the Bridge" },
            { type: "text", content: "We learned that the Bridge serializes data into JSON, which is slow. The React Native team has completely rewritten the core of the framework (The New Architecture)." },
            { type: "heading", content: "JSI (JavaScript Interface)" },
            { type: "text", content: "JSI replaces the Bridge. It is a C++ layer that allows JavaScript to hold direct references to C++ host objects. Instead of sending a JSON message 'Please draw a View', JavaScript can directly call a C++ method synchronously: `nativeView.draw()`." },
            { type: "heading", content: "Native Modules" },
            { type: "text", content: "If you are processing heavy video streams, compressing audio, or running an AI model on the phone, JavaScript will always be too slow. You write the heavy algorithm in C++ or Swift/Kotlin (A Native Module), and thanks to JSI, your React Native JS code can call that native function instantly, with zero serialization overhead." },
            { type: "text", content: "This makes React Native just as fast as pure Native development." }
          ]
        },
        practice: {
          title: "Concept: Sync Native Call",
          description: "How JSI looks in JS.",
          task: "This is a mental exercise. With the old bridge, calling a native module required `await` because JSON messaging is asynchronous. With JSI, it is a synchronous call. Look at the code comparing the two.",
          starterCode: "// --- OLD ARCHITECTURE (Bridge) ---\n// const result = await NativeModules.VideoCompressor.compress(videoPath);\n\n\n// --- NEW ARCHITECTURE (JSI) ---\n// No JSON, no Promises. Direct synchronous C++ call!\n// const result = global.VideoCompressor.compress(videoPath);\n\nconsole.log(\"JSI enables real-time C++ execution in JS!\");"
        },
        type: "javascript"
      }
    ]
  },
  RU: {
    title: "Mobile производительность (PRO)",
    description: "Размер бандла, оптимизация рендера и Нативные модули. Как сделать так, чтобы приложение выдавало стабильные 60 FPS.",
    lessons: [
      {
        id: "perf-the-bridge",
        title: "Под капотом: Бутылочное горлышко (The Bridge)",
        theory: {
          sections: [
            { type: "heading", content: "Два разных мира" },
            { type: "text", content: "Чтобы оптимизировать React Native, нужно понимать, как он работает. Ваше приложение живет в двух параллельных мирах:" },
            { type: "list", items: [
              "JS Поток (JS Thread): Здесь выполняется ваш JavaScript-код, хуки React, логика стейта и API запросы.",
              "UI Поток (Main Thread): Нативный поток ОС (iOS/Android), который физически рисует пиксели на экране и обрабатывает жесты."
            ]},
            { type: "heading", content: "Мост (The Bridge) и Сериализация" },
            { type: "text", content: "Эти два потока не имеют общей памяти. Они общаются, отправляя друг другу JSON-сообщения через 'Мост'. Если вы делаете анимацию (например, квадрат едет по экрану), обновляя JS-стейт каждую миллисекунду, вы отправляете тысячи JSON-сообщений через Мост. Возникает пробка. Сообщения задерживаются, анимация начинает дергаться (Frame Drops), приложение лагает." },
            { type: "tip", content: "Ресурс: RN Performance Docs. В официальной документации четко сказано: 'Передавайте через Мост как можно меньше данных'. Для анимаций ВСЕГДА используйте нативный Animated API (с флагом useNativeDriver: true) или библиотеку Reanimated. Они отправляют инструкцию один раз, и вся анимация вычисляется исключительно в UI потоке, вообще минуя Мост!" }
          ]
        },
        practice: {
          title: "Блокировка JS Потока",
          description: "Что будет, если перегрузить JavaScript.",
          task: "Это концептуальное задание. Посмотрите на код. У нас есть функция с гигантским циклом `for`. Поскольку JS однопоточен, если вы нажмете кнопку и запустите этот цикл, JS-поток 'заморозится'. В этот момент любые попытки нажать на другие кнопки или получить данные из API перестанут работать, пока цикл не завершится.",
          starterCode: "import React, { useState } from 'react';\nimport { View, Button, Text } from 'react-native';\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n\n  const runHeavyTask = () => {\n    // БЛОКИРУЕМ JS ПОТОК!\n    // Интерфейс не будет реагировать ни на что во время этого цикла.\n    for (let i = 0; i < 999999999; i++) {}\n    console.log(\"Тяжелая задача завершена\");\n  };\n\n  return (\n    <View>\n      <Button title=\"Тяжелая задача\" onPress={runHeavyTask} />\n      <Button title=\"Счетчик\" onPress={() => setCount(c => c + 1)} />\n      <Text>{count}</Text>\n    </View>\n  );\n}"
        },
        type: "javascript"
      },
      {
        id: "perf-hermes",
        title: "Движок Hermes (Мгновенный запуск)",
        theory: {
          sections: [
            { type: "heading", content: "Проблема JIT компиляции" },
            { type: "text", content: "Исторически React Native использовал JS-движок Safari (JavaScriptCore). Он работал по принципу JIT (Just-In-Time). Это значило, что когда юзер нажимал на иконку приложения, процессору телефона приходилось парсить ваш гигантский JS-файл и компилировать его в машинный код ПРЯМО В МОМЕНТ ЗАПУСКА. Из-за этого приложение грузилось по 3-4 секунды (медленный Time To Interactive)." },
            { type: "heading", content: "Появление Hermes" },
            { type: "text", content: "Инженеры Facebook создали с нуля новый Open-Source JS движок специально для мобилок — Hermes." },
            { type: "text", content: "Hermes использует AOT (Ahead-Of-Time) компиляцию. Когда вы собираете приложение в облаке (EAS Build), Hermes заранее компилирует ваш JavaScript в оптимизированный байт-код (Bytecode). Когда юзер открывает приложение, телефон ничего не парсит — байт-код выполняется мгновенно. Это ускоряет запуск на 50%, уменьшает вес APK-файла и жрет меньше оперативной памяти!" },
            { type: "tip", content: "Ресурс: Hermes engine docs. Сегодня Hermes включен по умолчанию во всех новых проектах Expo и React Native. Но если вы придете на старый (legacy) проект, включение Hermes в конфиге — это самое первое и простое улучшение производительности, которое вы обязаны сделать." }
          ]
        },
        practice: {
          title: "Включи Hermes",
          description: "Настройте app.json для использования нового движка.",
          task: "В экосистеме Expo переключение движка делается одной строчкой. Найдите ключ 'jsEngine' внутри блока 'expo' и замените значение 'jsc' на 'hermes'.",
          starterCode: "{\n  \"expo\": {\n    \"name\": \"My High Perf App\",\n    \"version\": \"1.0.0\",\n    // Переключаем JS-движок на Hermes\n    \"jsEngine\": \"jsc\"\n  }\n}"
        },
        type: "json"
      },
      {
        id: "perf-flatlist",
        title: "Экстремальная оптимизация FlatList",
        theory: {
          sections: [
            { type: "heading", content: "Проблема измерения высоты" },
            { type: "text", content: "Мы уже знаем, что для длинных списков нужен `FlatList`. Но даже он начинает лагать (показывая белые пустые блоки при быстром скроллинге), если элементы сложные (например, посты с картинками и комментариями)." },
            { type: "text", content: "По умолчанию FlatList рендерит элементы асинхронно, чтобы высчитать их высоту на лету. При быстром скролле движок просто не успевает считать пиксели." },
            { type: "heading", content: "Спасение: getItemLayout" },
            { type: "text", content: "Если все ячейки в вашем списке имеют ФИКСИРОВАННУЮ высоту (например, ровно 80px), вы можете использовать пропс `getItemLayout`. Вы заранее говорите FlatList, где физически находится каждый элемент. Это полностью отключает фазу измерений! Скроллинг становится невероятно плавным." },
            { type: "code", content: "<FlatList \n  data={data}\n  renderItem={renderItem}\n  getItemLayout={(data, index) => ({\n    length: 80, // Высота одного элемента\n    offset: 80 * index, // Отступ от верха (высота * индекс)\n    index,\n  })}\n/>" }
          ]
        },
        practice: {
          title: "Оптимизируй Ленту",
          description: "Внедрите getItemLayout.",
          task: "Допишите пропс `getItemLayout` в FlatList. У нас каждая ячейка списка (View) имеет фиксированную высоту 60px. Верните объект с ключами: 'length: 60', 'offset: 60 * index' и 'index'.",
          starterCode: "import React from 'react';\nimport { FlatList, Text, View } from 'react-native';\n\nexport default function FastList({ users }) {\n  return (\n    <FlatList\n      data={users}\n      keyExtractor={item => item.id}\n      renderItem={({ item }) => (\n        <View style={{ height: 60 }}>\n          <Text>{item.name}</Text>\n        </View>\n      )}\n      // Добавьте оптимизацию размеров здесь:\n      getItemLayout={(data, index) => ({\n        \n      })}\n    />\n  );\n}"
        },
        type: "javascript"
      },
      {
        id: "perf-renders",
        title: "Оптимизация Рендера (React.memo)",
        theory: {
          sections: [
            { type: "heading", content: "Паразитные рендеры (Wasted Renders)" },
            { type: "text", content: "Каждый раз, когда в родительском компоненте меняется state, ВСЕ его дочерние компоненты перерисовываются. Представьте: вы вводите текст в строку поиска (Search), а под ней лежит тяжелый компонент с 3D-графиком. График будет перерисовываться 60 раз в секунду при каждом нажатии клавиши! UI зависнет." },
            { type: "heading", content: "React.memo и useCallback" },
            { type: "text", content: "Чтобы спасти график, вы оборачиваете его в `React.memo()`. Это говорит Реакту: 'Не перерисовывай этого ребенка, ПОКА его пропсы не изменятся'." },
            { type: "text", content: "НО! Если родитель передает ребенку функцию-коллбэк (например, `onPress={() => doSomething()}`), то при каждом рендере родителя создается НОВАЯ функция в памяти. Ребенок видит 'новый' пропс и перерисовывается, ломая вашу защиту! Чтобы этого избежать, функцию нужно обернуть в `useCallback()`, чтобы кэшировать её место в памяти." },
            { type: "code", content: "// Ребенок под защитой\nconst HeavyChart = React.memo(({ onSelect }) => { ... });\n\n// Родитель передает закешированную функцию\nconst handleSelect = useCallback(() => setMode('active'), []);" }
          ]
        },
        practice: {
          title: "Останови лишние рендеры",
          description: "Используйте React.memo и useCallback.",
          task: "1. Оберните объявление `ListItem` в React.memo(). 2. В родительском компоненте оберните стрелочную функцию `handleDelete` в useCallback(), передав пустой массив зависимостей []. Теперь при клике на 'Обновить Стейт' список больше не будет ререндериться!",
          starterCode: "import React, { useState, useCallback } from 'react';\nimport { View, Text, Button } from 'react-native';\n\n// 1. Оберните в React.memo\nconst ListItem = ({ item, onDelete }) => {\n  console.log('Рендер элемента', item.id);\n  return <Button title={item.name} onPress={onDelete} />;\n};\n\nexport default function Parent() {\n  const [count, setCount] = useState(0);\n\n  // 2. Оберните в useCallback\n  const handleDelete = () => {\n    console.log('Удалено');\n  };\n\n  return (\n    <View>\n      <Button title=\"Обновить Стейт\" onPress={() => setCount(c => c+1)} />\n      <ListItem item={{ id: 1, name: 'Apple' }} onDelete={handleDelete} />\n    </View>\n  );\n}"
        },
        type: "javascript"
      },
      {
        id: "perf-flipper",
        title: "Профилирование и Flipper",
        theory: {
          sections: [
            { type: "heading", content: "Нельзя починить то, что нельзя измерить" },
            { type: "text", content: "Как понять, какой именно компонент вызывает лаги? Обычных `console.log` недостаточно. Нужны профессиональные инструменты профилирования." },
            { type: "heading", content: "Flipper и React DevTools" },
            { type: "text", content: "Flipper — это мощная десктопная программа для дебага мобильных приложений. Она подключается к запущенному приложению и позволяет просматривать Redux-стейт, перехватывать сетевые запросы (как вкладка Network в Chrome) и использовать React Profiler." },
            { type: "text", content: "React Profiler записывает вашу сессию и строит 'Огненный граф' (Flamegraph). Он визуально (размером блоков) показывает, какие компоненты рендерились дольше всего (в миллисекундах), и ТОЧНО пишет причину рендера (например, 'Изменился Hook 1' или 'Изменились Props')." },
            { type: "tip", content: "Ресурс: Flipper. Хотя Flipper долгое время был стандартом, сейчас команда React Native внедряет новый встроенный инструмент 'Expo Dev Tools' и 'React Native DevTools'. Тем не менее, концепции профилирования (Flamegraphs) работают везде абсолютно одинаково." }
          ]
        },
        practice: {
          title: "Компонент Profiler",
          description: "Замеряйте время рендера прямо в коде.",
          task: "React имеет встроенный компонент <Profiler>, которым можно обернуть подозрительные участки кода. Оберните <Text> в компонент <Profiler>. Укажите пропсы: id=\"HeavyArea\" и onRender={onRenderCallback}.",
          starterCode: "import React, { Profiler } from 'react';\nimport { View, Text } from 'react-native';\n\nfunction onRenderCallback(id, phase, actualDuration) {\n  console.log(`Компонент ${id} рендерился ${actualDuration}мс`);\n}\n\nexport default function App() {\n  return (\n    <View>\n      {/* Оберните в <Profiler id=\"HeavyArea\" onRender={onRenderCallback}> */}\n      \n      <Text>Я очень тяжелый компонент с графиком!</Text>\n      \n      {/* Закройте Profiler */}\n    </View>\n  );\n}"
        },
        type: "javascript"
      },
      {
        id: "perf-new-arch",
        title: "Будущее: JSI и Нативные Модули",
        theory: {
          sections: [
            { type: "heading", content: "Смерть Моста" },
            { type: "text", content: "В первом уроке мы узнали, что Мост (The Bridge) постоянно сериализует данные в JSON, и это очень медленно. Команда React Native полностью переписала ядро фреймворка, создав 'Новую Архитектуру' (New Architecture)." },
            { type: "heading", content: "JSI (JavaScript Interface)" },
            { type: "text", content: "JSI убивает Мост. Это слой на C++, который позволяет JavaScript-коду хранить прямые ссылки на C++ объекты (хоста). Вместо того чтобы отправлять асинхронное JSON-сообщение 'Пожалуйста, нарисуй квадрат', JavaScript может СИНХРОННО вызвать C++ метод: `nativeView.draw()`. Никакой сериализации!" },
            { type: "heading", content: "Нативные Модули (Native Modules)" },
            { type: "text", content: "Если вам нужно обрабатывать тяжелый видеопоток, сжимать аудио или запускать нейросеть (AI-модель) прямо на телефоне, JavaScript всегда будет слишком медленным. Для этого инженеры пишут тяжелый алгоритм на C++ или Swift/Kotlin (Нативный модуль). А благодаря JSI ваш React Native код может вызывать эти нативные функции мгновенно." },
            { type: "text", content: "Именно JSI делает современный React Native таким же быстрым, как 'чистая' нативная разработка на Swift/Kotlin." }
          ]
        },
        practice: {
          title: "Синхронный вызов C++",
          description: "Как выглядит JSI в коде.",
          task: "Это мысленное упражнение. В старой архитектуре вызов нативного модуля требовал `await` (Promise), так как JSON-сообщение шло асинхронно. В JSI это прямой синхронный вызов. Изучите разницу в коде.",
          starterCode: "// --- СТАРАЯ АРХИТЕКТУРА (Мост / JSON) ---\n// const result = await NativeModules.VideoCompressor.compress(videoPath);\n\n\n// --- НОВАЯ АРХИТЕКТУРА (JSI) ---\n// Никаких Promise и JSON. Прямой мгновенный вызов C++!\n// const result = global.VideoCompressor.compress(videoPath);\n\nconsole.log(\"JSI стирает границу между JavaScript и железом смартфона!\");"
        },
        type: "javascript"
      }
    ]
  }
};