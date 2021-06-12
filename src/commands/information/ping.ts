import Command from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import {
  DiscordApplicationCommandOptionTypes,
  DiscordInteractionResponseTypes,
  sendInteractionResponse,
  snowflakeToBigint,
} from "../../../deps";

const PingCommand: Command = async (message) => {
  const ping = await message.send(`Pong!`);

  return ping.edit(
    `Pong! Command Execution: ${ping.timestamp - message.timestamp}ms`,
  );
};

PingCommand.slash = async (interaction) => {
  return await sendInteractionResponse(
    snowflakeToBigint(interaction.id),
    interaction.token,
    {
      type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
      data: {
        content: "Pong",
      },
    },
  );
};

PingCommand.slash.options = [
  {
    name: "ping",
    description: "Check to see if TypicalBot is responsive.",
    type: DiscordApplicationCommandOptionTypes.User,
  },
];

bot.commands.set("ping", PingCommand);
