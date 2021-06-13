import Command from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";

const KangarooCommand: Command = (message) => {
  fetch("https://some-random-api.ml/img/kangaroo")
    .then((res) => res.json())
    .then((json) => message.send(json.link))
    .catch(() => message.send("Unable to query from API."));
};

bot.commands.set("kangaroo", KangarooCommand);
