import type { JSX } from "react";

const BIN_CELLS = [
  "binary-cell-0",
  "binary-cell-1",
  "binary-cell-2",
  "binary-cell-3",
  "binary-cell-4",
  "binary-cell-5",
  "binary-cell-6",
  "binary-cell-7",
  "binary-cell-8",
  "binary-cell-9",
  "binary-cell-10",
  "binary-cell-11",
  "binary-cell-12",
  "binary-cell-13",
  "binary-cell-14",
  "binary-cell-15",
] as const;

function PauseIcon(): JSX.Element {
  return (
    <>
      <svg className="pause-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 6v12M16 6v12" />
      </svg>
      <svg className="play-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="m9 6 9 6-9 6Z" />
      </svg>
    </>
  );
}

function GlobeIcon(): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.5 3.8 5.5 3.8 9S14.5 18.5 12 21" />
      <path d="M12 3c-2.5 2.5-3.8 5.5-3.8 9s1.3 6.5 3.8 9" />
    </svg>
  );
}

function GitHubIcon(): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .7a11.3 11.3 0 0 0-3.6 22c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.2-1.3-1.5-1.3-1.5-1-.7.1-.7.1-.7 1.2.1 1.8 1.3 1.8 1.3 1.1 1.8 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.5 1.2a12 12 0 0 1 6.4 0A4.8 4.8 0 0 1 18.7 5c.6 1.6.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1 .8 2v3c0 .3.2.7.8.6A11.3 11.3 0 0 0 12 .7Z" />
    </svg>
  );
}

function InfoHeader(): JSX.Element {
  return (
    <header className="info-header">
      <h1 id="app-title" data-i18n="app.title">
        AI-Quarto 3D
      </h1>
      <div className="utility-actions" data-i18n-aria-label="a11y.utilityActions">
        <button
          id="language-toggle"
          className="utility-button language-toggle"
          type="button"
          aria-label="Change language"
          title="Change language"
          data-i18n-aria-label="controls.langToggle"
          data-i18n-title="controls.langToggle"
        >
          <GlobeIcon />
        </button>
        <a
          className="utility-button github-link"
          href="https://github.com/r055a/ai-quarto-3d"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View source on GitHub"
          title="View source on GitHub"
          data-i18n-aria-label="a11y.viewSource"
          data-i18n-title="a11y.viewSource"
        >
          <GitHubIcon />
        </a>
      </div>
    </header>
  );
}

function HistoryIcon({ direction }: { direction: "undo" | "redo" }): JSX.Element {
  return direction === "undo" ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 7 4 12l5 5" />
      <path d="M5 12h8a6 6 0 0 1 6 6" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m15 7 5 5-5 5" />
      <path d="M19 12h-8a6 6 0 0 0-6 6" />
    </svg>
  );
}

function GameControls(): JSX.Element {
  return (
    <section
      className="game-controls"
      aria-label="Game controls"
      data-i18n-aria-label="a11y.gameControls"
    >
      <div className="control-grid">
        <label>
          <span data-i18n="controls.gameMode">Game mode</span>
          <select id="game-mode" defaultValue="human-ai">
            <option value="human-human" data-i18n="mode.userVsUser">
              User vs user
            </option>
            <option value="human-ai" data-i18n="mode.userVsAI">
              User vs AI
            </option>
            <option value="ai-ai" data-i18n="mode.onlyAI">
              AI vs AI
            </option>
          </select>
        </label>

        <label>
          <span data-i18n="controls.startingPlayer">Starting player</span>
          <select id="starter" defaultValue="random">
            <option value="random" data-i18n="player.playerRandom">
              Random
            </option>
            <option value="player1" data-i18n="player.playerOne">
              Player One
            </option>
            <option value="player2" data-i18n="player.playerTwo">
              Player Two
            </option>
          </select>
        </label>

        <label id="diff-wrap" className="control-wide">
          <span data-i18n="controls.diffAI">AI difficulty</span>
          <select id="diff" defaultValue="medium">
            <option value="easy" data-i18n="diff.easy">
              Easy
            </option>
            <option value="medium" data-i18n="diff.medium">
              Medium
            </option>
            <option value="hard" data-i18n="diff.hard">
              Hard
            </option>
          </select>
        </label>

        <label id="diff-p-one-wrap" hidden>
          <span data-i18n="controls.diffPlayerOneAI">P1 difficulty</span>
          <select id="diff-p-one" defaultValue="hard">
            <option value="easy" data-i18n="diff.easy">
              Easy
            </option>
            <option value="medium" data-i18n="diff.medium">
              Medium
            </option>
            <option value="hard" data-i18n="diff.hard">
              Hard
            </option>
          </select>
        </label>

        <label id="diff-p-two-wrap" hidden>
          <span data-i18n="controls.diffPlayerTwoAI">P2 difficulty</span>
          <select id="diff-p-two" defaultValue="hard">
            <option value="easy" data-i18n="diff.easy">
              Easy
            </option>
            <option value="medium" data-i18n="diff.medium">
              Medium
            </option>
            <option value="hard" data-i18n="diff.hard">
              Hard
            </option>
          </select>
        </label>
      </div>

      <div className="action-row">
        <button id="new-game" className="primary action-new" type="button" data-i18n="app.newGame">
          New game
        </button>
        <button
          id="undo"
          className="icon-button"
          type="button"
          aria-label="Undo"
          title="Undo"
          data-i18n-aria-label="controls.undo"
          data-i18n-title="controls.undo"
          disabled
        >
          <HistoryIcon direction="undo" />
        </button>
        <button
          id="redo"
          className="icon-button"
          type="button"
          aria-label="Redo"
          title="Redo"
          data-i18n-aria-label="controls.redo"
          data-i18n-title="controls.redo"
          disabled
        >
          <HistoryIcon direction="redo" />
        </button>
      </div>
    </section>
  );
}

function GameScreen(): JSX.Element {
  return (
    <section
      className="game-screen"
      aria-label="3D game board"
      data-i18n-aria-label="a11y.gameBoard"
    >
      <canvas id="game-canvas" />
      <div id="game-status" className="game-status" role="status" aria-live="polite">
        <span id="status-dots" className="status-dots" hidden aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <strong id="game-status-label" data-i18n="status.loading">
          Gameplay status...
        </strong>
        <button
          id="ai-pause-toggle"
          className="status-toggle"
          type="button"
          aria-label="Pause AI"
          title="Pause AI"
          data-i18n-aria-label="controls.pauseAI"
          data-i18n-title="controls.pauseAI"
          hidden
        >
          <PauseIcon />
        </button>
      </div>
    </section>
  );
}

function BinaryBoard(): JSX.Element {
  return (
    <section className="bin-board-card">
      <div className="bin-board-heading">
        <h3 data-i18n="board.binary">Binary board</h3>
        <span data-i18n="board.piecesPlaced">Placed pieces</span>
      </div>
      <div className="bin-board-wrap">
        <div id="bin-board" className="bin-board">
          {BIN_CELLS.map((id, cell) => (
            <code key={id} data-binary-cell={cell}>
              ----
            </code>
          ))}
        </div>
        <svg
          id="bin-win-overlay"
          className="bin-win-overlay"
          viewBox="0 0 4 4"
          aria-hidden="true"
          style={{ display: "none" }}
        />
      </div>
    </section>
  );
}

function SelectionRisk(): JSX.Element {
  return (
    <section
      id="selection-risk"
      className="selection-risk-section"
      aria-labelledby="selection-risk-title"
    >
      <div className="selection-risk-card">
        <div className="selection-risk-trigger">
          <div>
            <h3 id="selection-risk-title" data-i18n="metrics.selectionRisk">
              Selection risk
            </h3>
            <span data-i18n="metrics.immediateWins">Immediate winning placements</span>
          </div>
          <div className="selection-risk-trigger-meta">
            <strong id="selection-risk-latest" data-i18n-aria-label="metrics.latestRisk">
              —
            </strong>
            <button
              id="selection-risk-toggle"
              className="selection-risk-toggle"
              type="button"
              aria-label="Turn selection risk off"
              aria-pressed="true"
              title="Turn selection risk off"
              data-i18n="common.on"
              data-i18n-aria-label="metrics.turnRiskOff"
              data-i18n-title="metrics.turnRiskOff"
            >
              ON
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function GameInfo(): JSX.Element {
  return (
    <aside className="game-info" aria-label="Game information" data-i18n-aria-label="a11y.gameInfo">
      <InfoHeader />
      <GameControls />

      <section className="received-card">
        <span data-i18n="piece.inPlay">Piece in play</span>
        <strong id="piece-name" data-i18n="piece.none">
          None selected
        </strong>
        <code id="piece-str">----</code>
      </section>

      <section className="legend">
        <h3 data-i18n="piece.traits">Piece traits</h3>
        <div>
          <code>1</code>
          <span data-i18n="piece.black">Black</span>
          <span data-i18n="piece.big">Big</span>
          <span data-i18n="piece.round">Round</span>
          <span data-i18n="piece.solid">Solid</span>
        </div>
        <div>
          <code>0</code>
          <span data-i18n="piece.red">Red</span>
          <span data-i18n="piece.small">Small</span>
          <span data-i18n="piece.square">Square</span>
          <span data-i18n="piece.hollow">Hollow</span>
        </div>
      </section>

      <BinaryBoard />
      <SelectionRisk />

      <footer className="ported-note">
        <span data-i18n="app.eyebrow">A ported enhancement of</span>{" "}
        <span>uni-git-projects/uu-game</span>
      </footer>
    </aside>
  );
}

export default function App(): JSX.Element {
  return (
    <main className="game-layout">
      <GameScreen />
      <GameInfo />
    </main>
  );
}
