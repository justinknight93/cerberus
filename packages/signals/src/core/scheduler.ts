import type { Observer } from './types'

export let activeObserver: Observer | null = null
const observerStack: Observer[] = []

export function pushObserver(observer: Observer) {
  if (activeObserver) observerStack.push(activeObserver)
  activeObserver = observer
}

export function popObserver() {
  activeObserver = observerStack.pop() || null
}

// Batching State

export const batchedObservers: Set<Observer> = new Set<Observer>()
let isBatching: boolean = false

/**
 * ## Batching Signal Setters
 *
 * Allows multiple signal setters to be batched together, ensuring they run in a
 * single update. This is useful when you want to update multiple signals at once,
 * without triggering multiple updates.
 *
 * | Parameters | Type | Description |
 * |------------|------|-------------|
 * | `callback` | `() => void` | The callback to batch any signal updates into a single update. |
 */
export function batch<T>(fn: () => T): void {
  if (isBatching) {
    fn()
    return
  }
  isBatching = true
  try {
    fn()
  } finally {
    isBatching = false
    flush()
  }
}

export function schedule(observer: Observer): void {
  if (isBatching) {
    batchedObservers.add(observer)
  } else {
    batchedObservers.add(observer)
    flush()
  }
}

function flush(): void {
  if (batchedObservers.size === 0) return

  const queue = Array.from(batchedObservers)
  batchedObservers.clear()
  // Sort ascending by depth. Closest to the root (Signal) runs first.
  queue.sort((a, b) => a.depth - b.depth)

  // Execute safely top-down
  for (const observer of queue) {
    observer.execute()
  }
}
