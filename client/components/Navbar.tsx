import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";
import { AiFillCloseCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import Button from "./Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "../lib/axios";
import { useRouter } from "next/router";
import { setLogin } from "../lib/auth";

interface NavbarProps {
  scroll: boolean;
}

export default function Navbar({ scroll }: NavbarProps) {
  const [signInModal, setSignInModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);

  const signInHandler = () => {
    setSignInModal(true);
  };

  const createHandler = () => {
    setSignInModal(false);
    setSignUpModal(true);
  };

  return (
    <>
      <div
        className={`h-16 bg-black-80 ${
          scroll ? "md:bg-black-80" : "md:bg-transparent"
        } flex items-center px-6 md:px-nav w-full fixed z-50 transition-all`}
      >
        <NavbarDesktop handler={signInHandler} menus={menus} />
        <NavbarMobile handler={signInHandler} menus={menus} />
      </div>
      {signInModal && (
        <SignInModal
          closeHandler={() => setSignInModal(false)}
          createAccountHandler={createHandler}
        />
      )}
      {signUpModal && (
        <SignUpModal closeHandler={() => setSignUpModal(false)} />
      )}
    </>
  );
}

const menus = [
  { page: "/", text: "Home" },
  { page: "/competition", text: "Competition" },
  { page: "/webinar", text: "Webinar" },
];

interface SignInModalProps {
  createAccountHandler: Function;
  closeHandler: Function;
}

function SignInModal({ createAccountHandler, closeHandler }: SignInModalProps) {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const signInHandler = async (data: any) => {
    await api
      .post("/auth/login", data)
      .then((res) => {
        setLogin(res.data);
        toast.success("Berhasil Login");
        setTimeout(() => {
          router.reload();
        }, 2000);
      })
      .catch(() => toast.error("Gagal login, pastikan input anda sudah benar"));
  };

  return (
    <>
      <div className="h-screen w-full absolute flex flex-col items-center justify-center bg-black-80 bg-opacity-90 z-20"></div>
      <div className="h-screen w-full absolute flex flex-col items-center justify-center z-30">
        <motion.div
          className="h-auto w-full md:w-80 bg-compe border-2 border-compe rounded-xl flex flex-col font-dm p-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <div
            className="text-white text-lg cursor-pointer flex justify-end"
            onClick={() => closeHandler()}
          >
            <AiFillCloseCircle />
          </div>
          <div className="w-full h-auto text-white font-bold text-3xl flex justify-center mb-4">
            Sign In
          </div>
          <form className="w-full h-auto text-white text-lg flex flex-col justify-center mb-4">
            {signInForm.map((sf, index) => (
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
          </form>
          <Button
            text="Submit"
            handler={handleSubmit(signInHandler)}
            filled={true}
          />
          <div className="mt-4 text-white flex justify-center cursor-pointer">
            Belum punya akun?
            <span
              className="text-orange underline ml-2"
              onClick={() => createAccountHandler()}
            >
              Buat akun{">"}
            </span>
          </div>
        </motion.div>
      </div>
    </>
  );
}

const signInForm = [
  { lb: "EMAIL", rg: "email", pc: "Masukkan email Anda", tp: "email" },
  {
    lb: "PASSWORD",
    rg: "password",
    pc: "Masukkan password Anda",
    tp: "password",
  },
];

interface SignUpModalProps {
  closeHandler: Function;
}

function SignUpModal({ closeHandler }: SignUpModalProps) {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const signInHandler = async (data: any) => {
    await api
      .post("/auth/register", data)
      .then(() => {
        toast.success("Berhasil membuat akun");
        setTimeout(() => {
          router.reload();
        }, 2000);
      })
      .catch(() => toast.error("Gagal membuat akun, email sudah digunakan"));
  };

  return (
    <>
      <div className="h-screen w-full absolute flex flex-col items-center justify-center bg-black-80 bg-opacity-90 z-10"></div>
      <div className="h-screen w-full absolute flex flex-col items-center justify-center z-20">
        <motion.div
          className="h-auto w-full md:w-80 bg-compe border-2 border-compe rounded-xl flex flex-col font-dm p-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <div
            className="text-white text-lg cursor-pointer flex justify-end"
            onClick={() => closeHandler()}
          >
            <AiFillCloseCircle />
          </div>
          <div className="w-full h-auto text-white font-bold text-3xl flex justify-center mb-4">
            Sign Up
          </div>
          <form className="w-full h-auto text-white text-lg flex flex-col justify-center mb-4">
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
          </form>
          <Button
            text="Submit"
            handler={handleSubmit(signInHandler)}
            filled={true}
          />
        </motion.div>
      </div>
    </>
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
