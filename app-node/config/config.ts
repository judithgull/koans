import * as development from './env/development';
import * as test from './env/test';
import * as production from './env/production';

export const config = {
  development: development,
  test: test,
  production: production
}[process.env.NODE_ENV || 'development'];
