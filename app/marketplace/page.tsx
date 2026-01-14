'use client'

import React from 'react'
import Header from '@/components/Header'
import { Store, ShoppingCart, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function MarketplacePage() {
  const router = useRouter()

  const categories = [
    { name: 'Herramientas', icon: '🔧' },
    { name: 'Insumos', icon: '📦' },
    { name: 'Equipos', icon: '⚙️' },
    { name: 'Ropa de trabajo', icon: '👔' },
  ]

  const products = [
    {
      id: 1,
      name: 'Martillo profesional',
      price: 'Gs. 85.000',
      image: '/placeholder-product.jpg',
      seller: 'Ferretería El Constructor',
    },
    {
      id: 2,
      name: 'Taladro eléctrico',
      price: 'Gs. 450.000',
      image: '/placeholder-product.jpg',
      seller: 'Herramientas PY',
    },
    {
      id: 3,
      name: 'Overol de trabajo',
      price: 'Gs. 120.000',
      image: '/placeholder-product.jpg',
      seller: 'Ropa Laboral',
    },
  ]

  return (
    <div className="min-h-screen bg-conecta-light">
      <Header />
      
      <main className="max-w-md mx-auto px-4 py-6">
        {/* Botón volver */}
        <button
          onClick={() => router.back()}
          className="mb-4 p-2 text-gray-600 hover:text-conecta-blue"
        >
          <ArrowLeft size={24} />
        </button>
        
        {/* Título */}
        <div className="flex items-center gap-3 mb-6">
          <Store className="text-conecta-blue" size={32} />
          <h1 className="text-2xl font-bold text-gray-800">Marketplace</h1>
        </div>
        
        {/* Categorías */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Categorías
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <span className="text-sm font-medium text-gray-800">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </section>
        
        {/* Productos destacados */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Productos destacados
          </h2>
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm p-4 flex gap-4"
              >
                <div className="w-24 h-24 bg-gray-200 rounded-xl flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{product.seller}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-conecta-blue">
                      {product.price}
                    </span>
                    <button className="bg-conecta-blue text-white rounded-lg px-4 py-2 text-sm font-semibold">
                      Ver
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Botón para vendedores */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6 text-center">
          <p className="text-gray-600 mb-4">
            ¿Quieres vender en el marketplace?
          </p>
          <button className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold">
            Crear perfil de vendedor
          </button>
        </div>
      </main>
    </div>
  )
}

