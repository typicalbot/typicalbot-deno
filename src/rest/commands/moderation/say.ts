import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import { DiscordApplicationCommandOptionTypes } from "../../../../deps.ts";

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
  description: "No description available.",
  options: [
    {
      required: false,
      name: "message",
      description: "No description available.",
      type: DiscordApplicationCommandOptionTypes.String,
    },
  ],
};

bot.commands.add(SayCommand);
