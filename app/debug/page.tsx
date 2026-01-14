'use client'

import React, { useState, useEffect } from 'react'
import { getProfessionals } from '@/lib/professionals'

export default function DebugPage() {
  const [professionals, setProfessionals] = useState<any[]>([])
  const [localStorageData, setLocalStorageData] = useState<string>('')

  useEffect(() => {
    const loadData = () => {
      const pros = getProfessionals()
      setProfessionals(pros)
      
      const raw = localStorage.getItem('conecta_professionals')
      setLocalStorageData(raw || 'No hay datos')
    }
    
    loadData()
    const interval = setInterval(loadData, 1000)
    
    return () => clearInterval(interval)
  }, [])

  const clearData = () => {
    if (confirm('¿Estás seguro de que quieres borrar todos los profesionales?')) {
      localStorage.removeItem('conecta_professionals')
      setProfessionals([])
      setLocalStorageData('No hay datos')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Debug - Profesionales</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Profesionales guardados: {professionals.length}
            </h2>
            <button
              onClick={clearData}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Limpiar datos
            </button>
          </div>
          
          {professionals.length > 0 ? (
            <div className="space-y-4">
              {professionals.map((prof, index) => (
                <div key={prof.id} className="border p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">
                    #{index + 1}: {prof.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><strong>ID:</strong> {prof.id}</div>
                    <div><strong>Profesión:</strong> {prof.profession}</div>
                    <div><strong>Ubicación:</strong> {prof.location}</div>
                    <div><strong>Verificado:</strong> {prof.verified ? 'Sí' : 'No'}</div>
                    <div><strong>Rating:</strong> {prof.rating || 0}</div>
                    <div><strong>Creado:</strong> {new Date(prof.createdAt).toLocaleString()}</div>
                  </div>
                  {prof.description && (
                    <div className="mt-2 text-sm">
                      <strong>Descripción:</strong> {prof.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No hay profesionales guardados</p>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Datos en localStorage (raw)</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs">
            {localStorageData}
          </pre>
        </div>
      </div>
    </div>
  )
}

