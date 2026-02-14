import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ICategoryInfoDTO, ISubCategoriesDTO } from '@/types/dto/subCategories'

export  const useCategoriesStore = defineStore('categories', () => {

    interface LocalCategory extends ICategoryInfoDTO {
        _id?: string
    }

    interface LocalSubCategory extends ISubCategoriesDTO {
        _id?: string
    }

    const categories = ref<LocalCategory[]>([]);
    const categoriesLoading = ref<boolean>(false)

    const subCategories = ref<LocalSubCategory[]>([])
    const subCategoriesLoading = ref<boolean>(false);
    const subCategoriesError = ref<string>(null);

    return {
        categories,
        categoriesLoading,
        subCategories,
        subCategoriesLoading,
        subCategoriesError
    }
})