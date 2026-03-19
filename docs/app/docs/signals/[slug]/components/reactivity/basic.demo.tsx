'use client'

import { HStack } from '@/styled-system/jsx'
import { Button } from '@cerberus-design/react'
import { ReactiveText, useSignal } from '@cerberus-design/signals'

export function BasicDemo() {
  const [count, setCount, getCount] = useSignal<number>(0)

  return (
    <HStack gap="md">
      <Button onClick={() => setCount(getCount() + 1)}>Increment</Button>
      <p>{count}</p>

      {/* Not re-rendered - but the text value is updated */}
      <ReactiveText data={getCount} />
    </HStack>
  )
}
