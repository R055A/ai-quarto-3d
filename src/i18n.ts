import { getPieceTraits, type PieceTraits } from "./game/pieces";
import type { Difficulty, PieceId } from "./game/types";

export const LOCALES = [
  "en",
  "mi",
  "sv",
  "es",
  "fr",
  "pt",
  "ru",
  "de",
  "tr",
  "it",
  "pl",
  "uk",
  "nl",
  "af",
  "ro",
  "hu",
  "el",
  "cs",
  "sr",
  "bg",
  "da",
  "fi",
  "no",
  "sk",
  "hr",
  "ca",
  "be",
  "bs",
  "sq",
  "lt",
  "sl",
  "lv",
  "mk",
  "et",
  "ga",
  "cy",
  "eu",
  "gl",
  "is",
  "mt",
  "lb",
  "gd",
  "zh",
  "hi",
  "ar",
  "he",
  "bn",
  "id",
  "ur",
  "ja",
  "mr",
  "vi",
  "te",
  "sw",
  "ha",
  "pa",
  "fil",
  "ta",
  "yue",
  "fa",
  "ko",
  "am",
  "th",
  "jv",
  "gu",
  "kn",
  "yo",
  "bho",
  "my",
  "ln",
  "or",
  "ml",
  "sd",
  "su",
  "zu",
] as const;
export type Locale = (typeof LOCALES)[number];
const DEFAULT_LANG: Locale = LOCALES[0];

type TranslationRecords = Record<string, string | number>;
interface TranslationTree {
  [key: string]: string | TranslationTree;
}

const STORAGE_KEY: string = "quarto-lang";
const listeners: Set<() => void> = new Set<() => void>();

const RTL_LANGUAGES: ReadonlySet<Locale> = new Set<Locale>(["ar", "he", "fa", "ur", "sd"]);
const localeModules: Record<string, TranslationTree> = import.meta.glob<TranslationTree>(
  "./locales/*.json",
  { eager: true, import: "default" },
);
const resources: Record<Locale, TranslationTree> = Object.fromEntries(
  LOCALES.map((lang: Locale): [Locale, TranslationTree] => {
    const resource: TranslationTree | undefined = localeModules[`./locales/${lang}.json`];
    if (resource === undefined) throw new Error(`Missing locale resource: ${lang}`);
    return [lang, resource];
  }),
) as Record<Locale, TranslationTree>;
let localeGlobal: Locale = DEFAULT_LANG;

function isSupportedLang(lang: string): lang is Locale {
  return LOCALES.includes(lang as Locale);
}

function detectLang(): Locale {
  const stored: string | null = localStorage.getItem(STORAGE_KEY);
  if (stored !== null && isSupportedLang(stored)) return stored;
  for (const candidate of navigator.languages) {
    const baseLanguage: string | undefined = candidate.toLowerCase().split("-")[0];
    if (baseLanguage !== undefined && isSupportedLang(baseLanguage)) return baseLanguage;
  }
  return DEFAULT_LANG;
}

function lookupTransTree(tree: TranslationTree, key: string): string | undefined {
  let lang: string | TranslationTree = tree;
  for (const segment of key.split(".")) {
    if (typeof lang === "string") return undefined;
    const next: string | TranslationTree | undefined = lang[segment];
    if (next === undefined) return undefined;
    lang = next;
  }
  return typeof lang === "string" ? lang : undefined;
}

function applyTransAttr(attribute: "aria-label" | "title" | "content"): void {
  const dataAttr = `data-i18n-${attribute}`;
  for (const element of document.querySelectorAll<HTMLElement>(`[${dataAttr}]`)) {
    const key: string | null = element.getAttribute(dataAttr);
    if (key !== null) element.setAttribute(attribute, translate(key));
  }
}

function applyLang(): void {
  document.documentElement.lang = localeGlobal;
  document.documentElement.dir = RTL_LANGUAGES.has(localeGlobal) ? "rtl" : "ltr";

  for (const element of document.querySelectorAll<HTMLElement>("[data-i18n]")) {
    const key: string | undefined = element.dataset.i18n;
    if (key !== undefined) element.textContent = translate(key);
  }

  applyTransAttr("aria-label");
  applyTransAttr("title");
  applyTransAttr("content");
}

export async function initI18n(): Promise<void> {
  localeGlobal = detectLang();
  applyLang();
}

export function translate(key: string, records: TranslationRecords = {}): string {
  const translation: string =
    lookupTransTree(resources[localeGlobal], key) ?? lookupTransTree(resources.en, key) ?? key;
  return translation.replace(/{{\s*([^}\s]+)\s*}}/g, (_: string, name: string): string =>
    String(records[name] ?? `{{${name}}}`),
  );
}

export function onLangChange(listener: () => void): void {
  listeners.add(listener);
}

export function diffLabel(diff: Difficulty): string {
  return translate(`diff.${String(diff).replace(/^difficulty\./, "")}`);
}

export function transTraits(piece: PieceId): string {
  const pieceTraits: PieceTraits = getPieceTraits(piece);
  return [
    translate(`piece.${pieceTraits.isDark ? "black" : "red"}`),
    translate(`piece.${pieceTraits.isBig ? "big" : "small"}`),
    translate(`piece.${pieceTraits.isRound ? "round" : "square"}`),
    translate(`piece.${pieceTraits.isSolid ? "solid" : "hollow"}`),
  ].join(", ");
}

export function changeLang(lang: string): void {
  if (!isSupportedLang(lang) || lang === localeGlobal) return;
  localeGlobal = lang;
  localStorage.setItem(STORAGE_KEY, localeGlobal);
  applyLang();
  for (const listener of listeners) listener();
}

export function curLang(): Locale {
  return localeGlobal;
}
