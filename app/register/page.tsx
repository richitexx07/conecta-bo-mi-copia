'use client'

import React, { useState } from 'react'
import Logo from '@/components/Logo'
import { ArrowRight, ArrowLeft, Camera, MapPin, Mail, Phone, CreditCard } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    cedula: '',
    email: '',
    phone: '',
    location: '',
    cedulaPhoto: null as File | null,
  })
  const [loading, setLoading] = useState(false)
  const [locationError, setLocationError] = useState<string>('')
  const [locationLoading, setLocationLoading] = useState(false)

  const handleInputChange = (field: string, value: string | File) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleInputChange('cedulaPhoto', file)
    }
  }

  const requestLocation = () => {
    setLocationLoading(true)
    setLocationError('')
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Aquí se procesaría la ubicación
          const lat = position.coords.latitude
          const lon = position.coords.longitude
          handleInputChange('location', `Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}`)
          setLocationLoading(false)
        },
        (error) => {
          setLocationLoading(false)
          let errorMessage = 'No se pudo obtener la ubicación'
          
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Permiso de ubicación denegado. Puedes continuar sin ubicación.'
              break
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Ubicación no disponible. Puedes continuar sin ubicación.'
              break
            case error.TIMEOUT:
              errorMessage = 'Tiempo de espera agotado. Puedes continuar sin ubicación.'
              break
          }
          
          setLocationError(errorMessage)
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 60000,
        }
      )
    } else {
      setLocationLoading(false)
      setLocationError('Tu navegador no soporta geolocalización. Puedes continuar sin ubicación.')
    }
  }

  const handleNext = () => {
    if (step === 1 && formData.cedula && formData.cedulaPhoto) {
      setStep(2)
    } else if (step === 2 && formData.email && formData.phone) {
      // Avanzar al paso 3 y solicitar ubicación automáticamente
      setStep(3)
      requestLocation()
    } else if (step === 3) {
      // Finalizar registro y redirigir a selección de rol (con o sin ubicación)
      router.push('/select-role')
    }
  }

  const skipLocation = () => {
    // Permitir continuar sin ubicación
    handleInputChange('location', 'Ubicación no proporcionada')
    router.push('/select-role')
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
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
              Paso {step} de 3
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round((step / 3) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-conecta-blue h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                Cédula de Identidad
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de cédula
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={formData.cedula}
                    onChange={(e) => handleInputChange('cedula', e.target.value)}
                    placeholder="1234567"
                    required
                    className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-conecta-blue focus:outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Foto de la cédula (frente)
                </label>
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-conecta-blue transition-colors">
                    {formData.cedulaPhoto ? (
                      <div className="space-y-2">
                        <Camera className="mx-auto text-green-500" size={48} />
                        <p className="text-sm text-gray-600">
                          {formData.cedulaPhoto.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Toca para cambiar
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Camera className="mx-auto text-gray-400" size={48} />
                        <p className="text-sm text-gray-600">
                          Toca para tomar foto
                        </p>
                        <p className="text-xs text-gray-500">
                          o selecciona desde galería
                        </p>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                Contacto
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="tu@email.com"
                    required
                    className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-conecta-blue focus:outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de celular
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="0981 234 567"
                    required
                    className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-conecta-blue focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                Ubicación
              </h2>
              
              <div className="text-center space-y-4">
                <MapPin className={`mx-auto ${formData.location ? 'text-green-500' : 'text-conecta-blue'}`} size={64} />
                
                {locationLoading ? (
                  <div className="space-y-2">
                    <p className="text-gray-600">Obteniendo tu ubicación...</p>
                    <div className="w-8 h-8 border-4 border-conecta-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
                  </div>
                ) : formData.location ? (
                  <div className="space-y-2">
                    <p className="text-green-600 font-semibold">✓ Ubicación obtenida</p>
                    <p className="text-sm text-gray-500">{formData.location}</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-gray-600">No se pudo obtener la ubicación automáticamente</p>
                    {locationError && (
                      <p className="text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
                        {locationError}
                      </p>
                    )}
                  </div>
                )}
                
                <p className="text-sm text-gray-500">
                  Tu ubicación nos ayuda a mostrarte profesionales cercanos. Es opcional.
                </p>
                
                {!formData.location && !locationLoading && (
                  <button
                    onClick={requestLocation}
                    className="w-full py-3 bg-conecta-blue text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Intentar obtener ubicación nuevamente
                  </button>
                )}
              </div>
            </div>
          )}
          
          {/* Botones de navegación */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors"
              >
                <ArrowLeft size={20} />
                Atrás
              </button>
            )}
            {step === 3 ? (
              <>
                <button
                  onClick={skipLocation}
                  className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Omitir ubicación
                </button>
                <button
                  onClick={handleNext}
                  disabled={loading}
                  className="flex-1 py-4 bg-conecta-blue text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  Finalizar
                  <ArrowRight size={20} />
                </button>
              </>
            ) : (
              <button
                onClick={handleNext}
                disabled={loading}
                className="flex-1 py-4 bg-conecta-blue text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                Continuar
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
        
        {/* Link a login */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link
              href="/login"
              className="text-conecta-blue font-semibold hover:underline"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

