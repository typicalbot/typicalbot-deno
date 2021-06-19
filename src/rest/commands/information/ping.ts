import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import { enTranslate } from "../../common/util/i18next.ts";

const PingCommand: Command = (interaction) => {
  return basicInteractionResponse(
    interaction.id,
    interaction.token,
    "Pong",
  );
};

PingCommand.options = {
  name: "ping",
  description: enTranslate("commands/information/ping:COMMAND_DESCRIPTION"),
};

bot.commands.set("ping", PingCommand);
