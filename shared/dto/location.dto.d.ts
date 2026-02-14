type LocationType = 'restaurant' | 'pickup'
type LocationImage = string

export interface Location {
    id: number
    name: string
    locationType: LocationType
    lat: number
    lng: number,
    mainImg: string,
    address?: string
    description?: string,
    mapStyle?: string,
    images?: LocationImage[],
    schedule?: string,
    contactPhones?: string[]
}