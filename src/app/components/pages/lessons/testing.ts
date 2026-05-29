export const testingLessons: Record<'EN' | 'RU', any> = {
  EN: {
    title: "Testing",
    description: "Learn testing — from the testing pyramid and Vitest unit tests to mocks and Playwright E2E.",
    lessons: [
      // ============= LESSON 1 =============
      {
        id: "testing-intro",
        title: "Why Tests and the Testing Pyramid",
        theory: {
          sections: [
            { type: "heading", content: "Why do we write tests?" },
            { type: "text", content: 'Imagine you are building an online store. You added a "Promo codes" feature. You opened the browser by hand, typed a promo code — it works. A week later you changed the cart logic. To make sure promo codes still work, you have to check everything by hand AGAIN. And if there are 100 features? 1000?' },
            { type: "text", content: 'Automated tests are code that checks your code. You run one command, and in a couple of seconds the program "clicks through" and checks thousands of scenarios by itself.' },
            { type: "heading", content: "The Testing Pyramid" },
            { type: "text", content: "Not all tests are equal. The industry splits them into 3 main levels (bottom to top):" },
            { type: "list", items: [
              "Unit tests: the foundation. They check the tiniest pieces of code (one function, one hook) in full isolation. Fast to write, run in milliseconds. If sum(2, 2) doesn't return 4, the test fails.",
              "Integration tests: check how several modules work TOGETHER. For example, does a React component click a button and call the right function?",
              "E2E tests (End-to-End): the top. They launch a real headless browser, open your site and imitate a real user: clicking links, typing into inputs. The most reliable, but the slowest."
            ]},
            { type: "heading", content: "Tools" },
            { type: "text", content: "The standard for unit tests used to be Jest, and for E2E — Cypress. Today the industry is moving to faster, modern tools: Vitest (built on the Vite bundler) and Playwright (by Microsoft, supports all browsers and tabs out of the box)." }
          ]
        },
        practice: {
          title: "Run your first test",
          description: "Check how the virtual test runner works.",
          task: "Since this is the first intro lesson, let's just check how our virtual Test Runner works. I wrote a test skeleton for you (Vitest syntax). Press 'Run' and see how the result is printed in the console!",
          starterCode: "describe('Intro test', () => {\n\n  it('should check that math works', () => {\n    const result = 2 + 2;\n    expect(result).toBe(4);\n  });\n\n  it('this test should fail', () => {\n    const isTested = false;\n    expect(isTested).toBe(true);\n  });\n\n});"
        },
        type: "javascript"
      },
      // ============= LESSON 2 =============
      {
        id: "testing-vitest",
        title: "Vitest: Basic Syntax and Matchers",
        theory: {
          sections: [
            { type: "heading", content: "Vitest (and Jest) syntax" },
            { type: "text", content: "Tests are written in separate files (e.g. math.test.js). The basic syntax has three main functions:" },
            { type: "list", items: [
              "describe(name, fn) — groups logically related tests. Creates a 'block'.",
              "it(name, fn) (or test) — the test itself. Reads like 'it should do something'.",
              "expect(value) — an assertion. We pass the result of a function, then call a check method (Matcher)."
            ]},
            { type: "code", content: 'import { describe, it, expect } from "vitest";\nimport { calculateDiscount } from "./math.js";\n\ndescribe("calculateDiscount function", () => {\n  it("should apply a discount to the price", () => {\n    const finalPrice = calculateDiscount(100, 20);\n    \n    // Expect 100 - 20 = 80\n    expect(finalPrice).toBe(80);\n  });\n});' },
            { type: "heading", content: "Matchers" },
            { type: "text", content: "The methods after expect() are called matchers. The most popular:" },
            { type: "list", items: [
              ".toBe(x) — strict equality (===). Ideal for primitives (numbers, strings).",
              ".toEqual(x) — deep comparison. Used for objects and arrays (checks content, not the memory reference).",
              ".toBeTruthy() / .toBeFalsy() — checks if a value is truthy or falsy (e.g. null is falsy).",
              ".toContain(x) — checks if an array or string contains a value."
            ]},
            { type: "tip", content: "You can invert any check by adding .not before the matcher: expect(password.length).not.toBe(0)." }
          ]
        },
        practice: {
          title: "Test an object",
          description: "Use .toEqual for objects, not .toBe.",
          task: "Given a simple function getUser(name, age) that returns an object. 1. Write an it test that checks the function returns the correct object. 2. Important: since we compare objects, use .toEqual(), not .toBe()! (Otherwise the test fails due to memory reference difference).",
          starterCode: "function getUser(name, age) {\n  return { username: name, userAge: age, isActive: true };\n}\n\ndescribe('Testing objects', () => {\n\n  it('getUser should return a correct user', () => {\n    // 1. Call getUser(\"Alex\", 30)\n    \n    \n    // 2. Write expect(...).toEqual(...)\n    \n  });\n\n});"
        },
        type: "javascript"
      },
      // ============= LESSON 3 =============
      {
        id: "testing-mocks",
        title: "Mocks and Spies",
        theory: {
          sections: [
            { type: "heading", content: "The isolation problem" },
            { type: "text", content: "A unit test must be isolated. If your fetchData() function makes a real server request (or hits a database) inside, it's no longer a unit test. The request can fail due to the internet, and the test shows an error in the function even though the function is written perfectly." },
            { type: "heading", content: "Mocking" },
            { type: "text", content: 'To avoid this, we create "mocks" (fakes) — dummy functions that imitate the behaviour of real ones.' },
            { type: "code", content: '// In Vitest mocks are created with vi.fn()\nconst fakeFetch = vi.fn();\n\n// We can tell the fake what it should return:\nfakeFetch.mockResolvedValue({ data: "Success" });' },
            { type: "heading", content: "Spies" },
            { type: "text", content: "Mock functions can not only return fake data, but also 'spy' on how they were called! We can check whether a function was called, how many times, and with what arguments." },
            { type: "code", content: 'function notifyUser(msg, callback) {\n  if (msg !== "") callback(msg);\n}\n\nit("should not call callback on empty message", () => {\n  const spyFn = vi.fn(); // Create a spy\n  \n  notifyUser("", spyFn); // Pass it into the function\n  \n  // Check the spy was NEVER called\n  expect(spyFn).not.toHaveBeenCalled();\n});' }
          ]
        },
        practice: {
          title: "Test a callback with a spy",
          description: "Create a spy with vi.fn() and check it was called.",
          task: "We implemented an analog of vi.fn() inside our Test Runner. Your task: test the processOrder function. Create a spy vi.fn(). Pass it as the second argument. The function should call it. Write the assert expect(spy).toHaveBeenCalled().",
          starterCode: "// Our virtual vi.fn() is available in the code\nfunction processOrder(orderId, onSuccess) {\n  // Some logic...\n  onSuccess(orderId);\n}\n\ndescribe('Testing callbacks (Spies)', () => {\n\n  it('should call the onSuccess function', () => {\n    // 1. Create const spy = vi.fn();\n    \n    // 2. Call processOrder(123, spy);\n    \n    // 3. Check: expect(spy).toHaveBeenCalled();\n    \n  });\n\n});"
        },
        type: "javascript"
      },
      // ============= LESSON 4 =============
      {
        id: "testing-playwright",
        title: "Playwright: Intro to E2E",
        theory: {
          sections: [
            { type: "heading", content: "What is E2E testing?" },
            { type: "text", content: 'End-to-End testing imitates user actions in a real browser. The test "opens" Google Chrome, navigates to a URL, finds the "Buy" button, clicks it and checks that the cart shows the number 1.' },
            { type: "heading", content: "Why Playwright? (vs Cypress)" },
            { type: "text", content: 'Cypress was the king of E2E for a long time. But it has issues: it works "inside" the browser (hard to test navigation between tabs, iframes, different domains). Playwright works through browser debug protocols (CDP). It easily tests multiple windows, supports real Safari (WebKit) and works fully async via standard async / await.' },
            { type: "heading", content: "Basic Playwright syntax" },
            { type: "text", content: "In Playwright every test receives a page object. That's your browser page." },
            { type: "code", content: 'import { test, expect } from "@playwright/test";\n\n// The test MUST be async!\ntest("Check site title", async ({ page }) => {\n  // 1. Navigate to the page\n  await page.goto("https://example.com");\n  \n  // 2. Perform an action or a check\n  await expect(page).toHaveTitle("Example Domain");\n});' },
            { type: "tip", content: "Important rule: almost everything in Playwright is a network or browser request. So before almost every action (click, type, navigate) you need to write await. Forget await and the test flies past and fails!" }
          ]
        },
        practice: {
          title: "Your first E2E test",
          description: "Make an async test and navigate with page.goto.",
          task: 'Let\'s practice Playwright syntax. In our Test Runner the page object is already injected into every it/test. Make the test async. Inside call await page.goto("https://google.com"). In the console you\'ll see how our virtual browser "navigates" the link.',
          starterCode: "// Note: test and it are the same thing\ntest('My first E2E test', async () => {\n  \n  // 1. Use await page.goto('url')\n  \n  \n});"
        },
        type: "javascript"
      },
      // ============= LESSON 5 =============
      {
        id: "testing-locators",
        title: "Locators and Actions (Playwright)",
        theory: {
          sections: [
            { type: "heading", content: "Locators" },
            { type: "text", content: "How does Playwright know which button to click? Through Locators. A locator is a recipe for how to find an element on the page." },
            { type: "text", content: "Playwright promotes the concept of accessibility (A11y). The best way to find an element is to look for it the way a user does (by text or role), not by CSS classes (which often change)." },
            { type: "list", items: [
              'page.getByRole("button", { name: "Login" }) — the most correct way! Finds a button with the text "Login".',
              'page.getByText("Welcome") — finds an element by exact text match.',
              'page.getByPlaceholder("Password") — great for inputs.',
              'page.locator(".submit-btn") — classic CSS selector search (if other ways don\'t fit).'
            ]},
            { type: "heading", content: "Actions" },
            { type: "text", content: "After finding an element, you interact with it. All actions are async (require await)." },
            { type: "code", content: 'await page.goto("/login");\n\n// Type text into fields\nawait page.getByPlaceholder("Email").fill("test@mail.com");\nawait page.getByPlaceholder("Password").fill("12345");\n\n// Click the button\nawait page.getByRole("button", { name: "Submit" }).click();' },
            { type: "text", content: "Playwright's killer feature: Auto-waiting. When you write .click(), Playwright waits until the element loads, becomes visible and stops moving (animations), and only then clicks!" }
          ]
        },
        practice: {
          title: "A login scenario",
          description: "Find inputs and a button, then act on them.",
          task: "Write a login scenario with virtual Playwright. 1. Navigate to /login (via page.goto). 2. Find the input by placeholder page.getByPlaceholder('Email') and apply .fill('user@mail.com') (don't forget await!). 3. Find the button via page.getByRole('button', { name: 'Login' }) and .click().",
          starterCode: "test('User login', async () => {\n  \n  // 1. Navigate to /login\n  \n  // 2. Type Email via getByPlaceholder(...).fill(...)\n  \n  // 3. Click the \"Login\" button via getByRole\n  \n});"
        },
        type: "javascript"
      },
      // ============= LESSON 6 =============
      {
        id: "testing-asserts",
        title: "Web-first Assertions in Playwright",
        theory: {
          sections: [
            { type: "heading", content: "Web-first Assertions" },
            { type: "text", content: "In unit tests we checked: expect(2+2).toBe(4). In E2E tests we check the state of web elements: is the text visible, did the button appear, does the input have the needed class." },
            { type: "text", content: 'Playwright provides special "Web-first" matchers. Why are they special? They can wait!' },
            { type: "code", content: '// Playwright will wait up to 5 seconds until the element appears on screen.\n// If it appears - the test passes. If not - it fails by timeout.\nawait expect(page.getByText("Saved successfully")).toBeVisible();' },
            { type: "heading", content: "Main assertion methods:" },
            { type: "list", items: [
              "await expect(locator).toBeVisible() — checks the element is rendered in the DOM and not hidden via CSS (display: none).",
              'await expect(locator).toHaveText("Hello") — checks the element text.',
              "await expect(locator).toBeDisabled() — checks an input or button is disabled.",
              "await expect(page).toHaveURL(/.*dashboard/) — checks the browser URL changed (e.g. after login)."
            ]},
            { type: "tip", content: "Note: in Playwright we put await before expect(...).toBeVisible(), because the check happens over time (waiting for it to appear). In Vitest checks are synchronous, so no await before expect is needed." }
          ]
        },
        practice: {
          title: "Finish the test with an assertion",
          description: "Use a web-first assertion to verify success.",
          task: "Finish our test! At the end we want to make sure login succeeded. Use await expect(...), pass in the locator page.getByText('Welcome') and call .toBeVisible().",
          starterCode: "test('Check successful login', async () => {\n  await page.goto('/login');\n  await page.getByRole('button', { name: 'Login' }).click();\n  \n  // Write an assert (expect) that checks\n  // the text \"Welcome\" became visible (toBeVisible)\n  \n  \n});"
        },
        type: "javascript"
      }
    ]
  },
  RU: {
    title: "Тестирование",
    description: "Изучаем тестирование — от пирамиды тестирования и unit-тестов на Vitest до моков и E2E на Playwright.",
    lessons: [
      // ============= УРОК 1 =============
      {
        id: "testing-intro",
        title: "Зачем нужны тесты и Пирамида Тестирования",
        theory: {
          sections: [
            { type: "heading", content: "Зачем мы пишем тесты?" },
            { type: "text", content: 'Представьте, что вы разрабатываете интернет-магазин. Вы добавили функцию "Промокоды". Вы вручную открыли браузер, ввели промокод — всё работает. Через неделю вы обновили логику корзины. Чтобы убедиться, что промокоды не сломались, вам снова нужно вручную всё проверять. А если функций 100? А если 1000?' },
            { type: "text", content: 'Автоматизированные тесты — это код, который проверяет ваш код. Вы запускаете одну команду, и за пару секунд программа сама "прокликивает" и проверяет тысячи сценариев.' },
            { type: "heading", content: "Пирамида Тестирования" },
            { type: "text", content: "Не все тесты одинаковы. В индустрии принято делить их на 3 основных уровня (снизу вверх):" },
            { type: "list", items: [
              "Unit-тесты (модульные): фундамент пирамиды. Проверяют мельчайшие кусочки кода (одну функцию, один хук) в полной изоляции. Пишутся быстро, выполняются за миллисекунды. Если sum(2, 2) не возвращает 4, тест падает.",
              "Integration-тесты (интеграционные): проверяют, как несколько модулей работают вместе. Например, нажимает ли компонент React кнопку и вызывает ли это правильную функцию?",
              "E2E-тесты (End-to-End, сквозные): вершина пирамиды. Запускают настоящий невидимый (headless) браузер, открывают сайт и имитируют поведение реального пользователя: кликают по ссылкам, вводят текст. Самые надёжные, но самые медленные."
            ]},
            { type: "heading", content: "Инструменты" },
            { type: "text", content: "Раньше стандартом для Unit-тестов был Jest, а для E2E — Cypress. Сегодня индустрия массово переходит на более быстрые и современные инструменты: Vitest (работает на базе бандлера Vite) и Playwright (от Microsoft, поддерживает все браузеры и вкладки из коробки)." }
          ]
        },
        practice: {
          title: "Запусти первый тест",
          description: "Проверь, как работает виртуальный тест-раннер.",
          task: "Поскольку это первый вводный урок, давайте просто проверим, как работает наш виртуальный Test Runner. Я написал для вас заготовку теста (синтаксис Vitest). Нажмите «Запустить» и посмотрите, как красиво выводится результат в консоль!",
          starterCode: "describe('Вводный тест', () => {\n\n  it('должен проверить, что математика работает', () => {\n    const result = 2 + 2;\n    expect(result).toBe(4);\n  });\n\n  it('этот тест должен упасть', () => {\n    const isTested = false;\n    expect(isTested).toBe(true);\n  });\n\n});"
        },
        type: "javascript"
      },
      // ============= УРОК 2 =============
      {
        id: "testing-vitest",
        title: "Vitest: Базовый синтаксис и Matchers",
        theory: {
          sections: [
            { type: "heading", content: "Синтаксис Vitest (и Jest)" },
            { type: "text", content: "Тесты пишутся в отдельных файлах (например, math.test.js). Базовый синтаксис состоит из трёх главных функций:" },
            { type: "list", items: [
              "describe(имя, функция) — группирует логически связанные тесты. Создаёт 'Блок'.",
              "it(имя, функция) (или test) — сам тест. Читается как 'it should do something' (он должен сделать то-то).",
              "expect(значение) — утверждение (ассерт). Мы передаём результат функции, а затем вызываем метод проверки (Matcher)."
            ]},
            { type: "code", content: 'import { describe, it, expect } from "vitest";\nimport { calculateDiscount } from "./math.js";\n\ndescribe("Функция calculateDiscount", () => {\n  it("должна применять скидку к цене", () => {\n    const finalPrice = calculateDiscount(100, 20);\n    \n    // Ожидаем, что 100 - 20 = 80\n    expect(finalPrice).toBe(80);\n  });\n});' },
            { type: "heading", content: "Matchers (Матчеры)" },
            { type: "text", content: "Методы после expect() называются матчерами. Самые популярные из них:" },
            { type: "list", items: [
              ".toBe(x) — строгое равенство (===). Идеально для примитивов (чисел, строк).",
              ".toEqual(x) — глубокое сравнение. Используется для объектов и массивов (проверяет их содержимое, а не ссылку в памяти).",
              ".toBeTruthy() / .toBeFalsy() — проверяет, является ли значение истинным или ложным в логическом контексте (например, null это falsy).",
              ".toContain(x) — проверяет, содержит ли массив или строка определённое значение."
            ]},
            { type: "tip", content: "Вы можете инвертировать любую проверку, добавив .not перед матчером: expect(password.length).not.toBe(0)." }
          ]
        },
        practice: {
          title: "Протестируй объект",
          description: "Для объектов используй .toEqual, а не .toBe.",
          task: "Дана простая функция getUser(name, age), которая возвращает объект. 1. Напишите тест it, который проверит, что функция возвращает правильный объект. 2. Внимание: так как мы сравниваем объекты, используйте метод .toEqual(), а не .toBe()! (Иначе тест упадёт из-за разницы ссылок в памяти).",
          starterCode: "function getUser(name, age) {\n  return { username: name, userAge: age, isActive: true };\n}\n\ndescribe('Тестирование объектов', () => {\n\n  it('getUser должен вернуть корректного пользователя', () => {\n    // 1. Вызовите getUser(\"Alex\", 30)\n    \n    \n    // 2. Напишите expect(...).toEqual(...)\n    \n  });\n\n});"
        },
        type: "javascript"
      },
      // ============= УРОК 3 =============
      {
        id: "testing-mocks",
        title: "Mocks (Моки) и Шпионы",
        theory: {
          sections: [
            { type: "heading", content: "Проблема изолированности" },
            { type: "text", content: "Unit-тест должен быть изолированным. Если ваша функция fetchData() внутри себя делает реальный запрос на сервер (или обращается к базе данных), это уже не Unit-тест. Запрос может упасть из-за интернета, и тест покажет ошибку в функции, хотя функция написана идеально." },
            { type: "heading", content: "Мокирование (Mocking)" },
            { type: "text", content: 'Чтобы этого избежать, мы создаём "Моки" (фальшивки) — функции-пустышки, которые имитируют поведение реальных.' },
            { type: "code", content: '// В Vitest моки создаются через vi.fn()\nconst fakeFetch = vi.fn();\n\n// Мы можем сказать фальшивке, что она должна вернуть:\nfakeFetch.mockResolvedValue({ data: "Успех" });' },
            { type: "heading", content: "Шпионы (Spies)" },
            { type: "text", content: 'Моки-функции умеют не только возвращать поддельные данные, но и "шпионить" за тем, как их вызывали! Мы можем проверить, была ли вызвана функция, сколько раз, и с какими аргументами.' },
            { type: "code", content: 'function notifyUser(msg, callback) {\n  if (msg !== "") callback(msg);\n}\n\nit("не должен вызывать callback при пустом сообщении", () => {\n  const spyFn = vi.fn(); // Создаём шпиона\n  \n  notifyUser("", spyFn); // Передаём его в функцию\n  \n  // Проверяем, что шпион НИ РАЗУ не был вызван\n  expect(spyFn).not.toHaveBeenCalled();\n});' }
          ]
        },
        practice: {
          title: "Протестируй коллбэк через шпиона",
          description: "Создай шпиона vi.fn() и проверь, что он вызван.",
          task: "Мы реализовали для вас аналог шпиона vi.fn() внутри нашего Test Runner'a. Ваша задача протестировать функцию processOrder. Создайте шпиона vi.fn(). Передайте его вторым аргументом. Функция должна вызвать его. Напишите ассерт expect(spy).toHaveBeenCalled().",
          starterCode: "// Наш виртуальный vi.fn() доступен вам в коде\nfunction processOrder(orderId, onSuccess) {\n  // Какая-то логика...\n  onSuccess(orderId);\n}\n\ndescribe('Тестирование коллбэков (Spies)', () => {\n\n  it('должен вызывать функцию onSuccess', () => {\n    // 1. Создайте const spy = vi.fn();\n    \n    // 2. Вызовите processOrder(123, spy);\n    \n    // 3. Проверьте: expect(spy).toHaveBeenCalled();\n    \n  });\n\n});"
        },
        type: "javascript"
      },
      // ============= УРОК 4 =============
      {
        id: "testing-playwright",
        title: "Playwright: Введение в E2E",
        theory: {
          sections: [
            { type: "heading", content: "Что такое E2E тестирование?" },
            { type: "text", content: 'End-to-End (Сквозное) тестирование имитирует действия пользователя в реальном браузере. Тест "открывает" Google Chrome, переходит по URL, ищет кнопку "Купить", кликает на неё и проверяет, что в корзине появилась цифра 1.' },
            { type: "heading", content: "Почему Playwright? (против Cypress)" },
            { type: "text", content: 'Cypress долгое время был королём E2E. Но у него есть проблемы: он работает "внутри" браузера (сложно тестировать переходы между вкладками, iframe, разные домены). Playwright работает через протоколы отладки браузеров (CDP). Он позволяет легко тестировать несколько окон, поддерживает настоящий Safari (WebKit) и работает полностью асинхронно через стандартный async / await.' },
            { type: "heading", content: "Базовый синтаксис Playwright" },
            { type: "text", content: "В Playwright каждый тест принимает объект page. Это ваша страница браузера." },
            { type: "code", content: 'import { test, expect } from "@playwright/test";\n\n// Тест обязан быть async!\ntest("Проверка заголовка сайта", async ({ page }) => {\n  // 1. Переход на страницу\n  await page.goto("https://example.com");\n  \n  // 2. Выполнение действия или проверки\n  await expect(page).toHaveTitle("Example Domain");\n});' },
            { type: "tip", content: "Важное правило: почти всё в Playwright — это сетевые или браузерные запросы. Поэтому почти перед каждым действием (клик, ввод, переход) нужно писать слово await. Забудете await — тест пролетит мимо и упадёт!" }
          ]
        },
        practice: {
          title: "Твой первый E2E тест",
          description: "Сделай тест async и перейди через page.goto.",
          task: 'Попрактикуемся в синтаксисе Playwright. В нашем Test Runner объект page уже внедрён в каждый it/test тест. Сделайте тест async. Внутри вызовите метод await page.goto("https://google.com"). В консоли вы увидите, как наш виртуальный браузер "переходит" по ссылке.',
          starterCode: "// Обратите внимание: test и it - это одно и то же\ntest('Мой первый E2E тест', async () => {\n  \n  // 1. Используйте await page.goto('url')\n  \n  \n});"
        },
        type: "javascript"
      },
      // ============= УРОК 5 =============
      {
        id: "testing-locators",
        title: "Локаторы и Действия (Playwright)",
        theory: {
          sections: [
            { type: "heading", content: "Локаторы (Locators)" },
            { type: "text", content: "Как Playwright понимает, на какую кнопку кликнуть? Через Локаторы. Локатор — это рецепт того, как найти элемент на странице." },
            { type: "text", content: "Playwright продвигает концепцию доступности (A11y). Лучший способ найти элемент — искать его так же, как это делает пользователь (по тексту или роли), а не по CSS-классам (которые часто меняются)." },
            { type: "list", items: [
              'page.getByRole("button", { name: "Войти" }) — самый правильный способ! Ищет кнопку с текстом "Войти".',
              'page.getByText("Добро пожаловать") — ищет элемент по точному совпадению текста.',
              'page.getByPlaceholder("Пароль") — отлично подходит для инпутов.',
              'page.locator(".submit-btn") — классический поиск по CSS-селектору (если другие способы не подходят).'
            ]},
            { type: "heading", content: "Действия (Actions)" },
            { type: "text", content: "После того как вы нашли элемент, с ним нужно взаимодействовать. Все действия асинхронны (требуют await)." },
            { type: "code", content: 'await page.goto("/login");\n\n// Вводим текст в поля\nawait page.getByPlaceholder("Email").fill("test@mail.com");\nawait page.getByPlaceholder("Пароль").fill("12345");\n\n// Кликаем по кнопке\nawait page.getByRole("button", { name: "Отправить" }).click();' },
            { type: "text", content: "Киллер-фича Playwright: Auto-waiting (Автоожидание). Когда вы пишете .click(), Playwright сам подождёт, пока элемент загрузится, станет видимым и перестанет дёргаться (анимации), и только потом кликнет!" }
          ]
        },
        practice: {
          title: "Сценарий авторизации",
          description: "Найди инпуты и кнопку, выполни действия.",
          task: "Напишем сценарий авторизации с помощью виртуального Playwright. 1. Перейдите на /login (через page.goto). 2. Найдите инпут по плейсхолдеру page.getByPlaceholder('Email') и примените к нему действие .fill('user@mail.com') (не забудьте await!). 3. Найдите кнопку через page.getByRole('button', { name: 'Войти' }) и сделайте .click().",
          starterCode: "test('Авторизация пользователя', async () => {\n  \n  // 1. Переход на страницу /login\n  \n  // 2. Ввод Email через getByPlaceholder(...).fill(...)\n  \n  // 3. Клик по кнопке \"Войти\" через getByRole\n  \n});"
        },
        type: "javascript"
      },
      // ============= УРОК 6 =============
      {
        id: "testing-asserts",
        title: "Web-first Ассерты в Playwright",
        theory: {
          sections: [
            { type: "heading", content: "Web-first Assertions (Проверки)" },
            { type: "text", content: "В Unit-тестах мы проверяли: expect(2+2).toBe(4). В E2E тестах мы проверяем состояние веб-элементов: виден ли текст, появилась ли кнопка, содержит ли инпут нужный класс." },
            { type: "text", content: 'Playwright предоставляет специальные "Web-first" матчеры. Почему они особенные? Они умеют ждать!' },
            { type: "code", content: '// Playwright будет ждать до 5 секунд, пока элемент не появится на экране.\n// Если появится - тест пройдёт. Если нет - упадёт по таймауту.\nawait expect(page.getByText("Успешно сохранено")).toBeVisible();' },
            { type: "heading", content: "Основные методы проверок:" },
            { type: "list", items: [
              "await expect(locator).toBeVisible() — проверяет, что элемент отрендерен в DOM и не скрыт через CSS (display: none).",
              'await expect(locator).toHaveText("Привет") — проверяет текст элемента.',
              "await expect(locator).toBeDisabled() — проверяет, что инпут или кнопка отключены (disabled).",
              "await expect(page).toHaveURL(/.*dashboard/) — проверяет, что URL браузера изменился (например, после логина)."
            ]},
            { type: "tip", content: "Заметьте: в Playwright перед expect(...).toBeVisible() мы ставим await, потому что эта проверка происходит во времени (ждём появления). В Vitest проверки синхронные, там await перед expect не нужен." }
          ]
        },
        practice: {
          title: "Заверши тест ассертом",
          description: "Используй web-first ассерт для проверки успеха.",
          task: "Завершим наш тест! В конце теста мы хотим убедиться, что авторизация прошла успешно. Используйте await expect(...), передайте внутрь локатор page.getByText('Добро пожаловать') и вызовите метод .toBeVisible().",
          starterCode: "test('Проверка успешного входа', async () => {\n  await page.goto('/login');\n  await page.getByRole('button', { name: 'Войти' }).click();\n  \n  // Напишите ассерт (expect), который проверяет, \n  // что текст \"Добро пожаловать\" стал видимым (toBeVisible)\n  \n  \n});"
        },
        type: "javascript"
      }
    ]
  }
};
