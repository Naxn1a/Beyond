import * as React from "react";
import { motion, useDeprecatedInvertedScale } from "framer-motion";
import { closeSpring, openSpring } from "./animation";
import { TitleProps, ScaleTranslateData } from "@/types/type";

export default function Title({ title, category, isSelected }: TitleProps) {
  const inverted = useDeprecatedInvertedScale();
  const x = isSelected ? 30 : 15;
  const y = x;

  return (
    <motion.div
      className="title-container"
      initial={false}
      animate={{ x, y }}
      transition={isSelected ? openSpring : closeSpring}
      transformTemplate={scaleTranslate}
      style={{ ...inverted, originX: 0, originY: 0 }}
    >
      <span className="category">{category}</span>
      <h2>{title}</h2>
    </motion.div>
  );
};

const scaleTranslate = ({ x, y, scaleX, scaleY }: ScaleTranslateData) =>
  `scaleX(${scaleX}) scaleY(${scaleY}) translate(${x}, ${y}) translateZ(0)`;
