<template>
  <header class="bg-white border-b border-gray-200 px-6 py-4" >
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">{{ title }}</h1>
        <p v-if="subtitle" class="text-sm text-gray-600">{{ subtitle }}</p>
      </div>
      
      <div class="flex items-center space-x-4">
        <div class="relative">
          <button
            @click="showUserMenu = !showUserMenu"
            class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
          >
            <img
              :src="user?.avatar || '/images/default-avatar.jpg'"
              :alt="user?.name"
              class="w-8 h-8 rounded-full border-2 border-lao-gold"
            />
            <div class="text-left">
              <p class="text-sm font-medium text-gray-900">
                {{ user?.email }} 
              </p>
            </div>
            <ChevronDownIcon class="w-4 h-4 text-gray-400" />
          </button>
          
          <div
            v-if="showUserMenu"
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
          >
            <div class="py-1">
              <button
                @click="logout"
                class="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50"
              >
                ອອກຈາກລະບົບ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { onClickOutside } from '@vueuse/core'
import { useAuthStore } from '~/stores/auth';
interface Props {
  title: string
  subtitle?: string
}
defineProps<Props>()
const { user, logout } = useAuthStore()
const showUserMenu = ref(false)
const userMenuRef = ref()
onClickOutside(userMenuRef, () => {
  showUserMenu.value = false
})
</script>