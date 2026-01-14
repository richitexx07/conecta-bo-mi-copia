'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getProfessionalById, Professional } from '@/lib/professionals'
import { getAvatarUrl } from '@/lib/avatars'
import Logo from '@/components/Logo'
import { ArrowLeft, CreditCard, Building2, Smartphone, CheckCircle2, Loader2 } from 'lucide-react'

export default function PaymentPage() {
  const router = useRouter()
  const params = useParams()
  const [professional, setProfessional] = useState<Professional | null>(null)
  const [selectedMethod, setSelectedMethod] = useState<string>('')
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [transactionNumber, setTransactionNumber] = useState('')

  useEffect(() => {
    const id = params.id as string
    const prof = getProfessionalById(id)
    if (prof) {
      setProfessional(prof)
    }
  }, [params.id])

  const paymentMethods = [
    {
      id: 'yape',
      name: 'Yape',
      icon: <Smartphone size={24} />,
      description: 'Pago con QR - Sin comisiones',
      color: 'from-yellow-500 to-orange-600',
    },
    {
      id: 'qr',
      name: 'Pago con QR',
      icon: <Smartphone size={24} />,
      description: 'Código QR interbancario',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'card',
      name: 'Tarjeta de Crédito/Débito',
      icon: <CreditCard size={24} />,
      description: 'Visa, Mastercard',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      id: 'bank',
      name: 'Transferencia Bancaria',
      icon: <Building2 size={24} />,
      description: 'Banco Nacional, Mercantil SC, Ganadero, BCP',
      color: 'from-green-500 to-green-600',
    },
    {
      id: 'billetera',
      name: 'Billetera Digital',
      icon: <Smartphone size={24} />,
      description: 'Simple, BCP Móvil, Banco Unión',
      color: 'from-purple-500 to-purple-600',
    },
  ]

  const handlePayment = () => {
    if (!selectedMethod) {
      alert('Por favor selecciona un método de pago')
      return
    }

    setProcessing(true)
    
    // Simular procesamiento de pago
    setTimeout(() => {
      const txNumber = `CONECTA-${Date.now().toString().slice(-8)}`
      setTransactionNumber(txNumber)
      setProcessing(false)
      setSuccess(true)
    }, 3000)
  }

  if (!professional) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    )
  }

  // Pantalla de éxito
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle2 className="text-white" size={48} />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Pago Exitoso!
          </h1>
          
          <p className="text-gray-600 mb-6">
            Tu pago ha sido procesado correctamente
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white border-2 border-gray-200">
                <img 
                  src={getAvatarUrl(professional.name, 64)}
                  alt={professional.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    const initials = professional.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(professional.name)}&size=64&background=random&color=fff&bold=true`
                    target.onerror = () => {
                      target.style.display = 'none'
                      const parent = target.parentElement
                      if (parent) {
                        parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">${initials}</div>`
                      }
                    }
                  }}
                />
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-900">{professional.name}</p>
                <p className="text-sm text-gray-600">{professional.profession}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Monto pagado:</span>
                <span className="font-bold text-gray-900">{professional.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">N° de transacción:</span>
                <span className="font-mono text-sm font-bold text-blue-600">{transactionNumber}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                const phone = professional.phone?.replace(/\s/g, '').replace(/^0/, '595')
                window.open(`https://wa.me/${phone}?text=Hola, ya realicé el pago. Número de transacción: ${transactionNumber}`, '_blank')
              }}
              className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-bold hover:shadow-lg transition-all"
            >
              Contactar al profesional
            </button>
            
            <button
              onClick={() => router.push('/')}
              className="w-full py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Pantalla de procesamiento
  if (processing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <Loader2 className="animate-spin text-blue-600 mx-auto mb-6" size={64} />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Procesando pago...
          </h2>
          <p className="text-gray-600">
            Por favor espera mientras confirmamos tu transacción
          </p>
        </div>
      </div>
    )
  }

  // Pantalla principal de pago
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={24} />
          </button>
          <Logo size="small" />
          <div className="w-6"></div>
        </div>
      </div>

      <main className="max-w-md mx-auto px-4 py-6 pb-24">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Realizar Pago
        </h1>

        {/* Resumen del profesional */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <p className="text-sm text-gray-500 mb-4">Pagar a:</p>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-white border-2 border-gray-200 flex-shrink-0">
              <img 
                src={getAvatarUrl(professional.name, 64)}
                alt={professional.name}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  const initials = professional.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(professional.name)}&size=64&background=random&color=fff&bold=true`
                  target.onerror = () => {
                    target.style.display = 'none'
                    const parent = target.parentElement
                    if (parent) {
                      parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">${initials}</div>`
                    }
                  }
                }}
              />
            </div>
            <div>
              <h3 className="font-bold text-xl text-gray-900">{professional.name}</h3>
              <p className="text-gray-600">{professional.profession}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Monto a pagar:</span>
              <span className="text-3xl font-bold text-blue-600">{professional.price}</span>
            </div>
          </div>
        </div>

        {/* Métodos de pago */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Selecciona método de pago
        </h2>

        <div className="space-y-3 mb-6">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                selectedMethod === method.id
                  ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center text-white`}>
                  {method.icon}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{method.name}</p>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
                {selectedMethod === method.id && (
                  <CheckCircle2 className="text-blue-600" size={24} />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Nota informativa */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>💡 Nota:</strong> Este es un demo. No se realizarán cargos reales. 
            El pago es simulado para demostración.
          </p>
        </div>

        {/* Botón de pagar */}
        <button
          onClick={handlePayment}
          disabled={!selectedMethod}
          className={`w-full py-5 rounded-2xl font-bold text-xl shadow-lg transition-all ${
            selectedMethod
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-xl active:scale-95'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {selectedMethod ? 'Confirmar Pago' : 'Selecciona un método de pago'}
        </button>
      </main>
    </div>
  )
}

