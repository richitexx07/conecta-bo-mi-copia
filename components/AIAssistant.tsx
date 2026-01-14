'use client'

import React, { useState } from 'react'
import { MessageCircle, Send, X } from 'lucide-react'

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '¡Hola! Soy la Secretaria CONECTA. ¿En qué puedo ayudarte hoy?',
      sender: 'ai',
    },
  ])
  const [inputText, setInputText] = useState('')

  const handleSend = () => {
    if (!inputText.trim()) return

    // Agregar mensaje del usuario
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
    }
    setMessages([...messages, userMessage])

    // Simular respuesta de IA
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        text: 'Entiendo tu consulta. Déjame ayudarte con eso. ¿Podrías darme más detalles?',
        sender: 'ai',
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)

    setInputText('')
  }

  return (
    <>
      {/* Botón flotante */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-conecta-blue text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow z-50"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-conecta-blue text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle size={20} />
              <span className="font-semibold">Secretaria CONECTA</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-700 rounded-full p-1 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-xl p-3 ${
                    message.sender === 'user'
                      ? 'bg-conecta-blue text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-conecta-blue"
              />
              <button
                onClick={handleSend}
                className="bg-conecta-blue text-white rounded-xl p-2 hover:bg-blue-700 transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AIAssistant

