// ============================================================================
//  LessonData.tsx — СБОРКА всех уроков в один объект lessonData
//
//  КАК ДОБАВИТЬ НОВЫЙ НАВЫК:
//   1. Создай файл навыка в папке ./lessons/ (скопируй js-core.ts как образец).
//   2. Импортируй его модуль через `import * as` ниже.
//   3. Добавь строку в объект lessonData: ключ = skillId из роадмапа.
//
//  Используем `import * as` + pick(), поэтому НЕ важно, как именно называется
//  экспорт внутри файла (htmlCss, htmlCssLessons, default — всё подхватится).
//
//  skillId должен совпадать с id навыка в роадмапе (см. translations в App.tsx):
//  html-css, js-core, react, typescript, python, sql, ...
// ============================================================================

import * as htmlCssMod from './lessons/html-css.ts';
import * as jsCoreMod from './lessons/js-core.ts';
import * as reactMod from './lessons/react.ts';
import * as typescriptMod from './lessons/typescript.ts';
import * as stateLessons from './lessons/state.ts';
import * as testingLessons from './lessons/testing.ts';
import * as deployLessons from './lessons/deploy.ts';

// Берёт курс из модуля независимо от имени экспорта (default или любой named).
const pick = (mod: any) => {
  if (mod?.default) return mod.default;
  // первый экспорт, у которого есть EN/RU (это курс навыка)
  for (const key of Object.keys(mod)) {
    const v = mod[key];
    if (v && (v.EN || v.RU)) return v;
  }
  // запасной вариант — первый экспорт
  return mod[Object.keys(mod)[0]];
};

export const lessonData: Record<string, Record<'EN' | 'RU', any>> = {
  'html-css': pick(htmlCssMod),
  'js-core': pick(jsCoreMod),
  'react': pick(reactMod),
  'typescript': pick(typescriptMod),
  'state': pick(stateLessons),
  'testing': pick(testingLessons),
  'deploy': pick(deployLessons)
};