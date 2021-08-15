import Layout from "@components/Context/Layout";
import Button from "@components/Context/Button";
import api from "@lib/axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function SignUpDesktop() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const signUpMobileHandler = async (data: any) => {
    await api
      .post("/auth/register", data)
      .then(() => {
        toast.success("Berhasil membuat akun");
        setTimeout(() => {
          router.push("/signin");
        }, 2000);
      })
      .catch(() => toast.error("Gagal membuat akun, email sudah digunakan"));
  };

  return (
    <Layout>
      <div className="h-16 w-full bg-black-80 z-0"></div>
      <div className="h-section w-full bg-black-80 z-0 flex flex-col items-center justify-center sm:h-screen">
        <div className="h-20 w-full text-white flex justify-center z-10 md:hidden">
          <p
            className="font-bold italic text-5xl md:text-6xl"
            style={{ textShadow: "0 0 25px #7303C0" }}
          >
            <span className="text-stroke">SIGN UP</span>
          </p>
        </div>
        <div className="w-full h-auto flex flex-col justify-center items-center md:hidden">
          <form
            onSubmit={handleSubmit(signUpMobileHandler)}
            className="w-full h-auto text-white text-lg flex flex-col justify-center mb-4 p-4"
          >
            {signUpForm.map((sf, index) => (
              <div className="w-full" key={index}>
                <p className="text-white font-bold text-sm mb-1">{sf.lb}</p>
                <input
                  {...register(sf.rg, { required: true })}
                  placeholder={sf.pc}
                  type={sf.tp}
                  className="mb-4 bg-compe border-white border-2 h-10 w-full p-2 rounded-lg focus:outline-none text-white"
                />
              </div>
            ))}
            <Button text="Submit" handler={() => {}} filled={true} />
          </form>
          <div className="mt-4 text-white flex justify-center cursor-pointer">
            Sudah punya akun?
            <span
              className="text-orange underline ml-2"
              onClick={() => router.push("/signin")}
            >
              Masuk{">"}
            </span>
          </div>
        </div>
        <div className="h-full w-full hidden md:flex sm:justify-center sm:items-center">
          <div className="h-20 w-full text-white flex justify-center z-10">
            <p
              className="font-bold italic text-5xl md:text-6xl text-center"
              style={{ textShadow: "0 0 25px #7303C0" }}
            >
              <span className="text-stroke">
                SILAHKAN SIGN IN MELALUI TOMBOL SIGNIN
              </span>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const signUpForm = [
  {
    lb: "NAMA LENGKAP",
    rg: "full_name",
    pc: "Masukkan nama Anda",
    tp: "text",
  },
  { lb: "EMAIL", rg: "email", pc: "Masukkan email Anda", tp: "email" },
  {
    lb: "PASSWORD",
    rg: "password",
    pc: "Masukkan password Anda",
    tp: "password",
  },
];
