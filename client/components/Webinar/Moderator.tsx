import PatternBG from "@components/Context/PatternBG";
import Image from "next/image";

export default function WebinarModerator() {
  return (
    <div className="h-screen bg-orange overflow-hidden relative flex flex-col justify-center items-center font-dm">
      <PatternBG position="right" />
      <PatternBG position="left" />
      <div className="w-full h-40 flex justify-center items-end">
        <p className="font-bold font-dm text-eggplant text-3xl sm:text-4xl md:text-5xl">
          Moderator
        </p>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <div className="h-[50vh] md:h-[70vh] w-full relative">
          <Image
            src="/picture/webinar/moderator.svg"
            layout="fill"
            alt="speaker 1"
          />
        </div>
      </div>
    </div>
  );
}
