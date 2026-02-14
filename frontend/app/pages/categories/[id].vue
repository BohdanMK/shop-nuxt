<template>
    <div class="mt-[40px]">
        <div class="container">
            <BreadcrumbsList
                class="mb-[20px]"
                :items="breadcrumbsData"
            />
            <h2 class="text-[24px] font-bold mb-2">
                {{ categoryName }}
            </h2>
            <SubListBtns class="my-[20px]" />
            <BaseSkeletonList
                v-if="productsStore.productsLoading && productsStore?.products.length === 0"
                :maxItems="4"
                wrapper-class="pb-2 min-w-[1200px] md:justify-start"
                item-class="w-[330px] h-[370px]"
                containerClass="me-auto ms-0"
            />
            <div
                v-show="!productsStore.productsLoading || productsStore.products.length > 0"
                class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-3.5 gap-y-5 mb-[50px]"
            >
                <ProductCard
                    v-for="item in productsStore.products"
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
    import type { ICategoryInfoDTO, ISubCategoriesDTO } from '@/types/dto/subCategories'
    import { useRoute } from 'vue-router'
    import { usePublicProducts } from '@/composables/api/useProducts'
    import { usePublicSubCategories } from '@/composables/api/useSubCategories'
    import type { ProductDTO } from '@/types/dto/product'
    import type { PaginatedResponse } from '@/types/dto/response.dto'
    import BreadcrumbsList from '@/components/ui/BreadcrumbsList.vue'
    import SubListBtns from '@/components/categories/SubListBtns.vue'
    import ProductCard from '~/components/product/Card.vue'
    import BaseSkeletonList from '@/components/ui/BaseSkeletonList.vue'

    const route = useRoute()
    const productsStore = useProductsStore()
    const categoriesStore = useCategoriesStore()

    const breadcrumbsData = computed(():IBreadcrumbs[] => [
        {
            label: 'Home',
            link: true,
            to: '/'
        },
        {
            label: 'Categories',
            link: false,
        },
        {
            label: (route.query.name as string) || 'Роли',
            link: false,
        },
        ...(route.query.subCategory
            ? [
                {
                label: route.query.subCategory as string,
                link: false,
                },
            ]
            : [])
    ])

    const categoryName = computed(() => route?.query?.name)
    const subCatId = computed(() => route?.query?.subCategoryId)

    const {
            data: products,
            pending: productPendding,
            error: productError,
            refresh: promotionsRefresh
        } =
        usePublicProducts<PaginatedResponse<ProductDTO[]>>
        (
            computed(() => ({
                categoryId: route.params.id as string,
                subCategoryId: route.query.subCategoryId as string
            })),
            { immediate: false }
        )

    const {
        data: subCategories,
        pending: subCategoriesLoading,
        error: subCategoriesError,
        refresh: subCategoriesRefresh,
    } = usePublicSubCategories<ISubCategoriesDTO[]>(
        route.params.id as string,
        { immediate: false }
    )



    // watch
    watch(
        () => [route.params.id, route.query.subCategoryId],
        () => {
            promotionsRefresh()
        },
        { immediate: true },
    )

    watch(
        () => [route.params.id],
        () => {
            subCategoriesRefresh()
        },
        { immediate: true },
    )

    watchEffect(() => {
        productsStore.products = products.value?.items || []
        productsStore.productsLoading = productPendding.value
        productsStore.productsError = productError.value?.message ?? null
    })

    watchEffect(() => {
        categoriesStore.subCategories = subCategories.value || []
        categoriesStore.subCategoriesLoading = subCategoriesLoading.value
        categoriesStore.subCategoriesError = subCategoriesError.value?.message ?? null
    })
</script>

<style scoped>
</style>
