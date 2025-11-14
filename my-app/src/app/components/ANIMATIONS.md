# Componentes de Animación

Documentación de los componentes de animación disponibles para usar en el scroll.

Todos los componentes usan **Framer Motion** y están optimizados para rendimiento.

---

## 📦 Componentes Disponibles

### 1. FadeInSection
**Archivo**: `FadeinSection.jsx` (ya existente)

Animación básica de fade in desde abajo.

```jsx
import FadeInSection from '@/app/components/FadeinSection';

<FadeInSection>
  <div>Contenido que aparece con fade in</div>
</FadeInSection>
```

---

### 2. SlideInSection
**Archivo**: `SlideInSection.jsx`

Desliza el contenido desde diferentes direcciones.

**Props**:
- `direction`: `'up'` | `'down'` | `'left'` | `'right'` (default: `'up'`)
- `delay`: número en segundos (default: `0`)
- `duration`: duración en segundos (default: `0.6`)
- `className`: clases CSS adicionales

**Ejemplo**:
```jsx
import SlideInSection from '@/app/components/SlideInSection';

<SlideInSection direction="left" delay={0.2}>
  <div>Contenido que se desliza desde la izquierda</div>
</SlideInSection>
```

---

### 3. ScaleInSection
**Archivo**: `ScaleInSection.jsx`

Efecto de escala (zoom in).

**Props**:
- `delay`: número en segundos (default: `0`)
- `duration`: duración en segundos (default: `0.5`)
- `scale`: escala inicial 0-1 (default: `0.8`)
- `className`: clases CSS adicionales

**Ejemplo**:
```jsx
import ScaleInSection from '@/app/components/ScaleInSection';

<ScaleInSection scale={0.5} duration={0.8}>
  <div>Contenido que hace zoom in</div>
</ScaleInSection>
```

---

### 4. RotateInSection
**Archivo**: `RotateInSection.jsx`

Efecto de rotación al aparecer.

**Props**:
- `delay`: número en segundos (default: `0`)
- `duration`: duración en segundos (default: `0.6`)
- `angle`: ángulo inicial en grados (default: `10`)
- `className`: clases CSS adicionales

**Ejemplo**:
```jsx
import RotateInSection from '@/app/components/RotateInSection';

<RotateInSection angle={15} delay={0.3}>
  <div>Contenido que rota al aparecer</div>
</RotateInSection>
```

---

### 5. FadeInUpSection
**Archivo**: `FadeInUpSection.jsx`

Fade in desde abajo con más control que FadeInSection.

**Props**:
- `delay`: número en segundos (default: `0`)
- `duration`: duración en segundos (default: `0.6`)
- `distance`: distancia en píxeles (default: `30`)
- `className`: clases CSS adicionales

**Ejemplo**:
```jsx
import FadeInUpSection from '@/app/components/FadeInUpSection';

<FadeInUpSection distance={50} delay={0.2}>
  <div>Contenido con fade in controlado</div>
</FadeInUpSection>
```

---

### 6. BlurInSection
**Archivo**: `BlurInSection.jsx`

Efecto de blur que se desvanece.

**Props**:
- `delay`: número en segundos (default: `0`)
- `duration`: duración en segundos (default: `0.6`)
- `blur`: cantidad de blur inicial (default: `10`)
- `className`: clases CSS adicionales

**Ejemplo**:
```jsx
import BlurInSection from '@/app/components/BlurInSection';

<BlurInSection blur={15} duration={0.8}>
  <div>Contenido que aparece sin blur</div>
</BlurInSection>
```

---

### 7. StaggerChildren
**Archivo**: `StaggerChildren.jsx`

Anima múltiples hijos uno tras otro (stagger effect).

**Props**:
- `delay`: retraso entre cada elemento en segundos (default: `0.1`)
- `duration`: duración de cada animación (default: `0.5`)
- `className`: clases CSS adicionales

**Ejemplo**:
```jsx
import StaggerChildren from '@/app/components/StaggerChildren';

<StaggerChildren delay={0.15}>
  <div>Elemento 1</div>
  <div>Elemento 2</div>
  <div>Elemento 3</div>
</StaggerChildren>
```

---

### 8. AnimatedSection
**Archivo**: `AnimatedSection.jsx`

Componente versátil con múltiples tipos de animación.

**Props**:
- `animation`: `'fade'` | `'slide'` | `'scale'` | `'rotate'` | `'blur'` (default: `'fade'`)
- `direction`: `'up'` | `'down'` | `'left'` | `'right'` (solo para `'slide'`, default: `'up'`)
- `delay`: número en segundos (default: `0`)
- `duration`: duración en segundos (default: `0.6`)
- `distance`: distancia en píxeles (default: `30`)
- `className`: clases CSS adicionales

**Ejemplos**:
```jsx
import AnimatedSection from '@/app/components/AnimatedSection';

// Fade
<AnimatedSection animation="fade" delay={0.2}>
  <div>Fade in</div>
</AnimatedSection>

// Slide desde la derecha
<AnimatedSection animation="slide" direction="right" delay={0.3}>
  <div>Slide desde derecha</div>
</AnimatedSection>

// Scale
<AnimatedSection animation="scale" duration={0.8}>
  <div>Scale in</div>
</AnimatedSection>
```

---

### 9. ScrollSection (Parallax)
**Archivo**: `ScrollSection.jsx` (ya existente)

Efecto parallax al hacer scroll.

**Props**:
- `from`: valor inicial (default: `"0%"`)
- `to`: valor final (default: `"-50%"`)
- `className`: clases CSS adicionales

**Ejemplo**:
```jsx
import ScrollSection from '@/app/components/ScrollSection';

<ScrollSection from="0%" to="-30%">
  <div>Contenido con efecto parallax</div>
</ScrollSection>
```

---

## 🎯 Ejemplos de Uso en Secciones

### Hero Section
```jsx
import FadeInUpSection from '@/app/components/FadeInUpSection';

<FadeInUpSection>
  <section id="hero">
    {/* Contenido */}
  </section>
</FadeInUpSection>
```

### Projects Section
```jsx
import SlideInSection from '@/app/components/SlideInSection';
import StaggerChildren from '@/app/components/StaggerChildren';

<SlideInSection direction="up" delay={0.2}>
  <section id="projects">
    <h2>Título</h2>
    <StaggerChildren delay={0.1}>
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </StaggerChildren>
  </section>
</SlideInSection>
```

### About Section
```jsx
import AnimatedSection from '@/app/components/AnimatedSection';

<AnimatedSection animation="slide" direction="left" delay={0.3}>
  <section id="about">
    {/* Contenido */}
  </section>
</AnimatedSection>
```

### Contact Section
```jsx
import ScaleInSection from '@/app/components/ScaleInSection';

<ScaleInSection delay={0.2} duration={0.8}>
  <section id="contact">
    {/* Contenido */}
  </section>
</ScaleInSection>
```

---

## 💡 Mejores Prácticas

1. **Usa `delay` para crear secuencias**: Diferentes delays crean efectos en cascada
2. **Combina componentes**: Usa `StaggerChildren` dentro de otras animaciones
3. **No abuses**: No todas las secciones necesitan animación
4. **Considera el rendimiento**: Las animaciones con `blur` pueden ser más pesadas
5. **Mantén consistencia**: Usa el mismo tipo de animación para secciones similares

---

## 🔧 Personalización

Todos los componentes aceptan `className` para agregar estilos adicionales:

```jsx
<FadeInUpSection className="my-custom-class">
  <div>Contenido</div>
</FadeInUpSection>
```

---

**Nota**: Todos los componentes usan `viewport={{ once: true }}` para que la animación solo se ejecute una vez cuando el elemento entra en vista.

