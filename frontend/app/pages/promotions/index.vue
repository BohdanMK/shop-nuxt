<template>
    <div class="mt-[40px]">
        <div class="container">
            <BreadcrumbsList
                class="mb-[20px]"
                :items="breadcrumbsData"
            />
            <h2 class="text-[24px] font-bold">
                Aкції
            </h2>
            <BaseSkeletonList
                v-if="productsStore.productsPromotionsLoading && productsStore?.productsPromotions.length === 0"
                :maxItems="4"
                wrapper-class="pb-2 min-w-[1200px] md:justify-start"
                item-class="w-[330px] h-[370px]"
                containerClass="me-auto ms-0"
            />
            <div
                v-show="!productsStore.productsPromotionsLoading || productsStore.productsPromotions.length > 0"
                class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-3.5 gap-y-5 mb-[50px]"
            >
                <ProductCard
                    v-for="item in productsStore.productsPromotions"
                    :key="item.id"
                    :product="item"
                    :full-width="true"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, watch, watchEffect } from 'vue'
    import type { IBreadcrumbs } from '@/types/types'
    import { useProductsStore } from '@/stores/products'
    import { usePublicProducts } from '@/composables/api/useProducts'
    import type { ProductDTO } from '@/types/dto/product'
    import type { PaginatedResponse } from '@/types/dto/response.dto'
    import BreadcrumbsList from '@/components/ui/BreadcrumbsList.vue'
    import ProductCard from '~/components/product/Card.vue'
    import BaseSkeletonList from '@/components/ui/BaseSkeletonList.vue'


    const productsStore = useProductsStore()

    const breadcrumbsData = computed(():IBreadcrumbs[] => [
        {
            label: 'Home',
            link: true,
            to: '/'
        },
        {
            label: 'Promotions',
            link: false,
        },

    ])

    const { data: productsPromotions, pending: productPendding, error: productError, refresh: promotionsRefresh } = usePublicProducts<PaginatedResponse<ProductDTO[]>>({limit: 100, isOnSale: true})

    watchEffect(() => {
        productsStore.productsPromotions = productsPromotions.value?.items || []
        productsStore.productsPromotionsLoading = productPendding.value
        productsStore.productsPromotionsError = productError.value?.message ?? null
    })

</script>

<style scoped>

</style>