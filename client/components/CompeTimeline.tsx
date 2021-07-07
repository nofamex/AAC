import PatternBG from "./PatternBG";
import Timeline from "./Timeline";

export default function CompeTimeline() {
  return (
    <div className="h-auto w-full bg-black-80 overflow-hidden relative flex flex-col justify-center items-center">
      <PatternBG position="right" />
      <div className="h-20 w-full text-white flex justify-center z-10">
        <p
          className="font-bold italic text-5xl md:text-6xl"
          style={{ textShadow: "0 0 25px #7303C0" }}
        >
          TIMELINE
        </p>
      </div>
      <div className="h-auto w-3/4 flex justify-center">
        <Timeline />
      </div>
    </div>
  );
}
