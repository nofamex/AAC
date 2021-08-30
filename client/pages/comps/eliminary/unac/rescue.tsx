import Layout from "@components/Context/Layout";
import ScratchTimer from "@components/Eliminary/ScratchTimer";
import RescueHeader from "@components/Eliminary/RescueHeader";
import RescueQuestion from "@components/Eliminary/RescueQuestion";
import PrivateRoute from "@components/Context/PrivateRoute";
import CompsModal from "@components/Modal/CompsModal";
import Button from "@components/Context/Button";
import { useState, useEffect } from "react";
import api from "@lib/axios";
import { useRouter } from "next/router";
import Loader from "@components/Context/Loader";

export default function RescueNumbers() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [endTIme, setEndTime] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function data() {
      api
        .get("/config/time")
        .then((res) => {
          setEndTime(res.data.rescue_the_number_stop.Time);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
    data();
    if (localStorage.getItem("isRescueStarted") !== "benar") {
      router.push("/dashboard");
    }
  }, [router]);

  const acceptFinishHandler = () => {
    api.post("/elim/unac/rescue/finish").then(() => {
      localStorage.removeItem("isRescueStarted");
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
              <span className="text-stroke">RESCUE THE NUMBERS</span>
            </p>
          </div>
          <div className="h-screen w-full flex">
            <div className="h-full w-3/5 flex flex-col items-end">
              <RescueHeader />
              <RescueQuestion />
              <div className="h-16 w-3/5 flex justify-end mt-4">
                <div className="w-4/5 flex items-center justify-end mr-4">
                  <Button
                    text="Selesai >"
                    filled={true}
                    handler={() => setShow(true)}
                  />
                </div>
              </div>
            </div>
            <div className="h-full w-2/5">
              <ScratchTimer endTime={endTIme} type="rescue" />
            </div>
          </div>
          <div className="h-96 w-full flex" />
        </div>
      </Layout>
    </PrivateRoute>
  );
}
