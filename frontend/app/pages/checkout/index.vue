<template>
    <div>
        <div class="container">
            <div class="max-w-[991px] mx-auto">
                <div>
                    <h2 class="text-[var(--main-text-color)] text-[24px] font-semibold mb-[28px]">{{ $t('checkout.title') }}</h2>
                </div>
                <div>
                    <CheckOutFormContent/>
                </div>
            </div>
        </div>
        <BaseSkeletonList
            v-if="productsStore.productsPromotionsLoading"
            :maxItems="4"
            wrapper-class="pb-2 min-w-[1200px] md:justify-start "
            item-class="w-[330px] h-[370px]"
        />
        <SliderItem link-to="promotions" :title="$t('home.promotions')" :products="productsStore.productsPromotions"/>
    </div>
</template>

<script setup lang="ts">
    import type { ProductDTO } from '@/types/dto/product'
    import type { PaginatedResponse } from '@/types/dto/response.dto'
    import { useProductsStore } from '@/stores/products'
    import { usePublicProducts } from '@/composables/api/useProducts'
    import CheckOutFormContent from '@/components/checkOut/FormContent.vue';
    import SliderItem from '@/components/productsBlock/SliderItem.vue';
    import BaseSkeletonList from '@/components/ui/BaseSkeletonList.vue'


    const productsStore = useProductsStore()

    const { data: productsPromotions, pending: productPendding, error: productError, refresh: promotionsRefresh } = usePublicProducts<PaginatedResponse<ProductDTO[]>>({ limit: 100, isOnSale: true})

    watchEffect(() => {
        productsStore.productsPromotions = productsPromotions.value?.items || [],
        productsStore.productsPromotionsLoading = productPendding.value,
        productsStore.productsPromotionsError = productError.value?.message ?? null
    })
</script>

<style lang="scss" scoped>

</style>