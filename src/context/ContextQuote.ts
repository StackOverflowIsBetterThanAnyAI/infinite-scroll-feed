import { createContext, RefObject } from 'react'

export const ContextQuote = createContext<
    RefObject<HTMLQuoteElement | null> | undefined
>(undefined)
