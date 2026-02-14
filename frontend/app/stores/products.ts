import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ProductDTO } from '@/types/dto/product'

export const useProductsStore = defineStore('products', () => {
    const products = ref<ProductDTO[]>([])
    const productsLoading = ref(false)
    const productsError = ref<string | null>(null)

    const productsPromotions = ref<ProductDTO[]>([])
    const productsPromotionsLoading = ref(false)
    const productsPromotionsError = ref<string | null>(null)

    return {
        products,
        productsLoading,
        productsError,
        productsPromotions,
        productsPromotionsLoading,
        productsPromotionsError,
    }
})