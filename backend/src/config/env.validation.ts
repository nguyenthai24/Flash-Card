import Joi from 'joi';

export const envValidationSchema = Joi.object({
  APP_NAME: Joi.string().default('flash-card-api'),

  PORT: Joi.number().port().default(3000),

  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),

  MONGODB_URI: Joi.string().uri().required(),

  JWT_SECRET: Joi.string().min(32).required(),

  JWT_EXPIRES_IN: Joi.string().default('15m'),

  REDIS_HOST: Joi.string().required(),

  REDIS_PORT: Joi.number().port().default(6379),

  REDIS_PASSWORD: Joi.string().allow('').optional(),

  REDIS_DB: Joi.number().integer().min(0).default(0),
});
