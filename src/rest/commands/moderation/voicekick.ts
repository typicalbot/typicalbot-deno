import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import { enTranslate } from "../../common/util/i18next.ts";

const VoiceKickCommand: Command = (interaction) => {
  return basicInteractionResponse(
    interaction.id,
    interaction.token,
    "Command not implemented yet.",
  );
};

VoiceKickCommand.options = {
  name: "voicekick",
  description: enTranslate("commands/moderation/voicekick:COMMAND_DESCRIPTION"),
};

bot.commands.add(VoiceKickCommand);
