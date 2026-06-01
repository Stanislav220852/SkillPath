export const game3dState: Record<'EN' | 'RU', any> = {
  EN: {
    title: "3D Development (CORE)",
    description: "Models, lighting, materials, cameras, and physics. Learn how to build and manipulate 3D worlds from absolute scratch.",
    lessons: [
      {
        id: "3d-meshes-vertices",
        title: "The Illusion of 3D: Vertices and Meshes",
        theory: {
          sections: [
            { type: "heading", content: "There is no 'solid' 3D" },
            { type: "text", content: "In video games, 3D objects aren't solid clay sculptures. They are completely hollow. A 3D model is basically a wireframe tent." },
            { type: "text", content: "Every 3D object is built using three fundamental building blocks:" },
            { type: "list", items: [
              "Vertices (Vertex): A single point in 3D space with an X, Y, and Z coordinate. (The pegs of the tent).",
              "Edges: A straight line connecting two vertices. (The tent poles).",
              "Polygons (Faces): A flat surface formed by connecting 3 or more edges. In modern game engines, ALL polygons are broken down into Triangles. (The fabric of the tent)."
            ]},
            { type: "heading", content: "The Mesh" },
            { type: "text", content: "A collection of these vertices, edges, and triangles is called a 'Mesh'. When you import a character into Unity or Unreal, you are importing a Mesh filter. The more triangles a mesh has (High Poly), the smoother it looks, but the harder your computer has to work to calculate it." },
            { type: "tip", content: "Resource: Blender Guru. As a programmer, you don't need to be a 3D artist, but you MUST understand how models are made. Go to YouTube and watch 'Blender 3.0 Beginner Tutorial' (The Donut Tutorial) by Blender Guru. It will teach you the anatomy of a 3D mesh better than any programming book." }
          ]
        },
        practice: {
          title: "Moving in 3D Space",
          description: "Manipulate a 3D object's position.",
          task: "In 2D we used Vector2. In 3D, we use Vector3(x, y, z). Modify the transform.position of the object. Move it 5 units to the Right (X), 0 units Up (Y), and 10 units Forward (Z) into the screen.",
          starterCode: "using UnityEngine;\n\npublic class Move3D : MonoBehaviour\n{\n    void Start()\n    {\n        // A Vector3 requires 3 floating point numbers: X, Y, Z\n        // X = Left/Right, Y = Up/Down, Z = Forward/Backward\n        \n        Vector3 newPosition = new Vector3( , , );\n        transform.position = newPosition;\n        \n        Debug.Log(\"Object moved to 3D coordinates: \" + transform.position);\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "3d-materials-pbr",
        title: "Materials, Shaders & PBR",
        theory: {
          sections: [
            { type: "heading", content: "The Skin of the Model" },
            { type: "text", content: "A raw Mesh is invisible. To see it, you must apply a Material. But beginners often confuse Materials and Shaders. Here is the difference:" },
            { type: "list", items: [
              "Shader: A mathematical program written for the Graphics Card (GPU). It contains the math formulas dictating HOW light should bounce off an object.",
              "Material: An 'instance' of a Shader. It is just a configuration file (a list of settings, colors, and textures) that feeds data into the Shader."
            ]},
            { type: "heading", content: "PBR (Physically Based Rendering)" },
            { type: "text", content: "Before PBR, artists 'painted' shadows and highlights directly onto textures. It looked fake if the lighting changed. PBR changed the industry. It uses real physics formulas to simulate light. A standard PBR material requires several texture maps:" },
            { type: "list", items: [
              "Albedo (Base Color): The pure color of the object, with no shadows or highlights baked in.",
              "Metallic: A grayscale map. White (1) means the object is a metal, Black (0) means it's a dielectric (wood, plastic).",
              "Smoothness / Roughness: Determines if the surface is a mirror-like puddle (smooth) or rough concrete (blurry reflections).",
              "Normal Map: A magical blue/purple texture that fakes 3D bumps, scratches, and details WITHOUT adding any actual geometry/polygons to the mesh!"
            ]},
            { type: "tip", content: "Resource: Unreal Engine Docs. Epic Games (creators of Unreal) heavily pioneered PBR. Reading the 'Physically Based Materials' section in the Unreal Engine documentation will give you a PhD-level understanding of how light interacts with virtual surfaces." }
          ]
        },
        practice: {
          title: "Changing Color via Code",
          description: "Access a Material's Albedo color.",
          task: "In Unity, a MeshRenderer component holds the Material. We want to change the object's color to Red at runtime. Access the `material.color` property of the `meshRenderer` and assign `Color.red` to it.",
          starterCode: "using UnityEngine;\n\npublic class ColorChanger : MonoBehaviour\n{\n    private MeshRenderer meshRenderer;\n\n    void Start()\n    {\n        // Grab the MeshRenderer component\n        meshRenderer = GetComponent<MeshRenderer>();\n\n        // Change the main color (Albedo) of the material to Red\n        meshRenderer.material.color = \n        \n        Debug.Log(\"Material color changed!\");\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "3d-lighting",
        title: "Painting with Light: Realtime vs Baked",
        theory: {
          sections: [
            { type: "heading", content: "Types of Lights" },
            { type: "text", content: "Without light, a 3D scene is pitch black. Game engines simulate light using a few basic types:" },
            { type: "list", items: [
              "Directional Light: Represents the Sun. It is infinitely far away. It doesn't matter where you place it in the level; only its Rotation matters. All shadows fall in the exact same parallel direction.",
              "Point Light: Represents a lightbulb. It emits light in all directions from a specific point, and the light fades out (attenuates) over distance.",
              "Spot Light: Represents a flashlight or car headlight. It emits light in a cone shape."
            ]},
            { type: "heading", content: "The Performance Cost: Baked Lighting" },
            { type: "text", content: "Calculating shadows for every object 60 times a second (Realtime Lighting) is extremely heavy on the CPU/GPU. If your game runs on a mobile phone, real-time shadows might crash it." },
            { type: "text", content: "The solution is 'Baking'. The engine calculates the complex lighting and shadows ONCE while you are in the editor. It then 'paints' these shadows into a hidden texture called a Lightmap, and wraps it around your models. The game renders instantly, but you cannot move baked lights or baked objects during gameplay!" }
          ]
        },
        practice: {
          title: "Flickering Light",
          description: "Manipulate a Light component in real-time.",
          task: "We have a Point Light representing a broken lamp. In the Update loop, we want to randomize its intensity to make it flicker. Assign a random value between 0.5 and 2.0 to `myLight.intensity` using `Random.Range(min, max)`.",
          starterCode: "using UnityEngine;\n\npublic class BrokenLamp : MonoBehaviour\n{\n    private Light myLight;\n\n    void Start()\n    {\n        myLight = GetComponent<Light>();\n    }\n\n    void Update()\n    {\n        // Generate a random float between 0.5f and 2.0f\n        // and assign it to the light's intensity\n        myLight.intensity = \n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "3d-cameras",
        title: "The Player's Eyes: Cameras & FOV",
        theory: {
          sections: [
            { type: "heading", content: "What is a Camera?" },
            { type: "text", content: "In reality, a camera captures light. In 3D engines, a Camera shoots invisible rays from a point to determine which 3D objects should be drawn (rendered) onto your 2D flat monitor." },
            { type: "heading", content: "Perspective vs Orthographic" },
            { type: "list", items: [
              "Perspective: Mimics the human eye. Objects further away look smaller. Lines converge at a vanishing point. Used in 99% of 3D games (FPS, RPGs).",
              "Orthographic: No depth distortion. A 1-meter cube looks exactly the same size whether it's 1 meter away or 1000 meters away. Used in isometric games (like Diablo, SimCity) or 2D games."
            ]},
            { type: "heading", content: "Field of View (FOV) and Clipping" },
            { type: "text", content: "FOV is the angle of the camera's vision. A high FOV (110 degrees) creates a 'fish-eye' effect where things seem faster, popular in eSports. A low FOV (20 degrees) creates a 'sniper scope' zoom effect." },
            { type: "text", content: "Clipping Planes (Near and Far) define the minimum and maximum distance the camera can see. If you've ever played an old game where mountains pop out of thin air in the distance, it's because they just entered the Far Clipping Plane!" }
          ]
        },
        practice: {
          title: "Sniper Scope Zoom",
          description: "Modify the Camera's Field of View dynamically.",
          task: "We want to simulate aiming down a sniper sight when holding the Right Mouse Button. If true, set `mainCam.fieldOfView` to 20 (zoomed in). Otherwise, set it back to the normal 60.",
          starterCode: "using UnityEngine;\n\npublic class SniperAim : MonoBehaviour\n{\n    private Camera mainCam;\n\n    void Start() {\n        mainCam = Camera.main; // Gets the main camera in the scene\n    }\n\n    void Update()\n    {\n        // Input.GetMouseButton(1) means Right-Click is being held down\n        if (Input.GetMouseButton(1))\n        {\n            // Zoom IN (Narrow FOV)\n            \n        }\n        else\n        {\n            // Normal View (Standard FOV)\n            \n        }\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "3d-physics-colliders",
        title: "3D Physics: Invisible Shells",
        theory: {
          sections: [
            { type: "heading", content: "Never use the Mesh for Physics!" },
            { type: "text", content: "Imagine a 3D model of a dragon with 100,000 triangles. If the physics engine had to calculate collisions for every single triangle against the floor every frame, your CPU would melt." },
            { type: "text", content: "Instead, we use 'Primitive Colliders'. We put a simple invisible mathematical shape around the dragon. To the physics engine, the highly detailed dragon is just a floating Capsule." },
            { type: "heading", content: "Types of Colliders" },
            { type: "list", items: [
              "Primitive Colliders (Box, Sphere, Capsule): Mathematically perfect, extremely cheap to calculate. You should use these 95% of the time. The player character is almost always a Capsule.",
              "Mesh Collider: An exact replica of the 3D model. Extremely expensive. Only use this for static, complex terrain (like a rocky mountain) that the player walks on. Never put a Mesh Collider on a moving object!"
            ]},
            { type: "heading", content: "Raycasting in 3D" },
            { type: "text", content: "Raycasting (shooting an invisible laser) is used for everything in 3D: from checking if the player is standing on the ground, to shooting guns. When you shoot a gun in Call of Duty, it doesn't spawn a bullet object; it just shoots an instant infinite Raycast from the camera center and asks the physics engine: 'Did this line hit a Capsule Collider?'" }
          ]
        },
        practice: {
          title: "Shooting a Laser (Raycast)",
          description: "Use Physics.Raycast to detect objects.",
          task: "Write a Physics.Raycast that shoots from the object's position (transform.position) in the forward direction (transform.forward). Store the result in the 'hit' variable using the 'out' keyword. The max distance is 100f.",
          starterCode: "using UnityEngine;\n\npublic class RaycastShooter : MonoBehaviour\n{\n    void Update()\n    {\n        if (Input.GetKeyDown(KeyCode.Mouse0)) // Left Click\n        {\n            RaycastHit hit;\n            \n            // Shoot a ray forward, max distance 100 units.\n            // Syntax: Physics.Raycast(origin, direction, out hitInfo, maxDistance)\n            if (Physics.Raycast( , , out hit, 100f))\n            {\n                Debug.Log(\"I shot a laser and hit: \" + hit.collider.name);\n            }\n        }\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "3d-quaternions",
        title: "The Nightmare of 3D Math: Quaternions",
        theory: {
          sections: [
            { type: "heading", content: "The Problem with Euler Angles" },
            { type: "text", content: "In 2D, rotation was easy: just a single number (degrees). In 3D, you have three axes of rotation: X (Pitch), Y (Yaw), and Z (Roll). These are called Euler angles." },
            { type: "text", content: "But Euler angles have a fatal flaw called Gimbal Lock. Because the engine rotates axes sequentially (e.g., Z then X then Y), if two axes perfectly align, you lose a degree of freedom. Your object will completely lock up or spin wildly uncontrollably." },
            { type: "heading", content: "The Savior: Quaternions" },
            { type: "text", content: "To solve Gimbal Lock, 3D engines use Quaternions. A Quaternion is a 4-dimensional complex number (X, Y, Z, W). It doesn't suffer from Gimbal Lock and interpolates smoothly." },
            { type: "text", content: "Golden Rule for Beginners: NEVER try to modify `transform.rotation.x` directly. You are not smart enough to do 4D math in your head. Instead, use the helper function `Quaternion.Euler(x, y, z)` which takes normal human degrees and safely converts them into a 4D Quaternion for the engine." }
          ]
        },
        practice: {
          title: "Safe 3D Rotation",
          description: "Rotate an object using Quaternions.",
          task: "We want to rotate a door exactly 90 degrees on the Y-axis. Do not try to modify rotation.y. Instead, assign `Quaternion.Euler(0, 90, 0)` to `transform.rotation`.",
          starterCode: "using UnityEngine;\n\npublic class DoorOpener : MonoBehaviour\n{\n    public void OpenDoor()\n    {\n        // Safely rotate the object by providing Euler angles (degrees)\n        // which the engine converts to a Quaternion.\n        transform.rotation = \n        \n        Debug.Log(\"Door opened 90 degrees safely!\");\n    }\n}"
        },
        type: "csharp"
      }
    ]
  },
  RU: {
    title: "3D разработка (CORE)",
    description: "Модели, освещение, материалы, камеры и физика. Изучите анатомию 3D миров с абсолютного нуля.",
    lessons: [
      {
        id: "3d-meshes-vertices",
        title: "Иллюзия объема: Вертексы и Меши",
        theory: {
          sections: [
            { type: "heading", content: "Твердых объектов не существует" },
            { type: "text", content: "В видеоиграх 3D-модели — это не монолитные куски глины. Они абсолютно пустые внутри. 3D-модель — это, по сути, палатка, состоящая из каркаса и натянутой на него ткани." },
            { type: "text", content: "Любой 3D объект состоит из трех фундаментальных строительных блоков:" },
            { type: "list", items: [
              "Вертексы (Vertices / Вершины): Одиночная точка в 3D пространстве с координатами X, Y, Z. (Колышки от палатки).",
              "Рёбра (Edges): Прямая линия, соединяющая два вертекса. (Каркасные трубки палатки).",
              "Полигоны / Фейсы (Polygons / Faces): Плоская поверхность, образованная соединением 3 или более ребер. В современных игровых движках АБСОЛЮТНО ВСЕ полигоны разбиваются на Треугольники. (Ткань палатки)."
            ]},
            { type: "heading", content: "Понятие Меша (Mesh)" },
            { type: "text", content: "Вся эта коллекция вертексов, ребер и треугольников называется Мешем (Mesh - 'Сетка'). Когда вы импортируете персонажа в Unity, вы импортируете именно математическую сетку. Чем больше треугольников (High Poly), тем более гладким выглядит объект, но тем сильнее будет 'кипеть' видеокарта (GPU) игрока." },
            { type: "tip", content: "Ресурс: Blender Guru (YouTube). Программист не обязан быть 3D-художником. Но вы ОБЯЗАНЫ понимать, из чего состоят модели. Посмотрите легендарный 'Donut Tutorial' (Туториал по созданию Пончика) от Blender Guru. За пару часов вы поймете анатомию 3D-сеток лучше, чем из любых книг по геймдеву." }
          ]
        },
        practice: {
          title: "Перемещение в 3D Пространстве",
          description: "Управление позицией объекта по трем осям.",
          task: "В 2D мы использовали Vector2. В 3D появляется глубина, поэтому мы используем Vector3(x, y, z). Измените позицию объекта (transform.position). Переместите его на 5 метров Вправо (X), 0 метров Вверх (Y) и 10 метров Вперед (Z - вглубь экрана).",
          starterCode: "using UnityEngine;\n\npublic class Move3D : MonoBehaviour\n{\n    void Start()\n    {\n        // Vector3 требует 3 числа с плавающей точкой (float): X, Y, Z\n        // X = Влево/Вправо, Y = Вниз/Вверх, Z = Назад/Вперед (Глубина)\n        \n        Vector3 newPosition = new Vector3( , , );\n        transform.position = newPosition;\n        \n        Debug.Log(\"Объект перемещен в 3D координаты: \" + transform.position);\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "3d-materials-pbr",
        title: "Материалы, Шейдеры и PBR-физика",
        theory: {
          sections: [
            { type: "heading", content: "Натягиваем кожу на каркас" },
            { type: "text", content: "Голый Меш (каркас из первого урока) абсолютно невидим. Чтобы его увидеть, нужно применить к нему Материал. Новички часто путают Шейдеры и Материалы. Вот в чем разница:" },
            { type: "list", items: [
              "Шейдер (Shader): Это математическая мини-программа, написанная специально для видеокарты (GPU). В ней хранятся формулы того, КАК ИМЕННО свет должен отскакивать от объекта.",
              "Материал (Material): Это просто 'файл настроек'. Экземпляр шейдера. Вы не пишете код в Материале, вы просто вставляете туда картинки (текстуры) и выбираете цвета, которые потом передаются в Шейдер."
            ]},
            { type: "heading", content: "PBR (Физически корректный рендеринг)" },
            { type: "text", content: "До появления PBR художники 'рисовали' тени и блики прямо на текстурах красками. Это выглядело фальшиво, если персонаж заходил в темную комнату. PBR изменил всё. Это стандарт индустрии, который использует реальные законы физики света. Стандартный PBR-материал требует набора текстур (карт):" },
            { type: "list", items: [
              "Albedo (Base Color): Чистый цвет объекта без нарисованных теней и бликов.",
              "Metallic (Металличность): Черно-белая картинка. Белый цвет (1) значит, что деталь — это металл. Черный (0) — что это диэлектрик (пластик, дерево, кожа).",
              "Smoothness / Roughness (Шероховатость): Определяет, будет ли поверхность отражать мир как идеальное зеркало (лужа) или рассеивать свет как шершавый бетон.",
              "Normal Map (Карта Нормалей): Магическая фиолетовая текстура. Она обманывает свет, создавая иллюзию 3D-выпуклостей, царапин и трещин на абсолютно плоском полигоне, экономя ресурсы компьютера!"
            ]},
            { type: "tip", content: "Ресурс: Документация Unreal Engine. Epic Games (создатели Unreal) были пионерами PBR. Обязательно прочитайте их раздел 'Physically Based Materials'. Это даст вам университетское понимание взаимодействия света с виртуальными поверхностями." }
          ]
        },
        practice: {
          title: "Изменение Цвета из Кода",
          description: "Получите доступ к Материалу объекта.",
          task: "В Unity компонент `MeshRenderer` хранит в себе Материалы объекта. Мы хотим во время игры перекрасить объект в красный цвет. Обратитесь к свойству `material.color` у `meshRenderer` и присвойте ему значение `Color.red`.",
          starterCode: "using UnityEngine;\n\npublic class ColorChanger : MonoBehaviour\n{\n    private MeshRenderer meshRenderer;\n\n    void Start()\n    {\n        // Захватываем компонент MeshRenderer\n        meshRenderer = GetComponent<MeshRenderer>();\n\n        // Изменяем главный цвет (Albedo) материала на Красный\n        meshRenderer.material.color = \n        \n        Debug.Log(\"Цвет материала успешно изменен!\");\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "3d-lighting",
        title: "Рисуем Светом: Realtime против Baked",
        theory: {
          sections: [
            { type: "heading", content: "Типы источников света" },
            { type: "text", content: "Без света ваша 3D-сцена — это черный квадрат. Игровые движки симулируют свет несколькими базовыми объектами:" },
            { type: "list", items: [
              "Directional Light (Направленный): Имитирует Солнце. Он находится бесконечно далеко. Неважно, куда вы его поставите, важен только его Угол наклона (Вращение). Все тени падают строго параллельно.",
              "Point Light (Точечный): Имитирует лампочку. Светит во все стороны из одной точки, затухая на расстоянии.",
              "Spot Light (Прожектор): Имитирует фонарик, фары машины или свет на театральной сцене. Светит конусом."
            ]},
            { type: "heading", content: "Цена производительности: Запекание света (Baking)" },
            { type: "text", content: "Вычисление того, как свет отскакивает от стен, и отрисовка динамических теней 60 раз в секунду (Real-time Lighting) — это самая тяжелая задача для видеокарты. Если вы делаете игру для мобильных телефонов (или VR), тени в реальном времени убьют FPS." },
            { type: "text", content: "Решение — Запекание (Baking). Вы нажимаете кнопку в редакторе, и движок часами высчитывает идеальный фотореалистичный свет с отражениями. Затем он сохраняет эти тени как обычные картинки (Lightmaps) и накладывает их на стены поверх материалов! В самой игре свет больше не вычисляется — он 'нарисован'. Минус: вы больше не можете выключить лампочку или сдвинуть стену во время игры." }
          ]
        },
        practice: {
          title: "Мерцающая лампочка",
          description: "Динамическое управление светом.",
          task: "У нас есть Point Light, играющий роль сломанной лампочки. В цикле Update мы хотим каждый кадр менять её яркость. Присвойте свойству `myLight.intensity` случайное значение от 0.5 до 2.0, используя генератор `Random.Range(min, max)`.",
          starterCode: "using UnityEngine;\n\npublic class BrokenLamp : MonoBehaviour\n{\n    private Light myLight;\n\n    void Start()\n    {\n        myLight = GetComponent<Light>();\n    }\n\n    void Update()\n    {\n        // Генерируем случайное число (float) от 0.5f до 2.0f \n        // и присваиваем его интенсивности света\n        myLight.intensity = \n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "3d-cameras",
        title: "Глаза Игрока: Камеры, Перспектива и FOV",
        theory: {
          sections: [
            { type: "heading", content: "Что такое Камера?" },
            { type: "text", content: "В реальности камера улавливает летящие в неё фотоны света. В 3D-движках Камера делает обратное: она 'выстреливает' лучами в 3D мир, собирает цвета с полигонов и сплющивает их, чтобы нарисовать на вашем плоском 2D мониторе." },
            { type: "heading", content: "Perspective против Orthographic" },
            { type: "list", items: [
              "Perspective (Перспективная): Имитирует глаз человека. Чем дальше объект, тем он меньше. Параллельные рельсы сходятся в точку на горизонте. Используется в 99% 3D игр (Шутеры, RPG).",
              "Orthographic (Ортографическая): Без искажения глубины. Куб размером 1 метр будет занимать одинаковое количество пикселей на экране, неважно, стоит он перед носом или в километре. Используется в изометрических стратегиях (SimCity, Diablo, Factorio) и 2D играх."
            ]},
            { type: "heading", content: "Угол обзора (FOV) и Отсечение (Clipping)" },
            { type: "text", content: "Field of View (FOV) — это ширина обзора. Высокий FOV (110 градусов) дает эффект 'рыбьего глаза', объекты по бокам растягиваются, создавая иллюзию огромной скорости бега (популярно в киберспорте). Низкий FOV (20 градусов) дает эффект 'приближения' в снайперском прицеле." },
            { type: "text", content: "Плоскости отсечения (Near и Far Clipping Planes) — это дальность прорисовки. Если вы играли в старые игры и видели, как горы вдали 'появляются из воздуха' по мере приближения к ним — это значит, они только что вошли в зону Far Clipping Plane вашей камеры!" }
          ]
        },
        practice: {
          title: "Снайперский Прицел",
          description: "Динамическое изменение FOV камеры.",
          task: "Мы симулируем прицеливание из снайперской винтовки. Если нажата правая кнопка мыши (Input.GetMouseButton(1) вернет true), измените `mainCam.fieldOfView` на 20 (Приближение). В блоке `else` (кнопка отпущена) верните стандартный FOV, равный 60.",
          starterCode: "using UnityEngine;\n\npublic class SniperAim : MonoBehaviour\n{\n    private Camera mainCam;\n\n    void Start() {\n        mainCam = Camera.main; // Получаем главную камеру сцены\n    }\n\n    void Update()\n    {\n        // Если Правая кнопка мыши ЗАЖАТА\n        if (Input.GetMouseButton(1))\n        {\n            // Zoom IN (Узкий угол обзора)\n            \n        }\n        else\n        {\n            // Обычный вид (Стандартный угол обзора)\n            \n        }\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "3d-physics-colliders",
        title: "3D Физика: Невидимые капсулы",
        theory: {
          sections: [
            { type: "heading", content: "Никогда не используйте Mesh для физики!" },
            { type: "text", content: "У вас есть высокополигональная 3D-модель Дракона, состоящая из 100 000 треугольников. Если физическому движку придется проверять столкновения КАЖДОГО из этих треугольников со стенами замка 60 раз в секунду, ваш процессор просто взорвется. Игра зависнет." },
            { type: "text", content: "Поэтому для графики мы используем тяжелый Mesh, а для физики мы используем 'Примитивные Коллайдеры'. Мы обертываем Дракона невидимой математической фигурой. Для физического движка детализированный Дракон — это просто летающая Капсула." },
            { type: "heading", content: "Типы Коллайдеров" },
            { type: "list", items: [
              "Primitive Colliders (Box, Sphere, Capsule): Математически идеальны. Их расчет занимает доли миллисекунды. Игрок (Player) в 95% игр — это Capsule Collider.",
              "Mesh Collider: Полная копия 3D модели. Невероятно тяжелая для процессора. Используется ИСКЛЮЧИТЕЛЬНО для статического, сложного рельефа (горы, кривой пол), по которому должен ходить игрок. Никогда не вешайте Mesh Collider на движущиеся объекты (машины, мечи)!"
            ]},
            { type: "heading", content: "Raycasting (Стрельба лазерами)" },
            { type: "text", content: "Рейкаст (Raycast) — это невидимый математический луч, который движок пускает в пространство. Он используется везде: чтобы проверить, стоит ли персонаж на земле, или для стрельбы. Когда вы стреляете из автомата в Call of Duty, игра не спавнит 3D-модельку пули, летящую вперед (это медленно). Игра пускает мгновенный бесконечный луч из центра камеры и спрашивает движок: 'Этот луч пересекся с чьей-то Капсулой?' (Hitscan)." }
          ]
        },
        practice: {
          title: "Стрельба Рейкастом (Hitscan)",
          description: "Используйте Physics.Raycast для обнаружения целей.",
          task: "Напишите вызов `Physics.Raycast`. Луч должен вылетать из центра объекта (`transform.position`) в направлении вперед (`transform.forward`). Результат попадания нужно сохранить в переменную `hit` (через ключевое слово `out`). Максимальная дистанция луча — 100 метров (`100f`).",
          starterCode: "using UnityEngine;\n\npublic class RaycastShooter : MonoBehaviour\n{\n    void Update()\n    {\n        if (Input.GetKeyDown(KeyCode.Mouse0)) // ЛКМ\n        {\n            RaycastHit hit;\n            \n            // Стреляем лучом вперед на 100 метров\n            // Синтаксис: Physics.Raycast(старт, направление, out куда_сохранить, макс_дистанция)\n            if (Physics.Raycast( , , out hit, 100f))\n            {\n                Debug.Log(\"Пиф-паф! Я попал в объект с именем: \" + hit.collider.name);\n            }\n        }\n    }\n}"
        },
        type: "csharp"
      },
      {
        id: "3d-quaternions",
        title: "Кошмар 3D Математики: Кватернионы",
        theory: {
          sections: [
            { type: "heading", content: "Проблема Углов Эйлера" },
            { type: "text", content: "В 2D-играх вращение было простым: всего одно число (градусы поворота). В 3D у вас три оси вращения: X (Pitch - Тангаж), Y (Yaw - Рыскание) и Z (Roll - Крен). Это называется Углами Эйлера (Euler angles)." },
            { type: "text", content: "Но у углов Эйлера есть фатальный недостаток — 'Шарнирный замок' (Gimbal Lock). Так как движок вращает оси последовательно (например, сначала Z, потом X, потом Y), если две оси идеально совпадут друг с другом, вы теряете одну степень свободы. Система заблокируется, и ваш космический корабль начнет бешено и неконтролируемо вращаться." },
            { type: "heading", content: "Спаситель: Кватернионы (Quaternions)" },
            { type: "text", content: "Чтобы избежать шарнирного замка, все 3D движки под капотом используют Кватернионы. Кватернион — это 4-мерное комплексное число (X, Y, Z, W). Он математически идеален и позволяет плавно вращать объекты." },
            { type: "text", content: "Золотое правило новичка: НИКОГДА не пытайтесь изменить свойство `transform.rotation.x` напрямую. Вы не математик из NASA, чтобы в уме оперировать четырехмерным пространством. Вместо этого используйте функцию-помощника `Quaternion.Euler(x, y, z)`, которая берет понятные человеку градусы и сама конвертирует их в 4D Кватернион для движка." }
          ]
        },
        practice: {
          title: "Безопасное вращение",
          description: "Используйте Кватернионы для изменения поворота.",
          task: "Мы хотим повернуть дверь ровно на 90 градусов по оси Y (открыть её). Не пытайтесь трогать rotation.y напрямую. Вместо этого присвойте переменной `transform.rotation` результат вызова функции `Quaternion.Euler(0, 90, 0)`.",
          starterCode: "using UnityEngine;\n\npublic class DoorOpener : MonoBehaviour\n{\n    public void OpenDoor()\n    {\n        // Безопасно поворачиваем объект, передавая углы Эйлера (в градусах)\n        // в конвертер, который выдаст правильный Кватернион.\n        transform.rotation = \n        \n        Debug.Log(\"Дверь безопасно открылась на 90 градусов!\");\n    }\n}"
        },
        type: "csharp"
      }
    ]
  }
};