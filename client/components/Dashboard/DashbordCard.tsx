import Button from "@components/Context/Button";
import StatusBar from "@components/Dashboard/StatusBar";
import Postliminary from "@components/Dashboard/Postliminary";

interface DashboardCardProps {
  status: string;
  text: string;
  handler: Function;
  type: string;
}

export default function DashboardCard({
  status,
  text,
  handler,
  type,
}: DashboardCardProps) {
  return (
    <div className="w-full h-auto sm:h-1/3 border-2 border-white rounded-xl mb-4 font-dm text-white p-4 flex flex-col">
      <div className="flex flex-col sm:flex-row">
        <div className="h-full w-2/3">
          <p className="font-bold text-2xl mb-4">
            {type === "unac" ? "UNAC" : "TAC"}
          </p>
          <p className="font-bold text-lg mb-4 flex flex-col sm:flex-row items-start sm:items-center">
            Status:
            <span className="ml-0 sm:ml-8">
              <StatusBar text={text} type={status} />
            </span>
          </p>
          <p className="font-bold text-lg flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-0">
            <span className="font-bold text-sm sm:text-base">
              {status === "menunggu"
                ? "Terima kasih telah mendaftar! Data anda sedang diverifikasi oleh panitia. Silahkan cek email secara berkala untuk informasi lebih lanjut!"
                : status === "berhasil"
                ? "Acara selanjutnya:"
                : "Cek email anda untuk keterangan tolakan"}
            </span>
          </p>
        </div>
        <div className="flex justify-start sm:justify-center items-center w-full sm:w-1/3">
          <Button text="Detail>" filled={false} handler={() => handler()} />
        </div>
      </div>
      <Postliminary />
    </div>
  );
}
