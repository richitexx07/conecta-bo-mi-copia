# CONECTA - App Web Móvil

Aplicación PWA (Progressive Web App) mobile-first para conectar trabajadores de "manos medias" de Paraguay con personas que necesitan sus servicios.

## 🚀 Características

- **Mobile First**: Diseñada específicamente para dispositivos móviles
- **PWA**: Instalable como app nativa
- **Geolocalización**: Encuentra profesionales cercanos automáticamente
- **Perfiles Verificados**: Sistema de verificación con cédula de identidad
- **IA Asistente**: "Secretaria CONECTA" para ayudar a usuarios
- **Marketplace**: Herramientas, insumos y equipos para profesionales
- **Cursos y Capacitaciones**: Alianzas con instituciones gubernamentales

## 🛠️ Tecnologías

- **Next.js 14**: Framework React con App Router
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Estilos utility-first
- **PWA**: next-pwa para funcionalidad offline
- **Lucide React**: Íconos modernos

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar producción
npm start
```

## 📱 Estructura del Proyecto

```
conecta/
├── app/                    # Páginas y rutas (App Router)
│   ├── page.tsx           # Home
│   ├── login/             # Login
│   ├── register/          # Registro
│   ├── select-role/       # Selección de rol
│   ├── professional/      # Perfiles profesionales
│   ├── marketplace/       # Marketplace
│   └── courses/           # Cursos y capacitaciones
├── components/            # Componentes reutilizables
│   ├── Logo.tsx           # Logo CONECTA
│   ├── Header.tsx         # Header de la app
│   ├── UserProfile.tsx    # Perfil de usuario
│   ├── SearchBar.tsx      # Buscador
│   ├── ServiceCategory.tsx # Categorías de servicios
│   ├── ProfessionalCard.tsx # Tarjeta de profesional
│   └── AIAssistant.tsx    # IA Secretaria CONECTA
├── data/                  # Datos estáticos
│   └── professions.ts     # Lista de profesiones
└── public/                # Archivos estáticos
    └── manifest.json      # Manifest PWA
```

## 🎨 Identidad Visual

- **Color Principal**: Azul (#2563EB)
- **Estilo**: Minimalista, botones grandes, tipografía legible
- **Logo**: Mochila azul con íconos internos

## 📋 Funcionalidades Principales

### Registro y Login
- Registro ultra simple en 3 pasos
- Login con email, Facebook o Instagram
- Verificación con cédula de identidad
- Solicitud automática de GPS

### Home
- Perfil del usuario visible
- Buscador principal
- Categorías de servicios profesionales
- Profesionales cercanos (GPS)
- Profesionales destacados
- Marketplace
- Sponsors/Auspiciantes
- Cursos y capacitaciones

### Perfil Profesional
- Foto grande de perfil
- Información de verificación
- Horario de atención
- Servicios ofrecidos con precios
- Galería de trabajos (fotos/videos)
- Botones de acción: Contactar, Pagar, Ver trabajos

### IA Secretaria CONECTA
- Asistente virtual flotante
- Ayuda a clientes y profesionales
- Sugerencias de precios y servicios
- Recomendaciones personalizadas

## 🌍 Profesiones Disponibles

- Carpintero
- Plomería
- Electricista
- Herrero
- Mecánico
- Peluquero
- Manicurista
- Maquilladora
- Modista
- Jardinero
- Panadero
- Guardia de seguridad
- Paseador de animales
- Empleada doméstica
- Lavaderos
- Ferretería
- Albañilería
- Limpieza de baldíos
- Limpieza de piscinas
- Gomería
- Chofer

## 📱 PWA

La app está configurada como PWA y puede instalarse en dispositivos móviles. El manifest.json define:
- Nombre: CONECTA
- Modo: standalone (pantalla completa)
- Iconos: 192x192 y 512x512
- Tema: Azul (#2563EB)

## 🔒 Seguridad

- Validación de cédula de identidad
- Verificación de perfiles
- Geolocalización opcional
- Datos protegidos

## 📈 Monetización

- Publicidad de sponsors
- Auspicios exclusivos
- Sorteos y premios
- Marketplace con comisiones

## 🤝 Alianzas Institucionales

- Ministerio de Industria y Trabajo
- SNPP
- Asociación Nacional Republicana
- Banco Nacional de Fomento

## 📄 Licencia

Este proyecto es 100% gratuito para usuarios.

---

**CONECTA** - Conectando trabajadores de manos medias en Paraguay 🇵🇾

