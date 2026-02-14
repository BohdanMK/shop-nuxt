<template>
    <div>
        <h4
            class="font-bold text-[18px] mb-[9px]"
            :class="classForTitle"
        >
            {{ labelForTitle }}
        </h4>
        <ul class="flex flex-wrap text-[12px] gap-[26px]">
            <li>
                <NuxtLink to="/roles" class="hover:underline">
                Про нас
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/roles" class="hover:underline">
                Акції
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

    const { classForList = '', classForTitle = '', labelForTitle = 'Сторінки' } = defineProps<Props>()
</script>

<style>

</style>