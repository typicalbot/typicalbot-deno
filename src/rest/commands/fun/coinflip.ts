import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import { enTranslate } from "../../common/util/i18next.ts";

const CoinflipCommand: Command = (interaction) => {
  const rand = Math.floor(Math.random() * 2);

  return basicInteractionResponse(
    interaction.id,
    interaction.token,
    rand === 1 ? "Heads" : "Tails",
  );
};

CoinflipCommand.options = {
  name: "coinflip",
  description: enTranslate("commands/fun/coinflip:COMMAND_DESCRIPTION"),
};

bot.commands.add(CoinflipCommand);
