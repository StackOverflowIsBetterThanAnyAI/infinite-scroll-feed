'use client'

import { useContext, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import NavigationButton from './NavigationButton'
import NavigationLogo from './NavigationLogo'
import { ContextPartners } from '@/context/ContextPartners'
import { ContextQuote } from '@/context/ContextQuote'
import { ContextTopTenPosts } from '@/context/ContextTopTenPosts'
import { ContextTopUsers } from '@/context/ContextTopUsers'
import { setWindowScrollTo } from '@/utils/setWindowScrollTo'
import { useNavigationOpacity } from '@/hooks/useNavigationOpacity'
import { useScreenWidth } from '@/hooks/useScreenWidth'

const Navigation = () => {
    const contextPartners = useContext(ContextPartners)
    if (!contextPartners) {
        throw new Error(
            'Navigation must be used within a ContextPartners.Provider'
        )
    }
    const partnersRef = contextPartners

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

    const handleScrollToPartners = () => {
        setWindowScrollTo(SCREEN_WIDTH === 'DESKTOP' ? 72 : 168, partnersRef)
    }

    const handleScrollToQuote = () => {
        setWindowScrollTo(SCREEN_WIDTH === 'DESKTOP' ? 48 : 144, quoteRef)
    }

    const handleScrollToTopUsers = () => {
        setWindowScrollTo(SCREEN_WIDTH === 'DESKTOP' ? 48 : 144, topUsersRef)
    }

    const handleScrollToTopTenPosts = () => {
        setWindowScrollTo(SCREEN_WIDTH === 'DESKTOP' ? 72 : 168, topTenPostsRef)
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
                    {SCREEN_WIDTH === 'DESKTOP' ? (
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
                                handleScroll={handleScrollToPartners}
                                label="Our Partners"
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
            {SCREEN_WIDTH !== 'DESKTOP' && menuExpanded && (
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
                            handleScrollToPartners()
                            setMenuExpanded(false)
                        }}
                        label="Our Partners"
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
