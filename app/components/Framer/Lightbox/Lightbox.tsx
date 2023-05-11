import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./lightbox.scss";

type LightboxProps = {
  items: { id: number }[];
  children?: (value: string | number) => void;
};

function Lightbox({ children, items }: LightboxProps) {
  return (
    <AnimatePresence initial={false}>
      {items.map((item) => (
        <motion.img key={item.id} />
      ))}
      {children && (
        <>
          {items.map((item) => (
            <>{children("Test")}</>
          ))}
        </>
      )}
    </AnimatePresence>
  );
}

export default Lightbox;
