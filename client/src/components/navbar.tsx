'use client';
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from 'next/link'

export default function Navbar({ title, link, path }: any) {

  const initialValue = 140;
  const finalValue = 88;
  const thresholdY = 170;

  const speed = 1;
  const scrollDistance = (initialValue - finalValue) / speed;

  const startY = 0;
  const endY = startY + scrollDistance;

  const { scrollY } = useScroll();
  const scrollOutput = useTransform(
    scrollY,
    [startY, endY, endY],
    [initialValue, finalValue, finalValue],
    {
      clamp: false
    }
  );

  const [isPastThreshold, setIsPastThreshold] = useState(false);
  useEffect(
    () => scrollY.onChange((latest) => setIsPastThreshold(latest > thresholdY)),
    []
  );

  return (
    <div>
      <motion.div className="navbar" style={{ height: scrollOutput }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: isPastThreshold ? 1 : 0,
            scale: isPastThreshold ? 1 : 0.5
          }}
        >
          {title}
        </motion.div>
        <div className="ml-4">
          <Link href={link}>{path}</Link>
        </div>
      </motion.div>
    </div>
  );
}

