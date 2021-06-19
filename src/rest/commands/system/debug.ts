import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import {
  cache,
  DiscordApplicationCommandOptionTypes,
} from "../../../../deps.ts";

const DebugCommand: Command = (interaction) => {
  // TODO: Change to use application team owners
  if (interaction.member!.user!.id !== "187342661060001792") {
    return basicInteractionResponse(
      interaction.id,
      interaction.token,
      "You do not have permission to use this command.",
    );
  }

  const raw = interaction.data?.options?.[0];

  if (raw?.name === "cache") {
    let totalMembers = 0;

    for (const guild of cache.guilds.values()) {
      totalMembers += guild.members.size;
    }

    const cachedContent = [
      `Total Guilds   : ${cache.guilds.size.toLocaleString()}`,
      `Total Members  : ${totalMembers.toLocaleString()}`,
      `Total Channels : ${cache.channels.size.toLocaleString()}`,
      `Total Messages : ${cache.messages.size.toLocaleString()}`,
    ];

    return basicInteractionResponse(
      interaction.id,
      interaction.token,
      [
        "**Cache Statistics**",
        "```swift",
        ...cachedContent,
        "```",
      ].join("\n"),
    );
  } else if (raw?.name === "profiler") {
    const formatSize = (size: number) => {
      const kb = size / 1024;
      const mb = kb / 1024;
      const gb = mb / 1024;

      if (kb < 1024) {
        return `${kb.toFixed(2)}KB`;
      } else if (kb > 1024 && mb < 1024) {
        return `${mb.toFixed(2)}MB`;
      } else {
        return `${gb.toFixed(2)}GB`;
      }
    };

    const memory = Deno.memoryUsage();

    return basicInteractionResponse(
      interaction.id,
      interaction.token,
      [
        "**Heap Statistics**",
        "```swift",
        `Heap Size : ${formatSize(memory.heapUsed)}/${
          formatSize(memory.heapTotal)
        }`,
        "```",
      ].join("\n"),
    );
  } else {
    return basicInteractionResponse(
      interaction.id,
      interaction.token,
      "Invalid usage.",
    );
  }
};

DebugCommand.options = {
  name: "debug",
  description: "No description available.",
  options: [
    {
      required: false,
      name: "cache",
      description: "No description available.",
      type: DiscordApplicationCommandOptionTypes.SubCommand,
    },
    {
      required: false,
      name: "profiler",
      description: "No Description available.",
      type: DiscordApplicationCommandOptionTypes.SubCommand,
    },
  ],
};

bot.commands.set(DebugCommand.options.name, DebugCommand);
