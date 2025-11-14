'use client';

import { motion } from "framer-motion";

/**
 * AnimatedSection component
 * Componente versátil con múltiples opciones de animación
 * 
 * Props:
 * - children: contenido a renderizar
 * - animation: tipo de animación ('fade', 'slide', 'scale', 'rotate', 'blur') - default: 'fade'
 * - direction: dirección para slide ('up', 'down', 'left', 'right') - default: 'up'
 * - delay: retraso en segundos - default: 0
 * - duration: duración de la animación - default: 0.6
 * - distance: distancia para slide/fade - default: 30
 * - className: clases adicionales para el contenedor
 */
export default function AnimatedSection({
  children,
  animation = 'fade',
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 30,
  className = ""
}) {
  const animations = {
    fade: {
      initial: { opacity: 0, y: distance },
      animate: { opacity: 1, y: 0 }
    },
    slide: {
      up: { initial: { opacity: 0, y: distance }, animate: { opacity: 1, y: 0 } },
      down: { initial: { opacity: 0, y: -distance }, animate: { opacity: 1, y: 0 } },
      left: { initial: { opacity: 0, x: distance }, animate: { opacity: 1, x: 0 } },
      right: { initial: { opacity: 0, x: -distance }, animate: { opacity: 1, x: 0 } }
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 }
    },
    rotate: {
      initial: { opacity: 0, rotate: -10 },
      animate: { opacity: 1, rotate: 0 }
    },
    blur: {
      initial: { opacity: 0, filter: "blur(10px)" },
      animate: { opacity: 1, filter: "blur(0px)" }
    }
  };

  let animationConfig;
  if (animation === 'slide') {
    animationConfig = animations.slide[direction] || animations.slide.up;
  } else {
    animationConfig = animations[animation] || animations.fade;
  }

  const transition = animation === 'scale' || animation === 'rotate' 
    ? { duration, delay, type: "spring", stiffness: 100 }
    : { duration, delay, ease: "easeOut" };

  return (
    <motion.section
      initial={animationConfig.initial}
      whileInView={animationConfig.animate}
      viewport={{ once: true, margin: "-100px" }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.section>
  );
}

