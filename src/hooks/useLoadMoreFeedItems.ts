'use client'

import { useEffect } from 'react'

export const useLoadMoreFeedItems = (
    isLoading: boolean,
    loadMoreItems: () => Promise<void>
) => {
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 96
            ) {
                loadMoreItems()
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [isLoading, loadMoreItems])
}
