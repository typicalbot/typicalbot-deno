import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import { enTranslate } from "../../common/util/i18next.ts";

const VoteCommand: Command = (interaction) => {
  return basicInteractionResponse(
    interaction.id,
    interaction.token,
    "You can vote for TypicalBot at https://typicalbot.com/vote.",
  );
};

VoteCommand.options = {
  name: "vote",
  description: enTranslate("commands/general/vote:COMMAND_DESCRIPTION"),
};

bot.commands.add(VoteCommand);
