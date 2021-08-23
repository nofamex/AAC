// @ts-ignore
import WordSearch from "@blex41/word-search";

export default function generateWord() {
  const options = {
    cols: 20,
    rows: 20,
    dictionary: ["Zaldy", "Nofal", "Mustafa"],
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
