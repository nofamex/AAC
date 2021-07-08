import { useState } from "react";
import EventCard from "../components/EventCard";
import { useWindowSize } from "../hooks/useWindowSize";
import { useRouter } from "next/router";
import PatternBG from "./PatternBG";

export default function Event() {
  const size = useWindowSize();
  const router = useRouter();

  const [order, setOrder] = useState([
    {
      desc: "Serangkaian kompetisi yang ditujukan untuk seluruh mahasiswa aktif jurusan akuntansi di perguruan tinggi negeri maupun swasta di seluruh Indonesia.",
      image: "/picture/event/unac.svg",
      handler: () => router.push("/unac"),
      title: "UNAC",
    },
    {
      desc: "Serangkaian kompetisi akuntansi yang ditujukan untuk seluruh siswa/i SMA sederajat di seluruh Indonesia.",
      image: "/picture/event/tac.svg",
      handler: () => router.push("/tac"),
      title: "TAC",
    },
    {
      desc: "Webinar tingkat nasional yang mengangkat tema tentang perkembangan dunia akuntansi didukung dengan narasumber yang ahli dalam bidangnya. Gratis dan terbuka untuk umum.",
      image: "/picture/event/webinar.svg",
      handler: () => router.push("/Webinar"),
      title: "Webinar",
    },

    {
      desc: "Acara puncak dari rangkaian kegiatan AAC yang berisi penampilan menarik dan pengumuman pemenang dari seluruh kompetisi pada Airlangga Accounting Competition. ",
      image: "/picture/event/award.svg",
      handler: () => router.push("/awarding-night"),
      title: "Awarding Night",
    },
  ]);

  const swap = (index: number) => {
    let tmp1 = order[0];
    let tmp2 = order[index];
    order[0] = tmp2;
    order[index] = tmp1;
    setOrder([...order]);
  };
  return (
    <div>
      <div className="h-16 w-full bg-black-80"></div>
      <PatternBG position="right" />
      <div className="w-full bg-black-80 flex flex-col items-center justify-center">
        <div className="w-full h-24 font-dm text-white flex flex-col items-center justify-center mb-5">
          <p
            className="font-bold italic text-5xl md:text-6xl"
            style={{ textShadow: "0 0 25px #7303C0" }}
          >
            <span className="text-stroke">EVENTS</span>
          </p>
          <div className="h-12 w-full"></div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 xl:gap-4 h-auto xl:w-280">
          {order.map((item, index) => (
            <EventCard
              key={index}
              className={
                index == 0 && (size?.width ?? 0) > 1280
                  ? "row-span-3 col-span-2 h-full max-w-40 xl:w-full mx-10 md:mx-20 xl:mx-0 xl:min-h-eventBigCard"
                  : "row-span-1 col-span-1 h-full max-w-40 xl:w-full mx-10 md:mx-20 xl:mx-0 xl:min-h-eventSmallCard"
              }
              type={index == 0 || (size?.width ?? 0) < 1280 ? "Big" : "Small"}
              handler={item.handler}
              image={item.image}
              desc={item.desc}
              title={item.title}
              index={index}
              onClick={(size?.width ?? 0) > 1280 ? swap : console.log}
            />
          ))}
          <div className="h-16 w-full bg-black-80"></div>
        </div>
      </div>
    </div>
  );
}
