---
name: cerberus-realtime-data-grid
description: Build real-time data tables combining Cerberus DataGrid virtualization with Signals reactivity. Use when implementing live data feeds, WebSocket subscriptions, or high-frequency updates in data tables. Provides O(1) component targeting and bypasses React reconciliation for maximum performance.
---

# Cerberus Real-time Data Grid

Combine DataGrid virtualization with Signals reactivity for high-performance real-time data tables.

## When to Apply

- Building live dashboards with streaming data updates
- Implementing WebSocket-based data subscriptions
- Creating tables that need sub-second update performance
- Migrating from heavy state management to signal-based reactivity

## Critical Rules

**Signal-First Data Flow**: Always use signals for data state, never local React state for grid data

```tsx
// WRONG - React state causes full component tree re-renders
const [data, setData] = useState([])

// RIGHT - Signals target only consuming components
const [getData, setData] = createSignal([])
const dataQuery = createQuery(getRefreshTrigger, fetchTableData)
```

**Use updateData for Real-time**: DataGrid's `updateData` action is optimized for bulk updates

```tsx
// WRONG - Recreating grid instance
;<DataGrid key={dataVersion} data={newData} />

// RIGHT - Using store action
const { updateData } = useDataGridContext()
updateData(newData)
```

**Reactive Query Pattern**: Combine signals with createQuery for automatic refetching

```tsx
// Signal triggers automatic refetch
const [getFilters, setFilters] = createSignal({ status: 'active' })
const tableQuery = createQuery(getFilters, async (filters) => {
  return fetch(`/api/data?${new URLSearchParams(filters)}`)
})
```

## Key Patterns

### Real-time Data Grid Setup

```tsx
import { createSignal, createQuery, createEffect } from '@cerberus-design/signals'
import { useQuery, useRead } from '@cerberus-design/signals/react'
import {
  DataGrid,
  createColumnHelper,
  useDataGridContext,
} from '@cerberus-design/data-grid'

// Reactive data signals
const [getRefreshInterval, setRefreshInterval] = createSignal(5000)
const [getFilters, setFilters] = createSignal({})

// Auto-refreshing query
const dataQuery = createQuery(
  createComputed(() => ({
    filters: getFilters(),
    timestamp: Math.floor(Date.now() / getRefreshInterval()),
  })),
  async ({ filters }) => {
    const response = await fetch(`/api/table-data?${new URLSearchParams(filters)}`)
    return response.json()
  },
)

function RealtimeDataGrid() {
  const data = useQuery(dataQuery)

  return (
    <DataGrid
      data={data}
      columns={columns}
      initialState={{
        pagination: { pageSize: 50 },
      }}
    />
  )
}
```

### WebSocket Integration

```tsx
const [getSocketData, setSocketData] = createSignal([])

// WebSocket effect for real-time updates
createEffect(() => {
  const ws = new WebSocket('ws://localhost:8080/data-stream')

  ws.onmessage = (event) => {
    const updates = JSON.parse(event.data)
    setSocketData((current) => [...current, ...updates])
  }

  return () => ws.close()
})

function LiveDataGrid() {
  const { updateData } = useDataGridContext()
  const socketData = useRead(getSocketData)

  // Update grid when new data arrives
  createEffect(() => {
    updateData(socketData)
  })

  return <DataGrid data={socketData} columns={columns} />
}
```

### High-Frequency Updates with Store Actions

```tsx
function OptimizedGridControls() {
  const store = useDataGridContext()
  const globalFilter = useRead(store.globalFilter)
  const rowCount = useRead(store.rowCount)

  return (
    <div>
      <input
        value={globalFilter}
        onChange={(e) => store.setGlobalFilter(e.target.value)}
        placeholder="Live filter..."
      />
      <ReactiveText data={store.rowCount} /> rows
    </div>
  )
}
```

### Subscription-Based Data Updates

```tsx
const [getSubscriptionId, setSubscriptionId] = createSignal(null)

const subscriptionQuery = createQuery(getSubscriptionId, async (id) => {
  if (!id) return []

  const response = await fetch(`/api/subscribe/${id}`)
  const reader = response.body.getReader()

  return new ReadableStream({
    start(controller) {
      function pump() {
        return reader.read().then(({ done, value }) => {
          if (done) {
            controller.close()
            return
          }
          const data = JSON.parse(new TextDecoder().decode(value))
          controller.enqueue(data)
          return pump()
        })
      }
      return pump()
    },
  })
})
```

## Common Mistakes

- **Using React state** — Causes unnecessary re-renders. Use signals instead.
- **Not using updateData action** — Recreating DataGrid is expensive. Use store actions for updates.
- **Missing useRead for reactive values** — Direct access to store values won't trigger updates unless using the `ReactiveText` (recommended over `useRead`).
- **Overusing createEffect** — Only use for side effects, not derived data. Use `createComputed` for calculations.
