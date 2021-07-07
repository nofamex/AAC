/* eslint-disable @next/next/link-passhref */
import Image from "next/image";
import { SiInstagram, SiLine } from "react-icons/si";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="h-96 bg-black-80 flex flex-col text-white py-5 md:py-12 px-nav font-dm">
      <div className="h-full flex flex-col md:flex-row">
        <div className="h-full flex flex-col w-full md:w-3/4">
          <div className="flex justify-center md:justify-start">
            <Image
              src="/picture/logo.svg"
              alt="AAC Logo"
              width="80"
              height="58"
            />
            <p className="text-2xl font-bold flex items-center">AAC</p>
          </div>
          <div className="text-xs md:text-base font-normal w-full md:w-2/4 text-center md:text-left mt-4">
            Acara tahunan terbesar yang diselenggarakan oleh Himpunan Mahasiswa
            S1 Akuntanasi, Fakultas Ekonomi dan Bisnis Universitas Airlangga.
          </div>
          <div className="flex mt-2 justify-center md:justify-start">
            <Link href="/unac">
              <p className="mr-5 cursor-pointer">UNAC</p>
            </Link>
            <Link href="/tac">
              <p className="mr-5 cursor-pointer">TAC</p>
            </Link>
            <Link href="/webinar">
              <p className="cursor-pointer">Webinar</p>
            </Link>
          </div>
        </div>
        <div className="h-full flex flex-col w-full md:w-1/4 mt-4 md:mt-0">
          <p className="font-bold flex justify-center md:justify-start">
            Contact us
          </p>
          <div className="flex mt-4 justify-center md:justify-start">
            <SiInstagram className="h-6 w-6 mr-3" />
            <SiLine className="h-6 w-6" />
          </div>
        </div>
      </div>
      <div className="text-black-60 font-bold flex justify-center md:justify-start mt-3">
        © AAC 2021
      </div>
    </div>
  );
}
