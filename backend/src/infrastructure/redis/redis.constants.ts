export const REDIS_CLIENT = Symbol('REDIS_CLIENT');
const PREFIX = 'flashcard';

export const FIVE_MINUTE = 5 * 60;
export const TEN_MINUTE = 10 * 60;
export const FIFTEEN_MINUTE = 15 * 60;

export const REDIS_KEY = {
  VERIFICATION: (key: string) => `${PREFIX}:auth:verification:${key}`,
};
