<template>
    <Transition name="slide-down">
        <div
            v-if="headerStore.isOpen"
            class=" w-full p-[26px] bg-[var(--main-black)] fixed bottom-0 z-10"
            :style="{
                top: `${headerStore.getHeaderHeight}px`,
                height: `calc(100vh - ${headerStore.getHeaderHeight}px)`
            }"
        >
            <div class="h-full flex flex-col">
                <div class="flex justify-end mb-3">
                    <LangSelect/>
                </div>
                <MobNavList class="mb-[23px]"/>
                <MobInfoList class="mb-[23px]"/>
                <MobAddressInfo/>

                <MobSocialList :label="true" class="mt-auto"/>

            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
    import { useHeaderStore } from '@/stores/header'
    import MobInfoList from '@/components/nav/MobInfoList.vue';
    import MobNavList from '@/components/nav/MobNavList.vue';
    import MobAddressInfo from '@/components/nav/MobAddressInfo.vue';
    import MobSocialList from '@/components/nav/MobSocialList.vue';
    import LangSelect from '@/components/ui/LangSelect.vue'

    const headerStore = useHeaderStore()
</script>

<style scoped>
    .slide-down-enter-active,
    .slide-down-leave-active {
        transition: transform 0.8s ease-out, opacity 0.8s ease-out;
    }

    .slide-down-enter-from {
        transform: translateY(-100%);
        opacity: 0;
    }

    .slide-down-enter-to {
        transform: translateY(0);
        opacity: 1;
    }

    .slide-down-leave-from {
        transform: translateY(0);
        opacity: 1;
    }

    .slide-down-leave-to {
        transform: translateY(-100%);
        opacity: 0;
    }
</style>