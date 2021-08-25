import Countdown from "react-countdown";
import Countdowns from "./Countdown";
import { useEffect, useState } from "react";
import api from "@lib/axios";
import { getDate, toCurrentTimezone } from "@lib/date";
import Loader from "@components/Context/Loader";
import { useRouter } from "next/router";

export default function Eliminary() {
  const router = useRouter();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<any>(true);

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

  if (loading) {
    return <Loader height="h-full bg-opacity-0" />;
  }

  const scratchStartHandler = () => {
    api.post("/elim/unac/scratch/start").then(() => {
      localStorage.setItem("isScratchStarted", "benar");
      router.push("/comps/eliminary/unac/scratch");
    });
  };

  const rescueStartHandler = () => {
    api.post("/elim/unac/rescue/start").then(() => {
      localStorage.setItem("isRescueStarted", "benar");
      router.push("/comps/eliminary/unac/rescue");
    });
  };

  const sandwichStartHandler = () => {
    api.post("/elim/unac/sandwich/start").then(() => {
      localStorage.setItem("isSandwichStarted", "benar");
      router.push("/comps/eliminary/unac/sandwich");
    });
  };

  return (
    <div className="border-white border-2 rounded-lg w-full h-auto p-4 mt-4">
      <p className="font-bold text-lg">Babak Eliminary</p>
      <p className="text-lg mt-4">
        Akan dimulai tanggal{" "}
        <span className="font-bold text-orange">
          {getDate(new Date(data.battle_of_sandwich_start.Time))}
        </span>
      </p>
      <div className="flex mt-4">
        <CompsCard
          name="Battle of Sandwich"
          date={data.battle_of_sandwich_start.Time}
          handler={sandwichStartHandler}
        />
        <CompsCard
          name="Scratch D' Words"
          date={data.scratch_the_hidden_words_start.Time}
          handler={scratchStartHandler}
        />
        <CompsCard
          name="Rescue the Numbers"
          date={data.rescue_the_number_start.Time}
          handler={rescueStartHandler}
        />
      </div>
    </div>
  );
}

interface CompsCardProps {
  name: string;
  date: string;
  handler: Function;
}

function CompsCard({ name, date, handler }: CompsCardProps) {
  const [isStarted, setIsStarted] = useState(false);

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

  return (
    <div className="w-1/3 h-auto flex flex-col border-2 border-white p-2 rounded-lg mr-3">
      <p className="text-lg font-bold mt-4">{name}</p>
      <Countdown date={toCurrentTimezone(date)} renderer={renderer} />
      <div className="flex flex-col w-full h-auto mt-2">
        {isStarted && (
          <>
            <p className="font-bold text-lg">Lomba sudah bisa dimulai</p>
            <button
              className="rounded-2xl text-white font-bold text-xl px-4 py-2 mt-2 flex justify-center items-center bg-gradient-to-r from-persimmon to-orange hover:scale-105 transition-all ease-in-out active:scale-100"
              onClick={() => handler()}
            >
              {"Mulai >"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
