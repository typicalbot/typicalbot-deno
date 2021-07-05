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

  if (!raw || !(raw.name === "announcements" || raw.name === "status")) {
    return basicInteractionResponse(
      interaction.id,
      interaction.token,
      translate(guildId, "commands/general/follow:INVALID_ARGUMENT"),
    );
  }

  const channelId: bigint = snowflakeToBigint(interaction.channelId!);
  const channelToFollow = Deno.env.get(
    `FOLLOW_${raw.name.toUpperCase()}`,
  );

  try {
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

    await followChannel(snowflakeToBigint(channelToFollow!), channelId);

    return basicInteractionResponse(
      interaction.id,
      interaction.token,
      translate(guildId, `commands/general/follow:${channelToFollow!}`),
    );
  } catch {
    return basicInteractionResponse(
      interaction.id,
      interaction.token,
      translate(guildId, "permission:SELF_MISSING_PERMISSION", {
        permission: "Manage Webhooks",
      }),
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
