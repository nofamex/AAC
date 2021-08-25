import PatternBG from "@components/Context/PatternBG";

export default function WebinarFoot() {
  return (
    <div className="h-screen bg-orange overflow-hidden relative flex flex-col justify-center items-center font-dm">
      <PatternBG position="right" />
      <PatternBG position="left" />
      <div className="w-full h-40 flex justify-center items-center mb-8">
        <div className="h-full w-1/2 text-white flex justify-center items-center">
          <p
            className="font-bold italic text-xl sm:text-3xl md:text-4xl flex justify-center"
            style={{ textShadow: "0 0 25px #7303C0" }}
          >
            <span className="text-stroke text-center">Tunggu apa lagi?</span>
          </p>
        </div>
      </div>
      <a
        href="https://bit.ly/PendaftaranWEBINARAAC2021"
        target="_blank"
        className="z-30"
        rel="noreferrer"
      >
        <button className="bg-persimmon text-white font-bold text-lg px-10 py-2 rounded-xl cursor-pointer z-30 hover:scale-110 transition ease-in-out active:scale-100">
          Daftar Gratis
        </button>
      </a>
    </div>
  );
}
