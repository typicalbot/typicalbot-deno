import { startGateway } from "../../deps.ts";
import { DISCORD_TOKEN, EVENT_HANDLER_URL, EVENT_HANDLER_SECRET_KEY } from "../../configs.ts";

function startup() {
  startGateway({
    token: DISCORD_TOKEN,
    intents: [
      "GuildMessages",
      "Guilds",
    ],
    firstShardId: 0,
    url: EVENT_HANDLER_URL,
    secretKey: EVENT_HANDLER_SECRET_KEY,
  });
}

startup();
