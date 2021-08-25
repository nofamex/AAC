import PatternBG from "@components/Context/PatternBG";
import Image from "next/image";

export default function WebinarSpeaker() {
  return (
    <div className="min-h-screen bg-orange overflow-hidden relative flex flex-col justify-center items-center font-dm relative">
      <PatternBG position="right" />
      <PatternBG position="left" />
      <div className="w-full h-40 flex justify-center items-center">
        <p className="font-bold font-dm text-eggplant text-3xl sm:text-4xl md:text-5xl">
          Pembicara
        </p>
      </div>
      <div className="w-full h-full flex flex-col md:flex-row justify-center items-center">
        <div className="h-[50vh] md:h-[70vh] w-full relative mb-4 md:mb-0">
          <Image
            src="/picture/webinar/speaker-1.svg"
            layout="fill"
            alt="speaker 1"
          />
        </div>
        <div className="h-[50vh] md:h-[70vh] w-full relative mb-4 md:mb-0">
          <Image
            src="/picture/webinar/speaker-2.svg"
            layout="fill"
            alt="speaker 2"
          />
        </div>
        <div className="h-[50vh] md:h-[70vh] w-full relative">
          <Image
            src="/picture/webinar/speaker-3.svg"
            layout="fill"
            alt="speaker 3"
          />
        </div>
      </div>
    </div>
  );
}
