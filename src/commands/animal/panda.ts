import Command from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";

const PandaCommand: Command = (message) => {
  fetch("https://some-random-api.ml/img/panda")
    .then((res) => res.json())
    .then((json) => message.send(json.link))
    .catch(() => message.send("Unable to query from API."));
};

bot.commands.set("panda", PandaCommand);
