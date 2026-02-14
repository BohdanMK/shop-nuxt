<template>
    <div
        :class="[
        'w-full max-w-[305px] bg-[var(--card-black-bg)] rounded-[5px] overflow-hidden',
        fullWidth && 'max-w-full !h-full'
        ]"
    >
        <div
        :class="[
            'w-full  max-w-[305px] max-h-[203px]',
            fullWidth && 'max-w-full overflow-hidden'
        ]"
        >
            <img ref="productImg" class="w-full" :src="product.image.src" :alt="product.image.alt ?? product.title" />
        </div>

        <div class="mt-[5px] mx-[11px] pb-[15px]">
        <div class="mb-[20px]">
        <div class="hidden xs:block">
        <UTooltip
            :text="product.title"
            :content="{ align: 'start', side: 'top', sideOffset: 0 }"
            :ui="{ content: 'max-w-[250px] px-3 py-2 text-[18px]  font-medium rounded-md' }"
            >
            <h4 class="truncate block max-w-full text-[16px] font-black text-left cursor-pointer">
                {{ product.title }}
            </h4>
        </UTooltip>
        </div>
        <h4 class="block xs:hidden max-w-full text-[16px] font-black text-left cursor-pointer">
            {{ product.title }}
        </h4>
        </div>

        <div class="flex justify-between text-[14px] font-regular mb-[11px]">
            <h6>Склад:</h6>
            <h6>Вага - {{ product.weightGrams }}г</h6>
        </div>
        <div class="flex items-center gap-2 mb-[25px]">
            <h6 class="text-[14px] font-regular">Іградієнти: {{ product?.components?.length }}</h6>
            <UPopover v-if="product?.components?.length > 0">
                <UTooltip  text="Показати">
                    <UButton icon="i-lucide-info" variant="link"/>
                </UTooltip>


                <template #content>
                    <ul class="max-w-[300px] my-[10px] flex gap-3 flex-wrap items-center">
                        <li
                        v-for="(comp, idx) in product.components"
                        :key="`${product.id ?? product.title}-comp-${idx}`"
                        class="w-[55px]"
                        >
                        <div class="w-[55px] h-[38px]">
                            <img class="w-full" :src="comp.image.src" :alt="comp.image.alt ?? comp.name" />
                        </div>
                        <h6 class="h-[15px] text-[10px] font-regular text-center">{{ comp.name }}</h6>
                        </li>
                    </ul>
                </template>
            </UPopover>
        </div>

        <div class="flex justify-between px-[10px]">
            <UButton
                ref="addToCartButtonRef"
                variant="custom"
                :label="product.ctaLabel ?? 'До кошика'"
                class=" rounded-[12px] text-[14px] !px-[26px] py-[4px]"
                @click="affterClickAction(product?.optionGroups)"
            />
            <div
                v-if="!product.isOnSale"
                class="flex items-start gap-[5px] text-[20px] font-bold"
            >
            {{ product.price.amount }}
                <span class="font-medium text-[12px]">
                    {{ product.price.currency === 'UAH' ? 'грн' : product.price.currency }}
                </span>
            </div>
            <div
                v-else
                class="flex items-start gap-[5px] text-[20px] font-bold"
            >
                <div class="text-[16px] mt-auto text-[var(--main-red)] line-through">
                    <span class="">{{ product.price.amount }}</span>
                    <span class="font-medium text-[12px]">
                        {{ product.price.currency === 'UAH' ? 'грн' : product.price.currency }}
                    </span>
                </div>
                <span>
                    {{ product.salePrice }}
                </span>
                <span class="font-medium text-[12px]">
                    {{ product.price.currency === 'UAH' ? 'грн' : product.price.currency }}
                </span>

            </div>
        </div>
        </div>

        <div>
            <CardOptionsPopUp :product="product" v-model:open="visibleOptions"/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref, computed, toRefs, inject } from 'vue'
    import type { ProductDTO } from '@/types/dto/product'
    import { useCartStore } from '@/stores/cart'
    import CardOptionsPopUp from '@/components/product/CardOptionsPopUp.vue'

    const props = defineProps<{
        product: ProductDTO
        fullWidth?: boolean
    }>()

    const addToCartButtonRef = ref<HTMLButtonElement | null>(null)
    const productImg = ref<HTMLImageElement | null>(null)

    const cartStore = useCartStore()

    // Отримуємо ref кнопки кошика з layout через inject
    const cartButtonRef = inject<any>('cartButtonRef', null)

    const visibleOptions = ref<boolean>(false)

    const { product, fullWidth = false } = toRefs(props);

    const supportsHover = ref(false)

    const affterClickAction = (optionGroups) => {
        if(optionGroups && optionGroups.length > 0) {
            visibleOptions.value = true
            console.log('Show options popup')
        } else {
            // Add to cart action here
            cartStore.addItemToCart(product.value._id, product.value.optionGroups ?? [])
            console.log('Add to cart:', product.value._id)
            startFlyingCartAnimation()
        }

    }

    const getButtonElement = (): HTMLButtonElement | null => {
        const refValue = addToCartButtonRef.value as any
        let element = refValue?.$el || refValue

        if (!element) return null

        let buttonElement: HTMLButtonElement | null = null

        if (element.nodeType === Node.TEXT_NODE) {
            buttonElement = element.nextElementSibling as HTMLButtonElement
        } else if (element.tagName === 'BUTTON') {
            buttonElement = element
        } else {
            buttonElement = element.querySelector('button')
        }

        return buttonElement?.tagName === 'BUTTON' ? buttonElement : null
    }

    const startFlyingCartAnimation = () => {
        const imgElement = productImg.value
        const buttonElement = getButtonElement()

        if (!imgElement || !buttonElement || !cartButtonRef?.value) return

        // Отримуємо координати
        const imgRect = imgElement.getBoundingClientRect()
        const cartRect = cartButtonRef.value.getBoundingClientRect()

        // Створюємо клон зображення
        const imgClone = imgElement.cloneNode(true) as HTMLImageElement
        imgClone.style.position = 'fixed'
        imgClone.style.top = imgRect.top + 'px'
        imgClone.style.left = imgRect.left + 'px'
        imgClone.style.width = imgRect.width + 'px'
        imgClone.style.height = imgRect.height + 'px'
        imgClone.style.zIndex = '9999'
        imgClone.style.pointerEvents = 'none'
        imgClone.style.borderRadius = '5px'
        imgClone.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        imgClone.style.objectFit = 'cover'

        document.body.appendChild(imgClone)

        // Запускаємо анімацію через setTimeout щоб транзиція спрацювала
        setTimeout(() => {
            imgClone.style.top = cartRect.top + 'px'
            imgClone.style.left = cartRect.left + 'px'
            imgClone.style.width = '40px'
            imgClone.style.height = '40px'
            imgClone.style.opacity = '0.2'
        }, 10)

        // Видаляємо клон після анімації
        setTimeout(() => {
            imgClone.remove()
        }, 620)
    }

    onMounted(() => {
        if (typeof window !== 'undefined' && window.matchMedia) {
            supportsHover.value = window.matchMedia('(hover: hover)').matches
        }
    })


</script>

<style scoped>
</style>
