import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import { enTranslate } from "../../common/util/i18next.ts";

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
  description: enTranslate("commands/fun/yomama:COMMAND_DESCRIPTION"),
};

bot.commands.add(YomamaCommand);
