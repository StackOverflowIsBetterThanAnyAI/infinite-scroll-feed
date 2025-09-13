import { createContext, Dispatch, SetStateAction } from 'react'

export const ContextContentLoaded = createContext<
    | [
          {
              posts: boolean
              quote: boolean
              users: boolean
          },
          Dispatch<
              SetStateAction<{
                  posts: boolean
                  quote: boolean
                  users: boolean
              }>
          >
      ]
    | undefined
>(undefined)
