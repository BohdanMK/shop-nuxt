<template>
    <div >
        <UModal v-model:open="innerModel"
            :ui="{
                content: '!max-w-[305px] px-0 py-0 bg-[var(--card-black-bg)] rounded-[8px]',
            }"
        >
            <template #content>
                <div class="w-full max-w-[305px] bg-[var(--card-black-bg)] rounded-[5px] pb-[20px] overflow-hidden">
                    <div
                        :class="[
                            'w-full relative  max-w-[305px] max-h-[203px]'
                        ]"
                        >
                            <img class="w-full" :src="product.image.src" :alt="product.image.alt ?? product.title" />
                            <UButton
                                class="burger-btn  flex flex-col justify-center items-center w-8 h-8 gap-1.5 bg-[var(--card-black-bg)] border-y-0 border-x border-x-[#ff0000] rounded-[5px] absolute top-3 end-3"

                                @click="close()"
                            >
                                <UIcon name="i-heroicons-x-mark-20-solid" class="w-6 h-6" />
                            </UButton>
                    </div>
                    <UTooltip
                        :text="product.title"
                        :content="{ align: 'start', side: 'top', sideOffset: 0 }"
                        :ui="{ content: 'max-w-[250px]  px-3 py-2 text-[18px]  font-medium rounded-md' }"
                        >
                        <h4 class="truncate block my-5 px-5 max-w-full text-[16px] font-black text-left cursor-pointer">
                            {{ product.title }}
                        </h4>
                    </UTooltip>

                    <div
                        v-for="optionGroup in product.optionGroups"
                        :key="optionGroup.id"
                        class="mb-6 px-5"
                    >
                        <h3 class="text-[16px] font-medium mb-2">
                        {{ optionGroup.name }}
                        </h3>

                        <div class="flex flex-col gap-2">
                            <template v-if="optionGroup.type === 'single'">
                                <URadioGroup
                                    v-model="selectedSingleOptions[optionGroup.id]"
                                    :items="optionGroup.values"
                                    value-key="id"
                                    label-key="label"
                                    variant="card"
                                    indicator="hidden"
                                    :ui="{
                                        item: `
                                            py-[6px] rounded-[42px]
                                            border border-white
                                            hover:border-[var(--main-red)]
                                            hover:text-[var(--main-red)]
                                            transition-colors
                                            has-data-[state=checked]:border-[var(--main-red)]
                                            has-data-[state=checked]:bg-[var(--main-slider-black)]
                                            has-data-[state=checked]:text-[var(--main-red)]
                                        `,
                                        wrapper: 'flex justify-between items-center',
                                        label: '!font-regular',
                                    }"
                                    >
                                    <template #description="{ item }">
                                        <span v-if="item.extraPrice">
                                        +{{ item.extraPrice.amount }} {{ item.extraPrice.currency }}
                                        </span>
                                    </template>
                                </URadioGroup>
                            </template>
                            <template v-if="optionGroup.type === 'multiple'">
                                <UCheckboxGroup
                                    v-model="selectedMultipleOptions[optionGroup.id]"
                                    :items="optionGroup.values"
                                    value-key="id"
                                    label-key="label"
                                    variant="card"
                                    indicator="hidden"
                                    :ui="{
                                        item: `
                                            py-[6px] rounded-[42px]
                                            border border-white
                                            hover:border-[var(--main-red)]
                                            hover:text-[var(--main-red)]
                                            transition-colors
                                            has-data-[state=checked]:border-[var(--main-red)]
                                            has-data-[state=checked]:bg-[var(--main-slider-black)]
                                            has-data-[state=checked]:text-[var(--main-red)]
                                        `,
                                        wrapper: 'flex justify-between items-center  ',
                                        label: '!font-regular',
                                    }"
                                    >
                                    <template #description="{ item }">
                                        <span v-if="item.extraPrice">
                                        +{{ item.extraPrice.amount }} {{ item.extraPrice.currency }}
                                        </span>
                                    </template>
                                    </UCheckboxGroup>
                            </template>
                        </div>
                    </div>
                    <div class="flex px-5 justify-between">
                        <div class="flex items-start gap-[5px] text-[20px] font-bold">
                            {{ totalPrice }}
                            <span class="font-medium text-[12px]">
                                {{ product.price.currency === 'UAH' ? 'грн' : product.price.currency }}
                            </span>
                        </div>
                        <UButton
                            variant="custom"
                            label="Додати до кошика"
                            class="w-auto rounded-[12px] text-[14px] !px-[12px] py-[6px]"
                            @click="() => {
                                cartStore.addItemToCart(
                                    product._id,
                                    selectedOptionItems
                                )
                                close()
                            }"
                        />
                    </div>
                </div>
            </template>

        </UModal>
    </div>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue'
    import { useCartStore } from '@/stores/cart'
    import type { ProductDTO } from '@/types/dto/product'

    interface Props {
        open: boolean
        product: ProductDTO
    }

    const props = defineProps<Props>()

    const emit = defineEmits<{
    (e: 'update:open', value: boolean): void
    }>()

    const cartStore = useCartStore()

    const close = () => emit('update:open', false)

    const innerModel = computed({
        get: () => props.open,
        set: (value: boolean) => emit('update:open', value),
    })

    // 🧠 окремо для radio і checkbox
    const selectedSingleOptions = ref<Record<string, string>>({})
    const selectedMultipleOptions = ref<Record<string, string[]>>({})

    // об’єкти вибраних опцій
    const selectedOptionItems = computed(() => {
    const result: any[] = []

    for (const group of props.product.optionGroups) {
        if (group.type === 'single') {
        const selected = selectedSingleOptions.value[group.id]
        if (!selected) continue
        const opt = group.values.find(o => o.id === selected)
        if (opt) result.push(opt)
        }

        if (group.type === 'multiple') {
        const selected = selectedMultipleOptions.value[group.id]
        if (!selected) continue
        selected.forEach(id => {
            const opt = group.values.find(o => o.id === id)
            if (opt) result.push(opt)
        })
        }
    }

    return result
    })

    const totalPrice = computed(() => {
    const base = props.product.price.amount

    const extra = selectedOptionItems.value.reduce((sum, opt) => {
        if (opt.extraPrice?.amount) {
        return sum + opt.extraPrice.amount
        }
        return sum
    }, 0)

    return base + extra
    })
</script>
