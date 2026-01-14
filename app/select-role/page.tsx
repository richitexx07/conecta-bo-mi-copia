'use client'

import React from 'react'
import Logo from '@/components/Logo'
import { Briefcase, User, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SelectRolePage() {
  const router = useRouter()

  const handleRoleSelection = (role: 'professional' | 'client') => {
    if (role === 'professional') {
      router.push('/professional/setup')
    } else {
      router.push('/')
    }
  }

  return (
    <div className="min-h-screen bg-conecta-light flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo size="large" />
        </div>
        
        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
          ¿Qué quieres hacer?
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Elige cómo quieres usar CONECTA
        </p>
        
        {/* Opciones de rol */}
        <div className="space-y-4">
          <button
            onClick={() => handleRoleSelection('professional')}
            className="w-full bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow text-left"
          >
            <div className="flex items-start gap-4">
              <div className="bg-conecta-blue rounded-xl p-4">
                <Briefcase className="text-white" size={32} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Quiero ofrecer servicios
                </h3>
                <p className="text-gray-600 mb-4">
                  Crea tu perfil profesional y comienza a recibir clientes
                </p>
                <div className="flex items-center text-conecta-blue font-semibold">
                  Continuar
                  <ArrowRight className="ml-2" size={20} />
                </div>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => handleRoleSelection('client')}
            className="w-full bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow text-left"
          >
            <div className="flex items-start gap-4">
              <div className="bg-green-600 rounded-xl p-4">
                <User className="text-white" size={32} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Quiero contratar servicios
                </h3>
                <p className="text-gray-600 mb-4">
                  Encuentra profesionales cerca de ti
                </p>
                <div className="flex items-center text-green-600 font-semibold">
                  Continuar
                  <ArrowRight className="ml-2" size={20} />
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

