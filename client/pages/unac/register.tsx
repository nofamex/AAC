import Layout from "../../components/Layout";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Button from "../../components/Button";
import { useState } from "react";
import DangerModal from "../../components/DangerModal";
import Orb from "../../components/Orb";
import { AiFillCloseCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import api from "../../lib/axios";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { type } = router.query;

  const [show, setShow] = useState(false);
  const [showPM, setShowPM] = useState(false);

  const teamButtonHandler = () => {
    router.replace("/unac/register?type=anggota");
  };

  const anggotaPreviousButtonHandler = () => {
    router.replace("/unac/register?type=team");
  };

  const anggotaNextButtonHandler = () => {
    router.replace("/unac/register?type=berkas");
  };

  const berkasPreviousButtonHandler = () => {
    router.replace("/unac/register?type=anggota");
  };

  const berkasNextButtonHandler = () => {
    setShow(true);
  };

  const submitHandler = async (data: any) => {
    data.type = "unac";
    data.members = [
      {
        full_name: data.namaAnggota1,
        birth_place: data.tempatLahirAnggota1,
        birth_date: new Date(data.tanggalLahirAnggota1).toISOString(),
        member_number: 1,
      },
      {
        full_name: data.namaAnggota2,
        birth_place: data.tempatLahirAnggota2,
        birth_date: new Date(data.tanggalLahirAnggota2).toISOString(),
        member_number: 2,
      },
      {
        full_name: data.namaAnggota3,
        birth_place: data.tempatLahirAnggota3,
        birth_date: new Date(data.tanggalLahirAnggota3).toISOString(),
        member_number: 3,
      },
    ];
    delete data.namaAnggota1;
    delete data.tempatLahirAnggota1;
    delete data.tanggalLahirAnggota1;
    delete data.namaAnggota2;
    delete data.tempatLahirAnggota2;
    delete data.tanggalLahirAnggota2;
    delete data.namaAnggota3;
    delete data.tempatLahirAnggota3;
    delete data.tanggalLahirAnggota3;

    await api
      .post("/competition/register", data)
      .then(() => {
        toast.success("Berhasil mendaftar pada kompetisi");
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      })
      .catch(() =>
        toast.error("Registrasi gagal, perhatikan kembali form yang anda isi")
      );

    setShow(false);
  };

  return (
    <Layout>
      <div className="h-16 w-full bg-black-80"></div>
      <div className="h-auto w-full bg-black-80 flex flex-col justify-center items-center font-dm relative">
        {show && (
          <DangerModal
            submit={handleSubmit(submitHandler)}
            closeHandler={() => setShow(false)}
          />
        )}
        {showPM && <PembayaranModal closeHandler={() => setShowPM(false)} />}
        <div className="h-20 w-full text-white flex justify-center items-center mb-8">
          <p
            className="font-bold italic text-xl sm:text-3xl md:text-4xl flex justify-center"
            style={{ textShadow: "0 0 25px #7303C0" }}
          >
            <span className="text-stroke text-center">REGISTRASI UNAC</span>
          </p>
        </div>
        <div className="h-20 w-full flex justify-center font-dm mb-8">
          <Orb
            active={typeof type === "undefined" || type === "team"}
            title="Identitas Tim"
            left="-left-4"
          />
          <div className="h-6 w-16 py-2.5">
            <div className="w-full h-full bg-orange"></div>
          </div>
          <Orb active={type === "anggota"} title="Anggota Tim" left="-left-4" />
          <div className="h-6 w-16 py-2.5">
            <div className="w-full h-full bg-orange"></div>
          </div>
          <Orb active={type === "berkas"} title="Berkas" left="-left-2" />
        </div>
        <form className="flex flex-col w-1/2">
          {(typeof type === "undefined" || type === "team") && (
            <motion.div
              className="w-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              {forms1.map((form, index) => (
                <div className="w-full" key={index}>
                  <p className="text-white font-bold text-sm mb-1">{form.lb}</p>
                  <p className="text-white text-sm mb-1">* Wajib diisi</p>
                  <input
                    {...register(form.rg)}
                    placeholder={form.pc}
                    type={form.tp}
                    required
                    className="mb-4 bg-black-80 border-white border-2 h-10 w-full p-2 rounded-lg focus:outline-none text-white"
                  />
                </div>
              ))}
            </motion.div>
          )}
          {type === "anggota" && (
            <motion.div
              className="w-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              {forms2.map((form, index) => (
                <div className="w-full" key={index}>
                  <div className="w-full">
                    <p className="text-white font-bold text-lg mb-4">
                      {form.hr}
                    </p>
                    <p className="text-white font-bold text-sm mb-1">
                      {form.lb}
                    </p>
                    <p className="text-white text-sm mb-1">* Wajib diisi</p>
                    <input
                      {...register(`namaAnggota${index + 1}`)}
                      placeholder={`Masukkan nama anggota ${index + 1}..`}
                      type={"text"}
                      required
                      className="mb-4 bg-black-80 border-white border-2 h-10 w-full p-2 rounded-lg focus:outline-none text-white"
                    />
                    <p className="text-white font-bold text-sm mb-1">
                      TEMPAT TANGGAL LAHIR
                    </p>
                    <p className="text-white text-sm mb-1">* Wajib diisi</p>
                  </div>
                  <div className="w-full mb-2 flex">
                    <input
                      {...register(`tempatLahirAnggota${index + 1}`)}
                      placeholder="Tempat lahir.."
                      type={"text"}
                      required
                      className="mr-4 bg-black-80 border-white border-2 h-10 w-full p-2 rounded-lg focus:outline-none text-white"
                    />
                    <input
                      {...register(`tanggalLahirAnggota${index + 1}`)}
                      placeholder="Tanggal lahir, format: tahun-bulan-tanggal"
                      type={"text"}
                      required
                      className="bg-black-80 border-white border-2 h-10 w-full p-2 rounded-lg focus:outline-none text-white"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          )}
          {type === "berkas" && (
            <motion.div
              className="w-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <div className="h-28 w-full flex justify-center mb-8">
                <div className="w-full xl:w-1/2 h-full border-2 border-white rounded-xl font-dm text-white text-xs md:text-sm p-4 flex flex-col justify-center overflow-y-scroll md:overflow-y-visible">
                  <p className="mb-2">
                    - Masukkan file ZIP ke dalam Google Drive dan share link
                    file tersebut ke dalam kolom berikut.
                  </p>
                  <p>
                    - Pastikan Link Sharing berada dalam Can Be Viewed by Anyone
                    with The Link.
                  </p>
                </div>
              </div>
              <div className="w-full">
                <p className="text-white font-bold text-sm mb-1">
                  PAS FOTO PESERTA
                </p>
                <p className="text-white text-sm mb-1">
                  * Semua pas foto disatukan kedalam satu zip
                </p>
                <p className="text-white text-sm mb-1">
                  * Setiap foto diberi nama sesuai anggotanya
                </p>
                <input
                  {...register("photo_link")}
                  placeholder="Masukkan link file foto peserta, Format: https://linkanda.com"
                  type="text"
                  required
                  className="mb-4 bg-black-80 border-white border-2 h-10 w-full p-2 rounded-lg focus:outline-none text-white"
                />
              </div>
              <div className="w-full">
                <p className="text-white font-bold text-sm mb-1 flex flex-col md:flex-row">
                  BUKTI PEMBAYARAN
                  <span
                    className="text-orange font-normal ml-0 md:ml-auto underline cursor-pointer"
                    onClick={() => setShowPM(true)}
                  >
                    Keterangan cara pembayaran
                  </span>
                </p>
                <input
                  {...register("payment_link")}
                  placeholder="Masukkan link bukti pembayaran, Format: https://linkanda.com"
                  type="text"
                  required
                  className="mb-4 bg-black-80 border-white border-2 h-10 w-full p-2 rounded-lg focus:outline-none text-white"
                />
              </div>
              <div className="w-full">
                <p className="text-white font-bold text-sm mb-1">KTM PESERTA</p>
                <p className="text-white text-sm mb-1">
                  * Semua pas foto KTM disatukan kedalam satu zip
                </p>
                <input
                  {...register("card_link")}
                  placeholder="Masukkan link file KTM peserta, Format: https://linkanda.com"
                  type="text"
                  required
                  className="mb-4 bg-black-80 border-white border-2 h-10 w-full p-2 rounded-lg focus:outline-none text-white"
                />
              </div>
              <div className="w-full">
                <p className="text-white font-bold text-sm mb-1">
                  SURAT KETERANGAN MAHASISWA AKTIF
                </p>
                <p className="text-white text-sm mb-1">
                  * Khusus untuk mahasiswa angkatan 2017 ke atas
                </p>
                <p className="text-white text-sm mb-1">
                  * Semua surat disatukan ke dalam zip
                </p>
                <input
                  {...register("sk_link")}
                  placeholder="Masukkan link file foto surat, Format: https://linkanda.com"
                  type="text"
                  required
                  className="mb-4 bg-black-80 border-white border-2 h-10 w-full p-2 rounded-lg focus:outline-none text-white"
                />
              </div>
            </motion.div>
          )}
        </form>

        {(typeof type === "undefined" || type === "team") && (
          <div className="w-1/2 mt-4 flex justify-center sm:justify-end">
            <Button filled={false} text="Lanjut>" handler={teamButtonHandler} />
          </div>
        )}

        {type === "anggota" && (
          <div className="w-1/2 mt-4 flex flex-col sm:flex-row items-center sm:justify-between">
            <div className="mb-2 sm:mb-0">
              <Button
                filled={false}
                text="<Sebelum"
                handler={anggotaPreviousButtonHandler}
              />
            </div>
            <div>
              <Button
                filled={false}
                text="Lanjut>"
                handler={anggotaNextButtonHandler}
              />
            </div>
          </div>
        )}

        {type === "berkas" && (
          <div className="w-1/2 mt-4 flex flex-col sm:flex-row items-center sm:justify-between">
            <div className="mb-2 sm:mb-0">
              <Button
                filled={false}
                text="<Sebelum"
                handler={berkasPreviousButtonHandler}
              />
            </div>
            <div>
              <Button
                filled={true}
                text="Lanjut>"
                handler={berkasNextButtonHandler}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

interface PMProps {
  closeHandler: Function;
}

function PembayaranModal({ closeHandler }: PMProps) {
  return (
    <>
      <div className="h-full w-full absolute flex flex-col items-center justify-center bg-black-80 bg-opacity-90 z-10"></div>
      <div className="h-full w-full absolute flex flex-col items-center justify-center z-20">
        <motion.div
          className="h-auto w-full md:w-1/2 bg-compe border-2 border-compe rounded-xl flex flex-col font-dm p-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <div
            className="text-white text-lg cursor-pointer flex justify-end"
            onClick={() => closeHandler()}
          >
            <AiFillCloseCircle />
          </div>
          <div className="w-full h-auto text-white font-bold text-2xl flex justify-center mb-4">
            Tata Cara Pembayaran UNAC
          </div>
          <div className="w-full h-auto text-white text-base flex justify-center mb-4 text-start flex-col">
            <p>Info pembayaran sebesar: </p>
            <p>
              ➔ Early Bird : Rp 25.000 (Dua Puluh Lima Ribu Rupiah) -{">"} 12
              Juli - 28 Juli
            </p>
            <p>
              ➔ Reguler : Rp 50.000 (Lima Puluh Ribu Rupiah) -{">"} 29 Juli - 19
              Agustus
            </p>
            <p>
              Pembayaran biaya pendaftaran dapat dilakukan melalui transfer ke
              rekening:
            </p>
            <p>➔ BRI - 010901058496506 an Aldilla Putri Oktavia</p>
            <p>➔ BCA - 7880936853 an Della Ariyanti Rahayu Ninggar</p>
            <p>
              Setelah melakukan pembayaran, calon peserta dapat mengirimkan
              bukti pembayaran.
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}

const forms1 = [
  { lb: "NAMA TIM", pc: "Masukkan nama tim..", rg: "team_name", tp: "text" },
  {
    lb: "ASAL PERGURUAN TINGGI",
    pc: "Masukkan asal perguruan tinggi..",
    rg: "university",
    tp: "text",
  },
  {
    lb: "NAMA LENGKAP KETUA",
    pc: "Masukkan nama lengkap ketua..",
    rg: "full_name",
    tp: "text",
  },
  {
    lb: "NO.TELEPON KETUA",
    pc: "Masukkan no.telepon ketua..",
    rg: "phone",
    tp: "text",
  },
  {
    lb: "ID LINE KETUA",
    pc: "Masukkan ID LINE ketua..",
    rg: "id_line",
    tp: "text",
  },
  {
    lb: "EMAIL KETUA",
    pc: "Masukkan email ketua..",
    rg: "email",
    tp: "email",
  },
];

const forms2 = [
  { hr: "KETUA", lb: "NAMA KETUA" },
  { hr: "ANGGOTA 2", lb: "NAMA ANGGOTA 2" },
  { hr: "ANGGOTA 3", lb: "NAMA ANGGOTA 3" },
];
