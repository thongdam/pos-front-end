<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-gray-800">
    <div class="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold">
          {{ customer ? 'ແກ້ໄຂລູກຄ້າ' : 'ເພີ່ມລູກຄ້າໃໝ່' }}
        </h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>

      <form @submit.prevent="handleSave" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-group">
            <label class="form-label">ຊື່ *</label>
            <input
              v-model="form.firstName"
              type="text"
              required
              class="form-input"
              placeholder="ໃສ່ຊື່"
            />
          </div>

          <div class="form-group">
            <label class="form-label">ນາມສະກຸນ *</label>
            <input
              v-model="form.lastName"
              type="text"
              required
              class="form-input"
              placeholder="ໃສ່ນາມສະກຸນ"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-group">
            <label class="form-label">ອີເມລ</label>
            <input
              v-model="form.email"
              type="email"
              class="form-input"
              placeholder="email@example.com"
            />
          </div>

          <div class="form-group">
            <label class="form-label">ເບີໂທ</label>
            <input
              v-model="form.phone"
              type="tel"
              class="form-input"
              placeholder="020-xxx-xxxx"
            />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">ທີ່ຢູ່</label>
          <textarea
            v-model="form.address"
            class="form-input"
            rows="3"
            placeholder="ໃສ່ທີ່ຢູ່"
          ></textarea>
        </div>

        <div class="form-group">
          <label class="form-label">ວັນເກີດ</label>
          <input
            v-model="form.dateOfBirth"
            type="date"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label class="form-label">ປະເພດສະມາຊິກ</label>
          <select v-model="form.membershipType" class="form-input">
            <option value="ທົ່ວໄປ">ທົ່ວໄປ</option>
            <option value="ເງິນ">ເງິນ</option>
            <option value="ທອງ">ທອງ</option>
            <option value="ເພັດ">ເພັດ</option>
          </select>
        </div>

        <div class="flex justify-end space-x-4 pt-4 border-t">
          <button type="button" @click="$emit('close')" class="btn-secondary">
            ຍົກເລີກ
          </button>
          <button type="submit" class="btn-lao">
            {{ customer ? 'ອັບເດດ' : 'ເພີ່ມລູກຄ້າ' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline'
import type { Customer } from '~/types'

interface Props {
  customer?: Customer | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
  save: [data: any]
}>()

const form = reactive({
  firstName: props.customer?.firstName || '',
  lastName: props.customer?.lastName || '',
  email: props.customer?.email || '',
  phone: props.customer?.phone || '',
  address: props.customer?.address || '',
  dateOfBirth: props.customer?.dateOfBirth ? new Date(props.customer.dateOfBirth).toISOString().split('T')[0] : '',
  membershipType: props.customer?.membershipType || 'ທົ່ວໄປ',
  isActive: props.customer?.isActive ?? true
})

const handleSave = () => {
  const data = {
    ...form,
    dateOfBirth: form.dateOfBirth ? new Date(form.dateOfBirth) : undefined
  }
  emit('save', data)
}
</script>