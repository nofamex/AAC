import Countdown from "react-countdown";

export default function ScratchTimer() {
  const renderer = ({ hours, minutes, seconds }: any) => {
    return (
      <div className="flex font-dm font-bold text-3xl">
        <p>
          {hours} <span className="mr-2">:</span>
        </p>
        <p>
          {minutes} <span className="mr-2">:</span>
        </p>
        <p>{seconds}</p>
      </div>
    );
  };

  return (
    <div className="w-4/5 h-40 bg-compe rounded-xl mb-4 font-dm text-white flex flex-col justify-center items-center">
      <p className="font-bold text-2xl mb-2">Time Left</p>
      <Countdown date={new Date(2021, 8, 20)} renderer={renderer} />
    </div>
  );
}
