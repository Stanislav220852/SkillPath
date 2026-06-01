export const gameMultiplayerState: Record<'EN' | 'RU', any> = {
  EN: {
    title: "Multiplayer & Netcode (PRO)",
    description: "Mirror, Netcode, and Server Architecture. Learn how to synchronize worlds across the internet and defeat latency.",
    lessons: [
      {
        id: "mp-architecture-udp",
        title: "Architecture & The UDP Protocol",
        theory: {
          sections: [
            { type: "heading", content: "Dedicated Server vs Listen Server" },
            { type: "text", content: "Before writing code, you must choose your network architecture:" },
            { type: "list", items: [
              "Dedicated Server: A headless instance of your game running on a cloud server (AWS/Linux). It has no graphics or audio. It just simulates the world and calculates math. Safe, but expensive.",
              "Listen Server (Client-Host): One of the players acts as BOTH the server and a player. Cheaper, but gives the Host an unfair 0-ping advantage and makes cheating incredibly easy."
            ]},
            { type: "heading", content: "Why Games Hate TCP" },
            { type: "text", content: "Web browsers use TCP. TCP guarantees that every packet arrives in perfect order. If packet #3 is lost, TCP stops everything and waits for it to be re-sent." },
            { type: "text", content: "In a fast-paced shooter, if a player's position packet from 0.5 seconds ago is lost, WE DON'T CARE. We only care where the player is NOW. Waiting for an old packet causes massive lag spikes. This is why realtime games use UDP (User Datagram Protocol). UDP fires packets like a machine gun and doesn't care if some are dropped." },
            { type: "tip", content: "Resource: Gaffer on Games. Glenn Fiedler's article 'UDP vs. TCP' is legendary. He explains exactly why using TCP for a realtime action game is a recipe for disaster." }
          ]
        },
        practice: {
          title: "Identify the Protocol",
          description: "Choose the right network protocol for the task.",
          task: "This is a mental exercise. Read the game features in the comments and assign the correct protocol (TCP or UDP) based on the requirement for speed vs reliability.",
          starterCode: "// Task 1: Sending player X, Y, Z coordinates 60 times a second.\n// Protocol: \n\n// Task 2: Sending a chat message \"Hello team!\"\n// Protocol: \n\n// Task 3: Buying an item in the in-game shop with real money.\n// Protocol: "
        },
        type: "csharp"
      },
      {
        id: "mp-server-authority",
        title: "The Golden Rule: Server Authority",
        theory: {
          sections: [
            { type: "heading", content: "Never Trust the Client" },
            { type: "text", content: "If you want to understand multiplayer, you must understand this rule: The client is in the hands of the enemy. Hackers can modify memory, decompile your C# code, and send fake network packets." },
            { type: "text", content: "If your client sends a packet saying: `DealDamage(enemy, 9999)`, the hacker wins. You must use Server Authority." },
            { type: "heading", content: "How Authority Works" },
            { type: "text", content: "The client doesn't TELL the server what happened. The client ASKS the server to do something." },
            { type: "list", items: [
              "Client: 'I am pressing the shoot button pointing at angle 45.'",
              "Server: (Checks if client has ammo, checks if client is alive, calculates raycast). 'Okay, you hit the enemy for 10 damage.'",
              "Server: (Tells all clients) 'Enemy health is now 90. Play the hit animation.'"
            ]},
            { type: "code", content: "if (!isServer) {\n    return; // Stop right here. Only the server runs this logic.\n}\nenemy.health -= 10;" }
          ]
        },
        practice: {
          title: "Protecting the Logic",
          description: "Use isServer flags to prevent unauthorized execution.",
          task: "Look at the `TakeDamage` function. Currently, any client can execute it! Add a check at the very beginning of the function: if the code is NOT running on the server (`!isServer`), return immediately.",
          starterCode: "using Mirror;\nusing UnityEngine;\n\npublic class Health : NetworkBehaviour\n{\n    public int currentHealth = 100;\n\n    public void TakeDamage(int amount)\n    {\n        // 1. Add Server Authority check here!\n        // If not server, return.\n        \n        \n        currentHealth -= amount;\n        Debug.Log(\"Health is now: \" + currentHealth);\n        \n        if (currentHealth <= 0) {\n            Die();\n        }\n    }\n    \n    void Die() { /* ... */ }\n}"
        },
        type: "csharp"
      },
      {
        id: "mp-rpcs",
        title: "Events: Commands and RPCs",
        theory: {
          sections: [
            { type: "heading", content: "Remote Procedure Calls" },
            { type: "text", content: "How does a client actually 'ask' the server to do something? In frameworks like Mirror or Netcode for GameObjects (NGO), we use RPCs (Remote Procedure Calls). These are C# methods that you call on one machine, but they execute on ANOTHER machine!" },
            { type: "heading", content: "The Direction of Data" },
            { type: "list", items: [
              "Command (Client -> Server): A client requests an action. E.g., `CmdSpawnItem()`. In Mirror, these methods MUST start with 'Cmd' and have the `[Command]` attribute.",
              "ClientRpc (Server -> All Clients): The server tells everyone to do something. E.g., `RpcPlayExplosionEffect()`. Used for visual events. Must have the `[ClientRpc]` attribute.",
              "TargetRpc (Server -> Specific Client): The server tells ONE specific client to do something (like updating their personal UI or sending a private message)."
            ]},
            { type: "tip", content: "Resource: Mirror Networking Docs. Mirror is the spiritual successor to Unity's old UNET. The documentation on 'Communications' clearly maps out how Attributes `[Command]` and `[ClientRpc]` serialize your method arguments into network packets under the hood." }
          ]
        },
        practice: {
          title: "Write a Command",
          description: "Request an action from the server.",
          task: "We want the player to jump. We can't just jump locally. Add the `[Command]` attribute to the `CmdRequestJump` method. Then, inside the `Update` method, call `CmdRequestJump()` when the spacebar is pressed, but ONLY if `isLocalPlayer` is true (we only want OUR keyboard to control OUR character, not everyone's).",
          starterCode: "using Mirror;\nusing UnityEngine;\n\npublic class PlayerMovement : NetworkBehaviour\n{\n    void Update()\n    {\n        // 1. Check if this script belongs to OUR player\n        if (Input.GetKeyDown(KeyCode.Space) && ) \n        {\n            // 2. Call the command\n            \n        }\n    }\n\n    // 3. Add the Mirror Attribute to tell the engine this runs on the Server\n    \n    public void CmdRequestJump()\n    {\n        // The Server will verify and apply physics here\n        Debug.Log(\"Server executing jump for player!\");\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "mp-syncvars",
        title: "State: SyncVars and NetworkVariables",
        theory: {
          sections: [
            { type: "heading", content: "Events vs State" },
            { type: "text", content: "You shouldn't use an RPC to send the player's Health. Why? If a new player joins the server 10 minutes late, they missed the `RpcTakeDamage()` event! They will see the player at 100 Health, while everyone else sees them at 10 Health (Desync)." },
            { type: "heading", content: "Synchronized Variables" },
            { type: "text", content: "For persistent data (Health, Score, Color, Position), we use Synchronized Variables (`[SyncVar]` in Mirror, `NetworkVariable` in NGO). When a new player connects, the server automatically downloads the latest state of all SyncVars to them." },
            { type: "heading", content: "Hooks" },
            { type: "text", content: "How does the UI know when a SyncVar changes? You use a 'Hook'. A hook is a function that triggers automatically on the client whenever the server changes the variable." },
            { type: "code", content: "[SyncVar(hook = nameof(OnHealthChanged))]\npublic int health = 100;\n\nvoid OnHealthChanged(int oldHealth, int newHealth) {\n    healthBar.fillAmount = newHealth / 100f;\n}" }
          ]
        },
        practice: {
          title: "Synchronize Player Color",
          description: "Use SyncVar and Hooks to update visuals.",
          task: "Make the `playerColor` variable synchronize automatically. 1. Add the `[SyncVar]` attribute above it. 2. Inside the attribute, assign the hook: `hook = nameof(OnColorChanged)`. (In Mirror, hooks take the old value and the new value as parameters).",
          starterCode: "using Mirror;\nusing UnityEngine;\n\npublic class PlayerCustomization : NetworkBehaviour\n{\n    // 1. Add SyncVar attribute with a hook pointing to OnColorChanged\n    \n    public Color playerColor = Color.white;\n\n    // This method runs automatically on clients when the server changes playerColor\n    void OnColorChanged(Color oldColor, Color newColor)\n    {\n        GetComponent<MeshRenderer>().material.color = newColor;\n    }\n\n    [Command]\n    public void CmdChangeColor(Color requestedColor)\n    {\n        // Server changes the variable. The engine automatically syncs it!\n        playerColor = requestedColor;\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "mp-client-prediction",
        title: "Defeating Latency: Client Prediction",
        theory: {
          sections: [
            { type: "heading", content: "The Speed of Light Problem" },
            { type: "text", content: "If you press 'W' to move forward, send a `CmdMoveForward()` to the server, and wait for the server to update your `SyncVar` position, there will be a delay. If your ping is 100ms, your character will feel incredibly sluggish and unresponsive. Players will hate your game." },
            { type: "heading", content: "Client-Side Prediction" },
            { type: "text", content: "To solve this, we cheat. When you press 'W', your client IMMEDIATELY moves the character forward locally. At the exact same time, it sends the input to the server." },
            { type: "text", content: "The game feels instantly responsive. But what if the server disagrees? (e.g., the server knows a wall spawned in front of you that your client didn't know about yet)." },
            { type: "heading", content: "Server Reconciliation (Rubberbanding)" },
            { type: "text", content: "The server periodically sends the 'True' position back to the client. If the client's predicted position is too far from the server's truth, the client is forced to snap back to the server's position. This visual snap is called 'Rubberbanding'." },
            { type: "tip", content: "Resource: Gaffer on Games. Read the 'Networked Physics' and 'Snapshot Interpolation' articles. Implementing smooth Client Prediction and Server Reconciliation requires saving a history buffer of past inputs and replaying them. It is the hardest math in game dev." }
          ]
        },
        practice: {
          title: "The Prediction Concept",
          description: "Understand the flow of instant feedback.",
          task: "This is a conceptual logic flow. In the `Update` loop for a local player, you should first apply the movement to your local Transform to get instant feedback. ONLY THEN do you send the command to the server.",
          starterCode: "using Mirror;\nusing UnityEngine;\n\npublic class SmoothMovement : NetworkBehaviour\n{\n    public float speed = 5f;\n\n    void Update()\n    {\n        if (!isLocalPlayer) return;\n\n        Vector3 input = new Vector3(Input.GetAxis(\"Horizontal\"), 0, Input.GetAxis(\"Vertical\"));\n\n        if (input.sqrMagnitude > 0)\n        {\n            // 1. Client-Side Prediction: Move locally IMMEDIATELY!\n            \n            \n            // 2. Tell the server what input we pressed so it can simulate it too\n            CmdSendInput(input);\n        }\n    }\n\n    [Command]\n    void CmdSendInput(Vector3 input) {\n        // Server does its own math here...\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "mp-frameworks-photon",
        title: "Ecosystem: Netcode, Mirror & Photon",
        theory: {
          sections: [
            { type: "heading", content: "Choosing your Weapon" },
            { type: "text", content: "Writing raw UDP sockets in C# is reinventing the wheel. You should use a Networking Framework." },
            { type: "list", items: [
              "Mirror: The classic. It's open-source, highly stable, and works similarly to Unity's old UNET. Great for indie developers building Dedicated Server games.",
              "Netcode for GameObjects (NGO): Unity's official modern solution. It's actively developed and integrates perfectly with Unity's new tools (like UGS). Syntactically similar to Mirror (`[ServerRpc]` instead of `[Command]`).",
              "Photon (PUN 2 / Fusion): The commercial giant. Photon provides 'Cloud Relays'. You don't need to rent Linux servers. One player is the Host, and all network traffic is routed through Photon's ultra-fast cloud servers. It solves NAT/Firewall punch-through automatically."
            ]},
            { type: "tip", content: "Resource: Photon Docs. If you are making a 4-player Co-op game or a 1v1 fighting game, Photon is usually the fastest way to get to market without spending thousands on AWS server hosting." }
          ]
        },
        practice: {
          title: "Understanding Topologies",
          description: "Match the framework to the architecture.",
          task: "Mental exercise: Fill in the correct networking topology/framework (Dedicated, NGO, Photon) based on the scenarios described in the starter code.",
          starterCode: "// Scenario 1: A 100-player Battle Royale where cheating must be impossible. We need a secure Linux server running the simulation.\n// Choice: \n\n// Scenario 2: A 2-player casual chess game. We don't want to pay for server hosting, we just want players to connect easily through the cloud.\n// Choice: \n\n// Scenario 3: We want to use the official, newest solution provided by Unity Technologies themselves.\n// Choice: "
        },
        type: "csharp"
      }
    ]
  },
  RU: {
    title: "Мультиплеер (PRO)",
    description: "Mirror, Netcode и серверная архитектура. Узнайте, как синхронизировать миры через интернет и победить пинг.",
    lessons: [
      {
        id: "mp-architecture-udp",
        title: "Архитектура и протокол UDP",
        theory: {
          sections: [
            { type: "heading", content: "Выделенный сервер против Listen Server" },
            { type: "text", content: "Прежде чем писать код, нужно выбрать архитектуру сети:" },
            { type: "list", items: [
              "Выделенный сервер (Dedicated Server): 'Безголовая' (без графики и звука) версия вашей игры, работающая на облачном Linux-сервере. Она просто симулирует физику и проверяет правила. Максимально безопасно от читеров, но дорого в содержании.",
              "Listen Server (Клиент-Хост): Один из игроков одновременно является и Сервером, и Игроком. Дешево (не нужно платить за AWS), но дает Хосту несправедливое преимущество (пинг 0) и позволяет легко взломать игру."
            ]},
            { type: "heading", content: "Почему Игры ненавидят TCP" },
            { type: "text", content: "Веб-браузеры используют TCP. TCP гарантирует, что каждый пакет дойдет в идеальном порядке. Если пакет №3 потерялся в сети, TCP останавливает ВЕСЬ поток и ждет, пока пакет не будет переотправлен." },
            { type: "text", content: "В динамичном шутере, если пакет с позицией игрока полусекундной давности потерялся, НАМ ПЛЕВАТЬ. Нас волнует, где игрок СЕЙЧАС. Ожидание старого пакета вызывает чудовищные лаги. Поэтому игры реального времени используют UDP (User Datagram Protocol). UDP стреляет пакетами как пулемет и ему абсолютно все равно, если некоторые из них потеряются по пути." },
            { type: "tip", content: "Ресурс: Gaffer on Games. Статья Гленна Фидлера 'UDP vs. TCP' — это легенда геймдева. Он математически доказывает, почему использование TCP для Action-игр — это путь к провалу." }
          ]
        },
        practice: {
          title: "Определи Протокол",
          description: "Выберите правильный сетевой протокол для задачи.",
          task: "Это мысленное упражнение. Прочитайте игровые фичи в комментариях и назначьте правильный протокол (TCP или UDP) в зависимости от требований к скорости или надежности.",
          starterCode: "// Задача 1: Отправка X,Y,Z координат игрока 60 раз в секунду.\n// Протокол: \n\n// Задача 2: Отправка сообщения в чат \"Привет команда!\". (Важно, чтобы оно не потерялось)\n// Протокол: \n\n// Задача 3: Покупка меча во внутриигровом магазине за реальные деньги.\n// Протокол: "
        },
        type: "csharp"
      },
      {
        id: "mp-server-authority",
        title: "Золотое правило: Авторитет Сервера",
        theory: {
          sections: [
            { type: "heading", content: "Никогда не доверяй Клиенту" },
            { type: "text", content: "Если вы хотите понять мультиплеер, заучите это правило: Клиент находится в руках врага. Хакеры могут изменять память игры (Cheat Engine), декомпилировать C# код и отправлять поддельные сетевые пакеты." },
            { type: "text", content: "Если ваш клиент отправляет на сервер пакет: `НанестиУрон(враг, 9999)`, хакер победит. Вы ОБЯЗАНЫ использовать Авторитет Сервера (Server Authority)." },
            { type: "heading", content: "Как работает Авторитет" },
            { type: "text", content: "Клиент не ГОВОРИТ серверу, что произошло. Клиент ПРОСИТ сервер что-то сделать." },
            { type: "list", items: [
              "Клиент: 'Я нажимаю кнопку выстрела под углом 45 градусов'.",
              "Сервер: (Проверяет, есть ли патроны. Проверяет, жив ли клиент. Сам пускает Raycast). 'Окей, ты попал во врага на 10 урона'.",
              "Сервер: (Сообщает всем клиентам) 'Здоровье врага теперь 90. Проиграйте анимацию попадания'."
            ]},
            { type: "code", content: "if (!isServer) {\n    return; // Стоп. Этот код может выполнять ТОЛЬКО сервер.\n}\nenemy.health -= 10;" }
          ]
        },
        practice: {
          title: "Защита логики",
          description: "Используйте флаги isServer для блокировки читеров.",
          task: "Посмотрите на функцию `TakeDamage`. Сейчас любой клиент может вызвать её и убить кого угодно! Добавьте проверку в самое начало функции: если код выполняется НЕ на сервере (`!isServer`), немедленно вызовите `return;`.",
          starterCode: "using Mirror;\nusing UnityEngine;\n\npublic class Health : NetworkBehaviour\n{\n    public int currentHealth = 100;\n\n    public void TakeDamage(int amount)\n    {\n        // 1. Добавьте проверку Авторитета Сервера сюда!\n        // Если это не сервер, выходим из функции.\n        \n        \n        currentHealth -= amount;\n        Debug.Log(\"Здоровье теперь: \" + currentHealth);\n        \n        if (currentHealth <= 0) {\n            Die();\n        }\n    }\n    \n    void Die() { /* ... */ }\n}"
        },
        type: "csharp"
      },
      {
        id: "mp-rpcs",
        title: "События: Commands и RPCs",
        theory: {
          sections: [
            { type: "heading", content: "Удаленный вызов процедур (RPC)" },
            { type: "text", content: "Как клиент может 'попросить' сервер что-то сделать? Во фреймворках вроде Mirror или Unity Netcode используются RPC. Это C# методы, которые вы вызываете на одном компьютере, а физически они выполняются на ДРУГОМ!" },
            { type: "heading", content: "Направление данных" },
            { type: "list", items: [
              "Command (Клиент -> Сервер): Клиент просит сервер о действии. Например, `CmdSpawnItem()`. В Mirror такие методы ОБЯЗАНЫ начинаться с 'Cmd' и иметь атрибут `[Command]`.",
              "ClientRpc (Сервер -> ВСЕМ Клиентам): Сервер приказывает всем выполнить действие. Например, `RpcPlayExplosionEffect()`. Идеально для визуальных эффектов (взрывы, звуки). Требует атрибут `[ClientRpc]`.",
              "TargetRpc (Сервер -> КОНКРЕТНОМУ Клиенту): Сервер отправляет данные только одному игроку (например, показывает его личный инвентарь или личное сообщение)."
            ]},
            { type: "tip", content: "Ресурс: Документация Mirror Networking. Mirror — это духовный наследник старого UNET. Документация в разделе 'Communications' прекрасно объясняет, как атрибуты `[Command]` под капотом превращают аргументы вашей функции в байтовые сетевые пакеты." }
          ]
        },
        practice: {
          title: "Напиши Команду",
          description: "Отправьте запрос от Клиента к Серверу.",
          task: "Мы хотим, чтобы игрок прыгнул. Мы не можем прыгнуть просто так. Добавьте атрибут `[Command]` к методу `CmdRequestJump`. Затем, внутри `Update`, вызовите `CmdRequestJump()` при нажатии пробела, но ТОЛЬКО если `isLocalPlayer` равно `true` (иначе нажатие вашего пробела заставит прыгать всех игроков в мире!).",
          starterCode: "using Mirror;\nusing UnityEngine;\n\npublic class PlayerMovement : NetworkBehaviour\n{\n    void Update()\n    {\n        // 1. Проверяем, принадлежит ли этот скрипт НАШЕМУ локальному игроку\n        if (Input.GetKeyDown(KeyCode.Space) && ) \n        {\n            // 2. Вызываем команду на сервере\n            \n        }\n    }\n\n    // 3. Добавьте атрибут Mirror, чтобы движок понял, что это летит на Сервер\n    \n    public void CmdRequestJump()\n    {\n        // Сервер проверит возможность прыжка и применит физику здесь\n        Debug.Log(\"Сервер выполняет прыжок для игрока!\");\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "mp-syncvars",
        title: "Состояние: SyncVars и NetworkVariables",
        theory: {
          sections: [
            { type: "heading", content: "События против Состояний" },
            { type: "text", content: "Вы НЕ ДОЛЖНЫ использовать RPC для передачи Здоровья игрока. Почему? Если новый игрок подключится к серверу на 10 минут позже, он пропустит вспышку события `RpcTakeDamage()`! В итоге он будет видеть здоровье врага как 100, хотя все остальные видят 10 (Десинхронизация)." },
            { type: "heading", content: "Синхронизируемые переменные" },
            { type: "text", content: "Для постоянных данных (Здоровье, Очки, Цвет, Экипировка) мы используем Синхронизируемые Переменные (`[SyncVar]` в Mirror, `NetworkVariable` в Unity Netcode). Когда новый игрок подключается, сервер АВТОМАТИЧЕСКИ скачивает ему актуальное состояние всех SyncVars." },
            { type: "heading", content: "Хуки (Hooks)" },
            { type: "text", content: "Как интерфейс (UI) узнает, что SyncVar изменился? Используются 'Хуки'. Хук — это функция, которая срабатывает на клиенте автоматически, как только сервер изменил переменную." },
            { type: "code", content: "[SyncVar(hook = nameof(OnHealthChanged))]\npublic int health = 100;\n\nvoid OnHealthChanged(int oldHealth, int newHealth) {\n    healthBar.fillAmount = newHealth / 100f;\n}" }
          ]
        },
        practice: {
          title: "Синхронизация Цвета Игрока",
          description: "Используйте SyncVar и Хуки для визуала.",
          task: "Сделайте переменную `playerColor` синхронизируемой. 1. Добавьте атрибут `[SyncVar]` над ней. 2. Внутри атрибута назначьте хук: `hook = nameof(OnColorChanged)`. (В Mirror функции-хуки обязаны принимать два параметра: старое значение и новое значение).",
          starterCode: "using Mirror;\nusing UnityEngine;\n\npublic class PlayerCustomization : NetworkBehaviour\n{\n    // 1. Добавьте атрибут SyncVar с хуком (hook), указывающим на OnColorChanged\n    \n    public Color playerColor = Color.white;\n\n    // Этот метод сработает у всех клиентов, когда сервер изменит playerColor\n    void OnColorChanged(Color oldColor, Color newColor)\n    {\n        GetComponent<MeshRenderer>().material.color = newColor;\n    }\n\n    [Command]\n    public void CmdChangeColor(Color requestedColor)\n    {\n        // Сервер меняет переменную. Движок сам синхронизирует её по сети!\n        playerColor = requestedColor;\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "mp-client-prediction",
        title: "Побеждаем Пинг: Client-Side Prediction",
        theory: {
          sections: [
            { type: "heading", content: "Проблема скорости света" },
            { type: "text", content: "Если вы нажмете 'W' для движения вперед, отправите `CmdMoveForward()` на сервер и будете ЖДАТЬ, пока сервер пришлет вам новую позицию по сети, возникнет задержка. При пинге в 150мс ваш персонаж будет ощущаться как кисель. Игроки возненавидят такое управление." },
            { type: "heading", content: "Предсказание на стороне клиента (Client Prediction)" },
            { type: "text", content: "Чтобы решить это, мы идем на хитрость. Когда вы жмете 'W', ваш клиент НЕМЕДЛЕННО двигает персонажа локально на вашем экране. И ровно в ту же миллисекунду он отправляет команду на сервер." },
            { type: "text", content: "Игра ощущается идеально отзывчивой. Но что, если сервер не согласен? (Например, сервер знает, что прямо перед вами заспавнилась стена, о которой ваш клиент еще не знал)." },
            { type: "heading", content: "Примирение Сервера (Rubberbanding / Reconciliation)" },
            { type: "text", content: "Сервер периодически присылает 'Истинную' позицию. Если 'предсказанная' позиция клиента слишком сильно отличается от 'истинной' позиции сервера, клиент жестко телепортируется в позицию сервера. Этот визуальный рывок назад геймеры называют 'Раббербэндинг' (эффект резинки)." },
            { type: "tip", content: "Ресурс: Gaffer on Games. Обязательно прочитайте статьи 'Networked Physics' и 'Snapshot Interpolation'. Написание качественного Client Prediction (с сохранением буфера истории инпутов и их перемоткой при ошибке) — это самая сложная математика во всем GameDev." }
          ]
        },
        practice: {
          title: "Концепция Предсказания",
          description: "Поймите логику мгновенного отклика.",
          task: "Это концептуальная задача логики. В цикле `Update` для локального игрока вы должны СНАЧАЛА применить движение к локальному `transform`, чтобы получить мгновенный визуальный отклик. И ТОЛЬКО ПОТОМ отправить команду на сервер.",
          starterCode: "using Mirror;\nusing UnityEngine;\n\npublic class SmoothMovement : NetworkBehaviour\n{\n    public float speed = 5f;\n\n    void Update()\n    {\n        if (!isLocalPlayer) return;\n\n        Vector3 input = new Vector3(Input.GetAxis(\"Horizontal\"), 0, Input.GetAxis(\"Vertical\"));\n\n        if (input.sqrMagnitude > 0)\n        {\n            // 1. Client-Side Prediction: Двигаемся локально МГНОВЕННО!\n            \n            \n            // 2. Отправляем инпут серверу, чтобы он тоже мог симулировать движение\n            CmdSendInput(input);\n        }\n    }\n\n    [Command]\n    void CmdSendInput(Vector3 input) {\n        // Сервер делает свою математику и проверяет коллизии здесь...\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "mp-frameworks-photon",
        title: "Экосистема: Netcode, Mirror и Photon",
        theory: {
          sections: [
            { type: "heading", content: "Выбор Инструмента" },
            { type: "text", content: "Писать сырые UDP-сокеты на C# — это изобретение велосипеда. В Unity есть три главных сетевых решения:" },
            { type: "list", items: [
              "Mirror: Классика. Open-Source фреймворк, невероятно стабильный, синтаксис очень похож на старый Unity UNET. Идеален для Инди-команд, создающих игры с Выделенными серверами.",
              "Netcode for GameObjects (NGO): Официальное современное решение от самой Unity. Активно развивается, идеально интегрируется с Unity Gaming Services (UGS). Синтаксис похож на Mirror (`[ServerRpc]` вместо `[Command]`).",
              "Photon (PUN 2 / Fusion): Коммерческий гигант. Главная фишка Photon — 'Облачные Реле' (Cloud Relays). Вам вообще не нужно арендовать Linux сервера. Один из игроков становится Хостом, а весь трафик пересылается через ультрабыстрые облака Photon, автоматически пробивая NAT и фаерволы роутеров."
            ]},
            { type: "tip", content: "Ресурс: Документация Photon. Если вы делаете кооперативную игру на 4 человек или файтинг 1х1, Photon — это почти всегда самый быстрый способ выпустить игру, не потратив тысячи долларов на хостинг AWS серверов." }
          ]
        },
        practice: {
          title: "Понимание Топологий",
          description: "Подберите фреймворк под архитектуру.",
          task: "Мысленное упражнение: Прочитайте сценарии в комментариях. Назначьте правильную технологию (Dedicated Server, NGO, Photon) для каждого случая, основываясь на плюсах и минусах платформ.",
          starterCode: "// Сценарий 1: 'Королевская битва' на 100 человек, где читы недопустимы. Нам нужен безопасный Linux сервер, считающий всю физику.\n// Решение: \n\n// Сценарий 2: Казуальные шахматы 1х1 с другом. Мы не хотим платить за сервера, хотим чтобы игроки просто соединялись через облако.\n// Решение: \n\n// Сценарий 3: Мы хотим использовать самое современное, официальное решение от самой компании Unity.\n// Решение: "
        },
        type: "csharp"
      }
    ]
  }
};