import Button from "@components/Context/Button";
import Layout from "@components/Context/Layout";
import Navigation from "@components/Preliminary/Navigation";
import QuestionBox from "@components/Preliminary/QuestionBox";
import FillBox from "@components/Preliminary/FillBox";

export default function PremsComps() {
  return (
    <Layout>
      <div className="h-16 w-full bg-black-80 z-0"></div>
      <div className="w-full min-h-screen h-auto bg-black-80 flex flex-col px-32 py-6">
        <div className="w-full h-24 font-dm text-white flex flex-col items-center justify-center mb-5">
          <p
            className="font-bold italic text-5xl md:text-6xl"
            style={{ textShadow: "0 0 25px #7303C0" }}
          >
            <span className="text-stroke">NAMA LOMBA</span>
          </p>
        </div>
        <div className="w-full flex h-auto">
          <div className="h-auto w-9/12 p-2">
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-persimmon to-orange h-10 mb-2 text-center">
              PAGE 2 OF 12
            </p>
            <QuestionBox num={11} difficulty="Easy" />
            <QuestionBox num={12} difficulty="Medium" />
            <QuestionBox num={13} difficulty="Hard" />
            <FillBox num={14} difficulty="Easy" />
            <FillBox num={15} difficulty="Medium" />
            <div className="w-full flex justify-end">
              <Button text="Lanjut >" filled={true} handler={() => {}} />
            </div>
          </div>
          <Navigation />
        </div>
      </div>
    </Layout>
  );
}
