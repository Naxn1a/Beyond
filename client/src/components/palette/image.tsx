import * as React from "react";
import { motion } from "framer-motion";
import { closeSpring } from "./animation";
import { ImageProps } from "@/types/type";

export default function Image({
  id,
  isSelected,
  pointOfInterest = 0,
  backgroundColor,
}: ImageProps) {
  return (
    <motion.div
      className="card-image-container"
      style={{ backgroundColor, originX: 0, originY: 0 }}
    >
      <motion.div
        className="image-wrapper"
        initial={false}
        animate={isSelected ? { scale: 1.1 } : { scale: 1 }}
        transition={closeSpring}
      >
        <motion.img
          className="card-image"
          src={`/images/${id}.jpg`} // Adjust path if images are in public folder
          alt=""
          initial={false}
          animate={
            isSelected ? { x: -20, y: -20 } : { x: -pointOfInterest, y: 0 }
          }
          transition={closeSpring}
        />
      </motion.div>
    </motion.div>
  );
};
