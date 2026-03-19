import { BasicDemo } from './basic.demo'
import { NativeEffectDemo } from './native.demo'

export const DEMOS = {
  basic: {
    id: 'computed.basic',
    preview: <BasicDemo />,
    context: 'signals',
  },
  native: {
    id: 'effect.native',
    preview: <NativeEffectDemo />,
    context: 'signals',
  },
  meta: `import { createEffect } from '@cerberus/signals'`,
}
