'use client'

import React, { useState } from 'react'
import Logo from '@/components/Logo'
import { ArrowRight, ArrowLeft, Camera, Briefcase } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { professions } from '@/data/professions'

export default function ProfessionalSetupPage() {
  const router = useRouter()
  const [selectedProfession, setSelectedProfession] = useState<string>('')
  const [step, setStep] = useState(1)

  const handleContinue = () => {
    if (step === 1 && selectedProfession) {
      setStep(2)
    } else if (step === 2) {
      router.push('/professional/profile')
    }
  }

  return (
    <div className="min-h-screen bg-conecta-light flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Logo size="medium" />
        </div>
        
        {/* Indicador de progreso */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Paso {step} de 2
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round((step / 2) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-conecta-blue h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 2) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Contenido */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                ¿Cuál es tu profesión?
              </h2>
              
              <div className="grid grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                {professions.map((profession) => (
                  <button
                    key={profession.id}
                    onClick={() => setSelectedProfession(profession.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedProfession === profession.id
                        ? 'border-conecta-blue bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className={`mb-2 ${
                      selectedProfession === profession.id
                        ? 'text-conecta-blue'
                        : 'text-gray-400'
                    }`}>
                      {profession.icon}
                    </div>
                    <span className={`text-xs font-medium ${
                      selectedProfession === profession.id
                        ? 'text-conecta-blue'
                        : 'text-gray-600'
                    }`}>
                      {profession.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                Completa tu perfil
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Foto de perfil
                  </label>
                  <label className="block">
                    <input
                      type="file"
                      accept="image/*"
                      capture="user"
                      className="hidden"
                    />
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-conecta-blue transition-colors">
                      <Camera className="mx-auto text-gray-400 mb-2" size={48} />
                      <p className="text-sm text-gray-600">Toca para tomar foto</p>
                    </div>
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción de tus servicios
                  </label>
                  <textarea
                    placeholder="Describe los servicios que ofreces..."
                    className="w-full px-4 py-3 text-lg rounded-xl border-2 border-gray-200 focus:border-conecta-blue focus:outline-none resize-none"
                    rows={4}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Precio base (opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Gs. 150.000"
                    className="w-full px-4 py-3 text-lg rounded-xl border-2 border-gray-200 focus:border-conecta-blue focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Botones de navegación */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors"
              >
                <ArrowLeft size={20} />
                Atrás
              </button>
            )}
            <button
              onClick={handleContinue}
              disabled={step === 1 && !selectedProfession}
              className="flex-1 py-4 bg-conecta-blue text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {step === 2 ? 'Finalizar' : 'Continuar'}
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

