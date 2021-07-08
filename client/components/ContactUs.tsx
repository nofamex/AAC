import Image from "next/image";
import PatternBG from "./PatternBG";

export default function ContactUs() {
  return (
    <div>
      <div className="h-16 w-full bg-black-80"></div>
      {/* karena metok jadi broken, nunggu ada sponsor paling biar ga broken */}
      {/* <PatternBG position="right" /> */}
      <div className="w-full bg-black-80 flex flex-col items-center justify-center">
        <div className="w-full h-24 font-dm text-white flex flex-col items-center justify-center mb-5">
          <p
            className="font-bold italic text-5xl md:text-6xl"
            style={{ textShadow: "0 0 25px #7303C0" }}
          >
            <span className="text-stroke">KONTAK KAMI</span>
          </p>
        </div>
        <div className="h-12 w-full bg-black-80"></div>
        <div className="text-grey-20 text-2xl">
          <div className="mb-4 flex flex-wrap flex-row items-center content-start">
            <Image
              src="/picture/logo/line.svg"
              height="32px"
              width="32px"
            />
            <p className="ml-3">@grv1752i</p>
          </div>
          <div className="flex flex-wrap flex-row items-center content-start">
            <Image
              src="/picture/logo/instagram.svg"
              height="32px"
              width="32px"
            />
            <p className="ml-3">@aacairlangga</p>
          </div>
        </div>
        <div className="h-40 w-full bg-black-80"></div>
      </div>
    </div>
  );
}
