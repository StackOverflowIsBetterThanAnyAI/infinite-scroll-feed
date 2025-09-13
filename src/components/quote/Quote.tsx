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
        setQuote(parsedStorageData?.quote || null)

        if (!parsedStorageData?.quote) {
            loadQuote()
        }
    }, [loadQuote])

    return (
        <section className="w-full max-w-7xl" ref={quoteRef}>
            <blockquote className="flex flex-col gap-2 sm:gap-4 text-center text-pretty bg-stone-100 text-stone-950 p-3 sm:p-4 lg:p-6 my-6 lg:my-8">
                <h2 className="self-start text-very-large font-semibold underline">
                    Quote of the Day
                </h2>
                {quote ? (
                    <div className="flex flex-col text-normal">
                        <i>&quot;{quote.body}&quot;</i>
                        <p className="self-end px-4 py-1"> - unknown author</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 lg:mt-1">
                        <Skeleton className="h-[18px] w-4/5 m-auto rounded-full" />
                        <Skeleton className="h-[18px] w-2/5 m-auto rounded-full" />
                        <Skeleton className="self-end h-[18px] w-32 rounded-full" />
                    </div>
                )}
            </blockquote>
        </section>
    )
}

export default Quote
