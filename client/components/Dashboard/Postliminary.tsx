import PostliminaryModal from "@components/Modal/PostliminaryModal";
import { useState } from "react";

export default function Postliminary() {
  const [isShow, setIsShow] = useState(false);

  return (
    <div className="border-white border-2 rounded-lg w-full h-auto p-4">
      {isShow && <PostliminaryModal closeHandler={() => setIsShow(false)} />}
      <p className="font-bold text-lg">Babak Preliminary</p>
      <p className="text-lg mt-4">
        Selamat!{" "}
        <span className="font-bold">Anda lolos Babak Preliminary.</span>Mohon
        melakukan pembayaran ulang di slot berikut ini untuk melanjutkan tahap
        selanjutnya.
      </p>
      <p className="flex mt-4">
        <span className="text-lg font-bold">Bukti Pembayaran</span>
        <span
          className="ml-auto text-orange underline cursor-pointer"
          onClick={() => setIsShow(true)}
        >
          Keterangan cara pembayaran
        </span>
      </p>
    </div>
  );
}
