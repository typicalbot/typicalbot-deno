import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import { enTranslate } from "../../common/util/i18next.ts";

const SlowmodeCommand: Command = (interaction) => {
  return basicInteractionResponse(
    interaction.id,
    interaction.token,
    "Command not implemented yet.",
  );
};

SlowmodeCommand.options = {
  name: "slowmode",
  description: enTranslate("commands/moderation/slowmode:COMMAND_DESCRIPTION"),
};

bot.commands.add(SlowmodeCommand);
