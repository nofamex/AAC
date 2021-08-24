import { HiDownload } from "react-icons/hi";
import Countdown from "react-countdown";
import Countdowns from "./Countdown";
import { useEffect, useState } from "react";
import api from "@lib/axios";
import Loader from "@components/Context/Loader";
import { getDate, toCurrentTimezone } from "@lib/date";
import { useRouter } from "next/router";
import { BsCheckCircle } from "react-icons/bs";

interface PreliminaryProps {
  phase: string;
  type: string;
  statusPrelim: string;
}

export default function Preliminary({
  phase,
  type,
  statusPrelim,
}: PreliminaryProps) {
  const UNAC =
    "https://drive.google.com/file/d/1Mb8gR9pg3-3oN-7oGUGD8YQMx9-bEbSK/view?usp=sharing";

  const TAC =
    "https://drive.google.com/file/d/1T-DG50hqL3YRBVvEXY5DwFQP7lYgxd7p/view?usp=sharing";

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
    api
      .post(`/prelim/${type}/start`)
      .then(() => router.push(`/comps/preliminary/${type}`));
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
      {/* <Countdown
        date={toCurrentTimezone(
          type === "unac"
            ? data.prelim_unac_start.Time
            : data.prelim_tac_start.Time
        )}
        renderer={renderer}
      /> */}
      <p className="text-lg mt-4">Aturan dan cara pengerjaan lomba:</p>
      <a
        href={type === "unac" ? UNAC : TAC}
        target="_blank"
        rel="noreferrer"
        className="mr-0 mb-4 sm:mr-8 sm:mb-0 flex"
      >
        <button className="border-2 border-orange rounded-2xl text-orange font-bold text-xl px-16 py-3 mt-2 flex justify-center items-center hover:scale-105 transition-all ease-in-out active:scale-100">
          <span className="mr-2">
            <HiDownload className="text-2xl" />
          </span>
          Download
        </button>
      </a>
      {/* {isStarted && statusPrelim !== "selesai" && (
        <div className="flex flex-col justify-center items-center w-full h-auto mt-4">
          <p className="font-bold text-white text-xl">
            Lomba sudah bisa dimulai
          </p>

          <button
            className="rounded-2xl text-white font-bold text-xl px-16 py-3 mt-2 flex justify-center items-center bg-gradient-to-r from-persimmon to-orange hover:scale-105 transition-all ease-in-out active:scale-100"
            onClick={() => startHandler()}
          >
            {hasSession ? "Lanjutkan >" : "Mulai >"}
          </button>
        </div>
      )} */}
      {/* {statusPrelim === "selesai" && (
        <div className="flex flex-col justify-center items-center w-full h-auto mt-4">
          <BsCheckCircle className="text-green-600 h-28 w-28" />
          <p className="font-bold text-green-600 text-xl">
            Jawaban anda berhasil disubmit
          </p>
        </div>
      )} */}
    </div>
  );
}
