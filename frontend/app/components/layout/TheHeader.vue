<template>
    <div
        :class="[
        'header py-2 bg-[#0E0E0E]',
            { 'w-full fixed z-100': headerStore.isOpen }
        ]"
        ref="headerRef"
    >
        <div class="container">
            <div class="flex items-center gap-2 justify-between md:justify-start">
                <div>
                    <NuxtLink to="/">
                        <img src="@/assets/images/mob_logo.png" alt="logo" class="w-[104px] h-[69px]" />
                    </NuxtLink>

                </div>

                <NavInfoList class="hidden md:block flex-auto"/>

                <div class="flex items-center justify-center gap-[13px]">
                    <UButton
                        class="hidden md:block"
                        label="м. Софіївска Борщаговка"
                        color="custom"
                        variant="link"
                        @click="toggleVisibleCitiesPopUp()"
                    />
                    <div class="flex flex-col">
                        <PhoneSelect />
                        <span class="font-normal text-[10px]">
                            56 12th Ave, New York, NY 10011
                        </span>
                    </div>
                    <div class="block md:hidden">
                        <BurgerBtn />
                    </div>
                </div>
                <CitiesSelect v-model:open="visibleCitiesPopUp"/>
                <LangSelect class="!hidden md:!flex" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, onBeforeUnmount } from 'vue'
    import { useHeaderStore } from '@/stores/header'
    import PhoneSelect from '@/components/ui/PhoneSelect.vue'
    import BurgerBtn from '~/components/ui/BurgerBtn.vue'
    import  NavInfoList from '@/components/nav/NavInfoList.vue'
    import CitiesSelect from '@/components/popup/CitiesSelect.vue'
    import LangSelect from '@/components/ui/LangSelect.vue'

    const visibleCitiesPopUp = ref<boolean>(false)
    const headerRef = ref<HTMLElement | null>(null)
    const headerStore = useHeaderStore()

    const updateHeaderHeight = () => {
        if (headerRef.value) {
            const height = headerRef.value.offsetHeight
            headerStore.setHeaderHeight(height)
        }
    }

    const toggleVisibleCitiesPopUp = () => {
        visibleCitiesPopUp.value = !visibleCitiesPopUp.value
    }

    onMounted(() => {
        updateHeaderHeight()
        window.addEventListener('resize', updateHeaderHeight)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('resize', updateHeaderHeight)
    })
</script>
