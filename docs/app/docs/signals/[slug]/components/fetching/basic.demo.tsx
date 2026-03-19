'use client'

import { Box, Stack } from '@/styled-system/jsx'
import { Button } from '@cerberus-design/react'
import { createQuery, createSignal, useQuery } from '@cerberus-design/signals'
import { Suspense } from 'react'

type User = {
  id: string
  name: string
}

function fetchUser(id: User['id']): Promise<User> {
  return new Promise<User>((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `User ${id}` })
    }, 1000)
  })
}

const [currentUser, setCurrentUser] = createSignal<User['id']>(crypto.randomUUID())

// 1. Define the query
const query = createQuery(currentUser, fetchUser)

function UserInfo() {
  // 2. Trigger the query
  const data = useQuery(query)
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export function BasicDemo() {
  return (
    <Stack direction="column" justify="space-between" w="3/4">
      <Suspense fallback={<Box aria-busy h="200px" w="full" />}>
        <UserInfo />
      </Suspense>

      <Button onClick={() => setCurrentUser(crypto.randomUUID())}>Change User</Button>
    </Stack>
  )
}
