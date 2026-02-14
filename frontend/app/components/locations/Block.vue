<template>
  <div>
    <div class="container">
      <div>
        <div class="flex justify-between mb-[37px]">
          <h4 class="text-white text-[24px] font-semibold">Роли</h4>
          <NuxtLink ink to="/roles" class="hover:underline">
            <UButton
              label="Дивитись ще"
              class="rounded-[12px] text-[14px] px-[16px] py-[4px]"
            />
          </NuxtLink>
        </div>

        <UCarousel
          v-slot="{ item }"
          auto-height
          arrows
          dots
          :items="locations"
          :ui="{
            item: 'basis-full xs:basis-1/2',
            controls: 'static inset-x-0 mt-5 flex items-center justify-between px-[10px]',
            arrows: 'static flex items-center gap-2',
            prev: 'static top-auto left-auto translate-y-0 -bottom-10',
            next: 'static top-auto left-auto translate-y-0 ms-2 -bottom-10',
            dots: '!static flex items-center gap-3 justify-end bottom-2.5 right-[60px]',
            dot: 'w-3 h-3'
          }"
          class="mx-auto text-center px-[0px] sm:px-[0px]"
        >
          <LocationsItem :item="item" />
        </UCarousel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
    import { locations } from '@/mocks/locations'
    import LocationsItem from '~/components/locations/Item.vue'
</script>

<style lang="scss" scoped>

</style>
