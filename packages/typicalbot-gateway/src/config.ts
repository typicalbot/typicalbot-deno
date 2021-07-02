import { config } from "https://deno.land/x/dotenv/mod.ts";

config({
  path: Deno.realPathSync("./packages/typicalbot-gateway/.env"),
  export: true,
});

export const DISCORD_TOKEN = Deno.env.get("DISCORD_TOKEN");
export const EVENT_HANDLER_URL = Deno.env.get("EVENT_HANDLER_URL");
export const EVENT_HANDLER_SECRET_KEY = Deno.env.get(
  "EVENT_HANDLER_SECRET_KEY",
);
