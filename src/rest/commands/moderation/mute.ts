import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import { enTranslate } from "../../common/util/i18next.ts";

const MuteCommand: Command = (interaction) => {
  return basicInteractionResponse(
    interaction.id,
    interaction.token,
    "Command not implemented yet.",
  );
};

MuteCommand.options = {
  name: "mute",
  description: enTranslate("commands/moderation/mute:COMMAND_DESCRIPTION"),
};

bot.commands.add(MuteCommand);
