# Variables de Entorno - Guía Rápida

## 🔴 Críticas (Requeridas)

Ninguna variable es estrictamente requerida, pero algunas son altamente recomendadas.

## 🟡 Recomendadas (Para funcionalidad completa)

### GitHub Integration
```env
GITHUB_USERNAME=tu-usuario-github
GITHUB_TOKEN=ghp_tu_token_aqui  # Opcional pero recomendado para evitar rate limits
```

### Contacto
```env
NEXT_PUBLIC_CONTACT_EMAIL=tu-email@ejemplo.com
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/tu-perfil
NEXT_PUBLIC_GITHUB_URL=https://github.com/tu-usuario
```

### SEO y Analytics
```env
NEXT_PUBLIC_SITE_URL=https://dev-4daniel.vercel.app  # Tu dominio de producción
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX  # Tu ID de Google Analytics
```

## 📝 Configuración en Vercel

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega cada variable con su valor correspondiente
4. Selecciona los ambientes (Production, Preview, Development)
5. Redeploy el proyecto

## ✅ Verificación

Después de configurar las variables, el build mostrará advertencias si faltan variables recomendadas:

```
⚠️ Missing recommended environment variables: NEXT_PUBLIC_SITE_URL
```

Esto es normal si no has configurado todas las variables recomendadas.
