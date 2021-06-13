import Command from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";

const YomamaCommand: Command = (message) => {
  fetch("https://api.yomomma.info")
    .then((res) => res.json())
    .then((json) => message.send(json.joke))
    .catch(() => message.send("Unable to query from API."));
};

bot.commands.set("yomama", YomamaCommand);
