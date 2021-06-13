import Command from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";

const YearFactCommand: Command = (message) => {
  fetch("http://numbersapi.com/random/year")
    .then((res) => res.text())
    .then((text) => message.send(text))
    .catch(() => message.send("Unable to query from API."));
};

bot.commands.set("yearfact", YearFactCommand);
