import { Collection, EventHandlers } from "../deps.ts";
import Command from "./common/command/Command.ts";

export const bot = {
  commands: new Collection<string, Command>(),
  events: {} as EventHandlers,
};
