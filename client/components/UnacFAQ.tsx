import FAQ from "./FAQ";

export default function UnacFAQ() {
  const faqContent = [
    {
      title: "Apa itu UNAC ?",
      content:
        "Unair National Accounting Competition (UNAC) adalah serangkaian acara kompetisi yang diselenggarakan oleh Himpunan Mahasiswa S1 Akuntansi Universitas Airlangga yang ditujukan untuk seluruh mahasiswa aktif jurusan akuntansi perguruan tinggi baik negeri maupun swasta di seluruh Indonesia",
    },
    {
      title: "Apakah UNAC 2021 akan diselenggarakan secara online?",
      content:
        "Seluruh rangkaian acara UNAC 2021 akan diselenggarakan secara online",
    },
    {
      title: "Ada berapa babak di UNAC 2021?",
      content:
        " UNAC 2021 terdiri dari 4 babak : Babak Preliminary, Babak Eliminasi, Babak Semifinal, dan Babak Final",
    },
    {
      title: "Kapan UNAC 2021 diadakan?",
      content:
        "Babak Preliminary akan diadakan pada 28 Agustus 2021, sedangkan Babak Mainround akan diadakan pada 8-12 September 2021",
    },
    {
      title:
        "Satu tim terdiri dari berapa orang? Apakah boleh berbeda universitas?",
      content:
        "Satu tim terdiri dari 3 mahasiswa/i sarjana atau diploma akuntansi dari universitas yang sama. Tim boleh terdiri dari angkatan yang berbeda",
    },
    {
      title: "Apakah mahasiswa tingkat akhir boleh mengikuti UNAC 2021?",
      content:
        "Semua mahasiswa/i aktif jurusan akuntansi boleh mengikuti UNAC 2021. Untuk angkatan 2017 ke atas harap menyertakan Surat Keterangan Mahasiswa Aktif",
    },
    {
      title: "Berapa biaya pendaftaran UNAC 2021?",
      content:
        "Biaya pendaftaran UNAC 2021 adalah Rp25.000,00 untuk Early Bird Registration dan Rp50.000,00 untuk Regular Registration",
    },
    {
      title: "Apakah ada silabus materi UNAC 2021?",
      content: "Silabus materi UNAC 2021 dapat dilihat di Booklet UNAC 2021",
    },
  ];

  return (
    <div className="h-auto w-full bg-black-80 overflow-hidden relative flex flex-col justify-center items-center">
      <div className="h-20 w-full text-white flex justify-center z-10">
        <p
          className="font-bold italic text-5xl md:text-6xl"
          style={{ textShadow: "0 0 25px #7303C0" }}
        >
          <span className="text-stroke">FAQ</span>
        </p>
      </div>
      <div className="h-full w-4/6 z-10 mt-8">
        {faqContent.map((content, index) => (
          <FAQ key={index} title={content.title} content={content.content} />
        ))}
      </div>
    </div>
  );
}
