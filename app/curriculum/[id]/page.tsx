'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Award, Briefcase, GraduationCap, Star, Calendar, MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react'
import { getProfessionalById, type Professional } from '@/lib/professionals'
import { getAvatarUrl } from '@/lib/avatars'

function getCurriculumData(professional: Professional) {
  const curricula: { [key: string]: any } = {
    // Plomeros
    'juan-gomez': {
      resumen: 'Plomero profesional con 10+ años de experiencia en instalaciones residenciales y comerciales. Especializado en detección de fugas y sistemas de agua caliente.',
      experiencia: [
        { titulo: 'Plomero Senior', empresa: 'Servicios Hidráulicos SA', periodo: '2018 - Presente', descripcion: 'Instalaciones comerciales, mantenimiento preventivo y reparaciones de emergencia' },
        { titulo: 'Plomero', empresa: 'Construcciones del Este', periodo: '2015 - 2018', descripcion: 'Instalaciones en edificios residenciales y mantenimiento' },
        { titulo: 'Ayudante de Plomería', empresa: 'Plomería Rápida', periodo: '2013 - 2015', descripcion: 'Asistencia en reparaciones e instalaciones básicas' }
      ],
      educacion: [
        { titulo: 'Maestría en Instalaciones Sanitarias', institucion: 'SNPP Paraguay', ano: '2018' },
        { titulo: 'Técnico en Plomería', institucion: 'Instituto Técnico Nacional', ano: '2013' }
      ],
      certificaciones: [
        'Certificado en Sistemas de Agua Caliente',
        'Habilitación Municipal de Plomería',
        'Curso de Detección de Fugas Avanzado',
        'Certificación en Gas Doméstico'
      ],
    },
    
    // Electricistas
    'carlos-rodriguez': {
      resumen: 'Electricista certificado con amplia experiencia en instalaciones eléctricas residenciales, comerciales e industriales. Especializado en paneles solares y automatización.',
      experiencia: [
        { titulo: 'Electricista Principal', empresa: 'Energía Solar Paraguay', periodo: '2019 - Presente', descripcion: 'Instalación de paneles solares y sistemas de energía renovable' },
        { titulo: 'Electricista', empresa: 'Construcciones Modernas', periodo: '2015 - 2019', descripcion: 'Cableado estructural y sistemas eléctricos comerciales' },
        { titulo: 'Ayudante Eléctrico', empresa: 'Servicios Eléctricos 24/7', periodo: '2012 - 2015', descripcion: 'Mantenimiento y reparaciones eléctricas' }
      ],
      educacion: [
        { titulo: 'Ingeniero Electricista', institucion: 'Universidad Nacional de Asunción', ano: '2015' },
        { titulo: 'Técnico Electricista', institucion: 'SNPP Paraguay', ano: '2012' }
      ],
      certificaciones: [
        'Certificación en Energía Solar Fotovoltaica',
        'Habilitación ANDE',
        'Curso de Alta Tensión',
        'Certificado en Automatización Residencial'
      ],
    },

    // Carpinteros
    'pedro-martinez': {
      resumen: 'Maestro carpintero especializado en muebles a medida y trabajos de ebanistería fina. Combino técnicas tradicionales con herramientas modernas.',
      experiencia: [
        { titulo: 'Carpintero Independiente', empresa: 'Taller Propio', periodo: '2017 - Presente', descripcion: 'Muebles a medida, cocinas integrales y trabajos de ebanistería' },
        { titulo: 'Maestro Carpintero', empresa: 'Mueblería El Artesano', periodo: '2013 - 2017', descripcion: 'Diseño y fabricación de muebles personalizados' },
        { titulo: 'Oficial Carpintero', empresa: 'Carpintería San José', periodo: '2009 - 2013', descripcion: 'Construcción de muebles y trabajos de carpintería general' }
      ],
      educacion: [
        { titulo: 'Maestro en Ebanistería', institucion: 'Escuela de Artes y Oficios', ano: '2013' },
        { titulo: 'Técnico en Carpintería', institucion: 'Centro de Formación Profesional', ano: '2009' }
      ],
      certificaciones: [
        'Certificado en Diseño de Muebles',
        'Curso de Barnizado y Acabados',
        'Manejo de Maquinaria CNC',
        'Certificación en Seguridad Industrial'
      ],
    },

    // Pintores
    'miguel-lopez': {
      resumen: 'Pintor profesional con experiencia en pintura decorativa, texturizados y acabados especiales. Atención al detalle y uso de productos de alta calidad.',
      experiencia: [
        { titulo: 'Pintor Profesional', empresa: 'Pinturas Decorativas', periodo: '2016 - Presente', descripcion: 'Pintura residencial y comercial, acabados decorativos' },
        { titulo: 'Pintor', empresa: 'Constructora del Sur', periodo: '2012 - 2016', descripcion: 'Pintura de edificios y proyectos inmobiliarios' },
        { titulo: 'Ayudante de Pintor', empresa: 'Pinturas Express', periodo: '2010 - 2012', descripcion: 'Preparación de superficies y pintura básica' }
      ],
      educacion: [
        { titulo: 'Curso de Pintura Decorativa', institucion: 'Instituto de Artes Aplicadas', ano: '2015' },
        { titulo: 'Técnico en Pintura', institucion: 'SNPP Paraguay', ano: '2010' }
      ],
      certificaciones: [
        'Certificado en Técnicas de Texturizado',
        'Curso de Pintura Epoxi',
        'Certificación en Seguridad en Alturas',
        'Manejo de Pistola Airless'
      ],
    },

    // Jardineros
    'roberto-diaz': {
      resumen: 'Jardinero y paisajista con pasión por crear espacios verdes hermosos y sostenibles. Especializado en diseño de jardines y mantenimiento de áreas verdes.',
      experiencia: [
        { titulo: 'Jardinero Paisajista', empresa: 'Jardines del Paraguay', periodo: '2015 - Presente', descripcion: 'Diseño y mantenimiento de jardines residenciales y corporativos' },
        { titulo: 'Jardinero', empresa: 'Club Deportivo Asunción', periodo: '2011 - 2015', descripcion: 'Mantenimiento de canchas y áreas verdes' },
        { titulo: 'Asistente de Jardinería', empresa: 'Vivero Central', periodo: '2009 - 2011', descripcion: 'Cuidado de plantas y ventas' }
      ],
      educacion: [
        { titulo: 'Técnico en Paisajismo', institucion: 'Facultad de Ciencias Agrarias - UNA', ano: '2014' },
        { titulo: 'Curso de Jardinería', institucion: 'Instituto Verde', ano: '2009' }
      ],
      certificaciones: [
        'Certificado en Diseño de Jardines',
        'Curso de Riego Automatizado',
        'Manejo de Pesticidas Orgánicos',
        'Certificación en Poda de Árboles'
      ],
    },

    // Mecánicos
    'jose-fernandez': {
      resumen: 'Mecánico automotriz con sólida experiencia en diagnóstico y reparación de vehículos modernos. Especializado en electrónica automotriz y sistemas de inyección.',
      experiencia: [
        { titulo: 'Mecánico Senior', empresa: 'Taller Mecánico ProAuto', periodo: '2017 - Presente', descripcion: 'Diagnóstico electrónico, reparaciones complejas y mantenimiento preventivo' },
        { titulo: 'Mecánico', empresa: 'Concesionaria Motor SA', periodo: '2013 - 2017', descripcion: 'Servicio técnico autorizado y garantías' },
        { titulo: 'Ayudante Mecánico', empresa: 'Taller del Barrio', periodo: '2010 - 2013', descripcion: 'Mantenimiento básico y cambios de aceite' }
      ],
      educacion: [
        { titulo: 'Técnico Mecánico Automotriz', institucion: 'SNPP - Especialización Automotriz', ano: '2013' },
        { titulo: 'Curso de Mecánica Básica', institucion: 'Instituto Técnico', ano: '2010' }
      ],
      certificaciones: [
        'Certificación en Diagnóstico Electrónico',
        'Curso de Inyección Electrónica',
        'Certificado en Aire Acondicionado Automotriz',
        'Manejo de Scanner Automotriz'
      ],
    },

    // Albañiles
    'luis-benitez': {
      resumen: 'Maestro albañil con amplia experiencia en construcción de viviendas, edificios y reformas. Trabajo prolijo y cumplimiento de plazos garantizado.',
      experiencia: [
        { titulo: 'Maestro Albañil', empresa: 'Construcciones Benitez', periodo: '2018 - Presente', descripcion: 'Construcción de viviendas, ampliaciones y reformas integrales' },
        { titulo: 'Oficial Albañil', empresa: 'Constructora del Este', periodo: '2013 - 2018', descripcion: 'Obra gruesa y acabados en edificios' },
        { titulo: 'Ayudante de Albañilería', empresa: 'Obras Civiles SA', periodo: '2010 - 2013', descripcion: 'Asistencia en construcción y preparación de mezclas' }
      ],
      educacion: [
        { titulo: 'Maestro Mayor de Obras', institucion: 'Instituto Técnico Superior', ano: '2017' },
        { titulo: 'Curso de Albañilería', institucion: 'SNPP Paraguay', ano: '2010' }
      ],
      certificaciones: [
        'Certificado en Lectura de Planos',
        'Curso de Construcción en Seco',
        'Certificación en Seguridad en Obras',
        'Manejo de Nivel Láser'
      ],
    },

    // Técnicos en refrigeración
    'diego-castro': {
      resumen: 'Técnico en refrigeración y aire acondicionado con expertise en instalación, mantenimiento y reparación de sistemas de climatización residenciales y comerciales.',
      experiencia: [
        { titulo: 'Técnico Especializado', empresa: 'Clima Frío Servicios', periodo: '2016 - Presente', descripcion: 'Instalación y mantenimiento de aires acondicionados y sistemas de refrigeración' },
        { titulo: 'Técnico en Refrigeración', empresa: 'Refrigeración Industrial', periodo: '2012 - 2016', descripcion: 'Mantenimiento de cámaras frigoríficas y equipos industriales' },
        { titulo: 'Ayudante Técnico', empresa: 'Service Frío', periodo: '2010 - 2012', descripcion: 'Asistencia en reparaciones e instalaciones' }
      ],
      educacion: [
        { titulo: 'Técnico en Refrigeración y Aire Acondicionado', institucion: 'SNPP Paraguay', ano: '2012' },
        { titulo: 'Curso de Gases Refrigerantes', institucion: 'Instituto Técnico', ano: '2010' }
      ],
      certificaciones: [
        'Certificación en Gases Ecológicos R410A',
        'Curso de Aire Acondicionado Inverter',
        'Manejo de Vacuómetro y Manómetros',
        'Certificado en Refrigeración Comercial'
      ],
    }
  }

  // Retornar curriculum específico o uno genérico
  return curricula[professional.id] || {
    resumen: `Profesional con amplia experiencia en ${professional.profession}. Comprometido con la calidad y la satisfacción del cliente.`,
    experiencia: [
      { titulo: professional.profession, empresa: 'Independiente', periodo: '2015 - Presente', descripcion: 'Servicios profesionales de calidad' }
    ],
    educacion: [
      { titulo: `Técnico en ${professional.profession}`, institucion: 'SNPP Paraguay', ano: '2015' }
    ],
    certificaciones: [
      'Certificación Profesional',
      'Habilitación Municipal'
    ],
  }
}

export default function CurriculumPage() {
  const params = useParams()
  const router = useRouter()
  const professional = getProfessionalById(params.id as string)

  if (!professional) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-xl text-gray-600">Profesional no encontrado</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  const curriculum = getCurriculumData(professional)
  const avatarUrl = getAvatarUrl(professional.name, 128)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Volver</span>
          </button>
          <h1 className="text-lg font-bold text-gray-800">Curriculum Vitae</h1>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 pb-8">
        {/* Perfil del Profesional */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100 shadow-lg">
                <img 
                  src={avatarUrl}
                  alt={professional.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    const initials = professional.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(professional.name)}&size=128&background=random&color=fff&bold=true`
                    target.onerror = () => {
                      target.style.display = 'none'
                      const parent = target.parentElement
                      if (parent) {
                        parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">${initials}</div>`
                      }
                    }
                  }}
                />
              </div>
              {/* Verified badge */}
              {professional?.verifiedPoliceRecord ? (
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
              ) : null}

            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{professional.name}</h2>
              <p className="text-xl text-blue-600 font-semibold mb-3">{professional.profession}</p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{professional.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span>{professional.phone}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <span>{professional.email || `${professional.name.toLowerCase().replace(' ', '.')}@email.com`}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-gray-900">{professional.rating?.toFixed(1) || '0.0'}</span>
                  <span className="text-gray-500">({professional.reviews || '0'} reseñas)</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Briefcase className="w-5 h-5" />
                  <span className="font-semibold">{professional.completedJobs || Math.floor(Math.random() * 100) + 50}+ trabajos</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resumen Profesional */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">Resumen Profesional</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">{curriculum.resumen}</p>
        </div>

        {/* Experiencia Laboral */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">Experiencia Laboral</h3>
          </div>
          <div className="space-y-4">
            {curriculum.experiencia.map((exp: any, index: number) => (
              <div key={index} className="border-l-4 border-blue-600 pl-4 py-2">
                <h4 className="text-lg font-bold text-gray-900">{exp.titulo}</h4>
                <p className="text-blue-600 font-semibold">{exp.empresa}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{exp.periodo}</span>
                </div>
                <p className="text-gray-700">{exp.descripcion}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Educación */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">Educación</h3>
          </div>
          <div className="space-y-3">
            {curriculum.educacion.map((edu: any, index: number) => (
              <div key={index} className="border-l-4 border-green-600 pl-4 py-2">
                <h4 className="text-lg font-bold text-gray-900">{edu.titulo}</h4>
                <p className="text-green-600 font-semibold">{edu.institucion}</p>
                <p className="text-sm text-gray-500">Año: {edu.ano}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certificaciones */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">Certificaciones y Cursos</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {curriculum.certificaciones.map((cert: string, index: number) => (
              <div key={index} className="flex items-center gap-2 bg-blue-50 rounded-lg p-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-gray-800">{cert}</span>
              </div>
            ))}
          </div>
        </div>


        {/* Botón de Contacto */}
        <div className="mt-6">
          <button
            onClick={() => router.push(`/professional/${professional.id}`)}
            className="w-full py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Contactar a {professional.name.split(' ')[0]}
          </button>
        </div>
      </div>
    </div>
  )
}
