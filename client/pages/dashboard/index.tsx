/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "../../components/Layout";
import { IoMdExit } from "react-icons/io";
import Button from "../../components/Button";
import { useRouter } from "next/router";
import { getUser, logOut } from "../../lib/auth";
import api from "../../lib/axios";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  const userString = getUser();
  const user = JSON.parse(userString || "{}");

  const [status, setStatus] = useState({ status: "", type: "" });
  const [err, setErr] = useState(false);

  useEffect(() => {
    async function data() {
      api
        .get("/competition/profile")
        .then((res) => setStatus(res.data))
        .catch(() => setErr(true));
    }
    data();
  }, []);

  const logOutHandler = () => {
    logOut();
    router.push("/");
  };

  return (
    <Layout>
      <div className="h-16 w-full bg-black-80 z-0"></div>
      <div className="w-full min-h-section h-auto bg-black-80 flex flex-col lg:flex-row p-16">
        <div className="w-full lg:w-1/3 h-72 bg-compe mr-4 rounded-xl p-8 font-dm mb-4 lg:mb-0">
          <p className="text-2xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-persimmon to-orange mb-4">
            PROFILE
          </p>
          <div className="text-white mb-4">
            <p className="font-bold text-base sm:text-lg">NAMA</p>
            <p>{user.full_name}</p>
          </div>
          <div className="text-white mb-4">
            <p className="font-bold text-base sm:text-lg">EMAIL</p>
            <p>{user.email}</p>
          </div>
          <p
            className="text-persimmon text-lg flex items-center cursor-pointer"
            onClick={() => logOutHandler()}
          >
            <span className="mr-2">
              <IoMdExit />
            </span>
            Log Out
          </p>
        </div>
        <div className="w-full lg:w-2/3 h-full bg-compe rounded-xl p-8 font-dm flex flex-col">
          <p className="text-2xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-persimmon to-orange mb-4">
            DASHBOARD
          </p>
          <div className="w-full flex-grow">
            {!err && (
              <DashboardCard
                text={
                  status.status === "berhasil"
                    ? "Verifikasi Berhasil"
                    : status.status === "ditolak"
                    ? "Verifikasi Ditolak"
                    : "Menunggu Verifikasi"
                }
                status={status.status}
                handler={() => router.push("/dashboard/detail/")}
                type={status.type}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

interface StatusBarProps {
  text: string;
  type: string;
}

export function StatusBar({ text, type }: StatusBarProps) {
  return (
    <div
      className={`h-6 w-auto ${
        type === "berhasil"
          ? "bg-success"
          : type === "ditolak"
          ? "bg-error"
          : "bg-orange"
      } p-4 flex items-center rounded-button text-xs sm:text-base font-normal`}
    >
      {text}
    </div>
  );
}

interface DashboardCardProps {
  status: string;
  text: string;
  handler: Function;
  type: string;
}

function DashboardCard({ status, text, handler, type }: DashboardCardProps) {
  return (
    <div className="w-full h-auto sm:h-1/3 border-2 border-white rounded-xl mb-4 font-dm text-white p-4 flex flex-col sm:flex-row">
      <div className="h-full w-2/3">
        <p className="font-bold text-2xl mb-4">
          {type === "unac" ? "UNAC" : "TAC"}
        </p>
        <p className="font-bold text-lg mb-4 flex flex-col sm:flex-row items-start sm:items-center">
          STATUS
          <span className="ml-0 sm:ml-8">
            <StatusBar text={text} type={status} />
          </span>
        </p>
        <p className="font-bold text-lg flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-0">
          Acara Selanjutnya:
          <span className="font-normal text-sm sm:text-base ml-0 sm:ml-8">
            {status === "menunggu"
              ? "Terima kasih telah mendaftar! Data anda sedang diverifikasi oleh panitia. Silahkan cek email secara berkala untuk informasi lebih lanjut!"
              : status === "berhasil"
              ? "Babak preliminary"
              : "Cek email anda untuk keterangan tolakan"}
          </span>
        </p>
      </div>
      <div className="flex justify-start sm:justify-center items-center w-full sm:w-1/3">
        <Button text="Detail>" filled={false} handler={() => handler()} />
      </div>
    </div>
  );
}
