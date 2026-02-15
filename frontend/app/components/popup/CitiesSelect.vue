<template>
    <div >
        <UModal v-model:open="innerModel"
            :ui="{
                content: 'w-full max-w-[305px] sm:max-w-[405px] md:max-w-[505px] px-0 py-0 bg-[var(--card-black-bg)] rounded-[8px]',
            }"
        >
            <template #content>
                <UButton
                    class="burger-btn  flex flex-col justify-center items-center w-8 h-8 gap-1.5 bg-[var(--card-black-bg)] border-y-0 border-x border-x-[#ff0000] rounded-[5px] absolute top-3 end-3"

                    @click="close()"
                >
                    <UIcon name="i-heroicons-x-mark-20-solid" class="w-6 h-6" />
                </UButton>
                <div class="w-full max-w-[305px] md:max-w-[405px] mx-auto bg-[var(--card-black-bg)] rounded-[5px] py-[20px] overflow-hidden">
                <div class="flex justify-center mx-auto text-center mb-[15px]">
                    <img src="@/assets/images/mob_logo.png" :alt="$t('common.logoAlt')" class="w-[104px] h-[69px]" />
                </div>
                    <h5 class="mx-auto text-center font-bold text-[16px] mb-[20px]">
                        {{ $t('locations.selectCity') }}
                    </h5>
                    <USelect
                        v-model="cityType"
                        class="!w-full mb-[20px]"
                        :items="itemsCities"
                        variant="subtle"
                        value-key="id"
                        label-key="title"
                        :placeholder="$t('locations.selectCity')"
                    />
                    <UButton
                        variant="custom"
                        :label="$t('common.select')"
                        class="w-auto block rounded-[12px] !text-[12px] !px-[28px] py-[6px] !ms-auto"
                    />
                </div>
            </template>
        </UModal>
    </div>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue'

    interface Props {
        open: boolean
    }

    const props = defineProps<Props>()

    const  emit = defineEmits<{
        (e: 'update:open', value: boolean): void
    }>()

    const cityType = ref(null)

    const itemsCities = ref([
        { id: 'pickup',   title: 'Київ' },
        { id: 'delivery', title: 'Чабани'}
    ])

    const innerModel = computed({
        get: () => props.open,
        set: (value: boolean) => emit('update:open', value),
    })

    const close = () => emit('update:open', false)

</script>