<template>
    <div class="flex justify-between items-bottom">
        <div>
            <h4 class="font-bold text-[18px] mb-[6px]">
                {{ $t('locations.city') }}
            </h4>
            <a class="block w-full max-w-[145px] text-[10px] ">
                {{ $t('locations.currentCity') }}
                {{ $t('common.addressLine') }}
            </a>

        </div>
        <UButton :label="$t('locations.selectCity')" />
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>