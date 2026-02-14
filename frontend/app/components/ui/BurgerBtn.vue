<template>
    <button
        class="burger-btn flex flex-col justify-center items-center w-8 h-8 gap-1.5 md:hidden border-y-0 border-x border-x-[#ff0000] rounded-[5px]"
        :class="burgersClass"
        @click="toggleMenu()"
    >
        <span class="block w-6 h-0.5 bg-current rounded"></span>
        <span class="block w-6 h-0.5 bg-current rounded"></span>
        <span class="block w-6 h-0.5 bg-current rounded"></span>
    </button>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue'
    import { useHeaderStore } from '@/stores/header'
    const headerStore = useHeaderStore();

    const burgersClass = computed(() => {
        return headerStore.isMobMenuVisible ? 'open-burger-btn' : '';
    });

    const toggleMenu = () => {
        headerStore.toggleMobMenu();
    };
</script>

<style scoped>

</style>