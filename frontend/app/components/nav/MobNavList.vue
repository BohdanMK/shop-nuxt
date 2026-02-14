<template>
    <div>
        <h4
            class="font-bold text-[18px] mb-[9px]"
            :class="classForTitle"
        >
            {{ labelForTitle }}
        </h4>
        <ul class="flex flex-col gap-[9px] text-[14px]"
            :class="classForList"
        >

            <li
                v-for="(category, index) in categoriesStore.categories" :key="index"
            >
                <NuxtLink :to="{ name: 'categories-id', params: { id: category._id }, query: {name: category.title} }" class="hover:underline">
                {{ category.title }}
                </NuxtLink>
            </li>

        </ul>
    </div>
</template>

<script setup lang="ts">
    import { useCategoriesStore } from '@/stores/categories'

    const categoriesStore = useCategoriesStore()
    interface Props {
        classForList?: string,
        classForTitle?: string,
        labelForTitle?: string,
    }

    const { classForList = '', classForTitle = '', labelForTitle = 'Каталог' } = defineProps<Props>()
</script>

<style>

</style>