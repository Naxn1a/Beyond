import * as React from "react";
import { motion, useDeprecatedInvertedScale } from "framer-motion";
import { closeSpring } from "./animation";
import { ImageProps } from "@/types/type";
import { imagelist } from "@/data/imagelist.json";

export const Image = ({
  id,
  isSelected,
  pointOfInterest = 0,
  backgroundColor
}: ImageProps) => {
  const inverted = useDeprecatedInvertedScale();

  return (
    <motion.div
      className="card-image-container"
      style={{ ...inverted, backgroundColor, originX: 0, originY: 0 }}
    >
      <motion.img
        className="card-image"
        src={`images/${id}.jpg`} //if it exists in local images folder
        alt=""
        initial={false}
        animate={
          isSelected ? { x: -20, y: -20 } : { x: -pointOfInterest, y: 0 }
        }
        transition={closeSpring}
      />
    </motion.div>
  );
};
