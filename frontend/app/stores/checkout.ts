import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { CheckoutOrderDTO } from '@/types/dto/checkout.dto'

export const useCheckOutStore = defineStore('checkOut', () => {
    const { $apiFetch } = useNuxtApp()

    interface LocalOrderData extends CheckoutOrderDTO {
        _id?: string
    }

    const isCompliting = ref(false)
    const compliteError = ref<string | null>(null)

    const checkOutPayload = reactive<CheckoutOrderDTO>({} as CheckoutOrderDTO);



    const orderData = ref<LocalOrderData | null>(null);

    const setCheckoutPayload = (payload: CheckoutOrderDTO) => {
        Object.assign(checkOutPayload, { ...payload })
    }

    const compliteCheckout = async () => {
        isCompliting.value = true
        compliteError.value = null
        try {
            const responce: CheckoutOrderDTO  = await $apiFetch(`/api/order/create`, {
                method: 'POST',
                body: checkOutPayload
            })

            orderData.value = responce
            // Reset payload on success
            Object.assign(checkOutPayload, {} as CheckoutOrderDTO)
            isCompliting.value = false
        } catch (error) {
            compliteError.value = error instanceof Error ? error.message : 'Failed to complete checkout'
            isCompliting.value = false
            throw error
        }
    }

    return {
        checkOutPayload,
        isCompliting,
        compliteError,
        setCheckoutPayload,
        compliteCheckout,
        orderData
    }
})