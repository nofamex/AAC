import { motion } from "framer-motion";
import Image from "next/image";

export default function HeaderVideo() {
  const container = {
    show: {
      transition: { staggerChildren: 3 },
    },
    hidden: {
      opacity: 1,
    },
  };

  const item1 = {
    show: {
      scale: [0, 1.5, 1, 1, 1],
      x: [100, 100, 100, 100, 0],
      transition: {
        duration: 3,
      },
    },

    hidden: {
      scale: 0,
    },
  };

  const item2 = {
    show: {
      scale: 1,
    },

    hidden: {
      scale: 0,
    },
  };

  const item21 = {
    show: {
      y: -500,
      transition: {
        duration: 1,
        delay: 4,
      },
    },

    hidden: {
      y: 100,
    },
  };

  const item22 = {
    hidden: {
      y: 500,
      transition: {
        delay: 1,
      },
    },

    show: {
      y: 100,
      transition: {
        delay: 4.5,
      },
    },
  };

  return (
    <>
      <div className="h-16 z-0"></div>
      <div className="h-section bg-black-80 relative">
        <div className="h-full w-full hidden md:block overflow-hidden absolute">
          <video
            id="videobcg"
            preload="auto"
            autoPlay={true}
            loop={true}
            muted={true}
            className="h-full w-full object-cover blur-xl scale-110"
          >
            <source src="/video/video.mp4" type="video/mp4" />
            Sorry, your browser does not support HTML5 video.
          </video>
        </div>
        <motion.div
          className="flex relative h-full w-full items-center justify-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div className="h-96 w-96" variants={item1}>
            <Image src="/picture/logo.svg" width={384} height={384} />
          </motion.div>
          <motion.div
            className="h-96 w-[600px] content-endflex flex-col relative overflow-hidden justify-center items-center ml-5"
            variants={item2}
          >
            <motion.div
              className="h-1/2 w-full absolute flex justify-center flex-col items-center font-dm"
              variants={item21}
            >
              <p className="text-persimmon text-9xl font-extrabold">AAC 2021</p>
              <p className="text-persimmon text-3xl font-bold tracking-widest">
                Airlangga Accounting Competition
              </p>
            </motion.div>
            <motion.div
              className="h-1/2 w-full absolute font-dm"
              variants={item22}
            >
              <p className="font-bold text-3xl text-orange">Apa itu AAC?</p>
              <p className="text-2xl text-white">
                Acara kompetisi akuntansi yang diikuti oleh peserta dari seluruh
                Indonesia, diselenggarakan oleh Himpunan Mahasiswa Akuntansi,
                Fakultas Ekonomi dan Bisnis Universitas Airlangga.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
