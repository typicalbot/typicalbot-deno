import Command from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import {
  DiscordInteractionResponseTypes,
  sendInteractionResponse,
  snowflakeToBigint,
} from "../../../deps.ts";

const YomamaCommand: Command = {
  name: "yomama",
  description: "No description available",
  async execute(interaction) {
    const json = await fetch("https://api.yomomma.info")
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

bot.commands.set("yomama", YomamaCommand);
