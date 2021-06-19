import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";

const InviteCommand: Command = (interaction) => {
  return basicInteractionResponse(
    interaction.id,
    interaction.token,
    "You can invite TypicalBot at https://typicalbot.com/invite/deno.",
  );
};

InviteCommand.options = {
  name: "invite",
  description: "No description available.",
};

bot.commands.add(InviteCommand);
