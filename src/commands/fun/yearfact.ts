import Command from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import {
  DiscordInteractionResponseTypes,
  sendInteractionResponse,
  snowflakeToBigint,
} from "../../../deps.ts";

const YearFactCommand: Command = {
  name: "yearfact",
  description: "No description available",
  async execute(interaction) {
    const text = await fetch("http://numbersapi.com/random/year")
      .then((res) => res.text());

    return await sendInteractionResponse(
      snowflakeToBigint(interaction.id),
      interaction.token,
      {
        type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: text,
        },
      },
    );
  },
};

bot.commands.set("yearfact", YearFactCommand);
