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
import * as mathLessons from './lessons/math.ts';
import * as sqlState from './lessons/sql_lessons.ts';
import * as edaState from './lessons/eda_lessons.ts';
import * as statisticsState from './lessons/statistics_lessons.ts';
import * as mlState from './lessons/ml_lessons.ts';
import * as biState from './lessons/bi_lessons.ts';
import * as bigDataState from './lessons/big_data_lessons.ts';
import * as nodejsState from './lessons/nodejs_express_lessons.ts';   
import * as databasesState from './lessons/databases_lessons.ts';
import * as authSecurityState from './lessons/auth_security_lessons.ts';
import * as apiDesignState from './lessons/api_design_lessons.ts';
import * as dockerState from './lessons/docker_lessons.ts';
import * as cloudState from './lessons/cloud_lessons.ts';
import * as reactNativeState from './lessons/react_native_lessons.ts';
import * as mobileUiUxState from './lessons/mobile_ui_ux_lessons.ts';
import * as nativeApiState from './lessons/native_api_lessons.ts';
import * as rnStateStorageState from './lessons/rn_state_storage_lessons.ts';
import * as appPublishingState from './lessons/app_publishing_lessons.ts';
import * as rnPerformanceState from './lessons/rn_performance_lessons.ts';
import * as devopsLinuxState from './lessons/devops_linux_lessons.ts';
import * as gitCicdState from './lessons/git_cicd_lessons.ts';
import * as kubernetesState from './lessons/kubernetes_lessons.ts';
import * as terraformIacState from './lessons/terraform_iac_lessons.ts';
import * as monitoringLogsState from './lessons/monitoring_logs_lessons.ts';
import * as awsCloudProState from './lessons/game_multiplayer_lessons.ts';
import * as unityCSharpState from './lessons/unity_csharp_lessons.ts';
import * as gameMathState from './lessons/game_math_lessons.ts';
import * as game2dState from './lessons/game_2d_lessons.ts';
import * as game3dState from './lessons/game_3d_lessons.ts';
import * as shadersGraphicsState from './lessons/shaders_graphics_lessons.ts';
import * as gameMultiplayerState from './lessons/game_multiplayer_lessons.ts';

import * as pythonMlState from './lessons/python_ml_lessons.ts';
import * as mathMlState from './lessons/math_ml_lessons.ts';
import * as scikitLearnState from './lessons/scikit_learn_lessons.ts';
import * as deepLearningState from './lessons/deep_learning_lessons.ts';
import * as nlpLlmsState from './lessons/nlp_llms_lessons.ts';
import * as mlopsState from './lessons/mlops_lessons.ts';
import * as cybersecNetworkState from './lessons/cybersec_network_lessons.ts';
import * as linuxCybersecState from './lessons/linux_cybersec_lessons.ts';
import * as pentestCoreState from './lessons/pentest_core_lessons.ts';
import * as webSecurityState from './lessons/web_security_lessons.ts';
import * as siemSocState from './lessons/siem_soc_lessons.ts';
import * as cybersecCertsState from './lessons/cybersec_certs_lessons.ts';



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
  'deploy': pick(deployLessons),
  'math': pick(mathLessons),
  'sql': pick(sqlState),
  'eda': pick(edaState),
  'stats': pick(statisticsState),
  'ml-ds': pick(mlState),
  'bi': pick(biState),
  'bigdata': pick(bigDataState),
  'node': pick(nodejsState),
  'db-basics': pick(databasesState),
  'auth': pick(authSecurityState),
  'apis': pick(apiDesignState),
  'docker': pick(dockerState),
  'cloud':pick(cloudState),
  'rn-basics': pick(reactNativeState),
  'mobile-ui': pick(mobileUiUxState),
  'native-api': pick(nativeApiState),
  'state-mobile': pick(rnStateStorageState),
  'appstore':pick(appPublishingState),
  'perf-mobile':pick(rnPerformanceState),
  'linux-devops':pick(devopsLinuxState),
  'git-devops':pick(gitCicdState),
  'k8s':pick(kubernetesState),
  'terraform':pick(terraformIacState),
  'monitoring':pick(monitoringLogsState),
  'aws-devops':pick(awsCloudProState),
  'csharp':pick(unityCSharpState),
  'game-math':pick(gameMathState),
  '2d-games':pick(game2dState),
  '3d-games':pick(game3dState),
  'shaders':pick(shadersGraphicsState),
  'multiplayer':pick(gameMultiplayerState),

  'python':pick(pythonMlState),
  'math-ml':pick(mathMlState),
  'sklearn':pick(scikitLearnState),
  'dl':pick(deepLearningState),
  'nlp':pick(nlpLlmsState),
  'mlops':pick(mlopsState),
  'networking':pick(cybersecNetworkState),
  'linux':pick(linuxCybersecState),
  'pentest':pick(pentestCoreState),
  'webapp':pick(webSecurityState),
  'siem':pick(siemSocState),
  'certs':pick(cybersecCertsState)


};