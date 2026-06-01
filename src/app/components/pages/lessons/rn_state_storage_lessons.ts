export const rnStateStorageState: Record<'EN' | 'RU', any> = {
  EN: {
    title: "State & Storage (CORE)",
    description: "Redux/Zustand, AsyncStorage, SQLite, and WatermelonDB. Build offline-first, resilient mobile applications.",
    lessons: [
      {
        id: "rn-state-zustand",
        title: "Global State: Redux vs Zustand",
        theory: {
          sections: [
            { type: "heading", content: "The Mobile State Dilemma" },
            { type: "text", content: "In React Native, moving between screens (using React Navigation) keeps previous screens mounted in memory. If you change a user's avatar on the 'Profile' screen, the 'Home' screen needs to update instantly. You need a Global State manager." },
            { type: "heading", content: "Why Zustand?" },
            { type: "text", content: "Historically, Redux was the king. But Redux requires massive boilerplate (actions, reducers, providers). On mobile, we want to iterate fast. Zustand has become the modern standard. It is a tiny, fast, and hook-based state manager that doesn't require wrapping your entire app in a <Provider>." },
            { type: "code", content: "import { create } from 'zustand';\n\nconst useStore = create((set) => ({\n  bears: 0,\n  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),\n}));" },
            { type: "tip", content: "Resource: Zustand docs. Read the 'Async actions' and 'Persist middleware' sections. Zustand has a built-in way to automatically save your global state to local storage so it survives app restarts!" }
          ]
        },
        practice: {
          title: "Create a Zustand Store",
          description: "Build a global store for a shopping cart.",
          task: "Use the `create` function from 'zustand' to build a useCartStore. It should have a state variable 'items' (initially 0), and a function 'addItem' that updates the state by incrementing 'items' by 1.",
          starterCode: "import { create } from 'zustand';\n\n// 1. Create the store\nconst useCartStore = \n\n\n// Usage in a component (Conceptual):\n// const items = useCartStore(state => state.items);\n// const addItem = useCartStore(state => state.addItem);"
        },
        type: "javascript"
      },
      {
        id: "rn-async-storage",
        title: "Simple Persistence: AsyncStorage",
        theory: {
          sections: [
            { type: "heading", content: "Mobile's LocalStorage" },
            { type: "text", content: "On the web, we use `localStorage.setItem()`. In React Native, the equivalent is `@react-native-async-storage/async-storage`. It is an unencrypted, asynchronous, persistent, key-value storage system." },
            { type: "heading", content: "Why Asynchronous?" },
            { type: "text", content: "Mobile storage access requires reading from the physical flash drive of the phone. Doing this synchronously would freeze the UI (causing frame drops). Therefore, every method returns a Promise and requires `await`." },
            { type: "code", content: "await AsyncStorage.setItem('@theme', 'dark');\nconst theme = await AsyncStorage.getItem('@theme');" },
            { type: "heading", content: "The Limitation" },
            { type: "text", content: "AsyncStorage is meant for simple data: user preferences, themes, or a few cached API responses. Because it stores data as strings, saving a massive list of 10,000 products requires running `JSON.stringify()` and `JSON.parse()`, which will completely block the JavaScript thread and crash your app." }
          ]
        },
        practice: {
          title: "Save an Object to AsyncStorage",
          description: "Serialize and store complex data.",
          task: "Complete the `saveUser` function. AsyncStorage only accepts strings. You must convert the `userObj` into a JSON string before passing it to `AsyncStorage.setItem()`. Don't forget the `await` keyword!",
          starterCode: "import AsyncStorage from '@react-native-async-storage/async-storage';\n\nasync function saveUser(userObj) {\n  try {\n    // 1. Convert object to JSON string\n    const jsonValue = \n    \n    // 2. Save it to AsyncStorage under the key '@user_profile'\n    \n    \n    console.log('User saved successfully!');\n  } catch (e) {\n    console.error('Failed to save user', e);\n  }\n}"
        },
        type: "javascript"
      },
      {
        id: "rn-secure-store",
        title: "Security: Expo SecureStore",
        theory: {
          sections: [
            { type: "heading", content: "Never Store Secrets in AsyncStorage!" },
            { type: "text", content: "AsyncStorage writes data in plain text to a folder on the Android/iOS file system. If a user roots/jailbreaks their phone, or if a malicious app exploits a vulnerability, they can read your app's AsyncStorage and steal JWT tokens, passwords, or credit card info." },
            { type: "heading", content: "Hardware Encryption" },
            { type: "text", content: "To store sensitive data, you must use OS-level encrypted storage: the iOS Keychain and Android Keystore. In the Expo ecosystem, this is handled perfectly by the `expo-secure-store` library." },
            { type: "code", content: "import * as SecureStore from 'expo-secure-store';\n\nawait SecureStore.setItemAsync('jwt_token', 'eyJhbGciOiJIUzI1Ni...');" },
            { type: "text", content: "Data in SecureStore is encrypted using a key tied to the device's hardware. Even if the file system is fully compromised, the tokens cannot be decrypted without the physical hardware chip (Secure Enclave)." }
          ]
        },
        practice: {
          title: "Save a JWT Securely",
          description: "Use SecureStore for authentication tokens.",
          task: "Write a function `saveAuthToken(token)`. Inside it, use `SecureStore.setItemAsync()` to save the token under the key 'auth_token'.",
          starterCode: "import * as SecureStore from 'expo-secure-store';\n\nasync function saveAuthToken(token) {\n  try {\n    // 1. Save the token securely\n    \n    console.log('Token is locked in the vault!');\n  } catch (error) {\n    console.error('Error saving token', error);\n  }\n}"
        },
        type: "javascript"
      },
      {
        id: "rn-offline-first",
        title: "Offline-First & Optimistic Updates",
        theory: {
          sections: [
            { type: "heading", content: "The Subway Problem" },
            { type: "text", content: "Mobile users frequently lose internet connection (tunnels, subways, poor reception). If your app shows a blank white screen with a spinning loader when the network drops, the user will delete your app." },
            { type: "heading", content: "Optimistic UI Updates" },
            { type: "text", content: "When a user taps the 'Like' button on a post, do not wait for the backend to respond! Instantly fill the heart with red (update the local state) and send the API request in the background. This makes the app feel incredibly fast." },
            { type: "text", content: "If the API request fails (e.g., no internet), you catch the error, show a small toast ('Failed to like'), and revert the heart back to empty. This is called an Optimistic Update." },
            { type: "tip", content: "Resource: React Query (TanStack Query). Using React Query on mobile handles all of this for you. It caches server data locally, manages the loading states, and has built-in support for optimistic updates with rollback capabilities." }
          ]
        },
        practice: {
          title: "Simulate an Optimistic Update",
          description: "Update state before the API call finishes.",
          task: "Complete the `toggleLike` function. First, immediately toggle the `isLiked` state to True. Then, try the API call. If the API call fails, revert `isLiked` back to False in the catch block.",
          starterCode: "let isLiked = false;\n\nasync function toggleLike() {\n  // 1. Optimistic Update: Change state immediately!\n  \n  console.log('UI Updated instantly. isLiked:', isLiked);\n\n  try {\n    // 2. Background API Call (simulated failure)\n    await fakeApiCall(); \n  } catch (error) {\n    // 3. Rollback: API failed, revert the state!\n    \n    console.log('API Failed. State reverted. isLiked:', isLiked);\n  }\n}\n\nasync function fakeApiCall() { throw new Error(\"No Network\"); }"
        },
        type: "javascript"
      },
      {
        id: "rn-sqlite",
        title: "Local Databases: Expo SQLite",
        theory: {
          sections: [
            { type: "heading", content: "When AsyncStorage is not enough" },
            { type: "text", content: "If you are building an offline notes app, a task manager, or an app that downloads a catalog of 50,000 products, AsyncStorage will choke and die. You need a real database." },
            { type: "heading", content: "SQLite on Mobile" },
            { type: "text", content: "Every iOS and Android device has a highly optimized, lightweight relational database engine built directly into the OS called SQLite. In React Native, we access it using `expo-sqlite`." },
            { type: "text", content: "SQLite allows you to create tables, index columns for lightning-fast searches, and run complex JOIN queries entirely offline, right on the user's phone." },
            { type: "code", content: "import * as SQLite from 'expo-sqlite';\n\nconst db = await SQLite.openDatabaseAsync('myApp.db');\nawait db.execAsync(`\n  CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, task TEXT);\n`);" }
          ]
        },
        practice: {
          title: "Create a Local Table",
          description: "Execute raw SQL on the device.",
          task: "Use the simulated `db` object to execute a SQL query. Call `db.execAsync()` and pass a SQL string to create a table named 'users' with 'id' (INTEGER PRIMARY KEY) and 'name' (TEXT).",
          starterCode: "// Simulated SQLite instance\nconst db = { execAsync: async (query) => console.log('Executing:', query) };\n\nasync function initDB() {\n  // Execute a CREATE TABLE query\n  await \n  \n  console.log(\"Database initialized on device!\");\n}"
        },
        type: "javascript"
      },
      {
        id: "rn-watermelon",
        title: "High-Performance Data: WatermelonDB",
        theory: {
          sections: [
            { type: "heading", content: "The React Native Bottleneck" },
            { type: "text", content: "While SQLite is fast, fetching 10,000 rows from SQLite and sending them over the 'Bridge' to the JavaScript thread causes a massive bottleneck. Rendering 10,000 items in React will freeze the app." },
            { type: "heading", content: "Enter WatermelonDB" },
            { type: "text", content: "WatermelonDB is a reactive database built on top of SQLite, specifically designed for React Native. Its core philosophy is Lazy Loading." },
            { type: "list", items: [
              "It never loads the whole database into RAM. It only loads what is currently visible on the screen.",
              "It is fully Reactive. If a background sync updates a post in the database, ONLY the specific UI component displaying that post will re-render."
            ]},
            { type: "text", content: "With WatermelonDB, your app can easily handle tens of thousands of records offline while maintaining 60 FPS scrolling." },
            { type: "tip", content: "Resource: WatermelonDB Docs. Learning the Schema and Model definitions takes time, but it is an absolute game-changer for complex apps (like Notion or WhatsApp clones) that require robust offline capabilities." }
          ]
        },
        practice: {
          title: "WatermelonDB Schema",
          description: "Define a schema for the reactive database.",
          task: "This is a conceptual task. In WatermelonDB, we define schemas using JS functions. Look at the code and add a string column called 'body' and a boolean column called 'is_pinned' to the 'posts' table schema.",
          starterCode: "import { appSchema, tableSchema } from '@nozbe/watermelondb'\n\nconst mySchema = appSchema({\n  version: 1,\n  tables: [\n    tableSchema({\n      name: 'posts',\n      columns: [\n        { name: 'title', type: 'string' },\n        // Add 'body' (string) and 'is_pinned' (boolean)\n        \n        \n      ]\n    })\n  ]\n});"
        },
        type: "javascript"
      },
      {
        id: "rn-sync-strategy",
        title: "Syncing: Server State vs Local State",
        theory: {
          sections: [
            { type: "heading", content: "The Holy Grail of Mobile Dev" },
            { type: "text", content: "The hardest challenge in mobile development is Synchronization. How do you keep the local SQLite database on the phone in sync with the cloud PostgreSQL database on your backend?" },
            { type: "list", items: [
              "Strategy 1 (React Query): Don't use a local DB. Just use React Query to fetch data and cache it in RAM. Great for simple apps (Instagram feeds, News apps).",
              "Strategy 2 (Manual Sync): Use Expo SQLite. Fetch JSON from your API, map over it, and run INSERT/UPDATE SQL queries locally. Send local changes to the API via a background task.",
              "Strategy 3 (WatermelonDB Sync): WatermelonDB has a built-in sync adapter. You just provide two API endpoints: one to PULL changes since the last timestamp, and one to PUSH local changes to the server. The library handles the rest."
            ]},
            { type: "text", content: "Choosing the right strategy before you write the first line of code will save you months of refactoring later." }
          ]
        },
        practice: {
          title: "Architectural Decision",
          description: "Which storage should you use?",
          task: "This is a mental exercise. Write comments assigning the right technology (Zustand, SecureStore, AsyncStorage, WatermelonDB) to the requirement.",
          starterCode: "// Task 1: Storing the user's UI theme (Dark/Light)\n// Best tool: \n\n// Task 2: Storing the user's JWT Access Token\n// Best tool: \n\n// Task 3: Storing a catalog of 20,000 products for offline search\n// Best tool: \n\n// Task 4: Storing whether the 'Settings' modal is currently open\n// Best tool: "
        },
        type: "javascript"
      }
    ]
  },
  RU: {
    title: "State & Хранилище (CORE)",
    description: "Redux/Zustand, AsyncStorage, SQLite и WatermelonDB. Научитесь строить отказоустойчивые Offline-first мобильные приложения.",
    lessons: [
      {
        id: "rn-state-zustand",
        title: "Глобальный стейт: Redux против Zustand",
        theory: {
          sections: [
            { type: "heading", content: "Дилемма мобильного стейта" },
            { type: "text", content: "В React Native переходы между экранами (через React Navigation) оставляют предыдущие экраны 'висеть' в памяти. Если вы измените аватарку пользователя на экране 'Профиль', экран 'Главная' должен обновиться мгновенно. Вам жизненно необходим менеджер глобального состояния (Global State)." },
            { type: "heading", content: "Почему Zustand?" },
            { type: "text", content: "Исторически королем был Redux. Но он требует гигантского количества шаблонного кода (actions, reducers, providers). На мобилках мы хотим разрабатывать быстро. Современным стандартом стал Zustand. Это крошечный, быстрый менеджер на хуках, который не требует оборачивать всё приложение в <Provider>." },
            { type: "code", content: "import { create } from 'zustand';\n\nconst useStore = create((set) => ({\n  bears: 0,\n  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),\n}));" },
            { type: "tip", content: "Ресурс: Zustand docs. Обязательно прочитайте разделы 'Async actions' и 'Persist middleware'. В Zustand есть встроенный механизм, который автоматически сохраняет весь ваш стейт в локальную память телефона, чтобы он не сбрасывался при перезапуске приложения!" }
          ]
        },
        practice: {
          title: "Создай Zustand Store",
          description: "Напиши глобальный стор для корзины покупок.",
          task: "Используйте функцию `create` из 'zustand' для создания useCartStore. В нём должно быть состояние 'items' (изначально 0) и функция 'addItem', которая обновляет состояние, увеличивая 'items' на 1.",
          starterCode: "import { create } from 'zustand';\n\n// 1. Создаем стор\nconst useCartStore = \n\n\n// Использование в компоненте (Концептуально):\n// const items = useCartStore(state => state.items);\n// const addItem = useCartStore(state => state.addItem);"
        },
        type: "javascript"
      },
      {
        id: "rn-async-storage",
        title: "Простое хранение: AsyncStorage",
        theory: {
          sections: [
            { type: "heading", content: "Мобильный LocalStorage" },
            { type: "text", content: "В вебе мы используем `localStorage.setItem()`. В React Native его аналог — это библиотека `@react-native-async-storage/async-storage`. Это не зашифрованная, асинхронная система хранения пар ключ-значение." },
            { type: "heading", content: "Почему Асинхронная?" },
            { type: "text", content: "Доступ к хранилищу на мобильном телефоне требует чтения данных с физического флеш-накопителя. Если делать это синхронно (как в вебе), интерфейс приложения намертво зависнет на долю секунды (пропадут кадры анимации). Поэтому каждый метод возвращает Promise и требует использования `await`." },
            { type: "code", content: "await AsyncStorage.setItem('@theme', 'dark');\nconst theme = await AsyncStorage.getItem('@theme');" },
            { type: "heading", content: "Ограничения" },
            { type: "text", content: "AsyncStorage создан для простых данных: настройки пользователя, выбранная тема, небольшие кэши ответов API. Так как он хранит всё в виде строк, попытка сохранить гигантский массив из 10 000 товаров потребует запуска `JSON.stringify()`, что заблокирует JS-поток и приложение 'зависнет'." }
          ]
        },
        practice: {
          title: "Сохрани объект в AsyncStorage",
          description: "Сериализуйте и сохраните сложные данные.",
          task: "Допишите функцию `saveUser`. AsyncStorage принимает ТОЛЬКО строки. Вы должны конвертировать объект `userObj` в JSON строку, прежде чем передать в `AsyncStorage.setItem()`. И не забудьте ключевое слово `await`!",
          starterCode: "import AsyncStorage from '@react-native-async-storage/async-storage';\n\nasync function saveUser(userObj) {\n  try {\n    // 1. Конвертируем объект в JSON строку\n    const jsonValue = \n    \n    // 2. Сохраняем в AsyncStorage под ключом '@user_profile'\n    \n    \n    console.log('Пользователь успешно сохранен!');\n  } catch (e) {\n    console.error('Ошибка сохранения', e);\n  }\n}"
        },
        type: "javascript"
      },
      {
        id: "rn-secure-store",
        title: "Безопасность: Expo SecureStore",
        theory: {
          sections: [
            { type: "heading", content: "Никогда не храните секреты в AsyncStorage!" },
            { type: "text", content: "AsyncStorage записывает данные в виде обычного (Plain text) файла в директории приложения на Android/iOS. Если пользователь сделает Root/Jailbreak телефона, или в ОС найдут уязвимость, хакеры смогут прочитать этот файл и украсть JWT-токены, пароли или данные карт." },
            { type: "heading", content: "Аппаратное шифрование" },
            { type: "text", content: "Для хранения конфиденциальных данных вы ОБЯЗАНЫ использовать зашифрованные хранилища на уровне ОС: Keychain (iOS) и Keystore (Android). В экосистеме Expo для этого есть идеальная библиотека — `expo-secure-store`." },
            { type: "code", content: "import * as SecureStore from 'expo-secure-store';\n\nawait SecureStore.setItemAsync('jwt_token', 'eyJhbGciOiJIUzI1Ni...');" },
            { type: "text", content: "Данные в SecureStore шифруются ключом, который 'зашит' в аппаратный чип телефона (Secure Enclave). Даже если файловая система телефона будет полностью скомпрометирована, расшифровать токены без физического чипа невозможно." }
          ]
        },
        practice: {
          title: "Надежное хранение JWT",
          description: "Используйте SecureStore для токенов аутентификации.",
          task: "Напишите функцию `saveAuthToken(token)`. Внутри вызовите `SecureStore.setItemAsync()`, чтобы сохранить переданный токен под ключом 'auth_token'.",
          starterCode: "import * as SecureStore from 'expo-secure-store';\n\nasync function saveAuthToken(token) {\n  try {\n    // 1. Безопасно сохраняем токен\n    \n    console.log('Токен заперт в аппаратном сейфе!');\n  } catch (error) {\n    console.error('Ошибка сохранения токена', error);\n  }\n}"
        },
        type: "javascript"
      },
      {
        id: "rn-offline-first",
        title: "Offline-First и Оптимистичные обновления",
        theory: {
          sections: [
            { type: "heading", content: "Проблема метро" },
            { type: "text", content: "Пользователи мобилок постоянно теряют интернет (туннели, метро, плохой сигнал). Если ваше приложение при потере сети покажет белый экран с вечным спиннером загрузки, пользователь его просто удалит." },
            { type: "heading", content: "Оптимистичные обновления (Optimistic UI)" },
            { type: "text", content: "Когда пользователь нажимает кнопку 'Лайк' на посте, НЕ ЖДИТЕ ответа от сервера! Мгновенно закрасьте сердечко красным (обновите локальный стейт) и отправьте API запрос в фоновом режиме. Приложение будет ощущаться невероятно быстрым." },
            { type: "text", content: "Если запрос к API упадет (нет интернета), вы ловите ошибку (catch), показываете маленький Toast ('Не удалось поставить лайк') и возвращаете сердечко в пустое состояние (Rollback). Это называется Оптимистичным Обновлением." },
            { type: "tip", content: "Ресурс: React Query (TanStack Query). Использование React Query на мобилках берет всю эту боль на себя. Библиотека сама кэширует данные с сервера локально и имеет встроенную поддержку Optimistic Updates с автоматическим откатом состояния при ошибках сети." }
          ]
        },
        practice: {
          title: "Симуляция Optimistic Update",
          description: "Обновите UI до завершения сетевого запроса.",
          task: "Допишите функцию `toggleLike`. Сначала мгновенно переключите состояние `isLiked` на True (оптимистичный шаг). Затем попытайтесь сделать вызов API. Так как API упадет с ошибкой (в блоке catch), верните состояние `isLiked` обратно в False (откат).",
          starterCode: "let isLiked = false;\n\nasync function toggleLike() {\n  // 1. Оптимистичное обновление: меняем стейт МГНОВЕННО!\n  \n  console.log('UI обновлен мгновенно. isLiked:', isLiked);\n\n  try {\n    // 2. Фоновый API запрос (в нашем случае он упадет)\n    await fakeApiCall(); \n  } catch (error) {\n    // 3. Откат (Rollback): API упало, возвращаем стейт назад!\n    \n    console.log('API упало. Откат состояния. isLiked:', isLiked);\n  }\n}\n\nasync function fakeApiCall() { throw new Error(\"Нет сети\"); }"
        },
        type: "javascript"
      },
      {
        id: "rn-sqlite",
        title: "Локальные Базы Данных: Expo SQLite",
        theory: {
          sections: [
            { type: "heading", content: "Когда AsyncStorage сдается" },
            { type: "text", content: "Если вы делаете офлайн-приложение для заметок, таск-трекер или интернет-магазин, который кэширует каталог из 50 000 товаров, AsyncStorage просто 'захлебнется'. Вам нужна настоящая база данных." },
            { type: "heading", content: "SQLite на мобилках" },
            { type: "text", content: "В каждый смартфон (iOS и Android) на уровне операционной системы вшита невероятно быстрая, легковесная реляционная база данных — SQLite. В React Native мы обращаемся к ней через библиотеку `expo-sqlite`." },
            { type: "text", content: "SQLite позволяет создавать таблицы, строить индексы для мгновенного поиска и выполнять сложные JOIN-запросы абсолютно офлайн, прямо на процессоре телефона." },
            { type: "code", content: "import * as SQLite from 'expo-sqlite';\n\nconst db = await SQLite.openDatabaseAsync('myApp.db');\nawait db.execAsync(`\n  CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, task TEXT);\n`);" }
          ]
        },
        practice: {
          title: "Создание локальной таблицы",
          description: "Выполните сырой SQL запрос на устройстве.",
          task: "Используйте объект `db` (эмуляция базы данных) для выполнения SQL запроса. Вызовите `db.execAsync()` и передайте туда SQL-строку для создания таблицы 'users' с колонками 'id' (INTEGER PRIMARY KEY) и 'name' (TEXT).",
          starterCode: "// Эмуляция экземпляра SQLite\nconst db = { execAsync: async (query) => console.log('Выполняю SQL:', query) };\n\nasync function initDB() {\n  // Выполните запрос CREATE TABLE\n  await \n  \n  console.log(\"База данных инициализирована на устройстве!\");\n}"
        },
        type: "javascript"
      },
      {
        id: "rn-watermelon",
        title: "Высокая производительность: WatermelonDB",
        theory: {
          sections: [
            { type: "heading", content: "Узкое горлышко React Native" },
            { type: "text", content: "Хотя SQLite работает очень быстро, выгрузка 10 000 строк из локальной базы и их передача через 'Мост' (The Bridge) в JavaScript-поток вызовет огромное 'бутылочное горлышко'. Рендеринг 10 000 объектов заморозит приложение намертво." },
            { type: "heading", content: "Появление WatermelonDB" },
            { type: "text", content: "WatermelonDB — это реактивная база данных, построенная поверх SQLite специально для React Native. Её главная философия — Ленивая Загрузка (Lazy Loading)." },
            { type: "list", items: [
              "Она НИКОГДА не загружает всю базу в оперативную память. Она загружает только те записи, которые физически видны на экране телефона в данный момент.",
              "Она полностью Реактивна. Если фоновый процесс синхронизации обновляет пост в базе данных, перерендерится ТОЛЬКО конкретный UI-компонент, отображающий этот пост."
            ]},
            { type: "text", content: "С WatermelonDB ваше приложение может легко обрабатывать десятки тысяч записей в офлайне, сохраняя идеальные 60 FPS при скроллинге (идеально для клонов Telegram или Notion)." },
            { type: "tip", content: "Ресурс: WatermelonDB Docs. Изучение синтаксиса Схем и Моделей в этой библиотеке займет время, но это абсолютный 'Game Changer' для создания сложных, высоконагруженных мобильных приложений." }
          ]
        },
        practice: {
          title: "Схема в WatermelonDB",
          description: "Опишите структуру для реактивной БД.",
          task: "Это концептуальная задача. В WatermelonDB мы описываем схемы базы данных с помощью JS-функций. Посмотрите на код и добавьте колонку 'body' (с типом 'string') и колонку 'is_pinned' (с типом 'boolean') в схему таблицы 'posts'.",
          starterCode: "import { appSchema, tableSchema } from '@nozbe/watermelondb'\n\nconst mySchema = appSchema({\n  version: 1,\n  tables: [\n    tableSchema({\n      name: 'posts',\n      columns: [\n        { name: 'title', type: 'string' },\n        // Добавьте 'body' (string) и 'is_pinned' (boolean)\n        \n        \n      ]\n    })\n  ]\n});"
        },
        type: "javascript"
      },
      {
        id: "rn-sync-strategy",
        title: "Синхронизация: Server State vs Local State",
        theory: {
          sections: [
            { type: "heading", content: "Святой Грааль Мобильной разработки" },
            { type: "text", content: "Самый сложный вызов в мобильной разработке — это Синхронизация. Как поддерживать локальную базу SQLite на телефоне в актуальном состоянии с облачной базой PostgreSQL на вашем бэкенде?" },
            { type: "list", items: [
              "Стратегия 1 (React Query): Вообще не использовать локальную БД. Использовать React Query для загрузки данных и кэширования их в оперативной памяти. Отлично подходит для простых приложений (Новостные ленты, Соцсети).",
              "Стратегия 2 (Ручная синхронизация): Использовать Expo SQLite. Скачивать JSON с API, мапить его и прогонять запросы INSERT/UPDATE локально. Локальные изменения копить в очереди и отправлять на API фоновой задачей.",
              "Стратегия 3 (WatermelonDB Sync): У WatermelonDB есть встроенный адаптер синхронизации. Вы просто даете ему два API эндпоинта на бэкенде: один для PULL (забрать изменения сервера с последнего раза), и один для PUSH (отправить локальные изменения на сервер). Библиотека сама обрабатывает конфликты."
            ]},
            { type: "text", content: "Выбор правильной стратегии до написания первой строчки кода спасет вас от месяцев болезненного рефакторинга." }
          ]
        },
        practice: {
          title: "Архитектурные решения",
          description: "Какой инструмент хранения выбрать?",
          task: "Это мысленное упражнение. Напишите в комментариях правильную технологию (Zustand, SecureStore, AsyncStorage, WatermelonDB) для описанной задачи.",
          starterCode: "// Задача 1: Сохранить выбор темы UI (Темная/Светлая)\n// Лучший инструмент: \n\n// Задача 2: Сохранить секретный JWT Токен пользователя\n// Лучший инструмент: \n\n// Задача 3: Сохранить каталог из 20 000 товаров для офлайн-поиска\n// Лучший инструмент: \n\n// Задача 4: Сохранить флаг того, открыто ли сейчас модальное окно 'Настройки'\n// Лучший инструмент: "
        },
        type: "javascript"
      }
    ]
  }
};