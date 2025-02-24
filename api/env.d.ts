declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENV: string;
      PORT: number;
      MONGODB_URL: string;
      FRONT_URL: string;
      JWT_ACCESS_TOKEN_SECRET: string;
      JWT_REFRESH_TOKEN_SECRET: string;
      MJ_APIKEY_PUBLIC: string;
      MJ_APIKEY_PRIVATE: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      AWS_REGION: string;
      AWS_S3_ENDPOINT: string;
      AWS_SQS_ENDPOINT: string;
      S3_BUCKET: string;
      BRIDGE_CLIENT_ID: string;
      BRIDGE_CLIENT_SECRET: string;
      BRIDGE_WEBHOOK_SECRET: string;
      OPENAI_API_KEY: string;
      MISTRAL_API_KEY: string;
      XAI_API_KEY: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
