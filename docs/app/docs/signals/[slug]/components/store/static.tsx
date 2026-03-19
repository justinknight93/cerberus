import { BasicDemo } from './basic.demo'
import { GlobalDemo } from './global.demo'

export const DEMOS = {
  basic: {
    id: 'store.basic',
    preview: <BasicDemo />,
    context: 'signals',
  },
  global: {
    id: 'store.global',
    preview: <GlobalDemo />,
    context: 'signals',
  },
  meta: `import { createStoreContext } from '@cerberus/signals'`,
}
