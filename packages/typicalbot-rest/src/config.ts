import { config } from "https://deno.land/x/dotenv/mod.ts";

config({
  path: Deno.realPathSync("./packages/typicalbot-rest/.env"),
  export: true,
});

export const DISCORD_TOKEN = Deno.env.get("DISCORD_TOKEN");
export const DISCORD_ID = Deno.env.get("DISCORD_ID");
export const EVENT_HANDLER_PORT = Deno.env.get("EVENT_HANDLER_PORT");
export const EVENT_HANDLER_SECRET_KEY = Deno.env.get(
  "EVENT_HANDLER_SECRET_KEY",
);
export const INTERNAL_API = Deno.env.get("INTERNAL_API");
