// @ts-nocheck
import PatternBG from "./PatternBG";
import Trophy from "./Trophy";
import { motion } from "framer-motion";
import { useState } from "react";
import { useScrollPosition } from "../hooks/useScrollPostion";

interface CompePrizeProps {
  type: string;
}

export default function CompePrize({ type }: CompePrizeProps) {
  const [scroll, setScroll] = useState(false);

  useScrollPosition(
    ({ currPos }: any) => {
      const isShow = currPos.y < -400;

      if (isShow !== scroll) setScroll(isShow);
      else setScroll(isShow);
    },
    [scroll]
  );
  return (
    <div className="w-full h-hero bg-black-80 overflow-hidden relative flex flex-col items-center justify-center">
      <PatternBG position="left" />
      <div className="h-20 w-full text-white flex justify-center z-10">
        <p
          className="font-bold italic text-5xl md:text-6xl"
          style={{ textShadow: "0 0 25px #7303C0" }}
        >
          <span className="text-stroke">PRIZES</span>
        </p>
      </div>
      <div className="h-96 w-full flex flex-col md:flex-row justify-center mt-12 md:mt-4">
        {scroll && (
          <motion.div
            className="flex items-center p-4 md:p-0 md:hidden"
            initial={{ y: 300 }}
            animate={{ y: 0 }}
          >
            <Trophy
              pos="1"
              prize={
                type === "unac"
                  ? "Rp7.000.000,- + plakat"
                  : "Rp3.000.000,- + plakat"
              }
            />
          </motion.div>
        )}
        {scroll && (
          <motion.div
            className="hidden items-end p-4 md:p-0 md:flex"
            initial={{ y: 300 }}
            animate={{ y: 0 }}
          >
            <Trophy
              pos="2"
              prize={
                type === "unac"
                  ? "Rp5.000.000,- + plakat"
                  : "Rp2.000.000,- + plakat"
              }
            />
          </motion.div>
        )}
        {scroll && (
          <motion.div
            className="flex items-end p-4 md:p-0 md:hidden"
            initial={{ y: 300 }}
            animate={{ y: 0, transition: { delay: 0.1 } }}
          >
            <Trophy
              pos="2"
              prize={
                type === "unac"
                  ? "Rp5.000.000,- + plakat"
                  : "Rp2.000.000,- + plakat"
              }
            />
          </motion.div>
        )}
        {scroll && (
          <motion.div
            className="hidden items-center p-4 md:p-0 md:flex"
            initial={{ y: 300 }}
            animate={{ y: 0, transition: { delay: 0.1 } }}
          >
            <Trophy
              pos="1"
              prize={
                type === "unac"
                  ? "Rp7.000.000,- + plakat"
                  : "Rp3.000.000,- + plakat"
              }
            />
          </motion.div>
        )}
        {scroll && (
          <motion.div
            className="flex items-end p-4 md:p-0"
            initial={{ y: 300 }}
            animate={{ y: 0, transition: { delay: 0.2 } }}
          >
            <Trophy
              pos="3"
              prize={
                type === "unac"
                  ? "Rp3.000.000,- + plakat"
                  : "Rp1.000.000,- + plakat"
              }
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
