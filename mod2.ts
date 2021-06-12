import { EVENT_HANDLER_SECRET_KEY } from "./configs.ts";
import { camelize, GatewayPayload, handlers } from "./deps.ts";
import { bot } from "./src/cache.ts";

// Start listening on localhost.
const server = Deno.listen({ port: 8080 });
console.log(`HTTP webserver running.  Access it at:  http://localhost:8080/`);

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
      if (json.t && json.t !== "RESUMED") {
        // @ts-ignore our ws will forcefully add this
        const shardId = json.shardId;
        // When a guild or something isnt in cache this will fetch it before doing anything else
        await bot.events.dispatchRequirements?.(json, shardId);

        handlers[json.t]?.(json, shardId);
      }

      requestEvent.respondWith(
        new Response(JSON.stringify({ success: true }), {
          status: 200,
        }),
      );
    }
  })();
}