import Command from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";

const AdviceCommand: Command = (message) => {
  fetch("https://api.adviceslip.com/advice")
    .then((res) => res.json())
    .then((json) => message.send(json.slip.advice))
    .catch(() => message.send("Unable to query from API."));
};

bot.commands.set("advice", AdviceCommand);
