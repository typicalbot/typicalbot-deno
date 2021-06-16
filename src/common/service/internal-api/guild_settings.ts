import { bot } from "../../../cache.ts";
import { INTERNAL_API } from "../../../../config.ts";

type GuildLanguage = "en-US";

type GuildTimezone = "UTC";

interface GuildSettings {
  guildId: string;
  prefix: string;
  language: GuildLanguage;
  timezone: GuildTimezone;
}

const postGuildSettings = async (payload: GuildSettings) => {
  const response = await fetch(`${INTERNAL_API}/guild_settings`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  // Failed to create guild settings
  if (response.status !== 201) {
    throw Error(`Failed to create guild settings for ${payload.guildId}`);
  }

  // Add guild settings to our cache
  bot.guildSettings.set(BigInt(payload.guildId), payload);
};

const putGuildSettings = async (id: bigint, payload: GuildSettings) => {
  const response = await fetch(`${INTERNAL_API}/guild_settings/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  // Failed to update guild settings
  if (response.status !== 200) {
    throw Error(`Failed to update guild settings for ${id}`);
  }

  // Update guild settings in our cache
  bot.guildSettings.set(id, payload);
};

const deleteGuildSettings = async (id: bigint) => {
  const response = await fetch(`${INTERNAL_API}/guild_settings/${id}`, {
    method: "DELETE",
  });

  // Failed to delete guild settings
  if (response.status !== 204) {
    throw Error(`Failed to delete guild settings for ${id}`);
  }

  // Remove guild settings from our cache if exists in our cache
  if (bot.guildSettings.has(id)) {
    bot.guildSettings.delete(id);
  }
};

const getGuildSettings = async (
  id: bigint,
): Promise<GuildSettings> => {
  const response = await fetch(`${INTERNAL_API}/guild_settings/${id}`, {
    method: "GET",
  });

  // Failed to get guild settings
  if (response.status !== 200) {
    throw Error(`Failed to get guild settings for ${id}`);
  }

  // Parse JSON response
  const json = await response.json();
  // Convert JSON to GuildSettings type
  const guildSettings = json as GuildSettings;

  // Add guild settings to our cache
  bot.guildSettings.set(id, guildSettings);

  return guildSettings;
};

export {
  deleteGuildSettings,
  getGuildSettings,
  postGuildSettings,
  putGuildSettings,
};

export type { GuildLanguage, GuildSettings, GuildTimezone };
