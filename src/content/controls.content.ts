import { cond, type Dictionary, insert, select, t } from "intlayer";

/** Everything in the top control bar: field labels, option values and buttons. */
const controlsContent = {
  key: "controls",
  content: {
    diffAI: t({ en: "AI difficulty", fr: "Difficulté de l'IA" }),
    diffPlayerOneAI: t({ en: "AI-P1 difficulty", fr: "Difficulté IA-J1" }),
    diffPlayerTwoAI: t({ en: "AI-P2 difficulty", fr: "Difficulté IA-J2" }),
    startingPlayer: t({ en: "Starting player", fr: "Joueur qui commence" }),
    gameMode: t({ en: "Game mode", fr: "Mode de jeu" }),
    // `true` is the paused state, so the button offers to resume.
    toggleAI: cond({
      true: t({ en: "Resume AI", fr: "Reprendre l'IA" }),
      false: t({ en: "Pause AI", fr: "Mettre l'IA en pause" }),
    }),
    undo: t({ en: "Undo", fr: "Annuler" }),
    redo: t({ en: "Redo", fr: "Rétablir" }),

    // A `select` rather than an object read through `difficulty[diff]`: the case
    // resolution happens inside the call, so the build can still minify and purge.
    difficulty: select({
      easy: t({ en: "Easy", fr: "Facile" }),
      medium: t({ en: "Medium", fr: "Moyen" }),
      hard: t({ en: "Hard", fr: "Difficile" }),
    }),

    mode: {
      userVsUser: t({ en: "User vs user", fr: "Joueur contre joueur" }),
      userVsAI: t({ en: "User vs AI", fr: "Joueur contre IA" }),
      onlyAI: t({ en: "AI vs AI", fr: "IA contre IA" }),
    },

    language: {
      label: t({ en: "Language", fr: "Langue" }),
      search: t({ en: "Search a locale", fr: "Rechercher une langue" }),
      empty: t({ en: "No language found", fr: "Aucune langue trouvée" }),
      list: t({ en: "Language list", fr: "Liste des langues" }),
      switchTo: insert(
        t({
          en: "Switch to {{language}}",
          fr: "Basculer en {{language}}",
        }),
      ),
    },
  },
} satisfies Dictionary;

export default controlsContent;
