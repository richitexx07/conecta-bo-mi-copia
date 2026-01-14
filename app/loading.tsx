import Logo from '@/components/Logo'

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <Logo size="large" />
      <div className="mt-8">
        <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-conecta-blue rounded-full animate-pulse" style={{ width: '60%' }}></div>
        </div>
      </div>
    </div>
  )
}

