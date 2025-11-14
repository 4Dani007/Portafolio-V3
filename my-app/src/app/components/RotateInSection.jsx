'use client';

import { motion } from "framer-motion";

/**
 * RotateInSection component
 * Componente que anima el contenido con efecto de rotación
 * 
 * Props:
 * - children: contenido a renderizar
 * - delay: retraso en segundos - default: 0
 * - duration: duración de la animación - default: 0.6
 * - angle: ángulo inicial en grados - default: 10
 * - className: clases adicionales para el contenedor
 */
export default function RotateInSection({
  children,
  delay = 0,
  duration = 0.6,
  angle = 10,
  className = ""
}) {
  return (
    <motion.section
      initial={{ opacity: 0, rotate: -angle }}
      whileInView={{ opacity: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, type: "spring", stiffness: 50 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

