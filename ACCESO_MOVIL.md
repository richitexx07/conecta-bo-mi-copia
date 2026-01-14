# 📱 Acceso Móvil - Conecta-BO

## ✅ Código QR y Enlace Generados

### 🌐 **URL de Acceso:**
```
http://192.168.100.16:3000
```

### 📱 **Código QR:**
El código QR se encuentra en:
- `qr-code.png` (imagen PNG)
- `qr-code.svg` (imagen SVG)
- `public/qr-code.png` (accesible desde el navegador)

### 🎯 **Página de Acceso Rápido:**
Abre en tu navegador:
```
http://192.168.100.16:3000/qr-access.html
```

Esta página incluye:
- ✅ Código QR visible
- ✅ Enlace directo para copiar
- ✅ Instrucciones paso a paso
- ✅ Indicador de estado del servidor

---

## 📋 Instrucciones de Uso

### **Paso 1: Iniciar el Servidor**
El servidor ya está configurado para ser accesible desde la red local. Ejecuta:

```bash
npm run dev
```

El servidor se iniciará en `http://0.0.0.0:3000`, lo que permite acceso desde cualquier dispositivo en tu red local.

### **Paso 2: Conectar tu Celular**
1. Asegúrate de que tu celular esté conectado a la **misma red WiFi** que tu computadora
2. Abre la cámara de tu celular
3. Escanea el código QR que se muestra abajo
4. O copia y pega la URL: `http://192.168.100.16:3000`

### **Paso 3: Acceder a la Aplicación**
- El código QR te llevará directamente a la aplicación
- La URL también funciona si la escribes manualmente en el navegador

---

## 🔧 Solución de Problemas

### **No puedo acceder desde el celular:**

1. **Verifica el Firewall de Windows:**
   - Abre "Firewall de Windows Defender"
   - Permite Node.js a través del firewall
   - O desactiva temporalmente el firewall para probar

2. **Verifica la IP:**
   - Ejecuta `ipconfig` en PowerShell
   - Busca "IPv4 Address" en tu adaptador WiFi
   - Actualiza la URL si tu IP cambió

3. **Verifica que el servidor esté corriendo:**
   - Deberías ver: "Ready on http://0.0.0.0:3000"
   - Si no, ejecuta `npm run dev` nuevamente

4. **Verifica la red:**
   - Asegúrate de que ambos dispositivos estén en la misma red WiFi
   - Algunas redes públicas bloquean la comunicación entre dispositivos

---

## 📂 Archivos Generados

- ✅ `qr-code.png` - Código QR en formato PNG
- ✅ `qr-code.svg` - Código QR en formato SVG
- ✅ `public/qr-code.png` - QR accesible desde el navegador
- ✅ `public/qr-access.html` - Página de acceso rápido
- ✅ `generate-qr.js` - Script para regenerar el QR si cambia la IP

---

## 🔄 Regenerar el QR (si cambia tu IP)

Si tu IP local cambia, puedes regenerar el QR ejecutando:

```bash
node generate-qr.js
```

Asegúrate de actualizar la IP en `generate-qr.js` si es necesario.

---

## 🎉 ¡Listo!

Tu aplicación Conecta-BO está lista para ser probada en tu celular. Escanea el QR o abre la URL directamente.

**URL de la aplicación:** http://192.168.100.16:3000

**Página de acceso rápido:** http://192.168.100.16:3000/qr-access.html
