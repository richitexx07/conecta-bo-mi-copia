'use client'

import React from 'react'
import Header from '@/components/Header'
import { GraduationCap, ArrowLeft, BookOpen, Award, Clock, DollarSign } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CoursesPage() {
  const router = useRouter()

  const institutions = [
    {
      name: 'Ministerio de Industria y Trabajo',
      logo: '🏛️',
      courses: 12,
    },
    {
      name: 'SNPP',
      logo: '📚',
      courses: 25,
    },
    {
      name: 'Asociación Nacional Republicana',
      logo: '🏛️',
      courses: 8,
    },
    {
      name: 'Banco Nacional de Fomento',
      logo: '🏦',
      courses: 15,
    },
  ]

  const courses = [
    {
      id: 1,
      title: 'Curso de Plomería Básica',
      institution: 'SNPP',
      duration: '40 horas',
      price: 'Gratis',
      type: 'free',
      certification: true,
    },
    {
      id: 2,
      title: 'Electricidad Residencial Avanzada',
      institution: 'Ministerio de Industria',
      duration: '60 horas',
      price: 'Gs. 200.000',
      type: 'paid',
      certification: true,
    },
    {
      id: 3,
      title: 'Carpintería Moderna',
      institution: 'SNPP',
      duration: '80 horas',
      price: 'Gratis',
      type: 'free',
      certification: true,
    },
    {
      id: 4,
      title: 'Gestión de Pequeños Negocios',
      institution: 'Banco Nacional de Fomento',
      duration: '30 horas',
      price: 'Gs. 150.000',
      type: 'paid',
      certification: true,
    },
  ]

  return (
    <div className="min-h-screen bg-conecta-light">
      <Header />
      
      <main className="max-w-md mx-auto px-4 py-6">
        {/* Botón volver */}
        <button
          onClick={() => router.back()}
          className="mb-4 p-2 text-gray-600 hover:text-conecta-blue"
        >
          <ArrowLeft size={24} />
        </button>
        
        {/* Título */}
        <div className="flex items-center gap-3 mb-6">
          <GraduationCap className="text-conecta-blue" size={32} />
          <h1 className="text-2xl font-bold text-gray-800">Cursos y Capacitaciones</h1>
        </div>
        
        {/* Alianzas Institucionales */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Alianzas Institucionales
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {institutions.map((institution, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-4 text-center"
              >
                <div className="text-4xl mb-2">{institution.logo}</div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">
                  {institution.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {institution.courses} cursos disponibles
                </p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Cursos disponibles */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Cursos Disponibles
          </h2>
          <div className="space-y-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-sm p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-800 flex-1">
                    {course.title}
                  </h3>
                  {course.certification && (
                    <Award className="text-yellow-500 flex-shrink-0 ml-2" size={20} />
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">{course.institution}</p>
                
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock size={16} />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <DollarSign size={16} />
                    <span className={course.type === 'free' ? 'text-green-600 font-semibold' : ''}>
                      {course.price}
                    </span>
                  </div>
                </div>
                
                <button className="w-full py-2 bg-conecta-blue text-white rounded-lg font-semibold text-sm">
                  Ver detalles
                </button>
              </div>
            ))}
          </div>
        </section>
        
        {/* Filtros */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-4">
          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-conecta-blue text-white rounded-lg font-semibold text-sm">
              Gratuitos
            </button>
            <button className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold text-sm">
              Pagos
            </button>
            <button className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold text-sm">
              Con certificación
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

