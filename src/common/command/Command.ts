import { DiscordenoMessage, SlashCommandInteraction } from "../../../deps.ts";

interface Command<A = any[]> {
  (message: DiscordenoMessage, args: A): Promise<unknown> | unknown;
  slash?: SlashCommand;
  defaultArguments?: Partial<A>;
}

interface SlashCommand {
  (interaction: SlashCommandInteraction): Promise<unknown> | unknown;
}

export default Command;
