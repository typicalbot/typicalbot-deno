import Command from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";

const PunCommand: Command = (message) => {
  fetch("https://icanhazdadjoke.com", {
    headers: { "Accept": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => message.send(json.joke))
    .catch(() => message.send("Unable to query from API."));
};

bot.commands.set("pun", PunCommand);
