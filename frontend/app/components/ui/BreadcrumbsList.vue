<script setup lang="ts">
    import type { IBreadcrumbs } from '@/types/types'

    const props = defineProps<{
        items: IBreadcrumbs[]
    }>()
</script>

<template>
  <UBreadcrumb :items="props.items" />
</template>
