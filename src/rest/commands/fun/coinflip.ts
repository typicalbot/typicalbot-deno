import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";

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
  description: "No description available.",
};

bot.commands.set("coinflip", CoinflipCommand);
