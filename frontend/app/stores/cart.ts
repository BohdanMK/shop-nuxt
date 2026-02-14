import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { CartDTO } from '@/types/dto/cart.dto'
import type { ProductOptionGroupDTO } from '@/types/dto/product'

export const useCartStore = defineStore('cart', () => {
    const { $apiFetch } = useNuxtApp()

    const cartData = ref<CartDTO | null>(null)

    const isFetching = ref(true)
    const firsthCartLoadedStatus = ref(true)
    const isUpdating = ref(false)
    const isConpliting = ref(false)

    const isAdding = ref(false)

    const deliveryPrice = ref(60)
    const minimalOrderPrice = ref(600)

    // Errors
    const fetchError = ref<string | null>(null)
    const updateError = ref<string | null>(null)
    const addError = ref<string | null>(null)
    const compliteError = ref<string | null>(null)

    // getters
    const finalDeliveryPrice = computed(() => {
        if (!cartData.value) return 0
            return cartData.value.totalPrice >= minimalOrderPrice.value ? 0 : deliveryPrice.value
        }
    )

    const totalItems = computed(() => {
        return cartData.value?.items.reduce((acc, item) => acc + item.quantity, 0) || 0
    })

    const totalPrice = computed(() => {
        return cartData.value?.totalPrice || 0
    })

    // Methods

    const getTotalPriceWithDelivery = computed(() => {
            if (!cartData.value) return 0
            return cartData.value.totalPrice + deliveryPrice.value
        }
    )

    const getCartData = async () => {
        isFetching.value = true

        fetchError.value = null
        try {
            const response: CartDTO = await $apiFetch('/api/cart')
            cartData.value = response
        } catch (error) {
            fetchError.value = 'Failed to fetch cart data'
        } finally {
            isFetching.value = false
            firsthCartLoadedStatus.value = false
        }
    }

    const addItemToCart = async (
        productId: string,
        selectedOptions:  ProductOptionGroupDTO[] = []
    ) => {
        isAdding.value = true
        addError.value = null
        try {
            await $apiFetch(`/api/cart/add`, {
                method: 'POST',
                body: {
                    productId,
                    quantity: 1,
                    selectedOptions: selectedOptions ?? []
                },
            })
            await getCartData()
        } catch (error) {
            addError.value = 'Failed to add item'
        } finally {
            isAdding.value = false
        }
    }

    const deleteItemFromCheckout = async (
        cartItemId: string,
    ) => {
        isUpdating.value = true
        updateError.value = null
        try {
            await $apiFetch('/api/cart/item/delete', {
                method: 'POST',
                body: { cartItemId },
            })
            await getCartData()
        } catch (error) {
            updateError.value = 'Failed to delete item'
        } finally {
            isUpdating.value = false
        }
    }

    const increaseItemQuantity = async (
        cartItemId: string,
    ) => {
        isUpdating.value = true
        updateError.value = null
        try {
            await $apiFetch('/api/cart/item/increase', {
                method: 'POST',
                body: {
                    cartItemId,
                },
            })
            await getCartData()
        } catch (error) {
            updateError.value = 'Failed to increase item quantity'
        } finally {
            isUpdating.value = false
        }
    }

    const decreaseItemQuantity = async (
        cartItemId: string,
    ) => {
        isUpdating.value = true
        updateError.value = null
        try {
            console.log('Deleting item with cartItemId:', cartItemId);
            await $apiFetch('/api/cart/item/decrease', {
                method: 'POST',
                body: { cartItemId },
            })
            await getCartData()
        } catch (error) {
            updateError.value = 'Failed to decrease item quantity'
        } finally {
            isUpdating.value = false
        }
    }

    // const compliteCheckout = async (checkoutId: string) => {
    //     isConpliting.value = true
    //     compliteError.value = null
    //     try {
    //         await $fetch(`/api/checkout/${checkoutId}/complete`, {
    //             method: 'POST',
    //         })
    //         cartData.value = null
    //         isConpliting.value = false
    //     } catch (error) {
    //         throw new Error('Failed to complete checkout')

    //     }
    // }

    const clearErrors = () => {
        fetchError.value = null
        updateError.value = null
        addError.value = null
    }

    return {
        // Data
        cartData,
        totalItems,
        totalPrice,

        // Loading states
        isFetching,
        isUpdating,
        firsthCartLoadedStatus,
        isAdding,
        isConpliting,
        minimalOrderPrice,
        deliveryPrice,
        finalDeliveryPrice,

        // Errors
        fetchError,
        updateError,
        addError,
        compliteError,

        // Methods
        getCartData,
        addItemToCart,
        increaseItemQuantity,
        decreaseItemQuantity,
        deleteItemFromCheckout,
        clearErrors,
        // compliteCheckout
    }
})