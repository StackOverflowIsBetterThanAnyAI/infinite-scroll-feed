import { createContext, RefObject } from 'react'

export const ContextTopUsers = createContext<
    RefObject<HTMLDivElement | null> | undefined
>(undefined)
