/**
 * ສຳຫຼັບການກວດສອບຂໍ້ມູນ
 */

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  // เบอร์โทรลาว: 020-xxxx-xxxx หรือ 030-xxxx-xxxx
  const laoPhoneRegex = /^(020|030)-?\d{4}-?\d{4}$/
  return laoPhoneRegex.test(phone.replace(/\s/g, ''))
}

export const validateTaxId = (taxId: string): boolean => {
  // เลขประจำตัวผู้เสียอากรลาว: xxx-xxx-xxx
  const taxIdRegex = /^\d{3}-?\d{3}-?\d{3}$/
  return taxIdRegex.test(taxId.replace(/\s/g, ''))
}

export const validateBarcode = (barcode: string): boolean => {
  // Barcode ต้องมี 8, 12, 13 หรือ 14 ตัวเลข
  const barcodeRegex = /^\d{8}$|^\d{12}$|^\d{13}$|^\d{14}$/
  return barcodeRegex.test(barcode)
}

export const validatePrice = (price: number): boolean => {
  return price > 0 && price <= 999999999
}

export const validateStock = (stock: number): boolean => {
  return stock >= 0 && stock <= 999999
}

export const validateRequired = (value: any): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0
  }
  return value !== null && value !== undefined
}

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength
}

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength
}

export const validateRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max
}