
<template>
  <div class="min-h-screen h-full bg-[var(--app-bg)] text-[var(--main-text-color)] font-[var(--main-font)]">
    <!-- <NuxtRouteAnnouncer /> -->
      <UApp :tooltip="{ delayDuration: 0 }" :toaster="{ position: 'top-right' }">
        <NuxtLayout>
          <NuxtPage />

              <Teleport to="body">
                <Transition name="fade">
                  <div
                    v-if="isLoading"
                    class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
                  >
                    <div class="flex flex-col items-center gap-4">
                      <div class="h-12 w-12 rounded-full border-4 border-white/40 border-t-white animate-spin" />
                      <p class="text-[var(--main-text-color)] text-sm uppercase tracking-[0.2em]">
                        {{ t('app.loadingPage') }}
                      </p>
                    </div>
                  </div>
                </Transition>
              </Teleport>
        </NuxtLayout>
      </UApp>
  </div>
</template>

<script setup lang="ts">
  const { t } = useI18n()
  const { initTheme } = useTheme()
  const { isLoading } = useLoadingIndicator()

  if (import.meta.client) {
    initTheme()
  }
  </script>

  <style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>

