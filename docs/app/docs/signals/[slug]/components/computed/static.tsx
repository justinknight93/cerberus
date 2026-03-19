import { BasicDemo } from './basic.demo'

export const DEMOS = {
  basic: {
    id: 'computed.basic',
    preview: <BasicDemo />,
    context: 'signals',
  },
  meta: `import { createComputed } from '@cerberus/signals'`,
}
