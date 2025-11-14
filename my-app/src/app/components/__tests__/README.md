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

## Notas importantes

- Los tests usan mocks para `next-intl`, `next/navigation`, y los componentes hijos
- Los tests manejan tanto el estado `mounted: true` como `mounted: false`
- Los tests verifican tanto la versión desktop como móvil del componente
- Algunos tests son condicionales para manejar diferentes estados del componente

