import Command from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import {
  DiscordInteractionResponseTypes,
  sendInteractionResponse,
  snowflakeToBigint,
} from "../../../deps.ts";

const PunCommand: Command = {
  name: "pun",
  description: "No description available",
  async execute(interaction) {
    const json = await fetch("https://icanhazdadjoke.com", {
      headers: { "Accept": "application/json" },
    })
      .then((res) => res.json());

    return await sendInteractionResponse(
      snowflakeToBigint(interaction.id),
      interaction.token,
      {
        type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: json.joke,
        },
      },
    );
  },
};

bot.commands.set("pun", PunCommand);
