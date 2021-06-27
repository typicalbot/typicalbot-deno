import {
  botId,
  DiscordChannelTypes,
  DiscordenoMessage,
} from "../../deps.ts";
import { bot } from "../cache.ts";

const prefix = "/";

const MessageCreate = (message: DiscordenoMessage) => {
  // Ignore bots
  if (message.isBot) return;

  // Ignore DMs
  if (message.channel?.type === DiscordChannelTypes.DM) return;

  // Get raw mention and arguments
  const [raw, ...args] = message.content.split(" ");

  // Check for mention and no arguments
  if ((raw === `<@!${botId}>` || raw === `<@${botId}>`) && !args.length) {
    // Send prefix for server
    return message.send(`The prefix for this server is \`${prefix}\``);
  }
};

bot.events.messageCreate = MessageCreate;
