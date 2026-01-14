'use client'

import React, { useState } from 'react'
import Logo from '@/components/Logo'
import { CheckCircle, Heart, Wallet, Smartphone, Gift, Phone, ArrowLeft, Menu } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function CooperativaPage() {
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Header con logo y menú */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <Logo size="small" />
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>
        
        {/* Menú desplegable */}
        {showMenu && (
          <div className="absolute top-full right-4 bg-white rounded-xl shadow-lg border border-gray-200 p-4 min-w-[200px] z-20">
            <button
              onClick={() => {
                router.push('/')
                setShowMenu(false)
              }}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
            >
              🏠 Inicio
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
        {/* Título */}
        <div className="mt-6 mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            Cooperativa Digital
          </h1>
          <p className="text-gray-600">
            Servicios financieros y beneficios exclusivos
          </p>
        </div>

        {/* Logo centrado */}
        <div className="flex flex-col items-center justify-center my-8">
          <Logo size="large" />
          <div className="mt-4 text-center">
            <p className="text-xl font-bold text-black lowercase">conecta-bo</p>
            <p className="text-sm text-gray-600 mt-1">Cooperativa Digital Boliviana</p>
          </div>
        </div>

        {/* Lista de opciones */}
        <div className="space-y-4 mt-8">
          {/* Aporte Solidario */}
          <div className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <Heart className="text-green-600" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-black">Aporte Solidario</h3>
              <p className="text-sm text-gray-600">Realiza un aporte mensual solidario</p>
            </div>
            <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
          </div>

          {/* Préstamos */}
          <div className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Wallet className="text-blue-600" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-black">Préstamos</h3>
              <p className="text-sm text-gray-600">Accede a préstamos rápidos y accesibles</p>
            </div>
            <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
          </div>

          {/* Billetera Digital */}
          <div className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Smartphone className="text-blue-600" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-black">Billetera Digital</h3>
              <p className="text-sm text-gray-600">Envía y recibe dinero desde una billetera digital eficiente</p>
            </div>
            <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
          </div>

          {/* Beneficios */}
          <div className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
              <Gift className="text-yellow-600" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-black">Beneficios</h3>
              <p className="text-sm text-gray-600">Accede a sistemas de ahorro y descuentos exclusivos</p>
            </div>
            <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
          </div>
        </div>

        {/* Botón Contactar */}
        <div className="mt-8">
          <button
            onClick={() => router.push('/')}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Phone size={20} />
            Volver a Profesionales
          </button>
        </div>
      </main>
    </div>
  )
}
