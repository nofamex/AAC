import CompetitionCard from "../components/CompetitionCard";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

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
      <div className="h-compeMobile md:h-section md:min-h-screen w-full bg-black-80 flex flex-col items-center justify-center">
        <div className="w-full h-24 font-dm text-white flex flex-col items-center justify-center mb-5">
          <p
            className="font-bold italic text-3xl sm:text-5xl md:text-6xl"
            style={{ textShadow: "0 0 25px #7303C0" }}
          >
            <span className="text-stroke">COMPETITION</span>
          </p>
        </div>
        <div className="flex flex-col lg:flex-row h-auto w-auto">
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0, transition: { duration: 0.5 } }}
          >
            <CompetitionCard
              handler={UNAChandler}
              image="/picture/unac-logo.png"
              desc={UNACDesc}
            />
          </motion.div>
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0, transition: { duration: 0.5 } }}
          >
            <CompetitionCard
              handler={TACHandler}
              image="/picture/tac-logo.png"
              desc={TACDesc}
            />
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
