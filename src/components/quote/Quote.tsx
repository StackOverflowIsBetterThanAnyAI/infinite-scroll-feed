import { useCallback, useContext, useState } from 'react'
import { SectionHeader } from '@/components/ui/sectionheader'
import { ContextContentLoaded } from '@/context/ContextContentLoaded'
import { ContextQuote } from '@/context/ContextQuote'
import { QuoteType } from '@/types/types'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchQuote } from '@/api/fetchQuote'
import { useLoadQuote } from '@/hooks/useLoadQuote'

const Quote = () => {
    const contextContentLoaded = useContext(ContextContentLoaded)
    if (!contextContentLoaded) {
        throw new Error(
            'Quote must be used within a ContextContentLoaded.Provider'
        )
    } // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_contentLoaded, setContentLoaded] = contextContentLoaded

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
        setContentLoaded((prev) => ({ ...prev, quote: true }))
        setIsLoading(false)
    }, [isLoading, setContentLoaded])

    useLoadQuote(loadQuote, setContentLoaded, setQuote)

    return (
        <section className="w-full max-w-7xl" ref={quoteRef}>
            <blockquote className="flex flex-col gap-2 sm:gap-4 text-center text-pretty bg-stone-100 text-stone-950 p-4 sm:p-8 lg:p-10 lg:px-12 my-6 lg:my-8">
                <SectionHeader>Quote of the Day</SectionHeader>
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
