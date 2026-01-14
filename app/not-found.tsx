import Link from 'next/link'
import Logo from '@/components/Logo'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-conecta-light flex flex-col items-center justify-center px-4">
      <Logo size="large" />
      <h1 className="text-4xl font-bold text-gray-800 mt-8 mb-4">404</h1>
      <p className="text-gray-600 text-center mb-8">
        La página que buscas no existe
      </p>
      <Link
        href="/"
        className="bg-conecta-blue text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  )
}

