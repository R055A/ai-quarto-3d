import { type Dictionary, insert, select, t } from "intlayer";

/** The side panel: the piece currently in play, the trait legend and the binary board. */
const panelContent = {
  key: "panel",
  content: {
    piece: {
      inPlay: t({ en: "Piece in play", fr: "Pièce en jeu" }),
      none: t({ en: "None selected", fr: "Aucune sélection" }),
      traits: t({ en: "Piece traits", fr: "Caractéristiques des pièces" }),
      // Trait vocabulary, joined into a sentence fragment describing one piece.
      // Each trait is declared as a `select` over its named variants.
      color: select({
        black: t({ en: "black", fr: "noire" }),
        red: t({ en: "red", fr: "rouge" }),
      }),
      size: select({
        big: t({ en: "big", fr: "grande" }),
        small: t({ en: "small", fr: "petite" }),
      }),
      shape: select({
        round: t({ en: "round", fr: "ronde" }),
        square: t({ en: "square", fr: "carrée" }),
      }),
      fill: select({
        solid: t({ en: "solid", fr: "pleine" }),
        hollow: t({ en: "hollow", fr: "creuse" }),
      }),
    },

    board: {
      binary: t({ en: "Binary board", fr: "Plateau binaire" }),
      piecesPlaced: t({ en: "Placed pieces", fr: "Pièces placées" }),
      cellEmpty: insert(t({ en: "Cell {{cell}}: empty", fr: "Case {{cell}} : vide" })),
      cellPiece: insert(t({ en: "Cell {{cell}}: {{piece}}", fr: "Case {{cell}} : {{piece}}" })),
    },
  },
} satisfies Dictionary;

export default panelContent;
