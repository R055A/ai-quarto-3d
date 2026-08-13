import "./style.scss";
import { getHTMLTextDir, getLocaleName, type LocalesValues } from "intlayer";
import { installIntlayer, useIntlayer, useLocale } from "vanilla-intlayer";
import { GameScene } from "./render/GameScene";
import GameController from "./ui/GameController";

installIntlayer();

function requiredElement<T extends Element = HTMLElement>(id: string): T {
  const element: T | null = document.querySelector<T>(`#${id}`);
  if (element === null) {
    throw new Error(`Missing required element #${id}`);
  }
  return element;
}

const canvas: HTMLCanvasElement =
  requiredElement<HTMLCanvasElement>("game-canvas");
const status: HTMLElement = requiredElement("status");
const detail: HTMLElement = requiredElement("detail");
const thinking: HTMLElement = requiredElement("thinking");

/**
 * Write every label the static shell owns.
 *
 * Each dictionary is read through a plain member-access chain: that is what
 * lets the production build purge the fields no screen reads and rename the
 * ones it keeps.
 */
function renderLabels(): void {
  const { locale } = useLocale();
  const app = useIntlayer("app");
  const controls = useIntlayer("controls");
  const { piece, board } = useIntlayer("panel");

  document.documentElement.lang = locale;
  document.documentElement.dir = getHTMLTextDir(locale);
  document.title = app.title;
  requiredElement<HTMLMetaElement>("meta-description").content =
    app.description;

  requiredElement("app-title").textContent = app.title;
  requiredElement("eyebrow").textContent = app.eyebrow;
  requiredElement("new-game").textContent = app.newGame;
  requiredElement("source-link").title = app.sourceLink;
  requiredElement("source-link").setAttribute("aria-label", app.sourceLink);

  requiredElement("diff-label").textContent = controls.diffAI;
  requiredElement("diff-easy").textContent = controls.difficulty("easy");
  requiredElement("diff-medium").textContent = controls.difficulty("medium");
  requiredElement("diff-hard").textContent = controls.difficulty("hard");

  requiredElement("diff-p-one-label").textContent = controls.diffPlayerOneAI;
  requiredElement("diff-p-one-easy").textContent = controls.difficulty("easy");
  requiredElement("diff-p-one-medium").textContent =
    controls.difficulty("medium");
  requiredElement("diff-p-one-hard").textContent = controls.difficulty("hard");

  requiredElement("diff-p-two-label").textContent = controls.diffPlayerTwoAI;
  requiredElement("diff-p-two-easy").textContent = controls.difficulty("easy");
  requiredElement("diff-p-two-medium").textContent =
    controls.difficulty("medium");
  requiredElement("diff-p-two-hard").textContent = controls.difficulty("hard");

  requiredElement("starter-label").textContent = controls.startingPlayer;

  requiredElement("game-mode-label").textContent = controls.gameMode;
  requiredElement("game-mode-user-vs-user").textContent =
    controls.mode.userVsUser;
  requiredElement("game-mode-user-vs-ai").textContent = controls.mode.userVsAI;
  requiredElement("game-mode-only-ai").textContent = controls.mode.onlyAI;

  requiredElement("language-toggle").title = controls.language.label;
  requiredElement("language-toggle").setAttribute(
    "aria-label",
    controls.language.label,
  );
  requiredElement("language-current").textContent = locale.toUpperCase();
  requiredElement<HTMLInputElement>("language-search").placeholder =
    controls.language.search;
  requiredElement("language-search").setAttribute(
    "aria-label",
    controls.language.search,
  );
  requiredElement("language-list").setAttribute(
    "aria-label",
    controls.language.list,
  );
  requiredElement("language-empty").textContent = controls.language.empty;

  requiredElement("piece-in-play").textContent = piece.inPlay;
  requiredElement("piece-traits").textContent = piece.traits;
  requiredElement("trait-black").textContent = piece.color("black");
  requiredElement("trait-red").textContent = piece.color("red");
  requiredElement("trait-big").textContent = piece.size("big");
  requiredElement("trait-small").textContent = piece.size("small");
  requiredElement("trait-round").textContent = piece.shape("round");
  requiredElement("trait-square").textContent = piece.shape("square");
  requiredElement("trait-solid").textContent = piece.fill("solid");
  requiredElement("trait-hollow").textContent = piece.fill("hollow");

  requiredElement("bin-board-title").textContent = board.binary;
  requiredElement("bin-board-subtitle").textContent = board.piecesPlaced;
}

/**
 * Fill the locale list, keeping only the entries matching the search box.
 *
 * Each row shows the locale's endonym, its name in the active locale and its
 * code — all three resolved by `getLocaleName`, so adding a locale to
 * `intlayer.config.ts` is enough to make it appear here.
 */
function renderLocaleList(): void {
  const { language } = useIntlayer("controls");
  const { locale, availableLocales, setLocale } = useLocale();
  const query: string = requiredElement<HTMLInputElement>("language-search")
    .value.trim()
    .toLowerCase();

  const matches: LocalesValues[] = availableLocales.filter(
    (available: LocalesValues): boolean =>
      [
        String(available),
        getLocaleName(available, available),
        getLocaleName(available, locale),
      ].some((label: string): boolean => label.toLowerCase().includes(query)),
  );

  requiredElement("language-list").replaceChildren(
    ...matches.map((available: LocalesValues): HTMLLIElement => {
      const translatedName: string = getLocaleName(available, locale);

      const endonym: HTMLSpanElement = document.createElement("span");
      endonym.lang = String(available);
      endonym.dir = getHTMLTextDir(available);
      endonym.textContent = getLocaleName(available, available);

      const translated: HTMLSpanElement = document.createElement("span");
      translated.className = "lang-translated";
      translated.textContent = translatedName;

      const names: HTMLSpanElement = document.createElement("span");
      names.className = "lang-names";
      names.append(endonym, translated);

      const code: HTMLSpanElement = document.createElement("span");
      code.className = "lang-code";
      code.textContent = String(available).toUpperCase();

      const option: HTMLButtonElement = document.createElement("button");
      option.type = "button";
      option.className = "lang-option";
      option.setAttribute(
        "aria-label",
        language.switchTo({ language: translatedName }),
      );
      if (available === locale) option.setAttribute("aria-current", "true");
      option.append(names, code);
      option.addEventListener("click", (): void => {
        setLocale(available);
        toggleLocalePanel(false);
      });

      const item: HTMLLIElement = document.createElement("li");
      item.append(option);
      return item;
    }),
  );

  requiredElement("language-empty").hidden = matches.length > 0;
}

function toggleLocalePanel(isOpen: boolean): void {
  requiredElement("language-panel").hidden = !isOpen;
  requiredElement("language-toggle").setAttribute(
    "aria-expanded",
    String(isOpen),
  );
  if (!isOpen) return;

  const search: HTMLInputElement =
    requiredElement<HTMLInputElement>("language-search");
  search.value = "";
  renderLocaleList();
  search.focus();
}

function showStartupErr(error: unknown): void {
  const content = useIntlayer("error");

  thinking.hidden = true;
  canvas.hidden = true;

  status.textContent = content.renderingStatus;
  detail.textContent = content.renderingMsg;

  const fallback: HTMLDivElement = document.createElement("div");
  const heading: HTMLElement = document.createElement("strong");
  const message: HTMLSpanElement = document.createElement("span");

  fallback.className = "webgl-error";
  heading.textContent = content.webglHeading;
  message.textContent = content.webglMsg;
  fallback.append(heading, message);
  canvas.parentElement?.append(fallback);

  console.error(error);
}

function startGame(): void {
  let controller!: GameController;
  const scene = new GameScene(canvas, {
    onCellClick: (cell: number): void => controller.handleCellClick(cell),
    onPieceClick: (piece: number): void => controller.handlePieceClick(piece),
    onPieceHover: (piece: number | null): void =>
      controller.handlePieceHover(piece),
  });

  controller = new GameController(scene, {
    binCells: [...document.querySelectorAll<HTMLElement>("[data-binary-cell]")],
    binWinOverlay: requiredElement<SVGSVGElement>("bin-win-overlay"),
    detail,
    diffAI: requiredElement<HTMLSelectElement>("diff"),
    diffPlayerOneAI: requiredElement<HTMLSelectElement>("diff-p-one"),
    diffPlayerTwoAI: requiredElement<HTMLSelectElement>("diff-p-two"),
    gameMode: requiredElement<HTMLSelectElement>("game-mode"),
    newGame: requiredElement<HTMLButtonElement>("new-game"),
    pauseToggleAI: requiredElement<HTMLButtonElement>("ai-pause-toggle"),
    pieceName: requiredElement("piece-name"),
    pieceStr: requiredElement("piece-str"),
    redo: requiredElement<HTMLButtonElement>("redo"),
    starter: requiredElement<HTMLSelectElement>("starter"),
    starterPlayerOne: requiredElement<HTMLOptionElement>("starter-player-one"),
    starterPlayerTwo: requiredElement<HTMLOptionElement>("starter-player-two"),
    starterRandom: requiredElement<HTMLOptionElement>("starter-random"),
    status,
    thinking,
    thinkingLabel: requiredElement("thinking-label"),
    turnBadge: requiredElement("turn-badge"),
    undo: requiredElement<HTMLButtonElement>("undo"),
    wrapDiffAI: requiredElement("diff-wrap"),
    wrapDiffPlayerOneAI: requiredElement("diff-p-one-wrap"),
    wrapDiffPlayerTwoAI: requiredElement("diff-p-two-wrap"),
  });
  controller.start();
}

useLocale().subscribe((): void => {
  renderLabels();
  if (requiredElement("language-panel").hidden === false) renderLocaleList();
});
renderLabels();

requiredElement("language-toggle").addEventListener("click", (): void => {
  toggleLocalePanel(requiredElement("language-panel").hidden !== false);
});
requiredElement("language-search").addEventListener("input", renderLocaleList);
document.addEventListener("keydown", (event: KeyboardEvent): void => {
  if (event.key === "Escape") toggleLocalePanel(false);
});
document.addEventListener("click", (event: MouseEvent): void => {
  const target: Node | null = event.target as Node | null;
  if (
    target !== null &&
    requiredElement("language-toggle").parentElement?.contains(target)
  )
    return;
  toggleLocalePanel(false);
});

try {
  startGame();
} catch (error) {
  showStartupErr(error);
}
