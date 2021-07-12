import Layout from "../../../components/Layout";
import { StatusBar } from "../index";

export default function DashboardDetail() {
  return (
    <Layout>
      <div className="h-16 w-full bg-black-80 z-0"></div>
      <div className="h-auto w-full bg-black-80">
        <div className="h-20 w-full text-white flex justify-center z-10">
          <p
            className="font-bold italic text-5xl md:text-6xl"
            style={{ textShadow: "0 0 25px #7303C0" }}
          >
            <span className="text-stroke">UNAC DETAIL</span>
          </p>
        </div>
        <div className="w-full h-auto flex justify-center">
          <DetailStatus
            text="Verifikasi ditolak"
            status="failed"
            message="Cek email anda untuk keterangan tolakan"
          />
        </div>
        <div className="w-full h-full flex sm:flex-row px-4 sm:px-10 md:px-14 lg:px-20 xl:px-40 mt-8">
          <div className="h-auto w-1/3 font-dm text-white mr-4">
            <p className="font-bold text-2xl sm:text-4xl mb-4">Identitas Tim</p>
            {detailsIDT.map((dt, index) => (
              <DetailLabels label={dt.lb} content={dt.ct} key={index} />
            ))}
          </div>
          <div className="h-auto w-1/3 text-white font-dm mr-4">
            <p className="font-bold text-2xl sm:text-4xl mb-4">Anggota Tim</p>
            {detailsAgt.map((dt, index) => (
              <DetailLabels label={dt.lb} content={dt.ct} key={index} />
            ))}
          </div>
          <div className="h-auto w-1/3 text-white font-dm">
            <p className="font-bold text-2xl sm:text-4xl mb-4">Berkas</p>
            {detailsBks.map((dt, index) => (
              <DetailLabels label={dt.lb} content={dt.ct} key={index} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

const detailsIDT = [
  { lb: "NAMA TIM", ct: "Compfest" },
  { lb: "NAMA PERGURUAN TINGGI", ct: "Universitas Mada" },
  { lb: "NAMA LENGKAP KETUA", ct: "Geofrey Tyndall" },
  { lb: "NO.TELEPON KETUA", ct: "0813xxxx" },
  { lb: "ID LINE KETUA", ct: "gtycss" },
  { lb: "EMAIL KETUA", ct: "geo@compfest.id" },
];

const detailsAgt = [
  { lb: "NAMA ANGGOTA 1", ct: "Geofrey Tyndall" },
  { lb: "TTL ANGGOTA 1", ct: "Jakarta, 28 juli 2000" },
  { lb: "NAMA ANGGOTA 2", ct: "Rezaldy A M" },
  { lb: "TTL ANGGOTA 2", ct: "Depok, 29 juli 1998" },
  { lb: "NAMA ANGGOTA 3", ct: "Radhiansyah ZZ" },
  { lb: "TTL ANGGOTA 3", ct: "Depok, 30 juli 1999" },
];

const detailsBks = [
  { lb: "PAS FOTO PESERTA", ct: "s.id/pasfoto" },
  { lb: "BUKTI PEMBAYARAN", ct: "s.id/bukti" },
  { lb: "KTM PESERTA", ct: "s.id/ktm" },
  { lb: "SURAT KETERANGAN MAHASISWA AKTIF", ct: "s.id/skck" },
];

interface DSProps {
  text: string;
  status: string;
  message: string;
}

function DetailStatus({ text, status, message }: DSProps) {
  return (
    <div className="w-auto h-full border-2 border-white rounded-xl font-dm text-white flex flex-col justify-center p-4">
      <p className="font-bold text-lg mb-4 flex flex-row items-start sm:items-center">
        STATUS
        <span className="ml-auto">
          <StatusBar text={text} type={status} />
        </span>
      </p>
      <p className="font-bold text-lg">{message}</p>
    </div>
  );
}

interface DLProps {
  label: string;
  content: string;
}

function DetailLabels({ label, content }: DLProps) {
  return (
    <div className="mb-8">
      <p className="font-bold">{label}</p>
      <p>{content}</p>
    </div>
  );
}
