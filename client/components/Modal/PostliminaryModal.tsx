import { motion } from "framer-motion";
import { AiFillCloseCircle } from "react-icons/ai";

interface PMProps {
  closeHandler: Function;
  type: string;
}

export default function PostliminaryModal({ closeHandler, type }: PMProps) {
  return (
    <>
      <div className="h-full w-full absolute flex flex-col items-center justify-center bg-black-80 bg-opacity-90 z-10 top-0 left-0"></div>
      <div className="h-full w-full absolute flex flex-col items-center justify-center z-20 top-0 left-0">
        <motion.div
          className="h-auto w-full md:w-1/2 bg-compe border-2 border-compe rounded-xl flex flex-col font-dm p-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <div
            className="text-white text-lg cursor-pointer flex justify-end"
            onClick={() => closeHandler()}
          >
            <AiFillCloseCircle />
          </div>
          <div className="w-full h-auto text-white font-bold text-2xl flex justify-center mb-4">
            Tata Cara Pembayaran Eliminary
          </div>
          {type === "unac" ? <UnacContent /> : <TacContent />}
          <div className="w-full h-auto text-white text-base flex justify-center mb-4 text-start flex-col"></div>
        </motion.div>
      </div>
    </>
  );
}

function UnacContent() {
  return (
    <ul className="list-inside list-decimal">
      <li className="mb-2">
        Seluruh tim yang berhasil lulus ke Tahap Mainround diminta untuk
        melakukan daftar ulang dengan transfer biaya pendaftaran sebesar Rp.
        120,000/tim ke rekening di bawah ini: - BRI ​- 010901058496506 an
        Aldilla Putri Oktavia - BCA - 7880936853 an Della Ariyanti Rahayu
        Ninggare
      </li>
      <li className="mb-2">
        Selain melakukan pembayaran, peserta juga diwajibkan untuk meng-upload
        twibbon peserta pada Instagram pribadi masing-masing. Foto dan caption
        twibbon dapat diakses melalui link{" "}
        <span className="text-blue-600">
          <a href="bit.ly/TwibbonPesertaAAC2021" target="_blank">
            bit.ly/TwibbonPesertaAAC2021
          </a>
        </span>
      </li>
      <li className="mb-2">
        Setelah melakukan transfer, tim dapat mencantumkan bukti pembayaran dan
        peng-upload-an pada dashboard website, dengan ketentuan
      </li>
      <li className="mb-2">
        Setiap tim wajib meng-upload 1 link Google Drive yang berisi 1 file
        scan/foto bukti pembayaran dan 3 file foto bukti screenshot upload
        twibbon (format .jpg) dengan status akses link “siapa saja di internet
        yang memiliki link ini dapat mengedit”
      </li>
    </ul>
  );
}

function TacContent() {
  return (
    <ul className="list-inside list-decimal">
      <li className="mb-2">
        Seluruh Kelompok yang berhasil lulus ke Tahap Mainround diminta untuk
        melakukan daftar ulang dengan transfer biaya pendaftaran sebesar Rp.
        100,000/Kelompok ke rekening di bawah ini: - BRI ​- 010901058496506 an
        Aldilla Putri Oktavia - BCA - 7880936853 an Della Ariyanti Rahayu
        Ninggare
      </li>
      <li className="mb-2">
        Selain melakukan pembayaran, peserta juga diwajibkan untuk meng-upload
        twibbon peserta pada Instagram pribadi masing-masing. Foto dan caption
        twibbon dapat diakses melalui link{" "}
        <span className="text-blue-600">
          <a href="bit.ly/TwibbonPesertaAAC2021" target="_blank">
            bit.ly/TwibbonPesertaAAC2021
          </a>
        </span>
      </li>
      <li className="mb-2">
        Setelah melakukan transfer, Kelompok dapat mencantumkan bukti pembayaran
        pada dashboard tersebut, dengan ketentuan
      </li>
      <li className="mb-2">
        Setiap Kelompok wajib meng-upload 1 link Google Drive yang berisi 1 file
        scan/foto bukti pembayaran dan 3 file foto bukti screenshot upload
        twibbon (format .jpg) dengan status akses link “siapa saja di internet
        yang memiliki link ini dapat mengedit”
      </li>
    </ul>
  );
}
