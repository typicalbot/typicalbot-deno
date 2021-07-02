import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import { enTranslate } from "../../common/util/i18next.ts";

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
  description: enTranslate("commands/fun/advice:COMMAND_DESCRIPTION"),
};

bot.commands.add(AdviceCommand);
