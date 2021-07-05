import Image from "next/image";

export default function ComingSoon() {
  return (
    <>
      <div className="h-hero bg-black-80 flex justify-center relative">
        <div className="font-dm flex flex-col justify-center items-center text-white">
          <p
            className="font-bold italic text-5xl md:text-8xl"
            style={{ textShadow: "0 0 25px #7303C0" }}
          >
            COMING SOON
          </p>
          <p>Halaman ini akan datang segera</p>
        </div>
        <Image
          src="/picture/pattern.svg"
          alt="coming soon"
          layout="fill"
          className="z-0"
        />
      </div>
    </>
  );
}
