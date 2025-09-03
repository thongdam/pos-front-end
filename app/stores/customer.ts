import { defineStore } from 'pinia'
import type { Customer } from '~/types'

export const useCustomersStore = defineStore('customers', () => {
  const customers = ref<Customer[]>([
    {
      id: 1,
      firstName: 'ສົມຊາຍ',
      lastName: 'ໃຈດີ',
      email: 'somchai@example.com',
      phone: '020-234-5678',
      address: '123 ຖະໜົນ ສຸກຫ້າ, ວຽງຈັນ',
      membershipType: 'ທອງ',
      points: 1250,
      totalSpent: 1500000,
      lastVisit: new Date('2024-01-15'),
      createdAt: new Date('2023-01-01'),
      isActive: true
    },
    {
      id: 2,
      firstName: 'ນາງສາວ ບົວໃສ',
      lastName: 'ຄຳພິມ',
      email: 'bouasai@example.com',
      phone: '030-567-8901',
      address: '456 ຖະໜົນ ໄຊເສດຖາ, ວຽງຈັນ',
      membershipType: 'ເພັດ',
      points: 2800,
      totalSpent: 3200000,
      lastVisit: new Date('2024-01-20'),
      createdAt: new Date('2022-06-15'),
      isActive: true
    },
    {
      id: 3,
      firstName: 'ທ້າວ ວິໄລ',
      lastName: 'ພົມມະວົງ',
      email: 'vilai@example.com',
      phone: '020-345-6789',
      address: '789 ຖະໜົນ ຫຼວງພະບາງ, ວຽງຈັນ',
      membershipType: 'ເງິນ',
      points: 650,
      totalSpent: 850000,
      lastVisit: new Date('2024-01-18'),
      createdAt: new Date('2023-03-10'),
      isActive: true
    }
  ])

  const searchQuery = ref('')

  const filteredCustomers = computed(() => {
    if (!searchQuery.value) return customers.value

    const query = searchQuery.value.toLowerCase()
    return customers.value.filter(customer =>
      customer.firstName.toLowerCase().includes(query) ||
      customer.lastName.toLowerCase().includes(query) ||
      customer.email?.toLowerCase().includes(query) ||
      customer.phone?.includes(query)
    )
  })

  const getMembershipColor = (membershipType: string) => {
    switch (membershipType) {
      case 'ເພັດ': return 'purple'
      case 'ທອງ': return 'yellow'
      case 'ເງິນ': return 'gray'
      default: return 'blue'
    }
  }

  const getMembershipBadgeClass = (membershipType: string) => {
    switch (membershipType) {
      case 'ເພັດ': return 'bg-purple-100 text-purple-800'
      case 'ທອງ': return 'bg-yellow-100 text-yellow-800'
      case 'ເງິນ': return 'bg-gray-100 text-gray-800'
      default: return 'bg-blue-100 text-blue-800'
    }
  }

  return {
    customers: readonly(customers),
    searchQuery,
    filteredCustomers,
    getMembershipColor,
    getMembershipBadgeClass
  }
})