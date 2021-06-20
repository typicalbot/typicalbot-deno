import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import { enTranslate } from "../../common/util/i18next.ts";

const MemeCommand: Command = async (interaction) => {
  const { data: { children } } = await fetch(
    "https://www.reddit.com/r/memes/top.json?sort=top&t=day&limit=500",
  )
    .then((res) => res.json());

  // deno-lint-ignore no-explicit-any
  const raw = children.filter((c: any) => c.data.over_18 === false);

  if (!raw.length) {
    return basicInteractionResponse(
      interaction.id,
      interaction.token,
      "Failed to query from API.",
    );
  }

  const meme = raw[Math.floor(Math.random() * raw.length)].data;

  return basicInteractionResponse(
    interaction.id,
    interaction.token,
    [meme.title, meme.url].join("\n"),
  );
};

MemeCommand.options = {
  name: "meme",
  description: enTranslate("commands/fun/meme:COMMAND_DESCRIPTION"),
};

bot.commands.add(MemeCommand);
