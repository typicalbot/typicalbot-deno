import Command from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import {
  DiscordInteractionResponseTypes,
  sendInteractionResponse,
  snowflakeToBigint,
} from "../../../deps.ts";

const PingCommand: Command = {
  name: "ping",
  description: "Check to see if TypicalBot is online and responsive.",
  async execute(interaction) {
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
  },
};

bot.commands.set("ping", PingCommand);
