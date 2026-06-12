import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, Play, CheckCircle, BookOpen, Code,
  ChevronRight, Star, Trophy, Zap,
  Lightbulb, Eye, Copy, Check, RefreshCw, Menu, X
} from 'lucide-react';
import { lessonData } from './LessonData.tsx';   
import hljs from 'highlight.js';

const glassCard = "bg-white/80 dark:bg-[#0d0e12]/80 backdrop-blur-2xl border border-stone-200/80 dark:border-white/[0.07] rounded-[2rem] shadow-[0_8px_32px_rgba(124,94,32,0.10)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]";

const colorText: Record<string, string> = {
  cyan: "text-[#b8893a] dark:text-[#e6c272]",
  pink: "text-[#b8893a] dark:text-[#e6c272]",
  purple: "text-[#b8893a] dark:text-[#e6c272]",
  blue: "text-[#b8893a] dark:text-[#e6c272]",
  emerald: "text-[#b8893a] dark:text-[#e6c272]",
  amber: "text-[#b8893a] dark:text-[#e6c272]",
  orange: "text-[#b8893a] dark:text-[#e6c272]",
  rose: "text-[#b8893a] dark:text-[#e6c272]",
};

const colorGradient: Record<string, string> = {
  cyan: "from-[#f3dfa8] via-[#e6c272] to-[#c89a3f]",
  pink: "from-[#f3dfa8] via-[#e6c272] to-[#c89a3f]",
  purple: "from-[#f3dfa8] via-[#e6c272] to-[#c89a3f]",
  blue: "from-[#f3dfa8] via-[#e6c272] to-[#c89a3f]",
  emerald: "from-[#f3dfa8] via-[#e6c272] to-[#c89a3f]",
  amber: "from-[#f3dfa8] via-[#e6c272] to-[#c89a3f]",
  orange: "from-[#f3dfa8] via-[#e6c272] to-[#c89a3f]",
  rose: "from-[#f3dfa8] via-[#e6c272] to-[#c89a3f]",
};

// === localStorage helpers ===
const LESSONS_STORAGE_KEY = "skillpath-lessons-progress-v1";

const loadCompletedLessons = (skillId: string): string[] => {
  try {
    const raw = localStorage.getItem(LESSONS_STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return data[skillId] || [];
  } catch {
    return [];
  }
};

const saveCompletedLessons = (skillId: string, lessons: string[]) => {
  try {
    const raw = localStorage.getItem(LESSONS_STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : {};
    data[skillId] = lessons;
    localStorage.setItem(LESSONS_STORAGE_KEY, JSON.stringify(data));
  } catch {}
};

// === auto-detect language ===
const detectLang = (code: string): string => {
  const t = code.trim();
  if (t.startsWith('<!DOCTYPE') || t.startsWith('<html') || /<\w+/.test(t.slice(0, 200))) return 'html';
  if (/^\s*(\.|#|\*|@media|body|html)\s*{/m.test(t) && !/function|const|let|var|=>/m.test(t)) return 'css';
  if (/^\s*(def |import |from |print\(|class \w+:)/m.test(t)) return 'python';
  return 'javascript';
};

// === HIGHLIGHTED CODE BLOCK (for theory) ===
const HighlightedCode = ({ code, language }: { code: string; language?: string }) => {
  const lang = language || detectLang(code);
  const [copied, setCopied] = useState(false);

  const highlighted = useMemo(() => {
    try {
      return hljs.highlight(code, { language: lang, ignoreIllegals: true }).value;
    } catch {
      return hljs.highlightAuto(code).value;
    }
  }, [code, lang]);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative bg-[#282c34] rounded-xl my-3 overflow-hidden group">
      <div className="flex items-center justify-between px-4 py-2 bg-black/30 border-b border-white/5">
        <span className="text-[10px] text-white/40 font-mono uppercase tracking-wider">{lang}</span>
        <button
          onClick={copy}
          className="text-[10px] text-white/40 hover:text-white/80 transition-colors flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-6">
        <code className={`hljs language-${lang}`} dangerouslySetInnerHTML={{ __html: highlighted }} />
      </pre>
    </div>
  );
};

// === CODE EDITOR ===
const CodeEditor = ({ initialCode, language, onCodeChange, onRun, output, error, isRunning, t, autoRun }: any) => {
  const [code, setCode] = useState(initialCode || '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => { setCode(initialCode || ''); }, [initialCode]);
  useEffect(() => { if (onCodeChange) onCodeChange(code); }, [code, onCodeChange]);

  const lang = language === 'html' || language === 'html-css-js' ? 'html'
    : language === 'css' ? 'css'
    : language === 'python' ? 'python'
    : 'javascript';

  const highlighted = useMemo(() => {
    try {
      return hljs.highlight(code + '\n', { language: lang, ignoreIllegals: true }).value;
    } catch { return code; }
  }, [code, lang]);

  const handleScroll = useCallback(() => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const t = e.currentTarget;
      const start = t.selectionStart, end = t.selectionEnd;
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newCode);
      requestAnimationFrame(() => { t.selectionStart = t.selectionEnd = start + 2; });
    }
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-[#282c34]">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#21252b] border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-white/60 ml-2 font-mono">
            {lang === 'html' ? 'index.html' : lang === 'python' ? 'main.py' : lang === 'css' ? 'styles.css' : 'script.js'}
          </span>
        </div>
        <span className="text-[10px] text-white/30 uppercase tracking-wider font-bold">{lang}</span>
      </div>
      <div className="relative min-h-[240px] max-h-[400px] md:min-h-[300px] md:max-h-[500px] overflow-hidden">
        <pre ref={preRef} aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: highlighted }}
          className="absolute inset-0 m-0 p-4 overflow-auto pointer-events-none hljs"
          style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace', fontSize: '14px', lineHeight: '1.6', tabSize: 2, whiteSpace: 'pre', wordWrap: 'normal', background: 'transparent' }}
        />
        <textarea ref={textareaRef} value={code}
          onChange={(e) => setCode(e.target.value)} onScroll={handleScroll} onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          className="absolute inset-0 w-full h-full p-4 bg-transparent resize-none outline-none"
          style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace', fontSize: '14px', lineHeight: '1.6', tabSize: 2, color: 'transparent', caretColor: '#fff', WebkitTextFillColor: 'transparent', whiteSpace: 'pre', wordWrap: 'normal', overflowWrap: 'normal' }}
        />
      </div>
      {(output || error) && (
        <div className={`border-t border-white/5 ${error ? 'bg-red-500/10' : 'bg-green-500/5'}`}>
          <div className="flex items-center gap-2 px-4 py-2 bg-black/20">
            {error ? <span className="text-xs font-bold text-red-400">⚠ {t.error}</span>
                   : <span className="text-xs font-bold text-green-400">✓ {t.output}</span>}
          </div>
          <pre className={`px-4 py-3 text-sm font-mono whitespace-pre-wrap max-h-[200px] overflow-auto ${error ? 'text-red-400' : 'text-green-300'}`}>
            {error || output}
          </pre>
        </div>
      )}
      <div className="p-3 bg-[#21252b] border-t border-white/5 flex items-center gap-2">
        <button onClick={() => onRun(code)} disabled={isRunning}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#f3dfa8] via-[#e6c272] to-[#c89a3f] text-white font-bold text-sm hover:opacity-90 transition-all disabled:opacity-50">
          {isRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
          {isRunning ? t.running : t.runCode}
        </button>
        {autoRun && (
          <span className="text-[10px] text-white/40 uppercase tracking-wider font-bold px-3">Live ⚡</span>
        )}
      </div>
    </div>
  );
};

// === PREVIEW FRAME ===
const PreviewFrame = ({ fullHtml, fallbackHtml }: { fullHtml?: string; fallbackHtml?: string }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeError, setIframeError] = useState<string | null>(null);

  useEffect(() => {
    if (!iframeRef.current) return;
    const content = fullHtml || fallbackHtml || '';
    const isFullPage = /<html[\s>]/i.test(content) || /<!DOCTYPE/i.test(content);
    const wrappedHtml = isFullPage ? content : `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>body{font-family:system-ui;padding:16px;margin:0;color:#1e293b;background:#fff}</style></head>
<body>${content}<script>window.addEventListener('error',function(e){const d=document.createElement('div');d.style.cssText='position:fixed;bottom:8px;left:8px;right:8px;padding:10px;background:#fee2e2;color:#b91c1c;border:1px solid #fca5a5;border-radius:8px;font-family:monospace;font-size:12px;z-index:9999';d.textContent='Runtime error: '+e.message;document.body.appendChild(d)})</script></body></html>`;
    try {
      iframeRef.current.srcdoc = wrappedHtml;
      setIframeError(null);
    } catch (e: any) { setIframeError(e.message); }
  }, [fullHtml, fallbackHtml]);

  return (
    <div className="rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-white">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#21252b] border-b border-white/5">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-white/50" />
          <span className="text-xs text-white/60 font-medium">Live Preview</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Live</span>
        </div>
      </div>
      <iframe ref={iframeRef} className="w-full h-[360px] md:h-[500px] bg-white" sandbox="allow-scripts allow-same-origin" title="Code Preview" />
      {iframeError && (
        <div className="p-3 bg-red-500/10 border-t border-red-500/20">
          <p className="text-xs text-red-400 font-mono">{iframeError}</p>
        </div>
      )}
    </div>
  );
};

// === LESSON VIEW ===
const LessonView = ({ lesson, lessonIndex, colorClass, completedLessons, onCompleteLesson, t, lang }: any) => {
  const [activeTab, setActiveTab] = useState('theory');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [liveCode, setLiveCode] = useState(lesson.practice?.starterCode || '');
  const [debouncedCode, setDebouncedCode] = useState(liveCode);
  const isCompleted = completedLessons.includes(lesson.id);
  const isHtmlLesson = lesson.type === 'html-css-js';

  useEffect(() => {
    setLiveCode(lesson.practice?.starterCode || '');
    setDebouncedCode(lesson.practice?.starterCode || '');
    setOutput(''); setError(''); setActiveTab('theory');
  }, [lesson.id]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedCode(liveCode), 400);
    return () => clearTimeout(timer);
  }, [liveCode]);

  const handleRunCode = (code: string) => {
    setIsRunning(true); setOutput(''); setError('');
    setTimeout(() => {
      try {
        if (isHtmlLesson) {
          setOutput(t.codeRanSuccessfully); setError(''); setActiveTab('preview');
        } else if (lesson.type === 'javascript') {
          const logs: string[] = [];
          const mockConsole = {
            log: (...args: any[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ')),
            error: (...args: any[]) => logs.push('ERROR: ' + args.join(' ')),
            warn: (...args: any[]) => logs.push('WARN: ' + args.join(' ')),
          };
          const fn = new Function('console', code);
          fn(mockConsole);
          setOutput(logs.join('\n') || t.noOutput); setError('');
        } else {
          // Python / CSS / другие языки — умная симуляция
          const trimmedCode = code.replace(/\s+/g, ' ').trim();
          const trimmedSolution = (lesson.practice?.solution || '').replace(/\s+/g, ' ').trim();
          const expectedOut = lesson.expectedOutput || lesson.practice?.expectedOutput || '';

          if (!trimmedCode || trimmedCode === (lesson.practice?.starterCode || '').replace(/\s+/g, ' ').trim()) {
            // Код не изменён — подсказка
            setOutput(lang === 'RU'
              ? '⚠️ Заполните пропуски в коде и нажмите «Запустить»'
              : '⚠️ Fill in the blanks and click "Run Code"');
            setError('');
          } else if (trimmedSolution && (
            trimmedCode === trimmedSolution ||
            trimmedCode.includes(trimmedSolution) ||
            trimmedSolution.includes(trimmedCode)
          )) {
            // Код совпадает с решением
            setOutput(expectedOut
              ? '✅ ' + expectedOut
              : (lang === 'RU' ? '✅ Правильно! Код работает корректно.' : '✅ Correct! Code works as expected.'));
            setError('');
            onCompleteLesson(lesson.id);
          } else {
            // Код введён, но не совпадает — пытаемся симулировать вывод
            // Для Python: ищем print() вызовы и "выполняем" их
            if (lesson.type === 'python') {
              const printMatches = [...code.matchAll(/print\s*\((.+?)\)/g)];
              if (printMatches.length > 0) {
                const simulated = printMatches.map(m => {
                  let expr = m[1].trim();
                  // Убираем f-строки и кавычки для простого вывода
                  expr = expr.replace(/f?["'](.+?)["']/g, '$1');
                  // Пытаемся вычислить простые выражения
                  try {
                    // Собираем переменные из кода
                    const vars: Record<string, any> = {};
                    const assignments = [...code.matchAll(/(\w+)\s*=\s*(.+)/g)];
                    for (const a of assignments) {
                      if (!a[2].includes('print') && !a[2].includes('input')) {
                        try { vars[a[1]] = eval(a[2].trim()); } catch {}
                      }
                    }
                    // Подставляем переменные в выражение
                    let resolved = expr;
                    for (const [k, v] of Object.entries(vars)) {
                      resolved = resolved.replace(new RegExp('\\b' + k + '\\b', 'g'), JSON.stringify(v));
                    }
                    // Вычисляем
                    const result = eval(resolved);
                    return String(result);
                  } catch {
                    return expr;
                  }
                }).join('\n');

                // Сравниваем с ожидаемым
                const simTrimmed = simulated.replace(/\s+/g, ' ').trim().toLowerCase();
                const expTrimmed = (expectedOut || '').replace(/\s+/g, ' ').trim().toLowerCase();
                if (expTrimmed && (simTrimmed.includes(expTrimmed) || expTrimmed.includes(simTrimmed))) {
                  setOutput('✅ ' + simulated);
                  onCompleteLesson(lesson.id);
                } else {
                  setOutput(simulated + '\n\n' + (lang === 'RU'
                    ? '⚠️ Проверьте — результат может отличаться от ожидаемого'
                    : '⚠️ Check — result may differ from expected'));
                }
              } else {
                setOutput(lang === 'RU'
                  ? '⚠️ Не найден вызов print(). Добавьте вывод результата.'
                  : '⚠️ No print() call found. Add output.');
              }
            } else if (lesson.type === 'css') {
              // CSS — просто проверяем ключевые свойства
              const keyProps = (lesson.practice?.checkFor || []) as string[];
              const allPresent = keyProps.length === 0 || keyProps.every((prop: string) =>
                code.toLowerCase().includes(prop.toLowerCase())
              );
              if (allPresent && trimmedCode !== (lesson.practice?.starterCode || '').replace(/\s+/g, ' ').trim()) {
                setOutput(lang === 'RU' ? '✅ Стили применены корректно!' : '✅ Styles applied correctly!');
                onCompleteLesson(lesson.id);
              } else {
                setOutput(lang === 'RU'
                  ? '⚠️ Проверьте — убедитесь что добавили нужные CSS-свойства'
                  : '⚠️ Check — make sure you added the required CSS properties');
              }
            } else {
              // Bash / YAML / SQL / Config и другие — проверяем ключевые слова
              const checkFor = (lesson.practice?.checkFor || []) as string[];
              const codeLower = code.toLowerCase();

              if (checkFor.length > 0) {
                const matched = checkFor.filter((kw: string) => codeLower.includes(kw.toLowerCase()));
                const pct = Math.round((matched.length / checkFor.length) * 100);

                if (pct >= 80) {
                  setOutput((expectedOut ? '✅ ' + expectedOut + '\n\n' : '') + (lang === 'RU'
                    ? `✅ Отлично! ${matched.length}/${checkFor.length} ключевых элементов найдено.`
                    : `✅ Great! ${matched.length}/${checkFor.length} key elements found.`));
                  onCompleteLesson(lesson.id);
                } else {
                  setOutput((lang === 'RU'
                    ? `⚠️ Найдено ${matched.length} из ${checkFor.length} ключевых элементов. Проверьте код.`
                    : `⚠️ Found ${matched.length} of ${checkFor.length} key elements. Check your code.`)
                    + (matched.length > 0 ? '\n✅ ' + matched.join(', ') : '')
                    + '\n❌ ' + checkFor.filter((kw: string) => !codeLower.includes(kw.toLowerCase())).join(', '));
                }
              } else if (expectedOut) {
                setOutput('✅ ' + expectedOut);
                onCompleteLesson(lesson.id);
              } else {
                // Если код изменён от стартового — считаем выполненным
                const starterTrimmed = (lesson.practice?.starterCode || '').replace(/\s+/g, ' ').trim();
                if (trimmedCode !== starterTrimmed && trimmedCode.length > starterTrimmed.length + 10) {
                  setOutput(lang === 'RU' ? '✅ Код выполнен!' : '✅ Code executed!');
                  onCompleteLesson(lesson.id);
                } else {
                  setOutput(lang === 'RU'
                    ? '⚠️ Допишите код — заполните пропуски'
                    : '⚠️ Complete the code — fill in the blanks');
                }
              }
            }
            setError('');
          }
        }
      } catch (e: any) { setError(e.message); setOutput(''); }
      setIsRunning(false);
    }, 500);
  };

  const tabs = [
    { id: 'theory', icon: BookOpen, label: t.theory },
    { id: 'practice', icon: Code, label: t.practice },
    ...(isHtmlLesson ? [{ id: 'preview', icon: Eye, label: t.preview }] : []),
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full bg-${colorClass}-500/10 ${colorText[colorClass]}`}>
              {t.lesson} {lessonIndex + 1}
            </span>
            {isCompleted && (
              <span className="text-xs font-bold text-green-500 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> {t.completed}
              </span>
            )}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-stone-900 dark:text-white">{lesson.title}</h2>
        </div>
        {!isCompleted && (
          <button onClick={() => onCompleteLesson(lesson.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${colorGradient[colorClass]} text-white text-sm font-bold hover:opacity-90 transition-all`}>
            <CheckCircle className="w-4 h-4" />
            {t.markComplete}
          </button>
        )}
      </div>

      <div className="flex gap-1 mb-6 p-1 bg-black/5 dark:bg-white/5 rounded-xl">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-white dark:bg-white/10 text-stone-900 dark:text-white shadow-sm'
                : 'text-stone-500 dark:text-white/40 hover:text-stone-700 dark:hover:text-white/60'
            }`}>
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'theory' && (
          <motion.div key="theory" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className={`${glassCard} p-5 md:p-6`}>
            {lesson.theory?.sections?.map((section: any, i: number) => (
              <div key={i} className="mb-6 last:mb-0">
                {section.type === 'heading' && (
                  <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-3 flex items-center gap-2">
                    <Lightbulb className={`w-4 h-4 ${colorText[colorClass]}`} />
                    {section.content}
                  </h3>
                )}
                {section.type === 'text' && (
                  <p className="text-stone-600 dark:text-white/70 leading-relaxed mb-3">{section.content}</p>
                )}
                {section.type === 'code' && <HighlightedCode code={section.content} />}
                {section.type === 'tip' && (
                  <div className={`flex gap-3 p-4 rounded-xl bg-${colorClass}-500/5 border border-${colorClass}-500/20 my-3`}>
                    <Zap className={`w-5 h-5 flex-shrink-0 mt-0.5 ${colorText[colorClass]}`} />
                    <p className="text-sm text-stone-700 dark:text-white/80 leading-relaxed">{section.content}</p>
                  </div>
                )}
                {section.type === 'list' && (
                  <ul className="space-y-2 my-3">
                    {section.items?.map((item: string, j: number) => (
                      <li key={j} className="flex items-start gap-2 text-stone-600 dark:text-white/70">
                        <span className={`w-1.5 h-1.5 rounded-full bg-${colorClass}-500 flex-shrink-0 mt-2`} />
                        <span className="text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'practice' && (
          <motion.div key="practice" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
            <div className={`${glassCard} p-5 md:p-6`}>
              <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-3 flex items-center gap-2">
                <Code className={`w-5 h-5 ${colorText[colorClass]}`} />
                {lesson.practice?.title || t.practice}
              </h3>
              {lesson.practice?.description && (
                <p className="text-sm text-stone-600 dark:text-white/70 mb-3">{lesson.practice.description}</p>
              )}
              {lesson.practice?.task && (
                <div className={`mb-4 p-3 rounded-xl bg-${colorClass}-500/5 border border-${colorClass}-500/20`}>
                  <p className="text-sm font-medium text-stone-700 dark:text-white/80">
                    <span className={`font-bold ${colorText[colorClass]}`}>🎯 {t.taskLabel}: </span>
                    {lesson.practice.task}
                  </p>
                </div>
              )}
              <CodeEditor initialCode={lesson.practice?.starterCode} language={lesson.type}
                onCodeChange={setLiveCode} onRun={handleRunCode}
                output={output} error={error} isRunning={isRunning} t={t} autoRun={isHtmlLesson} />
            </div>

            {isHtmlLesson && (
              <div className={`${glassCard} p-5 md:p-6`}>
                <h3 className="text-sm font-bold text-stone-900 dark:text-white mb-3 flex items-center gap-2">
                  <Eye className={`w-4 h-4 ${colorText[colorClass]}`} />
                  {t.livePreview}
                </h3>
                <PreviewFrame fullHtml={debouncedCode} />
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'preview' && isHtmlLesson && (
          <motion.div key="preview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <PreviewFrame fullHtml={debouncedCode} fallbackHtml={lesson.practice?.starterCode} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// === LESSON NAVIGATOR — compact for 20+ lessons ===
const LessonNavigator = ({ lessons, currentIndex, completedLessons, onSelect, colorClass }: any) => {
  return (
    <div className="flex gap-2 mb-8 overflow-x-auto pb-2 -mx-5 px-5 md:mx-0 md:px-0">
      {lessons.map((lesson: any, i: number) => {
        const isCompleted = completedLessons.includes(lesson.id);
        const isCurrent = i === currentIndex;
        return (
          <button
            key={lesson.id}
            onClick={() => onSelect(i)}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isCurrent
                ? `bg-gradient-to-r ${colorGradient[colorClass]} text-white shadow-lg`
                : isCompleted
                ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20'
                : 'bg-black/5 dark:bg-white/5 text-stone-600 dark:text-white/50 border border-black/5 dark:border-white/10 hover:border-black/10 dark:hover:border-white/20'
            }`}
          >
            {isCompleted ? (
              <CheckCircle className="w-3.5 h-3.5" />
            ) : (
              <Star className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">{lesson.title}</span>
            <span className="sm:hidden">L{i + 1}</span>
          </button>
        );
      })}
    </div>
  );
};

// === MAIN PAGE ===
export const SkillLearningPage = ({ skillId, onBack, lang }: any) => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const lessons = lessonData[skillId] && lessonData[skillId][lang] ? lessonData[skillId][lang] : null;

  // Load completed from localStorage on mount
  useEffect(() => {
    if (skillId) {
      setCompletedLessons(loadCompletedLessons(skillId));
    }
  }, [skillId]);

  // Save completed to localStorage on change
  useEffect(() => {
    if (skillId && completedLessons.length >= 0) {
      saveCompletedLessons(skillId, completedLessons);
    }
  }, [skillId, completedLessons]);

  // Scroll to top when changing lesson
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentLessonIndex]);

  if (!lessons) {
    return (
      <div className="min-h-screen pt-28 md:pt-32 pb-20 px-5 md:px-6 relative">
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className={`${glassCard} p-6 md:p-8 text-center`}>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">
              {lang === 'RU' ? 'Уроки ещё не доступны' : 'Lessons not available yet'}
            </h2>
            <p className="text-stone-600 dark:text-white/60 mb-6">
              {lang === 'RU' ? 'Уроки для этой темы скоро появятся.' : 'Lessons for this topic are coming soon.'}
            </p>
            <button onClick={onBack}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-black/5 dark:bg-white/10 text-stone-700 dark:text-white font-bold hover:bg-black/10 dark:hover:bg-white/20 transition-all">
              <ArrowLeft className="w-4 h-4" />
              {lang === 'RU' ? 'Назад к роадмапу' : 'Back to Roadmap'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const skill = lessons;
  const currentLesson = skill.lessons[currentLessonIndex];
  const totalLessons = skill.lessons.length;
  const progress = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;
  const skillColorMap: Record<string, string> = {
    // frontend
    'html-css': 'cyan', 'js-core': 'cyan', 'react': 'cyan', 'typescript': 'cyan', 'state': 'cyan', 'testing': 'cyan', 'deploy': 'cyan',
    // ai
    'python': 'pink', 'math': 'pink', 'sklearn': 'pink', 'dl': 'pink', 'math-ml': 'pink', 'nlp': 'pink', 'mlops': 'pink',
    // cybersec
    'networking': 'purple', 'linux': 'purple', 'pentest': 'purple', 'webapp': 'purple', 'siem': 'purple', 'certs': 'purple',
    // datascience
    'python-ds': 'blue', 'sql': 'blue', 'eda': 'blue', 'stats': 'blue', 'ml-ds': 'blue', 'bi': 'blue', 'bigdata': 'blue',
    // backend
    'node': 'cyan', 'db-basics': 'cyan', 'auth': 'cyan', 'apis': 'cyan', 'docker': 'cyan', 'cloud': 'cyan',
    // mobile
    'rn-basics': 'pink', 'mobile-ui': 'pink', 'native-api': 'pink', 'state-mobile': 'pink', 'appstore': 'pink', 'perf-mobile': 'pink',
    // devops
    'linux-devops': 'purple', 'git-devops': 'purple', 'k8s': 'purple', 'terraform': 'purple', 'monitoring': 'purple', 'aws-devops': 'purple',
    // gamedev
    'csharp': 'blue', 'game-math': 'blue', '2d-games': 'blue', '3d-games': 'blue', 'shaders': 'blue', 'multiplayer': 'blue',
  };
  const colorClass = skillColorMap[skillId || ''] || 'cyan';

  const handleCompleteLesson = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const handleResetProgress = () => {
    if (confirm(lang === 'RU' ? 'Сбросить весь прогресс по этой теме?' : 'Reset all progress for this topic?')) {
      setCompletedLessons([]);
    }
  };

  const t = {
    lesson: lang === 'RU' ? 'Урок' : 'Lesson',
    completed: lang === 'RU' ? 'Пройдено' : 'Completed',
    markComplete: lang === 'RU' ? 'Отметить пройденным' : 'Mark Complete',
    theory: lang === 'RU' ? 'Теория' : 'Theory',
    practice: lang === 'RU' ? 'Практика' : 'Practice',
    preview: lang === 'RU' ? 'Превью' : 'Preview',
    lessonsCompleted: lang === 'RU' ? 'из' : 'of',
    lessonsLabel: lang === 'RU' ? 'уроков пройдено' : 'lessons done',
    previousLesson: lang === 'RU' ? 'Предыдущий' : 'Previous',
    nextLesson: lang === 'RU' ? 'Следующий' : 'Next',
    backToRoadmap: lang === 'RU' ? 'Назад к роадмапу' : 'Back to Roadmap',
    runCode: lang === 'RU' ? 'Запустить' : 'Run Code',
    running: lang === 'RU' ? 'Запуск...' : 'Running...',
    output: lang === 'RU' ? 'Вывод' : 'Output',
    error: lang === 'RU' ? 'Ошибка' : 'Error',
    codeRanSuccessfully: lang === 'RU' ? 'Готово! Смотри Preview' : 'Done! Check Preview',
    noOutput: lang === 'RU' ? 'Нет вывода' : 'No output',
    simulatedOutput: lang === 'RU' ? '[Симуляция]' : '[Simulated output]',
    allLessonsComplete: lang === 'RU' ? 'Все уроки пройдены!' : 'All Lessons Complete!',
    greatJob: lang === 'RU' ? 'Отличная работа! Ты прошёл всю тему.' : "Great job! You finished the whole topic.",
    allLessons: lang === 'RU' ? 'Все уроки' : 'All lessons',
    current: lang === 'RU' ? 'Текущий' : 'Current',
    reset: lang === 'RU' ? 'Сбросить' : 'Reset',
    taskLabel: lang === 'RU' ? 'Задание' : 'Task',
    livePreview: lang === 'RU' ? 'Живой превью (обновляется пока печатаешь)' : 'Live Preview (updates as you type)',
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-5 md:px-6 relative">
      <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#e6c272]/10 dark:bg-[#e6c272]/20 rounded-full blur-[120px] pointer-events-none`} />

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <button onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/10 text-stone-600 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/20 transition-all text-sm font-medium">
              <ArrowLeft className="w-4 h-4" />
              {t.backToRoadmap}
            </button>
            <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-${colorClass}-500/10 ${colorText[colorClass]}`}>
              {skill.title}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-stone-900 dark:text-white mb-2">
            {currentLesson.title}
          </h1>
          <p className="text-stone-600 dark:text-white/60">{skill.description}</p>
        </div>

        {/* BIG PROGRESS BAR with reset button */}
        <div className={`${glassCard} p-5 mb-6`}>
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorGradient[colorClass]} flex items-center justify-center shadow-lg`}>
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-black text-stone-900 dark:text-white">
                  {completedLessons.length} {t.lessonsCompleted} {totalLessons}
                </p>
                <p className="text-xs text-stone-500 dark:text-white/50">{t.lessonsLabel}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {completedLessons.length > 0 && (
                <button onClick={handleResetProgress}
                  className="flex items-center gap-1 text-xs text-stone-400 hover:text-red-500 transition-colors font-bold">
                  <X className="w-3 h-3" /> {t.reset}
                </button>
              )}
              <span className={`text-3xl font-black ${colorText[colorClass]}`}>{progress}%</span>
            </div>
          </div>
          <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-3 overflow-hidden">
            <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease: "easeOut" }}
              className={`h-full rounded-full bg-gradient-to-r ${colorGradient[colorClass]} shadow-[0_0_20px_rgba(230,194,114,0.4)]`} />
          </div>
        </div>

        {/* COMPACT LESSON GRID NAVIGATOR */}
        <LessonNavigator
          lessons={skill.lessons}
          currentIndex={currentLessonIndex}
          completedLessons={completedLessons}
          onSelect={setCurrentLessonIndex}
          colorClass={colorClass}
        />

        {/* LESSON CONTENT */}
        <AnimatePresence mode="wait">
          <LessonView key={currentLesson.id} lesson={currentLesson} lessonIndex={currentLessonIndex}
            colorClass={colorClass} completedLessons={completedLessons}
            onCompleteLesson={handleCompleteLesson} t={t} lang={lang} />
        </AnimatePresence>

        {/* PREV / NEXT */}
        <div className="flex items-center justify-between mt-8 gap-3 flex-wrap">
          <button onClick={() => setCurrentLessonIndex(currentLessonIndex - 1)} disabled={currentLessonIndex === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black/5 dark:bg-white/10 text-stone-600 dark:text-white/60 font-medium text-sm disabled:opacity-30 hover:bg-black/10 dark:hover:bg-white/20 transition-all">
            <ArrowLeft className="w-4 h-4" />
            {t.previousLesson}
          </button>
          <span className="text-sm text-stone-500 dark:text-white/40 font-bold">
            {currentLessonIndex + 1} / {totalLessons}
          </span>
          <button onClick={() => setCurrentLessonIndex(currentLessonIndex + 1)} disabled={currentLessonIndex === totalLessons - 1}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${colorGradient[colorClass]} text-white font-bold text-sm disabled:opacity-30 hover:opacity-90 transition-all`}>
            {t.nextLesson}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {completedLessons.length === totalLessons && totalLessons > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className={`mt-8 ${glassCard} p-6 md:p-8 text-center`}>
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-black text-stone-900 dark:text-white mb-2">{t.allLessonsComplete}</h3>
            <p className="text-stone-600 dark:text-white/60">{t.greatJob}</p>
            <button onClick={onBack}
              className={`mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${colorGradient[colorClass]} text-white font-bold`}>
              <ArrowLeft className="w-4 h-4" />
              {t.backToRoadmap}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
