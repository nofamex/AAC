import api from "@lib/axios";
import { useState } from "react";

interface QustionBoxProps {
  id: number;
  num: number;
  difficulty: number;
  question: string;
  paket: number;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  type: string;
  cmpt: string;
}

export default function QuestionBox({
  id,
  num,
  difficulty,
  question,
  paket,
  p1,
  p2,
  p3,
  p4,
  type,
  cmpt,
}: QustionBoxProps) {
  const [answer, setAnswer] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const difficultyParser = (diff: number) => {
    switch (diff) {
      case 1:
        return "Easy";
      case 2:
        return "Medium";
      case 3:
        return "Hard";
    }
  };

  const clickHandler = (e: any) => {
    e.preventDefault();
    api
      .post(`/prelim/${cmpt}/submit-isian`, {
        id: id,
        paket: paket,
        jawaban: answer,
      })
      .then(() => setIsSubmit(true));
  };

  return (
    <div className="w-full min-h-questionBox max-h-screen bg-compe rounded-xl flex mb-4">
      <div className="h-full w-1/12 flex flex-col items-center justify-start text-white font-bold p-4 text-xl">
        <p>No</p>
        <p>{num}</p>
      </div>
      <div className="h-full w-10/12 p-4 text-white">
        <div
          dangerouslySetInnerHTML={{ __html: question }}
          className="text-xl select-none"
        ></div>
        <div className="w-full auto flex flex-col mt-4">
          {type === "pg" ? (
            <form>
              <Option
                name={String(id)}
                value={String(1)}
                text={p1}
                id={String(1)}
                paket={paket}
                cmpt={cmpt}
              />
              <Option
                name={String(id)}
                value={String(2)}
                text={p2}
                id={String(2)}
                paket={paket}
                cmpt={cmpt}
              />
              <Option
                name={String(id)}
                value={String(3)}
                text={p3}
                id={String(3)}
                paket={paket}
                cmpt={cmpt}
              />
              <Option
                name={String(id)}
                value={String(4)}
                text={p4}
                id={String(4)}
                paket={paket}
                cmpt={cmpt}
              />
            </form>
          ) : (
            <form>
              <input
                type="text"
                className="text-black border-black-80 border-2 rounded-lg mr-4"
                onChange={(e) => setAnswer(e.target.value)}
              />
              <button
                type="submit"
                onClick={(e: any) => clickHandler(e)}
                className="px-4 py-1 rounded-2xl text-white bg-orange"
              >
                Submit
              </button>
              {isSubmit && (
                <p className="text-green-500">Berhasil submit jawaban</p>
              )}
            </form>
          )}
        </div>
      </div>
      <div className="h-full w-1/12 flex items-start justify-center text-white p-4">
        <p>{difficultyParser(difficulty)}</p>
      </div>
    </div>
  );
}

interface OptionProps {
  name: string;
  value: string;
  text: string;
  id: string;
  paket: number;
  cmpt: string;
}

function Option({ name, value, text, id, paket, cmpt }: OptionProps) {
  const clickHandler = () => {
    api.post(`/prelim/${cmpt}/submit-pg`, {
      id: Number(name),
      paket: paket,
      jawaban: Number(value),
    });
  };
  return (
    <div className="flex justify-start items-center">
      <input
        type="radio"
        name={name}
        value={value}
        id={id}
        onClick={() => clickHandler()}
      />
      <label
        htmlFor={id}
        className="text-red-default text-lg order-2 ml-3 select-none"
        dangerouslySetInnerHTML={{ __html: text }}
      ></label>
    </div>
  );
}
