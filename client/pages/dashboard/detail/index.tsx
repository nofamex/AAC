/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import { StatusBar } from "../index";
import api from "../../../lib/axios";

export default function DashboardDetail() {
  const [status, setStatus] = useState({
    team_name: "",
    university: "",
    full_name: "",
    phone: "",
    id_line: "",
    email: "",
    members: [
      { full_name: "", birth_place: "", birth_date: "" },
      { full_name: "", birth_place: "", birth_date: "" },
      { full_name: "", birth_place: "", birth_date: "" },
    ],
    payment_link: "",
    sk_link: "",
    photo_link: "",
    card_link: "",
    status: "",
    type: "",
  });

  useEffect(() => {
    async function data() {
      api
        .get("/competition/profile")
        .then((res) => setStatus(res.data))
        .catch((err) => console.log(err));
    }
    data();
  }, []);

  const dateFormatter = (date: any) => {
    const dateF = new Date(date);
    const dateArr = dateF.toDateString().split(" ");
    const month = dateF.getUTCMonth() + 1;
    const year = dateF.getUTCFullYear();
    const newDate = `${dateArr[2]}/${month}/${year}`;
    return newDate;
  };

  let detailsIDT: any[] = [];
  let detailsAgt: any[] = [];
  let detailsBks: any[] = [];

  if (!(typeof status === "undefined")) {
    detailsIDT = [
      { lb: "NAMA TIM", ct: status.team_name },
      { lb: "NAMA PERGURUAN TINGGI", ct: status.university },
      { lb: "NAMA LENGKAP KETUA", ct: status.full_name },
      { lb: "NO.TELEPON KETUA", ct: status.phone },
      { lb: "ID LINE KETUA", ct: status.id_line },
      { lb: "EMAIL KETUA", ct: status.email },
    ];

    detailsAgt = [
      { lb: "NAMA ANGGOTA 1", ct: status.members[0].full_name },
      {
        lb: "TTL ANGGOTA 1",
        ct: `${status.members[0].birth_place} ${dateFormatter(
          status.members[0].birth_date
        )}`,
      },
      { lb: "NAMA ANGGOTA 2", ct: status.members[1].full_name },
      {
        lb: "TTL ANGGOTA 2",
        ct: `${status.members[1].birth_place} ${dateFormatter(
          status.members[1].birth_date
        )}`,
      },
      { lb: "NAMA ANGGOTA 3", ct: status.members[2].full_name },
      {
        lb: "TTL ANGGOTA 3",
        ct: `${status.members[2].birth_place} ${dateFormatter(
          status.members[2].birth_date
        )}`,
      },
    ];

    detailsBks = [
      { lb: "PAS FOTO PESERTA", ct: status.photo_link },
      { lb: "BUKTI PEMBAYARAN", ct: status.payment_link },
      { lb: "KTM PESERTA", ct: status.card_link },
      { lb: "SURAT KETERANGAN MAHASISWA AKTIF", ct: status.sk_link },
    ];
  }

  return (
    <Layout>
      <div className="h-16 w-full bg-black-80 z-0"></div>
      <div className="h-auto min-h-screen w-full bg-black-80">
        <div className="h-20 w-full text-white flex justify-center z-10">
          <p
            className="font-bold italic text-5xl md:text-6xl"
            style={{ textShadow: "0 0 25px #7303C0" }}
          >
            <span className="text-stroke">
              {status.type === "unac" ? "UNAC DETAIL" : "TAC DETAIL"}
            </span>
          </p>
        </div>
        <div className="w-full h-auto flex justify-center">
          <DetailStatus
            text={
              status.status === "berhasil"
                ? "Verifikasi Berhasil"
                : status.status === "ditolak"
                ? "Verifikasi Ditolak"
                : "Menunggu Verifikasi"
            }
            status={status.status}
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

interface DSProps {
  text: string;
  status: string;
  message: string;
}

function DetailStatus({ text, status, message }: DSProps) {
  return (
    <div className="w-auto h-full border-2 border-white rounded-xl font-dm text-white flex flex-col justify-center p-4">
      <p className="font-bold text-lg flex flex-row items-start sm:items-center">
        STATUS
        <span className="ml-8">
          <StatusBar text={text} type={status} />
        </span>
      </p>
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
