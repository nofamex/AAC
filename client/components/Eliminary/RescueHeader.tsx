import { HiDownload } from "react-icons/hi";

export default function RescueHeader() {
  return (
    <div className="w-4/5 h-56 bg-compe rounded-xl mr-4 font-dm p-4 flex flex-col justify-center items-center">
      <p className="text-white font-bold text-center text-lg mb-2">
        Silakan mendownload file berisi soal dibawah berikut semoga kalian
        berhasil keren
      </p>
      <a
        href="https://drive.google.com/file/d/1jSmowJ_slp2kd6Sk6XxWrrVQorJz6TGH/view?usp=sharing"
        target="_blank"
        rel="noreferrer"
        className="mr-0 mb-4 sm:mr-8 sm:mb-0 flex"
      >
        <button className="border-2 border-orange rounded-2xl text-orange font-bold text-xl px-16 py-3 mt-2 flex justify-center items-center hover:scale-105 transition-all ease-in-out active:scale-100">
          <span className="mr-2">
            <HiDownload className="text-2xl" />
          </span>
          Download
        </button>
      </a>
    </div>
  );
}
