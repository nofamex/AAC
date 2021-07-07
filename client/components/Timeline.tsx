import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

export default function Timeline() {
  const timelines = [
    { title: "Babak Preliminary", tanggal: "28 Agustus 2021" },
    { title: "Daftar Ulang", tanggal: "19 Agustus-7 September 2021" },
    { title: "Technical Meeting", tanggal: "8 September 2021" },
    { title: "Babak Eliminasi", tanggal: "9 September 2021" },
    { title: "Babak Semifinal", tanggal: "10 September 2021" },
    { title: "Seminar & Technical Meeting", tanggal: "11 September 2021" },
    { title: "Final & Awarding Night", tanggal: "12 September 2021" },
  ];

  return (
    <VerticalTimeline>
      {timelines.map((timeline, index) => (
        <VerticalTimelineElement
          key={index}
          contentStyle={{
            padding: 0,
            backgroundColor: "transparent",
            boxShadow: "0px 0px 0px 0px",
          }}
          contentArrowStyle={{ display: "none" }}
          iconStyle={{
            background: "#03001E",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          icon={<div className="w-3/4 h-3/4 bg-orange rounded-full"></div>}
        >
          <div
            className={`flex flex-col justify-center ${
              index % 2 == 0 ? "items-start md:items-end" : "items-start"
            } w-full h-full font-dm`}
          >
            <div className="font-bold text-lg text-orange">
              {timeline.title}
            </div>
            <div className="text-white">{timeline.tanggal}</div>
          </div>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
}
