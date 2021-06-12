import {
  ApplicationCommandOption,
  DiscordenoMessage,
  SlashCommandInteraction,
} from "../../../deps.ts";

// deno-lint-ignore no-explicit-any
interface Command<A = any[]> {
  (message: DiscordenoMessage, args: A): Promise<unknown> | unknown;
  slash?: SlashCommand;
  defaultArguments?: Partial<A>;
}

interface SlashCommand {
  (interaction: SlashCommandInteraction): Promise<unknown> | unknown;
  options?: ApplicationCommandOption;
}

export default Command;
