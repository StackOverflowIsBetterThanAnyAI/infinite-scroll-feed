'use client'

import { useRef, useState } from 'react'
import Feed from '@/components/feed/Feed'
import Footer from '@/components/footer/Footer'
import Hero from '@/components/hero/Hero'
import Navigation from '@/components/navigation/Navigation'
import Quote from '@/components/quote/Quote'
import Users from '@/components/users/Users'
import { ContextContentLoaded } from '@/context/ContextContentLoaded'
import { ContextQuote } from '@/context/ContextQuote'
import { ContextTopTenPosts } from '@/context/ContextTopTenPosts'
import { ContextTopUsers } from '@/context/ContextTopUsers'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { useGotoWindowScrollY } from '@/hooks/useGotoWindowScrollY'
import { useScrollRestoration } from '@/hooks/useScrollRestoration'
import { useSetWindowScrollY } from '@/hooks/useSetWindowScrollY'

export default function Home() {
    const [contentLoaded, setContentLoaded] = useState<{
        posts: boolean
        quote: boolean
        users: boolean
    }>({
        posts: false,
        quote: false,
        users: false,
    })

    const quoteRef = useRef<HTMLQuoteElement>(null)
    const topTenPostsRef = useRef<HTMLDivElement | null>(null)
    const topUsersRef = useRef<HTMLDivElement | null>(null)

    useFocusTrap()
    useGotoWindowScrollY(contentLoaded)
    useScrollRestoration()
    useSetWindowScrollY()

    return (
        <div className="min-h-svh flex flex-col items-center justify-start bg-gradient-to-b from-stone-700 to-stone-800">
            <ContextContentLoaded.Provider
                value={[contentLoaded, setContentLoaded]}
            >
                <ContextQuote.Provider value={quoteRef}>
                    <ContextTopTenPosts.Provider value={topTenPostsRef}>
                        <ContextTopUsers.Provider value={topUsersRef}>
                            <Navigation />
                            <Hero />
                            <Users />
                            <Quote />
                            <Feed />
                            <Footer />
                        </ContextTopUsers.Provider>
                    </ContextTopTenPosts.Provider>
                </ContextQuote.Provider>
            </ContextContentLoaded.Provider>
        </div>
    )
}
