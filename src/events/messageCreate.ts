import {
  botId,
  DiscordChannelTypes,
  DiscordenoMessage,
  getMissingChannelPermissions,
  getMissingGuildPermissions,
  Permission,
  PermissionStrings,
} from "../../deps.ts";
import { bot } from "../cache.ts";

const prefix = "?";

const MessageCreate = async (message: DiscordenoMessage) => {
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

  // Check for bot permissions
  if (command.options?.permissions?.self?.length) {
    if (
      await checkPermissions(
        message,
        "self",
        command.options?.permissions?.self,
      )
    ) {
      return;
    }
  }

  // Check for user permissions
  if (command.options?.permissions?.user?.length) {
    if (
      await checkPermissions(
        message,
        "user",
        command.options?.permissions?.user,
      )
    ) {
      return;
    }
  }

  // Grab default arguments
  const finalArgs = (args.length ? args : command.defaultArguments || []);

  return command(message, finalArgs);
};

// TODO: Create interface in Command file for type?
//  Move this to a separate file?
const checkPermissions = async (
  message: DiscordenoMessage,
  type: "user" | "self",
  permissions: Permission[],
): Promise<boolean> => {
  const id = type === "self" ? botId : message.authorId;

  const channelPermissionsMissing = await getMissingChannelPermissions(
    message.channelId,
    id,
    permissions,
  );

  if (!channelPermissionsMissing.length) {
    return false;
  }

  const guildPermissionsMissing = await getMissingGuildPermissions(
    message.guildId,
    id,
    permissions,
  );

  if (!guildPermissionsMissing.length) {
    return false;
  }

  const sendViewPermissions = (permissions: PermissionStrings[]): boolean =>
    permissions.some((permission) =>
      permission === "SEND_MESSAGES" || permission === "VIEW_CHANNEL"
    );

  if (channelPermissionsMissing.length) {
    if (sendViewPermissions(channelPermissionsMissing)) return true;

    message.send(
      `<@!${id}> is missing the following permission(s): ${
        channelPermissionsMissing.join(", ")
      }`,
    );
    return true;
  } else {
    if (sendViewPermissions(guildPermissionsMissing)) return true;

    message.send(
      `<@!${id}> is missing the following permission(s): ${
        guildPermissionsMissing.join(", ")
      }`,
    );
    return true;
  }
};

bot.events.messageCreate = MessageCreate;
