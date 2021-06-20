import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import { enTranslate } from "../../common/util/i18next.ts";

const UnbanCommand: Command = (interaction) => {
  return basicInteractionResponse(
    interaction.id,
    interaction.token,
    "Command not implemented yet.",
  );
};

UnbanCommand.options = {
  name: "unban",
  description: enTranslate("commands/moderation/unban:COMMAND_DESCRIPTION"),
};

bot.commands.add(UnbanCommand);
