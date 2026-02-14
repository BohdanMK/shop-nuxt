<template>
    <div class="container">
        <UCarousel
            v-slot="{ item }"
            auto-height
            arrows
            dots
            :items="items"
            :ui="{
            controls: 'static inset-x-0 mt-5 flex items-center justify-between px-[10px]',
            arrows: 'static flex items-center gap-2',
            prev: 'static top-auto left-auto translate-y-0 -bottom-10',
            next: 'static top-auto left-auto translate-y-0 ms-2 -bottom-10',

            dots: '!static flex items-center gap-3 justify-end bottom-2.5 right-[60px]',
            dot: 'w-3 h-3'
            }"
            class="w-full mx-auto text-center px-[0px] sm:px-[0px]"
        >
            <div class="min-h-[300px] p-[25px] flex justify-center bg-[var(--main-slider-black)] rounded-[10px]">
            <div class="w-full flex flex-col md:flex-row items-center justify-around gap-3">
                <div class="max-w-full lg:max-w-[700px]">
                <h3 class="text-white text-[30px] lg:text-[45px] font-bold text-center md:text-left">
                    {{ item.title }}
                </h3>
                <p class="text-white text-[20px] lg:text-[25px] font-regular text-center md:text-left">
                    {{ item.subtitle }}
                </p>
                </div>

                <div class="w-[260px] h-[208px] md:w-[360px] md:h-[308px]">
                    <img :src="item.image" class="rounded-lg w-full h-[inherit]" />
                </div>
            </div>
            </div>
        </UCarousel>
  </div>
</template>

<script setup lang="ts">
    type SlideItem = {
    title: string
    subtitle: string
    image: string
    }

    const items: SlideItem[] = [
    {
        title: 'ДУУУЖЕ ДУЖЕ СМАЧНІ СУШІ ТА РОЛИ',
        subtitle: 'Замов акційний сет та отримай подарунок. Замов акційний сет та отримай подарунок.',
        image: '/images/banners/home-sushi-rolls.png'
    },
    {
        title: 'РОЛИ ЗІ ЗНИЖКОЮ ДО 30%',
        subtitle: 'Лови вигідні пропозиції щодня. Замовляй онлайн за кілька кліків.',
        image: '/images/banners/promotions.png'
    },
    {
        title: 'БЕЗКОШТОВНА ДОСТАВКА',
        subtitle: 'Отримай безкоштовну доставку при замовленні від 500 грн.',
        image: '/images/banners/free-delivery-removebg-preview.png'
    }
    ]
</script>
