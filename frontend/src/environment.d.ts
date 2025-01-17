declare global {
    namespace NodeJS {
      interface ProcessEnv {
        BASE_URL: string;
      }
    }
  }
  
  // Augment the global scope variable
  declare var process: {
    env: {
      BASE_URL: string;
    }
  };
  