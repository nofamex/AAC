import { useState } from "react";

export default function RescueQuestion() {
  return (
    <div className="w-4/5 h-full bg-compe rounded-xl mr-4 mt-4 flex flex-col text-white p-4">
      <p className="font-bold text-xl mt-4">
        Isilah jawaban sesuai petunjuk di soal
      </p>
      <ul className="mt-8 text-lg">
        <QuestionList num={1} />
        <QuestionList num={2} />
        <QuestionList num={3} />
        <QuestionList num={4} />
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 1500);
    console.log(`jawaban anda ${answer}`);
  };

  return (
    <li className="flex mt-2">
      <p>{num}. Soal No 1</p>
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
