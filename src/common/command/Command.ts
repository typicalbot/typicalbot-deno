import {
  ApplicationCommandOption,
  DiscordenoMember,
  SlashCommandInteraction,
} from "../../../deps.ts";

interface Command {
  name: string;
  description: string;
  options?: ApplicationCommandOption[];
  execute: (
    interaction: Omit<SlashCommandInteraction, "member">,
    member?: DiscordenoMember,
  ) => Promise<unknown> | unknown;
}

export default Command;
