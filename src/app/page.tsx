'use client'

import Feed from '@/components/feed/Feed'
import Footer from '@/components/footer/Footer'
import Hero from '@/components/hero/Hero'
import Navigation from '@/components/navigation/Navigation'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { useSetWindowScrollY } from '@/hooks/useSetWindowScrollY'

export default function Home() {
    useFocusTrap()
    useSetWindowScrollY()

    return (
        <div className="min-h-svh flex flex-col items-center justify-start bg-gradient-to-b from-stone-700 to-stone-800">
            <Navigation />
            <Hero />
            <Feed />
            <Footer />
        </div>
    )
}
