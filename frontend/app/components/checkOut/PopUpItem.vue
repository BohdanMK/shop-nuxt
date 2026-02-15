<template>
    <div class="pb-2 border-b border-[#FFFFFF29]">
        <div class="flex gap-2 mb-[10px]">
            <div class="w-full max-w-[85px] rounded-sm overflow-hidden">
                <img
                    :src="item.image.src"
                    :alt="item.image.alt ?? item.title"
                    class="w-full h-auto"
                />
            </div>

            <div class=" flex-auto flex justify-center items-center mb-2 font-bold text-[16px] text-center whitespace-break-spaces word-break">
                {{ item.title }}
            </div>
            <UButton
                icon="i-heroicons-trash"
                class="w-100 max-w-[32px]"

                @click="cartStore.deleteItemFromCheckout(item._id)"
            />
        </div>

        <div class="flex justify-between items-center">
            <div>
                {{ finalPrice }}
                <span class="text-[12px]">{{ $t('common.currencyUah') }}</span>
            </div>
            <div class="flex items-center gap-2">
                <UInputNumber
                    variant="outline"
                    v-model="valuePerson"
                    class="!rounded-[42px]"
                    :max="100"
                >
                    <template #decrement>
                        <UButton
                            icon="i-lucide-minus"
                            class="start-[5px]"
                            @click="cartStore.decreaseItemQuantity(item._id)"
                        />
                    </template>

                    <template #increment>

                        <UButton
                            icon="i-lucide-plus"
                            class="end-[5px]"
                            @click="cartStore.increaseItemQuantity(item._id) "
                        />
                    </template>
                </UInputNumber>
            </div>
        </div>
        <div v-if="item.selectedOptions.length > 0" class="flex flex-col">
            <h6 class="mt-2 font-bold text-[12px]">
                {{ $t('checkout.additionalOptions') }}:
            </h6>
            <div
                v-for="(option, index) in item.selectedOptions"
                :key="index"
                class="text-[12px] text-[#FFFFFF99]"
            >
                {{ option.label }}
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue'
    import type { CartItemDTO } from '@/types/dto/cart.dto'
    import { useCartStore } from '@/stores/cart'

    const props = defineProps<{
        item: CartItemDTO
    }>()

    const cartStore = useCartStore()

    const valuePerson = computed({
        get: () => props.item.quantity,
        set: () => {}
    })

    const finalPrice = computed(() => {
        const price = props.item.salePrice ?? props.item.price.amount
        return price * props.item.quantity
    })
</script>

<style scoped>

</style>
