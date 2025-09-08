import { RefObject, SetStateAction } from 'react'

const fetchFeedItems = async (
    nextPage: RefObject<number>,
    PAGE_SIZE: number,
    setFeedItems: (
        value: SetStateAction<
            {
                postId: number
                id: number
                name: string
                email: string
                body: string
            }[]
        >
    ) => void
) => {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/comments?_page=${nextPage.current}&_limit=${PAGE_SIZE}`,
            {
                method: 'GET',
            }
        )

        if (!response.ok) {
            console.error('An error occurred while fetching the photos.')
            throw new Error('Network response was not ok')
        }

        const data = await response.json()
        if (!data) {
            console.error('An error occurred while fetching the photos.')
            throw new Error('Received data was not ok')
        }
        setFeedItems((prev) => [...prev, ...data])
        nextPage.current++
    } catch (error: unknown) {
        console.error('An error occurred while fetching the photos.', error)
    }
}

export default fetchFeedItems
