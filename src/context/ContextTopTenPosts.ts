import { createContext, RefObject } from 'react'

export const ContextTopTenPosts = createContext<
    RefObject<HTMLDivElement | null> | undefined
>(undefined)
