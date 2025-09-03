<template>
  <div class="min-h-screen bg-gradient-to-br from-lao-blue to-blue-800 flex items-center justify-center">
    <div class="text-center">
      <div class="mx-auto w-20 h-20 bg-lao-gold rounded-full flex items-center justify-center mb-4 animate-pulse">
        <ShoppingCartIcon class="w-10 h-10 text-lao-blue" />
      </div>
      <h2 class="text-2xl font-bold text-white mb-2">ລະບົບ POS ລາວ</h2>
      <p class="text-blue-100 mb-4">ກຳລັງເຂົ້າສູ່ລະບົບ...</p>
      <div class="inline-block w-4 h-4 border-2 border-white border-r-transparent rounded-full animate-spin"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShoppingCartIcon } from '@heroicons/vue/24/solid'
definePageMeta({
  layout: false
})
// Redirect 
onMounted(() => {
  setTimeout(() => {
    navigateTo('dashboard')
  }, 1000)
})
</script>