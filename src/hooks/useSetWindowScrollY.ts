'use client'

import { useEffect } from 'react'
import { setItemInSessionStorage } from '@/utils/setItemInSessionStorage'

export const useSetWindowScrollY = () => {
    useEffect(() => {
        const onScroll = () => {
            setItemInSessionStorage('scrollY', window.scrollY)
        }

        window.addEventListener('scroll', onScroll)

        return () => window.removeEventListener('scroll', onScroll)
    }, [])
}
