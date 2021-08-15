import Button from "@components/Context/Button";
import { AiFillCloseCircle } from "react-icons/ai";
import { motion } from "framer-motion";

interface DangerModalProps {
  submit: Function;
  closeHandler: Function;
}

export default function DangerModal({
  submit,
  closeHandler,
}: DangerModalProps) {
  return (
    <>
      <div className="h-full w-full absolute flex flex-col items-center justify-center bg-black-80 bg-opacity-90 z-20"></div>
      <div className="h-full w-full absolute flex flex-col items-center justify-center z-30">
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
            PERINGATAN
          </div>
          <div className="w-full h-auto text-white text-lg flex justify-center mb-4 text-center">
            Pastikan data registrasi sudah benar. Data tidak bisa diubah lagi
            setelah registrasi selesai.
          </div>
          <div className="w-full h-auto flex justify-end items-center">
            <div>
              <Button text="Submit" handler={submit} filled={true} />
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
