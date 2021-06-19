<p align="center">
    <h1 align="center">TypicalBot</h1>
</p>
<p align="center">
    <a target="_blank" href="https://discord.gg/typicalbot"><img src="https://discordapp.com/api/guilds/163038706117115906/embed.png?style=shield" alt="Discord"></a>
    <a target="_blank" href="https://stackshare.io/typicalbot-llc/typicalbot"><img src="https://img.shields.io/badge/tech-stack-0690fa.svg?style=flat" alt="StackShare"></a>
</p>

## About TypicalBot

> **Note:** This repository contains the code to the new version of TypicalBot
> that is under development. If you are looking for the current version of
> TypicalBot, visit the main
> [repository](https://github.com/typicalbot/typicalbot).

A description about TypicalBot

## Table of Contents

- [Ecosystem](#ecosystem)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Security Vulnerabilities](#security-vulnerabilities)
- [License](#license)

## Ecosystem

| Project                                                                        | Language          | Description                                   |
| ------------------------------------------------------------------------------ | ----------------- | --------------------------------------------- |
| [rest proxy](https://github.com/typicalbot/typicalbot-deno/tree/main/src/rest) | TypeScript (Deno) | REST proxy to handle all Discord events.      |
| [gateway](https://github.com/typicalbot/typicalbot-deno/tree/main/src/gateway) | TypeScript (Deno) | Gateway connection to Discord.                |
| [internal-api](https://github.com/typicalbot/typicalbot-internal-api)          | Rust              | REST api to handle all calls to the database. |

## Getting Started

This section provides a quick-start guide

### Prerequisites

- [Deno](https://deno.land/): Deno 11.1 or newer is required.
- [Rust](https://www.rust-lang.org/): Rust 1.54 or newer is required
- [MongoDB](https://www.mongodb.com/): MongoDB 4.x or newer is required

### Installation

1. Ensure all prerequisites are installed.
2. Clone the repository, ie.
   `git clone https://github.com/typicalbot/typicalbot-deno.git`
3. Cache the dependencies, ie. `deno cache deps.ts`
4. Create an `.env` file using the example file, fill out the missing variables.
5. Run `deno run --unstable -A src/rest/mod.ts` to start the REST proxy.
6. In a separate terminal, run `deno run -A src/gateway/mod.ts` to start the
   Gateway.

## Security Vulnerabilities

Please review our
[security-policy](https://github.com/typicalbot/typicalbot-deno/security/policy)
on how to report security vulnerabilities.

## License

TypicalBot is an open source software licensed under the
[Apache 2.0 license](LICENSE).
