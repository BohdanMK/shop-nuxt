<template>
    <USlideover>
        <div class="fixed top-[300px] right-[20px] z-20 " ref="cartIconDiv">
            <UChip :text="cartStore.totalItems" size="2xl"  color="error">
                <UButton variant="link" class="relative z-1 !overflow-visible">
                    <UIcon name="i-heroicons-shopping-cart-20-solid" class="w-10 h-10 hover:scale-125 transition" />
                </UButton>
            </UChip>
        </div>
        <template #header="{ close }">
            <div class="w-full flex items-center justify-between p-4 px-0">
                <h2 class="text-[20px] font-normal">{{ $t('checkout.cart') }}</h2>
                <UButton
                    class="burger-btn flex flex-col justify-center items-center w-8 h-8 gap-1.5  border-y-0 border-x border-x-[#ff0000] rounded-[5px]"

                    @click="close()"
                >
                    <UIcon name="i-heroicons-x-mark-20-solid" class="w-6 h-6" />
                </UButton>
            </div>
        </template>
        <template #body>
            <CheckOutPopUpContent />
        </template>
    </USlideover>
</template>

<script setup lang="ts">
    import { useCartStore } from '@/stores/cart'
    import { inject, ref, onMounted } from 'vue'
    import CheckOutPopUpContent from '~/components/checkOut/PopUpContent.vue'

    const cartStore = useCartStore()

    // Отримуємо ref з layout
    const cartButtonRef = inject<any>('cartButtonRef', null)

    // Коли компонент смонтується, присвоюємо ref
    const cartIconDiv = ref<HTMLDivElement | null>(null)

    // Синхронізуємо ref після монтування
    onMounted(() => {
        if (cartButtonRef && cartIconDiv.value) {
            cartButtonRef.value = cartIconDiv.value
        }
    })
</script>
<style scoped>

</style>