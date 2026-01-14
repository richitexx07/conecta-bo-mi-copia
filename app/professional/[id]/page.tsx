'use client'

import React, { useState, useEffect } from 'react'
import { 
  CheckCircle, 
  Phone, 
  ArrowLeft
} from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'
import { getProfessionalById, Professional } from '@/lib/professionals'
import { getAvatarUrl } from '@/lib/avatars'

export default function ProfessionalProfilePage() {
  const router = useRouter()
  const params = useParams()
  const [professional, setProfessional] = useState<Professional | null>(null)

  useEffect(() => {
    const id = params.id as string
    const prof = getProfessionalById(id)
    
    if (prof) {
      // Asegurar que tenga la estructura correcta
      setProfessional({
        ...prof,
        services: prof.services || [
          { name: 'Servicio principal', price: prof.price || 'Consultar' },
        ],
      })
    }
  }, [params.id])

  if (!professional) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse">Cargando...</div>
      </div>
    )
  }

  const handleContact = () => {
    if (professional.phone) {
      window.location.href = `tel:${professional.phone.replace(/\s/g, '')}`
    }
  }

  const handleWhatsApp = () => {
    if (professional.phone) {
      const phone = professional.phone.replace(/\s/g, '').replace(/^0/, '595')
      window.open(`https://wa.me/${phone}?text=Hola, vi tu perfil en CONECTA y me interesa tu servicio`, '_blank')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      <main className="max-w-md mx-auto px-6 pb-8">
        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Perfil
        </h1>

        {/* Foto de perfil */}
        <div className="flex justify-center mb-6">
          <div className="w-40 h-40 rounded-full bg-white shadow-lg overflow-hidden border-4 border-gray-100">
            <img 
              src={getAvatarUrl(professional.name, 160)}
              alt={professional.name}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                 const initials = professional.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(professional.name)}&size=160&background=random&color=fff&bold=true`
                target.onerror = () => {
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent) {
                    parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-4xl">${initials}</div>`
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Nombre y profesión */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">
            {professional.name}
          </h2>
          <p className="text-xl text-gray-600">
            {professional.profession}
          </p>
        </div>

        {/* Antecedentes policiales */}
        <div className="flex items-center justify-between py-4 border-b border-gray-200">
          <span className="text-lg font-semibold text-gray-900">
            Antecedentes policiales
          </span>
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="text-white" size={24} />
          </div>
        </div>

        {/* Horario de atención */}
        <div className="flex items-center justify-between py-4 border-b border-gray-200">
          <span className="text-lg font-semibold text-gray-900">
            Horario de atención
          </span>
          <span className="text-lg text-gray-600">
            {professional.schedule || '24 horas'}
          </span>
        </div>

        {/* Servicios */}
        {professional.services && professional.services.length > 0 && (
          <div className="mt-4">
            {professional.services.map((service, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between py-4 border-b border-gray-200"
              >
                <span className="text-lg font-semibold text-gray-900">
                  {service.name}
                </span>
                <span className="text-lg text-gray-600">
                  {service.price}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Botones de acción */}
        <div className="mt-8 space-y-3">
          <button
            onClick={() => router.push(`/professional/${professional.id}/curriculum`)}
            className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-base hover:bg-gray-800 transition-colors"
          >
            Ver curriculum
          </button>
          
          {/* WhatsApp y Llamar */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleWhatsApp}
              className="py-4 bg-green-600 text-white rounded-xl font-bold text-base hover:bg-green-700 transition-colors"
            >
              WhatsApp
            </button>
            <button
              onClick={handleContact}
              className="py-4 bg-blue-600 text-white rounded-xl font-bold text-base hover:bg-blue-700 transition-colors"
            >
              Llamar
            </button>
          </div>

          <button
            onClick={() => router.push(`/payment/${professional.id}`)}
            className="w-full py-4 bg-white border-2 border-gray-900 text-gray-900 rounded-xl font-bold text-base hover:bg-gray-50 transition-colors"
          >
            Pagar
          </button>
        </div>
      </main>
    </div>
  )
}
