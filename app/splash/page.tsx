'use client'

import React, { useEffect } from 'react'
import Logo from '@/components/Logo'
import { useRouter } from 'next/navigation'

export default function SplashPage() {
  const router = useRouter()

  useEffect(() => {
    // Simular carga inicial
    const timer = setTimeout(() => {
      router.push('/login')
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 flex flex-col items-center justify-center">
      <Logo size="large" className="animate-pulse" />
      <p className="mt-6 text-gray-600 text-lg font-semibold">Conectando Paraguay 🇵🇾</p>
      <div className="mt-8">
        <div className="w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-red-600 to-blue-600 rounded-full animate-pulse" style={{ width: '60%' }}></div>
        </div>
      </div>
    </div>
  )
}

