<template>
    <div class="space-y-4">
      <UCarousel
        :items="images"
        arrows
        dots
        class="w-full max-w-xl mx-auto"
        :ui="{
              controls: 'static inset-x-0 mt-1 flex items-center justify-between px-[10px]',
              prev: 'static top-auto left-auto translate-y-0 -bottom-10',
              next: 'static top-auto left-auto translate-y-0 ms-2 -bottom-10',
              dots: '!static flex items-center gap-3 justify-end bottom-2.5 right-[60px]',
              dot: 'w-3 h-3'

        }"
      >
        <template #default="{ item, index }">
          <button
            type="button"
            class="w-full aspect-video overflow-hidden rounded-lg"
            @click="openLightbox(index)"
          >
            <img
              :src="item"
              class="w-full h-full object-cover"
              :alt="`Фото ${index + 1}`"
            />
          </button>
        </template>
      </UCarousel>
  </div>
</template>

<script setup lang="ts">
    interface Props {
        images: string[]
    }

    const props = defineProps<Props>()

    const currentIndex = ref(0)
    const isLightboxOpen = ref(false)

    function openLightbox(index: number) {
        currentIndex.value = index
        isLightboxOpen.value = true
    }
</script>

<style scoped>

</style>