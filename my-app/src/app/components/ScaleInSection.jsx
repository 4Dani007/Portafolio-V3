'use client';

import { motion } from "framer-motion";

/**
 * ScaleInSection component
 * Componente que anima el contenido con efecto de escala
 * 
 * Props:
 * - children: contenido a renderizar
 * - delay: retraso en segundos - default: 0
 * - duration: duración de la animación - default: 0.5
 * - scale: escala inicial (0-1) - default: 0.8
 * - className: clases adicionales para el contenedor
 */
export default function ScaleInSection({
  children,
  delay = 0,
  duration = 0.5,
  scale = 0.8,
  className = ""
}) {
  return (
    <motion.section
      initial={{ opacity: 0, scale }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, type: "spring", stiffness: 100 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

