import Command from "../common/command/Command.ts";

const PingCommand: Command = (message) => {
  return message.send("Pong!");
};

export default PingCommand;
