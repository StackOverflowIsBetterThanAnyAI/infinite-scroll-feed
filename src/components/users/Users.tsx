import { useCallback, useContext, useEffect, useState } from 'react'
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
import fetchUsers from '@/api/fetchUsers'
import { ContextTopUsers } from '@/context/ContextTopUsers'
import { UsersType } from '@/types/types'
import { getItemFromSessionStorage } from '@/utils/getItemFromSessionStorage'
import { useScreenWidth } from '@/hooks/useScreenWidth'

const Users = () => {
    const contextTopUsersRef = useContext(ContextTopUsers)
    if (!contextTopUsersRef) {
        throw new Error(
            'Users must be used within a contextTopUsersRef.Provider'
        )
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
        setIsLoading(false)
    }, [isLoading])

    useEffect(() => {
        const parsedStorageData = getItemFromSessionStorage()
        setUsers(parsedStorageData?.users || [])

        if (!parsedStorageData?.users?.length) {
            loadUsers()
        }
    }, [loadUsers])

    return (
        <section
            className="w-full flex flex-col items-center gap-8 lg:gap-12 max-w-7xl p-6 lg:py-8 min-[1304px]:px-0"
            ref={topUsersRef}
        >
            <div className="w-full flex flex-col items-center">
                <div className="w-full flex flex-col gap-4">
                    <h2 className="text-very-large font-semibold text-zinc-50 underline">
                        Most Active Users
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                        {SCREEN_WIDTH !== 'MOBILE' && (
                            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {users.length > 0
                                    ? users.slice(0, 4).map((item) => (
                                          <Card key={item.id} className="gap-4">
                                              <CardHeader>
                                                  <CardTitle>
                                                      {item.name}
                                                  </CardTitle>
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
                                    : null}
                            </div>
                        )}
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
                                                        : 4
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
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Users
