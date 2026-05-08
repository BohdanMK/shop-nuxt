const baseUrl = import.meta.env.VITE_BASE_URL ?? ''

export const useImageSrc = (src: string | undefined | null): string => {
    if (!src) return ''
    if (src.startsWith('/uploads/')) return `${baseUrl}${src}`
    return src
}
