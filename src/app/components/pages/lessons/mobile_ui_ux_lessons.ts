export const mobileUiUxState: Record<'EN' | 'RU', any> = {
  EN: {
    title: "Mobile UI/UX (MUST)",
    description: "iOS HIG, Material Design, gestures, and animations. Learn how to build apps that feel truly native and user-friendly.",
    lessons: [
      {
        id: "uiux-guidelines",
        title: "Platform Guidelines: HIG vs Material",
        theory: {
          sections: [
            { type: "heading", content: "Two Different Worlds" },
            { type: "text", content: "iOS and Android users have different expectations. An app that looks exactly like an iPhone app on an Android device feels 'wrong' or 'broken' to the user." },
            { type: "list", items: [
              "Apple HIG (Human Interface Guidelines): Emphasizes depth (translucency, blurring), flat icons, and bottom tab bars for main navigation. Typography is usually system-default (San Francisco).",
              "Material Design (Google): Based on 'paper and ink'. Uses shadows (elevation) to show hierarchy. Traditionally relies heavily on the Floating Action Button (FAB) and bold colors."
            ]},
            { type: "heading", content: "Platform-Specific Code" },
            { type: "text", content: "In React Native, you can use the Platform.OS API to render slightly different UI components or styles depending on whether the user is on iOS or Android." },
            { type: "tip", content: "Resource: Mobbin. Mobbin is the ultimate cheat code for mobile designers and devs. It's a library of thousands of screenshots from top apps (Airbnb, Uber, Spotify). Before building a screen, check Mobbin to see how industry leaders did it." }
          ]
        },
        practice: {
          title: "Platform Specific Button",
          description: "Adapt your UI based on the OS.",
          task: "Use the Platform module from 'react-native' to conditionally style a button. If Platform.OS is 'ios', set the color to blue (#007AFF). If it is 'android', set it to Material green (#4CAF50).",
          starterCode: "import React from 'react';\nimport { View, Text, StyleSheet, Platform } from 'react-native';\n\nexport default function AdaptiveButton() {\n  // 1. Check the platform and set the color\n  const buttonColor = Platform.OS === 'ios' ? '???' : '???';\n\n  return (\n    <View style={styles.container}>\n      <View style={[styles.button, { backgroundColor: buttonColor }]}>\n        <Text style={styles.text}>Click Me</Text>\n      </View>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },\n  button: { padding: 15, borderRadius: 8 },\n  text: { color: 'white', fontWeight: 'bold' }\n});"
        },
        type: "javascript"
      },
      {
        id: "uiux-touch-targets",
        title: "The Thumb Zone & Touch Targets",
        theory: {
          sections: [
            { type: "heading", content: "Designing for Thumbs" },
            { type: "text", content: "Most users hold their phone with one hand and navigate using their thumb. The bottom-center of the screen is the 'Natural' zone. The top-left corner is the 'Stretch' or 'Pain' zone." },
            { type: "text", content: "Rule of thumb: Place frequent, primary actions (like 'Buy' or Navigation Tabs) at the bottom. Place destructive or rare actions (like 'Settings' or 'Delete Profile') at the top." },
            { type: "heading", content: "Minimum Touch Target Size" },
            { type: "text", content: "Human fingers are not precise mouse cursors. If your buttons are too small, users will misclick and get frustrated." },
            { type: "list", items: [
              "Apple HIG mandates a minimum touch area of 44x44 points.",
              "Material Design recommends a minimum of 48x48 dp."
            ]},
            { type: "text", content: "If a visual icon needs to be small (e.g., 24x24), you MUST expand its clickable area using padding or React Native's 'hitSlop' property." }
          ]
        },
        practice: {
          title: "Fixing a Tiny Button",
          description: "Use hitSlop to increase the clickable area.",
          task: "We have a tiny 20x20 'X' (Close) button. It's too hard to tap. Add the `hitSlop` prop to the TouchableOpacity to expand its invisible clickable area by 20 points in all directions (top, bottom, left, right).",
          starterCode: "import React from 'react';\nimport { View, Text, TouchableOpacity, StyleSheet } from 'react-native';\n\nexport default function CloseButton() {\n  return (\n    <View style={styles.container}>\n      {/* 1. Add the hitSlop prop to this TouchableOpacity */}\n      <TouchableOpacity \n        style={styles.tinyButton} \n        onPress={() => console.log('Closed!')}\n        \n      >\n        <Text style={styles.text}>X</Text>\n      </TouchableOpacity>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },\n  tinyButton: { width: 20, height: 20, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center' },\n  text: { color: 'white', fontSize: 12 }\n});"
        },
        type: "javascript"
      },
      {
        id: "uiux-spacing-typography",
        title: "The 8pt Grid & Typography",
        theory: {
          sections: [
            { type: "heading", content: "The 8-Point Grid System" },
            { type: "text", content: "Good design looks consistent. Why? Because designers use math. The industry standard is the 8pt Grid System. This means that all margins, paddings, and component sizes should be multiples of 8 (8, 16, 24, 32, 40, 48, 64)." },
            { type: "text", content: "Why 8? Mobile screen resolutions scale well by factors of 2. An 8pt margin renders perfectly sharp on 1x, 2x, and 3x density screens without blurry sub-pixels." },
            { type: "heading", content: "Mobile Typography" },
            { type: "text", content: "Reading on a small screen under sunlight is hard. Ensure high contrast (e.g., dark grey text on a white background, not light grey on white). The base body text size should be 16pt. Never go below 12pt for readable text." },
            { type: "tip", content: "Resource: Material Design Type System. Google's spec gives you exact sizes and line-heights for H1 to H6, subtitles, and body text. Steal their scale, don't invent your own." }
          ]
        },
        practice: {
          title: "Align to the Grid",
          description: "Fix chaotic spacing using the 8pt rule.",
          task: "The current styles use messy, random numbers (13, 27). Fix the styles object so that padding, margin, and borderRadius strictly follow the 8-point grid (use 16 or 24 instead of 13 or 27).",
          starterCode: "import React from 'react';\nimport { View, Text, StyleSheet } from 'react-native';\n\nexport default function Card() {\n  return (\n    <View style={styles.card}>\n      <Text style={styles.title}>Product Title</Text>\n      <Text style={styles.body}>This is a description of the product.</Text>\n    </View>\n  );\n}\n\n// 1. Fix these numbers to be multiples of 8!\nconst styles = StyleSheet.create({\n  card: {\n    backgroundColor: '#fff',\n    padding: 13,        // CHANGE ME\n    marginBottom: 27,   // CHANGE ME\n    borderRadius: 10,   // CHANGE ME (8 or 16)\n  },\n  title: {\n    fontSize: 24,       // This is a multiple of 8 (Good!)\n    marginBottom: 11,   // CHANGE ME\n  },\n  body: {\n    fontSize: 16,\n  }\n});"
        },
        type: "javascript"
      },
      {
        id: "uiux-gestures",
        title: "Handling Gestures",
        theory: {
          sections: [
            { type: "heading", content: "Beyond Point and Click" },
            { type: "text", content: "On desktop, you 'click'. On mobile, you swipe, pinch, long-press, and drag. Users expect your app to respond to these physical interactions." },
            { type: "text", content: "For example, swiping right from the left edge of the screen should go 'Back'. Long-pressing a message should open a context menu (like in Telegram or WhatsApp)." },
            { type: "heading", content: "React Native Gesture Handler" },
            { type: "text", content: "While React Native has built-in touch handlers (like onLongPress in TouchableOpacity), complex gestures (like swiping to delete an email) require a specialized library. The community standard is 'react-native-gesture-handler'. It runs gestures on the native UI thread, meaning they don't lag even if your JS thread is busy." }
          ]
        },
        practice: {
          title: "Implement a Long Press",
          description: "Use basic touch events.",
          task: "Add an 'onLongPress' prop to the TouchableOpacity. When the user presses and holds the button, it should trigger an alert (or console.log) saying 'Context Menu Opened!'.",
          starterCode: "import React from 'react';\nimport { View, Text, TouchableOpacity, StyleSheet } from 'react-native';\n\nexport default function MessageItem() {\n  return (\n    <View style={styles.container}>\n      {/* 1. Add onLongPress to handle a hold gesture */}\n      <TouchableOpacity \n        style={styles.messageBubble}\n        onPress={() => console.log('Regular tap')}\n        \n      >\n        <Text style={styles.text}>Hey, what's up?</Text>\n      </TouchableOpacity>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { flex: 1, padding: 20 },\n  messageBubble: { padding: 16, backgroundColor: '#E5E5EA', borderRadius: 16 },\n  text: { fontSize: 16 }\n});"
        },
        type: "javascript"
      },
      {
        id: "uiux-animations",
        title: "Animations & Micro-interactions",
        theory: {
          sections: [
            { type: "heading", content: "Animations are not just 'Pretty'" },
            { type: "text", content: "In mobile UX, animations serve a functional purpose. They provide Context. If an item disappears instantly without an animation, the user's brain gets confused. If the item slides off the screen to the left, the user understands it was 'discarded'." },
            { type: "heading", content: "Micro-interactions" },
            { type: "text", content: "These are small visual feedbacks. Like the 'Like' heart on Twitter scaling up and bouncing slightly when tapped. It confirms to the user that the system registered their action." },
            { type: "heading", content: "The Animated API" },
            { type: "text", content: "React Native comes with the 'Animated' API. You map animated values to style properties (like opacity or transform). For extreme 120fps performance, developers use the 'Reanimated' library, but the built-in Animated API is great for basic fades and scales." },
            { type: "tip", content: "Rule of Thumb: Animations should be fast. A UI transition should take between 200ms and 300ms. Anything slower feels sluggish and annoys the user." }
          ]
        },
        practice: {
          title: "Fade-In Animation",
          description: "Create a simple opacity animation.",
          task: "Use the built-in Animated API. We created an 'opacity' value starting at 0. Call Animated.timing() inside useEffect to change this value to 1 over a duration of 500ms. Don't forget to call .start()!",
          starterCode: "import React, { useEffect, useRef } from 'react';\nimport { Animated, Text, View } from 'react-native';\n\nexport default function FadeInView() {\n  // 1. Initial value is 0 (invisible)\n  const fadeAnim = useRef(new Animated.Value(0)).current;\n\n  useEffect(() => {\n    // 2. Animate the value to 1 (fully visible)\n    Animated.timing(fadeAnim, {\n      toValue: 1,\n      duration: 500,\n      useNativeDriver: true, // Optimizes performance\n    }).start(); // 3. MUST call start()!\n  }, [fadeAnim]);\n\n  return (\n    // Notice we use Animated.View instead of a regular View\n    <Animated.View style={{ flex: 1, opacity: fadeAnim, justifyContent: 'center', alignItems: 'center' }}>\n      <Text style={{ fontSize: 24 }}>I fade in smoothly!</Text>\n    </Animated.View>\n  );\n}"
        },
        type: "javascript"
      }
    ]
  },
  RU: {
    title: "Mobile UI/UX (MUST)",
    description: "iOS HIG, Material Design, жесты и анимации. Узнайте, как создавать приложения, которые выглядят и ощущаются как нативные.",
    lessons: [
      {
        id: "uiux-guidelines",
        title: "Гайдлайны платформ: HIG vs Material",
        theory: {
          sections: [
            { type: "heading", content: "Два разных мира" },
            { type: "text", content: "Пользователи iOS и Android имеют совершенно разные привычки. Если вы сделаете приложение, которое на Android выглядит точь-в-точь как на iPhone, пользователям Android оно покажется 'чужим' или 'сломанным'." },
            { type: "list", items: [
              "Apple HIG (Human Interface Guidelines): Фокус на глубине (размытие фона, полупрозрачность), плоских иконках без теней и нижней панели (Bottom Tab Bar) для главной навигации. Системный шрифт — San Francisco.",
              "Material Design (Google): Метафора 'чернил и бумаги'. Активно использует тени (elevation) для показа иерархии элементов. Традиционно любит плавающую круглую кнопку (FAB - Floating Action Button) в правом нижнем углу и яркие цвета."
            ]},
            { type: "heading", content: "Специфичный для платформы код" },
            { type: "text", content: "В React Native есть API `Platform.OS`. С его помощью вы можете рендерить немного разные компоненты или стили в зависимости от того, на какой ОС открыто приложение." },
            { type: "tip", content: "Ресурс: Mobbin. Это абсолютный чит-код для мобильных разработчиков и дизайнеров. Mobbin — это галерея сотен тысяч скриншотов из лучших приложений мира (Uber, Spotify, Airbnb). Прежде чем верстать экран профиля, зайдите на Mobbin и посмотрите, как это сделали лидеры индустрии." }
          ]
        },
        practice: {
          title: "Платформозависимая Кнопка",
          description: "Адаптируйте UI под операционную систему.",
          task: "Используйте модуль `Platform` из 'react-native'. Настройте цвет кнопки: если Platform.OS равен 'ios', сделайте её синей (#007AFF), а если 'android' — зеленой в стиле Material (#4CAF50).",
          starterCode: "import React from 'react';\nimport { View, Text, StyleSheet, Platform } from 'react-native';\n\nexport default function AdaptiveButton() {\n  // 1. Проверьте платформу и задайте цвет\n  const buttonColor = Platform.OS === 'ios' ? '???' : '???';\n\n  return (\n    <View style={styles.container}>\n      <View style={[styles.button, { backgroundColor: buttonColor }]}>\n        <Text style={styles.text}>Нажми меня</Text>\n      </View>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },\n  button: { padding: 15, borderRadius: 8 },\n  text: { color: 'white', fontWeight: 'bold' }\n});"
        },
        type: "javascript"
      },
      {
        id: "uiux-touch-targets",
        title: "Зона большого пальца и Touch Targets",
        theory: {
          sections: [
            { type: "heading", content: "Дизайн для пальцев" },
            { type: "text", content: "Большинство людей держат телефон одной рукой и управляют им большим пальцем. Нижняя часть экрана (по центру) — это 'Комфортная зона'. Левый верхний угол — это 'Зона боли', до которой тяжело дотянуться." },
            { type: "text", content: "Золотое правило: Частые и главные действия (кнопка 'Купить', навигация) помещайте ВНИЗУ. Редкие или деструктивные действия ('Настройки', 'Удалить профиль') прячьте НАВЕРХУ." },
            { type: "heading", content: "Минимальный размер кликабельной зоны" },
            { type: "text", content: "Человеческий палец — это не точный курсор мышки. Если ваши кнопки слишком маленькие, пользователи будут промахиваться и раздражаться." },
            { type: "list", items: [
              "Apple HIG строго требует минимальный размер зоны клика 44x44 поинта (вас могут отклонить в App Store за мелкие кнопки!).",
              "Material Design рекомендует минимум 48x48 dp."
            ]},
            { type: "text", content: "Если визуально иконка 'крестика' должна быть маленькой (например, 20x20), вы ОБЯЗАНЫ расширить её невидимую зону клика с помощью паддингов или свойства `hitSlop` в React Native." }
          ]
        },
        practice: {
          title: "Исправляем мелкую кнопку",
          description: "Используйте hitSlop для расширения зоны клика.",
          task: "У нас есть крошечная кнопка 'Х' (Закрыть) размером 20x20. По ней сложно попасть. Добавьте пропс `hitSlop` компоненту TouchableOpacity, чтобы расширить невидимую зону клика на 20 поинтов во все стороны (top, bottom, left, right).",
          starterCode: "import React from 'react';\nimport { View, Text, TouchableOpacity, StyleSheet } from 'react-native';\n\nexport default function CloseButton() {\n  return (\n    <View style={styles.container}>\n      {/* 1. Добавьте пропс hitSlop к TouchableOpacity */}\n      <TouchableOpacity \n        style={styles.tinyButton} \n        onPress={() => console.log('Закрыто!')}\n        \n      >\n        <Text style={styles.text}>X</Text>\n      </TouchableOpacity>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },\n  tinyButton: { width: 20, height: 20, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center' },\n  text: { color: 'white', fontSize: 12 }\n});"
        },
        type: "javascript"
      },
      {
        id: "uiux-spacing-typography",
        title: "Сетка 8pt и Типографика",
        theory: {
          sections: [
            { type: "heading", content: "Система 8-пиксельной сетки (8pt Grid)" },
            { type: "text", content: "Хороший дизайн выглядит аккуратно. Почему? Потому что дизайнеры используют математику. Стандарт индустрии — Сетка 8pt. Это значит, что все отступы (margin, padding) и размеры компонентов должны быть кратны 8 (8, 16, 24, 32, 40, 48)." },
            { type: "text", content: "Почему 8? Экраны смартфонов масштабируются кратно двум (x2, x3). Отступ в 8pt будет идеально четко отрисован пиксель в пиксель на экранах Retina без 'мыла'." },
            { type: "heading", content: "Мобильная Типографика" },
            { type: "text", content: "Читать текст на улице под солнцем — сложно. Обеспечьте высокий контраст (темно-серый текст на белом фоне, а не светло-серый). Базовый размер текста для чтения (Body) должен быть 16pt. Никогда не делайте текст меньше 12pt." },
            { type: "tip", content: "Ресурс: Material Design Type System. Документация Google дает вам готовую, идеальную шкалу размеров шрифтов и высоты строк (line-height) для заголовков H1-H6. Не изобретайте велосипед, скопируйте их пропорции." }
          ]
        },
        practice: {
          title: "Выравнивание по сетке",
          description: "Исправьте хаос в отступах.",
          task: "В текущих стилях используются 'грязные' случайные числа (13, 27). Исправьте объект styles: измените padding, marginBottom и borderRadius так, чтобы они строго подчинялись правилу 8pt (используйте 16 или 24 вместо 13 и 27).",
          starterCode: "import React from 'react';\nimport { View, Text, StyleSheet } from 'react-native';\n\nexport default function Card() {\n  return (\n    <View style={styles.card}>\n      <Text style={styles.title}>Товар Года</Text>\n      <Text style={styles.body}>Описание этого прекрасного товара.</Text>\n    </View>\n  );\n}\n\n// 1. Измените цифры, чтобы они были кратны 8!\nconst styles = StyleSheet.create({\n  card: {\n    backgroundColor: '#fff',\n    padding: 13,        // ИЗМЕНИТЬ\n    marginBottom: 27,   // ИЗМЕНИТЬ\n    borderRadius: 10,   // ИЗМЕНИТЬ (сделайте 8 или 16)\n  },\n  title: {\n    fontSize: 24,       // Это кратно 8 (Хорошо!)\n    marginBottom: 11,   // ИЗМЕНИТЬ\n  },\n  body: {\n    fontSize: 16,\n  }\n});"
        },
        type: "javascript"
      },
      {
        id: "uiux-gestures",
        title: "Управление Жестами",
        theory: {
          sections: [
            { type: "heading", content: "Не просто 'Клик'" },
            { type: "text", content: "На компьютере вы 'кликаете'. На телефоне вы свайпаете, щипаете, делаете долгие нажатия (long press) и перетаскиваете элементы. Мобильное приложение обязано реагировать на физику пальцев." },
            { type: "text", content: "Например, свайп вправо от левого края экрана должен возвращать 'Назад'. А долгое удержание пальца на сообщении (Long Press) должно открывать контекстное меню (как в Telegram)." },
            { type: "heading", content: "React Native Gesture Handler" },
            { type: "text", content: "Хотя в RN есть встроенные обработчики касаний (onLongPress у TouchableOpacity), сложные жесты (например, свайп ячейки влево для её удаления) требуют специализированной библиотеки. Стандарт комьюнити — 'react-native-gesture-handler'. Она обрабатывает жесты прямо в нативном потоке, поэтому они не 'лагают', даже если JavaScript загружен вычислениями." }
          ]
        },
        practice: {
          title: "Долгое нажатие (Long Press)",
          description: "Используйте базовые события касаний.",
          task: "Добавьте пропс 'onLongPress' компоненту TouchableOpacity. Когда пользователь нажмет и задержит палец на сообщении, должна выполниться функция (например, console.log), имитирующая открытие контекстного меню.",
          starterCode: "import React from 'react';\nimport { View, Text, TouchableOpacity, StyleSheet } from 'react-native';\n\nexport default function MessageItem() {\n  return (\n    <View style={styles.container}>\n      {/* 1. Добавьте onLongPress для обработки долгого удержания */}\n      <TouchableOpacity \n        style={styles.messageBubble}\n        onPress={() => console.log('Обычный клик')}\n        \n      >\n        <Text style={styles.text}>Привет, как дела?</Text>\n      </TouchableOpacity>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { flex: 1, padding: 20 },\n  messageBubble: { padding: 16, backgroundColor: '#E5E5EA', borderRadius: 16 },\n  text: { fontSize: 16 }\n});"
        },
        type: "javascript"
      },
      {
        id: "uiux-animations",
        title: "Микро-взаимодействия и Анимации",
        theory: {
          sections: [
            { type: "heading", content: "Анимации — это не просто 'Красиво'" },
            { type: "text", content: "В мобильном UX анимации выполняют функциональную роль. Они дают Контекст. Если элемент просто мгновенно исчезнет с экрана, мозг пользователя запутается ('Куда оно делось?'). Если элемент плавно уедет за левый край экрана, пользователь поймет, что он был 'удален' или 'отброшен'." },
            { type: "heading", content: "Микро-взаимодействия (Micro-interactions)" },
            { type: "text", content: "Это крошечные визуальные отклики. Как сердечко 'Лайка' в X (Twitter), которое слегка надувается и пружинит при нажатии. Это подтверждает пользователю, что система зарегистрировала его действие." },
            { type: "heading", content: "Animated API" },
            { type: "text", content: "В React Native встроен мощный API 'Animated'. Вы привязываете анимированные значения (например, от 0 до 1) к стилям компонента (например, opacity). Для хардкорных анимаций в 120 FPS используют библиотеку 'Reanimated', но встроенного Animated хватает для 90% задач плавного появления (Fade in) или масштабирования." },
            { type: "tip", content: "Правило: Анимации должны быть быстрыми. Переход в UI должен занимать от 200 до 300 миллисекунд. Любая анимация длиннее полсекунды кажется 'тормозной' и раздражает пользователя, заставляя его ждать." }
          ]
        },
        practice: {
          title: "Анимация Fade-In",
          description: "Создайте простую анимацию прозрачности.",
          task: "Используйте встроенный API Animated. Мы создали значение 'fadeAnim', равное 0 (полностью прозрачный). Вызовите Animated.timing() внутри useEffect, чтобы изменить это значение до 1 за 500мс. Не забудьте вызвать .start() в конце, иначе анимация не запустится!",
          starterCode: "import React, { useEffect, useRef } from 'react';\nimport { Animated, Text, View } from 'react-native';\n\nexport default function FadeInView() {\n  // 1. Стартовое значение 0 (невидимый)\n  const fadeAnim = useRef(new Animated.Value(0)).current;\n\n  useEffect(() => {\n    // 2. Анимируем значение до 1 (полная видимость)\n    Animated.timing(fadeAnim, {\n      toValue: 1,\n      duration: 500,\n      useNativeDriver: true, // Оптимизирует производительность\n    }).start(); // 3. ОБЯЗАТЕЛЬНО вызовите start()!\n  }, [fadeAnim]);\n\n  return (\n    // Заметьте, мы используем Animated.View вместо обычного View\n    <Animated.View style={{ flex: 1, opacity: fadeAnim, justifyContent: 'center', alignItems: 'center' }}>\n      <Text style={{ fontSize: 24 }}>Я плавно появляюсь!</Text>\n    </Animated.View>\n  );\n}"
        },
        type: "javascript"
      }
    ]
  }
};