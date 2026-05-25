export const htmlCssLessons: Record<'EN' | 'RU', any> = {

  EN: {
    title: "HTML & CSS",
    description: "Learn HTML and CSS step by step — from your very first tag to a full styled page.",
    lessons: [

      // ============= LESSON 1 =============
      {
        id: "html-what-is",
        title: "What is HTML?",
        theory: {
          sections: [
            { type: "heading", content: "HTML — the language of every website" },
            { type: "text", content: "Every website you see — YouTube, Wikipedia, Google — is built with HTML. HTML stands for HyperText Markup Language. It's not a programming language, it's a markup language: you use special words called TAGS to tell the browser what each piece of content is." },

            { type: "heading", content: "What is a tag?" },
            { type: "text", content: "A tag tells the browser: 'this part of the text is a heading', 'this part is a paragraph', 'this is a button'. Tags are written in angle brackets like this:" },
            { type: "code", content: '<h1>This is a heading</h1>\n<p>This is a paragraph</p>' },

            { type: "heading", content: "Opening and closing tags" },
            { type: "text", content: "Most tags come in pairs: opening tag and closing tag. The closing tag has a slash /. The content goes between them." },
            { type: "code", content: '<h1>Hello</h1>\n\n<!-- h1 — opening tag -->\n<!-- Hello — content -->\n<!-- /h1 — closing tag -->' },

            { type: "tip", content: "Don't worry about memorizing tags. There are only about 20 you'll use 90% of the time. We'll learn them one by one." }
          ]
        },
        practice: {
          title: "Your first HTML",
          description: "Just two lines. Click Run Code and see the result in Preview.",
          task: "Write a heading and a paragraph. That's it!",
          starterCode: '<h1>Hello, World!</h1>\n<p>This is my first HTML.</p>',
        },
        type: "html-css-js"
      },

      // ============= LESSON 2 =============
      {
        id: "html-headings",
        title: "Headings: h1 to h6",
        theory: {
          sections: [
            { type: "heading", content: "Six levels of headings" },
            { type: "text", content: "HTML has 6 heading tags: from h1 (biggest, most important) to h6 (smallest). They visually create hierarchy and tell search engines what your page is about." },
            { type: "code", content: '<h1>Main title (biggest)</h1>\n<h2>Section title</h2>\n<h3>Subsection</h3>\n<h4>Smaller heading</h4>\n<h5>Even smaller</h5>\n<h6>Smallest heading</h6>' },

            { type: "heading", content: "Important rule" },
            { type: "text", content: "Use only ONE h1 per page — it's the main title (like the title of a book). Other headings (h2, h3...) divide your content into sections, like chapters and subchapters." },

            { type: "heading", content: "What NOT to do" },
            { type: "text", content: "Don't pick a heading based on its size! Pick it based on importance. If you need bigger or smaller text — use CSS for that (we'll learn it later)." },
            { type: "code", content: '<!-- ❌ BAD: jumping levels -->\n<h1>About me</h1>\n<h4>I love coding</h4>\n\n<!-- ✅ GOOD: logical order -->\n<h1>About me</h1>\n<h2>I love coding</h2>' },

            { type: "tip", content: "Think of headings like a table of contents. h1 = book title, h2 = chapters, h3 = subchapters." }
          ]
        },
        practice: {
          title: "Practice headings",
          description: "Try all 6 levels to see the size difference.",
          task: "Write all 6 heading levels with different text.",
          starterCode: '<h1>Heading level 1</h1>\n<h2>Heading level 2</h2>\n<h3>Heading level 3</h3>\n<h4>Heading level 4</h4>\n<h5>Heading level 5</h5>\n<h6>Heading level 6</h6>',
        },
        type: "html-css-js"
      },

      // ============= LESSON 3 =============
      {
        id: "html-text",
        title: "Paragraphs and Text",
        theory: {
          sections: [
            { type: "heading", content: "The <p> tag — paragraph" },
            { type: "text", content: "Any chunk of regular text on a page should be wrapped in <p>. The browser will add some space before and after each paragraph automatically." },
            { type: "code", content: '<p>This is the first paragraph.</p>\n<p>This is the second paragraph.</p>' },

            { type: "heading", content: "Line break — <br>" },
            { type: "text", content: "Sometimes you need a line break WITHOUT starting a new paragraph (like in a poem or address). Use <br>. It's a self-closing tag — no </br> needed." },
            { type: "code", content: '<p>Roses are red,<br>Violets are blue.</p>' },

            { type: "heading", content: "Bold and italic" },
            { type: "text", content: "To make text bold use <strong>. For italic use <em>. These tags tell the browser the text is IMPORTANT or EMPHASIZED — not just styled." },
            { type: "code", content: '<p>This is <strong>very important</strong> text.</p>\n<p>This is <em>emphasized</em> text.</p>\n<p>You can <strong><em>combine</em></strong> both.</p>' },

            { type: "heading", content: "Don't do this" },
            { type: "text", content: "Don't use multiple <br> tags to add space between content. Don't write all text in one giant <p>. Break it into logical paragraphs." },

            { type: "tip", content: "Browser ignores extra spaces and line breaks in your code. To add real spacing, use new tags (<p>, <br>) or CSS later." }
          ]
        },
        practice: {
          title: "Try text formatting",
          description: "Write paragraphs with bold and italic words.",
          task: "Write 2 paragraphs about yourself. Use <strong> for something important and <em> for something you emphasize.",
          starterCode: '<h2>About me</h2>\n<p>My name is <strong>Alex</strong> and I am learning HTML.</p>\n<p>I think coding is <em>really fun</em> and I want to build my own website.</p>',
        },
        type: "html-css-js"
      },

      // ============= LESSON 4 =============
      {
        id: "html-lists",
        title: "Lists",
        theory: {
          sections: [
            { type: "heading", content: "Two types of lists" },
            { type: "text", content: "HTML has 2 main list types: unordered (with bullets •) and ordered (with numbers 1, 2, 3). Each item inside a list goes in a <li> tag (list item)." },

            { type: "heading", content: "Unordered list — <ul>" },
            { type: "text", content: "Use when order doesn't matter — like ingredients, tags, features." },
            { type: "code", content: '<ul>\n  <li>Apples</li>\n  <li>Bananas</li>\n  <li>Cherries</li>\n</ul>\n\n<!-- Result: -->\n<!-- • Apples -->\n<!-- • Bananas -->\n<!-- • Cherries -->' },

            { type: "heading", content: "Ordered list — <ol>" },
            { type: "text", content: "Use when order matters — like steps in a recipe, ranking, instructions." },
            { type: "code", content: '<ol>\n  <li>Open the door</li>\n  <li>Go inside</li>\n  <li>Close the door</li>\n</ol>\n\n<!-- Result: -->\n<!-- 1. Open the door -->\n<!-- 2. Go inside -->\n<!-- 3. Close the door -->' },

            { type: "heading", content: "Lists inside lists" },
            { type: "text", content: "You can put a list inside a <li> to make sub-items. This is called nested lists." },
            { type: "code", content: '<ul>\n  <li>Fruits\n    <ul>\n      <li>Apples</li>\n      <li>Bananas</li>\n    </ul>\n  </li>\n  <li>Vegetables\n    <ul>\n      <li>Carrots</li>\n      <li>Potatoes</li>\n    </ul>\n  </li>\n</ul>' },

            { type: "tip", content: "Indent your code with spaces (usually 2). It makes nested tags easy to read. Browser doesn't care, but you and other people do." }
          ]
        },
        practice: {
          title: "Make two lists",
          description: "One unordered (your hobbies), one ordered (steps).",
          task: "Make a list of 3 hobbies (unordered) and a list of 3 steps to make tea (ordered).",
          starterCode: '<h2>My hobbies</h2>\n<ul>\n  <li>Reading books</li>\n  <li>Playing games</li>\n  <li>Coding</li>\n</ul>\n\n<h2>How to make tea</h2>\n<ol>\n  <li>Boil water</li>\n  <li>Put a tea bag in a cup</li>\n  <li>Pour water in the cup</li>\n</ol>',
        },
        type: "html-css-js"
      },

      // ============= LESSON 5 =============
      {
        id: "html-links",
        title: "Links",
        theory: {
          sections: [
            { type: "heading", content: "The <a> tag — anchor" },
            { type: "text", content: "Links are what makes the web a WEB. The tag <a> creates a link. You need the href attribute to tell where the link should go." },
            { type: "code", content: '<a href="https://google.com">Go to Google</a>' },

            { type: "heading", content: "What is an attribute?" },
            { type: "text", content: "An attribute is extra info inside a tag. Format: name='value'. The href attribute tells WHERE the link goes. The text between <a> and </a> is what the user clicks on." },
            { type: "code", content: '<a href="https://wikipedia.org">Wikipedia</a>\n<!-- href — attribute -->\n<!-- "https://wikipedia.org" — value -->\n<!-- Wikipedia — clickable text -->' },

            { type: "heading", content: "Opening in a new tab" },
            { type: "text", content: "Add target='_blank' to open the link in a new tab. Add rel='noopener' for security when opening external links." },
            { type: "code", content: '<a href="https://github.com" target="_blank" rel="noopener">\n  Open GitHub in new tab\n</a>' },

            { type: "heading", content: "Different types of links" },
            { type: "code", content: '<!-- Link to another website -->\n<a href="https://example.com">External</a>\n\n<!-- Link to another page on your site -->\n<a href="/about">About page</a>\n\n<!-- Link to email -->\n<a href="mailto:hello@example.com">Send email</a>\n\n<!-- Link to phone -->\n<a href="tel:+1234567890">Call us</a>' },

            { type: "tip", content: "Write meaningful link text. Avoid 'click here' — write 'download the report' or 'read more about React'. Better for users AND for SEO." }
          ]
        },
        practice: {
          title: "Create different links",
          description: "Practice all kinds of links.",
          task: "Make 3 links: one to a website (new tab), one to your email, one to a phone number.",
          starterCode: '<h2>Contact me</h2>\n\n<p>\n  Visit my <a href="https://github.com" target="_blank" rel="noopener">GitHub</a>\n</p>\n\n<p>\n  Email me: <a href="mailto:hello@example.com">hello@example.com</a>\n</p>\n\n<p>\n  Or call: <a href="tel:+1234567890">+1 (234) 567-890</a>\n</p>',
        },
        type: "html-css-js"
      },

      // ============= LESSON 6 =============
      {
        id: "html-images",
        title: "Images",
        theory: {
          sections: [
            { type: "heading", content: "The <img> tag" },
            { type: "text", content: "Images are added with the <img> tag. It's a self-closing tag (no </img>). You need two attributes: src (where the image is) and alt (text description)." },
            { type: "code", content: '<img src="cat.jpg" alt="A cute cat">' },

            { type: "heading", content: "What is src?" },
            { type: "text", content: "src (source) — tells the browser WHERE to find the image. It can be a file on your site or a full URL to an image online." },
            { type: "code", content: '<!-- Image from a website -->\n<img src="https://picsum.photos/300/200" alt="Random photo">\n\n<!-- Image from your own files (when you have a site) -->\n<img src="photos/me.jpg" alt="A photo of me">' },

            { type: "heading", content: "Why alt is important" },
            { type: "text", content: "The alt attribute describes the image in words. It's important because: 1) blind users use screen readers that read it out loud, 2) if the image fails to load, the alt text shows instead, 3) Google reads it to understand what your image is about." },
            { type: "code", content: '<!-- ❌ BAD: empty or useless alt -->\n<img src="dog.jpg" alt="">\n<img src="dog.jpg" alt="image">\n\n<!-- ✅ GOOD: describes the image -->\n<img src="dog.jpg" alt="Golden retriever puppy playing with a ball">' },

            { type: "heading", content: "Size of the image" },
            { type: "text", content: "You can set width and height in pixels. Or use CSS later for more control." },
            { type: "code", content: '<img src="cat.jpg" alt="Cat" width="300">\n<img src="cat.jpg" alt="Cat" width="300" height="200">' },

            { type: "tip", content: "Always include alt — even if it's empty (alt=\"\") for decorative images. It's not optional, it's an accessibility requirement." }
          ]
        },
        practice: {
          title: "Add images to a page",
          description: "Use picsum.photos for free random images.",
          task: "Add 2 images with proper alt text and a heading.",
          starterCode: '<h2>My gallery</h2>\n\n<img src="https://picsum.photos/seed/cat/400/250" alt="Random landscape photo from picsum">\n\n<p>This is my favorite picture.</p>\n\n<img src="https://picsum.photos/seed/dog/400/250" alt="Another beautiful random photo">\n\n<p>And this one too!</p>',
        },
        type: "html-css-js"
      },

      // ============= LESSON 7 =============
      {
        id: "html-containers",
        title: "Containers: div and span",
        theory: {
          sections: [
            { type: "heading", content: "Why we need containers" },
            { type: "text", content: "Sometimes you want to GROUP elements together — to style them, position them, or treat them as a single block. That's what <div> and <span> are for. They have NO visual meaning themselves — they're just boxes." },

            { type: "heading", content: "div — block container" },
            { type: "text", content: "A <div> takes the full width of its parent and creates a new line. Used to group bigger chunks of content like a card, a section, a sidebar." },
            { type: "code", content: '<div>\n  <h3>Pizza</h3>\n  <p>Delicious Italian dish.</p>\n  <p>$12.99</p>\n</div>\n\n<div>\n  <h3>Burger</h3>\n  <p>Classic American food.</p>\n  <p>$8.99</p>\n</div>' },

            { type: "heading", content: "span — inline container" },
            { type: "text", content: "A <span> sits inline with other text (no new line). Used to mark up a small piece of text inside a paragraph — like highlighting one word." },
            { type: "code", content: '<p>\n  My favorite color is <span>blue</span>.\n  My favorite food is <span>pizza</span>.\n</p>' },

            { type: "heading", content: "The class attribute" },
            { type: "text", content: "To style different divs/spans differently, give them a class. A class is like a label. You'll use it with CSS later to apply styles." },
            { type: "code", content: '<div class="card">\n  <h3>Title</h3>\n</div>\n\n<div class="card highlighted">\n  <h3>Special card</h3>\n</div>\n\n<p>\n  Important word: <span class="warning">DANGER</span>\n</p>' },

            { type: "tip", content: "Don't overuse divs. If a semantic tag fits — use it (header, nav, article, footer). We'll learn those soon. div is the fallback when nothing else fits." }
          ]
        },
        practice: {
          title: "Group with div and span",
          description: "Build a simple card and highlight a word inline.",
          task: "Make 2 product cards using <div>, and a paragraph with one word in <span>.",
          starterCode: '<div class="card">\n  <h3>Pizza Margherita</h3>\n  <p>Classic Italian pizza with tomato and mozzarella.</p>\n  <p>Price: <span class="price">$12.99</span></p>\n</div>\n\n<div class="card">\n  <h3>Caesar Salad</h3>\n  <p>Fresh romaine lettuce with Caesar dressing.</p>\n  <p>Price: <span class="price">$8.50</span></p>\n</div>',
        },
        type: "html-css-js"
      },

      // ============= LESSON 8 =============
      {
        id: "html-structure",
        title: "Page Structure",
        theory: {
          sections: [
            { type: "heading", content: "Every page needs structure" },
            { type: "text", content: "So far we've been writing just snippets. A real HTML page has a special structure that tells the browser: 'this is a complete document'." },

            { type: "heading", content: "The full structure" },
            { type: "code", content: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>My Page</title>\n</head>\n<body>\n  <!-- All visible content goes here -->\n  <h1>Hello!</h1>\n  <p>This is my page.</p>\n</body>\n</html>' },

            { type: "heading", content: "What each part does" },
            { type: "list", items: [
              "<!DOCTYPE html> — tells browser: 'this is HTML5'. Always the first line.",
              "<html> — wraps everything. The lang attribute helps screen readers and Google.",
              "<head> — info ABOUT the page (not shown to user)",
              "<meta charset='UTF-8'> — supports all languages and emojis 🎉",
              "<title> — text in the browser tab",
              "<body> — everything the user actually SEES on the page"
            ]},

            { type: "heading", content: "Visible vs invisible" },
            { type: "text", content: "Stuff in <head> is INVISIBLE to users — it's metadata, settings, links to CSS/JS files. Stuff in <body> is what people SEE on the page." },

            { type: "tip", content: "When you create a new HTML file in real life, always start with this skeleton. Most editors have a shortcut to insert it (in VS Code type '!' and press Tab)." }
          ]
        },
        practice: {
          title: "Build a full HTML page",
          description: "Use all the tags you've learned in a proper page structure.",
          task: "Create a full HTML document with a title, a heading, a paragraph, a list, and a link.",
          starterCode: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>My First Page</title>\n</head>\n<body>\n\n  <h1>Welcome to my page!</h1>\n\n  <p>Hi, my name is <strong>Alex</strong> and I am learning HTML.</p>\n\n  <h2>Things I like</h2>\n  <ul>\n    <li>Pizza</li>\n    <li>Coding</li>\n    <li>Games</li>\n  </ul>\n\n  <p>\n    Check out my <a href="https://github.com" target="_blank">GitHub</a>!\n  </p>\n\n</body>\n</html>',
        },
        type: "html-css-js"
      },

      // ============= LESSON 9 =============
      {
        id: "html-semantic",
        title: "Semantic Tags",
        theory: {
          sections: [
            { type: "heading", content: "Why semantic tags?" },
            { type: "text", content: "Instead of writing <div class='header'>, you can use <header>. The browser, screen readers, and Google understand what part of the page each tag is. This is called SEMANTIC HTML — tags that describe meaning, not appearance." },

            { type: "heading", content: "Main semantic tags" },
            { type: "code", content: '<header>   <!-- Top of the page (logo, navigation) -->\n<nav>      <!-- Navigation menu -->\n<main>     <!-- Main content (only ONE per page) -->\n<section>  <!-- Section of content -->\n<article>  <!-- Self-contained content (blog post, comment) -->\n<aside>    <!-- Side content (sidebar) -->\n<footer>   <!-- Bottom of the page (copyright, links) -->' },

            { type: "heading", content: "div vs semantic" },
            { type: "code", content: '<!-- ❌ Using divs (browser doesn\'t understand what\'s what) -->\n<div class="header">\n  <div class="nav">...</div>\n</div>\n<div class="content">...</div>\n<div class="footer">...</div>\n\n<!-- ✅ Using semantic tags (everyone understands) -->\n<header>\n  <nav>...</nav>\n</header>\n<main>...</main>\n<footer>...</footer>' },

            { type: "heading", content: "Why bother?" },
            { type: "list", items: [
              "Screen readers can navigate by landmarks (header, nav, main, footer)",
              "Google understands your page structure better → better SEO",
              "Your code is much easier to read later",
              "Browser features (reader mode, save-as-PDF) work better"
            ]},

            { type: "tip", content: "Rule of thumb: if a semantic tag fits — use it. Only use <div> when nothing else makes sense." }
          ]
        },
        practice: {
          title: "Restructure with semantic tags",
          description: "Build a page layout using semantic tags instead of divs.",
          task: "Build a simple page with header (logo + nav), main (content), and footer.",
          starterCode: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>My Blog</title>\n</head>\n<body>\n\n  <header>\n    <h1>My Blog</h1>\n    <nav>\n      <a href="/">Home</a> | \n      <a href="/about">About</a> | \n      <a href="/contact">Contact</a>\n    </nav>\n  </header>\n\n  <main>\n    <article>\n      <h2>My first post</h2>\n      <p>This is the content of my first blog post.</p>\n    </article>\n\n    <article>\n      <h2>My second post</h2>\n      <p>Another interesting story here.</p>\n    </article>\n  </main>\n\n  <footer>\n    <p>© 2026 My Blog. All rights reserved.</p>\n  </footer>\n\n</body>\n</html>',
        },
        type: "html-css-js"
      },

      // ============= LESSON 10 =============
      {
        id: "html-forms",
        title: "Forms and Inputs",
        theory: {
          sections: [
            { type: "heading", content: "Forms — how users send data" },
            { type: "text", content: "Forms are how users TYPE things on a website — search bars, login forms, comments. The main tags: <form>, <input>, <label>, <button>." },

            { type: "heading", content: "Basic input" },
            { type: "code", content: '<input type="text" placeholder="Enter your name">' },
            { type: "text", content: "type — what kind of input (text, email, password, etc.). placeholder — gray hint text shown before user types anything." },

            { type: "heading", content: "Different input types" },
            { type: "code", content: '<input type="text" placeholder="Name">\n<input type="email" placeholder="Email">\n<input type="password" placeholder="Password">\n<input type="number" placeholder="Age">\n<input type="date">\n<input type="checkbox"> I agree\n<input type="radio" name="color"> Red\n<input type="radio" name="color"> Blue' },

            { type: "heading", content: "Labels — for accessibility" },
            { type: "text", content: "Always add a <label> for every input. It tells users (and screen readers) what the input is for. Connect label to input with for/id." },
            { type: "code", content: '<label for="email">Your email:</label>\n<input type="email" id="email">\n\n<!-- Or wrap input inside label (no id needed) -->\n<label>\n  Your email:\n  <input type="email">\n</label>' },

            { type: "heading", content: "Buttons" },
            { type: "code", content: '<button>Click me</button>\n<button type="submit">Send form</button>' },

            { type: "heading", content: "A complete form" },
            { type: "code", content: '<form>\n  <label>\n    Name:\n    <input type="text" required>\n  </label>\n\n  <label>\n    Email:\n    <input type="email" required>\n  </label>\n\n  <button type="submit">Sign Up</button>\n</form>' },

            { type: "tip", content: "The required attribute makes the field mandatory. The browser will block the form if it's empty. Use it for fields that must be filled." }
          ]
        },
        practice: {
          title: "Build a simple sign-up form",
          description: "Create a form with name, email, password, and a submit button.",
          task: "Build a registration form with 3 inputs (name, email, password), a checkbox, and a submit button.",
          starterCode: '<h2>Sign up</h2>\n\n<form>\n  <p>\n    <label>\n      Your name:<br>\n      <input type="text" placeholder="John Doe" required>\n    </label>\n  </p>\n\n  <p>\n    <label>\n      Your email:<br>\n      <input type="email" placeholder="you@example.com" required>\n    </label>\n  </p>\n\n  <p>\n    <label>\n      Password:<br>\n      <input type="password" required>\n    </label>\n  </p>\n\n  <p>\n    <label>\n      <input type="checkbox" required>\n      I agree to the terms\n    </label>\n  </p>\n\n  <button type="submit">Sign Up</button>\n</form>',
        },
        type: "html-css-js"
      },
          // ============= LESSON 11 =============
        {
        id: "html-tables",
        title: "Tables",
        theory: {
          sections: [
            { type: "heading", content: "When to use tables" },
            { type: "text", content: "Use <table> for actual tabular data — like a price list, schedule, statistics. DON'T use tables for page layout (that was done in the 90s, today we use CSS for that)." },

            { type: "heading", content: "Basic structure" },
            { type: "code", content: '<table>\n  <tr>\n    <th>Name</th>\n    <th>Age</th>\n    <th>City</th>\n  </tr>\n  <tr>\n    <td>Alice</td>\n    <td>30</td>\n    <td>London</td>\n  </tr>\n  <tr>\n    <td>Bob</td>\n    <td>25</td>\n    <td>Paris</td>\n  </tr>\n</table>' },

            { type: "heading", content: "What each tag means" },
            { type: "list", items: [
              "<table> — the table itself",
              "<tr> — table row (one horizontal line)",
              "<th> — table header (bold, centered by default)",
              "<td> — table data (regular cell)"
            ]},

            { type: "heading", content: "Spanning multiple cells" },
            { type: "text", content: "colspan makes a cell span multiple columns. rowspan makes it span multiple rows." },
            { type: "code", content: '<table border="1">\n  <tr>\n    <th colspan="2">Personal Info</th>\n  </tr>\n  <tr>\n    <td>Name</td>\n    <td>Alice</td>\n  </tr>\n  <tr>\n    <td>Age</td>\n    <td>30</td>\n  </tr>\n</table>' },

            { type: "tip", content: "The border attribute is old-school. In real projects you'll style tables with CSS. But it's handy for quick demos." }
          ]
        },
        practice: {
          title: "Build a price list",
          description: "Create a table with products and prices.",
          task: "Make a table with 3 columns (Product, Price, In stock) and 3 rows of data.",
          starterCode: '<h2>Price List</h2>\n\n<table border="1" cellpadding="10">\n  <tr>\n    <th>Product</th>\n    <th>Price</th>\n    <th>In stock</th>\n  </tr>\n  <tr>\n    <td>Pizza</td>\n    <td>$12.99</td>\n    <td>Yes</td>\n  </tr>\n  <tr>\n    <td>Burger</td>\n    <td>$8.50</td>\n    <td>Yes</td>\n  </tr>\n  <tr>\n    <td>Sushi</td>\n    <td>$18.00</td>\n    <td>No</td>\n  </tr>\n</table>',
        },
        type: "html-css-js"
      },

      // ============= LESSON 12 =============
      {
        id: "html-attributes",
        title: "Attributes: id, class, title",
        theory: {
          sections: [
            { type: "heading", content: "What attributes do" },
            { type: "text", content: "Attributes give tags extra info or behavior. You write them inside the opening tag as name='value'. Most tags accept several attributes." },

            { type: "heading", content: "id — unique label" },
            { type: "text", content: "id gives an element a UNIQUE name on the page. Only ONE element can have a specific id. Used for JavaScript and links inside a page." },
            { type: "code", content: '<h1 id="top">My Page</h1>\n<p>... lots of content ...</p>\n\n<!-- Link that jumps to the heading -->\n<a href="#top">Back to top</a>' },

            { type: "heading", content: "class — group label" },
            { type: "text", content: "class is used to GROUP multiple elements with a common label. Many elements can share the same class. Mostly used for styling with CSS." },
            { type: "code", content: '<p class="important">First important paragraph</p>\n<p class="normal">A regular paragraph</p>\n<p class="important">Another important one</p>\n\n<!-- An element can have multiple classes -->\n<div class="card highlighted large">...</div>' },

            { type: "heading", content: "title — tooltip on hover" },
            { type: "text", content: "title shows a tooltip when the user hovers over the element with the mouse. Useful for hints." },
            { type: "code", content: '<button title="Click to save your changes">Save</button>\n\n<a href="/help" title="Opens the help page">?</a>' },

            { type: "heading", content: "data-* — custom data" },
            { type: "text", content: "You can add any custom attribute starting with data-. Used to store extra info for JavaScript." },
            { type: "code", content: '<div data-user-id="42" data-role="admin">\n  Alice\n</div>\n\n<button data-action="delete" data-item-id="123">\n  Delete\n</button>' },

            { type: "tip", content: "Rule: id = ONE specific element (like passport number), class = a category (like profession). Most styling = classes. id mostly for JS and page anchors." }
          ]
        },
        practice: {
          title: "Use id, class, title",
          description: "Practice all 4 types of attributes.",
          task: "Build a page with: an id for a section, multiple elements sharing a class, a tooltip on a button, and data attributes.",
          starterCode: '<h1 id="top">My Restaurant</h1>\n\n<nav>\n  <a href="#menu">Go to menu</a> |\n  <a href="#contact">Go to contacts</a>\n</nav>\n\n<h2 id="menu">Menu</h2>\n<p class="dish">🍕 Pizza Margherita — $12</p>\n<p class="dish popular">🍔 Cheeseburger — $8</p>\n<p class="dish">🥗 Caesar Salad — $9</p>\n\n<h2 id="contact">Contacts</h2>\n<p>\n  <button title="Click to copy email" data-action="copy" data-value="hello@restaurant.com">\n    📧 Copy email\n  </button>\n</p>\n\n<p><a href="#top">⬆ Back to top</a></p>',
        },
        type: "html-css-js"
      },

      // ============= LESSON 13 =============
      {
        id: "html-comments",
        title: "Comments",
        theory: {
          sections: [
            { type: "heading", content: "Why we need comments" },
            { type: "text", content: "Comments are notes IN your code that the browser ignores. They're invisible to users. You use them to explain WHY something is done a certain way, to mark sections, or to temporarily disable code." },

            { type: "heading", content: "How to write a comment" },
            { type: "code", content: '<!-- This is a comment -->\n\n<!-- \n  A comment can span\n  multiple lines\n-->\n\n<h1>This will be shown</h1>\n<!-- <h1>This will NOT be shown</h1> -->' },

            { type: "heading", content: "Good ways to use comments" },
            { type: "code", content: '<!-- ========== HEADER ========== -->\n<header>\n  <h1>My Site</h1>\n</header>\n\n<!-- ========== MAIN ========== -->\n<main>\n  <!-- TODO: add featured posts here -->\n\n  <article>\n    <h2>Post title</h2>\n    <!-- Date format: YYYY-MM-DD -->\n    <time>2026-05-25</time>\n  </article>\n</main>\n\n<!-- Old version, kept just in case:\n<div class="old-design">...</div>\n-->' },

            { type: "heading", content: "DON\'T do this" },
            { type: "list", items: [
              "Don't put secrets/passwords in comments — anyone can View Source and see them",
              "Don't comment EVERY line — comment only WHY, not WHAT (the code shows what)",
              "Don't leave huge blocks of commented-out code — just delete it, you have Git"
            ]},

            { type: "tip", content: "Good code is mostly self-explanatory and doesn't need many comments. But for tricky bits — a one-line note saves your future self hours of head-scratching." }
          ]
        },
        practice: {
          title: "Add comments to your code",
          description: "Use comments to organize and explain.",
          task: "Build a page with comments dividing sections and explaining tricky parts.",
          starterCode: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>About Me</title>\n</head>\n<body>\n\n  <!-- ========== HEADER ========== -->\n  <header>\n    <h1>Alex Petrov</h1>\n    <!-- TODO: add profile photo here -->\n  </header>\n\n  <!-- ========== MAIN CONTENT ========== -->\n  <main>\n    <h2>About me</h2>\n    <p>I am a developer learning HTML.</p>\n\n    <!-- This section needs to be updated every month -->\n    <h2>Current projects</h2>\n    <ul>\n      <li>Personal website</li>\n      <li>Blog</li>\n    </ul>\n  </main>\n\n  <!-- ========== FOOTER ========== -->\n  <footer>\n    <p>© 2026 Alex Petrov</p>\n  </footer>\n\n  <!-- Old contact form (replaced by email):\n  <form>\n    <input type="text">\n  </form>\n  -->\n\n</body>\n</html>',
        },
        type: "html-css-js"
      },

      // ============= LESSON 14 =============
      {
        id: "html-entities",
        title: "Special Characters",
        theory: {
          sections: [
            { type: "heading", content: "Why special characters are needed" },
            { type: "text", content: "Some characters have special meaning in HTML. For example, < starts a tag. If you literally want to SHOW < on the page, you need an HTML ENTITY — a special code." },

            { type: "heading", content: "Most common entities" },
            { type: "code", content: '&lt;    →  <  (less than)\n&gt;    →  >  (greater than)\n&amp;   →  &  (ampersand)\n&quot;  →  "  (quote)\n&apos;  →  \'  (apostrophe)\n&nbsp;  →  non-breaking space\n&copy;  →  ©  (copyright)\n&reg;   →  ®  (registered)\n&trade; →  ™  (trademark)' },

            { type: "heading", content: "Why this matters" },
            { type: "code", content: '<!-- ❌ Browser will think this is a tag -->\n<p>Use the <div> tag for containers</p>\n\n<!-- ✅ Correct -->\n<p>Use the &lt;div&gt; tag for containers</p>' },

            { type: "heading", content: "Real examples" },
            { type: "code", content: '<p>Apples &amp; oranges</p>\n<!-- shows: Apples & oranges -->\n\n<p>Use &lt;p&gt; for paragraphs</p>\n<!-- shows: Use <p> for paragraphs -->\n\n<p>&copy; 2026 My Company</p>\n<!-- shows: © 2026 My Company -->\n\n<p>Price: 5&nbsp;USD</p>\n<!-- 5 and USD will never break to different lines -->' },

            { type: "heading", content: "Arrows, hearts, math" },
            { type: "code", content: '&larr;  →  ←\n&rarr;  →  →\n&uarr;  →  ↑\n&darr;  →  ↓\n&hearts; →  ♥\n&euro;  →  €\n&pound; →  £\n&deg;   →  °\n&plusmn; →  ±\n&times; →  ×\n&divide; →  ÷' },

            { type: "tip", content: "These days you can just paste emojis 😀 and special characters © directly — UTF-8 supports it all. But for < > & you STILL need entities." }
          ]
        },
        practice: {
          title: "Use entities in your code",
          description: "Try several common entities.",
          task: "Make a page that uses &lt; &gt; &amp; &copy; and an arrow.",
          starterCode: '<h2>HTML Cheatsheet</h2>\n\n<p>Most common tags:</p>\n<ul>\n  <li>&lt;p&gt; &amp; &lt;/p&gt; &mdash; for paragraphs</li>\n  <li>&lt;a&gt; &amp; &lt;/a&gt; &mdash; for links</li>\n  <li>&lt;img&gt; &mdash; for images</li>\n</ul>\n\n<p>If price is 5&nbsp;USD &mdash; 5 will never break from USD.</p>\n\n<p>Navigation: Home &larr; Blog &rarr; Contact</p>\n\n<p>Math: 5 &times; 3 = 15, 10 &divide; 2 = 5</p>\n\n<footer>\n  <p>&copy; 2026 My Company &reg;</p>\n</footer>',
        },
        type: "html-css-js"
      },

      // ============= LESSON 15 =============
      {
        id: "html-quotes",
        title: "Quotes and Code",
        theory: {
          sections: [
            { type: "heading", content: "blockquote — long quotes" },
            { type: "text", content: "Use <blockquote> for long, important quotes (like from a book or speech). The browser indents them and visually highlights them." },
            { type: "code", content: '<blockquote>\n  <p>The only way to do great work is to love what you do.</p>\n  <cite>— Steve Jobs</cite>\n</blockquote>' },

            { type: "heading", content: "q — inline quotes" },
            { type: "text", content: "Use <q> for short quotes INSIDE a paragraph. The browser automatically adds quote marks around it." },
            { type: "code", content: '<p>\n  My mom always told me: <q>Eat your vegetables!</q>\n  And she was right.\n</p>' },

            { type: "heading", content: "cite — citing a source" },
            { type: "text", content: "Use <cite> to mark the name of a book, movie, article, or other creative work." },
            { type: "code", content: '<p>\n  I love the book <cite>The Hobbit</cite> by J.R.R. Tolkien.\n</p>' },

            { type: "heading", content: "code — code snippets" },
            { type: "text", content: "Use <code> for code references inside text (one line). Use <pre> with <code> for multi-line code blocks." },
            { type: "code", content: '<p>\n  In JavaScript, use <code>console.log()</code> to print to the console.\n</p>\n\n<pre><code>function hello() {\n  console.log("Hello!");\n}</code></pre>' },

            { type: "heading", content: "kbd, samp, var" },
            { type: "list", items: [
              "<kbd> — keyboard input (Ctrl + C)",
              "<samp> — sample output of a program",
              "<var> — a variable in math/code"
            ]},
            { type: "code", content: '<p>Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save.</p>\n<p>The program will output: <samp>Hello, World!</samp></p>\n<p>If <var>x</var> = 5, then <var>x</var> + 1 = 6</p>' },

            { type: "tip", content: "These tags don't drastically change appearance — but they tell search engines and screen readers WHAT the content means. Real semantic markup." }
          ]
        },
        practice: {
          title: "Use quotes and code tags",
          description: "Try blockquote, q, cite, code, kbd.",
          task: "Make a page that uses all 5 tags.",
          starterCode: '<h2>My favorite quote</h2>\n\n<blockquote>\n  <p>\n    Be the change that you wish to see in the world.\n  </p>\n  <cite>— Mahatma Gandhi</cite>\n</blockquote>\n\n<p>\n  As Einstein said: <q>Imagination is more important than knowledge.</q>\n</p>\n\n<h2>My favorite book</h2>\n<p>\n  I really love <cite>Harry Potter and the Philosopher\'s Stone</cite>\n  by J.K. Rowling.\n</p>\n\n<h2>Useful shortcut</h2>\n<p>\n  In your browser, press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd>\n  to open developer tools.\n</p>\n\n<h2>Code example</h2>\n<p>\n  The <code>alert()</code> function shows a popup:\n</p>\n<pre><code>alert("Hello!");</code></pre>',
        },
        type: "html-css-js"
      },

      // ============= LESSON 16 =============
      {
        id: "html-media",
        title: "Video and Audio",
        theory: {
          sections: [
            { type: "heading", content: "Video on a page — <video>" },
            { type: "text", content: "The <video> tag plays videos directly on the page — no plugins needed. The src attribute is the link to the video. controls adds play/pause buttons." },
            { type: "code", content: '<video src="movie.mp4" controls></video>\n\n<!-- Or with several formats for browser compatibility -->\n<video controls width="500">\n  <source src="movie.mp4" type="video/mp4">\n  <source src="movie.webm" type="video/webm">\n  Your browser does not support video.\n</video>' },

            { type: "heading", content: "Useful video attributes" },
            { type: "list", items: [
              "controls — show play/pause buttons",
              "autoplay — start playing automatically (browser may block this)",
              "loop — play in a loop",
              "muted — start without sound",
              "poster='preview.jpg' — preview image before play",
              "width / height — size of the player"
            ]},

            { type: "heading", content: "Audio — <audio>" },
            { type: "text", content: "Works just like video — but only for sound. Same attributes." },
            { type: "code", content: '<audio src="song.mp3" controls></audio>\n\n<audio controls>\n  <source src="song.mp3" type="audio/mpeg">\n  <source src="song.ogg" type="audio/ogg">\n  Your browser does not support audio.\n</audio>' },

            { type: "heading", content: "Why several <source>?" },
            { type: "text", content: "Different browsers support different formats. With several <source> tags, the browser picks the first one it can play. mp4 + webm covers 99% of browsers." },

            { type: "tip", content: "For YouTube videos use <iframe> instead — that's the next lesson. Use <video> only when you host the video file yourself." }
          ]
        },
        practice: {
          title: "Add video and audio",
          description: "Use free demo files for testing.",
          task: "Add a video with controls and a poster, plus an audio file with controls.",
          starterCode: '<h2>My Video</h2>\n\n<video controls width="500" poster="https://picsum.photos/500/280">\n  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">\n  Your browser does not support video.\n</video>\n\n<h2>My Audio</h2>\n\n<audio controls>\n  <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">\n  Your browser does not support audio.\n</audio>\n\n<p>Try clicking play and pause!</p>',
        },
        type: "html-css-js"
      },

      // ============= LESSON 17 =============
      {
        id: "html-iframe",
        title: "iframe — embedding other pages",
        theory: {
          sections: [
            { type: "heading", content: "What is <iframe>?" },
            { type: "text", content: "iframe lets you embed another website INSIDE your page. Like a window to another page. Used for YouTube videos, Google Maps, online forms, online calculators." },
            { type: "code", content: '<iframe src="https://example.com" width="600" height="400"></iframe>' },

            { type: "heading", content: "Embedding YouTube" },
            { type: "text", content: "On any YouTube video click 'Share' → 'Embed' and copy the iframe code. Or build it yourself:" },
            { type: "code", content: '<iframe\n  width="560"\n  height="315"\n  src="https://www.youtube.com/embed/VIDEO_ID"\n  frameborder="0"\n  allowfullscreen>\n</iframe>' },

            { type: "heading", content: "Embedding Google Maps" },
            { type: "text", content: "On Google Maps: 'Share' → 'Embed a map' → copy the code. Show your office address visually." },
            { type: "code", content: '<iframe\n  src="https://www.google.com/maps/embed?pb=..."\n  width="600"\n  height="450">\n</iframe>' },

            { type: "heading", content: "Useful iframe attributes" },
            { type: "list", items: [
              "src — URL to embed",
              "width / height — size",
              "frameborder='0' — hide border (old way)",
              "allowfullscreen — allow fullscreen mode (videos)",
              "loading='lazy' — load only when scrolled to (speeds up page)",
              "title='Description' — for screen readers"
            ]},

            { type: "heading", content: "Security" },
            { type: "text", content: "Not every site allows being embedded. Many block iframe for security. If you see a blank page — that's why. Also: don't embed untrusted sites — they could attack your users." },

            { type: "tip", content: "Always add title to iframe and loading='lazy'. First helps accessibility, second helps speed." }
          ]
        },
        practice: {
          title: "Embed YouTube",
          description: "Embed a real video and a map.",
          task: "Add a YouTube video using iframe.",
          starterCode: '<h2>My favorite tutorial</h2>\n\n<iframe\n  width="560"\n  height="315"\n  src="https://www.youtube.com/embed/dQw4w9WgXcQ"\n  title="YouTube video"\n  frameborder="0"\n  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"\n  allowfullscreen\n  loading="lazy">\n</iframe>\n\n<h2>Our location</h2>\n\n<iframe\n  src="https://www.openstreetmap.org/export/embed.html?bbox=-0.13%2C51.50%2C-0.10%2C51.52&amp;layer=mapnik"\n  width="560"\n  height="315"\n  title="London map"\n  loading="lazy">\n</iframe>',
        },
        type: "html-css-js"
      },

      // ============= LESSON 18 =============
      {
        id: "html-advanced-forms",
        title: "Advanced Forms: select, textarea",
        theory: {
          sections: [
            { type: "heading", content: "textarea — multi-line input" },
            { type: "text", content: "<input> is for single-line text. For long messages (comments, reviews, bio) use <textarea>." },
            { type: "code", content: '<label>\n  Your message:<br>\n  <textarea rows="5" cols="40" placeholder="Write here..."></textarea>\n</label>\n\n<!-- rows = number of lines visible -->\n<!-- cols = approximate width in characters -->' },

            { type: "heading", content: "select — dropdown list" },
            { type: "text", content: "<select> creates a dropdown menu. Inside it go <option> tags for each choice." },
            { type: "code", content: '<label>\n  Pick a country:<br>\n  <select>\n    <option value="us">United States</option>\n    <option value="uk">United Kingdom</option>\n    <option value="ca">Canada</option>\n    <option value="au">Australia</option>\n  </select>\n</label>\n\n<!-- value — sent when the form is submitted -->\n<!-- Visible text — what the user sees -->' },

            { type: "heading", content: "Pre-selected option" },
            { type: "text", content: "Add selected to mark a default option. Add disabled to make an option unselectable (often used for the placeholder)." },
            { type: "code", content: '<select>\n  <option value="" disabled selected>-- Choose city --</option>\n  <option value="nyc">New York</option>\n  <option value="ldn">London</option>\n  <option value="tyo">Tokyo</option>\n</select>' },

            { type: "heading", content: "Grouped options" },
            { type: "code", content: '<select>\n  <optgroup label="Europe">\n    <option>London</option>\n    <option>Paris</option>\n    <option>Berlin</option>\n  </optgroup>\n  <optgroup label="Asia">\n    <option>Tokyo</option>\n    <option>Seoul</option>\n  </optgroup>\n</select>' },

            { type: "heading", content: "fieldset and legend" },
            { type: "text", content: "<fieldset> groups related form fields with a border. <legend> is the title of the group." },
            { type: "code", content: '<form>\n  <fieldset>\n    <legend>Personal Info</legend>\n    <label>Name: <input type="text"></label>\n    <label>Age: <input type="number"></label>\n  </fieldset>\n\n  <fieldset>\n    <legend>Contact</legend>\n    <label>Email: <input type="email"></label>\n    <label>Phone: <input type="tel"></label>\n  </fieldset>\n</form>' },

            { type: "tip", content: "Always wrap a form in <form>. This makes the Enter key submit it, and lets the browser remember filled values." }
          ]
        },
        practice: {
          title: "Build a feedback form",
          description: "Use select, textarea and fieldset.",
          task: "Build a contact form with name, country (dropdown), message (textarea), grouped in fieldset.",
          starterCode: '<h2>Contact us</h2>\n\n<form>\n  <fieldset>\n    <legend>Your details</legend>\n\n    <p>\n      <label>\n        Name:<br>\n        <input type="text" required>\n      </label>\n    </p>\n\n    <p>\n      <label>\n        Email:<br>\n        <input type="email" required>\n      </label>\n    </p>\n\n    <p>\n      <label>\n        Country:<br>\n        <select required>\n          <option value="" disabled selected>-- Choose --</option>\n          <option value="us">United States</option>\n          <option value="uk">United Kingdom</option>\n          <option value="ru">Russia</option>\n          <option value="de">Germany</option>\n        </select>\n      </label>\n    </p>\n  </fieldset>\n\n  <fieldset>\n    <legend>Your message</legend>\n\n    <p>\n      <label>\n        Topic:<br>\n        <select>\n          <optgroup label="Support">\n            <option>Bug report</option>\n            <option>Question about features</option>\n          </optgroup>\n          <optgroup label="Sales">\n            <option>Buy product</option>\n            <option>Pricing</option>\n          </optgroup>\n        </select>\n      </label>\n    </p>\n\n    <p>\n      <label>\n        Message:<br>\n        <textarea rows="5" cols="40" placeholder="Write here..." required></textarea>\n      </label>\n    </p>\n  </fieldset>\n\n  <button type="submit">Send</button>\n</form>',
        },
        type: "html-css-js"
      },

      // ============= LESSON 19 =============
      {
        id: "html-meta",
        title: "Metadata: meta, favicon, OG",
        theory: {
          sections: [
            { type: "heading", content: "What is meta?" },
            { type: "text", content: "Meta tags live in <head> and give browsers and search engines info ABOUT the page. They're invisible to users but very important." },

            { type: "heading", content: "Required meta" },
            { type: "code", content: '<head>\n  <!-- Encoding — supports all languages -->\n  <meta charset="UTF-8">\n\n  <!-- Mobile view — makes the page mobile-friendly -->\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n\n  <!-- Browser tab title -->\n  <title>My Site</title>\n</head>' },

            { type: "heading", content: "SEO meta" },
            { type: "code", content: '<meta name="description" content="A short page description, 150-160 characters. Shown in Google search results.">\n\n<meta name="keywords" content="html, css, learning, web">\n<!-- keywords don\'t affect SEO anymore, but old habit -->\n\n<meta name="author" content="Alex Petrov">\n\n<!-- Tells crawlers what to do -->\n<meta name="robots" content="index, follow">' },

            { type: "heading", content: "Open Graph — preview on social media" },
            { type: "text", content: "When you share a link on Telegram, Twitter, Facebook — a nice preview pops up with image and title. That's controlled by OG tags." },
            { type: "code", content: '<meta property="og:title" content="My Awesome Article">\n<meta property="og:description" content="Description shown in social card">\n<meta property="og:image" content="https://mysite.com/preview.jpg">\n<meta property="og:url" content="https://mysite.com/article">\n<meta property="og:type" content="article">' },

            { type: "heading", content: "Favicon — tab icon" },
            { type: "text", content: "The small icon in the browser tab. Create a square image (32x32 or 64x64) and link it:" },
            { type: "code", content: '<link rel="icon" href="favicon.png" type="image/png">\n\n<!-- Modern way — supports light/dark theme -->\n<link rel="icon" href="favicon.svg" type="image/svg+xml">\n\n<!-- iPhone home screen icon -->\n<link rel="apple-touch-icon" href="apple-icon.png">' },

            { type: "heading", content: "Linking CSS and JS" },
            { type: "code", content: '<!-- CSS — in head -->\n<link rel="stylesheet" href="styles.css">\n\n<!-- JS — at the end of body (loads faster) -->\n<body>\n  ...\n  <script src="app.js"></script>\n</body>' },

            { type: "tip", content: "When creating any real site, the bare minimum for head: charset, viewport, title, description, og:title, og:image, favicon. 7 tags = professional look." }
          ]
        },
        practice: {
          title: "Professional <head>",
          description: "Add all important meta to a page.",
          task: "Build a full HTML head with all important meta tags.",
          starterCode: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <!-- BASIC -->\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>My Awesome Blog — TechHub</title>\n\n  <!-- SEO -->\n  <meta name="description" content="Learn web development with simple step-by-step lessons. HTML, CSS, JavaScript and more.">\n  <meta name="author" content="Alex Petrov">\n\n  <!-- OPEN GRAPH (social media preview) -->\n  <meta property="og:title" content="My Awesome Blog">\n  <meta property="og:description" content="Learn web development with simple step-by-step lessons.">\n  <meta property="og:image" content="https://picsum.photos/1200/630">\n  <meta property="og:url" content="https://myblog.com">\n  <meta property="og:type" content="website">\n\n  <!-- TWITTER (similar to OG) -->\n  <meta name="twitter:card" content="summary_large_image">\n\n  <!-- FAVICON -->\n  <link rel="icon" href="https://example.com/favicon.png">\n</head>\n<body>\n\n  <h1>My Awesome Blog</h1>\n  <p>\n    All important meta is set up.\n    Open the browser tab title — it\'s set!\n  </p>\n  <p>\n    Try sharing this page on Telegram —\n    a nice preview will appear thanks to OG tags.\n  </p>\n\n</body>\n</html>',
        },
        type: "html-css-js"
      },

      // ============= LESSON 20 =============
      {
        id: "html-mini-project",
        title: "Mini-project: Your Resume",
        theory: {
          sections: [
            { type: "heading", content: "Time to apply everything!" },
            { type: "text", content: "You now know all the basic HTML tags. Time to build something real — an online resume! In this lesson we'll use everything we've learned: structure, semantics, headings, lists, links, images, tables, forms." },

            { type: "heading", content: "What a resume contains" },
            { type: "list", items: [
              "Header: name, profession, contacts",
              "About me: short bio",
              "Skills: list",
              "Experience: list of jobs with dates",
              "Education: similar list",
              "Projects: links to work",
              "Contact form (optional)"
            ]},

            { type: "heading", content: "Tag plan" },
            { type: "code", content: '<header> — name, position\n<nav> — links to sections (#about, #skills...)\n<main>\n  <section id="about"> — about me\n  <section id="skills"> — skills (ul)\n  <section id="experience"> — experience (table or ol)\n  <section id="projects"> — projects (links)\n  <section id="contact"> — form\n</main>\n<footer> — copyright' },

            { type: "tip", content: "Don't worry that the page is unstyled. Right now we're focused on HTML structure. CSS comes in the next module — and your resume will become beautiful!" }
          ]
        },
        practice: {
          title: "Build your resume",
          description: "Use everything you've learned in one project.",
          task: "Build a complete resume page with proper structure, semantic tags, all sections.",
          starterCode: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Alex Petrov — Frontend Developer</title>\n  <meta name="description" content="Resume of Alex Petrov, Frontend Developer with 3 years of experience.">\n</head>\n<body>\n\n  <header>\n    <h1>Alex Petrov</h1>\n    <p><strong>Frontend Developer</strong></p>\n    <p>\n      📧 <a href="mailto:alex@example.com">alex@example.com</a> |\n      📱 <a href="tel:+1234567890">+1 234 567-890</a> |\n      🌐 <a href="https://github.com" target="_blank">GitHub</a>\n    </p>\n  </header>\n\n  <nav>\n    <a href="#about">About</a> |\n    <a href="#skills">Skills</a> |\n    <a href="#experience">Experience</a> |\n    <a href="#projects">Projects</a> |\n    <a href="#contact">Contact</a>\n  </nav>\n\n  <main>\n\n    <section id="about">\n      <h2>About me</h2>\n      <p>\n        I am a Frontend Developer with <strong>3 years of experience</strong>.\n        I love building <em>fast and beautiful</em> websites.\n        I work with React, TypeScript and modern web technologies.\n      </p>\n    </section>\n\n    <section id="skills">\n      <h2>Skills</h2>\n      <ul>\n        <li>HTML5 &amp; CSS3</li>\n        <li>JavaScript &amp; TypeScript</li>\n        <li>React &amp; Next.js</li>\n        <li>Tailwind CSS</li>\n        <li>Git &amp; GitHub</li>\n      </ul>\n    </section>\n\n    <section id="experience">\n      <h2>Work Experience</h2>\n      <table border="1" cellpadding="8">\n        <tr>\n          <th>Year</th>\n          <th>Company</th>\n          <th>Role</th>\n        </tr>\n        <tr>\n          <td>2023 — present</td>\n          <td>Tech Corp</td>\n          <td>Senior Frontend</td>\n        </tr>\n        <tr>\n          <td>2021 — 2023</td>\n          <td>StartupXYZ</td>\n          <td>Frontend Developer</td>\n        </tr>\n      </table>\n    </section>\n\n    <section id="projects">\n      <h2>My Projects</h2>\n      <article>\n        <h3>🎨 Portfolio Website</h3>\n        <p>Personal portfolio built with React and Tailwind.</p>\n        <p><a href="https://example.com" target="_blank">View live →</a></p>\n      </article>\n\n      <article>\n        <h3>🛒 E-commerce Store</h3>\n        <p>Online shop with cart and Stripe checkout.</p>\n        <p><a href="https://example.com" target="_blank">View live →</a></p>\n      </article>\n    </section>\n\n    <section id="contact">\n      <h2>Contact me</h2>\n      <form>\n        <p>\n          <label>\n            Your name:<br>\n            <input type="text" required>\n          </label>\n        </p>\n        <p>\n          <label>\n            Your email:<br>\n            <input type="email" required>\n          </label>\n        </p>\n        <p>\n          <label>\n            Message:<br>\n            <textarea rows="4" cols="40" required></textarea>\n          </label>\n        </p>\n        <button type="submit">Send</button>\n      </form>\n    </section>\n\n  </main>\n\n  <footer>\n    <p>&copy; 2026 Alex Petrov. All rights reserved.</p>\n  </footer>\n\n</body>\n</html>',
        },
        type: "html-css-js"
      },

    ]
  },

  RU: {
    title: "HTML & CSS",
    description: "Учим HTML и CSS шаг за шагом — от первого тега до полноценной стильной страницы.",
    lessons: [

      {
        id: "html-what-is",
        title: "Что такое HTML?",
        theory: {
          sections: [
            { type: "heading", content: "HTML — язык каждого сайта" },
            { type: "text", content: "Любой сайт, который ты видишь — YouTube, Wikipedia, Google — построен на HTML. HTML расшифровывается как HyperText Markup Language. Это не язык программирования, а язык разметки: ты используешь специальные слова — ТЕГИ — чтобы сказать браузеру, что есть что." },
            { type: "heading", content: "Что такое тег?" },
            { type: "text", content: "Тег говорит браузеру: 'это заголовок', 'это абзац', 'это кнопка'. Теги пишутся в угловых скобках:" },
            { type: "code", content: '<h1>Это заголовок</h1>\n<p>Это абзац</p>' },
            { type: "heading", content: "Открывающий и закрывающий теги" },
            { type: "text", content: "Большинство тегов идут парой: открывающий и закрывающий. У закрывающего стоит слеш /. Содержимое — между ними." },
            { type: "code", content: '<h1>Привет</h1>\n\n<!-- h1 — открывающий тег -->\n<!-- Привет — содержимое -->\n<!-- /h1 — закрывающий тег -->' },
            { type: "tip", content: "Не пытайся запомнить все теги. Их всего около 20, которые используешь в 90% случаев. Будем изучать постепенно." }
          ]
        },
        practice: {
          title: "Твой первый HTML",
          description: "Всего две строки. Нажми Run Code и смотри результат в Preview.",
          task: "Напиши заголовок и абзац. Всё!",
          starterCode: '<h1>Привет, мир!</h1>\n<p>Это мой первый HTML.</p>',
        },
        type: "html-css-js"
      },

      {
        id: "html-headings",
        title: "Заголовки: от h1 до h6",
        theory: {
          sections: [
            { type: "heading", content: "Шесть уровней заголовков" },
            { type: "text", content: "В HTML есть 6 тегов заголовков: от h1 (самый большой и важный) до h6 (самый маленький). Они визуально создают иерархию и говорят поисковикам, о чём твоя страница." },
            { type: "code", content: '<h1>Главный заголовок (самый большой)</h1>\n<h2>Заголовок раздела</h2>\n<h3>Подраздел</h3>\n<h4>Меньший заголовок</h4>\n<h5>Ещё меньше</h5>\n<h6>Самый маленький</h6>' },
            { type: "heading", content: "Важное правило" },
            { type: "text", content: "Используй только ОДИН h1 на страницу — это главный заголовок (как название книги). Остальные (h2, h3...) делят контент на секции, как главы и подглавы." },
            { type: "heading", content: "Чего НЕ делать" },
            { type: "text", content: "Не выбирай заголовок по размеру! Выбирай по важности. Если нужен бóльший или меньший текст — это потом сделаем через CSS." },
            { type: "code", content: '<!-- ❌ ПЛОХО: перепрыгиваем уровни -->\n<h1>Обо мне</h1>\n<h4>Я люблю код</h4>\n\n<!-- ✅ ХОРОШО: логичный порядок -->\n<h1>Обо мне</h1>\n<h2>Я люблю код</h2>' },
            { type: "tip", content: "Думай о заголовках как об оглавлении книги. h1 = название, h2 = главы, h3 = подглавы." }
          ]
        },
        practice: {
          title: "Практика с заголовками",
          description: "Попробуй все 6 уровней, чтобы увидеть разницу в размерах.",
          task: "Напиши все 6 уровней заголовков с разным текстом.",
          starterCode: '<h1>Заголовок уровня 1</h1>\n<h2>Заголовок уровня 2</h2>\n<h3>Заголовок уровня 3</h3>\n<h4>Заголовок уровня 4</h4>\n<h5>Заголовок уровня 5</h5>\n<h6>Заголовок уровня 6</h6>',
        },
        type: "html-css-js"
      },

      {
        id: "html-text",
        title: "Абзацы и текст",
        theory: {
          sections: [
            { type: "heading", content: "Тег <p> — абзац" },
            { type: "text", content: "Любой обычный текст на странице оборачивай в <p>. Браузер автоматически добавит пространство до и после каждого абзаца." },
            { type: "code", content: '<p>Это первый абзац.</p>\n<p>Это второй абзац.</p>' },
            { type: "heading", content: "Перенос строки — <br>" },
            { type: "text", content: "Иногда нужен перенос строки БЕЗ нового абзаца (например, в стихах или адресе). Используй <br>. Это самозакрывающийся тег — </br> не нужен." },
            { type: "code", content: '<p>Розы красные,<br>Фиалки голубые.</p>' },
            { type: "heading", content: "Жирный и курсивный" },
            { type: "text", content: "Жирный текст — <strong>. Курсив — <em>. Эти теги говорят браузеру что текст ВАЖНЫЙ или ВЫДЕЛЕННЫЙ — а не просто стилизованный." },
            { type: "code", content: '<p>Это <strong>очень важный</strong> текст.</p>\n<p>Это <em>выделенный</em> текст.</p>\n<p>Можно <strong><em>совмещать</em></strong>.</p>' },
            { type: "heading", content: "Так делать НЕ надо" },
            { type: "text", content: "Не используй много <br> чтобы добавить пространство. Не пиши весь текст в один гигантский <p>. Делай логические абзацы." },
            { type: "tip", content: "Браузер игнорирует лишние пробелы и переносы в твоём коде. Чтобы добавить реальный отступ, используй новые теги (<p>, <br>) или позже CSS." }
          ]
        },
        practice: {
          title: "Форматирование текста",
          description: "Напиши абзацы с жирными и курсивными словами.",
          task: "Напиши 2 абзаца о себе. Используй <strong> для важного и <em> для выделения.",
          starterCode: '<h2>Обо мне</h2>\n<p>Меня зовут <strong>Алекс</strong> и я учу HTML.</p>\n<p>Я думаю, что программирование — это <em>очень круто</em>, и я хочу построить свой сайт.</p>',
        },
        type: "html-css-js"
      },

      {
        id: "html-lists",
        title: "Списки",
        theory: {
          sections: [
            { type: "heading", content: "Два типа списков" },
            { type: "text", content: "В HTML 2 основных типа списков: неупорядоченный (с маркерами •) и упорядоченный (с числами 1, 2, 3). Каждый элемент списка оборачивай в <li>." },
            { type: "heading", content: "Неупорядоченный — <ul>" },
            { type: "text", content: "Используй когда порядок не важен — ингредиенты, теги, фичи." },
            { type: "code", content: '<ul>\n  <li>Яблоки</li>\n  <li>Бананы</li>\n  <li>Вишни</li>\n</ul>\n\n<!-- Результат: -->\n<!-- • Яблоки -->\n<!-- • Бананы -->\n<!-- • Вишни -->' },
            { type: "heading", content: "Упорядоченный — <ol>" },
            { type: "text", content: "Используй когда порядок важен — шаги рецепта, рейтинг, инструкции." },
            { type: "code", content: '<ol>\n  <li>Открой дверь</li>\n  <li>Зайди внутрь</li>\n  <li>Закрой дверь</li>\n</ol>\n\n<!-- Результат: -->\n<!-- 1. Открой дверь -->\n<!-- 2. Зайди внутрь -->\n<!-- 3. Закрой дверь -->' },
            { type: "heading", content: "Списки внутри списков" },
            { type: "text", content: "Можно поместить список внутрь <li> чтобы сделать подпункты. Это вложенные списки." },
            { type: "code", content: '<ul>\n  <li>Фрукты\n    <ul>\n      <li>Яблоки</li>\n      <li>Бананы</li>\n    </ul>\n  </li>\n  <li>Овощи\n    <ul>\n      <li>Морковь</li>\n      <li>Картошка</li>\n    </ul>\n  </li>\n</ul>' },
            { type: "tip", content: "Делай отступы пробелами (обычно 2). Это делает вложенные теги читаемыми. Браузеру всё равно, но тебе и другим — нет." }
          ]
        },
        practice: {
          title: "Сделай два списка",
          description: "Один неупорядоченный (хобби), один упорядоченный (шаги).",
          task: "Сделай список из 3 хобби (неупорядоченный) и 3 шага приготовления чая (упорядоченный).",
          starterCode: '<h2>Мои хобби</h2>\n<ul>\n  <li>Чтение книг</li>\n  <li>Игры</li>\n  <li>Программирование</li>\n</ul>\n\n<h2>Как заварить чай</h2>\n<ol>\n  <li>Вскипяти воду</li>\n  <li>Положи пакетик чая в чашку</li>\n  <li>Залей водой</li>\n</ol>',
        },
        type: "html-css-js"
      },

      {
        id: "html-links",
        title: "Ссылки",
        theory: {
          sections: [
            { type: "heading", content: "Тег <a> — anchor" },
            { type: "text", content: "Ссылки делают веб ПАУТИНОЙ. Тег <a> создаёт ссылку. Нужен атрибут href — куда вести." },
            { type: "code", content: '<a href="https://google.com">Перейти в Google</a>' },
            { type: "heading", content: "Что такое атрибут?" },
            { type: "text", content: "Атрибут — это дополнительная информация внутри тега. Формат: имя='значение'. href говорит КУДА ведёт ссылка. Текст между <a> и </a> — то, на что пользователь кликает." },
            { type: "code", content: '<a href="https://wikipedia.org">Википедия</a>\n<!-- href — атрибут -->\n<!-- "https://wikipedia.org" — значение -->\n<!-- Википедия — кликабельный текст -->' },
            { type: "heading", content: "Открытие в новой вкладке" },
            { type: "text", content: "Добавь target='_blank' для открытия в новой вкладке. Добавь rel='noopener' для безопасности при внешних ссылках." },
            { type: "code", content: '<a href="https://github.com" target="_blank" rel="noopener">\n  Открыть GitHub в новой вкладке\n</a>' },
            { type: "heading", content: "Разные типы ссылок" },
            { type: "code", content: '<!-- На другой сайт -->\n<a href="https://example.com">Внешняя</a>\n\n<!-- На другую страницу твоего сайта -->\n<a href="/about">Страница About</a>\n\n<!-- На email -->\n<a href="mailto:hello@example.com">Написать письмо</a>\n\n<!-- На телефон -->\n<a href="tel:+1234567890">Позвонить</a>' },
            { type: "tip", content: "Пиши осмысленный текст ссылки. Избегай 'нажми сюда' — пиши 'скачать отчёт' или 'читать про React'. Лучше для пользователей И для SEO." }
          ]
        },
        practice: {
          title: "Создай разные ссылки",
          description: "Попробуй все виды ссылок.",
          task: "Сделай 3 ссылки: на сайт (в новой вкладке), на email и на номер телефона.",
          starterCode: '<h2>Контакты</h2>\n\n<p>\n  Посети мой <a href="https://github.com" target="_blank" rel="noopener">GitHub</a>\n</p>\n\n<p>\n  Напиши на: <a href="mailto:hello@example.com">hello@example.com</a>\n</p>\n\n<p>\n  Или позвони: <a href="tel:+1234567890">+1 (234) 567-890</a>\n</p>',
        },
        type: "html-css-js"
      },

      {
        id: "html-images",
        title: "Изображения",
        theory: {
          sections: [
            { type: "heading", content: "Тег <img>" },
            { type: "text", content: "Картинки добавляются тегом <img>. Это самозакрывающийся тег (нет </img>). Нужны два атрибута: src (где картинка) и alt (текстовое описание)." },
            { type: "code", content: '<img src="cat.jpg" alt="Милый кот">' },
            { type: "heading", content: "Что такое src?" },
            { type: "text", content: "src (source) — говорит браузеру ГДЕ найти картинку. Это может быть файл у тебя на сайте или полный URL картинки в интернете." },
            { type: "code", content: '<!-- С сайта -->\n<img src="https://picsum.photos/300/200" alt="Случайное фото">\n\n<!-- Из твоих файлов (когда у тебя есть сайт) -->\n<img src="photos/me.jpg" alt="Моё фото">' },
            { type: "heading", content: "Почему alt важен" },
            { type: "text", content: "Атрибут alt описывает картинку словами. Это важно потому что: 1) незрячие пользователи через скринридеры читают это вслух, 2) если картинка не загрузилась — покажется alt, 3) Google читает alt чтобы понять что на картинке." },
            { type: "code", content: '<!-- ❌ ПЛОХО: пустой или бесполезный alt -->\n<img src="dog.jpg" alt="">\n<img src="dog.jpg" alt="картинка">\n\n<!-- ✅ ХОРОШО: описывает картинку -->\n<img src="dog.jpg" alt="Золотистый ретривер щенок играет с мячом">' },
            { type: "heading", content: "Размер картинки" },
            { type: "text", content: "Можно задать width и height в пикселях. Или позже использовать CSS для большего контроля." },
            { type: "code", content: '<img src="cat.jpg" alt="Кот" width="300">\n<img src="cat.jpg" alt="Кот" width="300" height="200">' },
            { type: "tip", content: "Всегда указывай alt — даже пустой (alt=\"\") для декоративных. Это не опционально, это требование доступности." }
          ]
        },
        practice: {
          title: "Добавь картинки",
          description: "picsum.photos даёт бесплатные случайные картинки.",
          task: "Добавь 2 картинки с правильным alt и заголовком.",
          starterCode: '<h2>Моя галерея</h2>\n\n<img src="https://picsum.photos/seed/cat/400/250" alt="Случайный пейзаж с picsum">\n\n<p>Это моя любимая картинка.</p>\n\n<img src="https://picsum.photos/seed/dog/400/250" alt="Ещё одно красивое случайное фото">\n\n<p>И эта тоже!</p>',
        },
        type: "html-css-js"
      },

      {
        id: "html-containers",
        title: "Контейнеры: div и span",
        theory: {
          sections: [
            { type: "heading", content: "Зачем нужны контейнеры" },
            { type: "text", content: "Иногда нужно СГРУППИРОВАТЬ элементы вместе — чтобы стилизовать, позиционировать, обращаться с ними как с одним блоком. Для этого <div> и <span>. У них НЕТ собственного визуального смысла — это просто коробки." },
            { type: "heading", content: "div — блочный контейнер" },
            { type: "text", content: "Тег <div> занимает всю ширину родителя и создаёт новую строку. Используется для группировки больших кусков — карточка, секция, сайдбар." },
            { type: "code", content: '<div>\n  <h3>Пицца</h3>\n  <p>Вкусное итальянское блюдо.</p>\n  <p>$12.99</p>\n</div>\n\n<div>\n  <h3>Бургер</h3>\n  <p>Классическая американская еда.</p>\n  <p>$8.99</p>\n</div>' },
            { type: "heading", content: "span — строчный контейнер" },
            { type: "text", content: "Тег <span> остаётся в строке (без переноса). Используется для выделения небольшого куска текста внутри абзаца — например, одного слова." },
            { type: "code", content: '<p>\n  Мой любимый цвет — <span>синий</span>.\n  Моя любимая еда — <span>пицца</span>.\n</p>' },
            { type: "heading", content: "Атрибут class" },
            { type: "text", content: "Чтобы стилизовать разные div'ы по-разному, дай им class. Класс — это как ярлык. Будешь использовать с CSS для применения стилей." },
            { type: "code", content: '<div class="card">\n  <h3>Заголовок</h3>\n</div>\n\n<div class="card highlighted">\n  <h3>Особая карточка</h3>\n</div>\n\n<p>\n  Важное слово: <span class="warning">ОПАСНО</span>\n</p>' },
            { type: "tip", content: "Не злоупотребляй div. Если подходит семантический тег — используй его (header, nav, article, footer). Скоро их изучим. div — это запасной вариант." }
          ]
        },
        practice: {
          title: "Группируем через div и span",
          description: "Построй карточку и выдели слово в строке.",
          task: "Сделай 2 карточки товаров через <div> и абзац с одним словом в <span>.",
          starterCode: '<div class="card">\n  <h3>Пицца Маргарита</h3>\n  <p>Классическая итальянская пицца с томатами и моцареллой.</p>\n  <p>Цена: <span class="price">$12.99</span></p>\n</div>\n\n<div class="card">\n  <h3>Цезарь</h3>\n  <p>Свежий салат ромэн с заправкой Цезарь.</p>\n  <p>Цена: <span class="price">$8.50</span></p>\n</div>',
        },
        type: "html-css-js"
      },

      {
        id: "html-structure",
        title: "Структура страницы",
        theory: {
          sections: [
            { type: "heading", content: "Каждая страница нуждается в структуре" },
            { type: "text", content: "Пока мы писали просто кусочки. Реальная HTML-страница имеет специальную структуру, которая говорит браузеру: 'это полный документ'." },
            { type: "heading", content: "Полная структура" },
            { type: "code", content: '<!DOCTYPE html>\n<html lang="ru">\n<head>\n  <meta charset="UTF-8">\n  <title>Моя страница</title>\n</head>\n<body>\n  <!-- Всё видимое здесь -->\n  <h1>Привет!</h1>\n  <p>Это моя страница.</p>\n</body>\n</html>' },
            { type: "heading", content: "Что делает каждая часть" },
            { type: "list", items: [
              "<!DOCTYPE html> — говорит браузеру: 'это HTML5'. Всегда первая строка.",
              "<html> — оборачивает всё. Атрибут lang помогает скринридерам и Google.",
              "<head> — информация О странице (не видна пользователю)",
              "<meta charset='UTF-8'> — поддержка всех языков и эмодзи 🎉",
              "<title> — текст во вкладке браузера",
              "<body> — всё, что пользователь РЕАЛЬНО видит"
            ]},
            { type: "heading", content: "Видимое vs невидимое" },
            { type: "text", content: "Содержимое <head> НЕ ВИДНО пользователям — это метаданные, настройки, ссылки на CSS/JS. Содержимое <body> — то, что люди ВИДЯТ." },
            { type: "tip", content: "Создавая новый HTML-файл в реальной жизни, всегда начинай со скелета. В VS Code набери '!' и нажми Tab — вставит шаблон." }
          ]
        },
        practice: {
          title: "Построй полную HTML-страницу",
          description: "Используй все теги, что выучил, в правильной структуре.",
          task: "Создай полный HTML-документ с title, заголовком, абзацем, списком и ссылкой.",
          starterCode: '<!DOCTYPE html>\n<html lang="ru">\n<head>\n  <meta charset="UTF-8">\n  <title>Моя первая страница</title>\n</head>\n<body>\n\n  <h1>Добро пожаловать!</h1>\n\n  <p>Привет, меня зовут <strong>Алекс</strong> и я учу HTML.</p>\n\n  <h2>Что я люблю</h2>\n  <ul>\n    <li>Пицца</li>\n    <li>Код</li>\n    <li>Игры</li>\n  </ul>\n\n  <p>\n    Загляни в мой <a href="https://github.com" target="_blank">GitHub</a>!\n  </p>\n\n</body>\n</html>',
        },
        type: "html-css-js"
      },

      {
        id: "html-semantic",
        title: "Семантические теги",
        theory: {
          sections: [
            { type: "heading", content: "Зачем семантические теги?" },
            { type: "text", content: "Вместо <div class='header'> используй <header>. Браузер, скринридеры и Google понимают что есть что. Это СЕМАНТИЧЕСКИЙ HTML — теги описывают смысл, а не внешний вид." },
            { type: "heading", content: "Главные семантические теги" },
            { type: "code", content: '<header>   <!-- Верх страницы (логотип, навигация) -->\n<nav>      <!-- Меню навигации -->\n<main>     <!-- Основной контент (ОДИН на страницу) -->\n<section>  <!-- Секция контента -->\n<article>  <!-- Самодостаточный контент (пост, комментарий) -->\n<aside>    <!-- Боковой контент (сайдбар) -->\n<footer>   <!-- Низ страницы (копирайт, ссылки) -->' },
            { type: "heading", content: "div vs семантика" },
            { type: "code", content: '<!-- ❌ Только div (браузер не понимает что есть что) -->\n<div class="header">\n  <div class="nav">...</div>\n</div>\n<div class="content">...</div>\n<div class="footer">...</div>\n\n<!-- ✅ Семантика (все понимают) -->\n<header>\n  <nav>...</nav>\n</header>\n<main>...</main>\n<footer>...</footer>' },
            { type: "heading", content: "Зачем заморачиваться?" },
            { type: "list", items: [
              "Скринридеры могут навигировать по landmark'ам (header, nav, main, footer)",
              "Google лучше понимает структуру → лучше SEO",
              "Твой код намного легче читать позже",
              "Браузерные фичи (reader mode, save-as-PDF) работают лучше"
            ]},
            { type: "tip", content: "Правило: если подходит семантический тег — используй его. <div> только когда ничего больше не подходит." }
          ]
        },
        practice: {
          title: "Перестрой через семантику",
          description: "Построй макет страницы через семантические теги вместо div.",
          task: "Построй простую страницу с header (лого + nav), main (контент) и footer.",
          starterCode: '<!DOCTYPE html>\n<html lang="ru">\n<head>\n  <meta charset="UTF-8">\n  <title>Мой Блог</title>\n</head>\n<body>\n\n  <header>\n    <h1>Мой Блог</h1>\n    <nav>\n      <a href="/">Главная</a> | \n      <a href="/about">О нас</a> | \n      <a href="/contact">Контакты</a>\n    </nav>\n  </header>\n\n  <main>\n    <article>\n      <h2>Мой первый пост</h2>\n      <p>Это содержимое моего первого поста в блоге.</p>\n    </article>\n\n    <article>\n      <h2>Мой второй пост</h2>\n      <p>Ещё одна интересная история здесь.</p>\n    </article>\n  </main>\n\n  <footer>\n    <p>© 2026 Мой Блог. Все права защищены.</p>\n  </footer>\n\n</body>\n</html>',
        },
        type: "html-css-js"
      },

      {
        id: "html-forms",
        title: "Формы и поля ввода",
        theory: {
          sections: [
            { type: "heading", content: "Формы — как пользователи отправляют данные" },
            { type: "text", content: "Формы — то, как пользователи ПИШУТ что-то на сайте: поиск, логин, комментарии. Главные теги: <form>, <input>, <label>, <button>." },
            { type: "heading", content: "Базовый input" },
            { type: "code", content: '<input type="text" placeholder="Введи имя">' },
            { type: "text", content: "type — тип поля (text, email, password и т.д.). placeholder — серая подсказка до ввода." },
            { type: "heading", content: "Разные типы input" },
            { type: "code", content: '<input type="text" placeholder="Имя">\n<input type="email" placeholder="Email">\n<input type="password" placeholder="Пароль">\n<input type="number" placeholder="Возраст">\n<input type="date">\n<input type="checkbox"> Я согласен\n<input type="radio" name="color"> Красный\n<input type="radio" name="color"> Синий' },
            { type: "heading", content: "Label — для доступности" },
            { type: "text", content: "Всегда добавляй <label> для каждого input. Говорит пользователю (и скринридерам) что это за поле. Свяжи label с input через for/id." },
            { type: "code", content: '<label for="email">Твой email:</label>\n<input type="email" id="email">\n\n<!-- Или оберни input в label (id не нужен) -->\n<label>\n  Твой email:\n  <input type="email">\n</label>' },
            { type: "heading", content: "Кнопки" },
            { type: "code", content: '<button>Кликни меня</button>\n<button type="submit">Отправить форму</button>' },
            { type: "heading", content: "Полная форма" },
            { type: "code", content: '<form>\n  <label>\n    Имя:\n    <input type="text" required>\n  </label>\n\n  <label>\n    Email:\n    <input type="email" required>\n  </label>\n\n  <button type="submit">Зарегистрироваться</button>\n</form>' },
            { type: "tip", content: "Атрибут required делает поле обязательным. Браузер заблокирует форму если поле пустое." }
          ]
        },
        practice: {
          title: "Простая форма регистрации",
          description: "Создай форму с именем, email, паролем и кнопкой.",
          task: "Построй форму регистрации с 3 полями, чекбоксом и кнопкой submit.",
          starterCode: '<h2>Регистрация</h2>\n\n<form>\n  <p>\n    <label>\n      Имя:<br>\n      <input type="text" placeholder="Иван Иванов" required>\n    </label>\n  </p>\n\n  <p>\n    <label>\n      Email:<br>\n      <input type="email" placeholder="you@example.com" required>\n    </label>\n  </p>\n\n  <p>\n    <label>\n      Пароль:<br>\n      <input type="password" required>\n    </label>\n  </p>\n\n  <p>\n    <label>\n      <input type="checkbox" required>\n      Я согласен с условиями\n    </label>\n  </p>\n\n  <button type="submit">Зарегистрироваться</button>\n</form>',
        },
        type: "html-css-js"
      },
      {
        id: "html-tables",
        title: "Таблицы",
        theory: {
          sections: [
            { type: "heading", content: "Когда использовать таблицы" },
            { type: "text", content: "<table> — для настоящих табличных данных: прайс-лист, расписание, статистика. НЕ используй таблицы для вёрстки страницы (так делали в 90-х, сейчас для этого CSS)." },
            { type: "heading", content: "Базовая структура" },
            { type: "code", content: '<table>\n  <tr>\n    <th>Имя</th>\n    <th>Возраст</th>\n    <th>Город</th>\n  </tr>\n  <tr>\n    <td>Алиса</td>\n    <td>30</td>\n    <td>Лондон</td>\n  </tr>\n  <tr>\n    <td>Боб</td>\n    <td>25</td>\n    <td>Париж</td>\n  </tr>\n</table>' },
            { type: "heading", content: "Что значит каждый тег" },
            { type: "list", items: [
              "<table> — сама таблица",
              "<tr> — строка таблицы (одна горизонтальная линия)",
              "<th> — заголовок столбца (по умолчанию жирный, по центру)",
              "<td> — обычная ячейка с данными"
            ]},
            { type: "heading", content: "Объединение ячеек" },
            { type: "text", content: "colspan объединяет ячейки по горизонтали, rowspan — по вертикали." },
            { type: "code", content: '<table border="1">\n  <tr>\n    <th colspan="2">Личная информация</th>\n  </tr>\n  <tr>\n    <td>Имя</td>\n    <td>Алиса</td>\n  </tr>\n  <tr>\n    <td>Возраст</td>\n    <td>30</td>\n  </tr>\n</table>' },
            { type: "tip", content: "Атрибут border — старый способ. В реальных проектах таблицы стилизуют через CSS. Но для быстрых демо удобно." }
          ]
        },
        practice: {
          title: "Прайс-лист",
          description: "Создай таблицу с товарами и ценами.",
          task: "Сделай таблицу из 3 столбцов (Товар, Цена, В наличии) и 3 строк.",
          starterCode: '<h2>Прайс-лист</h2>\n\n<table border="1" cellpadding="10">\n  <tr>\n    <th>Товар</th>\n    <th>Цена</th>\n    <th>В наличии</th>\n  </tr>\n  <tr>\n    <td>Пицца</td>\n    <td>$12.99</td>\n    <td>Да</td>\n  </tr>\n  <tr>\n    <td>Бургер</td>\n    <td>$8.50</td>\n    <td>Да</td>\n  </tr>\n  <tr>\n    <td>Суши</td>\n    <td>$18.00</td>\n    <td>Нет</td>\n  </tr>\n</table>',
        },
        type: "html-css-js"
      },

      {
        id: "html-attributes",
        title: "Атрибуты: id, class, title",
        theory: {
          sections: [
            { type: "heading", content: "Что делают атрибуты" },
            { type: "text", content: "Атрибуты дают тегам доп. информацию или поведение. Пишутся внутри открывающего тега как имя='значение'." },
            { type: "heading", content: "id — уникальный ярлык" },
            { type: "text", content: "id даёт элементу УНИКАЛЬНОЕ имя на странице. Только ОДИН элемент может иметь конкретный id. Используется для JavaScript и ссылок внутри страницы." },
            { type: "code", content: '<h1 id="top">Моя страница</h1>\n<p>... много контента ...</p>\n\n<!-- Ссылка, которая прыгает к заголовку -->\n<a href="#top">Наверх</a>' },
            { type: "heading", content: "class — групповой ярлык" },
            { type: "text", content: "class используется чтобы СГРУППИРОВАТЬ элементы общим ярлыком. Много элементов могут иметь один class. В основном для стилизации CSS." },
            { type: "code", content: '<p class="important">Первый важный абзац</p>\n<p class="normal">Обычный абзац</p>\n<p class="important">Ещё один важный</p>\n\n<!-- Можно несколько классов через пробел -->\n<div class="card highlighted large">...</div>' },
            { type: "heading", content: "title — подсказка при наведении" },
            { type: "text", content: "title показывает всплывающую подсказку при наведении мыши. Полезно для пояснений." },
            { type: "code", content: '<button title="Нажми чтобы сохранить">Сохранить</button>\n\n<a href="/help" title="Открывает страницу помощи">?</a>' },
            { type: "heading", content: "data-* — пользовательские данные" },
            { type: "text", content: "Можно добавить любой свой атрибут начиная с data-. Используется чтобы хранить доп. инфу для JavaScript." },
            { type: "code", content: '<div data-user-id="42" data-role="admin">\n  Алиса\n</div>\n\n<button data-action="delete" data-item-id="123">\n  Удалить\n</button>' },
            { type: "tip", content: "Правило: id = ОДИН конкретный элемент (как паспорт), class = категория (как профессия). Стилизация = классы. id в основном для JS и якорей." }
          ]
        },
        practice: {
          title: "Используй id, class, title",
          description: "Попробуй 4 типа атрибутов.",
          task: "Построй страницу с id для секции, классами, подсказкой и data-атрибутами.",
          starterCode: '<h1 id="top">Мой Ресторан</h1>\n\n<nav>\n  <a href="#menu">К меню</a> |\n  <a href="#contact">К контактам</a>\n</nav>\n\n<h2 id="menu">Меню</h2>\n<p class="dish">🍕 Пицца Маргарита — $12</p>\n<p class="dish popular">🍔 Чизбургер — $8</p>\n<p class="dish">🥗 Цезарь — $9</p>\n\n<h2 id="contact">Контакты</h2>\n<p>\n  <button title="Кликни чтобы скопировать email" data-action="copy" data-value="hello@restaurant.com">\n    📧 Скопировать email\n  </button>\n</p>\n\n<p><a href="#top">⬆ Наверх</a></p>',
        },
        type: "html-css-js"
      },

      {
        id: "html-comments",
        title: "Комментарии",
        theory: {
          sections: [
            { type: "heading", content: "Зачем нужны комментарии" },
            { type: "text", content: "Комментарии — это заметки В коде, которые браузер игнорирует. Они невидимы для пользователей. Используются чтобы объяснить ПОЧЕМУ что-то сделано, разметить секции или временно отключить код." },
            { type: "heading", content: "Как написать комментарий" },
            { type: "code", content: '<!-- Это комментарий -->\n\n<!-- \n  Комментарий может занимать\n  несколько строк\n-->\n\n<h1>Это будет показано</h1>\n<!-- <h1>А это НЕ будет показано</h1> -->' },
            { type: "heading", content: "Хорошие способы использовать" },
            { type: "code", content: '<!-- ========== HEADER ========== -->\n<header>\n  <h1>Мой Сайт</h1>\n</header>\n\n<!-- ========== MAIN ========== -->\n<main>\n  <!-- TODO: добавить рекомендуемые посты -->\n\n  <article>\n    <h2>Заголовок поста</h2>\n    <!-- Формат даты: YYYY-MM-DD -->\n    <time>2026-05-25</time>\n  </article>\n</main>' },
            { type: "heading", content: "ТАК НЕ ДЕЛАЙ" },
            { type: "list", items: [
              "Не клади секреты/пароли в комментарии — любой может посмотреть исходный код",
              "Не комментируй КАЖДУЮ строку — пиши почему, а не что",
              "Не оставляй огромные блоки закомментированного кода — удаляй, есть Git"
            ]},
            { type: "tip", content: "Хороший код в основном самообъясняющийся. Но для хитрых моментов — короткая заметка экономит часы." }
          ]
        },
        practice: {
          title: "Добавь комментарии",
          description: "Используй комментарии для организации и пояснения.",
          task: "Построй страницу с комментариями, разделяющими секции и поясняющими сложные части.",
          starterCode: '<!DOCTYPE html>\n<html lang="ru">\n<head>\n  <meta charset="UTF-8">\n  <title>Обо мне</title>\n</head>\n<body>\n\n  <!-- ========== HEADER ========== -->\n  <header>\n    <h1>Алексей Петров</h1>\n    <!-- TODO: добавить фото профиля -->\n  </header>\n\n  <!-- ========== ОСНОВНОЙ КОНТЕНТ ========== -->\n  <main>\n    <h2>Обо мне</h2>\n    <p>Я разработчик, изучаю HTML.</p>\n\n    <!-- Эту секцию надо обновлять каждый месяц -->\n    <h2>Текущие проекты</h2>\n    <ul>\n      <li>Личный сайт</li>\n      <li>Блог</li>\n    </ul>\n  </main>\n\n  <!-- ========== FOOTER ========== -->\n  <footer>\n    <p>© 2026 Алексей Петров</p>\n  </footer>\n\n</body>\n</html>',
        },
        type: "html-css-js"
      },

      {
        id: "html-entities",
        title: "Специальные символы",
        theory: {
          sections: [
            { type: "heading", content: "Зачем нужны спец. символы" },
            { type: "text", content: "Некоторые символы имеют особое значение в HTML. Например, < начинает тег. Если хочешь буквально показать < на странице — нужен HTML ENTITY (мнемоника)." },
            { type: "heading", content: "Самые частые" },
            { type: "code", content: '&lt;    →  <  (меньше)\n&gt;    →  >  (больше)\n&amp;   →  &  (амперсанд)\n&quot;  →  "  (кавычка)\n&nbsp;  →  неразрывный пробел\n&copy;  →  ©  (копирайт)\n&reg;   →  ®  (зарегистрировано)' },
            { type: "heading", content: "Почему это важно" },
            { type: "code", content: '<!-- ❌ Браузер подумает что это тег -->\n<p>Используй тег <div> для контейнеров</p>\n\n<!-- ✅ Правильно -->\n<p>Используй тег &lt;div&gt; для контейнеров</p>' },
            { type: "heading", content: "Стрелки и математика" },
            { type: "code", content: '&larr;  →  ←\n&rarr;  →  →\n&hearts; →  ♥\n&euro;  →  €\n&deg;   →  °\n&times; →  ×\n&divide; →  ÷' },
            { type: "tip", content: "В наши дни можно просто вставить эмодзи 😀 напрямую — UTF-8 поддерживает всё. Но для < > & ВСЁ РАВНО нужны мнемоники." }
          ]
        },
        practice: {
          title: "Используй спец. символы",
          description: "Попробуй несколько частых мнемоник.",
          task: "Сделай страницу со спец. символами.",
          starterCode: '<h2>HTML Шпаргалка</h2>\n\n<p>Самые частые теги:</p>\n<ul>\n  <li>&lt;p&gt; &amp; &lt;/p&gt; &mdash; для абзацев</li>\n  <li>&lt;a&gt; &amp; &lt;/a&gt; &mdash; для ссылок</li>\n  <li>&lt;img&gt; &mdash; для картинок</li>\n</ul>\n\n<p>Если цена 5&nbsp;USD &mdash; 5 никогда не оторвётся от USD.</p>\n\n<p>Навигация: Главная &larr; Блог &rarr; Контакты</p>\n\n<p>Математика: 5 &times; 3 = 15, 10 &divide; 2 = 5</p>\n\n<footer>\n  <p>&copy; 2026 Моя Компания &reg;</p>\n</footer>',
        },
        type: "html-css-js"
      },

      {
        id: "html-quotes",
        title: "Цитаты и код",
        theory: {
          sections: [
            { type: "heading", content: "blockquote — длинные цитаты" },
            { type: "text", content: "Используй <blockquote> для длинных, важных цитат. Браузер делает отступ и визуально выделяет." },
            { type: "code", content: '<blockquote>\n  <p>Единственный способ делать великую работу — любить то, что делаешь.</p>\n  <cite>— Стив Джобс</cite>\n</blockquote>' },
            { type: "heading", content: "q — короткие цитаты в строке" },
            { type: "text", content: "Используй <q> для коротких цитат ВНУТРИ абзаца. Браузер автоматически добавит кавычки." },
            { type: "code", content: '<p>\n  Мама всегда говорила мне: <q>Ешь овощи!</q>\n  И она была права.\n</p>' },
            { type: "heading", content: "code — фрагменты кода" },
            { type: "text", content: "Используй <code> для кода внутри текста. Используй <pre> с <code> для многострочных блоков." },
            { type: "code", content: '<p>\n  В JavaScript используй <code>console.log()</code> для вывода.\n</p>\n\n<pre><code>function hello() {\n  console.log("Привет!");\n}</code></pre>' },
            { type: "heading", content: "kbd, samp, var" },
            { type: "list", items: [
              "<kbd> — нажатие клавиш (Ctrl + C)",
              "<samp> — пример вывода программы",
              "<var> — переменная в математике/коде"
            ]},
            { type: "code", content: '<p>Нажми <kbd>Ctrl</kbd> + <kbd>S</kbd> чтобы сохранить.</p>\n<p>Программа выведет: <samp>Привет, мир!</samp></p>\n<p>Если <var>x</var> = 5, то <var>x</var> + 1 = 6</p>' },
            { type: "tip", content: "Эти теги не сильно меняют вид — но говорят поисковикам и скринридерам ЧТО за контент. Настоящая семантика." }
          ]
        },
        practice: {
          title: "Цитаты и код",
          description: "Попробуй blockquote, q, cite, code, kbd.",
          task: "Сделай страницу со всеми 5 тегами.",
          starterCode: '<h2>Моя любимая цитата</h2>\n\n<blockquote>\n  <p>Будь тем изменением, которое хочешь видеть в мире.</p>\n  <cite>— Махатма Ганди</cite>\n</blockquote>\n\n<p>\n  Как сказал Эйнштейн: <q>Воображение важнее знания.</q>\n</p>\n\n<h2>Полезное сочетание клавиш</h2>\n<p>\n  Нажми <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd> чтобы открыть DevTools.\n</p>\n\n<h2>Пример кода</h2>\n<p>\n  Функция <code>alert()</code> показывает попап:\n</p>\n<pre><code>alert("Привет!");</code></pre>',
        },
        type: "html-css-js"
      },

      {
        id: "html-media",
        title: "Видео и аудио",
        theory: {
          sections: [
            { type: "heading", content: "Видео на странице — <video>" },
            { type: "text", content: "Тег <video> проигрывает видео прямо на странице — без плагинов. Атрибут src — ссылка на файл. controls добавляет кнопки play/pause." },
            { type: "code", content: '<video src="movie.mp4" controls></video>\n\n<!-- С несколькими форматами для совместимости -->\n<video controls width="500">\n  <source src="movie.mp4" type="video/mp4">\n  <source src="movie.webm" type="video/webm">\n  Твой браузер не поддерживает видео.\n</video>' },
            { type: "heading", content: "Полезные атрибуты" },
            { type: "list", items: [
              "controls — показать кнопки",
              "autoplay — автоматическое воспроизведение",
              "loop — зациклить",
              "muted — без звука",
              "poster='preview.jpg' — превью до старта",
              "width / height — размер плеера"
            ]},
            { type: "heading", content: "Аудио — <audio>" },
            { type: "code", content: '<audio src="song.mp3" controls></audio>\n\n<audio controls>\n  <source src="song.mp3" type="audio/mpeg">\n  Твой браузер не поддерживает аудио.\n</audio>' },
            { type: "tip", content: "Для YouTube используй <iframe> — следующий урок. <video> только если сам хостишь файл." }
          ]
        },
        practice: {
          title: "Добавь видео и аудио",
          description: "Используй бесплатные демо-файлы.",
          task: "Добавь видео и аудио с controls.",
          starterCode: '<h2>Моё видео</h2>\n\n<video controls width="500" poster="https://picsum.photos/500/280">\n  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">\n  Твой браузер не поддерживает видео.\n</video>\n\n<h2>Моё аудио</h2>\n\n<audio controls>\n  <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">\n  Твой браузер не поддерживает аудио.\n</audio>',
        },
        type: "html-css-js"
      },

      {
        id: "html-iframe",
        title: "iframe — встраивание страниц",
        theory: {
          sections: [
            { type: "heading", content: "Что такое <iframe>?" },
            { type: "text", content: "iframe позволяет встроить другой сайт ВНУТРЬ твоей страницы. Используется для YouTube, Google Maps, форм." },
            { type: "code", content: '<iframe src="https://example.com" width="600" height="400"></iframe>' },
            { type: "heading", content: "Встраивание YouTube" },
            { type: "code", content: '<iframe\n  width="560"\n  height="315"\n  src="https://www.youtube.com/embed/VIDEO_ID"\n  frameborder="0"\n  allowfullscreen>\n</iframe>' },
            { type: "heading", content: "Полезные атрибуты" },
            { type: "list", items: [
              "src — что встраиваем",
              "width / height — размер",
              "allowfullscreen — разрешить полный экран",
              "loading='lazy' — загружать только при скролле",
              "title='Описание' — для скринридеров"
            ]},
            { type: "tip", content: "Всегда добавляй title и loading='lazy'. Первое для доступности, второе — для скорости." }
          ]
        },
        practice: {
          title: "Встрой YouTube",
          description: "Реальное видео через iframe.",
          task: "Добавь YouTube видео через iframe.",
          starterCode: '<h2>Мой любимый туториал</h2>\n\n<iframe\n  width="560"\n  height="315"\n  src="https://www.youtube.com/embed/dQw4w9WgXcQ"\n  title="YouTube видео"\n  frameborder="0"\n  allowfullscreen\n  loading="lazy">\n</iframe>',
        },
        type: "html-css-js"
      },

      {
        id: "html-advanced-forms",
        title: "Расширенные формы: select, textarea",
        theory: {
          sections: [
            { type: "heading", content: "textarea — многострочный ввод" },
            { type: "text", content: "<input> — для однострочного. Для длинных сообщений — <textarea>." },
            { type: "code", content: '<label>\n  Твоё сообщение:<br>\n  <textarea rows="5" cols="40" placeholder="Пиши здесь..."></textarea>\n</label>' },
            { type: "heading", content: "select — выпадающий список" },
            { type: "code", content: '<label>\n  Выбери страну:<br>\n  <select>\n    <option value="ru">Россия</option>\n    <option value="us">США</option>\n    <option value="uk">Великобритания</option>\n  </select>\n</label>' },
            { type: "heading", content: "Выбранный по умолчанию" },
            { type: "code", content: '<select>\n  <option value="" disabled selected>-- Выбери город --</option>\n  <option value="msk">Москва</option>\n  <option value="spb">Санкт-Петербург</option>\n</select>' },
            { type: "heading", content: "fieldset и legend" },
            { type: "text", content: "<fieldset> группирует поля формы с рамкой. <legend> — заголовок группы." },
            { type: "code", content: '<form>\n  <fieldset>\n    <legend>Личные данные</legend>\n    <label>Имя: <input type="text"></label>\n    <label>Возраст: <input type="number"></label>\n  </fieldset>\n</form>' },
            { type: "tip", content: "Всегда оборачивай форму в <form>. Это позволяет Enter отправлять её." }
          ]
        },
        practice: {
          title: "Форма обратной связи",
          description: "Используй select, textarea и fieldset.",
          task: "Построй форму с именем, страной и сообщением.",
          starterCode: '<h2>Свяжитесь с нами</h2>\n\n<form>\n  <fieldset>\n    <legend>Твои данные</legend>\n\n    <p>\n      <label>\n        Имя:<br>\n        <input type="text" required>\n      </label>\n    </p>\n\n    <p>\n      <label>\n        Страна:<br>\n        <select required>\n          <option value="" disabled selected>-- Выбери --</option>\n          <option value="ru">Россия</option>\n          <option value="us">США</option>\n          <option value="uk">Великобритания</option>\n        </select>\n      </label>\n    </p>\n  </fieldset>\n\n  <fieldset>\n    <legend>Твоё сообщение</legend>\n    <p>\n      <label>\n        Сообщение:<br>\n        <textarea rows="5" cols="40" required></textarea>\n      </label>\n    </p>\n  </fieldset>\n\n  <button type="submit">Отправить</button>\n</form>',
        },
        type: "html-css-js"
      },

      {
        id: "html-meta",
        title: "Метаданные: meta, favicon, OG",
        theory: {
          sections: [
            { type: "heading", content: "Что такое meta?" },
            { type: "text", content: "Мета-теги живут в <head> и дают браузерам и поисковикам информацию О странице. Они невидимы для пользователей, но очень важны." },
            { type: "heading", content: "Обязательные meta" },
            { type: "code", content: '<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Мой Сайт</title>\n</head>' },
            { type: "heading", content: "SEO meta" },
            { type: "code", content: '<meta name="description" content="Короткое описание страницы, 150-160 символов.">\n<meta name="author" content="Алексей Петров">' },
            { type: "heading", content: "Open Graph — превью в соцсетях" },
            { type: "text", content: "Когда ты делишься ссылкой в Telegram, ВКонтакте — появляется красивое превью. Это контролируют OG-теги." },
            { type: "code", content: '<meta property="og:title" content="Моя крутая статья">\n<meta property="og:description" content="Описание для соцсетей">\n<meta property="og:image" content="https://mysite.com/preview.jpg">' },
            { type: "heading", content: "Favicon — иконка во вкладке" },
            { type: "code", content: '<link rel="icon" href="favicon.png" type="image/png">' },
            { type: "tip", content: "Минимум в head: charset, viewport, title, description, og:title, og:image, favicon. 7 тегов = профессиональный вид." }
          ]
        },
        practice: {
          title: "Профессиональный <head>",
          description: "Добавь все важные meta.",
          task: "Построй полный HTML head со всеми важными мета-тегами.",
          starterCode: '<!DOCTYPE html>\n<html lang="ru">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Мой крутой блог — TechHub</title>\n\n  <meta name="description" content="Учим веб-разработку простыми уроками.">\n  <meta name="author" content="Алексей Петров">\n\n  <meta property="og:title" content="Мой крутой блог">\n  <meta property="og:description" content="Учим веб-разработку.">\n  <meta property="og:image" content="https://picsum.photos/1200/630">\n\n  <link rel="icon" href="https://example.com/favicon.png">\n</head>\n<body>\n\n  <h1>Мой крутой блог</h1>\n  <p>Все важные meta настроены.</p>\n\n</body>\n</html>',
        },
        type: "html-css-js"
      },

      {
        id: "html-mini-project",
        title: "Мини-проект: твоё резюме",
        theory: {
          sections: [
            { type: "heading", content: "Время применить ВСЁ!" },
            { type: "text", content: "Ты знаешь все основные теги HTML. Время построить что-то реальное — онлайн-резюме!" },
            { type: "heading", content: "Что содержит резюме" },
            { type: "list", items: [
              "Шапка: имя, профессия, контакты",
              "Обо мне: краткое био",
              "Навыки: список",
              "Опыт работы: список с датами",
              "Проекты: ссылки на работы",
              "Форма обратной связи"
            ]},
            { type: "tip", content: "Не переживай что страница без стилей. Сейчас фокус — структура HTML. CSS — в следующем модуле!" }
          ]
        },
        practice: {
          title: "Построй своё резюме",
          description: "Используй всё что выучил в одном проекте.",
          task: "Построй полное резюме с правильной структурой и всеми секциями.",
          starterCode: '<!DOCTYPE html>\n<html lang="ru">\n<head>\n  <meta charset="UTF-8">\n  <title>Алексей Петров — Frontend</title>\n</head>\n<body>\n\n  <header>\n    <h1>Алексей Петров</h1>\n    <p><strong>Frontend разработчик</strong></p>\n    <p>\n      📧 <a href="mailto:alex@example.com">alex@example.com</a> |\n      🌐 <a href="https://github.com" target="_blank">GitHub</a>\n    </p>\n  </header>\n\n  <nav>\n    <a href="#about">Обо мне</a> |\n    <a href="#skills">Навыки</a> |\n    <a href="#experience">Опыт</a> |\n    <a href="#contact">Контакты</a>\n  </nav>\n\n  <main>\n    <section id="about">\n      <h2>Обо мне</h2>\n      <p>Я Frontend разработчик с опытом <strong>3 года</strong>.</p>\n    </section>\n\n    <section id="skills">\n      <h2>Навыки</h2>\n      <ul>\n        <li>HTML5 &amp; CSS3</li>\n        <li>JavaScript &amp; TypeScript</li>\n        <li>React</li>\n      </ul>\n    </section>\n\n    <section id="experience">\n      <h2>Опыт</h2>\n      <table border="1" cellpadding="8">\n        <tr>\n          <th>Год</th>\n          <th>Компания</th>\n          <th>Должность</th>\n        </tr>\n        <tr>\n          <td>2023 — сейчас</td>\n          <td>Tech Corp</td>\n          <td>Senior Frontend</td>\n        </tr>\n      </table>\n    </section>\n\n    <section id="contact">\n      <h2>Свяжись со мной</h2>\n      <form>\n        <p><label>Имя:<br><input type="text" required></label></p>\n        <p><label>Email:<br><input type="email" required></label></p>\n        <p><label>Сообщение:<br><textarea rows="4" cols="40" required></textarea></label></p>\n        <button type="submit">Отправить</button>\n      </form>\n    </section>\n  </main>\n\n  <footer>\n    <p>&copy; 2026 Алексей Петров.</p>\n  </footer>\n\n</body>\n</html>',
        },
        type: "html-css-js"
      },
        

    ]
  }
};