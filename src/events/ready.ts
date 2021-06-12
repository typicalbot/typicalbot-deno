import { bot } from "../cache.ts";

const Ready = () => {
  console.log(`Loaded ${bot.commands.size} commands`);
  console.log(`Loaded ${Object.keys(bot.events).length} events`);
};

bot.events.ready = Ready;
