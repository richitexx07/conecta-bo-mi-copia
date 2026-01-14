import React from 'react'

interface LogoProps {
  className?: string
  size?: 'small' | 'medium' | 'large'
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'medium' }) => {
  const sizes = {
    small: { width: 96, height: 96 },
    medium: { width: 128, height: 128 },
    large: { width: 192, height: 192 },
  }

  const containerSizes = {
    small: 'w-24',
    medium: 'w-32',
    large: 'w-48',
  }

  // Colores de la bandera boliviana: rojo, amarillo, verde
  const bolivianRed = '#D52B1E' // Rojo boliviano
  const bolivianYellow = '#FCD116' // Amarillo boliviano
  const bolivianGreen = '#007A3D' // Verde boliviano

  return (
    <div className={`${containerSizes[size]} ${className} flex flex-col items-center`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* Definir patrones inspirados en Wiphala */}
        <defs>
          {/* Patrón para franja roja */}
          <pattern id="redPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="8" fill={bolivianRed} opacity="0.3"/>
            <circle cx="10" cy="10" r="5" fill="#E63946" opacity="0.4"/>
            <path d="M 10 2 L 10 18 M 2 10 L 18 10" stroke="#FF4444" strokeWidth="0.5" opacity="0.5"/>
            <circle cx="10" cy="10" r="2" fill={bolivianRed} opacity="0.6"/>
          </pattern>
          
          {/* Patrón para franja amarilla */}
          <pattern id="yellowPattern" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="9" cy="9" r="7" fill={bolivianYellow} opacity="0.3"/>
            <circle cx="9" cy="9" r="4" fill="#FFD700" opacity="0.4"/>
            <path d="M 9 2 L 9 16 M 2 9 L 16 9" stroke="#FFA500" strokeWidth="0.5" opacity="0.5"/>
            <circle cx="9" cy="9" r="2" fill={bolivianYellow} opacity="0.6"/>
          </pattern>
          
          {/* Patrón para franja verde */}
          <pattern id="greenPattern" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="9" cy="9" r="7" fill={bolivianGreen} opacity="0.3"/>
            <circle cx="9" cy="9" r="4" fill="#00A651" opacity="0.4"/>
            <path d="M 9 2 L 9 16 M 2 9 L 16 9" stroke="#00C853" strokeWidth="0.5" opacity="0.5"/>
            <circle cx="9" cy="9" r="2" fill={bolivianGreen} opacity="0.6"/>
          </pattern>
          
          {/* Gradiente para profundidad */}
          <linearGradient id="depthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.15"/>
            <stop offset="50%" stopColor="#000000" stopOpacity="0"/>
            <stop offset="100%" stopColor="#000000" stopOpacity="0.15"/>
          </linearGradient>
          
          {/* Sombra para el asa */}
          <filter id="asaShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3"/>
          </filter>
        </defs>
        
        {/* Sombra de la mochila para profundidad */}
        <ellipse cx="100" cy="172" rx="55" ry="8" fill="#000000" opacity="0.15"/>
        
        {/* Tirantes de la mochila (correas) - verde */}
        {/* Tirante izquierdo */}
        <path d="M 55 30 L 45 45 L 43 125 L 48 165" stroke={bolivianGreen} strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.8"/>
        <path d="M 55 30 L 45 45 L 43 125 L 48 165" stroke={bolivianGreen} strokeWidth="6" fill="none" strokeLinecap="round"/>
        
        {/* Tirante derecho */}
        <path d="M 145 30 L 155 45 L 157 125 L 152 165" stroke={bolivianGreen} strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.8"/>
        <path d="M 145 30 L 155 45 L 157 125 L 152 165" stroke={bolivianGreen} strokeWidth="6" fill="none" strokeLinecap="round"/>
        
        {/* Mochila con franjas de Bolivia: rojo, amarillo, verde */}
        
        {/* Franja Roja (superior) con textura */}
        <rect x="40" y="30" width="120" height="50" rx="12" fill={bolivianRed}/>
        <rect x="40" y="30" width="120" height="50" rx="12" fill="url(#redPattern)"/>
        <rect x="40" y="30" width="120" height="50" rx="12" fill="url(#depthGradient)" opacity="0.3"/>
        
        {/* Franja Amarilla (media) con textura */}
        <rect x="40" y="80" width="120" height="45" fill={bolivianYellow}/>
        <rect x="40" y="80" width="120" height="45" fill="url(#yellowPattern)"/>
        <rect x="40" y="80" width="120" height="45" fill="url(#depthGradient)" opacity="0.2"/>
        
        {/* Franja Verde (inferior) con textura */}
        <rect x="40" y="125" width="120" height="45" rx="0 0 12 12" fill={bolivianGreen}/>
        <rect x="40" y="125" width="120" height="45" rx="0 0 12 12" fill="url(#greenPattern)"/>
        <rect x="40" y="125" width="120" height="45" rx="0 0 12 12" fill="url(#depthGradient)" opacity="0.3"/>
        
        {/* Asa de la mochila más prominente con sombra - verde */}
        <path d="M 60 30 Q 100 18 140 30" stroke={bolivianGreen} strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.3"/>
        <path d="M 60 30 Q 100 18 140 30" stroke={bolivianGreen} strokeWidth="7" fill="none" strokeLinecap="round" filter="url(#asaShadow)"/>
        
        {/* Hebillas del asa */}
        <rect x="57" y="28" width="6" height="4" rx="1" fill="#4B5563"/>
        <rect x="137" y="28" width="6" height="4" rx="1" fill="#4B5563"/>
        
        {/* Bolsillos laterales rojos con textura y profundidad */}
        <rect x="165" y="50" width="24" height="42" rx="4" fill={bolivianRed}/>
        <rect x="165" y="50" width="24" height="42" rx="4" fill="url(#redPattern)"/>
        <rect x="168" y="53" width="18" height="36" rx="2" fill="#000000" opacity="0.1"/>
        
        <rect x="11" y="50" width="24" height="42" rx="4" fill={bolivianRed}/>
        <rect x="11" y="50" width="24" height="42" rx="4" fill="url(#redPattern)"/>
        <rect x="14" y="53" width="18" height="36" rx="2" fill="#000000" opacity="0.1"/>
        
        {/* Bolsillos laterales verdes inferiores con textura */}
        <rect x="165" y="125" width="24" height="42" rx="4" fill={bolivianGreen}/>
        <rect x="165" y="125" width="24" height="42" rx="4" fill="url(#greenPattern)"/>
        <rect x="168" y="128" width="18" height="36" rx="2" fill="#000000" opacity="0.1"/>
        
        <rect x="11" y="125" width="24" height="42" rx="4" fill={bolivianGreen}/>
        <rect x="11" y="125" width="24" height="42" rx="4" fill="url(#greenPattern)"/>
        <rect x="14" y="128" width="18" height="36" rx="2" fill="#000000" opacity="0.1"/>
        
        {/* Bolsillo frontal verde con cremallera y borde */}
        <rect x="52" y="135" width="96" height="28" rx="8" fill={bolivianGreen}/>
        <rect x="52" y="135" width="96" height="28" rx="8" fill="url(#greenPattern)"/>
        <rect x="52" y="135" width="96" height="28" rx="8" stroke="white" strokeWidth="3" fill="none"/>
        
        {/* Cremallera del bolsillo */}
        <line x1="70" y1="137" x2="130" y2="137" stroke="#E5E7EB" strokeWidth="1.5" strokeDasharray="2,2"/>
        <circle cx="100" cy="137" r="3" fill="#9CA3AF"/>
        
        {/* Íconos en franja roja - Fila superior con sombras */}
        
        {/* Llave inglesa (izquierda) */}
        <g transform="translate(60, 48)" filter="drop-shadow(0 2px 2px rgba(0,0,0,0.2))">
          <path d="M 0 8 L 8 0 L 11 3 L 3 11 Z" fill="white"/>
          <circle cx="13" cy="13" r="5" stroke="white" strokeWidth="2.5" fill="none"/>
          <circle cx="13" cy="13" r="2" fill="white"/>
        </g>
        
        {/* Rayo eléctrico (centro) */}
        <g filter="drop-shadow(0 2px 2px rgba(0,0,0,0.2))">
          <path d="M 98 42 L 104 58 L 100 58 L 106 70 L 98 64 L 100 54 Z" fill="white"/>
        </g>
        
        {/* Pala (derecha) */}
        <g transform="translate(130, 50)" filter="drop-shadow(0 2px 2px rgba(0,0,0,0.2))">
          <ellipse cx="0" cy="0" rx="6" ry="8" fill="white"/>
          <rect x="-2" y="8" width="4" height="14" fill="white" rx="1"/>
        </g>
        
        {/* Escudo boliviano más detallado en franja amarilla (centro) - inspirado en el escudo nacional */}
        <g filter="drop-shadow(0 2px 3px rgba(0,0,0,0.3))">
          <circle cx="100" cy="102" r="16" fill={bolivianRed}/>
          <circle cx="100" cy="102" r="13" fill={bolivianYellow}/>
          <circle cx="100" cy="102" r="10" fill={bolivianGreen}/>
          <circle cx="100" cy="102" r="8" fill={bolivianYellow}/>
          {/* Estrella boliviana */}
          <path d="M 100 95 L 101.5 99 L 105.5 99 L 102.5 101.5 L 103.5 105.5 L 100 103 L 96.5 105.5 L 97.5 101.5 L 94.5 99 L 98.5 99 Z" fill={bolivianGreen}/>
        </g>
        
        {/* Íconos en franja amarilla con sombras */}
        
        {/* Hoja (izquierda) */}
        <g transform="translate(63, 95)" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.2))">
          <path d="M 0 5 Q 3 0 7 3 Q 9 7 7 13 Q 3 16 0 13 Q -2 9 0 5" fill="#6B7280"/>
          <line x1="3.5" y1="3" x2="3.5" y2="14" stroke="white" strokeWidth="2"/>
        </g>
        
        {/* Persona con pañuelo (derecha) */}
        <g transform="translate(133, 95)" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.2))">
          <circle cx="0" cy="6" r="6" fill="#6B7280"/>
          <path d="M -8 17 Q -3 20 0 17 Q 3 20 8 17" stroke="#6B7280" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M -5 8 Q 0 6 5 8" stroke={bolivianGreen} strokeWidth="2" fill="none"/>
        </g>
      </svg>
      
      {/* Texto "conecta" */}
      <div className="text-center mt-2">
        <span className="text-gray-800 text-xl font-bold lowercase tracking-wide">
          conecta
        </span>
      </div>
    </div>
  )
}

export default Logo
