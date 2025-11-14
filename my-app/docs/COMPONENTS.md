# Documentación de Componentes

Esta guía describe los componentes principales del proyecto, hooks personalizados, y mejores prácticas de implementación.

**Última actualización**: 2025  
**Versión del proyecto**: 0.1.0

## 📦 Componentes Disponibles

### Navbar

Barra de navegación principal del sitio. Responsive con menú desktop y sidebar móvil deslizable.

**Ubicación**: `src/app/components/Navbar.jsx`

**Características**:
- ✅ Navegación responsive (desktop/móvil)
- ✅ Sidebar deslizable desde la derecha en móvil
- ✅ Overlay oscuro cuando la sidebar está abierta
- ✅ Integración con `ThemeToggle` y `LanguageSwitcher`
- ✅ Detección automática de tema con `useTheme`
- ✅ Estilos inline dinámicos (no depende de clases Tailwind `dark:`)
- ✅ Cierre automático al hacer clic en enlaces o fuera
- ✅ Animaciones suaves con `transition-transform`

**Props**: Ninguna (usa hooks internos)

**Uso**:
```jsx
import Navbar from '@/app/components/Navbar';

export default function Layout() {
  return (
    <>
      <Navbar />
      {/* Resto del contenido */}
    </>
  );
}
```

**Dependencias**:
- `useTheme` hook (`src/hooks/useTheme.js`)
- `useTranslations` de `next-intl`
- `lucide-react` para iconos (Menu, X)
- `ThemeToggle` y `LanguageSwitcher` componentes

**Estructura**:
- **Desktop**: Menú horizontal con enlaces, ThemeToggle y LanguageSwitcher
- **Mobile**: Botón hamburguesa que abre sidebar deslizable
- **Sidebar**: Contiene todos los enlaces + controles en columna vertical

**Estados**:
- `menuOpen`: Controla visibilidad de la sidebar
- `isDark`: Estado del tema (desde `useTheme`)
- `mounted`: Evita problemas de hidratación SSR

---

### ThemeToggle

Botón para alternar entre modo oscuro y claro con detección automática de preferencia del sistema.

**Ubicación**: `src/app/components/ThemeToggle.jsx`

**Características**:
- ✅ Toggle entre modo oscuro/claro
- ✅ Iconos dinámicos (Sol/Luna) de `lucide-react`
- ✅ Persistencia en `localStorage`
- ✅ Detección de preferencia del sistema (`prefers-color-scheme`)
- ✅ Escucha cambios del sistema si no hay preferencia guardada
- ✅ Estilos inline adaptativos al tema
- ✅ Manejo correcto de SSR con estado `mounted`

**Props**: Ninguna

**Uso**:
```jsx
import ThemeToggle from '@/app/components/ThemeToggle';

export default function Header() {
  return (
    <header>
      <ThemeToggle />
    </header>
  );
}
```

**Funcionalidad Detallada**:

1. **Inicialización**:
   - Verifica `localStorage.getItem('theme')`
   - Si no existe, detecta preferencia del sistema
   - Aplica tema inicial antes del render

2. **Toggle Manual**:
   - Cambia estado `isDark`
   - Actualiza clase `dark` en `<html>`
   - Guarda preferencia en `localStorage`

3. **Escucha del Sistema**:
   - Solo si NO hay tema guardado en `localStorage`
   - Escucha cambios en `prefers-color-scheme`
   - Actualiza automáticamente cuando el sistema cambia

**Estados Internos**:
- `isDark`: Estado actual del tema
- `mounted`: Evita render hasta que esté montado (previene flash)

**Nota**: Este componente maneja su propio estado de tema, pero otros componentes usan `useTheme` hook para detectar cambios.

---

### LanguageSwitcher

Selector de idioma con banderas visuales y navegación automática.

**Ubicación**: `src/app/components/LanguageSwitcher.jsx`

**Características**:
- ✅ Cambio dinámico de idioma
- ✅ Banderas visuales usando `country-flag-icons` (ES/US)
- ✅ Navegación automática a ruta correcta con `next/link`
- ✅ Adaptación al tema actual con `useTheme`
- ✅ Estilos inline adaptativos
- ✅ Hover effects personalizados

**Props**: Ninguna

**Uso**:
```jsx
import LanguageSwitcher from '@/app/components/LanguageSwitcher';

export default function Header() {
  return (
    <header>
      <LanguageSwitcher />
    </header>
  );
}
```

**Funcionalidad Detallada**:

1. **Detección de Idioma**:
   - Usa `usePathname()` de `next/navigation`
   - Detecta si la ruta empieza con `/es` o `/en`

2. **Generación de Ruta**:
   - Si está en `/es/*` → genera `/en/*`
   - Si está en `/en/*` → genera `/es/*`
   - Mantiene la estructura de la ruta

3. **Visualización**:
   - Muestra bandera ES si está en español
   - Muestra bandera US si está en inglés
   - Muestra texto "EN" o "ES" según corresponda

4. **Navegación**:
   - Usa `Link` de `next/link` para navegación optimizada
   - Mantiene el estado de la aplicación

**Dependencias**:
- `usePathname` de `next/navigation`
- `Link` de `next/link`
- `country-flag-icons/react/3x2` (ES, US)
- `useTheme` hook para adaptación al tema

---

## 🎣 Hooks Personalizados

### useTheme

Hook compartido para detectar y observar cambios en el tema. **Optimización clave**: Un solo `MutationObserver` compartido en lugar de múltiples observadores.

**Ubicación**: `src/hooks/useTheme.js`

**Retorna**:
```typescript
{
  isDark: boolean;    // Estado actual del tema (true = oscuro, false = claro)
  mounted: boolean;   // Si el componente está montado (evita SSR issues)
}
```

**Uso Básico**:
```jsx
import { useTheme } from '@/hooks/useTheme';

function MyComponent() {
  const { isDark, mounted } = useTheme();
  
  // SIEMPRE verificar mounted para evitar flash de contenido incorrecto
  if (!mounted) {
    return <div>Cargando...</div>;
  }
  
  return (
    <div style={{
      backgroundColor: isDark ? 'rgb(24, 24, 27)' : 'rgb(255, 255, 255)',
      color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'
    }}>
      Tema actual: {isDark ? 'Oscuro' : 'Claro'}
    </div>
  );
}
```

**Uso Avanzado con Condicionales**:
```jsx
import { useTheme } from '@/hooks/useTheme';
import Image from 'next/image';

function MyComponent() {
  const { isDark, mounted } = useTheme();
  
  if (!mounted) return null;
  
  return (
    <>
      {!isDark ? (
        <Image src="/images/light.png" alt="Light" />
      ) : (
        <Image src="/images/dark.png" alt="Dark" />
      )}
    </>
  );
}
```

**Implementación Interna**:
- Usa `MutationObserver` para detectar cambios en `document.documentElement.classList`
- Observa solo cambios en el atributo `class`
- Se desconecta automáticamente al desmontar el componente

**Ventajas Clave**:
- ✅ **Optimización**: Un solo `MutationObserver` compartido (antes había 3+)
- ✅ **Evita duplicación**: Todos los componentes usan el mismo hook
- ✅ **SSR Safe**: Manejo correcto de hidratación con estado `mounted`
- ✅ **Actualización en tiempo real**: Detecta cambios inmediatamente
- ✅ **Performance**: Reduce overhead de múltiples observadores

**Componentes que lo usan**:
- `Navbar.jsx`
- `LanguageSwitcher.jsx`
- `page.js` (HomePage)

**Nota importante**: El script en `layout.js` aplica el tema ANTES del render, pero `useTheme` detecta cambios posteriores cuando el usuario cambia el tema manualmente.

---

## 🎨 Estilos y Temas

### Sistema de Colores

El proyecto usa un sistema de colores consistente basado en la paleta Zinc de Tailwind.

**Modo Claro**:
- Fondo principal: `rgb(255, 255, 255)` - Blanco puro
- Fondo secundario: `rgb(244, 244, 245)` - Zinc 100
- Texto principal: `rgb(0, 0, 0)` - Negro
- Texto secundario: `rgb(0, 0, 0)` - Negro (mismo que principal)
- Borde: `rgb(228, 228, 231)` - Zinc 200
- Hover fondo: `rgb(228, 228, 231)` - Zinc 200
- Hover texto: `rgb(0, 0, 0)` - Negro

**Modo Oscuro**:
- Fondo principal: `rgb(24, 24, 27)` - Zinc 900
- Fondo secundario: `rgb(39, 39, 42)` - Zinc 800
- Texto principal: `rgb(255, 255, 255)` - Blanco
- Texto secundario: `rgb(209, 213, 219)` - Zinc 300
- Borde: `rgb(39, 39, 42)` - Zinc 800
- Hover fondo: `rgb(39, 39, 42)` - Zinc 800
- Hover texto: `rgb(255, 255, 255)` - Blanco

### Implementación de Estilos

**Enfoque Actual**: Estilos inline dinámicos (recomendado para cambios en tiempo real)

```jsx
// Ejemplo de uso con useTheme
const { isDark } = useTheme();

<div style={{
  backgroundColor: isDark ? 'rgb(24, 24, 27)' : 'rgb(255, 255, 255)',
  color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)',
  borderColor: isDark ? 'rgb(39, 39, 42)' : 'rgb(228, 228, 231)'
}}>
  Contenido
</div>
```

**Alternativa**: Clases Tailwind (si no necesitas cambios dinámicos)

```jsx
// Fondo adaptativo
className="bg-white dark:bg-zinc-900"

// Texto adaptativo
className="text-black dark:text-white"

// Borde adaptativo
className="border-zinc-200 dark:border-zinc-800"

// Transiciones
className="transition-colors duration-300"
```

**Recomendación**: 
- Usar **estilos inline** cuando el componente necesita cambiar dinámicamente (como Navbar)
- Usar **clases Tailwind** para elementos estáticos que no cambian frecuentemente

---

## 🔄 Flujo de Datos y Arquitectura

### Flujo del Sistema de Temas

```
1. Carga inicial de la página
    ↓
Script en layout.js se ejecuta (ANTES del render)
    ↓
Detecta preferencia: localStorage → sistema → default
    ↓
Aplica clase 'dark' en <html> si es necesario
    ↓
Componentes se renderizan con tema correcto
    ↓
useTheme hook se inicializa y detecta tema actual
    ↓
MutationObserver observa cambios futuros

---

2. Usuario cambia tema manualmente
    ↓
ThemeToggle actualiza localStorage
    ↓
Agrega/remueve clase 'dark' en <html>
    ↓
MutationObserver (en useTheme) detecta cambio
    ↓
useTheme actualiza estado isDark
    ↓
Todos los componentes que usan useTheme se re-renderizan
    ↓
Estilos inline se actualizan automáticamente
```

### Flujo de Internacionalización

```
Usuario visita /en o /es
    ↓
Middleware detecta locale desde URL
    ↓
Redirige si es necesario
    ↓
Layout carga mensajes desde locales/{locale}.json
    ↓
NextIntlClientProvider provee mensajes
    ↓
Componentes usan useTranslations() para acceder
    ↓
LanguageSwitcher cambia ruta → proceso se repite
```

### Arquitectura de Componentes

```
App Layout (layout.js)
    ↓
├── Script de tema (antes del render)
├── NextIntlClientProvider
    ↓
    ├── Navbar
    │   ├── useTheme hook
    │   ├── ThemeToggle
    │   └── LanguageSwitcher
    │
    └── Page Components
        └── useTheme hook (si necesario)
```

---

## 📝 Mejores Prácticas

### 1. Manejo de Tema

**✅ SIEMPRE verificar `mounted`**:
```jsx
const { isDark, mounted } = useTheme();
if (!mounted) return null; // Evitar flash de contenido incorrecto
```

**✅ Usar estilos inline para cambios dinámicos**:
```jsx
// ✅ CORRECTO - Se actualiza automáticamente
style={{ 
  backgroundColor: isDark ? 'rgb(24, 24, 27)' : 'rgb(255, 255, 255)',
  color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'
}}

// ⚠️ Solo si no cambia dinámicamente
className="bg-white dark:bg-zinc-900"
```

**✅ Mantener consistencia de colores**:
Usar los valores RGB definidos en la documentación para mantener consistencia visual.

### 2. Optimización

**✅ Usar hook compartido**:
```jsx
// ✅ CORRECTO - Usa el hook compartido
import { useTheme } from '@/hooks/useTheme';
const { isDark } = useTheme();

// ❌ INCORRECTO - Crea nuevo MutationObserver
const [isDark, setIsDark] = useState(false);
useEffect(() => {
  const observer = new MutationObserver(...);
  // Duplica código y recursos
}, []);
```

**✅ Memoizar componentes pesados**:
```jsx
import { memo } from 'react';

export default memo(function HeavyComponent({ data }) {
  // Componente que no necesita re-renderizar frecuentemente
});
```

### 3. Internacionalización

**✅ Usar useTranslations correctamente**:
```jsx
// ✅ CORRECTO - Sin namespace si las claves están en la raíz
const t = useTranslations();
<h1>{t('introduction')}</h1>

// ✅ CORRECTO - Con namespace si están agrupadas
const t = useTranslations('hero');
<h1>{t('title')}</h1>
```

**✅ Estructura de traducciones**:
```json
// ✅ CORRECTO - Estructura plana o anidada consistente
{
  "introduction": "Hello",
  "hero": {
    "title": "Welcome",
    "description": "Description"
  }
}
```

### 4. Componentes

**✅ Separar lógica de presentación**:
```jsx
// ✅ CORRECTO - Hook separado
const { isDark } = useTheme();
const data = useData();

return <PresentationalComponent isDark={isDark} data={data} />;
```

**✅ Props tipadas (si usas TypeScript)**:
```typescript
interface ComponentProps {
  title: string;
  isDark?: boolean;
}

export default function Component({ title, isDark = false }: ComponentProps) {
  // ...
}
```

### 5. Performance

**✅ Lazy loading de imágenes**:
```jsx
import Image from 'next/image';

<Image 
  src="/images/photo.jpg"
  width={500}
  height={500}
  priority // Solo para imágenes above-the-fold
  loading="lazy" // Por defecto para otras
/>
```

**✅ Code splitting**:
```jsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>
});
```

---

## 🐛 Troubleshooting

### El tema no cambia

**Síntomas**: El tema no cambia cuando haces clic en ThemeToggle

**Soluciones**:
1. ✅ Verificar que `useTheme` esté siendo usado en el componente
2. ✅ Comprobar que el script en `layout.js` se ejecute correctamente
3. ✅ Revisar consola del navegador por errores de JavaScript
4. ✅ Verificar que `localStorage` esté disponible (no en modo incógnito restringido)
5. ✅ Limpiar `localStorage` y recargar: `localStorage.clear()`

**Debug**:
```javascript
// En consola del navegador
console.log(document.documentElement.classList.contains('dark'));
console.log(localStorage.getItem('theme'));
```

### Flash de contenido incorrecto (FOUC)

**Síntomas**: Se ve contenido en modo claro antes de cambiar a oscuro

**Soluciones**:
1. ✅ **SIEMPRE** usar `mounted` check:
```jsx
const { isDark, mounted } = useTheme();
if (!mounted) return null; // o un placeholder
```

2. ✅ Verificar que el script del layout se ejecute antes del render
3. ✅ Usar `suppressHydrationWarning` en `<html>` tag
4. ✅ Asegurar que el script esté en `<head>` no en `<body>`

### Estilos no se aplican

**Síntomas**: Los estilos no cambian cuando cambia el tema

**Soluciones**:
1. ✅ Verificar que Tailwind tenga `darkMode: 'class'` en `tailwind.config.js`
2. ✅ Comprobar que las clases `dark:` estén correctas
3. ✅ **Usar estilos inline** si las clases Tailwind no funcionan (recomendado)
4. ✅ Verificar que `isDark` esté actualizándose correctamente

**Debug**:
```javascript
// Verificar clase dark
console.log(document.documentElement.className);

// Verificar estado del hook
const { isDark } = useTheme();
console.log('isDark:', isDark);
```

### Sidebar no se cierra

**Síntomas**: La sidebar móvil no se cierra al hacer clic fuera

**Soluciones**:
1. ✅ Verificar que el overlay tenga `onClick={() => setMenuOpen(false)}`
2. ✅ Comprobar z-index correcto (overlay: z-40, sidebar: z-50)
3. ✅ Asegurar que el overlay esté renderizado cuando `menuOpen` es true

### Traducciones no cargan

**Síntomas**: Se muestran claves en lugar de textos traducidos

**Soluciones**:
1. ✅ Verificar que los archivos JSON estén en `src/locales/`
2. ✅ Comprobar que el locale esté en `middleware.js`
3. ✅ Revisar la configuración en `i18n/request.js`
4. ✅ Verificar que las claves en JSON coincidan con las usadas en código
5. ✅ Limpiar caché del navegador

**Debug**:
```javascript
// Verificar mensajes cargados
const t = useTranslations();
console.log(t('introduction')); // Debe mostrar texto, no la clave
```

### Errores de build

**Síntomas**: El build falla con errores de TypeScript o ESLint

**Soluciones**:
1. ✅ Ejecutar `npm run lint` para ver errores específicos
2. ✅ Limpiar `.next` y `node_modules`: 
   ```bash
   rm -rf .next node_modules
   npm install
   ```
3. ✅ Verificar que todas las importaciones sean correctas
4. ✅ Comprobar que los tipos de TypeScript sean correctos (si aplica)

