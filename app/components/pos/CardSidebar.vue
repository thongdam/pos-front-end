<template>
  <div class="w-96 bg-gradient-to-b from-white to-gray-50 border-l border-gray-200 flex flex-col h-screen shadow-xl">
    <!-- Header with Enhanced Gradient -->
    <div class="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-y-1 transform"></div>
      <h2 class="text-xl font-semibold flex items-center relative z-10">
        <div class="p-2 bg-white/20 rounded-lg mr-3 backdrop-blur-sm">
          <ShoppingCartIcon class="w-5 h-5" />
        </div>
        ກະຕ່າສິນຄ້າ
        <span
          v-if="cart.itemCount > 0"
          class="ml-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-blue-900 text-sm px-3 py-1 rounded-full font-bold shadow-lg animate-pulse"
        >
          {{ cart.itemCount }}
        </span>
      </h2>
      <div class="absolute -top-2 -right-2 w-20 h-20 bg-white/10 rounded-full blur-3xl"></div>
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 overflow-y-auto p-4 custom-scrollbar">
      <!-- Empty Cart State -->
      <div
        v-if="cart.items.length === 0 && !showReceiptOptions"
        class="text-center py-16 animate-fade-in"
      >
        <div class="relative">
          <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-inner">
            <ShoppingCartIcon class="w-12 h-12 text-gray-400" />
          </div>
          <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-full blur-2xl -z-10"></div>
        </div>
        <p class="text-gray-600 font-semibold text-lg mb-2">ກະຕ່າເປົ່າ</p>
        <p class="text-sm text-gray-500">ເລືອກສິນຄ້າເພື່ອເພີ່ມໃສ່ກະຕ່າ</p>
        <div class="mt-6 flex justify-center">
          <div class="flex space-x-1">
            <div class="w-2 h-2 bg-blue-300 rounded-full animate-bounce"></div>
            <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
            <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
          </div>
        </div>
      </div>

      <!-- Cart Items -->
      <div v-if="cart.items.length > 0" class="space-y-3">
        <TransitionGroup name="cart-item" tag="div" class="space-y-3">
          <div
            v-for="item in cart.items"
            :key="item.product.id"
            class="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
          >
            <!-- Product Info -->
            <div class="flex items-start justify-between mb-3">
              <div class="flex-1">
                <h3 class="font-semibold text-gray-800 text-sm">{{ item.product.name }}</h3>
                <p class="text-xs text-gray-500 mt-1">{{ formatPrice(item.product.price) }} ກີບ</p>
              </div>
              <!-- Remove Item Button -->
              <button
                @click="removeFromCart(item.product.id)"
                class="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              >
                <TrashIcon class="w-4 h-4" />
              </button>
            </div>

            <!-- Quantity Controls & Total -->
            <div class="flex items-center justify-between">
              <!-- Quantity Controls -->
              <div class="flex items-center space-x-2">
                <button
                  @click="handleUpdateQuantity(item.product.id, item.quantity - 1)"
                  :disabled="item.quantity <= 1"
                  class="w-8 h-8 bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-lg flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                >
                  <MinusIcon class="w-3 h-3" />
                </button>

                <div class="flex items-center justify-center min-w-[40px] h-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                  <span class="text-sm font-bold text-blue-700">{{ item.quantity }}</span>
                </div>

                <button
                  @click="handleUpdateQuantity(item.product.id, item.quantity + 1)"
                  :disabled="item.quantity >= item.product.stock"
                  class="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-lg flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                >
                  <PlusIcon class="w-3 h-3" />
                </button>
              </div>

              <!-- Item Total -->
              <div class="text-right">
                <p class="text-sm font-bold text-gray-800">
                  {{ formatPrice(item.subtotal) }} ກີບ
                </p>
                <p class="text-xs text-gray-500">
                  {{ item.quantity }} x {{ formatPrice(item.price) }}
                </p>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>

    <!-- Order Summary Section -->
    <div
      v-if="cart.items.length > 0 && !showReceiptOptions"
      class="border-t border-gray-200 p-6 space-y-6 bg-gradient-to-t from-gray-50 to-white"
    >
      <!-- Price Breakdown -->
      <div class="space-y-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between py-1">
          <span class="text-sm text-gray-600">ລາຄາລວມ:</span>
          <span class="font-semibold text-gray-800">{{ formatPrice(cart.subtotal) }} ກີບ</span>
        </div>

        <div class="flex items-center justify-between py-1">
          <span class="text-sm text-gray-600">ອາກອນ VAT (10%):</span>
          <span class="font-semibold text-gray-800">{{ formatPrice(cart.taxAmount) }} ກີບ</span>
        </div>

        <div v-if="cart.discountAmount > 0" class="flex items-center justify-between py-1">
          <span class="text-sm text-gray-600">ສ່ວນຫຼຸດ:</span>
          <span class="font-semibold text-red-500">-{{ formatPrice(cart.discountAmount) }} ກີບ</span>
        </div>

        <div class="flex items-center justify-between text-lg font-bold border-t pt-3 mt-3">
          <span class="text-gray-800">ລວມທັງໝົດ:</span>
          <span class="text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {{ formatPrice(cart.total) }} ກີບ
          </span>
        </div>
      </div>

      <!-- Customer Display -->
      <div v-if="selectedCustomer" class="p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div class="flex items-center">
          <UserIcon class="w-5 h-5 text-blue-600 mr-2" />
          <span class="text-sm font-medium text-blue-800">{{ selectedCustomer.firstName }}</span>
        </div>
      </div>

      <!-- Payment Method -->
      <div class="space-y-3">
        <label class="block text-sm font-semibold text-gray-700">ວິທີຊຳລະເງິນ:</label>
        <div class="relative">
          <select
            v-model="paymentMethod"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 font-medium appearance-none cursor-pointer"
          >
            <option value="ເງິນສົດ" class="text-gray-800 font-medium">ເງິນສົດ</option>
            <option value="ບັດເຄຣດິດ" class="text-gray-800 font-medium">ບັດເຄຣດິດ</option>
            <option value="QR" class="text-gray-800 font-medium">QR Code</option>
            <option value="ໂອນເງິນ" class="text-gray-800 font-medium">ໂອນເງິນ</option>
          </select>
          <!-- Custom dropdown arrow -->
          <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDownIcon class="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-3">
        <!-- Checkout Button -->
        <button
          @click="handleCheckout"
          :disabled="loading"
          class="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg"
        >
          <div v-if="loading" class="flex items-center">
            <div class="inline-block w-5 h-5 border-2 border-white border-r-transparent rounded-full animate-spin mr-3"></div>
            ກຳລັງດຳເນີນການ...
          </div>
          <div v-else class="flex items-center">
            <CreditCardIcon class="w-6 h-6 mr-3" />
            ຊຳລະເງິນ
          </div>
        </button>

        <!-- Secondary Actions -->
        <div class="grid grid-cols-2 gap-3">
          <button
            @click="handleApplyDiscount"
            class="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform transition-all duration-200 hover:scale-[1.02] flex items-center justify-center"
          >
            <TagIcon class="w-4 h-4 mr-2" />
            ສ່ວນຫຼຸດ
          </button>
          <button
            @click="handleClearCart"
            class="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform transition-all duration-200 hover:scale-[1.02] flex items-center justify-center"
          >
            <TrashIcon class="w-4 h-4 mr-2" />
            ລ້າງກະຕ່າ
          </button>
        </div>
      </div>
    </div>

    <!-- Receipt Success Section -->
    <div
      v-if="showReceiptOptions"
      class="border-t border-gray-200 p-6 space-y-6 bg-gradient-to-t from-green-50 to-white"
    >
      <!-- Transaction Summary -->
      <div v-if="lastTransaction" class="p-4 bg-white rounded-xl shadow-sm border border-green-200">
        <div class="space-y-3">
          <div class="flex items-center justify-between py-1">
            <span class="text-sm text-gray-600">ລາຄາລວມ:</span>
            <span class="font-semibold">{{ formatPrice(lastTransaction.subtotal) }} ກີບ</span>
          </div>

          <div class="flex items-center justify-between py-1">
            <span class="text-sm text-gray-600">ອາກອນ VAT (10%):</span>
            <span class="font-semibold">{{ formatPrice(lastTransaction.taxAmount) }} ກີບ</span>
          </div>

          <div v-if="lastTransaction.discountAmount > 0" class="flex items-center justify-between py-1">
            <span class="text-sm text-gray-600">ສ່ວນຫຼຸດ:</span>
            <span class="font-semibold text-red-500">-{{ formatPrice(lastTransaction.discountAmount) }} ກີບ</span>
          </div>

          <div class="flex items-center justify-between text-lg font-bold border-t pt-3 mt-3">
            <span>ລວມທັງໝົດ:</span>
            <span class="text-xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {{ formatPrice(lastTransaction.total) }} ກີບ
            </span>
          </div>
        </div>
      </div>

      <!-- Success Message -->
      <div class="text-center p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border border-green-200">
        <div class="flex items-center justify-center mb-2">
          <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
            <CheckIcon class="w-5 h-5 text-white" />
          </div>
          <p class="text-lg font-bold text-green-800">ຊຳລະເງິນສຳເລັດ!</p>
        </div>
      </div>

      <!-- New Sale Button -->
      <button
        @click="resetTransaction"
        class="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-[1.02] flex items-center justify-center"
      >
        <PlusIcon class="w-5 h-5 mr-3" />
        ເລີ່ມການຂາຍໃໝ່
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ShoppingCartIcon,
  CreditCardIcon,
  TagIcon,
  TrashIcon,
  PlusIcon,
  MinusIcon,
  UserIcon,
  ChevronDownIcon,
  CheckIcon
} from '@heroicons/vue/24/outline'
import { usePosStore } from '~/stores/pos'
import { useToast } from '~/composables/useToast'

// Stores and composables
const posStore = usePosStore()
const { success, error } = useToast()

// Reactive data from store
const {
  cart,
  selectedCustomer,
  paymentMethod,
  loading,
  updateQuantity,
  removeFromCart,
  clearCart,
  applyDiscount,
  checkout
} = posStore

// Local state
const showReceiptOptions = ref(false)
const lastTransaction = ref<any>(null)
const discountInput = ref(0)

// Methods
const formatPrice = (price: number): string => {
  return price.toLocaleString()
}

const handleUpdateQuantity = async (productId: number, quantity: number) => {
  try {
    updateQuantity(productId, quantity)
  } catch (err: any) {
    error('ຜິດພາດ', err.message)
  }
}

const handleCheckout = async () => {
  if (cart.items.length === 0) {
    error('ຜິດພາດ', 'ບໍ່ມີສິນຄ້າໃນກະຕ່າ')
    return
  }

  // Show confirmation dialog
  const customerName = selectedCustomer?.firstName || 'ລູກຄ້າທົ່ວໄປ'
  const confirmMessage = `ຢືນຢັນການຊຳລະເງິນ?\n\nລູກຄ້າ: ${customerName}\nວິທີຊຳລະ: ${paymentMethod}\nລວມ: ${formatPrice(cart.total)} ກີບ`
  
  if (!confirm(confirmMessage)) {
    return
  }

  try {
    // Store cart snapshot before checkout
    const cartSnapshot = {
      items: [...cart.items],
      subtotal: cart.subtotal,
      discountAmount: cart.discountAmount,
      taxAmount: cart.taxAmount,
      total: cart.total,
      itemCount: cart.itemCount
    }

    const result = await checkout()
    
    if (result.success) {
      // Store transaction data
      lastTransaction.value = {
        ...cartSnapshot,
        customer: selectedCustomer,
        paymentMethod: paymentMethod,
        timestamp: new Date().toISOString(),
        saleId: result.sale?.id
      }

      success('ຊຳລະເງິນສຳເລັດ!', `ລວມ: ${formatPrice(result.total)} ກີບ`)
      showReceiptOptions.value = true
      discountInput.value = 0
      
    } else {
      throw new Error('ການຊຳລະເງິນບໍ່ສຳເລັດ')
    }
  } catch (err: any) {
    console.error('Checkout error:', err)
    
    // More detailed error messages
    let errorMessage = 'ບໍ່ສາມາດຊຳລະເງິນໄດ້'
    
    if (err.message) {
      errorMessage = err.message
    }
    
    error('ຜິດພາດ', errorMessage)
  }
}

const handleClearCart = () => {
  if (confirm('ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລ້າງກະຕ່າທັງໝົດ?')) {
    clearCart()
    resetTransaction()
    success('ລ້າງກະຕ່າແລ້ວ', 'ລ້າງສິນຄ້າອອກຈາກກະຕ່າທັງໝົດແລ້ວ')
  }
}

const handleApplyDiscount = () => {
  const discount = prompt('ໃສ່ຈຳນວນເງິນສ່ວນຫຼຸດ (ກີບ):')
  
  if (discount !== null && discount.trim() !== '') {
    const discountAmount = parseFloat(discount)
    
    if (isNaN(discountAmount) || discountAmount < 0) {
      error('ຜິດພາດ', 'ກະລຸນາໃສ່ຈຳນວນເງິນທີ່ຖືກຕ້ອງ')
      return
    }
    
    if (discountAmount > cart.subtotal) {
      error('ຜິດພາດ', 'ສ່ວນຫຼຸດບໍ່ສາມາດເກີນລາຄາລວມໄດ້')
      return
    }
    
    applyDiscount(discountAmount)
    success('ໃຊ້ສ່ວນຫຼຸດແລ້ວ', `ສ່ວນຫຼຸດ ${formatPrice(discountAmount)} ກີບ`)
  }
}

const resetTransaction = () => {
  showReceiptOptions.value = false
  lastTransaction.value = null
}
</script>

<style scoped>
/* Custom Animations */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

/* Cart Item Transitions */
.cart-item-enter-active,
.cart-item-leave-active {
  transition: all 0.3s ease;
}

.cart-item-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.cart-item-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.cart-item-move {
  transition: transform 0.3s ease;
}

/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #cbd5e1, #94a3b8);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #94a3b8, #64748b);
}

/* Remove spinner arrows from number inputs */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>