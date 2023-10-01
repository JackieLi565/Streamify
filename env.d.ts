declare namespace NodeJS {
  interface ProcessEnv {
    LOCAL_PORT: number;
    REDIS: string;
    OPENAI_API_KEY: string;
    YOUTUBE_API_KEY: string;
  }
}
