import { motion } from "framer-motion";
import React, { ReactNode } from "react";

type FadeInProps = {
  children?: ReactNode;
};

function FadeIn({ children }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50, y: 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

export default FadeIn;
