# Documentación del Proyecto

Índice completo de la documentación técnica del proyecto Portafolio V3.

---

## 📑 Documentos Disponibles

### [COMPONENTS.md](./COMPONENTS.md)
Documentación detallada de todos los componentes y hooks del proyecto.

**Contenido**:
- Componentes disponibles (Navbar, ThemeToggle, LanguageSwitcher)
- Hooks personalizados (useTheme)
- Estilos y temas
- Flujos de datos
- Mejores prácticas
- Troubleshooting

**Útil para**: Desarrolladores que trabajan con componentes específicos

---

### [ARCHITECTURE.md](./ARCHITECTURE.md)
Arquitectura técnica, decisiones de diseño y estándares del proyecto.

**Contenido**:
- Stack tecnológico completo
- Estructura de directorios
- Flujos principales (carga, tema, i18n)
- Decisiones de diseño y razones
- Métricas de calidad
- Roadmap de mejoras

**Útil para**: Entender la arquitectura general y tomar decisiones técnicas

---

## 🚀 Inicio Rápido

### Para Nuevos Desarrolladores

1. **Lee el README principal**: `../README.md`
2. **Revisa la arquitectura**: [ARCHITECTURE.md](./ARCHITECTURE.md)
3. **Estudia los componentes**: [COMPONENTS.md](./COMPONENTS.md)

### Para Agregar Nuevas Funcionalidades

1. **Revisa la arquitectura**: [ARCHITECTURE.md](./ARCHITECTURE.md#-estructura-de-directorios)
2. **Consulta mejores prácticas**: [COMPONENTS.md](./COMPONENTS.md#-mejores-prácticas)
3. **Sigue los estándares**: [ARCHITECTURE.md](./ARCHITECTURE.md#-convenciones-de-código)

### Para Resolver Problemas

1. **Consulta Troubleshooting**: [COMPONENTS.md](./COMPONENTS.md#-troubleshooting)
2. **Revisa flujos de datos**: [COMPONENTS.md](./COMPONENTS.md#-flujo-de-datos-y-arquitectura)
3. **Verifica configuración**: [ARCHITECTURE.md](./ARCHITECTURE.md#-decisiones-de-diseño)

---

## 📋 Guías por Tarea

### Agregar un Nuevo Componente

1. Crear archivo en `src/app/components/`
2. Usar `useTheme` si necesita tema
3. Agregar documentación en [COMPONENTS.md](./COMPONENTS.md)
4. Seguir convenciones de código

### Agregar una Nueva Página

1. Crear en `src/app/[locale]/nombre-pagina/page.js`
2. Agregar traducciones en `src/locales/`
3. Agregar enlace en Navbar si es necesario
4. Documentar en README principal

### Agregar un Nuevo Idioma

1. Agregar locale en `src/middleware.js`
2. Crear archivo `src/locales/{locale}.json`
3. Actualizar `src/i18n/request.js`
4. Agregar bandera en LanguageSwitcher

### Modificar el Sistema de Temas

1. Revisar [ARCHITECTURE.md](./ARCHITECTURE.md#1-sistema-de-temas)
2. Modificar `src/hooks/useTheme.js` si es necesario
3. Actualizar componentes que usan tema
4. Actualizar documentación

---

## 🔍 Búsqueda Rápida

### Por Tema

- **Componentes**: [COMPONENTS.md](./COMPONENTS.md#-componentes-disponibles)
- **Hooks**: [COMPONENTS.md](./COMPONENTS.md#-hooks-personalizados)
- **Estilos**: [COMPONENTS.md](./COMPONENTS.md#-estilos-y-temas)
- **Arquitectura**: [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Troubleshooting**: [COMPONENTS.md](./COMPONENTS.md#-troubleshooting)

### Por Componente

- **Navbar**: [COMPONENTS.md](./COMPONENTS.md#navbar)
- **ThemeToggle**: [COMPONENTS.md](./COMPONENTS.md#themetoggle)
- **LanguageSwitcher**: [COMPONENTS.md](./COMPONENTS.md#languageswitcher)
- **useTheme**: [COMPONENTS.md](./COMPONENTS.md#usetheme)

---

## 📝 Mantenimiento de Documentación

### Cuándo Actualizar

- ✅ Al agregar nuevos componentes
- ✅ Al cambiar la arquitectura
- ✅ Al modificar hooks compartidos
- ✅ Al agregar nuevas funcionalidades
- ✅ Al resolver problemas comunes

### Cómo Actualizar

1. Modificar el documento correspondiente
2. Actualizar fecha de "Última actualización"
3. Mantener formato consistente
4. Agregar ejemplos de código cuando sea necesario

---

**Última actualización**: 2025  
**Mantenido por**: Equipo de desarrollo

