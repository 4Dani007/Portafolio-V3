'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * ScrollParallax component
 * 
 * Props:
 * - children: contenido a renderizar dentro del efecto
 * - from: valor inicial (default: "0%")
 * - to: valor final (default: "-50%")
 * - className: clases para el contenedor principal
 */
export default function ScrollParallax({
  children,
  from = "0%",
  to = "-50%",
  className = ""
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], 
  });

  const y = useTransform(scrollYProgress, [0, 1], [from, to]);

  return (
    <section 
      ref={ref} 
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </section>
  );
}