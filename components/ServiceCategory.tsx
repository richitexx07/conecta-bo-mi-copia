'use client'

import React from 'react'

interface ServiceCategoryProps {
  name: string
  icon: string
  onClick?: () => void
}

const ServiceCategory: React.FC<ServiceCategoryProps> = ({ 
  name, 
  icon, 
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow min-w-[120px] h-32"
    >
      <div className="text-5xl mb-2">{icon}</div>
      <span className="text-sm font-medium text-gray-800 text-center">
        {name}
      </span>
    </button>
  )
}

export default ServiceCategory

