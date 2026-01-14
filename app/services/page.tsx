'use client'

import React, { useState, useEffect } from 'react'
import Header from '@/components/Header'
import { ArrowLeft, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { professions } from '@/data/professions'
import ServiceCategory from '@/components/ServiceCategory'
import ProfessionalCard from '@/components/ProfessionalCard'
import { getProfessionalsByCategory, getProfessionals } from '@/lib/professionals'
import { getAvatarUrl } from '@/lib/avatars'

export default function ServicesPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryProfessionals, setCategoryProfessionals] = useState<any[]>([])

  const filteredProfessions = professions.filter((profession) =>
    profession.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    if (selectedCategory) {
      const categoryName = professions.find(p => p.id === selectedCategory)?.name || ''
      const professionals = getProfessionalsByCategory(categoryName)
      setCategoryProfessionals(professionals)
    }
  }, [selectedCategory])

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
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Todos los Servicios
        </h1>
        
        {/* Buscador */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar servicio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-conecta-blue focus:outline-none bg-white"
            />
          </div>
        </div>
        
        {/* Categorías */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {filteredProfessions.map((profession) => (
            <ServiceCategory
              key={profession.id}
              name={profession.name}
              icon={profession.icon}
              onClick={() => setSelectedCategory(profession.id)}
            />
          ))}
        </div>
        
        {/* Profesionales de la categoría seleccionada */}
        {selectedCategory && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Profesionales disponibles
            </h2>
            {categoryProfessionals.length > 0 ? (
              <div className="space-y-2">
                {categoryProfessionals.map((professional) => (
                  <ProfessionalCard
                    key={professional.id}
                    name={professional.name}
                    profession={professional.profession}
                    location={professional.location}
                    distance={professional.distance}
                    rating={professional.rating}
                    verified={professional.verified}
                    price={professional.price}
                    photo={getAvatarUrl(professional.name, 80)}
                    onClick={() => router.push(`/professional/${professional.id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <p className="text-gray-600 mb-4">
                  Aún no hay profesionales registrados en esta categoría
                </p>
                <p className="text-sm text-gray-500">
                  Sé el primero en registrarte como {professions.find((p) => p.id === selectedCategory)?.name}
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

