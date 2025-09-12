'use client'

import { useContext, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
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

    const [menuExpanded, setMenuExpanded] = useState<boolean>(false)
    const [navOpacity, setNavOpacity] = useState<string>('opacity-100')
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useNavigationOpacity({ setNavOpacity, timerRef })

    const handleScrollToQuote = () => {
        setWindowScrollTo(
            ['MOBILE', 'TABLET_SMALL'].includes(SCREEN_WIDTH) ? 144 : 72,
            quoteRef
        )
    }

    const handleScrollToTopUsers = () => {
        setWindowScrollTo(
            ['MOBILE', 'TABLET_SMALL'].includes(SCREEN_WIDTH) ? 112 : 48,
            topUsersRef
        )
    }

    const handleScrollToTopTenPosts = () => {
        setWindowScrollTo(
            ['MOBILE', 'TABLET_SMALL'].includes(SCREEN_WIDTH) ? 128 : 72,
            topTenPostsRef
        )
    }

    return (
        <>
            <nav
                className={`sticky top-0 z-50 w-full transition-opacity duration-1000 ease-in-out ${navOpacity}
                bg-stone-800 text-zinc-100 shadow-md shadow-stone-600/80`}
                data-testid="navigation"
            >
                <div className="max-w-7xl flex items-center justify-between m-auto h-16 px-2 py-1 md:py-2">
                    <NavigationLogo />
                    {['TABLET', 'DESKTOP'].includes(SCREEN_WIDTH) ? (
                        <div>
                            <NavigationButton
                                handleScroll={handleScrollToTopUsers}
                                label="Most Active Users"
                                variant="ghost"
                            />
                            <NavigationButton
                                handleScroll={handleScrollToQuote}
                                label="Quote of the Day"
                                variant="ghost"
                            />
                            <NavigationButton
                                handleScroll={handleScrollToTopTenPosts}
                                label="Top 10 Posts"
                                variant="ghost"
                            />
                        </div>
                    ) : (
                        <Button asChild variant="ghost">
                            <button
                                className="text-very-large rounded-lg h-12 w-12"
                                onClick={() => setMenuExpanded((prev) => !prev)}
                                aria-controls="mobile-navigation"
                                aria-expanded={menuExpanded}
                                aria-label={
                                    menuExpanded
                                        ? 'Close mobile navigation menu'
                                        : 'Open mobile navigation menu'
                                }
                                title={
                                    menuExpanded
                                        ? 'Close mobile navigation menu'
                                        : 'Open mobile navigation menu'
                                }
                            >
                                {menuExpanded ? '✖' : '☰'}
                            </button>
                        </Button>
                    )}
                </div>
            </nav>
            {['TABLET_SMALL', 'MOBILE'].includes(SCREEN_WIDTH) &&
                menuExpanded && (
                    <nav
                        className={`sticky top-16 z-50 w-full transition-opacity duration-1000 ease-in-out ${navOpacity}
                        bg-stone-800 text-zinc-100 shadow-md shadow-stone-600/80
                        flex flex-wrap justify-center py-2 px-4 border-t-2 border-stone-600`}
                        id="mobile-navigation"
                        aria-label="Navigate to each Section"
                    >
                        <NavigationButton
                            handleScroll={() => {
                                handleScrollToTopUsers()
                                setMenuExpanded(false)
                            }}
                            label="Most Active Users"
                            variant="secondary"
                        />
                        <NavigationButton
                            handleScroll={() => {
                                handleScrollToQuote()
                                setMenuExpanded(false)
                            }}
                            label="Quote of the Day"
                            variant="secondary"
                        />
                        <NavigationButton
                            handleScroll={() => {
                                handleScrollToTopTenPosts()
                                setMenuExpanded(false)
                            }}
                            label="Top 10 Posts"
                            variant="secondary"
                        />
                    </nav>
                )}
        </>
    )
}

export default Navigation
