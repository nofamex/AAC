import Button from "@components/Context/Button";
import InputGroup from "@components/Form/InputGroup";
import PostliminaryModal from "@components/Modal/PostliminaryModal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

interface PostliminaryProps {
  status: string;
  paymentStatus: string;
  type: string;
}

export default function Postliminary({
  status,
  paymentStatus,
  type,
}: PostliminaryProps) {
  const UNACBOOKLET =
    "https://drive.google.com/file/d/1RiSW9IENh7yYAKKeLGX-6np9aiXWFtwD/view?usp=sharing";
  const TACBOOKLET =
    "https://drive.google.com/file/d/1jg3D8CMVdW9f4rvPFApZgzgDPWkz8-p_/view?usp=sharing";

  const router = useRouter();
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
      {isShow && (
        <PostliminaryModal closeHandler={() => setIsShow(false)} type={type} />
      )}
      <p className="font-bold text-lg">Babak Preliminary</p>
      {status === "lolos" && paymentStatus === "kosong" ? (
        <>
          <p className="text-lg mt-4">
            Selamat!{" "}
            <span className="font-bold">Anda lolos Babak Preliminary.</span>
            Mohon melakukan pembayaran ulang di slot berikut ini untuk
            melanjutkan tahap selanjutnya.
          </p>
          <p className="mt-4 mb-4 text-lg font-bold">Download Booklet</p>
          <a
            href={type === "unac" ? UNACBOOKLET : TACBOOKLET}
            target="_blank"
            rel="noreferrer"
          >
            <Button text="Booklet" handler={() => {}} filled={false} />
          </a>
          <p className="flex mt-8">
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
        <>
          <p className="text-lg mt-4 mb-2">
            Maaf, Anda belum lolos tahap preliminary, anda bisa mengikuti
            webinar disini:
          </p>
          <Button
            text="Ikuti Webinar"
            handler={() => {
              router.push("/webinar");
            }}
            filled={false}
          />
        </>
      ) : status === "lolos" && paymentStatus === "bayar" ? (
        <p className="text-lg mt-4">Pembyaran anda sedang di verifikasi</p>
      ) : null}
    </div>
  );
}
