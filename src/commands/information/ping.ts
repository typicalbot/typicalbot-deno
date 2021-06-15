import { SlashCommand } from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import {
  DiscordInteractionResponseTypes,
  sendInteractionResponse,
  snowflakeToBigint,
} from "../../../deps.ts";

const PingCommand: SlashCommand = {
  enabled: true,
  global: true,
  guild: false,
  advanced: false,
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

bot.slashCommands.set("ping", PingCommand);
