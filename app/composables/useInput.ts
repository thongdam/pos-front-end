// composables/useInput.ts
import { ref, reactive } from 'vue'

interface InputOptions {
  title?: string
  message?: string
  placeholder?: string
  defaultValue?: string
  inputType?: 'text' | 'number' | 'email' | 'tel'
  confirmText?: string
  cancelText?: string
  type?: 'primary' | 'success' | 'warning' | 'danger'
  icon?: string
  validation?: (value: string) => boolean | string
  maxLength?: number
  prefix?: string
  suffix?: string
}

interface InputState {
  isVisible: boolean
  title: string
  message: string
  placeholder: string
  defaultValue: string
  inputType: string
  confirmText: string
  cancelText: string
  type: 'primary' | 'success' | 'warning' | 'danger'
  icon: string
  validation?: (value: string) => boolean | string
  maxLength?: number
  prefix: string
  suffix: string
  resolve?: (value: string | null) => void
  inputValue: string
  error: string
  isLoading: boolean
}

const inputState = reactive<InputState>({
  isVisible: false,
  title: '',
  message: '',
  placeholder: '',
  defaultValue: '',
  inputType: 'text',
  confirmText: 'ຕົກລົງ',
  cancelText: 'ຍົກເລີກ',
  type: 'primary',
  icon: '',
  prefix: '',
  suffix: '',
  resolve: undefined,
  inputValue: '',
  error: '',
  isLoading: false
})

export const useInput = () => {
  const input = (options: InputOptions): Promise<string | null> => {
    return new Promise((resolve) => {
      // Reset state
      inputState.error = ''
      inputState.isLoading = false
      
      // Set options
      inputState.title = options.title || 'ໃສ່ຂໍ້ມູນ'
      inputState.message = options.message || ''
      inputState.placeholder = options.placeholder || 'ໃສ່ຂໍ້ມູນ...'
      inputState.defaultValue = options.defaultValue || ''
      inputState.inputType = options.inputType || 'text'
      inputState.confirmText = options.confirmText || 'ຕົກລົງ'
      inputState.cancelText = options.cancelText || 'ຍົກເລີກ'
      inputState.type = options.type || 'primary'
      inputState.icon = options.icon || getDefaultIcon(options.type || 'primary')
      inputState.validation = options.validation
      inputState.maxLength = options.maxLength
      inputState.prefix = options.prefix || ''
      inputState.suffix = options.suffix || ''
      inputState.resolve = resolve
      inputState.inputValue = options.defaultValue || ''
      
      inputState.isVisible = true
      
      // Focus input after modal is shown
      nextTick(() => {
        const inputEl = document.querySelector('#modal-input') as HTMLInputElement
        if (inputEl) {
          inputEl.focus()
          inputEl.select()
        }
      })
    })
  }

  const handleConfirm = () => {
    // Validate input
    if (inputState.validation) {
      const validationResult = inputState.validation(inputState.inputValue)
      if (validationResult !== true) {
        inputState.error = typeof validationResult === 'string' ? validationResult : 'ຂໍ້ມູນບໍ່ຖືກຕ້ອງ'
        return
      }
    }

    inputState.isVisible = false
    inputState.resolve?.(inputState.inputValue || null)
  }

  const handleCancel = () => {
    inputState.isVisible = false
    inputState.resolve?.(null)
  }

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleConfirm()
    } else if (event.key === 'Escape') {
      event.preventDefault()
      handleCancel()
    }
  }

  const getDefaultIcon = (type: string): string => {
    const icons = {
      primary: '✏️',
      success: '✅',
      warning: '⚠️',
      danger: '❌'
    }
    return icons[type as keyof typeof icons] || '✏️'
  }

  // Validation helpers
  const createNumberValidation = (min?: number, max?: number) => {
    return (value: string) => {
      if (!value.trim()) return 'ກະລຸນາໃສ່ຕົວເລກ'
      
      const num = Number(value)
      if (isNaN(num)) return 'ກະລຸນາໃສ່ຕົວເລກທີ່ຖືກຕ້ອງ'
      
      if (min !== undefined && num < min) return `ຕົວເລກຕ້ອງໃຫຍ່ກວ່າ ${min}`
      if (max !== undefined && num > max) return `ຕົວເລກຕ້ອງນ້ອຍກວ່າ ${max}`
      
      return true
    }
  }

  const createRequiredValidation = () => {
    return (value: string) => {
      if (!value.trim()) return 'ກະລຸນາໃສ່ຂໍ້ມູນ'
      return true
    }
  }

  return {
    inputState,
    input,
    handleConfirm,
    handleCancel,
    handleKeydown,
    createNumberValidation,
    createRequiredValidation
  }
}