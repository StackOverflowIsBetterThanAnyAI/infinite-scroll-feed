'use client'

import NavigationLogo from './NavigationLogo'
import { useRef, useState } from 'react'
import { useNavigationOpacity } from '@/hooks/useNavigationOpacity'

const Navigation = () => {
    const [navOpacity, setNavOpacity] = useState<string>('opacity-100')
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const handleLogout = () => {}

    useNavigationOpacity({ setNavOpacity, timerRef })

    return (
        <nav
            className={`sticky top-0 z-50 w-full transition-opacity duration-1000 ease-in-out ${navOpacity}
            bg-stone-800 text-zinc-100 shadow-md shadow-stone-600/80`}
            data-testid="navigation"
        >
            <div className="max-w-7xl flex items-center justify-between m-auto h-16 px-2 sm:px-4 py-1 md:py-2">
                <NavigationLogo />
                <button
                    className="text-large px-4 py-2 rounded-lg hover:bg-stone-700 active:bg-stone-600"
                    data-testid="logout"
                    title="Logout"
                    aria-label="Logout"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default Navigation
