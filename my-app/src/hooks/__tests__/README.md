# Tests para `useTheme`

Este directorio contiene los tests para el hook `useTheme`.

## Ejecutar los tests

```bash
# Ejecutar todos los tests
npm test

# Ejecutar solo los tests de useTheme
npm test -- useTheme.test.js

# Ejecutar tests en modo watch (se ejecutan automáticamente al guardar)
npm test -- --watch

# Ejecutar tests con coverage (cobertura de código)
npm test -- --coverage
```

## Cobertura de tests

Los tests cubren:

✅ **Estado inicial**
- Detección correcta del tema inicial (claro/oscuro)

✅ **Después de montar**
- `mounted` se establece como `true`
- Detección correcta del tema claro
- Detección correcta del tema oscuro

✅ **Detección de cambios en tiempo real**
- Actualización cuando se agrega clase `dark`
- Actualización cuando se remueve clase `dark`
- Manejo de múltiples cambios

✅ **Limpieza de recursos**
- Desconexión del `MutationObserver` al desmontar

✅ **Casos edge**
- Manejo de escenarios sin `classList`
- Múltiples instancias del hook funcionando correctamente

## Estructura de los tests

Los tests están organizados en grupos (`describe`) que prueban diferentes aspectos del hook:

1. **Estado inicial**: Comportamiento antes y después del montaje
2. **Después de montar**: Funcionalidad básica del hook
3. **Detección de cambios**: Capacidad de detectar cambios en tiempo real
4. **Limpieza de recursos**: Manejo correcto de la limpieza
5. **Casos edge**: Escenarios especiales y límites

## Notas importantes

- Los tests usan `waitFor` para esperar actualizaciones asíncronas del hook
- El DOM se limpia antes de cada test para evitar interferencias
- Los tests verifican tanto el estado inicial como los cambios dinámicos

