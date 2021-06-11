import { DiscordChannelTypes, DiscordenoMessage } from "../../deps.ts";
import { bot } from "../cache.ts";

const MessageCreate = (message: DiscordenoMessage) => {
  // Ignore bots
  if (message.isBot) return;

  // Ignore DMs
  if (message.channel?.type === DiscordChannelTypes.DM) return;

  // Get raw command and arguments
  const [raw, ...args] = message.content.split(" ");

  // TODO: Use prefix from guild settings
  if (!raw.startsWith("$$")) return;

  // Get command name without prefix
  const commandName = raw.slice("$$".length).toLowerCase();
  const command = bot.commands.get(commandName);

  // Command doesn't exist
  if (!command) return;

  // Grab default arguments
  const finalArgs = (args.length ? args : command.defaultArguments || []);

  return command(message, finalArgs);
};

bot.events.messageCreate = MessageCreate;
