'use client'

import { Dispatch, SetStateAction, useEffect } from 'react'
import { UsersType } from '@/types/types'
import { getItemFromSessionStorage } from '@/utils/getItemFromSessionStorage'

export const useLoadUsers = (
    loadUsers: () => Promise<void>,
    setContentLoaded: Dispatch<
        SetStateAction<{
            posts: boolean
            quote: boolean
            users: boolean
        }>
    >,
    setUsers: Dispatch<SetStateAction<UsersType[]>>
) => {
    useEffect(() => {
        const parsedStorageData = getItemFromSessionStorage()
        setUsers(parsedStorageData?.users || [])

        if (!parsedStorageData?.users?.length) {
            loadUsers()
        } else {
            setContentLoaded((prev) => ({ ...prev, users: true }))
        }
    }, [loadUsers, setContentLoaded, setUsers])
}
