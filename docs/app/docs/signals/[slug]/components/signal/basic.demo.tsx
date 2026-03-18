'use client'

import { HStack } from '@/styled-system/jsx'
import { Button, Text } from '@cerberus-design/react'
import { createSignal, ReactiveText } from '@cerberus-design/signals'

const [count, setCount] = createSignal<number>(0)
const [renderCount, setRenderCount] = createSignal<number>(0)

export function BasicDemo() {
  const increment = () => setCount(count() + 1)

  setRenderCount(renderCount() + 1)

  return (
    <HStack justify="space-between" w="3/4">
      <HStack gap="md" w="full">
        <Button onClick={increment}>Increment</Button>
        <ReactiveText data={count} />
      </HStack>

      <HStack gap="md" w="full">
        <Text>Render Count:</Text>
        <ReactiveText data={renderCount} />
      </HStack>
    </HStack>
  )
}
