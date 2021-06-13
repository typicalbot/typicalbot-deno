# TypicalBot

This version of TypicalBot is still under development. We will update the readme
with more information in the future. For those that are wondering how to run the
bot to contribute, you will need to open two terminals. The first one to run the
gateway and the second one to run the rest proxy. You may also need more
terminals if you are interacting with other parts of the bot process (such as
the database).

**Run the gateway** `deno run -A src/gateway/mod.ts`

**Run the rest proxy** `deno run --unstable -A mod.ts`

## License

TypicalBot is an open source software licensed under the
[Apache 2.0 license](LICENSE).
