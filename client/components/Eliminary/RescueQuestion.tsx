import Loader from "@components/Context/Loader";
import api from "@lib/axios";
import { useState, useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";

export default function RescueQuestion() {
  const [question, setQuestion] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function data() {
      await api
        .get("/elim/unac/rescue/soal")
        .then((res) => {
          setQuestion(res.data.body);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
    data();
  }, []);

  console.log(question);

  if (loading) {
    return <Loader height="h-full bg-opacity-0" />;
  }

  return (
    <div className="w-4/5 h-auto bg-compe rounded-xl mr-4 mt-4 flex flex-col text-white p-4">
      <p className="font-bold text-xl mt-4">
        Isilah jawaban sesuai petunjuk di soal
      </p>
      <ul className="mt-8 text-lg">
        {question.map(
          (
            ct: { id: number; soal: string; jawaban: string },
            index: number
          ) => (
            <QuestionList
              num={ct.id}
              question={ct.soal}
              key={index}
              prevAnswer={typeof ct.jawaban !== "undefined" ? ct.jawaban : ""}
            />
          )
        )}
      </ul>
    </div>
  );
}

interface QuestionListProps {
  num: number;
  question: string;
  prevAnswer: string;
}

function QuestionList({ num, question, prevAnswer }: QuestionListProps) {
  const [answer, setAnswer] = useState(prevAnswer);
  const [show, setShow] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await api
      .post("/elim/unac/rescue/submit", {
        jawaban: answer,
        Soal_Id: num,
      })
      .then(() => {
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 1500);
      });
  };

  return (
    <li className="flex mt-2">
      <p className="mr-3 select-none">{num}</p>
      <p dangerouslySetInnerHTML={{ __html: question }}></p>
      <form>
        <input
          type="text"
          className="ml-2 rounded-lg text-black"
          onChange={(e: any) => setAnswer(e.target.value)}
          value={answer}
        />
        <button
          type="submit"
          className="px-4 py-1 rounded-2xl text-white bg-orange text-base ml-2"
          onClick={(e: any) => handleSubmit(e)}
        >
          Submit
        </button>
      </form>
      {show && <AiFillCheckCircle className="w-7 h-7 ml-2 text-green-500" />}
    </li>
  );
}
