import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import { DiscordApplicationCommandOptionTypes } from "../../../../deps.ts";

const AnimalFactCommand: Command = (interaction) => {
  const raw = interaction.data?.options?.[0];

  const base = "https://some-random-api.ml/facts";

  if (raw?.name === "bird") {
    return fetch(`${base}/birb`)
      .then((res) => res.json())
      .then((json) =>
        basicInteractionResponse(interaction.id, interaction.token, json.fact)
      )
      .catch(() =>
        basicInteractionResponse(
          interaction.id,
          interaction.token,
          "Failed to query from API.",
        )
      );
  } else if (raw?.name === "cat") {
    return fetch(`${base}/cat`)
      .then((res) => res.json())
      .then((json) =>
        basicInteractionResponse(interaction.id, interaction.token, json.fact)
      )
      .catch(() =>
        basicInteractionResponse(
          interaction.id,
          interaction.token,
          "Failed to query from API.",
        )
      );
  } else if (raw?.name === "dog") {
    return fetch(`${base}/dog`)
      .then((res) => res.json())
      .then((json) =>
        basicInteractionResponse(interaction.id, interaction.token, json.fact)
      )
      .catch(() =>
        basicInteractionResponse(
          interaction.id,
          interaction.token,
          "Failed to query from API.",
        )
      );
  } else if (raw?.name === "elephant") {
    return fetch(`${base}/elephant`)
      .then((res) => res.json())
      .then((json) =>
        basicInteractionResponse(interaction.id, interaction.token, json.fact)
      )
      .catch(() =>
        basicInteractionResponse(
          interaction.id,
          interaction.token,
          "Failed to query from API.",
        )
      );
  } else if (raw?.name === "fox") {
    return fetch(`${base}/fox`)
      .then((res) => res.json())
      .then((json) =>
        basicInteractionResponse(interaction.id, interaction.token, json.fact)
      )
      .catch(() =>
        basicInteractionResponse(
          interaction.id,
          interaction.token,
          "Failed to query from API.",
        )
      );
  } else if (raw?.name === "kangaroo") {
    return fetch(`${base}/kangaroo`)
      .then((res) => res.json())
      .then((json) =>
        basicInteractionResponse(interaction.id, interaction.token, json.fact)
      )
      .catch(() =>
        basicInteractionResponse(
          interaction.id,
          interaction.token,
          "Failed to query from API.",
        )
      );
  } else if (raw?.name === "koala") {
    return fetch(`${base}/koala`)
      .then((res) => res.json())
      .then((json) =>
        basicInteractionResponse(interaction.id, interaction.token, json.fact)
      )
      .catch(() =>
        basicInteractionResponse(
          interaction.id,
          interaction.token,
          "Failed to query from API.",
        )
      );
  } else if (raw?.name === "panda") {
    return fetch(`${base}/panda`)
      .then((res) => res.json())
      .then((json) =>
        basicInteractionResponse(interaction.id, interaction.token, json.fact)
      )
      .catch(() =>
        basicInteractionResponse(
          interaction.id,
          interaction.token,
          "Failed to query from API.",
        )
      );
  } else if (raw?.name === "raccoon") {
    return fetch(`${base}/racoon`)
      .then((res) => res.json())
      .then((json) =>
        basicInteractionResponse(interaction.id, interaction.token, json.fact)
      )
      .catch(() =>
        basicInteractionResponse(
          interaction.id,
          interaction.token,
          "Failed to query from API.",
        )
      );
  } else if (raw?.name === "whale") {
    return fetch(`${base}/whale`)
      .then((res) => res.json())
      .then((json) =>
        basicInteractionResponse(interaction.id, interaction.token, json.fact)
      )
      .catch(() =>
        basicInteractionResponse(
          interaction.id,
          interaction.token,
          "Failed to query from API.",
        )
      );
  } else {
    return basicInteractionResponse(
      interaction.id,
      interaction.token,
      "Invalid usage.",
    );
  }
};

AnimalFactCommand.options = {
  name: "animalfact",
  description: "No description available.",
  options: [
    {
      required: false,
      name: "bird",
      description: "No description available.",
      type: DiscordApplicationCommandOptionTypes.SubCommand,
    },
    {
      required: false,
      name: "cat",
      description: "No description available.",
      type: DiscordApplicationCommandOptionTypes.SubCommand,
    },
    {
      required: false,
      name: "dog",
      description: "No description available.",
      type: DiscordApplicationCommandOptionTypes.SubCommand,
    },
    {
      required: false,
      name: "elephant",
      description: "No description available.",
      type: DiscordApplicationCommandOptionTypes.SubCommand,
    },
    {
      required: false,
      name: "fox",
      description: "No description available.",
      type: DiscordApplicationCommandOptionTypes.SubCommand,
    },
    {
      required: false,
      name: "kangaroo",
      description: "No description available.",
      type: DiscordApplicationCommandOptionTypes.SubCommand,
    },
    {
      required: false,
      name: "koala",
      description: "No description available.",
      type: DiscordApplicationCommandOptionTypes.SubCommand,
    },
    {
      required: false,
      name: "panda",
      description: "No description available.",
      type: DiscordApplicationCommandOptionTypes.SubCommand,
    },
    {
      required: false,
      name: "raccoon",
      description: "No description available.",
      type: DiscordApplicationCommandOptionTypes.SubCommand,
    },
    {
      required: false,
      name: "whale",
      description: "No description available.",
      type: DiscordApplicationCommandOptionTypes.SubCommand,
    },
  ],
};

bot.commands.set(AnimalFactCommand.options.name, AnimalFactCommand);
