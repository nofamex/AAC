import Loader from "@components/Context/Loader";
import api from "@lib/axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

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

  if (loading) {
    return <Loader height="h-full bg-opacity-0" />;
  }

  return (
    <div className="w-4/5 h-auto bg-compe rounded-xl mr-4 mt-4 flex flex-col text-white p-4">
      <p className="font-bold text-xl mt-4">
        Isilah jawaban sesuai petunjuk di soal
      </p>
      <ul className="mt-8 text-lg">
        {question.map((ct: { id: number; soal: string }, index: number) => (
          <QuestionList num={ct.id} question={ct.soal} key={index} />
        ))}
      </ul>
    </div>
  );
}

interface QuestionListProps {
  num: number;
  question: string;
}

function QuestionList({ num, question }: QuestionListProps) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await api
      .post("/elim/unac/rescue/submit", {
        jawaban: answer,
        Soal_Id: num,
      })
      .then(() => {
        toast.success("Berhasil submit jawaban");
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
        />
        <button
          type="submit"
          className="px-4 py-1 rounded-2xl text-white bg-orange text-base ml-2"
          onClick={(e: any) => handleSubmit(e)}
        >
          Submit
        </button>
      </form>
    </li>
  );
}
