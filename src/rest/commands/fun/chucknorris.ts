import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import { enTranslate } from "../../common/util/i18next.ts";

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
  description: enTranslate("commands/fun/chucknorris:COMMAND_DESCRIPTION"),
};

bot.commands.set("chucknorris", ChuckNorrisCommand);
