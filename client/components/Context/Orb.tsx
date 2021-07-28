interface OrbProps {
  title: string;
  left: string;
  active: boolean;
}

export default function Orb({ title, left, active }: OrbProps) {
  return (
    <div className="flex flex-col relative h-6 w-6 cursor-pointer">
      <div className="h-full w-full border-2 border-orange rounded-full flex justify-center items-center">
        <div
          className={`rounded-full bg-gradient-to-r from-persimmon to-orange ${
            active ? "h-3.5 w-3.5" : ""
          } transition-all`}
        ></div>
      </div>
      <div
        className={`text-white absolute text-center text-sm top-7 ${left} ${
          !active && "opacity-75"
        }`}
      >
        {title}
      </div>
    </div>
  );
}
