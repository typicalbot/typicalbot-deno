import { Collection, EventHandlers } from "../../deps.ts";
import CommandCollection from "./common/command/CommandCollection.ts";
import type { GuildSettings } from "./common/service/internal-api/guild_settings.ts";

export const bot = {
  commands: new CommandCollection(),
  events: {} as EventHandlers,
  guildSettings: new Collection<bigint, GuildSettings>(),
  applicationOwners: [] as string[]
};
