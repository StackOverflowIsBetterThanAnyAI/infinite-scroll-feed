'use client'

import { useRef } from 'react'
import Feed from '@/components/feed/Feed'
import Footer from '@/components/footer/Footer'
import Hero from '@/components/hero/Hero'
import Navigation from '@/components/navigation/Navigation'
import Users from '@/components/users/Users'
import { ContextTopTenPosts } from '@/context/ContextTopTenPosts'
import { ContextTopUsers } from '@/context/ContextTopUsers'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { useSetWindowScrollY } from '@/hooks/useSetWindowScrollY'

export default function Home() {
    const topTenPostsRef = useRef<HTMLDivElement | null>(null)
    const topUsersRef = useRef<HTMLDivElement | null>(null)

    useFocusTrap()
    useSetWindowScrollY()

    return (
        <div className="min-h-svh flex flex-col items-center justify-start bg-gradient-to-b from-stone-700 to-stone-800">
            <ContextTopTenPosts.Provider value={topTenPostsRef}>
                <ContextTopUsers.Provider value={topUsersRef}>
                    <Navigation />
                    <Hero />
                    <Users />
                    <Feed />
                    <Footer />
                </ContextTopUsers.Provider>
            </ContextTopTenPosts.Provider>
        </div>
    )
}
