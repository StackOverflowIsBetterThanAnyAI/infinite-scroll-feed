'use client'

import { useCallback, useContext, useRef, useState } from 'react'
import { FetchLoading } from 'fetch-loading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
import { ContextContentLoaded } from '@/context/ContextContentLoaded'
import { ContextTopTenPosts } from '@/context/ContextTopTenPosts'
import { FeedItemsType } from '@/types/types'
import { fetchFeedItems } from '@/api/fetchFeedItems'
import { useLoadFeedItems } from '@/hooks/useLoadFeedItems'
import { useLoadMoreFeedItems } from '@/hooks/useLoadMoreFeedItems'

const Feed = () => {
    const contextContentLoaded = useContext(ContextContentLoaded)
    if (!contextContentLoaded) {
        throw new Error(
            'Feed must be used within a ContextContentLoaded.Provider'
        )
    } // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_contentLoaded, setContentLoaded] = contextContentLoaded

    const contextTopTenPosts = useContext(ContextTopTenPosts)
    if (!contextTopTenPosts) {
        throw new Error(
            'Feed must be used within a ContextTopTenPosts.Provider'
        )
    }
    const topTenPostsRef = contextTopTenPosts

    const PAGE_SIZE = 10
    const nextPage = useRef<number>(1)
    const [feedItems, setFeedItems] = useState<Array<FeedItemsType>>([])
    const [isLoading, setIsLoading] = useState(false)

    const loadMoreItems = useCallback(async () => {
        if (isLoading) {
            return
        }
        setIsLoading(true)
        await fetchFeedItems(nextPage, PAGE_SIZE, setFeedItems)
        setContentLoaded((prev) => ({ ...prev, posts: true }))
        setIsLoading(false)
    }, [isLoading, setContentLoaded])

    useLoadFeedItems(loadMoreItems, nextPage, setContentLoaded, setFeedItems)
    useLoadMoreFeedItems(isLoading, loadMoreItems)

    return (
        <main
            className="w-full flex flex-col items-center gap-8 lg:gap-12 max-w-7xl bg-stone-300 text-stone-950 lg:rounded-lg mt-6 lg:mt-8 p-3 sm:p-4 lg:p-6
            drop-shadow-stone-900 drop-shadow-sm"
            ref={topTenPostsRef}
        >
            <div className="w-full flex flex-col items-center px-14 sm:px-16 py-6 bg-stone-400/60 rounded-lg shadow-md shadow-stone-500">
                <div className="w-full flex flex-col gap-4 max-w-3xl">
                    <h2 className="self-start text-very-large font-semibold underline">
                        Top 10 Posts of the Week
                    </h2>
                    <div className="w-full">
                        <Carousel>
                            <CarouselContent>
                                {feedItems.length > 0 ? (
                                    feedItems.slice(0, 10).map((item) => (
                                        <CarouselItem key={item.id}>
                                            <Card className="gap-4">
                                                <CardHeader>
                                                    <CardTitle>
                                                        {item.name}
                                                    </CardTitle>
                                                    <CardDescription>
                                                        {item.email}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <p>{item.body}</p>
                                                </CardContent>
                                                <CardFooter>
                                                    <Badge variant="outline">
                                                        Post #{item.id}
                                                    </Badge>
                                                </CardFooter>
                                            </Card>
                                        </CarouselItem>
                                    ))
                                ) : (
                                    <CarouselItem>
                                        <Card className="gap-4">
                                            <CardHeader>
                                                <CardTitle>
                                                    <Skeleton className="h-[20px] w-[196px] max-w-3/5 rounded-full" />
                                                </CardTitle>
                                                <CardDescription>
                                                    <Skeleton className="h-[16px] w-[144px] max-w-2/5 rounded-full" />
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="flex flex-col gap-2">
                                                <Skeleton className="h-[18px] w-[512px] max-w-4/5 rounded-full" />
                                                <Skeleton className="h-[18px] w-[512px] max-w-4/5 rounded-full" />
                                                <Skeleton className="h-[18px] w-[128px] max-w-4/5 rounded-full" />
                                            </CardContent>
                                            <CardFooter>
                                                <Skeleton className="h-[22px] w-[48px] max-w-2/5 rounded-full" />
                                            </CardFooter>
                                        </Card>
                                    </CarouselItem>
                                )}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </div>
            </div>
            {feedItems.length > 10 && (
                <div className="flex flex-col gap-4 lg:gap-6">
                    <h2 className="self-start text-very-large font-semibold underline px-4">
                        More Hot Posts
                    </h2>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,448px),1fr))] grid-flow-row-dense w-full gap-4 lg:gap-6">
                        {feedItems.slice(10).map((item) => (
                            <Card key={item.id} className="gap-6">
                                <CardHeader>
                                    <CardTitle>{item.name}</CardTitle>
                                    <CardDescription>
                                        {item.email}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>{item.body}</p>
                                </CardContent>
                                <CardFooter>
                                    <Badge variant="outline">
                                        Post #{item.id}
                                    </Badge>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
            {isLoading && (
                <div className="p-2 pt-4">
                    <FetchLoading ariaLabel="Loading more Items." />
                </div>
            )}
            <Button asChild variant="outline" className="px-4">
                <button
                    className="text-large"
                    aria-label="Load more Posts"
                    title="Load more Posts"
                    onClick={loadMoreItems}
                >
                    Load more Posts
                </button>
            </Button>
        </main>
    )
}

export default Feed
