import {
  DISCORD_ID,
  DISCORD_TOKEN,
  EVENT_HANDLER_PORT,
  EVENT_HANDLER_SECRET_KEY,
} from "./config.ts";
import {
  camelize,
  GatewayPayload,
  getApplicationInfo,
  handlers,
  rest,
  setApplicationId,
  setBotId,
  updateEventHandlers,
  upsertSlashCommands,
} from "../deps.ts";
import { bot } from "./cache.ts";
import { fileLoader, importDirectory } from "./common/util/loader.ts";
import { loadLanguages } from "./common/util/i18next.ts";

// Ensure to load languages before registering commands
await loadLanguages();

// Load commands and events
await Promise.all([
  "./packages/typicalbot-rest/src/commands",
  "./packages/typicalbot-rest/src/events",
].map((path) => importDirectory(Deno.realPathSync(path))));

await fileLoader();

// Setup event handlers internally so when events come in below it uses our events
updateEventHandlers(bot.events);

// Prepare the `rest` system to work
rest.token = `Bot ${DISCORD_TOKEN}`;
// Manually set botId and applicationId as ready event not emitted
setBotId(DISCORD_ID!);
setApplicationId(DISCORD_ID!);
// TODO: Remove this once Discordeno has a helper function for this
// Manually add application owners
const applicationInfo = await getApplicationInfo();

if (applicationInfo) {
  if (applicationInfo.team) {
    applicationInfo.team.members.forEach((m) =>
      bot.applicationOwners.push(m.user.id)
    );
  } else {
    bot.applicationOwners.push(applicationInfo.owner!.id!);
  }
}
// Manually upsert slash commands as ready event not emitted
const globalCommands = [];

for (const command of bot.commands.values()) {
  globalCommands.push(command.options);
}

if (globalCommands.length) {
  console.log(`Upserting ${globalCommands.length} slash commands.`);
  await upsertSlashCommands(globalCommands);
}

// Start listening on localhost.
const server = Deno.listen({ port: parseInt(EVENT_HANDLER_PORT!) });
console.log(
  `HTTP webserver running.  Access it at:  http://localhost:${EVENT_HANDLER_PORT}/`,
);

// Connections to the server will be yielded up as an async iterable.
for await (const conn of server) {
  // In order to not be blocking, we need to handle each connection individually
  // in its own async function.
  (async () => {
    // This "upgrades" a network connection into an HTTP connection.
    const httpConn = Deno.serveHttp(conn);
    // Each request sent over the HTTP connection will be yielded as an async
    // iterator from the HTTP connection.
    for await (const requestEvent of httpConn) {
      if (
        !EVENT_HANDLER_SECRET_KEY ||
        EVENT_HANDLER_SECRET_KEY !==
          requestEvent.request.headers.get("AUTHORIZATION")
      ) {
        return requestEvent.respondWith(
          new Response(JSON.stringify({ error: "Invalid secret key." }), {
            status: 200,
          }),
        );
      }

      const json = camelize<GatewayPayload>(await requestEvent.request.json());
      // @ts-ignore type error
      if (json.data.t && json.data.t !== "RESUMED") {
        // @ts-ignore our ws will forcefully add this
        const shardId = json.shardId;
        // When a guild or something isnt in cache this will fetch it before doing anything else
        // @ts-ignore type error
        await bot.events.dispatchRequirements?.(json.data, shardId);

        // @ts-ignore type error
        handlers[json.data.t]?.(json.data, shardId);
      }

      requestEvent.respondWith(
        new Response(JSON.stringify({ success: true }), {
          status: 200,
        }),
      );
    }
  })();
}
