import { deleteMessages, getMessages } from "../../../deps.ts";
import Command from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";

const PurgeCommand: Command = async (message, args) => {
  if (!args) {
    return message.send("Invalid usage. Please use `$$purge [2-100].`");
  }

  let count = args.shift();

  // convert to number
  count = +count;

  if (count < 2) {
    return message.send("You must purge at least 2 messages.");
  }

  if (count > 100) {
    return message.send("You cannot purge more than 100 messages.");
  }

  const messagesToDelete = await getMessages(message.channelId, {
    limit: 100,
  });

  if (!messagesToDelete) {
    return message.send("There are no messages to delete.");
  }

  try {
    await deleteMessages(
      message.channelId,
      messagesToDelete.slice(0, count + 1).map((m) => m.id),
    );
  } catch {
    return message.send(
      "There was an error while attempting to delete messages. Please try again.",
    );
  }

  return message.send(
    `Successfully purged ${count} messages.`,
  );
};

bot.commands.set("purge", PurgeCommand);
