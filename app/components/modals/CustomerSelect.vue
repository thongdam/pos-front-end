<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-screen overflow-hidden">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold">ເລືອກລູກຄ້າ</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>

      <!-- ຄົ້ນຫາລູກຄ້າ -->
      <div class="mb-4">
        <div class="relative">
          <MagnifyingGlassIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="ຄົ້ນຫາລູກຄ້າ..."
            class="pl-10 form-input"
          />
        </div>
      </div>

      <!-- ລາຍການລູກຄ້າ -->
      <div class="max-h-96 overflow-y-auto custom-scrollbar">
        <div class="space-y-2">
          <!-- ບໍ່ເລືອກລູກຄ້າ -->
          <button
            @click="$emit('select', null)"
            class="w-full text-left p-3 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-center">
              <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                <UserIcon class="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <p class="font-medium text-gray-900">ລູກຄ້າທົ່ວໄປ</p>
                <p class="text-sm text-gray-500">ບໍ່ໃຊ້ຂໍ້ມູນລູກຄ້າ</p>
              </div>
            </div>
          </button>

          <!-- ລາຍການລູກຄ້າທີ່ມີ -->
          <div
            v-for="customer in filteredCustomers"
            :key="customer.id"
            @click="$emit('select', customer)"
            class="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-lao-gold hover:bg-lao-gold hover:bg-opacity-10 transition-colors cursor-pointer"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                  <span class="text-sm font-medium text-gray-600">
                    {{ customer.firstName.charAt(0) }}{{ customer.lastName.charAt(0) }}
                  </span>
                </div>
                <div>
                  <p class="font-medium text-gray-900">
                    {{ customer.firstName }} {{ customer.lastName }}
                  </p>
                  <div class="flex items-center space-x-2">
                    <span :class="`badge ${getMembershipBadgeClass(customer.membershipType)}`">
                      {{ customer.membershipType }}
                    </span>
                    <span class="text-sm text-gray-500">{{ customer.points }} ຄະແນນ</span>
                  </div>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm text-gray-600">{{ customer.phone }}</p>
                <p class="text-xs text-gray-500">
                  ຊື້ລວມ {{ formatCurrency(customer.totalSpent) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- ບໍ່ພົບລູກຄ້າ -->
        <div v-if="filteredCustomers.length === 0" class="text-center py-8">
          <UsersIcon class="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p class="text-gray-500">ບໍ່ພົບລູກຄ້າ</p>
          <p class="text-sm text-gray-400">ລອງຄົ້ນຫາດ້ວຍຄຳສຳຄັນອື່ນ</p>
        </div>
      </div>

      <!-- ປຸ່ມເພີ່ມລູກຄ້າໃໝ່ -->
      <div class="mt-6 pt-4 border-t">
        <button
          @click="showAddCustomer = true"
          class="w-full btn-lao flex items-center justify-center"
        >
          <PlusIcon class="w-4 h-4 mr-2" />
          ເພີ່ມລູກຄ້າໃໝ່
        </button>
      </div>
    </div>

    <!-- Modal ເພີ່ມລູກຄ້າໃໝ່ -->
    <CustomerModal
      v-if="showAddCustomer"
      @close="showAddCustomer = false"
      @save="handleAddCustomer"
    />
  </div>
</template>

<script setup lang="ts">
import {
  XMarkIcon,
  MagnifyingGlassIcon,
  UserIcon,
  UsersIcon,
  PlusIcon
} from '@heroicons/vue/24/outline'
import { useCustomersStore } from '~/stores/customer';
import { useToast } from '~/composables/useToast'
const emit = defineEmits<{
  close: []
  select: [customer: any]
}>()

const { customers, getMembershipBadgeClass } = useCustomersStore()
const { success } = useToast()

const searchQuery = ref('')
const showAddCustomer = ref(false)

const filteredCustomers = computed(() => {
  if (!searchQuery.value) return customers

  const query = searchQuery.value.toLowerCase()
  return customers.filter(customer =>
    customer.firstName.toLowerCase().includes(query) ||
    customer.lastName.toLowerCase().includes(query) ||
    customer.email?.toLowerCase().includes(query) ||
    customer.phone?.includes(query)
  )
})

const formatCurrency = (amount: number) => {
  return amount.toLocaleString() + ' ກີບ'
}

const handleAddCustomer = (customerData: any) => {
  success('ເພີ່ມລູກຄ້າແລ້ວ', 'ເພີ່ມລູກຄ້າໃໝ່ສຳເລັດ')
  showAddCustomer.value = false
}
</script>