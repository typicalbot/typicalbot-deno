import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import { enTranslate } from "../../common/util/i18next.ts";

const DocsCommand: Command = (interaction) => {
  return basicInteractionResponse(
    interaction.id,
    interaction.token,
    "You can find our documentation at https://typicalbot.com/docs.",
  );
};

DocsCommand.options = {
  name: "docs",
  description: enTranslate("commands/general/docs:COMMAND_DESCRIPTION"),
};

bot.commands.add(DocsCommand);
