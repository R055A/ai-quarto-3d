import { type Dictionary, insert, select, t } from "intlayer";

/**
 * A seat name depends on the game mode and on which seat it is, so it is
 * declared as a `select` over the mode holding a `select` over the turn.
 * The view resolves both in one call instead of branching per mode.
 */
const playerContent = {
  key: "player",
  content: {
    playerName: select({
      "human-human": select({
        player1: insert(t({ en: "Player 1", fr: "Joueur 1" })),
        player2: insert(t({ en: "Player 2", fr: "Joueur 2" })),
      }),
      "human-ai": select({
        player1: insert(t({ en: "You", fr: "Vous" })),
        player2: insert(t({ en: "AI ({{difficulty}})", fr: "IA ({{difficulty}})" })),
      }),
      "ai-ai": select({
        player1: insert(t({ en: "AI-P1 ({{difficulty}})", fr: "IA-J1 ({{difficulty}})" })),
        player2: insert(t({ en: "AI-P2 ({{difficulty}})", fr: "IA-J2 ({{difficulty}})" })),
      }),
    }),
    playerRandom: t({ en: "Random", fr: "Aléatoire" }),
  },
} satisfies Dictionary;

export default playerContent;
