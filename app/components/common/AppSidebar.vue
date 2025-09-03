<template>
  <div class="sidebar bg-gradient-to-b from-white via-gray-50 to-gray-100 shadow-2xl border-r border-gray-200/50">
    <!-- Enhanced Header -->
    <div class="p-6 border-b border-gray-200/50 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
      <!-- Background decorative elements -->
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-1"></div>
      <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
      <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
      
      <!-- Content -->
      <div class="relative z-10">
        <div class="flex items-center mb-2">
          <div class="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
            <ShoppingCartIcon class="w-6 h-6 text-blue-900" />
          </div>
          <h2 class="text-xl font-bold text-yellow-300 tracking-wide">ລະບົບ POS</h2>
        </div>
        <p class="text-sm text-blue-100 opacity-90 font-medium">ລະບົບຂາຍຫນ້າຮ້ານຄົບວົງຈອນ</p>
        
        <!-- Animated indicator -->
        <div class="mt-3 flex space-x-1">
          <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style="animation-delay: 0.3s"></div>
          <div class="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style="animation-delay: 0.6s"></div>
        </div>
      </div>
    </div>

    <!-- Enhanced Navigation -->
    <nav class="sidebar-nav p-4 space-y-2">
      <NuxtLink
        v-for="(item, index) in menuItems"
        :key="item.name"
        :to="item.href"
        class="sidebar-nav-item group"
        :class="{ active: $route.path.startsWith(item.href) }"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <!-- Background hover effect -->
        <div class="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/10 group-hover:to-indigo-500/10 rounded-xl transition-all duration-300"></div>
        
        <!-- Icon container -->
        <div class="relative z-10 flex items-center w-full">
          <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-blue-500 group-hover:to-indigo-600 transition-all duration-300 mr-4 shadow-sm group-hover:shadow-lg">
            <component 
              :is="item.icon" 
              class="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300"
              :class="{ 'text-blue-600': $route.path.startsWith(item.href) }"
            />
          </div>
          
          <!-- Text -->
          <span class="font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-300 flex-1"
                :class="{ 'text-blue-700 font-bold': $route.path.startsWith(item.href) }">
            {{ item.name }}
          </span>
          
          <!-- Enhanced Badge -->
          <div v-if="item.badge" 
               class="ml-auto flex items-center justify-center min-w-[24px] h-6 px-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
            {{ item.badge }}
          </div>
          
          <!-- Active indicator -->
          <div v-if="$route.path.startsWith(item.href)" 
               class="absolute right-0 w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-l-full shadow-lg"></div>
        </div>
        
        <!-- Ripple effect on click -->
        <div class="absolute inset-0 rounded-xl overflow-hidden">
          <div class="ripple-effect"></div>
        </div>
      </NuxtLink>
    </nav>

    <!-- Footer section -->
    <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-100 to-transparent">
      <div class="flex items-center justify-center p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm">
        <div class="flex items-center space-x-2">
          <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span class="text-xs font-medium text-gray-600">ເຊື່ອມຕໍ່ແລ້ວ</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  HomeIcon,
  ShoppingCartIcon,
  CubeIcon,
  UsersIcon,
  ChartBarIcon,
  CogIcon
} from '@heroicons/vue/24/outline'

import { useProductsStore } from '~/stores/product';

const { lowStockProducts } = useProductsStore()

const menuItems = computed(() => [
  {
    name: 'ແດຊບອດ',
    href: '/dashboard',
    icon: HomeIcon
  },
  {
    name: 'ຈຸດຂາຍ',
    href: '/pos',
    icon: ShoppingCartIcon
  },
  {
    name: 'ຄຸ້ມຄອງສິນຄ້າ',
    href: '/inventory',
    icon: CubeIcon,
    badge: lowStockProducts.length > 0 ? lowStockProducts.length : undefined
  },
  {
    name: 'ລູກຄ້າ',
    href: '/customers',
    icon: UsersIcon
  },
  {
    name: 'ລາຍງານ',
    href: '/reports',
    icon: ChartBarIcon
  },
  {
    name: 'ຕັ້ງຄ່າ',
    href: '/settings',
    icon: CogIcon
  }
])
</script>

<style scoped>
.sidebar {
  @apply w-64 h-screen relative;
  animation: slide-in-left 0.5s ease-out;
}

.sidebar-nav-item {
  @apply relative flex items-center px-4 py-3 text-gray-700 rounded-xl transition-all duration-300 cursor-pointer;
  animation: fade-in-up 0.6s ease-out both;
  
  /* Hover effects */
  &:hover {
    @apply transform translate-x-1 shadow-lg;
  }
  
  /* Active state */
  &.active {
    @apply bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 shadow-md;
    
    /* Enhanced active icon */
    .icon-container {
      @apply bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg;
    }
  }
}

/* Animations */
@keyframes slide-in-left {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

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

/* Ripple effect */
.ripple-effect {
  @apply absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 transform scale-0 rounded-xl;
  transition: transform 0.3s ease-out;
}

.sidebar-nav-item:active .ripple-effect {
  @apply scale-100;
  animation: ripple 0.6s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

/* Enhanced hover effects */
.sidebar-nav-item:hover::before {
  content: '';
  @apply absolute left-0 top-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-r-full transform -translate-y-1/2 transition-all duration-300;
  animation: slide-in-right 0.3s ease-out;
}

@keyframes slide-in-right {
  from {
    transform: translateY(-50%) translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(-50%) translateX(0);
    opacity: 1;
  }
}

/* Badge enhancement */
.sidebar-nav-item .badge {
  animation: bounce-in 0.5s ease-out;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

/* Glowing effect for active items */
.sidebar-nav-item.active {
  box-shadow: 
    0 4px 6px -1px rgba(59, 130, 246, 0.1),
    0 2px 4px -1px rgba(59, 130, 246, 0.06),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
}

/* Smooth icon transitions */
.sidebar-nav-item svg {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-nav-item:hover svg {
  transform: scale(1.1);
}

.sidebar-nav-item.active svg {
  transform: scale(1.05);
  filter: drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3));
}

/* Custom scrollbar if needed */
.sidebar-nav::-webkit-scrollbar {
  width: 4px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, rgba(59, 130, 246, 0.3), rgba(99, 102, 241, 0.3));
  border-radius: 2px;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, rgba(59, 130, 246, 0.5), rgba(99, 102, 241, 0.5));
}
</style>