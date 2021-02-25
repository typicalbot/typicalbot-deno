import { serve, ServerRequest } from "./deps.ts";
import configs from './configs.ts';

/** Begins an http server that will handle incoming requests. */
const server = serve({ port: configs.port });

for await (const request of server) {
  handlePayload(request).catch((error) => {
    // TODO: sentry
    console.log(error);
  });
}

/** Handler function for every request. Converts to json, and begins processing the request */
async function handlePayload(request: ServerRequest) {
  // INSTANTLY IGNORE ANY REQUESTS THAT DON'T HAVE THE SECRET AUTHORIZATION KEY
  const authorization = request.headers.get("authorization");
  if (authorization !== configs.authorization) return;

  // READ BUFFER AFTER AUTH CHECK
  const buffer = await Deno.readAll(request.body);

  try {
    // CONVERT THE BODY TO JSON
    const data = JSON.parse(new TextDecoder().decode(buffer));

    // TODO: PROCESS THE REQUEST
  } catch (error) {
    // TODO: sentry
    console.log(error);
  }
}
