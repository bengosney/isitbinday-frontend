const dev = {
  service_worker: false,
  build: 'dev',
  //api_origin: 'http://10.0.0.32:8000',
};

const prod = {
  service_worker: true,
  build: '%%date%%',
};

const defaults = { ...prod };

const config = { dev: { ...dev }, prod: { ...prod }, defaults: { ...defaults } };

export const env = process.env.REACT_APP_STAGE || 'prod';

export const getConfig = (key, defaultValue) => {
  return config[env][key] || defaultValue;
};

export default config;