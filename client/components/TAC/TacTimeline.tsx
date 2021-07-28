import PatternBG from "@components/Context/PatternBG";
import { useWindowSize } from "@hooks/useWindowSize";
import { Chrono } from "react-chrono";

export default function TacTimeline() {
  const size = useWindowSize();

  const timelineItems = [
    {
      title: "Babak Preliminary",
      desc: "28 Agustus 2021",
    },
    {
      title: "Daftar Ulang",
      desc: "29 Agustus-7 September 2021",
    },
    {
      title: "Technical Meeting",
      desc: "8 September 2021",
    },
    {
      title: "Babak Eliminasi",
      desc: "9 September 2021",
    },
    {
      title: "Webinar TAC",
      desc: "10 September 2021",
    },
    {
      title: "Babak Semifinal & Techincal Meeting",
      desc: "11 September 2021",
    },
    {
      title: "Final & Awarding Night",
      desc: "12 September 2021",
    },
  ];

  return (
    <div className="h-auto w-full bg-black-80 overflow-hidden relative flex flex-col justify-center items-center">
      <PatternBG position="right" />
      <div className="h-20 w-full text-white flex justify-center z-10">
        <p
          className="font-bold italic text-5xl md:text-6xl"
          style={{ textShadow: "0 0 25px #7303C0" }}
        >
          <span className="text-stroke">TIMELINE</span>
        </p>
      </div>
      <div className="text-white md:w-200">
        <Chrono
          theme={{
            primary: "#FDA305",
            secondary: "#03001E",
            cardBgColor: "transparent",
            cardForeColor: "#F4F4F4",
          }}
          mode={(size?.width ?? 0) > 800 ? "VERTICAL_ALTERNATING" : "VERTICAL"}
          disableNavOnKey
          hideControls={true}
          useReadMore={false}
          cardHeight={100}
        >
          {timelineItems.map((item, index) => (
            <div className="text-left" key={index}>
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-persimmon to-orange">
                {item.title}
              </p>
              <p>{item.desc}</p>
            </div>
          ))}
        </Chrono>
      </div>
    </div>
  );
}
