import "https://deno.land/x/dotenv/load.ts";

export const DISCORD_TOKEN = Deno.env.get("DISCORD_TOKEN");
export const EVENT_HANDLER_URL = Deno.env.get("EVENT_HANDLER_URL");
export const EVENT_HANDLER_SECRET_KEY = Deno.env.get(
  "EVENT_HANDLER_SECRET_KEY",
);
