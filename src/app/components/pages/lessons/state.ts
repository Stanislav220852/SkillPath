export const stateLessons: Record<'EN' | 'RU', any> = {
  EN: {
    title: "State Management",
    description: "Learn state management in React — from useState and Context to useReducer, Redux, Zustand and React Query.",
    lessons: [
      // ============= LESSON 1 =============
      {
        id: "state-local",
        title: "Local State and Prop Drilling",
        theory: {
          sections: [
            { type: "heading", content: "What is State?" },
            { type: "text", content: "In the React world, state is any data that, when changed, should update (re-render) the interface. For example: whether a modal is open, what's typed in the search field, whether the user is logged in." },
            { type: "text", content: "The most basic state management tool is the useState hook. It creates local state that lives only inside one component." },
            { type: "heading", content: "Lifting State Up" },
            { type: "text", content: "Imagine you have two sibling components: <Sidebar /> and <Profile />. Both need to know the user's name. You can't pass data 'sideways' from one sibling to another. React requires a one-way data flow (top to bottom)." },
            { type: "text", content: "For two components to share data, we must 'lift' the state up to their common parent (e.g. <App />), and then pass the data down via props." },
            { type: "heading", content: "The problem: Prop Drilling" },
            { type: "text", content: "While there are few components, passing props works great. But in a real app the component tree can reach 10-20 levels of nesting!" },
            { type: "code", content: "<App user={user}>\n  <Layout user={user}>\n    <Header user={user}>\n      <UserAvatar user={user} />\n    </Header>\n  </Layout>\n</App>" },
            { type: "text", content: "Layout and Header don't use the user data at all — they only need it to pass it further down to UserAvatar. This process of threading data through 'transit' layers is called Prop Drilling." },
            { type: "text", content: "It makes the code dirty, complicates refactoring, and forces intermediate components to re-render on any state change." }
          ]
        },
        practice: {
          title: "Simulate Prop Drilling",
          description: "Pass state down through a transit component.",
          task: 'You have a state theme inside App. Pass it through the Layout component down into the Button component. In Button print the text: "Current theme: " + theme.',
          starterCode: "function Button(props) {\n  // 3. Get theme from props and print it\n  return <button>Current theme: ???</button>;\n}\n\nfunction Layout(props) {\n  // 2. Layout must pass theme further into Button\n  return (\n    <div className=\"box\">\n      <p>I am the transit component Layout</p>\n      <Button />\n    </div>\n  );\n}\n\nfunction App() {\n  const [theme, setTheme] = useState('dark');\n\n  // 1. Pass theme into Layout\n  return (\n    <div>\n      <h2>My App</h2>\n      <Layout />\n    </div>\n  );\n}"
        },
        type: "javascript"
      },
      // ============= LESSON 2 =============
      {
        id: "state-context",
        title: "Context API: Built-in Data Teleportation",
        theory: {
          sections: [
            { type: "heading", content: "Solving the problem: Context" },
            { type: "text", content: "To avoid Prop Drilling, the React team created the Context API. Context lets you 'teleport' data to any component deep in the tree, skipping intermediate layers." },
            { type: "heading", content: "How it works (3 steps):" },
            { type: "list", items: [
              "Create: const ThemeContext = createContext(). We create the context object outside components.",
              "Provider (source): we wrap the root component in <ThemeContext.Provider value={data}>. Everything inside can access value.",
              "Consumer: in any deeply nested component we use the hook useContext(ThemeContext) to 'catch' the passed data."
            ]},
            { type: "code", content: 'const ThemeContext = createContext("light");\n\nfunction App() {\n  return (\n    // The Provider "broadcasts" data downward\n    <ThemeContext.Provider value="dark">\n      <Layout />\n    </ThemeContext.Provider>\n  );\n}\n\nfunction DeepButton() {\n  // The hook catches the data. Layout doesn\'t even know about it!\n  const theme = useContext(ThemeContext);\n  return <button>{theme}</button>;\n}' },
            { type: "tip", content: "Downside of Context API: why don't we store ALL app state in one big Context? Because every time the value in the Provider changes, ALL components using that useContext re-render completely. This hurts performance in large apps." }
          ]
        },
        practice: {
          title: "Get rid of Prop Drilling",
          description: "Use a Provider and useContext.",
          task: "I created a UserContext. Wrap <Layout /> in UserContext.Provider and pass it value={user}. Then in the Avatar component use useContext to get the user name.",
          starterCode: "// Create the context\nconst UserContext = createContext();\n\nfunction Avatar() {\n  // 2. Get user from context using useContext\n  const user = \"???\";\n\n  return <div className=\"box\">User avatar: {user}</div>;\n}\n\nfunction Layout() {\n  // Look! Layout no longer takes props!\n  return <div><Avatar /></div>;\n}\n\nfunction App() {\n  const [user, setUser] = useState(\"Alex_Dev\");\n\n  return (\n    <div>\n      {/* 1. Wrap Layout in the Provider and pass value={user} */}\n      <Layout />\n    </div>\n  );\n}"
        },
        type: "javascript"
      },
      // ============= LESSON 3 =============
      {
        id: "state-reducer",
        title: "Flux Architecture and useReducer",
        theory: {
          sections: [
            { type: "heading", content: "The problem of complex logic" },
            { type: "text", content: "When state gets complex (e.g. a shopping cart where you need to count the total, apply discounts, change quantities), using a dozen useState turns the code into spaghetti. The update logic gets smeared across all click handlers." },
            { type: "heading", content: "The Reducer pattern (Flux architecture)" },
            { type: "text", content: "Instead of changing data directly, the Flux architecture offers a strict, predictable data flow:" },
            { type: "list", items: [
              "Store (state): data is read-only. You can't change it directly.",
              "Action: to change data, you 'dispatch' an action object. An action always has a type: { type: \"ADD_ITEM\", payload: \"Apple\" }. It's like a receipt with an order of 'what to do'.",
              "Reducer: a pure function that takes the current state and the incoming action. Inside it a switch/case decides exactly how to change the data. It returns a NEW state."
            ]},
            { type: "heading", content: "useReducer in React" },
            { type: "text", content: "React supports this architecture out of the box with the useReducer hook. It works like an advanced useState." },
            { type: "code", content: '// 1. Write the Reducer\nfunction reducer(state, action) {\n  switch (action.type) {\n    case "INCREMENT": return { count: state.count + action.payload };\n    case "DECREMENT": return { count: state.count - action.payload };\n    default: return state;\n  }\n}\n\nfunction Counter() {\n  // 2. Init the hook (pass reducer and initial state)\n  const [state, dispatch] = useReducer(reducer, { count: 0 });\n\n  // 3. Dispatch actions\n  return (\n    <button onClick={() => dispatch({ type: "INCREMENT", payload: 1 })}>\n      +1 (Now: {state.count})\n    </button>\n  );\n}' }
          ]
        },
        practice: {
          title: "A bank reducer",
          description: "Add cases to the reducer and dispatch actions.",
          task: "Finish the reducer logic. Add handling of two actions to the switch: 'WITHDRAW' (subtract action.payload) and 'DEPOSIT' (add action.payload). Then in the component buttons add onClick that calls dispatch with the correct action object.",
          starterCode: "function bankReducer(state, action) {\n  switch (action.type) {\n    // 1. Add case 'DEPOSIT': return { balance: state.balance + action.payload }\n    \n    // 2. Add case 'WITHDRAW': return { balance: state.balance - action.payload }\n    \n    default: return state;\n  }\n}\n\nfunction App() {\n  const [state, dispatch] = useReducer(bankReducer, { balance: 1000 });\n\n  return (\n    <div className=\"box\">\n      <h2>Balance: {state.balance}$</h2>\n      \n      {/* 3. Call dispatch({ type: 'DEPOSIT', payload: 100 }) */}\n      <button onClick={() => {}}>Deposit 100$</button>\n      \n      {/* 4. Call dispatch({ type: 'WITHDRAW', payload: 50 }) */}\n      <button onClick={() => {}}>Withdraw 50$</button>\n    </div>\n  );\n}"
        },
        type: "javascript"
      },
      // ============= LESSON 4 =============
      {
        id: "state-redux",
        title: "Global Store: The Redux Idea",
        theory: {
          sections: [
            { type: "heading", content: "The birth of Redux" },
            { type: "text", content: "In the previous lessons we learned Context (data teleportation) and Reducer (ordered logic). What happens if we combine them?" },
            { type: "text", content: "We get a Global Store — a single source of truth for the whole app, accessible from anywhere. This is exactly how the famous Redux library (and its modern version Redux Toolkit) works." },
            { type: "heading", content: "The three pillars of Redux:" },
            { type: "list", items: [
              "Single source of truth: all state (users, posts, settings) is stored in one huge JavaScript object (the Store) at the top of the app.",
              "State is read-only: components can't change the Store. The only way is to dispatch an Action (event).",
              "Changes are made with pure functions: reducers take the old Store and an Action and return a brand new Store object."
            ]},
            { type: "heading", content: "A home-made Redux" },
            { type: "text", content: "Before Redux Toolkit, developers wrote a lot of boilerplate. Essentially Redux does the same thing as Context + useReducer:" },
            { type: "code", content: "const StoreContext = createContext();\n\nfunction Provider({ children }) {\n    const [state, dispatch] = useReducer(rootReducer, initialState);\n    \n    // Pass both data and the function to change it into Context!\n    return (\n        <StoreContext.Provider value={{ state, dispatch }}>\n            {children}\n        </StoreContext.Provider>\n    );\n}" },
            { type: "heading", content: "Redux Toolkit (RTK)" },
            { type: "text", content: "Today nobody writes plain Redux. The industry moved to Redux Toolkit. It removes the switch/case boilerplate, auto-configures the Store, and uses the Immer library which lets you 'mutate' state directly (e.g. state.value += 1) while safely creating a copy under the hood." }
          ]
        },
        practice: {
          title: "Build a mini-Redux",
          description: "Combine useReducer with Context.",
          task: "Build a mini-Redux by hand! We have StoreContext and rootReducer. 1. Inside App use useReducer. 2. Pass { state, dispatch } into the Provider. 3. In the UserPanel component get dispatch from context and dispatch { type: 'LOGOUT' } on button click.",
          starterCode: "const StoreContext = createContext();\n\nfunction rootReducer(state, action) {\n  if (action.type === 'LOGOUT') return { user: null };\n  return state;\n}\n\nfunction UserPanel() {\n  // 3. Get state and dispatch from StoreContext\n  const { state, dispatch } = useContext(StoreContext) || { state: { user: 'Admin' }};\n\n  return (\n    <div className=\"box\">\n      <h3>User: {state.user ? state.user : 'Guest'}</h3>\n      {/* 4. Bind dispatch to onClick */}\n      <button>Logout</button>\n    </div>\n  );\n}\n\nfunction App() {\n  // 1. Init useReducer\n  \n\n  return (\n    // 2. Wrap UserPanel in the Provider and pass value={{ state, dispatch }}\n    <div>\n       <UserPanel />\n    </div>\n  );\n}"
        },
        type: "javascript"
      },
      // ============= LESSON 5 =============
      {
        id: "state-zustand",
        title: "Atomic and External State (Zustand)",
        theory: {
          sections: [
            { type: "heading", content: "The problem with Context and Redux" },
            { type: "text", content: "We found out that if you wrap the whole app in one big Context (like old Redux does), then changing ANY little thing in global state (e.g. the user toggles 'dark theme') re-renders the ENTIRE component tree subscribed to that context." },
            { type: "heading", content: "The new wave: External state (Pub/Sub)" },
            { type: "text", content: "Modern state managers (like Zustand) solved this elegantly. They store state completely OUTSIDE React. It's just plain variables in JavaScript memory." },
            { type: "text", content: "Components no longer wait for the Context's mercy. They subscribe only to specific changes (the Publisher/Subscriber pattern). If 'Theme' changed, only the 2 components that 'listen' to the theme re-render. The other 1000 components don't even flinch!" },
            { type: "heading", content: "How it works (useSyncExternalStore)" },
            { type: "text", content: "In React 18 a new hook useSyncExternalStore was added specifically for such libraries (Zustand, MobX). It lets React components safely subscribe to external JS objects." },
            { type: "code", content: "// 1. Create the store OUTSIDE React (like in Zustand)\nlet externalState = { count: 0 };\nlet listeners = new Set();\n\nconst store = {\n  getSnapshot: () => externalState,\n  subscribe: (listener) => {\n    listeners.add(listener);\n    return () => listeners.delete(listener); // Unsubscribe\n  },\n  // Update function\n  inc: () => {\n    externalState = { count: externalState.count + 1 };\n    listeners.forEach(l => l()); // Notify all subscribers!\n  }\n};" },
            { type: "tip", content: "Zustand is now the de-facto standard for small and medium projects. It doesn't require wrapping the app in Providers, has no boilerplate (like Action/Reducer), you just write hooks!" }
          ]
        },
        practice: {
          title: "Mini-Zustand with useSyncExternalStore",
          description: "Subscribe a component to an external store.",
          task: "I wrote a simple external Store (Pub/Sub pattern) outside React. Your task: use the built-in hook useSyncExternalStore(store.subscribe, store.getSnapshot) inside the Counter component. Then in the button add a call to store.increment(). You'll see the state works without any useState or Context!",
          starterCode: "// EXTERNAL STORE (mini-Zustand)\nlet state = { count: 0 };\nlet listeners = new Set();\n\nconst store = {\n  getSnapshot: () => state,\n  subscribe: (listener) => {\n    listeners.add(listener);\n    return () => listeners.delete(listener);\n  },\n  increment: () => {\n    state = { count: state.count + 1 };\n    listeners.forEach(l => l()); // Notify React\n  }\n};\n\nfunction Counter() {\n  // 1. Use useSyncExternalStore\n  // Syntax: const state = useSyncExternalStore(subscribe, getSnapshot);\n  const data = { count: 0 }; // Replace this line\n\n  return (\n    <div className=\"box\">\n      <h3>External state: {data.count}</h3>\n      {/* 2. Call store.increment on click */}\n      <button onClick={() => {}}>Add</button>\n    </div>\n  );\n}\n\nfunction App() { return <Counter />; }"
        },
        type: "javascript"
      },
      // ============= LESSON 6 =============
      {
        id: "state-server",
        title: "Server State (React Query)",
        theory: {
          sections: [
            { type: "heading", content: "UI State vs Server State" },
            { type: "text", content: "For a long time developers stuffed everything into Redux. Whether the menu is open (UI State) and the list of posts loaded from the backend (Server State). For posts you had to write tons of code: FETCH_START, FETCH_SUCCESS, FETCH_ERROR actions, store isLoading and error flags." },
            { type: "text", content: "But server data does NOT belong to your app. You only show a cached copy of it on screen. At any moment someone else can change it in the database!" },
            { type: "heading", content: "The new paradigm: React Query / RTK Query" },
            { type: "text", content: "Libraries like React Query took over all the server work. They removed 70% of the code from Redux. Now you don't need to store server data in the global Store. You just call a hook!" },
            { type: "code", content: 'function UserList() {\n  // The hook makes the request, manages loading, and caches by itself!\n  const { data, isLoading, error } = useQuery("users", fetchUsers);\n\n  if (isLoading) return <div>Loading...</div>;\n  if (error) return <div>Error: {error.message}</div>;\n\n  return <ul>{data.map(u => <li>{u.name}</li>)}</ul>;\n}' },
            { type: "heading", content: "Advantages of this approach:" },
            { type: "list", items: [
              "Caching: if you navigate to another page and come back, React Query instantly shows the cache while quietly checking the backend for updates.",
              "Deduplication: if 5 components call useQuery(\"users\"), only ONE request goes to the server.",
              "Auto-refresh: data can refresh automatically when switching browser tabs (window focus refetching)."
            ]}
          ]
        },
        practice: {
          title: "Build a mini React Query",
          description: "Write a custom hook with useState and useEffect.",
          task: "Let's build a mini analog of useQuery! We have a stub function fetchData that imitates a server (1.5s delay). Write a custom hook useCustomQuery. Inside it use useState to manage data and isLoading, and in useEffect call the API function and update the state.",
          starterCode: "// Backend imitation (returns a Promise)\nconst fetchData = () => new Promise(res => setTimeout(() => res([\"Apple\", \"Banana\"]), 1500));\n\n// Write your own mini React Query\nfunction useCustomQuery() {\n  const [data, setData] = useState(null);\n  const [isLoading, setIsLoading] = useState(true);\n\n  useEffect(() => {\n    // 1. Call fetchData().then(result => ...)\n    // 2. Save the data and turn off loading\n    \n  }, []);\n\n  return { data, isLoading };\n}\n\nfunction App() {\n  const { data, isLoading } = useCustomQuery();\n\n  return (\n    <div className=\"box\">\n      <h3>Fruits from the server:</h3>\n      {/* 3. Conditional render: if isLoading show \"Loading...\", else the list */}\n      {isLoading ? <p>???</p> : <p>{data.join(', ')}</p>}\n    </div>\n  );\n}"
        },
        type: "javascript"
      }
    ]
  },
  RU: {
    title: "State Management",
    description: "Изучаем управление состоянием в React — от useState и Context до useReducer, Redux, Zustand и React Query.",
    lessons: [
      // ============= УРОК 1 =============
      {
        id: "state-local",
        title: "Локальное состояние и Prop Drilling",
        theory: {
          sections: [
            { type: "heading", content: "Что такое State (Состояние)?" },
            { type: "text", content: "В мире React состояние — это любые данные, при изменении которых интерфейс должен обновиться (перерисоваться). Например: открыто ли модальное окно, что введено в поле поиска, авторизован ли пользователь." },
            { type: "text", content: 'Самый базовый инструмент управления состоянием — это хук useState. Он создаёт локальное состояние, которое "живёт" только внутри одного компонента.' },
            { type: "heading", content: "Поднятие состояния (Lifting State Up)" },
            { type: "text", content: 'Представьте, что у вас есть два соседних компонента: <Sidebar /> и <Profile />. Оба должны знать имя пользователя. Вы не можете передать данные "вбок" от брата к сестре. React требует однонаправленного потока данных (сверху вниз).' },
            { type: "text", content: 'Чтобы два компонента делили данные, мы должны "поднять" состояние в их общего родителя (например, в <App />), а затем спустить данные вниз через пропсы.' },
            { type: "heading", content: "Проблема: Prop Drilling (Просверливание пропсов)" },
            { type: "text", content: "Пока компонентов мало, спуск пропсов работает отлично. Но в реальном приложении дерево компонентов может достигать 10-20 уровней вложенности!" },
            { type: "code", content: "<App user={user}>\n  <Layout user={user}>\n    <Header user={user}>\n      <UserAvatar user={user} />\n    </Header>\n  </Layout>\n</App>" },
            { type: "text", content: 'Компоненты Layout и Header вообще не используют данные user, они нужны им только для того, чтобы передать их дальше вниз, в UserAvatar. Этот процесс прокидывания данных сквозь "транзитные" слои называется Prop Drilling.' },
            { type: "text", content: "Это делает код грязным, усложняет рефакторинг и заставляет промежуточные компоненты перерисовываться при любом изменении стейта." }
          ]
        },
        practice: {
          title: "Сымитируй Prop Drilling",
          description: "Прокинь состояние вниз через транзитный компонент.",
          task: 'У вас есть состояние theme внутри App. Прокиньте его через компонент Layout внутрь компонента Button. В компоненте Button выведите текст: "Текущая тема: " + theme.',
          starterCode: "function Button(props) {\n  // 3. Получите theme из пропсов и выведите его\n  return <button>Текущая тема: ???</button>;\n}\n\nfunction Layout(props) {\n  // 2. Layout должен передать theme дальше в Button\n  return (\n    <div className=\"box\">\n      <p>Я транзитный компонент Layout</p>\n      <Button />\n    </div>\n  );\n}\n\nfunction App() {\n  const [theme, setTheme] = useState('dark');\n\n  // 1. Передайте theme в Layout\n  return (\n    <div>\n      <h2>Мое Приложение</h2>\n      <Layout />\n    </div>\n  );\n}"
        },
        type: "javascript"
      },
      // ============= УРОК 2 =============
      {
        id: "state-context",
        title: "Context API: Встроенная телепортация данных",
        theory: {
          sections: [
            { type: "heading", content: "Решение проблемы: Context" },
            { type: "text", content: 'Чтобы избежать Prop Drilling, команда React создала Context API. Контекст позволяет "телепортировать" данные в любой компонент глубоко в дереве, минуя промежуточные слои.' },
            { type: "heading", content: "Как это работает (3 шага):" },
            { type: "list", items: [
              "Создание: const ThemeContext = createContext(). Мы создаём объект контекста вне компонентов.",
              "Провайдер (Источник): мы оборачиваем корневой компонент в <ThemeContext.Provider value={данные}>. Всё, что внутри, сможет получить доступ к value.",
              "Потребитель (Consumer): в любом глубоко вложенном компоненте мы используем хук useContext(ThemeContext), чтобы 'поймать' переданные данные."
            ]},
            { type: "code", content: 'const ThemeContext = createContext("light");\n\nfunction App() {\n  return (\n    {/* Провайдер "вещает" данные вниз */}\n    <ThemeContext.Provider value="dark">\n      <Layout />\n    </ThemeContext.Provider>\n  );\n}\n\nfunction DeepButton() {\n  // Хук ловит данные. Layout про это даже не знает!\n  const theme = useContext(ThemeContext);\n  return <button>{theme}</button>;\n}' },
            { type: "tip", content: "Недостаток Context API: почему мы не храним ВСЁ состояние приложения в одном большом Контексте? Потому что каждый раз, когда значение в Провайдере меняется, ВСЕ компоненты, использующие этот useContext, перерисовываются целиком. Это сильно бьёт по производительности в крупных приложениях." }
          ]
        },
        practice: {
          title: "Избавься от Prop Drilling",
          description: "Используй Провайдер и useContext.",
          task: "Я создал UserContext. Оберните <Layout /> в UserContext.Provider и передайте ему value={user}. Затем в компоненте Avatar воспользуйтесь useContext, чтобы получить имя пользователя.",
          starterCode: "// Создаем контекст\nconst UserContext = createContext();\n\nfunction Avatar() {\n  // 2. Получите user из контекста с помощью useContext\n  const user = \"???\";\n\n  return <div className=\"box\">Аватар пользователя: {user}</div>;\n}\n\nfunction Layout() {\n  // Смотрите! Layout больше не принимает пропсы!\n  return <div><Avatar /></div>;\n}\n\nfunction App() {\n  const [user, setUser] = useState(\"Alex_Dev\");\n\n  return (\n    <div>\n      {/* 1. Оберните Layout в Провайдер и передайте value={user} */}\n      <Layout />\n    </div>\n  );\n}"
        },
        type: "javascript"
      },
      // ============= УРОК 3 =============
      {
        id: "state-reducer",
        title: "Архитектура Flux и хук useReducer",
        theory: {
          sections: [
            { type: "heading", content: "Проблема сложной логики" },
            { type: "text", content: "Когда состояние становится сложным (например, корзина товаров, где нужно считать сумму, применять скидки, менять количество), использование десятка useState превращает код в спагетти. Логика изменения данных размазывается по всем обработчикам кликов." },
            { type: "heading", content: "Паттерн Reducer (Архитектура Flux)" },
            { type: "text", content: "Вместо того чтобы менять данные напрямую, архитектура Flux предлагает строгий, предсказуемый поток данных:" },
            { type: "list", items: [
              "Store (Стейт): данные доступны только для чтения. Вы не можете их изменить напрямую.",
              "Action (Действие): если вы хотите изменить данные, вы 'отправляете' (Dispatch) объект действия. У действия всегда есть тип: { type: \"ADD_ITEM\", payload: \"Apple\" }. Это как квитанция с приказом 'Что нужно сделать'.",
              "Reducer (Обработчик): это чистая функция, которая принимает текущий State и прилетевший Action. Внутри неё работает switch/case, который решает, как именно изменить данные. Функция возвращает НОВЫЙ state."
            ]},
            { type: "heading", content: "useReducer в React" },
            { type: "text", content: "React поддерживает эту архитектуру из коробки с помощью хука useReducer. Он работает как продвинутый useState." },
            { type: "code", content: '// 1. Пишем Reducer\nfunction reducer(state, action) {\n  switch (action.type) {\n    case "INCREMENT": return { count: state.count + action.payload };\n    case "DECREMENT": return { count: state.count - action.payload };\n    default: return state;\n  }\n}\n\nfunction Counter() {\n  // 2. Инициализируем хук (передаём reducer и начальный стейт)\n  const [state, dispatch] = useReducer(reducer, { count: 0 });\n\n  // 3. Диспатчим экшены\n  return (\n    <button onClick={() => dispatch({ type: "INCREMENT", payload: 1 })}>\n      +1 (Сейчас: {state.count})\n    </button>\n  );\n}' }
          ]
        },
        practice: {
          title: "Банковский reducer",
          description: "Добавь case в reducer и диспатчи экшены.",
          task: "Допишите логику reducer. Добавьте в switch обработку двух действий: 'WITHDRAW' (снять деньги, отнимаем action.payload) и 'DEPOSIT' (положить деньги, прибавляем action.payload). Затем в кнопках добавьте onClick с вызовом dispatch и передачей правильного объекта action.",
          starterCode: "function bankReducer(state, action) {\n  switch (action.type) {\n    // 1. Добавьте case 'DEPOSIT': возвращаем { balance: state.balance + action.payload }\n    \n    // 2. Добавьте case 'WITHDRAW': возвращаем { balance: state.balance - action.payload }\n    \n    default: return state;\n  }\n}\n\nfunction App() {\n  const [state, dispatch] = useReducer(bankReducer, { balance: 1000 });\n\n  return (\n    <div className=\"box\">\n      <h2>Баланс: {state.balance}$</h2>\n      \n      {/* 3. Вызовите dispatch({ type: 'DEPOSIT', payload: 100 }) */}\n      <button onClick={() => {}}>Положить 100$</button>\n      \n      {/* 4. Вызовите dispatch({ type: 'WITHDRAW', payload: 50 }) */}\n      <button onClick={() => {}}>Снять 50$</button>\n    </div>\n  );\n}"
        },
        type: "javascript"
      },
      // ============= УРОК 4 =============
      {
        id: "state-redux",
        title: "Глобальный Store: Идеология Redux",
        theory: {
          sections: [
            { type: "heading", content: "Рождение Redux" },
            { type: "text", content: "В предыдущих уроках мы изучили Context (телепортация данных) и Reducer (упорядоченная логика). Что будет, если объединить их вместе?" },
            { type: "text", content: "Мы получим Глобальный Store — единое хранилище всей правды в приложении, доступное из любого места. Именно так и работает знаменитая библиотека Redux (и её современная версия Redux Toolkit)." },
            { type: "heading", content: "Три кита Redux:" },
            { type: "list", items: [
              "Единый источник правды: весь стейт (юзеры, посты, настройки) хранится в одном огромном JavaScript объекте (Store) на самом верху приложения.",
              "Состояние доступно только для чтения: компоненты не могут изменять Store. Единственный способ — задиспатчить Action (событие).",
              "Изменения делаются чистыми функциями: Reducers принимают старый Store и Action и возвращают абсолютно новый объект Store."
            ]},
            { type: "heading", content: "Самодельный Redux" },
            { type: "text", content: "До появления Redux Toolkit разработчики писали много шаблонного кода. По сути, Redux делает то же самое, что и связка Context + useReducer:" },
            { type: "code", content: "const StoreContext = createContext();\n\nfunction Provider({ children }) {\n    const [state, dispatch] = useReducer(rootReducer, initialState);\n    \n    // Передаём и данные, и функцию для их изменения в Контекст!\n    return (\n        <StoreContext.Provider value={{ state, dispatch }}>\n            {children}\n        </StoreContext.Provider>\n    );\n}" },
            { type: "heading", content: "Redux Toolkit (RTK)" },
            { type: "text", content: "Сегодня чистый Redux никто не пишет. Индустрия перешла на Redux Toolkit. Он избавляет от написания switch/case, автоматически настраивает Store и использует библиотеку Immer, которая позволяет 'как бы' мутировать состояние напрямую (например, state.value += 1), хотя под капотом она безопасно создаёт копию." }
          ]
        },
        practice: {
          title: "Собери мини-Redux",
          description: "Объедини useReducer с Context.",
          task: "Соберём мини-Redux своими руками! У нас есть StoreContext и rootReducer. 1. Внутри App используйте useReducer. 2. Передайте { state, dispatch } в Provider. 3. В компоненте UserPanel достаньте dispatch из контекста и отправьте экшен { type: 'LOGOUT' } при клике на кнопку.",
          starterCode: "const StoreContext = createContext();\n\nfunction rootReducer(state, action) {\n  if (action.type === 'LOGOUT') return { user: null };\n  return state;\n}\n\nfunction UserPanel() {\n  // 3. Получите state и dispatch из StoreContext\n  const { state, dispatch } = useContext(StoreContext) || { state: { user: 'Admin' }};\n\n  return (\n    <div className=\"box\">\n      <h3>Пользователь: {state.user ? state.user : 'Гость'}</h3>\n      {/* 4. Привяжите dispatch к onClick */}\n      <button>Выйти (Logout)</button>\n    </div>\n  );\n}\n\nfunction App() {\n  // 1. Инициализируйте useReducer\n  \n\n  return (\n    // 2. Оберните UserPanel в Provider и передайте value={{ state, dispatch }}\n    <div>\n       <UserPanel />\n    </div>\n  );\n}"
        },
        type: "javascript"
      },
      // ============= УРОК 5 =============
      {
        id: "state-zustand",
        title: "Атомарное и Внешнее состояние (Zustand)",
        theory: {
          sections: [
            { type: "heading", content: "Проблема Context и Redux" },
            { type: "text", content: 'Мы выяснили, что если обернуть всё приложение в один большой Context (как делает старый Redux), то при изменении любой мелочи в глобальном стейте (например, юзер нажал галочку "тёмная тема"), перерендерится всё дерево компонентов, подписанное на этот контекст.' },
            { type: "heading", content: "Новая волна: Внешнее состояние (Pub/Sub)" },
            { type: "text", content: "Современные стейт-менеджеры (такие как Zustand) решили эту проблему элегантно. Они хранят состояние вообще вне React. Это просто обычные переменные в JavaScript памяти." },
            { type: "text", content: 'Компоненты больше не ждут милости от Контекста. Они подписываются только на конкретные изменения (паттерн Publisher/Subscriber). Если изменилась "Тема", перерисуются только те 2 компонента, которые "слушают" тему. Остальные 1000 компонентов даже не шелохнутся!' },
            { type: "heading", content: "Как это работает (useSyncExternalStore)" },
            { type: "text", content: "В React 18 специально для таких библиотек (Zustand, MobX) добавили новый хук useSyncExternalStore. Он позволяет React-компонентам безопасно подписываться на внешние JS-объекты." },
            { type: "code", content: "// 1. Создаём стор ВНЕ React (как в Zustand)\nlet externalState = { count: 0 };\nlet listeners = new Set();\n\nconst store = {\n  getSnapshot: () => externalState,\n  subscribe: (listener) => {\n    listeners.add(listener);\n    return () => listeners.delete(listener); // Отписка\n  },\n  // Функция обновления\n  inc: () => {\n    externalState = { count: externalState.count + 1 };\n    listeners.forEach(l => l()); // Уведомляем всех подписчиков!\n  }\n};" },
            { type: "tip", content: "Zustand сейчас считается стандартом де-факто для небольших и средних проектов. Он не требует оборачивать приложение в Провайдеры, в нём нет шаблонного кода (как Action/Reducer), вы просто пишете хуки!" }
          ]
        },
        practice: {
          title: "Мини-Zustand через useSyncExternalStore",
          description: "Подпиши компонент на внешний стор.",
          task: "Я написал для вас простейший внешний Store (паттерн Pub/Sub) вне React. Ваша задача: использовать встроенный хук useSyncExternalStore(store.subscribe, store.getSnapshot) внутри компонента Counter. Затем в кнопке добавьте вызов store.increment(). Вы увидите, что стейт работает без всяких useState и Контекстов!",
          starterCode: "// ВНЕШНИЙ STORE (Мини-Zustand)\nlet state = { count: 0 };\nlet listeners = new Set();\n\nconst store = {\n  getSnapshot: () => state,\n  subscribe: (listener) => {\n    listeners.add(listener);\n    return () => listeners.delete(listener);\n  },\n  increment: () => {\n    state = { count: state.count + 1 };\n    listeners.forEach(l => l()); // Уведомляем React\n  }\n};\n\nfunction Counter() {\n  // 1. Используйте useSyncExternalStore\n  // Синтаксис: const state = useSyncExternalStore(подписка, чтение_данных);\n  const data = { count: 0 }; // Замените эту строку\n\n  return (\n    <div className=\"box\">\n      <h3>Внешний стейт: {data.count}</h3>\n      {/* 2. Вызовите store.increment при клике */}\n      <button onClick={() => {}}>Добавить</button>\n    </div>\n  );\n}\n\nfunction App() { return <Counter />; }"
        },
        type: "javascript"
      },
      // ============= УРОК 6 =============
      {
        id: "state-server",
        title: "Серверное состояние (React Query)",
        theory: {
          sections: [
            { type: "heading", content: "UI State против Server State" },
            { type: "text", content: "Долгое время разработчики пихали в Redux вообще всё. Открыто ли меню (UI State) и список постов, загруженный с бэкенда (Server State). Для постов приходилось писать кучу кода: action FETCH_START, FETCH_SUCCESS, FETCH_ERROR, хранить флаги isLoading, error." },
            { type: "text", content: "Но данные с сервера не принадлежат вашему приложению. Вы лишь показываете их кэшированную копию на экране. В любой момент кто-то другой может изменить их в базе данных!" },
            { type: "heading", content: "Новая парадигма: React Query / RTK Query" },
            { type: "text", content: "Библиотеки вроде React Query полностью забрали на себя работу с сервером. Они удалили 70% кода из Redux. Теперь вам не нужно хранить данные сервера в глобальном Store. Вы просто вызываете хук!" },
            { type: "code", content: 'function UserList() {\n  // Хук сам делает запрос, сам управляет загрузкой, сам кэширует!\n  const { data, isLoading, error } = useQuery("users", fetchUsers);\n\n  if (isLoading) return <div>Загрузка...</div>;\n  if (error) return <div>Ошибка: {error.message}</div>;\n\n  return <ul>{data.map(u => <li>{u.name}</li>)}</ul>;\n}' },
            { type: "heading", content: "Преимущества подхода:" },
            { type: "list", items: [
              "Кэширование: если вы уйдёте на другую страницу и вернётесь, React Query мгновенно покажет кэш, пока в фоне тихо проверит бэкенд на обновления.",
              "Дедупликация: если 5 компонентов вызовут useQuery(\"users\"), уйдёт только ОДИН запрос на сервер.",
              "Авто-обновление: данные могут автоматически обновляться при переключении вкладок браузера (Window focus refetching)."
            ]}
          ]
        },
        practice: {
          title: "Напиши мини React Query",
          description: "Сделай кастомный хук с useState и useEffect.",
          task: "Напишем свой мини-аналог useQuery! У нас есть функция-заглушка fetchData, которая имитирует сервер (задержка 1.5 сек). Напишите кастомный хук useCustomQuery. Внутри него используйте useState для управления data и isLoading, а в useEffect вызовите API-функцию и обновите стейты.",
          starterCode: "// Имитация бэкенда (возвращает Promise)\nconst fetchData = () => new Promise(res => setTimeout(() => res([\"Apple\", \"Banana\"]), 1500));\n\n// Пишем свой мини React Query\nfunction useCustomQuery() {\n  const [data, setData] = useState(null);\n  const [isLoading, setIsLoading] = useState(true);\n\n  useEffect(() => {\n    // 1. Сделайте вызов fetchData().then(result => ...)\n    // 2. Сохраните данные и отключите загрузку\n    \n  }, []);\n\n  return { data, isLoading };\n}\n\nfunction App() {\n  const { data, isLoading } = useCustomQuery();\n\n  return (\n    <div className=\"box\">\n      <h3>Фрукты с сервера:</h3>\n      {/* 3. Условный рендеринг: если isLoading - текст \"Загрузка...\", иначе список */}\n      {isLoading ? <p>???</p> : <p>{data.join(', ')}</p>}\n    </div>\n  );\n}"
        },
        type: "javascript"
      }
    ]
  }
};
