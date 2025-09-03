
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ToastNotification />
  </div>
</template>
<script setup lang="ts">
import '~/assets/css/main.css'
import ToastNotification from './components/common/ToastNotification.vue';
useHead({
  title: 'ລະບົບ POS ຄົບວົງຈອນ - ສຳລັບປະເທດລາວ',
  meta: [
    { name: 'description', content: 'ລະບົບຂາຍຫນ້າຮ້ານທີ່ສົມບູນແບບສຳລັບຮ້ານຄ້າທຸກປະເພດໃນປະເທດລາວ' }
  ]
})
</script>