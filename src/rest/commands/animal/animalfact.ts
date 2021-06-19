import Command, {
  basicInteractionResponse,
} from "../../common/command/Command.ts";
import { bot } from "../../cache.ts";
import { DiscordApplicationCommandOptionTypes } from "../../../../deps.ts";
import { enTranslate } from "../../common/util/i18next.ts";

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
  description: enTranslate("commands/animal/animalfact:COMMAND_DESCRIPTION"),
  options: [
    {
      required: false,
      name: "bird",
      description: enTranslate(
        "commands/animal/animalfact:SUBCOMMAND_DESCRIPTION_BIRD",
      ),
      type: DiscordApplicationCommandOptionTypes.SubCommand,
    },
    {
      required: false,
      name: "cat",
      description: enTranslate(
        "commands/animal/animalfact:SUBCOMMAND_DESCRIPTION_CAT",
      ),
      type: DiscordApplicationCommandOptionTypes.SubCommand,
    },
    {
      required: false,
      name: "dog",
      description: enTranslate(
        "commands/animal/animalfact:SUBCOMMAND_DESCRIPTION_DOG",
      ),
      type: DiscordApplicationCommandOptionTypes.SubCommand,
    },
    {
      required: false,
      name: "elephant",
      description: enTranslate(
        "commands/animal/animalfact:SUBCOMMAND_DESCRIPTION_ELEPHANT",
      ),
      type: DiscordApplicationCommandOptionTypes.SubCommand,
    },
    {
      required: false,
      name: "fox",
      description: enTranslate(
        "commands/animal/animalfact:SUBCOMMAND_DESCRIPTION_FOX",
      ),
      type: DiscordApplicationCommandOptionTypes.SubCommand,
    },
    {
      required: false,
      name: "kangaroo",
      description: enTranslate(
        "commands/animal/animalfact:SUBCOMMAND_DESCRIPTION_KANGAROO",
      ),
      type: DiscordApplicationCommandOptionTypes.SubCommand,
    },
    {
      required: false,
      name: "koala",
      description: enTranslate(
        "commands/animal/animalfact:SUBCOMMAND_DESCRIPTION_KOALA",
      ),
      type: DiscordApplicationCommandOptionTypes.SubCommand,
    },
    {
      required: false,
      name: "panda",
      description: enTranslate(
        "commands/animal/animalfact:SUBCOMMAND_DESCRIPTION_PANDA",
      ),
      type: DiscordApplicationCommandOptionTypes.SubCommand,
    },
    {
      required: false,
      name: "raccoon",
      description: enTranslate(
        "commands/animal/animalfact:SUBCOMMAND_DESCRIPTION_RACCOON",
      ),
      type: DiscordApplicationCommandOptionTypes.SubCommand,
    },
    {
      required: false,
      name: "whale",
      description: enTranslate(
        "commands/animal/animalfact:SUBCOMMAND_DESCRIPTION_WHALE",
      ),
      type: DiscordApplicationCommandOptionTypes.SubCommand,
    },
  ],
};

bot.commands.add(AnimalFactCommand);
