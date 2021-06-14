import {
  ApplicationCommandOption,
  DiscordenoMessage,
  Permission,
  SlashCommandInteraction,
} from "../../../deps.ts";

// deno-lint-ignore no-explicit-any
interface Command<A = any[]> {
  (message: DiscordenoMessage, args: A): Promise<unknown> | unknown;
  slash?: SlashCommand;
  options?: CommandOptions;
  defaultArguments?: Partial<A>;
}

interface CommandOptions {
  permissions?: {
    user?: Permission[];
    self?: Permission[];
  };
}

interface SlashCommand {
  (interaction: SlashCommandInteraction): Promise<unknown> | unknown;
  options?: ApplicationCommandOption;
}

export default Command;

export type { CommandOptions, SlashCommand };
