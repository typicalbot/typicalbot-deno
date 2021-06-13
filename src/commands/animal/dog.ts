import Command from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";

const DogCommand: Command = (message) => {
  fetch("https://dog.ceo/api/breeds/image/random")
    .then((res) => res.json())
    .then((json) => message.send(json.message))
    .catch(() => message.send("Unable to query from API."));
};

bot.commands.set("dog", DogCommand);
