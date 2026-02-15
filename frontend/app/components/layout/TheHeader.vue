<template>
    <div
        :class="[
        'header py-2 bg-[var(--header-bg)] shadow-md/10 mb-2',
            { 'w-full fixed z-100': headerStore.isOpen }
        ]"
        ref="headerRef"
    >
        <div class="container">
            <div class="flex items-center gap-2 justify-between md:justify-start">
                <div>
                    <NuxtLink to="/">
                        <img src="@/assets/images/mob_logo.png" :alt="$t('common.logoAlt')" class="w-[104px] h-[69px]" />
                    </NuxtLink>

                </div>

                <NavInfoList class="hidden md:block flex-auto"/>

                <div class="flex items-center justify-center gap-[13px]">
                    <UButton
                        class="hidden md:block"
                        :label="$t('locations.currentCity')"
                        color="custom"
                        variant="link"
                        @click="toggleVisibleCitiesPopUp()"
                    />
                    <div class="flex flex-col">
                        <PhoneSelect />
                        <span class="font-normal text-[10px]">
                            {{ $t('common.addressLine') }}
                        </span>
                    </div>
                    <div class="block md:hidden">
                        <BurgerBtn />
                    </div>
                </div>
                <CitiesSelect v-model:open="visibleCitiesPopUp"/>
                <UButton
                    class="hidden md:block"
                    color="custom"
                    variant="link"
                    :icon="isDark ? 'i-heroicons-sun-20-solid' : 'i-heroicons-moon-20-solid'"
                    :aria-label="$t('theme.toggle')"
                    @click="toggleTheme()"
                />
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
    const { isDark, toggleTheme } = useTheme()

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
