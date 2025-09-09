'use client'

import Feed from '@/components/feed/Feed'
import Footer from '@/components/footer/Footer'
import Navigation from '@/components/navigation/Navigation'
import { useFocusTrap } from '@/hooks/useFocusTrap'

export default function Home() {
    useFocusTrap()

    return (
        <div className="min-h-svh flex flex-col items-center justify-start bg-gradient-to-b from-stone-700 to-stone-800">
            <Navigation />
            <p>Hero Section</p>
            <p>Carousel with Top 10 Posts</p>
            <Feed />
            <Footer />
        </div>
    )
}
