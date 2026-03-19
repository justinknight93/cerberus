import { BasicDemo } from './basic.demo'

export const DEMOS = {
  basic: {
    id: 'batch.basic',
    preview: <BasicDemo />,
    context: 'signals',
  },
  meta: `import { batch } from '@cerberus/signals'`,
}
