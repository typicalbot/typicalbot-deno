import Command from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";

const BunnyCommand: Command = (message) => {
  const type = Math.random() <= 0.25 ? "gif" : "poster";

  fetch(`https://api.bunnies.io/v2/loop/random/?media=${type}`)
    .then((res) => res.json())
    .then((json) => message.send(json.media[type]))
    .catch(() => message.send("Unable to query from API."));
};

bot.commands.set("bunny", BunnyCommand);
