<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-screen overflow-y-auto text-gray-800">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold">
          {{ product ? 'ແກ້ໄຂສິນຄ້າ' : 'ເພີ່ມສິນຄ້າໃໝ່' }}
        </h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>

      <form @submit.prevent="handleSave" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-group">
            <label class="form-label">ຊື່ສິນຄ້າ *</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="form-input"
              placeholder="ໃສ່ຊື່ສິນຄ້າ"
            />
          </div>

          <div class="form-group">
            <label class="form-label">SKU *</label>
            <input
              v-model="form.sku"
              type="text"
              required
              class="form-input"
              placeholder="ລະຫັດສິນຄ້າ"
            />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">ຄຳອະທິບາຍ</label>
          <textarea
            v-model="form.description"
            class="form-input"
            rows="3"
            placeholder="ອະທິບາຍລາຍລະອຽດສິນຄ້າ"
          ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="form-group">
            <label class="form-label">ລາຄາຂາຍ (ກີບ) *</label>
            <input
              v-model.number="form.price"
              type="number"
              required
              min="0"
              step="100"
              class="form-input"
              placeholder="0"
            />
          </div>

          <div class="form-group">
            <label class="form-label">ລາຄາຕົ້ນທຶນ (ກີບ)</label>
            <input
              v-model.number="form.cost"
              type="number"
              min="0"
              step="100"
              class="form-input"
              placeholder="0"
            />
          </div>

          <div class="form-group">
            <label class="form-label">ໝວດໝູ່ *</label>
            <select v-model="form.category_id" required class="form-input">
              <option value="">ເລືອກໝວດໝູ່</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="form-group">
            <label class="form-label">ສະຕ໋ອກປັດຈຸບັນ *</label>
            <input
              v-model.number="form.stock"
              type="number"
              required
              min="0"
              class="form-input"
              placeholder="0"
            />
          </div>

          <div class="form-group">
            <label class="form-label">ສະຕ໋ອກຕໍ່າສຸດ</label>
            <input
              v-model.number="form.min_stock"
              type="number"
              min="0"
              class="form-input"
              placeholder="0"
            />
          </div>

          <div class="form-group">
            <label class="form-label">ໜ່ວຍນັບ *</label>
            <select v-model="form.unit" required class="form-input">
              <option value="ຊິ້ນ">ຊິ້ນ</option>
              <option value="ແກ້ວ">ແກ້ວ</option>
              <option value="ຖ້ວຍ">ຖ້ວຍ</option>
              <option value="ຂວດ">ຂວດ</option>
              <option value="ຖຸງ">ຖຸງ</option>
              <option value="ກິໂລ">ກິໂລ</option>
              <option value="ລິດ">ລິດ</option>
              <option value="ກະປ໋ອງ">ກະປ໋ອງ</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Barcode</label>
          <input
            v-model="form.barcode"
            type="text"
            class="form-input"
            placeholder="ໃສ່ barcode (ຖ້າມີ)"
          />
        </div>

        <div class="form-group">
          <label class="form-label">URL ຮູບພາບ</label>
          <input
            v-model="form.images"
            type="url"
            class="form-input"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div class="form-group">
          <label class="flex items-center">
            <input
              v-model="form.isActive"
              type="checkbox"
              class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span class="ml-2 text-sm text-gray-700">ເປີດໃຊ້ງານສິນຄ້ານີ້</span>
          </label>
        </div>

        <div class="flex justify-end space-x-4 pt-4 border-t">
          <button type="button" @click="$emit('close')" class="btn-secondary">
            ຍົກເລີກ
          </button>
          <button type="submit" class="btn-lao">
            {{ product ? 'ອັບເດດ' : 'ເພີ່ມສິນຄ້າ' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { useProductsStore } from '~/stores/product';
import type { Product } from '~/types'

interface Props {
  product?: Product | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
  save: [data: any]
}>()

const { categories } = useProductsStore()

const form = reactive({
  name: props.product?.name || '',
  description: props.product?.description || '',
  sku: props.product?.sku || '',
  barcode: props.product?.barcode || '',
  price: props.product?.price || 0,
  cost: props.product?.cost || 0,
  category_id: props.product?.category_id || '',
  stock: props.product?.stock || 0,
  min_stock: props.product?.min_stock || 0,
  max_stock: props.product?.max_stock || 0,
  unit: props.product?.unit || 'ຊິ້ນ',
  images: props.product?.images || '',
  isActive: props.product?.is_active ?? true
})

const handleSave = () => {
  emit('save', { ...form })
}
</script>