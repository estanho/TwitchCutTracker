declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_KEY: string;
      TWITCH_CODE_TOKEN: string;
      TWITCH_APP_CLIENT_ID: string;
      TWITCH_APP_CLIENT_SECRET: string;
    }
  }
}

export {};
