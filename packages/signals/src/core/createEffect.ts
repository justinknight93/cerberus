import type { Observer } from './types'
import { pushObserver, popObserver } from './scheduler'

/**
 * ## Reactive Side Effects
 *
 * Creates a reactive side effect that automatically tracks and subscribes to any
 * signals read during its execution. When those signals mutate, the effect is
 * scheduled to re-run topologically.
 *
 * ### Behavior
 * - **Auto-Tracking:** You do not pass a dependency array. The engine maps dependencies
 * dynamically based on the exact execution path of `fn()`.
 * - **Topological Execution:** Effects are terminal nodes. They are guaranteed to run
 * *after* all signals and derived computations (`createComputed`) have settled,
 * preventing torn state or redundant executions.
 * - **Dynamic Branching:** If an effect has conditional logic (`if (a()) b() else c()`),
 * it dynamically subscribes and unsubscribes from branches on every execution,
 * ensuring no memory leaks from inactive code paths.
 *
 * ### Memory Safety & Cleanup
 * The effect automatically cleans up its internal graph subscriptions before every
 * re-execution. If `fn` returns a teardown closure, it will be invoked immediately
 * before the next execution, or when the effect is manually destroyed.
 *
 * ### React Interop (Caveat)
 * `createEffect` lives completely outside the React reconciler. It runs *synchronously* * the moment a signal batch flushes. It should be used for pure graph logic, DOM
 * mutations outside React's purview, or bridging to external stores (like `useSyncExternalStore`).
 *
 * | Parameters | Type | Description |
 * |------------|------|-------------|
 * | `fn`       | `() => void \| (() => void)` | The closure to execute. May optionally return a cleanup closure. |
 *
 * ## Resources
 * [Cerberus Signals Docs](https://cerberus.digitalu.design/docs/signals/overview)
 */
export function createEffect(fn: () => void | (() => void)): () => void {
  let cleanupFn: (() => void) | void

  const effect: Observer = {
    dependencies: new Set(),
    depth: 0,
    execute() {
      if (typeof cleanupFn === 'function') cleanupFn()
      effect.cleanup()
      // --- TOPOLOGICAL SORT UPDATE ---
      effect.depth = 0
      pushObserver(effect)
      cleanupFn = fn()
      popObserver()
    },
    cleanup() {
      for (const dep of effect.dependencies) {
        dep.observers.delete(effect)
      }
      effect.dependencies.clear()
    },
  }

  // Initial run to establish the dependency graph
  effect.execute()

  // Return a manual drop/teardown function for the consumer
  return () => {
    if (typeof cleanupFn === 'function') cleanupFn()
    effect.cleanup()
  }
}
