import { motion } from "framer-motion";
import { AiFillCloseCircle } from "react-icons/ai";

interface PMProps {
  closeHandler: Function;
}

export default function PostliminaryModal({ closeHandler }: PMProps) {
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
            Tata Cara Pembayaran Postliminary
          </div>
          <div className="w-full h-auto text-white text-base flex justify-center mb-4 text-start flex-col">
            <p>Info pembayaran sebesar: ntar isi</p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
