import Button from "@components/Context/Button";
import Preliminary from "@components/Dashboard/Preliminary";
import Eliminary from "./Eliminary";
import Postliminary from "./Postliminary";

interface DashboardCardProps {
  status: string;
  handler: Function;
  type: string;
  prelimStatus: string;
  statusPaymentPrelim: string;
  statusSandwichA: string;
  statusSandwichB: string;
  statusSandwichC: string;
  statusRescue: string;
  statusScratch: string;
}

export default function DashboardCard({
  status,
  handler,
  type,
  prelimStatus,
  statusPaymentPrelim,
  statusSandwichA,
  statusSandwichB,
  statusSandwichC,
  statusRescue,
  statusScratch,
}: DashboardCardProps) {
  const prelimStatusChecker = (status: string) => {
    switch (status) {
      case "lolos":
        return true;
      case "gagal":
        return true;
      default:
        return false;
    }
  };
  return (
    <div className="w-full h-auto sm:h-1/3 border-2 border-white rounded-xl mb-4 font-dm text-white p-4 flex flex-col">
      <div className="flex flex-col sm:flex-row">
        <div className="h-full w-2/3">
          <p className="font-bold text-2xl mb-4">
            {type === "unac" ? "UNAC" : "TAC"}
          </p>
        </div>
        <div className="flex justify-start sm:justify-center items-center w-full sm:w-1/3">
          <Button text="Detail>" filled={false} handler={() => handler()} />
        </div>
      </div>
      {status === "berhasil" && !prelimStatusChecker(prelimStatus) && (
        <Preliminary
          phase="Preliminary"
          type={type}
          statusPrelim={prelimStatus}
        />
      )}
      {prelimStatusChecker(prelimStatus) &&
        statusPaymentPrelim !== "verified" && (
          <Postliminary
            status={prelimStatus}
            paymentStatus={statusPaymentPrelim}
            type={type}
          />
        )}
      {statusPaymentPrelim === "verified" && prelimStatus === "lolos" && (
        <Eliminary
          type={type}
          statusSandwichA={statusSandwichA}
          statusSandwichB={statusSandwichB}
          statusSandwichC={statusSandwichC}
          statusRescue={statusRescue}
          statusScratch={statusScratch}
        />
      )}
    </div>
  );
}
