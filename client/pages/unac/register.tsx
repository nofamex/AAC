import Layout from "../../components/Layout";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Button from "../../components/Button";
import { useState } from "react";
import DangerModal from "../../components/DangerModal";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { type } = router.query;

  const [show, setShow] = useState(false);

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

  const submitHandler = (data: any) => {
    router.replace("/unac/register?type=validasi");
    setShow(false);
  };

  return (
    <Layout>
      <div className="h-16 w-full bg-black-80"></div>
      <div className="h-section w-full bg-black-80 flex flex-col justify-center items-center font-dm">
        {show && (
          <DangerModal
            submit={handleSubmit(submitHandler)}
            closeHandler={() => setShow(false)}
          />
        )}

        {type === "validasi" && (
          <div className="w-full h-full flex flex-col font-dm items-center justify-center">
            <div className="w-full h-20 font-bold text-white text-4xl flex justify-center items-center ">
              SUMMARY
            </div>
            <div className="w-5/6 h-full bg-green-600 flex justify-center">
              <div className="h-full w-2/6 bg-red-500 flex flex-col text-white">
                <p className="text-3xl font-bold">Identitas Tim</p>
                <p className="text-sm font-bold">NAMA TIM</p>
              </div>
              <div className="h-full w-2/6 bg-yellow"></div>
              <div className="h-full w-2/6 bg-orange"></div>
            </div>
            <div className="w-full flex justify-center">
              <Button
                filled={true}
                text="Selesai"
                handler={() => console.log("done")}
              />
            </div>
          </div>
        )}

        <form className="flex flex-col w-1/2">
          {(typeof type === "undefined" || type === "team") && (
            <div className="w-full">
              {forms1.map((form, index) => (
                <div className="w-full" key={index}>
                  <p className="text-white font-bold text-sm mb-1">{form.lb}</p>
                  <input
                    {...register(form.rg)}
                    placeholder={form.pc}
                    type={form.tp}
                    required
                    className="mb-4 bg-black-80 border-white border-2 h-10 w-full p-2 rounded-lg focus:outline-none text-white"
                  />
                </div>
              ))}
            </div>
          )}

          {type === "anggota" && (
            <div className="w-full">
              {forms2.map((form, index) => (
                <div className="w-full" key={index}>
                  <div className="w-full">
                    <p className="text-white font-bold text-lg mb-4">
                      {form.hr}
                    </p>
                    <p className="text-white font-bold text-sm mb-1">
                      {form.lb}
                    </p>
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
                      placeholder="Tanggal lahir.."
                      type={"text"}
                      required
                      className="bg-black-80 border-white border-2 h-10 w-full p-2 rounded-lg focus:outline-none text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {type === "berkas" && (
            <div className="w-full">
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
                  {...register("linkPasFoto")}
                  placeholder="Masukkan link file foto peserta.."
                  type="text"
                  required
                  className="mb-4 bg-black-80 border-white border-2 h-10 w-full p-2 rounded-lg focus:outline-none text-white"
                />
              </div>
              <div className="w-full">
                <p className="text-white font-bold text-sm mb-1 flex">
                  BUKTI PEMBAYARAN
                  <span className="text-orange font-normal ml-auto underline cursor-pointer">
                    Keterangan cara pembayaran
                  </span>
                </p>
                <input
                  {...register("linkBuktiPembayaran")}
                  placeholder="Masukkan link file bukti pembayaran.."
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
                  {...register("linkKTMPeserta")}
                  placeholder="Masukkan link file KTM peserta.."
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
                  {...register("linkSuratKeterangan")}
                  placeholder="Masukkan link file foto surat.."
                  type="text"
                  required
                  className="mb-4 bg-black-80 border-white border-2 h-10 w-full p-2 rounded-lg focus:outline-none text-white"
                />
              </div>
            </div>
          )}
        </form>

        {(typeof type === "undefined" || type === "team") && (
          <div className="w-1/2 mt-4 flex justify-end">
            <Button filled={false} text="Lanjut>" handler={teamButtonHandler} />
          </div>
        )}

        {type === "anggota" && (
          <div className="w-1/2 mt-4 flex justify-between">
            <Button
              filled={false}
              text="<Sebelum"
              handler={anggotaPreviousButtonHandler}
            />
            <Button
              filled={false}
              text="Lanjut>"
              handler={anggotaNextButtonHandler}
            />
          </div>
        )}

        {type === "berkas" && (
          <div className="w-1/2 mt-4 flex justify-between">
            <Button
              filled={false}
              text="<Sebelum"
              handler={berkasPreviousButtonHandler}
            />
            <Button
              filled={true}
              text="Lanjut>"
              handler={berkasNextButtonHandler}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}

const forms1 = [
  { lb: "NAMA TIM", pc: "Masukkan nama tim..", rg: "namaTim", tp: "text" },
  {
    lb: "ASAL PERGURUAN TINGGI",
    pc: "Masukkan asal perguruan tinggi..",
    rg: "asalUniversitas",
    tp: "text",
  },
  {
    lb: "NAMA LENGKAP KETUA",
    pc: "Masukkan nama lengkap ketua..",
    rg: "namaLengkapKetua",
    tp: "text",
  },
  {
    lb: "NO.TELEPON KETUA",
    pc: "Masukkan no.telepon ketua..",
    rg: "noTeleponKetua",
    tp: "number",
  },
  {
    lb: "ID LINE KETUA",
    pc: "Masukkan ID LINE ketua..",
    rg: "idLineKetua",
    tp: "text",
  },
  {
    lb: "EMAIL KETUA",
    pc: "Masukkan email ketua..",
    rg: "emailKetua",
    tp: "email",
  },
];

const forms2 = [
  { hr: "KETUA", lb: "NAMA KETUA" },
  { hr: "ANGGOTA 2", lb: "NAMA ANGGOTA 2" },
  { hr: "ANGGOTA 3", lb: "NAMA ANGGOTA 3" },
];
