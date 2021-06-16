import Command from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import {
  DiscordInteractionResponseTypes,
  sendInteractionResponse,
  snowflakeToBigint,
} from "../../../deps.ts";

const ThouartCommand: Command = {
  name: "thouart",
  description: "No description available",
  async execute(interaction) {
    const json = await fetch("https://quandyfactory.com/insult/json", {
      headers: { "Accept": "application/json" },
    })
      .then((res) => res.json());

    return await sendInteractionResponse(
      snowflakeToBigint(interaction.id),
      interaction.token,
      {
        type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: json.insult,
        },
      },
    );
  },
};

bot.commands.set("thouart", ThouartCommand);
