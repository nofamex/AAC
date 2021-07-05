import Image from "next/image";

export default function HeaderMobile() {
  return (
    <>
      <div className="h-16 w-full bg-black-80 block md:hidden"></div>
      <div className="h-section w-full bg-black-80 flex flex-col items-center justify-start md:hidden">
        <div>
          <Image
            src="/picture/logo.svg"
            width={284}
            height={284}
            alt="AAC Logo"
          />
        </div>
        <div className="font-dm flex flex-col justify-center items-center">
          <p className="font-bold text-2xl md:text-3xl text-orange">
            Apa itu AAC?
          </p>
          <p className="text-xl md:text-xl text-white text-center">
            Acara kompetisi akuntansi yang diikuti oleh peserta dari seluruh
            Indonesia, diselenggarakan oleh Himpunan Mahasiswa Akuntansi,
            Fakultas Ekonomi dan Bisnis Universitas Airlangga.
          </p>
        </div>
      </div>
    </>
  );
}
