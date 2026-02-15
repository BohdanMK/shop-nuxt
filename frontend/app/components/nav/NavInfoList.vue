<template>
    <div>
        <ul class="flex flex-wrap text-[14px] gap-[18px]">
            <li>
                <NuxtLink to="/about" class="hover:underline">
                {{ $t('nav.about') }}
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/promotions" class="hover:underline">
                {{ $t('nav.promotions') }}
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">

</script>

<style>

</style>