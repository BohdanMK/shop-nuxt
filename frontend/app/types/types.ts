export interface ICategory {
    id: string,
    image: string,
    title: string
}

export interface IBreadcrumbs {
    label: string,
    link: boolean,
    to?: string
}

export interface RouteInfo {
    distanceKm: number
    durationMin: number
}