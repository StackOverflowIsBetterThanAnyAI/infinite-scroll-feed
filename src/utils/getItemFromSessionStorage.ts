export const getItemFromSessionStorage = () => {
    if (typeof window === 'undefined') {
        return
    }
    const storedData = sessionStorage.getItem('infinite-scroll-feed')
    return storedData ? JSON.parse(storedData) : {}
}
