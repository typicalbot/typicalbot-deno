import Command from "../common/command/Command.ts";

const DiceCommand: Command = (message, args) => {
  // syntax: XdY
  // X = number of dices
  // Y = number of sides per dice
  let [dices, sides] = args.shift().split("d");

  // convert to number
  dices = +dices;
  sides = +sides;

  if (dices < 2) {
    return message.send("There must be at least two dice.");
  }

  if (sides < 2) {
    return message.send("There must be at least two sides.");
  }

  // roll X dices between 1..sides
  // return X rolls & sum
  // TODO: Simplify?
  const rolls = [];

  for (let i = 0; i < dices; i++) {
    rolls.push(rollDice(sides));
  }

  const sum = rolls.reduce((a, b) => a + b, 0);

  return message.send(`You rolled: ${rolls.join(", ")}. Total: ${sum}`);
};

const rollDice = (sides: number): number => {
  sides = Math.max(sides, 1);
  return Math.floor(Math.random() * (sides - 1 + 1)) + 1;
};

DiceCommand.defaultArguments = [
  "2d6",
];

export default DiceCommand;
