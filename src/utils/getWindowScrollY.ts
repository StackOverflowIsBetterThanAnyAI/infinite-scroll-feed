import { getItemFromSessionStorage } from '@/utils/getItemFromSessionStorage'

export const getWindowScrollY = () => {
    const parsedStorageData = getItemFromSessionStorage()

    const scrollY = parsedStorageData?.scrollY || 0

    const scrollToPosition = () => {
        window.scrollTo({ top: scrollY, left: 0, behavior: 'smooth' })
    }

    requestAnimationFrame(() => {
        setTimeout(scrollToPosition, 0)
    })
}
