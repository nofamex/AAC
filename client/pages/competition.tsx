import CompetitionCard from "../components/CompetitionCard";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

export default function Competition() {
  const router = useRouter();

  const UNACDesc =
    "Serangkaian kompetisi yang ditujukan untuk seluruh mahasiswa aktif jurusan akuntansi di perguruan tinggi negeri maupun swasta di seluruh Indonesia.";

  const TACDesc =
    "Serangkaian kompetisi akuntansi yang ditujukan untuk seluruh siswa/i SMA sederajat di seluruh Indonesia.";

  const UNAChandler = () => {
    router.push("/unac");
  };

  const TACHandler = () => {
    router.push("/tac");
  };

  return (
    <Layout>
      <div className="h-16 w-full bg-black-80"></div>
      <div className="h-compeMobile md:h-section w-full bg-black-80 flex flex-col items-center justify-center">
        <div className="w-full h-24 font-dm text-white flex flex-col items-center justify-center mb-5">
          <p
            className="font-bold italic text-4xl"
            style={{ textShadow: "0 0 25px #7303C0" }}
          >
            COMPETITION
          </p>
          <p className="text-sm md:text-md mt-3 text-center">
            Ketahui Competition yang diselenggarakan di AAC 2021.
          </p>
        </div>
        <div className="flex flex-col md:flex-row h-auto w-auto">
          <CompetitionCard
            handler={UNAChandler}
            image="/picture/unac-logo.svg"
            desc={UNACDesc}
          />
          <CompetitionCard
            handler={TACHandler}
            image="/picture/tac-logo.svg"
            desc={TACDesc}
          />
        </div>
      </div>
    </Layout>
  );
}
