'use client'

import { HStack } from '@/styled-system/jsx'
import { Button, Text } from '@cerberus-design/react'
import { createSignal, ReactiveText } from '@cerberus-design/signals'

function createDemoStore() {
  const [count, setCount] = createSignal<number>(0)
  const [renderCount, setRenderCount] = createSignal<number>(0)
  return { count, setCount, renderCount, setRenderCount }
}

export function BasicDemo() {
  const store = createDemoStore()
  const increment = () => store.setCount(store.count() + 1)

  store.setRenderCount(store.renderCount() + 1)

  return (
    <HStack justify="space-between" w="3/4">
      <HStack gap="md" w="full">
        <Button onClick={increment}>Increment</Button>
        <ReactiveText data={store.count} />
      </HStack>

      <HStack gap="md" w="full">
        <Text>Render Count:</Text>
        <ReactiveText data={store.renderCount} />
      </HStack>
    </HStack>
  )
}
