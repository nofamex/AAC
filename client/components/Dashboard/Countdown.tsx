interface CountdownProps {
  days: any;
  hours: any;
  minutes: any;
  seconds: any;
}

export default function Countdowns({
  days,
  hours,
  minutes,
  seconds,
}: CountdownProps) {
  return (
    <div className="flex font-dm font-bold text-3xl mt-2">
      <div className="flex flex-col justify-center items-center">
        <p className="text-lg text-orange">Hari</p>
        <p>{days}</p>
      </div>
      <p>
        <div className="flex flex-col justify-center items-center ml-4">
          <p className="text-lg text-orange">Jam</p>
          <p>{hours}</p>
        </div>
      </p>
      <p>
        <div className="flex flex-col justify-center items-center ml-4">
          <p className="text-lg text-orange">Menit</p>
          <p>{minutes}</p>
        </div>
      </p>
      <p>
        <div className="flex flex-col justify-center items-center ml-4">
          <p className="text-lg text-orange">Detik</p>
          <p>{seconds}</p>
        </div>
      </p>
    </div>
  );
}
