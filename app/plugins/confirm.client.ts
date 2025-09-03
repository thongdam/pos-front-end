import { useConfirm } from '~/composables/useConfirm'

export default defineNuxtPlugin(() => {
  const { confirm } = useConfirm()

  return {
    provide: {
      confirm
    }
  }
})