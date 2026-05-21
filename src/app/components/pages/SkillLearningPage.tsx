import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Play, CheckCircle, BookOpen, Code, 
  ChevronRight, RotateCcw, Star, Trophy, Zap,
  Lightbulb, Eye
} from 'lucide-react';
import { lessonData } from './LessonData.tsx';

const glassCard = "bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]";

const colorText = {
  cyan: "text-cyan-500 dark:text-cyan-400",
  pink: "text-pink-500 dark:text-pink-400",
  purple: "text-purple-500 dark:text-purple-400",
  blue: "text-blue-500 dark:text-blue-400",
};

const colorGradient = {
  cyan: "from-cyan-500 to-blue-600",
  pink: "from-pink-500 to-purple-600",
  purple: "from-purple-500 to-pink-600",
  blue: "from-blue-500 to-cyan-600",
};

const CodeEditor = ({ initialCode, language, onRun, output, error, isRunning, t }) => {
  const [code, setCode] = useState(initialCode || '');
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);

  useEffect(() => {
    setCode(initialCode || '');
  }, [initialCode]);

  const handleScroll = useCallback(() => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }, []);

  const lineCount = code.split('\n').length;
  const lines = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div className={`rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-[#1e1e2e]`}>
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#181825] border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-white/50 ml-2 font-mono">
            {language === 'javascript' ? 'script.js' : language === 'python' ? 'main.py' : language === 'html' ? 'index.html' : 'styles.css'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/30 uppercase tracking-wider">{language}</span>
        </div>
      </div>

      <div className="flex relative">
        <div 
          ref={lineNumbersRef}
          className="w-10 py-4 text-right pr-2 text-xs font-mono text-white/20 select-none overflow-hidden bg-[#181825]/50"
        >
          {lines.map(n => (
            <div key={n} className="leading-5">{n}</div>
          ))}
        </div>

        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onScroll={handleScroll}
          className="flex-1 py-4 px-3 bg-transparent text-white/90 font-mono text-sm leading-5 resize-none outline-none min-h-[200px] max-h-[400px] overflow-auto"
          spellCheck={false}
          style={{ tabSize: 2 }}
          onKeyDown={(e) => {
            if (e.key === 'Tab') {
              e.preventDefault();
              const target = e.target;
              const start = target.selectionStart;
              const end = target.selectionEnd;
              setCode(code.substring(0, start) + '  ' + code.substring(end));
              setTimeout(() => {
                target.selectionStart = target.selectionEnd = start + 2;
              }, 0);
            }
          }}
        />
      </div>

      {(output || error) && (
        <div className={`border-t border-white/5 ${error ? 'bg-red-500/10' : 'bg-green-500/5'}`}>
          <div className="flex items-center gap-2 px-4 py-2 bg-black/20">
            {error ? (
              <span className="text-xs font-bold text-red-400">{t.error || 'Error'}</span>
            ) : (
              <span className="text-xs font-bold text-green-400">{t.output || 'Output'}</span>
            )}
          </div>
          <pre className={`px-4 py-3 text-sm font-mono whitespace-pre-wrap ${error ? 'text-red-400' : 'text-green-300'}`}>
            {error || output}
          </pre>
        </div>
      )}

      <div className="p-3 bg-[#181825] border-t border-white/5">
        <button
          onClick={() => onRun(code)}
          disabled={isRunning}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r ${colorGradient[language === 'javascript' ? 'cyan' : language === 'python' ? 'pink' : 'purple']} text-white font-bold text-sm hover:opacity-90 transition-all disabled:opacity-50`}
        >
          {isRunning ? (
            <RotateCcw className="w-4 h-4 animate-spin" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          {isRunning ? (t.running || 'Running...') : (t.runCode || 'Run Code')}
        </button>
      </div>
    </div>
  );
};

const PreviewFrame = ({ html, css, js, error }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <style>${css || ''}</style>
          <style>
            body { 
              font-family: system-ui, -apple-system, sans-serif; 
              padding: 16px; 
              background: #0f172a;
              color: #e2e8f0;
              margin: 0;
            }
          </style>
        </head>
        <body>
          ${html || ''}
          <script>
            try {
              ${js || ''}
            } catch(e) {
              document.body.innerHTML += '<div style="color:red;padding:8px;font-size:12px;font-family:monospace;margin-top:8px;border:1px solid red;border-radius:4px;">Error: ' + e.message + '</div>';
            }
          </script>
        </body>
        </html>
      `);
      doc.close();
    }
  }, [html, css, js]);

  return (
    <div className="rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-white dark:bg-[#1e1e2e]">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#181825] border-b border-white/5">
        <Eye className="w-4 h-4 text-white/50" />
        <span className="text-xs text-white/50 font-medium">Preview</span>
      </div>
      <iframe
        ref={iframeRef}
        className="w-full h-[300px] bg-white dark:bg-[#0f172a]"
        sandbox="allow-scripts"
        title="Code Preview"
      />
      {error && (
        <div className="p-3 bg-red-500/10 border-t border-red-500/20">
          <p className="text-xs text-red-400 font-mono">{error}</p>
        </div>
      )}
    </div>
  );
};

const LessonView = ({ lesson, lessonIndex, colorClass, completedLessons, onCompleteLesson, t }) => {
  const [activeTab, setActiveTab] = useState('theory');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const isCompleted = completedLessons.includes(lesson.id);

  const handleRunCode = (code) => {
    setIsRunning(true);
    setOutput('');
    setError('');

    setTimeout(() => {
      try {
        if (lesson.type === 'html-css-js') {
          setOutput(t.codeRanSuccessfully || 'Code executed successfully!');
          setError('');
        } else if (lesson.type === 'javascript') {
          const logs = [];
          const mockConsole = {
            log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ')),
            error: (...args) => logs.push('ERROR: ' + args.join(' ')),
            warn: (...args) => logs.push('WARN: ' + args.join(' ')),
          };
          const fn = new Function('console', code);
          fn(mockConsole);
          setOutput(logs.join('\n') || t.noOutput || 'No output');
          setError('');
        } else if (lesson.type === 'python') {
          if (lesson.expectedOutput) {
            setOutput(lesson.expectedOutput);
            setError('');
          } else {
            setOutput(t.simulatedOutput || '[Simulated Python output]');
            setError('');
          }
        }
      } catch (e) {
        setError(e.message);
        setOutput('');
      }
      setIsRunning(false);
    }, 500);
  };

  const tabs = [
    { id: 'theory', icon: BookOpen, label: t.theory || 'Theory' },
    { id: 'practice', icon: Code, label: t.practice || 'Practice' },
    ...(lesson.type === 'html-css-js' ? [{ id: 'preview', icon: Eye, label: t.preview || 'Preview' }] : []),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between mb-6">
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
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{lesson.title}</h2>
        </div>
        {!isCompleted && (
          <button
            onClick={() => onCompleteLesson(lesson.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${colorGradient[colorClass]} text-white text-sm font-bold hover:opacity-90 transition-all`}
          >
            <CheckCircle className="w-4 h-4" />
            {t.markComplete}
          </button>
        )}
      </div>

      <div className="flex gap-1 mb-6 p-1 bg-black/5 dark:bg-white/5 rounded-xl">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === tab.id 
                ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm' 
                : 'text-slate-500 dark:text-white/40 hover:text-slate-700 dark:hover:text-white/60'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'theory' && (
          <motion.div
            key="theory"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`${glassCard} p-6`}
          >
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {lesson.theory && lesson.theory.sections && lesson.theory.sections.map((section, i) => (
                <div key={i} className="mb-6 last:mb-0">
                  {section.type === 'heading' && (
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                      <Lightbulb className={`w-4 h-4 ${colorText[colorClass]}`} />
                      {section.content}
                    </h3>
                  )}
                  {section.type === 'text' && (
                    <p className="text-slate-600 dark:text-white/60 leading-relaxed">{section.content}</p>
                  )}
                  {section.type === 'code' && (
                    <div className="bg-[#1e1e2e] rounded-xl p-4 my-3 overflow-x-auto">
                      <pre className="text-sm font-mono text-green-300 whitespace-pre-wrap">{section.content}</pre>
                    </div>
                  )}
                  {section.type === 'tip' && (
                    <div className={`flex gap-3 p-4 rounded-xl bg-${colorClass}-500/5 border border-${colorClass}-500/20`}>
                      <Zap className={`w-5 h-5 flex-shrink-0 mt-0.5 ${colorText[colorClass]}`} />
                      <p className="text-sm text-slate-700 dark:text-white/70 leading-relaxed">{section.content}</p>
                    </div>
                  )}
                  {section.type === 'list' && (
                    <ul className="space-y-2 my-3">
                      {section.items && section.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-slate-600 dark:text-white/60">
                          <span className={`w-1.5 h-1.5 rounded-full bg-${colorClass}-500 flex-shrink-0 mt-2`} />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'practice' && (
          <motion.div
            key="practice"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`${glassCard} p-6`}
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Code className={`w-5 h-5 ${colorText[colorClass]}`} />
              {lesson.practice ? lesson.practice.title : (t.practice || 'Practice')}
            </h3>
            {lesson.practice && lesson.practice.description && (
              <p className="text-sm text-slate-600 dark:text-white/60 mb-4">{lesson.practice.description}</p>
            )}
            {lesson.practice && lesson.practice.task && (
              <div className="mb-4 p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10">
                <p className="text-sm font-medium text-slate-700 dark:text-white/70">{lesson.practice.task}</p>
              </div>
            )}
            <CodeEditor
              initialCode={lesson.practice ? lesson.practice.starterCode : ''}
              language={lesson.type === 'html-css-js' ? 'html' : lesson.type}
              onRun={handleRunCode}
              output={output}
              error={error}
              isRunning={isRunning}
              t={t}
            />
          </motion.div>
        )}

        {activeTab === 'preview' && lesson.type === 'html-css-js' && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <PreviewFrame
              html={lesson.practice ? lesson.practice.starterCode : ''}
              css=""
              js=""
              error={error}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const SkillLearningPage = ({ skillId, onBack, lang }) => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  
  const lessons = lessonData[skillId] && lessonData[skillId][lang] ? lessonData[skillId][lang] : null;

  if (!lessons) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 relative">
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className={`${glassCard} p-8 text-center`}>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              {lang === 'RU' ? 'Уроки ещё не доступны' : 'Lessons not available yet'}
            </h2>
            <p className="text-slate-600 dark:text-white/60 mb-6">
              {lang === 'RU' ? 'Уроки для этой темы скоро появятся.' : 'Lessons for this topic are coming soon.'}
            </p>
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-black/5 dark:bg-white/10 text-slate-700 dark:text-white font-bold hover:bg-black/10 dark:hover:bg-white/20 transition-all"
            >
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
  const colorClass = skillId === 'html-css' ? 'cyan' : skillId === 'js-core' ? 'pink' : 'purple';

  const handleCompleteLesson = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < totalLessons - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  const t = {
    lesson: lang === 'RU' ? 'Урок' : 'Lesson',
    completed: lang === 'RU' ? 'Пройдено' : 'Completed',
    markComplete: lang === 'RU' ? 'Отметить пройденным' : 'Mark Complete',
    theory: lang === 'RU' ? 'Теория' : 'Theory',
    practice: lang === 'RU' ? 'Практика' : 'Practice',
    preview: lang === 'RU' ? 'Превью' : 'Preview',
    lessonsCompleted: lang === 'RU' ? 'уроков пройдено' : 'lessons completed',
    previousLesson: lang === 'RU' ? 'Предыдущий' : 'Previous',
    nextLesson: lang === 'RU' ? 'Следующий' : 'Next',
    backToRoadmap: lang === 'RU' ? 'Назад к роадмапу' : 'Back to Roadmap',
    runCode: lang === 'RU' ? 'Запустить код' : 'Run Code',
    running: lang === 'RU' ? 'Запуск...' : 'Running...',
    output: lang === 'RU' ? 'Вывод' : 'Output',
    error: lang === 'RU' ? 'Ошибка' : 'Error',
    codeRanSuccessfully: lang === 'RU' ? 'Код выполнен успешно!' : 'Code executed successfully!',
    noOutput: lang === 'RU' ? 'Нет вывода' : 'No output',
    simulatedOutput: lang === 'RU' ? '[Симулированный вывод Python]' : '[Simulated Python output]',
    allLessonsComplete: lang === 'RU' ? 'Все уроки пройдены!' : 'All Lessons Complete!',
    greatJob: lang === 'RU' ? 'Отличная работа! Вы прошли все уроки по этой теме.' : 'Great job! You\'ve completed all lessons for this topic.',
    noLessonsAvailable: lang === 'RU' ? 'Уроки ещё не доступны' : 'No lessons available yet',
    lessonsComingSoon: lang === 'RU' ? 'Уроки для этой темы скоро появятся.' : 'Lessons for this topic are coming soon.',
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 relative">
      <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-${colorClass}-500/10 dark:bg-${colorClass}-500/20 rounded-full blur-[120px] pointer-events-none`} />

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/10 text-slate-600 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/20 transition-all text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.backToRoadmap}
            </button>
            <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-${colorClass}-500/10 ${colorText[colorClass]}`}>
              {skill.title}
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-2">
            {currentLesson.title}
          </h1>
          <p className="text-slate-600 dark:text-white/60">{skill.description}</p>
        </div>

        <div className={`${glassCard} p-4 mb-8`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Trophy className={`w-4 h-4 ${colorText[colorClass]}`} />
              <span className="text-sm font-bold text-slate-700 dark:text-white/70">
                {completedLessons.length}/{totalLessons} {t.lessonsCompleted}
              </span>
            </div>
            <span className={`text-sm font-black ${colorText[colorClass]}`}>{progress}%</span>
          </div>
          <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-2 overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`h-full rounded-full bg-gradient-to-r ${colorGradient[colorClass]}`}
            />
          </div>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {skill.lessons.map((lesson, i) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isCurrent = i === currentLessonIndex;
            return (
              <button
                key={lesson.id}
                onClick={() => setCurrentLessonIndex(i)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isCurrent
                    ? `bg-gradient-to-r ${colorGradient[colorClass]} text-white shadow-lg`
                    : isCompleted
                    ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20'
                    : 'bg-black/5 dark:bg-white/5 text-slate-600 dark:text-white/50 border border-black/5 dark:border-white/10 hover:border-black/10 dark:hover:border-white/20'
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

        <AnimatePresence mode="wait">
          <LessonView
            key={currentLesson.id}
            lesson={currentLesson}
            lessonIndex={currentLessonIndex}
            colorClass={colorClass}
            completedLessons={completedLessons}
            onCompleteLesson={handleCompleteLesson}
            t={t}
          />
        </AnimatePresence>

        <div className="flex items-center justify-between mt-8">
          <button
            onClick={handlePrevLesson}
            disabled={currentLessonIndex === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black/5 dark:bg-white/10 text-slate-600 dark:text-white/60 font-medium text-sm disabled:opacity-30 hover:bg-black/10 dark:hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.previousLesson}
          </button>

          <span className="text-sm text-slate-500 dark:text-white/40 font-medium">
            {currentLessonIndex + 1} / {totalLessons}
          </span>

          <button
            onClick={handleNextLesson}
            disabled={currentLessonIndex === totalLessons - 1}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${colorGradient[colorClass]} text-white font-bold text-sm disabled:opacity-30 hover:opacity-90 transition-all`}
          >
            {t.nextLesson}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {completedLessons.length === totalLessons && totalLessons > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-8 ${glassCard} p-6 text-center`}
          >
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {t.allLessonsComplete}
            </h3>
            <p className="text-slate-600 dark:text-white/60 text-sm">
              {t.greatJob}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
