<template>
  <Teleport to="body" v-if="isMounted">
    <Transition name="modal" appear>
      <div
        v-if="confirmState.isVisible"
        class="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        @click.self="handleCancel"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        
        <!-- Modal -->
        <div
          class="relative bg-white rounded-3xl shadow-2xl max-w-md w-full transform transition-all duration-300"
          :class="modalClasses"
        >
          <!-- Header with gradient -->
          <div
            class="relative overflow-hidden rounded-t-3xl p-6 text-white"
            :class="headerClasses"
          >
            <!-- Background pattern -->
            <div class="absolute inset-0 opacity-10">
              <div class="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
              <div class="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
            </div>
            
            <!-- Content -->
            <div class="relative flex items-center">
              <div
                class="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mr-4 transform transition-transform duration-300 hover:scale-110"
              >
                <span class="text-2xl">{{ confirmState.icon }}</span>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold mb-1">{{ confirmState.title }}</h3>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <div
              v-if="confirmState.dangerouslyHTML"
              v-html="confirmState.message"
              class="text-gray-700 text-base leading-relaxed mb-6"
            ></div>
            <p
              v-else
              class="text-gray-700 text-base leading-relaxed mb-6"
            >
              {{ confirmState.message }}
            </p>

            <!-- Actions -->
            <div class="flex space-x-3">
              <!-- Cancel Button -->
              <button
                @click="handleCancel"
                class="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              >
                {{ confirmState.cancelText }}
              </button>

              <!-- Confirm Button -->
              <button
                @click="handleConfirm"
                class="flex-1 px-6 py-3 font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg hover:shadow-xl"
                :class="confirmButtonClasses"
              >
                {{ confirmState.confirmText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useConfirm } from '~/composables/useConfirm'

const { confirmState, handleConfirm, handleCancel } = useConfirm()

// ตรวจสอบว่า component ถูก mount แล้วหรือยัง (Client-side only)
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})

const modalClasses = computed(() => {
  const classes = {
    danger: 'border-l-4 border-red-500',
    warning: 'border-l-4 border-yellow-500',
    info: 'border-l-4 border-blue-500',
    success: 'border-l-4 border-green-500'
  }
  return classes[confirmState.type]
})

const headerClasses = computed(() => {
  const classes = {
    danger: 'bg-gradient-to-r from-red-500 to-rose-600',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-600',
    info: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600'
  }
  return classes[confirmState.type]
})

const confirmButtonClasses = computed(() => {
  const classes = {
    danger: 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white focus:ring-red-300',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white focus:ring-yellow-300',
    info: 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white focus:ring-blue-300',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white focus:ring-green-300'
  }
  return classes[confirmState.type]
})

// Prevent body scroll when modal is open (Client-side only)
watchEffect(() => {
  if (process.client && typeof document !== 'undefined' && document.body) {
    if (confirmState.isVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

// Clean up on unmount (Client-side only)
onUnmounted(() => {
  if (process.client && typeof document !== 'undefined' && document.body) {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-enter-from {
  opacity: 0;
  transform: scale(0.7) translateY(-50px);
}

.modal-leave-to {
  opacity: 0;
  transform: scale(1.1) translateY(50px);
}

.modal-enter-active .relative {
  animation: modal-bounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modal-bounce {
  0% {
    transform: scale(0.3) rotate(-10deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.05) rotate(2deg);
  }
  70% {
    transform: scale(0.95) rotate(-1deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}
</style>