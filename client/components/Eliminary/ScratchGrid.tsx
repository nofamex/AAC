import { useState, useEffect } from "react";
import { wordArr, wordQuestion } from "@lib/word";
import Cookies from "js-cookie";
import api from "@lib/axios";

export default function ScratchGrid({ generated }: any) {
  const wordsInstance = generated.instance;
  const [firstWord, setFirstWord] = useState<any>({});
  const [lastWord, setLastWord] = useState<any>({});
  const [selectedWord, setSelectedWord] = useState<any>([]);
  const [findedWord, setFindedWord] = useState<any>([]);

  useEffect(() => {
    if (typeof Cookies.get("scratchFindedWord") !== "undefined") {
      setFindedWord(JSON.parse(Cookies.get("scratchFindedWord") || ""));
    }
  }, []);

  const submitAnswerHandler = async (jawaban: string) => {
    await api.post("/elim/unac/scratch/submit", { jawaban });
  };

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

  const findWordChecker = async (
    x: number,
    y: number,
    selectedWord: string[]
  ) => {
    let word = "";
    wordsInstance.utils
      .createPathFromPair(firstWord, { x, y })
      .forEach((element: { x: number; y: number }) => {
        word += wordQuestion[element.y][element.x];
      });
    if (wordArr.includes(word)) {
      selectedWord.forEach((element) => {
        findedWord.push(element);
      });
      refreshSelected();
      Cookies.set("scratchFindedWord", JSON.stringify(findedWord));
      submitAnswerHandler(word);
    }
  };

  return (
    <div className="h-auto w-11/12 rounded-xl bg-compe ml-4 p-4 text-white font-md font-bold flex flex-col justify-center items-center">
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
