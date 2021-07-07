import { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";

interface FAQProps {
  title: string;
  content: string;
}

export default function FAQ({ title, content }: FAQProps) {
  const [active, setActiive] = useState(false);

  return (
    <div className="h-auto w-full rounded-xl flex bg-compe flex-col mb-4">
      <div
        className={`${
          active ? "bg-orange" : "bg-compe"
        } h-auto w-full rounded-xl flex text-white font-dm p-4 items-center cursor-pointer transition-colors duration-200`}
        onClick={() => setActiive(!active)}
      >
        <div>{title}</div>
        <div className="ml-auto">
          {active ? (
            <IoIosArrowUp className="h-8 w-8" />
          ) : (
            <IoIosArrowDown className="h-8 w-8" />
          )}
        </div>
      </div>
      {active && (
        <motion.div
          className="h-auto w-full p-8 font-dm text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {content}
        </motion.div>
      )}
    </div>
  );
}
