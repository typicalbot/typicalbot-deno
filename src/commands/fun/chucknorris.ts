import Command from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import {
  DiscordInteractionResponseTypes,
  sendInteractionResponse,
  snowflakeToBigint,
} from "../../../deps.ts";

const ChuckNorrisCommand: Command = {
  name: "chucknorris",
  description: "No description available",
  async execute(interaction) {
    const json = await fetch("https://api.icndb.com/jokes/random")
      .then((res) => res.json());

    return await sendInteractionResponse(
      snowflakeToBigint(interaction.id),
      interaction.token,
      {
        type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: json.value.joke,
        },
      },
    );
  },
};

bot.commands.set("chucknorris", ChuckNorrisCommand);
