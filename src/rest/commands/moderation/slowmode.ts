import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import { enTranslate, translate } from "../../common/util/i18next.ts";
import {
  DiscordApplicationCommandOptionTypes,
  editChannel,
  ms,
  snowflakeToBigint,
  validatePermissions,
} from "../../../../deps.ts";

const SlowmodeCommand: Command = async (interaction) => {
  const guildId: bigint = snowflakeToBigint(interaction.guildId!);

  if (
    !validatePermissions(snowflakeToBigint(interaction.member!.permissions), [
      "MANAGE_CHANNELS",
    ])
  ) {
    return basicInteractionResponse(
      interaction.id,
      interaction.token,
      translate(
        guildId,
        "permission:USER_MISSING_PERMISSION",
        { permission: "Manage Channels" },
      ),
    );
  }

  const raw = interaction.data?.options?.[0];

  if (!raw) {
    return basicInteractionResponse(
      interaction.id,
      interaction.token,
      translate(guildId, "commands/moderation/slowmode:MISSING_ARGUMENT"),
    );
  }

  if (raw.type === DiscordApplicationCommandOptionTypes.String && raw.value) {
    const time = (ms(+raw.value) as number);

    if (!isFinite(time) || time > 21600) {
      return basicInteractionResponse(
        interaction.id,
        interaction.token,
        translate(
          guildId,
          "commands/moderation/slowmode:ERROR",
        ),
      );
    }

    try {
      await editChannel(snowflakeToBigint(interaction.channelId!), {
        rateLimitPerUser: time,
      });
    } catch {
      return basicInteractionResponse(
        interaction.id,
        interaction.token,
        translate(
          guildId,
          "permission:SELF_MISSING_PERMISSION",
          { permission: "Manage Channels" },
        ),
      );
    }

    return basicInteractionResponse(
      interaction.id,
      interaction.token,
      translate(
        guildId,
        "commands/moderation/slowmode:SLOWMODE_UPDATED",
      ),
    );
  }
};

SlowmodeCommand.options = {
  name: "slowmode",
  description: enTranslate("commands/moderation/slowmode:COMMAND_DESCRIPTION"),
  options: [
    {
      required: false,
      name: "time",
      description: enTranslate(
        "commands/moderation/slowmode:SUBCOMMAND_DESCRIPTION_TIME",
      ),
      type: DiscordApplicationCommandOptionTypes.String,
    },
  ],
};

bot.commands.add(SlowmodeCommand);
