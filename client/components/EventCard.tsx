import Image from "next/image"

interface EventCardProps {
  handler: Function
  onClick: Function
  image: string
  desc: string
  title: string
  index: number
  className?: string
  type?: string
}

export default function EventCard({
  handler,
  image,
  desc,
  title,
  className,
  type,
  index,
  onClick
}: EventCardProps) {
  return (
    <div className={`${className} h-full max-w-40 xl:w-full mx-20 xl:mx-0 xl:min-h-event${type}Card`}>
      <div className={`w-full h-full rounded-2xl mb-10 md:mb-0 md:mr-4 cursor-pointer`}>
        <div onClick={() => onClick(index)} className={`w-auto max-h-40 md:max-h-80 xl:max-h-full h-event${type}CardImg rounded-t-2xl md:items-center md:justify-center relative overflow-hidden`}>
          <Image
            src={image}
            alt="Competition Logo"
            layout="fill"
            className="hover:scale-105 transition ease-in-out object-cover"
          />
        </div>
        <div  onClick={() => handler('ok')} className={`bg-compe rounded-b-2xl flex flex-col justify-center h-event${type}CardDesc`}>
          <div className="mx-10 my-5">
            <p className="text-3xl text-left font-bold text-transparent bg-clip-text bg-gradient-to-r from-persimmon to-orange">{title}</p>
            {type==="Big" ? (<div>
              <p className={`font-md text-white text-left text-xs md:text-base cursor-default`}>
              {desc}
              </p>
              <div  className="w-full flex justify mt-5 text-orange">
                <p> Lebih Lanjut&gt;</p>
              </div>
            </div>) : (<></>)}
          </div>
        </div>
      </div>
    </div>
  )
}
