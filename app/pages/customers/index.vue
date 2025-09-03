<template>
  <div>
    <AppHeader title="ລູກຄ້າ" subtitle="ຈັດການຂໍ້ມູນລູກຄ້າແລະສະມາຊິກ" />
    <main class="p-6">
      <div class="flex items-center justify-between mb-6">
        <div class="relative">
          <MagnifyingGlassIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="ຄົ້ນຫາລູກຄ້າ..."
            class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80"
          />
        </div>
        
        <button @click="showCustomerModal = true" class="btn-lao">
          <PlusIcon class="w-4 h-4 mr-2" />
          ເພີ່ມລູກຄ້າໃໝ່
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-lg p-4 border border-gray-200">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg">
              <UsersIcon class="w-5 h-5 text-blue-600" />
            </div>
            <div class="ml-3">
              <p class="text-sm text-gray-600">ລູກຄ້າທັງໝົດ</p>
              <p class="text-lg font-semibold text-gray-900">{{ customers.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg p-4 border border-gray-200">
          <div class="flex items-center">
            <div class="p-2 bg-purple-100 rounded-lg">
              <StarIcon class="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg p-4 border border-gray-200">
          <div class="flex items-center">
            <div class="p-2 bg-yellow-100 rounded-lg">
              <StarIcon class="w-5 h-5 text-yellow-600" />
            </div>
            <div class="ml-3">
              <p class="text-sm text-gray-600">ສະມາຊິກທອງ</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg p-4 border border-gray-200">
          <div class="flex items-center">
            <div class="p-2 bg-gray-100 rounded-lg">
              <CurrencyDollarIcon class="w-5 h-5 text-gray-600" />
            </div>
            <div class="ml-3">
              <p class="text-sm text-gray-600">ຄ່າເຉລີ່ຍ/ຄົນ</p>
              <p class="text-lg font-semibold text-gray-900">{{ formatCurrency(averageSpending) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ຕາລາງລູກຄ້າ -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="table-header-cell text-left">ລູກຄ້າ</th>
                <th class="table-header-cell text-left">ປະເພດສະມາຊິກ</th>
                <th class="table-header-cell text-center">ຄະແນນ</th>
                <th class="table-header-cell text-right">ຊື້ລວມ</th>
                <th class="table-header-cell text-center">ມາຄັ້ງສຸດທ້າຍ</th>
                <th class="table-header-cell text-center">ການກະທຳ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="customer in filteredCustomers" :key="customer.id" class="table-row">
                <td class="table-cell">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <span class="text-sm font-medium text-gray-600">
                        {{ customer.firstName.charAt(0) }}
                      </span>
                    </div>
                    <div>
                      <p class="font-medium text-gray-900">{{ customer.firstName }}</p>
                      <p class="text-sm text-gray-500">{{ customer.email || customer.phone }}</p>
                    </div>
                  </div>
                </td>
                <td class="table-cell">
                  <span :class="`badge`">
                    {{ customer.membershipType }}
                  </span>
                </td>
                <td class="table-cell text-center font-medium">{{ customer.points.toLocaleString() }}</td>
                <td class="table-cell text-right font-medium">{{ formatCurrency(customer.totalSpent) }}</td>
                <td class="table-cell text-center text-sm text-gray-500">
                  {{ customer.lastVisit ? formatDate(customer.lastVisit) : '-' }}
                </td>
                <td class="table-cell text-center">
                  <div class="flex justify-center space-x-2">
                    <button
                      @click="editCustomer(customer)"
                      class="text-blue-600 hover:text-blue-800 p-1"
                    >
                      <PencilIcon class="w-4 h-4" />
                    </button>
                    <button
                      @click="deleteCustomer(customer)"
                      class="text-red-600 hover:text-red-800 p-1"
                    >
                      <TrashIcon class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ບໍ່ພົບລູກຄ້າ -->
      <div v-if="filteredCustomers.length === 0" class="text-center py-12">
        <UsersIcon class="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <p class="text-gray-500 font-medium">ບໍ່ພົບລູກຄ້າ</p>
        <p class="text-sm text-gray-400">ລອງຄົ້ນຫາດ້ວຍຄຳສຳຄັນອື່ນ ຫຼື ເພີ່ມລູກຄ້າໃໝ່</p>
      </div>
    </main>

    <!-- Modal ລູກຄ້າ -->
    <CustomerModal
      v-if="showCustomerModal"
      :customer="selectedCustomer"
      @close="closeCustomerModal"
      @save="handleSaveCustomer"
    />
  </div>
</template>

<script setup lang="ts">
import {
  MagnifyingGlassIcon,
  PlusIcon,
  UsersIcon,
  StarIcon,
  CurrencyDollarIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/vue/24/outline'
import { useCustomersStore } from '~/stores/customer'
import type { Customer } from '~/types'
import { useToast } from '~/composables/useToast'
import AppHeader from '~/components/common/AppHeader.vue'
import CustomerModal from '~/components/modals/CustomerModal.vue'
// definePageMeta({
//   middleware: 'auth'
// })

const { 
  customers, 
  searchQuery, 
  filteredCustomers,
  getMembershipBadgeClass
} = useCustomersStore()

const { success } = useToast()

const showCustomerModal = ref(false)
const selectedCustomer = ref<Customer | null>(null)

const averageSpending = computed(() => {
  if (customers.length === 0) return 0
  const total = customers.reduce((sum, customer) => sum + customer.totalSpent, 0)
  return Math.round(total / customers.length)
})

const formatCurrency = (amount: number) => {
  return amount.toLocaleString() + ' ກີບ'
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('lo-LA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const editCustomer = (customer: Customer) => {
  selectedCustomer.value = customer
  showCustomerModal.value = true
}

const deleteCustomer = (customer: Customer) => {
  if (confirm(`ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລົບລູກຄ້າ "${customer.firstName} ${customer.lastName}"?`)) {
    success('ລົບລູກຄ້າແລ້ວ', `ລົບລູກຄ້າ ${customer.firstName} ${customer.lastName} ສຳເລັດ`)
  }
}

const closeCustomerModal = () => {
  showCustomerModal.value = false
  selectedCustomer.value = null
}

const handleSaveCustomer = (customerData: any) => {
  const action = selectedCustomer.value ? 'ອັບເດດ' : 'ເພີ່ມ'
  success(`${action}ລູກຄ້າແລ້ວ`, `${action}ລູກຄ້າ ${customerData.firstName} ${customerData.lastName} ສຳເລັດ`)
  closeCustomerModal()
}
</script>