import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import { DiscordApplicationCommandOptionTypes } from "../../../deps.ts";
import { enTranslate } from "../../common/util/i18next.ts";

const SayCommand: Command = (interaction) => {
  const raw = interaction.data?.options?.[0];

  if (!raw) {
    return basicInteractionResponse(
      interaction.id,
      interaction.token,
      "Invalid usage.",
    );
  }

  if (raw.type === DiscordApplicationCommandOptionTypes.String && raw.value) {
    return basicInteractionResponse(
      interaction.id,
      interaction.token,
      raw.value,
    );
  }
};

SayCommand.options = {
  name: "say",
  description: enTranslate("commands/moderation/say:COMMAND_DESCRIPTION"),
  options: [
    {
      required: false,
      name: "message",
      description: enTranslate(
        "commands/moderation/say:SUBCOMMAND_DESCRIPTION_MESSAGE",
      ),
      type: DiscordApplicationCommandOptionTypes.String,
    },
  ],
};

bot.commands.add(SayCommand);
