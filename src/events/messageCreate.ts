import { botId, DiscordChannelTypes, DiscordenoMessage } from "../../deps.ts";
import { bot } from "../cache.ts";

const prefix = "$$";

const MessageCreate = (message: DiscordenoMessage) => {
  // Ignore bots
  if (message.isBot) return;

  // Ignore DMs
  if (message.channel?.type === DiscordChannelTypes.DM) return;

  // Get raw command and arguments
  const [raw, ...args] = message.content.split(" ");

  // Check for mention and no arguments
  if ((raw === `<@!${botId}>` || raw === `<@${botId}>`) && !args.length) {
    // Send prefix for server
    return message.send(`The prefix for this server is \`${prefix}\``);
  }

  // TODO: Use prefix from guild settings
  if (!raw.startsWith(prefix)) return;

  // Get command name without prefix
  const commandName = raw.slice(prefix.length).toLowerCase();
  const command = bot.commands.get(commandName);

  // Command doesn't exist
  if (!command) return;

  // Grab default arguments
  const finalArgs = (args.length ? args : command.defaultArguments || []);

  return command(message, finalArgs);
};

bot.events.messageCreate = MessageCreate;
