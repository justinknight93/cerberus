import { bench, run, group } from 'mitata'
import { createSignal, createComputed, createEffect } from '@cerberus-design/signals'

group('Graph Engine Benchmarks', () => {
  bench('Deep Dependency Chain (1,000 nested computeds)', () => {
    const [getHead, setHead] = createSignal(0)

    let current = getHead
    for (let i = 0; i < 1000; i++) {
      const prev = current
      current = createComputed(() => prev() + 1)
    }

    let _result = 0
    createEffect(() => {
      _result = current()
    })

    // The actual benchmarked operation: Mutate the root and propagate through 1,000 layers
    setHead((prev) => prev + 1)
  })

  bench('Wide Fan-Out (1 Signal -> 10,000 Effects)', () => {
    const [getBroadcaster, setBroadcaster] = createSignal(0)

    let _readCount = 0
    // We set up 10,000 effects listening to a single signal
    for (let i = 0; i < 10000; i++) {
      createEffect(() => {
        getBroadcaster()
        _readCount++
      })
    }

    // The actual benchmarked operation: Trigger 10,000 effects instantly
    setBroadcaster((prev) => prev + 1)
  })

  bench('The Diamond Problem at Scale (1 Signal -> 1,000 Computeds -> 1 Effect)', () => {
    const [getRoot, setRoot] = createSignal(0)

    const computeds: Array<() => number> = []
    for (let i = 0; i < 1000; i++) {
      computeds.push(createComputed(() => getRoot() + i))
    }

    let _executionCount = 0
    createEffect(() => {
      _executionCount++
      let _sum = 0
      for (const getComputed of computeds) {
        _sum += getComputed()
      }
    })

    // The actual benchmarked operation: Mutate root, update 1,000 computeds, run 1 effect
    setRoot((prev) => prev + 1)
  })
})

// Mitata requires you to explicitly trigger the execution at the bottom of the file
await run({
  colors: true,
  format: 'mitata', // outputs a beautiful table
})
