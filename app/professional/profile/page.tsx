'use client'

import React, { useState, useEffect } from 'react'
import Header from '@/components/Header'
import { CheckCircle, Clock, MapPin, Star, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { saveProfessional, updateProfessional, getProfessionalById } from '@/lib/professionals'

export default function ProfessionalProfileEditPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [professionalId, setProfessionalId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    profession: '',
    location: '',
    schedule: '',
    description: '',
  })

  useEffect(() => {
    // Intentar cargar perfil existente desde localStorage
    const savedProfessionals = JSON.parse(localStorage.getItem('conecta_professionals') || '[]')
    const lastProfessional = savedProfessionals[savedProfessionals.length - 1]
    
    if (lastProfessional) {
      setProfessionalId(lastProfessional.id)
      setFormData({
        name: lastProfessional.name || '',
        profession: lastProfessional.profession || '',
        location: lastProfessional.location || '',
        schedule: lastProfessional.schedule || '',
        description: lastProfessional.description || '',
      })
    } else {
      // Valores por defecto si no hay perfil guardado
      setFormData({
        name: 'Juan Pérez',
        profession: 'Plomero Profesional',
        location: 'Asunción, Paraguay',
        schedule: 'Lun - Vie: 8:00 - 18:00',
        description: '',
      })
    }
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setLoading(true)
    
    try {
      let savedProfessional
      if (professionalId) {
        // Actualizar perfil existente
        savedProfessional = updateProfessional(professionalId, {
          name: formData.name,
          profession: formData.profession,
          location: formData.location,
          schedule: formData.schedule,
          description: formData.description,
          verified: true,
        })
        console.log('Perfil actualizado:', savedProfessional)
      } else {
        // Crear nuevo perfil
        savedProfessional = saveProfessional({
          name: formData.name,
          profession: formData.profession,
          location: formData.location,
          schedule: formData.schedule,
          description: formData.description,
          verified: true,
          rating: 0,
        })
        setProfessionalId(savedProfessional.id)
        console.log('Nuevo perfil guardado:', savedProfessional)
      }
      
      // Disparar evento personalizado para actualizar el home
      window.dispatchEvent(new Event('professionalSaved'))
      
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      setLoading(false)
      setSaved(true)
      
      // Mostrar mensaje de éxito y redirigir después de 2 segundos
      setTimeout(() => {
        router.push('/')
      }, 2000)
    } catch (error) {
      console.error('Error al guardar perfil:', error)
      setLoading(false)
      alert('Error al guardar el perfil. Por favor, intenta nuevamente.')
    }
  }

  return (
    <div className="min-h-screen bg-conecta-light">
      <Header />
      
      <main className="max-w-md mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Mi Perfil Profesional
        </h1>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="text-center mb-6">
            <div className="w-32 h-32 rounded-full bg-conecta-blue mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-4xl font-bold">U</span>
            </div>
            <button className="text-conecta-blue font-semibold">
              Cambiar foto
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre completo
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-conecta-blue focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profesión
              </label>
              <input
                type="text"
                value={formData.profession}
                onChange={(e) => handleInputChange('profession', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-conecta-blue focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación
              </label>
              <div className="flex items-center gap-2">
                <MapPin className="text-gray-400" size={20} />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-conecta-blue focus:outline-none"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Horario de atención
              </label>
              <div className="flex items-center gap-2">
                <Clock className="text-gray-400" size={20} />
                <input
                  type="text"
                  value={formData.schedule}
                  onChange={(e) => handleInputChange('schedule', e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-conecta-blue focus:outline-none"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe tus servicios..."
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-conecta-blue focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Estado de verificación
          </h2>
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle size={24} />
            <span className="font-semibold">Perfil verificado</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Tu cédula de identidad ha sido validada
          </p>
        </div>
        
        {saved ? (
          <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 text-green-600">
              <Check size={24} />
              <span className="font-semibold">¡Perfil guardado exitosamente!</span>
            </div>
            <p className="text-sm text-green-600 mt-2">
              Redirigiendo al inicio...
            </p>
          </div>
        ) : (
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full py-4 bg-conecta-blue text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Guardando...
              </>
            ) : (
              'Guardar cambios'
            )}
          </button>
        )}
      </main>
    </div>
  )
}

