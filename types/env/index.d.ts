declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      JWT_SECRET: string;
      MONGO_DB: string;
    }
  }
}

export {};