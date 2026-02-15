<template>
  <USelect
    :model-value="locale"
    :items="items"

    @update:modelValue="onSelectLocale"
    :ui="{
        base: '!flex items-center gap-[0px] opacity-[.9] p-0 font-semibold text-[16px] bg-transparent text-[var(--main-text-color)] border-hidden outline-none ring-0 ring-offset-0 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
        content: 'w-[140px] bg-[rgba(0,0,0,0.8)] text-white border-y-0 border-x border-x-[#ff0000]',
        item: 'text-white font-semibold data-[active=true]:bg-white/10 data-[highlighted=true]:bg-white/10 cursor-pointer py-[3px] px-2',
        trailing: 'h-[20px] static order-last flex items-center'
    }"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, setLocale } = useI18n()

// Опції мов
const items = ref([
    { label: 'En', value: 'en' },
    { label: 'Ua', value: 'uk' }
])

// Хендлер зміни мови
const onSelectLocale = (selected: "uk" | "en") => {
  setLocale(selected)
}
</script>
