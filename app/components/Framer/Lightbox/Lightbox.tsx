import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Media } from "@/app/models/media";
import "./lightbox.scss";

type LightboxProps = {
  items: Media[];
  selectedIndex: number;
  isOpen: boolean;
  onClick?: () => void;
};

function Lightbox({ items, selectedIndex, isOpen, onClick }: LightboxProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          title="Click to close"
          onClick={onClick}
          className="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.img
            src={items[selectedIndex].photo}
            alt={items[selectedIndex].alt}
            className="img"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Lightbox;
