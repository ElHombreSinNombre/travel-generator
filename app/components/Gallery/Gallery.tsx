import { useState } from "react";
import { NavArrowLeft, NavArrowRight } from "iconoir-react";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "../Framer/Lightbox/Lightbox";
import "./gallery.scss";

interface GalleryProps {
  items: { id: number; alt: string; photo: string }[];
}

function Gallery({ items }: GalleryProps) {
  const [currentIndex, setIndex] = useState(0);
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handlePrevious = () => {
    setIndex((prevSlide) => {
      if (prevSlide === 0) {
        return items.length - 1;
      } else {
        return prevSlide - 1;
      }
    });
  };

  const openLightbox = (index: number) => {
    setIndex(index);
    setLightboxIndex(index);
    setLightboxIsOpen(true);
  };

  const closeLightbox = () => {
    setLightboxIsOpen(false);
    setIndex(lightboxIndex);
  };

  const handleNext = () => {
    setIndex((prevSlide) => {
      if (prevSlide === items.length - 1) {
        return 0;
      } else {
        return prevSlide + 1;
      }
    });
  };

  return (
    <div className="gallery-container">
      <div className="gallery rounded-lg">
        <div
          title="Previous"
          className="arrows left opacity-50 hover:opacity-100 transition duration-500 ease-in-out"
          onClick={handlePrevious}
        >
          <NavArrowLeft />
        </div>
        <div
          title="Next"
          className="arrows right opacity-50 hover:opacity-100 transition duration-500 ease-in-out"
          onClick={handleNext}
        >
          <NavArrowRight />
        </div>
        {items.map((item) => (
          <AnimatePresence initial={false} key={item.id}>
            {items.map((item, index) => (
              <motion.img
                className="img"
                key={item.id}
                onClick={() => openLightbox(index)}
                src={item.photo}
                alt={item.alt}
                title="Click to show"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: index === currentIndex ? 1 : 0,
                  x: 0,
                  transition: { duration: 3 },
                }}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  right: 0,
                  display: index === currentIndex ? "block" : "none",
                }}
              />
            ))}
          </AnimatePresence>
        ))}
        <div className="dots">
          {items.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setIndex(index)}
            />
          ))}
        </div>
      </div>
      <Lightbox
        items={items}
        selectedIndex={lightboxIndex}
        isOpen={lightboxIsOpen}
        onClick={closeLightbox}
      />
    </div>
  );
}

export default Gallery;
