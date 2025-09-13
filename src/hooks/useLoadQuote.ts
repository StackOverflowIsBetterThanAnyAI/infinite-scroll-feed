'use client'

import { Dispatch, SetStateAction, useEffect } from 'react'
import { QuoteType } from '@/types/types'
import { getItemFromSessionStorage } from '@/utils/getItemFromSessionStorage'

export const useLoadQuote = (
    loadQuote: () => Promise<void>,
    setContentLoaded: Dispatch<
        SetStateAction<{
            posts: boolean
            quote: boolean
            users: boolean
        }>
    >,
    setQuote: Dispatch<SetStateAction<QuoteType | null>>
) => {
    useEffect(() => {
        const parsedStorageData = getItemFromSessionStorage()
        setQuote(parsedStorageData?.quote || null)

        if (!parsedStorageData?.quote) {
            loadQuote()
        } else {
            setContentLoaded((prev) => ({ ...prev, quote: true }))
        }
    }, [loadQuote, setContentLoaded, setQuote])
}
