import Image from "next/image";
import Button from "../components/Button";

interface CompetitionCardProps {
  handler: Function;
  image: string;
  desc: string;
}

export default function CompetitionCard({
  handler,
  image,
  desc,
}: CompetitionCardProps) {
  return (
    <div className="w-80 md:w-compeCard h-72 md:h-compeCard rounded-2xl mb-5 md:mb-0 md:mr-4 cursor-pointer">
      <div className="w-full h-40 md:h-compeCardImg rounded-t-2xl flex md:items-center md:justify-center relative overflow-hidden">
        <Image
          src={image}
          alt="Competition Logo"
          layout="fill"
          className="hover:scale-105 transition ease-in-out"
        />
      </div>
      <div className="w-full h-32 md:h-compeCardDesc bg-compe rounded-b-2xl flex flex-col items-center justify-center">
        <p className="font-md text-white text-center text-xs md:text-base cursor-default">
          {desc}
        </p>
        <div className="w-full flex justify-center mt-5">
          <Button text="Lebih Lanjut>" handler={handler} filled={false} />
        </div>
      </div>
    </div>
  );
}
