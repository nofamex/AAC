// @ts-ignore
import WordSearch from "@blex41/word-search";

export const wordArr: string[] = [
  "KERAHASIAAN",
  "DIVIDEN",
  "TRANSLATION",
  "GOODWILL",
  "RELATIVE",
  "ECONOMICAL",
  "ANALYTICAL",
  "MATERIALITY",
  "JOB",
  "RISK",
  "LIKUIDASI",
  "SHIELD",
  "ENAM",
  "NOTCOLLECTED",
  "CORPORATE",
  "RESTITUSI",
  "USER",
  "INTRANET",
  "INACCURATE",
  "STORAGE",
  "KOMPETENSI",
  "PROCESS",
  "ECONOMY",
  "DUA",
  "SUBSTANTIVE",
  "EXTRANET",
  "BARGAIN",
  "LOSS",
  "ACTUAL",
  "BEBAN",
  "KONTRIBUSI",
  "HACKER",
  "AMNESTY",
  "KONSOLIDASI",
  "GOVERNMENT",
  "FILTERING",
  "ACTION",
  "TOLERANCE",
  "RETURNED",
];

export default function generateWord() {
  const options = {
    cols: 22,
    rows: 22,
    dictionary: wordArr,
    maxWords: 42,
    upperCase: true,
    diacritics: true,
  };
  const ws = new WordSearch(options);
  const grids = ws.grid;
  const words = ws.words;
  return {
    instance: ws,
    grids,
    words,
  };
}
