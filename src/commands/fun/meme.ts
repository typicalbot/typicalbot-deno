import Command from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import {
  DiscordInteractionResponseTypes,
  sendInteractionResponse,
  snowflakeToBigint,
} from "../../../deps.ts";

const MemeCommand: Command = {
  name: "meme",
  description: "No description available",
  async execute(interaction) {
    const { data: { children } } = await fetch(
      "https://www.reddit.com/r/memes/top.json?sort=top&t=day&limit=500",
    )
      .then((res) => res.json());

    // deno-lint-ignore no-explicit-any
    const raw = children.filter((c: any) => c.data.over_18 === false);

    const meme = raw[Math.floor(Math.random() * raw.length)].data;

    return await sendInteractionResponse(
      snowflakeToBigint(interaction.id),
      interaction.token,
      {
        type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: [meme.title, meme.url].join("\n"),
        },
      },
    );
  },
};

bot.commands.set("meme", MemeCommand);
