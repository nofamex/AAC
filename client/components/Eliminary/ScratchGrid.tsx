import { useState } from "react";
import { wordArr } from "@lib/word";

export default function ScratchGrid({ generated }: any) {
  const wordsInstance = generated.instance;
  const [firstWord, setFirstWord] = useState<any>({});
  const [lastWord, setLastWord] = useState<any>({});
  const [selectedWord, setSelectedWord] = useState<any>([]);
  const [findedWord, setFindedWord] = useState<any>([]);

  const refreshSelected = () => {
    setFirstWord({});
    setLastWord({});
    setSelectedWord([]);
  };

  const wordClickHandler = (x: number, y: number) => {
    if (Object.entries(firstWord).length === 0) {
      setFirstWord({ x, y });
      setLastWord({ x, y });
      selectedWord.push(`x-${x},y-${y}`);
    } else {
      if (wordsInstance.read(firstWord, { x, y }) === null) {
        refreshSelected();
      } else {
        setLastWord({ x, y });
        let newSelectedWordArr: string[] = [];
        wordsInstance.utils
          .createPathFromPair(firstWord, { x, y })
          .forEach((item: { x: number; y: number }) => {
            newSelectedWordArr.push(`x-${item.x},y-${item.y}`);
          });
        setSelectedWord(newSelectedWordArr);
        findWordChecker(x, y, newSelectedWordArr);
      }
    }
  };

  const findWordChecker = (x: number, y: number, selectedWord: string[]) => {
    if (wordArr.includes(wordsInstance.read(firstWord, { x, y }))) {
      setFindedWord([...selectedWord, ...findedWord, `x-${x},y-${y}`]);
      refreshSelected();
      console.log(
        `Berhasil Menemukan ${wordsInstance.read(firstWord, { x, y })}`
      );
    }
  };

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
              findedWord={findedWord}
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
  findedWord: string[];
}

function Word({
  x,
  y,
  ct,
  handler,
  firstWord,
  ws,
  selectedWord,
  findedWord,
}: WordProps) {
  const isSelected =
    ws.read(firstWord, { x, y }) !== null &&
    selectedWord.includes(`x-${x},y-${y}`);

  const isFinded = findedWord.includes(`x-${x},y-${y}`);

  return (
    <div
      className={`h-full w-full flex justify-center items-center cursor-pointer ${
        isSelected && "bg-orange"
      } ${isFinded && "bg-green-500"}`}
      onClick={() => handler(x, y)}
    >
      {ct}
    </div>
  );
}
