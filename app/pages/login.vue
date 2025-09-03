<template>
  <div class="min-h-screen bg-gradient-to-br from-lao-blue to-blue-800 flex items-center justify-center p-4">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <div class="mx-auto w-20 h-20 bg-lao-gold rounded-full flex items-center justify-center mb-4">
          <ShoppingCartIcon class="w-10 h-10 text-lao-blue" />
        </div>
        <h2 class="text-3xl font-bold text-white">ເຂົ້າສູ່ລະບົບ</h2>
        <p class="mt-2 text-sm text-blue-100">
          ລະບົບ POS ຄົບວົງຈອນສຳລັບປະເທດລາວ
        </p>
      </div>
      
      <div class="bg-white rounded-2xl shadow-xl p-8 text-gray-800">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="space-y-4">
            <div>
              <label for="email" class="form-label">ຊື່ຜູ້ໃຊ້</label>
              <input
                id="email"
                v-model="form.email"
                type="text"
                required
                class="form-input"
                placeholder="ໃສ່ຊື່ຜູ້ໃຊ້"
              />
            </div>
            
            <div>
              <label for="password" class="form-label">ລະຫັດຜ່ານ</label>
              <input
                id="password"
                v-model="form.password"
                type="password"
                required
                class="form-input"
                placeholder="ໃສ່ລະຫັດຜ່ານ"
              />
            </div>
          </div>
          <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {{ error }}
          </div>
          
          <button
            type="submit"
            :disabled="loading"
            class="w-full btn-lao flex items-center justify-center text-lg py-3"
          >
            <div v-if="loading" class="spinner mr-2"></div>
            {{ loading ? 'ກຳລັງເຂົ້າສູ່ລະບົບ...' : 'ເຂົ້າສູ່ລະບົບ' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: 'guest',
  layout: false
})
const { login, loading, error } = useAuth()
const form = reactive({email: '',password: ''
})
const handleLogin = async () => {
  try {
    await login(form)
  } catch (err) {
    // Error handled in store
  }
}
</script>