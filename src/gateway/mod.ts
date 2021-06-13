import { startGateway } from "../../deps.ts";
import {
  DISCORD_TOKEN,
  EVENT_HANDLER_SECRET_KEY,
  EVENT_HANDLER_URL,
} from "../../config.ts";

export function startup() {
  startGateway({
    token: DISCORD_TOKEN!,
    intents: [
      "GuildMessages",
      "Guilds",
    ],
    firstShardId: 0,
    url: EVENT_HANDLER_URL!,
    secretKey: EVENT_HANDLER_SECRET_KEY!,
  });
}

startup();
