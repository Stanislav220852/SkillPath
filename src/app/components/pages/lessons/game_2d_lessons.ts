export const game2dState: Record<'EN' | 'RU', any> = {
  EN: {
    title: "2D Game Development (CORE)",
    description: "Sprites, animations, collisions, and Tilemaps. Master the art of building 2D platformers and top-down games.",
    lessons: [
      {
        id: "2d-sprites-pixelart",
        title: "Sprites & The Blurry Pixel Art Problem",
        theory: {
          sections: [
            { type: "heading", content: "Sprites vs 3D Models" },
            { type: "text", content: "In 3D games, characters are made of polygons (meshes). In 2D games, characters are just flat images called Sprites. A Sprite is essentially a 2D texture rendered on a flat plane." },
            { type: "heading", content: "The Blurry Pixel Art Bug" },
            { type: "text", content: "When beginners import a beautiful 16x16 pixel art character into Unity or Godot, it often looks incredibly blurry and muddy. Why?" },
            { type: "text", content: "Modern game engines are built for 3D realism. By default, they apply 'Bilinear Filtering' to all imported images. This filtering blends pixels together to make 3D textures look smooth when viewed from a distance. But for Pixel Art, you want the edges to be razor-sharp!" },
            { type: "heading", content: "The Solution" },
            { type: "text", content: "You must select your imported sprite in the engine settings and change the 'Filter Mode' from Bilinear to 'Point (No Filter)'. Also, you should turn off 'Compression', which can create ugly artifacts around your pixels." },
            { type: "tip", content: "Resource: Pixel Art Assets. You don't need to be an artist to start coding. Websites like itch.io or Kenney.nl provide thousands of free, high-quality sprite sheets and tilesets for your prototypes." }
          ]
        },
        practice: {
          title: "Flipping the Sprite",
          description: "Change the character's facing direction using code.",
          task: "When a 2D character walks left, you don't need a separate set of 'walking left' images. You just flip the existing sprite! Use the `SpriteRenderer` component and set its `flipX` property to true if moving left.",
          starterCode: "using UnityEngine;\n\npublic class PlayerMove : MonoBehaviour\n{\n    private SpriteRenderer spriteRenderer;\n\n    void Start() {\n        spriteRenderer = GetComponent<SpriteRenderer>();\n    }\n\n    void Update() {\n        float move = Input.GetAxis(\"Horizontal\");\n\n        // If moving left (negative value), flip the sprite!\n        if (move < 0) {\n            // Set flipX to true\n            \n        } else if (move > 0) {\n            // Moving right, ensure it is NOT flipped\n            \n        }\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "2d-physics-platformer",
        title: "2D Physics & Platformer Gravity",
        theory: {
          sections: [
            { type: "heading", content: "Rigidbody2D and Colliders2D" },
            { type: "text", content: "Just like in 3D, we don't write collision math by hand. We attach a `BoxCollider2D` and a `Rigidbody2D` component to our character. The engine handles the gravity and prevents the character from falling through the floor." },
            { type: "heading", content: "The 'Floaty' Jump Problem" },
            { type: "text", content: "If you use default Earth gravity (-9.8 m/s²), your platformer game will feel terrible. The character will float through the air like an astronaut on the Moon. Super Mario doesn't use real physics!" },
            { type: "text", content: "Platformers use highly exaggerated gravity. In Unity, you usually increase the `Gravity Scale` on the Rigidbody2D to 3 or 4. This makes the character fall incredibly fast, creating a tight, responsive, 'snappy' jump." },
            { type: "heading", content: "Locking Rotations" },
            { type: "text", content: "If a 2D character runs into a wall, the physics engine will try to topple them over, and your character will fall flat on their face. You must go to the Rigidbody2D constraints and check 'Freeze Rotation Z'." },
            { type: "tip", content: "Resource: GDQuest Godot. While Unity dominates 3D, Godot is a fantastic open-source engine explicitly built with 2D in mind. The GDQuest channel has the best tutorials on building snappy 2D platformer controllers." }
          ]
        },
        practice: {
          title: "The Snappy Jump",
          description: "Apply an impulse force for a 2D jump.",
          task: "In the Update method, check if the Space key is pressed. If it is, apply a force to the `rb2d` (Rigidbody2D). Use `Vector2.up`, multiply by `jumpForce`, and use `ForceMode2D.Impulse`.",
          starterCode: "using UnityEngine;\n\npublic class PlatformerJump : MonoBehaviour\n{\n    public float jumpForce = 10f;\n    private Rigidbody2D rb2d;\n\n    void Start() {\n        rb2d = GetComponent<Rigidbody2D>();\n    }\n\n    void Update() {\n        if (Input.GetKeyDown(KeyCode.Space)) {\n            // Apply an instant upward force (Impulse)\n            \n        }\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "2d-raycasting-ground",
        title: "Raycasting: The Ground Check",
        theory: {
          sections: [
            { type: "heading", content: "The Infinite Jump Bug" },
            { type: "text", content: "If you just write `if (Input.GetKeyDown(KeyCode.Space)) { Jump(); }`, the player will be able to fly infinitely by spamming the Spacebar. You must prevent the player from jumping if they are already in the air." },
            { type: "heading", content: "How to check if Grounded?" },
            { type: "text", content: "Beginners often try to use `OnCollisionEnter2D` to check if the player touched the floor. This is buggy and unreliable (e.g., sliding down a wall might trigger it)." },
            { type: "heading", content: "The Pro Way: Raycasting" },
            { type: "text", content: "A Raycast is an invisible laser beam shot from a point in space in a specific direction. To check if the player is grounded, we shoot a tiny Raycast straight down from the character's feet." },
            { type: "text", content: "If the laser hits an object on the 'Ground' Layer within 0.1 meters, we set `isGrounded = true`. This guarantees perfect, bug-free jump logic." }
          ]
        },
        practice: {
          title: "Shoot the Ground Ray",
          description: "Use Physics2D.Raycast to detect the floor.",
          task: "Complete the `isGrounded` check. Use `Physics2D.Raycast`. Pass the starting position (`transform.position`), the direction (`Vector2.down`), and the distance (`0.1f`).",
          starterCode: "using UnityEngine;\n\npublic class GroundCheck : MonoBehaviour\n{\n    void Update()\n    {\n        // Shoot a laser straight down for 0.1 units\n        RaycastHit2D hit = Physics2D.Raycast( , , );\n\n        // If the laser hit something, we are on the ground!\n        if (hit.collider != null) {\n            Debug.Log(\"I am touching the ground!\");\n        } else {\n            Debug.Log(\"I am in the air!\");\n        }\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "2d-animations-statemachine",
        title: "Animations & State Machines",
        theory: {
          sections: [
            { type: "heading", content: "Sprite Sheets" },
            { type: "text", content: "A 2D animation is just a flipbook. You have an image file containing 10 frames of a character running (a Sprite Sheet). The engine quickly switches the texture on the SpriteRenderer from frame 1 to 10 to create the illusion of movement." },
            { type: "heading", content: "The Animator Controller" },
            { type: "text", content: "How does the game know WHEN to play the 'Run' animation instead of the 'Idle' animation? You don't hardcode this. You use a Finite State Machine (The Animator)." },
            { type: "text", content: "You define States (Idle, Run, Jump). Then you draw Transitions (arrows) between them. You define a Condition for the arrow: 'If the parameter Speed > 0.1, transition from Idle to Run'." },
            { type: "heading", content: "Connecting Code to Animation" },
            { type: "text", content: "In your C# script, you don't play animations manually. You simply update the Animator's parameters based on the physics engine." },
            { type: "code", content: "// Pass the absolute speed of the character to the Animator\nanimator.SetFloat(\"Speed\", Mathf.Abs(rb.velocity.x));" }
          ]
        },
        practice: {
          title: "Trigger the Run Animation",
          description: "Pass variables to the Animator.",
          task: "We have an `Animator` component. Inside the `Update` loop, we calculate the absolute horizontal input. Set a Float parameter named 'Speed' inside the animator to this `moveSpeed` value. The State Machine will automatically switch to the Run animation if the value > 0!",
          starterCode: "using UnityEngine;\n\npublic class PlayerAnimation : MonoBehaviour\n{\n    private Animator anim;\n\n    void Start() {\n        anim = GetComponent<Animator>();\n    }\n\n    void Update() {\n        // Get horizontal input (-1 to 1) and make it absolute (0 to 1)\n        float moveSpeed = Mathf.Abs(Input.GetAxis(\"Horizontal\"));\n\n        // Tell the Animator the current speed!\n        // Use anim.SetFloat(\"parameter_name\", value)\n        \n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "2d-tilemaps",
        title: "Level Design: Tilemaps",
        theory: {
          sections: [
            { type: "heading", content: "The Level Design Nightmare" },
            { type: "text", content: "Imagine building a Super Mario level. If every brick of the floor was a separate GameObject, placing 5,000 bricks by hand would take weeks. Furthermore, having 5,000 BoxColliders would destroy the CPU performance." },
            { type: "heading", content: "Tilemaps to the Rescue" },
            { type: "text", content: "A Tilemap is a grid system. You slice a large image into a 'Palette' of small squares (Tiles). Then, you use a brush tool in the Unity Editor to literally 'paint' your level onto the grid in seconds." },
            { type: "heading", content: "Composite Colliders" },
            { type: "text", content: "The biggest advantage of Tilemaps is physics optimization. Instead of thousands of small square colliders, you add a `TilemapCollider2D` and check the 'Used by Composite' box. This merges all touching tiles into one giant, smooth polygon outline! This prevents the player from getting stuck on tiny gaps between tiles and drastically improves performance." },
            { type: "tip", content: "Resource: Unity 2D Documentation. The 2D section of Unity's manual heavily focuses on the Tilemap system. Learn about 'Rule Tiles' — these are smart tiles that automatically change their texture (e.g., picking a corner graphic) depending on their neighbors!" }
          ]
        },
        practice: {
          title: "Tilemap Collision Optimization",
          description: "Understand Composite Colliders.",
          task: "This is a mental exercise. If a Tilemap level consists of a straight floor of 100 tiles, how many physics colliders should you ideally use? (Answer in a comment). How do you achieve this in Unity?",
          starterCode: "// Answer the questions in comments below:\n\n// 1. How many physics colliders should a flat 100-tile floor have?\n// Answer: \n\n// 2. What Component is used to merge multiple tile colliders into one?\n// Answer: "
        },
        type: "csharp"
      }
    ]
  },
  RU: {
    title: "2D разработка (CORE)",
    description: "Спрайты, анимации, коллизии и тайлмапы. Погрузитесь в создание двумерных платформеров и top-down игр.",
    lessons: [
      {
        id: "2d-sprites-pixelart",
        title: "Спрайты и Проблема мыльного Пиксель-арта",
        theory: {
          sections: [
            { type: "heading", content: "Спрайты против 3D Моделей" },
            { type: "text", content: "В 3D играх персонажи состоят из полигонов. В 2D играх персонажи — это просто плоские картинки, которые называются Спрайтами (Sprites). По сути, Спрайт — это 2D-текстура, натянутая на невидимый плоский прямоугольник." },
            { type: "heading", content: "Баг 'Мыльного Пиксель-арта'" },
            { type: "text", content: "Когда новички скачивают красивого пиксельного рыцаря размером 16x16 пикселей и закидывают его в Unity или Godot, он часто выглядит невероятно размытым и 'мыльным'. Почему?" },
            { type: "text", content: "Современные движки созданы для 3D реализма. По умолчанию они применяют 'Билинейную фильтрацию' (Bilinear Filtering) ко всем импортируемым картинкам. Эта фильтрация смешивает соседние пиксели, чтобы текстуры стен в 3D не рябили издалека. Но для Пиксель-арта мы хотим, чтобы края пикселей были острыми как бритва!" },
            { type: "heading", content: "Решение" },
            { type: "text", content: "Вы обязаны выбрать импортированный спрайт в настройках движка и изменить параметр 'Filter Mode' с Bilinear на 'Point (No Filter)'. Также нужно отключить компрессию ('Compression: None'), иначе вокруг пикселей появятся уродливые артефакты сжатия." },
            { type: "tip", content: "Ресурс: Pixel art assets. Вам не нужно быть художником, чтобы начать кодить! Существуют сайты вроде itch.io или Kenney.nl, где авторы выкладывают тысячи бесплатных высококачественных спрайтов и наборов тайлов для прототипирования." }
          ]
        },
        practice: {
          title: "Разворот Спрайта",
          description: "Как заставить персонажа смотреть влево.",
          task: "Когда 2D-персонаж идет влево, вам не нужно рисовать отдельный набор картинок 'Иду влево'. Вы просто отзеркаливаете (флипаете) текущий спрайт! Используйте компонент `SpriteRenderer` и установите его свойство `flipX` в `true`, если игрок двигается влево.",
          starterCode: "using UnityEngine;\n\npublic class PlayerMove : MonoBehaviour\n{\n    private SpriteRenderer spriteRenderer;\n\n    void Start() {\n        spriteRenderer = GetComponent<SpriteRenderer>();\n    }\n\n    void Update() {\n        float move = Input.GetAxis(\"Horizontal\");\n\n        // Если движемся влево (отрицательное значение), отзеркаливаем спрайт!\n        if (move < 0) {\n            // Установите flipX в true\n            \n        } else if (move > 0) {\n            // Движемся вправо, убеждаемся, что спрайт НЕ отзеркален\n            \n        }\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "2d-physics-platformer",
        title: "2D Физика и Гравитация платформеров",
        theory: {
          sections: [
            { type: "heading", content: "Rigidbody2D и Colliders2D" },
            { type: "text", content: "Как и в 3D, мы не пишем математику столкновений вручную. Мы вешаем на персонажа `BoxCollider2D` и `Rigidbody2D`. Движок берет гравитацию на себя и не дает персонажу провалиться сквозь пол." },
            { type: "heading", content: "Проблема 'Лунного Прыжка'" },
            { type: "text", content: "Если вы оставите дефолтную Земную гравитацию (-9.8 м/с²), ваш платформер будет ощущаться ужасно. Персонаж будет медленно лететь по воздуху, как космонавт на Луне. Super Mario не использует реальную физику!" },
            { type: "text", content: "В платформерах используется сильно преувеличенная гравитация. В Unity разработчики обычно увеличивают `Gravity Scale` в компоненте Rigidbody2D до 3 или 4. Это заставляет персонажа падать камнем вниз, создавая тот самый четкий, резкий, отзывчивый ('snappy') прыжок." },
            { type: "heading", content: "Блокировка вращения" },
            { type: "text", content: "Если 2D персонаж (прямоугольник) побежит в стену, физический движок попытается опрокинуть его, и персонаж упадет лицом в пол. Чтобы этого не произошло, вы обязаны зайти в настройки Rigidbody2D -> Constraints и поставить галочку 'Freeze Rotation Z'." },
            { type: "tip", content: "Ресурс: GDQuest Godot. В то время как Unity доминирует в 3D, Godot — это невероятный Open-Source движок, который изначально создавался с фокусом на 2D. Канал GDQuest на YouTube содержит лучшие в интернете туториалы по написанию контроллеров для 2D-платформеров." }
          ]
        },
        practice: {
          title: "Резкий прыжок",
          description: "Примените импульс для прыжка в 2D.",
          task: "Внутри метода Update проверьте, нажат ли пробел (Space). Если да, примените силу к `rb2d` (Rigidbody2D). Вызовите `rb2d.AddForce()`, передав `Vector2.up`, умноженный на `jumpForce`, и режим силы `ForceMode2D.Impulse`.",
          starterCode: "using UnityEngine;\n\npublic class PlatformerJump : MonoBehaviour\n{\n    public float jumpForce = 10f;\n    private Rigidbody2D rb2d;\n\n    void Start() {\n        rb2d = GetComponent<Rigidbody2D>();\n    }\n\n    void Update() {\n        if (Input.GetKeyDown(KeyCode.Space)) {\n            // Применяем мгновенный импульс вверх\n            \n        }\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "2d-raycasting-ground",
        title: "Рейкасты: Проверка касания земли",
        theory: {
          sections: [
            { type: "heading", content: "Баг бесконечного полета" },
            { type: "text", content: "Если вы просто напишете `if (Input.GetKeyDown(KeyCode.Space)) { Jump(); }`, игрок сможет летать в космос, бесконечно нажимая пробел в воздухе. Вы обязаны запретить прыжок, если персонаж не стоит на земле." },
            { type: "heading", content: "Как проверить землю?" },
            { type: "text", content: "Новички часто используют встроенный метод `OnCollisionEnter2D`, чтобы проверить, коснулись ли мы пола. Это глючный подход (например, если персонаж трется боком о стену, игра может подумать, что он стоит на земле, и разрешить прыжок)." },
            { type: "heading", content: "Путь Профессионала: Raycasting" },
            { type: "text", content: "Рейкаст (Raycast) — это невидимый лазерный луч, который пускается из точки в заданном направлении. Чтобы проверить, стоим ли мы на земле, мы пускаем микроскопический лазер из ног персонажа строго вниз." },
            { type: "text", content: "Если лазер врезается в объект, находящийся на специальном слое 'Ground' на расстоянии 0.1 метра, мы ставим `isGrounded = true`. Это гарантирует идеальную логику прыжков без багов." }
          ]
        },
        practice: {
          title: "Стреляем лучом в землю",
          description: "Используйте Physics2D.Raycast для обнаружения пола.",
          task: "Допишите проверку `isGrounded`. Используйте метод `Physics2D.Raycast`. Передайте стартовую позицию (`transform.position`), направление (`Vector2.down`) и длину луча (`0.1f`).",
          starterCode: "using UnityEngine;\n\npublic class GroundCheck : MonoBehaviour\n{\n    void Update()\n    {\n        // Стреляем лазером строго вниз на 0.1 юнита\n        RaycastHit2D hit = Physics2D.Raycast( , , );\n\n        // Если лазер во что-то врезался (collider не null), мы на земле!\n        if (hit.collider != null) {\n            Debug.Log(\"Я стою на земле!\");\n        } else {\n            Debug.Log(\"Я лечу!\");\n        }\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "2d-animations-statemachine",
        title: "Анимации и Конечные Автоматы",
        theory: {
          sections: [
            { type: "heading", content: "Спрайт-листы (Sprite Sheets)" },
            { type: "text", content: "2D анимация — это просто цифровой блокнот с зарисовками. У вас есть один файл-картинка (Спрайт-лист), на котором нарисованы 10 кадров бегущего рыцаря. Движок просто невероятно быстро меняет текстуру в компоненте `SpriteRenderer` с кадра 1 по кадр 10, создавая иллюзию бега." },
            { type: "heading", content: "Контроллер Аниматора (Animator)" },
            { type: "text", content: "Как игра понимает, КОГДА нужно играть анимацию 'Бег', а когда 'Покой' (Idle)? Вы не прописываете это жестко в коде. Вы используете Конечный Автомат (State Machine) в окне Animator." },
            { type: "text", content: "Вы создаете Состояния (Idle, Run, Jump). Затем вы рисуете Переходы (стрелочки) между ними. На стрелочку вы вешаете Условие: 'Если параметр Speed > 0.1, переключиться с Idle на Run'." },
            { type: "heading", content: "Связываем Код и Анимацию" },
            { type: "text", content: "В вашем C# скрипте вы не запускаете анимации вручную. Вы просто обновляете параметры Аниматора на основе физического движка." },
            { type: "code", content: "// Передаем абсолютную скорость персонажа в Аниматор\nanimator.SetFloat(\"Speed\", Mathf.Abs(rb.velocity.x));" }
          ]
        },
        practice: {
          title: "Запуск Анимации Бега",
          description: "Передавайте переменные в Animator.",
          task: "У нас есть компонент `Animator`. Внутри `Update` мы вычисляем абсолютный (по модулю) горизонтальный ввод с клавиатуры. Установите Float-параметр с именем 'Speed' внутри аниматора, передав ему значение `moveSpeed`. State Machine сама переключит анимацию на 'Бег', если значение > 0!",
          starterCode: "using UnityEngine;\n\npublic class PlayerAnimation : MonoBehaviour\n{\n    private Animator anim;\n\n    void Start() {\n        anim = GetComponent<Animator>();\n    }\n\n    void Update() {\n        // Получаем ввод влево/вправо (-1 до 1) и делаем его абсолютным (0 до 1)\n        float moveSpeed = Mathf.Abs(Input.GetAxis(\"Horizontal\"));\n\n        // Сообщите Аниматору текущую скорость!\n        // Используйте anim.SetFloat(\"имя_параметра\", значение)\n        \n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "2d-tilemaps",
        title: "Левел-дизайн: Tilemaps (Тайлмапы)",
        theory: {
          sections: [
            { type: "heading", content: "Кошмар левел-дизайна" },
            { type: "text", content: "Представьте, что вы создаете уровень для Super Mario. Если каждый кирпичик пола будет отдельным объектом (GameObject), расстановка 5000 кирпичиков руками займет у вас недели. Более того, наличие 5000 BoxCollider'ов уничтожит производительность процессора, и игра будет тормозить." },
            { type: "heading", content: "Тайлмапы спешат на помощь" },
            { type: "text", content: "Tilemap — это система сетки. Вы режете большую картинку (например, текстуры земли и травы) на 'Палитру' маленьких квадратиков (Тайлов). Затем в редакторе Unity вы берете инструмент 'Кисть' и буквально 'рисуете' ваш уровень по сетке за секунды." },
            { type: "heading", content: "Композитные Коллайдеры" },
            { type: "text", content: "Главное преимущество Тайлмапов — оптимизация физики. Вместо тысяч маленьких квадратных коллайдеров, вы добавляете на сетку `TilemapCollider2D` и ставите галочку 'Used by Composite'. Эта галочка сливает все соприкасающиеся тайлы земли в один гигантский, гладкий полигон! Это предотвращает застревание персонажа на микро-стыках между тайлами и радикально ускоряет игру." },
            { type: "tip", content: "Ресурс: Документация Unity 2D. Раздел 2D в мануале Unity сильно сфокусирован на системе Tilemap. Обязательно изучите 'Rule Tiles' (Умные тайлы) — они автоматически меняют свою картинку (например, рисуют угол или обрыв обрыва), анализируя, какие тайлы находятся по соседству от них!" }
          ]
        },
        practice: {
          title: "Оптимизация коллизий",
          description: "Поймите суть Composite Colliders.",
          task: "Это мысленное упражнение. Если уровень в Тайлмапе состоит из прямого пола длиной в 100 тайлов, сколько физических коллайдеров в идеале должно быть у этого пола? (Ответьте в комментарии). Какой компонент в Unity нужно использовать, чтобы добиться этого?",
          starterCode: "// Ответьте на вопросы в комментариях ниже:\n\n// 1. Сколько физических коллайдеров должен иметь ровный пол из 100 тайлов?\n// Ответ: \n\n// 2. Какой компонент используется для слияния множества коллайдеров тайлов в один?\n// Ответ: "
        },
        type: "csharp"
      }
    ]
  }
};