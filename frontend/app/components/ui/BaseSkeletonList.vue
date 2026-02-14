<template>

  <div :class="['w-full overflow-hidden max-w-[330px] sm:max-w-[530px] md:max-w-[740px] lg:max-w-[930px] xl:max-w-[1530px] mx-auto', containerClass]">
    <div class="container">
        <div :class="['flex gap-3 md:justify-center', wrapperClass]">
          <USkeleton v-for="i in maxItems" :key="i" :class="['rounded-[12px]', itemClass]" />
        </div>
    </div>

  </div>
</template>

<script setup lang="ts">

import { useWindowSize } from '@vueuse/core'



const props = defineProps<{
  maxItems: number | 5,
  wrapperClass?: string
  itemClass?: string,
  containerClass?: string

}>()

const { width } = useWindowSize()



</script>
