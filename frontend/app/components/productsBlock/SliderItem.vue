<template>
    <div>
        <div class="container">
            <div>
                <div class="flex justify-between mb-[37px]">
                    <h4 class="text-white text-[24px] font-semibold">{{ props.title }}</h4>
                    <NuxtLink   :to="linkTo" class="hover:underline">
                        <UButton label="Дивитись ще" class="rounded-[12px] text-[14px] px-[16px] py-[4px]"/>
                    </NuxtLink>
                </div>
                   <UCarousel
                        v-slot="{ item }"
                 
                        arrows
                        dots
                        :items="products"
                        :ui="{
                            item: 'basis-full xs:basis-1/2  lg:basis-1/3 xl:basis-1/4 xxl:basis-1/5',
                            controls: 'static inset-x-0 mt-5 flex items-center justify-between px-[10px]',
                            arrows: 'static flex items-center gap-2',
                            prev: 'static top-auto left-auto translate-y-0 -bottom-10',
                            next: 'static top-auto left-auto translate-y-0 ms-2 -bottom-10',

                            dots: '!static flex items-center gap-3 justify-end bottom-2.5 right-[60px]',
                            dot: 'w-3 h-3'
                        }"
                        class="mx-auto text-center px-[0px] sm:px-[0px]"
                    >
                    <ProductCard :product="item" :full-width="true"/>
                 </UCarousel>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { ProductDTO } from '@/types/dto/product.ts';
    import ProductCard from '@/components/product/Card.vue';

    interface Props {
        title: string;
        products: ProductDTO[];
        linkTo: string | object;
    }

    const props = defineProps<Props>();
</script>

<style lang="scss" scoped>

</style>