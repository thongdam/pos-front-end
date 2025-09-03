export const formatCurrency = (amount: number, currency: string = 'LAK'): string => {
  const formatted = amount.toLocaleString('lo-LA')
  
  switch (currency) {
    case 'LAK':
      return `${formatted} ກີບ`
    case 'THB':
      return `${formatted} ບາດ`
    case 'USD':
      return `$${formatted}`
    default:
      return `${formatted} ກີບ`
  }
}

export const calculateVAT = (amount: number, vatRate: number = 0.10): number => {
  return amount * vatRate
}

export const calculateTotal = (
  subtotal: number,
  discountAmount: number = 0,
  vatAmount: number = 0
): number => {
  return subtotal - discountAmount + vatAmount
}