interface StageConfig {
  build: string;
  api_origin?: string;
}

const dev: StageConfig = {
  build: 'dev',
  //api_origin: 'http://10.0.0.32:8000',
};

const prod: StageConfig = {
  build: '%%date%%',
};

const defaults: StageConfig = { ...prod };

const config: Record<string, StageConfig> = { dev: { ...dev }, prod: { ...prod }, defaults: { ...defaults } };

export const env: string = import.meta.env.VITE_STAGE || (import.meta.env.DEV ? 'dev' : 'prod');

export const getConfig = <K extends keyof StageConfig>(
  key: K,
  defaultValue?: StageConfig[K]
): StageConfig[K] | undefined => {
  return config[env][key] || defaultValue;
};

export default config;
