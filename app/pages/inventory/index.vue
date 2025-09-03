<template>
  <div>
    <AppHeader title="ຄຸ້ມຄອງສິນຄ້າ" subtitle="ຈັດການສິນຄ້າແລະສະຕ໋ອກ" />
    <main class="p-6">
      <div v-if="loading" class="flex justify-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>

      <!-- Controls -->
      <div class="flex items-center justify-between mb-6 text-gray-800">
        <div class="flex items-center space-x-4">
          <div class="relative">
            <MagnifyingGlassIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="ຄົ້ນຫາສິນຄ້າ..."
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80"
            />
          </div>
          
          <select v-model="selectedCategoryId" class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">ໝວດໝູ່ທັງໝົດ</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>

          <button @click="resetFilters" class="text-gray-500 hover:text-gray-700 px-3 py-2" :disabled="loading">
            ລ້າງຕົວກອງ
          </button>

          <button @click="refreshData" class="text-blue-500 hover:text-blue-700 px-3 py-2" :disabled="loading">
            <ArrowPathIcon class="w-4 h-4 inline mr-1" />
            ໂຫລດໃໝ່
          </button>
        </div>
        
        <div class="flex space-x-2">
          <button @click="showCategoryModal = true" class="btn-secondary" :disabled="loading">
            <PlusIcon class="w-4 h-4 mr-2" />
            ເພີ່ມໝວດໝູ່
          </button>
          <button @click="showProductModal = true" class="btn-lao" :disabled="loading">
            <PlusIcon class="w-4 h-4 mr-2" />
            ເພີ່ມສິນຄ້າ
          </button>
        </div>
      </div>

      <!-- ສະຖິຕິ -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-lg p-4 border border-gray-200">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg">
              <CubeIcon class="w-5 h-5 text-blue-600" />
            </div>
            <div class="ml-3">
              <p class="text-sm text-gray-600">ສິນຄ້າທັງໝົດ</p>
              <p class="text-lg font-semibold text-gray-900">{{ pagination.total }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg p-4 border border-gray-200">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon class="w-5 h-5 text-green-600" />
            </div>
            <div class="ml-3">
              <p class="text-sm text-gray-600">ສິນຄ້າພຽງພໍ</p>
              <p class="text-lg font-semibold text-gray-900">{{ inStockProducts.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg p-4 border border-gray-200">
          <div class="flex items-center">
            <div class="p-2 bg-yellow-100 rounded-lg">
              <ExclamationTriangleIcon class="w-5 h-5 text-yellow-600" />
            </div>
            <div class="ml-3">
              <p class="text-sm text-gray-600">ສິນຄ້າໃກ້ໝົດ</p>
              <p class="text-lg font-semibold text-gray-900">{{ lowStockProducts.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg p-4 border border-gray-200">
          <div class="flex items-center">
            <div class="p-2 bg-red-100 rounded-lg">
              <XCircleIcon class="w-5 h-5 text-red-600" />
            </div>
            <div class="ml-3">
              <p class="text-sm text-gray-600">ສິນຄ້າໝົດ</p>
              <p class="text-lg font-semibold text-gray-900">{{ outOfStockProducts.length }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ตารางสินค้า -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="table-header-cell text-left">ສິນຄ້າ</th>
                <th class="table-header-cell text-left">ໝວດໝູ່</th>
                <th class="table-header-cell text-right">ລາຄາຂາຍ</th>
                <th class="table-header-cell text-right">ລາຄາທຶນ</th>
                <th class="table-header-cell text-center">ສະຕ໋ອກ</th>
                <th class="table-header-cell text-center">ສະຖານະ</th>
                <th class="table-header-cell text-center">ການກະທຳ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id" class="table-row">
                <td class="table-cell">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-gray-100 rounded-lg mr-3 overflow-hidden">
                      <img 
                        :src="product.images || '/images/missing-picture.webp'" 
                        :alt="product.name"
                        class="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p class="font-medium text-gray-900">{{ product.name }}</p>
                      <p class="text-sm text-gray-500">{{ product.sku }}</p>
                      <p v-if="product.barcode" class="text-xs text-gray-400">{{ product.barcode }}</p>
                    </div>
                  </div>
                </td>
                <td class="table-cell">
                  <span class="badge badge-info" :style="{ backgroundColor: product.category?.color || '#3B82F6' }">
                    {{ getCategoryName(product.category_id) }}
                  </span>
                </td>
                <td class="table-cell text-right font-medium">{{ formatPrice(product.price) }}</td>
                <td class="table-cell text-right text-sm text-gray-600">{{ formatPrice(product.cost) }}</td>
                <td class="table-cell text-center">
                  <div>
                    <span class="font-medium" :class="{
                      'text-red-600': product.stock === 0,
                      'text-yellow-600': product.stock > 0 && product.stock <= product.min_stock,
                      'text-green-600': product.stock > product.min_stock
                    }">
                      {{ product.stock }} {{ product.unit }}
                    </span>
                    <p class="text-xs text-gray-500">
                      ຕໍ່າສຸດ: {{ product.min_stock }} / ສູງສຸດ: {{ product.max_stock }}
                    </p>
                  </div>
                </td>
                <td class="table-cell text-center">
                  <span
                    :class="[
                      'badge',
                      product.stock > product.min_stock ? 'badge-success' :
                      product.stock > 0 ? 'badge-warning' : 'badge-error'
                    ]"
                  >
                    {{ getStockStatus(product) }}
                  </span>
                </td>
                <td class="table-cell text-center">
                  <div class="flex justify-center space-x-2">
                    <button
                      @click="viewProduct(product)"
                      class="text-gray-600 hover:text-gray-800 p-1"
                      title="ເບິ່ງລາຍລະອຽດ"
                    >
                      <EyeIcon class="w-4 h-4" />
                    </button>
                    <button
                      @click="editProduct(product)"
                      class="text-blue-600 hover:text-blue-800 p-1"
                      :disabled="loading"
                      title="ແກ້ໄຂ"
                    >
                      <PencilIcon class="w-4 h-4" />
                    </button>
                    <button
                      @click="handleDeleteProduct(product)"
                      class="text-red-600 hover:text-red-800 p-1"
                      :disabled="loading"
                      title="ລົບ"
                    >
                      <TrashIcon class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="pagination.last_page > 1" class="px-6 py-4 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700">
              ສະແດງ {{ pagination.from }} - {{ pagination.to }} ຈາກ {{ pagination.total }} ລາຍການ
            </div>
            <div class="flex items-center space-x-2">
              <button
                @click="previousPage"
                :disabled="pagination.current_page <= 1 || loading"
                class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ກັບ
              </button>
              
              <span class="px-3 py-1 text-sm">
                ໜ້າ {{ pagination.current_page }} ຈາກ {{ pagination.last_page }}
              </span>
              
              <button
                @click="nextPage"
                :disabled="pagination.current_page >= pagination.last_page || loading"
                class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ຕໍ່
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ບໍ່ພົບສິນຄ້າ -->
      <div v-if="products.length === 0 && !loading" class="text-center py-12">
        <CubeIcon class="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <p class="text-gray-500 font-medium">ບໍ່ພົບສິນຄ້າ</p>
        <p class="text-sm text-gray-400">ລອງຄົ້ນຫາດ້ວຍຄຳສຳຄັນອື່ນ ຫຼື ເພີ່ມສິນຄ້າໃໝ່</p>
      </div>
    </main>

    <!-- Modals -->
    <ProductModal
      v-if="showProductModal"
      :product="selectedProduct"
      :categories="categories"
      @close="closeProductModal"
      @save="handleSaveProduct"
    />

    <ProductDetailModal
      v-if="showDetailModal"
      :product="selectedProduct"
      @close="showDetailModal = false"
    />

    <CategoryModal
      v-if="showCategoryModal"
      @close="showCategoryModal = false"
      @save="handleSaveCategory"
    />
  </div>
</template>

<script setup lang="ts">
import {
  MagnifyingGlassIcon,
  PlusIcon,
  CubeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ArrowPathIcon
} from '@heroicons/vue/24/outline'
import { useProductsStore } from '~/stores/product'
import type { Product, Category } from '~/types'
import { useToast } from '~/composables/useToast'
import AppHeader from '~/components/common/AppHeader.vue'
import ProductModal from '~/components/modals/ProductModal.vue'
import ProductDetailModal from '~/components/modals/ProductModal.vue'
import CategoryModal from '~/components/modals/CategoryModal.vue'
// definePageMeta({
//   middleware: 'auth'
// })
const store = useProductsStore()
const { success, error } = useToast()
// Reactive references from store
const { 
  products, 
  categories, 
  searchQuery, 
  selectedCategoryId, 
  loading,
  error: storeError,
  pagination,
  lowStockProducts,
  outOfStockProducts,
  inStockProducts,
  getCategoryById,
  getCategoryName,
  clearError,
  resetFilters,
  refreshData,
  addProduct,
  updateProduct,
  deleteProduct,
  addCategory,
  nextPage,
  previousPage,
  formatPrice
} = store
// Local state
const showProductModal = ref(false)
const showDetailModal = ref(false)
const showCategoryModal = ref(false)
const selectedProduct = ref<Product | null>(null)
// Initialize store data
onMounted(async () => {
  try {
    await store.initializeStore()
  } catch (err) {
    console.error('Failed to initialize store:', err)
  }
})
// Helper functions
const getStockStatus = (product: Product) => {
  if (product.stock === 0) return 'ໝົດ'
  if (product.stock <= product.min_stock) return 'ໃກ້ໝົດ'
  return 'ພຽງພໍ'
}
// Event handlers
//view product details
const viewProduct = (product: Product) => {
  selectedProduct.value = product
  showDetailModal.value = true
}
//Edit product
const editProduct = (product: Product) => {
  selectedProduct.value = product
  showProductModal.value = true
}
//delete product
const handleDeleteProduct = async (product: Product) => {
  if (confirm(`ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລົບສິນຄ້າ "${product.name}"?`)) {
    try {
      await deleteProduct(product.id)
      success('ລົບສິນຄ້າແລ້ວ', `ລົບສິນຄ້າ ${product.name} ສຳເລັດ`)
    } catch (err: any) {
      error('ເກີດຂ້ໍຜິດພາດ', err.message || 'ບໍ່ສາມາດລົບສິນຄ້າໄດ້')
    }
  }
}

const closeProductModal = () => {
  showProductModal.value = false
  selectedProduct.value = null
}
// save product (add or update)
const handleSaveProduct = async (productData: any) => {
  try {
    let result
    if (selectedProduct.value) {
      // Update existing product
      result = await updateProduct(selectedProduct.value.id, productData)
      if (result.success) {
        success('ອັບເດດສິນຄ້າແລ້ວ', `ອັບເດດສິນຄ້າ ${result.data.name} ສຳເລັດ`)
      }
    } else {
      // Add new product
      result = await addProduct(productData)
      if (result.success) {
        success('ເພີ່ມສິນຄ້າແລ້ວ', `ເພີ່ມສິນຄ້າ ${result.data.name} ສຳເລັດ`)
      }
    }
    
    closeProductModal()
  } catch (err: any) {
    error('ເກີດຂ້ໍຜິດພາດ', err.message || 'ບໍ່ສາມາດບັນທຶກສິນຄ້າໄດ້')
  }
}
// save category
const handleSaveCategory = async (categoryData: any) => {
  try {
    const result = await addCategory(categoryData)
    if (result.success) {
      success('ເພີ່ມໝວດໝູ່ແລ້ວ', `ເພີ່ມໝວດໝູ່ ${result.data.name} ສຳເລັດ`)
      showCategoryModal.value = false
    }
  } catch (err: any) {
    error('ເກີດຂ້ໍຜິດພາດ', err.message || 'ບໍ່ສາມາດບັນທຶກໝວດໝູ່ໄດ້')
  }
}
</script>

<style scoped>
.table-header-cell {
  @apply px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider;
}

.table-cell {
  @apply px-6 py-4 whitespace-nowrap text-sm;
}

.table-row {
  @apply hover:bg-gray-50;
}

.badge {
  @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
}

.badge-info {
  @apply bg-blue-100 text-blue-800;
}

.badge-success {
  @apply bg-green-100 text-green-800;
}

.badge-warning {
  @apply bg-yellow-100 text-yellow-800;
}

.badge-error {
  @apply bg-red-100 text-red-800;
}

.btn-lao {
  @apply bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center;
}

.btn-secondary {
  @apply bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center;
}
</style>