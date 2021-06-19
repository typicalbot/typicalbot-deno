import {
  deleteMessages,
  DiscordApplicationCommandOptionTypes,
  getMessages,
  snowflakeToBigint,
  validatePermissions,
} from "../../../../deps.ts";
import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import { enTranslate, translate } from "../../common/util/i18next.ts";

const PurgeCommand: Command = async (interaction) => {
  if (
    !validatePermissions(snowflakeToBigint(interaction.member!.permissions), [
      "MANAGE_MESSAGES",
    ])
  ) {
    return basicInteractionResponse(
      interaction.id,
      interaction.token,
      translate(
        snowflakeToBigint(interaction.guildId!),
        "permission:USER_MISSING_PERMISSION",
        { permission: "Manage Messages" },
      ),
    );
  }

  const raw = interaction.data?.options?.[0];

  if (!raw) {
    return basicInteractionResponse(
      interaction.id,
      interaction.token,
      "Invalid usage, please use `/purge [2-100]`.",
    );
  }

  if (raw.type === DiscordApplicationCommandOptionTypes.Integer && raw.value) {
    if (raw.value < 2) {
      return basicInteractionResponse(
        interaction.id,
        interaction.token,
        "You must purge at least 2 messages.",
      );
    }

    if (raw.value > 100) {
      return basicInteractionResponse(
        interaction.id,
        interaction.token,
        "You cannot purge more than 100 messages.",
      );
    }

    const channelId: bigint = snowflakeToBigint(interaction.channelId!);

    const messagesToDelete = await getMessages(
      channelId,
      {
        limit: 100,
      },
    );

    if (!messagesToDelete) {
      return basicInteractionResponse(
        interaction.id,
        interaction.token,
        "There are no messages to delete.",
      );
    }

    try {
      await deleteMessages(
        channelId,
        messagesToDelete.slice(0, raw.value + 1).map((m) => m.id),
      );
    } catch {
      return basicInteractionResponse(
        interaction.id,
        interaction.token,
        translate(
          snowflakeToBigint(interaction.guildId!),
          "permission:SELF_MISSING_PERMISSION",
          { permission: "Manage Messages" },
        ),
      );
    }

    return basicInteractionResponse(
      interaction.id,
      interaction.token,
      `Successfully purged ${raw.value} messages.`,
    );
  }
};

PurgeCommand.options = {
  name: "purge",
  description: enTranslate("commands/moderation/purge:COMMAND_DESCRIPTION"),
  options: [
    {
      required: false,
      name: "amount",
      description: enTranslate(
        "commands/moderation/purge:SUBCOMMAND_DESCRIPTION_AMOUNT",
      ),
      type: DiscordApplicationCommandOptionTypes.Integer,
    },
  ],
};

bot.commands.add(PurgeCommand);
