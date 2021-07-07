import Image from "next/image";
import PatternBG from "./PatternBG";
import Button from "./Button";
import Slider from "./Slider";

interface CompeDetailsProps {
  type: string;
}

export default function CompeDetails({ type }: CompeDetailsProps) {
  const TACGB =
    "https://doc-0k-4s-docs.googleusercontent.com/docs/securesc/stvdrkbf93eq2fjfrblivssjg94v413m/20sa3opai6m7gbb5abjq07r4atk6ldmt/1625654025000/10199714916370250412/03010010836392209648/1oIw_RupcHSTBMx8rZN8nzcKT3qL0cusl?e=download&authuser=0&nonce=0s3t60iesuk4e&user=03010010836392209648&hash=pau8c556lk024a4ve6m3ucrk0l17ab2v";

  const UNACGB =
    "https://doc-0g-4s-docs.googleusercontent.com/docs/securesc/stvdrkbf93eq2fjfrblivssjg94v413m/l9ie9ajfpt9f3l9vh9kfr4c6g2s9e8f0/1625654175000/10199714916370250412/03010010836392209648/1fBLA-aqUuZ6LjzkiwbNE4eQFlr2dscLA?e=download&authuser=0";

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

  const handler = () => {
    console.log("object");
  };

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
      <div className="h-96 w-full flex flex-col md:flex-row z-10 items-center">
        <div className="w-1/2 h-full flex justify-center">
          <Slider images={type === "unac" ? imageListUNAC : imageListTAC} />
        </div>
        <div className="w-full md:w-1/2 h-full flex flex-col font-dm justify-center">
          {type === "unac" ? (
            <p className="text-white text-xs md:text-lg mt-4 md:mt-0 p-4 md:p-0 text-center md:text-left">
              Unair National Accounting Competition (UNAC) adalah serangkaian
              acara kompetisi yang diselenggarakan oleh Himpunan Mahasiswa S1
              Akuntansi Universitas Airlangga yang ditujukan untuk seluruh
              mahasiswa aktif jurusan akuntansi perguruan tinggi baik negeri
              maupun swasta di seluruh Indonesia. Para peserta akan bertanding
              melalui empat tahap kompetisi mulai dari Preliminary, Eliminasi,
              Semifinal, dan Final.
            </p>
          ) : (
            <p className="text-white text-xs md:text-lg mt-4 md:mt-0 p-4 md:p-0 text-center md:text-left">
              Teenage Accounting Competition (TAC) merupakan serangkaian acara
              kompetisi yang diselenggarakan oleh Himpunan Mahasiswa S1
              Akuntansi Universitas Airlangga yang ditujukan untuk seluruh
              siswa/i SMA dan SMK sederajat di seluruh Indonesia. Terdapat empat
              babak dalam kompetisi ini antara lain, Preliminary, Eliminasi,
              Semifinal, dan Final.
            </p>
          )}

          <div className="flex mt-0 md:mt-8 justify-center md:justify-start">
            <a
              href={type === "unac" ? UNACGB : TACGB}
              target="_blank"
              rel="noreferrer"
            >
              <Button
                text="Download Guidebook"
                handler={handler}
                filled={false}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
