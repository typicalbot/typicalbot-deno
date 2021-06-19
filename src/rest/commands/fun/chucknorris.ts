import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";

const ChuckNorrisCommand: Command = (interaction) => {
  return fetch("https://api.icndb.com/jokes/random")
    .then((res) => res.json())
    .then((json) =>
      basicInteractionResponse(
        interaction.id,
        interaction.token,
        json.value.joke,
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

ChuckNorrisCommand.options = {
  name: "chucknorris",
  description: "No description available.",
};

bot.commands.set(ChuckNorrisCommand.options.name, ChuckNorrisCommand);
