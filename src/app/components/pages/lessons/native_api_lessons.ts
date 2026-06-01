export const nativeApiState: Record<'EN' | 'RU', any> = {
  EN: {
    title: "Native API (CORE)",
    description: "Camera, GPS, push notifications, and biometrics. Make your app interact with the physical device.",
    lessons: [
      {
        id: "native-permissions",
        title: "The Golden Rule: Permissions",
        theory: {
          sections: [
            { type: "heading", content: "Don't Assume, Always Ask" },
            { type: "text", content: "Before you can use the Camera, GPS, or send Push Notifications, you MUST explicitly ask the user for permission. If you try to access the GPS without asking, iOS/Android will instantly crash your app for security reasons." },
            { type: "text", content: "Permissions have states: 'granted', 'denied', or 'undetermined' (not asked yet). A good developer always checks the state first." },
            { type: "heading", content: "UX Best Practices" },
            { type: "text", content: "Never ask for permissions right when the app opens. Users will instinctively hit 'Deny' because they don't trust you yet. Instead, explain WHY you need it first. For example, show a screen saying 'We need your location to find nearby drivers', and only trigger the OS prompt when they click 'Got it'." },
            { type: "code", content: "import * as Location from 'expo-location';\n\nconst { status } = await Location.requestForegroundPermissionsAsync();\nif (status !== 'granted') {\n  alert('Permission to access location was denied');\n  return;\n}" }
          ]
        },
        practice: {
          title: "Request GPS Permission",
          description: "Write a function to handle user permission.",
          task: "Complete the function requestGPS(). Call the Expo Location API to request permission. Check the 'status' property of the returned object. If it is 'granted', print 'GPS Access Granted', otherwise print 'GPS Access Denied'.",
          starterCode: "import * as Location from 'expo-location';\n\nasync function requestGPS() {\n  // 1. Request foreground permissions\n  const response = \n  \n  // 2. Check the status\n  if (response.status === 'granted') {\n    console.log(\"GPS Access Granted\");\n  } else {\n    console.log(\"GPS Access Denied\");\n  }\n}"
        },
        type: "javascript"
      },
      {
        id: "native-location-maps",
        title: "Geolocation and Maps",
        theory: {
          sections: [
            { type: "heading", content: "Getting the Coordinates" },
            { type: "text", content: "Once you have permission, getting the user's location returns a 'latitude' and 'longitude'. This is just math. You can use `getCurrentPositionAsync` (for a one-time check) or `watchPositionAsync` (to constantly track them while moving)." },
            { type: "heading", content: "Rendering Maps (react-native-maps)" },
            { type: "text", content: "To show a map, we use the community standard library `react-native-maps`. Under the hood, it renders Google Maps on Android and Apple Maps on iOS natively. It does NOT use a web browser frame, making it buttery smooth." },
            { type: "code", content: "import MapView, { Marker } from 'react-native-maps';\n\n<MapView style={{ flex: 1 }} initialRegion={{ latitude: 37.78, longitude: -122.4, latitudeDelta: 0.09, longitudeDelta: 0.04 }}>\n  <Marker coordinate={{ latitude: 37.78, longitude: -122.4 }} title=\"My Location\" />\n</MapView>" },
            { type: "tip", content: "Resource: RN Maps. The documentation for `react-native-maps` on GitHub is essential. Pay special attention to the 'Delta' properties in the Region object—they control the 'zoom level' of the map." }
          ]
        },
        practice: {
          title: "Place a Map Marker",
          description: "Configure the MapView component.",
          task: "This is a conceptual task. Look at the MapView syntax. We have a MapView component. Add a <Marker> component inside it, and set its 'coordinate' prop to match the initialRegion of the map (latitude: 51.5, longitude: -0.12).",
          starterCode: "import React from 'react';\nimport { View, StyleSheet } from 'react-native';\nimport MapView, { Marker } from 'react-native-maps';\n\nexport default function App() {\n  return (\n    <View style={styles.container}>\n      <MapView \n        style={styles.map} \n        initialRegion={{ latitude: 51.5, longitude: -0.12, latitudeDelta: 0.05, longitudeDelta: 0.05 }}\n      >\n        {/* Add the <Marker> here with the coordinate prop */}\n        \n        \n      </MapView>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { flex: 1 },\n  map: { flex: 1 }\n});"
        },
        type: "javascript"
      },
      {
        id: "native-camera",
        title: "Camera and Image Picker",
        theory: {
          sections: [
            { type: "heading", content: "Two approaches to photos" },
            { type: "text", content: "When you want a user to upload a profile picture, you have two options in React Native:" },
            { type: "list", items: [
              "ImagePicker: The easiest way. It opens the phone's native Gallery or native Camera app. The OS handles all the UI, and simply returns the image URI (path) back to your app.",
              "Expo Camera: You embed a live camera viewfinder directly inside your app's UI (like Snapchat or Instagram). You build your own custom 'Capture' button and UI over the live feed."
            ]},
            { type: "heading", content: "Using Expo ImagePicker" },
            { type: "text", content: "Usually, `expo-image-picker` is all you need for 90% of apps. It allows you to let the user crop the image before it returns the data." },
            { type: "code", content: "let result = await ImagePicker.launchImageLibraryAsync({\n  mediaTypes: ImagePicker.MediaTypeOptions.Images,\n  allowsEditing: true,\n  aspect: [4, 3],\n  quality: 1,\n});\n\nif (!result.canceled) {\n  setImage(result.assets[0].uri);\n}" }
          ]
        },
        practice: {
          title: "Select an Image",
          description: "Use ImagePicker to get a photo URI.",
          task: "Complete the pickImage function. Call ImagePicker.launchImageLibraryAsync(). Then check if the result was NOT canceled (!result.canceled). If so, extract the image URI from result.assets[0].uri and console.log it.",
          starterCode: "import * as ImagePicker from 'expo-image-picker';\n\nasync function pickImage() {\n  // 1. Launch the image library\n  let result = \n\n  // 2. Check if user didn't cancel\n  if (  ) {\n    // 3. Extract the URI\n    const imageUri = \n    console.log(\"Selected image path:\", imageUri);\n  }\n}"
        },
        type: "javascript"
      },
      {
        id: "native-push-notifications",
        title: "Push Notifications (The Architecture)",
        theory: {
          sections: [
            { type: "heading", content: "How Push Notifications Actually Work" },
            { type: "text", content: "Push notifications are the hardest part of mobile dev because they involve 3 different servers: Your Backend, the Apple/Google Push Servers (APNs/FCM), and the Phone." },
            { type: "list", items: [
              "1. Token Generation: Your app asks Apple/Google for a unique Push Token (e.g., 'ExponentPushToken[xyz...]') specifically for this device.",
              "2. Storage: Your app sends this Token to YOUR Backend, which saves it in the database next to the User ID.",
              "3. The Push: When your Backend wants to send a message, it sends the Token and the Message to the Expo Push API.",
              "4. Delivery: Expo talks to Apple/Google, and Apple/Google wakes up the user's phone to display the banner!"
            ]},
            { type: "heading", content: "Expo Notifications" },
            { type: "text", content: "Expo simplifies this massive headache. Instead of managing separate certificates for Apple and Google, you just get an ExpoPushToken, send it to your backend, and your backend makes a simple POST request to `https://exp.host/--/api/v2/push/send`." },
            { type: "tip", content: "Resource: Expo Notifications Docs. The official guide gives you the exact code to request the token and configure the notification handler (how the app behaves if it receives a push while the user is actively using the app)." }
          ]
        },
        practice: {
          title: "Get the Push Token",
          description: "Retrieve the unique device token.",
          task: "Write the code to get the Expo Push Token. Call Notifications.getExpoPushTokenAsync(). It returns an object with a 'data' property. Print this data property, as this is the string you would send to your backend.",
          starterCode: "import * as Notifications from 'expo-notifications';\n\nasync function registerForPush() {\n  // Assume permissions are already granted\n  \n  // 1. Get the Expo Push Token object\n  const tokenData = \n  \n  // 2. Extract the actual string token\n  const tokenString = tokenData.data;\n  \n  console.log(\"Send this to backend:\", tokenString);\n}"
        },
        type: "javascript"
      },
      {
        id: "native-biometrics",
        title: "Biometrics & Secure Storage",
        theory: {
          sections: [
            { type: "heading", content: "FaceID and TouchID" },
            { type: "text", content: "Typing a password every time you open a banking app is annoying. We use `expo-local-authentication` to trigger the native FaceID (iOS) or Fingerprint (Android) prompt." },
            { type: "text", content: "Biometrics don't give you the user's password. They simply return a `true/false` boolean if the biometric check was successful." },
            { type: "heading", content: "Secure Storage" },
            { type: "text", content: "If biometrics just return True/False, how does the app log the user in? You use Secure Storage (Keychain on iOS, Keystore on Android). When the user logs in with a password the first time, you save their JWT token in `expo-secure-store`. This storage is heavily encrypted by the OS hardware." },
            { type: "text", content: "Next time the app opens: 1) Ask for FaceID. 2) If True, read the JWT from Secure Storage. 3) Send JWT to backend. Boom, seamless login!" },
            { type: "code", content: "import * as LocalAuthentication from 'expo-local-authentication';\n\nconst result = await LocalAuthentication.authenticateAsync({\n  promptMessage: 'Login to your bank',\n});\nif (result.success) { /* Read secure token and login */ }" }
          ]
        },
        practice: {
          title: "Trigger FaceID",
          description: "Use the LocalAuthentication API.",
          task: "Call LocalAuthentication.authenticateAsync(). Pass an object with `promptMessage: 'Unlock App'`. Check if the returned object has `success === true`.",
          starterCode: "import * as LocalAuthentication from 'expo-local-authentication';\n\nasync function biometricLogin() {\n  // 1. Trigger the FaceID / TouchID prompt\n  const result = \n  \n  // 2. Check if the user successfully authenticated\n  if (  ) {\n    console.log(\"Authentication successful! Reading secure token...\");\n  } else {\n    console.log(\"Authentication failed or canceled.\");\n  }\n}"
        },
        type: "javascript"
      }
    ]
  },
  RU: {
    title: "Нативные API (CORE)",
    description: "Камера, GPS, push-уведомления и биометрия. Научитесь взаимодействовать с 'железом' мобильного устройства.",
    lessons: [
      {
        id: "native-permissions",
        title: "Золотое правило: Права доступа (Permissions)",
        theory: {
          sections: [
            { type: "heading", content: "Не предполагайте, всегда спрашивайте" },
            { type: "text", content: "Прежде чем использовать Камеру, GPS или отправлять Push-уведомления, вы ОБЯЗАНЫ явно запросить у пользователя разрешение. Если ваш код попытается прочитать GPS-координаты без спроса, операционная система (iOS/Android) мгновенно 'убьет' (crash) ваше приложение в целях безопасности." },
            { type: "text", content: "Разрешения имеют статусы: 'granted' (разрешено), 'denied' (запрещено) или 'undetermined' (еще не спрашивали). Хороший разработчик всегда сначала проверяет этот статус." },
            { type: "heading", content: "UX-практики для Permissions" },
            { type: "text", content: "Никогда не запрашивайте доступ к геолокации прямо при старте приложения. Пользователь инстинктивно нажмет 'Запретить', потому что он вам еще не доверяет. Вместо этого, сначала покажите свой красивый экран: 'Нам нужна ваша локация, чтобы найти ближайших водителей', и только когда юзер нажмет 'Понятно', вызывайте системный prompt ОС." },
            { type: "code", content: "import * as Location from 'expo-location';\n\nconst { status } = await Location.requestForegroundPermissionsAsync();\nif (status !== 'granted') {\n  alert('Доступ к геолокации запрещен!');\n  return;\n}" }
          ]
        },
        practice: {
          title: "Запроси доступ к GPS",
          description: "Напишите функцию обработки разрешений.",
          task: "Допишите функцию requestGPS(). Вызовите метод API Expo `Location.requestForegroundPermissionsAsync()`. Проверьте свойство 'status' возвращаемого объекта. Если оно равно 'granted', выведите 'Доступ разрешен', иначе 'Доступ запрещен'.",
          starterCode: "import * as Location from 'expo-location';\n\nasync function requestGPS() {\n  // 1. Запрашиваем права на использование геопозиции\n  const response = \n  \n  // 2. Проверяем статус\n  if (response.status === 'granted') {\n    console.log(\"Доступ к GPS разрешен\");\n  } else {\n    console.log(\"Доступ к GPS запрещен\");\n  }\n}"
        },
        type: "javascript"
      },
      {
        id: "native-location-maps",
        title: "Геолокация и Карты (Maps)",
        theory: {
          sections: [
            { type: "heading", content: "Получение координат" },
            { type: "text", content: "Получив разрешение, извлечение локации пользователя вернет вам 'latitude' (широту) и 'longitude' (долготу). Вы можете использовать `getCurrentPositionAsync` (для единоразовой проверки, например, при отправке адреса доставки) или `watchPositionAsync` (для постоянного отслеживания перемещения, как в навигаторе)." },
            { type: "heading", content: "Рендеринг Карт (react-native-maps)" },
            { type: "text", content: "Для отображения карты используется стандартная библиотека сообщества `react-native-maps`. Под капотом она нативно рендерит Google Maps на Android и Apple Maps на iOS. Она НЕ использует медленный браузерный фрейм (WebView), поэтому работает невероятно плавно (60 FPS)." },
            { type: "code", content: "import MapView, { Marker } from 'react-native-maps';\n\n<MapView style={{ flex: 1 }} initialRegion={{ latitude: 37.78, longitude: -122.4, latitudeDelta: 0.09, longitudeDelta: 0.04 }}>\n  <Marker coordinate={{ latitude: 37.78, longitude: -122.4 }} title=\"Я здесь!\" />\n</MapView>" },
            { type: "tip", content: "Ресурс: RN Maps. Документация `react-native-maps` на GitHub — это ваша библия. Обратите особое внимание на свойства 'Delta' в объекте Region — именно они управляют масштабом (зумом) карты." }
          ]
        },
        practice: {
          title: "Поставь Маркер на Карту",
          description: "Настройте компонент MapView.",
          task: "Это концептуальная задача. Посмотрите на синтаксис MapView. Добавьте компонент <Marker> внутрь <MapView>. Установите его пропс 'coordinate' так, чтобы он совпадал с центром карты (latitude: 51.5, longitude: -0.12).",
          starterCode: "import React from 'react';\nimport { View, StyleSheet } from 'react-native';\nimport MapView, { Marker } from 'react-native-maps';\n\nexport default function App() {\n  return (\n    <View style={styles.container}>\n      <MapView \n        style={styles.map} \n        initialRegion={{ latitude: 51.5, longitude: -0.12, latitudeDelta: 0.05, longitudeDelta: 0.05 }}\n      >\n        {/* Добавьте <Marker> сюда с пропсом coordinate */}\n        \n        \n      </MapView>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: { flex: 1 },\n  map: { flex: 1 }\n});"
        },
        type: "javascript"
      },
      {
        id: "native-camera",
        title: "Работа с Камерой и Галереей",
        theory: {
          sections: [
            { type: "heading", content: "Два подхода к фото" },
            { type: "text", content: "Если вы хотите, чтобы пользователь загрузил аватарку, у вас есть два пути в React Native:" },
            { type: "list", items: [
              "ImagePicker (Галерея): Самый простой путь. Он просто открывает нативную Галерею телефона или стандартное приложение Камеры. ОС сама рисует интерфейс съемки и просто возвращает вашему приложению локальный путь (URI) к готовой фотке.",
              "Expo Camera (Лайв-камера): Вы встраиваете видоискатель камеры (визуальный компонент) прямо внутрь вашего приложения (как в Snapchat или TikTok). Вы сами рисуете кнопку 'Снять' и интерфейс поверх видеопотока."
            ]},
            { type: "heading", content: "Использование Expo ImagePicker" },
            { type: "text", content: "Для 90% приложений достаточно библиотеки `expo-image-picker`. Она даже позволяет пользователю обрезать фото (кропнуть в квадрат) перед тем, как отдать его вам." },
            { type: "code", content: "let result = await ImagePicker.launchImageLibraryAsync({\n  mediaTypes: ImagePicker.MediaTypeOptions.Images,\n  allowsEditing: true,\n  aspect: [1, 1], // Квадратная аватарка\n  quality: 0.8,\n});\n\nif (!result.canceled) {\n  setImage(result.assets[0].uri);\n}" }
          ]
        },
        practice: {
          title: "Выбор фотографии",
          description: "Используйте ImagePicker для получения URI файла.",
          task: "Допишите функцию pickImage. Вызовите метод `ImagePicker.launchImageLibraryAsync()`. Затем проверьте, что пользователь НЕ отменил выбор (!result.canceled). Если фото выбрано, извлеките URI из массива `result.assets[0].uri` и выведите в консоль.",
          starterCode: "import * as ImagePicker from 'expo-image-picker';\n\nasync function pickImage() {\n  // 1. Открываем системную галерею\n  let result = \n\n  // 2. Проверяем, что юзер не нажал 'Отмена'\n  if (  ) {\n    // 3. Извлекаем путь (URI) к файлу\n    const imageUri = \n    console.log(\"Путь к выбранному фото:\", imageUri);\n  }\n}"
        },
        type: "javascript"
      },
      {
        id: "native-push-notifications",
        title: "Push-Уведомления (Архитектура)",
        theory: {
          sections: [
            { type: "heading", content: "Как Пуши работают на самом деле" },
            { type: "text", content: "Push-уведомления — это самая сложная часть мобильной разработки, потому что в ней участвуют 3 разных сервера: Ваш Бэкенд, Серверы Apple/Google (APNs/FCM) и сам Телефон пользователя." },
            { type: "list", items: [
              "1. Генерация Токена: Ваше приложение просит у Apple/Google уникальный 'Push Token' (строку) конкретно для этого устройства.",
              "2. Хранение: Приложение отправляет этот Токен на ВАШ Бэкенд, который сохраняет его в БД рядом с ID пользователя.",
              "3. Отправка (Push): Когда Бэкенд решает, что пора прислать пуш, он отправляет этот Токен и текст сообщения в API Expo.",
              "4. Доставка: Expo передает пуш в Apple/Google, а те 'будят' телефон пользователя и показывают баннер!"
            ]},
            { type: "heading", content: "Магия Expo Notifications" },
            { type: "text", content: "Expo упрощает эту головную боль. Вместо возни с сертификатами и ключами отдельно для Apple и Google, вы просто получаете `ExpoPushToken`, сохраняете его на своем бэкенде, и бэкенд делает обычный HTTP POST запрос на `https://exp.host/--/api/v2/push/send`." },
            { type: "tip", content: "Ресурс: Expo Notifications Docs. В официальном гайде дан готовый кусок кода для запроса прав, генерации токена и настройки обработчика (как приложение должно реагировать, если пуш пришел, пока юзер сидит внутри приложения)." }
          ]
        },
        practice: {
          title: "Получение Push-Токена",
          description: "Извлеките уникальный токен устройства.",
          task: "Напишите код для получения Expo Push Токена. Вызовите `Notifications.getExpoPushTokenAsync()`. Функция возвращает объект, внутри которого есть свойство 'data'. Выведите это свойство — именно эту строку вы должны отправить на свой бэкенд.",
          starterCode: "import * as Notifications from 'expo-notifications';\n\nasync function registerForPush() {\n  // Представим, что права уже получены\n  \n  // 1. Получаем объект токена от Expo\n  const tokenData = \n  \n  // 2. Извлекаем саму строку токена\n  const tokenString = tokenData.data;\n  \n  console.log(\"Отправьте это на бэкенд:\", tokenString);\n}"
        },
        type: "javascript"
      },
      {
        id: "native-biometrics",
        title: "Биометрия и Безопасное хранение",
        theory: {
          sections: [
            { type: "heading", content: "FaceID и TouchID" },
            { type: "text", content: "Вводить пароль каждый раз при входе в банковское приложение — это пытка. Мы используем библиотеку `expo-local-authentication`, чтобы вызвать нативное системное окно FaceID (на iOS) или Отпечатка пальца (на Android)." },
            { type: "text", content: "ВАЖНО: Биометрия не дает вам пароль пользователя! Она просто возвращает `true` (лицо распознано) или `false` (ошибка)." },
            { type: "heading", content: "Secure Storage (Безопасное Хранилище)" },
            { type: "text", content: "Если биометрия просто говорит True/False, как тогда приложение логинит пользователя? Ответ: Secure Storage (Keychain в iOS, Keystore в Android). " },
            { type: "text", content: "Когда пользователь вводит пароль в ПЕРВЫЙ раз, вы получаете от бэкенда JWT токен и сохраняете его в `expo-secure-store`. Это хранилище жестко зашифровано на аппаратном уровне ОС. В следующий раз: 1) Вы запрашиваете FaceID. 2) Если ответ True, вы читаете JWT из защищенного хранилища. 3) Отправляете JWT на бэкенд. Авторизация пройдена!" },
            { type: "code", content: "import * as LocalAuthentication from 'expo-local-authentication';\n\nconst result = await LocalAuthentication.authenticateAsync({\n  promptMessage: 'Войдите в банк',\n});\nif (result.success) { /* Читаем JWT и логинимся */ }" }
          ]
        },
        practice: {
          title: "Вызов FaceID",
          description: "Используйте API локальной аутентификации.",
          task: "Вызовите метод `LocalAuthentication.authenticateAsync()`. Передайте ему объект с настройкой `promptMessage: 'Разблокировать приложение'`. Затем проверьте, содержит ли ответ свойство `success === true`.",
          starterCode: "import * as LocalAuthentication from 'expo-local-authentication';\n\nasync function biometricLogin() {\n  // 1. Вызываем системное окно FaceID / Отпечатка\n  const result = \n  \n  // 2. Проверяем успешность аутентификации\n  if (  ) {\n    console.log(\"Успех! Читаем зашифрованный токен...\");\n  } else {\n    console.log(\"Лицо не распознано или отмена.\");\n  }\n}"
        },
        type: "javascript"
      }
    ]
  }
};