export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-PY', {
    style: 'currency',
    currency: 'PYG',
    minimumFractionDigits: 0,
  }).format(amount)
}

export const formatPhone = (phone: string): string => {
  // Formato paraguayo: 0981 234 567
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 9) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`
  }
  return phone
}

export const validateCedula = (cedula: string): boolean => {
  // Validación básica de cédula paraguaya (7-8 dígitos)
  const cleaned = cedula.replace(/\D/g, '')
  return cleaned.length >= 7 && cleaned.length <= 8
}

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

