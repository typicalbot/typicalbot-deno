import Command from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";

const CatFactCommand: Command = (message) => {
  fetch("https://some-random-api.ml/facts/cat")
    .then((res) => res.json())
    .then((json) => message.send(json.fact))
    .catch(() => message.send("Unable to query from API."));
};

bot.commands.set("catfact", CatFactCommand);
