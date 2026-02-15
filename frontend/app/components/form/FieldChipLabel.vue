<template>
    <div class="relative inline-flex items-center">
        <span
            class="absolute -top-3 left-1 rounded-full bg-red-500 px-2 py-0.5
                    text-[10px] font-semibold text-[var(--main-text-color)] z-10"
            >
            {{ label }}
        </span>
        <div class="mt-1 w-full z-[5]">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string
}>()
</script>
