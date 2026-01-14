'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getProfessionalById, Professional } from '@/lib/professionals'
import { getAvatarUrl } from '@/lib/avatars'
import Logo from '@/components/Logo'
import { ArrowLeft, Briefcase, GraduationCap, Award, Calendar, MapPin, Phone, Mail, CheckCircle } from 'lucide-react'

export default function CurriculumPage() {
  const router = useRouter()
  const params = useParams()
  const [professional, setProfessional] = useState<Professional & { curriculum?: any } | null>(null)

  useEffect(() => {
    const id = params.id as string
    const prof = getProfessionalById(id)
    
    if (prof) {
      setProfessional({
        ...prof,
        // Datos ficticios del curriculum
        curriculum: {
          experiencia: [
            {
              cargo: prof.profession,
              empresa: 'Independiente',
              periodo: '2015 - Presente',
              descripcion: `Más de ${Math.floor(Math.random() * 8) + 5} años de experiencia brindando servicios de calidad a clientes satisfechos en todo Paraguay.`
            },
            {
              cargo: `Asistente de ${prof.profession}`,
              empresa: 'Empresa Constructora ABC',
              periodo: '2012 - 2015',
              descripcion: 'Apoyo en proyectos residenciales y comerciales, aprendizaje de técnicas avanzadas.'
            }
          ],
          educacion: [
            {
              titulo: `Técnico en ${prof.profession}`,
              institucion: 'SNPP - Servicio Nacional de Promoción Profesional',
              año: '2011 - 2012'
            },
            {
              titulo: 'Educación Secundaria',
              institucion: 'Colegio Nacional',
              año: '2006 - 2010'
            }
          ],
          certificaciones: [
            `Certificación Profesional en ${prof.profession}`,
            'Seguridad e Higiene en el Trabajo',
            'Atención al Cliente',
            'Primeros Auxilios Básicos'
          ],
        }
      })
    }
  }, [params.id])

  if (!professional) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse">Cargando curriculum...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Volver
          </button>
          <Logo size="small" />
          <div className="w-16"></div>
        </div>
      </div>

      <main className="max-w-md mx-auto px-4 py-6 pb-20">
        {/* Header del CV */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl shadow-lg p-6 text-white mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-white border-4 border-white shadow-lg">
              <img 
                src={getAvatarUrl(professional.name, 80)}
                alt={professional.name}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  const initials = professional.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(professional.name)}&size=80&background=random&color=fff&bold=true`
                  target.onerror = () => {
                    target.style.display = 'none'
                    const parent = target.parentElement
                    if (parent) {
                      parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">${initials}</div>`
                    }
                  }
                }}
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-1">{professional.name}</h1>
              <p className="text-blue-100 font-semibold">{professional.profession}</p>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{professional.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>{professional.phone}</span>
            </div>
            {professional.verified && (
              <div className="flex items-center gap-2">
                <CheckCircle size={16} />
                <span>Perfil Verificado</span>
              </div>
            )}
          </div>
        </div>

        {/* Experiencia Laboral */}
        <section className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="text-blue-600" size={24} />
            <h2 className="text-xl font-bold text-gray-900">Experiencia Laboral</h2>
          </div>

          <div className="space-y-4">
            {professional.curriculum.experiencia.map((exp: any, index: number) => (
              <div key={index} className="border-l-2 border-blue-600 pl-4">
                <h3 className="font-bold text-gray-900">{exp.cargo}</h3>
                <p className="text-blue-600 font-semibold text-sm">{exp.empresa}</p>
                <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                  <Calendar size={14} />
                  <span>{exp.periodo}</span>
                </div>
                <p className="text-gray-600 text-sm">{exp.descripcion}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Educación */}
        <section className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="text-green-600" size={24} />
            <h2 className="text-xl font-bold text-gray-900">Educación</h2>
          </div>

          <div className="space-y-4">
            {professional.curriculum.educacion.map((edu: any, index: number) => (
              <div key={index} className="border-l-2 border-green-600 pl-4">
                <h3 className="font-bold text-gray-900">{edu.titulo}</h3>
                <p className="text-green-600 font-semibold text-sm">{edu.institucion}</p>
                <p className="text-gray-500 text-sm">{edu.año}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certificaciones */}
        <section className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Award className="text-yellow-600" size={24} />
            <h2 className="text-xl font-bold text-gray-900">Certificaciones</h2>
          </div>

          <div className="space-y-2">
            {professional.curriculum.certificaciones.map((cert: string, index: number) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={18} />
                <span className="text-gray-700">{cert}</span>
              </div>
            ))}
          </div>
        </section>


        {/* Botones de acción */}
        <div className="space-y-3">
          {/* WhatsApp y Llamar */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                const phone = professional.phone?.replace(/\s/g, '').replace(/^0/, '595')
                window.open(`https://wa.me/${phone}?text=Hola, vi tu curriculum en CONECTA y me interesa contratarte`, '_blank')
              }}
              className="py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-bold hover:shadow-lg transition-all"
            >
              WhatsApp
            </button>

            <button
              onClick={() => {
                if (professional.phone) {
                  window.location.href = `tel:${professional.phone.replace(/\s/g, '')}`
                }
              }}
              className="py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
            >
              Llamar
            </button>
          </div>

          <button
            onClick={() => router.push(`/professional/${professional.id}`)}
            className="w-full py-4 bg-white border-2 border-gray-900 text-gray-900 rounded-xl font-bold hover:bg-gray-50 transition-all"
          >
            Ver Perfil Completo
          </button>
        </div>
      </main>
    </div>
  )
}

