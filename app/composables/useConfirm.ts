// composables/useConfirm.ts
import { ref, reactive } from 'vue'

interface ConfirmOptions {
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  type?: 'danger' | 'warning' | 'info' | 'success'
  icon?: string
  dangerouslyHTML?: boolean
}

interface ConfirmState {
  isVisible: boolean
  title: string
  message: string
  confirmText: string
  cancelText: string
  type: 'danger' | 'warning' | 'info' | 'success'
  icon: string
  dangerouslyHTML: boolean
  resolve?: (value: boolean) => void
}

const confirmState = reactive<ConfirmState>({
  isVisible: false,
  title: '',
  message: '',
  confirmText: 'ຕົກລົງ',
  cancelText: 'ຍົກເລີກ',
  type: 'danger',
  icon: '',
  dangerouslyHTML: false,
  resolve: undefined
})

export const useConfirm = () => {
  const confirm = (options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      // Set default values
      confirmState.title = options.title || getDefaultTitle(options.type || 'danger')
      confirmState.message = options.message
      confirmState.confirmText = options.confirmText || getDefaultConfirmText(options.type || 'danger')
      confirmState.cancelText = options.cancelText || 'ຍົກເລີກ'
      confirmState.type = options.type || 'danger'
      confirmState.icon = options.icon || getDefaultIcon(options.type || 'danger')
      confirmState.dangerouslyHTML = options.dangerouslyHTML || false
      confirmState.resolve = resolve
      confirmState.isVisible = true
    })
  }

  const handleConfirm = () => {
    confirmState.isVisible = false
    confirmState.resolve?.(true)
  }

  const handleCancel = () => {
    confirmState.isVisible = false
    confirmState.resolve?.(false)
  }

  const getDefaultTitle = (type: string): string => {
    const titles = {
      danger: 'ຢືນຢັນການລຶບ',
      warning: 'ແຈ້ງເຕືອນ',
      info: 'ຂໍ້ມູນ',
      success: 'ສຳເລັດ'
    }
    return titles[type as keyof typeof titles] || 'ຢືນຢັນ'
  }

  const getDefaultConfirmText = (type: string): string => {
    const texts = {
      danger: 'ລຶບ',
      warning: 'ດຳເນີນການ',
      info: 'ຕົກລົງ',
      success: 'ຕົກລົງ'
    }
    return texts[type as keyof typeof texts] || 'ຕົກລົງ'
  }

  const getDefaultIcon = (type: string): string => {
    const icons = {
      danger: '🗑️',
      warning: '⚠️',
      info: 'ℹ️',
      success: '✅'
    }
    return icons[type as keyof typeof icons] || '❓'
  }

  return {
    confirmState,
    confirm,
    handleConfirm,
    handleCancel
  }
}
