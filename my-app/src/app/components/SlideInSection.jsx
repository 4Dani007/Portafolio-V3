'use client';

import { motion } from "framer-motion";

/**
 * SlideInSection component
 * Componente que anima el contenido deslizándose desde diferentes direcciones
 * 
 * Props:
 * - children: contenido a renderizar
 * - direction: dirección de la animación ('left', 'right', 'up', 'down') - default: 'up'
 * - delay: retraso en segundos - default: 0
 * - duration: duración de la animación - default: 0.6
 * - className: clases adicionales para el contenedor
 */
export default function SlideInSection({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = ""
}) {
  const directions = {
    up: { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 } },
    down: { initial: { opacity: 0, y: -50 }, animate: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 } }
  };

  const animation = directions[direction] || directions.up;

  return (
    <motion.section
      initial={animation.initial}
      whileInView={animation.animate}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

