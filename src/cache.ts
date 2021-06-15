import { Collection, EventHandlers } from "../deps.ts";
import Command, { SlashCommand } from "./common/command/Command.ts";
import type { GuildSettings } from "./common/util/internal-api/guild_settings.ts";

export const bot = {
  commands: new Collection<string, Command>(),
  slashCommands: new Collection<string, SlashCommand>(),
  events: {} as EventHandlers,
  guildSettings: new Collection<bigint, GuildSettings>(),
};
