import { computed, ref, watch } from 'vue'
import { useWindowScroll } from '@vueuse/core'

type ScrollDirection = 'up' | 'down'

export const useHeaderScroll = (options?: {
    hideAfterY?: number
    delta?: number
}) => {
    const hideAfterY = options?.hideAfterY ?? 80
    const delta = options?.delta ?? 6

    const { y } = useWindowScroll()

    const lastY = ref(0)
    const direction = ref<ScrollDirection>('up')
    const isHidden = ref(false)

    const isScrolled = computed(() => y.value > 0)

    watch(
        y,
        (currentY) => {
            const diff = currentY - lastY.value

            if (Math.abs(diff) < delta) return

            direction.value = diff > 0 ? 'down' : 'up'

            if (currentY <= hideAfterY) {
                isHidden.value = false
            } else {
                isHidden.value = direction.value === 'down'
            }

            lastY.value = currentY
        },
        { immediate: true }
    )

    return {
        y,
        direction,
        isScrolled,
        isHidden
    }
}