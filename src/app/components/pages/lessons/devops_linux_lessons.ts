export const devopsLinuxState: Record<'EN' | 'RU', any> = {
  EN: {
    title: "Linux & Bash (MUST)",
    description: "Shell scripts, processes, permissions, and networking. The ultimate foundation for a DevOps Engineer.",
    lessons: [
      {
        id: "devops-linux-fhs",
        title: "Philosophy & The File System (FHS)",
        theory: {
          sections: [
            { type: "heading", content: "Everything is a File" },
            { type: "text", content: "In Linux, absolutely everything is represented as a file. Your hard drive is a file (/dev/sda), your terminal is a file, and even running processes expose their metrics as text files in the /proc directory. To manage a server, you don't use GUIs; you read and write files." },
            { type: "heading", content: "Crucial Directories for DevOps" },
            { type: "text", content: "The Filesystem Hierarchy Standard (FHS) defines where things live. A DevOps engineer spends 90% of their time in these three folders:" },
            { type: "list", items: [
              "/etc: The control room. Contains all system-wide configuration files (e.g., Nginx configs, SSH keys). If you need to change how a service behaves, you edit a text file here.",
              "/var/log: The black box. Contains system and application logs. When a deployment fails or a server crashes, this is the first place you look.",
              "/proc: A virtual filesystem. It doesn't exist on your hard drive; it's generated in RAM by the kernel. Contains info about CPU (/proc/cpuinfo), memory, and running processes."
            ]},
            { type: "tip", content: "Resource: Linux Journey. Go to linuxjourney.com and complete the 'Command Line' and 'Text-Fu' modules. It is the most beautiful and interactive way to memorize basic navigation commands like cd, ls, pwd, and cat." }
          ]
        },
        practice: {
          title: "System Exploration",
          description: "Read server metadata using basic commands.",
          task: "Write a bash script to print the current working directory, list all files (including hidden ones), and read the OS version from the standard configuration file located at /etc/os-release.",
          starterCode: "#!/bin/bash\n\n# 1. Print the current working directory\n\n\n# 2. List all files with detailed info (long format, hidden files)\n\n\n# 3. Output the contents of the OS release info file\ncat /etc/os-release"
        },
        type: "bash"
      },
      {
        id: "devops-bash-io",
        title: "I/O Redirection & Pipes",
        theory: {
          sections: [
            { type: "heading", content: "Standard Streams" },
            { type: "text", content: "Every Linux command opens three data streams by default:" },
            { type: "list", items: [
              "0 (STDIN): Standard Input (what you type).",
              "1 (STDOUT): Standard Output (the normal result of a command).",
              "2 (STDERR): Standard Error (error messages)."
            ]},
            { type: "heading", content: "Redirection (>, >>, 2>&1)" },
            { type: "text", content: "You can redirect STDOUT to a file using `>`. This OVERWRITES the file. If you want to APPEND to a file (like adding a new line to a log), use `>>`." },
            { type: "text", content: "Sometimes scripts throw errors that ruin your clean output. You can redirect STDERR (stream 2) to STDOUT (stream 1) using the magic syntax `2>&1`, or throw errors into the void using `2>/dev/null`." },
            { type: "heading", content: "The Pipe (|)" },
            { type: "text", content: "The Pipe takes the STDOUT of the left command and feeds it directly into the STDIN of the right command. This allows you to chain small, single-purpose utilities together to solve complex problems." },
            { type: "tip", content: "Resource: OverTheWire (Bandit). Play levels 1-10. It is a gamified CTF where you MUST use pipes and redirection to extract hidden passwords from messy files." }
          ]
        },
        practice: {
          title: "Chaining Commands",
          description: "Use pipes to count data.",
          task: "We want to know how many files/folders are in the /etc directory. Use 'ls /etc', pipe the output ('|'), and pass it to 'wc -l' (word count lines) to count the number of output lines.",
          starterCode: "#!/bin/bash\n\n# Combine ls and wc using a pipe to count the files in /etc\nls /etc \n\n# Append a new log entry to a file without overwriting it\necho \"Deployment finished at $(date)\" >> deployment.log"
        },
        type: "bash"
      },
      {
        id: "devops-text-fu",
        title: "Log Parsing: Grep, Awk, and Sed",
        theory: {
          sections: [
            { type: "heading", content: "The Holy Trinity of Text Processing" },
            { type: "text", content: "As a DevOps engineer, you will often face 10GB Nginx log files. You can't open them in a text editor; it will crash. You must parse them via CLI." },
            { type: "list", items: [
              "grep: The Filter. `grep 'ERROR' app.log` will print only the lines containing the word ERROR.",
              "awk: The Column Extractor. Logs are often space-separated. `awk '{print $1}' access.log` will print ONLY the first column (usually the IP address) of every line.",
              "sed: The Stream Editor. Used for finding and replacing text on the fly. `sed 's/ERROR/WARN/g' app.log` replaces all occurrences of ERROR with WARN."
            ]},
            { type: "text", content: "By combining these with pipes, you can perform massive data analytics instantly." },
            { type: "code", content: "# Example: Get the top 5 IPs that hit our server\ncat access.log | awk '{print $1}' | sort | uniq -c | sort -nr | head -5" }
          ]
        },
        practice: {
          title: "Extracting IPs from Logs",
          description: "Use awk to parse structured text.",
          task: "Imagine a log file 'server.log' where each line looks like: '192.168.1.50 GET /index.html 200'. Write a pipeline to cat the file, use awk to extract only the 1st column (the IP), and then sort it.",
          starterCode: "#!/bin/bash\n\n# Create a fake log file\necho \"10.0.0.1 GET / 200\" > server.log\necho \"192.168.1.5 POST /api 500\" >> server.log\necho \"10.0.0.1 GET /images 200\" >> server.log\n\n# Extract just the IP addresses (1st column) using awk\ncat server.log | awk '{print }' | sort"
        },
        type: "bash"
      },
      {
        id: "devops-permissions",
        title: "Security: Permissions and Ownership",
        theory: {
          sections: [
            { type: "heading", content: "Why chmod 777 is a Crime" },
            { type: "text", content: "When you type `ls -l`, you see `-rwxr-xr--`. This is the permission matrix. It is split into 3 groups: Owner (User), Group, and Others." },
            { type: "text", content: "r = read (4), w = write (2), x = execute (1). You add the numbers to set permissions." },
            { type: "list", items: [
              "7 (4+2+1): Read, Write, Execute.",
              "6 (4+2): Read, Write.",
              "4: Read only."
            ]},
            { type: "text", content: "Running `chmod 777 file` gives EVERYONE on the server full rights to read, edit, and execute the file. If you do this in production, you will be fired. Always use the principle of least privilege." },
            { type: "heading", content: "SSH Keys" },
            { type: "text", content: "A DevOps engineer connects to servers using SSH keys (`id_rsa`). Linux enforces strict security on these keys. If your private key has permissions that allow anyone to read it (e.g., 644), SSH will throw an error: 'UNPROTECTED PRIVATE KEY FILE!' and refuse to connect." },
            { type: "text", content: "You MUST set your key permissions to 600 (Owner can read/write, nobody else can do anything)." }
          ]
        },
        practice: {
          title: "Secure an SSH Key",
          description: "Fix file permissions using octal notation.",
          task: "You generated an SSH key 'id_rsa', but its permissions are too open. Use the 'chmod' command to set the permissions to 600 so that only the owner can read and write it.",
          starterCode: "#!/bin/bash\n\n# 1. Create a dummy key file\ntouch id_rsa\n\n# 2. Secure it! Set permissions to 600\nchmod  id_rsa\n\n# Verify\nls -l id_rsa"
        },
        type: "bash"
      },
      {
        id: "devops-processes",
        title: "Processes and Systemd (Daemons)",
        theory: {
          sections: [
            { type: "heading", content: "Processes vs Daemons" },
            { type: "text", content: "A process is any running program. You can view them with `ps aux` or `top`. You can kill them with `kill -9 <PID>`." },
            { type: "text", content: "However, a DevOps engineer deploys web servers (like Nginx) or databases (like Postgres). These shouldn't run in your active terminal; they must run in the background permanently, start automatically when the server boots, and restart if they crash. These background processes are called Daemons." },
            { type: "heading", content: "Systemd & systemctl" },
            { type: "text", content: "Modern Linux uses `systemd` to manage daemons. You control it using the `systemctl` command." },
            { type: "list", items: [
              "systemctl start nginx: Starts the service.",
              "systemctl enable nginx: Tells the OS to start Nginx automatically on boot.",
              "systemctl status nginx: Checks if the service is running or has crashed.",
              "journalctl -u nginx: Reads the logs specifically for this service."
            ]}
          ]
        },
        practice: {
          title: "Service Management",
          description: "Use systemctl to manage a daemon.",
          task: "Write the command to check the status of the 'docker' service. Then, write the command to enable it so it starts automatically on system boot.",
          starterCode: "#!/bin/bash\n\n# 1. Check the status of the Docker daemon\nsystemctl \n\n# 2. Enable the Docker daemon on boot\nsystemctl "
        },
        type: "bash"
      },
      {
        id: "devops-networking",
        title: "Networking CLI (Troubleshooting)",
        theory: {
          sections: [
            { type: "heading", content: "Is the port open?" },
            { type: "text", content: "When a developer complains 'The app can't connect to the database', the DevOps engineer must diagnose the network. You don't guess; you use CLI tools." },
            { type: "list", items: [
              "ip a: Replaces the old `ifconfig`. Shows your server's IP addresses.",
              "ping: Checks if a server is alive (L3 ICMP).",
              "ss -tulpn: Replaces `netstat`. Shows all listening ports on your server. Essential for checking if your app actually started listening on port 8080.",
              "curl -I: Fetches just the HTTP headers of a website. Great for checking if an API is returning a 200 OK or a 502 Bad Gateway."
            ]},
            { type: "heading", content: "DNS Resolution" },
            { type: "text", content: "If a domain name isn't working, use `dig google.com` or `host google.com` to see if the DNS server is successfully translating the name into an IP address." }
          ]
        },
        practice: {
          title: "Network Diagnostics",
          description: "Use basic tools to check connectivity.",
          task: "Use the `curl` command to make a request to 'http://localhost'. Use the `-I` flag to fetch only the headers, not the entire HTML body.",
          starterCode: "#!/bin/bash\n\n# 1. Check which ports are listening on our server\nss -tulpn\n\n# 2. Fetch the HTTP headers of the local web server\ncurl "
        },
        type: "bash"
      },
      {
        id: "devops-bash-scripting",
        title: "Bash Scripting: Variables & Exit Codes",
        theory: {
          sections: [
            { type: "heading", content: "Automating the Pain Away" },
            { type: "text", content: "If you run the same 5 commands twice, write a script. Bash scripts always start with a 'Shebang' `#!/bin/bash` which tells the OS what interpreter to use." },
            { type: "heading", content: "Variables and Quotes" },
            { type: "text", content: "In Bash, there are NO SPACES around the equals sign when defining a variable: `APP_PORT=8080`. To use it, add a dollar sign: `echo $APP_PORT`." },
            { type: "text", content: "Single quotes `'text'` treat everything literally. Double quotes `\"text\"` allow variable expansion (interpolation)." },
            { type: "heading", content: "Exit Codes ($?)" },
            { type: "text", content: "When a Linux command finishes, it secretly leaves behind an Exit Code. 0 means Success. Anything from 1 to 255 means Error. This code is stored in the special variable `$?`. This is how scripts know if a previous command failed!" },
            { type: "tip", content: "Resource: Bash Academy. This is an incredible resource for learning Bash scripting properly. It explains arrays, parameter expansion, and conditional logic with great examples." }
          ]
        },
        practice: {
          title: "Health Check Script",
          description: "Write an if/else block using exit codes.",
          task: "We pinged a server. Write an if/else statement evaluating the exit code variable `$?`. Remember, in Bash, spaces inside the `[ ]` brackets are MANDATORY: `if [ $? -eq 0 ]; then`.",
          starterCode: "#!/bin/bash\n\nTARGET=\"8.8.8.8\"\nping -c 1 $TARGET > /dev/null 2>&1\n\n# Check the exit code of the ping command\nif [ $? -eq 0 ]; then\n    echo \"Server $TARGET is UP\"\nelse\n    echo \"Server $TARGET is DOWN\"\nfi"
        },
        type: "bash"
      },
      {
        id: "devops-bash-loops",
        title: "Bash Scripting: Loops and Cron",
        theory: {
          sections: [
            { type: "heading", content: "For Loops" },
            { type: "text", content: "Loops are essential for applying the same command to multiple files or servers." },
            { type: "code", content: "for SERVER in web1 web2 db1; do\n  echo \"Connecting to $SERVER...\"\n  # ssh $SERVER 'uptime'\ndone" },
            { type: "text", content: "You can also loop over files: `for FILE in *.log; do cat $FILE; done`." },
            { type: "heading", content: "Scheduling with Cron" },
            { type: "text", content: "Scripts are useless if you have to run them manually at 3 AM. The `cron` daemon handles scheduling. You edit jobs using `crontab -e`." },
            { type: "text", content: "A cron expression has 5 asterisks: Minute, Hour, Day of Month, Month, Day of Week. \n`0 2 * * * /scripts/backup.sh` means 'Run backup.sh every day at 2:00 AM'." }
          ]
        },
        practice: {
          title: "Looping through Services",
          description: "Restart multiple services automatically.",
          task: "Write a for loop that iterates over a list of three services: 'nginx', 'postgresql', and 'redis'. Inside the loop, echo 'Restarting [service]...'.",
          starterCode: "#!/bin/bash\n\n# Loop over a list of services\nfor SERVICE in nginx postgresql redis; do\n    # Use the variable $SERVICE\n    echo \"Restarting ...\"\n    # systemctl restart $SERVICE\ndone\n\necho \"All services restarted!\""
        },
        type: "bash"
      }
    ]
  },
  RU: {
    title: "Linux & Bash (MUST)",
    description: "Shell-скрипты, процессы, права и сеть. Абсолютный фундамент для любого DevOps-инженера.",
    lessons: [
      {
        id: "devops-linux-fhs",
        title: "Философия Linux и Файловая Система",
        theory: {
          sections: [
            { type: "heading", content: "Всё есть Файл" },
            { type: "text", content: "В Linux абсолютно всё представлено в виде файлов. Ваш жесткий диск — это файл (/dev/sda), ваш терминал — это файл, и даже запущенные процессы показывают свою статистику как текстовые файлы в папке /proc. Чтобы управлять сервером, вам не нужен графический интерфейс (GUI); вы просто читаете и пишете файлы." },
            { type: "heading", content: "Главные папки для DevOps" },
            { type: "text", content: "Стандарт FHS (Filesystem Hierarchy Standard) определяет, где что лежит. DevOps-инженер проводит 90% времени в этих трех папках:" },
            { type: "list", items: [
              "/etc: Пульт управления. Здесь лежат все конфигурационные файлы системы (конфиги Nginx, ключи SSH, настройки сети). Если нужно изменить поведение сервиса, вы редактируете текстовый файл здесь.",
              "/var/log: Черный ящик. Здесь лежат логи системы и приложений. Когда падает сервер или ломается деплой, это первое место, куда вы идете.",
              "/proc: Виртуальная файловая система. Она не существует на жестком диске; ядро Linux генерирует её в оперативной памяти (RAM). Содержит инфу о процессоре (/proc/cpuinfo), памяти и запущенных процессах."
            ]},
            { type: "tip", content: "Ресурс: Linux Journey. Зайдите на linuxjourney.com и пройдите модули 'Command Line' и 'Text-Fu'. Это самый красивый и понятный способ выучить навигацию по терминалу (cd, ls, pwd, cat)." }
          ]
        },
        practice: {
          title: "Исследование системы",
          description: "Прочитайте метаданные сервера базовыми командами.",
          task: "Напишите скрипт, который выведет текущую папку (pwd), покажет все файлы с правами (ls -la) и прочитает информацию об ОС из стандартного конфигурационного файла /etc/os-release.",
          starterCode: "#!/bin/bash\n\n# 1. Выведите текущую рабочую директорию\n\n\n# 2. Выведите все файлы с детальной инфой (включая скрытые)\n\n\n# 3. Выведите содержимое файла с инфой об ОС\ncat /etc/os-release"
        },
        type: "bash"
      },
      {
        id: "devops-bash-io",
        title: "Перенаправления и Пайпы (|)",
        theory: {
          sections: [
            { type: "heading", content: "Стандартные потоки" },
            { type: "text", content: "Каждая команда в Linux по умолчанию открывает три потока данных:" },
            { type: "list", items: [
              "0 (STDIN): Стандартный ввод (то, что вы печатаете).",
              "1 (STDOUT): Стандартный вывод (успешный результат команды).",
              "2 (STDERR): Стандартный поток ошибок (сообщения 'Отказано в доступе')."
            ]},
            { type: "heading", content: "Перенаправление (>, >>, 2>&1)" },
            { type: "text", content: "Вы можете направить STDOUT в файл с помощью `>`. Это ПЕРЕЗАПИШЕТ файл. Если вы хотите ДОПИСАТЬ в конец файла (например, новую строчку в лог), используйте `>>`." },
            { type: "text", content: "Часто ошибки портят чистый вывод скрипта. Вы можете перенаправить поток ошибок (2) в стандартный вывод (1) с помощью магии `2>&1`, либо выбросить ошибки в черную дыру: `2>/dev/null`." },
            { type: "heading", content: "Конвейер (Pipe |)" },
            { type: "text", content: "Пайп `|` берет STDOUT левой команды и передает его прямо в STDIN правой команды. Это позволяет строить конвейеры из мелких утилит для решения огромных задач." },
            { type: "tip", content: "Ресурс: OverTheWire (Bandit). Пройдите уровни 1-10. Это геймифицированный CTF-тренажер, где вы ОБЯЗАНЫ использовать пайпы и перенаправления, чтобы вытащить пароли из хаотичных файлов." }
          ]
        },
        practice: {
          title: "Цепочки команд",
          description: "Используйте пайпы для подсчета данных.",
          task: "Мы хотим узнать, сколько файлов лежит в папке /etc. Сделайте вывод команды 'ls /etc', поставьте пайп ('|') и передайте данные в утилиту 'wc -l' (word count lines - подсчет строк).",
          starterCode: "#!/bin/bash\n\n# Объедините ls и wc с помощью пайпа для подсчета файлов в /etc\nls /etc \n\n# Дописываем новую строку в лог, не удаляя старые данные\necho \"Деплой завершен в $(date)\" >> deployment.log"
        },
        type: "bash"
      },
      {
        id: "devops-text-fu",
        title: "Парсинг логов: Grep, Awk и Sed",
        theory: {
          sections: [
            { type: "heading", content: "Святая Троица парсинга" },
            { type: "text", content: "DevOps-инженеру постоянно приходится работать с логами Nginx размером по 10 ГБ. Открыть их в Блокноте не выйдет — он зависнет. Вы обязаны парсить их через консоль." },
            { type: "list", items: [
              "grep: Фильтр. `grep 'ERROR' app.log` выведет только те строки, где есть слово ERROR.",
              "awk: Экстрактор колонок. Логи часто разделены пробелами. `awk '{print $1}' access.log` выведет ТОЛЬКО первую колонку (обычно это IP-адрес) для каждой строки.",
              "sed: Потоковый редактор. Используется для автозамены текста 'на лету'. `sed 's/ERROR/WARN/g' app.log` заменит все слова ERROR на WARN."
            ]},
            { type: "text", content: "Комбинируя их через пайпы, вы можете делать моментальную аналитику огромных данных." },
            { type: "code", content: "# Пример: Получить Топ-5 IP-адресов, которые обращались к нашему серверу\ncat access.log | awk '{print $1}' | sort | uniq -c | sort -nr | head -5" }
          ]
        },
        practice: {
          title: "Извлечение IP из логов",
          description: "Используйте awk для парсинга текста.",
          task: "Представьте лог-файл 'server.log', где каждая строка выглядит так: '192.168.1.50 GET / 200'. Напишите пайплайн: выведите файл (cat), передайте в awk для извлечения 1-й колонки (IP) и отсортируйте (sort).",
          starterCode: "#!/bin/bash\n\n# Создаем фейковый лог\necho \"10.0.0.1 GET / 200\" > server.log\necho \"192.168.1.5 POST /api 500\" >> server.log\necho \"10.0.0.1 GET /images 200\" >> server.log\n\n# Извлеките только IP-адреса (колонка $1) с помощью awk\ncat server.log | awk '{print }' | sort"
        },
        type: "bash"
      },
      {
        id: "devops-permissions",
        title: "Безопасность: Права доступа и SSH ключи",
        theory: {
          sections: [
            { type: "heading", content: "Почему chmod 777 — это преступление" },
            { type: "text", content: "Команда `ls -l` показывает строку вроде `-rwxr-xr--`. Это матрица прав. Она делится на 3 группы: Владелец (User), Группа (Group) и Остальные (Others)." },
            { type: "text", content: "r = read (4), w = write (2), x = execute (1). Вы складываете цифры, чтобы задать права." },
            { type: "list", items: [
              "7 (4+2+1): Чтение, Запись, Выполнение.",
              "6 (4+2): Чтение, Запись.",
              "4: Только чтение."
            ]},
            { type: "text", content: "Запуск `chmod 777 file` дает АБСОЛЮТНО ВСЕМ пользователям сервера права на изменение и запуск файла. Если вы сделаете это в продакшене (например, на папке сайта) — вас уволят. Всегда используйте принцип наименьших привилегий." },
            { type: "heading", content: "Приватные SSH Ключи" },
            { type: "text", content: "DevOps-инженеры подключаются к серверам по SSH-ключам (`id_rsa`). Linux жестко контролирует их безопасность. Если ваш приватный ключ имеет права, позволяющие другим читать его (например, 644), программа SSH выдаст ошибку 'UNPROTECTED PRIVATE KEY FILE!' и откажется подключаться." },
            { type: "text", content: "Вы ОБЯЗАНЫ выставлять права на ключ как 600 (Владелец читает/пишет, остальные не имеют никаких прав)." }
          ]
        },
        practice: {
          title: "Защити SSH Ключ",
          description: "Исправьте права доступа с помощью восьмеричной системы.",
          task: "Вы сгенерировали приватный ключ 'id_rsa', но его права слишком открыты. Используйте команду 'chmod', чтобы задать права '600', закрыв доступ всем, кроме владельца.",
          starterCode: "#!/bin/bash\n\n# 1. Создаем файл-болванку\ntouch id_rsa\n\n# 2. Обезопасим его! Установите права 600\nchmod  id_rsa\n\n# Проверка\nls -l id_rsa"
        },
        type: "bash"
      },
      {
        id: "devops-processes",
        title: "Процессы и Systemd (Демоны)",
        theory: {
          sections: [
            { type: "heading", content: "Процессы против Демонов" },
            { type: "text", content: "Любая запущенная программа — это процесс. Вы смотрите их через `ps aux` или `top`. Убиваете через `kill -9 <PID>`." },
            { type: "text", content: "Но DevOps-инженер разворачивает веб-серверы (Nginx) и базы данных (PostgreSQL). Они не должны запускаться в вашем открытом терминале. Они должны работать в фоне всегда, стартовать автоматически при перезагрузке сервера и перезапускаться при падении. Такие фоновые службы называются Демонами (Daemons)." },
            { type: "heading", content: "Systemd и systemctl" },
            { type: "text", content: "Современный Linux использует систему `systemd` для управления демонами. Вы управляете ей через команду `systemctl`." },
            { type: "list", items: [
              "systemctl start nginx: Запускает службу.",
              "systemctl enable nginx: Говорит ОС автоматически запускать Nginx при включении сервера.",
              "systemctl status nginx: Показывает, работает ли служба или упала с ошибкой.",
              "journalctl -u nginx: Читает логи конкретно этой службы."
            ]}
          ]
        },
        practice: {
          title: "Управление службами",
          description: "Используйте systemctl для управления демоном.",
          task: "Напишите команду для проверки статуса (status) службы 'docker'. Затем напишите команду для добавления её в автозагрузку (enable).",
          starterCode: "#!/bin/bash\n\n# 1. Проверяем статус демона Docker\nsystemctl \n\n# 2. Добавляем Docker в автозагрузку при старте ОС\nsystemctl "
        },
        type: "bash"
      },
      {
        id: "devops-networking",
        title: "Сетевые утилиты (Troubleshooting)",
        theory: {
          sections: [
            { type: "heading", content: "Открыт ли порт?" },
            { type: "text", content: "Когда разработчик жалуется: 'Приложение не может подключиться к базе', DevOps-инженер обязан диагностировать сеть. Мы не гадаем, мы проверяем утилитами." },
            { type: "list", items: [
              "ip a: Заменила устаревшую `ifconfig`. Показывает IP-адреса вашего сервера.",
              "ping: Проверяет, жив ли соседний сервер (доступность по L3 ICMP).",
              "ss -tulpn: Заменила `netstat`. Показывает все 'Слушающие' (Listening) порты на сервере. Критически важно, чтобы проверить, реально ли ваш Node.js сервер запустился на 8080 порту.",
              "curl -I: Делает запрос и показывает ТОЛЬКО HTTP-заголовки. Идеально для проверки того, отвечает ли API статусом 200 OK или 502 Bad Gateway."
            ]},
            { type: "heading", content: "Проверка DNS" },
            { type: "text", content: "Если доменное имя сайта не работает, используйте утилиту `dig google.com` или `host google.com`, чтобы проверить, успешно ли DNS-сервер переводит имя в IP-адрес." }
          ]
        },
        practice: {
          title: "Сетевая диагностика",
          description: "Используйте утилиты для проверки связности.",
          task: "Используйте команду `curl` для выполнения запроса к 'http://localhost'. Передайте флаг `-I` (большая 'и'), чтобы скачать только HTTP-заголовки, не загружая всё тело HTML-страницы.",
          starterCode: "#!/bin/bash\n\n# 1. Проверяем, какие порты слушает наш сервер\nss -tulpn\n\n# 2. Скачиваем HTTP-заголовки локального веб-сервера\ncurl "
        },
        type: "bash"
      },
      {
        id: "devops-bash-scripting",
        title: "Bash Скрипты: Переменные и Коды возврата",
        theory: {
          sections: [
            { type: "heading", content: "Автоматизация рутины" },
            { type: "text", content: "Если вы пишете 5 команд руками дважды — пишите скрипт. Bash-скрипты всегда начинаются с 'Шебанга' `#!/bin/bash`, который говорит операционной системе, какой интерпретатор использовать." },
            { type: "heading", content: "Переменные и Кавычки" },
            { type: "text", content: "В Bash при создании переменной НЕ ДОЛЖНО БЫТЬ пробелов вокруг равно: `APP_PORT=8080`. Чтобы прочитать её, добавьте знак доллара: `echo $APP_PORT`." },
            { type: "text", content: "Одинарные кавычки `'текст'` воспринимают всё буквально. Двойные кавычки `\"текст\"` позволяют раскрывать переменные внутри (интерполяция)." },
            { type: "heading", content: "Коды возврата / Exit Codes ($?)" },
            { type: "text", content: "Когда любая команда в Linux завершается, она тайно оставляет 'Код возврата'. 0 означает Успех. Любое число от 1 до 255 означает Ошибку. Этот код сохраняется в специальную переменную `$?`. Именно так скрипты понимают, упала ли предыдущая команда!" },
            { type: "tip", content: "Ресурс: Bash Academy. Это потрясающий ресурс для правильного изучения Bash. Он с примерами объясняет массивы, подстановки параметров и логические условия." }
          ]
        },
        practice: {
          title: "Скрипт проверки здоровья (Health Check)",
          description: "Напишите if/else с проверкой exit code.",
          task: "Мы пингуем сервер. Напишите конструкцию if/else, проверяющую код возврата `$?`. Помните, что в синтаксисе Bash пробелы внутри скобок `[ ]` ОБЯЗАТЕЛЬНЫ: `if [ $? -eq 0 ]; then`.",
          starterCode: "#!/bin/bash\n\nTARGET=\"8.8.8.8\"\nping -c 1 $TARGET > /dev/null 2>&1\n\n# Проверяем код возврата команды ping\nif [ $? -eq 0 ]; then\n    echo \"Сервер $TARGET РАБОТАЕТ\"\nelse\n    echo \"Сервер $TARGET НЕДОСТУПЕН\"\nfi"
        },
        type: "bash"
      },
      {
        id: "devops-bash-loops",
        title: "Bash Скрипты: Циклы и Cron",
        theory: {
          sections: [
            { type: "heading", content: "Циклы For" },
            { type: "text", content: "Циклы незаменимы для применения одной команды к списку серверов или файлов." },
            { type: "code", content: "for SERVER in web1 web2 db1; do\n  echo \"Подключаюсь к $SERVER...\"\n  # ssh $SERVER 'uptime'\ndone" },
            { type: "text", content: "Также можно итерироваться по файлам в папке: `for FILE in *.log; do cat $FILE; done`." },
            { type: "heading", content: "Расписание через Cron" },
            { type: "text", content: "Скрипты бесполезны, если вам нужно просыпаться в 3 ночи, чтобы их запустить. Планировщиком задач в Linux управляет демон `cron`. Настройки редактируются командой `crontab -e`." },
            { type: "text", content: "Крон-выражение состоит из 5 звездочек: Минута, Час, День месяца, Месяц, День недели. \n`0 2 * * * /scripts/backup.sh` означает 'Запускать backup.sh каждый день ровно в 2:00 ночи'." }
          ]
        },
        practice: {
          title: "Цикл по службам",
          description: "Перезапуск списка сервисов автоматически.",
          task: "Напишите цикл for, который перебирает список из трех сервисов: 'nginx', 'postgresql' и 'redis'. Внутри цикла выводите 'Перезапускаю [имя_сервиса]...', используя переменную цикла.",
          starterCode: "#!/bin/bash\n\n# Запускаем цикл по списку демонов\nfor SERVICE in nginx postgresql redis; do\n    # Используйте переменную $SERVICE\n    echo \"Перезапускаю ...\"\n    # systemctl restart $SERVICE\ndone\n\necho \"Все сервисы перезапущены!\""
        },
        type: "bash"
      }
    ]
  }
};