<script setup lang="ts">
import { locations } from '@/mocks/locations'
import MapWithLocations from '@/components/locations/MapWithLocations.vue'



const ORS_KEY = import.meta.env.VITE_ORS_KEY
const USE_MAPTILER = true
const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY
const MAP_STYLE = 'bright-v2'

</script>

<template>
  <MapWithLocations
    :locations="locations"
    :ors-api-key="ORS_KEY"
    :use-map-tiler="USE_MAPTILER"
    :map-tiler-key="MAPTILER_KEY"
    :map-style="MAP_STYLE"
  />
</template>
