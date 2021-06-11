import Command from "../common/command/Command.ts";
import { bot } from "../cache.ts";

const PingCommand: Command = (message) => {
  return message.send(`Pong! MS: ${Date.now() - message.timestamp}ms`);
};

bot.commands.set("ping", PingCommand);
