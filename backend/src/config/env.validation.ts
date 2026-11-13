import Joi from 'joi';

export const envValidationSchema = Joi.object({
  APP_NAME: Joi.string().default('flash-card-api'),

  PORT: Joi.number().port().default(3000),

  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),

  MONGODB_URI: Joi.string().uri().required(),

  JWT_SECRET: Joi.string().min(32).required(),

  JWT_REFRESH_SECRET: Joi.string().min(32).required(),

  JWT_EXPIRES_IN: Joi.string()
    .pattern(/^\d+(s|m|h|d)$/)
    .default('15m'),

  FRONTEND_URL: Joi.string().uri().default('http://localhost:3010'),

  API_URL: Joi.string().uri().default('http://localhost:3000/api'),

  COOKIE_DOMAIN: Joi.string().allow('').optional(),

  REDIS_HOST: Joi.string().default('localhost'),

  REDIS_PORT: Joi.number().port().default(6379),

  REDIS_PASSWORD: Joi.string().allow('').optional(),

  REDIS_DB: Joi.number().integer().min(0).default(0),

  RESEND_API_KEY: Joi.string().allow('').optional(),
  RESEND_FROM: Joi.string().allow('').optional(),

  GOOGLE_CLIENT_ID: Joi.string().allow('').optional(),
  GOOGLE_CLIENT_SECRET: Joi.string().allow('').optional(),
  GOOGLE_CALLBACK_URL: Joi.string().uri().optional(),
  FACEBOOK_CLIENT_ID: Joi.string().allow('').optional(),
  FACEBOOK_CLIENT_SECRET: Joi.string().allow('').optional(),
  FACEBOOK_CALLBACK_URL: Joi.string().uri().optional(),
  GITHUB_CLIENT_ID: Joi.string().allow('').optional(),
  GITHUB_CLIENT_SECRET: Joi.string().allow('').optional(),
  GITHUB_CALLBACK_URL: Joi.string().uri().optional(),
});
