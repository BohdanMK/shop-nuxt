<template>
    <div class="w-full h-full flex flex-col justify-between p-0">
        <div class="flex-auto flex flex-col gap-4 overflow-y-auto mb-4 scroll-area">
            <template v-if="!cartStore?.cartData?.items || cartStore?.cartData?.items?.length === 0">
                <div class="flex flex-col items-center justify-center h-full text-center text-[16px] font-normal text-[#FFFFFF99]">
                    Ваш кошик порожній
                </div>

            </template>
            <template v-else>
                <div
                    v-for="(item, index) in cartStore?.cartData?.items"
                    :key="item._id"
                >
                    <PopUpItem :item/>
                </div>
            </template>
        </div>
        <div>
            <div class="flex justify-between mb-4 border-b border-[#FFFFFF29]">
                <span class="text-[16px] font-normal">Сума:</span>
                <span class="text-[16px] font-normal">{{ cartStore.totalPrice }} грн</span>
            </div>
            <div class="flex justify-between mb-4 border-b border-[#FFFFFF29] items-end">
                <div>
                    <div class="text-[16px] font-normal">Доставка:</div>
                    <div class="max-w-[170px] text-[12px] font-light text-[#FFFFFF99]" v-if="cartStore.finalDeliveryPrice > 0">
                        До безкоштовної доставки
                        залишилось {{ cartStore.cartData.totalPrice - cartStore.minimalOrderPrice }} грн
                    </div>
                    <!-- <div class="max-w-[170px] text-[12px] font-light text-[#FFFFFF99]" v-else>
                        Безкоштовна доставка
                    </div> -->
                </div>

                <div class="text-[16px] font-normal" v-if="cartStore.finalDeliveryPrice > 0">{{ cartStore.deliveryPrice }} грн</div>
                <div class="text-[16px] font-normal" v-else>0 грн</div>
            </div>
            <div class="flex justify-between mb-4 border-b border-[#FFFFFF29]">
                <span class="text-[16px] font-normal">Разом:</span>
                <span class="text-[16px] font-normal">{{ cartStore.totalPrice }} грн</span>
            </div>

        </div>
        <div>
            <NuxtLink
                to="/checkout"
                :disabled="!cartStore?.cartData?.items || cartStore?.cartData?.items?.length === 0"
                >
                <UButton
                    label="Оформити замовлення"
                    class="w-full flex items-center justify-center rounded-[10px] !text-[16px] px-[20px] py-[20px]"
                    :disabled="!cartStore?.cartData?.items || cartStore?.cartData?.items?.length === 0"
                />
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useCartStore } from '@/stores/cart'
    import PopUpItem from '@/components/checkOut/PopUpItem.vue'

    const cartStore = useCartStore()
</script>

<style scoped>

</style>