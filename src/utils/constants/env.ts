import 'dotenv/config';
/**
 * This function parse env variables to a string.
 * If env variable is undefined it assigns default value if its provided.
 * With this function in your code, you don't need to check if such an environment variable exists
 *
 * @param {string} key Environmental variable from .env
 * @param {?string} [defaultVal] Default value if no environmental variable
 * @returns {string}
 */
export const getEnv = (key: string, defaultVal?: string): string => {
  const value = process.env[key] || defaultVal;
  if (value === undefined) {
    throw new Error(`MIssing enviroment variable in .env file - ${key}`);
  }
  return value;
};
export const NODE_ENV = getEnv('NODE_ENV', 'dev');
export const PORT = getEnv('PORT', '4000');

export const APP_VERSION = getEnv('APP_VERSION', 'v1.1.1');
export const APP_ORIGIN = getEnv('APP_ORIGIN', 'http://localhost');
export const DATABASE_URL = getEnv('DATABASE_URL');

export const REDIS_ON = getEnv('REDIS_ON', 'false');
export const REDIS_HOST = getEnv('REDIS_HOST', 'redis-18265.c278.us-east-1-4.ec2.redns.redis-cloud.com');
export const REDIS_PORT = getEnv('REDIS_PORT', '18265');
export const REDIS_PASS = getEnv('REDIS_PASS', '');
