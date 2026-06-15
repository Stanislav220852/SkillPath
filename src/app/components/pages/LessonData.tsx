const pick = (mod: any) => {
  if (mod?.default) return mod.default;
  for (const key of Object.keys(mod)) {
    const v = mod[key];
    if (v && (v.EN || v.RU)) return v;
  }
  return mod[Object.keys(mod)[0]];
};

const lessonLoaders: Record<string, () => Promise<any>> = {
  'html-css':  () => import('./lessons/html-css.ts'),
  'js-core':   () => import('./lessons/js-core.ts'),
  'react':     () => import('./lessons/react.ts'),
  'typescript':() => import('./lessons/typescript.ts'),
  'state':     () => import('./lessons/state.ts'),
  'testing':   () => import('./lessons/testing.ts'),
  'deploy':    () => import('./lessons/deploy.ts'),
  'math':      () => import('./lessons/math.ts'),
  'sql':       () => import('./lessons/sql_lessons.ts'),
  'eda':       () => import('./lessons/eda_lessons.ts'),
  'stats':     () => import('./lessons/statistics_lessons.ts'),
  'ml-ds':     () => import('./lessons/ml_lessons.ts'),
  'bi':        () => import('./lessons/bi_lessons.ts'),
  'bigdata':   () => import('./lessons/big_data_lessons.ts'),
  'node':      () => import('./lessons/nodejs_express_lessons.ts'),
  'db-basics': () => import('./lessons/databases_lessons.ts'),
  'auth':      () => import('./lessons/auth_security_lessons.ts'),
  'apis':      () => import('./lessons/api_design_lessons.ts'),
  'docker':    () => import('./lessons/docker_lessons.ts'),
  'cloud':     () => import('./lessons/cloud_lessons.ts'),
  'rn-basics': () => import('./lessons/react_native_lessons.ts'),
  'mobile-ui': () => import('./lessons/mobile_ui_ux_lessons.ts'),
  'native-api':() => import('./lessons/native_api_lessons.ts'),
  'state-mobile':() => import('./lessons/rn_state_storage_lessons.ts'),
  'appstore':  () => import('./lessons/app_publishing_lessons.ts'),
  'perf-mobile':() => import('./lessons/rn_performance_lessons.ts'),
  'linux-devops':() => import('./lessons/devops_linux_lessons.ts'),
  'git-devops':() => import('./lessons/git_cicd_lessons.ts'),
  'k8s':       () => import('./lessons/kubernetes_lessons.ts'),
  'terraform': () => import('./lessons/terraform_iac_lessons.ts'),
  'monitoring':() => import('./lessons/monitoring_logs_lessons.ts'),
  'aws-devops':() => import('./lessons/game_multiplayer_lessons.ts'),
  'csharp':    () => import('./lessons/unity_csharp_lessons.ts'),
  'game-math': () => import('./lessons/game_math_lessons.ts'),
  '2d-games':  () => import('./lessons/game_2d_lessons.ts'),
  '3d-games':  () => import('./lessons/game_3d_lessons.ts'),
  'shaders':   () => import('./lessons/shaders_graphics_lessons.ts'),
  'multiplayer':() => import('./lessons/game_multiplayer_lessons.ts'),
  'python':    () => import('./lessons/python_ml_lessons.ts'),
  'math-ml':   () => import('./lessons/math_ml_lessons.ts'),
  'sklearn':   () => import('./lessons/scikit_learn_lessons.ts'),
  'dl':        () => import('./lessons/deep_learning_lessons.ts'),
  'nlp':       () => import('./lessons/nlp_llms_lessons.ts'),
  'mlops':     () => import('./lessons/mlops_lessons.ts'),
  'networking':() => import('./lessons/cybersec_network_lessons.ts'),
  'linux':     () => import('./lessons/linux_cybersec_lessons.ts'),
  'pentest':   () => import('./lessons/pentest_core_lessons.ts'),
  'webapp':    () => import('./lessons/web_security_lessons.ts'),
  'siem':      () => import('./lessons/siem_soc_lessons.ts'),
  'certs':     () => import('./lessons/cybersec_certs_lessons.ts'),
};

export const loadLesson = async (skillId: string, lang: 'EN' | 'RU') => {
  const loader = lessonLoaders[skillId];
  if (!loader) return null;
  const mod = await loader();
  const course = pick(mod);
  return course?.[lang] ?? course?.['EN'] ?? null;
};

export const getAvailableSkillIds = () => Object.keys(lessonLoaders);
