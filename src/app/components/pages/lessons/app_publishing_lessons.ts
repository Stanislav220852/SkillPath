export const appPublishingState: Record<'EN' | 'RU', any> = {
  EN: {
    title: "App Store Publishing (PRO)",
    description: "Building, signing, and submitting to the App Store and Google Play using EAS Build.",
    lessons: [
      {
        id: "pub-accounts",
        title: "The Bureaucracy: Developer Accounts",
        theory: {
          sections: [
            { type: "heading", content: "Gatekeepers of the Mobile World" },
            { type: "text", content: "Unlike the web, you cannot just host a mobile app on a server and share a link (especially on iOS). You must go through the official stores, and they charge for entry." },
            { type: "list", items: [
              "Apple Developer Program: Costs $99 per year. Extremely strict review process. They require identity verification, and if you are a company, a D-U-N-S number (a global business identifier).",
              "Google Play Console: Costs a one-time fee of $25. The review process is heavily automated but getting stricter regarding privacy policies and background location."
            ]},
            { type: "heading", content: "The Review Process" },
            { type: "text", content: "When you submit an app, humans (and bots) test it. If your app crashes, has a blank screen, or asks for Camera permissions without a good reason, it will be Rejected. Apple's App Store Review Guidelines are the law." },
            { type: "tip", content: "Resource: Apple Developer & Google Play Console docs. Always read the 'App Store Review Guidelines' before building features like payments. For example, if you sell digital goods (like a premium subscription), you MUST use Apple/Google In-App Purchases (they take a 15-30% cut), or you will be banned." }
          ]
        },
        practice: {
          title: "App Identifiers",
          description: "Understand globally unique IDs.",
          task: "Every app in the world needs a unique identifier (Bundle ID for iOS, Package Name for Android). It uses reverse-domain notation. If your website is 'mycompany.com' and the app is 'SuperApp', write the correct Bundle ID.",
          starterCode: "// Task: Define the Bundle ID (Reverse-domain notation)\n// Company website: mycompany.com\n// App name: SuperApp\n\nconst bundleIdentifier = \"\";\n\nconsole.log(\"Your global app ID:\", bundleIdentifier);"
        },
        type: "javascript"
      },
      {
        id: "pub-app-json",
        title: "Configuration: app.json",
        theory: {
          sections: [
            { type: "heading", content: "The App's Passport" },
            { type: "text", content: "Before building, the compiler needs to know your app's metadata: its name, icon, splash screen, and permissions. In the Expo/React Native ecosystem, this is defined in the `app.json` (or app.config.js) file." },
            { type: "heading", content: "Versioning is Critical" },
            { type: "text", content: "Every time you upload an update to the stores, you must increment the version. There are two types of versions:" },
            { type: "list", items: [
              "Version (String): e.g., '1.0.0'. This is what the user sees in the App Store.",
              "Build Number (Integer): e.g., 1, 2, 3 (or 'versionCode' on Android). The stores track this. You cannot upload a build with the same or lower Build Number as a previous one!"
            ]},
            { type: "code", content: "{\n  \"expo\": {\n    \"name\": \"My Cool App\",\n    \"version\": \"1.0.0\",\n    \"ios\": {\n      \"bundleIdentifier\": \"com.company.coolapp\",\n      \"buildNumber\": \"1\"\n    }\n  }\n}" }
          ]
        },
        practice: {
          title: "Configure app.json",
          description: "Set up iOS and Android identifiers.",
          task: "Complete the app.json configuration. Add the 'android' object with 'package' set to 'com.myapp.prod' and 'versionCode' set to 2. Under 'ios', set 'buildNumber' to '2'.",
          starterCode: "{\n  \"expo\": {\n    \"name\": \"My App\",\n    \"version\": \"1.0.1\",\n    \"ios\": {\n      \"bundleIdentifier\": \"com.myapp.prod\",\n      // 1. Add iOS build number\n      \n    },\n    // 2. Add Android configuration (package and versionCode)\n    \n    \n  }\n}"
        },
        type: "json"
      },
      {
        id: "pub-cryptography",
        title: "App Signing (Keystores & Certificates)",
        theory: {
          sections: [
            { type: "heading", content: "Proving Who You Are" },
            { type: "text", content: "You can't just upload an `.apk` or `.ipa` file to the store. It must be Cryptographically Signed. This proves that the app came from YOU and hasn't been injected with malware by a hacker." },
            { type: "heading", content: "Android: Keystore" },
            { type: "text", content: "Android uses a Keystore (`.keystore` or `.jks` file). It contains a private key secured by a password. If you lose this file, you CANNOT update your app on Google Play anymore. You'll have to publish a brand new app." },
            { type: "heading", content: "iOS: Provisioning Profiles" },
            { type: "text", content: "Apple's system is notoriously complex. You need:" },
            { type: "list", items: [
              "Certificate: Proves your identity as a developer.",
              "App ID: Registers the app in Apple's portal.",
              "Provisioning Profile: Ties the Certificate, the App ID, and a list of allowed test devices together."
            ]},
            { type: "text", content: "Historically, managing these certificates on a Mac caused massive headaches ('Code signing errors')." }
          ]
        },
        practice: {
          title: "Let EAS Handle It",
          description: "EAS Credentials management.",
          task: "Today, we don't manage keys manually. We use Expo Application Services (EAS). By running a simple CLI command, Expo connects to Apple/Google, generates the keys, and stores them securely in the cloud. Write the command 'eas credentials' below.",
          starterCode: "# Launch the interactive EAS Credentials manager\n# This tool handles iOS certificates and Android Keystores for you.\n\n"
        },
        type: "bash"
      },
      {
        id: "pub-eas-build",
        title: "Cloud Building: EAS Build",
        theory: {
          sections: [
            { type: "heading", content: "The Mac Problem" },
            { type: "text", content: "To compile an iOS app (into an `.ipa` file), Apple forces you to use XCode, which only runs on macOS. What if your development team uses Windows or Linux?" },
            { type: "heading", content: "EAS Build (Expo Application Services)" },
            { type: "text", content: "EAS Build solves this by moving the compilation to the Cloud. You type a command, your code is uploaded to Expo's servers, they spin up a Mac or Linux virtual machine, compile your app, sign it with your certificates, and give you a download link." },
            { type: "code", content: "eas build --platform ios --profile production" },
            { type: "heading", content: "eas.json Profiles" },
            { type: "text", content: "You define 'Build Profiles' in `eas.json`. For example, you might have a 'development' profile that builds an app for internal testing on simulators, and a 'production' profile that builds the final signed app for the App Store." },
            { type: "tip", content: "Resource: EAS Build Docs. Reading the 'eas.json' configuration guide is a must. You can configure it to auto-increment your build number on the server every time you trigger a build!" }
          ]
        },
        practice: {
          title: "Configure Build Profiles",
          description: "Write an eas.json file.",
          task: "Complete the `eas.json` file. Inside the 'build' object, create a 'production' profile. Set 'node' to '18' to ensure the cloud server uses the right Node.js version, and set 'channel' to 'production'.",
          starterCode: "{\n  \"build\": {\n    \"development\": {\n      \"developmentClient\": true,\n      \"distribution\": \"internal\"\n    },\n    // Add the 'production' profile here\n    \n    \n    \n  }\n}"
        },
        type: "json"
      },
      {
        id: "pub-eas-submit",
        title: "Automated Delivery: EAS Submit",
        theory: {
          sections: [
            { type: "heading", content: "Skipping the Web Portals" },
            { type: "text", content: "Normally, after getting your `.ipa` or `.aab` file, you have to open a web browser, log into App Store Connect or Google Play Console, click 'Upload', and wait 30 minutes for processing." },
            { type: "heading", content: "CI/CD for Mobile" },
            { type: "text", content: "EAS Submit allows you to send your app directly from the terminal to the stores. You configure your API keys (App Store Connect API Key and Google Play Service Account JSON) once, and then Expo talks to the stores for you." },
            { type: "code", content: "eas submit --platform all --latest" },
            { type: "text", content: "This command grabs the latest builds you generated with `eas build` and uploads them to TestFlight (Apple's beta testing platform) and Google Play Internal Testing." }
          ]
        },
        practice: {
          title: "Trigger the Submit",
          description: "Run the CLI command to submit your app.",
          task: "Write the command to submit only the 'ios' platform to the App Store, using the latest build from Expo servers.",
          starterCode: "# Send the compiled app directly to Apple TestFlight\n# Syntax: eas submit --platform [ios|android|all] --latest\n\n"
        },
        type: "bash"
      },
      {
        id: "pub-ota-updates",
        title: "Bypassing the Stores: OTA Updates",
        theory: {
          sections: [
            { type: "heading", content: "The App Store Bottleneck" },
            { type: "text", content: "You deploy your app. 100,000 users download it. You discover a typo on the home screen, or worse, a bug that crashes the app on login. In the native iOS/Android world, you have to fix the code, rebuild the app, upload it, wait 2-3 days for Apple to review it, and then HOPE users click 'Update' in the App Store." },
            { type: "heading", content: "Over-The-Air (OTA) Updates" },
            { type: "text", content: "Since React Native apps are essentially a native shell running a JavaScript bundle, we can update the JavaScript bundle WITHOUT touching the native shell!" },
            { type: "text", content: "Using EAS Update, you can push JS changes directly to your users' phones. The next time they open the app, it downloads the new JS bundle in the background and applies the fix instantly. No App Store review required!" },
            { type: "code", content: "eas update --branch production --message \"Fixed login crash\"" },
            { type: "tip", content: "Warning: Apple allows OTA updates ONLY for bug fixes and minor changes. If you use OTA updates to drastically change the app's purpose (e.g., turning a calculator into a gambling app), Apple will ban your developer account." }
          ]
        },
        practice: {
          title: "Push an Emergency Fix",
          description: "Deploy an OTA update.",
          task: "You fixed a critical bug in `App.js`. Use the EAS CLI to push an update to the 'production' branch with the message 'Hotfix'.",
          starterCode: "# Push a JavaScript update over-the-air to all users\n# Syntax: eas update --branch [branch_name] --message [msg]\n\n"
        },
        type: "bash"
      }
    ]
  },
  RU: {
    title: "App Store публикация (PRO)",
    description: "Сборка, подпись и автоматическая отправка в App Store и Google Play. Изучите экосистему EAS Build.",
    lessons: [
      {
        id: "pub-accounts",
        title: "Бюрократия: Аккаунты разработчика",
        theory: {
          sections: [
            { type: "heading", content: "Привратники мобильного мира" },
            { type: "text", content: "В отличие от веба, где можно просто загрузить файлы на сервер (Vercel) и поделиться ссылкой, в мобильном мире (особенно на iOS) вы обязаны проходить через официальные магазины. И за это берут деньги." },
            { type: "list", items: [
              "Apple Developer Program: Стоит $99 в ГОД. Очень жесткий процесс ревью. Требуют верификацию личности по паспорту, а если вы компания — нужен номер D-U-N-S (международный реестр юрлиц).",
              "Google Play Console: Разовый платеж $25. Модерация в основном автоматическая, но в последнее время правила стали жестче (особенно касательно приватности и использования фоновых локаций)."
            ]},
            { type: "heading", content: "Процесс Модерации (Review)" },
            { type: "text", content: "Когда вы отправляете приложение, его тестируют живые люди (и боты). Если приложение падает при старте (Crash), показывает пустой экран или запрашивает доступ к Контактам без объяснения причин — его отклонят (Reject)." },
            { type: "tip", content: "Ресурс: Apple Developer Docs. Обязательно прочитайте 'App Store Review Guidelines'. Например, золотое правило: если вы продаете цифровой контент (Premium подписку, виртуальные монеты), вы ОБЯЗАНЫ использовать In-App Purchases (оплату через Apple/Google, которые заберут комиссию 15-30%). Попытка прикрутить обычный Stripe приведет к бану." }
          ]
        },
        practice: {
          title: "Идентификаторы приложений",
          description: "Разберитесь в уникальных ID.",
          task: "У каждого приложения в мире должен быть уникальный идентификатор (Bundle ID в iOS, Package Name в Android). Он пишется в формате обратного домена (reverse-domain). Если сайт вашей компании 'mycompany.com', а приложение называется 'SuperApp', напишите правильный Bundle ID.",
          starterCode: "// Задача: Укажите Bundle ID (формат обратного домена)\n// Сайт компании: mycompany.com\n// Название приложения: SuperApp\n\nconst bundleIdentifier = \"\";\n\nconsole.log(\"Глобальный ID приложения:\", bundleIdentifier);"
        },
        type: "javascript"
      },
      {
        id: "pub-app-json",
        title: "Конфигурация: app.json",
        theory: {
          sections: [
            { type: "heading", content: "Паспорт вашего приложения" },
            { type: "text", content: "Перед началом сборки (компиляции), компилятору нужно знать метаданные: название, иконку, заставку (Splash screen) и требуемые разрешения. В экосистеме Expo/React Native за это отвечает файл `app.json` (или `app.config.js`)." },
            { type: "heading", content: "Версионирование" },
            { type: "text", content: "Каждый раз, загружая обновление в магазин, вы обязаны повышать версию. Существует два типа:" },
            { type: "list", items: [
              "Version (Строка): например '1.0.0' или '2.1'. Это то, что видят пользователи на странице App Store.",
              "Build Number (Целое число): например 1, 2, 3 (В Android называется versionCode). За этим следят сами магазины. Вы физически не сможете загрузить сборку с номером 2, если ранее уже загружали сборку с номером 2 или 3."
            ]},
            { type: "code", content: "{\n  \"expo\": {\n    \"name\": \"Мое Приложение\",\n    \"version\": \"1.0.0\",\n    \"ios\": {\n      \"bundleIdentifier\": \"com.company.coolapp\",\n      \"buildNumber\": \"1\"\n    }\n  }\n}" }
          ]
        },
        practice: {
          title: "Настройка app.json",
          description: "Сконфигурируйте iOS и Android метаданные.",
          task: "Допишите конфигурацию app.json. Добавьте объект 'android' с ключами 'package' (значение 'com.myapp.prod') и 'versionCode' (число 2). Внутри 'ios' добавьте 'buildNumber' со значением '2'.",
          starterCode: "{\n  \"expo\": {\n    \"name\": \"My App\",\n    \"version\": \"1.0.1\",\n    \"ios\": {\n      \"bundleIdentifier\": \"com.myapp.prod\",\n      // 1. Добавьте билд-номер для iOS\n      \n    },\n    // 2. Добавьте конфиг для Android (package и versionCode)\n    \n    \n  }\n}"
        },
        type: "json"
      },
      {
        id: "pub-cryptography",
        title: "Криптография: Подпись приложений (Keystores)",
        theory: {
          sections: [
            { type: "heading", content: "Докажи, кто ты" },
            { type: "text", content: "Вы не можете просто скомпилировать `.apk` (Android) или `.ipa` (iOS) файл и загрузить в магазин. Файл должен быть криптографически подписан. Это доказывает, что приложение пришло именно от ВАС и в него не внедрили вирус по пути." },
            { type: "heading", content: "Android: Keystore" },
            { type: "text", content: "В Android используется файл-хранилище ключей (`.keystore` или `.jks`). В нем лежит приватный ключ. Если вы потеряете этот файл или забудете пароль от него — вы БОЛЬШЕ НИКОГДА не сможете выпустить обновление для своего приложения в Google Play! Придется удалять старое и выпускать новое с нулем скачиваний." },
            { type: "heading", content: "iOS: Provisioning Profiles" },
            { type: "text", content: "У Apple всё еще сложнее. Вам нужны:" },
            { type: "list", items: [
              "Сертификат (Certificate): Подтверждает вашу личность разработчика.",
              "App ID: Регистрация приложения на портале Apple.",
              "Профиль обеспечения (Provisioning Profile): Файл, который 'связывает' вместе Сертификат, App ID и список разрешенных устройств для тестирования."
            ]},
            { type: "text", content: "Исторически, ручное управление этими сертификатами на Mac ('Code signing errors') доводило разработчиков до слез." }
          ]
        },
        practice: {
          title: "Пусть EAS сделает это за нас",
          description: "Менеджер ключей EAS Credentials.",
          task: "Сегодня мы не генерируем ключи руками через терминал. Мы используем Expo Application Services (EAS). Одной командой EAS связывается с Apple/Google, генерирует сертификаты и надежно сохраняет их в облаке. Напишите команду `eas credentials`.",
          starterCode: "# Запуск интерактивного менеджера сертификатов EAS\n# Эта утилита решит всю головную боль с Keystore и Provisioning Profiles\n\n"
        },
        type: "bash"
      },
      {
        id: "pub-eas-build",
        title: "Облачная сборка: EAS Build",
        theory: {
          sections: [
            { type: "heading", content: "Проблема Windows" },
            { type: "text", content: "Чтобы скомпилировать iOS приложение, Apple жестко требует использования программы XCode. XCode работает ТОЛЬКО на операционной системе macOS (Macbook, iMac). Что делать, если у вас или вашей команды Windows-ноутбуки?" },
            { type: "heading", content: "EAS Build (Решение проблемы)" },
            { type: "text", content: "EAS Build переносит процесс компиляции в Облако. Вы вводите команду в терминале, ваш JS-код отправляется на серверы Expo. Там они поднимают виртуальную машину с macOS, компилируют приложение через XCode, подписывают вашими сертификатами и выдают вам готовую ссылку на скачивание файла `.ipa` или `.aab`!" },
            { type: "code", content: "eas build --platform ios --profile production" },
            { type: "heading", content: "Профили в eas.json" },
            { type: "text", content: "В файле `eas.json` вы описываете Профили сборки. Например, профиль 'development' собирает приложение-песочницу для тестирования на симуляторах. А профиль 'production' собирает финальный, оптимизированный билд для сторов." },
            { type: "tip", content: "Ресурс: EAS Build Docs. Обязательно изучите документацию по `eas.json`. Там можно настроить 'autoIncrement', чтобы облако Expo само увеличивало ваш `buildNumber` на единицу при каждой сборке, избавляя вас от рутины." }
          ]
        },
        practice: {
          title: "Настройка профилей сборки",
          description: "Напишите конфигурацию eas.json.",
          task: "Допишите файл `eas.json`. Внутри объекта 'build', создайте профиль 'production'. Внутри профиля установите версию Node.js ('node': '18') для серверов Expo, и укажите 'channel': 'production'.",
          starterCode: "{\n  \"build\": {\n    \"development\": {\n      \"developmentClient\": true,\n      \"distribution\": \"internal\"\n    },\n    // Напишите профиль 'production' здесь\n    \n    \n    \n  }\n}"
        },
        type: "json"
      },
      {
        id: "pub-eas-submit",
        title: "Автоматизация доставки: EAS Submit",
        theory: {
          sections: [
            { type: "heading", content: "Обход браузерных порталов" },
            { type: "text", content: "Обычно, получив скомпилированный файл (архив), разработчик открывает браузер, логинится в App Store Connect или Google Play Console, перетаскивает файл мышкой и ждет 30 минут, пока он обработается серверами." },
            { type: "heading", content: "CI/CD для мобилок" },
            { type: "text", content: "EAS Submit позволяет отправлять приложение в магазины прямо из терминала. Вы один раз настраиваете API-ключи (App Store Connect API Key и Service Account JSON для Google), и Expo начинает общаться с магазинами напрямую." },
            { type: "code", content: "eas submit --platform all --latest" },
            { type: "text", content: "Эта команда берет самые последние сборки, которые вы сгенерировали через `eas build`, и автоматически загружает их в TestFlight (платформа Apple для бета-тестирования) и в раздел Внутреннего тестирования Google Play." }
          ]
        },
        practice: {
          title: "Отправка в магазин",
          description: "Используйте CLI для загрузки (submit) приложения.",
          task: "Напишите команду для отправки только 'ios' платформы в Apple App Store, используя последний (latest) билд, собранный на серверах Expo.",
          starterCode: "# Отправка скомпилированного билда напрямую в Apple TestFlight\n# Синтаксис: eas submit --platform [ios|android|all] --latest\n\n"
        },
        type: "bash"
      },
      {
        id: "pub-ota-updates",
        title: "Обход модерации: OTA Обновления",
        theory: {
          sections: [
            { type: "heading", content: "Бутылочное горлышко App Store" },
            { type: "text", content: "Вы выпустили приложение, его скачали 100 000 раз. Вдруг вы замечаете критический баг (Crash) при авторизации. В мире классической нативной разработки (Swift/Kotlin) вам нужно исправить код, собрать билд заново, отправить в Apple и... ЖДАТЬ от 1 до 3 дней, пока модератор его проверит. А потом еще надеяться, что пользователи нажмут кнопку 'Обновить' в App Store." },
            { type: "heading", content: "Обновления по воздуху (OTA - Over-The-Air)" },
            { type: "text", content: "Так как приложение на React Native — это по сути нативная 'оболочка', внутри которой крутится ваш JavaScript-код (Бандл), мы можем **обновлять сам JavaScript-код, не трогая нативную оболочку**!" },
            { type: "text", content: "С помощью сервиса EAS Update (или Microsoft CodePush) вы отправляете фикс прямо на телефоны пользователей. При следующем запуске приложение в фоне скачивает новый JS-файл и мгновенно применяет фикс. Модерация Apple не нужна!" },
            { type: "code", content: "eas update --branch production --message \"Fixed login crash\"" },
            { type: "tip", content: "Предупреждение: Apple разрешает OTA обновления ТОЛЬКО для багфиксов и мелких правок UI. Если вы с помощью OTA кардинально поменяете суть приложения (например, превратите калькулятор в онлайн-казино), Apple навсегда забанит ваш аккаунт разработчика." }
          ]
        },
        practice: {
          title: "Отправь Экстренный Фикс",
          description: "Деплой OTA обновления.",
          task: "Вы исправили критический баг в файле `App.js`. Используйте EAS CLI для отправки 'по воздуху' обновления в ветку (branch) 'production' с сообщением (message) 'Hotfix'.",
          starterCode: "# Отправка JavaScript обновления \"по воздуху\" на телефоны пользователей\n# Синтаксис: eas update --branch [имя_ветки] --message [сообщение]\n\n"
        },
        type: "bash"
      }
    ]
  }
};