/* eslint-disable @next/next/link-passhref */
import PatternBG from "@components/Context/PatternBG";
import Button from "@components/Context/Button";
import Slider from "@components/Context/Slider";
import Image from "next/image";
import { useRouter } from "next/router";

interface CompeDetailsProps {
  type: string;
}

export default function CompeDetails({ type }: CompeDetailsProps) {
  const router = useRouter();

  const TACGB =
    "https://drive.google.com/file/d/16OLPjMaLhJcwGr4dDpgoIlViL044TH9B/view?usp=sharing";

  const UNACGB =
    "https://drive.google.com/file/d/11Zw0ygjCnCdcovyDlpmDqmmQvx0rEZS_/view?usp=sharing";

  const imageListUNAC = [
    "/picture/unac-slider-1.png",
    "/picture/unac-slider-2.png",
    "/picture/unac-slider-3.png",
    "/picture/unac-slider-4.png",
  ];

  const imageListTAC = [
    "/picture/tac-slider-1.png",
    "/picture/tac-slider-2.png",
    "/picture/tac-slider-3.png",
    "/picture/tac-slider-4.png",
  ];

  return (
    <div className="h-section w-full bg-black-80 flex flex-col justify-center items-center overflow-hidden relative">
      <PatternBG position="right" />
      <div className="h-20 w-full relative flex justify-center mb-8">
        <Image
          src={
            type === "unac"
              ? "/picture/unac-heading.svg"
              : "/picture/tac-heading.svg"
          }
          alt="Heading"
          layout="fill"
        />
      </div>
      <div className="h-auto w-full flex flex-col lg:flex-row z-10 items-center">
        <div className="w-1/2 h-full flex justify-center">
          <Slider images={type === "unac" ? imageListUNAC : imageListTAC} />
        </div>
        <div className="w-full lg:w-1/2 h-full flex flex-col font-dm justify-center xl:p-4">
          {type === "unac" ? (
            <p className="text-white text-xs md:text-base lg:text-lg mt-4 lg:mt-0 p-4 md:p-0 text-center lg:text-left">
              Unair National Accounting Competition (UNAC) adalah serangkaian
              acara kompetisi yang diselenggarakan oleh Himpunan Mahasiswa S1
              Akuntansi Universitas Airlangga yang ditujukan untuk seluruh
              mahasiswa aktif jurusan akuntansi perguruan tinggi baik negeri
              maupun swasta di seluruh Indonesia. Para peserta akan bertanding
              melalui empat tahap kompetisi mulai dari Preliminary, Eliminasi,
              Semifinal, dan Final.
            </p>
          ) : (
            <p className="text-white text-xs md:text-base lg:text-lg mt-4 lg:mt-0 p-4 lg:p-0 text-center lg:text-left">
              Teenage Accounting Competition (TAC) merupakan serangkaian acara
              kompetisi yang diselenggarakan oleh Himpunan Mahasiswa S1
              Akuntansi Universitas Airlangga yang ditujukan untuk seluruh
              siswa/i SMA dan SMK sederajat di seluruh Indonesia. Terdapat empat
              babak dalam kompetisi ini antara lain, Preliminary, Eliminasi,
              Semifinal, dan Final.
            </p>
          )}

          <div className="flex flex-col sm:flex-row mt-4 lg:mt-8 justify-center lg:justify-start items-center">
            <a
              href={type === "unac" ? UNACGB : TACGB}
              target="_blank"
              rel="noreferrer"
              className="mr-0 mb-4 sm:mr-8 sm:mb-0 flex"
            >
              <Button
                text="Download Guidebook"
                handler={() => {}}
                filled={false}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
