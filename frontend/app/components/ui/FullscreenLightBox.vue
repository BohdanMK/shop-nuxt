<template>
    <div class="relative">
        <UModal
            v-model:open="open"
            fullscreen
            :ui="{
                content: '!p-0'
            }"
        >
                <UButton
                    class="flex flex-col justify-center items-center w-8 h-8 gap-1.5 bg-[var(--card-black-bg)] border-y-0 border-x border-x-[#ff0000] rounded-[5px] absolute top-2 end-2 z-50"
                >
                    <UIcon name="i-heroicons-arrows-pointing-out-20-solid" class="w-4 h-4" />
                </UButton>
                <template #content>
                <div class="w-full h-full flex flex-col bg-black/90">
                    <div class="flex justify-end p-4">
                    <UButton
                        class=" flex flex-col justify-center items-center w-8 h-8 gap-1.5 bg-[var(--card-black-bg)] border-y-0 border-x border-x-[#ff0000] rounded-[5px] absolute top-3 end-3"
                        @click="open = false"
                    >
                        <UIcon name="i-heroicons-x-mark-20-solid" class="w-6 h-6" />
                    </UButton>
                    </div>

                    <div class="flex-1 flex items-center justify-center px-4 pb-8">
                    <UCarousel
                        :items="props.images"
                        arrows
                        dots
                        class="w-full mx-auto"
                        :ui="{
                            controls: 'static inset-x-0 mt-1 flex items-center justify-between px-[10px]',
                            prev: 'static top-auto left-auto translate-y-0 -bottom-10',
                            next: 'static top-auto left-auto translate-y-0 ms-2 -bottom-10',
                            dots: '!static flex items-center gap-3 justify-end bottom-2.5 right-[60px]',
                            dot: 'w-3 h-3',
                            viewport: 'max-w-[90%] mx-auto'
                        }"
                    >
                        <template #default="{ item, index }">
                        <button
                            type="button"
                            class="w-full aspect-video overflow-hidden rounded-lg"
                        >
                            <img
                            :src="item"
                            class="w-full h-full object-cover"
                            :alt="`Фото ${index + 1}`"
                            />
                        </button>
                        </template>
                    </UCarousel>
                    </div>
                </div>
            </template>
        </UModal>
    </div>
</template>

<script setup lang="ts">
interface Props {
  images: string[]
}

const props = defineProps<Props>()

const open = ref(false)
</script>
