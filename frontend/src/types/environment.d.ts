declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      NEXT_PUBLIC_RESOURCE_URL: string;
      NEXT_PUBLIC_CRM_RESOURCE_URL: string;
      NEXT_PUBLIC_GATEWAY_URL: string;
      NEXT_PUBLIC_VIHUB_API_URL: string;
      NEXT_PUBLIC_CRM_API_URL: string;
      NEXT_PUBLIC_OAUTH_URL: string;
    }
  }
}

export {};
