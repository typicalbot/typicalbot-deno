import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";

const PingCommand: Command = (interaction) => {
  return basicInteractionResponse(
    interaction.id,
    interaction.token,
    "Pong",
  );
};

PingCommand.options = {
  name: "ping",
  description: "Check to see if TypicalBot is online and responsive.",
};

bot.commands.set(PingCommand.options.name, PingCommand);
