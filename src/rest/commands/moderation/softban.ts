import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import { enTranslate } from "../../common/util/i18next.ts";

const SoftbanCommand: Command = (interaction) => {
  return basicInteractionResponse(
    interaction.id,
    interaction.token,
    "Command not implemented yet.",
  );
};

SoftbanCommand.options = {
  name: "softban",
  description: enTranslate("commands/moderation/softban:COMMAND_DESCRIPTION"),
};

bot.commands.add(SoftbanCommand);
