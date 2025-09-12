import { useCallback, useContext, useEffect, useState } from 'react'
import { ContextQuote } from '@/context/ContextQuote'
import { QuoteType } from '@/types/types'
import fetchQuote from '@/api/fetchQuote'
import { Skeleton } from '@/components/ui/skeleton'
import { getItemFromSessionStorage } from '@/utils/getItemFromSessionStorage'

const Quote = () => {
    const contextQuote = useContext(ContextQuote)
    if (!contextQuote) {
        throw new Error('Users must be used within a ContextQuote.Provider')
    }
    const quoteRef = contextQuote

    const [quote, setQuote] = useState<QuoteType | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const loadQuote = useCallback(async () => {
        if (isLoading) {
            return
        }
        setIsLoading(true)
        await fetchQuote(setQuote)
        setIsLoading(false)
    }, [isLoading])

    useEffect(() => {
        const parsedStorageData = getItemFromSessionStorage()
        setQuote(parsedStorageData?.quote || [])

        if (!parsedStorageData?.quote?.length) {
            loadQuote()
        }
    }, [loadQuote])

    return (
        <blockquote
            className="flex flex-col gap-2 sm:gap-4 text-center w-full max-w-7xl bg-stone-100 text-stone-950 p-3 sm:p-4 lg:p-6 my-6 lg:my-8"
            ref={quoteRef}
        >
            <h2 className="self-start text-very-large font-semibold underline">
                Quote of the Day
            </h2>
            {quote ? (
                <div className="flex flex-col">
                    <i>"{quote.body}"</i>
                    <p className="self-end px-4"> - unknown author</p>
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-[18px] w-full rounded-full" />
                    <Skeleton className="self-end h-[18px] w-32 rounded-full" />
                </div>
            )}
        </blockquote>
    )
}

export default Quote
