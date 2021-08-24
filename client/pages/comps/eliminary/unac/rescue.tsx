import Layout from "@components/Context/Layout";
import ScratchTimer from "@components/Eliminary/ScratchTimer";
import RescueHeader from "@components/Eliminary/RescueHeader";
import RescueQuestion from "@components/Eliminary/RescueQuestion";
import PrivateRoute from "@components/Context/PrivateRoute";
import CompsModal from "@components/Modal/CompsModal";
import Button from "@components/Context/Button";
import { useState } from "react";

export default function RescueNumbers() {
  const [show, setShow] = useState(false);
  return (
    <PrivateRoute>
      <Layout>
        {show && (
          <CompsModal
            closeHandler={() => setShow(false)}
            acceptHandler={() => console.log("selesai")}
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
            </div>
            <div className="h-full w-2/5">
              <ScratchTimer />
            </div>
          </div>
          <div className="h-screen w-full flex">
            <div className="h-16 w-3/5 flex justify-end">
              <div className="w-4/5 h-full flex items-center justify-end mr-4">
                <Button
                  text="Selesai >"
                  filled={true}
                  handler={() => setShow(true)}
                />
              </div>
            </div>
            <div className="h-full w-2/5" />
          </div>
        </div>
      </Layout>
    </PrivateRoute>
  );
}
