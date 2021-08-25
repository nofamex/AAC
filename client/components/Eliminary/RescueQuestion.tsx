import api from "@lib/axios";
import { useState } from "react";

export default function RescueQuestion() {
  const soalList = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  return (
    <div className="w-4/5 h-auto bg-compe rounded-xl mr-4 mt-4 flex flex-col text-white p-4">
      <p className="font-bold text-xl mt-4">
        Isilah jawaban sesuai petunjuk di soal
      </p>
      <ul className="mt-8 text-lg">
        {soalList.map((ct, index) => (
          <QuestionList num={ct} key={index} />
        ))}
      </ul>
    </div>
  );
}

interface QuestionListProps {
  num: number;
}

function QuestionList({ num }: QuestionListProps) {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await api
      .post("/elim/unac/rescue/submit", {
        jawaban: answer,
        id: Number(num),
      })
      .then(() => {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
        }, 1500);
      });
  };

  return (
    <li className="flex mt-2">
      <p className={num > 9 ? "mr-3" : "mr-6"}>Soal No {num}</p>
      <form>
        <input
          type="text"
          className="ml-2 rounded-lg text-black"
          onChange={(e: any) => setAnswer(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-1 rounded-2xl text-white bg-orange text-base ml-2"
          onClick={(e: any) => handleSubmit(e)}
        >
          Submit
        </button>
      </form>
      {submitted && (
        <p className="ml-2 text-green-500">Berhasil submit jawaban</p>
      )}
    </li>
  );
}
