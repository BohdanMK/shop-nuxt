import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { useCartStore } from '../../stores/cart'
import { useCheckOutStore } from '../../stores/checkout'
import { useFlyingCart } from '../../composables/useFlyingCart'

describe('useCartStore', () => {
    let apiFetchMock: ReturnType<typeof vi.fn>

    beforeEach(() => {
        setActivePinia(createPinia())
        // Mocking $apiFetch to return a default cart response
        apiFetchMock = vi.fn(async (url: string) => {
            if (url === '/api/cart') {
                return {
                totalPrice: 0,
                items: []
                }
            }
            return {}
        })

        vi.stubGlobal('useNuxtApp', () => ({
            $apiFetch: apiFetchMock
        }))
    })

    afterEach(() => {
        vi.unstubAllGlobals()
        vi.restoreAllMocks()
    })

    it('calculates finalDeliveryPrice using minimalOrderPrice threshold', () => {
        const store = useCartStore()

        store.cartData = { totalPrice: 700, items: [] } as any
        expect(store.finalDeliveryPrice).toBe(0)

        store.cartData = { totalPrice: 500, items: [] } as any
        expect(store.finalDeliveryPrice).toBe(store.deliveryPrice)
    })

    it('calculates totalItems as sum of item quantities', () => {
        const store = useCartStore()

        store.cartData = {
            totalPrice: 100,
            items: [{ quantity: 2 }, { quantity: 3 }]
        } as any

        expect(store.totalItems).toBe(5)
    })

    it('adds item with default selectedOptions and refreshes cart', async () => {
        const store = useCartStore()

        await store.addItemToCart('product-1')

        expect(apiFetchMock).toHaveBeenCalledWith('/api/cart/add', {
        method: 'POST',
        body: {
            productId: 'product-1',
            quantity: 1,
            selectedOptions: []
        }
        })

        expect(apiFetchMock).toHaveBeenCalledWith('/api/cart')
        expect(store.isAdding).toBe(false)
    })
    })

describe('useCheckOutStore', () => {
    let apiFetchMock: ReturnType<typeof vi.fn>

    beforeEach(() => {
        setActivePinia(createPinia())
        apiFetchMock = vi.fn()

        vi.stubGlobal('useNuxtApp', () => ({
        $apiFetch: apiFetchMock
        }))
    })

    afterEach(() => {
        vi.unstubAllGlobals()
        vi.restoreAllMocks()
    })

    it('setCheckoutPayload writes incoming fields into reactive payload', () => {
        const store = useCheckOutStore()

        store.setCheckoutPayload({
            customerName: 'Ira',
            phone: '+380000000000'
        } as any)

        expect((store.checkOutPayload as any).customerName).toBe('Ira')
        expect((store.checkOutPayload as any).phone).toBe('+380000000000')
    })

    it('compliteCheckout saves orderData and resets loading state', async () => {
        const store = useCheckOutStore()
        const response = { orderNumber: 'A-001' }

        apiFetchMock.mockResolvedValue(response)

        store.setCheckoutPayload({ customerName: 'Ira' } as any)
        await store.compliteCheckout()

        expect(apiFetchMock).toHaveBeenCalledWith('/api/order/create', {
            method: 'POST',
            body: store.checkOutPayload
        })
        expect(store.orderData).toEqual(response)
        expect(store.isCompliting).toBe(false)
        expect(store.compliteError).toBe(null)
    })
})

describe('useFlyingCart', () => {
    afterEach(() => {
        vi.useRealTimers()
        vi.restoreAllMocks()
    })

    it('adds animation item and removes it after timeout', () => {
        vi.useFakeTimers()

        const button = document.createElement('button')
        const target = document.createElement('div')

        vi.spyOn(button, 'getBoundingClientRect').mockReturnValue({
            left: 10,
            top: 20,
            width: 40,
            height: 20
        } as DOMRect)

        vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({
            left: 100,
            top: 200,
            width: 50,
            height: 30
        } as DOMRect)

        const { flyingCarts, animateToCart } = useFlyingCart()

        animateToCart(button, target)

        expect(flyingCarts.value).toHaveLength(1)
        expect(flyingCarts.value[0]).toMatchObject({
            startX: 30,
            startY: 30,
            endX: 125,
            endY: 215
        })

        vi.advanceTimersByTime(800)
        expect(flyingCarts.value).toHaveLength(0)
    })
})
