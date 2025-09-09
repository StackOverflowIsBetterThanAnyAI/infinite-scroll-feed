export const setItemInSessionStorage = (key: string, value: any) => {
    const storage = sessionStorage.getItem('infinite-scroll-feed')
    const parsedTracker = storage ? JSON.parse(storage) : {}
    parsedTracker[key] = value
    sessionStorage.setItem(
        'infinite-scroll-feed',
        JSON.stringify(parsedTracker)
    )
}
