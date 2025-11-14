'use client';

import { motion } from "framer-motion";

/**
 * FadeInUpSection component
 * Componente que anima el contenido con fade in desde abajo (más controlado que FadeInSection)
 * 
 * Props:
 * - children: contenido a renderizar
 * - delay: retraso en segundos - default: 0
 * - duration: duración de la animación - default: 0.6
 * - distance: distancia en píxeles - default: 30
 * - className: clases adicionales para el contenedor
 */
export default function FadeInUpSection({
  children,
  delay = 0,
  duration = 0.6,
  distance = 30,
  className = ""
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

