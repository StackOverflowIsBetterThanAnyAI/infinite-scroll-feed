'use client'

import { useEffect, useRef, useState } from 'react'
import { FetchLoading } from 'fetch-loading'
import { Badge } from '@/components/ui/badge'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import fetchFeedItems from '@/api/fetchFeedItems'

const Feed = () => {
    const PAGE_SIZE = 10
    const nextPage = useRef<number>(1)
    const [feedItems, setFeedItems] = useState<
        Array<{
            postId: number
            id: number
            name: string
            email: string
            body: string
        }>
    >([])
    const [isLoading, setIsLoading] = useState(false)

    const loadMore = async () => {
        if (isLoading) return
        setIsLoading(true)
        await fetchFeedItems(nextPage, PAGE_SIZE, setFeedItems)
        setIsLoading(false)
    }

    useEffect(() => {
        loadMore()
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 96
            ) {
                loadMore()
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [isLoading])

    return (
        <main
            className="w-full flex flex-col items-center gap-4 max-w-7xl relative isolate bg-stone-300 text-stone-950 lg:rounded-lg p-3 sm:p-4 lg:p-6
            drop-shadow-stone-900 drop-shadow-sm"
        >
            {feedItems.length > 0 ? (
                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,448px),1fr))] grid-flow-row-dense w-full gap-3 sm:gap-4 lg:gap-6">
                    {feedItems.map((item) => (
                        <Card key={item.id}>
                            <CardHeader>
                                <CardTitle>{item.name}</CardTitle>
                                <CardDescription>{item.email}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>{item.body}</p>
                            </CardContent>
                            <CardFooter>
                                <Badge variant="outline">Post #{item.id}</Badge>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : null}

            {isLoading && (
                <div className="p-2 pt-4">
                    <FetchLoading ariaLabel="Loading more Items." />
                </div>
            )}
        </main>
    )
}

export default Feed
