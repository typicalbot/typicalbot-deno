import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import { enTranslate } from "../../common/util/i18next.ts";

const PremiumCommand: Command = (interaction) => {
  return basicInteractionResponse(
    interaction.id,
    interaction.token,
    "You can learn more about TypicalBot Premium at https://typicalbot.com/pricing.",
  );
};

PremiumCommand.options = {
  name: "premium",
  description: enTranslate("commands/general/premium:COMMAND_DESCRIPTION"),
};

bot.commands.set("premium", PremiumCommand);
