import { motion } from "framer-motion";
import React, { ReactNode } from "react";

type FadeInProps = {
  children?: ReactNode;
};

function FadeIn({ children }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

export default FadeIn;
