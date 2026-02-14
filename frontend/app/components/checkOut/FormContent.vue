<template>
    <USkeleton class="w-full h-[30vh] mb-[100px]" v-if="cartStore.firsthCartLoadedStatus"/>
    <template v-else>
        <UForm v-if="cartStore.totalPrice && cartStore.totalPrice > 0" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
            <div class="flex flex-col mb-[40px] md:flex-row gap-[20px] md:gap-[53px] items-end">
                <div class="w-full flex-[100%] md:flex-[60%]">
                    <div class="grid xs:flex gap-6 xs:gap-3 mb-[20px]">
                        <UFormField  name="name" class="w-full">
                            <FieldChipLabel label="Ім'я" class="w-full items-start" >
                                    <UInput placeholder="Alex" class="w-full" v-model="state.name"/>
                            </FieldChipLabel>
                        </UFormField>
                        <UFormField  name="phone" class="w-full">
                            <FieldChipLabel label="Телефон" class="w-full items-start">
                                <UInput placeholder="+ 123 456 789 111" class="w-full" v-model="state.phone"/>
                            </FieldChipLabel>
                        </UFormField>
                    </div>
                    <div>
                        <h6 class="font-bold text-[16px] mb-[18px]">
                            Доставка
                        </h6>
                    </div>
                    <div class="mb-[25px]">
                        <UFormField name="deliveryType">
                            <URadioGroup
                                v-model="state.deliveryType"
                                :items="items"
                                value-key="id"
                                label-key="title"
                                description-key="description"
                                variant="card"
                                indicator="start"
                            />
                        </UFormField>
                    </div>
                    <div class="mb-[31px]">
                        <UFormField name="cityId">
                            <FieldChipLabel label="Місто" class="!w-full">
                                <USelect
                                    v-model="state.cityId"
                                    class="!w-full"
                                    :items="itemsCities"
                                    variant="subtle"
                                    value-key="id"
                                    label-key="title"
                                    placeholder="Оберіть місто"
                                    @change="handleCityChange"
                                />
                            </FieldChipLabel>
                        </UFormField>
                    </div>
                    <div class="grid xs:flex gap-6 xs:gap-3 mb-[20px]">
                        <UFormField  name="street" class="w-full">
                            <FieldChipLabel label="Вулиця" class="w-full items-start" >
                                    <UInput placeholder="Назва вулиці" class="w-full" v-model="state.street"/>
                            </FieldChipLabel>
                        </UFormField>
                        <UFormField  name="house" class="w-full">
                            <FieldChipLabel label="Будинок" class="w-full items-start">
                                <UInput placeholder="Номер будинку/підїзд" class="w-full" v-model="state.house"/>
                            </FieldChipLabel>
                        </UFormField>
                    </div>
                    <div class="mb-[20px] flex gap-3">
                        <UFormField name="deliveryTime">
                            <URadioGroup
                                v-model="state.deliveryTime"
                                color="primary"
                                variant="card"
                                value-key="id"
                                default-value="in_time"
                                label-key="title"
                                :items="typeOfDeliveryTime"
                                :ui="{
                                    fieldset: '!grid grid-cols-2 gap-2',
                                    item: [
                                    'flex-[50%] inline-flex items-center justify-center cursor-pointer select-none',
                                    'rounded-full px-4 py-2 text-[11px] font-medium',
                                    'bg-zinc-300 text-[var(--main-black)]',
                                    'has-[[data-state=checked]]:bg-[var(--main-red)]',
                                    'has-[[data-state=checked]]:text-white'
                                    ].join(' '),
                                    container: 'sr-only',
                                    base: 'sr-only',
                                    wrapper: 'contents',
                                    label: 'select-none font-semibold'
                                }"
                            />
                        </UFormField>
                    </div>
                    <div class="flex gap-3 mb-[20px]">
                        <UFormField name="date" class="w-full">
                            <FieldChipLabel label="Дата доставки" class="w-full">
                                <UInputDate ref="inputDateRef"  color="error" v-model="state.date">
                                    <template #trailing>
                                    <UPopover :reference="inputDateRef?.inputsRef[3]?.$el">
                                        <UButton
                                            variant="link"
                                            size="sm"
                                            icon="i-lucide-calendar"
                                            aria-label="Select a date"
                                            class="px-0"
                                        />

                                        <template #content>
                                        <UCalendar v-model="state.date" class="p-2" />
                                        </template>
                                    </UPopover>
                                    </template>
                                </UInputDate>
                            </FieldChipLabel>
                        </UFormField>

                        <UFormField name="time" class="w-full">
                            <FieldChipLabel label="Час доставки" class="w-full">
                                <UInputTime v-model="state.time" :hour-cycle="24" :default-value="defaultValue" />
                            </FieldChipLabel>
                        </UFormField>

                    </div>
                    <div>
                        <UFormField name="birthdayDiscount">
                            <UCheckbox v-model="state.birthdayDiscount" label="Хочу знижку на день народження" description="Знижка надається за умови надання документу що підтверждує що в вас день народження"/>
                        </UFormField>
                    </div>
                </div>
                <div class="w-full flex-[100%] md:flex-[40%]">
                    <div class="mb-[29px]">
                        <h5 class="text-[16px] font-bold">Ваше замовлення</h5>
                    </div>
                    <div
                        v-for="(item, index) in cartStore?.cartData?.items"
                        :key="item._id"
                    >
                        <PopUpItem :item/>
                    </div>
                    <div class="flex justify-between mb-2 mt-3">
                        <label class="text-[14px]">
                            Сума замовлення
                        </label>
                        <span class="text-[15px] font-semibold">{{ cartStore.totalPrice }} грн</span>
                    </div>
                    <!-- <div class="flex justify-between  mb-2">
                        <label class="text-[14px]">
                            Знижка
                        </label>
                        <span class="text-[15px] font-semibold">-50 грн</span>
                    </div> -->
                    <div class="flex justify-between mb-[15px] pb-[26px] border-b border-b-[var(--main-gray-light)] pb-2">
                        <label class="text-[14px]">
                            Доставка
                        </label>
                        <span class="text-[15px] font-semibold">{{ cartStore.finalDeliveryPrice }} грн</span>
                    </div>
                    <div class="flex justify-between  mb-8">
                        <label class="text-[16px] font-bold">
                            Разом
                        </label>
                        <span class="text-[15px] font-semibold">{{ totalPriceWithDelivery  }} грн</span>
                    </div>
                    <div class="mb-[15px]">
                        <UFormField name="comment">
                            <FieldChipLabel label="Комментар" class="w-full">
                                <UTextarea v-model="state.comment" placeholder="Alex" class="w-full"/>
                            </FieldChipLabel>
                        </UFormField>
                    </div>
                    <div class="flex justify-between items-center mb-[20px]">
                        <label class="text-[14px]">
                            Кіл-сть персон
                        </label>
                        <UFormField name="valuePerson">
                            <UInputNumber variant="subtle"  v-model="state.valuePerson" class="!rounded-[42px] !overflow-hidden" :min="1" :max="100" >
                            <template #decrement>
                                <UButton variant="soft"  icon="i-lucide-minus"  class="start-[-5px]"/>
                            </template>

                            <template #increment>
                                <UButton variant="soft"  icon="i-lucide-plus" class="end-[-5px]"/>
                            </template>
                            </UInputNumber>
                        </UFormField>
                    </div>
                    <div class="mb-[20px]">
                        <UFormField name="agreePolicy">
                            <UCheckbox v-model="state.agreePolicy" label="Згоден з політикою конфедеційности"/>
                        </UFormField>
                    </div>
                    <div>
                        <UButton
                            type="submit" variant="soft"
                            label="Замовити" class="w-full flex items-center justify-center rounded-[42px] !text-[16px] px-[20px] py-[10px] font-bold"
                            :disabled="!cartStore?.cartData?.items || cartStore?.cartData?.items?.length === 0"
                        />
                    </div>
                </div>
            </div>
        </UForm>
        <template v-else>
            <div v-if="checkOutStore.orderData" class="flex items-center justify-center h-[300px] text-white text-[24px] font-semibold mb-[28px]">
                Номер вашого замовлення № {{ checkOutStore.orderData?._id }}
            </div>
            <div v-else class="flex items-center justify-center h-[300px] text-white text-[24px] font-semibold mb-[28px]">
                Ваш кошик порожній
            </div>
        </template>


    </template>
</template>

<script setup lang="ts">
    import { ref, shallowRef } from 'vue'
    import type { AnyCalendarDate, AnyTime } from '@internationalized/date'
    import * as z from 'zod'
    import type { FormSubmitEvent } from '@nuxt/ui'
    import { today, getLocalTimeZone, Time } from '@internationalized/date';
    import { useCartStore } from '@/stores/cart'
    import { useCheckOutStore } from '@/stores/checkout'
    import FieldChipLabel from '@/components/form/FieldChipLabel.vue';
    import PopUpItem from '@/components/checkOut/PopUpItem.vue'



    const cartStore = useCartStore()
    const checkOutStore = useCheckOutStore()

    const schema = z.object({
        name: z.string().min(1, 'Name is required'),
        phone: z.string().min(1, 'Phone is required'),
        street: z.string().min(1, 'Street is required'),
        house: z.string().min(1, 'House is required'),
        cityId: z.string().min(1, 'Оберіть місто').refine(val => val !== null, { message: 'Оберіть місто' }),
        cityName: z.string().optional(),
        deliveryType: z.enum(['pickup', 'delivery']),
        deliveryTime: z.enum(['in_time', 'nearest_time']),
        date: z.any(),
        time: z.any(),
        birthdayDiscount: z.boolean(),
        comment: z.string().optional(),
        valuePerson: z.number().min(1),
        agreePolicy: z.boolean().refine(val => val === true, {
            message: 'Потрібно погодитись з політикою'
        })
    })

    type Schema = z.output<typeof schema>

    const getTimePlus90min = () => {
        const d = new Date();
        d.setMinutes(d.getMinutes() + 90);

        return new Time(
            d.getHours(),
            d.getMinutes(),
            d.getSeconds()
        ) as unknown as AnyTime;
    };

    const state = ref<Schema>({
        name: '',
        phone: '',
        deliveryType: 'pickup',
        cityId: '',
        cityName: '',
        street: '',
        house: '',
        deliveryTime: 'in_time',
        date: today(getLocalTimeZone()) as unknown as AnyCalendarDate,
        time: getTimePlus90min(),
        birthdayDiscount: false,
        comment: '',
        valuePerson: 5,
        agreePolicy: false
    })

    const handleCityChange = () => {
        const selectedCity = itemsCities.value.find(city => city.id === state.value.cityId)
        if (selectedCity) {
            state.value.cityName = selectedCity.title
        }
    }

    async function onSubmit(event: FormSubmitEvent<Schema>) {
        try {
            const data = event.data;

            const normalizedPayload = {
                ...data,

                date: new Date(
                data.date.year,
                data.date.month - 1,
                data.date.day
                ).toISOString(),

                time:
                String(data.time.hour).padStart(2, '0') +
                ':' +
                String(data.time.minute).padStart(2, '0')
            };

            checkOutStore.setCheckoutPayload(normalizedPayload)
            console.log(checkOutStore.checkOutPayload)
            // return
            await checkOutStore.compliteCheckout()
            await cartStore.getCartData()
        } catch (error) {
            console.error('Order creation failed:', error)
        }
    }

    const items = ref([
        { id: 'pickup',   title: '0 грн',  description: 'Заберу сам' },
        { id: 'delivery', title: '60 грн', description: 'Потрібна доставка' }
    ])

    const itemsCities = ref([
        { id: '1',   title: 'Київ' },
        { id: '2', title: 'Чабани'}
    ])

    const inputDateRef = useTemplateRef('inputDateRef')

    const typeOfDeliveryTime = ref([
        { id: 'in_time',   title: 'Обрати час' },
        { id: 'nearest_time', title: 'Якомога швидше'}
    ])

    const defaultValue = shallowRef(new Time(16, 30, 0))

    const totalPriceWithDelivery = computed(() => {
        return cartStore.totalPrice + cartStore.finalDeliveryPrice
    })
</script>

<style scoped>

</style>