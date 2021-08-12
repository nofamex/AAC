import { HiDownload } from "react-icons/hi";
import Countdown from "react-countdown";

export default function Preliminary() {
  const renderer = ({ days, hours, minutes }: any) => {
    return (
      <div className="flex font-dm font-bold text-3xl">
        <p>
          {days} <span className="mr-1 ml-1">:</span>
        </p>
        <p>
          {hours} <span className="mr-1 ml-1">:</span>
        </p>
        <p>{minutes}</p>
      </div>
    );
  };

  return (
    <div className="border-white border-2 rounded-lg w-full h-auto p-4">
      <p className="font-bold text-lg">Babak Preliminary</p>
      <p className="text-lg mt-4">
        Akan dimulai tanggal <span className="font-bold">28 Agustus 2021</span>
      </p>
      <Countdown date={new Date(2021, 7, 28)} renderer={renderer} />
      <p className="text-lg mt-4">Aturan dan cara pengerjaan lomba:</p>
      <button className="border-2 border-orange rounded-2xl text-orange font-bold text-xl px-16 py-3 mt-2 flex justify-center items-center">
        <span className="mr-2">
          <HiDownload className="text-2xl" />
        </span>
        Download
      </button>
      <div className="flex flex-col justify-center items-center w-full h-auto mt-4">
        <p className="font-bold text-white text-xl">Lomba sudah bisa dimulai</p>
        <button className="rounded-2xl text-white font-bold text-xl px-16 py-3 mt-2 flex justify-center items-center bg-gradient-to-r from-persimmon to-orange">
          Mulai {">"}
        </button>
      </div>
    </div>
  );
}
