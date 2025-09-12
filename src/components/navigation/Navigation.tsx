'use client'

import { useContext, useRef, useState } from 'react'
import NavigationButton from './NavigationButton'
import NavigationLogo from './NavigationLogo'
import { ContextQuote } from '@/context/ContextQuote'
import { ContextTopTenPosts } from '@/context/ContextTopTenPosts'
import { ContextTopUsers } from '@/context/ContextTopUsers'
import { setWindowScrollTo } from '@/utils/setWindowScrollTo'
import { useNavigationOpacity } from '@/hooks/useNavigationOpacity'
import { useScreenWidth } from '@/hooks/useScreenWidth'

const Navigation = () => {
    const contextQuote = useContext(ContextQuote)
    if (!contextQuote) {
        throw new Error(
            'Navigation must be used within a ContextQuote.Provider'
        )
    }
    const quoteRef = contextQuote

    const contextTopTenPosts = useContext(ContextTopTenPosts)
    if (!contextTopTenPosts) {
        throw new Error(
            'Navigation must be used within a ContextTopTenPosts.Provider'
        )
    }
    const topTenPostsRef = contextTopTenPosts

    const contextTopUsers = useContext(ContextTopUsers)
    if (!contextTopUsers) {
        throw new Error(
            'Navigation must be used within a ContextTopUsers.Provider'
        )
    }
    const topUsersRef = contextTopUsers

    const SCREEN_WIDTH = useScreenWidth()

    const [navOpacity, setNavOpacity] = useState<string>('opacity-100')
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useNavigationOpacity({ setNavOpacity, timerRef })

    const handleScrollToQuote = () => {
        setWindowScrollTo(96, quoteRef)
    }

    const handleScrollToTopUsers = () => {
        setWindowScrollTo(64, topUsersRef)
    }

    const handleScrollToTopTenPosts = () => {
        setWindowScrollTo(96, topTenPostsRef)
    }

    return (
        <nav
            className={`sticky top-0 z-50 w-full transition-opacity duration-1000 ease-in-out ${navOpacity}
            bg-stone-800 text-zinc-100 shadow-md shadow-stone-600/80`}
            data-testid="navigation"
        >
            <div className="max-w-7xl flex items-center justify-between m-auto h-16 px-2 py-1 md:py-2">
                <NavigationLogo />
                <div>
                    <NavigationButton
                        handleScroll={handleScrollToTopUsers}
                        label="Most Active Users"
                    />
                    <NavigationButton
                        handleScroll={handleScrollToQuote}
                        label="Quote of the Day"
                    />
                    <NavigationButton
                        handleScroll={handleScrollToTopTenPosts}
                        label="Top 10 Posts"
                    />
                </div>
            </div>
        </nav>
    )
}

export default Navigation
