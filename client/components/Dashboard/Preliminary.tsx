import { HiDownload } from "react-icons/hi";
import Countdown from "react-countdown";
import Countdowns from "./Countdown";
import { useEffect, useState } from "react";
import api from "@lib/axios";
import Loader from "@components/Context/Loader";
import { getDate, toCurrentTimezone } from "@lib/date";
import { useRouter } from "next/router";

interface PreliminaryProps {
  phase: string;
  type: string;
}

export default function Preliminary({ phase, type }: PreliminaryProps) {
  const UNAC =
    "https://drive.google.com/file/d/1vFTPmUAgkieX8STtYHfKKfafFORpfW8T/view?usp=sharing";

  const TAC =
    "https://drive.google.com/file/d/1A-rlbeaFFfptOo1dI7FNwjEA1Og-01TO/view?usp=sharing";

  const router = useRouter();

  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [hasSession] = useState(localStorage.getItem("isPrelimStarted"));

  useEffect(() => {
    async function data() {
      api
        .get("/config/time")
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
    data();
  }, []);

  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      setIsStarted(true);
    }
    return (
      <Countdowns
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  };

  const startHandler = () => {
    localStorage.setItem("isPrelimStarted", "true");
    type === "unac"
      ? router.push("/comps/preliminary/unac")
      : router.push("/comps/preliminary/tac");
  };

  if (loading) {
    return <Loader height="h-full bg-opacity-0" />;
  }

  return (
    <div className="border-white border-2 rounded-lg w-full h-auto p-4 mt-4">
      <p className="font-bold text-lg">Babak {phase}</p>
      <p className="text-lg mt-4">
        Akan dimulai tanggal{" "}
        <span className="font-bold text-orange">
          {getDate(
            type === "unac"
              ? new Date(data.prelim_unac_start.Time)
              : new Date(data.prelim_tac_start.Time)
          )}
        </span>
      </p>
      <Countdown
        date={toCurrentTimezone(
          type === "unac"
            ? data.prelim_unac_start.Time
            : data.prelim_tac_start.Time
        )}
        renderer={renderer}
      />
      <p className="text-lg mt-4">Aturan dan cara pengerjaan lomba:</p>
      <a
        href={type === "unac" ? UNAC : TAC}
        target="_blank"
        rel="noreferrer"
        className="mr-0 mb-4 sm:mr-8 sm:mb-0 flex"
      >
        <button className="border-2 border-orange rounded-2xl text-orange font-bold text-xl px-16 py-3 mt-2 flex justify-center items-center">
          <span className="mr-2">
            <HiDownload className="text-2xl" />
          </span>
          Download
        </button>
      </a>
      {isStarted && (
        <div className="flex flex-col justify-center items-center w-full h-auto mt-4">
          <p className="font-bold text-white text-xl">
            Lomba sudah bisa dimulai
          </p>

          <button
            className="rounded-2xl text-white font-bold text-xl px-16 py-3 mt-2 flex justify-center items-center bg-gradient-to-r from-persimmon to-orange"
            onClick={() => startHandler()}
          >
            {hasSession ? "Lanjutkan >" : "Mulai >"}
          </button>
        </div>
      )}
    </div>
  );
}
