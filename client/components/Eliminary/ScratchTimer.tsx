import { toCurrentTimezone } from "@lib/date";
import Countdown from "react-countdown";
import { useState } from "react";
import CompsModal from "@components/Modal/CompsModal";
import { useRouter } from "next/router";
import api from "@lib/axios";

interface ScratchTimerProps {
  endTime: string;
  type: string;
}

export default function ScratchTimer({ endTime, type }: ScratchTimerProps) {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const acceptFinishHandler = () => {
    api.post(`/elim/unac/${type}/finish`).then(() => {
      localStorage.removeItem("isScratchStarted");
      localStorage.removeItem("isRescueStarted");
      router.push("/dashboard");
    });
  };

  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
      setShow(true);
    }
    return (
      <div className="flex font-dm font-bold text-3xl">
        <p>
          {hours} <span className="mr-2">:</span>
        </p>
        <p>
          {minutes} <span className="mr-2">:</span>
        </p>
        <p>{seconds}</p>
      </div>
    );
  };

  return (
    <>
      {show && (
        <CompsModal
          closeHandler={() => setShow(false)}
          acceptHandler={acceptFinishHandler}
          headerText="Waktu Habis"
          bodyText="Waktu mengerjakan sudah habis, silahkan kembali ke dashboard"
          innerButtonText="Selesai >"
        />
      )}
      <div className="w-4/5 h-40 bg-compe rounded-xl mb-4 font-dm text-white flex flex-col justify-center items-center">
        <p className="font-bold text-2xl mb-2">Time Left</p>
        <Countdown date={toCurrentTimezone(endTime)} renderer={renderer} />
      </div>
    </>
  );
}
