import PatternBG from "./PatternBG";
import Timeline from "./Timeline";

export default function CompeTimeline() {
  return (
    <div className="h-auto w-full bg-black-80 overflow-hidden relative flex flex-col justify-center items-center">
      <PatternBG position="right" />
      <div className="h-auto w-3/4 flex justify-center">
        <Timeline />
      </div>
    </div>
  );
}
