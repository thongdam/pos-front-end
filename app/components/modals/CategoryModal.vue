<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4 text-gray-800">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold">ເພີ່ມໝວດໝູ່ໃໝ່</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>

      <form @submit.prevent="handleSave" class="space-y-4">
        <div class="form-group">
          <label class="form-label">ຊື່ໝວດໝູ່ *</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="form-input"
            placeholder="ໃສ່ຊື່ໝວດໝູ່"
          />
        </div>

        <div class="form-group">
          <label class="form-label">ຄຳອະທິບາຍ</label>
          <textarea
            v-model="form.description"
            class="form-input"
            rows="3"
            placeholder="ອະທິບາຍໝວດໝູ່"
          ></textarea>
        </div>

        <div class="form-group">
          <label class="form-label">ສີປະຈຳໝວດໝູ່</label>
          <div class="grid grid-cols-6 gap-2">
            <button
              v-for="color in colors"
              :key="color.name"
              type="button"
              @click="form.color = color.name"
              :class="[
                'w-10 h-10 rounded-lg border-2 transition-colors',
                form.color === color.name ? 'border-gray-800' : 'border-gray-300',
                color.class
              ]"
            >
              <CheckIcon
                v-if="form.color === color.name"
                class="w-5 h-5 mx-auto text-white"
              />
            </button>
          </div>
        </div>

        <div class="form-group">
          <label class="flex items-center">
            <input
              v-model="form.isActive"
              type="checkbox"
              class="rounded border-gray-300 text-blue-600"
            />
            <span class="ml-2 text-sm text-gray-700">ເປີດໃຊ້ງານໝວດໝູ່ນີ້</span>
          </label>
        </div>

        <div class="flex justify-end space-x-4 pt-4 border-t">
          <button type="button" @click="$emit('close')" class="btn-secondary">
            ຍົກເລີກ
          </button>
          <button type="submit" class="btn-lao">
            ເພີ່ມໝວດໝູ່
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XMarkIcon, CheckIcon } from '@heroicons/vue/24/outline'

const emit = defineEmits<{
  close: []
  save: [data: any]
}>()

const form = reactive({
  name: '',
  description: '',
  color: 'blue',
  isActive: true
})

const colors = [
  { name: 'blue', class: 'bg-blue-500' },
  { name: 'green', class: 'bg-green-500' },
  { name: 'yellow', class: 'bg-yellow-500' },
  { name: 'red', class: 'bg-red-500' },
  { name: 'purple', class: 'bg-purple-500' },
  { name: 'pink', class: 'bg-pink-500' },
  { name: 'indigo', class: 'bg-indigo-500' },
  { name: 'emerald', class: 'bg-emerald-500' },
  { name: 'orange', class: 'bg-orange-500' },
  { name: 'teal', class: 'bg-teal-500' },
  { name: 'cyan', class: 'bg-cyan-500' },
  { name: 'gray', class: 'bg-gray-500' }
]

const handleSave = () => {
  emit('save', { ...form })
}
</script>