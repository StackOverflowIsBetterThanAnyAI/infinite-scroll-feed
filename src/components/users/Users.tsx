import { useCallback, useContext, useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ContextContentLoaded } from '@/context/ContextContentLoaded'
import { ContextTopUsers } from '@/context/ContextTopUsers'
import { UsersType } from '@/types/types'
import { fetchUsers } from '@/api/fetchUsers'
import { useLoadUsers } from '@/hooks/useLoadUsers'
import { useScreenWidth } from '@/hooks/useScreenWidth'

const Users = () => {
    const contextContentLoaded = useContext(ContextContentLoaded)
    if (!contextContentLoaded) {
        throw new Error(
            'Users must be used within a ContextContentLoaded.Provider'
        )
    } // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_contentLoaded, setContentLoaded] = contextContentLoaded

    const contextTopUsersRef = useContext(ContextTopUsers)
    if (!contextTopUsersRef) {
        throw new Error('Users must be used within a ContextTopUsers.Provider')
    }
    const topUsersRef = contextTopUsersRef

    const [users, setUsers] = useState<Array<UsersType>>([])
    const [isLoading, setIsLoading] = useState(false)

    const SCREEN_WIDTH = useScreenWidth()

    const loadUsers = useCallback(async () => {
        if (isLoading) {
            return
        }
        setIsLoading(true)
        await fetchUsers(setUsers)
        setContentLoaded((prev) => ({ ...prev, users: true }))
        setIsLoading(false)
    }, [isLoading, setContentLoaded])

    useLoadUsers(loadUsers, setContentLoaded, setUsers)

    return (
        <section
            className="w-full flex flex-col items-center max-w-7xl p-6 lg:py-8 min-[1304px]:px-0"
            ref={topUsersRef}
        >
            <div className="w-full flex flex-col items-center">
                <div className="w-full flex flex-col gap-0 sm:gap-4">
                    <h2 className="text-very-large font-semibold text-zinc-50 underline">
                        Most Active Users
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {users.length > 0
                                ? users.slice(0, 4).map((item) => (
                                      <Card
                                          key={item.id}
                                          className="gap-4 hidden sm:flex"
                                      >
                                          <CardHeader>
                                              <CardTitle>{item.name}</CardTitle>
                                              <CardDescription>
                                                  {item.email}
                                              </CardDescription>
                                          </CardHeader>
                                          <CardContent>
                                              <p>{item.company.name}</p>
                                              <p>{item.company.bs}</p>
                                          </CardContent>
                                          <CardFooter>
                                              {item.website}
                                          </CardFooter>
                                      </Card>
                                  ))
                                : Array.from({ length: 4 }).map((_, i) => (
                                      <Card
                                          className="gap-4 hidden sm:flex"
                                          key={i}
                                      >
                                          <CardHeader>
                                              <CardTitle>
                                                  <Skeleton className="h-[20px] w-[196px] max-w-3/5 md:mb-1 rounded-full" />
                                              </CardTitle>
                                              <CardDescription>
                                                  <Skeleton className="h-[16px] w-[144px] max-w-2/5 mb-1 md:mb-4 rounded-full" />
                                              </CardDescription>
                                          </CardHeader>
                                          <CardContent className="flex flex-col gap-2">
                                              <Skeleton className="h-[18px] w-[512px] max-w-4/5 rounded-full" />
                                              <Skeleton className="h-[18px] w-[512px] max-w-4/5 rounded-full" />
                                              <Skeleton className="h-[18px] w-[128px] max-w-4/5 hidden md:flex mb-8 rounded-full" />
                                          </CardContent>
                                          <CardFooter>
                                              <Skeleton className="h-[22px] w-[48px] max-w-2/5 rounded-full" />
                                          </CardFooter>
                                      </Card>
                                  ))}
                        </div>
                        <div className="flex flex-col gap-4">
                            {users.length > 4 ? (
                                <Card className="h-full">
                                    <CardHeader className="hidden sm:flex">
                                        <CardTitle className="underline pb-2">
                                            More Active Users
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Accordion
                                            type="single"
                                            collapsible
                                            defaultValue={`item-${
                                                SCREEN_WIDTH === 'MOBILE'
                                                    ? '1'
                                                    : '5'
                                            }`}
                                        >
                                            {users
                                                .slice(
                                                    SCREEN_WIDTH === 'MOBILE'
                                                        ? 0
                                                        : 4,
                                                    SCREEN_WIDTH === 'MOBILE'
                                                        ? 5
                                                        : users.length
                                                )
                                                .map((item) => (
                                                    <AccordionItem
                                                        value={`item-${item.id.toString()}`}
                                                        key={item.id}
                                                    >
                                                        <AccordionTrigger>
                                                            <CardTitle>
                                                                {item.name}
                                                            </CardTitle>
                                                        </AccordionTrigger>
                                                        <AccordionContent>
                                                            <CardDescription>
                                                                <p>
                                                                    {item.email}
                                                                </p>
                                                            </CardDescription>
                                                            <CardFooter className="px-0">
                                                                <p>
                                                                    {
                                                                        item.website
                                                                    }
                                                                </p>
                                                            </CardFooter>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                ))}
                                        </Accordion>
                                    </CardContent>
                                </Card>
                            ) : (
                                <Card className="gap-4 h-full">
                                    <CardHeader>
                                        <CardTitle>
                                            <Skeleton className="h-[20px] w-[172px] max-w-3/5 mb-6 rounded-full hidden sm:flex" />
                                            <Skeleton className="h-[18px] sm:h-[20px] w-[172px] max-w-3/5 mb-6 rounded-full" />
                                            <Skeleton className="h-[14px] sm:h-[16px] w-[128px] max-w-2/5 mb-2 rounded-full" />
                                            <Skeleton className="h-[14px] sm:h-[16px] w-[96px] max-w-1/5 mb-3 sm:mb-7 md:mb-8 lg:mb-6 rounded-full" />
                                            <Skeleton className="h-[4px] w-full mb-6 rounded-none border-b-2 bg-transparent" />
                                            <Skeleton className="h-[18px] sm:h-[20px] w-[172px] max-w-3/5 mb-3 sm:mb-7 md:mb-8 lg:mb-6 rounded-full" />
                                            <Skeleton className="h-[4px] w-full mb-6 rounded-none border-b-2 bg-transparent" />
                                            <Skeleton className="h-[18px] sm:h-[20px] w-[172px] max-w-3/5 mb-3 sm:mb-7 md:mb-8 lg:mb-6 rounded-full" />
                                            <Skeleton className="h-[4px] w-full mb-6 rounded-none border-b-2 bg-transparent" />
                                            <Skeleton className="h-[18px] sm:h-[20px] w-[172px] max-w-3/5 mb-3 sm:mb-7 md:mb-8 lg:mb-6 rounded-full" />
                                            <Skeleton className="h-[4px] w-full mb-6 rounded-none border-b-2 bg-transparent" />
                                            <Skeleton className="h-[18px] sm:h-[20px] w-[172px] max-w-3/5 mb-3 sm:mb-7 md:mb-8 lg:mb-6 rounded-full" />
                                            <Skeleton className="h-[4px] w-full mb-6 rounded-none border-b-2 bg-transparent" />
                                            <Skeleton className="h-[18px] sm:h-[20px] w-[172px] max-w-3/5 rounded-full" />
                                        </CardTitle>
                                    </CardHeader>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Users
