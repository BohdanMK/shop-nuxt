<template>
  <div class="container !mt-2">
    <!-- Скелетони -->


    <UCarousel
      ref="carousel"
      v-slot="{ item }"
      :items="categoriesStore.categories"
      :align="'start'"
      dots
      :contain-scroll="'trimSnaps'"
      :slides-to-scroll="'auto'"
      :ui="carouselUi"
      class="w-full flex justify-center overflow-hidden pb-2"
    >
      <NuxtLink
        :to="{ name: 'categories-id', params: { id: item._id }, query: {name: item.title} }"
        class="w-[110px] h-[96px] flex items-center flex-col justify-center px-[15px] py-[15px] gap-2
               rounded-[10px]
               border border-y-0 border-transparent
               hover:bg-[rgba(255,0,0,0.1)]
               hover:border-[#FF0000]
               hover:border-y-0 hover:border-x hover:cursor-pointer transition-all"
        :class="{
          'bg-[rgba(255,0,0,0.1)] border-y-0 !border-x !border-[#FF0000] ':
            activeCategory === item._id
        }"
      >
        <img :src="item.image" class="w-[70px] h-[40px] rounded-lg" />
        <h4 class="whitespace-nowrap text-center text-[14px]">
          {{ item.title }}
        </h4>
      </NuxtLink>
    </UCarousel>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useCategoriesStore } from '@/stores/categories'
  

  const categoriesStore = useCategoriesStore()
  const route = useRoute()

  const activeCategory = computed(() => route.params.id as string)

  const carouselUi = {
    item: 'flex-[0_0_auto] w-auto max-w-full',
    container: 'transition-[height]',
    controls: 'absolute bottom-1 inset-x-12',
    dots: '-top-6',
    dot: 'w-6 h-1 bg-[var(--main-red-50)] data-[state=active]:bg-[var(--main-red)]',
  }
</script>
