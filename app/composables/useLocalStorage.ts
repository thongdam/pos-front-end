/**
 * Composable ສຳຫຼັບຈັດການ localStorage
 */

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const value = ref<T>(defaultValue)
  
  // ອ່ານຄ່າຈາກ localStorage ເມື່ອເລິ່ມ
  onMounted(() => {
    if (process.client && typeof Storage !== 'undefined') {
      try {
        const stored = localStorage.getItem(key)
        if (stored !== null) {
          value.value = JSON.parse(stored)
        }
      } catch (error) {
        console.warn(`ບໍ່ສາມາດອ່ານຂໍ້ມູນຈາກ localStorage key: ${key}`, error)
      }
    }
  })
  
  // ບັນທຶກໃນ localStorage ເມື່ອມີການປ່ຽນແປງຂໍ້ມູນ
  watch(
    value,
    (newValue) => {
      if (process.client && typeof Storage !== 'undefined') {
        try {
          localStorage.setItem(key, JSON.stringify(newValue))
        } catch (error) {
          console.warn(`ບໍ່ສາມາດບັນທຶກຂໍ້ມູນລົງ localStorage key: ${key}`, error)
        }
      }
    },
    { deep: true }
  )
  
  const remove = () => {
    value.value = defaultValue
    if (process.client && typeof Storage !== 'undefined') {
      localStorage.removeItem(key)
    }
  }
  
  const clear = () => {
    if (process.client && typeof Storage !== 'undefined') {
      localStorage.clear()
    }
  }
  
  return {
    value,
    remove,
    clear
  }
}