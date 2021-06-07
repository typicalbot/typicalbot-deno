interface SystemUserBlacklist {
    _id: { $oid: string };
    userId: string;
    reason: string;
    createdAt: Date;
    updatedAt: Date;
}

export default SystemUserBlacklist;