import type { Location } from '@/types/dto/locations.dto'

export const locations: Location[] = [
  {
    id: 1,
    name: 'Ресторан Київ Центр',
    locationType: 'restaurant',
    lat: 50.4501,
    lng: 30.5234,
    address: 'вул. Хрещатик, 1',
    mainImg: 'images/locations/location_1.png',
    description: 'Основний ресторан у центрі Києва',
    images: [
      'images/locations/location_1.png',
      'images/locations/location_1.png'
    ],
    schedule: ' Прийом замовлень: <br>  На доставку з 10:00 до 20:45 <br>  На самовивіз з 10:00 до 20:45 <br>  Без вихідних ',
    contactPhones: ['0945522312', '0945522312']
  },
  {
    id: 2,
    name: 'Самовивіз Оболонь',
    locationType: 'pickup',
    lat: 50.5083,
    lng: 30.4983,
    mainImg: 'images/locations/location_1.png',
    address: 'пр-т Героїв Сталінграда, 10',
    images: [
      'images/locations/location_1.png',
      'images/locations/location_1.png'
    ],
    schedule: ' Прийом замовлень: <br>  На доставку з 10:00 до 20:45 <br>  На самовивіз з 10:00 до 20:45 <br>  Вихідні: Сб, Нд ',
    contactPhones: ['0945522310']
  }
]