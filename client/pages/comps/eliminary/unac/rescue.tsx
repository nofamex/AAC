import Layout from "@components/Context/Layout";
import ScratchTimer from "@components/Eliminary/ScratchTimer";
import RescueHeader from "@components/Eliminary/RescueHeader";
import RescueQuestion from "@components/Eliminary/RescueQuestion";

export default function RescueNumbers() {
  return (
    <Layout>
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
      </div>
    </Layout>
  );
}
