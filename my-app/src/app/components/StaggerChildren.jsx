'use client';

import { motion } from "framer-motion";

/**
 * StaggerChildren component
 * Componente que anima los hijos con efecto stagger (uno tras otro)
 * 
 * Props:
 * - children: contenido a renderizar (debe ser un array de elementos)
 * - delay: retraso entre cada elemento en segundos - default: 0.1
 * - duration: duración de cada animación - default: 0.5
 * - className: clases adicionales para el contenedor
 */
export default function StaggerChildren({
  children,
  delay = 0.1,
  duration = 0.5,
  className = ""
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={itemVariants}>{children}</motion.div>
      )}
    </motion.div>
  );
}

