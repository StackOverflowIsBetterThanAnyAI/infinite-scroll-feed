import { SetStateAction } from 'react'
import { UsersType } from '@/types/types'
import { setItemInSessionStorage } from '@/utils/setItemInSessionStorage'

const fetchUsers = async (
    setUsers: (value: SetStateAction<UsersType[]>) => void
) => {
    try {
        const response = await fetch(
            'https://jsonplaceholder.typicode.com/users',
            {
                method: 'GET',
            }
        )

        if (!response.ok) {
            console.error('An error occurred while fetching the users.')
            throw new Error('Network response was not ok')
        }

        const data = await response.json()
        if (!data) {
            console.error('An error occurred while fetching the users.')
            throw new Error('Received data was not ok')
        }

        setUsers((prev) => {
            const merged = [...prev, ...data]
            const unique = Array.from(
                new Map(merged.map((item) => [item.id, item])).values()
            )

            setItemInSessionStorage('users', unique)

            return unique
        })
    } catch (error: unknown) {
        console.error('An error occurred while fetching the users.', error)
    }
}

export default fetchUsers
