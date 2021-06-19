import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import { enTranslate } from "../../common/util/i18next.ts";

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
  description: enTranslate("commands/fun/yearfact:COMMAND_DESCRIPTION"),
};

bot.commands.add(YearFactCommand);
