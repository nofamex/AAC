import { Chrono } from "react-chrono";
import { useWindowSize } from "../hooks/useWindowSize"

export default function Timeline() {
  const size = useWindowSize()

  const timelineItems = [
    {
      title: "Registrasi Early Bird UNAC",
      desc: "12 - 28 Juli 2021"
    },
    {
      title: "Registrasi Early Bird TAC",
      desc: "14 - 30 Juli 2021"
    },
    {
      title: "Registrasi Reguler UNAC",
      desc: "29 Juli - 19 Agustus 2021"
    },
    {
      title: "Registrasi Reguler TAC",
      desc: "31 Juli - 20 Agustus 2021"
    },
    {
      title: "Babak Preliminary",
      desc: "28 Agustus 2021"
    },
    {
      title: "Babak  Mainround",
      desc: "9 - 12 September 2021"
    },
    {
      title: "Awarding Night",
      desc: "12 September 2021"
    },
  ]

  return (
    <div>
      <div className="h-16 w-full bg-black-80"></div>
      <div className="w-full bg-black-80 flex flex-col items-center justify-center">
        <div className="w-full h-24 font-dm text-white flex flex-col items-center justify-center mb-5">
          <p className="font-bold italic text-5xl" style={{ textShadow: "0 0 25px #7303C0" }}>
            <span className="text-stroke">TIMELINE</span>
          </p>
        </div>
        <div className="text-white md:w-200">
          <Chrono
            theme={{primary: "#FDA305", secondary: "#03001E", cardBgColor: "transparent", cardForeColor: "#F4F4F4" }}
            mode={(size?.width ?? 0) > 800 ? "VERTICAL_ALTERNATING" : "VERTICAL"}
            disableNavOnKey
            hideControls={true}
            useReadMore={false}
            cardHeight={100}
          > 
            {timelineItems.map(item => (
              <div className="text-left">
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-persimmon to-orange">{item.title}</p>
                <p>{item.desc}</p>
              </div>
            ))}
          </Chrono>
        </div>
      </div>
    </div>
  );
}
