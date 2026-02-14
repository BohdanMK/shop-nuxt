<template>
    <div>
        <h4
            class="font-bold text-[18px] mb-[9px]"
            :class="classForTitle"
        >
            {{ labelForTitle }}
        </h4>
        <ul class="flex flex-col gap-[9px] text-[14px]"
            :class="classForList"
        >
            <li>
                <NuxtLink to="/roles" class="hover:underline">
                Роли
                </NuxtLink>
            </li>
             <li>
                <NuxtLink to="/roles" class="hover:underline">
                Роли
                </NuxtLink>
            </li>
             <li>
                <NuxtLink to="/roles" class="hover:underline">
                Роли
                </NuxtLink>
            </li>
             <li>
                <NuxtLink to="/roles" class="hover:underline">
                Роли
                </NuxtLink>
            </li>
             <li>
                <NuxtLink to="/roles" class="hover:underline">
                Роли
                </NuxtLink>
            </li>
             <li>
                <NuxtLink to="/roles" class="hover:underline">
                Роли
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/roles" class="hover:underline">
                Роли
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/roles" class="hover:underline">
                Роли
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/roles" class="hover:underline">
                Роли
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/roles" class="hover:underline">
                Роли
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/roles" class="hover:underline">
                Роли
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

    const { classForList = '', classForTitle = '', labelForTitle = 'Каталог' } = defineProps<Props>()
</script>

<style>

</style>