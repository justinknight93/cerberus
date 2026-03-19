'use client'

import { Box, Stack } from '@/styled-system/jsx'
import { Button } from '@cerberus-design/react'
import { createMutation, createQuery, useMutation, useQuery } from '@cerberus-design/signals'
import { Suspense } from 'react'

// Fake DB

type User = {
  id: string
  name: string
}

let dbUser: User = { id: '', name: '' }

// Data fetching

const query = createQuery(
  () => 'init',
  async () => dbUser,
)

const mutation = createMutation(
  async (newId: User['id']) => {
    dbUser = { id: newId, name: `User ${newId}` }
    return dbUser
  },
  {
    invalidate: () => [query.key],
  },
)

// UI

function UserInfo() {
  const data = useQuery(query)
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export function MutationDemo() {
  const { mutate } = useMutation(mutation)

  return (
    <Stack direction="column" justify="space-between" w="3/4">
      <Suspense fallback={<Box aria-busy h="200px" w="full" />}>
        <UserInfo />
      </Suspense>

      <Button onClick={() => mutate(crypto.randomUUID())}>Change User</Button>
    </Stack>
  )
}
