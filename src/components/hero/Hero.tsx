import { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ContextTopTenPosts } from '@/context/ContextTopTenPosts'
import heroLogo from '@/assets/hero_logo.webp'

const Hero = () => {
    const contextTopTenPosts = useContext(ContextTopTenPosts)
    if (!contextTopTenPosts) {
        throw new Error(
            'Feed must be used within a ContextTopTenPosts.Provider'
        )
    }
    const topTenPostsRef = contextTopTenPosts

    const handleScrollToTopTenPosts = () => {
        if (topTenPostsRef.current) {
            const OFFSET = 64
            const top =
                topTenPostsRef.current.getBoundingClientRect().top +
                window.scrollY -
                OFFSET

            window.scrollTo({ top, behavior: 'smooth' })
        }
    }

    return (
        <div className="w-full flex flex-col items-center gap-8 max-w-7xl relative isolate bg-stone-100 text-stone-950 p-3 sm:p-4 lg:p-6 my-6 lg:my-8">
            <h1 className="text-extremely-large font-mono font-semibold">
                Infinite Scroll Feed
            </h1>
            <div className="flex justify-center gap-16 text-normal">
                <div className="max-w-xl">
                    <p className="pb-4 border-b-2 border-stone-400">
                        This website serves as a{' '}
                        <strong className="font-mono px-0.5 text-large">
                            Landing Page
                        </strong>{' '}
                        for implementing an infinite scroll feed based on fake
                        API data from
                        <Button asChild variant="link">
                            <Link
                                href="https://jsonplaceholder.typicode.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-normal"
                                aria-label="Link to JSON Placeholder (opens in a new tab)"
                                title="Link to JSON Placeholder (opens in a new tab)"
                            >
                                JSON Placeholder
                            </Link>
                        </Button>
                        and using UI elements from the React component library
                        <Button asChild variant="link">
                            <Link
                                href="https://ui.shadcn.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-normal"
                                aria-label="Link to shadcn (opens in a new tab)"
                                title="Link to shadcn (opens in a new tab)"
                            >
                                shadcn
                            </Link>
                        </Button>
                    </p>
                    <p className="py-4 border-b-2 border-stone-400">
                        It makes use of the{' '}
                        <strong className="font-mono px-0.5 text-large">
                            /comments
                        </strong>{' '}
                        and{' '}
                        <strong className="font-mono px-0.5 text-large">
                            /users
                        </strong>{' '}
                        routes from JSON Placeholder to fetch and display
                        comments along with user information in a card format.
                    </p>
                    <p className="text-center p-4 mt-4 bg-stone-400/60  rounded-lg">
                        Check out the top 10 posts of the week right now!
                        <Button
                            asChild
                            variant="outline"
                            className="flex m-auto mt-4 px-8 w-fit"
                        >
                            <button
                                className="text-normal"
                                aria-label="Link to Top 10 Posts (scrolls to section)"
                                title="Link to Top 10 Posts"
                                onClick={handleScrollToTopTenPosts}
                            >
                                Top 10 Posts
                            </button>
                        </Button>
                    </p>
                </div>
                <div className="hidden min-[864px]:flex flex-col gap-2 self-center justify-center items-center p-4 h-fit bg-stone-400/60  outline-4 outline-stone-600 rounded-lg">
                    <Image
                        src={heroLogo}
                        alt="Infinite Scroll Feed Logo"
                        width={192}
                        height={192}
                    />
                </div>
            </div>
        </div>
    )
}

export default Hero
