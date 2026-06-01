export const gameMathState: Record<'EN' | 'RU', any> = {
  EN: {
    title: "Math for Games (MUST)",
    description: "Vectors, matrices, trigonometry, and physics. Stop guessing and start understanding how game engines actually work.",
    lessons: [
      {
        id: "math-vectors-norm",
        title: "Vectors & The Diagonal Problem",
        theory: {
          sections: [
            { type: "heading", content: "Points vs Vectors" },
            { type: "text", content: "In a 3D engine, everything uses (X, Y, Z). But these numbers can mean two different things. A 'Point' is a specific location in space (e.g., the player is at 5, 0, 5). A 'Vector' is a Direction and a Magnitude (length). For example, a wind blowing North at 10 m/s is a vector." },
            { type: "heading", content: "The Diagonal Movement Bug" },
            { type: "text", content: "In old games (like early DOOM or GoldenEye), if you pressed 'W' (move forward, vector (0,1)) you moved at speed 1. If you pressed 'D' (move right, vector (1,0)), you moved at speed 1." },
            { type: "text", content: "But if you pressed 'W' and 'D' together, your vector became (1, 1). According to the Pythagorean theorem, the length (magnitude) of this vector is √(1² + 1²) = √2 ≈ 1.41. Players moving diagonally were 41% faster! This is a classic rookie mistake." },
            { type: "heading", content: "Normalization" },
            { type: "text", content: "To fix this, we 'Normalize' the input vector. Normalization keeps the direction exactly the same but forces the magnitude (length) to be exactly 1.0. Then, we multiply it by our desired speed." }
          ]
        },
        practice: {
          title: "Fix the Diagonal Bug",
          description: "Use Vector Normalization.",
          task: "In Unity C#, the input vector is raw. Call the `.normalized` property on the input vector before applying the movement speed, so the player moves at exactly `speed` regardless of direction.",
          starterCode: "using UnityEngine;\n\npublic class PlayerMove : MonoBehaviour\n{\n    public float speed = 5f;\n\n    void Update()\n    {\n        float x = Input.GetAxisRaw(\"Horizontal\");\n        float y = Input.GetAxisRaw(\"Vertical\");\n\n        Vector2 moveInput = new Vector2(x, y);\n\n        // Fix the 41% diagonal speed boost by normalizing the vector!\n        Vector2 movement = \n        \n        transform.Translate(movement * Time.deltaTime);\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "math-dot-product",
        title: "Dot Product: Vision Cones & Stealth",
        theory: {
          sections: [
            { type: "heading", content: "The Magic of the Dot Product" },
            { type: "text", content: "The Dot Product (Scalar Product) takes two vectors and returns a single number (a scalar). If both vectors are normalized (length 1), the dot product returns the Cosine of the angle between them." },
            { type: "list", items: [
              "Returns 1: The vectors point in the EXACT same direction.",
              "Returns 0: The vectors are exactly perpendicular (90 degrees).",
              "Returns -1: The vectors point in completely opposite directions (180 degrees)."
            ]},
            { type: "heading", content: "Game Dev Use Case: Stealth Games" },
            { type: "text", content: "How does a guard know if they can see the player? You calculate the vector from the guard to the player, normalize it, and take the Dot Product with the guard's 'Forward' vector." },
            { type: "text", content: "If the dot product is > 0.5 (which corresponds to an angle of less than 60 degrees in either direction), the player is inside the guard's 120-degree vision cone! If it's negative, the player is behind the guard." },
            { type: "tip", content: "Resource: 3Blue1Brown. Go to YouTube and watch 'Essence of Linear Algebra' by 3Blue1Brown. His visual explanation of the Dot Product is a masterpiece that every game developer must watch." }
          ]
        },
        practice: {
          title: "Is the enemy looking at me?",
          description: "Calculate Field of View using Vector3.Dot.",
          task: "Use `Vector3.Dot(a, b)`. Compare the guard's forward vector (`transform.forward`) with the direction to the player (`dirToPlayer`). If the result is greater than 0, print 'I see you!'.",
          starterCode: "using UnityEngine;\n\npublic class Guard : MonoBehaviour\n{\n    public Transform player;\n\n    void Update()\n    {\n        // 1. Get direction from guard to player and normalize it\n        Vector3 dirToPlayer = (player.position - transform.position).normalized;\n\n        // 2. Calculate Dot Product between guard's forward and dirToPlayer\n        float dot = \n\n        // 3. If dot > 0, the player is strictly in front of the guard\n        if ( ) {\n            Debug.Log(\"I see you!\");\n        }\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "math-cross-product",
        title: "Cross Product: Normals and 3D Space",
        theory: {
          sections: [
            { type: "heading", content: "Generating Perpendiculars" },
            { type: "text", content: "While the Dot Product returns a number, the Cross Product (Vector Product) takes two 3D vectors and returns a NEW 3D Vector that is strictly perpendicular (90 degrees) to BOTH of the original vectors." },
            { type: "text", content: "If Vector A points Forward, and Vector B points Right, their Cross Product will point exactly Up." },
            { type: "heading", content: "Game Dev Use Case: Surface Normals" },
            { type: "text", content: "Imagine you are building a racing game where a car drives on curved terrain (like Rocket League or Mario Kart). How do you align the car so its wheels sit flat on the angled ground?" },
            { type: "text", content: "You shoot a raycast down to the floor to get the 'Normal' vector of the triangle (which points straight out of the face). You take the Cross Product of this Normal and the car's Forward vector to find its true Right vector. Then you align the car's rotation to these new axes!" }
          ]
        },
        practice: {
          title: "Calculate Up Vector",
          description: "Use Vector3.Cross.",
          task: "We have two vectors: 'forward' and 'right'. Find the 'up' vector by using `Vector3.Cross(forward, right)`. Note: The order matters in cross products! Cross(A, B) points in the opposite direction of Cross(B, A).",
          starterCode: "using UnityEngine;\n\npublic class GeometryMath : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 forward = new Vector3(0, 0, 1);\n        Vector3 right = new Vector3(1, 0, 0);\n\n        // Calculate the Up vector using Cross Product\n        Vector3 up = \n\n        // Should print (0.0, 1.0, 0.0)\n        Debug.Log(\"Calculated Up Vector: \" + up);\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "math-trigonometry",
        title: "Trigonometry: Aiming and Atan2",
        theory: {
          sections: [
            { type: "heading", content: "Sines and Cosines" },
            { type: "text", content: "Trigonometry is the bridge between angles (degrees/radians) and coordinates (X, Y). If you have an angle and want to know the direction vector, you use Cosine for the X axis, and Sine for the Y axis." },
            { type: "text", content: "`x = radius * cos(angle)` and `y = radius * sin(angle)`. This is how you spawn 12 enemies in a perfect circle around a boss!" },
            { type: "heading", content: "The Magic of Atan2" },
            { type: "text", content: "Often, you have the opposite problem: you know the X and Y coordinates (e.g., the player's mouse position), and you want to find the Angle to rotate a gun to point at it. Standard ArcTangent (`atan`) is broken because it can't distinguish between opposite quadrants (it divides Y by X, losing the minus signs)." },
            { type: "text", content: "Every math library has `Atan2(y, x)`. It safely looks at both coordinates and returns the exact absolute angle in radians." },
            { type: "tip", content: "Resource: Math for Games. Understanding that 180 degrees = PI Radians (3.14...) is crucial. C# `Mathf.Atan2` returns Radians. You must multiply by `Mathf.Rad2Deg` to get degrees for Unity's rotation system." }
          ]
        },
        practice: {
          title: "Aiming a Turret",
          description: "Use Atan2 to find the angle to a target.",
          task: "Calculate the angle from a turret to an enemy. 1. Get the direction vector. 2. Use `Mathf.Atan2(dir.y, dir.x)` to get the angle in radians. 3. Multiply it by `Mathf.Rad2Deg` to convert to degrees.",
          starterCode: "using UnityEngine;\n\npublic class Turret : MonoBehaviour\n{\n    public Transform enemy;\n\n    void Update()\n    {\n        Vector2 dir = enemy.position - transform.position;\n\n        // 1. Calculate the angle using Atan2 (Pass Y first, then X!)\n        float angleRadians = \n        \n        // 2. Convert Radians to Degrees\n        float angleDegrees = \n\n        // Apply rotation to the Z axis (for 2D games)\n        transform.rotation = Quaternion.Euler(0, 0, angleDegrees);\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "math-matrices",
        title: "Matrices: Local vs World Space",
        theory: {
          sections: [
            { type: "heading", content: "Coordinate Spaces" },
            { type: "text", content: "If a player holds a gun, the gun's position relative to the world (World Space) changes every time the player walks. But its position relative to the player's hand (Local Space) is always (0, 0, 0). Tracking complex objects without Local Space is impossible." },
            { type: "heading", content: "Transformation Matrices" },
            { type: "text", content: "How does the engine convert Local coordinates to World coordinates? Using 4x4 Matrices. A single Transformation Matrix stores Position (Translation), Rotation, and Scale. When you multiply a Local point by the object's World Matrix, it instantly translates the point into World Space." },
            { type: "text", content: "In Unity, you rarely write raw matrix multiplication, but you use its wrapper functions: `TransformPoint` (Local to World) and `InverseTransformPoint` (World to Local)." },
            { type: "tip", content: "Resource: Real-Time Rendering (Book). This is the Bible of graphics programming. It dives deep into the MVP matrix (Model-View-Projection) — how vertices in 3D space are multiplied by matrices to ultimately flatten into 2D pixels on your monitor." }
          ]
        },
        practice: {
          title: "World to Local Space",
          description: "Use Matrix math wrappers to find relative positions.",
          task: "A boss has a radar. We need to know where the player is relative to the Boss (e.g., '2 meters to my right'). Use `transform.InverseTransformPoint(player.position)` to convert the player's global coordinates into the boss's local space.",
          starterCode: "using UnityEngine;\n\npublic class BossRadar : MonoBehaviour\n{\n    public Transform player;\n\n    void Update()\n    {\n        // Convert the player's World position into the Boss's Local position\n        Vector3 localPos = \n\n        if (localPos.x > 0) {\n            Debug.Log(\"Player is to my RIGHT\");\n        } else {\n            Debug.Log(\"Player is to my LEFT\");\n        }\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "math-lerp",
        title: "Interpolation (Lerp): Game Polish",
        theory: {
          sections: [
            { type: "heading", content: "The Secret to Game Polish" },
            { type: "text", content: "If you snap a camera directly to a player's new position, the game feels jarring and cheap. Professional games use interpolation to smoothly transition values over time." },
            { type: "heading", content: "Linear Interpolation (Lerp)" },
            { type: "text", content: "Lerp takes three parameters: `start`, `end`, and `t` (a percentage from 0.0 to 1.0). If `start=0`, `end=100`, and `t=0.5`, Lerp returns 50." },
            { type: "code", content: "// Formula: result = a + (b - a) * t\nfloat result = Mathf.Lerp(a, b, t);" },
            { type: "heading", content: "Zeno's Paradox (Smooth Damping)" },
            { type: "text", content: "A very common game dev hack is using `Lerp` inside `Update()` where the 'start' value is constantly updated to the current position. Because it always travels a fraction of the remaining distance, it moves fast at first and slows down as it reaches the target, creating a beautifully smooth ease-out effect." }
          ]
        },
        practice: {
          title: "Smooth Camera Follow",
          description: "Use Lerp to create a professional camera.",
          task: "Inside LateUpdate (best for cameras), use `Vector3.Lerp()`. The start is `transform.position`, the end is `player.position`, and `t` is `speed * Time.deltaTime`.",
          starterCode: "using UnityEngine;\n\npublic class SmoothCamera : MonoBehaviour\n{\n    public Transform player;\n    public float speed = 5f;\n\n    void LateUpdate()\n    {\n        // Smoothly interpolate the camera's position towards the player\n        transform.position = Vector3.Lerp(\n            ,\n            ,\n            \n        );\n    }\n}"
        },
        type: "csharp"
      }
    ]
  },
  RU: {
    title: "Математика для Игр (MUST)",
    description: "Векторы, матрицы, тригонометрия и физика. Перестаньте гадать и поймите, как на самом деле работают игровые движки.",
    lessons: [
      {
        id: "math-vectors-norm",
        title: "Векторы и Проблема Диагонали",
        theory: {
          sections: [
            { type: "heading", content: "Точки против Векторов" },
            { type: "text", content: "В 3D движке всё описывается координатами (X, Y, Z). Но эти числа могут означать две разные вещи. 'Точка' — это конкретное место в мире (Игрок находится на 5, 0, 5). 'Вектор' — это Направление и Длина (Магнитуда). Например, ветер, дующий на север со скоростью 10 м/с — это вектор." },
            { type: "heading", content: "Баг диагонального движения" },
            { type: "text", content: "В старых играх (например, в раннем DOOM) была ошибка. Если нажать 'W' (вперед, вектор 0,1), скорость равна 1. Если нажать 'D' (вправо, вектор 1,0), скорость равна 1." },
            { type: "text", content: "Но если нажать 'W' и 'D' одновременно, вектор становится (1, 1). По теореме Пифагора его длина равна √(1² + 1²) = √2 ≈ 1.41. Игроки, бегущие по диагонали (так называемый Strafe-running), двигались на 41% быстрее! Это классическая ошибка новичка." },
            { type: "heading", content: "Нормализация (Normalization)" },
            { type: "text", content: "Чтобы это исправить, вектор ввода нужно 'Нормализовать'. Нормализация сохраняет идеальное направление вектора, но жестко обрезает его длину до 1.0. Только после этого мы умножаем его на скорость игрока." }
          ]
        },
        practice: {
          title: "Исправь баг диагонали",
          description: "Используйте нормализацию вектора.",
          task: "В Unity C# вы получаете сырой вектор от клавиатуры. Вызовите свойство `.normalized` у вектора ввода `moveInput`, чтобы обрезать его длину до 1. Иначе ваш игрок будет бегать по диагонали слишком быстро!",
          starterCode: "using UnityEngine;\n\npublic class PlayerMove : MonoBehaviour\n{\n    public float speed = 5f;\n\n    void Update()\n    {\n        float x = Input.GetAxisRaw(\"Horizontal\");\n        float y = Input.GetAxisRaw(\"Vertical\");\n\n        Vector2 moveInput = new Vector2(x, y);\n\n        // Исправьте баг +41% скорости, нормализовав вектор!\n        Vector2 movement = \n        \n        transform.Translate(movement * speed * Time.deltaTime);\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "math-dot-product",
        title: "Скалярное произведение (Стелс и Углы)",
        theory: {
          sections: [
            { type: "heading", content: "Магия Dot Product" },
            { type: "text", content: "Скалярное произведение (Dot Product) берет два вектора и возвращает одно число (скаляр). Если оба вектора нормализованы (длина 1), Dot Product возвращает Косинус угла между ними." },
            { type: "list", items: [
              "Возвращает 1: Векторы смотрят ИДЕАЛЬНО в одну сторону.",
              "Возвращает 0: Векторы строго перпендикулярны (90 градусов).",
              "Возвращает -1: Векторы смотрят в противоположные стороны (180 градусов)."
            ]},
            { type: "heading", content: "Применение: Стелс-игры и конусы зрения" },
            { type: "text", content: "Как охранник узнает, видит ли он игрока? Вы вычисляете вектор от охранника к игроку, нормализуете его и берете Скалярное произведение с вектором охранника 'Вперед' (Forward)." },
            { type: "text", content: "Если результат > 0.5 (что по таблице косинусов равно углу меньше 60 градусов в любую сторону), значит игрок попал в 120-градусный конус зрения охранника! Если результат отрицательный, игрок за спиной." },
            { type: "tip", content: "Ресурс: 3Blue1Brown. Зайдите на YouTube и посмотрите плейлист 'Essence of Linear Algebra' (Суть линейной алгебры). Его визуальное объяснение Скалярного произведения — это шедевр, который должен посмотреть каждый геймдев." }
          ]
        },
        practice: {
          title: "Враг смотрит на меня?",
          description: "Вычислите угол обзора через Vector3.Dot.",
          task: "Используйте `Vector3.Dot(a, b)`. Сравните вектор 'Вперед' охранника (`transform.forward`) с направлением на игрока (`dirToPlayer`). Если результат больше 0 (игрок спереди), выведите 'Я тебя вижу!'.",
          starterCode: "using UnityEngine;\n\npublic class Guard : MonoBehaviour\n{\n    public Transform player;\n\n    void Update()\n    {\n        // 1. Получаем направление от стражника к игроку и нормализуем\n        Vector3 dirToPlayer = (player.position - transform.position).normalized;\n\n        // 2. Вычисляем Скалярное произведение (Dot Product)\n        float dot = \n\n        // 3. Если dot > 0, игрок строго спереди (в полусфере зрения)\n        if ( ) {\n            Debug.Log(\"Я тебя вижу!\");\n        }\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "math-cross-product",
        title: "Векторное произведение (Нормали в 3D)",
        theory: {
          sections: [
            { type: "heading", content: "Генерация перпендикуляров" },
            { type: "text", content: "Если Скалярное произведение возвращает число, то Векторное произведение (Cross Product) берет два 3D-вектора и возвращает НОВЫЙ 3D-вектор, который строго перпендикулярен (под 90 градусов) ОБОИМ исходным векторам." },
            { type: "text", content: "Если Вектор А смотрит Вперед, а Вектор Б смотрит Вправо, их Векторное произведение будет смотреть строго Вверх." },
            { type: "heading", content: "Применение: Ориентация по поверхности" },
            { type: "text", content: "Представьте, что вы делаете гонку, где машина ездит по изогнутому ландшафту (или стенам, как в Mario Kart). Как выровнять машину так, чтобы её колеса стояли ровно на земле?" },
            { type: "text", content: "Вы пускаете невидимый луч (Raycast) в землю и получаете 'Нормаль' треугольника (вектор, торчащий строго вверх из полигона земли). Вы берете Векторное произведение этой Нормали и текущего вектора 'Вперед' машины. Это дает вам идеальный новый вектор 'Вправо'. Теперь вы можете выровнять колеса по новым осям!" }
          ]
        },
        practice: {
          title: "Вычисление вектора Up",
          description: "Используйте Vector3.Cross.",
          task: "У нас есть два вектора: 'forward' (вперед) и 'right' (вправо). Найдите вектор 'up' (вверх), используя `Vector3.Cross(forward, right)`. Внимание: порядок в векторном произведении критически важен! Cross(A, B) смотрит в противоположную сторону от Cross(B, A) — 'правило правой руки'.",
          starterCode: "using UnityEngine;\n\npublic class GeometryMath : MonoBehaviour\n{\n    void Start()\n    {\n        Vector3 forward = new Vector3(0, 0, 1);\n        Vector3 right = new Vector3(1, 0, 0);\n\n        // Вычислите вектор Вверх через Векторное произведение (Cross)\n        Vector3 up = \n\n        // Должно вывести (0.0, 1.0, 0.0)\n        Debug.Log(\"Вычисленный вектор Up: \" + up);\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "math-trigonometry",
        title: "Тригонометрия: Прицеливание и Atan2",
        theory: {
          sections: [
            { type: "heading", content: "Синусы и Косинусы" },
            { type: "text", content: "Тригонометрия — это мост между углами (градусы/радианы) и координатами (X, Y). Если вы знаете угол и хотите получить вектор направления, вы используете Косинус для оси X и Синус для оси Y." },
            { type: "text", content: "`x = radius * cos(angle)` и `y = radius * sin(angle)`. Именно так программисты спавнят 12 врагов в идеальный круг вокруг Босса!" },
            { type: "heading", content: "Магия Atan2" },
            { type: "text", content: "Часто возникает обратная задача: вы знаете координаты X и Y (например, позиция мышки игрока), и вам нужно найти УГОЛ, чтобы повернуть дуло танка прямо на мышку. Обычный Арктангенс (`atan`) тут ломается, потому что он делит Y на X и теряет знаки минуса, из-за чего путает лево и право." },
            { type: "text", content: "В любой математической библиотеке (C++, Python, JS) есть функция `Atan2(y, x)`. Она принимает обе координаты отдельно, учитывает все минусы и возвращает идеальный угол в радианах." },
            { type: "tip", content: "Важно: C# функция `Mathf.Atan2` возвращает Радианы (где 180 градусов = число ПИ 3.14). Чтобы Unity смогла повернуть объект, Радианы нужно умножить на константу `Mathf.Rad2Deg`, чтобы перевести их в Градусы." }
          ]
        },
        practice: {
          title: "Наведение Турели",
          description: "Используйте Atan2 для поиска угла к цели.",
          task: "Вычислите угол от турели к врагу. 1. Получите вектор направления. 2. Используйте `Mathf.Atan2(dir.y, dir.x)` для получения радиан (Y передается ПЕРВЫМ!). 3. Умножьте результат на `Mathf.Rad2Deg`, чтобы получить градусы.",
          starterCode: "using UnityEngine;\n\npublic class Turret : MonoBehaviour\n{\n    public Transform enemy;\n\n    void Update()\n    {\n        Vector2 dir = enemy.position - transform.position;\n\n        // 1. Вычисляем угол через Atan2 (Y идет первым параметром!)\n        float angleRadians = \n        \n        // 2. Переводим Радианы в Градусы\n        float angleDegrees = \n\n        // Применяем вращение к оси Z (стандарт для 2D игр)\n        transform.rotation = Quaternion.Euler(0, 0, angleDegrees);\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "math-matrices",
        title: "Матрицы: Мировые и Локальные координаты",
        theory: {
          sections: [
            { type: "heading", content: "Пространства Координат" },
            { type: "text", content: "Если персонаж держит в руках пистолет, позиция пистолета относительно мира (Мировые координаты) меняется каждый кадр, когда игрок бежит. Но позиция пистолета относительно руки персонажа (Локальные координаты) всегда неизменна: (0, 0, 0). Без локальных пространств математика иерархий невозможна." },
            { type: "heading", content: "Матрицы Трансформаций" },
            { type: "text", content: "Как движок переводит Локальные координаты в Мировые? С помощью Матриц 4x4. Одна Матрица Трансформации способна хранить в себе сразу Позицию, Вращение и Масштаб объекта. Когда вы умножаете локальную точку на Мировую Матрицу родителя, точка мгновенно пересчитывается в глобальное пространство." },
            { type: "text", content: "В Unity вам редко придется перемножать матрицы вручную. Для этого есть функции-обертки: `TransformPoint` (из локального в мировое) и `InverseTransformPoint` (из мирового в локальное)." },
            { type: "tip", content: "Ресурс: Книга Real-Time Rendering. Это библия графического программирования. В ней детально разбирается MVP-матрица (Model-View-Projection) — математика того, как трехмерные вершины (вертексы) умножаются на матрицы камер и в итоге 'сплющиваются' в 2D-пиксели на вашем плоском мониторе." }
          ]
        },
        practice: {
          title: "Из Мира в Локаль",
          description: "Используйте матричные функции для поиска относительной позиции.",
          task: "У Босса есть радар. Ему нужно знать, где находится игрок ОТНОСИТЕЛЬНО самого Босса (например, 'В 2 метрах справа от меня'). Используйте метод `transform.InverseTransformPoint(player.position)`, чтобы перевести глобальные координаты игрока в локальное пространство Босса.",
          starterCode: "using UnityEngine;\n\npublic class BossRadar : MonoBehaviour\n{\n    public Transform player;\n\n    void Update()\n    {\n        // Конвертируем Мировую позицию игрока в Локальную позицию Босса\n        Vector3 localPos = \n\n        // Если локальный X положительный, значит игрок справа!\n        if (localPos.x > 0) {\n            Debug.Log(\"Игрок находится СПРАВА от меня\");\n        } else {\n            Debug.Log(\"Игрок находится СЛЕВА от меня\");\n        }\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "math-lerp",
        title: "Интерполяция (Lerp): Магия 'Полировки' игр",
        theory: {
          sections: [
            { type: "heading", content: "Секрет профессиональных игр" },
            { type: "text", content: "Если в игре камера просто 'телепортируется' за спину игроку при движении, игра ощущается дешевой (дерганой). Профессиональные студии используют Интерполяцию для плавного перетекания значений во времени." },
            { type: "heading", content: "Линейная интерполяция (Lerp)" },
            { type: "text", content: "Функция Lerp принимает три параметра: `start`, `end` и `t` (процент от 0.0 до 1.0). Если `start=0`, `end=100`, а `t=0.5` (50%), Lerp вернет 50." },
            { type: "code", content: "// Формула под капотом: result = a + (b - a) * t\nfloat result = Mathf.Lerp(a, b, t);" },
            { type: "heading", content: "Парадокс Зенона (Плавное затухание)" },
            { type: "text", content: "Самый частый хак в геймдеве — это вызов `Lerp` внутри `Update()`, где в качестве 'start' мы передаем ТЕКУЩУЮ позицию. Из-за того, что объект каждый кадр проходит фиксированный процент (например, 10%) от *оставшегося* пути, сначала он движется очень быстро, а при приближении к цели плавно замедляется (Ease-Out эффект). Идеально для камер!" }
          ]
        },
        practice: {
          title: "Плавная камера (Smooth Follow)",
          description: "Используйте Lerp для создания профессиональной камеры.",
          task: "Внутри LateUpdate (лучшее место для кода камер, так как он выполняется после того, как игрок уже сдвинулся в Update) вызовите `Vector3.Lerp()`. Передайте 3 аргумента: `transform.position` (старт), `player.position` (цель) и `speed * Time.deltaTime` (шаг интерполяции).",
          starterCode: "using UnityEngine;\n\npublic class SmoothCamera : MonoBehaviour\n{\n    public Transform player;\n    public float speed = 5f;\n\n    // LateUpdate вызывается после всех Update\n    void LateUpdate()\n    {\n        // Плавно интерполируем позицию камеры к позиции игрока\n        transform.position = Vector3.Lerp(\n            ,\n            ,\n            \n        );\n    }\n}"
        },
        type: "csharp"
      }
    ]
  }
};