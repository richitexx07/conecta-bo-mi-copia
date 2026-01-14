'use client'

import React from 'react'
import Logo from './Logo'
import { Menu, Bell, User } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 w-full">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <Logo size="small" className="flex-shrink-0" />
        <div className="flex items-center gap-4">
          <button className="p-2 text-conecta-gray hover:text-conecta-blue transition-colors">
            <Bell size={24} />
          </button>
          <button className="p-2 text-conecta-gray hover:text-conecta-blue transition-colors">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

