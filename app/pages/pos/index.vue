<template>
  <div>
    <AppHeader title="ແດຊບອດ" subtitle="ພາບລວມການຂາຍແລະສະຖິຕິ" />
    <div
      class="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100"
    >
      <main class="flex-1 relative">
        <!-- Enhanced Header -->
        <!-- Main Content -->
        <div class="p-8 -mt-4 relative z-10">
          <!-- Enhanced Search & Filter Section -->
          <div class="mb-8 space-y-6">
            <!-- Search and Customer Selection -->
            <div class="flex flex-col md:flex-row gap-4">
              <!-- Enhanced Search Bar -->
              <div class="flex-1 relative group">
                <div
                  class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></div>
                <div class="relative">
                  <MagnifyingGlassIcon
                    class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10"
                  />
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="ຄົ້ນຫາສິນຄ້າ..."
                    class="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 font-medium placeholder-gray-500"
                  />
                  <div
                    class="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <kbd
                      class="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 rounded"
                      >⌘K</kbd
                    >
                  </div>
                </div>
              </div>

              <!-- Enhanced Customer Selection -->
              <button
                @click="showCustomerSelect = true"
                class="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 flex items-center justify-center min-w-[200px]"
              >
                <div
                  class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3"
                >
                  <UserIcon class="w-5 h-5" />
                </div>
                <span class="truncate">
                  {{
                    selectedCustomer
                      ? `${selectedCustomer.firstName} ${selectedCustomer.lastName}`
                      : "ເລືອກລູກຄ້າ"
                  }}
                </span>
              </button>
            </div>

            <!-- Enhanced Category Filter -->
            <div
              class="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6"
            >
              <h3
                class="text-lg font-semibold text-gray-800 mb-4 flex items-center"
              >
                <div
                  class="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3"
                >
                  <svg
                    class="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    ></path>
                  </svg>
                </div>
                ໝວດໝູ່ສິນຄ້າ
              </h3>
              <div class="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                <!-- All Categories Button -->
                <button
                  @click="selectedCategoryId = 0"
                  :class="[
                    'px-6 py-3 rounded-xl whitespace-nowrap transition-all duration-200 font-semibold transform hover:scale-105 shadow-sm',
                    selectedCategoryId === 0
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                  ]"
                >
                  <span class="flex items-center">
                    <svg
                      class="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      ></path>
                    </svg>
                    ທັງໝົດ
                  </span>
                </button>

                <!-- Category Buttons -->
                <button
                  v-for="(category, index) in categories"
                  :key="category.id"
                  @click="selectedCategoryId = category.id"
                  :class="[
                    'px-6 py-3 rounded-xl whitespace-nowrap transition-all duration-200 font-semibold transform hover:scale-105 shadow-sm',
                    selectedCategoryId === category.id
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                  ]"
                  :style="{ animationDelay: `${index * 0.1}s` }"
                  class="animate-fade-in-right"
                >
                  {{ category.name }}
                </button>
              </div>
            </div>
          </div>

          <!-- Enhanced Products Grid -->
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
          >
            <TransitionGroup name="product-card" tag="div" class="contents">
              <ProductCard
                v-for="(product, index) in filteredProducts"
                :key="product.id"
                :product="product"
                @add-to-cart="handleAddToCart"
                :style="{ animationDelay: `${index * 0.05}s` }"
                class="animate-fade-in-up transform transition-all duration-300 hover:scale-105"
              />
            </TransitionGroup>
          </div>

          <!-- Enhanced Empty State -->
          <div v-if="filteredProducts.length === 0" class="text-center py-20">
            <div class="relative">
              <!-- Animated Background -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div
                  class="w-40 h-40 bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-full blur-3xl animate-pulse"
                ></div>
              </div>

              <!-- Main Content -->
              <div class="relative z-10">
                <!-- Enhanced Icon -->
                <div
                  class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <CubeIcon class="w-12 h-12 text-gray-400" />
                </div>

                <!-- Text Content -->
                <h3 class="text-2xl font-bold text-gray-800 mb-3">
                  ບໍ່ພົບສິນຄ້າ
                </h3>
                <p class="text-gray-600 mb-6 max-w-md mx-auto">
                  ລອງຄົ້ນຫາດ້ວຍຄຳສຳຄັນອື່ນ ຫຼື ເລືອກໝວດໝູ່ອື່ນ
                </p>

                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    @click="
                      searchQuery = '';
                      selectedCategoryId = 0;
                    "
                    class="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 flex items-center justify-center"
                  >
                    <svg
                      class="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      ></path>
                    </svg>
                    ລ້າງຕົວກອງ
                  </button>
                  <button
                    @click="$router.push('/inventory')"
                    class="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 flex items-center justify-center"
                  >
                    <svg
                      class="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                    ເພີ່ມສິນຄ້າ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Enhanced Cart Sidebar -->
      <CartSidebar />

      <!-- Customer Select Modal -->
      <Transition name="modal">
        <CustomerSelectModal
          v-if="showCustomerSelect"
          @close="showCustomerSelect = false"
          @select="handleCustomerSelect"
        />
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  MagnifyingGlassIcon,
  UserIcon,
  CubeIcon
} from "@heroicons/vue/24/outline";
import { useToast } from "~/composables/useToast";
import CustomerSelectModal from "~/components/modals/CustomerSelect.vue";
import CartSidebar from "~/components/pos/CardSidebar.vue";
import ProductCard from "~/components/pos/ProductCard.vue";
import AppHeader from "~/components/common/AppHeader.vue";
// definePageMeta({
//   middleware: "auth"
// });

const { categories, searchQuery, selectedCategoryId, filteredProducts } =
  useProductsStore();

const { addToCart, setCustomer, selectedCustomer } = usePosStore();
const { success, error } = useToast();

const showCustomerSelect = ref(false);

const handleAddToCart = (product: any) => {
  try {
    addToCart(product, 1);
    success("ເພີ່ມສິນຄ້າແລ້ວ", `ເພີ່ມ ${product.name} ໃສ່ກະຕ່າແລ້ວ`);
  } catch (err: any) {
    error("ຜິດພາດ", err.message);
  }
};

const handleCustomerSelect = (customer: any) => {
  setCustomer(customer);
  showCustomerSelect.value = false;

  if (customer) {
    success(
      "ເລືອກລູກຄ້າແລ້ວ",
      `ເລືອກລູກຄ້າ ${customer.firstName} ${customer.lastName}`
    );
  }
};

// Keyboard shortcut for search
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      const searchInput = document.querySelector(
        'input[placeholder="ຄົ້ນຫາສິນຄ້າ..."]'
      ) as HTMLInputElement;
      searchInput?.focus();
    }
  };

  document.addEventListener("keydown", handleKeydown);

  onUnmounted(() => {
    document.removeEventListener("keydown", handleKeydown);
  });
});
</script>

<style scoped>
/* Hide scrollbar for category buttons */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Product Card Transitions */
.product-card-enter-active,
.product-card-leave-active {
  transition: all 0.3s ease;
}

.product-card-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}

.product-card-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.9);
}

.product-card-move {
  transition: transform 0.3s ease;
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

/* Custom Animations */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-right {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out both;
}

.animate-fade-in-right {
  animation: fade-in-right 0.6s ease-out both;
}

/* Enhanced search input */
input:focus {
  transform: translateY(-1px);
  box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.25),
    0 4px 6px -2px rgba(59, 130, 246, 0.05);
}

/* Button hover effects */
button:hover {
  filter: brightness(1.05);
}

/* Enhanced category button styles */
.category-button-active {
  background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* Loading states */
.loading {
  position: relative;
  overflow: hidden;
}

.loading::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  animation: loading-shimmer 1.5s infinite;
}

@keyframes loading-shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

/* Responsive improvements */
@media (max-width: 768px) {
  .animate-fade-in-right {
    animation-delay: 0s !important;
  }
}
</style>
