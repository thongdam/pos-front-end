<template>
  <div class="min-h-screen bg-gray-50">
    <div class="flex">
      <AppSidebar></AppSidebar>
      <ConfirmDialog />
      <InputDialog />
      <div class="flex-1">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppSidebar from '~/components/common/AppSidebar.vue';
import ConfirmDialog from '~/components/common/ConfirmDialog.vue';
import InputDialog from '~/components/common/InputDialog.vue';
</script>