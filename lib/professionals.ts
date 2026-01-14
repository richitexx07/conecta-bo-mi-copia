export interface Professional {
  id: string
  name: string
  profession: string
  location: string
  distance?: string
  rating?: number
  verified: boolean
  price?: string
  schedule?: string
  description?: string
  email?: string
  phone?: string
  services?: Array<{ name: string; price: string }>
  createdAt: string
  gender?: 'male' | 'female'
  zone?: string
  completedJobs?: number
  verifiedPoliceRecord?: boolean
  reviews?: number
}

const STORAGE_KEY = 'conecta_professionals'
const VERSION_KEY = 'conecta_data_version'
const CURRENT_VERSION = '4.0' // Incrementar para forzar recarga con nuevos profesionales

export const saveProfessional = (professional: Omit<Professional, 'id' | 'createdAt'>): Professional => {
  const professionals = getProfessionals()
  const newProfessional: Professional = {
    ...professional,
    id: `prof_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  }
  
  professionals.push(newProfessional)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(professionals))
  return newProfessional
}

export const updateProfessional = (id: string, updates: Partial<Professional>): Professional | null => {
  const professionals = getProfessionals()
  const index = professionals.findIndex(p => p.id === id)
  
  if (index === -1) return null
  
  professionals[index] = { ...professionals[index], ...updates }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(professionals))
  return professionals[index]
}

export const getProfessionals = (): Professional[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error reading professionals from localStorage:', error)
    return []
  }
}

export const getProfessionalById = (id: string): Professional | null => {
  const professionals = getProfessionals()
  return professionals.find(p => p.id === id) || null
}

export const searchProfessionals = (query: string): Professional[] => {
  const professionals = getProfessionals()
  const lowerQuery = query.toLowerCase().trim()
  
  if (!lowerQuery) return []
  
  return professionals.filter(p => {
    const nameMatch = p.name.toLowerCase().includes(lowerQuery)
    const professionMatch = p.profession.toLowerCase().includes(lowerQuery)
    const locationMatch = p.location.toLowerCase().includes(lowerQuery)
    const descriptionMatch = p.description?.toLowerCase().includes(lowerQuery) || false
    
    // También buscar palabras individuales
    const queryWords = lowerQuery.split(' ')
    const nameWords = p.name.toLowerCase().split(' ')
    const professionWords = p.profession.toLowerCase().split(' ')
    
    const nameWordMatch = queryWords.some(qw => nameWords.some(nw => nw.includes(qw) || qw.includes(nw)))
    const professionWordMatch = queryWords.some(qw => professionWords.some(pw => pw.includes(qw) || qw.includes(pw)))
    
    return nameMatch || professionMatch || locationMatch || descriptionMatch || nameWordMatch || professionWordMatch
  })
}

export const getProfessionalsByCategory = (category: string): Professional[] => {
  const professionals = getProfessionals()
  const lowerCategory = category.toLowerCase()
  
  // Mapeo de categorías con términos específicos y estrictos
  const categoryMap: { [key: string]: string[] } = {
    'plomeria': ['plomero', 'plomería', 'fontanero'],
    'plomería': ['plomero', 'plomería', 'fontanero'],
    'electricista': ['electricista', 'electricidad'],
    'electricidad': ['electricista', 'electricidad'],
    'carpintero': ['carpintero', 'carpintería', 'ebanista'],
    'carpintería': ['carpintero', 'carpintería', 'ebanista'],
    'mecanico': ['mecánico', 'mecánica'],
    'mecánico': ['mecánico', 'mecánica'],
    'peluquero': ['peluquero', 'peluquera', 'barbero', 'barbería'],
    'jardinero': ['jardinero', 'jardinería'],
    'jardineros': ['jardinero', 'jardinería'],
    'albañil': ['albañil', 'albañilería'],
    'albañiles': ['albañil', 'albañilería'],
    'albañilería': ['albañil', 'albañilería'],
    'empleada domestica': ['empleada doméstica', 'empleada domestica'],
    'empleada doméstica': ['empleada doméstica', 'empleada domestica'],
    'ninera': ['niñera'],
    'niñera': ['niñera'],
    'salón de belleza': ['salón de belleza', 'salon de belleza', 'estilista'],
    'salon de belleza': ['salón de belleza', 'salon de belleza', 'estilista'],
    'manicurista': ['manicurista', 'manicure'],
    'chofer': ['chofer', 'conductor'],
    'herrero': ['herrero', 'herrería'],
    'gomería': ['gomería', 'gomero'],
    'limpieza de piscinas': ['limpieza de piscinas', 'piscina'],
    'paseador de animales': ['paseador de animales', 'paseador'],
    'lavaderos': ['lavaderos', 'lavadero', 'lavandería', 'lavado'],
    'panadero': ['panadero', 'panadería', 'panadera'],
    'guardia de seguridad': ['guardia de seguridad', 'guardia', 'seguridad', 'vigilante'],
  }
  
  return professionals.filter(p => {
    const professionLower = p.profession.toLowerCase().trim()
    const categoryLower = lowerCategory.trim()
    
    // Para niñera, coincidencia exacta estricta
    if (categoryLower === 'niñera' || categoryLower === 'ninera') {
      return professionLower === 'niñera' || professionLower === 'ninera'
    }
    
    // Buscar coincidencia directa exacta primero
    if (professionLower === categoryLower) {
      return true
    }
    
    // Buscar coincidencia parcial pero específica
    if (professionLower.includes(categoryLower) || categoryLower.includes(professionLower)) {
      // Verificar que no sea una coincidencia accidental (ej: "cuidado" no debe coincidir con "niñera")
      const relatedTerms = categoryMap[categoryLower] || []
      if (relatedTerms.length > 0) {
        return relatedTerms.some(term => professionLower.includes(term))
      }
      return true
    }
    
    // Buscar en el mapeo de categorías
    const relatedTerms = categoryMap[categoryLower] || []
    if (relatedTerms.length > 0) {
      return relatedTerms.some(term => professionLower.includes(term))
    }
    
    return false
  })
}

export const getNearbyProfessionals = (limit: number = 10): Professional[] => {
  const professionals = getProfessionals()
  // Por ahora retornamos todos, pero aquí se podría filtrar por distancia GPS
  return professionals.slice(0, limit)
}

export const getFeaturedProfessionals = (limit: number = 5): Professional[] => {
  const professionals = getProfessionals()
  // Ordenar por rating o fecha de creación
  return professionals
    .filter(p => p.verified)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit)
}

// Datos de ejemplo para demo
export const DEMO_PROFESSIONALS: Omit<Professional, 'id' | 'createdAt'>[] = [
  // Plomeros
  {
    name: 'Juan Carlos Pérez',
    profession: 'Plomero',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '1.2 km',
    rating: 4.9,
    verified: true,
    price: 'Bs. 150',
    schedule: 'Lun - Sáb: 7:00 - 19:00',
    description: 'Especialista en instalaciones y reparaciones. 15 años de experiencia.',
    phone: '70012345',
    gender: 'male',
    zone: 'Centro',
    completedJobs: 245,
  },
  {
    name: 'Roberto Benítez',
    profession: 'Plomero',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '3.5 km',
    rating: 4.7,
    verified: true,
    price: 'Bs. 120.000',
    schedule: 'Lun - Vie: 8:00 - 18:00',
    description: 'Servicio rápido y confiable. Atención de emergencias.',
    phone: '0982 345 678',
    gender: 'male',
    zone: 'Pampa de la Isla',
    completedJobs: 204,
  },
  {
    name: 'Miguel Ángel Rodríguez',
    profession: 'Plomero',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '5.8 km',
    rating: 4.8,
    verified: true,
    price: 'Bs. 140.000',
    schedule: '24 horas',
    description: 'Servicio de emergencia disponible. Especialista en cañerías.',
    phone: '0983 456 789',
    gender: 'male',
    zone: 'Centro',
    completedJobs: 163,
  },
  
  // Electricistas
  {
    name: 'María González',
    profession: 'Electricista',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '2.1 km',
    rating: 5.0,
    verified: true,
    price: 'Bs. 200.000',
    schedule: 'Lun - Vie: 8:00 - 17:00',
    description: 'Electricista certificada. Instalaciones residenciales y comerciales.',
    phone: '0984 567 890',
    gender: 'female',
    zone: 'Barrio Norte',
    completedJobs: 148,
  },
  {
    name: 'Carlos Martínez',
    profession: 'Electricista',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '4.2 km',
    rating: 4.8,
    verified: true,
    price: 'Bs. 180.000',
    schedule: 'Lun - Sáb: 7:00 - 20:00',
    description: 'Reparaciones eléctricas y mantenimiento preventivo.',
    phone: '0985 678 901',
    gender: 'male',
    zone: 'Barrio Norte',
    completedJobs: 95,
  },
  {
    name: 'Pedro Silva',
    profession: 'Electricista',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '6.3 km',
    rating: 4.6,
    verified: true,
    price: 'Bs. 160.000',
    schedule: 'Lun - Vie: 9:00 - 18:00',
    description: 'Instalaciones industriales y domésticas.',
    phone: '0986 789 012',
    gender: 'male',
    zone: 'Los Pozos',
    completedJobs: 176,
  },
  
  // Carpinteros
  {
    name: 'Luis Ramírez',
    profession: 'Carpintero',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '1.8 km',
    rating: 4.9,
    verified: true,
    price: 'Bs. 180.000',
    schedule: 'Lun - Sáb: 8:00 - 17:00',
    description: 'Muebles a medida y reparaciones. Trabajo de calidad garantizado.',
    phone: '0987 890 123',
    gender: 'male',
    zone: 'Barrio Sur',
    completedJobs: 64,
  },
  {
    name: 'José Flores',
    profession: 'Carpintero',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '7.2 km',
    rating: 4.7,
    verified: true,
    price: 'Bs. 150.000',
    schedule: 'Lun - Vie: 7:00 - 16:00',
    description: 'Especialista en puertas, ventanas y muebles de cocina.',
    phone: '0988 901 234',
    gender: 'male',
    zone: 'Pampa de la Isla',
    completedJobs: 214,
  },
  
  // Jardineros
  {
    name: 'Laura Martínez',
    profession: 'Jardinero',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '2.3 km',
    rating: 4.9,
    verified: true,
    price: 'Bs. 100.000',
    schedule: 'Lun - Sáb: 6:00 - 14:00',
    description: 'Diseño y mantenimiento de jardines. Poda y paisajismo.',
    phone: '0989 012 345',
    gender: 'female',
    zone: 'Villa 1ro de Mayo',
    completedJobs: 81,
  },
  {
    name: 'Antonio Vera',
    profession: 'Jardinero',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '3.4 km',
    rating: 4.6,
    verified: true,
    price: 'Bs. 90.000',
    schedule: 'Mar - Dom: 7:00 - 15:00',
    description: 'Mantenimiento de áreas verdes y limpieza de jardines.',
    phone: '0971 123 456',
    gender: 'male',
    zone: 'Plan 3000',
    completedJobs: 210,
  },
  
  // Albañiles
  {
    name: 'Ricardo Acosta',
    profession: 'Albañilería',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '2.7 km',
    rating: 4.8,
    verified: true,
    price: 'Bs. 250.000',
    schedule: 'Lun - Sáb: 7:00 - 17:00',
    description: 'Construcción, remodelaciones y acabados. 20 años de experiencia.',
    phone: '0972 234 567',
    gender: 'male',
    zone: 'Barrio Sur',
    completedJobs: 245,
  },
  {
    name: 'Héctor Duarte',
    profession: 'Albañilería',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '6.1 km',
    rating: 4.7,
    verified: true,
    price: 'Bs. 220.000',
    schedule: 'Lun - Vie: 7:00 - 16:00',
    description: 'Obras de construcción y reparaciones menores.',
    phone: '0973 345 678',
    gender: 'male',
    zone: 'Centro',
    completedJobs: 80,
  },
  
  // Peluqueros/Estilistas
  {
    name: 'Ana María Sosa',
    profession: 'Peluquero',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '1.5 km',
    rating: 5.0,
    verified: true,
    price: 'Bs. 80.000',
    schedule: 'Mar - Sáb: 9:00 - 19:00',
    description: 'Cortes modernos, coloración y tratamientos capilares.',
    phone: '0974 456 789',
    gender: 'female',
    zone: 'Barrio Sur',
    completedJobs: 157,
  },
  {
    name: 'Claudia Rojas',
    profession: 'Peluquero',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '4.5 km',
    rating: 4.8,
    verified: true,
    price: 'Bs. 70.000',
    schedule: 'Lun - Sáb: 10:00 - 20:00',
    description: 'Peinados para eventos, cortes y peinados de tendencia.',
    phone: '0975 567 890',
    gender: 'female',
    zone: 'Centro',
    completedJobs: 65,
  },
  
  // Mecánicos
  {
    name: 'Osvaldo Fernández',
    profession: 'Mecánico',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '3.2 km',
    rating: 4.7,
    verified: true,
    price: 'Bs. 200.000',
    schedule: 'Lun - Sáb: 8:00 - 18:00',
    description: 'Mecánica en general, diagnóstico computarizado y reparaciones.',
    phone: '0976 678 901',
    gender: 'male',
    zone: 'Centro',
    completedJobs: 200,
  },
  {
    name: 'Ramón Cabrera',
    profession: 'Mecánico',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '5.4 km',
    rating: 4.6,
    verified: true,
    price: 'Bs. 180.000',
    schedule: 'Lun - Vie: 7:00 - 17:00',
    description: 'Especialista en motores y transmisiones.',
    phone: '0977 789 012',
    gender: 'male',
    zone: 'Barrio Sur',
    completedJobs: 206,
  },
  
  // Empleadas domésticas
  {
    name: 'Rosa López',
    profession: 'Empleada doméstica',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '2.8 km',
    rating: 4.9,
    verified: true,
    price: 'Bs. 120.000/día',
    schedule: 'Lun - Vie: 8:00 - 17:00',
    description: 'Limpieza profunda, planchado y cocina. Referencias disponibles.',
    phone: '0978 890 123',
    gender: 'female',
    zone: 'Equipetrol',
    completedJobs: 172,
  },
  {
    name: 'Marta Giménez',
    profession: 'Empleada doméstica',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '4.9 km',
    rating: 4.8,
    verified: true,
    price: 'Bs. 100.000/día',
    schedule: 'Lun - Sáb: 7:00 - 16:00',
    description: 'Servicio de limpieza confiable y profesional.',
    phone: '0979 901 234',
    gender: 'female',
    zone: 'Centro',
    completedJobs: 158,
  },
  
  // Gomería/Auxilio
  {
    name: 'Elías Álvarez',
    profession: 'Gomería',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '1.1 km',
    rating: 4.9,
    verified: true,
    price: 'Bs. 50.000',
    schedule: '24 horas',
    description: 'Servicio de auxilio y reparación de neumáticos. Disponible 24/7.',
    phone: '0961 012 345',
    gender: 'male',
    zone: 'Barrio Norte',
    completedJobs: 132,
    services: [
      { name: 'Auxilio', price: '30.000 gs' },
      { name: 'Parchar rueda', price: '50.000 gs' },
    ],
  },
  {
    name: 'Fernando Báez',
    profession: 'Gomería',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '6.7 km',
    rating: 4.7,
    verified: true,
    price: 'Bs. 45.000',
    schedule: 'Lun - Sáb: 6:00 - 22:00',
    description: 'Reparación y venta de neumáticos. Alineación y balanceo.',
    phone: '0962 123 456',
    gender: 'male',
    zone: 'Centro',
    completedJobs: 168,
  },
  
  // Manicuristas
  {
    name: 'Gabriela Núñez',
    profession: 'Manicurista',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '2.2 km',
    rating: 5.0,
    verified: true,
    price: 'Bs. 60.000',
    schedule: 'Lun - Sáb: 9:00 - 19:00',
    description: 'Manicure, pedicure, uñas esculpidas y diseños exclusivos.',
    phone: '0963 234 567',
    gender: 'female',
    zone: 'Villa 1ro de Mayo',
    completedJobs: 196,
  },
  {
    name: 'Carolina Díaz',
    profession: 'Manicurista',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '4.1 km',
    rating: 4.8,
    verified: true,
    price: 'Bs. 50.000',
    schedule: 'Mar - Dom: 10:00 - 20:00',
    description: 'Especialista en nail art y tratamientos de uñas.',
    phone: '0964 345 678',
    gender: 'female',
    zone: 'Centro',
    completedJobs: 135,
  },
  
  // Choferes
  {
    name: 'Pablo Mendoza',
    profession: 'Chofer',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '1.9 km',
    rating: 4.8,
    verified: true,
    price: 'Bs. 100.000/día',
    schedule: 'Disponible 24/7',
    description: 'Servicio de chofer privado y transporte ejecutivo.',
    phone: '0965 456 789',
    gender: 'male',
    zone: 'Barrio Norte',
    completedJobs: 82,
  },
  {
    name: 'Sergio Ortiz',
    profession: 'Chofer',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '5.2 km',
    rating: 4.7,
    verified: true,
    price: 'Bs. 80.000/día',
    schedule: 'Lun - Vie: 6:00 - 22:00',
    description: 'Transporte seguro y puntual. Vehículo propio.',
    phone: '0966 567 890',
    gender: 'male',
    zone: 'Villa 1ro de Mayo',
    completedJobs: 73,
  },
  
  // Herreros
  {
    name: 'Julio César Romero',
    profession: 'Herrero',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '3.6 km',
    rating: 4.8,
    verified: true,
    price: 'Bs. 220.000',
    schedule: 'Lun - Sáb: 7:00 - 17:00',
    description: 'Portones, rejas, estructuras metálicas y soldadura.',
    phone: '0967 678 901',
    gender: 'male',
    zone: 'Pampa de la Isla',
    completedJobs: 232,
  },
  
  // Modistas
  {
    name: 'Silvia Cantero',
    profession: 'Modista',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '2.5 km',
    rating: 4.9,
    verified: true,
    price: 'Bs. 150.000',
    schedule: 'Lun - Vie: 9:00 - 18:00',
    description: 'Confección de ropa a medida, ajustes y reparaciones.',
    phone: '0968 789 012',
    gender: 'female',
    zone: 'Villa 1ro de Mayo',
    completedJobs: 66,
  },
  
  // Limpieza de piscinas
  {
    name: 'Diego Gaona',
    profession: 'Limpieza de piscinas',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '7.5 km',
    rating: 4.7,
    verified: true,
    price: 'Bs. 180.000',
    schedule: 'Lun - Sáb: 8:00 - 16:00',
    description: 'Mantenimiento y limpieza de piscinas. Tratamiento químico.',
    phone: '0969 890 123',
    gender: 'male',
    zone: 'Plan 3000',
    completedJobs: 218,
  },
  
  // Paseador de animales
  {
    name: 'Andrea Rivas',
    profession: 'Paseador de animales',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '1.7 km',
    rating: 5.0,
    verified: true,
    price: 'Bs. 40/paseo',
    schedule: 'Lun - Dom: 7:00 - 19:00',
    description: 'Paseos diarios para mascotas. Cuidado profesional con amor.',
    phone: '70012345',
    gender: 'female',
    zone: 'Equipetrol',
    completedJobs: 180,
  },
  
  // Niñeras (agregadas para corregir filtrado)
  {
    name: 'María Elena Vargas',
    profession: 'Niñera',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '0.8 km',
    rating: 4.9,
    verified: true,
    price: 'Bs. 120/día',
    schedule: 'Lun - Dom: 7:00 - 20:00',
    description: 'Cuidado profesional de niños. Experiencia con bebés y niños pequeños. Referencias disponibles.',
    phone: '70023456',
    gender: 'female',
    zone: 'Centro',
    completedJobs: 156,
  },
  {
    name: 'Carmen Rosa Suárez',
    profession: 'Niñera',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '2.1 km',
    rating: 5.0,
    verified: true,
    price: 'Bs. 130/día',
    schedule: 'Lun - Vie: 8:00 - 18:00',
    description: 'Niñera certificada en primeros auxilios. Especializada en cuidado de niños de 2-10 años.',
    phone: '70034567',
    gender: 'female',
    zone: 'Plan 3000',
    completedJobs: 203,
  },
  {
    name: 'Patricia Morales',
    profession: 'Niñera',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '3.5 km',
    rating: 4.8,
    verified: true,
    price: 'Bs. 110/día',
    schedule: 'Lun - Sáb: 7:00 - 19:00',
    description: 'Cuidado responsable y cariñoso. Experiencia con múltiples niños. Actividades educativas.',
    phone: '70045678',
    gender: 'female',
    zone: 'Villa 1ro de Mayo',
    completedJobs: 142,
  },
  {
    name: 'Lucía Fernández',
    profession: 'Niñera',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '1.9 km',
    rating: 4.9,
    verified: true,
    price: 'Bs. 125/día',
    schedule: 'Disponible 24/7',
    description: 'Niñera de confianza con experiencia. Cuidado nocturno disponible. Referencias verificadas.',
    phone: '70056789',
    gender: 'female',
    zone: 'Equipetrol',
    completedJobs: 189,
  },
  {
    name: 'Sofía Jiménez',
    profession: 'Niñera',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '2.8 km',
    rating: 4.7,
    verified: true,
    price: 'Bs. 115/día',
    schedule: 'Lun - Vie: 6:00 - 20:00',
    description: 'Estudiante de educación inicial. Cuidado profesional con actividades recreativas.',
    phone: '70067890',
    gender: 'female',
    zone: 'Barrio Norte',
    completedJobs: 98,
  },
  
  // Salón de belleza / Estilistas
  {
    name: 'Valentina Morales',
    profession: 'Salón de belleza',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '1.3 km',
    rating: 4.9,
    verified: true,
    price: 'Bs. 90.000',
    schedule: 'Lun - Sáb: 9:00 - 20:00',
    description: 'Salón completo: cortes, coloración, peinados y tratamientos capilares.',
    phone: '70078901',
    gender: 'female',
    zone: 'Centro',
    completedJobs: 187,
  },
  {
    name: 'Isabella Fernández',
    profession: 'Salón de belleza',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '2.7 km',
    rating: 4.8,
    verified: true,
    price: 'Bs. 85.000',
    schedule: 'Mar - Dom: 10:00 - 19:00',
    description: 'Estilista profesional. Especializada en cortes de tendencia y coloración.',
    phone: '70089012',
    gender: 'female',
    zone: 'Equipetrol',
    completedJobs: 142,
  },
  {
    name: 'Daniela Castro',
    profession: 'Salón de belleza',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '3.1 km',
    rating: 5.0,
    verified: true,
    price: 'Bs. 95.000',
    schedule: 'Lun - Sáb: 8:00 - 21:00',
    description: 'Salón premium con servicios completos de belleza y estética.',
    phone: '70090123',
    gender: 'female',
    zone: 'Barrio Norte',
    completedJobs: 203,
  },

  // Panaderos
  {
    name: 'Roberto Mendoza',
    profession: 'Panadero',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '0.9 km',
    rating: 4.9,
    verified: true,
    price: 'Bs. 25.000',
    schedule: 'Lun - Dom: 5:00 - 20:00',
    description: 'Panadería artesanal. Pan fresco, pasteles y repostería tradicional boliviana.',
    phone: '70101234',
    gender: 'male',
    zone: 'Centro',
    completedJobs: 312,
  },
  {
    name: 'Carmen Villalba',
    profession: 'Panadero',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '2.4 km',
    rating: 4.8,
    verified: true,
    price: 'Bs. 22.000',
    schedule: 'Lun - Sáb: 6:00 - 19:00',
    description: 'Panadería familiar. Especialidad en pan dulce y empanadas.',
    phone: '70112345',
    gender: 'female',
    zone: 'Villa 1ro de Mayo',
    completedJobs: 278,
  },
  {
    name: 'José Luis Torrez',
    profession: 'Panadero',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '4.2 km',
    rating: 4.7,
    verified: true,
    price: 'Bs. 20.000',
    schedule: 'Lun - Dom: 4:00 - 18:00',
    description: 'Panadería tradicional. Pan de campo y productos artesanales.',
    phone: '70123456',
    gender: 'male',
    zone: 'Plan 3000',
    completedJobs: 245,
  },

  // Guardias de seguridad
  {
    name: 'Carlos Alberto Ríos',
    profession: 'Guardia de seguridad',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '1.6 km',
    rating: 4.8,
    verified: true,
    price: 'Bs. 150.000/mes',
    schedule: 'Disponible 24/7',
    description: 'Guardia de seguridad certificado. Experiencia en seguridad privada y eventos.',
    phone: '70134567',
    gender: 'male',
    zone: 'Centro',
    completedJobs: 156,
  },
  {
    name: 'Miguel Ángel Quispe',
    profession: 'Guardia de seguridad',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '3.3 km',
    rating: 4.9,
    verified: true,
    price: 'Bs. 160.000/mes',
    schedule: 'Turnos rotativos',
    description: 'Seguridad profesional. Vigilancia residencial y comercial.',
    phone: '70145678',
    gender: 'male',
    zone: 'Equipetrol',
    completedJobs: 189,
  },
  {
    name: 'Fernando Salazar',
    profession: 'Guardia de seguridad',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '2.8 km',
    rating: 4.7,
    verified: true,
    price: 'Bs. 145.000/mes',
    schedule: 'Lun - Dom: Disponible',
    description: 'Guardia con experiencia. Servicio de seguridad confiable.',
    phone: '70156789',
    gender: 'male',
    zone: 'Barrio Sur',
    completedJobs: 134,
  },

  // Lavaderos
  {
    name: 'María del Carmen Vega',
    profession: 'Lavaderos',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '1.4 km',
    rating: 4.9,
    verified: true,
    price: 'Bs. 15/kg',
    schedule: 'Lun - Sáb: 7:00 - 19:00',
    description: 'Lavandería completa. Lavado, planchado y servicio de recogida.',
    phone: '70167890',
    gender: 'female',
    zone: 'Centro',
    completedJobs: 267,
  },
  {
    name: 'Rosa María Chávez',
    profession: 'Lavaderos',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '2.9 km',
    rating: 4.8,
    verified: true,
    price: 'Bs. 12/kg',
    schedule: 'Lun - Vie: 8:00 - 18:00',
    description: 'Servicio de lavandería. Lavado y planchado profesional.',
    phone: '70178901',
    gender: 'female',
    zone: 'Barrio Norte',
    completedJobs: 198,
  },
  {
    name: 'Patricia Gutiérrez',
    profession: 'Lavaderos',
    location: 'Santa Cruz de la Sierra, Bolivia',
    distance: '3.6 km',
    rating: 5.0,
    verified: true,
    price: 'Bs. 18/kg',
    schedule: 'Lun - Dom: 6:00 - 20:00',
    description: 'Lavandería express. Servicio rápido y de calidad.',
    phone: '70189012',
    gender: 'female',
    zone: 'Villa 1ro de Mayo',
    completedJobs: 223,
  },
]

export const initializeDemoData = () => {
  if (typeof window === 'undefined') return
  
  // Verificar versión de datos
  const storedVersion = localStorage.getItem(VERSION_KEY)
  
  if (storedVersion !== CURRENT_VERSION) {
    // Versión antigua o no existe, limpiar y recargar
    console.log('🔄 Actualizando datos de demo a versión', CURRENT_VERSION)
    localStorage.removeItem(STORAGE_KEY)
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION)
    
    // Cargar nuevos datos
    DEMO_PROFESSIONALS.forEach(prof => {
      saveProfessional(prof)
    })
    console.log('✅ Datos de demo actualizados:', DEMO_PROFESSIONALS.length, 'profesionales')
  } else {
    const existing = getProfessionals()
    if (existing.length === 0) {
      // Si por alguna razón no hay datos pero la versión coincide
      DEMO_PROFESSIONALS.forEach(prof => {
        saveProfessional(prof)
      })
      console.log('✅ Datos de demo inicializados:', DEMO_PROFESSIONALS.length, 'profesionales')
    }
  }
}

