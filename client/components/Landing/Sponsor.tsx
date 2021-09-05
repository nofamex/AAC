import Image from "next/image";

export default function Sponsor() {
  return (
    <div className="w-full bg-black-80 flex flex-col justify-center items-center">
      <div className="w-full h-24 font-dm text-white flex flex-col items-center justify-center mb-5">
        <p
          className="font-bold italic text-5xl md:text-6xl"
          style={{ textShadow: "0 0 25px #7303C0" }}
        >
          <span className="text-stroke">SPONSOR KAMI</span>
        </p>
      </div>
      <div className="w-3/5 min-h-sponsor max-h-screen bg-white rounded-xl flex flex-col justify-center py-4">
        <SponsorRow>
          <SponsorLogo
            src="/picture/sponsor/Pelindo.png"
            width="w-52"
            height="h-14"
          />
          <SponsorLogo
            src="/picture/sponsor/Pegadaian.png"
            width="w-44"
            height="h-24"
          />
          <SponsorLogo
            src="/picture/sponsor/himalaya.png"
            width="w-36"
            height="h-10"
          />
          <SponsorLogo
            src="/picture/sponsor/Danareksa.png"
            width="w-44"
            height="h-14"
          />
        </SponsorRow>
        <SponsorRow>
          <SponsorLogo
            src="/picture/sponsor/Pahamify.png"
            width="w-24"
            height="h-10"
          />
          <SponsorLogo
            src="/picture/sponsor/BNI.png"
            width="w-24"
            height="h-10"
          />
          <SponsorLogo
            src="/picture/sponsor/BTN.png"
            width="w-24"
            height="h-12"
          />
          <SponsorLogo
            src="/picture/sponsor/INKA.png"
            width="w-20"
            height="h-4"
          />
          <SponsorLogo
            src="/picture/sponsor/Cicil.png"
            width="w-12"
            height="h-5"
          />
          <SponsorLogo
            src="/picture/sponsor/harisenin.png"
            width="w-20"
            height="h-4"
          />
          <SponsorLogo
            src="/picture/sponsor/GWLC.png"
            width="w-10"
            height="h-7"
          />
          <SponsorLogo
            src="/picture/sponsor/IAIJatim.png"
            width="w-12"
            height="h-9"
          />
          <SponsorLogo
            src="/picture/sponsor/arekFeua.png"
            width="w-16"
            height="h-12"
          />
        </SponsorRow>
      </div>
    </div>
  );
}

interface SponsorLogoProps {
  src: string;
  width: string;
  height: string;
}

function SponsorLogo({ src, width, height }: SponsorLogoProps) {
  return (
    <div
      className={`relative ${width} ${height} mr-4 object-contain mb-4 md:mb-0`}
    >
      <Image src={src} alt="sponsor" layout="fill" />
    </div>
  );
}

function SponsorRow({ children }: any) {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center w-full h-full">
      {children}
    </div>
  );
}
