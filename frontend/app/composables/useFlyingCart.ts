
// composables/useFlyingCart.ts
export const useFlyingCart = () => {
    const flyingCarts = ref<Array<{
        id: number
        startX: number
        startY: number
        endX: number
        endY: number
    }>>([])

    let cartId = 0

    const animateToCart = (buttonElement: HTMLElement, targetElement: HTMLElement) => {
        const buttonRect = buttonElement.getBoundingClientRect()
        const targetRect = targetElement.getBoundingClientRect()

        const id = cartId++
        const flyingCart = {
            id,
            startX: buttonRect.left + buttonRect.width / 2,
            startY: buttonRect.top + buttonRect.height / 2,
            endX: targetRect.left + targetRect.width / 2,
            endY: targetRect.top + targetRect.height / 2
        }

        flyingCarts.value.push(flyingCart)
        setTimeout(() => {
            flyingCarts.value = flyingCarts.value.filter(cart => cart.id !== id)
        }, 800)
    }

    return {
        flyingCarts,
        animateToCart
    }
}