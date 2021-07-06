import { motion } from "framer-motion";
import Image from "next/image";

interface HeaderVideoProps {
  scroll: boolean;
}

export default function HeaderVideo({ scroll }: HeaderVideoProps) {
  const container = {
    show: {
      transition: { staggerChildren: 4 },
    },
    hidden: {
      opacity: 1,
    },
  };

  const item1 = {
    show: {
      scale: [0, 1.5, 1, 1, 1],
      x: [300, 300, 300, 300, 0],
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
      y: 100,
      transition: {
        duration: 1,
      },
      opacity: 1,
    },

    hidden: {
      y: 100,
      transition: {
        duration: 1,
      },
      opacity: 0,
    },
  };

  const item22 = {
    show: {
      transition: {
        duration: 1,
      },
      opacity: 1,
    },

    hidden: {
      y: 100,
      transition: {
        duration: 1,
      },
      opacity: 0,
    },
  };

  return (
    <>
      <div className="h-hero bg-black-80 relative w-full hidden md:block">
        <div className="h-full w-full hidden md:block overflow-hidden absolute">
          <video
            id="videobcg"
            preload="auto"
            autoPlay={true}
            loop={true}
            muted={true}
            className={`h-full w-full object-cover ${
              scroll ? "blur-2xl" : "blur-md transition-all"
            } scale-110`}
          >
            <source src="/video/video.mp4" type="video/mp4" />
            Sorry, your browser does not support HTML5 video.
          </video>
        </div>
        <motion.div
          className="flex flex-col md:flex-row relative h-full w-full items-center justify-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div className="h-96 w-96" variants={item1}>
            <Image
              src="/picture/logo.svg"
              width={384}
              height={384}
              alt="AAC Logo"
            />
          </motion.div>
          <motion.div
            className="h-96 w-full md:w-[600px] content-endflex flex-col relative overflow-hidden justify-center items-center"
            variants={item2}
          >
            {scroll && (
              <motion.div
                className="h-1/2 w-full absolute font-dm flex flex-col items-center md:items-start"
                variants={item22}
                initial="hidden"
                animate="show"
                exit="hidden"
              >
                <p className="font-bold text-2xl md:text-3xl text-orange">
                  Apa itu AAC?
                </p>
                <p className="text-xl md:text-2xl text-white text-center md:text-left">
                  Acara kompetisi akuntansi yang diikuti oleh peserta dari
                  seluruh Indonesia, diselenggarakan oleh Himpunan Mahasiswa
                  Akuntansi, Fakultas Ekonomi dan Bisnis Universitas Airlangga.
                </p>
              </motion.div>
            )}
            {!scroll && (
              <motion.div
                className="h-1/2 w-full absolute flex items-center justify-start font-dm"
                variants={item21}
                initial="hidden"
                animate="show"
                exit="hidden"
              >
                <Image
                  src="/picture/landingText.svg"
                  width={600}
                  height={400}
                  alt="Landing Text"
                />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
