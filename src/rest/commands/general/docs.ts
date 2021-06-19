import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";

const DocsCommand: Command = (interaction) => {
  return basicInteractionResponse(
    interaction.id,
    interaction.token,
    "You can find our documentation at https://typicalbot.com/docs.",
  );
};

DocsCommand.options = {
  name: "docs",
  description: "No description available.",
};

bot.commands.add(DocsCommand);
