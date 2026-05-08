<script setup lang="ts">
import MapWithLocations from '@/components/locations/MapWithLocations.vue'
import { useAdminLocations } from '@/composables/api/useLocations'
import BaseSkeletonList from '@/components/ui/BaseSkeletonList.vue'

const ORS_KEY = import.meta.env.VITE_ORS_KEY
const USE_MAPTILER = true
const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY
const MAP_STYLE = 'bright-v2'

const { data: locationsData, pending } = await useAdminLocations({ limit: 100 })
const locations = computed(() => locationsData.value?.items ?? [])
</script>

<template>
  <div>
    <BaseSkeletonList
      v-if="pending"
      :maxItems="3"
      wrapper-class="flex-col"
      item-class="w-full h-[450px]"
    />
    <MapWithLocations
      v-else-if="locations.length"
      :locations="locations"
      :ors-api-key="ORS_KEY"
      :use-map-tiler="USE_MAPTILER"
      :map-tiler-key="MAPTILER_KEY"
      :map-style="MAP_STYLE"
    />
  </div>
</template>
