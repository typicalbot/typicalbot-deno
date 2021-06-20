import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import { enTranslate } from "../../common/util/i18next.ts";

const WarnCommand: Command = (interaction) => {
  return basicInteractionResponse(
    interaction.id,
    interaction.token,
    "Command not implemented yet.",
  );
};

WarnCommand.options = {
  name: "warn",
  description: enTranslate("commands/moderation/warn:COMMAND_DESCRIPTION"),
};

bot.commands.add(WarnCommand);
