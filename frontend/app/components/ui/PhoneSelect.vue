<template>
        <USelect
            :model-value="displayPhone"
            :items="items"
            :arrow="false"
            @update:modelValue="onSelectPhone"
            :ui="{
                base: 'opacity-[.9] p-0 font-semibold text-[16px] bg-transparent text-[var(--main-text-color)] border-hidden outline-none ring-0 ring-offset-0 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
                value: '',
                placeholder: '',
                arrow: 'hidden',
                content: 'w-[220px] bg-[var(--select-dropdown-bg)] text-[var(--main-text-color)] border-y-0 border-x border-x-[#ff0000] ring-0 outline-none shadow-none',
                viewport: 'divide-y-0',
                group: 'divide-y-0',
                separator: 'hidden',
                item: 'text-[var(--main-text-color)] font-semibold data-[active=true]:bg-[var(--select-dropdown-hover-bg)] data-[highlighted=true]:bg-[var(--select-dropdown-hover-bg)] cursor-pointer py-[3px] px-2',
                itemLabel: '!text-[var(--main-text-color)]',
                itemDescription: 'text-[var(--main-text-color-muted)]',
                trailing: 'hidden',
            }"
          />
</template>

<script setup lang="ts">
      import { ref, computed } from 'vue'


    const items = ref([
        '+38(098) 76-54-321',
        '+1 (212) 555-0199',
        '+44 20 7946 0958'
    ])


    const displayPhone = ref(items.value[0])


    const toE164 = (raw: string) => {
        let d = raw.replace(/[^\d+]/g, '')
        if (d.startsWith('+38') && !d.startsWith('+380')) d = d.replace(/^\+38/, '+380')
            return d
        }

        const onSelectPhone = (selected: string) => {
        const tel = toE164(selected)

        window.location.href = `tel:${tel}`
    }
</script>

<style scoped>

</style>