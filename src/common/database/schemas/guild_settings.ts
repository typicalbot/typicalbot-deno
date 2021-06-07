type GuildLanguage = 'en-US';

type GuildTimezone = 'UTC';

interface GuildSettings {
    _id: { $oid: string };
    guildId: string;
    prefix: string;
    language: GuildLanguage;
    timezone: GuildTimezone;
    createdAt: Date;
    updatedAt: Date;
}

export default GuildSettings;
export type {
    GuildLanguage,
    GuildTimezone
};