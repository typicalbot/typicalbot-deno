import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import {
  DiscordApplicationCommandOptionTypes,
  kickMember,
  snowflakeToBigint,
  validatePermissions,
} from "../../../deps.ts";

const KickCommand: Command = async (interaction) => {
  if (
    !validatePermissions(snowflakeToBigint(interaction.member!.permissions), [
      "KICK_MEMBERS",
    ])
  ) {
    return basicInteractionResponse(
      interaction.id,
      interaction.token,
      "You are missing the Kick Members permission.",
    );
  }

  const raw = interaction.data?.options?.[0];

  if (!raw) {
    return basicInteractionResponse(
      interaction.id,
      interaction.token,
      "Invalid usage.",
    );
  }

  if (raw.type === DiscordApplicationCommandOptionTypes.User && raw.value) {
    const userId = (raw.value) as string;
    const targetUser = interaction.data?.resolved?.users?.[userId];

    let reason = "No reason specified.";
    const rawReason = interaction.data?.options?.[1];

    if (
      rawReason &&
      rawReason.type === DiscordApplicationCommandOptionTypes.String &&
      raw.value
    ) {
      reason = rawReason.value;
    }

    if (!targetUser) {
      return basicInteractionResponse(
        interaction.id,
        interaction.token,
        "Unable to find that user.",
      );
    }

    // TODO: Check role hierarchy

    try {
      await kickMember(
        snowflakeToBigint(interaction.guildId!),
        snowflakeToBigint(targetUser.id),
        reason,
      );
    } catch {
      return basicInteractionResponse(
        interaction.id,
        interaction.token,
        "TypicalBot is missing the Kick Members permission.",
      );
    }

    return basicInteractionResponse(
      interaction.id,
      interaction.token,
      `Successfully kicked ${targetUser.username}#${targetUser.discriminator} (${targetUser.id}) ${
        rawReason ? `for ${reason}` : ""
      }`,
    );
  }
};

KickCommand.options = {
  name: "kick",
  description: "No description available",
  options: [
    {
      required: true,
      name: "user",
      description: "No description available.",
      type: DiscordApplicationCommandOptionTypes.User,
    },
    {
      required: false,
      name: "reason",
      description: "No description available",
      type: DiscordApplicationCommandOptionTypes.String,
    },
  ],
};

bot.commands.set("kick", KickCommand);
