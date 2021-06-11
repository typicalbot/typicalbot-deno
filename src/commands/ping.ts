import Command from "../common/command/Command.ts";
import { bot } from "../cache.ts";

const PingCommand: Command = async (message) => {
  const ping = await message.send(`Pong!`);

  return ping.edit(`Pong! Command Execution: ${ping.timestamp - message.timestamp}ms`);
};

bot.commands.set("ping", PingCommand);
