import { MongoClient } from "../../../deps.ts";
import SystemGuildBlacklist from "./schemas/system_guild_blacklist.ts";
import SystemUserBlacklist from "./schemas/system_user_blacklist.ts";
import GuildSettings from "./schemas/guild_settings.ts";

const client = new MongoClient();

// Connect to MongoDB Atlas
await client.connect({
  db: "",
  tls: true,
  servers: [
    {
      host: "",
      port: 27017,
    },
  ],
  credentials: {
    username: "",
    password: "",
    db: "",
    mechanism: "SCRAM-SHA-1",
  },
});

// Use database
const db = client.database("");

// Specify collections with schemas
const guildSettings = db.collection<GuildSettings>("guild_settings");
const systemGuildBlacklist = db.collection<SystemGuildBlacklist>(
  "system_guild_blacklist",
);
const systemUserBlacklist = db.collection<SystemUserBlacklist>(
  "system_user_blacklist",
);
