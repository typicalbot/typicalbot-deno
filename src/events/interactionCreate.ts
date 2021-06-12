import { bot } from "../cache.ts";
import {
  DiscordenoMember,
  DiscordInteractionTypes,
  Interaction,
  SlashCommandInteraction,
} from "../../deps.ts";

const InteractionCreate = (data: Interaction, member?: DiscordenoMember) => {
  // Slash command was executed
  if (data.type === DiscordInteractionTypes.ApplicationCommand) {
    // Grab name of slash command
    const name = (data as SlashCommandInteraction).data?.name;

    if (!name) return;

    // Check to see if command is in cache
    const command = bot.commands.get(name);

    if (!command) return;

    // Run slash execution
    command.slash?.(data as SlashCommandInteraction);
  }
};

bot.events.interactionCreate = InteractionCreate;
