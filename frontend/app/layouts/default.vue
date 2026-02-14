<template>
    <div
        class="min-h-screen flex flex-col "
    >
        <TheHeader />

        <div class="flex-auto">
                <BaseSkeletonList
                v-if="categoriesStore.categoriesLoading"
                :maxItems="3"
                wrapper-class="pb-2 "
                item-class="w-[130px] h-[70px]"
                />
                <CategoryList v-else/>
            <slot />


        </div>

        <PopUpMobMenu/>
        <CheckOutPopUp/>
        <TheFooter/>
    </div>
</template>

<script setup lang="ts">
    import { watch, ref, provide } from 'vue'
    import type { ICategory } from '@/types/types'
    import { usePublicCategories } from '@/composables/api/useCategories'
    import { useCategoriesStore } from '@/stores/categories'
    import { useCartStore } from '@/stores/cart'
    import BaseSkeletonList from '@/components/ui/BaseSkeletonList.vue'
    import TheHeader from '@/components/layout/TheHeader.vue'
    import TheFooter from '@/components/layout/TheFooter.vue'
    import PopUpMobMenu from '@/components/popup/MobMenu.vue'
    import CategoryList from '@/components/ui/CategoryList.vue'
    import CheckOutPopUp from '~/components/checkOut/PopUp.vue'



    const categoriesStore = useCategoriesStore()
    const cartStore = useCartStore()
    // await cartStore.getCartData()

    // Ref для картки з іконкою кошика
    const cartButtonRef = ref<HTMLDivElement | null>(null)

    // Передаємо ref детям через provide
    provide('cartButtonRef', cartButtonRef)

    interface LocalCategory extends ICategory {
        _id?: string,
        pathName: string
    }

    const { data: categories, pending: categoriesPendding, error: categoriesError, refresh: categoriesRefresh } = usePublicCategories<LocalCategory[]>({}, {
        notifyOnError: true,
    })

    const fetchCart = async () => {
        try {
            await cartStore.getCartData()
        } catch(err) {
            console.error(err)
        }
    }

    watch(
    categories,
        newVal => {
            if (!newVal) return
            categoriesStore.categories = newVal
        },
        { immediate: true },
    )

    watch(categoriesPendding,
        newVal => {
            categoriesStore.categoriesLoading = newVal
        },
        { immediate: true },
    )

    onMounted(() => {
        fetchCart()
    })
</script>

<style scoped>

</style>