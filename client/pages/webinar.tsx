import Layout from "@components/Context/Layout";
import PatternBG from "@components/Context/PatternBG";
import { MdDateRange } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import tw from "tailwind-styled-components";
import Image from "next/image";

export default function Webinar() {
  const Benefit = tw.div`bg-white text-black rounded-xl flex justify-center items-center mr-2 px-2 py-1`;
  return (
    <Layout>
      <div className="h-16 w-full bg-black-80 z-0" />
      <div className="h-screen bg-orange overflow-hidden relative flex flex-col justify-center items-center font-dm">
        <PatternBG position="right" />
        <PatternBG position="left" />
        <div className="absolute h-full w-full right-wbpat hidden sm:block">
          <Image
            src="/picture/webinar/pattern.svg"
            layout="fill"
            alt="pattern"
            className="z-0"
          />
        </div>
        <div className="absolute h-full w-full left-wbpat rotate-180 hidden sm:block">
          <Image
            src="/picture/webinar/pattern.svg"
            layout="fill"
            alt="pattern"
            className="z-0"
          />
        </div>
        <div className="w-full h-10 flex justify-center items-end mb-8">
          <div className="bg-persimmon text-white font-bold w-44 flex justify-center items-center px-2 py-1 rounded">
            SEMINAR NASIONAL
          </div>
        </div>
        <div className="w-full h-40 flex justify-center items-center mb-8">
          <div className="h-full w-1/2 text-white flex justify-center items-center">
            <p
              className="font-bold italic text-xl sm:text-3xl md:text-4xl flex justify-center"
              style={{ textShadow: "0 0 25px #7303C0" }}
            >
              <span className="text-stroke text-center">
                Acknowledging The Importance of Accountants as the Key in the
                Economic Recovery
              </span>
            </p>
          </div>
        </div>
        <div className="w-full h-16 text-black flex flex-col justify-center items-center font-bold mb-8">
          <p className="flex items-center">
            <span className="mr-2">
              <MdDateRange className="text-xl" />
            </span>
            11 September 2021
          </p>
          <p className="flex items-center">
            <span className="mr-2">
              <BiTimeFive className="text-xl" />
            </span>
            09.00 WIB - selesai
          </p>
        </div>
        <div className="w-full h-auto flex flex-col sm:flex-row items-center justify-center mb-8">
          <div className="flex mb-2 sm:mb-0">
            <Benefit className="mr-2">Open for public</Benefit>
            <Benefit>E-Certificate</Benefit>
          </div>
          <div className="flex">
            <Benefit>Doorprize</Benefit>
            <Benefit>Reward</Benefit>
          </div>
        </div>
        <div className="w-full h-32 flex justify-center items-center">
          <button
            className="bg-persimmon text-white font-bold text-lg px-10 py-2 rounded-xl hover:scale-110 transition ease-in-out active:scale-100"
            onClick={() => {}}
          >
            Daftar Gratis
          </button>
        </div>
      </div>
    </Layout>
  );
}
