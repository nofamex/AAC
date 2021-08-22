import Button from "@components/Context/Button";
import Layout from "@components/Context/Layout";
import Navigation from "@components/Preliminary/Navigation";
import QuestionBox from "@components/Preliminary/QuestionBox";
import PrivateRoute from "@components/Context/PrivateRoute";
import { useEffect, useState } from "react";
import api from "@lib/axios";
import Loader from "@components/Context/Loader";
import CompsModal from "@components/Modal/CompsModal";
import { useRouter } from "next/router";

export default function PremsCompsUNAC() {
  const router = useRouter();
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [paket, setPaket] = useState(0);
  const [pgShow, setPgShow] = useState(false);
  const [esShow, setEsShow] = useState(false);

  useEffect(() => {
    async function data() {
      api
        .get("/config/time")
        .then((res) => {
          setEndTime(res.data.prelim_unac_stop.Time);
        })
        .catch((err) => console.log(err));
      api
        .get("/prelim/unac/soal")
        .then((res) => {
          setQuestion(res.data.body);
          setPage(res.data.page);
          setPaket(res.data.paket);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
    data();
  }, []);

  const acceptContinueHandler = () => {
    api.get("/prelim/unac/next").then(() => router.reload());
  };

  const acceptFinishHandler = () => {
    api.post("/prelim/unac/finish").then(() => {
      router.push("/dashboard");
      localStorage.removeItem("isPrelimStarted");
    });
  };

  if (loading) {
    return <Loader height="h-screen" />;
  }

  return (
    <PrivateRoute>
      <Layout>
        <div className="h-16 w-full bg-black-80 z-0" />
        {pgShow && (
          <CompsModal
            closeHandler={() => setPgShow(false)}
            acceptHandler={acceptContinueHandler}
            headerText="Anda yakin ingin lanjut?"
            bodyText="Halaman yang sudah dikerjakan tidak bisa diakses kembali"
            innerButtonText="Lanjut"
          />
        )}
        {esShow && (
          <CompsModal
            closeHandler={() => setEsShow(false)}
            acceptHandler={acceptFinishHandler}
            headerText="Anda yakin ingin menyelesaikan?"
            bodyText="Tugas yang sudah selesai tidak bisa dikerjakan kembali"
            innerButtonText="Lanjut"
          />
        )}
        <div className="w-full min-h-screen h-auto bg-black-80 flex flex-col px-32 py-6">
          <div className="w-full h-24 font-dm text-white flex flex-col items-center justify-center mb-5">
            <p
              className="font-bold italic text-5xl md:text-6xl"
              style={{ textShadow: "0 0 25px #7303C0" }}
            >
              <span className="text-stroke">UNAC</span>
            </p>
          </div>
          <div className="w-full flex h-auto">
            <div className="h-auto w-9/12 p-2">
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-persimmon to-orange h-10 mb-2 text-center">
                PAGE {page} OF 3
              </p>
              {question.map((qs: any) => (
                <QuestionBox
                  id={qs.id}
                  num={qs.no}
                  difficulty={qs.bobot}
                  key={qs.id}
                  question={qs.soal}
                  paket={paket}
                  p1={qs.pilihan1}
                  p2={qs.pilihan2}
                  p3={qs.pilihan3}
                  p4={qs.pilihan4}
                  type={page === 3 ? "essay" : "pg"}
                  cmpt="unac"
                />
              ))}
              <div className="w-full flex justify-end">
                {page !== 3 ? (
                  <Button
                    text="Lanjut >"
                    filled={true}
                    handler={() => setPgShow(true)}
                  />
                ) : (
                  <Button
                    text="Selesai >"
                    filled={true}
                    handler={() => setEsShow(true)}
                  />
                )}
              </div>
            </div>
            <Navigation endTime={endTime} page={page} />
          </div>
        </div>
      </Layout>
    </PrivateRoute>
  );
}
