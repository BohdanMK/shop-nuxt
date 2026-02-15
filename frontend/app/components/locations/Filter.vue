<template>
    <div class="max-w-md flex flex-col gap-2">
        <FieldChipLabel :label="$t('locations.chooseLocation')" class="!w-full">
            <div class="flex gap-2 w-full">
            <USelect
                v-model="innerSelectedLocationId"
                class="!w-full"
                :items="locations"
                variant="subtle"
                value-key="id"
                label-key="name"
                :placeholder="$t('locations.chooseRestaurantPlaceholder')"
            />
            <UTooltip :text="$t('locations.detectLocation')">
                <UButton
                icon="i-heroicons-map-pin-20-solid"
                variant="custom"
                size="sm"
                @click="detectCurrentLocation"
                class="bg-[var(--new-gray)] !text-[var(--main-black)] hover:!text-[var(--main-text-color)] p-2 border-0"
                />
            </UTooltip>
            </div>
        </FieldChipLabel>
    </div>
</template>

<script setup lang="ts">
    import type { Location } from '@/types/dto/locations.dto'
    const emit = defineEmits<{
        (e: 'update:modelValue', value: number | null): void
        (e: 'detect-current-location'): void
    }>()

    interface Props {
        locations: Location[],
        modelValue: number | null
    }

    const props = defineProps<Props>()

    const innerSelectedLocationId = computed({
        get: () => props.modelValue,
        set: (value: number | null) => {
            emit('update:modelValue', value)
        }
    })

    function detectCurrentLocation() {
        emit('detect-current-location')
    }
</script>

<style scoped>

</style>