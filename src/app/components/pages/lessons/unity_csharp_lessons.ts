export const unityCSharpState: Record<'EN' | 'RU', any> = {
  EN: {
    title: "C# & Unity Basics (MUST)",
    description: "Programming inside the Unity engine. Master the Component-Based architecture and the Game Loop.",
    lessons: [
      {
        id: "unity-philosophy",
        title: "The Unity Philosophy: GameObjects & Components",
        theory: {
          sections: [
            { type: "heading", content: "Component-Based Architecture" },
            { type: "text", content: "Unity does not use deep Object-Oriented Inheritance (like `Player extends Character extends Entity`). Instead, it uses a Component-Based Architecture." },
            { type: "text", content: "Everything you see in a Unity scene is a **GameObject**. By itself, a GameObject is just an empty container. It does absolutely nothing except have a position in space (a Transform component)." },
            { type: "text", content: "You give a GameObject 'life' by attaching **Components** to it. Want it to look like a hero? Attach a `SpriteRenderer`. Want it to have gravity? Attach a `Rigidbody`. Want it to jump? You write a custom C# Script (which is just another Component) and attach it!" },
            { type: "heading", content: "The Inspector" },
            { type: "text", content: "When you attach a C# script to a GameObject, any variable declared as `public` (or `[SerializeField] private`) magically appears in the Unity Inspector. This allows Game Designers to tweak jump height or speed without touching a single line of code." },
            { type: "tip", content: "Resource: Unity Learn. The 'Create with Code' pathway on Unity Learn is the absolute best place to start. It teaches you how the Editor and C# scripts interact seamlessly." }
          ]
        },
        practice: {
          title: "Exposing Variables to the Editor",
          description: "Learn how C# talks to the Unity Inspector.",
          task: "This is a conceptual exercise. Look at the C# script. To make the 'speed' variable editable by Game Designers in the Unity Inspector without making it public (which is bad for security), you use an Attribute. Add `[SerializeField]` above the private speed variable.",
          starterCode: "using UnityEngine;\n\npublic class PlayerMovement : MonoBehaviour\n{\n    // Expose this private variable to the Unity Inspector!\n    \n    private float speed = 5.0f;\n\n    void Start()\n    {\n        Debug.Log(\"Player spawned with speed: \" + speed);\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "unity-game-loop",
        title: "The Game Loop: Start vs Update",
        theory: {
          sections: [
            { type: "heading", content: "The Heartbeat of the Game" },
            { type: "text", content: "A game is essentially an infinite loop that reads player input, calculates physics, and draws a picture on the screen 60 times a second. In Unity, your C# scripts hook into this loop." },
            { type: "heading", content: "Start() vs Awake()" },
            { type: "list", items: [
              "Awake(): Called the exact moment the object is created. Used to initialize variables or find other components (e.g., `GetComponent<Rigidbody>()`).",
              "Start(): Called right before the very first frame is rendered. Used to pass information to other objects."
            ]},
            { type: "heading", content: "The Update() Function" },
            { type: "text", content: "The `Update()` function is called once per frame. If your game runs at 60 FPS, `Update()` runs 60 times a second. This is where you check if the player pressed the 'Jump' button." },
            { type: "text", content: "WARNING: Never put heavy logic (like finding objects by name: `GameObject.Find(\"Boss\")`) inside `Update()`. It will run 60 times a second and completely destroy your game's framerate!" },
            { type: "tip", content: "Resource: Brackeys YouTube. The legendary Brackeys tutorial 'How to make a Video Game in Unity' explains the game loop perfectly. Sadly, he stopped making videos, but his C# fundamentals are timeless." }
          ]
        },
        practice: {
          title: "The Update Loop",
          description: "Write code that executes every frame.",
          task: "Inside the `Update` method, use `Input.GetKeyDown(KeyCode.Space)` inside an `if` statement. If it returns true (the player pressed the Spacebar), output a message using `Debug.Log(\"Jump!\")`.",
          starterCode: "using UnityEngine;\n\npublic class PlayerInput : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"Game Started\");\n    }\n\n    // Update is called once per frame\n    void Update()\n    {\n        // Check if the Space key was pressed THIS frame\n        \n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "unity-time-deltatime",
        title: "Movement & Time.deltaTime",
        theory: {
          sections: [
            { type: "heading", content: "The Framerate Problem" },
            { type: "text", content: "Imagine you write this code in `Update()`: `position.x += 1`. If Alice plays your game on a cheap laptop (30 FPS), her character moves 30 units per second. If Bob plays on a beast PC (120 FPS), his character moves 120 units per second! Bob will easily win a multiplayer race. This is broken." },
            { type: "heading", content: "The Solution: Time.deltaTime" },
            { type: "text", content: "`Time.deltaTime` is the time (in seconds) it took the computer to render the last frame. On a fast PC, it's a tiny number (e.g., 0.008s). On a slow PC, it's a larger number (e.g., 0.033s)." },
            { type: "text", content: "If you multiply your movement speed by `Time.deltaTime`, you convert the movement from 'units per frame' to 'units per second'." },
            { type: "code", content: "transform.Translate(Vector3.forward * speed * Time.deltaTime);" },
            { type: "text", content: "Now, Alice (30 FPS * 0.033s = 1 second) and Bob (120 FPS * 0.008s = 1 second) will both move exactly the same distance!" }
          ]
        },
        practice: {
          title: "Framerate Independent Movement",
          description: "Move an object safely across different PCs.",
          task: "Complete the `transform.Translate` method. Move the object forward by multiplying `Vector3.forward`, the `speed` variable, and most importantly, `Time.deltaTime`.",
          starterCode: "using UnityEngine;\n\npublic class Mover : MonoBehaviour\n{\n    public float speed = 10.0f;\n\n    void Update()\n    {\n        // Move forward, independent of framerate\n        transform.Translate( );\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "unity-physics",
        title: "Physics: Rigidbody & FixedUpdate",
        theory: {
          sections: [
            { type: "heading", content: "Letting Unity Handle Math" },
            { type: "text", content: "You shouldn't write your own gravity or collision math. Unity has a powerful physics engine (PhysX/Box2D). To give an object physics (gravity, mass, velocity), you simply attach a **Rigidbody** (or Rigidbody2D) component to it." },
            { type: "heading", content: "Update() vs FixedUpdate()" },
            { type: "text", content: "We know `Update()` runs every frame. But framerates fluctuate! If an explosion throws a box, and the framerate drops, the physics math will break, and the box might glitch through a wall." },
            { type: "text", content: "To solve this, Unity has `FixedUpdate()`. It runs at a strict, constant interval (default 50 times a second), regardless of framerate. **Rule of thumb: Read Input in Update(), but apply Physics forces in FixedUpdate()!**" },
            { type: "code", content: "void FixedUpdate() {\n    // Applying force to a Rigidbody\n    rb.AddForce(Vector3.up * jumpForce, ForceMode.Impulse);\n}" },
            { type: "tip", content: "Resource: C# Microsoft Docs. Understanding physics in Unity requires knowing C# classes and object references. Whenever you use `GetComponent<Rigidbody>()`, you are using Generics. Microsoft's C# documentation is the best place to learn how Generics work under the hood." }
          ]
        },
        practice: {
          title: "Applying Force",
          description: "Use FixedUpdate to move a Rigidbody.",
          task: "We have cached the Rigidbody in the `Start` method. In the `FixedUpdate` method, use `rb.AddForce()`. Pass `Vector3.up * forceAmount` as the first argument, and `ForceMode.Impulse` as the second argument.",
          starterCode: "using UnityEngine;\n\npublic class Jumper : MonoBehaviour\n{\n    public float forceAmount = 5.0f;\n    private Rigidbody rb;\n\n    void Start()\n    {\n        // Get the physics component attached to this GameObject\n        rb = GetComponent<Rigidbody>();\n    }\n\n    // Physics logic goes here!\n    void FixedUpdate()\n    {\n        // Apply an upward impulse force to jump\n        \n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "unity-collisions",
        title: "Collisions and Triggers",
        theory: {
          sections: [
            { type: "heading", content: "Colliders" },
            { type: "text", content: "For Unity to know when two objects touch, they both need a **Collider** component (like a BoxCollider or SphereCollider). Think of it as an invisible mathematical shell around the 3D model." },
            { type: "heading", content: "Hard Collisions (OnCollisionEnter)" },
            { type: "text", content: "When two solid objects (e.g., a car and a wall) hit each other, they bounce off. Unity fires the `OnCollisionEnter(Collision col)` method. You can use `col.gameObject.name` to check WHAT you hit." },
            { type: "heading", content: "Triggers (OnTriggerEnter)" },
            { type: "text", content: "Sometimes you don't want objects to bounce. Imagine a Mario coin or a checkpoint zone. You want the player to pass THROUGH it and trigger an event. You check the 'Is Trigger' box on the Collider. Now, when the player touches it, Unity fires `OnTriggerEnter(Collider other)` instead." },
            { type: "code", content: "void OnTriggerEnter(Collider other) {\n    if (other.CompareTag(\"Player\")) {\n        Debug.Log(\"Coin collected!\");\n        Destroy(gameObject); // Remove the coin\n    }\n}" }
          ]
        },
        practice: {
          title: "Collect the Coin",
          description: "Write trigger logic.",
          task: "Complete the `OnTriggerEnter` method. Use an `if` statement to check if the entering object's tag is 'Player' using `other.CompareTag(\"Player\")`. If true, destroy the coin using `Destroy(gameObject)`.",
          starterCode: "using UnityEngine;\n\npublic class Coin : MonoBehaviour\n{\n    // This method fires when an object passes through the Trigger collider\n    void OnTriggerEnter(Collider other)\n    {\n        // 1. Check if the object that entered has the \"Player\" tag\n        \n            \n            // 2. Destroy this coin GameObject\n            \n            Debug.Log(\"Score +1\");\n        \n    }\n}"
        },
        type: "csharp"
      }
    ]
  },
  RU: {
    title: "C# & Unity основы (MUST)",
    description: "Программирование внутри движка Unity. Овладейте компонентной архитектурой и игровым циклом.",
    lessons: [
      {
        id: "unity-philosophy",
        title: "Философия Unity: GameObjects и Компоненты",
        theory: {
          sections: [
            { type: "heading", content: "Компонентная Архитектура" },
            { type: "text", content: "Unity не использует глубокое ООП-наследование (как `Player наследует Character наследует Entity`). Вместо этого Unity использует Компонентную Архитектуру." },
            { type: "text", content: "Всё, что вы видите в сцене (на экране) — это **GameObject**. Сам по себе GameObject — это просто пустая 'коробка'. Он не умеет ничего, у него есть только позиция в пространстве (компонент Transform)." },
            { type: "text", content: "Вы 'оживляете' GameObject, прикрепляя к нему **Компоненты (Components)**. Хотите, чтобы он выглядел как герой? Прикрепите `SpriteRenderer`. Хотите гравитацию? Прикрепите `Rigidbody`. Хотите, чтобы он прыгал? Вы пишете свой C# Скрипт (который тоже является компонентом) и прикрепляете его!" },
            { type: "heading", content: "Инспектор (The Inspector)" },
            { type: "text", content: "Когда вы прикрепляете C# скрипт к GameObject, любая переменная, объявленная как `public` (или `[SerializeField] private`), магическим образом появляется в визуальном Инспекторе Unity. Это позволяет Геймдизайнерам менять высоту прыжка героя мышкой, вообще не открывая ваш код." },
            { type: "tip", content: "Ресурс: Unity Learn. Обучающий путь 'Create with Code' на официальной платформе Unity Learn — это лучший старт. Там гениально показано, как код взаимодействует с визуальным редактором." }
          ]
        },
        practice: {
          title: "Связь Кода и Инспектора",
          description: "Как безопасно выводить переменные в редактор.",
          task: "Это концептуальная задача. Посмотрите на C# скрипт. Сделать переменную `public` — плохо для архитектуры. Чтобы переменная оставалась `private` (недоступной из других скриптов), но при этом появилась в Инспекторе Unity для геймдизайнеров, мы используем Атрибут. Добавьте `[SerializeField]` прямо перед переменной speed.",
          starterCode: "using UnityEngine;\n\npublic class PlayerMovement : MonoBehaviour\n{\n    // Сделайте эту приватную переменную видимой в Инспекторе Unity!\n    \n    private float speed = 5.0f;\n\n    void Start()\n    {\n        Debug.Log(\"Игрок появился со скоростью: \" + speed);\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "unity-game-loop",
        title: "Игровой Цикл: Start против Update",
        theory: {
          sections: [
            { type: "heading", content: "Сердцебиение Игры" },
            { type: "text", content: "Любая игра — это по сути один гигантский бесконечный цикл `while(true)`. Он считывает нажатия кнопок, считает физику и рисует картинку 60 раз в секунду. В Unity ваши C# скрипты 'встраиваются' в этот цикл с помощью специальных методов." },
            { type: "heading", content: "Start() и Awake()" },
            { type: "list", items: [
              "Awake(): Вызывается в самую первую миллисекунду, когда объект рождается. Идеально для поиска других компонентов (например, `GetComponent<Rigidbody>()`).",
              "Start(): Вызывается прямо перед тем, как отрисуется первый кадр. Используется для передачи данных другим объектам."
            ]},
            { type: "heading", content: "Функция Update()" },
            { type: "text", content: "Метод `Update()` вызывается ровно ОДИН РАЗ ЗА КАДР (Frame). Если ваша игра идет в 60 FPS, `Update()` выполнится 60 раз за секунду. Именно здесь вы проверяете, нажал ли игрок кнопку 'Прыжок'." },
            { type: "text", content: "ВНИМАНИЕ: Никогда не кладите тяжелые операции (типа поиска объектов по имени: `GameObject.Find(\"Boss\")`) внутрь `Update()`. Эта тяжелая логика выполнится 60 раз за секунду и мгновенно убьет FPS вашей игры (возникнут лаги)!" },
            { type: "tip", content: "Ресурс: Brackeys (YouTube). Легендарный туториал 'How to make a Video Game in Unity' от Brackeys — это классика геймдева. Хоть канал больше не выпускает видео, база работы с Update и Start там объяснена идеально." }
          ]
        },
        practice: {
          title: "Цикл Update",
          description: "Напишите код, выполняющийся каждый кадр.",
          task: "Внутри метода `Update` напишите конструкцию `if`. В качестве условия используйте `Input.GetKeyDown(KeyCode.Space)`. Если она вернула true (игрок ударил по пробелу в этом кадре), выведите в консоль строку с помощью `Debug.Log(\"Jump!\")`.",
          starterCode: "using UnityEngine;\n\npublic class PlayerInput : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"Игра началась\");\n    }\n\n    // Update вызывается каждый кадр (Frame)\n    void Update()\n    {\n        // Проверьте, был ли нажат Пробел (Space) в ЭТОМ кадре\n        \n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "unity-time-deltatime",
        title: "Движение и магия Time.deltaTime",
        theory: {
          sections: [
            { type: "heading", content: "Проблема частоты кадров (FPS)" },
            { type: "text", content: "Представьте, что вы написали в `Update()` код: `position.x += 1`. Если Алиса играет на старом слабом ноутбуке (30 FPS), её персонаж сдвинется на 30 метров за секунду. Если Боб играет на мощном ПК (120 FPS), его персонаж пролетит 120 метров за секунду! Боб легко выиграет любую гонку. Эта физика сломана." },
            { type: "heading", content: "Решение: Time.deltaTime" },
            { type: "text", content: "`Time.deltaTime` — это время (в секундах), которое потребовалось процессору на отрисовку предыдущего кадра. На быстром ПК это крошечное число (например, 0.008 сек). На слабом ПК это число больше (например, 0.033 сек)." },
            { type: "text", content: "Если вы умножите вашу скорость движения на `Time.deltaTime`, вы конвертируете движение из 'метров за кадр' в 'метры за секунду'!" },
            { type: "code", content: "transform.Translate(Vector3.forward * speed * Time.deltaTime);" },
            { type: "text", content: "Теперь и Алиса (30 FPS * 0.033s = 1 секунда), и Боб (120 FPS * 0.008s = 1 секунда) пройдут абсолютно одинаковое расстояние за 1 секунду реального времени!" }
          ]
        },
        practice: {
          title: "Независимое от FPS движение",
          description: "Сделайте движение безопасным для всех ПК.",
          task: "Допишите метод `transform.Translate`. Сдвиньте объект вперед, перемножив три значения: `Vector3.forward`, переменную `speed` и, самое главное, `Time.deltaTime`.",
          starterCode: "using UnityEngine;\n\npublic class Mover : MonoBehaviour\n{\n    public float speed = 10.0f;\n\n    void Update()\n    {\n        // Двигаем объект вперед, НЕЗАВИСИМО от мощности компьютера (FPS)\n        transform.Translate( );\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "unity-physics",
        title: "Физика: Rigidbody и FixedUpdate",
        theory: {
          sections: [
            { type: "heading", content: "Пусть Unity считает математику" },
            { type: "text", content: "Вам не нужно писать формулы гравитации или массы своими руками. В Unity встроен мощнейший физический движок (PhysX для 3D и Box2D для 2D). Чтобы дать объекту физику, вы просто прикрепляете к нему компонент **Rigidbody** (Твердое тело)." },
            { type: "heading", content: "Update() против FixedUpdate()" },
            { type: "text", content: "Мы знаем, что `Update()` запускается каждый кадр. Но FPS нестабилен! Если вы примените физическую силу в момент 'лага' компьютера, расчеты собьются, и персонаж может провалиться сквозь стену." },
            { type: "text", content: "Для решения этой проблемы придуман `FixedUpdate()`. Он запускается со строгим, неизменным интервалом (по умолчанию 50 раз в секунду), игнорируя лаги видеокарты. **Золотое правило: Читайте нажатия кнопок в Update(), но применяйте физические силы в FixedUpdate()!**" },
            { type: "code", content: "void FixedUpdate() {\n    // Применяем силу к физическому телу (Rigidbody)\n    rb.AddForce(Vector3.up * jumpForce, ForceMode.Impulse);\n}" },
            { type: "tip", content: "Ресурс: C# Microsoft Docs. Работа с компонентами требует хорошего знания C#. Когда мы пишем `GetComponent<Rigidbody>()`, мы используем Обобщения (Generics — угловые скобки <>). Документация Microsoft — лучшее место для понимания сути Generics." }
          ]
        },
        practice: {
          title: "Применение Силы",
          description: "Используйте FixedUpdate для физики.",
          task: "Мы заранее сохранили компонент Rigidbody в методе `Start`. Внутри метода `FixedUpdate` вызовите метод `rb.AddForce()`. Передайте первым аргументом `Vector3.up * forceAmount`, а вторым аргументом — режим `ForceMode.Impulse` (мгновенный толчок).",
          starterCode: "using UnityEngine;\n\npublic class Jumper : MonoBehaviour\n{\n    public float forceAmount = 5.0f;\n    private Rigidbody rb;\n\n    void Start()\n    {\n        // Получаем физический компонент, прикрепленный к ЭТОМУ GameObject\n        rb = GetComponent<Rigidbody>();\n    }\n\n    // Физическая логика пишется только здесь!\n    void FixedUpdate()\n    {\n        // Примените силу вверх (up) для прыжка в режиме Impulse\n        \n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "unity-collisions",
        title: "Столкновения и Триггеры",
        theory: {
          sections: [
            { type: "heading", content: "Коллайдеры (Colliders)" },
            { type: "text", content: "Чтобы Unity знала, когда два объекта столкнулись, на них обоих должен висеть компонент **Collider** (например, BoxCollider или SphereCollider). Думайте об этом как о невидимой математической 'скорлупе' вокруг 3D-модели." },
            { type: "heading", content: "Жесткие столкновения (OnCollisionEnter)" },
            { type: "text", content: "Когда два твердых объекта (машина и стена) врезаются друг в друга, они отскакивают. Unity вызывает метод `OnCollisionEnter(Collision col)`. Внутри него вы можете использовать `col.gameObject.name`, чтобы понять, В ЧТО именно вы врезались." },
            { type: "heading", content: "Триггеры (OnTriggerEnter)" },
            { type: "text", content: "Иногда вам не нужно, чтобы объекты отскакивали. Представьте Монетку из Марио или 'Точку финиша'. Вы хотите, чтобы игрок прошел СКВОЗЬ нее, активировав событие. Для этого вы ставите галочку 'Is Trigger' в настройках Коллайдера. Теперь, когда игрок касается объекта, Unity вызывает `OnTriggerEnter(Collider other)`." },
            { type: "code", content: "void OnTriggerEnter(Collider other) {\n    if (other.CompareTag(\"Player\")) {\n        Debug.Log(\"Монетка собрана!\");\n        Destroy(gameObject); // Уничтожить монетку\n    }\n}" }
          ]
        },
        practice: {
          title: "Собери Монетку",
          description: "Напишите логику работы Триггера.",
          task: "Допишите метод `OnTriggerEnter`. Используйте `if` для проверки: имеет ли вошедший объект `other` тег 'Player' (используйте встроенный метод `other.CompareTag(\"Player\")`). Если да, уничтожьте эту монетку, вызвав функцию `Destroy(gameObject)`.",
          starterCode: "using UnityEngine;\n\npublic class Coin : MonoBehaviour\n{\n    // Метод срабатывает, когда кто-то проходит СКВОЗЬ этот объект\n    void OnTriggerEnter(Collider other)\n    {\n        // 1. Проверьте, имеет ли вошедший объект Тег \"Player\"\n        \n            \n            // 2. Уничтожьте этот GameObject (монетку)\n            \n            Debug.Log(\"Очки +1\");\n        \n    }\n}"
        },
        type: "csharp"
      }
    ]
  }
};