import Image from "next/image";
import Button from "./Button";

interface EventCardProps {
  handler: Function;
  onClick: Function;
  image: string;
  desc: string;
  title: string;
  index: number;
  className?: string;
  type?: string;
}

export default function EventCard({
  handler,
  image,
  desc,
  title,
  className,
  type,
  index,
  onClick,
}: EventCardProps) {
  const imgClass =
    type === "Big"
      ? "w-auto max-h-40 md:max-h-80 xl:max-h-full h-eventBigCardImg rounded-t-2xl md:items-center md:justify-center relative overflow-hidden"
      : "w-auto max-h-40 md:max-h-80 xl:max-h-full h-eventSmallCardImg rounded-t-2xl md:items-center md:justify-center relative overflow-hidden";

  const descClass =
    type === "Big"
      ? "bg-compe rounded-b-2xl flex flex-col justify-center h-eventBigCardDesc"
      : "bg-compe rounded-b-2xl flex flex-col justify-center h-eventSmallCardDesc";

  return (
    <div className={className}>
      <div
        className={`w-full h-full rounded-2xl mb-10 md:mb-0 md:mr-4 cursor-pointer`}
      >
        <div onClick={() => onClick(index)} className={imgClass}>
          <Image
            src={image}
            alt="Competition Logo"
            layout="fill"
            className="hover:scale-105 transition ease-in-out object-cover"
          />
        </div>
        <div className={descClass}>
          <div className="mx-10 my-5">
            <p className="text-3xl text-left font-bold text-transparent bg-clip-text bg-gradient-to-r from-persimmon to-orange">
              {title}
            </p>

            {type === "Big" ? (
              <div>
                <p
                  className={`font-md text-white text-left text-xs md:text-base cursor-default`}
                >
                  {desc}
                </p>
                <div className="w-full flex justify mt-5 text-orange">
                  <Button
                    text="Lebih Lanjut>"
                    filled={false}
                    handler={handler}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
