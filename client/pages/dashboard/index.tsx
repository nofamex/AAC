/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "@components/Context/Layout";
import PrivateRoute from "@components/Context/PrivateRoute";
import { getUser, logOut } from "@lib/auth";
import api from "@lib/axios";
import { IoMdExit } from "react-icons/io";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import DashboardCard from "@components/Dashboard/DashbordCard";

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
      <PrivateRoute>
        <div className="h-16 w-full bg-black-80 z-0"></div>
        <div className="w-full min-h-screen h-auto bg-black-80 flex flex-col lg:flex-row p-16">
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
              <DashboardCard
                text="Verifikasi Berhasil"
                status="berhasil"
                handler={() => router.push("/dashboard/detail/")}
                type={status.type}
              />
            </div>
          </div>
        </div>
      </PrivateRoute>
    </Layout>
  );
}
