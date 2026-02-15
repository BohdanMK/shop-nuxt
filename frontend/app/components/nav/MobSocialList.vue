<template>
    <div class="flex gap-[12px]">
        <h4 v-if="label">{{ $t('social.weAreIn') }}</h4>
        <ul>
            <a href="#">
                <img src="@/assets/images/facebook.svg"/>
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