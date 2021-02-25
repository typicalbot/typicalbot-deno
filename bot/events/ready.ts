import { botCache } from "../cache.ts";
import { getApplicationInformation } from "../deps.ts";

/** Event handler for the READY event when bot is fully online. */
export async function ready(clusterID: number) {
  // TODO: Change to a logger  like winston. Deno has a logger built in and many deps as well.
  console.log(`Client Connected | Cluster ${clusterID}`);

  const application = await getApplicationInformation().catch(() =>
    // TODO: Use logger.debug
    console.log("Failed to load owners from application")
  );
  if (!application) return;

  // ADDS ALL TEAM MEMBERS AS OWNERS
  if (application.team)
    application.team.members.forEach((member) => {
      botCache.ownerIDs.add(member.user.id!);
    });

  // ADDS THE OWNER THEMSELF AS OWNER. THE SET WILL REMOVE IF REDUNDANT FROM TEAM.MEMBERS
  botCache.ownerIDs.add(application.owner.id!);
}
