import { rest, startGateway } from "../../deps.ts";
import {
  DISCORD_TOKEN,
  EVENT_HANDLER_SECRET_KEY,
  EVENT_HANDLER_URL,
} from "../../config.ts";

// Prepare the `rest` system to work. FOR RESHARDER needs to getGatewayBot
rest.token = `Bot ${DISCORD_TOKEN}`;

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
