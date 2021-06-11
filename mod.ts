import { startBot } from "./deps.ts";
import { fileLoader, importDirectory } from "./src/common/util/loader.ts";
import { bot } from "./src/cache.ts";

// Load commands and events
await Promise.all([
  "./src/commands",
  "./src/events",
].map((path) => importDirectory(Deno.realPathSync(path))));

await fileLoader();

// Start bot
console.log("Starting bot process");

startBot({
  token: "",
  intents: ["Guilds", "GuildMessages"],
  eventHandlers: bot.events,
});
