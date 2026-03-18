import { BasicDemo } from './basic.demo'
import { StoreDemo } from './store.demo'
import { ReadDemo } from './read.demo'
import { StateDemo } from './state.demo'

export const DEMOS = {
  basic: {
    id: 'signal.basic',
    preview: <BasicDemo />,
    context: 'signals',
  },
  store: {
    id: 'signal.store',
    preview: <StoreDemo />,
    context: 'signals',
  },
  read: {
    id: 'signal.read',
    preview: <ReadDemo />,
    context: 'signals',
  },
  state: {
    id: 'signal.state',
    preview: <StateDemo />,
    context: 'signals',
  },
  meta: `import { createSignal } from '@cerberus/signals'`,
}
