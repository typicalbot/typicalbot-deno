import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import { enTranslate } from "../../common/util/i18next.ts";

const UnmuteCommand: Command = (interaction) => {
  return basicInteractionResponse(
    interaction.id,
    interaction.token,
    "Command not implemented yet.",
  );
};

UnmuteCommand.options = {
  name: "unmute",
  description: enTranslate("commands/moderation/unmute:COMMAND_DESCRIPTION"),
};

bot.commands.add(UnmuteCommand);
