'use client'

import { HStack } from '@/styled-system/jsx'
import { Button, Text } from '@cerberus-design/react'
import { createSignal, ReactiveText, useRead } from '@cerberus-design/signals'

const [count, setCount] = createSignal<number>(0)
const [readRenderCount, setReadRenderCount] = createSignal<number>(0)

/**
 * This entire component will re-render when the count changes
 * because it uses useRead.
 *
 * However any ReactiveText child componens will **never** re-render.
 */
export function ReadDemo() {
  const countVal = useRead(count)

  const increment = () => setCount(countVal + 1)

  setReadRenderCount(readRenderCount() + 1)

  return (
    <HStack justify="space-between" w="3/4">
      <HStack gap="md" w="full">
        <Button onClick={increment}>Increment</Button>
        <Text>{countVal}</Text>
      </HStack>

      <HStack gap="md" w="full">
        <Text>Render Count:</Text>
        <ReactiveText data={readRenderCount} />
      </HStack>
    </HStack>
  )
}
