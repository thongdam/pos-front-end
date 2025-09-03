<template>
  <div>
    <AppHeader title="ຕັ້ງຄ່າ" subtitle="ຕັ້ງຄ່າລະບົບແລະຮ້ານຄ້າ" />

    <main class="p-12 text-gray-900">
      <!-- grid 2 -->
      <div class="max-w-12xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- card 1 -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">ຂໍ້ມູນຮ້ານຄ້າ</h3>
          <form @submit.prevent="saveStoreSettings" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-group">
                <label class="form-label">ຊື່ຮ້ານ</label>
                <input v-model="storeSettings.name" type="text" class="form-input" placeholder="ໃສ່ຊື່ຮ້ານ" />
              </div>
              <div class="form-group">
                <label class="form-label">ເບີໂທ</label>
                <input v-model="storeSettings.phone" type="tel" class="form-input" placeholder="020-xxx-xxxx" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">ທີ່ຢູ່</label>
              <textarea v-model="storeSettings.address" class="form-input" rows="3" placeholder="ທີ່ຢູ່ຮ້ານຄ້າ"></textarea>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-group">
                <label class="form-label">ອີເມລ</label>
                <input v-model="storeSettings.email" type="email" class="form-input" placeholder="email@example.com" />
              </div>
              <div class="form-group">
                <label class="form-label">ເລກປະຈຳຕົວຜູ້ເສຍອາກອນ</label>
                <input v-model="storeSettings.taxId" type="text" class="form-input" placeholder="xxx-xxx-xxx" />
              </div>
            </div>
            <div class="flex justify-end">
              <button type="submit" class="btn-lao">
                <CheckIcon class="w-4 h-4 mr-2" />
                ບັນທຶກຂໍ້ມູນຮ້ານ
              </button>
            </div>
          </form>
        </div>

        <!-- card 2 -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">ການຕັ້ງຄ່າລະບົບ</h3>
          <div class="space-y-6">
            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 class="font-medium text-gray-900">ອາກອນ VAT</h4>
                <p class="text-sm text-gray-500">ຕັ້ງຄ່າອັດຕາອາກອນມູນຄ່າເພີ່ມ</p>
              </div>
              <div class="flex items-center space-x-2">
                <input v-model.number="systemSettings.vatRate" type="number" min="0" max="100" step="0.1"
                  class="w-20 px-2 py-1 border border-gray-300 rounded text-center" />
                <span class="text-gray-600">%</span>
              </div>
            </div>
            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 class="font-medium text-gray-900">ສະກຸນເງິນ</h4>
                <p class="text-sm text-gray-500">ເລືອກສະກຸນເງິນຫຼັກ</p>
              </div>
              <select v-model="systemSettings.currency" class="border border-gray-300 text-gray-900 rounded px-3 py-1">
                <option value="LAK">ລາວ ກີບ (LAK)</option>
                <option value="THB">ໄທ ບາດ (THB)</option>
                <option value="USD">ໂດລາ ສຫລ (USD)</option>
              </select>
            </div>
            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 class="font-medium text-gray-900">ແຈ້ງເຕືອນສະຕ໋ອກຕໍ່າ</h4>
                <p class="text-sm text-gray-500">ແຈ້ງເຕືອນເມື່ອສິນຄ້າໃກ້ໝົດ</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input v-model="systemSettings.lowStockAlert" type="checkbox" class="sr-only peer" />
                <div
                  class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:bg-white after:border after:rounded-full after:transition-all peer-checked:after:translate-x-full">
                </div>
              </label>
            </div>
            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 class="font-medium text-gray-900">ພິມໃບຮັບອັດຕະໂນມັດ</h4>
                <p class="text-sm text-gray-500">ພິມໃບຮັບເງິນຫຼັງຊຳລະເງິນ</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input v-model="systemSettings.autoPrint" type="checkbox" class="sr-only peer" />
                <div
                  class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:bg-white after:border after:rounded-full after:transition-all peer-checked:after:translate-x-full">
                </div>
              </label>
            </div>
            <div class="flex justify-end">
              <button @click="saveSystemSettings" class="btn-lao">
                <CheckIcon class="w-4 h-4 mr-2" />
                ບັນທຶກການຕັ້ງຄ່າ
              </button>
            </div>
          </div>
        </div>

        <!-- card 3 -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">ການສຳຣອງຂໍ້ມູນ</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 class="font-medium text-gray-900">ສຳຣອງຂໍ້ມູນອັດຕະໂນມັດ</h4>
                <p class="text-sm text-gray-500">ສຳຣອງຂໍ້ມູນທຸກມື້ ເວລາ 02:00</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input v-model="backupSettings.autoBackup" type="checkbox" class="sr-only peer" />
                <div
                  class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:bg-white after:border after:rounded-full after:transition-all peer-checked:after:translate-x-full">
                </div>
              </label>
            </div>
            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 class="font-medium text-gray-900">ການສຳຣອງຄັ້ງສຸດທ້າຍ</h4>
                <p class="text-sm text-gray-500">{{ lastBackup }}</p>
              </div>
              <button @click="createBackup" class="btn-secondary">
                <CloudArrowUpIcon class="w-4 h-4 mr-2" />
                ສຳຣອງດຽວນີ້
              </button>
            </div>
            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 class="font-medium text-gray-900">ນຳເຂົ້າຂໍ້ມູນ</h4>
                <p class="text-sm text-gray-500">ກູ້ຄືນຂໍ້ມູນຈາກໄຟລ໌ສຳຣອງ</p>
              </div>
              <button @click="restoreBackup" class="btn-secondary">
                <CloudArrowDownIcon class="w-4 h-4 mr-2" />
                ກູ້ຄືນຂໍ້ມູນ
              </button>
            </div>
          </div>
        </div>

        <!-- card 4 -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">ກ່ຽວກັບລະບົບ</h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">ເວີຊັນລະບົບ</span>
              <span class="font-medium">v1.0.0</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">ເຄື່ອງມືພັດທະນາ</span>
              <span class="font-medium">Nuxt.js 4.0.1</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">ອັບເດດຄັ້ງສຸດທ້າຍ</span>
              <span class="font-medium">{{ formatDate(new Date()) }}</span>
            </div>
            <div class="pt-4 border-t">
              <p class="text-sm text-gray-500 text-center">
                🇱🇦 ສ້າງດ້ວຍ ❤️ ສຳລັບປະເທດລາວ
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { CheckIcon, CloudArrowUpIcon, CloudArrowDownIcon } from '@heroicons/vue/24/outline'
import { useToast } from '~/composables/useToast'
import AppHeader from '~/components/common/AppHeader.vue'

const { success } = useToast()

const storeSettings = reactive({
  name: 'ຮ້ານຄ້າລາວ',
  phone: '020-234-5678',
  address: '123 ຖະໜົນ ສຸກຫ້າ, ນະຄອນຫຼວງວຽງຈັນ',
  email: 'info@laoshop.com',
  taxId: '123-456-789'
})

const systemSettings = reactive({
  vatRate: 10,
  currency: 'LAK',
  lowStockAlert: true,
  autoPrint: false
})

const backupSettings = reactive({
  autoBackup: true
})

const lastBackup = ref('21 ມັງກອນ 2024, 02:00')

const formatDate = (date: Date) => {
  return date.toLocaleDateString('lo-LA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const saveStoreSettings = () => {
  success('ບັນທຶກແລ້ວ', 'ບັນທຶກຂໍ້ມູນຮ້ານຄ້າສຳເລັດ')
}

const saveSystemSettings = () => {
  success('ບັນທຶກແລ້ວ', 'ບັນທຶກການຕັ້ງຄ່າລະບົບສຳເລັດ')
}

const createBackup = () => {
  success('ສຳຣອງຂໍ້ມູນ', 'ກຳລັງສຳຣອງຂໍ້ມູນ...')
  lastBackup.value = formatDate(new Date()) + ', ' + new Date().toLocaleTimeString('lo-LA', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const restoreBackup = () => {
  if (confirm('ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການກູ້ຄືນຂໍ້ມູນ? ຂໍ້ມູນປັດຈຸບັນຈະຖືກແທນທີ່')) {
    success('ກູ້ຄືນຂໍ້ມູນ', 'ກຳລັງກູ້ຄືນຂໍ້ມູນຈາກໄຟລ໌ສຳຣອງ...')
  }
}
</script>
