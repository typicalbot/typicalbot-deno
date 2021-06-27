import { log, rest, startGateway } from "../deps.ts";
import {
  DISCORD_TOKEN,
  EVENT_HANDLER_SECRET_KEY,
  EVENT_HANDLER_URL,
} from "./config.ts";

await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler("INFO", {
      formatter: "[{datetime}] [{levelName}] {msg}",
    }),
  },
  loggers: {
    default: {
      level: "INFO",
      handlers: ["console"],
    },
  },
});

const logger = log.getLogger();

// Prepare the `rest` system to work. Required for "Resharder" to work.
rest.token = `Bot ${DISCORD_TOKEN!}`;

logger.info("Starting gateway");
startGateway({
  token: DISCORD_TOKEN!,
  intents: [
    "Guilds",
    "GuildBans",
    "GuildMessages",
    "GuildMessageReactions",
  ],
  firstShardId: 0,
  url: EVENT_HANDLER_URL!,
  secretKey: EVENT_HANDLER_SECRET_KEY!,
});
