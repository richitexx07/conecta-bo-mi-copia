# Guía de Instalación - CONECTA

## Requisitos Previos

- Node.js 18.x o superior
- npm o yarn
- Git (opcional)

## Pasos de Instalación

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Ejecutar en Modo Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### 3. Construir para Producción

```bash
npm run build
```

### 4. Iniciar en Producción

```bash
npm start
```

## Configuración PWA

La aplicación está configurada como PWA (Progressive Web App). Para que funcione completamente:

1. **Iconos**: Necesitas crear los iconos en `public/`:
   - `icon-192x192.png`
   - `icon-512x512.png`
   - `favicon.ico`

2. **Service Worker**: Se genera automáticamente con `next-pwa` al hacer build.

## Pruebas en Dispositivos Móviles

### Opción 1: Usar el servidor de desarrollo local

1. Ejecuta `npm run dev`
2. Encuentra tu IP local (ej: `192.168.1.100`)
3. Accede desde tu móvil a `http://192.168.1.100:3000`

### Opción 2: Usar herramientas de desarrollo

- Chrome DevTools: F12 > Toggle device toolbar
- Firefox Responsive Design Mode: Ctrl+Shift+M

## Despliegue

### Vercel (Recomendado)

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm i -g netlify-cli
netlify deploy
```

### Otras plataformas

Cualquier plataforma que soporte Next.js funcionará correctamente.

## Notas Importantes

- La app está configurada como **mobile-first**
- El PWA solo funciona en producción (no en desarrollo)
- Necesitas HTTPS para que funcione la geolocalización en producción
- Los permisos de GPS se solicitan automáticamente

## Solución de Problemas

### Error: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### PWA no funciona
- Asegúrate de estar en producción (`npm run build && npm start`)
- Verifica que los iconos existan en `public/`
- Revisa la consola del navegador para errores

### Geolocalización no funciona
- En desarrollo local, solo funciona con HTTPS
- En producción, debe estar en un dominio con HTTPS
- Verifica los permisos del navegador

