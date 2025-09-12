'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import logo from '@/assets/logo.webp'

const NavigationLogo = () => {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <Button asChild variant="ghost" className="px-0 sm:px-4 h-fit">
            <button
                aria-label="Scroll back to the the Top"
                title="Back to the the Top"
                onClick={handleScrollToTop}
            >
                <Image
                    src={logo}
                    width={48}
                    height={48}
                    alt="Back to the the Top"
                    className="rounded-lg"
                    loading="lazy"
                />
                <span className="text-large">Infinite Scroll Feed</span>
            </button>
        </Button>
    )
}

export default NavigationLogo
