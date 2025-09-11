'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import logo from '@/assets/logo.webp'

const NavigationLogo = () => {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <Button asChild variant="ghost" className="px-4 h-fit">
            <button
                className="text-normal"
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
                <span className="max-[336px]:hidden text-large">
                    Infinite Scroll Feed
                </span>
            </button>
        </Button>
    )
}

export default NavigationLogo
