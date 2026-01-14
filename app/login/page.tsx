'use client'

import React, { useState } from 'react'
import Logo from '@/components/Logo'
import { Mail, Facebook, Instagram, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Lógica de login
    setTimeout(() => setLoading(false), 1000)
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
          Bienvenido a CONECTA
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Conectando trabajadores de manos medias en Paraguay
        </p>
        
        {/* Formulario de login */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-conecta-blue focus:outline-none"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-conecta-blue text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Ingresando...' : 'Continuar'}
              <ArrowRight size={20} />
            </button>
          </form>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">O continúa con</span>
            </div>
          </div>
          
          {/* Login con redes sociales */}
          <div className="space-y-3">
            <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-blue-700 transition-colors">
              <Facebook size={24} />
              Continuar con Facebook
            </button>
            
            <button className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold flex items-center justify-center gap-3 hover:opacity-90 transition-opacity">
              <Instagram size={24} />
              Continuar con Instagram
            </button>
          </div>
        </div>
        
        {/* Link a registro */}
        <div className="text-center">
          <p className="text-gray-600 mb-2">¿No tienes cuenta?</p>
          <Link
            href="/register"
            className="text-conecta-blue font-semibold text-lg hover:underline"
          >
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  )
}

