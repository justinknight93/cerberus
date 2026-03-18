'use client'

import { HStack } from '@/styled-system/jsx'
import { Button, Text } from '@cerberus-design/react'
import { ReactiveText, createSignal, useSignal } from '@cerberus-design/signals'

function createDemoStore() {
  const [renderCount, setRenderCount] = createSignal<number>(0)
  return { renderCount, setRenderCount }
}

export function UseDemo() {
  const store = createDemoStore()
  const [count, setCount, getCount] = useSignal<number>(0)

  const increment = () => setCount(count + 1)

  store.setRenderCount(store.renderCount() + 1)

  return (
    <HStack justify="space-between" w="3/4">
      <HStack gap="md" w="full">
        <Button onClick={increment}>Increment</Button>
        <Text>{count}</Text>
        <ReactiveText data={getCount} />
      </HStack>

      <HStack gap="md" w="full">
        <Text>Render Count:</Text>
        <ReactiveText data={store.renderCount} />
      </HStack>
    </HStack>
  )
}
