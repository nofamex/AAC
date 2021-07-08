import FAQ from "./FAQ";

export default function TacFAQ() {
  const faqContent = [
    {
      title: "Apa itu TAC?",
      content:
        "Teenage Accounting Competition (TAC) merupakan serangkaian acara kompetisi yang diselenggarakan oleh Himpunan Mahasiswa S1 Akuntansi Universitas Airlangga yang ditujukan untuk seluruh siswa/i SMA dan SMK sederajat di seluruh Indonesia",
    },
    {
      title: "Apakah TAC 2021 akan diselenggarakan secara online?",
      content:
        "Seluruh rangkaian acara TAC 2021 akan diselenggarakan secara online",
    },
    {
      title: "Ada berapa babak di TAC 2021?",
      content:
        "TAC 2021 terdiri dari 4 babak : Babak Preliminary, Babak Eliminasi, Babak Semifinal, dan Babak Final",
    },
    {
      title: "Kapan TAC 2021 diadakan?",
      content:
        "Babak Preliminary akan diadakan pada 28 Agustus 2021, sedangkan Babak Mainround akan diadakan pada 8-12 September 2021",
    },
    {
      title:
        "Satu tim terdiri dari berapa orang? Apakah boleh berbeda jurusan?",
      content:
        "Satu tim terdiri dari 3 siswa/i dari SMA yang sama. Tim boleh terdiri dari jurusan/angkatan yang berbeda",
    },
    {
      title: "Berapa biaya pendaftaran TAC 2021?",
      content:
        "Biaya pendaftaran UNAC 2021 adalah Rp20.000,00 untuk Early Bird Registration dan Rp40.000,00 untuk Regular Registration",
    },
    {
      title: "Apakah ada silabus materi TAC 2021?",
      content: "Silabus materi TAC 2021 dapat dilihat di Booklet TAC 2021",
    },
    {
      title: "Apakah siswa kelas 12 boleh ikut?",
      content: "Ya, siswa kelas 12 diperbolehkan untuk mengikuti TAC 2021",
    },
    {
      title: "Apakah seminar TAC terbuka untuk umum?",
      content: "Seminar TAC hanya terbuka bagi peserta lomba TAC 2021",
    },
  ];

  return (
    <div className="h-auto w-full bg-black-80 overflow-hidden relative flex flex-col justify-center items-center">
      <div className="h-20 w-full text-white flex justify-center z-10 mt-16">
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
