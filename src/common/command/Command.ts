import { DiscordenoMessage } from "../../../deps.ts";

interface Command<A = any[]> {
  (message: DiscordenoMessage, args: A): Promise<unknown> | unknown;
  defaultArguments?: Partial<A>;
}

export default Command;
