import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import { enTranslate } from "../../common/util/i18next.ts";

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
  description: enTranslate("commands/fun/thouart:COMMAND_DESCRIPTION"),
};

bot.commands.add(ThouartCommand);
