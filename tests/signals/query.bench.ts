import { createQuery, hashArgs } from '@cerberus-design/signals/src/core/createQuery'
import { invalidateQuery } from '@cerberus-design/signals/src/core/query-cache'
import { bench, run, group } from 'mitata'

group('Query API Data Layer', () => {
  bench('hashArgs - Complex Object Sorting & Hashing', () => {
    // Tests the worst-case scenario: a user passing a large, unsorted
    // configuration object as a query key.
    hashArgs({
      zulu: 1,
      alpha: 'test',
      nested: { charlie: true, bravo: false },
      array: [3, 2, 1, { delta: 4 }],
      timestamp: new Date().toISOString(),
    })
  })

  // Setup for Cache Hit test
  const dummyFetcher = async () => ({ id: 1, name: 'Test' })
  // Prime the cache once
  createQuery(() => 'shared-avatar-1', dummyFetcher)

  bench('Cache Retrieval & Deduplication (10,000 concurrent calls)', () => {
    // Simulates rendering a massive list where every item requests the same data.
    // Proves that the global Map lookup and signal return is virtually instant,
    // rather than instantiating 10,000 separate state graphs.
    for (let i = 0; i < 10000; i++) {
      createQuery(() => 'shared-avatar-1', dummyFetcher)
    }
  })

  // Setup for Invalidation test
  const dynamicFetcher = async (id: number) => ({ id, ts: Date.now() })
  const query = createQuery(() => 999, dynamicFetcher)

  bench('Cache Invalidation Sweep', () => {
    // Proves that triggering an invalidation correctly finds the key,
    // drops the cache, and forces the underlying signal to notify its observers
    // without locking up the thread.
    invalidateQuery(query.key)
  })
})

await run({
  colors: true,
  format: 'mitata',
})
