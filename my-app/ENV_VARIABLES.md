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
NEXT_PUBLIC_CONTACT_EMAIL=daniel.bonilla070704@gmail.com
NEXT_PUBLIC_CONTACT_PHONE=+573006417651
NEXT_PUBLIC_WHATSAPP_NUMBER=573006417651
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/daniel-bonilla-a0b98831b/
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/daniel-bonilla070704/30min
NEXT_PUBLIC_FORM_ACCESS_KEY=tu_access_key_de_web3forms
NEXT_PUBLIC_GITHUB_URL=https://github.com/tu-usuario
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/tu-perfil  # Opcional
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/tu-perfil  # Opcional
```

**Formulario de contacto:** usa [Web3Forms](https://web3forms.com). Registra tu email y coloca el Access Key en `NEXT_PUBLIC_FORM_ACCESS_KEY`.

**Calendly:** crea un evento en [Calendly](https://calendly.com) y usa su URL en `NEXT_PUBLIC_CALENDLY_URL`.

**WhatsApp:** número en formato internacional sin `+` (ej. `573006417651` para Colombia).

### SEO y Analytics
```env
NEXT_PUBLIC_SITE_URL=https://dev-4daniel.vercel.app  # Tu dominio de producción
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX  # Tu ID de Google Analytics
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=tu-codigo-de-verificacion  # Código de verificación de Google Search Console (opcional)
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
