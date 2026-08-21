export default () => ({
  app: {
    name: process.env.APP_NAME ?? 'flash-card-api',
    port: Number(process.env.PORT ?? 3000),
    environment: process.env.NODE_ENV ?? 'development',
  },

  database: {
    mongodbUri: process.env.MONGODB_URI,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN ?? '15m',
  },

  redis: {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: Number(process.env.REDIS_PORT ?? 6379),
    password: process.env.REDIS_PASSWORD || undefined,
    db: Number(process.env.REDIS_DB ?? 0),
  },
});
