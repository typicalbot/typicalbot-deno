import { DiscordenoMessage } from "../../../deps.ts";

interface Command {
  (message: DiscordenoMessage): Promise<unknown> | unknown;
}

export default Command;
