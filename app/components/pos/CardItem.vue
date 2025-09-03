<template>
  <div class="bg-gray-50 rounded-lg p-3">
    <div class="flex items-center space-x-3">
      <div class="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
        <img
          :src="item.product.image || '/images/placeholder.jpg'"
          :alt="item.product.name"
          class="w-full h-full object-cover"
        />
      </div>
      
      <div class="flex-1 min-w-0">
        <h4 class="font-medium text-gray-900 truncate">{{ item.product.name }}</h4>
        <p class="text-sm text-gray-600">
          {{ formatPrice(item.product.price) }} ກີບ/{{ item.product.unit }}
        </p>
      </div>
      
      <div class="flex items-center space-x-2">
        <button
          @click="updateQuantity(item.product.id, item.quantity - 1)"
          :disabled="item.quantity <= 1"
          class="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 flex items-center justify-center"
        >
          <MinusIcon class="w-3 h-3" />
        </button>
        
        <span class="w-8 text-center font-medium text-sm">{{ item.quantity }}</span>
        
        <button
          @click="updateQuantity(item.product.id, item.quantity + 1)"
          :disabled="item.quantity >= item.product.stock"
          class="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 flex items-center justify-center"
        >
          <PlusIcon class="w-3 h-3" />
        </button>
      </div>
      
      <button
        @click="removeFromCart(item.product.id)"
        class="text-red-500 hover:text-red-700 p-1"
      >
        <TrashIcon class="w-4 h-4" />
      </button>
    </div>
    
    <div class="mt-2 flex justify-between items-center text-sm">
      <span class="text-gray-600">ລວມ:</span>
      <span class="font-semibold text-lao-blue">{{ formatPrice(item.subtotal) }} ກີບ</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon, MinusIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { usePosStore } from '~/stores/pos';
import type { CartItem } from '~/types'

interface Props {
  item: CartItem
}

defineProps<Props>()

const { updateQuantity, removeFromCart } = usePosStore()

const formatPrice = (price: number) => {
  return price.toLocaleString()
}
</script>