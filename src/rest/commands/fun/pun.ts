import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";

const PunCommand: Command = (interaction) => {
  return fetch("https://icanhazdadjoke.com", {
    headers: { "Accept": "application/json" },
  })
    .then((res) => res.json())
    .then((json) =>
      basicInteractionResponse(interaction.id, interaction.token, json.joke)
    )
    .catch(() =>
      basicInteractionResponse(
        interaction.id,
        interaction.token,
        "Failed to query from API.",
      )
    );
};

PunCommand.options = {
  name: "pun",
  description: "No description available.",
};

bot.commands.set(PunCommand.options.name, PunCommand);
