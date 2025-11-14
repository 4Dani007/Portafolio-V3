# Arquitectura del Proyecto

Documentación técnica sobre la arquitectura, estándares y decisiones de diseño del proyecto.

**Última actualización**: 2025  
**Versión**: 0.1.0

---

## 🏗️ Arquitectura General

### Stack Tecnológico

```
Frontend Framework: Next.js 16+ (App Router)
UI Library: React 19.2.0
Language: JavaScript/TypeScript (modo no estricto)
Styling: Tailwind CSS 4
i18n: next-intl 4.5.3
Icons: lucide-react
Flags: country-flag-icons
```

### Patrón Arquitectónico

El proyecto sigue el patrón **App Router de Next.js** con:

- **Server Components por defecto**: Componentes renderizados en el servidor
- **Client Components cuando es necesario**: Marcados con `'use client'`
- **Rutas dinámicas**: `[locale]` para internacionalización
- **Layouts anidados**: Layout por locale con configuración i18n
- **Middleware**: Manejo de rutas y redirecciones

---

## 📁 Estructura de Directorios

```
my-app/
├── src/
│   ├── app/                    # App Router (Next.js 13+)
│   │   ├── [locale]/          # Rutas dinámicas por idioma
│   │   │   ├── layout.js      # Layout con i18n y script de tema
│   │   │   └── page.js        # Página principal (Home)
│   │   ├── components/         # Componentes reutilizables
│   │   │   ├── Navbar.jsx     # Barra de navegación principal
│   │   │   ├── ThemeToggle.jsx # Toggle de tema
│   │   │   └── LanguageSwitcher.jsx # Selector de idioma
│   │   └── globals.css         # Estilos globales
│   ├── hooks/                  # Custom hooks
│   │   └── useTheme.js         # Hook compartido para tema
│   ├── i18n/                   # Configuración internacionalización
│   │   └── request.js         # Configuración de next-intl
│   ├── locales/                # Archivos de traducción
│   │   ├── en.json            # Traducciones en inglés
│   │   └── es.json            # Traducciones en español
│   └── middleware.js          # Middleware de Next.js
├── public/                     # Assets estáticos
│   └── images/                 # Imágenes del proyecto
├── docs/                       # Documentación
│   ├── ARCHITECTURE.md        # Este archivo
│   └── COMPONENTS.md          # Documentación de componentes
├── next.config.mjs            # Configuración Next.js
├── tailwind.config.js         # Configuración Tailwind
├── tsconfig.json              # Configuración TypeScript
└── package.json               # Dependencias
```

---

## 🔄 Flujos Principales

### 1. Flujo de Carga Inicial

```
1. Usuario visita / o /en o /es
   ↓
2. Middleware intercepta la petición
   ↓
3. Detecta/establece locale desde URL
   ↓
4. Layout se renderiza (Server Component)
   ↓
5. Script en <head> se ejecuta (ANTES del render)
   - Detecta tema: localStorage → sistema → default
   - Aplica clase 'dark' si es necesario
   ↓
6. NextIntlClientProvider carga mensajes
   ↓
7. Componentes se renderizan con tema y traducciones correctas
   ↓
8. Client Components se hidratan
   ↓
9. useTheme hook se inicializa y observa cambios futuros
```

### 2. Flujo de Cambio de Tema

```
Usuario hace clic en ThemeToggle
   ↓
ThemeToggle.toggleTheme() ejecuta
   ↓
Actualiza localStorage.setItem('theme', 'dark'/'light')
   ↓
Agrega/remueve clase 'dark' en document.documentElement
   ↓
MutationObserver (en useTheme) detecta cambio
   ↓
useTheme actualiza estado isDark
   ↓
Todos los componentes que usan useTheme se re-renderizan
   ↓
Estilos inline se actualizan automáticamente
```

### 3. Flujo de Cambio de Idioma

```
Usuario hace clic en LanguageSwitcher
   ↓
LanguageSwitcher detecta idioma actual desde pathname
   ↓
Genera nueva ruta (/es → /en o viceversa)
   ↓
next/link navega a nueva ruta
   ↓
Middleware intercepta nueva ruta
   ↓
Layout se re-renderiza con nuevo locale
   ↓
Mensajes se cargan desde locales/{locale}.json
   ↓
Componentes muestran traducciones actualizadas
```

---

## 🎯 Decisiones de Diseño

### 1. Sistema de Temas

**Decisión**: Estilos inline dinámicos en lugar de clases Tailwind `dark:`

**Razón**:
- Cambios instantáneos sin depender de re-compilación CSS
- Mayor control sobre el momento exacto del cambio
- Evita problemas de especificidad CSS

**Implementación**:
- Script en layout para aplicación inicial
- Hook `useTheme` para detección de cambios
- Estilos inline basados en estado `isDark`

### 2. Hook Compartido `useTheme`

**Decisión**: Un solo hook compartido en lugar de múltiples implementaciones

**Razón**:
- Evita duplicación de código
- Un solo `MutationObserver` (optimización)
- Consistencia en toda la aplicación

**Beneficios**:
- Reducción de ~60 líneas de código duplicado
- Mejor rendimiento (menos observadores)
- Más fácil de mantener

### 3. Estructura de Rutas

**Decisión**: Rutas dinámicas `[locale]` en lugar de subdominios o query params

**Razón**:
- SEO friendly (URLs claras: `/es/about`, `/en/about`)
- Fácil de mantener
- Compatible con App Router de Next.js

### 4. Componentes Client vs Server

**Decisión**: Server Components por defecto, Client Components solo cuando necesario

**Razón**:
- Mejor rendimiento (menos JavaScript en el cliente)
- Mejor SEO (contenido renderizado en servidor)
- Menor bundle size

**Componentes Client**:
- `Navbar.jsx` - Necesita interactividad (sidebar, estado)
- `ThemeToggle.jsx` - Necesita eventos onClick
- `LanguageSwitcher.jsx` - Necesita usePathname hook
- `page.js` - Necesita useTheme para cambio de imagen

---

## 🔐 Seguridad y Mejores Prácticas

### 1. SSR/Hidratación

- ✅ Script de tema se ejecuta antes del render
- ✅ Estado `mounted` previene flash de contenido incorrecto
- ✅ `suppressHydrationWarning` en `<html>` para evitar warnings

### 2. Performance

- ✅ React Compiler habilitado
- ✅ Un solo MutationObserver compartido
- ✅ Imágenes optimizadas con `next/image`
- ✅ Lazy loading donde aplica

### 3. Accesibilidad

- ✅ Atributos `alt` en imágenes
- ✅ `title` en botones interactivos
- ✅ Navegación por teclado funcional
- ✅ Contraste adecuado en ambos temas

### 4. SEO

- ✅ Estructura semántica HTML
- ✅ Meta tags por locale (preparado)
- ✅ URLs amigables (`/es/about`, `/en/about`)
- ✅ Contenido renderizado en servidor

---

## 📊 Métricas de Calidad

### Código

- **Duplicación**: ✅ Eliminada (hook compartido)
- **Complejidad**: ✅ Baja (componentes simples)
- **Mantenibilidad**: ✅ Alta (estructura clara)
- **Testabilidad**: ⚠️ No implementado aún

### Performance

- **Bundle Size**: ✅ Optimizado (Server Components)
- **First Load**: ✅ Rápido (script de tema antes del render)
- **Re-renders**: ✅ Minimizados (hook compartido)
- **Observers**: ✅ Optimizado (1 en lugar de 3+)

### Arquitectura

- **Escalabilidad**: ✅ Buena (estructura preparada)
- **Modularidad**: ✅ Alta (componentes separados)
- **Reutilización**: ✅ Buena (hooks compartidos)

---

## 🚀 Roadmap de Mejoras

### Corto Plazo

1. ✅ Hook compartido `useTheme` - **Completado**
2. ⏳ Habilitar TypeScript strict mode gradualmente
3. ⏳ Agregar tests unitarios con Jest + React Testing Library
4. ⏳ Optimizar imágenes adicionales

### Mediano Plazo

1. ⏳ Implementar páginas adicionales (About, Projects, Blog)
2. ⏳ Agregar metadata dinámica para SEO
3. ⏳ Implementar sitemap.xml
4. ⏳ Agregar structured data (JSON-LD)

### Largo Plazo

1. ⏳ Implementar CMS headless para blog
2. ⏳ Agregar analytics
3. ⏳ Implementar PWA
4. ⏳ Agregar más idiomas

---

## 📚 Referencias y Estándares

### Estándares Seguidos

- **Next.js Best Practices**: App Router, Server Components, optimizaciones
- **React Best Practices**: Hooks, composición, performance
- **Web Standards**: HTML5 semántico, CSS moderno, JavaScript ES6+
- **Accessibility**: WCAG 2.1 Level AA (en progreso)

### Convenciones de Código

- **Nombres de archivos**: PascalCase para componentes (`Navbar.jsx`)
- **Nombres de hooks**: camelCase con prefijo `use` (`useTheme`)
- **Estructura de carpetas**: Agrupación por feature/type
- **Imports**: Ordenados (librerías → componentes → hooks → utils)

---

## 🔍 Análisis de Dependencias

### Dependencias Principales

| Paquete | Versión | Uso | Crítico |
|---------|---------|-----|---------|
| next | latest | Framework principal | ✅ Sí |
| react | 19.2.0 | UI library | ✅ Sí |
| next-intl | 4.5.3 | Internacionalización | ✅ Sí |
| tailwindcss | 4 | Estilos | ✅ Sí |
| lucide-react | 0.553.0 | Iconos | ⚠️ No |
| country-flag-icons | 1.5.21 | Banderas | ⚠️ No |

### Análisis de Seguridad

- ✅ Dependencias actualizadas
- ✅ Sin vulnerabilidades conocidas (verificar con `npm audit`)
- ✅ Uso de versiones estables

---

## 📝 Notas de Implementación

### Consideraciones Especiales

1. **Script de Tema**: Debe estar en `<head>` y ejecutarse antes del render
2. **useTheme Hook**: Debe usarse en todos los componentes que necesiten tema
3. **Mounted Check**: Siempre verificar `mounted` antes de renderizar contenido dependiente del tema
4. **Estilos Inline**: Preferidos sobre clases Tailwind para cambios dinámicos

### Limitaciones Conocidas

1. **TypeScript**: Modo no estricto (puede habilitarse gradualmente)
2. **Testing**: No implementado aún
3. **PWA**: No implementado
4. **Analytics**: No implementado

---

**Mantenido por**: Daniel Bonilla Mosquera  
**Última revisión**: 2025

