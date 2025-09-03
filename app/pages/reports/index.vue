<template>
  <div>
    <AppHeader title="ລາຍງານ" subtitle="ສະຖິຕິແລະລາຍງານການຂາຍ" />
    
    <main class="p-6">
      <!-- ກອງວັນທີ -->
      <div class="bg-white rounded-lg p-4 mb-6 border border-gray-200">
        <div class="flex items-center space-x-4">
          <div>
            <label class="form-label">ວັນທີເລີ່ມຕົ້ນ</label>
            <input
              v-model="dateRange.start"
              type="date"
              class="form-input"
            />
          </div>
          <div>
            <label class="form-label">ວັນທີສິ້ນສຸດ</label>
            <input
              v-model="dateRange.end"
              type="date"
              class="form-input"
            />
          </div>
          <div class="pt-6">
            <button @click="generateReport" class="btn-lao">
              <ChartBarIcon class="w-4 h-4 mr-2" />
              ສ້າງລາຍງານ
            </button>
          </div>
        </div>
      </div>

      <!-- สถิติรวม -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="card">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg">
              <CurrencyDollarIcon class="w-6 h-6 text-green-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">ຍອດຂາຍລວມ</p>
              <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(reportData.totalSales) }}</p>
              <p class="text-sm text-green-600">+12% ຈາກເດືອນແລ້ວ</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg">
              <ShoppingCartIcon class="w-6 h-6 text-blue-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">ການຂາຍທັງໝົດ</p>
              <p class="text-2xl font-bold text-gray-900">{{ reportData.totalOrders }}</p>
              <p class="text-sm text-blue-600">+8% ຈາກເດືອນແລ້ວ</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center">
            <div class="p-2 bg-purple-100 rounded-lg">
              <UsersIcon class="w-6 h-6 text-purple-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">ລູກຄ້າໃໝ່</p>
              <p class="text-2xl font-bold text-gray-900">{{ reportData.newCustomers }}</p>
              <p class="text-sm text-purple-600">+15% ຈາກເດືອນແລ້ວ</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center">
            <div class="p-2 bg-yellow-100 rounded-lg">
              <ChartBarIcon class="w-6 h-6 text-yellow-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">ຄ່າເຉລີ່ຍຕໍ່ບິນ</p>
              <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(reportData.averageOrderValue) }}</p>
              <p class="text-sm text-yellow-600">+5% ຈາກເດືອນແລ້ວ</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- สินค้าขายดี -->
        <div class="card">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">ສິນຄ້າຂາຍດີ</h3>
            <select class="border border-gray-300 rounded px-3 py-1 text-sm">
              <option>7 ວັນທີ່ຜ່ານມາ</option>
              <option>30 ວັນທີ່ຜ່ານມາ</option>
              <option>3 ເດືອນທີ່ຜ່ານມາ</option>
            </select>
          </div>
          <div class="space-y-3">
            <div v-for="(product, index) in topProducts" :key="product.id" class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-8 h-8 bg-lao-gold rounded-full flex items-center justify-center mr-3">
                  <span class="text-sm font-bold text-lao-blue">{{ index + 1 }}</span>
                </div>
                <div class="w-10 h-10 bg-gray-100 rounded-lg mr-3 overflow-hidden">
                  <img 
                    :src="product.images || '/images/placeholder.jpg'" 
                    :alt="product.name"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ product.name }}</p>
                  <p class="text-sm text-gray-500">{{ formatCurrency(product.price) }}</p>
                </div>
              </div>
              <!-- <div class="text-right">
                <p class="font-semibold text-gray-900">{{ product.soldQuantity || (120 - index * 20) }} {{ product.unit }}</p>
                <p class="text-sm text-green-600">{{ formatCurrency((product.soldQuantity || (120 - index * 20)) * product.price) }}</p>
              </div> -->
            </div>
          </div>
        </div>

        <!-- การขายตามหมวดหมู่ -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">ການຂາຍຕາມໝວດໝູ່</h3>
          <div class="space-y-4">
            <div v-for="category in categoryStats" :key="category.id" class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="font-medium text-gray-900">{{ category.name }}</span>
                <span class="text-sm font-semibold text-gray-700">{{ formatCurrency(category.sales) }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div 
                  class="bg-lao-gold h-2 rounded-full" 
                  :style="{ width: `${(category.sales / maxCategorySales) * 100}%` }"
                ></div>
              </div>
              <div class="flex justify-between text-sm text-gray-500">
                <span>{{ category.percentage }}% ຂອງຍອດຂາຍລວມ</span>
                <span>{{ category.orders }} ລາຍການ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ปุ่มส่งออกรายงาน -->
      <div class="mt-8 flex justify-center space-x-4">
        <button @click="exportToPDF" class="btn-secondary">
          <DocumentArrowDownIcon class="w-4 h-4 mr-2" />
          ສົ່ງອອກ PDF
        </button>
        <button @click="exportToExcel" class="btn-lao">
          <DocumentArrowDownIcon class="w-4 h-4 mr-2" />
          ສົ່ງອອກ Excel
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UsersIcon,
  DocumentArrowDownIcon
} from '@heroicons/vue/24/outline'
import { useProductsStore } from '~/stores/product'
import { useToast } from '~/composables/useToast'
// definePageMeta({
//   middleware: 'auth'
// })

const { products, categories } = useProductsStore()
const { success } = useToast()

const dateRange = reactive({
  start: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
  end: new Date().toISOString().split('T')[0]
})

const reportData = ref({
  totalSales: 15650000,
  totalOrders: 324,
  newCustomers: 28,
  averageOrderValue: 48300
})

const topProducts = computed(() => {
  return products.slice(0, 5)
})

const categoryStats = computed(() => {
  const stats = categories.map((category, index) => ({
    id: category.id,
    name: category.name,
    sales: (5000000 - index * 800000),
    orders: (120 - index * 15),
    percentage: Math.round((5000000 - index * 800000) / reportData.value.totalSales * 100)
  }))
  return stats
})

const maxCategorySales = computed(() => {
  return Math.max(...categoryStats.value.map(c => c.sales))
})

const formatCurrency = (amount: number) => {
  return amount.toLocaleString() + ' ກີບ'
}

const generateReport = () => {
  success('ສ້າງລາຍງານແລ້ວ', `ສ້າງລາຍງານຈາກ ${dateRange.start} ຫາ ${dateRange.end} ສຳເລັດ`)
}

const exportToPDF = () => {
  success('ສົ່ງອອກ PDF', 'ກຳລັງດາວໂຫຼດລາຍງານ PDF...')
}

const exportToExcel = () => {
  success('ສົ່ງອອກ Excel', 'ກຳລັງດາວໂຫຼດລາຍງານ Excel...')
}
</script>