<template>
    <div>
        <ul class="flex flex-wrap text-[14px] gap-[18px]">
            <li>
                <NuxtLink to="/roles" class="hover:underline">
                {{ $t('nav.about') }}
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/roles" class="hover:underline">
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