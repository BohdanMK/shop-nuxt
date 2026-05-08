type LocationType = 'restaurant' | 'pickup'
type LocationImage = string

export interface LocationMainImage {
    src: string
    alt: string
}

export interface Location {
    id: number
    _id?: string
    name: string
    locationType: LocationType
    lat: number
    lng: number,
    mainImg: LocationMainImage,
    address?: string
    description?: string,
    mapStyle?: string,
    images?: LocationImage[],
    schedule?: string,
    contactPhones?: { value: string }[]
}