'use client'

import { Box, Stack } from '@/styled-system/jsx'
import { Button, Text } from '@cerberus-design/react'
import { createMutation, createQuery, useMutation, useQuery } from '@cerberus-design/signals'
import { Suspense } from 'react'

// Fake DB

type User = {
  id: string
  name: string
}

let dbUser2: User = { id: '', name: '' }

// Data fetching

const query2 = createQuery(
  () => 'init2',
  async () => dbUser2,
)

const mutation = createMutation(
  async (newId: User['id']) => {
    dbUser2 = { id: newId, name: `User ${newId}` }
    return dbUser2
  },
  {
    invalidate: () => [query2.key],
  },
)

// UI

function UserInfo() {
  const data = useQuery(query2)
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export function StatusDemo() {
  const { mutate, status } = useMutation(mutation)

  return (
    <Stack direction="column" justify="space-between" w="3/4">
      <Suspense fallback={<Box aria-busy h="200px" w="full" />}>
        <UserInfo />
      </Suspense>

      <Stack>
        <Text as="small">Status :</Text>
        <pre>{JSON.stringify(status, null, 2)}</pre>
      </Stack>

      <Button onClick={() => mutate(crypto.randomUUID())}>Change User</Button>
    </Stack>
  )
}
