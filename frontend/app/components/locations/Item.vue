<template>
  <div class="flex flex-col xs:flex-row gap-[10px] items-center bg-[var(--card-black-bg)]">
    <div class="w-full xs:w-[230px] h-full">
      <img class="w-full" :src="item.mainImg" :alt="item.name || $t('locations.locationAlt')" />
    </div>
    <div class="w-full xs:w-auto flex flex-col justify-start items-start px-[10px] xs:px-[0px]">
      <h6 class="mb-[4px] text-[12px] font-regular text-start">
        {{ item.name }}
      </h6>
      <p class="text-[12px] text-left mb-[4px]">
        {{ item.address }}
      </p>
      <NuxtLink :to="{ path: '/locations', query: { id: item.id } }" class="hover:underline">
        <UButton
          :label="$t('common.details')"
          class="rounded-[12px] font-normal text-[12px] !px-[0px] py-[4px] font-regular text-[var(--main-red)]"
          variant="link"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
    import type { Location } from '@/types/dto/locations.dto'

    const props = defineProps<{
    item: Location
    }>()


</script>

<style scoped>

</style>
