declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_API_URL: string;
      EXPO_PUBLIC_API_KEY: string;
      EXPO_PUBLIC_RORK_API_BASE_URL: string;
    }
  }
}

export {};