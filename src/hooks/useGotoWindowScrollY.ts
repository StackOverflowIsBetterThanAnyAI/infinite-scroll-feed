'use client'

import { useEffect } from 'react'
import { getItemFromSessionStorage } from '@/utils/getItemFromSessionStorage'

export const useGotoWindowScrollY = (contentLoaded: {
    posts: boolean
    quote: boolean
    users: boolean
}) => {
    useEffect(() => {
        if (contentLoaded.posts && contentLoaded.quote && contentLoaded.users) {
            const parsedStorageData = getItemFromSessionStorage()
            if (parsedStorageData?.scrollY) {
                window.scrollTo({
                    top: parsedStorageData.scrollY,
                    behavior: 'smooth',
                })
            }
        }
    }, [contentLoaded])
}
