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
    <div className="w-80 lg:w-96 xl:w-compeCard h-72 lg:h-80 xl:h-compeCard rounded-2xl mb-5 lg:mb-0 lg:mr-4 cursor-pointer">
      <div className="w-full h-40 lg:h-48 xl:h-compeCardImg rounded-t-2xl flex lg:items-center lg:justify-center relative overflow-hidden">
        <Image
          src={image}
          alt="Competition Logo"
          layout="fill"
          className="hover:scale-105 transition ease-in-out"
        />
      </div>
      <div className="w-full h-32 lg:h-compeCardDesc bg-compe rounded-b-2xl flex flex-col items-center justify-center">
        <p className="font-md text-white text-center text-xs lg:text-base cursor-default">
          {desc}
        </p>
        <div className="w-full flex justify-center mt-5">
          <Button text="Lebih Lanjut>" handler={handler} filled={false} />
        </div>
      </div>
    </div>
  );
}
