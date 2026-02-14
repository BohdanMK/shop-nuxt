<template>
    <div class="w-screen h-screen fixed top-0 bottom-0 bg-[var(--main-red-10)]">

    </div>
</template>

<script setup lang="ts">
    interface Props {
        active: boolean
    }

    const { active = false } = defineProps<Props>()
</script>

<style scoped>

</style>