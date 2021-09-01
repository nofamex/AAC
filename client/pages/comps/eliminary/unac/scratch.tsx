import Layout from "@components/Context/Layout";
import ScratchTimer from "@components/Eliminary/ScratchTimer";
import ScratchQuestion from "@components/Eliminary/ScratchQuestion";
import ScratchGrid from "@components/Eliminary/ScratchGrid";
import PrivateRoute from "@components/Context/PrivateRoute";
import CompsModal from "@components/Modal/CompsModal";
import Button from "@components/Context/Button";
import generateWord from "@lib/word";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import api from "@lib/axios";
import Loader from "@components/Context/Loader";
import Cookies from "js-cookie";

export default function ScratchWords() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [endTime, setEndTime] = useState<any>();
  const generated = generateWord();

  useEffect(() => {
    async function data() {
      api
        .get("/config/time")
        .then((res) => {
          setEndTime(res.data.scratch_the_hidden_words_stop.Time);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
    data();
    if (localStorage.getItem("isScratchStarted") !== "benar") {
      router.push("/dashboard");
    }
  }, [router]);

  const acceptFinishHandler = () => {
    api.post("/elim/unac/scratch/finish").then(() => {
      localStorage.removeItem("isScratchStarted");
      Cookies.remove("scratchFindedWord");
      router.push("/dashboard");
    });
  };

  if (loading) {
    return <Loader height="h-screen" />;
  }

  return (
    <PrivateRoute>
      <Layout>
        {show && (
          <CompsModal
            closeHandler={() => setShow(false)}
            acceptHandler={acceptFinishHandler}
            headerText="Anda yakin ingin menyelesaikan?"
            bodyText="Tugas yang sudah selesai tidak bisa dikerjakan kembali"
            innerButtonText="Lanjut"
          />
        )}
        <div className="h-16 w-full bg-black-80 z-0" />
        <div className="w-full min-h-screen h-auto bg-black-80">
          <div className="w-full h-24 font-dm text-white flex flex-col items-center justify-center mb-5">
            <p
              className="font-bold italic text-5xl md:text-6xl"
              style={{ textShadow: "0 0 25px #7303C0" }}
            >
              <span className="text-stroke">{"SCRATCH THE HIDDEN WORDS"}</span>
            </p>
          </div>
          <div className="h-auto w-full flex">
            <div className="h-full w-2/5 flex flex-col items-end">
              <ScratchTimer endTime={endTime} type="scratch" />
              <ScratchQuestion />
            </div>
            <div className="h-auto w-3/5">
              <ScratchGrid generated={generated} />
            </div>
          </div>
          <div className="h-auto w-full flex">
            <div className="h-full w-2/5 flex flex-col items-end" />
            <div className="h-16 w-3/5">
              <div className="h-full w-11/12 ml-4 flex items-center justify-end">
                <Button
                  text="Selesai >"
                  filled={true}
                  handler={() => setShow(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </PrivateRoute>
  );
}
