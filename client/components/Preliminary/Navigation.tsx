import Countdown from "react-countdown";
import Number from "@components/Preliminary/Number";

export default function Navigation() {
  const renderer = ({ days, hours, minutes }: any) => {
    return (
      <div className="flex font-dm font-bold text-xl">
        <p>
          {days} <span className="mr-1 ml-1">:</span>
        </p>
        <p>
          {hours} <span className="mr-1+ ml-1">:</span>
        </p>
        <p>{minutes}</p>
      </div>
    );
  };

  return (
    <div className="h-auto w-72 p-2">
      <div className="w-full h-10 mb-2"></div>
      <div className="w-full h-auto bg-compe rounded-xl flex flex-col justify-center items-center text-white p-4">
        <p className="font-bold text-lg mb-2">Time Left</p>
        <Countdown date={new Date(2021, 7, 28)} renderer={renderer} />
        <p className="font-bold text-lg mt-8">Progress</p>
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
                selected={r === 2 ? true : false}
              />
            ))}
          </div>
          <div className="flex justify-center mb-2">
            {row2.map((r, i) => (
              <Number key={`r2${i}`} nums={r} />
            ))}
          </div>
          <div className="flex justify-center">
            {row3.map((r, i) => (
              <Number key={`r3${i}`} nums={r} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const row1 = [1, 2, 3, 4];
const row2 = [5, 6, 7, 8];
const row3 = [9, 10, 11, 12];
