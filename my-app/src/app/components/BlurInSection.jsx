'use client';

import { motion } from "framer-motion";

/**
 * BlurInSection component
 * Componente que anima el contenido con efecto de blur
 * 
 * Props:
 * - children: contenido a renderizar
 * - delay: retraso en segundos - default: 0
 * - duration: duración de la animación - default: 0.6
 * - blur: cantidad de blur inicial - default: 10
 * - className: clases adicionales para el contenedor
 */
export default function BlurInSection({
  children,
  delay = 0,
  duration = 0.6,
  blur = 10,
  className = ""
}) {
  return (
    <motion.section
      initial={{ opacity: 0, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

