import Image from "next/image";

interface FootProps {
  type: string;
}

export default function CompetitionFoot({ type }: FootProps) {
  return (
    <div className="h-96 w-full bg-black-80 relative flex flex-col justify-center items-center">
      <Image
        src={
          type === "unac" ? "/picture/compe-unac.svg" : "/picture/compe-tac.svg"
        }
        alt="unac"
        layout="fill"
        className="object-cover"
      />
      <div className="h-20 w-full text-white flex justify-center z-10">
        <p
          className="font-bold italic text-3xl sm:text-5xl md:text-6xl flex justify-center"
          style={{ textShadow: "0 0 25px #7303C0" }}
        >
          <span className="text-stroke text-center">TUNGGU APA LAGI</span>
        </p>
      </div>
    </div>
  );
}
