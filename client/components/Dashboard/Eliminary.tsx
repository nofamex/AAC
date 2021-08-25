import Countdown from "react-countdown";
import Countdowns from "./Countdown";
import { BsCheckCircle } from "react-icons/bs";

export default function Eliminary() {
  const renderer = ({ days, hours, minutes, seconds }: any) => {
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
    <div className="border-white border-2 rounded-lg w-full h-auto p-4 mt-4">
      <p className="font-bold text-lg">Babak Eliminary</p>
      <p className="text-lg mt-4">
        Akan dimulai tanggal{" "}
        <span className="font-bold text-orange">19 Agustus 2021</span>
      </p>
      <div className="flex mt-4">
        <CompsCard name="Battle of Sandwich" renderer={renderer} />
        <CompsCard name="Scratch D' Words" renderer={renderer} />
        <CompsCard name="Rescue the Numbers" renderer={renderer} />
      </div>
    </div>
  );
}

interface CompsCardProps {
  renderer: any;
  name: string;
}

function CompsCard({ renderer, name }: CompsCardProps) {
  return (
    <div className="w-1/3 h-auto flex flex-col border-2 border-white p-2 rounded-lg mr-3">
      <p className="text-lg font-bold mt-4">{name}</p>
      <Countdown date={new Date(2021, 9, 18)} renderer={renderer} />
      <div className="flex flex-col w-full h-auto mt-2">
        <p className="font-bold text-lg">Lomba sudah bisa dimulai</p>
        <button className="rounded-2xl text-white font-bold text-xl px-4 py-2 mt-2 flex justify-center items-center bg-gradient-to-r from-persimmon to-orange hover:scale-105 transition-all ease-in-out active:scale-100">
          {"Mulai >"}
        </button>
      </div>
    </div>
  );
}
