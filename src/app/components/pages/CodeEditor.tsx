import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, RotateCcw, CheckCircle2, XCircle, Copy, Check } from 'lucide-react';

const glassCard = "bg-white/80 dark:bg-[#0d0e12]/80 backdrop-blur-2xl border border-stone-200/80 dark:border-white/[0.07] rounded-[1.5rem] shadow-[0_8px_32px_rgba(124,94,32,0.10)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]";

// Простая подсветка синтаксиса для HTML/CSS/JS
const highlightSyntax = (code: string, language: string): string => {
  if (!code) return '';
  let highlighted = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  if (language === 'javascript' || language === 'typescript') {
    highlighted = highlighted
      .replace(/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|default|new|this|async|await|try|catch|throw|switch|case|break|continue|typeof|instanceof)\b/g, '<span class="text-purple-400 font-semibold">$1</span>')
      .replace(/\b(true|false|null|undefined|NaN|Infinity)\b/g, '<span class="text-orange-400 font-semibold">$1</span>')
      .replace(/\b(console|document|window|Math|JSON|Array|Object|String|Number|Promise|Map|Set)\b/g, '<span class="text-cyan-400 font-semibold">$1</span>')
      .replace(/\b(\d+\.?\d*)\b/g, '<span class="text-green-400">$1</span>')
      .replace(/(["'`])(?:(?!\1|\\).|\\.)*?\1/g, '<span class="text-green-300">$&</span>')
      .replace(/(\/\/.*$)/gm, '<span class="text-gray-500 italic">$1</span>')
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-gray-500 italic">$1</span>')
      .replace(/\b([a-zA-Z_$][\w$]*)\s*(?=\()/g, '<span class="text-yellow-300">$1</span>');
  } else if (language === 'html') {
    highlighted = highlighted
      .replace(/(&lt;\/?)([\w-]+)/g, '$1<span class="text-cyan-400 font-semibold">$2</span>')
      .replace(/\s([\w-]+)=/g, ' <span class="text-purple-400">$1</span>=')
      .replace(/="([^"]*)"/g, '="<span class="text-green-300">$1</span>"')
      .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="text-gray-500 italic">$1</span>');
  } else if (language === 'css') {
    highlighted = highlighted
      .replace(/([\w-]+)\s*:/g, '<span class="text-cyan-400">$1</span>:')
      .replace(/:\s*([^;]+);/g, ': <span class="text-green-300">$1</span>;')
      .replace(/(\.[\w-]+)/g, '<span class="text-yellow-300">$1</span>')
      .replace(/(#[\w-]+)/g, '<span class="text-orange-400">$1</span>')
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-gray-500 italic">$1</span>');
  }

  return highlighted;
};

interface CodeChallenge {
  id: string;
  title: string;
  description: string;
  initialCode: string;
  solution: string;
  hint: string;
  language: string;
}

interface CodeEditorProps {
  challenges: CodeChallenge[];
  language: string;
  onComplete: (challengeId: string) => void;
  completedChallenges: Set<string>;
  t: any;
}

export const CodeEditor = ({ challenges, language, onComplete, completedChallenges, t }: CodeEditorProps) => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [code, setCode] = useState(challenges[0]?.initialCode || '');
  const [output, setOutput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [testPassed, setTestPassed] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCode(challenges[currentChallenge]?.initialCode || '');
    setOutput('');
    setShowHint(false);
    setShowSolution(false);
    setTestPassed(null);
  }, [currentChallenge, challenges]);

  const syncScroll = () => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const handleTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');
    setTestPassed(null);

    const challenge = challenges[currentChallenge];
    const normalizedCode = code.replace(/\s+/g, ' ').trim();
    const normalizedSolution = challenge.solution.replace(/\s+/g, ' ').trim();

    await new Promise(resolve => setTimeout(resolve, 800));

    let logs: string[] = [];
    const mockConsole = {
      log: (...args: any[]) => { logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')); },
      error: (...args: any[]) => { logs.push('❌ ' + args.join(' ')); },
      warn: (...args: any[]) => { logs.push('⚠️ ' + args.join(' ')); }
    };

    try {
      const func = new Function('console', code);
      func(mockConsole);

      if (logs.length > 0) {
        const passed = logs.some(log => 
          normalizedSolution.toLowerCase().includes(normalizedCode.toLowerCase()) ||
          log.includes('correct') || log.includes('true') || log.includes('Success')
        );

        const isSimilar = normalizedCode === normalizedSolution || 
          normalizedSolution.includes(normalizedCode) ||
          normalizedCode.includes(normalizedSolution.split('\n')[0]);

        setTestPassed(passed || isSimilar);
        if (passed || isSimilar) {
          setOutput(logs.join('\n'));
          onComplete(challenge.id);
        } else {
          setOutput(logs.join('\n') + '\n\n⚠️ Проверьте ваш код. Убедитесь, что вывод соответствует ожидаемому.');
        }
      } else {
        setOutput('✅ Код выполнен успешно (нет вывода в консоль)');
        setTestPassed(true);
        onComplete(challenge.id);
      }
    } catch (err: any) {
      setOutput('❌ Ошибка: ' + (err.message || 'Неизвестная ошибка'));
      setTestPassed(false);
    }

    setIsRunning(false);
  };

  const resetCode = () => {
    setCode(challenges[currentChallenge]?.initialCode || '');
    setOutput('');
    setTestPassed(null);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code');
    }
  };

  const challenge = challenges[currentChallenge];
  if (!challenge) return null;

  const highlightedCode = highlightSyntax(code, challenge.language || language);

  return (
    <div className={`${glassCard} p-6`}>
      {/* Challenge Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-stone-500 dark:text-white/50 uppercase tracking-wider">
              {t?.learning?.challenge || 'Задание'} {currentChallenge + 1}/{challenges.length}
            </span>
            {testPassed === true && (
              <span className="flex items-center gap-1 text-xs font-bold text-green-500">
                <CheckCircle2 className="w-4 h-4" /> {t?.learning?.passed || 'Пройдено'}
              </span>
            )}
            {testPassed === false && (
              <span className="flex items-center gap-1 text-xs font-bold text-red-500">
                <XCircle className="w-4 h-4" /> {t?.learning?.failed || 'Не пройдено'}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            {completedChallenges.size > 0 && (
              <span className="text-xs font-bold text-[#8AA8FF] dark:text-[#8AA8FF]">
                {completedChallenges.size}/{challenges.length} ✅
              </span>
            )}
          </div>
        </div>
        <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2">{challenge.title}</h3>
        <p className="text-sm text-stone-600 dark:text-white/60">{challenge.description}</p>
      </div>

      {/* Code Editor */}
      <div className="relative mb-4">
        {/* Editor Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 bg-black/5 dark:bg-white/5 rounded-t-xl border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs text-stone-500 dark:text-white/50 ml-2 font-mono">
              {challenge.language || language}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={copyCode}
              className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-stone-500 dark:text-white/50"
              title="Copy code"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={resetCode}
              className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-stone-500 dark:text-white/50"
              title="Reset code"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Editor Area with Syntax Highlighting */}
        <div className="relative bg-stone-900 dark:bg-[#0d1117] rounded-b-xl overflow-hidden min-h-[200px]">
          {/* Highlighted code (background layer) */}
          <div
            ref={highlightRef}
            className="absolute inset-0 p-4 font-mono text-sm text-transparent pointer-events-none whitespace-pre overflow-auto"
            style={{ lineHeight: '1.6' }}
          >
            <span dangerouslySetInnerHTML={{ __html: highlightedCode }} />
          </div>
          
          {/* Actual editable textarea */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleTab}
            onScroll={syncScroll}
            className="w-full h-full min-h-[200px] p-4 font-mono text-sm bg-transparent text-stone-100 caret-cyan-400 resize-none focus:outline-none relative z-10"
            style={{ lineHeight: '1.6' }}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={runCode}
          disabled={isRunning || !code.trim()}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8AA8FF] via-[#002A54] to-[#FF9800] text-white font-bold text-sm shadow-[0_0_15px_rgba(138,168,255,0.3)] hover:shadow-[0_0_25px_rgba(138,168,255,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="w-4 h-4" />
          {isRunning ? (t?.learning?.running || 'Запуск...') : (t?.learning?.runCode || 'Запустить код')}
        </motion.button>

        <button
          onClick={() => setShowHint(!showHint)}
          className="px-4 py-2.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-400 font-bold text-sm hover:bg-yellow-500/20 transition-all"
        >
          💡 {showHint ? (t?.learning?.hideHint || 'Скрыть подсказку') : (t?.learning?.showHint || 'Подсказка')}
        </button>

        <button
          onClick={() => setShowSolution(!showSolution)}
          className="px-4 py-2.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 font-bold text-sm hover:bg-red-500/20 transition-all"
        >
          👁️ {showSolution ? (t?.learning?.hideSolution || 'Скрыть решение') : (t?.learning?.showSolution || 'Решение')}
        </button>
      </div>

      {/* Hint */}
      {showHint && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-4 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20"
        >
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            💡 <strong>{t?.learning?.hint || 'Подсказка'}:</strong> {challenge.hint}
          </p>
        </motion.div>
      )}

      {/* Solution */}
      {showSolution && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20"
        >
          <p className="text-sm text-red-700 dark:text-red-300 mb-2">
            👁️ <strong>{t?.learning?.solution || 'Решение'}:</strong>
          </p>
          <pre className="text-xs bg-black/20 dark:bg-white/5 p-3 rounded-lg font-mono text-stone-300 dark:text-white/80 overflow-x-auto">
            {challenge.solution}
          </pre>
        </motion.div>
      )}

      {/* Output */}
      {output && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl border ${
            testPassed === true 
              ? 'bg-green-500/10 border-green-500/20' 
              : testPassed === false 
                ? 'bg-red-500/10 border-red-500/20' 
                : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-stone-500 dark:text-white/50 uppercase tracking-wider">
              {t?.learning?.output || 'Вывод'}
            </span>
          </div>
          <pre className={`text-sm font-mono whitespace-pre-wrap ${
            testPassed === true 
              ? 'text-green-700 dark:text-green-300' 
              : testPassed === false 
                ? 'text-red-700 dark:text-red-300' 
                : 'text-stone-700 dark:text-white/70'
          }`}>
            {output}
          </pre>
        </motion.div>
      )}

      {/* Challenge Navigation */}
      {challenges.length > 1 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-black/5 dark:border-white/10">
          <button
            onClick={() => setCurrentChallenge(Math.max(0, currentChallenge - 1))}
            disabled={currentChallenge === 0}
            className="px-4 py-2 rounded-lg text-sm font-bold text-stone-600 dark:text-white/60 hover:text-stone-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← {t?.learning?.previous || 'Предыдущее'}
          </button>

          {/* Challenge dots */}
          <div className="flex gap-2">
            {challenges.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentChallenge(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentChallenge 
                    ? 'bg-[#8AA8FF] scale-125' 
                    : completedChallenges.has(challenges[i].id)
                      ? 'bg-green-500'
                      : 'bg-stone-300 dark:bg-white/20'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentChallenge(Math.min(challenges.length - 1, currentChallenge + 1))}
            disabled={currentChallenge === challenges.length - 1}
            className="px-4 py-2 rounded-lg text-sm font-bold text-stone-600 dark:text-white/60 hover:text-stone-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            {t?.learning?.next || 'Следующее'} →
          </button>
        </div>
      )}
    </div>
  );
};
