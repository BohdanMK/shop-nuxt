<template>
    <div>
        <h4
            class="font-bold text-[18px] mb-[9px]"
            :class="classForTitle"
        >
            {{ labelForTitle || $t('footer.pagesTitle') }}
        </h4>
        <ul class="flex flex-wrap text-[12px] gap-[26px]">
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
     interface Props {
        classForList?: string,
        classForTitle?: string,
        labelForTitle?: string,
    }

    const { classForList = '', classForTitle = '', labelForTitle = '' } = defineProps<Props>()
</script>

<style>

</style>