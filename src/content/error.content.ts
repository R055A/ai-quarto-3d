import { type Dictionary, t } from "intlayer";

const errorContent = {
  key: "error",
  content: {
    renderingStatus: t({
      en: "3D rendering is unavailable.",
      fr: "Le rendu 3D est indisponible.",
    }),
    renderingMsg: t({
      en: "Enable WebGL and hardware acceleration in the browser.",
      fr: "Activez WebGL et l'accélération matérielle dans le navigateur.",
    }),
    webglHeading: t({
      en: "WebGL could not start.",
      fr: "WebGL n'a pas pu démarrer.",
    }),
    webglMsg: t({
      en: "The game requires WebGL to be enabled in the browser.",
      fr: "Le jeu nécessite que WebGL soit activé dans le navigateur.",
    }),
  },
} satisfies Dictionary;

export default errorContent;
