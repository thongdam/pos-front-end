<template>
  <teleport to="body">
    <div class="fixed top-4 right-4 z-50 space-y-2">
      <transition-group name="fade" tag="div" class="space-y-2">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="[
            'max-w-sm p-4 rounded-lg shadow-lg border-l-4',
            toastClasses[toast.type]
          ]"
        >
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <component :is="toastIcons[toast.type]" class="w-5 h-5" />
            </div>
            <div class="ml-3 flex-1">
              <h4 class="text-sm font-medium">{{ toast.title }}</h4>
              <p class="mt-1 text-sm opacity-90">{{ toast.message }}</p>
            </div>
            <button
              @click="removeToast(toast.id)"
              class="ml-3 text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<script setup lang="ts">
// toast component
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import type { ToastType } from '~/types'
import { useToast } from '~/composables/useToast'
const { toasts, removeToast } = useToast()

// Properly typed toast classes and icons
const toastClasses: Record<ToastType, string> = {
  'ສຳເລັດ': 'bg-green-50 border-green-400 text-green-800',
  'ຜິດພາດ': 'bg-red-50 border-red-400 text-red-800',
  'ແຈ້ງເຕືອນ': 'bg-yellow-50 border-yellow-400 text-yellow-800',
  'ຂໍ້ມູນ': 'bg-blue-50 border-blue-400 text-blue-800'
}

const toastIcons: Record<ToastType, any> = {
  'ສຳເລັດ': CheckCircleIcon,
  'ຜິດພາດ': XCircleIcon,
  'ແຈ້ງເຕືອນ': ExclamationTriangleIcon,
  'ຂໍ້ມູນ': InformationCircleIcon
}
</script>