// stores/header.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useHeaderStore = defineStore('header', () => {
  // state
  const isMobMenuVisible = ref(false)
  const headerHeight = ref(0)

  // getters
  const isOpen = computed(() => isMobMenuVisible.value)
  const getHeaderHeight = computed(() => headerHeight.value)

  // actions
  const toggleMobMenu = () => { isMobMenuVisible.value = !isMobMenuVisible.value }
  const openMobMenu   = () => { isMobMenuVisible.value = true }
  const closeMobMenu  = () => { isMobMenuVisible.value = false }
  const setHeaderHeight = (height: number) => { headerHeight.value = height }

  return {
    isMobMenuVisible,
    isOpen,
    toggleMobMenu,
    openMobMenu,
    closeMobMenu,
    getHeaderHeight,
    headerHeight,
    setHeaderHeight
  }
})