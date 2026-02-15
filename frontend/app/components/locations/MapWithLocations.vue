<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import type { Location } from '@/types/dto/locations.dto'
import MapAside from '@/components/locations/MapAside.vue'
import LocationsFilter from '@/components/locations/Filter.vue'

const { t } = useI18n()

// props
const {
  locations,
  orsApiKey,
  initialLocationId,
  useMapTiler,
  mapTilerKey,
  mapStyle
} = defineProps<{
  locations: Location[]
  orsApiKey: string
  initialLocationId?: number
  useMapTiler?: boolean
  mapTilerKey?: string
  mapStyle: string
}>()

// state
const route = useRoute()
const router = useRouter()

const selectedLocationId = ref<number | null>(
  initialLocationId ?? (locations[0]?.id ?? null)
)
const selectedLocation = computed(
  () => locations.find(l => l.id === selectedLocationId.value) ?? null
)

const mapContainerId = 'leaflet-map-with-locations'
const map = ref<any>(null)
const markers = ref<Record<number, any>>({})
const routeLayer = ref<any>(null)

const userMarker = ref<any | null>(null)
const userCoords = ref<{ lat: number; lng: number } | null>(null)

const routeInfo = ref<{ distanceKm: number; durationMin: number } | null>(null)
const isRouting = ref(false)
const routingError = ref<string | null>(null)

let L: typeof import('leaflet') | null = null


function flyToLocation(id: number) {
  if (!map.value || !L) return
  const loc = locations.find(l => l.id === id)
  if (!loc) return

  map.value.flyTo([loc.lat, loc.lng], 14, { duration: 0.7 })
  const marker = markers.value[id]
  if (marker) marker.openPopup()
}

function setUserMarker(lat: number, lng: number) {
  if (!map.value || !L) return

  if (userMarker.value) {
    map.value.removeLayer(userMarker.value)
  }

  userMarker.value = L!.marker([lat, lng])
    .addTo(map.value)
    .bindPopup(t('locations.youAreHere'))

  userMarker.value.openPopup()
  userCoords.value = { lat, lng }
}

function detectCurrentLocation() {
  routingError.value = null

  if (!navigator.geolocation) {
    routingError.value = t('locations.geoNotSupported')
    return
  }

  navigator.geolocation.getCurrentPosition(
    pos => {
      const lat = pos.coords.latitude
      const lng = pos.coords.longitude

      setUserMarker(lat, lng)
      map.value?.flyTo([lat, lng], 14, { duration: 0.7 })
    },
    () => {
      routingError.value = t('locations.geoFailed')
    }
  )
}

async function buildRoute() {
  routingError.value = null
  routeInfo.value = null

  if (!selectedLocation.value || !map.value || !L) return

  if (!orsApiKey) {
    routingError.value = t('locations.orsMissing')
    return
  }

  if (!navigator.geolocation) {
    routingError.value = t('locations.geoNotSupported')
    return
  }

  isRouting.value = true

  navigator.geolocation.getCurrentPosition(
    async pos => {
      const lat = pos.coords.latitude
      const lng = pos.coords.longitude

      setUserMarker(lat, lng)

      const start = [lng, lat]
      const end = [selectedLocation.value!.lng, selectedLocation.value!.lat]

      try {
        const res = await fetch(
          'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${orsApiKey}`
            },
            body: JSON.stringify({
              coordinates: [start, end]
            })
          }
        )

        if (!res.ok) {
          throw new Error(t('locations.routingApiError'))
        }

        const data = await res.json() // GeoJSON FeatureCollection

        if (!data || !data.features || !data.features.length) {
          throw new Error(t('locations.noRouteResponse'))
        }

        if (routeLayer.value) {
          map.value.removeLayer(routeLayer.value)
        }

        routeLayer.value = L!.geoJSON(data, {
          style: {
            weight: 5
          }
        }).addTo(map.value)

        const bounds = routeLayer.value.getBounds()
        map.value.fitBounds(bounds, { padding: [50, 50] })

        const firstFeature = data.features[0]
        const summary = firstFeature?.properties?.summary

        if (summary) {
          const distanceKm = summary.distance / 1000
          const durationMin = summary.duration / 60
          routeInfo.value = {
            distanceKm: Math.round(distanceKm * 10) / 10,
            durationMin: Math.round(durationMin)
          }
        }
      } catch (e: any) {
        routingError.value = e.message || t('locations.routeBuildError')
      } finally {
        isRouting.value = false
      }
    },
    () => {
      isRouting.value = false
      routingError.value = t('locations.geoFailed')
    }
  )
}

watch(selectedLocationId, newId => {
  routeInfo.value = null
  routingError.value = null
  if (newId != null) {
    flyToLocation(newId)

    router.push({
      query: {
      ...route.query,
      id: newId,
    },
    })
  }


})

onMounted(async () => {
    const idParam = route.query.id

    if (idParam) {
      const rawId = Array.isArray(idParam) ? idParam[0] : idParam
      const parsedId = Number(rawId)
      if (!Number.isNaN(parsedId) && locations.some(l => l.id === parsedId)) {
        selectedLocationId.value = parsedId
      }
    }

  if (!import.meta.client || locations.length === 0) return

  const leaflet = await import('leaflet')
  L = leaflet.default || leaflet

  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'images/markers/default_marker.png',
    iconUrl: 'images/markers/default_marker.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
  })

  const locationIcon = L.icon({
    iconRetinaUrl: 'images/markers/marker_tokio.png',
    iconUrl: 'images/markers/marker_tokio.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [41, 41],
    iconAnchor: [17, 56],
    popupAnchor: [0, -56],
    shadowSize: [50, 50]
  })

  const first = selectedLocation.value ?? locations[0]

  map.value = L!.map(mapContainerId).setView([first.lat, first.lng], 12)

  // Тайли: OSM за замовчуванням, MapTiler якщо переданий ключ і прапорець
  if (useMapTiler && mapTilerKey) {
    const styleId = mapStyle || 'streets-v2'
    L!.tileLayer(
      `https://api.maptiler.com/maps/${styleId}/{z}/{x}/{y}.png?key=${mapTilerKey}`,
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://www.maptiler.com/">MapTiler</a>'
      }
    ).addTo(map.value)
  } else {
    // Для localhost / деву – норм
    L!.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
    }).addTo(map.value)
  }

  locations.forEach(loc => {
    const marker = L!.marker([loc.lat, loc.lng], { icon: locationIcon }).addTo(map.value)
    marker.bindPopup(
      `<b>${loc.name}</b><br>${loc.locationType === 'restaurant' ? t('locations.typeRestaurant') : t('locations.typePickup')}`
    )
    marker.on('click', () => {
      selectedLocationId.value = loc.id
    })
    markers.value[loc.id] = marker
  })

  if (selectedLocationId.value !== null) {
    flyToLocation(selectedLocationId.value)
  }
})

</script>

<template>
  <div class="container">
    <div class="p-4 flex flex-col gap-4">
      <h2 class="text-2xl font-semibold">
        {{ $t('locations.title') }}
      </h2>

      <div class="flex flex-col md:flex-row gap-4">
        <!-- Ліва частина: селект + мапа -->
        <div class="flex-1 flex flex-col gap-3">
          <LocationsFilter
              v-model="selectedLocationId"
              :locations="locations"
              @detect-current-location="detectCurrentLocation()"
          />
          <ClientOnly>
            <div
              :id="mapContainerId"
              class="w-full h-[450px] rounded-lg overflow-hidden border"
            />
            <template #fallback>
              <div class="w-full h-[450px] flex items-center justify-center border rounded-lg">
                {{ $t('locations.loadingMap') }}
              </div>
            </template>
          </ClientOnly>
        </div>
        <MapAside
          :selected-location="selectedLocation"
          :is-routing="isRouting"
          :route-info="routeInfo"
          :routing-error="routingError"
          @build-route="buildRoute"
        />
      </div>
    </div>
  </div>
</template>
