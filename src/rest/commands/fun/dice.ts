import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import { DiscordApplicationCommandOptionTypes } from "../../../../deps.ts";

const DiceCommand: Command = (interaction) => {
  const raw = interaction.data?.options?.[0];

  if (!raw) {
    return basicInteractionResponse(
      interaction.id,
      interaction.token,
      "Invalid usage, use `2d6` as an example. Where `2` is the amount of dices and `6` is amount of sides.",
    );
  }

  if (raw.type === DiscordApplicationCommandOptionTypes.String && raw.value) {
    const [dices, sides] = raw.value.split("d");

    if (!dices || !sides) {
      return basicInteractionResponse(
        interaction.id,
        interaction.token,
        "Invalid usage, use `2d6` as an example. Where `2` is the amount of dices and `6` is amount of sides.",
      );
    }

    const convertedDices = +dices;
    const convertedSides = +sides;

    if (convertedDices < 2) {
      return basicInteractionResponse(
        interaction.id,
        interaction.token,
        "There must be at least two dices.",
      );
    }

    if (convertedSides < 2) {
      return basicInteractionResponse(
        interaction.id,
        interaction.token,
        "There must be at least two sides.",
      );
    }

    const rolls = [];

    const rollDice = (sides: number): number => {
      sides = Math.max(sides, 1);
      return Math.floor(Math.random() * (sides - 1 + 1)) + 1;
    };

    for (let i = 0; i < convertedDices; i++) {
      rolls.push(rollDice(convertedSides));
    }

    const sum = rolls.reduce((a, b) => a + b, 0);

    return basicInteractionResponse(
      interaction.id,
      interaction.token,
      `You rolled [${rolls.join(", ")}] totaling ${sum}.`,
    );
  }
};

DiceCommand.options = {
  name: "dice",
  description: "No description available.",
  options: [
    {
      required: false,
      name: "XdY",
      description: "The amount of dices (X) and amount of sides (Y)",
      type: DiscordApplicationCommandOptionTypes.String,
    },
  ],
};

bot.commands.add(DiceCommand);
