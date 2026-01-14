'use client'

import React, { useState } from 'react'
import { Search } from 'lucide-react'

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar servicios, profesionales..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-conecta-blue focus:outline-none bg-white"
        />
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={24}
        />
      </div>
    </div>
  )
}

export default SearchBar

