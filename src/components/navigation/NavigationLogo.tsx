'use client'

import logo from '@/assets/logo.webp'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const NavigationLogo = () => {
    const router = useRouter()

    const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
        if (e.key === ' ') {
            e.preventDefault()
            router.push('/')
        }
    }

    return (
        <Link
            href="/"
            onKeyDown={(e) => handleKeyDown(e)}
            className="logohomepage flex items-center gap-2 no-underline rounded-lg p-1 pr-2
            hover:bg-stone-700 active:bg-stone-600"
            aria-label="Back to the Homepage"
            title="Back to the Homepage"
        >
            <Image
                src={logo}
                width={48}
                height={48}
                alt="Back to the Homepage"
                className="rounded-lg"
                loading="lazy"
            />
            <span className="max-[336px]:hidden text-large">
                Infinite Scroll Feed
            </span>
        </Link>
    )
}

export default NavigationLogo
