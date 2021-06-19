import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";

const AdviceCommand: Command = (interaction) => {
  return fetch("https://api.adviceslip.com/advice")
    .then((res) => res.json())
    .then((json) =>
      basicInteractionResponse(
        interaction.id,
        interaction.token,
        json.slip.advice,
      )
    )
    .catch(() =>
      basicInteractionResponse(
        interaction.id,
        interaction.token,
        "Failed to query from API.",
      )
    );
};

AdviceCommand.options = {
  name: "advice",
  description: "No description available.",
};

bot.commands.set(AdviceCommand.options.name, AdviceCommand);
