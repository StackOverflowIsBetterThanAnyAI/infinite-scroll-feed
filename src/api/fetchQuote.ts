import { Dispatch, SetStateAction } from 'react'
import { QuoteType } from '@/types/types'
import { setItemInSessionStorage } from '@/utils/setItemInSessionStorage'

const fetchQuote = async (
    setQuote: Dispatch<SetStateAction<QuoteType | null>>
) => {
    try {
        const response = await fetch(
            'https://jsonplaceholder.typicode.com/posts/1',
            {
                method: 'GET',
            }
        )

        if (!response.ok) {
            console.error('An error occurred while fetching the quote.')
            throw new Error('Network response was not ok')
        }

        const data = await response.json()
        if (!data) {
            console.error('An error occurred while fetching the quote.')
            throw new Error('Received data was not ok')
        }

        setQuote(() => {
            setItemInSessionStorage('quote', data)
            return data
        })
    } catch (error: unknown) {
        console.error('An error occurred while fetching the quote.', error)
    }
}

export default fetchQuote
