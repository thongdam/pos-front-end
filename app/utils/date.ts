export const formatDate = (date: Date, format: 'short' | 'long' | 'datetime' = 'short'): string => {
  const options: Intl.DateTimeFormatOptions = {}
  
  switch (format) {
    case 'short':
      options.year = 'numeric'
      options.month = 'short'
      options.day = 'numeric'
      break
    case 'long':
      options.year = 'numeric'
      options.month = 'long'
      options.day = 'numeric'
      options.weekday = 'long'
      break
    case 'datetime':
      options.year = 'numeric'
      options.month = 'short'
      options.day = 'numeric'
      options.hour = '2-digit'
      options.minute = '2-digit'
      break
  }
  
  return new Intl.DateTimeFormat('lo-LA', options).format(date)
}

export const isToday = (date: Date): boolean => {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}