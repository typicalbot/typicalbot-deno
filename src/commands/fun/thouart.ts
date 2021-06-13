import Command from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";

const ThouartCommand: Command = (message) => {
  fetch("https://quandyfactory.com/insult/json", {
    headers: { "Accept": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => message.send(json.insult))
    .catch(() => message.send("Unable to query from API."));
};

bot.commands.set("thouart", ThouartCommand);
