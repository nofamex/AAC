import Image from "next/image"

export default function ContactUs() {
  return (
    <div>
      <div className="h-16 w-full bg-black-80"></div>
      <div className="w-full bg-black-80 flex flex-col items-center justify-center">
        <div className="w-full h-24 font-dm text-white flex flex-col items-center justify-center mb-5">
          <p className="font-bold italic text-5xl" style={{ textShadow: "0 0 25px #7303C0" }}>
            <span className="text-stroke">KONTAK KAMI</span>
          </p>
        </div>
        <div className="h-12 w-full bg-black-80"></div>
        <div className="text-grey-20 text-2xl">
          <div className="mb-4">
            <Image
              src='/picture/logo/line.svg'
              height="32px"
              width="32px"
              className="inline"
            />
            <p className="inline ml-3">@grv1752i</p>
          </div>
          <div>
          <Image
              src='/picture/logo/instagram.svg'
              height="32px"
              width="32px"
              className="inline"
            />
            <p className="inline ml-3">@aacairlangga</p>
          </div>
        </div>
        <div className="h-40 w-full bg-black-80"></div>
      </div>
    </div>
  )
}
