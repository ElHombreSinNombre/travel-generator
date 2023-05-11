import { motion } from "framer-motion";
import React, { ReactNode } from "react";

type List = {
  children?: ReactNode;
};

function List({ children }: List) {
  return (
    <motion.li
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: "auto",
        opacity: 1,
        transition: { duration: 0.5 },
      }}
      exit={{
        height: 0,
        opacity: 0,
        transition: { duration: 0.5 },
      }}
    >
      {children}
    </motion.li>
  );
}

export default List;
