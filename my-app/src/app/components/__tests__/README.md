# Tests para Componentes

Este directorio contiene los tests para los componentes del proyecto.

## Tests Implementados

### ThemeToggle (`ThemeToggle.test.jsx`)

Tests completos para el componente ThemeToggle que cubren:

✅ **Renderizado básico**
- No renderiza antes de montar
- Renderizado del botón después del mount
- Renderizado del icono Moon en tema claro
- Renderizado del icono Sun en tema oscuro

✅ **Toggle del tema**
- Cambio de claro a oscuro al hacer clic
- Cambio de oscuro a claro al hacer clic
- Múltiples toggles funcionando correctamente

✅ **Persistencia en localStorage**
- Guardado del tema oscuro en localStorage
- Guardado del tema claro en localStorage
- Lectura del tema desde localStorage al montar
- Uso de preferencia del sistema cuando no hay localStorage

✅ **Detección de preferencia del sistema**
- Detección de preferencia oscura del sistema
- Detección de preferencia clara del sistema

✅ **Estilos adaptativos**
- Estilos de tema claro aplicados correctamente
- Estilos de tema oscuro aplicados correctamente
- Actualización de estilos al cambiar el tema

✅ **Hover effects**
- Cambio de color de fondo en hover (modo claro)
- Cambio de color de fondo en hover (modo oscuro)

✅ **Escucha de cambios del sistema**
- Escucha de cambios del sistema cuando no hay localStorage
- No escucha cambios cuando hay tema guardado en localStorage

✅ **Limpieza de recursos**
- Remoción de event listeners al desmontar

✅ **Casos edge**
- Manejo de valores inválidos en localStorage
- Default a tema claro cuando no hay preferencia disponible

**Total**: 23 tests, todos pasando ✅

### LanguageSwitcher (`LanguageSwitcher.test.jsx`)

Tests completos para el componente LanguageSwitcher que cubren:

✅ **Renderizado básico**
- Renderizado del enlace de cambio de idioma
- Renderizado del texto indicando el idioma objetivo
- Renderizado de bandera US cuando el idioma actual es inglés
- Renderizado de bandera ES cuando el idioma actual es español

✅ **Detección del idioma actual**
- Detección de inglés desde pathname que empieza con /en
- Detección de español desde pathname que empieza con /es
- Detección desde rutas anidadas en español
- Detección desde rutas anidadas en inglés

✅ **Generación del nuevo path**
- Generación de path español cuando el actual es inglés
- Generación de path inglés cuando el actual es español
- Preservación de segmentos de path al cambiar de inglés a español
- Preservación de segmentos de path al cambiar de español a inglés
- Manejo correcto de path raíz
- Manejo correcto de path raíz en español

✅ **Title attribute**
- Muestra "Cambiar a Español" cuando el idioma actual es inglés
- Muestra "Switch to English" cuando el idioma actual es español

✅ **Estilos adaptativos**
- Estilos de tema claro cuando isDark es false
- Estilos de tema oscuro cuando isDark es true
- Actualización de estilos cuando cambia el tema

✅ **Hover effects**
- Cambio de color de fondo en hover (modo claro)
- Cambio de color de fondo en hover (modo oscuro)

✅ **Clases CSS**
- Clases CSS correctas aplicadas

✅ **Bandera y texto**
- Muestra bandera ES y texto EN cuando está en español
- Muestra bandera US y texto ES cuando está en inglés
- Pasa className a los componentes de bandera

✅ **Casos edge**
- Manejo de pathname sin prefijo de locale
- Manejo de rutas anidadas complejas
- Funciona correctamente cuando useTheme retorna mounted false

✅ **Integración con useTheme**
- Llama al hook useTheme
- Usa isDark de useTheme para estilos

✅ **Integración con usePathname**
- Llama al hook usePathname
- Reacciona a cambios en pathname

**Total**: 33 tests, todos pasando ✅

### Navbar (`Navbar.test.jsx`)

Tests completos para el componente Navbar que cubren:

✅ **Renderizado básico**
- Renderizado del logo/título
- Renderizado de enlaces de navegación desktop
- Renderizado de ThemeToggle y LanguageSwitcher
- Renderizado del botón de menú móvil

✅ **Estado cuando no está montado**
- Renderizado simplificado cuando `mounted` es `false`

✅ **Sidebar móvil**
- Apertura del sidebar al hacer clic en el botón de menú
- Cierre del sidebar al hacer clic en el botón cerrar
- Cierre del sidebar al hacer clic en el overlay
- Renderizado de enlaces en el sidebar
- Renderizado de controles en el sidebar

✅ **Scroll a secciones**
- Scroll a hero cuando se hace clic en el logo
- Scroll a projects cuando se hace clic en el botón
- Scroll a about cuando se hace clic en el botón
- Scroll a contact cuando se hace clic en el botón
- Cierre del sidebar después de hacer scroll en móvil
- Manejo cuando el elemento no existe

✅ **Adaptación al tema**
- Estilos de tema claro cuando `isDark` es `false`
- Estilos de tema oscuro cuando `isDark` es `true`

✅ **Enlaces de navegación**
- Renderizado del enlace Blog con href correcto
- Renderizado del enlace Blog en sidebar con href correcto

✅ **Traducciones**
- Uso correcto de traducciones de next-intl

**Total**: 21 tests, todos pasando ✅

### ProjectCard (`ProjectCard.test.jsx`)

Tests completos para el componente ProjectCard que cubren:

✅ **Renderizado básico**
- Renderizado del componente con información básica
- Manejo de proyecto null
- Renderizado con tema oscuro/claro

✅ **Enlaces y botones**
- Enlace de homepage si existe
- Botón de GitHub para proyectos no personalizados
- Botón de enlace externo para proyectos personalizados
- Manejo cuando no hay enlaces

✅ **Interactividad**
- onClick cuando se hace clic en la tarjeta
- onClick con teclado (Enter/Espacio)
- stopPropagation en enlaces internos
- aria-label y tabIndex para accesibilidad

✅ **Topics/Tags**
- Mostrar primeros 4 topics
- Contador de topics adicionales
- Manejo cuando no hay topics

✅ **Formato de fechas**
- Formato correcto en español/inglés
- Manejo cuando no hay fecha

✅ **Traducciones**
- Uso de getProjectTitle y getProjectDescription
- Locale correcto para traducciones

✅ **Estilos y clases CSS**
- Clases CSS correctas
- Estilos dinámicos según tema

✅ **Casos edge**
- Proyecto sin descripción/lenguaje/stats

**Total**: ~38 tests ✅

### ProjectModal (`ProjectModal.test.jsx`)

Tests completos para el componente ProjectModal que cubren:

✅ **Renderizado básico**
- No renderiza si project es null
- Renderizado con información básica
- Bloqueo/restauración de scroll del body

✅ **Cerrar modal**
- Cerrar con botón X
- Cerrar con clic en overlay
- No cerrar con clic en contenido
- Cerrar con tecla ESC
- No cerrar con otras teclas

✅ **Estadísticas del proyecto**
- Mostrar stars, forks, watchers, issues
- Labels traducidos en ES/EN
- Ocultar watchers/issues si son 0

✅ **Topics/Tecnologías**
- Mostrar todos los topics
- Título traducido
- Manejo cuando no hay topics

✅ **Información del proyecto**
- Fechas (creado, actualizado, push)
- Licencia, rama principal, tamaño
- Formato de tamaño (KB/MB)

✅ **Información adicional personalizada**
- Mostrar información adicional si existe
- Renderizar contenido HTML
- Manejar múltiples bloques de contenido

✅ **Enlaces y botones**
- Botón de demo si existe homepage
- Botón de GitHub para proyectos no personalizados
- Botón de proyecto para proyectos personalizados

✅ **Temas y estilos**
- Estilos de tema oscuro/claro

✅ **Traducciones**
- Uso de funciones de traducción
- Locale correcto

✅ **Casos edge**
- Proyecto sin descripción/lenguaje/fechas

**Total**: ~48 tests ✅

### GoogleAnalytics (`GoogleAnalytics.test.jsx`)

Tests completos para el componente GoogleAnalytics que cubren:

✅ **Renderizado condicional**
- No renderiza sin NEXT_PUBLIC_GA_MEASUREMENT_ID
- Renderiza scripts cuando está configurado

✅ **Tracking de page views**
- Trackea page views cuando cambia pathname
- Usa el GA ID correcto

✅ **UTM Parameters**
- Renderiza con UTM parameters en searchParams
- Intenta leer de sessionStorage cuando no hay en URL
- Maneja múltiples UTM parameters
- Reacciona a cambios en searchParams

✅ **Debug mode**
- Activa debug_mode en desarrollo
- No activa en producción

✅ **Manejo de errores**
- Maneja errores al parsear sessionStorage
- Maneja cuando gtag no está disponible
- Maneja cuando window no está definido

✅ **Scripts de Next.js**
- Usa strategy "afterInteractive"
- Carga script con ID correcto

**Total**: ~24 tests ✅

### FadeinSection (`FadeinSection.test.jsx`)

Tests completos para el componente FadeinSection que cubren:

✅ **Renderizado básico**
- Renderiza con children
- Renderiza múltiples children
- Renderiza contenido complejo

✅ **Props de framer-motion**
- Renderiza con props correctas
- Mantiene estructura del DOM

✅ **Casos edge**
- Maneja children vacío/undefined
- Renderiza con arrays de children

✅ **Integración**
- Funciona con otros componentes
- Mantiene jerarquía correcta

**Total**: ~10 tests ✅

### ScrollSection (`ScrollSection.test.jsx`)

Tests completos para el componente ScrollSection que cubren:

✅ **Renderizado básico**
- Renderiza con children
- Renderiza múltiples children
- Renderiza contenido complejo

✅ **Props por defecto**
- Usa valores por defecto para from y to
- Usa className vacío por defecto

✅ **Props personalizadas**
- Usa from y to personalizados
- Aplica className personalizada
- Combina className con clases por defecto

✅ **Hooks de framer-motion**
- Llama useScroll con configuración correcta
- Llama useTransform con valores correctos
- Renderiza motion.div correctamente

✅ **Estructura del DOM**
- Renderiza section como contenedor
- Renderiza motion.div dentro del section
- Mantiene jerarquía correcta

✅ **Casos edge**
- Maneja children vacío/undefined
- Maneja valores numéricos como strings
- Maneja className vacío

✅ **Integración**
- Funciona con otros componentes
- Funciona con múltiples instancias

**Total**: ~28 tests ✅

## Ejecutar los tests

```bash
# Ejecutar todos los tests
npm test

# Ejecutar solo los tests de Navbar
npm test -- Navbar.test.jsx

# Ejecutar tests en modo watch
npm test -- --watch

# Ejecutar tests con coverage
npm test -- --coverage
```

## Resumen de Cobertura

| Componente | Tests | Estado |
|------------|-------|--------|
| ThemeToggle | 23 | ✅ |
| LanguageSwitcher | 33 | ✅ |
| Navbar | 21 | ✅ |
| ProjectCard | ~38 | ✅ |
| ProjectModal | ~48 | ✅ |
| GoogleAnalytics | ~24 | ✅ |
| FadeinSection | ~10 | ✅ |
| ScrollSection | ~28 | ✅ |
| **Total** | **~225** | ✅ |

**Estado actual**: ✅ **Todos los tests pasando (201/201)**

## Notas importantes

- Los tests usan mocks para `next-intl`, `next/navigation`, `framer-motion`, y los componentes hijos
- Los tests manejan tanto el estado `mounted: true` como `mounted: false`
- Los tests verifican tanto la versión desktop como móvil del componente
- Algunos tests son condicionales para manejar diferentes estados del componente
- Los tests de GoogleAnalytics simplifican el mockeo de `window.location` debido a limitaciones de jsdom
- Los tests de componentes con framer-motion verifican el comportamiento sin depender de detalles internos de la librería

