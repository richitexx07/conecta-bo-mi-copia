'use client'

import React, { useState, useEffect } from 'react'
import Logo from '@/components/Logo'
import { Search, MapPin, Star, CheckCircle, Phone, Menu } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { professions } from '@/data/professions'
import { getProfessionals, initializeDemoData, getNearbyProfessionals } from '@/lib/professionals'
import { getAvatarUrl } from '@/lib/avatars'

export default function Home() {
  const router = useRouter()
  const [showSplash, setShowSplash] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [professionals, setProfessionals] = useState<any[]>([])
  const [filteredProfessionals, setFilteredProfessionals] = useState<any[]>([])
  const [showMenu, setShowMenu] = useState(false)

  // Efecto para el splash screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2500) // 2.5 segundos

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Inicializar datos de demo si es necesario
    initializeDemoData()
    
    // Cargar profesionales cercanos
    const nearby = getNearbyProfessionals(20)
    setProfessionals(nearby)
    setFilteredProfessionals(nearby)
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === '') {
      setFilteredProfessionals(professionals)
    } else {
      const filtered = professionals.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.profession.toLowerCase().includes(query.toLowerCase())
      )
      setFilteredProfessionals(filtered)
    }
  }

  const handleCategoryClick = (professionName: string) => {
    router.push(`/services?category=${encodeURIComponent(professionName)}`)
  }

  // Mostrar splash screen
  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-red-50 via-yellow-50 to-green-50 flex flex-col items-center justify-center z-50 animate-fadeIn">
        <div className="animate-scaleIn">
          <Logo size="large" className="animate-pulse" />
        </div>
        <div className="mt-8 animate-slideUp">
          <p className="text-2xl font-bold text-gray-800 text-center">
            Conectando Bolivia
          </p>
          <p className="text-lg text-gray-600 text-center mt-2">
            🇧🇴
          </p>
        </div>
        <div className="mt-12 w-64">
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 rounded-full animate-loading"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con logo y menú */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <Logo size="small" />
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
        
        {/* Menú desplegable */}
        {showMenu && (
          <div className="absolute top-full right-4 bg-white rounded-xl shadow-lg border border-gray-200 p-4 min-w-[200px] z-20">
            <button
              onClick={() => {
                router.push('/cooperativa')
                setShowMenu(false)
              }}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
            >
              🏦 Cooperativa Digital
            </button>
            <button
              onClick={() => {
                router.push('/services')
                setShowMenu(false)
              }}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 text-gray-700 font-medium mt-1"
            >
              🔍 Todos los Servicios
            </button>
            <button
              onClick={() => {
                router.push('/professional/profile')
                setShowMenu(false)
              }}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 text-gray-700 font-medium mt-1"
            >
              👤 Mi Perfil
            </button>
          </div>
        )}
      </div>

      <main className="max-w-md mx-auto px-4 pb-24">
        {/* 1. PRIMERO: Barra de búsqueda */}
        <div className="mt-4 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Buscar profesionales
          </h2>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar profesional o servicio..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-base rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 2. SEGUNDO: Categorías de profesionales */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Categorías
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {professions.slice(0, 12).map((profession) => (
              <button
                key={profession.id}
                onClick={() => handleCategoryClick(profession.name)}
                className="flex flex-col items-center"
              >
                <div 
                  className="w-full aspect-square rounded-2xl flex items-center justify-center mb-2 hover:shadow-md transition-shadow"
                  style={{ backgroundColor: profession.color }}
                >
                  <span className="text-4xl">{profession.icon}</span>
                </div>
                <span className="text-xs text-gray-700 text-center font-medium leading-tight">
                  {profession.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* 3. TERCERO: Lista de profesionales */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Profesionales cercanos
          </h2>
          <div className="space-y-3">
            {filteredProfessionals.length > 0 ? (
              filteredProfessionals.map((professional) => (
                <div
                  key={professional.id}
                  className="w-full bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3 mb-3">
                    {/* Avatar del profesional - siempre visible */}
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-white border-2 border-gray-200 flex-shrink-0">
                      <img 
                        src={getAvatarUrl(professional.name, 64)}
                        alt={professional.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          // Fallback mejorado si la imagen no carga
                          const target = e.target as HTMLImageElement
                          // Intentar con otro servicio
                          const initials = professional.name
                            .split(' ')
                            .map((n: string) => n[0])
                            .join('')
                            .toUpperCase()
                            .slice(0, 2)
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(professional.name)}&size=64&background=random&color=fff&bold=true`
                          target.onerror = () => {
                            // Si también falla, mostrar iniciales con CSS
                            target.style.display = 'none'
                            const parent = target.parentElement
                            if (parent) {
                              parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">${initials}</div>`
                            }
                          }
                        }}
                      />
                    </div>

                    {/* Información del profesional */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-gray-900 truncate">
                            {professional.name}
                          </h3>
                          {professional.verified && (
                            <CheckCircle className="text-blue-600 flex-shrink-0" size={18} />
                          )}
                        </div>
                        <span className="text-sm text-gray-500 flex-shrink-0 ml-2">
                          {professional.distance}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2 text-sm">{professional.profession}</p>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < Math.floor(professional.rating || 0)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">
                          {professional.rating?.toFixed(1) || '0.0'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Botón de acción */}
                  <button
                    onClick={() => router.push(`/professional/${professional.id}`)}
                    className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone size={16} />
                    Contactar
                  </button>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                <p className="text-gray-600">No se encontraron profesionales</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
