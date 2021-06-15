import {
  ApplicationCommandOption,
  DiscordenoMember,
  DiscordenoMessage,
  Permission,
  SlashCommandInteraction,
} from "../../../deps.ts";

// deno-lint-ignore no-explicit-any
interface Command<A = any[]> {
  (message: DiscordenoMessage, args: A): Promise<unknown> | unknown;
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
  enabled?: boolean;
  guild?: boolean;
  global?: boolean;
  advanced?: boolean;
  options?: ApplicationCommandOption[];
  execute: (interaction: Omit<SlashCommandInteraction, "member">, member?: DiscordenoMember) => Promise<unknown> | unknown;
}

export default Command;

export type { CommandOptions, SlashCommand };
