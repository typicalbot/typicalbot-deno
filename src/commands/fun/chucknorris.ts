import Command from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";

const ChuckNorrisCommand: Command = (message) => {
  fetch("https://api.icndb.com/jokes/random")
    .then((res) => res.json())
    .then((json) => message.send(json.value.joke))
    .catch(() => message.send("Unable to query from API."));
};

bot.commands.set("chucknorris", ChuckNorrisCommand);
