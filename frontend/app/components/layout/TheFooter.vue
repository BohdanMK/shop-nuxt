<template>
    <div class="pb-[15px]">
        <div class="container">
            <div class="flex flex-col md:flex-row items-center gap-2">
                <div class="w-full md:w-auto flex flex-row md:flex-col justify-between items-center gap-2">
                    <NuxtLink to="/">
                        <img src="@/assets/images/mob_logo.png" alt="logo" class="w-[104px] h-[69px]" />
                    </NuxtLink>
                    <MobSocialList class="mt-auto hidden md:block"/>
                    <div class="text-[10px] hidden md:block">
                        © 2023
                        <NuxtLink to="/roles" class=" hover:underline text-[var(--main-red)]">
                            Політика конфіденційності
                        </NuxtLink>
                    </div>
                    <div class="flex md:hidden flex-col ">
                        <PhoneSelect />
                        <span class="font-normal text-[10px]">
                            56 12th Ave, New York, NY 10011
                        </span>
                    </div>
                </div>
                <div class="h-full flex flex-col justify-between ms-0 me-auto  md:ms-[65px]">
                    <MobInfoList
                        class="mb-2"
                        classForList="flex-row !text-[12px] flex-wrap"
                        labelForTitle="Сторінки"
                        classForTitle="text-[14px] !mb-0"
                    />
                    <MobNavList
                        classForList="flex-row !text-[12px] flex-wrap"
                        labelForTitle="Категорії"
                        classForTitle="text-[14px] !mb-0"
                    />
                </div>
                <div class="me-auto md:me-[0px] ms-[0px] md:ms-auto">
                    <PhoneSelect class="hidden md:block"/>
                    <ScheduleInfo/>
                </div>
                <div class="text-[10px] block md:hidden">
                    © 2023
                    <NuxtLink to="/roles" class=" hover:underline text-[var(--main-red)]">
                        Політика конфіденційності
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import MobSocialList from '@/components/nav/MobSocialList.vue';
    import MobNavList from '@/components/nav/MobNavList.vue';
    import MobInfoList from '@/components/nav/MobInfoList.vue';
    import PhoneSelect from '@/components/ui/PhoneSelect.vue';
    import ScheduleInfo from '@/components/ui/ScheduleInfo.vue'
</script>

<style scoped>

</style>