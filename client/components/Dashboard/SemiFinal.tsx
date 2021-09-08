import Button from "@components/Context/Button";
import { toCurrentTimezone } from "@lib/date";
import Countdown from "react-countdown";
import Countdowns from "./Countdown";
import { useRouter } from "next/router";

interface SemiFinalProps {
  status: string;
  type: string;
}

export default function SemiFinal({ status, type }: SemiFinalProps) {
  const router = useRouter();

  const UNACDate = "2021-09-10T07:30:00Z";
  const TACDATE = "2021-09-11T08:00:00Z";

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
      <p className="font-bold text-lg">Babak SemiFinal</p>

      {status === "lolos" && (
        <>
          <p className="text-lg mt-4">
            Akan dimulai tanggal{" "}
            <span className="font-bold text-orange">
              {type === "unac" ? "10 September 2021" : "11 September 2021"}
            </span>
          </p>
          <div className="w-full flex justify-start items-center">
            <Countdown
              date={toCurrentTimezone(type === "unac" ? UNACDate : TACDATE)}
              renderer={renderer}
            />
          </div>
        </>
      )}
      {status === "gagal" && (
        <div>
          <p className="text-lg mt-4 mb-2">
            Maaf, Anda belum lolos tahap eliminary, anda bisa mengikuti webinar
            disini:
          </p>
          <Button
            text="Ikuti Webinar"
            handler={() => {
              router.push("/webinar");
            }}
            filled={false}
          />
        </div>
      )}
    </div>
  );
}
