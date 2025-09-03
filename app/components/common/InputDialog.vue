<template>
  <Teleport to="body" v-if="isMounted">
    <Transition name="modal" appear>
      <div
        v-if="inputState.isVisible"
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
            <div class="relative flex items-center text-gray-800">
              <div
                class="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mr-4 transform transition-transform duration-300 hover:scale-110"
              >
                <span class="text-2xl">{{ inputState.icon }}</span>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold mb-1">{{ inputState.title }}</h3>
                <p v-if="inputState.message" class="text-sm text-white/80">
                  {{ inputState.message }}
                </p>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6 text-gray-800">
            <!-- Input Field -->
            <div class="mb-6">
              <div class="relative">
                <!-- Prefix -->
                <div 
                  v-if="inputState.prefix"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium z-10"
                >
                  {{ inputState.prefix }}
                </div>
                
                <!-- Input -->
                <input
                  id="modal-input"
                  v-model="inputState.inputValue"
                  :type="inputState.inputType"
                  :placeholder="inputState.placeholder"
                  :maxlength="inputState.maxLength"
                  @keydown="handleKeydown"
                  @input="inputState.error = ''"
                  class="w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 text-lg font-medium"
                  :class="[
                    inputState.error 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-300' 
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-300',
                    inputState.prefix ? 'pl-12' : '',
                    inputState.suffix ? 'pr-12' : ''
                  ]"
                />

                <!-- Suffix -->
                <div 
                  v-if="inputState.suffix"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium z-10"
                >
                  {{ inputState.suffix }}
                </div>
              </div>

              <!-- Error Message -->
              <Transition name="error">
                <div v-if="inputState.error" class="mt-2 text-red-600 text-sm font-medium flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  {{ inputState.error }}
                </div>
              </Transition>

              <!-- Character Count -->
              <div v-if="inputState.maxLength" class="mt-2 text-right text-xs text-gray-500">
                {{ inputState.inputValue.length }}/{{ inputState.maxLength }}
              </div>
            </div>

            <!-- Actions -->
            <div class="flex space-x-3">
              <!-- Cancel Button -->
              <button
                @click="handleCancel"
                class="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              >
                {{ inputState.cancelText }}
              </button>

              <!-- Confirm Button -->
              <button
                @click="handleConfirm"
                :disabled="inputState.isLoading"
                class="flex-1 px-6 py-3 font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                :class="confirmButtonClasses"
              >
                <div v-if="inputState.isLoading" class="flex items-center">
                  <div class="inline-block w-4 h-4 border-2 border-white border-r-transparent rounded-full animate-spin mr-2"></div>
                  ກຳລັງດຳເນີນການ...
                </div>
                <span v-else>{{ inputState.confirmText }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { useInput } from '~/composables/useInput'
const { inputState, handleConfirm, handleCancel, handleKeydown } = useInput()
const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})
const modalClasses = computed(() => {
  const classes = {
    primary: 'border-l-4 border-blue-500',
    success: 'border-l-4 border-green-500',
    warning: 'border-l-4 border-yellow-500',
    danger: 'border-l-4 border-red-500'
  }
  return classes[inputState.type]
})

const headerClasses = computed(() => {
  const classes = {
    primary: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-600',
    danger: 'bg-gradient-to-r from-red-500 to-rose-600'
  }
  return classes[inputState.type]
})

const confirmButtonClasses = computed(() => {
  const classes = {
    primary: 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white focus:ring-blue-300',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white focus:ring-green-300',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white focus:ring-yellow-300',
    danger: 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white focus:ring-red-300'
  }
  return classes[inputState.type]
})
// Prevent body scroll when modal is open (Client-side only)
watchEffect(() => {
  if (process.client && typeof document !== 'undefined' && document.body) {
    if (inputState.isVisible) {
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

.error-enter-active,
.error-leave-active {
  transition: all 0.3s ease;
}

.error-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.error-leave-to {
  opacity: 0;
  transform: translateY(-10px);
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