import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";

const ThouartCommand: Command = (interaction) => {
  return fetch("https://quandyfactory.com/insult/json", {
    headers: { "Accept": "application/json" },
  })
    .then((res) => res.json())
    .then((json) =>
      basicInteractionResponse(interaction.id, interaction.token, json.insult)
    )
    .catch(() =>
      basicInteractionResponse(
        interaction.id,
        interaction.token,
        "Failed to query from API.",
      )
    );
};

ThouartCommand.options = {
  name: "thouart",
  description: "No description available.",
};

bot.commands.set(ThouartCommand.options.name, ThouartCommand);
