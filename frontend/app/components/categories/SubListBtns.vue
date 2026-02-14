<template>
    <div v-if="!categoriesStore.subCategoriesLoading" class="w-full">
        <div class="flex flex-wrap gap-3" >
            <UButton
                v-for="item in buttons"
                :key="item.id"
                variant="custom"
                :label="item.title"
                @click="changeSubCategory(item)"
                :class="[
                    '!px-[20px] !rounded-[12px] !border-0 !before:bg-transparent',
                    'bg-[var(--new-gray)] !text-[var(--main-black)] hover:!text-[var(--main-text-color)]',
                    activeId === item._id && '!bg-[var(--main-red)] !text-[var(--main-text-color)]'
                ]"
            />
        </div>
    </div>
    <USkeleton v-else class="h-8 w-22 rounded-[12px]" />
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { ISubCategoriesDTO } from '@/types/dto/subCategories'


const route = useRoute()
const router = useRouter()

const activeId = ref<string>('all')


const categoriesStore = useCategoriesStore()

const buttons = computed<ISubCategoriesDTO[]>(() => [
    {
        _id: 'all',
        id: 'all',
        title: 'Всі',
        pathName: 'all',
        parentCategory: 'all'
    },
    ...categoriesStore.subCategories,
])

const changeSubCategory = (item: ISubCategoriesDTO) => {
    activeId.value = item._id

    router.push({
        query: {
            ...route.query,
            subCategory: item.pathName === 'all' ? undefined : item.pathName,
            subCategoryId: item._id === 'all' ? undefined : item._id,
        },
    })
}

onMounted(() => {
    if(route?.query?.subCategoryId) {
        activeId.value = route?.query?.subCategoryId as string
    }

})
</script>

<style scoped>

</style>
