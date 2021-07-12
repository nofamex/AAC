import Layout from "../../components/Layout";
import { IoMdExit } from "react-icons/io";
import Button from "../../components/Button";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
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
            <p>User 1023</p>
          </div>
          <div className="text-white mb-4">
            <p className="font-bold text-base sm:text-lg">EMAIL</p>
            <p>User1023@mail.com</p>
          </div>
          <p className="text-persimmon text-lg flex items-center cursor-pointer">
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
              text="Ditolak"
              status="failed"
              next="preeliminaries bulan depan"
              handler={() => router.push("/dashboard/detail/1")}
            />
            <DashboardCard
              text="Menunggu"
              status="waiting"
              next="preeliminaries bulan depan"
              handler={() => router.push("/dashboard/detail/2")}
            />
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
        type === "success"
          ? "bg-success"
          : type === "failed"
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
  next: string;
  handler: Function;
}

function DashboardCard({ status, text, next, handler }: DashboardCardProps) {
  return (
    <div className="w-full h-auto sm:h-1/3 border-2 border-white rounded-xl mb-4 font-dm text-white p-4 flex flex-col sm:flex-row">
      <div className="h-full w-2/3">
        <p className="font-bold text-2xl mb-4">UNAC</p>
        <p className="font-bold text-lg mb-4 flex flex-col sm:flex-row items-start sm:items-center">
          STATUS
          <span className="ml-0 sm:ml-8">
            <StatusBar text={text} type={status} />
          </span>
        </p>
        <p className="font-bold text-lg flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-0">
          Acara Selanjutnya
          <span className="font-normal text-sm sm:text-base ml-0 sm:ml-8">
            {next}
          </span>
        </p>
      </div>
      <div className="flex justify-start sm:justify-center items-center w-full sm:w-1/3">
        <Button text="Detail>" filled={false} handler={() => handler()} />
      </div>
    </div>
  );
}
