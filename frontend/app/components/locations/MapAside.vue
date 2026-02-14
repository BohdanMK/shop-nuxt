<template>
  <aside
    class="w-full md:w-80 border border-[var(--new-dark-gray)] outline-0 ring-0 rounded-lg p-3 space-y-3 bg-[var(--card-black-bg)]"
  >
    <div class="h-full flex flex-col">
      <!-- Інфо по локації -->
      <div
        v-if="selectedLocation"
        class="flex-auto text-[var(--main-text-color)]"
      >
        <FullscreenLightBox :images="selectedLocation.images" />
        <ImagesGallerySlider :images="selectedLocation.images" />

        <h2 class="text-lg font-semibold">
          {{ selectedLocation.name }}
        </h2>

        <p class="text-sm">
          Тип:
          {{ selectedLocation.locationType === 'restaurant' ? 'Ресторан' : 'Самовивіз' }}
        </p>

        <p
          v-if="selectedLocation.address"
          class="text-sm"
        >
          Адреса: {{ selectedLocation.address }}
        </p>

        <p
          v-if="selectedLocation.description"
          class="text-sm mt-1"
        >
          {{ selectedLocation.description }}
        </p>

        <p
          v-if="selectedLocation.schedule"
          class="text-sm mt-1"
          v-html="selectedLocation.schedule"
        />

        <p
          v-if="selectedLocation.contactPhones && selectedLocation.contactPhones.length"
          class="text-sm mt-1 mb-3"
        >
          <span>Телефон:</span>

          <a
            v-for="(phone, index) in selectedLocation.contactPhones"
            :key="phone + index"
            :href="`tel:${phone}`"
            class="mx-1 my-0 text-[var(--main-red)]"
          >
            {{ phone }}
          </a>
        </p>
      </div>

      <p
        v-else
        class="text-sm text-gray-500"
      >
        Обери локацію, щоб побачити деталі.
      </p>

      <!-- Кнопка + інформація по маршруту -->
      <div>
        <UButton
          :label="isRouting ? 'Будую маршрут...' : 'Прокласти маршрут'"
          class="w-full flex items-center justify-center rounded-[42px] !text-[12px] px-[20px] py-[10px] font-bold !text-wrap"
          :disabled="!selectedLocation || isRouting"
          @click="onBuildRouteClick"
        />

        <div
          v-if="routeInfo"
          class="mt-3 px-2 py-3 text-sm space-y-1 bg-[var(--main-red)]/30 rounded-xl"
        >
          <div>
            <span class="font-medium">Відстань:</span>
            {{ routeInfo.distanceKm }} км
          </div>
          <div>
            <span class="font-medium">Орієнтовний час у дорозі:</span>
            ~{{ routeInfo.durationMin }} хв
          </div>
        </div>

        <p
          v-if="routingError"
          class="text-sm text-red-500"
        >
          {{ routingError }}
        </p>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
    import type { Location } from '@/types/dto/locations.dto'
    import type { RouteInfo } from '@/types/types'
    import ImagesGallerySlider from '@/components/ui/ImagesGallerySlider.vue'
    import FullscreenLightBox from '@/components/ui/FullscreenLightBox.vue'


    interface Props {
        selectedLocation: Location | null
        isRouting: boolean
        routeInfo: RouteInfo | null
        routingError: string | null
    }

    const props = defineProps<Props>()

    const emit = defineEmits<{
        (e: 'build-route'): void
    }>()

    function onBuildRouteClick() {
        emit('build-route')
    }
</script>

<style scoped>
</style>
