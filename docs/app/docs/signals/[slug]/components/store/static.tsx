import { BasicDemo } from './basic.demo'

export const DEMOS = {
  basic: {
    id: 'store.basic',
    preview: <BasicDemo />,
    context: 'signals',
  },
  meta: `import { createStoreContext } from '@cerberus/signals'`,
}
