<template>
  <div class="card card-hover cursor-pointer" @click="$emit('addToCart', product)">
    <div class="mb-4">
      <div class="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
        <img
          :src="product.images || '/images/missing-picture.webp'"
          :alt="product.name"
          class="w-full h-full object-cover"
          @error="handleImageError"
        />
      </div>
    </div>
    
    <div class="space-y-3">
      <div>
        <h3 class="font-semibold text-lg text-gray-900">{{ product.name }}</h3>
        <p class="text-sm text-gray-600 line-clamp-2">{{ product.description }}</p>
      </div>
      
      <div class="flex items-center justify-between">
        <span class="text-xl font-bold text-lao-blue">
          {{ formatPrice(product.price) }} ກີບ
        </span>
        
        <span
          :class="[
            'px-2 py-1 text-xs rounded-full',
            product.stock > product.min_stock 
              ? 'bg-green-100 text-green-800' 
              : product.stock > 0 
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
          ]"
        >
          ສະຕ໋ອກ: {{ product.stock }} {{ product.unit }}
        </span>
      </div>
      
      <div class="flex items-center justify-between pt-2 border-t">
        <span class="text-sm text-gray-500">{{ getCategoryName(product.category_id) }}</span>
        
        <button
          :disabled="product.stock === 0"
          class="btn-lao text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          @click.stop="$emit('addToCart', product)"
        >
          <PlusIcon class="w-4 h-4 mr-1" />
          ເພີ່ມ
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline'
import { useProductsStore } from '~/stores/product';
import type { Product } from '~/types'

interface Props {
  product: Product
}

defineProps<Props>()
defineEmits<{
  addToCart: [product: Product]
}>()

const { getCategoryById } = useProductsStore()

const formatPrice = (price: number) => {
  return price.toLocaleString()
}

const getCategoryName = (categoryId: number) => {
  const category = getCategoryById(categoryId)
  return category?.name || 'ບໍ່ມີໝວດໝູ່'
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = '/images/placeholder.jpg'
}
</script>