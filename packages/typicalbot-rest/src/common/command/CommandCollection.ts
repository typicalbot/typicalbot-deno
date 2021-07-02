import { Collection } from "../../../deps.ts";
import Command from "./Command.ts";

class CommandCollection extends Collection<string, Command> {
  add(command: Command) {
    super.set(command.options.name, command);
  }
}

export default CommandCollection;
