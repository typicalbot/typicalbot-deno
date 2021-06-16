import Command from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import {
  DiscordInteractionResponseTypes,
  sendInteractionResponse,
  snowflakeToBigint,
} from "../../../deps.ts";

const AdviceCommand: Command = {
  name: "advice",
  description: "No description available",
  async execute(interaction) {
    const json = await fetch("https://api.adviceslip.com/advice")
      .then((res) => res.json());

    return await sendInteractionResponse(
      snowflakeToBigint(interaction.id),
      interaction.token,
      {
        type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: json.slip.advice,
        },
      },
    );
  },
};

bot.commands.set("advice", AdviceCommand);
