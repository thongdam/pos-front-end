import { ref, readonly } from 'vue'
import type { Toast, ToastType } from '~/types'

const toasts = ref<Toast[]>([])

export const useToast = () => {
  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration || 3000
    }
    
    toasts.value.push(newToast)
    
    if (newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, newToast.duration)
    }
  }

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  // Helper methods for each toast type
  const toastMethods = {
    success: (title: string, message: string, duration?: number) => {
      addToast({ type: 'ສຳເລັດ', title, message, duration: duration || 3000 })
    },
    error: (title: string, message: string, duration?: number) => {
      addToast({ type: 'ຜິດພາດ', title, message, duration: duration || 3000 })
    },
    warning: (title: string, message: string, duration?: number) => {
      addToast({ type: 'ແຈ້ງເຕືອນ', title, message, duration: duration || 3000 })
    },
    info: (title: string, message: string, duration?: number) => {
      addToast({ type: 'ຂໍ້ມູນ', title, message, duration: duration || 3000 })
    }
  }

  return {
    toasts: readonly(toasts),
    addToast,
    removeToast,
    ...toastMethods
  }
}