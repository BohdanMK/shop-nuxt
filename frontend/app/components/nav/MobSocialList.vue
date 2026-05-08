<template>
    <div class="flex gap-[12px]">
        <h4 v-if="label">{{ $t('social.weAreIn') }}</h4>
        <ul>
            <a href="#">
                <NuxtImg src="/images/facebook.svg" class="inline-block" alt="Facebook" />
            </a>
        </ul>
    </div>
</template>

<script setup lang="ts">
    interface Props {
        label?: Boolean
    }

    const { label = false } = defineProps<Props>()
</script>

<style scoped>

</style>