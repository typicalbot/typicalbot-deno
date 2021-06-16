import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";

const YearFactCommand: Command = (interaction) => {
  return fetch("http://numbersapi.com/random/year")
    .then((res) => res.text())
    .then((text) =>
      basicInteractionResponse(interaction.id, interaction.token, text)
    )
    .catch(() =>
      basicInteractionResponse(
        interaction.id,
        interaction.token,
        "Failed to query from API.",
      )
    );
};

YearFactCommand.options = {
  name: "yearfact",
  description: "No description available.",
};

bot.commands.set("yearfact", YearFactCommand);
