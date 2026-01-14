'use client'

import React from 'react'
import { MapPin, Star, CheckCircle, Phone } from 'lucide-react'

interface ProfessionalCardProps {
  name: string
  profession: string
  location: string
  distance?: string
  rating?: number
  verified?: boolean
  photo?: string
  price?: string
  onClick?: () => void
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  name,
  profession,
  location,
  distance,
  rating = 0,
  verified = false,
  photo,
  price,
  onClick,
}) => {
  return (
    <div className="w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 mb-4">
      <div className="flex gap-4 mb-3">
        {photo ? (
          <img
            src={photo}
            alt={name}
            className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-gray-200"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0"></div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 truncate">
                {name}
              </h3>
              {verified && (
                <CheckCircle className="text-blue-600 flex-shrink-0" size={18} />
              )}
            </div>
            <span className="text-sm text-gray-500 flex-shrink-0 ml-2">
              {distance}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            {profession}
          </p>
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < Math.floor(rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }
              />
            ))}
            <span className="text-sm text-gray-600 ml-1">
              {rating?.toFixed(1) || '0.0'}
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={onClick}
        className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
      >
        <Phone size={16} />
        Contactar
      </button>
    </div>
  )
}

export default ProfessionalCard

