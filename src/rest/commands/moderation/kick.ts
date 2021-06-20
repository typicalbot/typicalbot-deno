import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import {
  DiscordApplicationCommandOptionTypes,
  kickMember,
  snowflakeToBigint,
  validatePermissions,
} from "../../../../deps.ts";
import { enTranslate, translate } from "../../common/util/i18next.ts";

const KickCommand: Command = async (interaction) => {
  if (
    !validatePermissions(snowflakeToBigint(interaction.member!.permissions), [
      "KICK_MEMBERS",
    ])
  ) {
    return basicInteractionResponse(
      interaction.id,
      interaction.token,
      translate(
        snowflakeToBigint(interaction.guildId!),
        "permission:USER_MISSING_PERMISSION",
        { permission: "Kick Members" },
      ),
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
        translate(
          snowflakeToBigint(interaction.guildId!),
          "permission:SELF_MISSING_PERMISSION",
          { permission: "Kick Members" },
        ),
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
  description: enTranslate("commands/moderation/kick:COMMAND_DESCRIPTION"),
  options: [
    {
      required: true,
      name: "user",
      description: enTranslate(
        "commands/moderation/kick:SUBCOMMAND_DESCRIPTION_USER",
      ),
      type: DiscordApplicationCommandOptionTypes.User,
    },
    {
      required: false,
      name: "reason",
      description: enTranslate(
        "commands/moderation/kick:SUBCOMMAND_DESCRIPTION_REASON",
      ),
      type: DiscordApplicationCommandOptionTypes.String,
    },
  ],
};

bot.commands.add(KickCommand);
