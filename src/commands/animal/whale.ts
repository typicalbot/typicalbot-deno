import Command from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";

const WhaleCommand: Command = (message) => {
  fetch("https://some-random-api.ml/img/whale")
    .then((res) => res.json())
    .then((json) => message.send(json.link))
    .catch(() => message.send("Unable to query from API."));
};

bot.commands.set("whale", WhaleCommand);