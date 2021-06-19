import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import { enTranslate } from "../../common/util/i18next.ts";

const InviteCommand: Command = (interaction) => {
  return basicInteractionResponse(
    interaction.id,
    interaction.token,
    "You can invite TypicalBot at https://typicalbot.com/invite/deno.",
  );
};

InviteCommand.options = {
  name: "invite",
  description: enTranslate("commands/general/invite:COMMAND_DESCRIPTION"),
};

bot.commands.set("invite", InviteCommand);
