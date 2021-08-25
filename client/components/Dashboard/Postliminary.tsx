import Button from "@components/Context/Button";
import InputGroup from "@components/Form/InputGroup";
import PostliminaryModal from "@components/Modal/PostliminaryModal";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface PostliminaryProps {
  status: string;
  paymentStatus: string;
}

export default function Postliminary({
  status,
  paymentStatus,
}: PostliminaryProps) {
  const [isShow, setIsShow] = useState(false);
  const {
    register,
    handleSubmit: formSubmit,
    formState: { errors },
  } = useForm();

  const fUtils = { register, errors };

  const handleSubmit = async () => {
    const onSubmit = async (data: any) => {
      console.log(data);
    };

    const onError = (data: any, e: any) => {
      console.log("error", e);
      console.log(data);
    };

    formSubmit(onSubmit, onError)();
  };

  return (
    <div className="border-white border-2 rounded-lg w-full h-auto p-4 mt-4">
      {isShow && <PostliminaryModal closeHandler={() => setIsShow(false)} />}
      <p className="font-bold text-lg">Babak Preliminary</p>
      {status === "lolos" && paymentStatus === "kosong" ? (
        <>
          <p className="text-lg mt-4">
            Selamat!{" "}
            <span className="font-bold">Anda lolos Babak Preliminary.</span>
            Mohon melakukan pembayaran ulang di slot berikut ini untuk
            melanjutkan tahap selanjutnya.
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
          <InputGroup
            placeholder="Masukkan link file bukti pembayaran"
            type="text"
            validation={{
              required: true,
            }}
            name="postliminaryPayment"
            fUtils={fUtils}
            className="mb-4"
          />
          <div className="w-full flex justify-center">
            <Button text="Submit" filled={false} handler={handleSubmit} />
          </div>
        </>
      ) : status === "gagal" ? (
        <p className="text-lg mt-4">
          Maaf anda tidak beruntung silahkan coba tahun depan
        </p>
      ) : status === "lolos" && paymentStatus === "bayar" ? (
        <p className="text-lg mt-4">Pembyaran anda sedang di verifikasi</p>
      ) : null}
    </div>
  );
}
