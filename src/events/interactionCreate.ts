import { bot } from "../cache.ts";
import { DiscordenoMember, Interaction, isSlashCommand } from "../../deps.ts";

const InteractionCreate = (data: Interaction, member?: DiscordenoMember) => {
  // Slash command was executed
  if (isSlashCommand(data)) {
    // Grab name of slash command
    const name = data.data?.name;

    if (!name) return;

    // Check to see if command is in cache
    const command = bot.commands.get(name);

    if (!command) return;

    // Run slash execution
    command(data, member);
  }
};

bot.events.interactionCreate = InteractionCreate;
