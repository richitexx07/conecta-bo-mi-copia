'use client'

import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { getAvatarUrl } from '@/lib/avatars'

// Fix para iconos de Leaflet en Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface MapViewProps {
  professionals: any[]
  userLocation?: { lat: number; lng: number }
  onProfessionalClick: (id: string) => void
}

function RecenterMap({ center }: { center: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, 13)
  }, [center, map])
  return null
}

const MapView: React.FC<MapViewProps> = ({ professionals, userLocation, onProfessionalClick }) => {
  const center: [number, number] = userLocation 
    ? [userLocation.lat, userLocation.lng]
    : [-25.2637, -57.5759] // Asunción, Paraguay por defecto

  // Icono personalizado para usuario
  const userIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })

  // Icono para profesionales
  const professionalIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: '100%', width: '100%', minHeight: '400px' }}
      className="rounded-2xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <RecenterMap center={center} />

      {/* Marcador de usuario */}
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
          <Popup>
            <div className="text-center">
              <p className="font-bold text-blue-600">Tu ubicación</p>
            </div>
          </Popup>
        </Marker>
      )}

      {/* Marcadores de profesionales */}
      {professionals.map((prof) => {
        // Generar coordenadas cerca de Asunción para demo
        const baseLat = -25.2637
        const baseLng = -57.5759
        const randomLat = baseLat + (Math.random() - 0.5) * 0.1
        const randomLng = baseLng + (Math.random() - 0.5) * 0.1

        return (
          <Marker 
            key={prof.id} 
            position={[randomLat, randomLng]}
            icon={professionalIcon}
          >
            <Popup>
              <div className="text-center min-w-[150px]">
                <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-2 border-2 border-gray-200">
                  <img 
                    src={getAvatarUrl(prof.name, 64)}
                    alt={prof.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      const initials = prof.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(prof.name)}&size=64&background=random&color=fff&bold=true`
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
                <p className="font-bold text-gray-900">{prof.name}</p>
                <p className="text-sm text-gray-600">{prof.profession}</p>
                <p className="text-xs text-gray-500 mb-2">{prof.distance}</p>
                <button
                  onClick={() => onProfessionalClick(prof.id)}
                  className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700"
                >
                  Ver perfil
                </button>
              </div>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}

export default MapView

