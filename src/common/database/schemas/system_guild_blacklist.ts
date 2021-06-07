interface SystemGuildBlacklist {
  _id: { $oid: string };
  guildId: string;
  reason: string;
  createdAt: Date;
  updatedAt: Date;
}

export default SystemGuildBlacklist;
