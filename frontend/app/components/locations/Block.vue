<template>
  <div>
    <div class="container">
      <div>
        <div class="flex justify-between mb-[37px]">
          <h4 class="text-(--main-text-color) text-[24px] font-semibold">{{ $t('locations.ourRestaurants') }}</h4>
          <NuxtLink ink to="/locations" class="hover:underline">
            <UButton
              :label="$t('common.viewAll')"
              class="rounded-[12px] text-[14px] px-4 py-1"
            />
          </NuxtLink>
        </div>

        <UCarousel
          v-if="locations?.items?.length"
          v-slot="{ item }"
          arrows
          dots
          :items="locations.items"
          :ui="{
            item: 'basis-full xs:basis-1/2',
            controls: 'static inset-x-0 mt-5 flex items-center justify-between px-[10px]',
            arrows: 'static flex items-center gap-2',
            prev: 'static top-auto left-auto translate-y-0 -bottom-10',
            next: 'static top-auto left-auto translate-y-0 ms-2 -bottom-10',
            dots: '!static flex items-center gap-3 justify-end bottom-2.5 right-[60px]',
            dot: 'w-3 h-3'
          }"
          class="mx-auto text-center px-0 sm:px-0"
        >
          <LocationsItem :item="item" />
        </UCarousel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
    import { useAdminLocations } from '@/composables/api/useLocations'
    import LocationsItem from '~/components/locations/Item.vue'

    const { data: locations } = await useAdminLocations({ limit: 100 })
</script>

<style lang="scss" scoped>

</style>
