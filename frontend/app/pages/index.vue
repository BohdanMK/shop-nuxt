<template>
    <div class="pt-[15px] pb-[60px]">
        <ContenstSlider />
        <BaseSkeletonList
            v-if="productsStore.productsPromotionsLoading"
            :maxItems="4"
            wrapper-class="pb-22 min-w-[1200px] md:justify-start "
            item-class="w-[330px] h-[370px]"
        />
        <SliderItem
            v-if="!productsStore.productsPromotionsLoading"
            title="Акції"
            :products="productsStore.productsPromotions"
            class="mt-[33px]"
            :link-to="{ name: 'promotions' }"
        />
        <BaseSkeletonList
            v-if="productsStore.productsLoading"
            :maxItems="4"
            wrapper-class="pb-2 min-w-[1200px] md:justify-start "
            item-class="w-[330px] h-[370px]"
        />
        <template v-if="productsStore?.products && productsStore?.products.length > 0">
            <SliderItem
                v-if="!productsStore.productsLoading"
                title="Сети" :products="productsStore.products"
                class="mt-[33px]"
                :link-to="{ name: 'categories-id', params: { id: '69349b20ec4c5c7dfa00254a' }, query: {name: 'Сети'} }"
            />
        </template>

        <LocationsBlock class="mt-[33px]"/>
    </div>
</template>

<script setup lang="ts">
    import ContenstSlider from '@/components/contents/Slider.vue';
    import SliderItem from '@/components/productsBlock/SliderItem.vue';
    import { usePublicProducts } from '@/composables/api/useProducts'
    import { useProductsStore } from '@/stores/products'
    import { useCategoriesStore } from '@/stores/categories'
    import type { ProductDTO } from '@/types/dto/product'
    import type { PaginatedResponse } from '@/types/dto/response.dto'
    import BaseSkeletonList from '@/components/ui/BaseSkeletonList.vue'

    const categoriesStore = useCategoriesStore()
    const productsStore = useProductsStore()

    const {
        data: productsByCategory,
        pending: productByCategoryPendding,
        error: productByCategoryError,
        refresh: promotionsByCategoryRefresh
        } = usePublicProducts<PaginatedResponse<ProductDTO[]>>(
            computed(() => ({
                limit: 100,
                categoryId: categoriesStore?.categories?.[0]?._id
            })),
            {immediate: false}
        )

    watchEffect(() => {
        productsStore.products = productsByCategory.value?.items || []
        productsStore.productsLoading = productByCategoryPendding.value
        productsStore.productsError = productByCategoryError.value?.message ?? null
    })

    const { data: productsPromotions, pending: productPendding, error: productError, refresh: promotionsRefresh } = usePublicProducts<PaginatedResponse<ProductDTO[]>>({limit: 100, isOnSale: true})


    watchEffect(() => {
        productsStore.productsPromotions = productsPromotions.value?.items || []
        productsStore.productsPromotionsLoading = productPendding.value
        productsStore.productsPromotionsError = productError.value?.message ?? null
    })

    watch(
    () => categoriesStore.categories?.[0]?._id,
    (id) => {

        if (id) {
            promotionsByCategoryRefresh()
        }
    },
    { immediate: true }
    )

</script>

<style scoped>

</style>