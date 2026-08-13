import { cond, type Dictionary, insert, select, t } from "intlayer";

/**
 * Every branch the status bar can take is declared here as a `cond`/`select`
 * node rather than as a ternary in the view, so a call site reads as one
 * lookup driven by a named discriminant.
 *
 * - `cond(isUserTurn)`: `true` is the human seat facing an AI, `false` a named seat.
 * - `cond(isOpeningTurn)`: `true` is the opening move, where no piece has been passed yet.
 * - `select(victoryKind)`: who won, in the vocabulary the current game mode uses.
 */
const statusContent = {
  key: "status",
  content: {
    badgeDraw: t({ en: "Draw", fr: "Match nul" }),
    badgeTurnAI: insert(t({ en: "{{player}}'s turn", fr: "Tour de {{player}}" })),
    badgeTurnPlace: cond({
      true: insert(
        t({
          en: "Your turn: place a piece",
          fr: "À vous : placez une pièce",
        }),
      ),
      false: insert(
        t({
          en: "{{player}}'s turn: place a piece",
          fr: "Tour de {{player}} : placer une pièce",
        }),
      ),
    }),
    badgeTurnSelect: cond({
      true: insert(
        t({
          en: "Your turn: select a piece",
          fr: "À vous : choisissez une pièce",
        }),
      ),
      false: insert(
        t({
          en: "{{player}}'s turn: select a piece",
          fr: "Tour de {{player}} : choisir une pièce",
        }),
      ),
    }),
    badgeVictory: select({
      you: insert(t({ en: "Victory", fr: "Victoire" })),
      ai: insert(t({ en: "AI victory", fr: "Victoire de l'IA" })),
      player: insert(t({ en: "{{player}} victory", fr: "Victoire de {{player}}" })),
    }),
    detailDraw: t({
      en: "No moves remain to make a winning line.",
      fr: "Il ne reste aucun coup permettant d'aligner une ligne gagnante.",
    }),
    detailTurnAI: cond({
      true: insert(
        t({
          en: "The selected piece will be passed to {{opponent}}.",
          fr: "La pièce choisie sera transmise à {{opponent}}.",
        }),
      ),
      false: insert(
        t({
          en: "{{player}} is placing a piece and then selecting a new piece for {{opponent}}.",
          fr: "{{player}} place une pièce puis choisit une nouvelle pièce pour {{opponent}}.",
        }),
      ),
    }),
    detailTurnPlace: t({
      en: "Click any highlighted board circle.",
      fr: "Cliquez sur un cercle surligné du plateau.",
    }),
    detailTurnSelect: t({
      en: "Select any available red or black piece.",
      fr: "Choisissez une pièce rouge ou noire disponible.",
    }),
    detailWin: t({
      en: "The winning piece sequence(s) is highlighted.",
      fr: "La ou les séquences de pièces gagnantes sont surlignées.",
    }),
    statusDraw: t({ en: "The game is a draw.", fr: "La partie est nulle." }),
    statusTurnOpponent: cond({
      true: insert(
        t({
          en: "{{player}} is choosing the opening piece.",
          fr: "{{player}} choisit la pièce d'ouverture.",
        }),
      ),
      false: insert(t({ en: "{{player}} is playing...", fr: "{{player}} joue..." })),
    }),
    statusTurnPlayerPlace: cond({
      true: insert(
        t({
          en: "Place the piece {{opponent}} has selected.",
          fr: "Placez la pièce choisie par {{opponent}}.",
        }),
      ),
      false: insert(
        t({
          en: "{{player}}: place the received piece.",
          fr: "{{player}} : placez la pièce reçue.",
        }),
      ),
    }),
    statusTurnPlayerSelect: cond({
      true: insert(
        t({
          en: "Select a piece for {{opponent}} to place.",
          fr: "Choisissez une pièce que {{opponent}} devra placer.",
        }),
      ),
      false: insert(
        t({
          en: "{{player}}: select a piece for {{opponent}} to place.",
          fr: "{{player}} : choisissez une pièce que {{opponent}} devra placer.",
        }),
      ),
    }),
    statusWin: select({
      you: insert(t({ en: "You win.", fr: "Vous remportez la partie." })),
      ai: insert(t({ en: "The AI player wins.", fr: "L'IA remporte la partie." })),
      player: insert(t({ en: "{{player}} wins.", fr: "{{player}} remporte la partie." })),
    }),
    thinkingAI: cond({
      true: t({ en: "AI is paused", fr: "L'IA est en pause" }),
      false: t({ en: "AI is playing", fr: "L'IA joue" }),
    }),
  },
} satisfies Dictionary;

export default statusContent;
