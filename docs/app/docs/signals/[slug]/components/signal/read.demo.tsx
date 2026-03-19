'use client'

import { HStack } from '@/styled-system/jsx'
import { Button, Text } from '@cerberus-design/react'
import { createSignal, ReactiveText, useRead } from '@cerberus-design/signals'

function createReadStore() {
  const [count, setCount] = createSignal<number>(0)
  const [readRenderCount, setReadRenderCount] = createSignal<number>(0)
  return {
    count,
    readRenderCount,
    increment: () => setCount(count() + 1),
    updateRenderCount: () => setReadRenderCount(readRenderCount() + 1),
  }
}

/**
 * This entire component will re-render when the count changes
 * because it uses useRead.
 *
 * However any ReactiveText child componens will **never** re-render.
 */
export function ReadDemo() {
  const store = createReadStore()
  const countVal = useRead(() => store.count())

  const increment = () => store.increment()

  store.updateRenderCount()

  return (
    <HStack justify="space-between" w="3/4">
      <HStack gap="md" w="full">
        <Button onClick={increment}>Increment</Button>
        <Text>{countVal}</Text>
      </HStack>

      <HStack gap="md" w="full">
        <Text>Render Count:</Text>
        <ReactiveText data={store.readRenderCount} />
      </HStack>
    </HStack>
  )
}
