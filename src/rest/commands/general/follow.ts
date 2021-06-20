import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import { enTranslate, translate } from "../../common/util/i18next.ts";
import {
  DiscordApplicationCommandOptionTypes,
  followChannel,
  getChannelWebhooks,
  snowflakeToBigint,
  validatePermissions,
} from "../../../../deps.ts";

const FollowCommand: Command = async (interaction) => {
  const guildId: bigint = snowflakeToBigint(interaction.guildId!);

  if (
    !validatePermissions(snowflakeToBigint(interaction.member!.permissions), [
      "MANAGE_WEBHOOKS",
    ])
  ) {
    return basicInteractionResponse(
      interaction.id,
      interaction.token,
      translate(guildId, "permission:USER_MISSING_PERMISSION", {
        permission: "Manage Webhooks",
      }),
    );
  }

  const raw = interaction.data?.options?.[0];

  if (raw?.name === "announcements") {
    const channelId: bigint = snowflakeToBigint(interaction.channelId!);

    const channelWebhooks = await getChannelWebhooks(
      channelId,
    );

    if (channelWebhooks.size >= 10) {
      return basicInteractionResponse(
        interaction.id,
        interaction.token,
        translate(guildId, "commands/general/follow:WEBHOOK_LIMIT"),
      );
    }

    try {
      // 268559149175013376 is the ID of our announcement channel.
      await followChannel(snowflakeToBigint("268559149175013376"), channelId);
    } catch {
      return basicInteractionResponse(
        interaction.id,
        interaction.token,
        translate(guildId, "permission:SELF_MISSING_PERMISSION", {
          permission: "Manage Webhooks",
        }),
      );
    }

    return basicInteractionResponse(
      interaction.id,
      interaction.token,
      translate(guildId, "commands/general/follow:ANNOUNCEMENTS_FOLLOWED"),
    );
  } else if (raw?.name === "status") {
    const channelId: bigint = snowflakeToBigint(interaction.channelId!);

    const channelWebhooks = await getChannelWebhooks(
      channelId,
    );

    if (channelWebhooks.size >= 10) {
      return basicInteractionResponse(
        interaction.id,
        interaction.token,
        translate(guildId, "commands/general/follow:WEBHOOK_LIMIT"),
      );
    }

    try {
      // 621817852726607882 is the ID of our status channel.
      await followChannel(snowflakeToBigint("621817852726607882"), channelId);
    } catch {
      return basicInteractionResponse(
        interaction.id,
        interaction.token,
        translate(guildId, "permission:SELF_MISSING_PERMISSION", {
          permission: "Manage Webhooks",
        }),
      );
    }

    return basicInteractionResponse(
      interaction.id,
      interaction.token,
      translate(guildId, "commands/general/follow:STATUS_FOLLOWED"),
    );
  } else {
    return basicInteractionResponse(
      interaction.id,
      interaction.token,
      translate(guildId, "commands/general/follow:INVALID_ARGUMENT"),
    );
  }
};

FollowCommand.options = {
  name: "follow",
  description: enTranslate("commands/general/follow:COMMAND_DESCRIPTION"),
  options: [
    {
      required: false,
      name: "announcements",
      description: enTranslate(
        "commands/general/follow:SUBCOMMAND_DESCRIPTION_ANNOUNCEMENTS",
      ),
      type: DiscordApplicationCommandOptionTypes.SubCommand,
    },
    {
      required: false,
      name: "status",
      description: enTranslate(
        "commands/general/follow:SUBCOMMAND_DESCRIPTION_STATUS",
      ),
      type: DiscordApplicationCommandOptionTypes.SubCommand,
    },
  ],
};

bot.commands.add(FollowCommand);
