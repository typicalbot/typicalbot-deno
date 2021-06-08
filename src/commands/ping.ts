import Command from "../common/command/Command.ts";

const PingCommand: Command = (message) => {
  return message.send(`Pong! MS: ${Date.now() - message.timestamp}ms`);
};

export default PingCommand;
