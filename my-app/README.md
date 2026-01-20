# Portafolio V3 - Daniel Bonilla Mosquera

Portafolio personal moderno desarrollado con Next.js 16+, React 19 y TypeScript. Incluye soporte multiidioma (ES/EN), modo oscuro/claro con detección automática, diseño responsive con sidebar móvil, y optimizaciones de rendimiento avanzadas.

## 🚀 Características Principales

- ✅ **Internacionalización (i18n)**: Soporte completo para Español e Inglés con `next-intl` v4
- ✅ **Modo Oscuro/Claro**: Detección automática de preferencia del sistema + toggle manual con persistencia
- ✅ **Diseño Responsive**: Navbar adaptativa con sidebar deslizable en móvil
- ✅ **Optimizado**: React Compiler habilitado, hooks compartidos (`useTheme`), código sin duplicación
- ✅ **TypeScript**: Configuración completa con soporte para JS/TS
- ✅ **Tailwind CSS 4**: Estilos modernos con dark mode basado en clase
- ✅ **Performance**: Un solo MutationObserver compartido, optimización de imágenes con `next/image`
- ✅ **SEO Ready**: Estructura preparada para optimización SEO

## 📋 Requisitos Previos

- Node.js 18+ 
- npm, yarn, pnpm o bun

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd Portafolio-V3/my-app
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Ejecutar en desarrollo**
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

## 📜 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo en `localhost:3000` |
| `npm run build` | Crea una build de producción optimizada |
| `npm run start` | Inicia el servidor de producción (requiere build previo) |
| `npm run lint` | Ejecuta ESLint para verificar errores de código |

## 🏗️ Estructura del Proyecto

```
my-app/
├── src/
│   ├── app/                    # App Router (Next.js 13+)
│   │   ├── [locale]/          # Rutas dinámicas por idioma
│   │   │   ├── layout.js      # Layout con configuración i18n
│   │   │   └── page.js        # Página principal
│   │   ├── components/        # Componentes reutilizables
│   │   │   ├── Navbar.jsx     # Barra de navegación principal
│   │   │   ├── ThemeToggle.jsx # Botón toggle de tema
│   │   │   └── LanguageSwitcher.jsx # Selector de idioma
│   │   └── globals.css        # Estilos globales
│   ├── hooks/                  # Custom hooks
│   │   └── useTheme.js        # Hook para detección de tema
│   ├── i18n/                   # Configuración internacionalización
│   │   └── request.js         # Configuración de next-intl
│   ├── locales/                # Archivos de traducción
│   │   ├── en.json            # Traducciones en inglés
│   │   └── es.json            # Traducciones en español
│   └── middleware.js          # Middleware de Next.js para i18n
├── public/                     # Assets estáticos
│   └── images/                # Imágenes del proyecto
├── next.config.mjs            # Configuración Next.js
├── tailwind.config.js         # Configuración Tailwind CSS
├── tsconfig.json              # Configuración TypeScript
└── package.json               # Dependencias del proyecto
```

## 🎨 Stack Tecnológico

### Core
- **Next.js** (latest) - Framework React con App Router
- **React** 19.2.0 - Biblioteca UI con React Compiler
- **TypeScript** - Tipado estático

### Internacionalización
- **next-intl** 4.5.3 - Internacionalización completa
- Idiomas soportados: Español (ES), Inglés (EN)

### Estilos
- **Tailwind CSS** 4 - Framework CSS utility-first
- **PostCSS** - Procesamiento de CSS
- **Dark Mode** - Implementado con clase `dark`

### UI/UX
- **lucide-react** - Iconos modernos
- **country-flag-icons** - Banderas para selector de idioma

## 🌐 Internacionalización

El proyecto utiliza `next-intl` para manejar múltiples idiomas. Las rutas están organizadas por locale:

- `/en` - Inglés (default)
- `/es` - Español

### Agregar un nuevo idioma

1. Agregar el locale en `src/middleware.js`:
```javascript
locales: ['en', 'es', 'fr'], // Agregar 'fr' para francés
```

2. Crear archivo de traducción en `src/locales/fr.json`

3. Actualizar `src/i18n/request.js` para incluir el nuevo locale

## 🎨 Modo Oscuro/Claro

El proyecto implementa un sistema completo de temas con detección automática y persistencia.

### Funcionamiento

1. **Script en Layout**: Se ejecuta antes del render para evitar flash de contenido incorrecto
2. **Detección automática**: Lee la preferencia del sistema (`prefers-color-scheme: dark`)
3. **Persistencia**: Guarda la preferencia en `localStorage` cuando el usuario cambia manualmente
4. **Prioridad**: `localStorage` > Preferencia del sistema > Modo claro (default)
5. **Hook compartido**: `useTheme` usa un solo `MutationObserver` para todos los componentes

### Arquitectura del Sistema de Temas

```
Script en layout.js (antes del render)
    ↓
Detecta preferencia (localStorage → sistema → default)
    ↓
Aplica clase 'dark' en <html>
    ↓
useTheme hook detecta cambios
    ↓
Componentes se actualizan automáticamente
```

### Uso del hook `useTheme`

**Ubicación**: `src/hooks/useTheme.js`

```javascript
import { useTheme } from '@/hooks/useTheme';

function MyComponent() {
  const { isDark, mounted } = useTheme();
  
  // Siempre verificar mounted para evitar flash de contenido
  if (!mounted) {
    return <div>Cargando...</div>;
  }
  
  return (
    <div style={{ 
      backgroundColor: isDark ? 'rgb(24, 24, 27)' : 'rgb(255, 255, 255)',
      color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'
    }}>
      {isDark ? 'Modo Oscuro' : 'Modo Claro'}
    </div>
  );
}
```

**Ventajas del hook compartido**:
- ✅ Un solo `MutationObserver` en lugar de múltiples (optimización)
- ✅ Evita duplicación de código
- ✅ Manejo correcto de SSR/hidratación
- ✅ Actualización en tiempo real de todos los componentes

## 📱 Componentes Principales

### Navbar (`src/app/components/Navbar.jsx`)
Barra de navegación responsive con:
- Menú desktop horizontal con enlaces
- Sidebar móvil deslizable desde la derecha
- Overlay oscuro cuando la sidebar está abierta
- Integración con `ThemeToggle` y `LanguageSwitcher`
- Estilos inline dinámicos basados en `useTheme`
- Cierre automático al hacer clic en enlaces o fuera

**Características técnicas**:
- Usa `useTheme` hook para detección de tema
- Estado `mounted` para evitar problemas de hidratación
- Animaciones suaves con `transition-transform`
- Z-index correcto para overlay y sidebar

### ThemeToggle (`src/app/components/ThemeToggle.jsx`)
Botón para alternar entre modo oscuro y claro con:
- Iconos dinámicos (Sol/Luna) de `lucide-react`
- Persistencia en `localStorage`
- Detección de preferencia del sistema (`prefers-color-scheme`)
- Escucha cambios del sistema si no hay preferencia guardada
- Estilos inline adaptativos

**Funcionalidad**:
1. Detecta tema inicial (localStorage → sistema → claro)
2. Permite toggle manual
3. Guarda preferencia en `localStorage`
4. Actualiza clase `dark` en `<html>`
5. Escucha cambios del sistema (solo si no hay preferencia guardada)

### LanguageSwitcher (`src/app/components/LanguageSwitcher.jsx`)
Selector de idioma con:
- Banderas visuales usando `country-flag-icons` (ES/US)
- Cambio dinámico de ruta manteniendo estructura
- Adaptación al tema actual con `useTheme`
- Navegación automática a `/en` o `/es`

**Funcionalidad**:
- Detecta idioma actual desde `pathname`
- Genera ruta alternativa (ES ↔ EN)
- Muestra bandera correspondiente
- Navega a nueva ruta con `next/link`

## 🔧 Configuración

### Variables de Entorno

Crear archivo `.env.local` (opcional):

```env
# Ejemplo de variables de entorno
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Tailwind CSS

La configuración de Tailwind está en `tailwind.config.js`. El proyecto usa:
- Modo oscuro basado en clase (`darkMode: 'class'`)
- Content paths configurados para `src/`

### TypeScript

Configuración en `tsconfig.json`:
- Modo no estricto (puede habilitarse gradualmente)
- JSX: `react-jsx`
- Module resolution: `node`

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conectar repositorio a Vercel
2. Configurar variables de entorno si es necesario
3. Deploy automático en cada push

### Build Manual

```bash
npm run build
npm run start
```

## 📝 Agregar Nuevas Páginas

1. Crear archivo en `src/app/[locale]/nombre-pagina/page.js`
2. Agregar traducciones en `src/locales/en.json` y `src/locales/es.json`
3. Agregar enlace en Navbar si es necesario

Ejemplo:
```javascript
// src/app/[locale]/about/page.js
'use client';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('about');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

## 🐛 Solución de Problemas

### El modo oscuro no funciona
- Verificar que `tailwind.config.js` tenga `darkMode: 'class'`
- Asegurarse de que el script en `layout.js` se ejecute correctamente

### Las traducciones no cargan
- Verificar que los archivos JSON estén en `src/locales/`
- Comprobar que el locale esté en `middleware.js`
- Revisar la configuración en `i18n/request.js`

### Errores de build
- Ejecutar `npm run lint` para verificar errores
- Limpiar `.next` y `node_modules`, luego reinstalar

## 📚 Documentación Adicional

El proyecto incluye documentación detallada en la carpeta `docs/`:

- **[COMPONENTS.md](./docs/COMPONENTS.md)**: Documentación completa de componentes y hooks
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)**: Arquitectura técnica y decisiones de diseño

### Guías Rápidas

- **Agregar un componente**: Ver [COMPONENTS.md](./docs/COMPONENTS.md#-componentes-disponibles)
- **Usar el hook useTheme**: Ver [COMPONENTS.md](./docs/COMPONENTS.md#usetheme)
- **Agregar traducciones**: Ver sección [Internacionalización](#-internacionalización)
- **Troubleshooting**: Ver [COMPONENTS.md](./docs/COMPONENTS.md#-troubleshooting)

## 🔗 Recursos Externos

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React 19 Documentation](https://react.dev/)

## 📊 Estado del Proyecto

### ✅ Completado

- ✅ Arquitectura base con Next.js App Router
- ✅ Sistema de internacionalización (ES/EN)
- ✅ Modo oscuro/claro con detección automática
- ✅ Navbar responsive con sidebar móvil
- ✅ Optimizaciones de rendimiento (hook compartido)
- ✅ Documentación completa


### 🚧 En Desarrollo

- ⏳ Páginas adicionales (About, Projects, Blog)
- ⏳ TypeScript strict mode

### 📋 Pendiente

- ⏳ CMS para blog
- ⏳ PWA avanzado (service worker, offline support)

## 📄 Licencia

Este proyecto es privado y personal.

## 👤 Autor

**Daniel Bonilla Mosquera**
- Junior Developer especializado en BIM architectures
- Experiencia con Autodesk API (Revit API, Forge/APS)
- Automatización de workflows en proyectos de construcción

---

**Versión**: 0.1.0  
**Última actualización**: 2025  
**Stack**: Next.js 16+ | React 19 | TypeScript | Tailwind CSS 4
