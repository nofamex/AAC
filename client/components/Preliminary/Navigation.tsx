import Countdown from "react-countdown";
import Number from "@components/Preliminary/Number";
import { toCurrentTimezone } from "@lib/date";

interface NavigationProps {
  endTime: string;
}

export default function Navigation({ endTime }: NavigationProps) {
  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    return (
      <div className="flex font-dm font-bold text-xl">
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
    <div className="h-auto w-72 p-2">
      <div className="w-full h-10 mb-2"></div>
      <div className="w-full h-auto bg-compe rounded-xl flex flex-col justify-center items-center text-white p-4">
        <p className="font-bold text-lg mb-2">Time Left</p>
        <Countdown date={toCurrentTimezone(endTime)} renderer={renderer} />
        <p className="font-bold text-lg mt-4">Progress</p>
        <p className="text-center text-sm mb-8">
          <span className="font-bold">Ingat!</span> Halaman yang sudah
          dikerjakan tidak bisa diakses kembali
        </p>
        <div className="w-full h-auto flex flex-col">
          <div className="flex justify-center mb-2">
            {row1.map((r, i) => (
              <Number
                key={`r1${i}`}
                nums={r}
                selected={String(r) === "1" ? true : false}
              />
            ))}
          </div>
          {/* <div className="flex justify-center mb-2">
            {row2.map((r, i) => (
              <Number key={`r2${i}`} nums={r} />
            ))}
          </div>
          <div className="flex justify-center">
            {row3.map((r, i) => (
              <Number key={`r3${i}`} nums={r} />
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
}

const row1 = [1, 2, 3];
const row2 = [5, 6, 7, 8];
const row3 = [9, 10, 11, 12];
