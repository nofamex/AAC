import PatternBG from "@components/Context/PatternBG";
import { SiLine } from "react-icons/si";

interface ContactProps {
  type: string;
}

export default function CompetitionContact({ type }: ContactProps) {
  return (
    <div className="w-full h-section overflow-hidden relative bg-black-80 flex flex-col justify-center items-center">
      <PatternBG position="left" />
      <div className="h-20 w-full text-white flex justify-center z-10">
        <p
          className="font-bold italic text-3xl sm:text-5xl md:text-6xl flex justify-center"
          style={{ textShadow: "0 0 25px #7303C0" }}
        >
          <span className="text-stroke text-center">KONTAK KAMI</span>
        </p>
      </div>
      <div className="h-32 w-full flex justify-center items-center z-10">
        <div className="font-dm text-white text-base md:text-lg">
          <p className="font-bold">Acara</p>
          <p>{type === "unac" ? "Stefanie Natania" : "Eza Bagus Mahendra"}</p>
          <div className="flex">
            <div className="flex items-center">
              <SiLine />
            </div>
            <div className="flex items-center ml-2">
              {type === "unac" ? "stefanienatania" : "ezabagusm"}
            </div>
          </div>
        </div>
        <div className="font-dm text-white text-base md:text-lg ml-8">
          <p className="font-bold">KSK</p>
          <p>{type === "unac" ? "Ribka Christy" : "Azzah Vashti"}</p>
          <div className="flex">
            <div className="flex items-center">
              <SiLine />
            </div>
            <div className="flex items-center ml-2">
              {type === "unac" ? "ribkajulianovac" : "azzahvashp"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
