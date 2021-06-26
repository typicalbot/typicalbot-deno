FROM denoland/deno:1.11.0

WORKDIR /app

RUN addgroup -g 1001 -S deno
RUN adduser -S deno -u 1001

COPY --chown=deno:deno deps.ts ./
COPY --chown=deno:deno /src/config.ts ./src
COPY --chown=deno:deno /src/rest ./src/rest

USER deno

RUN deno cache deps.ts

ARG DISCORD_TOKEN
ENV DISCORD_TOKEN=${DISCORD_TOKEN}
ARG DISCORD_ID
ENV DISCORD_ID=${DISCORD_ID}
ENV EVENT_HANDLER_PORT=8080
ENV EVENT_HANDLER_URL="http://localhost:8080"
ARG EVENT_HANDLER_SECRET_KEY
ENV EVENT_HANDLER_SECRET_KEY=${EVENT_HANDLER_SECRET_KEY}

EXPOSE ${EVENT_HANDLER_PORT}

CMD [ "deno", "run", "--unstable", "-A", "src/rest/mod.ts" ]
