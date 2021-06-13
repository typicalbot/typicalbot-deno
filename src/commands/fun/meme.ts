import Command from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";

const MemeCommand: Command = async (message) => {
  const { data: { children } } = await fetch(
    "https://www.reddit.com/r/memes/top.json?sort=top&t=day&limit=500",
  )
    .then((res) => res.json());

  const raw = children.filter((c: any) => c.data.over_18 === false);

  if (raw.length === 0) {
    return message.send("Unable to query from API.");
  }

  const meme = raw[Math.floor(Math.random() * raw.length)].data;

  message.send([meme.title, meme.url].join("\n"));
};

bot.commands.set("meme", MemeCommand);
