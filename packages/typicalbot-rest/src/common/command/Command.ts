import {
  ApplicationCommandOption,
  DiscordInteractionResponseTypes,
  Embed,
  sendInteractionResponse,
  SlashCommandInteraction,
} from "../../../deps.ts";

interface Command {
  (
    interaction: SlashCommandInteraction,
  ): Promise<unknown> | unknown;
  options: CommandOptions;
}

interface CommandOptions {
  name: string;
  description: string;
  options?: ApplicationCommandOption[];
}

const basicInteractionResponse = async (
  id: string | bigint,
  token: string,
  content: string | Embed,
) => {
  if (typeof content === "string") {
    return await sendInteractionResponse(
      id,
      token,
      {
        type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: content,
        },
      },
    );
  } else {
    return await sendInteractionResponse(
      id,
      token,
      {
        type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
        data: {
          embeds: [content],
        },
      },
    );
  }
};

export default Command;

export { basicInteractionResponse };

export type { CommandOptions };
