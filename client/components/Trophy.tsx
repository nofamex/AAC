import Image from "next/image";

interface TrophyProps {
  pos: string;
  prize: string;
}

export default function Trophy({ pos, prize }: TrophyProps) {
  return (
    <div className="h-36 md:h-80 w-full md:w-60 bg-compe rounded-xl mr-0 md:mr-8 flex md:flex-col">
      <div className="w-full h-full md:h-3/4 relative">
        <Image src={`/picture/trophy-${pos}.svg`} alt="trophy" layout="fill" />
      </div>
      <div className="w-full h-full md:h-1/4 font-dm flex flex-col items-center text-white justify-center">
        <p className="text-xl font-bold">Juara {pos}</p>
        <p className="text-sm text-center">{prize}</p>
      </div>
    </div>
  );
}
