<template>
  <div>
    <AppHeader title="ແດຊບອດ" subtitle="ພາບລວມການຂາຍແລະສະຖິຕິ" />

    <main class="p-6">
      <!-- ສະຖິຕິລາຍວັນ -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="card">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg">
              <CurrencyDollarIcon class="w-6 h-6 text-blue-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">ຍອດຂາຍວັນນີ້</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ formatCurrency(stats.todaySales) }}
              </p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg">
              <ShoppingCartIcon class="w-6 h-6 text-green-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">ການຂາຍວັນນີ້</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ stats.todayOrders }}
              </p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center">
            <div class="p-2 bg-yellow-100 rounded-lg">
              <UsersIcon class="w-6 h-6 text-yellow-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">ລູກຄ້າໃໝ່</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ stats.newCustomers }}
              </p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center">
            <div class="p-2 bg-red-100 rounded-lg">
              <ExclamationTriangleIcon class="w-6 h-6 text-red-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">ສິນຄ້າໃກ້ໝົດ</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ lowStockProducts.length }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- ສິນຄ້າຂາຍດີ -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">ສິນຄ້າຂາຍດີ</h3>
          <div class="space-y-3">
            <div
              v-for="product in topProducts"
              :key="product.id"
              class="flex items-center justify-between"
            >
              <div class="flex items-center">
                <div
                  class="w-10 h-10 bg-gray-100 rounded-lg mr-3 flex items-center justify-center"
                >
                  <img
                    :src="product.images || '/images/missing-picture.webp'"
                    :alt="product.name"
                    class="w-8 h-8 object-cover rounded"
                  />
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ product.name }}</p>
                  <p class="text-sm text-gray-500">{{ product.unit }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-900">
                  {{ formatCurrency(product.price) }}
                </p>
                <p class="text-sm text-green-600">
                  ຂາຍ
                  {{ ("soldToday" in product ? product.soldToday : 12) || 12 }}
                  {{ product.unit || "" }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- ສິນຄ້າໃກ້ໝົດ -->
        <div class="card">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">ສິນຄ້າໃກ້ໝົດ</h3>
            <NuxtLink
              to="/inventory"
              class="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ເບິ່ງທັງໝົດ
            </NuxtLink>
          </div>
          <div class="space-y-3">
            <div
              v-for="product in lowStockProducts"
              :key="product.id"
              class="flex items-center justify-between"
            >
              <div class="flex items-center">
                <div
                  class="w-10 h-10 bg-gray-100 rounded-lg mr-3 flex items-center justify-center"
                >
                  <img
                    :src="product.images || '/images/missing-picture.webp'"
                    :alt="product.name"
                    class="w-8 h-8 object-cover rounded"
                  />
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ product.name }}</p>
                  <p class="text-sm text-gray-500">
                    ຕໍ່າສຸດ: {{ product.min_stock }} {{ product.unit }}
                  </p>
                </div>
              </div>
              <div class="text-right">
                <span
                  class="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800"
                >
                  {{ product.stock }} {{ product.unit }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ປຸ່ມລັດ -->
      <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <NuxtLink to="/pos" class="card card-hover text-center">
          <ShoppingCartIcon class="w-12 h-12 mx-auto text-lao-blue mb-3" />
          <h3 class="font-semibold text-lg text-gray-900">ຈຸດຂາຍ</h3>
          <p class="text-sm text-gray-600">ເລີ່ມຂາຍສິນຄ້າ</p>
        </NuxtLink>

        <NuxtLink to="/inventory" class="card card-hover text-center">
          <CubeIcon class="w-12 h-12 mx-auto text-lao-blue mb-3" />
          <h3 class="font-semibold text-lg text-gray-900">ຄຸ້ມຄອງສິນຄ້າ</h3>
          <p class="text-sm text-gray-600">ຈັດການສິນຄ້າ</p>
        </NuxtLink>

        <NuxtLink to="/reports" class="card card-hover text-center">
          <ChartBarIcon class="w-12 h-12 mx-auto text-lao-blue mb-3" />
          <h3 class="font-semibold text-lg text-gray-900">ລາຍງານ</h3>
          <p class="text-sm text-gray-600">ເບິ່ງສະຖິຕິ</p>
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UsersIcon,
  ExclamationTriangleIcon,
  CubeIcon,
  ChartBarIcon
} from "@heroicons/vue/24/outline";
import AppHeader from "~/components/common/AppHeader.vue";
// definePageMeta({
//   middleware: "auth"
// });

const { products, lowStockProducts } = useProductsStore();

const stats = ref({
  todaySales: 2450000,
  todayOrders: 28,
  newCustomers: 5,
  lowStock: lowStockProducts.length
});

const topProducts = computed(() => {
  return products.slice(0, 5);
});

const formatCurrency = (amount: number) => {
  return amount.toLocaleString() + " ກີບ";
};
</script>
