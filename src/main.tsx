import "./style.scss";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import App from "./App";
import { changeLang, curLang, initI18n, LOCALES, type Locale, translate } from "./i18n";
import { GameScene } from "./render/GameScene";
import GameController from "./ui/GameController";

function requiredElement<T extends Element>(id: string): T {
  const element: T | null = document.querySelector<T>(`#${id}`);
  if (element === null) {
    throw new Error(`Missing required element #${id}`);
  }
  return element;
}

function setupTitleFit(): void {
  const title: HTMLHeadingElement = requiredElement<HTMLHeadingElement>("app-title");
  const header: HTMLElement | null = title.closest<HTMLElement>(".info-header");
  if (header === null) return;

  const minFontSize: number = 12;
  const fitTitle: () => void = (): void => {
    title.style.fontSize = "";
    const naturalFontSize: number = Number.parseFloat(window.getComputedStyle(title).fontSize);
    if (!Number.isFinite(naturalFontSize) || title.scrollWidth <= title.clientWidth) return;

    let nextFontSize: number = Math.max(
      minFontSize,
      naturalFontSize * (title.clientWidth / title.scrollWidth),
    );
    title.style.fontSize = `${nextFontSize}px`;

    while (title.scrollWidth > title.clientWidth && nextFontSize > minFontSize) {
      nextFontSize = Math.max(minFontSize, nextFontSize - 0.25);
      title.style.fontSize = `${nextFontSize}px`;
    }
  };

  const resizeObs = new ResizeObserver(fitTitle);
  resizeObs.observe(header);
  const mutationObs = new MutationObserver(fitTitle);
  mutationObs.observe(title, { childList: true, characterData: true, subtree: true });
  fitTitle();
}

const appRoot: HTMLElement = requiredElement<HTMLElement>("app");
const reactRoot: Root = createRoot(appRoot);
flushSync((): void => {
  reactRoot.render(<App />);
});

const canvas: HTMLCanvasElement = requiredElement<HTMLCanvasElement>("game-canvas");
const status: HTMLElement = requiredElement<HTMLElement>("game-status");
const statusLbl: HTMLElement = requiredElement<HTMLElement>("game-status-label");

function showStartupErr(error: unknown): void {
  canvas.hidden = true;
  status.classList.remove("is-ai", "is-paused");
  status.classList.add("is-error");
  statusLbl.textContent = translate("error.renderingStatus");

  const fallback: HTMLDivElement = document.createElement("div");
  const heading: HTMLElement = document.createElement("strong");
  const msg: HTMLSpanElement = document.createElement("span");

  fallback.className = "webgl-error";
  heading.textContent = translate("error.webglHeading");
  msg.textContent = translate("error.webglMsg");
  fallback.append(heading, msg);
  canvas.parentElement?.append(fallback);

  console.error(error);
}

async function startApp(): Promise<void> {
  await initI18n();
  setupTitleFit();

  const langToggle: HTMLButtonElement = requiredElement<HTMLButtonElement>("language-toggle");
  const updateLangToggle: () => void = (): void => {
    const lang: Locale = curLang();
    const label: string = lang.toUpperCase();
    langToggle.dataset.language = lang;
    langToggle.setAttribute("aria-label", `langToggle ${label}`);
    langToggle.title = `${label}`;
  };
  updateLangToggle();
  langToggle.addEventListener("click", (): void => {
    const curIdx: number = LOCALES.indexOf(curLang());
    const nxtLang: Locale = LOCALES[(curIdx + 1) % LOCALES.length] ?? LOCALES[0];
    changeLang(nxtLang);
    updateLangToggle();
  });

  let controller!: GameController;
  const scene = new GameScene(canvas, {
    onCellClick: (cell: number): void => controller.handleCellClick(cell),
    onPieceClick: (piece: number): void => controller.handlePieceClick(piece),
    onPieceHover: (piece: number | null): void => controller.handlePieceHover(piece),
  });

  controller = new GameController(scene, {
    binCells: [...document.querySelectorAll<HTMLElement>("[data-binary-cell]")],
    binWinOverlay: requiredElement<SVGSVGElement>("bin-win-overlay"),
    diffAI: requiredElement<HTMLSelectElement>("diff"),
    diffPlayerOneAI: requiredElement<HTMLSelectElement>("diff-p-one"),
    diffPlayerTwoAI: requiredElement<HTMLSelectElement>("diff-p-two"),
    gameMode: requiredElement<HTMLSelectElement>("game-mode"),
    status,
    statusLbl,
    newGame: requiredElement<HTMLButtonElement>("new-game"),
    pauseToggleAI: requiredElement<HTMLButtonElement>("ai-pause-toggle"),
    pieceName: requiredElement<HTMLElement>("piece-name"),
    pieceStr: requiredElement<HTMLElement>("piece-str"),
    redo: requiredElement<HTMLButtonElement>("redo"),
    risk: requiredElement<HTMLElement>("selection-risk"),
    riskLatest: requiredElement<HTMLElement>("selection-risk-latest"),
    riskToggle: requiredElement<HTMLButtonElement>("selection-risk-toggle"),
    starter: requiredElement<HTMLSelectElement>("starter"),
    statusDots: requiredElement<HTMLElement>("status-dots"),
    undo: requiredElement<HTMLButtonElement>("undo"),
    wrapDiffAI: requiredElement<HTMLElement>("diff-wrap"),
    wrapDiffPlayerOneAI: requiredElement<HTMLElement>("diff-p-one-wrap"),
    wrapDiffPlayerTwoAI: requiredElement<HTMLElement>("diff-p-two-wrap"),
  });
  controller.start();
}

void startApp().catch(showStartupErr);
