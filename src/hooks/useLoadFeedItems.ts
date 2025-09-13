'use client'

import { Dispatch, RefObject, SetStateAction, useEffect } from 'react'
import { FeedItemsType } from '@/types/types'
import { getItemFromSessionStorage } from '@/utils/getItemFromSessionStorage'

export const useLoadFeedItems = (
    loadMoreItems: () => Promise<void>,
    nextPage: RefObject<number>,
    setContentLoaded: Dispatch<
        SetStateAction<{
            posts: boolean
            quote: boolean
            users: boolean
        }>
    >,
    setFeedItems: Dispatch<SetStateAction<FeedItemsType[]>>
) => {
    useEffect(() => {
        const parsedStorageData = getItemFromSessionStorage()
        setFeedItems(parsedStorageData?.feedItems || [])
        nextPage.current = parsedStorageData?.nextPage || 1

        if (!parsedStorageData?.feedItems?.length) {
            loadMoreItems()
        } else {
            setContentLoaded((prev) => ({ ...prev, posts: true }))
        }
    }, [loadMoreItems, nextPage, setContentLoaded, setFeedItems])
}
