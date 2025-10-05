import { createContext, RefObject } from 'react'

export const ContextPartners = createContext<
    RefObject<HTMLDivElement | null> | undefined
>(undefined)
