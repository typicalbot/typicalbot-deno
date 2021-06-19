import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import {
  banMember,
  DiscordApplicationCommandOptionTypes,
  snowflakeToBigint,
  validatePermissions,
} from "../../../../deps.ts";
import { enTranslate, translate } from "../../common/util/i18next.ts";

const BanCommand: Command = async (interaction) => {
  if (
    !validatePermissions(snowflakeToBigint(interaction.member!.permissions), [
      "BAN_MEMBERS",
    ])
  ) {
    return basicInteractionResponse(
      interaction.id,
      interaction.token,
      translate(
        snowflakeToBigint(interaction.guildId!),
        "permission:USER_MISSING_PERMISSION",
        { permission: "Ban Members" },
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
      await banMember(
        snowflakeToBigint(interaction.guildId!),
        snowflakeToBigint(targetUser.id),
        {
          deleteMessageDays: 0,
          reason: reason,
        },
      );
    } catch {
      return basicInteractionResponse(
        interaction.id,
        interaction.token,
        translate(
          snowflakeToBigint(interaction.guildId!),
          "permission:SELF_MISSING_PERMISSION",
          { permission: "Ban Members" },
        ),
      );
    }

    return basicInteractionResponse(
      interaction.id,
      interaction.token,
      `Successfully banned ${targetUser.username}#${targetUser.discriminator} (${targetUser.id}) ${
        rawReason ? `for ${reason}` : ""
      }`,
    );
  }
};

BanCommand.options = {
  name: "ban",
  description: enTranslate("commands/moderation/ban:COMMAND_DESCRIPTION"),
  options: [
    {
      required: true,
      name: "user",
      description: enTranslate(
        "commands/moderation/ban:SUBCOMMAND_DESCRIPTION_USER",
      ),
      type: DiscordApplicationCommandOptionTypes.User,
    },
    {
      required: false,
      name: "reason",
      description: enTranslate(
        "commands/moderation/ban:SUBCOMMAND_DESCRIPTION_REASON",
      ),
      type: DiscordApplicationCommandOptionTypes.String,
    },
  ],
};

bot.commands.set("ban", BanCommand);
