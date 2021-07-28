import Image from "next/image";

interface PatternBGProps {
  position: string;
}

export default function PatternBG({ position }: PatternBGProps) {
  return (
    <div
      className={`h-full w-full absolute z-0 justify-end ${
        position === "left" ? "right-pattern" : "left-pattern"
      } hidden md:flex`}
    >
      <Image
        src="/picture/pattern.svg"
        alt="pattern"
        layout="fill"
        className="z-0"
      />
    </div>
  );
}
