export const shadersGraphicsState: Record<'EN' | 'RU', any> = {
  EN: {
    title: "Shaders & Graphics (PRO)",
    description: "HLSL/GLSL, Shader Graph, and Post-processing. Master the GPU and create breathtaking visual effects.",
    lessons: [
      {
        id: "shader-cpu-vs-gpu",
        title: "The Brain vs The Army: CPU and GPU",
        theory: {
          sections: [
            { type: "heading", content: "What is a Shader?" },
            { type: "text", content: "A shader is simply a tiny program. But unlike your C# scripts, it doesn't run on the CPU; it runs on the GPU (Graphics Processing Unit). To write shaders, you must understand how a GPU thinks." },
            { type: "heading", content: "The Professor and the Army" },
            { type: "text", content: "Think of the CPU as a brilliant Mathematics Professor. They can solve incredibly complex logic, but they can only solve one or two problems at a time (Sequential processing)." },
            { type: "text", content: "The GPU is an army of 10,000 blindfolded workers. They are not very smart, but they work simultaneously (Parallel processing). If you have a 4K monitor (8 million pixels), the CPU would take forever to color them one by one. The GPU assigns one pixel to each worker, and they paint the entire screen in 1 millisecond!" },
            { type: "heading", content: "The Blindfold Problem" },
            { type: "text", content: "Because the workers are blindfolded, Pixel A has no idea what color Pixel B is. A shader program must be written in a way that it calculates the color using only math and its own coordinates, without relying on its neighbors." },
            { type: "tip", content: "Resource: 'The Book of Shaders' by Patricio Gonzalez Vivo. This is the absolute Bible for beginners. It beautifully explains this 'blind worker' philosophy and teaches you how to draw complex shapes using only pure math." }
          ]
        },
        practice: {
          title: "Your First Shader Logic",
          description: "Think in parallel.",
          task: "This is a conceptual GLSL task. We want to output a solid Red color for every pixel. In GLSL, colors are represented as a `vec4` (Red, Green, Blue, Alpha), where values go from 0.0 to 1.0. Complete the return statement to output pure Red.",
          starterCode: "// GLSL Shader Language\n\nvoid main() {\n    // Output is a vec4(R, G, B, A)\n    // We want pure Red, 100% opaque.\n    \n    gl_FragColor = vec4( , , , );\n}"
        },
        type: "glsl"
      },
      {
        id: "shader-pipeline",
        title: "The Graphics Pipeline: Vertex & Fragment",
        theory: {
          sections: [
            { type: "heading", content: "The Journey of a 3D Model" },
            { type: "text", content: "How does a 3D mesh become 2D pixels on your monitor? It passes through the Graphics Pipeline. You, as a shader programmer, can write code for two specific stages of this pipeline." },
            { type: "list", items: [
              "1. Vertex Shader: This program runs once for every Vertex (point) on your 3D model. Its main job is to multiply the 3D local coordinates by the Camera's Matrix, flattening them into 2D screen space. It moves the 'tent pegs'.",
              "2. Rasterization: The GPU automatically connects the vertices into triangles and fills the space between them with pixels.",
              "3. Fragment (Pixel) Shader: This program runs once for every Pixel inside those triangles. Its job is to determine the final Color of that pixel. It paints the 'tent fabric'."
            ]},
            { type: "heading", content: "Passing Data" },
            { type: "text", content: "The Vertex shader runs first. If it reads the lighting data or the UV coordinates, it packages them into a struct and passes them down the pipeline to the Fragment shader." },
            { type: "tip", content: "Resource: Catlike Coding. Jasper Flick's Unity tutorials on 'Rendering' are legendary. He will take you step-by-step through writing your own rendering pipeline from scratch. It is university-level material simplified for game devs." }
          ]
        },
        practice: {
          title: "The Vertex Shader",
          description: "Transform 3D space to Screen Space.",
          task: "In Unity (HLSL), a vertex shader must output the position on the screen. To do this, we multiply the vertex's object position by a built-in matrix called `UNITY_MATRIX_MVP` (Model-View-Projection). Write this multiplication.",
          starterCode: "// HLSL Unity Vertex Shader\n\nfloat4 vert(float4 vertex_position : POSITION) : SV_POSITION\n{\n    // Multiply the matrix by the vertex position to flatten it to 2D screen space\n    float4 screen_position = mul( , );\n    \n    return screen_position;\n}"
        },
        type: "glsl"
      },
      {
        id: "shader-uv-coords",
        title: "UV Coordinates & Textures",
        theory: {
          sections: [
            { type: "heading", content: "Wrapping Paper" },
            { type: "text", content: "If you have a 2D image of a brick wall and a 3D cube, how does the GPU know which part of the image goes on which side of the cube? This is solved by UV Coordinates." },
            { type: "text", content: "U is the horizontal axis (X), and V is the vertical axis (Y) of the 2D image. UV coordinates always range from 0.0 to 1.0. (0,0 is the bottom-left corner of the image, 1,1 is the top-right)." },
            { type: "heading", content: "Sampling a Texture" },
            { type: "text", content: "In the Fragment Shader, you use a function called `tex2D` (or `texture` in GLSL). You pass it the image (Sampler2D) and the UV coordinates. It returns the exact color of the pixel at those coordinates." },
            { type: "heading", content: "Manipulating UVs" },
            { type: "text", content: "Because UVs are just math (0.0 to 1.0), you can change them before sampling! If you add time to the U coordinate (`uv.x += _Time.y`), the texture will infinitely scroll horizontally (perfect for conveyor belts or flowing water)!" }
          ]
        },
        practice: {
          title: "Texture Tiling",
          description: "Multiply UVs to repeat a texture.",
          task: "If you multiply UV coordinates by 2.0, they will go from 0.0 to 2.0. The GPU will wrap them around (0->1, 0->1), causing the texture to tile (repeat) twice! Multiply the `uv` variable by 2.0.",
          starterCode: "sampler2D _MainTex;\nfloat2 uv;\n\nfloat4 frag() : SV_Target\n{\n    // 1. Multiply the uv coordinates by 2.0 to tile the texture\n    float2 tiled_uv = \n    \n    // 2. Read the color from the texture at the new coordinates\n    float4 color = tex2D(_MainTex, tiled_uv);\n    \n    return color;\n}"
        },
        type: "glsl"
      },
      {
        id: "shader-time-math",
        title: "Breathing Life: _Time and Math",
        theory: {
          sections: [
            { type: "heading", content: "Shaders have no Update() loop" },
            { type: "text", content: "In C#, you animate things in the `Update()` method using `Time.deltaTime`. Shaders don't have this. Instead, the engine provides a global variable, usually called `_Time`, which constantly increases as the game runs." },
            { type: "heading", content: "Sine and Cosine" },
            { type: "text", content: "If you just add `_Time` to a value, it will grow infinitely. To create animations that loop (like a glowing magical sword or breathing), you pass `_Time` into the `sin()` function." },
            { type: "text", content: "The Sine wave takes any constantly growing number and turns it into a smooth curve that oscillates strictly between -1.0 and 1.0. This is the heartbeat of all shader animations." },
            { type: "heading", content: "Vertex Displacement" },
            { type: "text", content: "If you use `sin(_Time.y)` in the Fragment shader, colors will pulse. But if you use it in the Vertex shader, you can physically move the vertices of the mesh up and down! This is exactly how flags wave in the wind and ocean waves move in video games." },
            { type: "tip", content: "Resource: Ronja Shader Tutorials. If you want to learn how to create specific effects (like Water, Holograms, Toon Shading), Ronja's tutorials provide the best, easy-to-read code snippets for Unity." }
          ]
        },
        practice: {
          title: "Pulsing Glow",
          description: "Use sin() to animate colors.",
          task: "We want an object to pulse between Black (0) and Red (1). The `sin(_Time.y)` goes from -1 to 1. To make it go from 0 to 1, we use a math trick: multiply the sine by 0.5, then add 0.5. Apply this formula to the red channel.",
          starterCode: "// Fragment Shader\nfloat _TimeY; // Provided by the engine\n\nfloat4 frag() : SV_Target\n{\n    // 1. Calculate a value that oscillates between 0.0 and 1.0\n    float pulse = (sin(_TimeY) * 0.5) + 0.5;\n    \n    // 2. Apply it to the Red channel (R, G, B, A)\n    float4 finalColor = vec4( , 0.0, 0.0, 1.0);\n    \n    return finalColor;\n}"
        },
        type: "glsl"
      },
      {
        id: "shader-graph",
        title: "Visual Scripting: Shader Graph",
        theory: {
          sections: [
            { type: "heading", content: "You don't have to write code" },
            { type: "text", content: "Writing HLSL/GLSL text code is hardcore. But today, AAA studios use Visual Node Editors (Shader Graph in Unity, Material Editor in Unreal). It uses the exact same math, but visually." },
            { type: "heading", content: "How Nodes Work" },
            { type: "text", content: "Instead of writing `color * 2.0`, you create a 'Texture Sample' node, connect its output to a 'Multiply' node, put '2.0' in the second slot, and connect the output to the 'Albedo' Master node." },
            { type: "heading", content: "The Fresnel Effect (Rim Lighting)" },
            { type: "text", content: "A classic trick you'll use in Shader Graph is the Fresnel node. It calculates the angle between the camera's view and the object's surface normal. It outputs White at the very edges of an object, and Black in the center." },
            { type: "text", content: "If you multiply the Fresnel output by an Emissive (glowing) color, you instantly create a beautiful glowing shield, a ghost hologram, or radioactive toxic waste!" }
          ]
        },
        practice: {
          title: "The Math of Nodes",
          description: "Translate visual logic to code.",
          task: "This is a mental exercise. In Shader Graph, you connected a 'Time' node to a 'Sine' node, then connected that to a 'Multiply' node (with value 5.0). Write the equivalent mathematical line of code.",
          starterCode: "// Translate the Shader Graph nodes into code:\n// Node 1: Time (_Time.y)\n// Node 2: Sine (sin)\n// Node 3: Multiply by 5.0\n\nfloat result = "
        },
        type: "glsl"
      },
      {
        id: "shader-post-processing",
        title: "Post-Processing: Instagram Filters",
        theory: {
          sections: [
            { type: "heading", content: "Fullscreen Magic" },
            { type: "text", content: "Post-processing happens at the very end of the Graphics Pipeline. The engine renders your entire 3D world into a single 2D image. Then, it draws a flat rectangle over your whole screen, puts that image on it, and runs a Post-Processing Shader." },
            { type: "heading", content: "Common Effects" },
            { type: "list", items: [
              "Color Grading: Shifting colors to make a game look 'cold' (blue) or 'apocalyptic' (yellow/green).",
              "Bloom: The shader finds the brightest pixels on the screen, blurs them, and adds them back on top of the image. This makes neon lights and explosions actually 'glow'.",
              "Depth of Field: Simulates a real camera lens by blurring pixels whose depth value (Z-buffer) is far away from the focus point."
            ]},
            { type: "heading", content: "Creating Grayscale" },
            { type: "text", content: "To make an entire game black-and-white, a post-processing shader takes the RGB values of every pixel and averages them. Better yet, it uses a 'Luminance' dot product to account for human eye sensitivity (we see green brighter than blue)." }
          ]
        },
        practice: {
          title: "Grayscale Filter",
          description: "Write a post-processing fragment shader.",
          task: "To turn a color into grayscale accurately, we take the Dot Product of the color and a specific magic vector (0.299, 0.587, 0.114) that represents human eye sensitivity. Use the `dot()` function.",
          starterCode: "float4 original_color = tex2D(_MainTex, uv);\n\n// The magic weights for human eye sensitivity to R, G, and B\nfloat3 weights = float3(0.299, 0.587, 0.114);\n\n// Calculate the grayscale value using the dot() product\nfloat gray_value = \n\n// Apply the grayscale value to R, G, and B channels\nreturn float4(gray_value, gray_value, gray_value, 1.0);"
        },
        type: "glsl"
      }
    ]
  },
  RU: {
    title: "Шейдеры & графика (PRO)",
    description: "HLSL/GLSL, Shader Graph и Пост-процессинг. Подчините себе мощь видеокарты и создавайте невероятные визуальные эффекты.",
    lessons: [
      {
        id: "shader-cpu-vs-gpu",
        title: "Профессор и Армия: CPU против GPU",
        theory: {
          sections: [
            { type: "heading", content: "Что такое Шейдер?" },
            { type: "text", content: "Шейдер — это просто крошечная программа. Но в отличие от ваших C# скриптов, она работает не на процессоре (CPU), а на видеокарте (GPU). Чтобы писать шейдеры, нужно понять, как 'мыслит' видеокарта." },
            { type: "heading", content: "Профессор и Армия слепых рабочих" },
            { type: "text", content: "Представьте CPU как гениального Профессора математики. Он может решать сложнейшую логику (игровой ИИ, физика), но решает задачи по очереди (Последовательно)." },
            { type: "text", content: "GPU — это армия из 10 000 рабочих с завязанными глазами. Они глуповаты, но работают ОДНОВРЕМЕННО (Параллельно). Если у вас 4K монитор (8 миллионов пикселей), процессор красил бы их вечность. GPU выдает каждому рабочему по пикселю, и они закрашивают весь экран за 1 миллисекунду!" },
            { type: "heading", content: "Проблема 'Завязанных глаз'" },
            { type: "text", content: "Поскольку у рабочих завязаны глаза, Пиксель А не имеет ни малейшего понятия, какого цвета Пиксель Б рядом с ним. Код шейдера пишется так, что он вычисляет цвет исключительно с помощью чистой математики и своих собственных координат." },
            { type: "tip", content: "Ресурс: 'The Book of Shaders' (Книга Шейдеров). Это абсолютная философская библия для новичков. Она прекрасно объясняет концепцию 'слепых рабочих' и учит рисовать сложнейшие формы с помощью чистого математического кода, шаг за шагом." }
          ]
        },
        practice: {
          title: "Логика Шейдера",
          description: "Научитесь мыслить параллельно.",
          task: "Это концептуальная задача на GLSL. Мы хотим закрасить пиксель в сплошной Красный цвет. В GLSL цвета представляются как вектор из 4 чисел `vec4` (Красный, Зеленый, Синий, Альфа), где значения идут от 0.0 до 1.0. Заполните return, чтобы выдать 100% красный, непрозрачный цвет.",
          starterCode: "// Язык шейдеров GLSL\n\nvoid main() {\n    // Выходной цвет - это vec4(R, G, B, A)\n    // Нам нужен чисто красный, 100% непрозрачный цвет (Alpha = 1.0).\n    \n    gl_FragColor = vec4( , , , );\n}"
        },
        type: "glsl"
      },
      {
        id: "shader-pipeline",
        title: "Графический конвейер (Vertex и Fragment)",
        theory: {
          sections: [
            { type: "heading", content: "Путь 3D Модели" },
            { type: "text", content: "Как 3D-меш (модель) превращается в 2D-пиксели на плоском мониторе? Он проходит через Графический Конвейер (Graphics Pipeline). Вы можете писать код для двух главных стадий этого конвейера:" },
            { type: "list", items: [
              "1. Вершинный шейдер (Vertex Shader): Эта программа запускается один раз для КАЖДОЙ вершины (точки) вашей 3D модели. Её главная задача — умножить локальные 3D-координаты на Матрицу Камеры, чтобы 'сплющить' их в плоский экран. Грубо говоря, она двигает 'колышки от палатки'.",
              "2. Растеризация (Rasterization): Железо видеокарты само соединяет вершины в треугольники и заполняет пространство между ними пикселями.",
              "3. Фрагментный шейдер (Fragment/Pixel Shader): Эта программа запускается один раз для КАЖДОГО пикселя внутри треугольника. Её задача — вычислить финальный Цвет этого пикселя. Она 'красит ткань палатки'."
            ]},
            { type: "heading", content: "Передача данных" },
            { type: "text", content: "Вершинный шейдер работает первым. Если он вычисляет информацию о свете или развертке, он упаковывает её в 'структуру' (struct) и передает вниз по конвейеру во Фрагментный шейдер." },
            { type: "tip", content: "Ресурс: Catlike Coding. Туториалы Яспера Флика (Jasper Flick) в разделе 'Rendering' — это легенда. Он шаг за шагом покажет, как написать свой собственный конвейер рендеринга в Unity с нуля. Это материал университетского уровня, изложенный простым языком." }
          ]
        },
        practice: {
          title: "Вершинный шейдер",
          description: "Переведите 3D-пространство в пространство Экрана.",
          task: "В Unity (HLSL), вершинный шейдер обязан выдать позицию на экране. Для этого мы умножаем позицию вершины в объекте на встроенную матрицу `UNITY_MATRIX_MVP` (Model-View-Projection). Напишите это умножение с помощью встроенной функции `mul(матрица, вектор)`.",
          starterCode: "// HLSL Unity Vertex Shader\n\nfloat4 vert(float4 vertex_position : POSITION) : SV_POSITION\n{\n    // Умножьте матрицу на позицию вершины, чтобы сплющить её в экранные координаты\n    float4 screen_position = mul( , );\n    \n    return screen_position;\n}"
        },
        type: "glsl"
      },
      {
        id: "shader-uv-coords",
        title: "UV-Координаты и Текстуры",
        theory: {
          sections: [
            { type: "heading", content: "Упаковочная бумага" },
            { type: "text", content: "Если у вас есть 2D-картинка кирпичной стены и 3D-куб, как видеокарта понимает, какую часть картинки натянуть на какую сторону куба? Эту проблему решают UV-координаты (Развертка)." },
            { type: "text", content: "U — это горизонтальная ось (X), а V — вертикальная ось (Y) вашей 2D-картинки. Значения UV всегда нормализованы: от 0.0 до 1.0. (Где 0,0 — это левый нижний угол картинки, а 1,1 — правый верхний)." },
            { type: "heading", content: "Чтение текстуры (Sampling)" },
            { type: "text", content: "В Фрагментном шейдере вы используете функцию `tex2D` (или `texture` в GLSL). Вы передаете ей саму картинку (Sampler2D) и UV-координаты. Функция считывает и возвращает точный цвет пикселя по этим координатам." },
            { type: "heading", content: "Манипуляции с UV" },
            { type: "text", content: "Так как UV — это просто математика (числа от 0 до 1), вы можете менять их ДО чтения текстуры! Если вы будете прибавлять время к оси U (`uv.x += _Time.y`), текстура начнет бесконечно ползти по горизонтали. Идеально для бегущих конвейерных лент или водопадов!" }
          ]
        },
        practice: {
          title: "Тайлинг Текстуры (Повторение)",
          description: "Умножьте UV для размножения текстуры.",
          task: "Если умножить координаты UV на 2.0, они будут идти от 0.0 до 2.0. Видеокарта автоматически 'завернет' их обратно (0->1, затем снова 0->1). В результате текстура повторится (затайлится) дважды на объекте! Умножьте переменную `uv` на 2.0.",
          starterCode: "sampler2D _MainTex;\nfloat2 uv;\n\nfloat4 frag() : SV_Target\n{\n    // 1. Умножьте координаты uv на 2.0, чтобы затайлить текстуру\n    float2 tiled_uv = \n    \n    // 2. Читаем цвет из текстуры по новым, увеличенным координатам\n    float4 color = tex2D(_MainTex, tiled_uv);\n    \n    return color;\n}"
        },
        type: "glsl"
      },
      {
        id: "shader-time-math",
        title: "Вдохнем жизнь: _Time и Математика",
        theory: {
          sections: [
            { type: "heading", content: "В шейдерах нет цикла Update()" },
            { type: "text", content: "В C# мы анимируем объекты внутри метода `Update()`, используя `Time.deltaTime`. У шейдеров этого нет. Вместо этого движок передает в видеокарту глобальную переменную `_Time` — число, которое постоянно и линейно растет." },
            { type: "heading", content: "Синус и Косинус" },
            { type: "text", content: "Если просто прибавлять `_Time` к цвету, он быстро станет больше 1.0 (застынет на белом цвете). Чтобы создать зацикленную анимацию (например, пульсацию светящегося магического меча), мы пропускаем время через функцию `sin(_Time.y)`." },
            { type: "text", content: "Синусоида берет постоянно растущее время и превращает его в красивую плавную волну, которая ходит строго между -1.0 и 1.0. Это 'сердцебиение' любой шейдерной анимации." },
            { type: "heading", content: "Искажение вершин (Vertex Displacement)" },
            { type: "text", content: "Если применить `sin(_Time.y)` в Фрагментном шейдере — цвет будет пульсировать. Но если применить это к Вершинному шейдеру, вы сможете ФИЗИЧЕСКИ двигать вершины меша вверх и вниз! Именно так в играх делают колышущиеся на ветру флаги и океанские волны." },
            { type: "tip", content: "Ресурс: Ronja Shader Tutorials. Если вам нужно научиться создавать конкретные эффекты в Unity (Вода, Голограммы, Мультяшный Toon-шейдер, Растворение), сайт Ronja — это лучшая в интернете коллекция готовых шейдеров с подробным объяснением каждой строчки кода." }
          ]
        },
        practice: {
          title: "Пульсирующее свечение",
          description: "Используйте sin() для анимации цвета.",
          task: "Мы хотим, чтобы объект плавно пульсировал от Черного (0) до Красного (1). Функция `sin(_Time.y)` выдает от -1 до 1. Чтобы сжать её в диапазон от 0 до 1, мы используем математический трюк: умножаем синус на 0.5 и прибавляем 0.5. Примените эту переменную к красному каналу вектора.",
          starterCode: "// Фрагментный шейдер\nfloat _TimeY; // Переменная передается движком Unity\n\nfloat4 frag() : SV_Target\n{\n    // 1. Считаем волну, которая ходит от 0.0 до 1.0\n    float pulse = (sin(_TimeY) * 0.5) + 0.5;\n    \n    // 2. Применяем значение pulse к Красному каналу (R, G, B, A)\n    float4 finalColor = vec4( , 0.0, 0.0, 1.0);\n    \n    return finalColor;\n}"
        },
        type: "glsl"
      },
      {
        id: "shader-graph",
        title: "Визуальное программирование: Shader Graph",
        theory: {
          sections: [
            { type: "heading", content: "Не обязательно писать код" },
            { type: "text", content: "Писать шейдеры кодом на HLSL/GLSL — это удел хардкорных тех-артистов. Сегодня AAA-студии используют Визуальные Редакторы (Shader Graph в Unity, Material Editor в Unreal). Логика и математика там АБСОЛЮТНО ТЕ ЖЕ, просто они представлены визуально." },
            { type: "heading", content: "Как работают Ноды (Узлы)" },
            { type: "text", content: "Вместо того чтобы писать в коде `color * 2.0`, вы создаете ноду 'Texture Sample', соединяете её выход (Output) с нодой 'Multiply', во второй слот вписываете '2.0', а финальный результат тянете в Мастер-Ноду в порт 'Albedo'." },
            { type: "heading", content: "Эффект Френеля (Rim Lighting)" },
            { type: "text", content: "Самый любимый эффект всех художников в Shader Graph — это нода Fresnel. Она вычисляет математический угол между взглядом Камеры и нормалью поверхности (как свет скользит по краям объекта). Френель выдает Белый цвет на самых краях (контурах) модели, и Черный цвет в её центре." },
            { type: "text", content: "Если умножить выход Френеля на яркий 'Emissive' цвет (Свечение), вы за одну секунду получите красивейший силовой щит, ауру призрака или радиоактивные отходы!" }
          ]
        },
        practice: {
          title: "Математика Нодов",
          description: "Переведите визуальную логику в код.",
          task: "Мысленное упражнение. В Shader Graph вы соединили ноду 'Time' с нодой 'Sine', а затем её выход пустили в ноду 'Multiply' со значением 5.0. Напишите эквивалент этой графовой логики одной строкой математического кода.",
          starterCode: "// Переведите ноды Shader Graph в код:\n// Нода 1: Time (_Time.y)\n// Нода 2: Sine (sin)\n// Нода 3: Multiply на число 5.0\n\nfloat result = "
        },
        type: "glsl"
      },
      {
        id: "shader-post-processing",
        title: "Пост-процессинг: Фильтры из Instagram",
        theory: {
          sections: [
            { type: "heading", content: "Магия поверх экрана" },
            { type: "text", content: "Пост-процессинг (Post-Processing) происходит в самом конце графического конвейера. Движок рендерит весь ваш 3D мир в одну плоскую 2D картинку. Затем он создает прямоугольник на весь экран, натягивает на него эту картинку и запускает особый Фрагментный Шейдер." },
            { type: "heading", content: "Популярные эффекты" },
            { type: "list", items: [
              "Color Grading (Цветокоррекция): Сдвиг цветов, чтобы игра выглядела 'холодной' (как Скайрим) или 'постапокалиптичной' (желтый фильтр).",
              "Bloom (Свечение): Шейдер находит самые яркие пиксели на экране, сильно размывает их (Blur) и накладывает обратно поверх исходной картинки. Это заставляет неон, фары и лаву по-настоящему 'светиться'.",
              "Depth of Field (Глубина резкости): Имитация объектива реальной камеры. Размывает те пиксели, значение глубины (Z-buffer) которых находится далеко от точки фокуса."
            ]},
            { type: "heading", content: "Как сделать Черно-белый фильтр" },
            { type: "text", content: "Чтобы сделать игру черно-белой (Grayscale), шейдер пост-процесса берет RGB пикселя и усредняет их. В идеале он использует математическое Скалярное произведение (Dot Product) с вектором `(0.299, 0.587, 0.114)`. Это связано с тем, что человеческий глаз видит зеленый цвет ярче, чем синий!" }
          ]
        },
        practice: {
          title: "Черно-белый Фильтр",
          description: "Напишите фрагментный шейдер пост-процесса.",
          task: "Чтобы точно перевести цвет в оттенки серого, мы берем Скалярное произведение (dot) текущего цвета и магического вектора чувствительности человеческого глаза. Используйте функцию `dot()`, передав ей `original_color.rgb` и вектор `weights`.",
          starterCode: "float4 original_color = tex2D(_MainTex, uv);\n\n// Магические веса чувствительности глаза к Красному, Зеленому и Синему\nfloat3 weights = float3(0.299, 0.587, 0.114);\n\n// Вычислите значение серого через Скалярное произведение (dot)\nfloat gray_value = \n\n// Применяем серый цвет к каналам R, G и B\nreturn float4(gray_value, gray_value, gray_value, 1.0);"
        },
        type: "glsl"
      }
    ]
  }
};