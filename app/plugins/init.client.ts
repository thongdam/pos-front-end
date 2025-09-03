export default defineNuxtPlugin(() => {
  if (process.client) {
    // ຕັ້ງຄ່າພາສາ
    document.documentElement.lang = 'lo'
    document.documentElement.dir = 'ltr'
    
    console.log('🚀 ລະບົບ POS ລາວເລີ່ມຕົ້ນສຳເລັດ')
  }
})