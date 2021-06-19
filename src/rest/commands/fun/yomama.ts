import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";

const YomamaCommand: Command = (interaction) => {
  return fetch("https://api.yomomma.info")
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

YomamaCommand.options = {
  name: "yomama",
  description: "No description available.",
};

bot.commands.set(YomamaCommand.options.name, YomamaCommand);
