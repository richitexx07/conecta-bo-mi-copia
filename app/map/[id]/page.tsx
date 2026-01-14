'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, MapPin, Phone, Navigation } from 'lucide-react'
import { getProfessionalById, getProfessionals } from '@/lib/professionals'
import dynamic from 'next/dynamic'

// Importar MapView dinámicamente para evitar problemas con SSR
const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-200 rounded-2xl flex items-center justify-center">
      <p className="text-gray-600">Cargando mapa...</p>
    </div>
  )
})

export default function MapPage() {
  const params = useParams()
  const router = useRouter()
  const [professional, setProfessional] = useState<any>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | undefined>(undefined)
  const [professionals, setProfessionals] = useState<any[]>([])
  const [locationError, setLocationError] = useState('')

  useEffect(() => {
    // Obtener el profesional específico
    const id = params.id as string
    const prof = getProfessionalById(id)
    setProfessional(prof)

    // Obtener todos los profesionales para mostrar en el mapa
    const allProfs = getProfessionals()
    setProfessionals(allProfs)

    // Intentar obtener la ubicación del usuario
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error('Error obteniendo ubicación:', error)
          setLocationError('No se pudo obtener tu ubicación. Se muestra Asunción por defecto.')
          // Usar ubicación por defecto (Asunción, Paraguay)
          setUserLocation({
            lat: -25.2637,
            lng: -57.5759
          })
        }
      )
    } else {
      setLocationError('Tu navegador no soporta geolocalización.')
      setUserLocation({
        lat: -25.2637,
        lng: -57.5759
      })
    }
  }, [params.id])

  if (!professional) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Profesional no encontrado</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  const handleProfessionalClick = (id: string) => {
    router.push(`/professional/${id}`)
  }

  const openGoogleMaps = () => {
    // Para demo, usar coordenadas de Asunción
    const lat = userLocation?.lat || -25.2637
    const lng = userLocation?.lng || -57.5759
    window.open(`https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${lat + 0.01},${lng + 0.01}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Volver</span>
          </button>
          <h1 className="text-lg font-bold text-gray-800">Ubicación</h1>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Información del profesional */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl shadow-lg p-6 mb-4 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{professional.name}</h2>
              <p className="text-blue-100">{professional.profession}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{professional.location}</span>
            <span className="mx-2">•</span>
            <span className="font-semibold">{professional.distance}</span>
          </div>
        </div>

        {/* Alerta de ubicación si hay error */}
        {locationError && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <Navigation className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">{locationError}</p>
              </div>
            </div>
          </div>
        )}

        {/* Mapa */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4" style={{ height: '500px' }}>
          <MapView
            professionals={professionals}
            userLocation={userLocation}
            onProfessionalClick={handleProfessionalClick}
          />
        </div>

        {/* Botones de acción */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => router.push(`/professional/${professional.id}`)}
            className="py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5" />
            Contactar
          </button>
          <button
            onClick={openGoogleMaps}
            className="py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <Navigation className="w-5 h-5" />
            Cómo llegar
          </button>
        </div>

        {/* Información adicional */}
        <div className="mt-4 bg-gray-50 rounded-xl p-4">
          <h3 className="font-bold text-gray-900 mb-2">📍 Información de ubicación</h3>
          <p className="text-sm text-gray-600 mb-2">
            Los marcadores rojos muestran profesionales disponibles en tu área.
          </p>
          <p className="text-sm text-gray-600">
            El marcador azul es tu ubicación actual (si activaste la geolocalización).
          </p>
        </div>
      </div>
    </div>
  )
}
