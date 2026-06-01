export const reactNativeState: Record<'EN' | 'RU', any> = {
  EN: {
    title: "React Native Basics (MUST)",
    description: "Components, navigation, and state on mobile. Learn how to build native iOS and Android apps using JavaScript.",
    lessons: [
      {
        id: "rn-intro-expo",
        title: "Introduction: React Native & Expo",
        theory: {
          sections: [
            { type: "heading", content: "Not a Web View!" },
            { type: "text", content: "React Native (RN) does not render HTML inside a hidden browser (like Cordova or Ionic did). When you write a React Native component, a background engine (The Bridge / JSI) translates your JavaScript into real, native Java/Kotlin (for Android) and Objective-C/Swift (for iOS) UI elements." },
            { type: "heading", content: "The Expo Magic" },
            { type: "text", content: "Setting up Android Studio, XCode, and managing native build files is a nightmare for beginners. That's why the industry standard for starting (and often finishing) RN projects is Expo." },
            { type: "text", content: "Expo is a framework and a platform around React Native. It hides the native code, provides dozens of built-in APIs (Camera, Location, Notifications), and lets you run your app on your physical phone instantly using the 'Expo Go' app and a QR code." },
            { type: "tip", content: "Resource: Expo Docs. Whenever you need to access hardware features (like the phone's gallery or GPS), do not google 'React native camera'. Google 'Expo camera' instead. The Expo documentation is incredibly beginner-friendly." }
          ]
        },
        practice: {
          title: "Hello Mobile World",
          description: "Write your first mobile component.",
          task: "In React Native, we don't have HTML tags like <div> or <p>. We use <View> and <Text>. Fix the starter code by replacing the web tags with the correct React Native components. Don't forget to return them!",
          starterCode: "import React from 'react';\nimport { View, Text } from 'react-native';\n\nexport default function App() {\n  // ❌ BAD: This is web code!\n  // return (\n  //   <div>\n  //     <p>Hello Mobile World!</p>\n  //   </div>\n  // );\n  \n  // ✅ YOUR TURN: Use <View> and <Text>\n  return (\n      \n  );\n}"
        },
        type: "javascript"
      },
      {
        id: "rn-core-components",
        title: "Core Components & SafeArea",
        theory: {
          sections: [
            { type: "heading", content: "The Mapping" },
            { type: "text", content: "To build UIs in React Native, you must learn the mapping between Web and Native concepts:" },
            { type: "list", items: [
              "<div> becomes <View> (A container for layout)",
              "<span> or <p> becomes <Text> (You CANNOT put raw text directly inside a View; it will crash!)",
              "<img> becomes <Image> (For local images you use require('./img.png'), for network images use {uri: 'https...'}).",
              "<input> becomes <TextInput> (For user input)."
            ]},
            { type: "heading", content: "Interactivity (Buttons)" },
            { type: "text", content: "Instead of onClick, mobile apps use onPress. The standard <Button> component is very rigid and looks different on iOS vs Android. For custom buttons, developers use <TouchableOpacity> or <Pressable> which wrap any view and make it tappable, lowering its opacity when pressed." },
            { type: "heading", content: "SafeAreaView" },
            { type: "text", content: "Modern phones have 'notches' (the camera cutout at the top) and home indicators at the bottom. If you use a regular <View>, your text might render under the iPhone notch. <SafeAreaView> automatically adds padding to avoid these hardware areas." }
          ]
        },
        practice: {
          title: "Build a Login Screen UI",
          description: "Use core components to structure a screen.",
          task: "Create a simple login form. Wrap everything in a <View>. Inside, add a <Text> for the title 'Login', a <TextInput> with a placeholder 'Email', and a <TouchableOpacity> containing a <Text> 'Submit'.",
          starterCode: "import React from 'react';\nimport { View, Text, TextInput, TouchableOpacity } from 'react-native';\n\nexport default function LoginScreen() {\n  return (\n    <View>\n      {/* 1. Add Title Text */}\n      \n      \n      {/* 2. Add TextInput with placeholder */}\n      \n\n      {/* 3. Add TouchableOpacity with an onPress console.log and Text inside */}\n      \n      \n    </View>\n  );\n}"
        },
        type: "javascript"
      },
      {
        id: "rn-styling",
        title: "Styling and Mobile Flexbox",
        theory: {
          sections: [
            { type: "heading", content: "No CSS Files Allowed" },
            { type: "text", content: "React Native doesn't use CSS or classNames. Styling is done using JavaScript objects. The standard way is to use the StyleSheet.create() API, which optimizes the styles under the hood." },
            { type: "code", content: "const styles = StyleSheet.create({\n  container: {\n    backgroundColor: '#fff',\n    padding: 20,\n    borderRadius: 10, // Notice camelCase instead of border-radius\n  }\n});" },
            { type: "heading", content: "The Flexbox Flip" },
            { type: "text", content: "React Native uses Flexbox for all layouts. However, there are two massive differences from Web CSS:" },
            { type: "list", items: [
              "Everything is display: flex by default.",
              "The default flexDirection is 'column' (top to bottom), NOT 'row' (left to right) like on the web! This makes sense because mobile phones are vertical."
            ]},
            { type: "tip", content: "Resource: Academind RN Course. Maximilian Schwarzmüller's React Native course is famous for deeply explaining how to structure complex layouts using nested Flexbox views." }
          ]
        },
        practice: {
          title: "Center a Container",
          description: "Master mobile Flexbox alignment.",
          task: "Create a style object. The 'container' should take up the entire screen (flex: 1) and center its children both vertically and horizontally. Apply this style to the View.",
          starterCode: "import React from 'react';\nimport { View, Text, StyleSheet } from 'react-native';\n\nexport default function CenteredApp() {\n  return (\n    // 2. Apply styles.container here\n    <View style={ { /* apply style here */ } }>\n      <Text style={styles.text}>I am perfectly centered!</Text>\n    </View>\n  );\n}\n\n// 1. Complete the stylesheet\nconst styles = StyleSheet.create({\n  container: {\n    // Take up all available space\n    flex: 1,\n    // Center vertically (since default direction is column)\n    \n    // Center horizontally\n    \n  },\n  text: {\n    fontSize: 20,\n    fontWeight: 'bold',\n  }\n});"
        },
        type: "javascript"
      },
      {
        id: "rn-lists",
        title: "Performance: ScrollView vs FlatList",
        theory: {
          sections: [
            { type: "heading", content: "The Scrolling Problem" },
            { type: "text", content: "On the web, if you have a list of 1000 items, you just map() over them and the browser handles the scrolling. On mobile, rendering 1000 views at once will instantly crash the app or drain the battery." },
            { type: "heading", content: "ScrollView" },
            { type: "text", content: "The <ScrollView> component renders ALL its children at once. It is great for a static screen (like an 'About' page or an article) that just needs to be scrollable." },
            { type: "heading", content: "FlatList (Lazy Rendering)" },
            { type: "text", content: "For long or infinite lists (like an Instagram feed), you MUST use <FlatList>. It only renders the items currently visible on the screen. As you scroll, it recycles the views that disappear off the top and reuses them for new items at the bottom." },
            { type: "code", content: "<FlatList \n  data={myArray}\n  keyExtractor={(item) => item.id}\n  renderItem={({ item }) => <Text>{item.title}</Text>}\n/>" },
            { type: "tip", content: "Resource: RN Docs. Read the official documentation on 'Using Lists'. Pay attention to the 'renderItem' prop — it receives an object containing 'item', 'index', and more. That's why we always destructure it as ({ item })." }
          ]
        },
        practice: {
          title: "Build a Feed",
          description: "Implement a highly performant list.",
          task: "We have an array of users. Use a <FlatList> to render them. Pass the 'USERS' array to the 'data' prop. Use the 'id' for the keyExtractor. In the renderItem prop, return a <Text> component with the user's name.",
          starterCode: "import React from 'react';\nimport { FlatList, Text, View } from 'react-native';\n\nconst USERS = [\n  { id: '1', name: 'Alice' },\n  { id: '2', name: 'Bob' },\n  { id: '3', name: 'Charlie' },\n];\n\nexport default function UsersList() {\n  return (\n    <View style={{ flex: 1, paddingTop: 50 }}>\n      <FlatList \n        // 1. Pass the data array\n        \n        // 2. Define the key extractor\n        \n        // 3. Define how to render each item\n        \n      />\n    </View>\n  );\n}"
        },
        type: "javascript"
      },
      {
        id: "rn-navigation",
        title: "Mobile Navigation (React Navigation)",
        theory: {
          sections: [
            { type: "heading", content: "No URLs on Mobile" },
            { type: "text", content: "On the web, we use react-router and URLs to move between pages. Mobile apps don't have URLs. They use 'Stacks' (like a deck of cards)." },
            { type: "text", content: "When you go from the 'Home' screen to the 'Details' screen, the app doesn't destroy the 'Home' screen. It pushes the 'Details' screen on top of it. When you press the physical 'Back' button, it pops the top screen off, revealing the preserved 'Home' screen underneath." },
            { type: "heading", content: "React Navigation" },
            { type: "text", content: "The absolute standard library for this is React Navigation. It provides different types of navigators:" },
            { type: "list", items: [
              "Stack Navigator: Pushes new screens on top (with a nice slide animation and a header with a back button).",
              "Bottom Tab Navigator: The classic 4-5 buttons at the bottom of the screen (Home, Search, Profile).",
              "Drawer Navigator: The hamburger menu sliding from the side."
            ]},
            { type: "text", content: "Every screen rendered by the Navigator automatically receives a 'navigation' prop, which you use to move around: `navigation.navigate('DetailsScreen')`." }
          ]
        },
        practice: {
          title: "Navigate to Details",
          description: "Use the navigation prop to push a screen.",
          task: "The HomeScreen component receives the 'navigation' object as a prop. Add an onPress handler to the TouchableOpacity. Inside it, call navigation.navigate('Details') to move to the next screen.",
          starterCode: "import React from 'react';\nimport { View, Text, TouchableOpacity, StyleSheet } from 'react-native';\n\n// Screen 1\nfunction HomeScreen({ navigation }) {\n  return (\n    <View style={styles.container}>\n      <Text>Home Screen</Text>\n      \n      {/* Add onPress to navigate to 'Details' */}\n      <TouchableOpacity \n        style={styles.button} \n        onPress={() => { /* Your code here */ }}\n      >\n        <Text style={{color: 'white'}}>Go to Details</Text>\n      </TouchableOpacity>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },\n  button: { backgroundColor: 'blue', padding: 10, marginTop: 20 }\n});"
        },
        type: "javascript"
      }
    ]
  },
  RU: {
    title: "React Native основы (MUST)",
    description: "Компоненты, навигация, стилизация и списки. Научитесь создавать нативные iOS и Android приложения на JavaScript.",
    lessons: [
      {
        id: "rn-intro-expo",
        title: "Введение: React Native и магия Expo",
        theory: {
          sections: [
            { type: "heading", content: "Это не Web View!" },
            { type: "text", content: "React Native (RN) не рендерит HTML внутри скрытого браузера (как это делали старые фреймворки типа Cordova). Когда вы пишете RN-компонент, фоновый движок (The Bridge / JSI) переводит ваш JavaScript в настоящие, нативные элементы Java/Kotlin (для Android) и Objective-C/Swift (для iOS)." },
            { type: "heading", content: "Что такое Expo?" },
            { type: "text", content: "Настройка Android Studio, XCode и возня с нативным кодом при сборке — это кошмар для новичка. Поэтому стандартом индустрии для старта (а часто и для крупных проектов) является Expo." },
            { type: "text", content: "Expo — это фреймворк и платформа вокруг React Native. Он прячет от вас нативный код, дает десятки готовых API (Камера, GPS, Пуши) и позволяет мгновенно запустить приложение на вашем физическом телефоне через приложение 'Expo Go' по QR-коду." },
            { type: "tip", content: "Ресурс: Expo Docs. Когда вам нужно получить доступ к функциям железа (камере или геолокации), не гуглите 'React native camera'. Гуглите 'Expo camera'. Документация Expo невероятно понятная и идеально подходит для новичков." }
          ]
        },
        practice: {
          title: "Привет, Мобильный Мир",
          description: "Напишите свой первый мобильный компонент.",
          task: "В React Native нет HTML тегов вроде <div> или <p>. Мы используем <View> и <Text>. Исправьте стартовый код, заменив веб-теги на правильные компоненты React Native. Не забудьте вернуть их (return)!",
          starterCode: "import React from 'react';\nimport { View, Text } from 'react-native';\n\nexport default function App() {\n  // ❌ ПЛОХО: Это веб-код!\n  // return (\n  //   <div>\n  //     <p>Hello Mobile World!</p>\n  //   </div>\n  // );\n  \n  // ✅ ВАША ОЧЕРЕДЬ: Используйте <View> и <Text>\n  return (\n      \n  );\n}"
        },
        type: "javascript"
      },
      {
        id: "rn-core-components",
        title: "Базовые Компоненты и SafeArea",
        theory: {
          sections: [
            { type: "heading", content: "Словарь перевода с Web на Mobile" },
            { type: "text", content: "Чтобы строить интерфейсы в React Native, нужно выучить перевод с веб-концепций:" },
            { type: "list", items: [
              "<div> превращается в <View> (Контейнер для верстки).",
              "<span> или <p> превращаются в <Text>. (ВНИМАНИЕ: Вы НЕ МОЖЕТЕ положить обычный текст прямо внутрь <View>, приложение упадет с ошибкой!).",
              "<img> превращается в <Image> (Для локальных картинок: require('./img.png'), для интернета: {uri: 'https...'}).",
              "<input> превращается в <TextInput>."
            ]},
            { type: "heading", content: "Интерактивность (Кнопки)" },
            { type: "text", content: "Вместо onClick мобилки используют onPress. Стандартный компонент <Button> очень жесткий и выглядит совершенно по-разному на iOS и Android. Поэтому разработчики используют <TouchableOpacity> или <Pressable>. Это невидимая обертка, которая делает любой <View> кликабельным и красиво подсвечивает (затемняет) его при нажатии." },
            { type: "heading", content: "SafeAreaView" },
            { type: "text", content: "У современных телефонов есть 'челки' (вырезы под камеру) и полоски свайпа внизу. Обычный <View> отрисует ваш текст прямо под вырезом камеры. Чтобы этого избежать, экраны оборачивают в <SafeAreaView>, который автоматически высчитывает нужные отступы." }
          ]
        },
        practice: {
          title: "Экран Авторизации",
          description: "Используйте базовые компоненты для верстки.",
          task: "Создайте простую форму логина. Оберните всё в <View>. Внутри добавьте <Text> с заголовком 'Вход', затем <TextInput> с плейсхолдером 'Email', и наконец <TouchableOpacity>, внутрь которого положите <Text> с надписью 'Отправить'.",
          starterCode: "import React from 'react';\nimport { View, Text, TextInput, TouchableOpacity } from 'react-native';\n\nexport default function LoginScreen() {\n  return (\n    <View>\n      {/* 1. Добавьте Текст заголовка */}\n      \n      \n      {/* 2. Добавьте TextInput с плейсхолдером */}\n      \n\n      {/* 3. Добавьте TouchableOpacity с onPress и текстом внутри */}\n      \n      \n    </View>\n  );\n}"
        },
        type: "javascript"
      },
      {
        id: "rn-styling",
        title: "Стилизация и Мобильный Flexbox",
        theory: {
          sections: [
            { type: "heading", content: "Никаких CSS файлов" },
            { type: "text", content: "В React Native нельзя подключить файл .css или использовать classNames. Стилизация делается через JavaScript-объекты. Стандарт — это API StyleSheet.create(), который кэширует и оптимизирует стили под капотом." },
            { type: "code", content: "const styles = StyleSheet.create({\n  container: {\n    backgroundColor: '#fff',\n    padding: 20,\n    borderRadius: 10, // Заметьте, camelCase вместо border-radius\n  }\n});" },
            { type: "heading", content: "Перевернутый Flexbox" },
            { type: "text", content: "React Native использует Flexbox для всей верстки. Но есть два гигантских отличия от веба:" },
            { type: "list", items: [
              "Абсолютно все элементы являются display: flex по умолчанию.",
              "Направление оси по умолчанию (flexDirection) — 'column' (сверху вниз), А НЕ 'row' (слева направо) как в вебе! Это логично, ведь экраны телефонов вертикальные."
            ]},
            { type: "tip", content: "Ресурс: Курс Academind RN. Курс Максимилиана Шварцмюллера славится тем, что там феноменально подробно объясняется верстка: как вкладывать флекс-контейнеры друг в друга, чтобы получить сложные карточки товаров и меню." }
          ]
        },
        practice: {
          title: "Центрирование",
          description: "Освойте мобильный Flexbox.",
          task: "Создайте объект со стилями. 'container' должен занимать весь экран (flex: 1) и центрировать своих детей по вертикали и по горизонтали. Примените этот стиль к корневому View.",
          starterCode: "import React from 'react';\nimport { View, Text, StyleSheet } from 'react-native';\n\nexport default function CenteredApp() {\n  return (\n    // 2. Примените styles.container сюда\n    <View style={ { /* напишите здесь */ } }>\n      <Text style={styles.text}>Я идеально по центру!</Text>\n    </View>\n  );\n}\n\n// 1. Завершите написание стилей\nconst styles = StyleSheet.create({\n  container: {\n    // Занять всё свободное пространство\n    flex: 1,\n    // Центрировать по вертикали (так как ось column)\n    \n    // Центрировать по горизонтали\n    \n  },\n  text: {\n    fontSize: 20,\n    fontWeight: 'bold',\n  }\n});"
        },
        type: "javascript"
      },
      {
        id: "rn-lists",
        title: "Производительность: ScrollView vs FlatList",
        theory: {
          sections: [
            { type: "heading", content: "Проблема скролла на мобилках" },
            { type: "text", content: "В вебе, если у вас 1000 комментариев, вы просто делаете map() по массиву, и браузер сам справляется с прокруткой. На мобильном устройстве попытка отрендерить сразу 1000 View в памяти мгновенно 'убьет' приложение или сожжет батарею." },
            { type: "heading", content: "ScrollView" },
            { type: "text", content: "Компонент <ScrollView> рендерит ВСЕХ своих детей сразу. Он отлично подходит для статичных экранов (статья, настройки, профиль), где контента немного, но он не влезает на один экран." },
            { type: "heading", content: "FlatList (Ленивый рендер)" },
            { type: "text", content: "Для длинных и бесконечных списков (Лента Instagram, чаты) вы ОБЯЗАНЫ использовать <FlatList>. Он рендерит только то, что видно на экране сейчас. При скролле вниз, он 'перерабатывает' (recycle) уехавшие наверх ячейки и подставляет в них новые данные. Это дает 60 FPS." },
            { type: "code", content: "<FlatList \n  data={myArray}\n  keyExtractor={(item) => item.id}\n  renderItem={({ item }) => <Text>{item.title}</Text>}\n/>" },
            { type: "tip", content: "Ресурс: RN Docs. Внимательно читайте официальную документацию в разделе 'Using Lists'. Обратите внимание на проп 'renderItem' — он принимает объект, внутри которого лежат поля 'item', 'index' и др. Именно поэтому мы всегда деструктурируем его в сигнатуре: ({ item })." }
          ]
        },
        practice: {
          title: "Создай Ленту",
          description: "Реализуйте высокопроизводительный список.",
          task: "У нас есть массив пользователей. Используйте <FlatList> для их рендера. Передайте массив 'USERS' в проп 'data'. Используйте 'id' для 'keyExtractor'. В 'renderItem' верните компонент <Text> с именем пользователя.",
          starterCode: "import React from 'react';\nimport { FlatList, Text, View } from 'react-native';\n\nconst USERS = [\n  { id: '1', name: 'Alice' },\n  { id: '2', name: 'Bob' },\n  { id: '3', name: 'Charlie' },\n];\n\nexport default function UsersList() {\n  return (\n    <View style={{ flex: 1, paddingTop: 50 }}>\n      <FlatList \n        // 1. Передайте массив данных\n        \n        // 2. Укажите функцию извлечения ключа\n        \n        // 3. Укажите функцию рендера элемента\n        \n      />\n    </View>\n  );\n}"
        },
        type: "javascript"
      },
      {
        id: "rn-navigation",
        title: "Навигация (React Navigation)",
        theory: {
          sections: [
            { type: "heading", content: "В мобилках нет URL-адресов" },
            { type: "text", content: "В вебе мы используем react-router и меняем URL. В приложениях нет URL. Вместо этого используется 'Стек' (Stack) — аналог колоды карт." },
            { type: "text", content: "Когда вы переходите с 'Главной' на 'Детали', приложение не удаляет 'Главную'. Оно кладет 'Детали' поверх неё. Когда вы нажимаете физическую кнопку 'Назад' (на Android) или делаете свайп, верхний экран сбрасывается (pop), показывая сохраненный снизу экран 'Главной'." },
            { type: "heading", content: "React Navigation" },
            { type: "text", content: "Абсолютным монополистом для навигации является библиотека React Navigation. В ней есть разные типы навигаторов:" },
            { type: "list", items: [
              "Stack Navigator: Накладывает экраны друг на друга (дает красивую анимацию скольжения и шапку с кнопкой Назад).",
              "Bottom Tab Navigator: Классические 4-5 кнопок внизу экрана (Лента, Поиск, Профиль).",
              "Drawer Navigator: Боковое меню (Гамбургер), выезжающее слева."
            ]},
            { type: "text", content: "Каждый экран, который рендерится Навигатором, автоматически получает пропс 'navigation'. Вы вызываете `navigation.navigate('DetailsScreen')`, чтобы перейти на другой экран." }
          ]
        },
        practice: {
          title: "Переход на другой экран",
          description: "Используйте проп navigation для перемещения.",
          task: "Компонент HomeScreen получает объект 'navigation' в пропсах. Добавьте обработчик onPress в TouchableOpacity. Внутри обработчика вызовите navigation.navigate('Details'), чтобы перейти на следующий экран.",
          starterCode: "import React from 'react';\nimport { View, Text, TouchableOpacity, StyleSheet } from 'react-native';\n\n// Экран 1\nfunction HomeScreen({ navigation }) {\n  return (\n    <View style={styles.container}>\n      <Text>Главный экран</Text>\n      \n      {/* Добавьте onPress для перехода на экран 'Details' */}\n      <TouchableOpacity \n        style={styles.button} \n        onPress={() => { /* Ваш код здесь */ }}\n      >\n        <Text style={{color: 'white'}}>Перейти к деталям</Text>\n      </TouchableOpacity>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },\n  button: { backgroundColor: 'blue', padding: 10, marginTop: 20 }\n});"
        },
        type: "javascript"
      }
    ]
  }
};