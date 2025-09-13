'use client'

import { useEffect } from 'react'

export const useScrollRestoration = () => {
    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual'
        }
    }, [])
}
