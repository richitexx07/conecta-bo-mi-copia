'use client'

import React from 'react'
import { User as UserIcon } from 'lucide-react'

interface UserProfileProps {
  name?: string
  photo?: string
}

const UserProfile: React.FC<UserProfileProps> = ({ 
  name = 'Usuario', 
  photo 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex items-center gap-4">
      {photo ? (
        <img
          src={photo}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-conecta-blue flex items-center justify-center">
          <UserIcon className="text-white" size={32} />
        </div>
      )}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500">Paraguay</p>
      </div>
    </div>
  )
}

export default UserProfile

