import { type Dictionary, t } from "intlayer";

/** Page-level chrome: document title, header and the GitHub source link. */
const appContent = {
  key: "app",
  content: {
    title: t({ en: "AI-Quarto 3D", fr: "AI-Quarto 3D" }),
    description: t({
      en: "Interactive 3D Quarto board game with a Negamax AI.",
      fr: "Jeu de plateau Quarto 3D interactif avec une IA Negamax.",
    }),
    eyebrow: t({
      en: "A ported enhancement of Uni-Git-Projects/UU-Game (game engine)",
      fr: "Une amélioration portée de Uni-Git-Projects/UU-Game (moteur de jeu)",
    }),
    newGame: t({ en: "New game", fr: "Nouvelle partie" }),
    sourceLink: t({ en: "View source on GitHub", fr: "Voir le code source sur GitHub" }),
  },
} satisfies Dictionary;

export default appContent;
