// Función para detectar el género basado en el nombre
export const detectGender = (name: string): 'male' | 'female' => {
  const nameLower = name.toLowerCase()
  
  // Nombres femeninos comunes en Paraguay
  const femaleNames = [
    'maria', 'ana', 'laura', 'rosa', 'marta', 'silvia', 'claudia', 'gabriela',
    'carolina', 'andrea', 'patricia', 'monica', 'veronica', 'beatriz', 'diana',
    'elena', 'fernanda', 'gloria', 'isabel', 'julia', 'liliana', 'mariana',
    'natalia', 'olivia', 'paola', 'raquel', 'sandra', 'teresa', 'viviana'
  ]
  
  // Nombres masculinos comunes en Paraguay
  const maleNames = [
    'juan', 'carlos', 'pedro', 'jose', 'luis', 'miguel', 'jorge', 'antonio',
    'roberto', 'fernando', 'ricardo', 'alberto', 'raul', 'sergio', 'pablo',
    'diego', 'mario', 'oscar', 'rafael', 'ramon', 'eduardo', 'hector',
    'osvaldo', 'elias', 'felix', 'gustavo', 'daniel', 'julio', 'cesar'
  ]
  
  // Buscar coincidencias en el primer nombre
  const firstName = nameLower.split(' ')[0]
  
  if (femaleNames.some(n => firstName.includes(n))) {
    return 'female'
  }
  
  if (maleNames.some(n => firstName.includes(n))) {
    return 'male'
  }
  
  // Por defecto, inferir del final del nombre
  // En español, muchos nombres femeninos terminan en 'a'
  if (firstName.endsWith('a') && !firstName.endsWith('ia')) {
    return 'female'
  }
  
  return 'male'
}

// Generar URL de avatar según el nombre - usando UI Avatars (más confiable y sin problemas de CORS)
export const getAvatarUrl = (name: string, size: number = 128): string => {
  const gender = detectGender(name)
  const seed = encodeURIComponent(name)
  
  // Usar UI Avatars directamente - más confiable y sin problemas de CORS
  // Colores diferentes según género para mejor diferenciación visual
  const bgColors = gender === 'female' 
    ? ['ffd5dc', 'ffdfbf', 'c0aede', 'fce7f3', 'fecdd3'] // Tonos rosados/pasteles para mujeres
    : ['b6e3f4', 'c0aede', 'd1d4f9', 'ddd6fe', 'bfdbfe'] // Tonos azules/violetas para hombres
  
  // Seleccionar color aleatorio pero consistente basado en el nombre
  const colorIndex = name.charCodeAt(0) % bgColors.length
  const selectedBg = bgColors[colorIndex] || bgColors[0]
  
  // UI Avatars genera avatares con iniciales, más confiable que DiceBear
  return `https://ui-avatars.com/api/?name=${seed}&size=${size}&background=${selectedBg}&color=fff&bold=true&format=svg`
}

// Función alternativa con fallback local
export const getAvatarUrlWithFallback = (name: string, size: number = 128): string => {
  try {
    return getAvatarUrl(name, size)
  } catch (error) {
    // Fallback a UI Avatars si hay error
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=${size}&background=random&color=fff&bold=true`
  }
}

// Función de respaldo con iniciales si no hay conexión
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

