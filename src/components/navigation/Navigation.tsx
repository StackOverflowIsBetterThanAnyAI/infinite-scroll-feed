'use client'

import { useContext, useRef, useState } from 'react'
import NavigationLogo from './NavigationLogo'
import { ContextTopTenPosts } from '@/context/ContextTopTenPosts'
import { ContextTopUsers } from '@/context/ContextTopUsers'
import { useNavigationOpacity } from '@/hooks/useNavigationOpacity'
import NavigationButton from './NavigationButton'

const Navigation = () => {
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

    const [navOpacity, setNavOpacity] = useState<string>('opacity-100')
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useNavigationOpacity({ setNavOpacity, timerRef })

    const handleScrollToTopUsers = () => {
        if (topUsersRef.current) {
            const OFFSET = 64
            const top =
                topUsersRef.current.getBoundingClientRect().top +
                window.scrollY -
                OFFSET

            window.scrollTo({ top, behavior: 'smooth' })
        }
    }

    const handleScrollToTopTenPosts = () => {
        if (topTenPostsRef.current) {
            const OFFSET = 64
            const top =
                topTenPostsRef.current.getBoundingClientRect().top +
                window.scrollY -
                OFFSET

            window.scrollTo({ top, behavior: 'smooth' })
        }
    }

    return (
        <nav
            className={`sticky top-0 z-50 w-full transition-opacity duration-1000 ease-in-out ${navOpacity}
            bg-stone-800 text-zinc-100 shadow-md shadow-stone-600/80`}
            data-testid="navigation"
        >
            <div className="max-w-7xl flex items-center justify-between m-auto h-16 px-2 sm:px-4 py-1 md:py-2">
                <NavigationLogo />
                <div>
                    <NavigationButton
                        handleScroll={handleScrollToTopUsers}
                        label="Most Active Users"
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
