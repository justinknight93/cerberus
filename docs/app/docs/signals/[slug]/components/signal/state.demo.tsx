'use client'

import { Stack } from '@/styled-system/jsx'
import { Add, Subtract } from '@carbon/icons-react'
import { Group, IconButton } from '@cerberus-design/react'
import { createComputed, createSignal, ReactiveText } from '@cerberus-design/signals'

const [count, setCount] = createSignal<number[]>([1])
const result = createComputed<string>(() => count().join(', '))

export function StateDemo() {
  // There is no difference between these two implementations
  // They both work correctly and efficiently
  const increment = () => setCount(count().concat([1]))

  const decrement = () => setCount((prev) => prev.slice(0, -1))

  return (
    <Stack direction="column" gap="md" w="3/4">
      <ReactiveText data={result} />

      <Group layout="attached">
        <IconButton ariaLabel="Increment" onClick={increment} usage="filled">
          <Add />
        </IconButton>
        <IconButton ariaLabel="Decrement" onClick={decrement} palette="danger" usage="filled">
          <Subtract />
        </IconButton>
      </Group>
    </Stack>
  )
}
