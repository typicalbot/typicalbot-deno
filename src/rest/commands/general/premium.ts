import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";

const PremiumCommand: Command = (interaction) => {
  return basicInteractionResponse(
    interaction.id,
    interaction.token,
    "You can learn more about TypicalBot Premium at https://typicalbot.com/pricing.",
  );
};

PremiumCommand.options = {
  name: "premium",
  description: "No description available.",
};

bot.commands.set(PremiumCommand.options.name, PremiumCommand);
