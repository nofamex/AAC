import { useState } from "react";

export default function ScratchGrid({ generated }: any) {
  const wordsInstance = generated.instance;
  const [firstWord, setFirstWord] = useState<any>({});
  const [lastWord, setLastWord] = useState<any>({});
  const [selectedWord, setSelectedWord] = useState<any>([]);

  const wordClickHandler = (x: number, y: number) => {
    const firstWordLength = Object.entries(firstWord).length;

    if (firstWordLength === 0) {
      setFirstWord({ x, y });
      selectedWord.push(`x-${x},y-${y}`);
    } else {
      if (wordsInstance.read(firstWord, { x, y }) === null) {
        setFirstWord({});
        setLastWord({});
        setSelectedWord([]);
      } else {
        setLastWord({ x, y });
        selectedWord.push(`x-${x},y-${y}`);
      }
    }
  };

  console.log(wordsInstance.read(firstWord, lastWord));

  return (
    <div className="h-full w-11/12 rounded-xl bg-compe ml-4 p-4 text-white font-md font-bold flex flex-col justify-center items-center">
      {generated.grids.map((rows: string[], indexRow: number) => (
        <div className="w-full h-10 flex items-center" key={`row-${indexRow}`}>
          {rows.map((col: string, indexCol: number) => (
            <Word
              key={`col-${indexCol}`}
              ct={col}
              x={indexCol}
              y={indexRow}
              handler={wordClickHandler}
              firstWord={firstWord}
              ws={generated.instance}
              selectedWord={selectedWord}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

interface WordProps {
  x: number;
  y: number;
  ct: string;
  handler: Function;
  firstWord: { x: number; y: number };
  ws: any;
  selectedWord: string[];
}

function Word({ x, y, ct, handler, firstWord, ws, selectedWord }: WordProps) {
  const isSelected =
    ws.read(firstWord, { x, y }) !== null &&
    selectedWord.includes(`x-${x},y-${y}`);

  return (
    <div
      className={`h-full w-full flex justify-center items-center cursor-pointer ${
        isSelected && "bg-orange"
      }`}
      onClick={() => handler(x, y)}
    >
      {ct}
    </div>
  );
}
